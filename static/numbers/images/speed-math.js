let w,h,ratio,el,g,my={};function init(){my.version='0.64'
w=360;h=360;my.wd=75;my.ht=55;my.games=[{name:'? + ?',typ:'add',layout:['d','+','d']},{name:'?? + ?',typ:'add',layout:['d','d','br','d']},{name:'?? + ??',typ:'add',layout:['d','d','br','d','d']},{name:'? x ?',typ:'mul',layout:['d','x','d']},{name:'?? x ?',typ:'mul',layout:['d','d','br','x','d']},{name:'?? x ??',typ:'mul',layout:['d','d','br','x','d','d']}];for(let i=0;i<my.games.length;i++){let game=my.games[i];game.name=game.name.replace(/\?/g,'<span style="font-size: 120%; color:blue; padding: 0 0 0 3px;">&#9609;</span>')}
my.gameNo=0;my.game=my.games[my.gameNo];let s='';s+='<style>'
s+='.clickbtn { display: inline-block; position: relative; text-align: center; margin: 2px; text-decoration: none; font: 14px/25px Arial, sans-serif; color: #19667d; border: 1px solid #88aaff; border-radius: 10px; cursor: pointer; background: linear-gradient(to top right, rgba(170,190,255,1) 0%, rgba(255,255,255,1) 100%); }'
s+='.clickbtn:hover { background: linear-gradient(to top, rgba(255,255,0,1) 0%, rgba(255,255,255,1) 100%); }'
s+='</style>'
my.soundHome=(document.domain=='localhost')?'/mathsisfun/images/sounds/':'/images/sounds/'
s+='<audio id="sndyes" src="'+my.soundHome+'yes2.mp3" preload="auto"></audio>';s+='<audio id="sndno" src="'+my.soundHome+'no.mp3" preload="auto"></audio>';s+='<div id="main" style="position:relative; width:'+w+'px; min-height:'+h+'px; margin:auto; display:block; border: none; border-radius: 10px;">';s+='<canvas id="can1" width="360" height="280" style="position: absolute; left: 0px; top: 0px;"></canvas>';s+='<div style="visibility:hidden">';s+='<svg id="svg1" xmlns="http://www.w3.org/2000/svg" width="9" height="9">';s+='<line x1="10" y1="0" x2="0" y2="10" stroke-width="1" stroke="green"/>';s+='</svg>';s+='</div>';s+='<div id="result" style="position: absolute; left: 10px; top: 15px; width: '+(w-60)+'px; text-align: center; padding: 20px; border: 2px solid blue; border-radius: 20px; background-color: rgba(0,0,100,1); z-index: 30; transition:opacity 1s; visibility:visible; ">';s+='<div id="msg" style="font: 20px Verdana; color: white;"></div>';s+='<br>';s+='<style>input[type="radio"]:checked+label {font-weight: bold;}</style>';s+=getRadioHTML('Game','game',my.games,'radioClick');s+='<button id="restart" style="font: 14px Arial; height:30px; text-align:right; z-index: 10;" class="clickbtn" onclick="gameStart()" >New Game</button>';s+='</div>';s+='<div id="ansBoxes" style="position: absolute; left: 230px; top: 100px; width: 140px; ">';s+='</div>';s+='<div id="board" style="position: relative; width: '+w+'px; background-color:#eee; border-radius: 10px; border: 2px solid #ddd;">';s+=boxHTML('right','Right');s+=boxHTML('wrong','Wrong');s+=boxHTML('avgspeed','Avg Time');s+='<div style="display:inline-block; border-left: 3px solid green; height: 40px; margin-top:10px;"></div>';s+=boxHTML('speed','Time (s)');s+='</div>';s+='<div  style="position:absolute; left:5px; bottom:22px; " >';s+='<button id="options" style="font: 14px Arial; height:30px; text-align:right; z-index: 10; margin-right:10px;" class="clickbtn" onclick="optionsShow(true)" >Options</button>';my.soundQ=true
s+=soundBtnHTML()
s+='</div>';s+='<div id="copyrt" style="font: 10px Arial; font-weight: bold; color: #6600cc; position:absolute; bottom:5px; left:5px; text-align:center;">&copy; 2019 MathsIsFun.com  v'+my.version+'</div>';s+='</div>';docInsert(s);my.noClickQ=false;el=document.getElementById('can1');ratio=2;el.width=w*ratio;el.height=h*ratio;el.style.width=w+"px";el.style.height=h+"px";g=el.getContext("2d");g.setTransform(ratio,0,0,ratio,0,0);}
function optionsShow(showQ){let div=document.getElementById('result');if(showQ){div.style.visibility='visible';div.style.opacity=1;}else{div.style.visibility='hidden';div.style.opacity=0;}}
function boxHTML(id,title){let s='';s+='<div style="display:inline-block; width:80px; padding: 4px; border-radius: 10px; text-align:center;">';s+='<span style="display: inline-block; width:80px; color:black; font: 14px Arial; text-align:center;">'+title+'</span><br>';s+='<span id = "'+id+'"  style="display: inline-block;width:70px; padding: 5px; border-radius: 10px;  color:blue; font: 24px Arial; text-align:center;">0</span></div>';return s;}
function Die(x,y){this.x=x;this.y=y;this.wd=70;this.ht=this.wd;this.roll();}
Die.prototype.roll=function(){this.animn=25;this.n=getRandomInt(1,6);this.rollAnim();}
Die.prototype.rollAnim=function(){g.die(this.x+this.wd*0.05,this.y+this.ht*0.05,this.wd*0.9,this.ht*0.9,getRandomInt(1,6));if(this.animn-->0){requestAnimationFrame(this.rollAnim.bind(this));}else{g.die(this.x,this.y,this.wd,this.ht,this.n);my.sttTime=performance.now();}}
function radioClick(n){my.gameNo=n;}
function gameStart(){my.game=my.games[my.gameNo];console.log("gameStart",my.game,my.gameNo);my.rightN=0;my.doneN=0;my.elapsedTot=0;my.maxRoundsN=10;optionsShow(false)
displayUpdate(0)
roundStart();}
function roundStart(){g.clearRect(0,0,el.width,el.height);my.sum=0;my.vals=[];let x=0;let y=120;my.dieWd=70;g.font='50px Arial';for(let i=0;i<my.game.layout.length;i++){let item=my.game.layout[i];switch(item){case 'd':let die=new Die(x,y);my.sum+=die.n;my.vals.push(die.n);x+=my.dieWd+8;break;case '+':g.fillStyle='blue';g.beginPath();g.fillText(item,x+2,y+my.dieWd/2+12);g.fill();x+=40;break;case 'x':g.fillStyle='blue';g.beginPath();g.fillText(item,x+2,y+my.dieWd/2+12);g.fill();x+=40;break;case 'br':x=0;y+=my.dieWd+8;break;default:}}
if(my.game.typ=='add'){my.ans=my.sum;}
if(my.game.typ=='mul'){let vals=my.vals;if(vals.length==2)my.ans=vals[0]*vals[1];if(vals.length==3)my.ans=(vals[0]+vals[1])*vals[2];if(vals.length==4)my.ans=(vals[0]+vals[1])*(vals[2]+vals[3]);}
console.log("ans",my.ans,my.doneN);if(my.ans>=100){console.log("CALL AGAIN",my.doneN);roundStart();return;}
my.inGameQ=true;my.revealN=0;if(my.ans<=12){my.ansStt=1;}else{if(my.ans>=my.ansStt&&my.ans<my.ansStt+12){}else{my.ansStt=my.ans-getRandomInt(0,11);}}
my.ansStt=Math.min(my.ansStt,100-12);showOpts(my.ansStt);}
function showOpts(stt){let div=document.getElementById('ansBoxes');div.style.visibility='visible';let s='';s+='<style>.opthover:hover {font-weight: bold; color: darkblue; background-color:#fad; border: 2px solid yellow;  }</style>';let val=stt;let n=0;for(let i=0;i<4;i++){s+='<div style="font: 27px Verdana;">';for(let j=0;j<3;j++){let id=n+'-'+val;s+='<div id="'+id+'" class="opthover" style="display: inline-block; color: black; width:40px; height:40px; text-align: center;  border: 2px solid white; cursor:pointer; background-color:#ded;" onmousedown="doAns(this)">';s+=val;s+='</div>';val++;n++;}
s+='</div>';}
div.innerHTML=s;}
function doAns(me){my.endTime=performance.now();let elapsed=my.endTime-my.sttTime;my.elapsedTot+=elapsed;me.style.border='2px solid black';let ids=me.id.split('-');let ans=ids.pop();my.doneN++;let correctQ=false;if(ans==my.ans){if(my.soundQ)document.getElementById('sndyes').play();correctQ=true;my.rightN++;}else{if(my.soundQ)document.getElementById('sndno').play();}
console.log("doAns",my.ans,ans,correctQ,my.rightN);displayUpdate(elapsed);if(my.doneN<my.maxRoundsN){setTimeout(roundStart,100);}else{doSuccess();}}
function displayUpdate(elapsed){document.getElementById('right').innerHTML=my.rightN;document.getElementById('wrong').innerHTML=my.doneN-my.rightN;document.getElementById('speed').innerHTML=(elapsed<<0)/1000;document.getElementById('avgspeed').innerHTML=((my.elapsedTot/my.doneN)<<0)/1000;}
function doSuccess(){console.log("doSuccess");let s='';if(my.rightN/my.doneN>0.6){s+='Well Done!<br>';}
s+='You got '+my.rightN+' of '+my.doneN+' correct<br>';s+=((my.elapsedTot/my.doneN)<<0)/1000+' second average';let div=document.getElementById('msg');div.innerHTML=s;optionsShow(true)}
function getRadioHTML(prompt,id,lbls,func){let s='';s+='<div style="display:inline-block; color:blue; border: 1px solid white; border-radius:5px; padding:3px; margin:3px; background-color:rgba(255,255,255,0.7);font: 20px Verdana; text-align:left;">';s+=prompt+':';for(let i=0;i<lbls.length;i++){let idi=id+i;let lbl=lbls[i];let check='';if(i==0)check='  checked="checked" ';s+='<div style="height:4px;"></div>';s+='<input id="'+idi+'" type="radio" name="'+id+'" value="'+lbl+'" onclick="'+func+'('+i+');"'+check+'   autocomplete="off" >';s+='<label for="'+idi+'">'+lbl.name+' </label>';}
s+='</div>';return s;}
function getRandomInt(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){if(w<2*r)r=w/2;if(h<2*r)r=h/2;this.beginPath();this.moveTo(x+r,y);this.arcTo(x+w,y,x+w,y+h,r);this.arcTo(x+w,y+h,x,y+h,r);this.arcTo(x,y+h,x,y,r);this.arcTo(x,y,x+w,y,r);this.closePath();return this;}
CanvasRenderingContext2D.prototype.die=function(x,y,wd,ht,n){let g=this;let grd=g.createLinearGradient(x+wd,y,x,y+ht);grd.addColorStop(0,"#def");grd.addColorStop(1,"#abf");g.fillStyle=grd;g.strokeStyle='#def';g.beginPath();this.roundRect(x,y,wd,ht,wd/5);g.stroke();g.fill();let p=0.3;let q=0.24;let faces=[[[0.5,0.5]],[[p,p],[1-p,1-p]],[[q,q],[0.5,0.5],[1-q,1-q]],[[p,p],[p,1-p],[1-p,1-p],[1-p,p]],[[q,q],[1-q,q],[0.5,0.5],[q,1-q],[1-q,1-q]],[[q,p],[0.5,p],[1-q,p],[q,1-p],[0.5,1-p],[1-q,1-p]],]
let dots=faces[n-1];for(let i=0;i<dots.length;i++){let dot=dots[i];let xp=x+dot[0]*wd;let yp=y+dot[1]*ht;g.fillStyle='black';g.beginPath();g.arc(xp,yp,wd/9,0,2*Math.PI);g.fill();g.fillStyle='#ddd';g.beginPath();g.arc(xp,yp,wd/12,1.6,3.0);g.fill();}}
function soundBtnHTML(){let s=''
s+='<style> '
s+=' .speaker { height: 30px; width: 30px; position: relative; overflow: hidden; display: inline-block; vertical-align:top; } '
s+=' .speaker span { display: block; width: 9px; height: 9px; background-color: blue; margin: 10px 0 0 1px; }'
s+=' .speaker span:after { content: ""; position: absolute; width: 0; height: 0; border-style: solid; border-color: transparent blue transparent transparent; border-width: 10px 16px 10px 15px; left: -13px; top: 5px; }'
s+=' .speaker span:before { transform: rotate(45deg); border-radius: 0 60px 0 0; content: ""; position: absolute; width: 5px; height: 5px; border-style: double; border-color: blue; border-width: 7px 7px 0 0; left: 18px; top: 9px; transition: all 0.2s ease-out; }'
s+=' .speaker:hover span:before { transform: scale(.8) translate(-3px, 0) rotate(42deg); }'
s+=' .speaker.mute span:before { transform: scale(.5) translate(-15px, 0) rotate(36deg); opacity: 0; }'
s+=' </style>'
s+='<div id="sound" onClick="soundToggle()" class="speaker"><span></span></div>'
return s}
function soundToggle(){let btn='sound'
if(my.soundQ){my.soundQ=false
document.getElementById(btn).classList.add("mute")}else{my.soundQ=true
document.getElementById(btn).classList.remove("mute")}}
function docInsert(s){let div=document.createElement('div')
div.innerHTML=s
let script=document.currentScript
script.parentElement.insertBefore(div,script);}
class Can{constructor(id,wd,ht,ratio){this.id=id
this.wd=wd
this.ht=ht
this.ratio=ratio
let el=document.getElementById(id);el.width=wd*ratio;el.style.width=wd+"px";el.height=ht*ratio;el.style.height=ht+"px";this.g=el.getContext("2d");this.g.setTransform(ratio,0,0,ratio,0,0);this.el=el
return this}
clear(){this.g.clearRect(0,0,this.wd,this.ht)}
mousePos(ev){let bRect=this.el.getBoundingClientRect();let mouseX=(ev.clientX-bRect.left)*(this.el.width/this.ratio/bRect.width);let mouseY=(ev.clientY-bRect.top)*(this.el.height/this.ratio/bRect.height);return[mouseX,mouseY]}}
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