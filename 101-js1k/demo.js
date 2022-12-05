$ = [
  `t = time_in_seconds`,
  `S = Math.sin`,
  `C = Math.cos`,
  `T = Math.tan`,
  `N = Math.random`
];
a.insertAdjacentHTML(`afterend`, `<pre><b><h1>DWITTER—SON1K\nAudio Visual LIVE coding environment for the Twitter generation\nShare the current URL 🐦</h1>AUDIO\n<input maxlength=140 id=ia size=140>\n\nVISUAL\n<input maxlength=140 id=iv size=140>\n\n${$.join('\n')}\na = A 512x256 canvas\nc = Its 2D context\nR = rgba-string method ex R(140,140,140,.5`);
R = (r, g, b, a = 1) => `rgba(${r|0},${g|0},${b|0},${a})`;

ia.value = atob(top.location.hash.slice(1)).split("\n")[0] || "return(N()*(q=Math.pow(1-t*2%1,8)+Math.pow(1-t/8%1,16)*8)+(t*(t&24|32)*[4,3,2,5,0,4,1,3][t*8&7]%1))/32";
iv.value = atob(top.location.hash.slice(1)).split("\n")[1] || "for(d=f=300;d-=.5;c.fillRect(256+d*C(A),128+d*S(A),d/9+q*q,d/9))A=N()*6.3,c.fillStyle=R(f*S(A+t*3+S(A*f/d+t)),f*S(A*5-t*3),d)";

(oninput = t => {
  fa = eval(`(${$})=>{try{${ia.value}}catch(e){}}`);
  fv = eval(`(${$})=>{try{${iv.value}}catch(e){}}`);
  top.location.hash = btoa(ia.value + "\n" + iv.value)
})($a = new AudioContext);

with($a.createScriptProcessor(4096, ($f = t => {
  requestAnimationFrame($f, fv(t / 1000))
})($t = 0), 1))
  connect($a.destination), onaudioprocess = t => {
    for (t = t.outputBuffer.getChannelData(value = 0); value < 4096;)
      t[value++] = fa($t += 1 / $a.sampleRate)
  }