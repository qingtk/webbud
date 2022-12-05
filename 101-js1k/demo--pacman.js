//b.style.background = "#000";
// map
M=[g=8190, h=4226, h, h, g+1, l=4240, l,
  l=8094, 130, 130, k=159, j=144, j, 8176,
  j, j, k, j, j, g, h, h, 7423, j=1168,
  j, l, k=4098, k, g+1, f=t=0 ];
C=[];

// canvas trick
for(i in c) c[i[0]+i[6]] = c[i]
for(i in M) {
  // convert map numbers to binary
  m = M[i].toString(2).padStart(13,0);
  // duplicate and flip to build right half
  for(j in m) m+=m[m.length-j*2-1];
  M[i] = m.split('');
  C[i] = []
}
F = (x,y,w,h,p)=>{ c.fillStyle='#'+p;c.fc(x,y,w,h,p) }
N = r=>{
  //fill all in blue
  F(0,0,l,l,'009')
  for(i in M) for(j in M[i]){
    +M[i][j] && F(8+j*16, 8+i*16, 30, 30,111);
    if (r) {
      // reset map
      C[i][j] = +M[i][j];
      g=h=>({x:h,y:h,z:h,w:h,Z:h,W:h,d:(t++%4)+1,s:9})
      // 4 ghosts and pacman
      G=[g(25),g(5),g(0),g(17),g(16)]
      k=4
    }
  }
}

N(1)
c.lineWidth= 12;

onkeydown=e=>k=41-e.which; // <4 ^3 >2 v1 .0
setInterval(()=>{
  // draw map
  N()
  // draw food
  S = 298;
  for(i in M) for(j in M[i]){
   // if there's food in this cell, paint it and decrement counter
   C[i][j] && F(22+j*16, 22+i*16, 3, 3, 'eee', S--);
  }
  // draw score
  c.fx(S,220,220);
  for(i in G) with(G[i]){
    if (s>9){
      x = z;
      y = w;
      z -= d%2?0:d-3; // advance x
      w -= d%2?d-2:0; // advance y
      s = 0 // restart microstep counter
    }
    // pacman turning in intersections
    if (i == 4 && d != k){
      Z = x - (k%2?0:k-3);
      W = y - (k%2?k-2:0);
      if(+M[W][Z]){
        d = k;
        z = Z;
        w = W;
        s = 0
      }
    }
    if(w<0 || !+M[w][z]){
      z = x; w = y; // restore prev position
      d = i==4?k:(d+t)%4+1; // pseudo-random turn. This is all the AI there is :P
      s = 7
    }
    if(i<4) {
      // game over
      if (z==G[4].x && w==G[4].y) N(1)
      // draw ghosts
      c.ta(X=12 + (x + (z - x)*s/10) * 16, Y=10 + (y + (w - y)*s/10) * 16);
      //select color
      h=['f77','c70','d22','09c'][i]
      // body
      F(1,5,22,21,h);
      F(4,2,16,8,h);
      F(6,23,13,3,111); // gap between legs
      F(4,8,16,7,'FFF'); //white of eyes
      F(7,8,11,4,111); // pupils
      F(10,0,4,26,h); // top of head + eyes separation + middle leg
      c.ta(-X,-Y);
    }
    if(i==4) { // draw pacman
      // eat
      C[y][x] = 0;
      f = d%2?d/2:d%3;
      m = (t++/6)%2-1.1; // mouth animation
      if(m<0) m=-m; // abs
      c.strokeStyle='#ff0';
      c.ba();
      c.arc(22 + (x + (z - x)*s/10) * 16, 22 + (y + (w - y)*s/10) * 16, 5, 3.1*f+m, 3.1*f-m);
      c.stroke();
    }
    s++;
  }
}, 22)