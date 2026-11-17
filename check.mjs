import assert from 'node:assert/strict';
import {SHAPES,rotate,fits,clearLines,hasMoves,blast} from './dist/engine.mjs';
const empty=()=>Array(64).fill(0);let b=empty();assert(fits(b,SHAPES[3],4,0));assert(!fits(b,SHAPES[3],5,0));b[0]=1;assert(!fits(b,SHAPES[0],0,0));assert(!fits(b,SHAPES[0],-1,0));
for(const shape of SHAPES){let s=shape;for(let i=0;i<4;i++)s=rotate(s);assert.deepEqual(s,shape)}
b=empty();for(let i=0;i<8;i++){b[i]=1;b[i*8]=1}let c=clearLines(b);assert.equal(c.count,2);assert.equal(c.cells.length,15);assert.equal(b.filter(Boolean).length,0);
b=Array(64).fill(1);b[0]=0;b[8]=0;assert(hasMoves(b,[{shape:[[0,0],[1,0]]}]));assert(!hasMoves(b,[{shape:SHAPES[4]}]));
b=Array(64).fill(1);assert.equal(blast(b,0,0),4);assert.equal(b.filter(Boolean).length,60);assert.equal(blast(b,4,4),9);assert.equal(b.filter(Boolean).length,51);
assert(!hasMoves(Array(64).fill(1),SHAPES.map(shape=>({shape}))));console.log('PASS: placement, boundaries, four rotations, simultaneous crossing clears, rotated move detection, game over and edge blast.');
const {pressureStep,injectGarbage,HARD_SHAPES}=await import('./dist/engine.mjs');
assert.equal(pressureStep(90,0,1),100);assert.equal(pressureStep(90,1,1),55);assert.equal(pressureStep(30,2,4),0);assert.equal(pressureStep(0,0,7),35);
b=empty();const debris=injectGarbage(b,5,()=>0);assert.equal(new Set(debris).size,5);assert.equal(b.filter(v=>v===5).length,5);b=Array(64).fill(1);b[0]=0;assert.equal(injectGarbage(b,7).length,1);assert.equal(clearLines(b).count,16);
for(const shape of HARD_SHAPES){assert(fits(empty(),shape,0,0));let s=shape;for(let i=0;i<4;i++)s=rotate(s);assert.deepEqual(s,shape)}
console.log('PASS: pressure escalation/cooling/cap, unique garbage, full-board boundaries and all hard-piece rotations.');
const {sanitizeRecords,recordRound,dropAnchor}=await import('./dist/engine.mjs');
assert.deepEqual(sanitizeRecords(null),[]);assert.deepEqual(sanitizeRecords([{score:-1}]),[]);
let history=recordRound([],{roundId:'one',score:120,lines:2,moves:7},'finished','2026-11-14T12:00:00Z');
history=recordRound(history,{roundId:'one',score:150,lines:3,moves:8},'finished','2026-11-14T13:00:00Z');assert.equal(history.length,1);assert.equal(history[0].score,150);assert.equal(history[0].date,'2026-11-14T12:00:00Z');assert.equal(sanitizeRecords(history).length,1);
for(let n=0;n<60;n++)history=recordRound(history,{roundId:'r'+n,score:n,lines:0,moves:1},'saved','2026-11-14T12:00:00Z');assert.equal(history.length,50);
assert.deepEqual(dropAnchor(140,205,{left:100,top:100},40,2,2,65),[0,0]);assert.deepEqual(dropAnchor(220,285,{left:100,top:100},40,2,2,65),[2,2]);
console.log('PASS: score record validation, duplicate prevention, history limit, and touch drag anchor.');
const {createRestartCountdown}=await import('./dist/engine.mjs');
let tasks=new Map(),taskId=0,ticks=[],restarts=0;
const clock=createRestartCountdown(n=>ticks.push(n),()=>restarts++,fn=>{tasks.set(++taskId,fn);return taskId},id=>tasks.delete(id));
const advance=()=>{const [id,fn]=tasks.entries().next().value;tasks.delete(id);fn()};
clock.start('round1');clock.start('round1');assert.equal(tasks.size,1);assert.deepEqual(ticks,[3]);advance();advance();assert.deepEqual(ticks,[3,2,1]);assert.equal(restarts,0);advance();assert.equal(restarts,1);assert.equal(tasks.size,0);
clock.start('round2');clock.stop();assert.equal(tasks.size,0);assert.equal(restarts,1);
// Full board and isolated gaps cannot accept multi-cell pieces; rotation-only moves remain legal.
assert.equal(hasMoves(Array(64).fill(5),[{shape:SHAPES[0]}]),false);
b=Array(64).fill(5);b[0]=0;b[10]=0;assert.equal(hasMoves(b,[{shape:SHAPES[1]}]),false);
b[8]=0;assert.equal(hasMoves(b,[{shape:SHAPES[1]}]),true);
console.log('PASS: 3-second restart, duplicate timer prevention, cancellation and no-move detection.');
b=Array(64).fill(5);b[0]=0;b[8]=0;
assert.equal(hasMoves(b,[{shape:[[0,0],[1,0]]}],true),true,'Beginner can rotate into vertical gap');
assert.equal(hasMoves(b,[{shape:[[0,0],[1,0]]}],false),false,'Challenger cannot rotate into vertical gap');
assert.equal(hasMoves(b,[{shape:[[0,0],[0,1]]}],false),true,'Challenger can use a matching orientation');
console.log('PASS: Beginner vs Challenger legal-move rules.');
