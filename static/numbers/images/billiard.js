let my={}
function init(wd,ht){let version='0.35'
my.wd=typeof wd!=='undefined'?wd:360
my.ht=typeof ht!=='undefined'?ht:(my.wd*7)/4
let s=''
s+='<div id="main" style="position:relative; width:'+my.wd+'px; min-height:'+my.ht+'px; border: none;  background-color: white; margin:auto; display:block; box-shadow: 0px 0px 19px 10px rgba(0,0,68,0.46); border-radius: 10px;">'
s+='<canvas id="canvas1" style="position: absolute; left: 0; top:0; border: none;"></canvas>'
s+='<canvas id="canvas2" style="position: absolute; left: 0; top:0; border: none;"></canvas>'
s+='<div id="optpop" style="position:absolute; left:-450px; bottom:10px; width:460px; padding: 5px; border-radius: 9px; background-color: #88aaff; box-shadow: 10px 10px 5px 0px rgba(40,40,40,0.75); transition: all linear 0.3s; opacity:0; text-align: center; "></div>'
let props=[['mass','Mass','onMassChg','#6600cc','kg',0.5],['rad','Radius','onRadChg','#0000ff','m',0.14],['grav','Gravity','onGravChg','orangered','m/s2',0],['dense','Air/Water/Oil','onDenseChg','yellowgreen','kg/m3',0],]
s+='<div style="visibility:hidden;">'
for(let i=0;i<props.length;i++){let p=props[i]
s+='<div style="position:absolute; top:'+(40+i*30)+'px; right:5px; width: 390px; border-radius: 9px; font: 20px Arial; box-shadow: 0px 0px 6px 0px '+p[3]+'; ">'
s+='<div style="display: inline-block; font: 15px Arial; color:'+p[3]+'; width:100px; text-align: right;">'+p[1]+':</div>'
s+='<input type="range" id="'+p[0]+'r"  value="0" min="0" max="1" step=".01"  style="z-index:2; width:200px; height:10px; border: none; " oninput="'+p[2]+'(0,this.value)" onchange="'+p[2]+'(1,this.value)" />'
s+='<div id="'+p[0]+'" style="display: inline-block; width:50px;font: 20px Arial; color:'+p[3]+'; text-align: center; 	">1</div>'
s+='</div>'}
s+='</div>'
s+='<button id="restart" style="position: absolute; bottom:2px; right:40px; font: 14px Arial; height:30px; vertical-align:middle; z-index: 10;" class="btn" onclick="newGame()" >New</button>'
s+='<button id="playBtn" style="position: absolute; top:35px; left:53px; font: 14px Arial; height:30px; vertical-align:middle; z-index: 10; visibility:hidden; " class="btn" onclick="doPlay(-1)" >Pause</button>'
s+='<div id="fact" style="position: absolute; left:'+(my.wd-200)/2+'px; top: 4px; font: 30px Verdana; width:200px; text-align:center; color:white;">0</div>'
s+='<div id="score" style="position: absolute; left:'+(my.wd-200)/2+'px; top:38px; font: 30px Verdana; width:200px; text-align:center; color:gold;">0</div>'
s+=wrap({cls:'copyrt',pos:'abs',style:'left:35px; bottom:3px'},`&copy; 2022 Rod Pierce  v${version}`)
s+='</div>'
docInsert(s)
my.can=new Can('canvas1',my.wd,my.ht,2)
my.can2=new Can('canvas2',my.wd,my.ht,2)
my.clrs=[['Blue','#0000FF'],['Red','#FF0000'],['Black','#000000'],['Green','#00cc00'],['Orange','#FFA500'],['Slate Blue','#6A5ACD'],['Lime','#00FF00'],['Spring Green','#00FF7F'],['Teal','#008080'],['Gold','#ffd700'],['Med Purple','#aa00aa'],['Light Blue','#ADD8E6'],['Navy','#000080'],['Purple','#800080'],['Dark SeaGreen','#8FBC8F'],]
clrNum=0
let el2=my.can2.el
el2.addEventListener('touchstart',ontouchstart,false)
el2.addEventListener('touchmove',ontouchmove,false)
el2.addEventListener('touchend',ontouchend,false)
el2.addEventListener('mousedown',onMouseDown,false)
window.addEventListener('mousemove',onMouseMove,false)
window.addEventListener('mouseup',onMouseUp,false)
my.maxBalln=100
my.holeRad=36
let gap=7
let tHt=20
let midMult=3
my.pockets=[{x:-gap,y:-gap,xt:0,yt:tHt},{x:my.wd+gap,y:-gap,xt:my.wd-tHt*0.8,yt:tHt},{x:-gap*midMult,y:my.ht/2,xt:0,yt:my.ht/2+tHt/2},{x:my.wd+gap*midMult,y:my.ht/2,xt:my.wd-tHt*0.8,yt:my.ht/2+tHt/2},{x:-gap,y:my.ht+gap,xt:0,yt:my.ht},{x:my.wd+gap,y:my.ht+gap,xt:my.wd-tHt*0.8,yt:my.ht},]
midY=my.ht/2+30
timeIncr=24*3600
univTime=0
gFact=6.673e-11
extents=[0e10,0e10,2e10,2e10]
newExtents=[0,0,1e10,1e10]
clrNum=0
playQ=false
m=1e24
massNum=10
radNum=10
my.elasticity=0.95
grav=9.8
dense=1
my.frameRate=1/40
my.balls=[]
my.newball=new Ball()
my.drag={n:0,onQ:false,holdX:0,holdY:0}
my.mouse={x:0,y:0,isDown:false}
let g=my.can.g
g.fillStyle='red'
g.strokeStyle='#000000'
for(let i=0;i<props.length;i++){let p=props[i]
document.getElementById(p[0]+'r').value=p[5]
window[p[2]](0,p[5])}
newGame()
doPlay(1)}
function loop(){if(my.veln==0)return
if(!my.mouse.isDown){my.veln=doVels()
my.can.clear()
drawTable()
doCollisions()
for(let i=0;i<my.balls.length;i++){let ball=my.balls[i]
ball.vx=applyDrag(ball.vx,ball.radius,ball.mass)
ball.vy=applyDrag(ball.vy,ball.radius,ball.mass)
ball.vy+=grav*my.frameRate
let dx=ball.vx*my.frameRate*100
let dy=ball.vy*my.frameRate*100
ball.x+=dx
ball.y+=dy
let wallQ=false
if(ball.y>my.ht-ball.radius){ball.vx*=0.995
ball.vy*=-my.elasticity
ball.y=my.ht-ball.radius
wallQ=true}
if(ball.y<ball.radius){ball.vx*=0.995
ball.vy*=-my.elasticity
ball.y=ball.radius
wallQ=true}
if(ball.x>my.wd-ball.radius){ball.vy*=0.995
ball.vx*=-my.elasticity
ball.x=my.wd-ball.radius
wallQ=true}
if(ball.x<ball.radius){ball.vy*=0.995
ball.vx*=-my.elasticity
ball.x=ball.radius
wallQ=true}
if(wallQ)doPocket(ball)
drawBall(ball)}}}
function doVels(){let veln=0
for(let i=0;i<my.balls.length;i++){let a=my.balls[i]
let aVel=dist(a.vx,a.vy)
if(aVel==0)continue
veln++
if(1==1){a.vx*=0.993
a.vy*=0.993}
if(aVel<0.5){a.vx*=0.99
a.vy*=0.99}
if(aVel<0.04){a.vx=0
a.vy=0}}
return veln}
function doPocket(ball){for(let i=0;i<my.pockets.length;i++){let pock=my.pockets[i]
if(dist(ball.x-pock.x,ball.y-pock.y)<my.holeRad*1.25){if(ball.collQ){if(my.hita==-1){my.hita=i
let a=my.pockets[my.hita].num
let s=a+' x '+'_'+' = '
document.getElementById('fact').innerHTML=s}else{my.hitb=i
doQuest()}}
delBall(ball)
break}}}
function doQuest(){let a=my.pockets[my.hita].num
let b=my.pockets[my.hitb].num
let s=a+' x '+b+' = '
console.log('doQuest',s)
my.hita=-1
my.hitb=-1
let ans=a*b
s+=ans
document.getElementById('fact').innerHTML=s
my.score+=ans
document.getElementById('score').innerHTML=my.score}
function delBall(ball){for(let i=0;i<my.balls.length;i++){if(my.balls[i]===ball){my.balls.splice(i,1)}}}
function drawTable(){let g=my.can.g
g.fillStyle='rgba(0,222,0,0.3)'
g.beginPath()
g.rect(0,0,my.wd,my.ht)
g.fill()
for(let i=0;i<my.pockets.length;i++){let pock=my.pockets[i]
g.fillStyle='rgba(0,222,0,0.3)'
for(let j=0;j<7;j++){g.beginPath()
g.arc(pock.x,pock.y,my.holeRad-j,0,2*Math.PI)
g.fill()}
if(i==my.hita||i==my.hitb){g.fillStyle='black'
g.font='24px Arial'}else{g.fillStyle='white'
g.font='24px Arial'}
g.fillText(pock.num,pock.xt,pock.yt)}}
function gameOver(){console.log('gameOver')}
class Pt{constructor(xnew,ynew){this.x=xnew
this.y=ynew}
toString(){return this.x+','+this.y}
rotate(angle){let cosa=Math.cos(angle)
let sina=Math.sin(angle)
let xPos=this.x*cosa+this.y*sina
let yPos=-this.x*sina+this.y*cosa
return new Pt(xPos,yPos)}
rotateMe(angle){let t=new Pt(this.x,this.y).rotate(angle)
this.x=t.x
this.y=t.y}}
function doCollisions(){for(let i=0;i<my.balls.length-1;i++){let a=my.balls[i]
for(let j=i+1;j<my.balls.length;j++){let b=my.balls[j]
let dx=a.x-b.x
let dy=a.y-b.y
let dSqr=dx*dx+dy*dy
let radTot=a.radius+b.radius
let radSqr=radTot*radTot
if(radSqr-dSqr>0){let norm=new Pt(b.x-a.x,b.y-a.y)
let ang=Math.atan2(norm.y,norm.x)
if(1==0){my.can2.clear()
let g2=my.can2.g
g2.beginPath()
g2.lineWidth=1
g2.strokeStyle=a.clr
g2.arc(a.x,a.y,a.radius,0,Math.PI*2,true)
g2.stroke()
g2.closePath()
g2.beginPath()
g2.strokeStyle=b.clr
g2.arc(b.x,b.y,b.radius,0,Math.PI*2,true)
g2.stroke()
g2.closePath()
g2.beginPath()
g2.strokeStyle='black'
g2.moveTo(a.x,a.y)
g2.lineTo(b.x,b.y)
g2.stroke()
g2.closePath()
g2.fillText(ang.toPrecision(4),a.x,a.y)}
let aVel=new Pt(a.vx,a.vy)
aVel.rotateMe(ang)
let bVel=new Pt(b.vx,b.vy)
bVel.rotateMe(ang)
let va=(my.elasticity*b.mass*(bVel.x-aVel.x)+a.mass*aVel.x+b.mass*bVel.x)/(a.mass+b.mass)
let vb=(my.elasticity*a.mass*(aVel.x-bVel.x)+a.mass*aVel.x+b.mass*bVel.x)/(a.mass+b.mass)
aVel.x=va
bVel.x=vb
aVel.rotateMe(-ang)
a.vx=aVel.x
a.vy=aVel.y
bVel.rotateMe(-ang)
b.vx=bVel.x
b.vy=bVel.y
let olap=radTot-Math.sqrt(dSqr)
olap*=0.5/2
let aPos=new Pt(a.x,a.y)
aPos.rotateMe(ang)
aPos.x-=olap
let bPos=new Pt(b.x,b.y)
bPos.rotateMe(ang)
bPos.x+=olap
aPos.rotateMe(-ang)
a.x=aPos.x
a.y=aPos.y
bPos.rotateMe(-ang)
b.x=bPos.x
b.y=bPos.y
a.collQ=true
b.collQ=true}}}}
function drawBall(ball){let g=my.can.g
g.beginPath()
let alpha=Math.min(1,Math.log(ball.mass)*0.16-0.1)
if(1==0){g.fillStyle=hex2rgba(ball.clr,alpha)
g.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true)
g.fill()
g.closePath()}else{g.ball(ball,ball.x,ball.y)}}
function applyDrag(v,r,mass){let Cd=0.47
let A=(Math.PI*r*r)/10000
let F=0.5*Cd*A*dense*v*v
let a=F/mass
let vd=a*my.frameRate
vd=Math.min(Math.abs(vd),Math.abs(v))
vd=Math.abs(vd)*sign(v)
v-=vd
return v}
function sign(n){return n==0?0:n/Math.abs(n)}
function ontouchstart(ev){let touch=ev.targetTouches[0]
ev.clientX=touch.clientX
ev.clientY=touch.clientY
ev.touchQ=true
onMouseDown(ev)}
function ontouchmove(ev){let touch=ev.targetTouches[0]
ev.clientX=touch.clientX
ev.clientY=touch.clientY
ev.touchQ=true
onMouseMove(ev)}
function ontouchend(){my.drag.onQ=false}
function onMouseDown(ev){let[mouseX,mouseY]=my.can.mousePos(ev)
my.mouse.x=mouseX
my.mouse.y=mouseY
my.mouse.isDown=true
my.newball=new Ball()
my.newball.x=mouseX
my.newball.y=mouseY
my.newball.mass=massNum
my.newball.radius=radNum
clrNum=++clrNum%my.clrs.length
my.newball.clr=my.clrs[clrNum][1]
drawBall(my.newball)
my.drag.onQ=true
if(ev.preventDefault){ev.preventDefault()}
return false}
function onMouseMove(ev){let[mouseX,mouseY]=my.can.mousePos(ev)
if(my.drag.onQ){let g2=my.can2.g
my.can2.clear()
g2.lineWidth=1
g2.strokeStyle='blue'
let len=dist(my.mouse.x-mouseX,my.mouse.y-mouseY)
let ang=Math.atan2(-(my.mouse.y-mouseY),my.mouse.x-mouseX)
g2.drawCue(my.mouse.x,my.mouse.y,len,ang)}
if(ev.preventDefault){ev.preventDefault()}
return false}
function onMouseUp(ev){let[mouseX,mouseY]=my.can.mousePos(ev)
my.drag.onQ=false
my.can2.clear()
let xm=mouseX
let ym=mouseY
my.veln=1
my.mouse.isDown=false
my.newball.vx=(my.newball.x-mouseX)*0.05
my.newball.vy=(my.newball.y-mouseY)*0.05
my.newball.mass=massNum
my.newball.radius=radNum
my.balls.push(my.newball)
for(let i=0;i<my.balls.length;i++){my.balls[i].collQ=false}}
function wallChg(){let div=document.getElementById('wallType')
wallType=div.options[div.selectedIndex].text
wallType=wallType.toLowerCase()
console.log('wallChg',wallType)}
function onMassChg(n,v){v=Number(v)*2+1
v=Number(Math.pow(10,v).toPrecision(2))
document.getElementById('mass').innerHTML=v
massNum=v
my.newball.mass=v}
function onRadChg(n,v){v=Number(v)*1+1
v=Number(Math.pow(10,v).toPrecision(2))
document.getElementById('rad').innerHTML=v
radNum=v
my.newball.radius=v}
function onDenseChg(n,v){v=Number(v)*5
v=Number(Math.pow(10,v).toPrecision(2))
document.getElementById('dense').innerHTML=v
dense=v}
function onGravChg(n,v){v=Number(v)*2
v=Number((Math.pow(10,v)-1).toPrecision(2))
document.getElementById('grav').innerHTML=v
grav=v}
function onElastChg(n,v){console.log('onElastChg='+n,v)
document.getElementById('elast').innerHTML=v
my.elasticity=v}
function newGame(){my.can.clear()
my.can2.clear()
my.hita=-1
my.hitb=-1
my.balls=[]
let nums=[2,3,4,5,6,7,8,9]
for(let i=0;i<my.pockets.length;i++){let pock=my.pockets[i]
let idx=getRandomInt(0,nums.length-1)
let num=nums[idx]
nums.splice(idx,1)
pock.num=num}
drawTable()
setupBalls()
my.score=0
document.getElementById('score').innerHTML=my.score
document.getElementById('fact').innerHTML='0 x 0 = 0'
this.playQ=true
this.frame=0}
function setupBalls(){let mid=my.wd/2
let gap=35
let lvln=3
let tp=100+gap*lvln
let pts=[]
for(let i=0;i<lvln;i++){let wd=i*gap
for(let j=0;j<=i;j++){pts.push({x:mid-wd/2+j*gap,y:tp-i*gap})}}
for(let i=0;i<pts.length;i++){let pt=pts[i]
let ball=new Ball()
ball.x=pt.x
ball.y=pt.y
ball.mass=massNum
ball.radius=radNum
clrNum=++clrNum%my.clrs.length
ball.clr=my.clrs[clrNum][1]
drawBall(ball)
my.balls.push(ball)}}
function animate(){this.frame++
loop()
if(this.playQ)requestAnimationFrame(animate)}
function doPlay(action){if(action==-1){this.playQ=!this.playQ}else{if(action==0){this.playQ=false}else{this.playQ=true}}
if(this.playQ){document.getElementById('playBtn').innerHTML='Pause'}else{document.getElementById('playBtn').innerHTML='Play'}
if(this.playQ){animate()}}
function toggleBtn(btn,onq){if(onq){document.getElementById(btn).classList.add('hi')
document.getElementById(btn).classList.remove('lo')}else{document.getElementById(btn).classList.add('lo')
document.getElementById(btn).classList.remove('hi')}}
function dist(dx,dy){return Math.sqrt(dx*dx+dy*dy)}
function getRandomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function hex2rgba(hex,opacity){hex=hex.replace('#','')
let r=parseInt(hex.substring(0,2),16)
let g=parseInt(hex.substring(2,4),16)
let b=parseInt(hex.substring(4,6),16)
let result='rgba('+r+','+g+','+b+','+opacity+')'
return result}
class Ball{constructor(){this.x=0
this.y=0
this.vx=0
this.vy=0
this.mass=1
this.radius=15
this.collQ=false
this.clr='blue'
this.clr2='white'
this.sleep=false}}
CanvasRenderingContext2D.prototype.ball=function(ball,x,y){let size=ball.radius
this.beginPath()
this.fillStyle=ball.color
this.arc(x,y,size,0,Math.PI*2,true)
let gradient=this.createRadialGradient(x-size/2,y-size/2,0,x,y,size)
gradient.addColorStop(0,ball.clr2)
gradient.addColorStop(1,ball.clr)
this.fillStyle=gradient
this.fill()
this.closePath()
this.beginPath()
this.arc(x,y,size*0.85,(Math.PI/180)*270,(Math.PI/180)*200,true)
gradient=this.createRadialGradient(x-size*0.99,y-size*0.99,0,x,y,size)
gradient.addColorStop(0,ball.clr2)
gradient.addColorStop(0.99,'transparent')
this.fillStyle=gradient
this.fill()}
CanvasRenderingContext2D.prototype.drawArrow=function(x0,y0,totLen,shaftHt,headLen,headHt,angle,sweep,invertQ){let g=this
let pts=[[0,0],[-headLen,-headHt/2],[-headLen+sweep,-shaftHt/2],[-totLen,-shaftHt/2],[-totLen,shaftHt/2],[-headLen+sweep,shaftHt/2],[-headLen,headHt/2],[0,0],]
if(invertQ){pts.push([0,-headHt/2],[-totLen,-headHt/2],[-totLen,headHt/2],[0,headHt/2])}
for(let i=0;i<pts.length;i++){let cosa=Math.cos(-angle)
let sina=Math.sin(-angle)
let xPos=pts[i][0]*cosa+pts[i][1]*sina
let yPos=pts[i][0]*sina-pts[i][1]*cosa
if(i==0){g.moveTo(x0+xPos,y0+yPos)}else{g.lineTo(x0+xPos,y0+yPos)}}}
CanvasRenderingContext2D.prototype.drawCue=function(x0,y0,fillLen,angle){let g=this
let gapLen=20
let headLen=15
let headHt=4
let shaftHt=10
let handLen=70
let totLen=200
let shaftLen=totLen-handLen
let slope=(shaftHt/2-headHt/2)/shaftLen
let cuePts=[[-gapLen,headHt/2],[-(gapLen+headLen),headHt/2+slope*headLen],[-(gapLen+shaftLen),shaftHt/2],[-(gapLen+totLen),shaftHt/2],]
let pts=[]
for(let i=0;i<4;i++){pts.push(cuePts[i])}
drawRot(g,x0,y0,pts,angle,true)
g.strokeStyle='white'
g.stroke()
g.fillStyle='#fc9'
g.fill()
pts=[]
for(let i=0;i<2;i++){pts.push(cuePts[i])}
drawRot(g,x0,y0,pts,angle,true)
g.fillStyle='black'
g.fill()
pts=[]
for(let i=2;i<4;i++){pts.push(cuePts[i])}
drawRot(g,x0,y0,pts,angle,true)
g.fillStyle='#630'
g.fill()
pts=[[-gapLen,1],[-fillLen,3],]
drawRot(g,x0,y0,pts,angle,true)
g.fillStyle='rgba(0,0,255,0.3)'
g.fill()}
function drawRot(g,x0,y0,pts,angle,mirrorQ){if(mirrorQ){let len=pts.length
for(let i=len-1;i>=0;i--){pts.push([pts[i][0],-pts[i][1]])}}
g.beginPath()
for(let i=0;i<pts.length;i++){let cosa=Math.cos(-angle)
let sina=Math.sin(-angle)
let xPos=pts[i][0]*cosa+pts[i][1]*sina
let yPos=pts[i][0]*sina-pts[i][1]*cosa
if(i==0){g.moveTo(x0+xPos,y0+yPos)}else{g.lineTo(x0+xPos,y0+yPos)}}
g.closePath()}
function docInsert(s){let div=document.createElement('div')
div.innerHTML=s
let script=document.currentScript
script.parentElement.insertBefore(div,script)}
class Can{constructor(id,wd,ht,ratio){this.id=id
this.wd=wd
this.ht=ht
this.ratio=ratio
let el=document.getElementById(id)
el.width=wd*ratio
el.style.width=wd+'px'
el.height=ht*ratio
el.style.height=ht+'px'
this.g=el.getContext('2d')
this.g.setTransform(ratio,0,0,ratio,0,0)
this.el=el
return this}
clear(){this.g.clearRect(0,0,this.wd,this.ht)}
mousePos(ev){let bRect=this.el.getBoundingClientRect()
let mouseX=(ev.clientX-bRect.left)*(this.el.width/this.ratio/bRect.width)
let mouseY=(ev.clientY-bRect.top)*(this.el.height/this.ratio/bRect.height)
return[mouseX,mouseY]}}
function wrap({id='',cls='',pos='rel',style='',txt='',tag='div',lbl='',fn='',opts=[]},...mores){let s=''
s+='\n'
txt+=mores.join('')
s+={btn:()=>{if(cls.length==0)cls='btn'
return '<button onclick="'+fn+'"'},can:()=>'<canvas',div:()=>'<div',edit:()=>{let s=''
s+=lbl.length>0?'<label class="label">'+lbl+' ':''
s+='<textarea onkeyup="'+fn+'" onchange="'+fn+'"'
return s},inp:()=>{if(cls.length==0)cls='input'
let s=''
s+=lbl.length>0?'<label class="label">'+lbl+' ':''
s+='<input value="'+txt+'"'
s+=fn.length>0?'  oninput="'+fn+'" onchange="'+fn+'"':''
return s},out:()=>{pos='dib'
if(cls.length==0)cls='output'
let s=''
s+=lbl.length>0?'<label class="label">'+lbl+' ':''
s+='<span '
return s},radio:()=>{if(cls.length==0)cls='radio'
return '<div '},sel:()=>{if(cls.length==0)cls='select'
let s=''
s+=lbl.length>0?'<label class="label">'+lbl+' ':''
s+='<select '
s+=fn.length>0?'  onchange="'+fn+'"':''
return s},sld:()=>'<input type="range" '+txt+' oninput="'+fn+'" onchange="'+fn+'"',}[tag]()||''
if(id.length>0)s+=' id="'+id+'"'
if(cls.length>0)s+=' class="'+cls+'"'
if(pos=='dib')s+=' style="position:relative; display:inline-block;'+style+'"'
if(pos=='rel')s+=' style="position:relative; '+style+'"'
if(pos=='abs')s+=' style="position:absolute; '+style+'"'
s+={btn:()=>'>'+txt+'</button>',can:()=>'></canvas>',div:()=>' >'+txt+'</div>',edit:()=>' >'+txt+'</textarea>',inp:()=>'>'+(lbl.length>0?'</label>':''),out:()=>' >'+txt+'</span>'+(lbl.length>0?'</label>':''),radio:()=>{let s=''
s+='>\n'
for(let i=0;i<opts.length;i++){let chk=''
if(i==0)chk='checked'
let idi=id+i
let lbl=opts[i]
s+='<input id="'+idi+'" type="radio" name="'+id+'" value="'+lbl.name+'" onclick="'+fn+'('+i+');" '+chk+' >'
s+='<label for="'+idi+'">'+lbl.name+' </label>'}
s+='</div>'
return s},sel:()=>{let s=''
s+='>\n'
for(let i=0;i<opts.length;i++){let opt=opts[i]
let idStr=id+i
let chkStr=opt.descr==txt?' selected ':''
s+='<option id="'+idStr+'" value="'+opt.name+'"'+chkStr+'>'+opt.descr+'</option>\n'}
s+='</select>'
if(lbl.length>0)s+='</label>'
return s},sld:()=>'>',}[tag]()||''
s+='\n'
return s.trim()}
init()