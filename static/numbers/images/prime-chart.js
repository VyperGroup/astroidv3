let my={}
function init(){let version='0.89'
let m=getQueryVariable('g')
if(m){this.mode=m}else{this.mode='by6'}
my.opts={gameN:0,bdSz:5}
my.cellWd=46
my.cellHt=26
my.sttClr='white'
my.yesClr='gold'
my.noClr='#cdf'
my.anims=[]
my.games=[{id:'1-100',name:'10 wide, to 100',pos:'list',cols:10,rows:10,stt:1,skip:1,yGap:0,density:0.2},{id:'1-200',name:'10 wide, to 200',pos:'list',cols:10,rows:20,stt:1,skip:1,yGap:0,density:0.2},{id:'by6',name:'6 wide to 60',pos:'list',cols:6,rows:10,stt:1,skip:1,yGap:0,density:0.2},{id:'by12',name:'12 wide to 120',pos:'list',cols:12,rows:10,stt:1,skip:1,yGap:0,density:0.2},{id:'by6',name:'5 wide to 100',pos:'list',cols:5,rows:20,stt:1,skip:1,yGap:0,density:0.2},]
my.game=my.games[my.opts.gameN]
console.log('my.game',my.game)
let s=''
s+='<div style="position:relative; text-align: center; border-radius: 10px; margin:auto; display:block; background-color: #66ffcc; padding:10px; ">'
s+=getArrowBox()
s+='<div id="control" style="width: 100%; height:30px; margin: auto;  ">'
s+='<div id="info" style="position: absolute; left: 0px; top: 0px; font: 26px Verdana; width: 100%; margin: auto; background-color: lightyellow; color: goldenrod; border-radius: 10px; ">&nbsp;</div>'
s+='<button id="optBtn" class="btn" style="position: absolute; left: 0px; top: 0px; font: 14px Arial; height:30px; vertical-align:middle; z-index: 10;" onclick="optPop()" >Options</button>'
s+='</div>'
s+='<div id="grid" style="font: 17px Verdana;">'
s+=gridHTML(this.mode)
s+='</div>'
s+='<div id="success" style="font: 40px Verdana; position: absolute; left: -500px; top: 120px; width: 500px; margin: auto; background-color: lightyellow; color: goldenrod; border-radius: 10px; transition: all 1s; opacity: 0; padding: 10px; box-shadow: 2px 2px 2px 0px rgba(255,255,0,0.75); ">'
s+='Well Done!<br>'
s+='<button class="btn" onclick="restart()">Again</button>'
s+='</div>'
s+='<div id="ansBox" class="arrowBox" style="position: absolute; left: 50px; top: 60px; visibility: hidden;"></div>'
s+=wrap({cls:'copyrt',style:'margin-top:5px;'},`&copy; 2022 Rod Pierce  v${version}`)
s+=optPopHTML()
s+='</div>'
docInsert(s)
my.animNo=0
my.loopNo=0}
function gameNew(){let div=document.getElementById('grid')
div.innerHTML=gridHTML(this.mode)
document.getElementById('info').innerHTML=''
my.animNo=999
my.loopNo=999}
function animStt(){my.animNo=0
my.loopNo=0
console.log('my.anims',my.anims)
animLoop()}
function animLoop(){let div=document.getElementById(my.anims[my.animNo])
div.style.backgroundColor=my.loopNo<2?getRandomClr():typClr(div.getAttribute('data-typ')<<0)
my.animNo++
if(my.animNo>=my.anims.length){my.animNo=0
my.loopNo++}
if(my.loopNo<3)requestAnimationFrame(animLoop)}
function getAns(row,col){let x=0
if(my.game.pos=='units'){x=row*my.game.cols+col+1}else{x=my.game.stt+(row*my.game.cols+col)*my.game.skip}
return x}
function gridHTML(name){let s=''
my.anims=[]
let n=0
for(let i=0;i<my.game.rows;i++){s+='<div style="">'
for(let j=0;j<my.game.cols;j++){let clr=my.sttClr
let ans=0
if(my.game.pos=='units'){ans=i*my.game.cols+j+1}else{ans=my.game.stt+(i*my.game.cols+j)*my.game.skip}
let v=ans
let id='v'+ans
s+='<div id="'+id+'" data-typ="0" style="display: inline-block; width:'+(my.cellWd-2)+'px; height:'+(my.cellHt-2)+'px; text-align: center; color:black; background-color: '+clr+'; border: 1px solid white; user-select:none; cursor:pointer;" onmousedown="doClick(this)">'
s+=v
s+='</div>'
my.anims.push(id)
n++}
s+='</div>'}
return s}
function doClick(me){let typ=me.getAttribute('data-typ')<<0
switch(typ){case 0:let id=me.getAttribute('id')
let n=id.substr(1)<<0
console.log('n',n)
if(n==1)break
me.style.backgroundColor=my.yesClr
me.setAttribute('data-typ',1)
for(let i=n*2;i<=my.game.rows*my.game.cols;i=i+n){let div=document.getElementById('v'+i)
div.style.backgroundColor=my.noClr
div.setAttribute('data-typ',2)}
break
case 1:break
case 2:break
default:}
console.log('winQ=',winQ())
if(winQ())winDo()}
function typClr(typ){switch(typ){case 0:return my.sttClr
break
case 1:return my.yesClr
break
case 2:return my.noClr
break
default:}
return 'black'}
function winDo(){document.getElementById('info').innerHTML='Well Done!'
animStt()}
function winQ(){for(let i=2;i<=my.game.rows*my.game.cols;i++){let div=document.getElementById('v'+i)
let typ=div.getAttribute('data-typ')<<0
if(typ==0)return false}
return true}
function doAns(me){let ids=me.id.split('-')
let a=ids.pop()
let div=document.getElementById(ids.join('-'))
div.innerHTML=a
document.getElementById('ansBox').style.visibility='hidden'
let ans=div.getAttribute('ans')<<0
let clr=my.yesClr
if(a!=ans){clr=my.noClr}
div.style.backgroundColor=clr
if(winQ())winDo()}
function getArrowBox(){let s=''
s+='<style type="text/css">'
s+='.arrowBox {position: relative; border: 1px solid black; background: #def; }'
s+='.arrowBox:after, .arrowBox:before {content: " "; pointer-events: none; position: absolute; left: 50%; bottom: 100%; width: 0; height: 0; border: solid transparent; }'
s+='.arrowBox:after {border-color: rgba(221, 238, 255, 0); border-bottom-color: #def; border-width: 30px; margin-left: -30px; }'
s+='.arrowBox:before {border-color: rgba(0, 0, 0, 0); border-bottom-color: black; border-width: 31px; margin-left: -31px; }'
s+='</style>'
return s}
function getRandomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function getRandomClr(){let ltrs='56789ABCDEF'.split('')
let clr='#'
for(let i=0;i<6;i++){clr+=ltrs[Math.round(Math.random()*(ltrs.length-1))]}
return clr}
function getQueryVariable(variable){let query=window.location.search.substring(1)
let vars=query.split('&')
for(let i=0;i<vars.length;i++){let pair=vars[i].split('=')
if(pair[0]==variable){return pair[1]}}
return false}
function optGet(name){let val=localStorage.getItem(`cross-number.${name}`)
if(val==null)val=my.opts[name]
return val}
function optSet(name,val){localStorage.setItem(`cross-number.${name}`,val)
my.opts[name]=val}
function optPopHTML(){let s=''
s+='<div id="optpop" class="pop" style="position:absolute; left:-500px; top:20px; width:320px; ">'
s+='<style>input[type="radio"]:checked+label {font-weight: bold;}</style>'
s+=radioHTML('Option:','game',my.games,my.gameN,'radioClick')
s+='<div style="float:right; margin: 0 0 5px 10px; font:16px Arial;">'
s+='Restart? '
s+='<button class="btn" style="font: 22px Arial;" onclick="optYes()" >&#x2714;</button>'
s+=' '
s+='<button class="btn" style="font: 22px Arial;" onclick="optNo()" >&#x2718;</button>'
s+='</div>'
s+='</div>'
return s}
function optPop(){console.log('optpop')
let pop=document.getElementById('optpop')
pop.style.transitionDuration='0.3s'
pop.style.opacity=1
pop.style.zIndex=102
pop.style.left=(pop.parentElement.clientWidth-pop.clientWidth)/2+'px'}
function optYes(){let pop=document.getElementById('optpop')
pop.style.opacity=0
pop.style.zIndex=1
pop.style.left='-999px'
my.gameN=radioNGet('game')
console.log('optYes',my.gameN)
optSet('gameN',my.gameN)
my.game=my.games[my.gameN]
gameNew()}
function optNo(){let pop=document.getElementById('optpop')
pop.style.opacity=0
pop.style.zIndex=1
pop.style.left='-999px'}
function radioHTML(prompt,id,lbls,checkN,func){let s=''
s+='<div class="sect" style="position:relative; margin:auto;  margin: 5px 0 1px 0; padding: 5px 0 5px 0;">'
s+='<div style="font: bold 16px Arial;">'
s+=prompt
s+='</div>'
s+='<div class="radio" style="display:inline-block; text-align:left; ">'
for(let i=0;i<lbls.length;i++){let lbl=lbls[i]
let idi=id+i
let chkStr=i==checkN?' checked ':''
s+='<input id="'+idi+'" type="radio" name="'+id+'" value="'+lbl.id+'" onclick="'+func+'('+i+');" autocomplete="off" '+chkStr+' >'
s+='<label for="'+idi+'">'+lbl.name+' </label>'
s+='<br>'}
s+='</div>'
s+='</div>'
return s}
function radioNGet(name){let div=document.querySelector('input[name="'+name+'"]:checked')
let id=div.id
let n=(id.match(/\d+$/)||[]).pop()
return n}
function radioClick(n){}
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