import {readdirSync,readFileSync,statSync} from 'node:fs';
import {resolve,join,extname} from 'node:path';
import {scanClaims} from './claims.mjs';
const root=resolve(process.argv[2]??'app/src');
const sourceExtensions=new Set(['.tsx','.ts','.jsx','.js','.md','.html']);
function walk(path) {
  if(statSync(path).isFile()) return sourceExtensions.has(extname(path))?[path]:[];
  return readdirSync(path,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(join(path,entry.name)):entry.isFile()?walk(join(path,entry.name)):[]);
}
try {
 const findings=walk(root).flatMap(path=>scanClaims(readFileSync(path,'utf8'),path));
 for(const f of findings) console.log(`${f.rule}: ${f.file} @${f.index}: ${f.match}`);
 console.log(`${findings.length} findings in ${root}`);
 if(findings.length) process.exitCode=1;
} catch(error) {console.error(error.message);process.exitCode=2;}
