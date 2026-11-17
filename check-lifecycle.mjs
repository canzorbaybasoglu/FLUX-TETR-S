import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
// Minimal DOM collaborator: exercise production lifecycle with a persisted, blocked board.
class Element{constructor(){this.children=[];this.style={setProperty(){}};this.attributes={};this.textContent='';this.hidden=false;this.classes=new Set();this.classList={add:(...a)=>a.forEach(x=>this.classes.add(x)),remove:(...a)=>a.forEach(x=>this.classes.delete(x)),contains:x=>this.classes.has(x),toggle:(x,on)=>{if(on===undefined)on=!this.classes.has(x);on?this.classes.add(x):this.classes.delete(x);return on}}}setAttribute(k,v){this.attributes[k]=v}append(...e){this.children.push(...e)}appendChild(e){this.append(e)}replaceChildren(...e){this.children=e}addEventListener(){}focus(){}scrollIntoView(){}getBoundingClientRect(){return {left:0,top:0,width:40,height:40}}}
const nodes=new Map(),get=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id)};get('body').classList.add('home-mode');get('end').classList.add('hidden');
const round={board:Array(64).fill(5),pieces:[{shape:[[0,0],[1,0]],color:1},null,null],score:900,energy:100,lines:3,combo:0,moves:9,mission:1,pressure:10,roundId:'blocked-round'};
const storage=new Map([['flux-save-v1',JSON.stringify(round)]]),timers=new Map();let tid=0;
const ctx=vm.createContext({console,structuredClone,crypto:{randomUUID},matchMedia:()=>({matches:false}),navigator:{},document:{body:get('body'),getElementById:get,createElement:()=>new Element(),querySelector:s=>s==='dialog[open]'?null:get(s),querySelectorAll:()=>[],addEventListener(){}},window:{scrollTo(){},addEventListener(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setTimeout:(fn,ms)=>{timers.set(++tid,{fn,ms});return tid},clearTimeout:id=>timers.delete(id)});
const source=readFileSync('dist/engine.mjs','utf8').replaceAll('export ','')+'\n'+readFileSync('dist/app.mjs','utf8').split('\n').slice(1).join('\n');
vm.runInContext(source,ctx);
assert.equal(get('end').classList.contains('hidden'),false,'energy 100 must not prevent game over');assert.equal(get('blast').disabled,true);assert.equal(timers.size,0,'home screen must not auto-start');
vm.runInContext('showGame();render();render()',ctx);assert.equal([...timers.values()].filter(t=>t.ms===1000).length,1);
for(let n=0;n<3;n++){const entry=[...timers].find(([,t])=>t.ms===1000);assert(entry);timers.delete(entry[0]);entry[1].fn()}
const fresh=JSON.parse(storage.get('flux-save-v1'));assert.notEqual(fresh.roundId,'blocked-round');assert.equal(fresh.score,0);assert.equal(fresh.moves,0);assert.equal(get('end').classList.contains('hidden'),true);
const history=JSON.parse(storage.get('flux-history-v1'));assert.equal(history.length,1);assert.equal(history[0].score,900);assert.equal(history[0].status,'finished');
console.log('PASS: blocked round with 100 energy ends, saves once, and restarts automatically with a fresh playable state.');
vm.runInContext("selectedDifficulty='challenger';startNew(true);state.pieces=[{shape:[[0,0],[1,0],[0,1]],color:1},null,null];state.board=Array(64).fill(0);render();previous=structuredClone(state);",ctx);
const beforeShape=vm.runInContext('JSON.stringify(state.pieces[0].shape)',ctx),beforeId=JSON.parse(storage.get('flux-save-v1')).roundId;
get('rotate').onclick();get('undo').onclick();assert.equal(vm.runInContext('JSON.stringify(state.pieces[0].shape)',ctx),beforeShape);assert.equal(vm.runInContext('state.roundId',ctx),beforeId);assert.equal(get('rotate').hidden,true);assert.equal(get('undo').hidden,true);
vm.runInContext("state.difficulty='beginner';render()",ctx);get('rotate').onclick();assert.notEqual(vm.runInContext('JSON.stringify(state.pieces[0].shape)',ctx),beforeShape);assert.equal(get('rotate').hidden,false);
vm.runInContext("state.board=Array(64).fill(5);state.board[0]=0;state.board[8]=0;state.pieces=[{shape:[[0,0],[1,0]],color:1},null,null];state.difficulty='beginner';render()",ctx);assert.equal(get('end').classList.contains('hidden'),true);
vm.runInContext("state.difficulty='challenger';state.moves=1;render()",ctx);assert.equal(get('end').classList.contains('hidden'),false);
for(let n=0;n<3;n++){const entry=[...timers].find(([,t])=>t.ms===1000);assert(entry);timers.delete(entry[0]);entry[1].fn()}
assert.equal(JSON.parse(storage.get('flux-save-v1')).difficulty,'challenger');
assert.equal(JSON.parse(storage.get('flux-history-v1'))[0].difficulty,'challenger');
console.log('PASS: Challenger action guards, Beginner rotate, mode-aware game over, saved score mode and same-mode automatic restart.');
