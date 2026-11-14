export const N=8;
export const SHAPES=[[[0,0]],[[0,0],[1,0]],[[0,0],[1,0],[2,0]],[[0,0],[1,0],[2,0],[3,0]],[[0,0],[1,0],[0,1],[1,1]],[[0,0],[0,1],[0,2],[1,2]],[[0,0],[1,0],[2,0],[1,1]],[[1,0],[2,0],[0,1],[1,1]],[[0,0],[1,0],[2,0],[0,1],[0,2]]];
export function rotate(s){let p=s.map(([x,y])=>[-y,x]),mx=Math.min(...p.map(v=>v[0])),my=Math.min(...p.map(v=>v[1]));return p.map(([x,y])=>[x-mx,y-my]);}
export function fits(b,s,x,y){return s.every(([dx,dy])=>x+dx>=0&&y+dy>=0&&x+dx<N&&y+dy<N&&!b[(y+dy)*N+x+dx]);}
export function clearLines(b){const rows=[],cols=[];for(let i=0;i<N;i++){if(Array.from({length:N},(_,x)=>b[i*N+x]).every(Boolean))rows.push(i);if(Array.from({length:N},(_,y)=>b[y*N+i]).every(Boolean))cols.push(i);}const cells=new Set();rows.forEach(y=>{for(let x=0;x<N;x++)cells.add(y*N+x)});cols.forEach(x=>{for(let y=0;y<N;y++)cells.add(y*N+x)});cells.forEach(i=>b[i]=0);return {count:rows.length+cols.length,cells:[...cells]};}
export function hasMoves(b,pieces){return pieces.some(p=>{if(!p)return false;let s=p.shape;for(let r=0;r<4;r++,s=rotate(s))for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(fits(b,s,x,y))return true;return false;});}
export function blast(b,x,y){let n=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){let a=x+dx,c=y+dy;if(a>=0&&c>=0&&a<N&&c<N&&b[c*N+a]){b[c*N+a]=0;n++;}}return n;}
export const HARD_SHAPES=[[[0,0],[1,0],[2,0],[3,0],[4,0]],[[0,0],[1,0],[2,0],[0,1],[2,1]],[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]],[[0,0],[1,0],[2,0],[1,1],[1,2]],[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]],[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]];
export function pressureStep(p,lines,level){return lines?Math.max(0,p-35*lines):Math.min(100,p+20+Math.min(15,(level-1)*3))}
export function injectGarbage(b,count,rng=Math.random){const open=b.map((v,i)=>v?null:i).filter(i=>i!==null),added=[];for(let n=0;n<count&&open.length;n++){const j=Math.min(open.length-1,Math.floor(rng()*open.length)),i=open.splice(j,1)[0];b[i]=5;added.push(i)}return added}
