let my={}
function init(){let version='0.82'
let w=520
let h=240
let s=''
s+='<canvas id="canvasId" width="'+w+'" height="'+h+'" style="z-index:100;"></canvas>'
s+='<div style="font: 16px arial; font-weight: bold; position:absolute; bottom:3px; right:10px; text-align:center;">Drag the numerals to the blue boxes</div>'
s+=wrap({cls:'copyrt',pos:'abs',style:'left:5px; bottom:3px'},`&copy; 2022 Rod Pierce  v${version}`)
s=wrap({cls:'js',style:'width:'+w+'px; height:'+my.ht+'px;'},s)
docInsert(s)
my.can=new Can('canvasId',w,h,2)
my.drag={n:0,onq:false,holdX:0,holdY:0}
my.shapes=[]
my.startX=10
my.cellWidth=40
my.spacing=10
my.drag.onQ=false
this.numbers=[0,1,2,3,4,5,6,7,8,9]
my.dests=[[70,100,60,40,0],[210,100,60,40,0],]
my.eqs=['1','+','2','=','3']
this.ball={size:10,color:'white',lightColor:'yellow',darkColor:'blue',position:{x:160,y:120}}
newGame()
let el=my.can.el
el.addEventListener('mousedown',mouseDownListener,false)
el.addEventListener('touchstart',ontouchstart,false)
el.addEventListener('mousemove',dopointer,false)}
function newGame(){makeShapes()
drawShapes()}
function ontouchstart(ev){let touch=ev.targetTouches[0]
ev.clientX=touch.clientX
ev.clientY=touch.clientY
ev.touchQ=true
mouseDownListener(ev)}
function ontouchmove(ev){let touch=ev.targetTouches[0]
ev.clientX=touch.clientX
ev.clientY=touch.clientY
ev.touchQ=true
mouseMoveListener(ev)
ev.preventDefault()}
function ontouchend(ev){my.can.el.addEventListener('touchstart',ontouchstart,false)
window.removeEventListener('touchend',ontouchend,false)
let[mouseX,mouseY]=my.can.mousePos(ev)
drop(mouseX,mouseY)
if(my.drag.onQ){my.drag.onQ=false
window.removeEventListener('touchmove',ontouchmove,false)}}
function dopointer(ev){let[mouseX,mouseY]=my.can.mousePos(ev)
let inQ=false
for(let i=0;i<my.shapes.length;i++){if(hitTest(my.shapes[i],mouseX,mouseY)){inQ=true}}
if(inQ){document.body.style.cursor='pointer'}else{document.body.style.cursor='default'}}
function mouseDownListener(ev){let i
let highestIndex=-1
let[mouseX,mouseY]=my.can.mousePos(ev)
for(i=0;i<my.shapes.length;i++){if(hitTest(my.shapes[i],mouseX,mouseY)){my.drag.onQ=true
if(i>highestIndex){my.drag.holdX=mouseX-my.shapes[i].x
my.drag.holdY=mouseY-my.shapes[i].y
highestIndex=i
my.drag.n=i}}}
if(my.drag.onQ){if(ev.touchQ){window.addEventListener('touchmove',ontouchmove,false)}else{window.addEventListener('mousemove',mouseMoveListener,false)}}
if(ev.touchQ){my.can.el.removeEventListener('touchstart',ontouchstart,false)
window.addEventListener('touchend',ontouchend,false)}else{my.can.el.removeEventListener('mousedown',mouseDownListener,false)
window.addEventListener('mouseup',mouseUpListener,false)}
if(ev.preventDefault){ev.preventDefault()}
else if(ev.returnValue){ev.returnValue=false}
return false}
function mouseUpListener(ev){my.can.el.addEventListener('mousedown',mouseDownListener,false)
window.removeEventListener('mouseup',mouseUpListener,false)
let[mouseX,mouseY]=my.can.mousePos(ev)
drop(mouseX,mouseY)
if(my.drag.onQ){my.drag.onQ=false
window.removeEventListener('mousemove',mouseMoveListener,false)}}
function mouseMoveListener(ev){if(my.drag.n<0)return
let[mouseX,mouseY]=my.can.mousePos(ev)
let minX=0
let maxX=my.can.el.width-my.shapes[my.drag.n].wd
let posX=mouseX-my.drag.holdX
posX=posX<minX?minX:posX>maxX?maxX:posX
let posY=mouseY-my.drag.holdY
my.shapes[my.drag.n].x=posX
my.shapes[my.drag.n].y=posY
for(let i=0;i<my.dests.length;i++){let dest=my.dests[i]
if(isIn(mouseX,mouseY,dest[0],dest[1],dest[2],dest[3])){dest[4]=1}else{dest[4]=0}}
drawShapes()}
function drop(mouseX,mouseY){for(let i=0;i<my.dests.length;i++){let dest=my.dests[i]
dest[4]=0
if(isIn(mouseX,mouseY,dest[0],dest[1],dest[2],dest[3])){updateDest(i,my.drag.n)}}}
function updateDest(to,from){if(to==0){my.eqs[0]=from}else{my.eqs[2]=from}
my.eqs[4]=(my.eqs[0]>>0)+(my.eqs[2]>>0)
makeShapes()
drawShapes()}
function isIn(x,y,lt,tp,wd,ht){if(x<lt)return false
if(x>lt+wd)return false
if(y<tp)return false
if(y>tp+ht)return false
return true}
function hitTest(shape,mx,my){if(mx<shape.x)return false
if(my<shape.y)return false
if(mx>shape.x+shape.wd)return false
if(my>shape.y+shape.ht)return false
return true}
function makeShapes(){my.shapes=[]
for(let i=0;i<this.numbers.length;i++){let tempX=my.startX+i*(my.cellWidth+my.spacing)
let tempY=20
let tempColor='rgb('+0+','+0+','+255+')'
let tempShape={x:tempX,y:tempY,wd:my.cellWidth,ht:my.cellWidth,color:tempColor,txt:this.numbers[i].toString()}
my.shapes.push(tempShape)}}
function drawShapes(){my.can.clear()
let g=my.can.g
for(let i=0;i<my.dests.length;i++){let dest=my.dests[i]
if(dest[4]==0){g.fillStyle='rgba(190, 210, 255, 0.6)'}else{g.fillStyle='rgba(255, 255, 0, 0.8)'}
g.beginPath()
g.rect(dest[0],dest[1],dest[2],dest[3])
g.closePath()
g.fill()}
g.font='bold 30px Arial'
g.textAlign='center'
for(let i=0;i<my.eqs.length;i++){let x=70+i*70
let y=100
g.strokeStyle='rgba(0, 0, 0, 1)'
g.fillStyle='hsla(240,100%,60%,1)'
g.fillText(my.eqs[i],x+60/2,y+40/2+8)}
g.lineWidth=1
g.strokeStyle='#aaaaaa'
for(let i=0;i<my.shapes.length;i++){g.lineWidth=1
g.strokeStyle='rgba(0, 0, 0, 1)'
g.fillStyle='rgba(220, 255, 220, 0.8)'
g.beginPath()
g.rect(my.shapes[i].x,my.shapes[i].y,my.shapes[i].wd,my.shapes[i].ht)
g.closePath()
g.stroke()
g.fill()
g.strokeStyle='rgba(0, 0, 0, 1)'
g.fillStyle='black'
g.font='bold 20px Arial'
g.textAlign='center'
g.fillText(my.shapes[i].txt,my.shapes[i].x+my.shapes[i].wd/2,my.shapes[i].y+my.shapes[i].ht/2+6,100)}
drawBalls(my.dests[0][0]-1,my.dests[0][1]+48,my.eqs[0])
drawBalls(my.dests[1][0]-1,my.dests[1][1]+48,my.eqs[2])
drawBalls(350,my.dests[0][1]+48,my.eqs[4])}
function drawBalls(x,y,n){if(n==0)return
let g=my.can.g
let xp=0
let yp=0
for(let i=0;i<n;i++){g.ball(this.ball,x+xp,y+yp)
xp+=22
if(xp>100){xp-=110
yp+=22}}}
CanvasRenderingContext2D.prototype.ball=function(ball,x,y){let size=ball.size
this.beginPath()
this.fillStyle=ball.color
this.arc(x,y,size,0,Math.PI*2,true)
let gradient=this.createRadialGradient(x-size/2,y-size/2,0,x,y,size)
gradient.addColorStop(0,ball.color)
gradient.addColorStop(1,ball.darkColor)
this.fillStyle=gradient
this.fill()
this.closePath()
this.beginPath()
this.arc(x,y,size*0.85,(Math.PI/180)*270,(Math.PI/180)*200,true)
gradient=this.createRadialGradient(x-size*0.5,y-size*0.5,0,x,y,size)
gradient.addColorStop(0,ball.lightColor)
gradient.addColorStop(0.5,'transparent')
this.fillStyle=gradient
this.fill()}
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