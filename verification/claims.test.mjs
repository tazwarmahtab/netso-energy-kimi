import test from 'node:test';
import assert from 'node:assert/strict';
import {scanClaims} from './claims.mjs';
test('blocks guaranteed percentage discount',()=>assert.ok(scanClaims('30% Below Grid','Home.tsx').some(x=>x.rule==='discount')));
test('blocks company funding claim',()=>assert.ok(scanClaims('Netso finances, builds and operates','Home.tsx').some(x=>x.rule==='ownership')));
test('flags inconsistent legal entity',()=>assert.ok(scanClaims('Netso Energy Limited','About.tsx').some(x=>x.rule==='legal')));
test('does not flag approved partner-funded wording',()=>assert.deepEqual(scanClaims('A funding partner owns the plant. Term and tariff are site-specific.','Opex.tsx'),[]));
