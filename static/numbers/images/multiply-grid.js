var w,h,g,my={}
function multiplygridMain(){my.version='0.82'
w=440;h=540;my.canTop=70
my.timeQ=false
my.levels=[{name:'Easy',ansMin:4,ansMax:8},{name:'Medium',ansMin:10,ansMax:32},{name:'Hard',ansMin:14,ansMax:50}]
my.level=my.levels[0]
my.transTime='0.5s'
my.mTot=50;my.mWd=36;var s=''
s+='<style>'
s+='.clickbtn { display: inline-block; position: relative; text-align: center; margin: 2px; text-decoration: none; font: 14px/25px Arial, sans-serif; color: #19667d; border: 1px solid #88aaff; border-radius: 10px; cursor: pointer; background: linear-gradient(to top right, rgba(170,190,255,1) 0%, rgba(255,255,255,1) 100%); }'
s+='.clickbtn:hover { background: linear-gradient(to top, rgba(255,255,0,1) 0%, rgba(255,255,255,1) 100%); }'
s+='</style>'
my.soundHome=(document.domain=='localhost')?'/mathsisfun/images/sounds/':'/images/sounds/'
s+='<audio id="sndyes" src="'+my.soundHome+'yes2.mp3" preload="auto"></audio>';s+='<audio id="sndno" src="'+my.soundHome+'no.mp3" preload="auto"></audio>';s+='<div style="position:relative; width:'+w+'px; height:'+h+'px; border: none; border-radius: 9px; margin:auto; display:block; box-shadow: 0px 0px 19px 10px rgba(0,0,68,0.26); ">';s+='<canvas id="canvasId" width="'+w+'" height="'+(h-my.canTop)+'" style="position:absolute; left:0; top:'+my.canTop+'px; z-index:-1;"></canvas>';s+='<div id="marbles" style="position:absolute; left:0; top:'+my.canTop+'px; z-index:-2; transition: all 0.1s linear ;"></div>';s+='<div id="lblx" style="position:absolute; font: bold 38px/42px Arial, sans-serif; text-align:center; transition: all '+my.transTime+' ease-in-out;">1</div>';s+='<div id="lbly" style="position:absolute; font: bold 38px/42px Arial, sans-serif; text-align:left; transition: all '+my.transTime+' ease-in-out;">1</div>';s+='<div id="ans" style=" position:absolute; left:5%; top:145px; width:220px; border-radius:10px; padding: 5px;  background-color: #ffd; font: bold 38px/42px Arial, sans-serif; text-align:center; transition: all '+my.transTime+' ease-in-out; z-index:3;"></div>';s+='<div id="result" style="position: absolute; left: 10px; top: 15px; width: '+(w-70)+'px; text-align: center; padding: 20px; border: 6px outset rgba(150,150,150,0.5); border-radius: 20px; background-color: rgba(0,0,100,0.7); z-index: 30; transition:opacity '+my.transTime+'; visibility:visible; ">';s+='<div id="msg" style="font: 20px Verdana; color: white;"></div>';s+='<br>';s+='<div style="font: 18px Arial; margin:auto; padding:3px;">';s+='<style>input[type="radio"]:checked+label {font-weight: bold;}</style>';s+=radioHTML('Level','level',my.levels,'levelChg');s+='</div>';s+='<button style="font: 14px Arial; height:30px; text-align:right; z-index: 10;" class="clickbtn" onclick="gameStart()" >New Game</button>';s+='<button style="font: 14px Arial; height:30px; text-align:right; z-index: 10;" class="clickbtn" onclick="optionsShow(false)" > X </button>';s+='</div>';s+='<div id="ansBoxes" style="position: absolute; left: 300px; top: '+(my.canTop+20)+'px; width: 140px; ">';s+='</div>';s+='<div id="board" style="position: relative; width: 99%; background-color:#eee; border-radius: 10px; border: 2px solid #ddd; text-align:center; margin: auto;">';s+=boxHTML('right','Right');s+=boxHTML('wrong','Wrong');if(my.timeQ){s+=boxHTML('avgspeed','Avg Time');s+='<div style="display:inline-block; border-left: 3px solid green; height: 44px; margin-top:10px;"></div>';s+=boxHTML('speed','Time (s)');}
s+='</div>';s+='<div  style="position:absolute; right:5px; bottom:22px; " >';s+='<button id="options" style="font: 14px Arial; height:30px; text-align:right; z-index: 10; margin-right:10px;" class="clickbtn" onclick="optionsShow(true)" >Options</button>';my.soundQ=true
s+=soundBtnHTML()
s+='</div>';s+='<div id="copyrt" style="font: 10px Arial; color: #6600cc; position:absolute; right:3px; bottom:3px; text-align:center;">&copy; 2019 MathsIsFun.com v'+my.version+'</div>';s+='</div>';document.write(s);var el=document.getElementById('canvasId');var ratio=2;el.width=w*ratio;el.height=(h-my.canTop)*ratio;el.style.width=w+"px";el.style.height=(h-my.canTop)+"px";g=el.getContext("2d");g.setTransform(ratio,0,0,ratio,0,0);var imgHome=(document.domain=='localhost')?'/mathsisfun/numbers/images/':'/numbers/images/'
s='';for(var i=0;i<my.mTot;i++){s+='<div id="mbl'+i+'" style="display:inline-block; position:absolute; transition: all '+my.transTime+' ease-in-out;" >'
if(true){s+='<img src="'+imgHome+'choc-block.svg" style="width:'+my.mWd+'px; max-width:'+my.mWd+'px; z-index:-1;" />'
s+='<canvas id="can'+i+'" width="'+my.mWd*2+'" height="'+my.mWd*2+'" style="position:absolute; left:0; top: 0; z-index:10;"></canvas>';}else{var n=i%8;s+='<img id="mbl'+i+'" src="'+imgHome+'marbles/marble'+n+'.gif" width="'+my.mWd+'" style="position:absolute;" />'}
s+='</div>'}
document.getElementById('marbles').innerHTML=s;my.spin=0
drawNums()
numsShow(false)
gameStart();}
function levelChg(n){my.level=my.levels[n]}
function gameStart(){my.rightN=0;my.doneN=0;my.elapsedTot=0;my.maxRoundsN=10;my.prev={wdn:0,htn:0}
optionsShow(false)
displayUpdate(0)
go();}
function optionsShow(showQ){var div=document.getElementById('result');if(showQ){div.style.visibility='visible';div.style.opacity=1;}else{div.style.visibility='hidden';div.style.opacity=0;}}
function displayUpdate(elapsed){document.getElementById('right').innerHTML=my.rightN;document.getElementById('wrong').innerHTML=my.doneN-my.rightN;if(my.timeQ){document.getElementById('speed').innerHTML=(elapsed<<0)/1000;document.getElementById('avgspeed').innerHTML=((my.elapsedTot/my.doneN)<<0)/1000;}}
function showOpts(stt){var div=document.getElementById('ansBoxes');div.style.visibility='visible';var s='';s+='<style>.opthover:hover {font-weight: bold; color: darkblue; background-color:#fad; border: 2px solid yellow;  }</style>';var val=stt;var n=0;for(var i=0;i<4;i++){s+='<div style="font: 27px Verdana;">';for(var j=0;j<3;j++){var id=n+'-'+val;s+='<div id="'+id+'" class="opthover" style="display: inline-block; width:40px; height:40px; text-align: center;  border: 2px solid white; cursor:pointer; background-color:#ded;" onmousedown="doAns(this)">';s+=val;s+='</div>';val++;n++;}
s+='</div>';}
div.innerHTML=s;}
function doAns(me){if(!my.ansAvailQ)return
my.ansAvailQ=false
my.endTime=performance.now();var elapsed=my.endTime-my.sttTime;my.elapsedTot+=elapsed;me.style.border='2px solid black';var div=document.getElementById('ans')
div.style.display='block'
var ids=me.id.split('-');var ans=ids.pop();my.doneN++;var correctQ=false;if(ans==my.ans){if(my.soundQ)document.getElementById('sndyes').play();correctQ=true;my.rightN++;spinAll()}else{if(my.soundQ)document.getElementById('sndno').play();var div=document.getElementById('marbles')
shake1(div)}
numsShow(true)
displayUpdate(elapsed);if(my.doneN<my.maxRoundsN){var wait=correctQ?1100:3000;setTimeout(go,wait);}else{doSuccess();}}
function doSuccess(){console.log("doSuccess");var s='';if(my.rightN/my.doneN>0.6){s+='Well Done!<br>';}
s+='You got '+my.rightN+' of '+my.doneN+' correct<br>';if(my.timeQ){s+=((my.elapsedTot/my.doneN)<<0)/1000+' second average';}
var div=document.getElementById('msg');div.innerHTML=s;optionsShow(true)}
function go(){var okq,wdn,htn
do{var wdn=getRandomInt(2,7)
var htn=getRandomInt(2,8)
okq=true
if(wdn*htn<my.level.ansMin)okq=false
if(wdn*htn>my.level.ansMax+my.doneN*2)okq=false
if(wdn==my.prev.wdn)okq=false
if(htn==my.prev.htn)okq=false}while(!okq);my.prev.wdn=wdn
my.prev.htn=htn
my.ans=wdn*htn
if(my.ans<=12){my.ansStt=1;}else{if(my.ans>=my.ansStt&&my.ans<my.ansStt+12){}else{my.ansStt=my.ans-getRandomInt(0,11);}}
my.ansStt=Math.min(my.ansStt,100-12);showOpts(my.ansStt);var div=document.getElementById('ans')
div.style.display='hidden'
drawBoxes(wdn,htn)
my.ansAvailQ=true
my.sttTime=performance.now()}
function spinAll(){var div=document.getElementById('mbl'+0)
my.spin=(my.spin==0)?360:0
for(var i=0;i<my.mTot;i++){var div=document.getElementById('mbl'+i)
div.style.transform='rotate('+my.spin+'deg)'}}
function shake1(div){div.style.transform='translateX(10px)'
setTimeout(function(){div.style.transform='translateX(-10px)'
setTimeout(function(){div.style.transform='translateX(0px)'},200)},200)}
function go2(){}
function drawNums(){for(var i=0;i<my.mTot;i++){var el=document.getElementById('can'+i);var ratio=1;var g=el.getContext("2d");g.setTransform(ratio,0,0,ratio,0,0);g.textAlign='center'
g.font='16px Arial'
g.textAlign='center'
g.fillStyle='black'
g.fillStyle='#F5DEB3'
g.fillText((i+1),my.mWd/2-1,my.mWd/2+6)}}
function numsShow(onQ){for(var i=0;i<my.mTot;i++){var div=document.getElementById('can'+i);if(onQ){div.style.display='block'}else{div.style.display='none'}}}
function drawBoxes(wdn,htn){numsShow(false)
var lt=10
var tp=20
var mTp=tp;var m=0
for(var i=0;i<htn;i++){var mLt=lt
for(var j=0;j<wdn;j++){var div=document.getElementById('mbl'+m);div.style.transitionDuration='0.5s'
div.style.opacity=1;div.style.left=mLt+'px';div.style.top=mTp+'px';mLt+=my.mWd;m++;}
mTp+=my.mWd;}
for(i=m;i<my.mTot;i++){var div=document.getElementById('mbl'+i);div.style.opacity=0;div.style.top=(h-my.canTop)+'px';}
tp+=my.canTop
var div=document.getElementById('lblx')
div.style.left=(lt)+'px'
div.style.top=(tp+htn*my.mWd+5)+'px'
div.style.width=(wdn*my.mWd)+'px'
div.innerHTML=wdn
var div=document.getElementById('lbly')
div.style.left=(lt+wdn*my.mWd+5)+'px'
div.style.top=(tp+(my.mWd*htn/2)-20)+'px'
div.innerHTML=htn
var div=document.getElementById('ans')
div.style.display='none'
div.style.top=(tp+htn*my.mWd+44)+'px'
div.innerHTML=wdn+' x '+htn+' = '+wdn*htn}
function boxHTML(id,title){var s='';s+='<div style="display:inline-block; width:80px; padding: 4px; border-radius: 10px; text-align:center;">';s+='<span style="display: inline-block; width:80px; color:black; font: 14px Arial; text-align:center;">'+title+'</span><br>';s+='<span id = "'+id+'"  style="display: inline-block;width:70px; padding: 5px; border-radius: 10px; background-color: #ffe; color:blue; font: 24px Arial; text-align:center;">0</span></div>';return s;}
function soundBtnHTML(){var s=''
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
function soundToggle(){var btn='sound'
if(my.soundQ){my.soundQ=false
document.getElementById(btn).classList.add("mute")}else{my.soundQ=true
document.getElementById(btn).classList.remove("mute")}}
CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){if(w<2*r)r=w/2;if(h<2*r)r=h/2;this.moveTo(x+r,y);this.arcTo(x+w,y,x+w,y+h,r);this.arcTo(x+w,y+h,x,y+h,r);this.arcTo(x,y+h,x,y,r);this.arcTo(x,y,x+w,y,r);return this;};function getRandomInt(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
function radioHTML(prompt,id,lbls,func){var s='';s+='<div style="display:inline-block; border: 1px solid white; border-radius:5px; padding:3px; margin:3px; background-color:rgba(255,255,255,0.5);">';for(var i=0;i<lbls.length;i++){var lbl=lbls[i];var idi=id+i;var chkStr=(i==0)?' checked ':'';s+='<input id="'+idi+'" type="radio" name="'+id+'" value="'+lbl.name+'" onclick="'+func+'('+i+');" autocomplete="off" '+chkStr+' >';s+='<label for="'+idi+'">'+lbl.name+' </label>';}
s+='</div>';return s;}