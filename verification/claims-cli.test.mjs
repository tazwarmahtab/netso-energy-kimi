import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
test('scanner exits nonzero on prohibited source claim',()=>{
 const root=mkdtempSync(join(tmpdir(),'netso-claims-'));
 try {mkdirSync(join(root,'src'));writeFileSync(join(root,'src','Home.tsx'),'Netso finances construction');
 const p=spawnSync(process.execPath,[new URL('./claims-cli.mjs',import.meta.url).pathname,join(root,'src')],{encoding:'utf8'});
 assert.equal(p.status,1);assert.match(p.stdout,/ownership/);
 }finally{rmSync(root,{recursive:true,force:true})}
});
test('scanner passes approved copy',()=>{
 const root=mkdtempSync(join(tmpdir(),'netso-claims-'));
 try {writeFileSync(join(root,'Opex.tsx'),'A funding partner owns the plant.');
 const p=spawnSync(process.execPath,[new URL('./claims-cli.mjs',import.meta.url).pathname,root],{encoding:'utf8'});
 assert.equal(p.status,0);assert.match(p.stdout,/0 findings/);
 }finally{rmSync(root,{recursive:true,force:true})}
});
