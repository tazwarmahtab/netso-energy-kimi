import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluate,observe,GATES} from './netso-control.mjs';
function valid() {
 const commit='abc123', artifactDigest='sha256:example';
 return {
  commit,deployment:{commit,artifactDigest,environment:'staging',smokePassed:true},
  requirements:[{id:'R1',testId:'T1',evidenceId:'E1',owner:'QA'}],
  gaps:[],
  gates:Object.fromEntries(GATES.map(id=>[id,{status:'PASS',evidenceId:'e-'+id,independentVerifier:'reviewer',implementer:'builder',commit,artifactDigest}])),
  observatory:{collectorHealthy:true,reconciled:true,faultInjectionPassed:true,independentVerifier:'observer',observedAt:new Date().toISOString()},
  contentReview:{approved:true,evidenceId:'copy-review',commit},
  approval:{authorizedBy:'owner',recordId:'approval'}
 };
}
test('complete independent evidence reaches release review',()=>assert.equal(evaluate(valid()).decision,'READY_FOR_RELEASE_REVIEW'));
test('missing gate blocks',()=>{const s=valid();delete s.gates.G5;assert.equal(evaluate(s).decision,'BLOCKED')});
test('critical gap blocks',()=>{const s=valid();s.gaps.push({id:'P1',severity:'P1',status:'OPEN'});assert.equal(evaluate(s).decision,'BLOCKED')});
test('unverified closure blocks',()=>{const s=valid();s.gaps.push({id:'P2',severity:'P2',status:'CLOSED',implementer:'builder',independentVerifier:'builder',closureEvidenceId:'x'});assert.equal(evaluate(s).decision,'BLOCKED')});
test('self-approved gate blocks',()=>{const s=valid();s.gates.G2.independentVerifier='builder';assert.equal(evaluate(s).decision,'BLOCKED')});
test('stale observatory blocks',()=>{const s=valid();s.observatory.observedAt='2020-01-01T00:00:00Z';assert.equal(evaluate(s).decision,'BLOCKED')});
test('production target blocks',()=>{const s=valid();s.deployment.environment='production';assert.equal(evaluate(s).decision,'BLOCKED')});
test('unreviewed commercial claims block',()=>{const s=valid();s.contentReview.approved=false;assert.equal(evaluate(s).decision,'BLOCKED')});
test('missing human approval blocks',()=>{const s=valid();s.approval=null;assert.equal(evaluate(s).decision,'BLOCKED')});
test('changed observation detected',()=>{const a=valid(),b=valid();b.gates.G3.status='FAIL';assert.equal(observe(b,a).changed,true)});
test('unchanged observation remains quiet',()=>{const a=valid();assert.equal(observe(a,a).changed,false)});
test('future observatory timestamp blocks',()=>{const s=valid();s.observatory.observedAt=new Date(Date.now()+600000).toISOString();assert.equal(evaluate(s).decision,'BLOCKED')});

test('observatory detects changed artifact evidence even when gate errors are unchanged',()=>{const a=valid(),b=valid();b.deployment.artifactDigest='sha256:changed';assert.equal(observe(b,a).changed,true)});
test('observatory detects updated evidence with unchanged pass status',()=>{const a=valid(),b=valid();b.requirements[0].evidenceId='new-evidence';assert.equal(observe(b,a).changed,true)});
