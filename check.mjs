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
