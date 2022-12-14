///////////////////////////////////////////////////////////////////////////////
//
//  ZzFX - A zmall open zource zound fx maker for your java zcript gamez
//  
//  How to use.
//  - This ZzFX seed browser generates random cards each tied to a unique seed.
//  - Click on cards until you find one you like.
//  - You can click on the ZzFX logo to copy the last played seed or change it!
//  - Copy the below block between ZzFX START and ZzFX END in your game. 
//  - Play seeded sounds by calling z, as in z(3), or z(777)
//  - You can also call Z to have full control over sound generation
//  - If you dont want to use seeds, just include Z in your code.
//  - Variables used by ZzFX are ZzFfXRr, don't use them for anything else.
//  - This code is for you to use for whatever you want, make it awesome.
//
///////////////////////////////////////////////////////////////////////////////
//
//  MIT License
//  
//  Copyright (c) 2019 - Frank Force
//  
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//  
//  The above copyright notice and this permission notice shall be included in all
//  copies or substantial portions of the Software.
//  
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.
//
///////////////////////////////////////////////////////////////////////////////
// ZzFX START - start copying here to use ZzFX in your code!
///////////////////////////////////////////////////////////////////////////////
Z=function              // play a sound with full parameter control
(
    frequency,          // float frequency of note, 1 is ~ 2000 hz
    length,             // int length of sample, 1e5 is max (about 1 second)
    noise,              // int distortion amount, 0 is none
    attack,             // int how long to fade in before fading out
    modulation,         // float modulation frequency (warble), 0 is none
    modulationPhase     // float phase of modualtion (sine wave offset)
)
{
    // build the sample
    for(X=[], F=f=0; ++F < length; f += 1+R(noise))           // noise
    {
        X[F] = Math.cos(f * frequency *                       // frequency
            Math.cos(f * modulation + modulationPhase)) *     // modulation
            (F < attack ? F / attack:                         // attack
            1 - (F - attack)/(length - attack));              // decay
    }
    
    // create a buffer and play it
    F = ZzFX_context.createBuffer(1, 1e5, 1e5);
    F.getChannelData(0).set(X);
    X = ZzFX_context.createBufferSource();
    X.buffer = F;
    X.connect(ZzFX_context.destination);
    X.start();
}
z=function(seed)         // play sound from a seed
{
    X = R(5e3);          // tiny bit of frequency randomness
    r = randSeed;        // save rand seed
    randSeed = seed;     // set our seed
    R();R();             // warm it up first (so low seeds sound good)
    
    // play seeded sound
    Z(
        (R(1e5)+X)/1e6, // frequency 
        f=R(1e5),       // length
        R(9),           // noise
        R(f),           // attack
        R(1e5)/1e9,     // modulation frequency
        R(1e5)          // modulation phase
    );
    
    randSeed = r;      // restore rand seed
}
R=function(max)                      // random numbers, beween 0, and 1 less then max
{randSeed^=randSeed<<3;randSeed^=randSeed>>2;return max?randSeed%max:0;}
var ZzFX_context= new AudioContext,  // shared audio context (prevents running out)
randSeed = Date.now();               // starting used by random number generator
///////////////////////////////////////////////////////////////////////////////
// ZzFX END - stop copying here to use ZzFX in your code!
//
// the code below here is used for the rest of the my entry.
// it is free for you to use and remix, but it's not necessary for ZzFX
///////////////////////////////////////////////////////////////////////////////
//    ???                            ???                                        
//            ???   ???                         ???         ???             ???       
// ???        ???             ???          ???           ???        ???                 
//       ???    ???    ???                      ???                                 
//      ???          ???                    ???     ???    ???       ???                
    //           ??????  ???             ???                       ???          ???     
//  ???        ???               ???                ???       ???     ???               
//        ???     ???         ???              ???                                  
//     ???           ???   ???                ??? ???    ???       Brought to you by... 
//    ???   ???         ???  ???   ???         ???     ???           ??? Queens Gambit ???    
// ???             ???     ???   ???    ???      ???   ???       ??? queensgambit.3d2k.com  
/////////////////////////////////////////////////////////////////////////////// 

/////////////////////////////////////////////////////////////////////////////// 
// globals
var lastPlayedCard, mouseY=0, mouseX=0, titleSeed = Date.now(), cards=[];
    
/////////////////////////////////////////////////////////////////////////////// 
// sound card object
C=function(x, y, seed)
{
    this.U=function()   // update
    { 
        // check if card was clicked on
        //c.strokeStyle ="#F00";c.strokeRect(x-35,y-60,70,120); // debug
        if (Math.abs(mouseX - x) < 35 & Math.abs(mouseY - y) < 60)
        {
            lastPlayedCard = this;    // save last played card
            randSeed = Date.now();    // new random seed (for frequency randomness)
            z(seed);                  // play the sound
            mouseX = 0;               // need to click again
            titleSeed = randSeed;     // randomize title
        }
        
        randSeed = seed;                                      // set random seed
        Y(x,y, 99, 0, 0, lastPlayedCard==this?99:0, 9608);    // border
        Y(x,y, 85, R(99), R(99), R(99),9608);                 // background color
        for(i=3;--i;)
            Y(x, y-9, 58, R(99), R(99), R(99),9630, R(257));  // random icons
        T(x,y+35, 19, R(99), R(99), R(99), seed);             // seed text
    }       
    this.P=function()  // special update for last played card
    {
        // check if title was clicked on
        //c.strokeStyle ="#F00";c.strokeRect(20,30,240,99); // debug hit box
        if (Math.abs(mouseX - 140) < 120 & Math.abs(mouseY - 80) < 50)
        {
            z(seed);                  // play the sound
            k = prompt("ZzFX", seed); // popup with the seed
            z(seed = k?k:seed);       // set new seed if valid and play it
            mouseX = 0;               // need to click again
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
// presets - will be added to start of card list
//var presets = [   
//    // add your favorite presets here
//    
//    // some good 2 digit ones i picked out
//    
//    -7,-6,-5,-2,-1,1,2,3,4,5,6,7,7,8,9,
//    11,12,16,20,23,24,31,
//    35,36,38,39,40,41,42, 46,47,48,49,50,
//    51,54,55,56,58,59,60,65,66,69,70,
//    74,75,77,78,80,82,85, 86, 89, 90,91,92,95,99, 0
//];

// sound card layout builder
for(y=80, i=0; y<a.height-50; y+=130)
for(x=y<99?305:50; x<a.width-50; x+=85, ++i)
cards.push(new C(x,y, 

    //i < presets.length?presets[i]:  // uncomment to enable presets       
    R(1e4)                            // default random seed
    //R(1e6)                          // random 6 digit seeds        
    //-9+i                            // show all 2 digit seeds
));
    
/////////////////////////////////////////////////////////////////////////////// 
// main update loop
setInterval(G=function()
{
    if (lastPlayedCard)         // let last played card do it's special update
        lastPlayedCard.P();

    randSeed = titleSeed;
    for(i=9;i--;)             // draw random seeded background and ZzFX logo
    {
        Y(R(a.width), R(a.height), 999, R(99), R(99), R(99), 0,9999);
        T(135+R(9),80+R(9),90+R(9)*Math.cos(Date.now()/99),R(99), R(99), R(99),"ZzFX",);
    }
    
    // update & draw cards
    for(k = 0; k < cards.length; ++k) // optimize with for(c of cards)
        cards[k].U();
},16);
 
/////////////////////////////////////////////////////////////////////////////// 
// text rendering system
T = function(x, y, size, h, s, v, text) // draw text
{
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = size + "px a";
    c.fillStyle="hsl("+3.6*h+","+s+"%,"+v+"%)";
    c.fillText(text,x,y);
}
Y = function(x, y, size, h, s, v, char, r)  // draw character
{
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = size + "px a";
    c.fillStyle="hsl("+3.6*h+","+s+"%,"+v+"%)";
    c.fillText(String.fromCharCode(char + R(r)),x,y);
}

/////////////////////////////////////////////////////////////////////////////// 
// mouse input
onmousedown = function(x) { mouseX = x.clientX; mouseY = x.clientY; }

// End ZzFX Demo
///////////////////////////////////////////////////////////////////////////////