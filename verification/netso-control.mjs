import fs from 'node:fs';
import crypto from 'node:crypto';

export const GATES = Array.from({length:14},(_,i)=>'G'+i);
const hash = x => crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
export function evaluate(state, now = Date.now()) {
  const errors = [];
  const s = state ?? {};
  const d = s.deployment ?? {};
  if(!s.commit || !d.commit || s.commit !== d.commit) errors.push('source/deployment mismatch');
  if(d.environment !== 'staging') errors.push('non-staging environment');
  if(!d.artifactDigest || d.smokePassed !== true) errors.push('missing artifact or smoke evidence');
  if(!Array.isArray(s.requirements) || !s.requirements.length) errors.push('requirements absent');
  else for(const r of s.requirements) if(!r.id || !r.testId || !r.evidenceId || !r.owner) errors.push('untraced requirement: '+(r.id??'?'));
  if(!Array.isArray(s.gaps)) errors.push('gap inventory absent');
  else for(const g of s.gaps) {
    if(!g.id || !['P0','P1','P2','P3'].includes(g.severity) || !g.status) errors.push('malformed gap');
    if(['P0','P1'].includes(g.severity) && g.status !== 'CLOSED') errors.push('blocking gap: '+g.id);
    if(g.severity==='P2' && g.status!=='CLOSED' && !g.approvedException) errors.push('unapproved P2: '+g.id);
    if(g.status==='CLOSED' && (!g.closureEvidenceId || !g.independentVerifier || g.independentVerifier===g.implementer)) errors.push('unverified closure: '+g.id);
  }
  if(!s.gates || Object.keys(s.gates).some(k=>!GATES.includes(k))) errors.push('gate inventory invalid');
  for(const id of GATES) {
    const g=s.gates?.[id];
    if(g?.status!=='PASS') {errors.push(id+' not PASS'); continue;}
    if(!g.evidenceId || !g.independentVerifier || g.independentVerifier===g.implementer || g.commit!==s.commit || g.artifactDigest!==d.artifactDigest) errors.push(id+' evidence invalid');
  }
  const o=s.observatory ?? {};
  if(!o.collectorHealthy || !o.reconciled || !o.faultInjectionPassed || !o.independentVerifier) errors.push('observatory unhealthy');
  const observed=Date.parse(o.observedAt??'');
  if(!Number.isFinite(observed) || observed>now+300000 || now-observed>86400000) errors.push('observatory stale');
  if(!s.contentReview?.approved || !s.contentReview?.evidenceId || s.contentReview?.commit!==s.commit) errors.push('commercial review absent');
  if(!s.approval?.authorizedBy || !s.approval?.recordId) errors.push('human approval absent');
  return {decision:errors.length?'BLOCKED':'READY_FOR_RELEASE_REVIEW',errors,commit:s.commit??null,artifactDigest:d.artifactDigest??null,stateDigest:hash(s)};
}
export function observe(state,previous,now=Date.now()) {
  const current=evaluate(state,now), prior=previous?evaluate(previous,now):null;
  return {...current,changed:!prior || current.commit!==prior.commit || hash(current.errors)!==hash(prior.errors),observedAt:new Date(now).toISOString()};
}
if(process.argv[1]?.endsWith('/netso-control.mjs')) {
  try {
    const mode=process.argv[2], file=process.argv[3];
    if(!['verify','observe'].includes(mode) || !file) throw Error('usage: node netso-control.mjs verify|observe state.json [prior.json]');
    const state=JSON.parse(fs.readFileSync(file,'utf8'));
    const prior=process.argv[4]?JSON.parse(fs.readFileSync(process.argv[4],'utf8')):null;
    const result=mode==='observe'?observe(state,prior):evaluate(state);
    console.log(JSON.stringify(result,null,2));
    if(result.decision==='BLOCKED') process.exitCode=1;
  } catch(e) {console.error(e.message);process.exitCode=2;}
}
