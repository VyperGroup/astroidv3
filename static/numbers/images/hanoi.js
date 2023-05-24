var el,g,ratio,shapes,my={}
function init(mode,rel){var version='0.936'
this.mode=typeof mode!=='undefined'?mode:'asc'
rel=typeof rel!=='undefined'?rel:'../'
var w=510
var h=320
my.clrs=[["PaleGreen",'#98FB98'],["SpringGreen",'#00FF7F'],["Thistle",'#D8BFD8'],["Yellow",'#FFFF00'],["Gold",'#FFD700'],["Pink",'#FFC0CB'],["LightSalmon",'#FFA07A'],["Lime",'#00FF00'],["DarkSeaGreen",'#8FBC8F'],["Orange",'#FFA500'],["Khaki",'#F0E68C'],["Violet",'#EE82EE'],["Teal",'#008080'],["LightBlue",'#ADD8E6'],["SkyBlue",'#87CEEB'],["Blue",'#0000FF'],["Navy",'#000080'],["Purple",'#800080'],["Wheat",'#F5DEB3'],["Tan",'#D2B48C'],["AntiqueWhite",["SlateBlue",'#6A5ACD'],'#FAEBD7'],["Aquamarine",'#7FFFD4'],["Silver",'#C0C0C0']];my.startX=50
my.startY=200
my.diskHt=17
my.poleX=90
my.poleDist=160
my.poleY=240
my.drag={type:'block',q:false,n:0,hold:{x:0,y:0}}
my.moves=[]
var s=''
s+='<div style="position:relative; width:'+w+'px; height:'+h+'px;  margin:auto; display:block; border: none;  border-radius: 10px; box-shadow: 0px 0px 19px 10px rgba(0,0,68,0.46); ">'
s+='<div id="btns0" style="position:absolute; left:5px; top:3px;">'
s+='<span style="font: 20px Arial; text-align: center; ">Disks: </span>'
s+=wrap({id:'num',tag:'out',style:'width:40px;'},'3')
s+='<button id="dnBtn" style="margin:0 0 0 2px; font-size: 16px;  " class="btn"  onclick="numDn()" >&#x25BC;</button>'
s+='<button id="upBtn" style="margin:0;  font-size: 16px;  " class="btn"  onclick="numUp()" >&#x25B2;</button>'
s+='<span id="moves" style="text-align: center; margin-left: 15px; font: bold 20px Arial; color: blue; ">Moves: 0</span>'
s+='<button style="margin-left: 20px; " class="btn"  onclick="gameNew()" >Restart</button>'
s+='<button style="margin-left: 2px; " class="btn"  onclick="logOpen()" >Log</button>'
s+='<button style="margin-left: 2px; " class="btn"  onclick="solveIt()" >Solve!</button>'
s+='</div>'
s+=`<div id="logPop" style="position:absolute; left:0; top:40px; font: bold 36px Arial; text-align: center; color: gold;">
  <textarea id="log" style="width:400px; height:200px;"></textarea>
  </div>`
s+='<div id="disks" style="position:absolute; left:0; top:0;">YO!</div>'
s+='<div id="success" style="position:absolute; left:0; top:40px; width:'+w+'px; font: bold 36px Arial; text-align: center; color: gold;">Well Done !</div>'
s+='<canvas id="canvasId" width="'+w+'" height="'+h+'" style="z-index:2;"></canvas>'
s+='<div id="info" style="position:absolute; right:20px; bottom:5px; margin-left: 30px; font: 16px Arial; text-align: center; ">Minimum Moves: 7</div>'
s+=wrap({cls:'copyrt',style:'left:5px; bottom:3px'},`&copy; 2021 MathsIsFun.com  v${version}`)
s+='</div>'
docInsert(s)
el=document.getElementById('canvasId')
ratio=2
el.width=w*ratio
el.height=h*ratio
el.style.width=w+'px'
el.style.height=h+'px'
g=el.getContext('2d')
g.setTransform(ratio,0,0,ratio,0,0)
shapes=[]
my.poles=[]
this.moveN=0
this.my.diskTot=3
my.logPop=new Pop('logPop','','','','')
gameNew()
el.addEventListener('mousedown',mouseDown,false)
el.addEventListener('touchstart',touchStart,false)
el.addEventListener('mousemove',doPointer,false)}
function logOpen(){document.getElementById('log').value=my.log
my.logPop.open()}
function getNum(){return this.my.diskTot}
function numDn(){var num=getNum()
if(num>3){num--
chgNumPts(num)}}
function numUp(){var num=getNum()
if(num<8){num++
chgNumPts(num)}}
function chgNumPts(n){document.getElementById('num').innerHTML=n
this.my.diskTot=n
gameNew()}
function drawPoles(){for(var i=0;i<my.poles.length;i++){drawPole(my.poleX+i*my.poleDist,my.poleY)}}
function drawPole(x,y){var wd=150
var ht=145
g.lineWidth=1
g.strokeStyle='blue'
g.fillStyle='#d43'
g.beginPath()
g.roundRect(x-3,y-ht,6,ht,6,3)
g.roundRect(x-wd/2,y-3,wd,8,4)
g.closePath()
g.stroke()
g.fill()}
function gameNew(){moveNChg(0)
stopAnim()
var p0=[]
for(var i=my.diskTot-1;i>=0;i--){p0.push(i)}
my.poles=[p0,[],[]]
disksMake()
disksPlace()
g.clearRect(0,0,g.canvas.width,g.canvas.height)
drawPoles()
successTest()
my.log=''
my.logStt=performance.now()
document.getElementById('info').innerHTML='Minimum Moves: '+((1<<my.diskTot)-1).toString()}
function disksMake(){var div=document.getElementById('disks')
while(div.firstChild){div.removeChild(div.firstChild)}
my.disks=[]
for(var i=0;i<my.diskTot;i++){var disk=new Disk(0,0,i)
div.appendChild(disk.div)
my.disks.push(disk)}
disksToPoles()
console.log('disksMake',my.disks)}
function disksPlace(fastQ=true){for(var i=0;i<my.disks.length;i++){var disk=my.disks[i]
disk.x=my.poleX+my.poleDist*disk.pole-disk.wd/2
disk.y=my.poleY-disk.polePos*my.diskHt-disk.ht/5
disk.moveMe(fastQ)}}
function disksToPoles(){my.poles=[[],[],[]]
for(var i=my.disks.length-1;i>=0;i--){var disk=my.disks[i]
my.poles[disk.pole].unshift(i)
disk.polePos=my.poles[disk.pole].length}}
function touchStart(evt){var touch=evt.targetTouches[0]
evt.clientX=touch.clientX
evt.clientY=touch.clientY
evt.touchQ=true
mouseDown(evt)}
function touchMove(evt){var touch=evt.targetTouches[0]
evt.clientX=touch.clientX
evt.clientY=touch.clientY
evt.touchQ=true
mouseMove(evt)
evt.preventDefault()}
function touchEnd(evt){el.addEventListener('touchstart',touchStart,false)
window.removeEventListener('touchend',touchEnd,false)
if(my.drag.q){my.drag.q=false
my.disks[my.drag.n].hiliteQ=false
doDrop(my.drag.n)
my.drag.n=-1
window.removeEventListener('touchmove',touchMove,false)}}
function doPointer(e){var bRect=el.getBoundingClientRect()
var mouseX=(e.clientX-bRect.left)*(el.width/ratio/bRect.width)
var mouseY=(e.clientY-bRect.top)*(el.height/ratio/bRect.height)
var inQ=false
for(var i=0;i<my.disks.length;i++){var disk=my.disks[i]
if(hitTest(disk,mouseX,mouseY)){if(topDiskQ(i)){inQ=true}}}
if(inQ){document.body.style.cursor='pointer'}else{document.body.style.cursor='default'}}
function mouseDown(evt){var i
var bRect=el.getBoundingClientRect()
var mouseX=(evt.clientX-bRect.left)*(el.width/ratio/bRect.width)
var mouseY=(evt.clientY-bRect.top)*(el.height/ratio/bRect.height)
for(i=0;i<my.disks.length;i++){var shape=my.disks[i]
console.log('mouseDown',my.drag,shape)
console.log('hitTest',shape.x,shape.y,mouseX,mouseY,shape.wd,shape.ht,hitTest(shape,mouseX,mouseY))
if(hitTest(shape,mouseX,mouseY)){if(topDiskQ(i)){my.dragStt=performance.now()
my.drag.q=true
console.log('asd',my.drag,shape)
my.drag.hold.x=mouseX-shape.x
my.drag.hold.y=mouseY-shape.y
my.drag.n=i
my.disks[my.drag.n].hilite(true)}}}
if(my.drag.q){if(evt.touchQ){window.addEventListener('touchmove',touchMove,false)}else{window.addEventListener('mousemove',mouseMove,false)}}
if(evt.touchQ){el.removeEventListener('touchstart',touchStart,false)
window.addEventListener('touchend',touchEnd,false)}else{el.removeEventListener('mousedown',mouseDown,false)
window.addEventListener('mouseup',mouseUp,false)}
if(evt.preventDefault){evt.preventDefault()}
else if(evt.returnValue){evt.returnValue=false}
return false}
function mouseUp(evt){el.addEventListener('mousedown',mouseDown,false)
window.removeEventListener('mouseup',mouseUp,false)
if(my.drag.q){my.drag.q=false
my.disks[my.drag.n].hiliteQ=false
doDrop(my.drag.n)
my.drag.n=-1
window.removeEventListener('mousemove',mouseMove,false)}}
function mouseMove(evt){if(my.drag.n<0)return
var bRect=el.getBoundingClientRect()
var mouseX=(evt.clientX-bRect.left)*(el.width/ratio/bRect.width)
var mouseY=(evt.clientY-bRect.top)*(el.height/ratio/bRect.height)
var posX=mouseX-my.drag.hold.x
var posY=mouseY-my.drag.hold.y
my.disks[my.drag.n].x=posX
my.disks[my.drag.n].y=posY
my.disks[my.drag.n].moveMe(true)}
function topDiskQ(n){for(var i=0;i<my.poles.length;i++){var pole=my.poles[i]
if(pole.length>0){if(n==pole[0])return true}}
return false}
function hitTest(shape,mx,my){if(mx<shape.x)return false
if(my<shape.y)return false
if(mx>shape.x+shape.wd)return false
if(my>shape.y+shape.ht)return false
return true}
function doDrop(dropNo){var disk=my.disks[dropNo]
disk.hilite(false)
var p=Math.round((disk.x-my.poleX)/my.poleDist)
p=Math.max(0,Math.min(p,2))
if(p!=disk.pole){var okQ=false
var pole=my.poles[p]
if(pole.length==0){okQ=true}else{var top=pole[0]
console.log('doDrp',dropNo,top)
if(dropNo<top)okQ=true}
if(okQ){console.log('doDrop chg:',disk,disk.pole,p)
my.log+=parseInt(my.dragStt-my.logStt)/1000+', '+parseInt(performance.now()-my.logStt)/1000+', '+disk.n+', '+disk.pole+', '+p+'\n'
moveNChg(1)
disk.pole=p}}
disksToPoles()
disksPlace()
console.log('my.poles',my.poles)
successTest()}
function successTest(){document.getElementById('success').innerHTML=''
if(isSuccess()){successDo()}}
function isSuccess(){var p2=my.poles[2]
console.log('isSuccess p2',p2)
if(p2.length!=my.diskTot)return false
for(var i=0;i<my.diskTot;i++){if(p2[i]!=i)return false}
return true}
function successDo(){document.getElementById('success').innerHTML='Well Done !'
my.log+=parseInt(performance.now()-my.logStt)/1000+', '+'Success!'+'\n'}
function moveNChg(n){if(n==1){this.moveN++}else{this.moveN=0}
document.getElementById('moves').innerHTML='Moves: '+this.moveN}
function solveIt(){gameNew()
my.moves=[]
hanoi(0,2,1,this.my.diskTot)
console.log('solveIt',my.moves.join(':'))
my.frame=25
my.moveNo=0
moveNChg(0)
solveAnim()}
function stopAnim(){my.moveNo=my.moves.length+1}
function solveAnim(){if(my.moveNo>my.moves.length)return
my.frame++
if(my.frame>60){my.frame=0
var move=my.moves[my.moveNo]
var poleFr=my.poles[move[0]]
var diskFr=poleFr[0]
my.disks[diskFr].pole=move[1]
disksToPoles()
disksPlace(false)
my.moveNo++
moveNChg(1)}
if(my.moveNo<my.moves.length)requestAnimationFrame(solveAnim)}
function hanoi(from,to,buf,nmv){if(nmv>1){hanoi(from,buf,to,nmv-1)
my.moves.push([from,to])
hanoi(buf,to,from,nmv-1)}else{my.moves.push([from,to])}}
class Pop{constructor(id,yesStr,yesFunc,noStr,noFunc){this.id=id
this.div=document.getElementById(this.id)
this.div.style='position:absolute; left:-450px; top:10px; width:auto; padding: 5px; border-radius: 9px; background-color: #88aaff; box-shadow: 10px 10px 5px 0px rgba(40,40,40,0.75); transition: all linear 0.3s; opacity:0; text-align: center; '
this.bodyDiv=document.createElement('div')
this.div.appendChild(this.bodyDiv)
var yesBtn=document.createElement('button')
this.div.appendChild(yesBtn)
if(yesStr.length<1){yesStr='&#x2714;'
yesBtn.style='font: 22px Arial;'}
yesBtn.innerHTML=yesStr
yesBtn.classList.add('togglebtn')
yesBtn.onclick=this.yes.bind(this)
if(false){var noBtn=document.createElement('button')
this.div.appendChild(noBtn)
if(noStr.length<1){noStr='&#x2718;'
noBtn.style='font: 22px Arial;'}
noBtn.innerHTML=noStr
noBtn.classList.add('togglebtn')
noBtn.onclick=this.no.bind(this)}
this.yesFunc=yesFunc
this.noFunc=noFunc
return this}
open(){var div=this.div
div.style.transitionDuration='0.3s'
div.style.opacity=1
div.style.zIndex=12
div.style.left=10+'px'}
yes(me){console.log('me',me)
var div=document.getElementById(this.id)
div.style.opacity=0
div.style.zIndex=1
div.style.left='-999px'
if(typeof this.yesFunc==='function'){this.yesFunc()}}
no(){console.log('Pop no')
var div=this.div
div.style.opacity=0
div.style.zIndex=1
div.style.left='-999px'
if(typeof this.noFunc==='function'){this.noFunc()}}
bodySet(s){this.bodyDiv.innerHTML=s
return s}}
class Disk{constructor(x,y,n){this.x=x
this.y=y
this.n=n
this.wd=(n+2)*my.diskHt
this.ht=my.diskHt
this.pad=4
this.pole=0
this.hiliteQ=false
var ratio=2
this.div=document.createElement('div')
this.div.style.position='absolute'
this.div.style.pointerEvents='none'
this.div.style.transitionDuration='0s'
document.getElementById('disks').appendChild(this.div)
this.elFG=document.createElement('canvas')
this.elFG.style.position='absolute'
this.div.appendChild(this.elFG)
var canWd=this.wd+this.pad*2
var canHt=this.ht+this.pad*2
this.elFG.width=canWd*ratio
this.elFG.height=canHt*ratio
this.elFG.style.width=canWd+'px'
this.elFG.style.height=canHt+'px'
this.elFG.style.zIndex=2
this.gFG=this.elFG.getContext('2d')
this.gFG.setTransform(ratio,0,0,ratio,0,0)
this.elBG=document.createElement('canvas')
this.elBG.style.position='absolute'
this.div.appendChild(this.elBG)
this.elBG.width=canWd*ratio
this.elBG.height=canHt*ratio
this.elBG.style.width=canWd+'px'
this.elBG.style.height=canHt+'px'
this.elBG.style.zIndex=1
this.gBG=this.elBG.getContext('2d')
this.gBG.setTransform(ratio,0,0,ratio,0,0)
this.moveMe(true)
this.drawMe()
return this}
removeMe(){this.elFG.parentNode.removeChild(this.elFG)
this.elBG.parentNode.removeChild(this.elBG)}
moveMe(fastQ=true){if(fastQ){this.div.style.transitionDuration='0s'}else{this.div.style.transitionDuration='0.8s'}
this.div.style.left=this.x-this.pad+'px'
this.div.style.top=this.y-this.pad+'px'}
drawMe(){console.log('drawMe',this.hiliteQ)
var g=this.gFG
g.clearRect(0,0,g.canvas.width,g.canvas.height)
if(this.hiliteQ){console.log('hilite',this)
g.strokeStyle='rgba(150, 150, 33, 1)'
g.lineWidth=1}else{g.strokeStyle='black'
g.lineWidth=1}
g.fillStyle=my.clrs[this.n][1]
g.beginPath()
g.roundRect(this.pad,this.pad,this.wd,this.ht,10)
g.closePath()
g.stroke()
g.fill()}
hilite(onQ){this.hiliteQ=onQ
this.drawMe()}}
function hex2rgba(hex,opacity){hex=hex.replace('#','')
var r=parseInt(hex.substring(0,2),16)
var g=parseInt(hex.substring(2,4),16)
var b=parseInt(hex.substring(4,6),16)
return 'rgba('+r+','+g+','+b+','+opacity+')'}
CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){if(w<2*r)r=w/2
if(h<2*r)r=h/2
this.moveTo(x+r,y)
this.arcTo(x+w,y,x+w,y+h,r)
this.arcTo(x+w,y+h,x,y+h,r)
this.arcTo(x,y+h,x,y,r)
this.arcTo(x,y,x+w,y,r)
return this}
my.drag={n:0,onq:false,holdX:0,holdY:0}
class Mouse{constructor(el){console.log('new moose')
el.addEventListener('touchstart',this.onTouchStart.bind(this),false)
el.addEventListener('touchmove',this.onTouchMove.bind(this),false)
window.addEventListener('touchend',this.onTouchEnd.bind(this),false)
el.addEventListener('mousedown',this.onMouseDown.bind(this),false)
el.addEventListener('mousemove',this.onMouseMove.bind(this),false)
window.addEventListener('mouseup',this.onMouseUp.bind(this),false)
this.el=el
this.ratio=1}
onTouchStart(ev){console.log('onTouchStart',this)
let touch=ev.targetTouches[0]
ev.clientX=touch.clientX
ev.clientY=touch.clientY
ev.touchQ=true
this.onMouseDown(ev)}
onTouchMove(ev){let touch=ev.targetTouches[0]
ev.clientX=touch.clientX
ev.clientY=touch.clientY
ev.touchQ=true
this.onMouseMove(ev)}
onTouchEnd(ev){my.moose.onMouseUp(ev)}
onMouseDown(ev){document.getElementById('angA').focus()
let mouse=this.mousePos(ev)
console.log('moose doon',mouse.x,mouse.y,my.shapes)
my.drag.onQ=false
my.drag.n=this.hitFind(my.shapes,mouse)
if(my.drag.n>=0){console.log('drrragin!',my.drag.n)
let pt=my.shapes[my.drag.n]
my.drag.holdX=mouse.x-pt.x
my.drag.holdY=mouse.y-pt.y
my.shapes[my.drag.n].shadQ=true
my.drag.onQ=true}
ev.preventDefault()}
onMouseMove(ev){let mouse=this.mousePos(ev)
if(my.drag.onQ){let shape=my.shapes[my.drag.n]
let pt={x:mouse.x-my.drag.holdX,y:mouse.y-my.drag.holdY}
shape.x=pt.x
shape.y=pt.y
shape.div.style.left=pt.x+'px'
shape.div.style.top=pt.y+'px'
shape.div.style.filter='drop-shadow(3px 3px 3px #229)'}else{if(this.hitFind(my.shapes,mouse)>=0){document.body.style.cursor='pointer'}else{document.body.style.cursor='default'}}}
onMouseUp(){if(my.drag.onQ){my.shapes[my.drag.n].div.style.filter='none'
my.drag.onQ=false}
document.body.style.cursor='default'}
mousePos(ev){let bRect=this.el.getBoundingClientRect()
return{x:(ev.clientX-bRect.left)*(bRect.width/this.ratio/bRect.width),y:(ev.clientY-bRect.top)*(bRect.height/this.ratio/bRect.height),}}
hitFind(pts,mouse){for(let i=0;i<my.shapes.length;i++){if(this.hitTest(my.shapes[i],mouse)){return i}}
return-1}
hitTest(shape,mouse){if(mouse.x<shape.x)return false
if(mouse.y<shape.y)return false
if(mouse.x>shape.x+shape.wd)return false
if(mouse.y>shape.y+shape.ht)return false
return true}}
my.theme=localStorage.getItem('theme')
my.lineClr=my.theme=='dark'?'white':'black'
my.imgHome=(document.domain=='localhost'?'/mathsisfun':'')+'/numbers/images/'
my.opts={name:'user'}
function optGet(name){let val=localStorage.getItem(`mif.${name}`)
if(val==null)val=my.opts[name]
return val}
function optSet(name,val){localStorage.setItem(`mif.${name}`,val)
my.opts[name]=val}
function getJSQueryVar(varName,defaultVal){let scripts=document.getElementsByTagName('script')
let lastScript=scripts[scripts.length-1]
let scriptName=lastScript.src
let bits=scriptName.split('?')
if(bits.length<2)return defaultVal
let query=bits[1]
console.log('query: ',query)
let vars=query.split('&')
for(let i=0;i<vars.length;i++){let pair=vars[i].split('=')
if(pair[0]==varName){return pair[1]}}
return defaultVal}
window.addEventListener('storage',themeChg)
themeChg()
function themeChg(){my.theme=localStorage.getItem('theme')
console.log('themeChg to',my.theme)
if(my.theme=='dark'){my.noClr='black'
my.yesClr='#036'}else{my.noClr='#f8f8f8'
my.yesClr='#dfd'}}
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
return '<button onclick="'+fn+'"'},can:()=>'<canvas',div:()=>'<div',edit:()=>'<textarea onkeyup="'+fn+'" onchange="'+fn+'"',inp:()=>{if(cls.length==0)cls='input'
let s=''
s+=lbl.length>0?'<label class="label">'+lbl+' ':''
s+='<input value="'+txt+'"'
s+=fn.length>0?'  oninput="'+fn+'" onchange="'+fn+'"':''
return s},out:()=>{pos='dib'
if(cls.length==0)cls='output'
let s=''
s+=lbl.length>0?'<label class="label">'+lbl+' ':''
s+='<span '
return s},rad:()=>{if(cls.length==0)cls='radio'
return '<form'+(fn.length>0?(s+=' onclick="'+fn+'"'):'')},sel:()=>{if(cls.length==0)cls='select'
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
s+={btn:()=>'>'+txt+'</button>',can:()=>'></canvas>',div:()=>' >'+txt+'</div>',edit:()=>' >'+txt+'</textarea>',inp:()=>'>'+(lbl.length>0?'</label>':''),out:()=>' >'+txt+'</span>'+(lbl.length>0?'</label>':''),rad:()=>{let s=''
s+='>\n'
for(let i=0;i<opts.length;i++){let chk=''
if(i==0)chk='checked'
s+='<input type="radio" id="r'+i+'" name="typ" style="cursor:pointer;" value="'+opts[i][0]+'" '+chk+' />\n'
s+='<label for="r'+i+'" style="cursor:pointer;">'+opts[i][1]+'</label><br/>\n'}
s+='</form>'
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