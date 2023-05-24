var g,g2,el1,el2,my={}
var version='0.936'
function playerMain(filename,w,h,rel='../index.html',voiceType=''){my.devQ=(document.domain=='localhost')?true:false
filename=filename.split('$').join('../index.html')
console.log('playerMain',filename,w,h,voiceType)
var iframe=document.createElement('iframe');iframe.style.width=w+'px';iframe.style.height=h+'px';iframe.style.border='2px solid #eef0ff';iframe.style.borderRadius='23px';iframe.style.display='block';iframe.style.margin='auto';iframe.scrolling='no';var html='<!doctype html><html><head>';html+='<meta http-equiv="content-type" content="text/html; charset=utf-8" />';if(voiceType=='AWS')html+='<script src="../../sdk.amazonaws.com/js/aws-sdk-2.410.0.min.js"></script>'
html+='<script src="'+rel+'images/player.js" type="text/javascript"></script>';html+='<link rel="stylesheet" type="text/css" href="'+rel+'style3.css" />';html+='</head>';html+=`<style>
	a {text-decoration: none;}
	</style>`
html+='<body style="margin: 0; padding: 0;">';html+=`<script type="text/javascript">playerStt("${filename}",${w},${h},"${voiceType}");</script>`
html+='</body>';html+='</html>';var thisScript=document.scripts[document.scripts.length-1];var parent=thisScript.parentElement;parent.replaceChild(iframe,thisScript);iframe.contentWindow.document.open();iframe.contentWindow.document.write(html);iframe.contentWindow.document.close();}
function playerStt(filename,w,h,voiceType){my.filename=filename
my.frameTime=110
my.frameLast=Date.now()
my.voiceQ=false
switch(voiceType){case "local":my.voiceQ=true
voiceSetup()
break
case "AWS":my.voiceQ=true
AWS.config.region='us-east-1';AWS.config.credentials=new AWS.CognitoIdentityCredentials({IdentityPoolId:'us-east-1:88ce4761-9c4f-4840-b631-23368f06d71d',});console.log('AWS',AWS)
my.voice=new VoiceAWS()
break
default:my.voice=new VoiceNull()}
console.log('w, h, time, my.voiceQ, voiceType, voice',w,h,my.frameTime,my.voiceQ,voiceType,my.voice)
my.fastQ=false;my.showNo=0;my.showTxt='';my.showAlign='center';my.waitUntil=performance.now();my.presets=[['Q','ADD C <div class="questions"><a href="#">Question 1</a> <a href="#">Question 2</a> <a href="#">Question 3</a> <a href="#">Question 4</a> <a href="#">Question 5</a> <a href="#">Question 6</a> <a href="#">Question 7</a> <a href="#">Question 8</a> <a href="#">Question 9</a> <a href="#">Question 10</a></div>']];my.imgHome=(document.domain=='localhost')?'/mathsisfun/geometry/images/':'/geometry/images/'
var s="";s+='<div style="position:relative; width:'+w+'px; min-height:'+h+'px; border: none; border-radius: 20px; background-color: #def; margin:auto; display:block;">';s+='<div id="bg" width="'+w+'" height="'+h+'" style="z-index:1; position: absolute; top: 0; left: 0; text-align: center; width:'+w+'px; height:'+h+'px; margin:auto;"></div>';s+='<div id="image" width="'+w+'" height="'+h+'" style="z-index:1; position: absolute; top: 0; left: 0; text-align: center; width:'+w+'px; height:'+h+'px; margin:auto;"></div>';for(var i=0;i<2;i++){s+='<div id="show'+i+'" width="'+w+'" height="'+h+'" style="z-index:2; position: absolute; top: 0; left: 0; text-align: center; width:'+w+'px; height:'+h+'px; margin:auto; font: 15px/23px Verdana, Arial, Tahoma, sans-serif; color:#333;  transition: opacity 2s;"></div>';}
s+='<canvas id="canvas1" style="position: absolute; left: 0; top: 0; width: '+w+'px; height: '+h+'px; z-index: 3; "></canvas>';s+='<canvas id="canvas2" style="position: absolute; left: 0; top: 0; width: '+w+'px; height: '+h+'px; z-index: 4; "></canvas>';s+='<div style="position:absolute; left:5px; bottom:4px; z-index:7;" >'
s+=playHTML(48)
s+='</div>'
s+='<input type="range" id="r1"  value="9" min="0" max="100" step="1" '+
' style="position:absolute; bottom:14px; left:65px; width:'+(w-85)+'px;'+
' height:17px; border: none;  z-index:7;" '+
' oninput="sliderChg(this.value)" onchange="sliderChg(this.value)" />';s+=`
  <img id="ruler" src="${my.imgHome}ruler.gif" width="400" height="48" style="position: absolute; left:130px; top:99px; transition: opacity  linear 0.5s; opacity: 0; z-index:5;">
  <img id="protractor" src="${my.imgHome}protractor1.gif" width="262" height="153" style="position: absolute; left:130px; top:10px; transition: opacity  linear 0.5s; transform-origin: 50% 90%; opacity: 0; z-index:5;">
  <img id="pencil" src="${my.imgHome}pencil.gif" width="162" height="134" style="position: absolute; left:130px; top:99px; vertical-align: middle; transition: opacity  linear 0.5s; opacity: 0; z-index:5;">
  <img id="brush" src="${my.imgHome}paint-brush.gif" width="55" height="55" style="position: absolute; left:130px; top:99px; vertical-align: middle; transition: opacity  linear 0.5s; opacity: 0; z-index:5;">

  <div id="compass" style="position: absolute; left:130px; top:99px; width:0; height:0; transition: opacity  linear 0.5s; opacity: 0; z-index:5;">
	<img id="cmid" src="${my.imgHome}compass-mid.gif" width="104" height="24" style="position: absolute; left:-52px; top:30px; z-index:5;">
	<img id="cleft" src="${my.imgHome}compass-left.gif" width="18" height="164" style="position: absolute; left:-9px; top:0; z-index:5;">
	<img id="cright" src="${my.imgHome}compass-right.gif" width="18" height="164" style="position: absolute; left:-8px; top:0; z-index:5;">
	<img id="ctop" src="${my.imgHome}compass-top.gif" width="28" height="82" style="position: absolute; left:-14px; top:-62px; z-index:5;">

  </div>`
s+='<div id="clicker" style="position: absolute; width:'+w+'px; height:'+h+'px; left: 0; top:; border: none; ; z-index:6;"></div>';s+='<div style="font: 11px Arial; color: #6600cc; position:absolute; right:6px; bottom:3px;">&copy; 2020 MathsIsFun.com  v'+version+'</div>';s+='<div id="filename" style="font: 11px Arial; color: #aaa; position:absolute; right:6px; top:3px;"></div>';s+='</div>';document.write(s);el1=document.getElementById('canvas1');my.ratio=2;el1.width=w*my.ratio;el1.height=h*my.ratio;el1.style.width=w+"px";el1.style.height=h+"px";el2=document.getElementById('canvas2');el2.width=w*my.ratio;el2.height=h*my.ratio;el2.style.width=w+"px";el2.style.height=h+"px";var el=el1;g=el.getContext("2d")
g.setTransform(my.ratio,0,0,my.ratio,0,0)
g2=el2.getContext("2d")
g2.setTransform(my.ratio,0,0,my.ratio,0,0)
if(my.devQ){var div=document.getElementById('clicker')
div.addEventListener('mousedown',function(ev){var bRect=div.getBoundingClientRect();var mouseX=(ev.clientX-bRect.left)*(el.width/my.ratio/bRect.width);var mouseY=(ev.clientY-bRect.top)*(el.height/my.ratio/bRect.height);console.log('mousedown',Math.round(mouseX),Math.round(mouseY))})}
my.svg=new SVG();my.cmdN=0
my.stt={clr:'black',dotClr:'#8888ff',thk:1}
my.dotClr=my.stt.dotClr
my.ruler=new Ruler();my.pencil=new Pencil();my.compass=new Compass();my.protractor=new Protractor();my.cmdStt=0
my.cmdTypes={start:{n:0,run(){}},show:{n:0,run(cmd){console.log("show",cmd.txt.substr(0,50));my.showTxt=cmd.txt
var div=document.getElementById('show'+my.showNo);div.style.opacity=0;my.showNo=1-my.showNo;var div=document.getElementById('show'+my.showNo);div.style.opacity=1;div.innerHTML=fmtShow(my.showTxt);my.scrollYTgt=0;}},add:{n:0,run(cmd){console.log("add");my.showTxt+=cmd.txt
var div=document.getElementById('show'+my.showNo);div.style.opacity=0;my.showNo=1-my.showNo;var div=document.getElementById('show'+my.showNo);div.innerHTML=fmtShow(my.showTxt);div.style.opacity=1;}},say:{n:0,run(cmd){cmd.txt=cmd.txt.replace(/\s+/g," ");cmd.txt=cmd.txt.toLowerCase()
console.log("cmd SAY",my.fastQ,my.voiceQ,cmd.txt);if(my.fastQ)return
if(!my.voiceQ)return
if(false){var utterance=new SpeechSynthesisUtterance(cmd.txt);utterance.rate=0.9;utterance.pitch=1.1;utterance.voice=my.voice.getVoices()[2];my.voice.speak(utterance);}
var s='<speak><prosody rate="90%">'+cmd.txt+'</prosody></speak>';my.voice.say(s);}},preset:{n:0,run(cmd){var preName=cmd.txt
var preNo=-1;for(var i=0;i<my.presets.length;i++){var preset=my.presets[i];if(preset[0].toLowerCase()==preName){preNo=i;break;}}
if(preNo>=0){var preset=my.presets[preNo][1];var bits=preset.split(' ');var cmd=bits[0];var data=bits.splice(1);console.log(">>",cmd.type,cmd,data);cmdDo(new Cmd(cmd,data));}}},align:{n:1,run(cmd){switch(cmd.parms[0].toLowerCase()){case 'c':case 'center':my.showAlign='center'
break
case 'l':case 'left':my.showAlign='left'
break
case 'r':case 'right':my.showAlign='right'
break
default:}}},img:{n:1,run(cmd){var txt='<div style="text-align:center; height: 80%; margin-top: 5%; display: inline-block;"><img style="height:100%;" src="'+cmd.txt+'" /></div>';console.log("IMG",txt);var div=document.getElementById('image');div.innerHTML=txt;}},scroll:{n:0,run(cmd){var parms=splitLim(cmd.txt,/[ ,_]+/g,2);my.scrollXTgt=parseFloat(parms[0]);my.scrollYTgt=parseFloat(parms[1]);console.log(">>>>>>>>>>scroll",cmd,my.scrollXTgt,my.scrollYTgt,my);doScroll()}},bg:{n:0,run(cmd){console.log("bg",cmd.txt);var div=document.getElementById('bg');div.style.background=cmd.txt}},line:{n:4,run(cmd){var p=cmd.parms
var pts=[];var x,y;for(var i=0;i<p.length/2;i++){x=p[i*2];y=p[i*2+1];pts.push({x:x,y:y})}
my.pencil.multi(pts)}},to:{n:2,run(){}},curve3:{n:4,run(cmd){var p=cmd.parms
if(!my.strokedQ){g.beginPath();g.moveTo(p[0],p[1]);}else{g.lineTo(p[0],p[1]);}
g.quadraticCurveTo(p[2],p[3],p[4],p[5])
g.stroke();my.pencil.moveFast(p[4],p[5]);my.prevX=p[4];my.prevY=p[5];my.svg.strokeStyle=my.pencil.clr
my.svg.moveTo(p[0],p[1]);my.svg.lineTo(p[4],p[5]);}},bubble:{n:4,run(cmd){var txt=cmd.txt
drawBubble(g,cmd.parms[0],cmd.parms[1],cmd.parms[2],cmd.parms[3],txt);my.pencil.vis(false)
my.frameLast+=200*txt.length}},dot:{n:2,run(cmd){g.fillStyle=my.dotClr
g.beginPath()
g.arc(cmd.parms[0],cmd.parms[1],3,0,Math.PI*2);g.fill();my.svg.fillStyle=my.dotClr
my.svg.circle(cmd.parms[0],cmd.parms[1],3);}},circle:{n:3,run(cmd){g.beginPath()
g.arc(cmd.parms[0],cmd.parms[1],cmd.parms[2],0,Math.PI*2);g.stroke()
my.svg.circle(cmd.parms[0],cmd.parms[1],cmd.parms[2]);}},text:{n:3,run(cmd){g.fillStyle='blue';g.font='bold 20px Arial';g.fillText(cmd.parms[0],cmd.parms[1],cmd.parms[2]);my.svg.drawText(cmd.parms[0],cmd.parms[1],cmd.parms[2],0)}},note:{n:0,run(cmd){var txt=cmd.txt
if(txt===undefined){drawBubble(g,20,20,150,30,'')}else{console.log('note',txt)
my.notes.push(txt)
drawBubble(g,20,20,150,30,txt);my.frameLast+=100*txt.length}}},clr:{n:1,run(cmd){my.pencil.clr=cmd.parms[0].replace("0x","#");}},dotclr:{n:1,run(cmd){my.dotClr=cmd.parms[0].replace("0x","#");}},speed:{n:1,run(cmd){my.speed=cmd.parms[0];}},alp:{n:1,run(cmd){var alpha=parseInt(cmd.parms[0])/100
g.globalAlpha=alpha
my.pencil.alphaSet(g.globalAlpha)}},lvl:{n:1,run(cmd){setLvl(cmd.parms[0]);}},thk:{n:1,run(cmd){var thk=cmd.parms[0];if(parseInt(thk)>10){g.lineCap="butt";}else{g.lineCap="round";}
g.lineWidth=thk;g.lineJoin="round";my.pencil.thk=thk}},cposn:{n:2,run(cmd){my.compass.moveTo(cmd.parms[0],cmd.parms[1])}},cmove:{n:1,run(cmd){my.compass.moveArc(cmd.parms[0])}},cdraw:{n:1,run(cmd){my.compass.drawArc(cmd.parms[0])}},cwidth:{n:1,run(cmd){my.compass.moveWidth(cmd.parms[0])}},prposn:{n:4,run(cmd){my.protractor.movePosn(cmd.parms[0],cmd.parms[1],cmd.parms[2],cmd.parms[3])}},rposn:{n:4,run(cmd){my.ruler.movePosn(cmd.parms[0],cmd.parms[1],cmd.parms[2],cmd.parms[3])}},pmove:{n:2,run(cmd){my.pencil.moveTo(cmd.parms[0],cmd.parms[1])}},prel:{n:2,run(cmd){my.pencil.moveRel(cmd.parms[0],cmd.parms[1])}},pdraw:{n:2,run(cmd){my.pencil.drawTo(cmd.parms[0],cmd.parms[1])}},pause:{n:0,run(){if(my.playQ)playToggle()}},wait:{n:1,run(cmd){my.waitUntil=performance.now()+parseFloat(cmd.parms[0]);console.log("wait now, until",performance.now(),my.waitUntil);}},reset:{n:0,run(){reset()}},clear:{n:0,run(){g.clearRect(0,0,g.canvas.width,g.canvas.height)}},fade:{n:1,run(cmd){var can=g.canvas
var alphaWas=g.globalAlpha
g.globalAlpha=cmd.parms[0]
console.log('fade',cmd.parms[0],alphaWas,g)
g.globalCompositeOperation='copy';g.drawImage(el,0,0,can.width,can.height,0,0,can.width/my.ratio,can.height/my.ratio);g.globalAlpha=alphaWas
g.globalCompositeOperation='source-over';}},char:{n:3,run(cmd){console.log('char:',cmd.parms[2])}},end:{n:0,run(){if(my.devQ){console.log(my.svg.getText());}}},}
my.cmds=[];my.cmdStt=0;my.cmdEnd=0;my.currLvl=0;my.prevX=0;my.prevY=0;my.playQ=false;my.strokedQ=true;loadChars();getFileFromServer(filename);my.waitUntil=performance.now();}
function voiceSetup(){my.voice=speechSynthesis;var voices=my.voice.getVoices();console.log("my.voice",my.voice,voices);for(var i=0;i<voices.length;i++){var voice=voices[i];console.log("voice",i,voice);}}
class VoiceNull{constructor(){this.speaking=false
this.pending=false}
speak(){return ''}
cancel(){return ''}}
function getFileFromServer(url){if(my.devQ)document.getElementById('filename').innerHTML=url
var xhr;xhr=new XMLHttpRequest();xhr.onreadystatechange=handleStateChange;xhr.open("GET.html",url,true);xhr.send();function handleStateChange(){if(xhr.readyState===4){console.log('getFileFromServer status:',xhr.status,url)
if(xhr.status==200){cmdsSet(xhr.responseText)}}}}
function sliderChg(v){var newPos=parseInt(my.cmds.length*(v/100));if(newPos==my.cmdN)return;if(newPos>my.cmdN){cmdRange(my.cmdN,newPos);my.cmdN=newPos;}else{my.voice.cancel();el1.getContext("2d").clearRect(0,0,el1.width,el1.height);el2.getContext("2d").clearRect(0,0,el2.width,el2.height);my.showNo=0;my.showTxt='';my.showAlign='center';var div=document.getElementById('show'+my.showNo);div.innerHTML='';div.style.opacity=1;my.scrollYTgt=0;div.style.top='0px';cmdRange(0,newPos);my.cmdN=newPos;}}
function sliderSet(v){var r1=document.getElementById("r1");r1.value=(v/my.cmds.length)*100;}
function cmdsSet(script){script=script.trim();var s=''
var lines=script.split(/\r?\n/);for(var i=0;i<lines.length;i++){var line=lines[i].trim()
line=line.replace(/\s*\/\/.*/,"");line=line.replace(/\t/g," ")
if(line.length==0)continue
s+=line+'\n'}
s=s.replace(/(\r\n|\n|\r)/gm,"~");s=s.replace(/%2B/gm,"+");var lines=s.split("~");if(lines.length<1)return
var cmds=[]
var prevCmd=null
var prevLineCmd=null
var outStr=my.filename+'\n'
for(var i=0;i<lines.length;i++){var line=lines[i].trim()
var parms=line.split(/[ ,_]+/)
var type=parms[0].toLowerCase()
var cmdQ=type in my.cmdTypes
if(type=='start')my.cmdStt=cmds.length
if(cmdQ){var cmdType=my.cmdTypes[type]
var cmd=new Cmd(type,line,cmdType.n)
outStr+=cmd.type=='to'?'~':'\n'
outStr+=cmd.toString()
if(type=='start')outStr+='\n'
if(type=='lvl')outStr+='\n'
var addQ=true
if(type=="char"){cmdsCharAdd(cmds,parms)
addQ=false}
if(type=="to"){if(prevLineCmd!=null)prevLineCmd.addTo(line)
addQ=false}
if(addQ)cmds.push(cmd)
prevCmd=cmd
if(type=="line")prevLineCmd=cmd}else{if(prevCmd!=null)prevCmd.add(line)}}
my.cmds=cmds
my.cmdEnd=my.cmds.length;console.log('cmdsSet',my.cmds)
my.notes=[];animStt()}
class Cmd{constructor(type,line='',max=0){this.type=type.toLowerCase();var txtStt=line.toLowerCase().indexOf(type,0)
var str=line.substr(txtStt+type.length+1)
var parms=splitLim(str,/[ ,_]+/g,max);this.parms=parmClean(parms)
this.txt=this.parms[max]}
add(str){this.txt+=' '+str}
addTo(str){var parms=splitLim(str,/[ ,_]+/g,2);if(parms.length==3){for(var i=1;i<3;i++){this.parms.push(parseFloat(parms[i]))}}}
toString(){var s=this.type
var parms=this.parms
var chgN=0
if(this.type=='line')chgN=4
if(this.type=='to')chgN=2
if(this.type=='char')chgN=2
if(this.type=='dot')chgN=2
if(this.type=='bubble')chgN=2
for(var j=0;j<parms.length;j++){var p=parms[j]
if(j<chgN){if(!isNaN(parseFloat(p))&&isFinite(p)){p=Math.round(p*0.85)}}
if(this.type=='dot'&&j>=chgN)break
s+=' '
s+=p}
return s}}
function splitLim(str,regex,max){str=str.trim()
if(str.length==0)return[];if(max<=0)return[str];var bits=[];var n=0
var stt=0
do{var result=regex.exec(str)
if(result){var s2=str.substring(stt,result.index)
bits.push(s2)
stt=result.index+result.length}}while(n++<max-1);var s2=str.substring(stt)
bits.push(s2)
return bits}
function parmClean(parms){for(var j=0;j<parms.length;j++){var parm=parms[j]
if(isNaN(parm)){parms[j]=parm.trim()}else{if(parm.substring(0,2)=='0x'){parms[j]=parm.trim()}else{parms[j]=parseFloat(parm)}}}
return parms}
function animStt(){console.log('animStt',my.cmdN,my.cmdStt)
reset()
my.cmdN=my.cmdStt;cmdRange(0,my.cmdStt);anim()}
function reset(){el1.getContext("2d").clearRect(0,0,el1.width,el1.height);el2.getContext("2d").clearRect(0,0,el2.width,el2.height);my.pencil.vis(false)
my.pencil.thk=my.stt.thk
my.pencil.clr=my.stt.clr
my.dotClr=my.stt.dotClr
setLvl(0)
my.compass.moveTo(0,0);my.compass.moveWidth(20);my.compass.moveArc(0);setVisible('compass',false);my.ruler.movePosn(0,-50,10,-50);setVisible('ruler',false);my.protractor.movePosn(0,-50,10,-50);setVisible('protractor',false);}
function anim(){if(my.playQ)requestAnimationFrame(anim);if(my.playQ&&!my.ruler.isMovingQ&&!my.pencil.isMovingQ&&!my.compass.isMovingQ&&!my.protractor.isMovingQ){doScroll();var now=Date.now()
var elapsed=now-my.frameLast
if(elapsed>my.frameTime*2)my.frameLast=now
if(elapsed<-2000)my.frameLast=now+2000
var doQ=elapsed>my.frameTime
if(!doQ)return
my.frameLast+=my.frameTime
incrFrame()}}
function cmdRange(fromNo,toNo){my.fastQ=true;if(fromNo==0)reset()
for(var i=fromNo;i<=toNo;i++){cmdDo(my.cmds[i]);}
my.cmdN=toNo
my.fastQ=false;}
function cmdDo(cmd){if(cmd==undefined)return null;if(cmd.type=='curve3')my.frameLast-=my.frameTime*0.6
if(!my.strokedQ){g.stroke();my.strokedQ=true;}
var cmdType=my.cmdTypes[cmd.type]
try{cmdType.run(cmd)}catch(err){console.log('ERROR with command:',cmd)}
return cmd.type;}
function fmtShow(s){console.log('fmtShow',s)
return '<div style="text-align:'+my.showAlign+'; height: 90%; margin-top: 4%; width:85%; display: inline-block;">'+s+'</div>';}
function drawBubble(g,startX,startY,lenX,lenY,txt){g.font="16px Arial";var alphaWas=g.globalAlpha
g.globalAlpha=1;g.fillStyle="#bbd";g.roundRect(startX-3,startY+2,lenX,lenY,5);g.fill();g.beginPath()
g.strokeStyle='#bbb'
g.fillStyle="#eef0f8";var lineWidthWas=g.lineWidth
g.lineWidth=0.5
g.roundRect(startX-5,startY,lenX,lenY,5);g.fill();g.stroke()
g.lineWidth=lineWidthWas
g.fillStyle="#0000ff";var words=txt.split(' ');var lineN=1
var i=1
var lineHt=21
while(words.length>0&&i<=words.length){var str=words.slice(0,i).join(' ');var w=g.measureText(str).width;if(w>lenX){if(i==1)i=2;g.fillText(words.slice(0,i-1).join(' '),startX,startY+(lineHt*lineN));lineN++;words=words.splice(i-1);i=1}else{i++}}
if(i>0)g.fillText(words.join(' '),startX,startY+(lineHt*lineN));g.globalAlpha=alphaWas;}
function setLvl(newval){my.currLvl=parseInt(newval);if(my.currLvl==0){var el=el1;g=el.getContext("2d");g.setTransform(my.ratio,0,0,my.ratio,0,0)}else{var el=el2;g=el.getContext("2d");g.setTransform(my.ratio,0,0,my.ratio,0,0);g.clearRect(0,0,el.width,el.height);}}
function playHTML(w){var s='';s+='<style type="text/css">';s+='.btn {display: inline-block; position: relative; width:'+w+'px; height:'+w+'px; margin-right:'+w*0.2+'px; padding: .6em; border: 0 solid rgba(208,208,248,1); border-radius: 10em; background: linear-gradient(#fff, #acd), #c9c5c9; box-shadow: 0 3 4 rgba(0,0,0,.4); outline-style:none;}';s+='.btn:hover {background: linear-gradient(#f5f5f5, #b9b9b9), #c9c5c9; }';s+='.btn:before, button:after {content: " "; position: absolute; }';s+='.btn:active {top:'+w*0.05+'px; box-shadow: 0 '+w*0.02+'px '+w*0.03+'px rgba(0,0,0,.4); }';s+='.play:before {  left: '+w*0.36+'px; top: '+w*0.22+'px; width: 0; height: 0; border: '+w*0.3+'px solid transparent; border-left-width: '+w*0.4+'px; border-left-color: blue; }';s+='.play:hover:before {border-left-color: yellow; }';s+='.pause:before, .pause:after {display: block; left: '+w*0.29+'px; top: '+w*0.28+'px; width: '+w*0.19+'px; height: '+w*0.47+'px; background-color: blue; }';s+='.pause:after {left: '+w*0.54+'px; }';s+='.pause:hover:before, .pause:hover:after {background-color: yellow; }';s+='</style>';s+='<button id="playBtn" class="btn play" onclick="playToggle()" ></button>';return s;}
function playToggle(){console.log('playToggle',my.cmdN,my.cmds.length,my.playQ)
var btn='playBtn'
if(my.playQ){my.playQ=false;document.getElementById(btn).classList.add("play");document.getElementById(btn).classList.remove("pause");}else{my.playQ=true;document.getElementById(btn).classList.add("pause");document.getElementById(btn).classList.remove("play");if(my.cmdN<my.cmds.length){anim();}else{animStt();}}}
function setVisible(id,visQ){var div=document.getElementById(id);if(visQ){div.style.opacity=1;}else{div.style.opacity=0;}}
function doScroll(){my.scrollInc=3;for(var i=0;i<2;i++){var div=document.getElementById('show'+i);scrollY=-parseFloat(div.style.top);if(Math.abs(scrollY-my.scrollYTgt)>my.scrollInc){scrollY+=my.scrollInc*Math.sign(my.scrollYTgt-scrollY);div.style.top=-scrollY+'px';}}
return;}
function getScroll(){var div=document.getElementById('show0');var scrollX=-parseFloat(div.style.left);var scrollY=-parseFloat(div.style.top);return[scrollX,scrollY];}
function incrFrame(){if(my.cmdN>=my.cmds.length){console.log('reached end',pleaseWait(null))
if(!my.strokedQ){g.stroke();my.strokedQ=true;}
if(!pleaseWait(null)){playToggle();}}else{if(!pleaseWait(my.cmds[my.cmdN])){cmdDo(my.cmds[my.cmdN]);my.cmdN++;sliderSet(my.cmdN);}}}
function pleaseWait(cmd){if(my.waitUntil>performance.now())return true;if(my.pencil.isMovingQ)return true
if(my.ruler.isMovingQ)return true
if(my.compass.isMovingQ)return true
if(my.protractor.isMovingQ)return true
if(my.voice.speaking)return true
if(my.voice.speaking||my.voice.pending){if(cmd==null)return true;if(cmd.type=='img'||cmd.type=='show'||cmd.type=='add'||cmd.type=='scroll'||cmd.type=='wait'){return true;}}
if(cmd==null){var scrollY=getScroll()[1];if(Math.abs(scrollY-my.scrollYTgt)>my.scrollInc){return true;}}
return false;}
class Ruler{constructor(){this.isMovingQ=false;this.currX=0;this.currY=0;this.newX=0;this.newY=0;this.currRot=0;this.newRot=0;this.drawQ=false;this.y=-50;}
movePosn(x0,y0,x1,y1){setVisible('ruler',true);this.newX=(x0+x1)/2;this.newY=(y0+y1)/2;this.newRot=Math.atan2(y1-y0,x1-x0)*180/Math.PI;this.drawQ=false;this.animate();}
adjustPosn(){var div=document.getElementById('ruler');var x=this.currX-200;var y=this.currY-24;x-=24*Math.sin((this.currRot)*Math.PI/180);y+=24*Math.cos((this.currRot)*Math.PI/180);div.style.left=x+'px';div.style.top=y+'px';div.style.transform="rotate("+this.currRot+"deg)";}
animate(){if(my.fastQ){this.currX=this.newX;this.currY=this.newY;this.currRot=this.newRot;this.adjustPosn();this.isMovingQ=false;}else{if(my.playQ)this.movesDo();if(this.isMovingQ)requestAnimationFrame(this.animate.bind(this));}}
movesDo(){var moveCount=0;var d=Math.sqrt(Math.pow(this.currX-this.newX,2)+Math.pow(this.currY-this.newY,2));if(d>0.5){this.currX=this.currX*0.9+this.newX*0.1;this.currY=this.currY*0.9+this.newY*0.1;moveCount++;}else{this.currX=this.newX;this.currY=this.newY;}
if(Math.abs(this.newRot-this.currRot)>0.01){var drawSpeed=2;if(this.drawQ)
drawSpeed=0.5;if(Math.abs(this.newRot-this.currRot)>drawSpeed){if(this.newRot>this.currRot)
this.currRot+=drawSpeed;if(this.newRot<this.currRot)
this.currRot-=drawSpeed;moveCount++;}else{this.currRot=this.newRot;moveCount++;}}
if(moveCount>0){this.adjustPosn();this.isMovingQ=true;}else{this.isMovingQ=false;}}}
class Protractor{constructor(){this.isMovingQ=false;this.currX=0;this.currY=0;this.newX=0;this.newY=0;this.currRot=0;this.newRot=0;this.drawQ=false;this.y=-50;}
movePosn(x0,y0,x1,y1){setVisible('protractor',true);this.newX=(x0+x1)/2;this.newY=(y0+y1)/2;this.newRot=Math.atan2(y1-y0,x1-x0)*180/Math.PI;this.drawQ=false;this.animate();}
adjustPosn(){var div=document.getElementById('protractor');var x=this.currX-200;var y=this.currY-24;x-=24*Math.sin((this.currRot)*Math.PI/180);y+=24*Math.cos((this.currRot)*Math.PI/180);div.style.left=x+'px';div.style.top=y+'px';div.style.transform="rotate("+this.currRot+"deg)";}
animate(){if(my.fastQ){this.currX=this.newX;this.currY=this.newY;this.currRot=this.newRot;this.adjustPosn();this.isMovingQ=false;}else{if(my.playQ)this.movesDo();if(this.isMovingQ)requestAnimationFrame(this.animate.bind(this));}}
movesDo(){var moveCount=0;var d=Math.sqrt(Math.pow(this.currX-this.newX,2)+Math.pow(this.currY-this.newY,2));if(d>0.5){this.currX=this.currX*0.9+this.newX*0.1;this.currY=this.currY*0.9+this.newY*0.1;moveCount++;}else{this.currX=this.newX;this.currY=this.newY;}
if(Math.abs(this.newRot-this.currRot)>0.01){var drawSpeed=2;if(this.drawQ)
drawSpeed=0.5;if(Math.abs(this.newRot-this.currRot)>drawSpeed){if(this.newRot>this.currRot)
this.currRot+=drawSpeed;if(this.newRot<this.currRot)
this.currRot-=drawSpeed;moveCount++;}else{this.currRot=this.newRot;moveCount++;}}
if(moveCount>0){this.adjustPosn();this.isMovingQ=true;}else{this.isMovingQ=false;}}}
class Pencil{constructor(){this.pencilQ=true
if(this.pencilQ){this.div=document.getElementById('pencil')}else{this.div=document.getElementById('brush')}
this.isMovingQ=false;this.clr='black'
this.thk=1
this.currPt={x:0,y:0}
this.prevPt={x:0,y:0}
this.prevPtQ=false
this.pts=[];this.endLine=null
this.drawQ=false;this.alpha=1
this.visQ=false
this.lastDraw=Date.now()
this.skipN=0}
vis(visQ){this.visQ=visQ
this.div.style.opacity=visQ?1:0}
alphaSet(alpha){var chgQ=this.alpha<0.9?alpha>=0.9:alpha<0.9
this.alpha=alpha
if(chgQ){this.div.style.opacity=0
if(alpha<0.9){this.stackQ=true
this.pencilQ=false
this.div=document.getElementById('brush')}else{this.stackQ=false
this.pencilQ=true
this.div=document.getElementById('pencil')}}}
moveRel(x,y){this.currPt.x+=x
this.currPt.y+=y
this.moveTo(this.currPt.x,this.currPt.y);}
moveFast(x,y){this.vis(true)
this.currPt.x=x
this.currPt.y=y
this.setDrawQ(false);this.divPlace();this.isMovingQ=false;}
moveTo(x,y){this.vis(true)
this.pts=this.multiGet([this.currPt,{x:x,y:y}],5,0.9)
this.setDrawQ(false);this.animate();}
drawTo(x,y){this.vis(true)
this.pts=this.multiGet([this.currPt,{x:x,y:y}],5,0.9)
my.svg.strokeStyle=my.pencil.clr;my.svg.moveTo(this.currPt.x,this.currPt.y);my.svg.lineTo(x,y);this.setDrawQ(true);this.animate();}
multiGet(pts,dMin,ratio){return this.multiEasIn(pts,dMin,ratio)}
multiEasIn(pts,dMin,ratio){if(pts.length<2)return
var news=[]
news.push(pts[0])
for(var i=1;i<pts.length;i++){var prevPt=pts[i-1]
var currPt=pts[i]
var d=ptDist(prevPt,currPt)
if(d<dMin){news.push(currPt)}else{var stepTot=Math.max(2,Math.min(Math.round(d/2),60))
for(var j=0;j<stepTot;j++){var x=(j+1)/stepTot
var ratio=x
if(d>5){var ratio=(1-1/(Math.pow(x+1,4)))/0.9375}
news.push({x:prevPt.x+ratio*(currPt.x-prevPt.x),y:prevPt.y+ratio*(currPt.y-prevPt.y),})}}}
if(false){var thkWas=g.lineWidth
g.lineWidth=1
for(var i=0;i<news.length;i++){g.strokeStyle='grey'
var pt=news[i]
g.beginPath()
g.arc(pt.x,pt.y,3,0,2*Math.PI)
g.stroke()}
g.lineWidth=thkWas}
return news}
multiRatio(pts,dMin,ratio){if(pts.length<2)return
var news=[]
news.push(pts[0])
for(var i=1;i<pts.length;i++){var prevPt=pts[i-1]
var pt=pts[i]
var d=ptDist(prevPt,pt)
if(d>dMin){var currPt={x:prevPt.x,y:prevPt.y}
while(ptDist(currPt,pt)>dMin){currPt.x=currPt.x*ratio+pt.x*(1-ratio)
currPt.y=currPt.y*ratio+pt.y*(1-ratio)
news.push({x:currPt.x,y:currPt.y})}}
news.push(pt)}
if(false){var thkWas=g.lineWidth
g.lineWidth=1
for(var i=0;i<news.length;i++){g.strokeStyle='grey'
var pt=news[i]
g.beginPath()
g.arc(pt.x,pt.y,3,0,2*Math.PI)
g.stroke()}
g.lineWidth=thkWas}
console.log('multiRatio',dMin,ratio,ptsToStr(news))
return news}
multi(pts){if(pts.length<2)return
this.pts=this.multiGet(pts,5,0.8)
this.prevPt=[];this.prevPtQ=false
this.currPt=this.pts.shift()
this.endLine=null
this.vis(true)
g.strokeStyle=this.clr
g.lineWidth=this.lineWidth
this.drawQ=true
this.animate();}
setDrawQ(onQ){this.drawQ=onQ;}
divPlace(){if(this.pencilQ){this.div.style.left=(this.currPt.x-10)+'px';this.div.style.top=(this.currPt.y-122)+'px';}else{this.div.style.left=(this.currPt.x-14)+'px';this.div.style.top=(this.currPt.y-54)+'px';}}
animate(){if(my.fastQ){this.movesDo()
if(this.isMovingQ)this.animate()}else{if(my.playQ)this.movesDo();if(this.isMovingQ)requestAnimationFrame(this.animate.bind(this));}
this.lastDraw=Date.now()
if(!this.isMovingQ){setTimeout(this.pencilFade.bind(this),2000);}}
pencilFade(){if(this.lastDraw<Date.now()-800){if(this.visQ){this.vis(false)}}}
movesDo(){this.isMovingQ=true;if(this.pts.length==0){this.isMovingQ=false
if(this.endLine!==null){g.beginPath()
g.strokeStyle=this.clr
g.lineWidth=this.thk
g.moveTo(this.endLine.from.x,this.endLine.from.y);g.lineTo(this.endLine.to.x,this.endLine.to.y);g.stroke()
this.currPt.x=this.endLine.to.x
this.currPt.y=this.endLine.to.y
this.endLine=null
this.prevPtQ=false;}
return}
var pt=this.pts.shift()
if(this.drawQ){g.beginPath();g.strokeStyle=this.clr
g.lineWidth=this.thk
g.moveTo(this.currPt.x,this.currPt.y);if(this.prevPtQ){var x1=(this.prevPt.x+this.currPt.x)/2
var y1=(this.prevPt.y+this.currPt.y)/2
var x3=(this.currPt.x+pt.x)/2
var y3=(this.currPt.y+pt.y)/2
g.moveTo(x1,y1);g.quadraticCurveTo(this.currPt.x,this.currPt.y,x3,y3)
this.endLine={from:{x:x3,y:y3},to:{x:pt.x,y:pt.y}}}else{g.lineTo(pt.x,pt.y)
this.prevPtQ=true}
this.prevPt.x=this.currPt.x
this.prevPt.y=this.currPt.y
g.stroke()}
this.currPt.x=pt.x
this.currPt.y=pt.y
this.divPlace()}}
class Compass{constructor(){this.isMovingQ=false;this.currX=0;this.currY=0;this.newX=0;this.newY=0;this.currRot=0;this.newRot=0;this.drawQ=false;this.newAngle=0;this.currAngle=0;this.fromX=0;this.fromY=0;this.fromPointQ=false;this.armLen=164;this.leftRot=0;this.y=-50;}
moveWidth(w){setVisible('compass',true);this.w=w;this.currAngle=this.leftRot;this.newAngle=Math.asin(w/(this.armLen*2))*180.0/Math.PI;this.setDrawQ(false);this.animate();}
moveTo(x0,y0){setVisible('compass',true);this.newX=x0;this.newY=y0;this.setDrawQ(false);this.animate();}
moveArc(a){setVisible('compass',true);this.newRot=-a;if((this.currRot-this.newRot)>180){this.currRot-=360;}
if((this.currRot-this.newRot)<-180){this.currRot+=360;}
this.setDrawQ(false);this.animate();}
drawArc(a){setVisible('compass',true);this.startArcQ=false
this.newRot=-a;this.setDrawQ(true);this.animate();my.svg.strokeStyle='#ffcc66';my.svg.arc(this.currX,this.currY,this.w,this.currRot,this.newRot);}
setDrawQ(onQ){this.drawQ=onQ;if(this.drawQ){this.fromPointQ=false;}}
adjustPosn(){var div=document.getElementById('cleft');div.style.transform="rotate("+this.leftRot+"deg)";div.style.transformOrigin="50% 0% 0";div=document.getElementById('cright');div.style.transform="rotate("+-this.leftRot+"deg)";div.style.transformOrigin="50% 0% 0";var x=this.currX;var y=this.currY;x+=this.armLen*Math.sin((this.leftRot+this.currRot)*Math.PI/180);y-=this.armLen*Math.cos((this.leftRot+this.currRot)*Math.PI/180);div=document.getElementById('compass');div.style.left=x+'px';div.style.top=y+'px';div.style.transform="rotate("+this.currRot+"deg)";var xSharp=this.armLen*Math.sin((this.leftRot+this.currRot)*Math.PI/180);var ySharp=this.armLen*Math.cos((this.leftRot+this.currRot)*Math.PI/180);if(this.drawQ){var xPencil=xSharp-this.armLen*Math.sin((-this.leftRot+this.currRot)*Math.PI/180);var yPencil=ySharp-this.armLen*Math.cos((-this.leftRot+this.currRot)*Math.PI/180);var toX=this.currX+xPencil;var toY=this.currY-yPencil;if(this.fromPointQ){g.strokeStyle='#ffcc66';var wdWas=g.lineWidth
g.lineWidth=2
g.beginPath();g.moveTo(this.fromX,this.fromY);g.lineTo(toX,toY);g.stroke();g.lineWidth=wdWas}
this.fromX=toX;this.fromY=toY;this.fromPointQ=true;}}
animate(){if(my.fastQ){this.movesDo()
if(this.isMovingQ)this.animate()}else{if(my.playQ)this.movesDo();if(this.isMovingQ)requestAnimationFrame(this.animate.bind(this));}}
movesDo(){var moveCount=0;var d=Math.sqrt(Math.pow(this.currX-this.newX,2)+Math.pow(this.currY-this.newY,2));if(d>0.5){this.currX=this.currX*0.9+this.newX*0.1;this.currY=this.currY*0.9+this.newY*0.1;moveCount++;}else{this.currX=this.newX;this.currY=this.newY;}
if(Math.abs(this.newRot-this.currRot)>0.01){var drawSpeed=3
if(this.drawQ){var angChg=Math.abs(this.newRot-this.currRot)
drawSpeed=Math.max(0.3,Math.min(angChg/20,6))}
if(this.startArcQ){if(Math.abs(this.newRot-this.currRot)>drawSpeed){if(this.newRot>this.currRot)this.currRot+=drawSpeed;if(this.newRot<this.currRot)this.currRot-=drawSpeed;moveCount++;}else{this.currRot=this.newRot;moveCount++;}}else{moveCount++;this.startArcQ=true}}
if(Math.abs(this.newAngle-this.currAngle)>0.5){this.currAngle=this.currAngle*0.9+this.newAngle*0.1;this.leftRot=this.currAngle;moveCount++;}else{this.leftRot=this.newAngle;this.adjustPosn();}
if(moveCount>0){this.adjustPosn();this.isMovingQ=true;}else{this.isMovingQ=false;}}}
CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){if(w<2*r)r=w/2;if(h<2*r)r=h/2;this.beginPath();this.moveTo(x+r,y);this.arcTo(x+w,y,x+w,y+h,r);this.arcTo(x+w,y+h,x,y+h,r);this.arcTo(x,y+h,x,y,r);this.arcTo(x,y,x+w,y,r);this.closePath();return this;}
class SVG{constructor(){this.lineWidth=2
this.strokeStyle='#000';this.strokeStyle='#ffcc66';this.lineAlpha='1';this.fillStyle='#def';this.fillAlpha='0.5';this.inLineQ=false;this.inGroupQ=false;this.line=[];this.txt=this.getHeader();this.onQ=my.devQ}
txtAdd(s){if(this.onQ)this.txt+=s+'\n'}
getHeader(){var s=''
s+='<?xml version=\"1.0\" standalone=\"no\"?>\n';s+='<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">\n';s+='<svg width="300px" height="200px" xmlns="http://www.w3.org/2000/svg" style="stroke-width:2px;">\n';s+='<desc>SVG Output</desc>\n'
s+='<g transform="translate(-100,-100)">\n'
return s;}
getFooter(){var s=''
s+="</g>\n";s+="</svg>";return s;}
lineStyle(thick,clr){if(thick==0)thick=0.2;this.lineWidth=thick;this.strokeStyle=clr;}
beginFill(clr){this.fillStyle=clr;}
endFill(){}
circle(x,y,rad){this.txtAdd(`<circle cx="${x}" cy="${y}" r="${rad}" ${this.getStyle()} />`)}
arc(x,y,rad,startAngle,endAngle){var start=this.polarToCartesian(x,y,rad,endAngle);var end=this.polarToCartesian(x,y,rad,startAngle);var largeArcFlag=endAngle-startAngle<=180?"0":"1";var sweepFlag=1
var d=["M",fmt1(start.x),fmt1(start.y),"A",rad,rad,0,largeArcFlag,sweepFlag,fmt1(end.x),fmt1(end.y)].join(" ");this.txtAdd(`<path d="${d}" fill="none" stroke="${this.strokeStyle}" />`)}
polarToCartesian(centerX,centerY,radius,angleInDegrees){var angleInRadians=angleInDegrees*Math.PI/180.0;return{x:centerX+(radius*Math.cos(angleInRadians)),y:centerY+(radius*Math.sin(angleInRadians))};}
moveTo(x,y){if(this.line.length>1)this.polyline();this.line.push([x,y]);this.currStyle=this.getStyle();}
lineTo(x,y){this.line.push([x,y]);}
drawRect(x,y,width,height){this.txtAdd('<rect x="'+x+'px" y="'+y+'px" width="'+width+'px" height="'+height+'px" style="'+this.getStyle()+'"/>')}
drawText(text,x,y,rotate){var s='<text x="'+x+'px" y="'+y+'px" style="'+this.getFontStyle()+'" transform="rotate('+rotate+' '+x+' '+y+')" '+'>';s+=text;s+="</text>";this.txtAdd(s)}
getStyle(){var s='';s+="stroke-width='"+this.lineWidth+"' ";s+="stroke='"+this.strokeStyle+"' ";if(this.fillStyle.length>0){s+="fill='"+this.fillStyle+"' ";s+="fill-opacity='"+this.fillAlpha+"' ";}
return s;}
getFontStyle(){var s="";s+="font-size:30px; fill:#0000ff; stroke:none; font-family:Arial;"
return(s);}
polyline(){var s="";s+="<polyline points='";for(var i=0;i<this.line.length;i++){var pt=this.line[i];s+=pt[0].toPrecision(5);s+=" ";s+=pt[1].toPrecision(5);s+=", ";}
s+="' ";s+=this.currStyle;s+=" />";this.txtAdd(s)
s+="\n";this.line=[];}
polygon(line){var s="";s+="<polygon points='";for(var i=0;i<line.length;i++){if(i>0)
s+=", ";var pt=line[i];s+=pt.x.toPrecision(5);s+=" ";s+=pt.y.toPrecision(5);}
s+="' ";s+=this.getStyle();s+=" />";s+="\n";this.txtAdd(s)}
group(id){var s=''
if(this.inGroupQ){s+="</g>\n";}
s+="<g id='"+id+"'>";this.txtAdd(s)
this.inGroupQ=true;}
getText(){if(this.line.length>1)this.polyline();if(this.inGroupQ){this.txtAdd("</g>\n")}
this.txtAdd(this.getFooter())
return(this.txt);}}
function fmt1(x){return Math.round(x*10)/10}
function cmdsCharAdd(cmds,cmd){var x1=0,x2=0,x3=0;var y1=0,y2=0,y3=0;var x0=cmd[1];var y0=cmd[2];var c=cmd[3];var charArr=my.charArr[c]
var dbgStt=cmds.length
if(charArr!=undefined){var pntN=0;for(var k=0;k<charArr.length;k++){if(charArr[k][2]==1){if(pntN>1){var cmd=new Cmd('line')
cmd.parms=[(x2+x3)/2,(y2+y3)/2,x3,y3]
cmds.push(cmd)}
pntN=0;}
x1=x2;y1=y2;x2=x3;y2=y3;x3=parseFloat(charArr[k][0])+parseFloat(x0);y3=parseFloat(charArr[k][1])+parseFloat(y0);pntN++;if(pntN==2){var cmd=new Cmd('line')
cmd.parms=[x2,y2,(x2+x3)/2,(y2+y3)/2]
cmds.push(cmd)}
if(pntN>2){var cmd=new Cmd('curve3')
cmd.parms=[(x1+x2)/2,(y1+y2)/2,x2,y2,(x2+x3)/2,(y2+y3)/2]
cmds.push(cmd)}}
if(pntN>1){var cmd=new Cmd('line')
cmd.parms=[(x2+x3)/2,(y2+y3)/2,x3,y3]
cmds.push(cmd)}}
var s=''
for(var i=dbgStt;i<cmds.length;i++){s+='\n'+cmds[i]}}
function ptDist(pta,ptb){return Math.sqrt(Math.pow(pta.x-ptb.x,2)+Math.pow(pta.y-ptb.y,2));}
function ptsToStr(a){var s=''
for(var i=0;i<a.length;i++){s+=ptToStr(a[i])}
return s}
function ptToStr(pt){return '('+Math.round(pt.x*10)/10+','+Math.round(pt.y*10)/10+')'}
function loadChars(){my.charArr={"a":[[16,-14,1],[12,-16],[7,-15],[3,-11],[2,-5],[3,2],[7,5],[11,4],[14,0],[16,-7],[18,-13],[17,-9],[16,-5],[18,3],[20,7]],"b":[[10,-38,1],[9,-34],[8,-29],[7,-24],[6,-19],[5,-11],[4,-7],[3,-1],[3,4],[0,-14,1],[4,-17],[8,-19],[14,-19],[16,-14],[15,-8],[13,-4],[10,1],[5,3],[1,4]],"c":[[12,-15,1],[7,-15],[2,-11],[0,-6],[0,-1],[2,3],[7,4],[11,2],[15,0]],"d":[[14,-13,1],[10,-14],[5,-14],[1,-10],[0,-4],[1,0],[5,3],[10,1],[13,-3],[14,-7],[15,-11],[16,-15],[17,-19],[18,-23],[20,-29],[21,-34],[19,-28],[17,-22],[16,-17],[16,-12],[16,-4],[17,1],[21,5],[25,4]],"e":[[1,-8,1],[5,-7],[11,-9],[14,-14],[13,-18],[8,-18],[3,-13],[0,-8],[0,-3],[4,2],[7,3],[12,2],[16,-1]],"f":[[1,10,1],[0,16],[0,21],[2,26],[6,27],[11,23],[13,19],[14,15],[14,8],[14,-1],[14,-7],[15,-13],[16,-17],[21,-18],[24,-15],[10,-1,1],[16,-3],[22,-4]],"g":[[14,-12,1],[10,-13],[4,-8],[1,-2],[1,3],[4,7],[8,8],[14,2],[16,-4],[17,-8],[18,-14],[17,-9],[17,-4],[16,4],[15,10],[15,16],[13,22],[11,28],[7,31],[2,27],[0,22]],"h":[[4,-36,1],[3,-29],[3,-21],[3,-15],[3,-9],[2,-5],[1,-1],[0,4],[3,-3],[4,-8],[7,-12],[10,-15],[15,-16],[18,-10],[18,-2],[17,5]],"i":[[2,-17,1],[2,-12],[1,-7],[1,-2],[1,3],[0,7]],"j":[[14,-18,1],[14,-9],[14,-3],[14,3],[13,8],[13,13],[12,17],[11,21],[9,26],[4,26],[1,22],[0,17]],"k":[[6,-37,1],[4,-28],[3,-22],[2,-15],[1,-10],[1,-3],[0,1],[3,-6,1],[9,-11],[13,-16],[15,-20],[3,-6,1],[7,-4],[10,-1],[14,2]],"l":[[3,-33,1],[3,-25],[2,-19],[2,-14],[1,-9],[1,-3],[0,1]],"m":[[0,-18,1],[0,-11],[0,-4],[0,2],[2,-6],[4,-10],[6,-15],[10,-16],[11,-10],[11,-3],[12,2],[13,-3],[14,-7],[16,-13],[19,-16],[23,-18],[25,-12],[25,-7],[25,0],[24,4]],"n":[[2,-18,1],[2,-10],[2,-4],[1,0],[0,4],[2,-1],[2,-5],[5,-12],[8,-15],[13,-16],[14,-12],[14,-5],[14,1],[13,5]],"o":[[12,-15,1],[8,-16],[4,-13],[1,-9],[0,-4],[1,0],[5,2],[11,0],[14,-4],[15,-8],[15,-14],[12,-17]],"p":[[10,-16,1],[8,-7],[7,-1],[6,6],[5,12],[4,16],[3,20],[1,25],[0,29],[2,-9,1],[7,-11],[10,-14],[15,-17],[20,-16],[22,-11],[20,-4],[16,1],[11,3],[6,3]],"q":[[14,-15,1],[9,-15],[5,-14],[2,-11],[0,-6],[1,1],[6,3],[10,-1],[14,-7],[16,-13],[13,-5],[12,1],[11,5],[9,13],[8,19],[6,24],[5,29],[8,23],[10,19],[13,13],[15,9]],"r":[[3,-18,1],[2,-13],[2,-7],[1,0],[0,4],[2,-7],[4,-13],[8,-16],[13,-17],[17,-14]],"s":[[17,-13,1],[15,-17],[9,-16],[5,-13],[6,-9],[10,-7],[14,-6],[16,-2],[15,2],[10,4],[5,4],[1,2],[0,-2]],"t":[[12,-36,1],[10,-30],[9,-25],[8,-21],[7,-16],[6,-8],[6,-2],[7,2],[12,4],[15,0],[0,-17,1],[6,-14],[11,-14],[16,-16]],"u":[[3,-15,1],[0,-8],[0,0],[1,5],[6,4],[10,-2],[13,-8],[15,-12],[17,-17],[15,-12],[14,-7],[13,-3],[13,3],[15,7],[22,5]],"v":[[0,-16,1],[1,-11],[2,-6],[3,0],[3,5],[7,-1],[10,-6],[12,-10],[14,-14],[16,-18]],"w":[[7,-20,1],[4,-16],[1,-9],[0,-4],[0,1],[4,2],[7,-3],[9,-8],[11,-3],[12,2],[17,2],[20,-2],[22,-7],[23,-13],[22,-17],[21,-21]],"x":[[0,-13,1],[5,-13],[8,-10],[7,-4],[4,0],[0,3],[17,-13,1],[12,-12],[8,-9],[6,-5],[7,-1],[10,3],[16,4]],"y":[[9,-15,1],[7,-10],[6,-6],[7,0],[12,1],[15,-2],[19,-8],[20,-14],[19,-9],[18,-4],[17,4],[16,9],[15,13],[13,21],[11,25],[7,28],[2,25],[1,21],[0,16],[2,10]],"z":[[2,-15,1],[5,-14],[9,-14],[12,-14],[14,-15],[18,-15],[17,-12],[14,-9],[11,-7],[9,-4],[6,-3],[4,0],[2,1],[4,1],[6,0],[10,0],[14,0],[17,1],[19,1],[22,2]],"z1":[[2,-10,1],[5,-14],[9,-17],[13,-16],[12,-10],[9,-6],[12,-3],[14,2],[12,8],[10,14],[8,19],[6,23],[3,26],[0,23],[1,17],[5,10],[9,5],[14,0],[18,-4],[21,-7]],"A":[[2,3,1],[10,-31],[10,-31,1],[18,3],[3,-9,1],[15,-9]],"R":[[2,-20,1],[1,3],[3,-6,1],[9,-8],[13,-14],[14,-16],[11,-22],[0,-22],[3,-8,1],[7,-4],[10,-1],[14,2]],"V":[[2,-31,1],[10,3],[10,3,1],[18,-30]],"²":[[1,-20,1],[4,-22],[7,-22],[9,-21],[8,-16],[5,-12],[2,-10],[6,-11],[9,-10],[12,-10]],'1':[[0,-13,1],[7,-18],[11,-23],[9,-12],[8,-5],[7,5]],'2':[[0,-15,1],[5,-20],[11,-22],[15,-18],[14,-7],[8,0],[1,3],[9,1],[15,3],[22,5]],'3':[[0,-13,1],[7,-18],[13,-22],[17,-17],[14,-9],[8,-5],[14,-6],[20,-4],[17,3],[12,7],[5,7],[0,3]],'4':[[11,-19,1],[8,-11],[7,-4],[4,1],[0,7],[5,3],[12,1],[20,1],[14,-8,1],[14,4],[12,11]],'5':[[7,-23,1],[5,-12],[14,-12],[18,-7],[14,0],[8,4],[0,1],[7,-23,1],[12,-23],[18,-23]],'6':[[14,-23,1],[11,-22],[5,-18],[3,-11],[0,-4],[1,3],[7,4],[12,0],[15,-7],[9,-9],[3,-8]],'7':[[0,-21,1],[8,-21],[20,-21],[18,-14],[13,-6],[8,-1],[4,3]],'8':[[18,-21,1],[11,-21],[5,-19],[6,-14],[11,-10],[15,-5],[15,3],[9,8],[3,6],[0,1],[5,-5],[10,-10],[16,-15],[19,-20],[11,-21]],'9':[[0,6,1],[5,4],[9,0],[13,-4],[16,-12],[19,-17],[16,-22],[9,-22],[5,-19],[4,-14],[8,-9],[13,-7]],'0':[[14,-18,1],[9,-19],[4,-16],[1,-10],[0,-4],[1,3],[5,7],[10,5],[16,0],[17,-6],[18,-12],[17,-18]],"div":[[0,-4.2,1],[5,-5.2],[10,-4.2],[16,-4.2],[21,-3.2],[26,-4.2],[11,-15,1],[9,-13],[11,-11],[13,-13],[11,-15],[12,3,1],[10,5],[12,7],[14,5],[12,3]],".":[[0,0,1],[-2,2],[0,4],[2,2],[0,0]],",":[[1,1,1],[-1,-1],[1,-2],[2,-1],[-1,5]],":":[[2,0,1],[0,2],[2,4],[4,2],[2,0],[2,-10,1],[0,-12],[2,-14],[4,-12],[2,-10]],"+":[[0,-5,1],[4,-6],[10,-6],[20,-6],[11,-14,1],[10,-10],[9,-4],[9,1],[8,5]],"-":[[0,-5,1],[5,-6],[12,-6],[17,-7]],"*":[[0,5,1],[4,1],[7,-2],[11,-7],[14,-10],[17,-14],[2,-17,1],[5,-12],[8,-8],[11,-2],[16,5]],"/":[[0,4,1],[4,0],[7,-4],[10,-7],[13,-11],[17,-15]],"=":[[0,-9,1],[8,-8],[20,-8],[24,-8],[0,-1,1],[6,-1],[22,-1]],"≈":[[0,-5,1],[7,-9],[13,-8],[17,-4],[24,-8],[0,3,1],[6,-2],[12,-2],[17,3],[24,-1]],"(":[[8,-27,1],[5,-23],[3,-17],[1,-10],[0,-4],[0,3],[1,8],[3,12],[5,16]],")":[[1,-26,1],[5,-23],[7,-19],[9,-13],[9,-7],[8,0],[7,4],[5,9],[3,13],[0,16]]," ":[]}
var fact=0.8
for(var prop in my.charArr){var char=my.charArr[prop]
for(var j=0;j<char.length;j++){var arr=char[j]
for(var k=0;k<arr.length;k++){if(k<2)arr[k]=arr[k]*fact}}}}
function showCache(){var cache=localStorage.getItem("voiceCache");var cacheParsed=JSON.parse(cache);console.log('cache',cache,cacheParsed)}
class VoiceAWS{constructor(){this.speechParams={OutputFormat:"mp3",SampleRate:"16000",Text:"This is a test",TextType:"ssml",VoiceId:"Joanna",};this.polly=new AWS.Polly({apiVersion:'2016-06-10'});this.signer=new AWS.Polly.Presigner(this.speechParams,this.polly)
var elementId="audioElement"+new Date().valueOf().toString();this.audioElement=document.createElement('audio');this.audioElement.setAttribute("id",elementId);document.body.appendChild(this.audioElement);console.log('this.audioElement',this.audioElement)
this.cache=JSON.parse(localStorage.getItem("voiceCache"))
if(this.cache==null)this.cache=[];this.speaking=false
this.pending=false
this.cachQ=true}
say(s){this.speechParams.Text=s
var me=this
return new Promise(function(successCallback,errorCallback){me.speaking=true;me.getAudio(s).then(function(result){me.playAudio(result);}).then(successCallback);});}
getAudio(s){if(!this.cachQ||this.requestSpeechFromLocalCache(s)===null){return this.requestSpeechFromAWS(s);}else{return this.requestSpeechFromLocalCache(s);}}
requestSpeechFromAWS(s){console.log('From AWS: '+s)
var me=this
return new Promise(function(successCallback,errorCallback){var polly=new AWS.Polly();polly.synthesizeSpeech(me.speechParams,function(error,data){if(error){errorCallback(error)}else{me.saveSpeechToLocalCache(s,data.AudioStream);successCallback(data.AudioStream);}});});}
requestSpeechFromLocalCache(s){console.log('From Cache: '+s)
var audioStream=this.cache.filter(function(record){return record.Message===s;})[0];if(audioStream===null||typeof audioStream==='undefined'){return null;}else{var me=this
return new Promise(function(successCallback,errorCallback){successCallback(me.strToArr(audioStream.Stream));});}}
saveSpeechToLocalCache(s,audioStream){var record={Message:s,Stream:this.arrToStr(audioStream)};this.cache.push(record);while(this.cache.length>110)this.cache.shift()
localStorage.setItem("voiceCache",JSON.stringify(this.cache));}
arrToStr(arr){var s=''
for(var i=0;i<arr.length;i++){var data=arr[i]
var hex=data.toString(16);if(hex.length<2)hex='0'+hex
s+=hex}
this.strToArr(s)
return s}
strToArr(s){var arr=[]
for(var i=0;i<s.length;i+=2){var hex=s.substr(i,2)
arr.push(parseInt(hex,16))}
return arr}
playAudio(audioStream){var me=this
var uInt8Array=new Uint8Array(audioStream);var arrayBuffer=uInt8Array.buffer;var blob=new Blob([arrayBuffer]);var url=URL.createObjectURL(blob);me.audioElement.src=url;me.audioElement.addEventListener("ended",function(){me.speaking=false;});me.audioElement.play();}
cancel(){return ''}}