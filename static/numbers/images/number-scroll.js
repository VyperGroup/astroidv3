var w,h,g,el,ratio,my={};function numberscrollMain(mode){this.version='0.792';this.mode=typeof mode!=='undefined'?mode:'int';w=600;h=150;var s="";s+='<div style="position:relative; width:'+w+'px; min-height:'+h+'px; border: none; border-radius: 20px; background-color: #def; margin:auto; display:block;">';s+='<canvas id="canvasId" style="position: absolute; width:'+w+'px; height:'+h+'px; left: 0; top:; border: none;"></canvas>';s+='<button id="reset" style="position: absolute; right:2px; top: 2px; color: #000aae; font-size: 14px; user-select: none;" class="togglebtn"  onclick="reset()" >Reset</button>';s+='<div id="keycount" style="font: bold 12px Arial; color: black; position:absolute; right:5px; bottom:3px;"></div>';s+='<div id="copyrt" style="font: 10px Arial; color: #6600cc; position:absolute; left:5px; bottom:3px;">&copy; 2020 MathsIsFun.com  v'+this.version+'</div>';s+='</div>';document.write(s);el=document.getElementById('canvasId');ratio=2;el.width=w*ratio;el.height=h*ratio;el.style.width=w+"px";el.style.height=h+"px";g=el.getContext("2d");g.setTransform(ratio,0,0,ratio,0,0);this.zoomInQ=true;my.marksQ=true
my.marks=[];my.t0=0;lt=40;wd=520;my.currX=w/2;yLn=70;mouseDownQ=false;shiftQ=false;window.addEventListener("keydown",onKey,false);el.addEventListener("mousemove",onmouseMove,false);el.addEventListener("mousedown",onMouseDown,false);el.addEventListener("mouseup",function(ev){mouseDownQ=false;shiftQ=ev.shiftKey;},false);el.addEventListener('touchstart',ontouchstart,false);el.addEventListener('touchmove',ontouchmove,false);el.addEventListener("mousewheel",onMouseWheel,false);coords=new CoordsFull(wd,200,'-1','-10,','11','10',true);tickSparseness=0.04;currFrame=0;maxFrames=10000;my.zoomCount=0;my.moveCount=0;keyCount=0;redraw();animate();}
function reset(){coords=new CoordsFull(wd,200,'-1','-10,','11','10',true);keyCount=0;my.marks=[];redraw();}
function animate(){var edge=60
if(mouseDownQ){if(my.currX<edge||my.currX>w-edge){var speed=1;if(my.currX<edge){speed=-(edge-my.currX)*0.0006;coords.moveRel(speed);}else{speed=(my.currX-(w-edge))*0.0006;coords.moveRel(speed);}
redraw();}else{}}
if(my.zoomCount>0){my.zoomCount--;doZoom(1);}
if(my.zoomCount<0){my.zoomCount++;doZoom(-1);}
if(my.moveCount>0){my.moveCount--;doMove(1);}
if(my.moveCount<0){my.moveCount++;doMove(-1);}
requestAnimationFrame(animate);}
function onKey(ev){keyCount++;var keyCode=ev.keyCode;switch(keyCode){case 38:case 104:case 87:my.zoomCount=-4;countQ=true;ev.preventDefault()
break;case 40:case 98:case 83:my.zoomCount=4;countQ=true;ev.preventDefault()
break;case 37:case 100:case 65:my.moveCount=-4;countQ=true;ev.preventDefault()
break;case 39:case 102:case 68:my.moveCount=4;countQ=true;ev.preventDefault()
break;case 16:break;default:console.log("key",keyCode);keyCount--;}
my.shiftQ=ev.shiftKey}
function doZoom(dirn){var rel=(my.currX-lt)/wd;rel=Math.max(Math.min(rel,1),0);if(dirn>0){coords.scale(1.02,rel);}else{coords.scale(0.98,rel);}
my.t0=performance.now();redraw();}
function doMove(dirn){if(dirn>0){coords.moveRel(0.015);}else{coords.moveRel(-0.015);}
my.t0=performance.now();redraw();}
function getTicks(){var majorTick=coords.xTickInterval(tickSparseness,true);var minorTick=coords.xTickInterval(tickSparseness,false);var minorTickEvery=majorTick.div(minorTick,0).getNumber();var majorNum=majorTick;var minorNum=majorNum.div(new Num(minorTickEvery.toString()),30);var curNum=coords.xStt;curNum=curNum.div(majorNum,0);curNum=curNum.sub(new Num("1"));curNum=curNum.mult(majorNum);var gap=num2pix(minorNum)-num2pix(new Num("0"));var textWd=majorNum.add(minorNum).fmt().length*9;var labelQ=(textWd<gap);var ticks=[];var tickCount=0;while(curNum.compare(coords.xEnd)<=0&&tickCount<100){tickCount++;var tick=curNum.clone();for(var minorTickNo=0;minorTickNo<minorTickEvery;minorTickNo++,tick=tick.add(minorNum)){if(tick.compare(coords.xStt)<0)
continue;if(tick.compare(coords.xEnd)>0)
continue;var tickPx=num2pix(tick);ticks.push([minorTickNo==0,minorTickNo,tickPx,tick.fmt(10)]);}
curNum=curNum.add(majorNum);}
return ticks;}
function redraw(){g.clearRect(0,0,el.width,el.height);drawNumLine();document.getElementById('keycount').innerHTML='keys: '+keyCount;}
function drawNumLine(){var ticks=getTicks();g.textAlign='center';g.lineWidth=1;var minV=Infinity;var maxV=-Infinity;var zeroPx=-999;for(var i=0;i<ticks.length;i++){var tick=ticks[i];var majorQ=tick[0];var vStr=tick[3];var v=Number(vStr);var xp=lt+tick[2];if(v>maxV)maxV=v;if(v<minV)minV=v;g.font='15px Arial';var clr='black';if(v<0)clr='red';if(v==0){zeroPx=xp;g.font='22px Arial';clr='black';}
if(v>0)clr='blue';g.strokeStyle=clr;g.fillStyle=clr;var txtY=35;if(vStr.length>5){var lastChr=vStr.replace(/0+$/,'').slice(-1);var evenQ=Number(lastChr)%2==0;if(!evenQ){txtY=55;}}
var tickHt=1;if(majorQ){g.lineWidth=2;tickHt=12;g.fillText(vStr,xp,yLn+txtY);}else{g.lineWidth=1;tickHt=8;}
g.beginPath();g.moveTo(xp,yLn-tickHt);g.lineTo(xp,yLn+tickHt);g.stroke();v+=1;}
if(zeroPx==-999){if(maxV<0)zeroPx=w;if(minV>0)zeroPx=-1;}
var lnStt=lt-25;var lnEnd=lt+wd+25;if(zeroPx>lnStt){g.strokeStyle='red';g.drawPipe(lnStt+10,yLn,Math.min(zeroPx,lnEnd-10),yLn,g.strokeStyle);}
if(zeroPx<lnEnd){g.strokeStyle='blue';g.drawPipe(Math.max(zeroPx,lnStt+10),yLn,lnEnd-10,yLn,g.strokeStyle);}
g.fillStyle=zeroPx>lnStt?'red':'blue';g.beginPath();g.drawArrow(lt-35,yLn,30,2,45,25,Math.PI);g.fill();g.fillStyle=zeroPx>lnEnd?'red':'blue';g.beginPath();g.drawArrow(lt+wd+35,yLn,30,2,45,25,0);g.fill();if(my.marksQ){g.fillStyle='#aa0';g.strokeStyle=g.fillStyle;g.font='bold 17px Arial';g.lineWidth=2;for(i=0;i<my.marks.length;i++){var mark=my.marks[i];var rel=coords.num2Rel(mark[0]);if(rel>0&&rel<1){var xp=lt+rel*wd;g.fillText(mark[1],xp,yLn-35);g.beginPath();g.moveTo(xp,yLn);g.lineTo(xp,yLn-30);g.stroke();g.drawArrow(xp,yLn,20,2,20,10,3*Math.PI/2);g.fill();}}}}
function num2pix(num){return(num.sub(coords.xStt).getNumber()/coords.xEnd.sub(coords.xStt).getNumber()*coords.width);}
function pix2num(pix){return(coords.xStt.getNumber()+pix/coords.width*(coords.xEnd.getNumber()-coords.xStt.getNumber()));}
function clearMarks(){my.marks=[];go();document.getElementById('clearBtn').style.visibility='hidden';}
function ontouchstart(ev){var touch=ev.targetTouches[0];ev.clientX=touch.clientX;ev.clientY=touch.clientY;ev.touchQ=true;onmouseDown(ev)}
function ontouchmove(ev){var touch=ev.targetTouches[0];ev.clientX=touch.clientX;ev.clientY=touch.clientY;ev.touchQ=true;onmouseMove(ev);ev.preventDefault();}
function ontouchend(ev){el.addEventListener('touchstart',ontouchstart,false);window.removeEventListener("touchend",ontouchend,false);}
function onmouseMove(ev){var bRect=el.getBoundingClientRect();var mouseX=(ev.clientX-bRect.left)*(el.width/ratio/bRect.width);var mouseY=(ev.clientY-bRect.top)*(el.height/ratio/bRect.height);my.currX=mouseX;}
function onMouseDown(ev){var bRect=el.getBoundingClientRect();var mouseX=(ev.clientX-bRect.left)*(el.width/ratio/bRect.width);var mouseY=(ev.clientY-bRect.top)*(el.height/ratio/bRect.height);my.currX=mouseX;if(my.currX<50||my.currX>w-50){mouseDownQ=true;}else{var rel=(my.currX-lt)/wd;rel=Math.max(Math.min(rel,1),0);var xRel=coords.rel2Num(rel);var x1dec=Number(xRel.fmt()).toFixed(1);var xNew=new Num(x1dec);my.marks.push([xNew,x1dec]);redraw();}}
function onMouseWheel(ev){var delta=Math.max(-1,Math.min(1,(ev.wheelDelta||-ev.detail)));my.zoomCount-=delta*5;ev.preventDefault()
return false;}
function toggleZoomIn(){this.zoomInQ=!this.zoomInQ;var div=document.getElementById('zoom');if(this.zoomInQ){div.innerHTML='Zoom In';}else{div.innerHTML='Zoom Out';}}
function Point(x,y){this.x=x;this.y=y;}
Point.prototype.set=function(x,y){this.x=x;this.y=y;};CanvasRenderingContext2D.prototype.drawArrow=function(x0,y0,totLen,shaftHt,headLen,headHt,angle,sweep,invertQ){var g=this;var pts=[[0,0],[-headLen,-headHt/2],[-headLen+sweep,-shaftHt/2],[-totLen,-shaftHt/2],[-totLen,shaftHt/2],[-headLen+sweep,shaftHt/2],[-headLen,headHt/2],[0,0]];if(invertQ){pts.push([0,-headHt/2],[-totLen,-headHt/2],[-totLen,headHt/2],[0,headHt/2]);}
for(var i=0;i<pts.length;i++){var cosa=Math.cos(-angle);var sina=Math.sin(-angle);var xPos=pts[i][0]*cosa+pts[i][1]*sina;var yPos=pts[i][0]*sina-pts[i][1]*cosa;if(i==0){g.moveTo(x0+xPos,y0+yPos);}else{g.lineTo(x0+xPos,y0+yPos);}}};function CoordsFull(width,height,xStt,yStt,xEnd,yEnd,uniScaleQ){this.maxDigits=30;this.width=width;this.height=height;this.xStt=new Num(xStt.toString());this.yStt=new Num(yStt.toString());this.xEnd=new Num(xEnd.toString());this.yEnd=new Num(yEnd.toString());this.uniScaleQ=uniScaleQ;this.calcScale();}
CoordsFull.prototype.setCoords=function(xStt,yStt,xEnd,yEnd,uniScaleQ){this.xStt=new Num(xStt.toString());this.yStt=new Num(yStt.toString());this.xEnd=new Num(xEnd.toString());this.yEnd=new Num(yEnd.toString());this.uniScaleQ=uniScaleQ;calcScale();};CoordsFull.prototype.update=function(){calcScale();};CoordsFull.prototype.rel2Num=function(rel){var relNum=new Num(rel.toString());return this.xStt.add(this.xEnd.sub(this.xStt).mult(relNum));};CoordsFull.prototype.num2Rel=function(num){var x0=this.xStt.getNumber();var xv=num.getNumber();var x1=this.xEnd.getNumber();return(xv-x0)/(x1-x0);};CoordsFull.prototype.scale=function(factor,mid){var factNum=new Num((factor-1).toString());var loNum=new Num((0-mid).toString());var hiNum=new Num((1-mid).toString());var rangeNum=this.xEnd.sub(this.xStt);this.xStt=this.xStt.add(rangeNum.mult(factNum).mult(loNum));this.xEnd=this.xEnd.add(rangeNum.mult(factNum).mult(hiNum));this.trimDigits();this.calcScale();};CoordsFull.prototype.moveRel=function(val){var moveNum=this.xEnd.sub(this.xStt).mult(new Num(val.toString()));this.xStt=this.xStt.add(moveNum);this.xEnd=this.xEnd.add(moveNum);this.trimDigits();this.calcScale();};CoordsFull.prototype.trimDigits=function(){this.xStt.trimDigits(this.maxDigits);this.xEnd.trimDigits(this.maxDigits);this.yStt.trimDigits(this.maxDigits);this.yEnd.trimDigits(this.maxDigits);};CoordsFull.prototype.calcScale=function(){var temp=new Num();if(this.xStt.compare(this.xEnd)>0){temp=this.xStt;this.xStt=this.xEnd;this.xEnd=temp;}
var xSpan=this.xEnd.sub(this.xStt);if(xSpan.compare(new Num("0"))<=0)xSpan.setNum("0.1");xScale=xSpan.div(new Num(this.width.toString()),10);};CoordsFull.prototype.toXVal=function(pix){return(xStt.add(xScale.mult(new Num(pix.toString())))).getNumber();};CoordsFull.prototype.toXNum=function(pix){return(xStt.add(xScale.mult(new Num(pix.toString()))));};CoordsFull.prototype.xTickInterval=function(tickSparseness,majorQ){return this.tickInterval(this.xEnd.sub(this.xStt).mult(new Num(tickSparseness.toString())),majorQ);};CoordsFull.prototype.yTickInterval=function(tickSparseness,majorQ){return this.tickInterval(this.yEnd.sub(this.yStt).mult(new Num(tickSparseness.toString())),majorQ);};CoordsFull.prototype.tickInterval=function(span,majorQ){var mantissa=span.getSci()[0];var intervals=[[7,10,1],[3,1,1],[2,1,0.5],[1,1,0.1]];for(var i=0;i<intervals.length;i++){var interval=intervals[i];if(mantissa>=interval[0]||i==intervals.length-1){break;}}
if(majorQ){result=interval[1];}else{result=interval[2];}
var num=new Num(result.toString());num=num.mult10(span.getSci()[1]+1);return num;};function Num(s,base){s=typeof s!=='undefined'?s:'';base=typeof base!=='undefined'?base:10;this.sign=1;this.digits="";this.dec=0;this.MAXDEC=20;this.baseDigits="0123456789ABCDEFGHJKLMNP";this.setNum(s,base);}
Num.prototype.setNum=function(s,base){base=typeof base!=='undefined'?base:10;if(s==0){this.digits='0';return;}
if(base==10){var digits=s;if(digits.charAt(0)=="-"){this.sign=-1;digits=digits.substring(1);}else{this.sign=1;}
var eVal=0;var ePos=digits.indexOf("e");if(ePos>=0){eVal=(digits.substr(ePos+1))>>0;digits=digits.substr(0,ePos);}
this.dec=digits.length-(digits.indexOf(".")+1);if(this.dec==digits.length){this.dec=0;}
this.dec-=eVal;digits=digits.split(".").join("");digits=digits.replace(/^0+/,'');if(digits.length==0){this.sign=1;}else{var s1="";for(var i=0;i<digits.length;i++){var digit=digits.charAt(i);if(this.baseDigits.indexOf(digit)>=0){s1+=digit;}}
digits=s1;}
this.digits=digits;}else{this.setFromBase(s,base);}};Num.prototype.setFromBase=function(numStr,base){var srcSign="";if(numStr.charAt(0)=="-"){srcSign="-";numStr=numStr.substring(1);}
var baseDec=numStr.length-(numStr.indexOf(".")+1);if(baseDec==numStr.length){baseDec=0;}
numStr=numStr.split(".").join("");numStr=numStr.replace(/^0+/,'');if(numStr.length==0){this.setNum("0");}else{var i=0;var len=numStr.length;var baseStr=base.toString();var digit=this.baseDigits.indexOf(numStr.charAt(i++).toUpperCase()).toString();var result=digit;while(i<len){digit=this.baseDigits.indexOf(numStr.charAt(i++).toUpperCase()).toString();result=this.fullMultiply(result,baseStr);result=this.fullAdd(result,digit);}
if(baseDec>0){var divBy=this.fullPower(baseStr,baseDec);result=this.fullDivide(result,divBy,this.MAXDEC);}
this.setNum(srcSign+result);}};Num.prototype.toBase=function(base,places){var parts=this.splitWholeFrac();var s=this.fullBaseWhole(parts[0],base);if(parts[1].length>0){s+="."+this.fullBaseFrac(parts[1],base,places);}
if(this.sign==-1){if(s!="0"){s="-"+s;}}
return s;};Num.prototype.getNumber=function(){return Number(this.fmt(10,0));};Num.prototype.mult10=function(n){var xNew=this.clone();xNew.dec=xNew.dec-n;if(xNew.dec<0){xNew.digits=xNew.digits+"0".repeat(-xNew.dec);xNew.dec=0;}
return xNew;};Num.prototype.clone=function(){var ansNum=new Num();ansNum.digits=this.digits;ansNum.dec=this.dec;ansNum.sign=this.sign;return ansNum;};Num.prototype.mult=function(num){return this.multNums(this,num);};Num.prototype.fullMultiply=function(x,y){return this.multNums(new Num(x),new Num(y)).fmt();};Num.prototype.multNums=function(xNum,yNum){var N1=xNum.digits;var N2=yNum.digits;var ans="0";for(var i=N1.length-1;i>=0;i--){ans=this.fullAdd(ans,(this.fullMultiply1(N2,N1.charAt(i))+"0".repeat(N1.length-i-1)));}
var ansNum=new Num(ans);ansNum.dec=xNum.dec+yNum.dec;ansNum.sign=xNum.sign*yNum.sign;return ansNum;};Num.prototype.fullMultiply1=function(x,y1){var carry="0";var ans="";for(var i=x.length-1;i>(-1);i--){var product=((x.charAt(i))>>0)*(y1>>0)+(carry>>0);var prodStr=product.toString();if(product<10){prodStr="0"+prodStr;}
carry=prodStr.charAt(0);ans=prodStr.charAt(1)+ans;}
if(carry!="0"){ans=carry+ans;}
return ans;};Num.prototype.fullMultiplyInt=function(x,y){var xLen=x.length;var yLen=y.length;if(xLen==0)return "0";if(yLen==0)return "0";if(xLen+yLen<=9){return(parseInt(x)*parseInt(y)).toString();}
var maxLen=Math.max(xLen,yLen);var split=Math.ceil(maxLen/2);if(xLen<yLen){var temp=x;x=y;y=temp;var tInt=xLen;xLen=yLen;yLen=tInt;}
var xSplit=xLen-split;var x0;var x1;x0=x.substr(xSplit,split);x1=x.substr(0,xSplit);var ySplit=yLen-split;var y0;var y1;var ans="0";if(ySplit<=0){var w2=this.fullMultiplyInt(x0,y);var w1=this.fullMultiplyInt(x1,y);w1=w1+'0'.repeat(split);ans=this.fullAdd(w1,w2);}else{y0=y.substr(ySplit,split);y1=y.substr(0,ySplit);var z0=this.fullMultiplyInt(x1,y1);var z2=this.fullMultiplyInt(x0,y0);var z1=this.fullMultiplyInt(this.fullAdd(x1,x0),this.fullAdd(y1,y0));z1=this.fullSubtract(z1,z2);z1=this.fullSubtract(z1,z0);z0=z0+'0'.repeat(split*2);z1=z1+'0'.repeat(split);ans=this.fullAdd(this.fullAdd(z0,z1),z2);}
return ans;};Num.prototype.abs=function(){var ansNum=this.clone();ansNum.sign=1;return ansNum;};Num.prototype.fullAdd=function(x,y){return this.addNums(new Num(x),new Num(y)).fmt(10);};Num.prototype.add=function(num){return this.addNums(this,num);};Num.prototype.addNums=function(xNum,yNum){var ansNum=new Num();if(xNum.sign*yNum.sign==-1){ansNum=this.subNums(xNum.abs(),yNum.abs());if(xNum.sign==-1){ansNum.sign*=-1;}
return ansNum;}
var maxdec=Math.max(xNum.dec,yNum.dec);var xdig=xNum.digits+"0".repeat(maxdec-xNum.dec);var ydig=yNum.digits+"0".repeat(maxdec-yNum.dec);var maxlen=Math.max(xdig.length,ydig.length);xdig="0".repeat(maxlen-xdig.length)+xdig;ydig="0".repeat(maxlen-ydig.length)+ydig;var ans="";var carry=0;for(var i=xdig.length-1;i>=0;i--){var temp=((xdig.charAt(i))>>0)+((ydig.charAt(i))>>0)+carry;if((temp>=0)&&(temp<20)){if(temp>9){carry=1;ans=temp-10+ans;}else{carry=0;ans=temp+ans;}}}
if(carry==1){ans="1"+ans;}
ansNum.setNum(ans);ansNum.sign=xNum.sign;ansNum.dec=maxdec;return ansNum;};Num.prototype.fullPower=function(x,n){return this.expNums(new Num(x),n).fmt();};Num.prototype.expNums=function(xNum,nInt){var n=nInt;var b2pow=0;while((n&1)==0){b2pow++;n>>=1;}
var x=xNum.digits;var r=x;while((n>>=1)>0){x=this.fullMultiply(x,x);if((n&1)!=0){r=this.fullMultiply(r,x);}}
while(b2pow-->0){r=this.fullMultiply(r,r);}
var ansNum=new Num(r);ansNum.dec=xNum.dec*nInt;return ansNum;};Num.prototype.div=function(num,decimals){return this.divNums(this,num,decimals);};Num.prototype.fullDivide=function(x,y,decimals){return this.divNums(new Num(x),new Num(y),decimals).fmt();};Num.prototype.divNums=function(xNum,yNum,decimals){decimals=typeof decimals!=='undefined'?decimals:this.MAXDEC;if(xNum.digits.length==0){return new Num("0");}
if(yNum.digits.length==0){return new Num("0");}
var xDec=xNum.mult10(decimals);var fullDec=Math.max(xDec.dec,yNum.dec);var xdig=xDec.digits+"0".repeat(fullDec-xDec.dec);var ydig=yNum.digits+"0".repeat(fullDec-yNum.dec);xdig=xdig.replace(/^0+/,'');if(this.compareDigits(xdig,"0")==0){return new Num("0");}
ydig=ydig.replace(/^0+/,'');if(this.compareDigits(ydig,"0")==0){return new Num("0");}
var timestable=[];timestable.push("0");timestable.push(ydig);var tdig=ydig;for(var i=2;i<10;i++){tdig=this.fullAdd(tdig,ydig);timestable.push(tdig);}
var ans="0";var xNew=xdig;var n=0;while(this.compareDigits(xNew,ydig)>=0){var col=1;while(this.compareDigits(xNew.substring(0,col),ydig)<0){col++;}
var xCurr=xNew.substring(0,col);var mult=9;while(this.compareDigits(timestable[mult],xCurr)>0){mult--;}
var fullmult=mult+""+"0".repeat(xNew.length-xCurr.length);ans=this.fullAdd(ans,fullmult);xNew=this.fullSubtract(xNew,this.fullMultiply(ydig,fullmult));if(n++>100){console.log("runaway code divNums");break;}}
var ansNum=new Num(ans);ansNum.dec=decimals;ansNum.sign=xNum.sign*yNum.sign;return ansNum;};Num.prototype.sub=function(num){return this.subNums(this,num);};Num.prototype.fullSubtract=function(x,y){return this.subNums(new Num(x),new Num(y)).fmt();};Num.prototype.subNums=function(xNum,yNum){var ansNum=new Num();if(xNum.sign*yNum.sign==-1){ansNum=xNum.abs().add(yNum.abs());if(xNum.sign==-1){ansNum.sign*=-1;}
return ansNum;}
var maxdec=Math.max(xNum.dec,yNum.dec);var xdig=xNum.digits+"0".repeat(maxdec-xNum.dec);var ydig=yNum.digits+"0".repeat(maxdec-yNum.dec);var maxlen=Math.max(xdig.length,ydig.length);xdig="0".repeat(maxlen-xdig.length)+xdig;ydig="0".repeat(maxlen-ydig.length)+ydig;var sign=this.compareDigits(xdig,ydig);if(sign==0){return new Num("0");}
if(sign==-1){var temp=xdig;xdig=ydig;ydig=temp;}
var ans="";var isborrow=0;for(var i=xdig.length-1;i>=0;i--){var xPiece=(xdig.charAt(i))>>0;var yPiece=(ydig.charAt(i))>>0;if(isborrow==1){isborrow=0;xPiece=xPiece-1;}
if(xPiece<0){xPiece=9;isborrow=1;}
if(xPiece<yPiece){xPiece=xPiece+10;isborrow=1;}
ans=(xPiece-yPiece)+ans;}
ansNum.setNum(ans);ansNum.sign=sign*xNum.sign;ansNum.dec=maxdec;return ansNum;};Num.prototype.fmt=function(sigDigits,eStt){sigDigits=typeof sigDigits!=='undefined'?sigDigits:0;eStt=typeof eStt!=='undefined'?eStt:0;var decWas=this.dec;var digitsWas=this.digits;if(this.digits.length<sigDigits){this.dec+=sigDigits-this.digits.length;this.digits+=strRepeat("0",sigDigits-this.digits.length);}
var s=this.digits;var decpos=s.length-this.dec;var roundQ=false;var roundType="5up";if(roundQ){if(this.digits.length>sigDigits){var cutDigit="";if(sigDigits>=0){s=this.digits.substr(0,sigDigits);cutDigit=this.digits.charAt(sigDigits);}else{s="";cutDigit="";}
switch(roundType){case "5up":if(cutDigit>"5"||(cutDigit=="5"&&this.sign==1)){s=this.fullAdd(s,"1",10);}
break;case "5down":if(cutDigit>"5"||(cutDigit=="5"&&this.sign==-1)){s=fullAdd(s,"1");}
break;case "5away0":if(cutDigit>="5"){s=fullAdd(s,"1");}
break;case "5to0":if(cutDigit>"5"){s=fullAdd(s,"1");}
break;case "5even":if(cutDigit>"5"){s=fullAdd(s,"1");}else{if(cutDigit=="5"){if((parseInt(s.charAt(s.length-1))&1)!=0){s=fullAdd(s,"1");}}}
break;case "5odd":if(cutDigit>"5"){s=fullAdd(s,"1");}else{if(cutDigit=="5"){if((parseInt(s.charAt(s.length-1))&1)==0){s=fullAdd(s,"1");}}}
break;case "floor":if(sigDigits<0){decpos-=sigDigits;if(this.sign==-1){s="1";}else{s="";}}else{if(this.sign==-1){if(Strings.trimLeft(digits.substr(sigDigits),"0").length!=0){s=fullAdd(s,"1");}}}
break;case "ceiling":if(sigDigits<0){decpos-=sigDigits;if(this.sign==1){s="1";}else{s="";}}else{if(this.sign==1){if(Strings.trimLeft(digits.substr(sigDigits),"0").length!=0){s=fullAdd(s,"1");}}}
break;default:}
if(s.length>sigDigits){if(sigDigits>0)
s=s.substr(0,sigDigits);decpos++;}
if(s.length==0){s="0";}else{if(decpos-sigDigits>0)
s+="0".repeat(decpos-sigDigits);}}}
var eVal=decpos-1;if(eStt>0&&Math.abs(eVal)>=eStt){var s1=s.substr(0,1)+"."+s.substr(1);s1=s1.replace(/0+$/,'');if(s1.charAt(s1.length-1)=="."){s1=s1.substr(0,s1.length-1);}
if(eVal>0){s=s1+"e+"+eVal;}else{s=s1+"e"+eVal;}}else{if(decpos<0){s="0."+"0".repeat(-decpos)+s;}else if(decpos==0){s="0."+s;}else if(decpos>0){if(this.dec>=0){s=s.substr(0,decpos)+"."+s.substr(decpos,this.dec);}else{s=s+"0".repeat(-this.dec)+".";}}
if(s.indexOf(".")>=0){s=s.replace(/0+$/,'');}
if(s.charAt(s.length-1)=="."){s=s.substring(0,s.length-1);}}
if(this.sign==-1){if(s!="0"){s="-"+s;}}
this.dec=decWas;this.digits=digitsWas;return s;};Num.prototype.compare=function(yNum){return this.compareNums(this,yNum);};Num.prototype.compareNums=function(xNum,yNum){if(xNum.digits.length==0)
xNum.sign=1;if(yNum.digits.length==0)
yNum.sign=1;if(xNum.sign==1&&yNum.sign==-1){return 1;}
if(xNum.sign==-1&&yNum.sign==1){return-1;}
var maxdec=Math.max(xNum.dec,yNum.dec);var xdig=xNum.digits+strRepeat("0",maxdec-xNum.dec);var ydig=yNum.digits+strRepeat("0",maxdec-yNum.dec);var maxlen=Math.max(xdig.length,ydig.length);xdig=strRepeat("0",maxlen-xdig.length)+xdig;ydig=strRepeat("0",maxlen-ydig.length)+ydig;for(var i=0;i<xdig.length;i++){if(xdig.charAt(i)<ydig.charAt(i)){return-1*xNum.sign;}
if(xdig.charAt(i)>ydig.charAt(i)){return 1*xNum.sign;}}
return 0;};Num.prototype.compareDigits=function(x,y){if(x.length>y.length){return 1;}
if(x.length<y.length){return-1;}
for(var i=0;i<x.length;i++){if(x.charAt(i)<y.charAt(i)){return-1;}
if(x.charAt(i)>y.charAt(i)){return 1;}}
return 0;};Num.prototype.splitWholeFrac=function(){var s=this.digits;var decpos=s.length-this.dec;if(decpos<0){s="0".repeat(-decpos)+s;decpos=0;}
if(this.dec<0){s=s+"0".repeat(-this.dec)+".";}
var wholePart=s.substr(0,decpos);var fracPart=s.substr(decpos);if(fracPart.replace(/^0+/,'').length==0){fracPart="";}else{fracPart="0."+fracPart;}
return[wholePart,fracPart];};Num.prototype.fullBaseWhole=function(d,base){var baseStr=base.toString();var dWhole=this.fullDivide(d,baseStr,0);var dRem=this.fullSubtract(d,this.fullMultiply(dWhole,baseStr));if(dWhole=="0"){return this.baseDigits.charAt(dRem>>0);}else{return this.fullBaseWhole(dWhole,base)+this.baseDigits.charAt(dRem>>0);}};Num.prototype.fullBaseFrac=function(d,base,places,level){level=typeof level!=='undefined'?level:0;var r=this.fullMultiply(d,base.toString());var parts=r.split(".");var wholePart=parts[0];if(parts.length==1||level>=places-1){return this.baseDigits.charAt(wholePart>>0);}else{var fracPart="0."+parts[1];return this.baseDigits.charAt(wholePart>>0)+this.fullBaseFrac(fracPart,base,places,level+1);}};Num.prototype.getSignStr=function(){if(this.sign==-1){return "-";}else{return "";}};Num.prototype.getWholeStr=function(){var s=this.digits;var decpos=s.length-this.dec;if(decpos<0){s="0".repeat(-decpos)+s;decpos=0;}
if(this.dec<0){s=s+"0".repeat(-this.dec)+".";}
return s.substr(0,decpos);};Num.prototype.getDecStr=function(){var s=this.digits;var decpos=s.length-this.dec;if(decpos<0){s="0".repeat(-decpos)+s;decpos=0;}
if(this.dec<0){s=s+"0".repeat(-this.dec)+".";}
return s.substr(decpos);};Num.prototype.fullProdSeq=function(n0,n1){if(n0==n1)return n1.toString();var nMid=((n1+n0)/2)<<0;return(this.fullMultiplyInt(this.fullProdSeq(n0,nMid),this.fullProdSeq(nMid+1,n1)));};Num.prototype.getSci=function(){var len=this.digits.length;var s=this.digits.substr(0,1)+"."+this.digits.substr(1);s=s.replace(/0+$/,'');if(s.charAt(s.length-1)=="."){s=s.substr(0,s.length-1);}
if(this.sign==-1){s="-"+s;}
return[s,len-this.dec-1];};Num.prototype.fullCombPerm=function(n,r,orderQ,replaceQ){var i=1;var s="";if(orderQ){if(replaceQ){s=this.fullPower(n.toString(),r);}else{if(r>n){s="";}else{s=this.fullProdSeq(n-r+1,n);}}}else{var tops=[];var bots=[];if(replaceQ){if(false){}else{for(i=n;i<=n+r-1;i++){tops.push(i);}
for(i=2;i<=r;i++){bots.push(i);}}}else{if(r>n){s="";}else{if(r<n-r){for(i=n-r+1;i<=n;i++){tops.push(i);}
for(i=2;i<=r;i++){bots.push(i);}}else{for(i=n-(n-r)+1;i<=n;i++){tops.push(i);}
for(i=2;i<=n-r;i++){bots.push(i);}}}}
cancelFrac(tops,bots);s="1";for(i=0;i<tops.length;i++){s=this.fullMultiplyInt(s,tops[i].toString());}}
return s;};Num.prototype.trimDigits=function(trimToLen){if(this.digits.length>trimToLen){var origLen=this.digits.length;this.digits=this.digits.substr(0,trimToLen);this.dec-=(origLen-this.digits.length);}};function strRepeat(chr,count){var s="";while(count>0){s+=chr;count-=1;}
return s;}
function toggleFullScreen(){if((document.fullScreenElement&&document.fullScreenElement!==null)||(!document.mozFullScreen&&!document.webkitIsFullScreen)){if(document.documentElement.requestFullScreen){document.documentElement.requestFullScreen();}else if(document.documentElement.mozRequestFullScreen){document.documentElement.mozRequestFullScreen();}else if(document.documentElement.webkitRequestFullScreen){document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);}}else{if(document.cancelFullScreen){document.cancelFullScreen();}else if(document.mozCancelFullScreen){document.mozCancelFullScreen();}else if(document.webkitCancelFullScreen){document.webkitCancelFullScreen();}}}
CanvasRenderingContext2D.prototype.drawPipe=function(x0,y0,x1,y1,clr){var g=this;var alpha=[0.8,0.4,0.3,0.2,0.4,0.6,0.80];var size=alpha.length;for(var i=0;i<size;i++){for(var j=0;j<2;j++){if(j==0){g.strokeStyle='#ffffff';}else{g.strokeStyle=hex2rgba(clr,alpha[i]);}
var dist=(size/2-1/2-i)*0.8;g.beginPath();if(y0==y1){g.moveTo(x0,y0-dist);g.lineTo(x1,y1-dist);}
if(x0==x1){g.moveTo(x0+dist,y0);g.lineTo(x1+dist,y1);}
g.stroke();}}};function hex2rgba(hex,opacity){hex=hex.replace('#','');var r=parseInt(hex.substring(0,2),16);var g=parseInt(hex.substring(2,4),16);var b=parseInt(hex.substring(4,6),16);result='rgba('+r+','+g+','+b+','+opacity+')';return result;}