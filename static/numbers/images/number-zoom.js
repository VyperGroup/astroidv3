let w,h,g,el,ratio,my={};function numberzoomMain(mode){let version='0.793';this.mode=typeof mode!=='undefined'?mode:'int';w=600;h=150;my.opts={numsQ:true,ticksQ:true,fracsQ:false,fracType:''}
let s="";my.imgHome=(document.domain=='localhost')?'/mathsisfun/images/style/':'/images/style/'
s+='<div class="js" style="position:relative; width:'+w+'px; min-height:'+h+'px; border: none; border-radius: 20px; background-color: #def; margin:auto; display:block;">';s+='<div id="txts" style="position: absolute; width:'+w+'px; height:'+h+'px; left: 0; top:0; border: none; user-select: none;"></div>';s+='<canvas id="canvasId" style="position: absolute; width:'+w+'px; height:'+h+'px; left: 0; top:0; border: none;"></canvas>';s+='<div style="position: absolute; right:9px; top: 2px;">';s+='<button id="zoom" class="btn" style=""  onclick="toggleZoomIn()" >Zoom In</button>';s+='<button id="reset" class="btn" style=""  onclick="reset()" >Reset</button>';s+='<input id="options" class="btn" type="image" style="vertical-align: top;" src="'+my.imgHome+'gear.svg" onclick="optPop()" alt="Options" >';s+='</div>';s+='<div id="keycount" style="font: bold 12px Arial; color: black; position:absolute; right:7px; bottom:3px;"></div>';s+='<div style="font: 10px Arial; color: #6600cc; position:absolute; left:7px; bottom:3px;">&copy; 2021 MathsIsFun.com  v'+version+'</div>';s+=optPopHTML();s+='</div>';document.write(s);el=document.getElementById('canvasId');ratio=2;el.width=w*ratio;el.height=h*ratio;el.style.width=w+"px";el.style.height=h+"px";g=el.getContext("2d");g.setTransform(ratio,0,0,ratio,0,0);this.zoomInQ=true;my.marksQ=false
my.marks=[];my.t0=0;my.lt=40;my.wd=520;my.currX=w/2;my.mouseDownQ=false;my.shiftQ=false;window.addEventListener("keydown",onKey,false);window.addEventListener("keyup",function(ev){my.shiftQ=ev.shiftKey;},false);el.addEventListener("mousemove",function(ev){let bRect=el.getBoundingClientRect();my.currX=(ev.clientX-bRect.left)*(el.width/ratio/bRect.width);ev.preventDefault()},false);el.addEventListener("mousedown",function(ev){my.mouseDownQ=true;my.shiftQ=ev.shiftKey;},false);el.addEventListener("mouseup",function(ev){my.mouseDownQ=false;},false);el.addEventListener("touchmove",function(ev){let touch=ev.targetTouches[0];let bRect=el.getBoundingClientRect();my.currX=(touch.clientX-bRect.left)*(el.width/ratio/bRect.width);ev.preventDefault()},false);el.addEventListener("touchstart",function(ev){my.mouseDownQ=true;my.shiftQ=ev.shiftKey;},false);el.addEventListener("touchend",function(ev){my.mouseDownQ=false;},false);el.addEventListener("mousewheel",onMouseWheel,false);my.coords=new CoordsFull(my.wd,200,'-1','-10,','11','10',true);tickSparseness=0.04;currFrame=0;maxFrames=10000;my.zoomCount=0;my.moveCount=0;keyCount=0;redraw();animate();}
function reset(){my.coords=new CoordsFull(my.wd,200,'-1','-10,','11','10',true);keyCount=0;my.marks=[];redraw();}
function animate(){let edge=60
if(my.mouseDownQ){if(my.currX<edge||my.currX>w-edge){let speed=1;if(my.currX<edge){speed=-(edge-my.currX)*0.0006;my.coords.moveRel(speed);}else{speed=(my.currX-(w-edge))*0.0006;my.coords.moveRel(speed);}
redraw();}else{if(my.shiftQ||!this.zoomInQ){my.zoomCount=2;}else{my.zoomCount=-2;}}}
if(my.zoomCount>0){my.zoomCount--;doZoom(1);}
if(my.zoomCount<0){my.zoomCount++;doZoom(-1);}
if(my.moveCount>0){my.moveCount--;doMove(1);}
if(my.moveCount<0){my.moveCount++;doMove(-1);}
requestAnimationFrame(animate);}
function onKey(ev){keyCount++;let keyCode=ev.keyCode;let countQ=false
switch(keyCode){case 38:case 104:case 87:my.zoomCount=-4;countQ=true;ev.preventDefault()
break;case 40:case 98:case 83:my.zoomCount=4;countQ=true;ev.preventDefault()
break;case 37:case 100:case 65:my.moveCount=-4;countQ=true;ev.preventDefault()
break;case 39:case 102:case 68:my.moveCount=4;countQ=true;ev.preventDefault()
break;case 16:break;case 48:case 96:reset()
break;default:console.log("key",keyCode);keyCount--;}
my.shiftQ=ev.shiftKey}
function doZoom(dirn){let rel=(my.currX-my.lt)/my.wd;rel=Math.max(Math.min(rel,1),0);if(dirn>0){my.coords.scale(1.02,rel);}else{my.coords.scale(0.98,rel);}
my.t0=performance.now();redraw();}
function doMove(dirn){if(dirn>0){my.coords.moveRel(0.015);}else{my.coords.moveRel(-0.015);}
my.t0=performance.now();redraw();}
function ticksGet(){let majorTick=my.coords.xTickInterval(tickSparseness,true);let minorTick=my.coords.xTickInterval(tickSparseness,false);let minorTickEvery=majorTick.div(minorTick,0).getNumber();let majorNum=majorTick;let minorNum=majorNum.div(new Num(minorTickEvery.toString()),30);let curNum=my.coords.xStt;curNum=curNum.div(majorNum,0);curNum=curNum.sub(new Num("1"));curNum=curNum.mult(majorNum);let gap=num2pix(minorNum)-num2pix(new Num("0"));let textWd=majorNum.add(minorNum).fmt().length*9;let labelQ=(textWd<gap);let ticks=[];let tickCount=0;while(curNum.compare(my.coords.xEnd)<=0&&tickCount<100){tickCount++;let tick=curNum.clone();for(let minorTickNo=0;minorTickNo<minorTickEvery;minorTickNo++,tick=tick.add(minorNum)){if(tick.compare(my.coords.xStt)<0)
continue;if(tick.compare(my.coords.xEnd)>0)
continue;let tickPx=num2pix(tick);ticks.push({majorQ:minorTickNo==0,n:minorTickNo,px:tickPx,str:tick.fmt(10),wholeStr:tick.getWholeStr(),decStr:tick.getDecStr()});}
curNum=curNum.add(majorNum);}
return ticks;}
function redraw(){g.clearRect(0,0,el.width,el.height);numLineDraw();document.getElementById('keycount').innerHTML='keys: '+keyCount;}
function numLineDraw(){let ticks=ticksGet();let majorN=0
let lenSum=0
let decLenSum=0
for(let i=0;i<ticks.length;i++){let tick=ticks[i]
if(tick.majorQ){majorN++
lenSum+=tick.str.length
tick.decPart=tick.str.substr(tick.str.indexOf('.')+1)
decLenSum+=tick.decPart.length}}
let decLenAvg=decLenSum/majorN
g.textAlign='center';g.lineWidth=1;let minV=Infinity;let maxV=-Infinity;let zeroPx=-999;let yLn=70;let lblUpQ=true
let div=document.getElementById("txts");while(div.firstChild){div.removeChild(div.firstChild);}
for(let i=0;i<ticks.length;i++){let tick=ticks[i];let majorQ=tick.majorQ
let vStr=tick.str
let v=Number(vStr);let xp=my.lt+tick.px
if(v>maxV)maxV=v;if(v<minV)minV=v;g.font='15px Arial';let clr=(v<0)?'red':'blue'
if(v==0){zeroPx=xp;g.font='22px Arial';clr='black';}
g.strokeStyle=clr;g.fillStyle=clr;let tickHt=1;if(majorQ){g.lineWidth=2;tickHt=12;if(my.opts.numsQ){if(lenSum>50){let lastChr=vStr.replace(/0+$/,'').slice(-1);let evenQ=Number(lastChr)%2==0;if(tick.decPart.length<decLenAvg)evenQ=true
lblUpQ=evenQ}
let txtY=lblUpQ?35:55;if(my.opts.fracsQ&&tick.decStr.length>0){let numer=tick.decStr
let denom='1'+'0'.repeat(numer.length)
let fracStr=''
numer=numer.replace(/^0+/,'');if(numer.length>0){if(denom.length<16){let hcfVal=hcf(numer,denom);if(hcfVal>1){numer=Number(numer)/hcfVal
denom=Number(denom)/hcfVal}}else{}
fracStr=fracHTML(numer,denom)}
txtY=lblUpQ?12:40;txtDiv(tick.wholeStr+fracStr,xp,yLn+txtY)}else{g.fillText(vStr,xp,yLn+txtY);}}}else{g.lineWidth=1;tickHt=8;}
if(my.opts.ticksQ){g.beginPath();g.moveTo(xp,yLn-tickHt);g.lineTo(xp,yLn+tickHt);g.stroke();}
v+=1;}
if(zeroPx==-999){if(maxV<0)zeroPx=w;if(minV>0)zeroPx=-1;}
let lnStt=my.lt-25;let lnEnd=my.lt+my.wd+25;if(zeroPx>lnStt){g.strokeStyle='red';g.drawPipe(lnStt+10,yLn,Math.min(zeroPx,lnEnd-10),yLn,g.strokeStyle);}
if(zeroPx<lnEnd){g.strokeStyle='blue';g.drawPipe(Math.max(zeroPx,lnStt+10),yLn,lnEnd-10,yLn,g.strokeStyle);}
g.fillStyle=zeroPx>lnStt?'red':'blue';g.beginPath();g.drawArrow(my.lt-35,yLn,30,2,45,25,Math.PI);g.fill();g.fillStyle=zeroPx>lnEnd?'red':'blue';g.beginPath();g.drawArrow(my.lt+my.wd+35,yLn,30,2,45,25,0);g.fill();if(my.marksQ){g.fillStyle='#aa0';g.strokeStyle=g.fillStyle;g.font='bold 17px Arial';g.lineWidth=2;for(let i=0;i<my.marks.length;i++){let mark=my.marks[i];let rel=my.coords.num2Rel(mark[0]);if(rel>0&&rel<1){let xp=my.lt+rel*my.wd;g.fillText(mark[1],xp,yLn-35);g.beginPath();g.moveTo(xp,yLn);g.lineTo(xp,yLn-30);g.stroke();g.drawArrow(xp,yLn,20,2,20,10,3*Math.PI/2);g.fill();}}}}
function txtDiv(s,x,y){let div=document.createElement('div');div.innerHTML=s
let wd=w
div.style.position='absolute'
div.style.width=wd+'px'
div.style.left=x-wd/2+'px'
div.style.top=y+'px'
div.style.color='black'
div.style.textAlign='center'
let dad=document.getElementById('txts');dad.appendChild(div);}
function num2pix(num){return(num.sub(my.coords.xStt).getNumber()/my.coords.xEnd.sub(my.coords.xStt).getNumber()*my.coords.width);}
function pix2num(pix){return(my.coords.xStt.getNumber()+pix/my.coords.width*(my.coords.xEnd.getNumber()-my.coords.xStt.getNumber()));}
function clearMarks(){my.marks=[];go();document.getElementById('clearBtn').style.visibility='hidden';}
function onMouseWheel(ev){let delta=Math.max(-1,Math.min(1,(ev.wheelDelta||-ev.detail)));my.zoomCount-=delta*5;ev.preventDefault()
return false;}
function toggleZoomIn(){this.zoomInQ=!this.zoomInQ;let div=document.getElementById('zoom');if(this.zoomInQ){div.innerHTML='Zoom In';}else{div.innerHTML='Zoom Out';}}
function numsToggle(){my.opts.numsQ=!my.opts.numsQ;btnToggle("numsBtn",my.opts.numsQ);redraw()}
function ticksToggle(){my.opts.ticksQ=!my.opts.ticksQ
btnToggle("ticksBtn",my.opts.ticksQ);redraw()}
function fracsToggle(){my.opts.fracsQ=!my.opts.fracsQ
btnToggle("fracsBtn",my.opts.fracsQ);redraw()}
function btnToggle(btn,onq){console.log('btnToggle',btn,onq)
if(onq){document.getElementById(btn).classList.add("hi");document.getElementById(btn).classList.remove("lo");}else{document.getElementById(btn).classList.add("lo");document.getElementById(btn).classList.remove("hi");}}
function Point(x,y){this.x=x;this.y=y;}
Point.prototype.set=function(x,y){this.x=x;this.y=y;};CanvasRenderingContext2D.prototype.drawArrow=function(x0,y0,totLen,shaftHt,headLen,headHt,angle,sweep,invertQ){let g=this;let pts=[[0,0],[-headLen,-headHt/2],[-headLen+sweep,-shaftHt/2],[-totLen,-shaftHt/2],[-totLen,shaftHt/2],[-headLen+sweep,shaftHt/2],[-headLen,headHt/2],[0,0]];if(invertQ){pts.push([0,-headHt/2],[-totLen,-headHt/2],[-totLen,headHt/2],[0,headHt/2]);}
for(let i=0;i<pts.length;i++){let cosa=Math.cos(-angle);let sina=Math.sin(-angle);let xPos=pts[i][0]*cosa+pts[i][1]*sina;let yPos=pts[i][0]*sina-pts[i][1]*cosa;if(i==0){g.moveTo(x0+xPos,y0+yPos);}else{g.lineTo(x0+xPos,y0+yPos);}}};function CoordsFull(width,height,xStt,yStt,xEnd,yEnd,uniScaleQ){this.maxDigits=30;this.width=width;this.height=height;this.xStt=new Num(xStt.toString());this.yStt=new Num(yStt.toString());this.xEnd=new Num(xEnd.toString());this.yEnd=new Num(yEnd.toString());this.uniScaleQ=uniScaleQ;this.calcScale();}
CoordsFull.prototype.setCoords=function(xStt,yStt,xEnd,yEnd,uniScaleQ){this.xStt=new Num(xStt.toString());this.yStt=new Num(yStt.toString());this.xEnd=new Num(xEnd.toString());this.yEnd=new Num(yEnd.toString());this.uniScaleQ=uniScaleQ;calcScale();};CoordsFull.prototype.update=function(){calcScale();};CoordsFull.prototype.rel2Num=function(rel){let relNum=new Num(rel.toString());return this.xStt.add(this.xEnd.sub(this.xStt).mult(relNum));};CoordsFull.prototype.num2Rel=function(num){let x0=this.xStt.getNumber();let xv=num.getNumber();let x1=this.xEnd.getNumber();return(xv-x0)/(x1-x0);};CoordsFull.prototype.scale=function(factor,mid){let factNum=new Num((factor-1).toString());let loNum=new Num((0-mid).toString());let hiNum=new Num((1-mid).toString());let rangeNum=this.xEnd.sub(this.xStt);this.xStt=this.xStt.add(rangeNum.mult(factNum).mult(loNum));this.xEnd=this.xEnd.add(rangeNum.mult(factNum).mult(hiNum));this.trimDigits();this.calcScale();};CoordsFull.prototype.moveRel=function(val){let moveNum=this.xEnd.sub(this.xStt).mult(new Num(val.toString()));this.xStt=this.xStt.add(moveNum);this.xEnd=this.xEnd.add(moveNum);this.trimDigits();this.calcScale();};CoordsFull.prototype.trimDigits=function(){this.xStt.trimDigits(this.maxDigits);this.xEnd.trimDigits(this.maxDigits);this.yStt.trimDigits(this.maxDigits);this.yEnd.trimDigits(this.maxDigits);};CoordsFull.prototype.calcScale=function(){let temp=new Num();if(this.xStt.compare(this.xEnd)>0){temp=this.xStt;this.xStt=this.xEnd;this.xEnd=temp;}
let xSpan=this.xEnd.sub(this.xStt);if(xSpan.compare(new Num("0"))<=0)xSpan.setNum("0.1");xScale=xSpan.div(new Num(this.width.toString()),10);};CoordsFull.prototype.toXVal=function(pix){return(xStt.add(xScale.mult(new Num(pix.toString())))).getNumber();};CoordsFull.prototype.toXNum=function(pix){return(xStt.add(xScale.mult(new Num(pix.toString()))));};CoordsFull.prototype.xTickInterval=function(tickSparseness,majorQ){return this.tickInterval(this.xEnd.sub(this.xStt).mult(new Num(tickSparseness.toString())),majorQ);};CoordsFull.prototype.yTickInterval=function(tickSparseness,majorQ){return this.tickInterval(this.yEnd.sub(this.yStt).mult(new Num(tickSparseness.toString())),majorQ);};CoordsFull.prototype.tickInterval=function(span,majorQ){let mantissa=span.getSci()[0];let intervals=[[7,10,1],[3,1,1],[2,1,0.5],[1,1,0.1]];let interval=[]
for(let i=0;i<intervals.length;i++){interval=intervals[i];if(mantissa>=interval[0]||i==intervals.length-1){break;}}
let result=majorQ?interval[1]:interval[2]
let num=new Num(result.toString());num=num.mult10(span.getSci()[1]+1);return num;};function Num(s,base){s=typeof s!=='undefined'?s:'';base=typeof base!=='undefined'?base:10;this.sign=1;this.digits="";this.dec=0;this.MAXDEC=20;this.baseDigits="0123456789ABCDEFGHJKLMNP";this.setNum(s,base);}
Num.prototype.setNum=function(s,base){base=typeof base!=='undefined'?base:10;if(s==0){this.digits='0';return;}
if(base==10){let digits=s;if(digits.charAt(0)=="-"){this.sign=-1;digits=digits.substring(1);}else{this.sign=1;}
let eVal=0;let ePos=digits.indexOf("e");if(ePos>=0){eVal=(digits.substr(ePos+1))>>0;digits=digits.substr(0,ePos);}
this.dec=digits.length-(digits.indexOf(".")+1);if(this.dec==digits.length){this.dec=0;}
this.dec-=eVal;digits=digits.split(".").join("");digits=digits.replace(/^0+/,'');if(digits.length==0){this.sign=1;}else{let s1="";for(let i=0;i<digits.length;i++){let digit=digits.charAt(i);if(this.baseDigits.indexOf(digit)>=0){s1+=digit;}}
digits=s1;}
this.digits=digits;}else{this.setFromBase(s,base);}};Num.prototype.setFromBase=function(numStr,base){let srcSign="";if(numStr.charAt(0)=="-"){srcSign="-";numStr=numStr.substring(1);}
let baseDec=numStr.length-(numStr.indexOf(".")+1);if(baseDec==numStr.length){baseDec=0;}
numStr=numStr.split(".").join("");numStr=numStr.replace(/^0+/,'');if(numStr.length==0){this.setNum("0");}else{let i=0;let len=numStr.length;let baseStr=base.toString();let digit=this.baseDigits.indexOf(numStr.charAt(i++).toUpperCase()).toString();let result=digit;while(i<len){digit=this.baseDigits.indexOf(numStr.charAt(i++).toUpperCase()).toString();result=this.fullMultiply(result,baseStr);result=this.fullAdd(result,digit);}
if(baseDec>0){let divBy=this.fullPower(baseStr,baseDec);result=this.fullDivide(result,divBy,this.MAXDEC);}
this.setNum(srcSign+result);}};Num.prototype.toBase=function(base,places){let parts=this.splitWholeFrac();let s=this.fullBaseWhole(parts[0],base);if(parts[1].length>0){s+="."+this.fullBaseFrac(parts[1],base,places);}
if(this.sign==-1){if(s!="0"){s="-"+s;}}
return s;};Num.prototype.getNumber=function(){return Number(this.fmt(10,0));};Num.prototype.mult10=function(n){let xNew=this.clone();xNew.dec=xNew.dec-n;if(xNew.dec<0){xNew.digits=xNew.digits+"0".repeat(-xNew.dec);xNew.dec=0;}
return xNew;};Num.prototype.clone=function(){let ansNum=new Num();ansNum.digits=this.digits;ansNum.dec=this.dec;ansNum.sign=this.sign;return ansNum;};Num.prototype.mult=function(num){return this.multNums(this,num);};Num.prototype.fullMultiply=function(x,y){return this.multNums(new Num(x),new Num(y)).fmt();};Num.prototype.multNums=function(xNum,yNum){let N1=xNum.digits;let N2=yNum.digits;let ans="0";for(let i=N1.length-1;i>=0;i--){ans=this.fullAdd(ans,(this.fullMultiply1(N2,N1.charAt(i))+"0".repeat(N1.length-i-1)));}
let ansNum=new Num(ans);ansNum.dec=xNum.dec+yNum.dec;ansNum.sign=xNum.sign*yNum.sign;return ansNum;};Num.prototype.fullMultiply1=function(x,y1){let carry="0";let ans="";for(let i=x.length-1;i>(-1);i--){let product=((x.charAt(i))>>0)*(y1>>0)+(carry>>0);let prodStr=product.toString();if(product<10){prodStr="0"+prodStr;}
carry=prodStr.charAt(0);ans=prodStr.charAt(1)+ans;}
if(carry!="0"){ans=carry+ans;}
return ans;};Num.prototype.fullMultiplyInt=function(x,y){let xLen=x.length;let yLen=y.length;if(xLen==0)return "0";if(yLen==0)return "0";if(xLen+yLen<=9){return(parseInt(x)*parseInt(y)).toString();}
let maxLen=Math.max(xLen,yLen);let split=Math.ceil(maxLen/2);if(xLen<yLen){let temp=x;x=y;y=temp;let tInt=xLen;xLen=yLen;yLen=tInt;}
let xSplit=xLen-split;let x0;let x1;x0=x.substr(xSplit,split);x1=x.substr(0,xSplit);let ySplit=yLen-split;let y0;let y1;let ans="0";if(ySplit<=0){let w2=this.fullMultiplyInt(x0,y);let w1=this.fullMultiplyInt(x1,y);w1=w1+'0'.repeat(split);ans=this.fullAdd(w1,w2);}else{y0=y.substr(ySplit,split);y1=y.substr(0,ySplit);let z0=this.fullMultiplyInt(x1,y1);let z2=this.fullMultiplyInt(x0,y0);let z1=this.fullMultiplyInt(this.fullAdd(x1,x0),this.fullAdd(y1,y0));z1=this.fullSubtract(z1,z2);z1=this.fullSubtract(z1,z0);z0=z0+'0'.repeat(split*2);z1=z1+'0'.repeat(split);ans=this.fullAdd(this.fullAdd(z0,z1),z2);}
return ans;};Num.prototype.abs=function(){let ansNum=this.clone();ansNum.sign=1;return ansNum;};Num.prototype.fullAdd=function(x,y){return this.addNums(new Num(x),new Num(y)).fmt();};Num.prototype.add=function(num){return this.addNums(this,num);};Num.prototype.addNums=function(xNum,yNum){let ansNum=new Num();if(xNum.sign*yNum.sign==-1){ansNum=this.subNums(xNum.abs(),yNum.abs());if(xNum.sign==-1){ansNum.sign*=-1;}
return ansNum;}
let maxdec=Math.max(xNum.dec,yNum.dec);let xdig=xNum.digits+"0".repeat(maxdec-xNum.dec);let ydig=yNum.digits+"0".repeat(maxdec-yNum.dec);let maxlen=Math.max(xdig.length,ydig.length);xdig="0".repeat(maxlen-xdig.length)+xdig;ydig="0".repeat(maxlen-ydig.length)+ydig;let ans="";let carry=0;for(let i=xdig.length-1;i>=0;i--){let temp=((xdig.charAt(i))>>0)+((ydig.charAt(i))>>0)+carry;if((temp>=0)&&(temp<20)){if(temp>9){carry=1;ans=temp-10+ans;}else{carry=0;ans=temp+ans;}}}
if(carry==1){ans="1"+ans;}
ansNum.setNum(ans);ansNum.sign=xNum.sign;ansNum.dec=maxdec;return ansNum;};Num.prototype.fullPower=function(x,n){return this.expNums(new Num(x),n).fmt();};Num.prototype.expNums=function(xNum,nInt){let n=nInt;let b2pow=0;while((n&1)==0){b2pow++;n>>=1;}
let x=xNum.digits;let r=x;while((n>>=1)>0){x=this.fullMultiply(x,x);if((n&1)!=0){r=this.fullMultiply(r,x);}}
while(b2pow-->0){r=this.fullMultiply(r,r);}
let ansNum=new Num(r);ansNum.dec=xNum.dec*nInt;return ansNum;};Num.prototype.div=function(num,decimals){return this.divNums(this,num,decimals);};Num.prototype.fullDivide=function(x,y,decimals){return this.divNums(new Num(x),new Num(y),decimals).fmt();};Num.prototype.divNums=function(xNum,yNum,decimals){decimals=typeof decimals!=='undefined'?decimals:this.MAXDEC;if(xNum.digits.length==0){return new Num("0");}
if(yNum.digits.length==0){return new Num("0");}
let xDec=xNum.mult10(decimals);let fullDec=Math.max(xDec.dec,yNum.dec);let xdig=xDec.digits+"0".repeat(fullDec-xDec.dec);let ydig=yNum.digits+"0".repeat(fullDec-yNum.dec);xdig=xdig.replace(/^0+/,'');if(this.compareDigits(xdig,"0")==0){return new Num("0");}
ydig=ydig.replace(/^0+/,'');if(this.compareDigits(ydig,"0")==0){return new Num("0");}
let timestable=[];timestable.push("0");timestable.push(ydig);let tdig=ydig;for(let i=2;i<10;i++){tdig=this.fullAdd(tdig,ydig);timestable.push(tdig);}
let ans="0";let xNew=xdig;let n=0;while(this.compareDigits(xNew,ydig)>=0){let col=1;while(this.compareDigits(xNew.substring(0,col),ydig)<0){col++;}
let xCurr=xNew.substring(0,col);let mult=9;while(this.compareDigits(timestable[mult],xCurr)>0){mult--;}
let fullmult=mult+""+"0".repeat(xNew.length-xCurr.length);ans=this.fullAdd(ans,fullmult);xNew=this.fullSubtract(xNew,this.fullMultiply(ydig,fullmult));if(n++>100){console.log("runaway code divNums");break;}}
let ansNum=new Num(ans);ansNum.dec=decimals;ansNum.sign=xNum.sign*yNum.sign;return ansNum;};Num.prototype.sub=function(num){return this.subNums(this,num);};Num.prototype.fullSubtract=function(x,y){return this.subNums(new Num(x),new Num(y)).fmt();};Num.prototype.subNums=function(xNum,yNum){let ansNum=new Num();if(xNum.sign*yNum.sign==-1){ansNum=xNum.abs().add(yNum.abs());if(xNum.sign==-1){ansNum.sign*=-1;}
return ansNum;}
let maxdec=Math.max(xNum.dec,yNum.dec);let xdig=xNum.digits+"0".repeat(maxdec-xNum.dec);let ydig=yNum.digits+"0".repeat(maxdec-yNum.dec);let maxlen=Math.max(xdig.length,ydig.length);xdig="0".repeat(maxlen-xdig.length)+xdig;ydig="0".repeat(maxlen-ydig.length)+ydig;let sign=this.compareDigits(xdig,ydig);if(sign==0){return new Num("0");}
if(sign==-1){let temp=xdig;xdig=ydig;ydig=temp;}
let ans="";let isborrow=0;for(let i=xdig.length-1;i>=0;i--){let xPiece=(xdig.charAt(i))>>0;let yPiece=(ydig.charAt(i))>>0;if(isborrow==1){isborrow=0;xPiece=xPiece-1;}
if(xPiece<0){xPiece=9;isborrow=1;}
if(xPiece<yPiece){xPiece=xPiece+10;isborrow=1;}
ans=(xPiece-yPiece)+ans;}
ansNum.setNum(ans);ansNum.sign=sign*xNum.sign;ansNum.dec=maxdec;return ansNum;};Num.prototype.fmt=function(sigDigits,eStt){sigDigits=typeof sigDigits!=='undefined'?sigDigits:0;eStt=typeof eStt!=='undefined'?eStt:0;let decWas=this.dec;let digitsWas=this.digits;if(this.digits.length<sigDigits){this.dec+=sigDigits-this.digits.length;this.digits+=strRepeat("0",sigDigits-this.digits.length);}
let s=this.digits;let decpos=s.length-this.dec;let roundQ=false;let roundType="5up";if(roundQ){if(this.digits.length>sigDigits){let cutDigit="";if(sigDigits>=0){s=this.digits.substr(0,sigDigits);cutDigit=this.digits.charAt(sigDigits);}else{s="";cutDigit="";}
switch(roundType){case "5up":if(cutDigit>"5"||(cutDigit=="5"&&this.sign==1)){s=this.fullAdd(s,"1",10);}
break;case "5down":if(cutDigit>"5"||(cutDigit=="5"&&this.sign==-1)){s=this.fullAdd(s,"1");}
break;case "5away0":if(cutDigit>="5"){s=this.fullAdd(s,"1");}
break;case "5to0":if(cutDigit>"5"){s=this.fullAdd(s,"1");}
break;case "5even":if(cutDigit>"5"){s=this.fullAdd(s,"1");}else{if(cutDigit=="5"){if((parseInt(s.charAt(s.length-1))&1)!=0){s=this.fullAdd(s,"1");}}}
break;case "5odd":if(cutDigit>"5"){s=this.fullAdd(s,"1");}else{if(cutDigit=="5"){if((parseInt(s.charAt(s.length-1))&1)==0){s=this.fullAdd(s,"1");}}}
break;case "floor":if(sigDigits<0){decpos-=sigDigits;if(this.sign==-1){s="1";}else{s="";}}else{if(this.sign==-1){if(Strings.trimLeft(digits.substr(sigDigits),"0").length!=0){s=this.fullAdd(s,"1");}}}
break;case "ceiling":if(sigDigits<0){decpos-=sigDigits;if(this.sign==1){s="1";}else{s="";}}else{if(this.sign==1){if(Strings.trimLeft(digits.substr(sigDigits),"0").length!=0){s=fullAdd(s,"1");}}}
break;default:}
if(s.length>sigDigits){if(sigDigits>0)
s=s.substr(0,sigDigits);decpos++;}
if(s.length==0){s="0";}else{if(decpos-sigDigits>0)
s+="0".repeat(decpos-sigDigits);}}}
let eVal=decpos-1;if(eStt>0&&Math.abs(eVal)>=eStt){let s1=s.substr(0,1)+"."+s.substr(1);s1=s1.replace(/0+$/,'');if(s1.charAt(s1.length-1)=="."){s1=s1.substr(0,s1.length-1);}
if(eVal>0){s=s1+"e+"+eVal;}else{s=s1+"e"+eVal;}}else{if(decpos<0){s="0."+"0".repeat(-decpos)+s;}else if(decpos==0){s="0."+s;}else if(decpos>0){if(this.dec>=0){s=s.substr(0,decpos)+"."+s.substr(decpos,this.dec);}else{s=s+"0".repeat(-this.dec)+".";}}
if(s.indexOf(".")>=0){s=s.replace(/0+$/,'');}
if(s.charAt(s.length-1)=="."){s=s.substring(0,s.length-1);}}
if(this.sign==-1){if(s!="0"){s="-"+s;}}
this.dec=decWas;this.digits=digitsWas;return s;};Num.prototype.compare=function(yNum){return this.compareNums(this,yNum);};Num.prototype.compareNums=function(xNum,yNum){if(xNum.digits.length==0)
xNum.sign=1;if(yNum.digits.length==0)
yNum.sign=1;if(xNum.sign==1&&yNum.sign==-1){return 1;}
if(xNum.sign==-1&&yNum.sign==1){return-1;}
let maxdec=Math.max(xNum.dec,yNum.dec);let xdig=xNum.digits+strRepeat("0",maxdec-xNum.dec);let ydig=yNum.digits+strRepeat("0",maxdec-yNum.dec);let maxlen=Math.max(xdig.length,ydig.length);xdig=strRepeat("0",maxlen-xdig.length)+xdig;ydig=strRepeat("0",maxlen-ydig.length)+ydig;for(let i=0;i<xdig.length;i++){if(xdig.charAt(i)<ydig.charAt(i)){return-1*xNum.sign;}
if(xdig.charAt(i)>ydig.charAt(i)){return 1*xNum.sign;}}
return 0;};Num.prototype.compareDigits=function(x,y){if(x.length>y.length){return 1;}
if(x.length<y.length){return-1;}
for(let i=0;i<x.length;i++){if(x.charAt(i)<y.charAt(i)){return-1;}
if(x.charAt(i)>y.charAt(i)){return 1;}}
return 0;};Num.prototype.splitWholeFrac=function(){let s=this.digits;let decpos=s.length-this.dec;if(decpos<0){s="0".repeat(-decpos)+s;decpos=0;}
if(this.dec<0){s=s+"0".repeat(-this.dec)+".";}
let wholePart=s.substr(0,decpos);let fracPart=s.substr(decpos);if(fracPart.replace(/^0+/,'').length==0){fracPart="";}else{fracPart="0."+fracPart;}
return[wholePart,fracPart];};Num.prototype.fullBaseWhole=function(d,base){let baseStr=base.toString();let dWhole=this.fullDivide(d,baseStr,0);let dRem=this.fullSubtract(d,this.fullMultiply(dWhole,baseStr));if(dWhole=="0"){return this.baseDigits.charAt(dRem>>0);}else{return this.fullBaseWhole(dWhole,base)+this.baseDigits.charAt(dRem>>0);}};Num.prototype.fullBaseFrac=function(d,base,places,level){level=typeof level!=='undefined'?level:0;let r=this.fullMultiply(d,base.toString());let parts=r.split(".");let wholePart=parts[0];if(parts.length==1||level>=places-1){return this.baseDigits.charAt(wholePart>>0);}else{let fracPart="0."+parts[1];return this.baseDigits.charAt(wholePart>>0)+this.fullBaseFrac(fracPart,base,places,level+1);}};Num.prototype.getSignStr=function(){if(this.sign==-1){return "-";}else{return "";}};Num.prototype.getWholeStr=function(){let s=this.digits;let decpos=s.length-this.dec;if(decpos<0){s="0".repeat(-decpos)+s;decpos=0;}
if(this.dec<0){s=s+"0".repeat(-this.dec)+".";}
return s.substr(0,decpos);};Num.prototype.getDecStr=function(){let s=this.digits;let decpos=s.length-this.dec;if(decpos<0){s="0".repeat(-decpos)+s;decpos=0;}
if(this.dec<0){s=s+"0".repeat(-this.dec)+".";}
return s.substr(decpos);};Num.prototype.fullProdSeq=function(n0,n1){if(n0==n1)return n1.toString();let nMid=((n1+n0)/2)<<0;return(this.fullMultiplyInt(this.fullProdSeq(n0,nMid),this.fullProdSeq(nMid+1,n1)));};Num.prototype.getSci=function(){let len=this.digits.length;let s=this.digits.substr(0,1)+"."+this.digits.substr(1);s=s.replace(/0+$/,'');if(s.charAt(s.length-1)=="."){s=s.substr(0,s.length-1);}
if(this.sign==-1){s="-"+s;}
return[s,len-this.dec-1];};Num.prototype.fullCombPerm=function(n,r,orderQ,replaceQ){let i=1;let s="";if(orderQ){if(replaceQ){s=this.fullPower(n.toString(),r);}else{if(r>n){s="";}else{s=this.fullProdSeq(n-r+1,n);}}}else{let tops=[];let bots=[];if(replaceQ){if(false){}else{for(i=n;i<=n+r-1;i++){tops.push(i);}
for(i=2;i<=r;i++){bots.push(i);}}}else{if(r>n){s="";}else{if(r<n-r){for(i=n-r+1;i<=n;i++){tops.push(i);}
for(i=2;i<=r;i++){bots.push(i);}}else{for(i=n-(n-r)+1;i<=n;i++){tops.push(i);}
for(i=2;i<=n-r;i++){bots.push(i);}}}}
cancelFrac(tops,bots);s="1";for(i=0;i<tops.length;i++){s=this.fullMultiplyInt(s,tops[i].toString());}}
return s;};Num.prototype.trimDigits=function(trimToLen){if(this.digits.length>trimToLen){let origLen=this.digits.length;this.digits=this.digits.substr(0,trimToLen);this.dec-=(origLen-this.digits.length);}};function strRepeat(chr,count){let s="";while(count>0){s+=chr;count-=1;}
return s;}
function toggleFullScreen(){if((document.fullScreenElement&&document.fullScreenElement!==null)||(!document.mozFullScreen&&!document.webkitIsFullScreen)){if(document.documentElement.requestFullScreen){document.documentElement.requestFullScreen();}else if(document.documentElement.mozRequestFullScreen){document.documentElement.mozRequestFullScreen();}else if(document.documentElement.webkitRequestFullScreen){document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);}}else{if(document.cancelFullScreen){document.cancelFullScreen();}else if(document.mozCancelFullScreen){document.mozCancelFullScreen();}else if(document.webkitCancelFullScreen){document.webkitCancelFullScreen();}}}
CanvasRenderingContext2D.prototype.drawPipe=function(x0,y0,x1,y1,clr){let g=this;let alpha=[0.8,0.4,0.3,0.2,0.4,0.6,0.80];let size=alpha.length;for(let i=0;i<size;i++){for(let j=0;j<2;j++){if(j==0){g.strokeStyle='#ffffff';}else{g.strokeStyle=hex2rgba(clr,alpha[i]);}
let dist=(size/2-1/2-i)*0.8;g.beginPath();if(y0==y1){g.moveTo(x0,y0-dist);g.lineTo(x1,y1-dist);}
if(x0==x1){g.moveTo(x0+dist,y0);g.lineTo(x1+dist,y1);}
g.stroke();}}};function hex2rgba(hex,opacity){hex=hex.replace('#','');let r=parseInt(hex.substring(0,2),16);let g=parseInt(hex.substring(2,4),16);let b=parseInt(hex.substring(4,6),16);return 'rgba('+r+','+g+','+b+','+opacity+')';}
function optPopHTML(){let s='';s+='<div id="optpop" style="position:absolute; left:-500px; top:140px; width:320px; padding: 5px; border-radius: 9px; font:14px Arial; background-color: #bcd; box-shadow: 10px 10px 5px 0px rgba(40,40,40,0.75); transition: all linear 0.3s; opacity:0; text-align: center; ">';s+='<button id="numsBtn" onclick="numsToggle()" style="z-index:2;" class="btn hi" >Numbers</button>';s+='<button id="ticksBtn" onclick="ticksToggle()" style="z-index:2;" class="btn hi" >Ticks</button>';s+='<button id="fracsBtn" onclick="fracsToggle()" style="z-index:2;" class="btn lo" >Fractions</button>';s+='<div style="float:right; margin: 0 0 5px 10px; font:16px Arial;">';s+='<button onclick="optYes()" style="z-index:2; font: 22px Arial;" class="btn" >&#x2714;</button>';s+='</div>';s+='</div>';return s;}
function optPop(){console.log("optpop");var pop=document.getElementById('optpop');pop.style.transitionDuration="0.3s";pop.style.opacity=1;pop.style.zIndex=102;pop.style.left=(w-320)/2+'px';}
function optYes(){var pop=document.getElementById('optpop');pop.style.opacity=0;pop.style.zIndex=1;pop.style.left='-999px';}
function optNo(){var pop=document.getElementById('optpop');pop.style.opacity=0;pop.style.zIndex=1;pop.style.left='-999px';}
function optGet(name){var val=localStorage.getItem(`yacht.${name}`)
if(val==null)val=my.opts[name]
return val}
function optSet(name,val){localStorage.setItem(`yacht.${name}`,val)
my.opts[name]=val}
function fracHTML(a,b){let s='<span class="intbl" style="font-size:85%;"><em>'+a+'</em><strong>'+b+'</strong></span>'
return s;}
function hcf(n1,n2){n1=n1<<0;n2=n2<<0;if(n1==0||n2==0)return 0;if(n1>n2){n1=n1+n2;n2=n1-n2;n1=n1-n2;}
var remainder=n2%n1;while(remainder!=0){n2=n1;n1=remainder;remainder=n2%n1;}
return n1;}