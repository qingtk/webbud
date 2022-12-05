// TINY SKI
// By Frank Force - 2019

G=function(a)
{
    if (gameOver)
    {
        if (playerControls[13])
            X();
    }
    else
    {
        // update player
        p = playerPosLast, P = screenBuffer[height-playerHeight];
        P[p++] = ".";
        P[p++] = " ";
        P[p++] = ".";

        // shift the array
        screenBuffer.shift();
        trackMemory.shift();
        A();

        playerPos += m = playerControls[2] - playerControls[0];
        o = m? m<0? "/" : "\\" : "|";

        p = playerPos-1;
        playerPosLast = p;
        P = screenBuffer[height-playerHeight];
        P[p++] = "<b><font color=#0F0>"+o;
        P[p++] = "°";
        P[p++] = o + "</font></b>";

        // update track
        trackDirection=trackLeft<2?1:trackMaxWidth<=trackLeft+trackWidth?-1:R(50)?(R(2)?1:-1):trackDirection;
        trackLeft+=R(2)*trackDirection;

        if (R(9))
        {
            if (trackWidth<-30*trackWidthDirection & R(trackWidth-15) | 30<trackWidth*trackWidthDirection&R(45-trackWidth))
                trackWidthDirection *= -1;
            if ((R(2) & trackLeft > 1) | trackMaxWidth<trackLeft+trackWidth+trackWidthDirection)
                trackLeft-=trackWidthDirection;
            trackWidth+=trackWidthDirection;
        }

        // dump output
        o = "<nobr><font face=courier color=#FFF>"
        for(y=0;y<height;++y)
        {
            for(x=0;x<width;++x)
                o += screenBuffer[y][x];
            o += "<br>";
        }

        o += "<big><big><br>"
        o += "Record: " + bestDistance + " meters<br><br>";
        if (++distance-playerHeight > bestDistance)
            o += "New Record!<br>";

        if (distance > playerHeight+10 & (trackMemory[0][0] >= playerPos | trackMemory[0][1] < playerPos))
        {
            bestDistance = Math.max(distance-=playerHeight, bestDistance);
            o += "<b>" + distance + " meters<br>"
            gameOver = 1;
        }
        b.innerHTML = o;
    }

    b.style.backgroundColor = "#000";
    setTimeout(G,distance<99?50-distance/3:16);
}

X=function(a)
{
    trackMaxWidth = 112;
    trackLeft = 1;
    trackWidth = trackMaxWidth-3;
    trackDirection = 0;
    trackWidthDirection = -1;
    playerPos = trackMaxWidth/2;
    distance = -1;
    gameOver = 0;
}

A=function(a)
{
    var a = [], x = 0;
    while(x<trackLeft)
       a[x++] = R(9)? "▲" : ".";
    a[x++] = "⚫";
    while(x<trackLeft+trackWidth+1)
        a[x++] = distance<=bestDistance&distance>bestDistance-6 & (x+distance)%2?"x":distance%100?"&nbsp;":"-";
    a[x++] = "⚫";
    while(x<trackMaxWidth+2)
       a[x++] = R(9)? "▲" : ".";
    while(x<width)
        a[x++] = "";
    if (distance%10 == 0)
        a[trackMaxWidth+3] = distance;
        
    if (trackMemory.length < playerHeight)
        trackMemory[trackMemory.length] = [trackLeft, trackLeft+trackWidth];
    screenBuffer[screenBuffer.length] = a;
}

b.onkeydown = function(a) {playerControls[a.keyCode%37]=1;}
b.onkeyup = function(a) {playerControls[a.keyCode%37]=0;}
R=function(a){return !(Math.floor(Math.random() * 1000000) % a);}

var playerControls = [0,0,0], trackMemory = [], screenBuffer = [], width = 120, height = 30, playerHeight = 13, bestDistance = 5, trackMaxWidth, playerHeight, trackLeft, trackWidth, trackDirection, trackWidthDirection, playerPos, playerPosLast=0, distance, gameOver;

X();
setTimeout(G,16)
for (i = height+1; --i;) A();