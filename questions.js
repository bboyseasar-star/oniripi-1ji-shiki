// questions.js ── 1次関数の式マスター
// 答えは y=ax+b の a, b（2マス入力）

function gcd(a,b){ a=Math.abs(a);b=Math.abs(b); while(b){[a,b]=[b,a%b];} return a||1; }
function reduce(p,q){ if(q<0){p=-p;q=-q;} const g=gcd(p,q); return [p/g,q/g]; }
function ratLatex(p,q){ [p,q]=reduce(p,q); if(q===1) return String(p); return p<0?`-\\dfrac{${-p}}{${q}}`:`\\dfrac{${p}}{${q}}`; }
const RNG=(lo,hi)=>lo+Math.floor(Math.random()*(hi-lo+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];

// y=ax+b の LaTeX（a,b は数値）
function eqLatex(a,b){
  let s = a===1?'x':a===-1?'-x':`${a}x`;
  if(b>0) s+=`+${b}`; else if(b<0) s+=`-${-b}`;
  return `y=${s}`;
}
// 共通：答えの入力テンプレート（y = [a] x + [b]）
const INPUTS = [ {before:'\\(y=\\)', after:'\\(x\\)'}, {before:'\\(+\\)', after:''} ];
function answerLatex(a,b){ return eqLatex(a,b); }

/* ===== Lv1：傾き a と1点 → b を代入で求める ===== */
function genLevel1(){
  const a=pick([-3,-2,-1,2,3,4]);
  const b=RNG(-5,5);
  const x1=RNG(-4,4); const y1=a*x1+b;
  return {
    level:1,
    label:'次の条件をみたす1次関数の式を求めなさい',
    display:`傾きが \\(${a}\\) で、点 \\((${x1},\\ ${y1})\\) を通る`,
    extra:'', inputs:INPUTS, answers:[a,b], answerLatex:answerLatex(a,b),
    hints:[
      `傾きが ${a} だから、式は \\(y=${a}x+b\\) と書けるよ。`,
      `点 \\((${x1},${y1})\\) を代入：\\(${y1}=${a}\\times(${x1})+b\\) から \\(b\\) を求めよう。`,
      `\\(b=${b}\\)。答えは \\(${answerLatex(a,b)}\\)`
    ],
    solution:`\\(y=${a}x+b\\) に \\((${x1},${y1})\\) を代入して \\(b=${b}\\)。よって \\(${answerLatex(a,b)}\\)`
  };
}

/* ===== Lv2：2点を通る → 傾きを先に計算 ===== */
function genLevel2(){
  const a=pick([-3,-2,-1,2,3]);     // Lv2は整数傾きで確実に
  const b=RNG(-4,4);
  let x1=RNG(-4,1), x2=x1+RNG(1,4);
  const y1=a*x1+b, y2=a*x2+b;
  return {
    level:2,
    label:'2点を通る1次関数の式を求めなさい',
    display:`2点 \\((${x1},\\ ${y1})\\)、\\((${x2},\\ ${y2})\\) を通る`,
    extra:'', inputs:INPUTS, answers:[a,b], answerLatex:answerLatex(a,b),
    hints:[
      `まず傾き＝(yの増加量)/(xの増加量)＝\\(\\dfrac{${y2}-(${y1})}{${x2}-(${x1})}\\)。`,
      `傾きは \\(${a}\\)。\\(y=${a}x+b\\) に1点を代入して \\(b\\) を求めよう。`,
      `\\(b=${b}\\)。答えは \\(${answerLatex(a,b)}\\)`
    ],
    solution:`傾き＝\\(\\dfrac{${y2}-(${y1})}{${x2}-(${x1})}=${a}\\)。代入して \\(b=${b}\\)。よって \\(${answerLatex(a,b)}\\)`
  };
}

/* ===== Lv3：条件いろいろ（平行・変化の割合・切片＋点） ===== */
function genLevel3(){
  const t=pick(['parallel','rate','intercept']);
  const a=pick([-3,-2,2,3]); const b=RNG(-4,4);
  if(t==='parallel'){
    const a2=a;
    let b2=RNG(-4,4);
    while(b2===b) b2=RNG(-4,4); // 異なる平行線にする
    const x1=RNG(-3,3), y1=a*x1+b;
    return {
      level:3,
      label:'次の条件をみたす1次関数の式を求めなさい',
      display:`直線 \\(${eqLatex(a2,b2)}\\) に平行で、点 \\((${x1},\\ ${y1})\\) を通る`,
      extra:'', inputs:INPUTS, answers:[a,b], answerLatex:answerLatex(a,b),
      hints:[
        `平行な直線どうしは傾きが等しい。だから傾きは \\(${a}\\)。`,
        `\\(y=${a}x+b\\) に \\((${x1},${y1})\\) を代入。`,
        `\\(b=${b}\\)。答えは \\(${answerLatex(a,b)}\\)`
      ],
      solution:`平行 → 傾き ${a}。代入して \\(b=${b}\\)。よって \\(${answerLatex(a,b)}\\)`
    };
  }else if(t==='rate'){
    const x1=RNG(-3,3), y1=a*x1+b;
    return {
      level:3,
      label:'次の条件をみたす1次関数の式を求めなさい',
      display:`変化の割合が \\(${a}\\) で、\\(x=${x1}\\) のとき \\(y=${y1}\\)`,
      extra:'', inputs:INPUTS, answers:[a,b], answerLatex:answerLatex(a,b),
      hints:[
        `変化の割合は傾きと同じ。だから傾きは \\(${a}\\)。`,
        `\\(y=${a}x+b\\) に \\(x=${x1},y=${y1}\\) を代入。`,
        `\\(b=${b}\\)。答えは \\(${answerLatex(a,b)}\\)`
      ],
      solution:`変化の割合＝傾き ${a}。代入して \\(b=${b}\\)。よって \\(${answerLatex(a,b)}\\)`
    };
  }else{
    // 切片が b で点を通る → a を求める
    const x1=pick([-3,-2,2,3]); const y1=a*x1+b;
    return {
      level:3,
      label:'次の条件をみたす1次関数の式を求めなさい',
      display:`切片が \\(${b}\\) で、点 \\((${x1},\\ ${y1})\\) を通る`,
      extra:'', inputs:INPUTS, answers:[a,b], answerLatex:answerLatex(a,b),
      hints:[
        `切片が ${b} だから \\(${eqLatex('a',b)}\\) と書ける。`,
        `点 \\((${x1},${y1})\\) を代入：\\(${y1}=a\\times(${x1})${b<0?`-${-b}`:`+${b}`}\\) から \\(a\\) を求めよう。`,
        `\\(a=${a}\\)。答えは \\(${answerLatex(a,b)}\\)`
      ],
      solution:`\\(${eqLatex('a',b)}\\) に \\((${x1},${y1})\\) を代入して \\(a=${a}\\)。よって \\(${answerLatex(a,b)}\\)`
    };
  }
}

function generateSession(level,count=5){
  const gen=level===1?genLevel1:level===2?genLevel2:genLevel3;
  const out=[], seen=new Set(); let g=0;
  while(out.length<count && g<200){
    g++; const q=gen();
    const key=q.display+'|'+q.answerLatex;
    if(seen.has(key)) continue; seen.add(key); q.id=out.length; q.mode='equation'; out.push(q);
  }
  return out;
}
