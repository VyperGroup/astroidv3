var my={}
function calcbrokenMain(imode){var version='0.94';this.mode=typeof imode!=='undefined'?imode:'Multiply';console.log("mode",imode,this.mode);var w=390
my.keys=["7","8","9","\u00d7","\u00f7","4","5","6","+","\u2212","1","2","3","(",")","0",".","^","\u2190","C","\u221a","x\u00b2","x\u00b3","&nbsp;"];my.keyLines=[5,5,5,5,0,4]
my.keysn=20
my.keyTypes={0:{lbl:'0',run(){pushU('0');}},pi:{lbl:'pi',run(){pushU('pi');}},x2:{lbl:'x\u00b2',run(){aroundU('(',')^2');}},}
my.lvls=[{name:1,tgts:[6,7,8,10,12,15,20,50],keys:[2,3,"+","MUL","C"],time:4},{name:2,tgts:[-10,1,3,10,24,32,100,625],keys:[2,5,"SUB","MUL","(",")","MR","C"],time:3},{name:3,tgts:[-5,3,5,13,20,33,82,100],keys:[1,6,8,"SUB","SQRT","C"],time:5},{name:4,tgts:[3,4,5,6,7,8,9,10],keys:[0,1,2,"MUL","DIV","(",")","C"],time:3},{name:5,tgts:[1,14,24,32,93,100,196,300],keys:[2,4,9,"SUB","x2","(",")","C"],time:5},{name:6,tgts:[1,5,6.5,11,24,32,100,512],keys:[2,"DIV","x2","+","(",")","C"],time:3},]
my.lvl=my.lvls[5]
var symbs=[['MUL','\u00d7'],['DIV','\u00f7'],['SUB','\u2212'],['SQRT','\u221a'],['x2','x\u00b2'],['x2','x\u00b3']]
for(var i=0;i<my.lvls.length;i++){var keys=my.lvls[i].keys
for(var j=0;j<keys.length;j++){for(var k=0;k<symbs.length;k++){var symb=symbs[k]
if(keys[j]==symb[0])keys[j]=symb[1]}}}
var leftWd=285
var s='';s+='<style>#u:disabled { background: #def; }</style>'
s+='<style>'
s+='.btn { display: inline-block; position: relative; text-align: center; margin: 2px; text-decoration: none; font: bold 14px/25px Arial, sans-serif; color: #268; border: 1px solid #88aaff; border-radius: 10px;cursor: pointer; background: linear-gradient(to top right, rgba(170,190,255,1) 0%, rgba(255,255,255,1) 100%); outline-style:none;}'
s+='.btn:hover { background: linear-gradient(to top, rgba(255,255,0,1) 0%, rgba(255,255,255,1) 100%); }'
s+='.yy { border: solid 2px #eeeeaa; background: linear-gradient(to top, rgba(255,220,130,1) 0%, rgba(255,255,255,1) 100%);  }'
s+='.hi { border: solid 2px #eeeeaa; background: linear-gradient(to top, rgba(130,220,255,1) 0%, rgba(255,255,255,1) 100%); box-shadow: 2px 2px 6px #66a; }'
s+='.lo { border: solid 1px #888888; background: linear-gradient(to top, rgba(170,170,170,1) 0%, rgba(205,205,205,1) 100%);  }'
s+='</style>'
s+='<div style="position:relative; min-height:300px; width:'+w+'px; border: none; border-radius: 20px; background-color: #ffe; margin:auto; display:block;">';s+='<div style="display: inline-block; margin-top:-2px; width:'+(leftWd-6)+'px; padding:3px; margin:3px;float:left; font: bold 20px Arial; background-color: rgba(0,0,255,0.2); color: darkblue; border: 1px solid #bbb; border-radius: 10px; text-align: center;" >';s+='<textarea id="u" style="display: inline-block; width:96%; padding:1%; height: 62px; text-align: center; border-radius: 10px; font: 25px Arial; 	color: blue; outline-style: none; z-index: 2; " onkeyup="userKey(event)" autofocus >&nbsp;</textarea>';s+='<div id="a" style="display: inline-block; width:96%; padding:1%; font: bold 20px Arial; background-color: rgba(0,0,255,0.2); color: darkblue; border: 1px solid #bbb; border-radius: 10px; text-align: center;" >&nbsp;</div>';s+='<div style="display:inline-block; z-index:5; background-color:#def; width:100%; font: bold 16px Arial; margin-top:2%; ">';s+=getKeyHTML();s+='</div>';s+='</div>';s+='<div style="clear:both"></div>'
s+='<canvas id="timercanvas" style="position: absolute; right:12px; top: 4px;" width="100" height="100" style="z-index:2;  width:100px;"></canvas>';s+='<div id="tgts" style="position: absolute; right:0px; top: 90px; font: bold 23px/31px arial;  height:240px; width:'+(w-leftWd-2)+'px;  text-align:center; ">';s+='&nbsp;';s+='</div>';s+='<div style="font: 12px arial; font-weight: bold; color: #6600cc; text-align:left;">History:</div>';s+='<textarea  id="hist" value="ddd" style="width:97%; height: 120px; font: 14px Arial; border: 1px solid red; border-radius: 9px; background-color: #eeeeff; display: block; text-align: center;">';s+='</textarea>';s+='<div id="opt" style="font: 10px arial; font-weight: bold; color: #6600cc; text-align:center;"></div>';s+='<button style="position: absolute; right:3%; top: 354px; color: #000aae; font-size: 14px; z-index:2;" class="btn"  onclick="my.pop.open()" >Options</button>';s+='<button id="rad" style="position: absolute; right:0px; bottom: 0px; color: #000aae; font-size: 14px; z-index:-2; visibility:hidden;" class="btn"  onclick="toggleRad()" >rad</button>';s+='<div id="copyrt" style="font: 10px arial; font-weight: bold; color: #6600cc; text-align:center;">&copy; 2019 MathsIsFun.com  v'+version+'</div>';s+='</div>';document.write(s);var cw=72
var ch=cw;var div=document.getElementById('timercanvas');var ratio=2;div.width=cw*ratio;div.height=ch*ratio;div.style.width=cw+"px";div.style.height=ch+"px";var gtimer=div.getContext("2d");gtimer.setTransform(ratio,0,0,ratio,0,0);my.timer=new Timer(gtimer,cw/2,60,'#0000ff',gameEnd);my.timer.stop()
my.hists=[];my.lastHist="?";my.lastHistTime=-10000;this.p=new Parser();my.tgts=[]
this.radsQ=true;toggleRad();var s=''
s+='<div id="result" style="font:16px Arial; width:360px;">'
s+='</div>'
s+='<div  style="font:16px Arial; margin:8px;">'
s+=radioHTML('Level','lvl',my.lvls,null)
s+='</div>'
my.pop=new Pop('opt','',function(){gameNew()})
my.pop.bodySet(s)
my.pop.open()
document.getElementById("u").disabled=true;doCalc(false);document.getElementById("u").focus();}
function optOpen(){console.log('optOpen')
my.opt.open()}
function gameEnd(){console.log('gameEnd')
var s=''
s+='<div style="font:20px Arial;  margin:8px;">'
s+='Time is Up!'
s+='</div>'
var gotN=0
for(var i=0;i<my.tgts.length;i++){if(my.tgts[i].gotQ)gotN++}
s+='<div style="font:16px Arial; color:white;">'
s+='You got '+gotN+' of the target values'
s+='</div>'
document.getElementById('result').innerHTML=s
my.playQ=false
my.pop.open()}
function tests(){var exs=['3-1.1e3/1e2 - e + e^2- 2.3 -45','1E4','3-1e-4','-2.2e-4-3','3*sqrt(2)','pi/2','2pi','e^2','2e','27','asin(1)','$3,600.5/2','1+2-3','3(7+3)','1/sqrt(2)','sqrt(-1)','12+2*3','abs(-3.2)','floor(-3.2)','ceil(-3.2)','sign(-3.2)','round(-3.2)','sinh(-1.1)','2.e2','2^0.5','2^-0.5','2^-.5','3.1*-3','3.1*-3.1'];for(var i=0;i<exs.length;i++){var ex=exs[i];p.newParse(ex);console.log("ex:",ex,'==>',p.rootNode.walkFmt(),'==>',p.getVal(),'==>',p.getVal().fmt());}}
function gameNew(){var n=radioGetIndex('lvl',my.lvls)
console.log('gameNew',n)
my.lvl=my.lvls[n]
var tgts=my.lvl.tgts
my.tgts=[]
for(var i=0;i<tgts.length;i++){my.tgts.push({val:tgts[i],gotQ:false})}
tgtsShow()
for(var i=0;i<my.keys.length;i++){var key=my.keys[i];document.getElementById('key'+i).style.visibility='hidden'}
var keys=my.lvl.keys
for(var k=0;k<keys.length;k++){var key=keys[k]
for(var i=0;i<my.keys.length;i++){if(my.keys[i]==key)document.getElementById('key'+i).style.visibility='visible'}}
my.playQ=true
my.timer.restart(60*my.lvl.time);}
function tgtsShow(){var s=''
for(var i=0;i<my.tgts.length;i++){if(my.tgts[i].gotQ){s+='<div style="color:#ddd">'+my.tgts[i].val+'</div>'}else{s+='<div style="color:#840">'+my.tgts[i].val+'</div>'}}
document.getElementById('tgts').innerHTML=s}
function tgtCheck(num){num=Math.round(num*10)/10
console.log("tgtCheck",num);for(var i=0;i<my.tgts.length;i++){if(num==my.tgts[i].val){my.tgts[i].gotQ=true
winCheck()}}
tgtsShow();}
function winCheck(){var gotN=0
for(var i=0;i<my.tgts.length;i++){if(my.tgts[i].gotQ)gotN++}
if(gotN==my.tgts.length){var s=''
s+='<div style="font:36px Arial; color: gold;  margin:8px;">'
s+='You Win!'
s+='</div>'
s+='<div style="font:16px Arial; margin:8px; color:white;">'
s+='You got all '+my.tgts.length+' of the target values'
s+='<br>'
s+='In just '+my.timer.toString()+''
s+='</div>'
my.timer.stop()
document.getElementById('result').innerHTML=s
my.playQ=false
my.pop.open()}}
function toggleRad(){this.radsQ=!this.radsQ;var inddiv=document.getElementById('rad');if(this.radsQ){inddiv.innerHTML='rad';}else{inddiv.innerHTML='deg';}
doCalc(false);return;}
function getKeyHTML(){var lineStt='<div style="text-align:center;">';var lineEnd='</div>';var col=-1
var row=0
var fnQ=false
var s='';s+=lineStt
for(var i=0;i<my.keys.length;i++){var key=my.keys[i];col++
if(col==my.keyLines[row]){col=0
row++
if(i>0)s+=lineEnd;if(my.keyLines[row]==0){s+='<br>'
fnQ=true
row++}
s+=lineStt;}
var clr=keyClr(i,'out')+';';if(!fnQ){s+='<button id="key'+i+'" style="width:57px; margin:-1px; font: 30px Consolas,monaco,monospace; background: '+clr+';" type="button" onclick="doKey('+i+')" onmouseover="keyOver('+i+')"  onmouseout="keyOut('+i+')" >'+key+'</button>';}else{s+='<button id="key'+i+'" style="width:71px; height:38px; margin:-1px; font: 21px Consolas,monaco,monospace; background: '+clr+';" type="button" onclick="doKey('+i+')" onmouseover="keyOver('+i+')"  onmouseout="keyOut('+i+')" >'+key+'</button>';}}
s+=lineEnd;return s;}
function doKey(i){if(!my.playQ)return
var key=my.keys[i]
console.log("doKey",i,key);var simples=["1","2","3","4","5","6","7","8","9","0","(",")","+","\u00d7","\u00f7","\u2212",".",'^','i'];if(simples.indexOf(key)>=0){pushU(key);}else{switch(key){case "=":doCalc(true);break;case "C":document.getElementById('u').value='';document.getElementById('a').innerHTML='&nbsp;';break;case "1/x":aroundU('(1/(','))');break;case "\u00B1":aroundU('(-(','))');break;case "sin":aroundU('sin(',')');break;case "cos":aroundU('cos(',')');break;case "tan":aroundU('tan(',')');break;case "sin<sup>-1</sup>":aroundU('asin(',')');break;case "cos<sup>-1</sup>":aroundU('acos(',')');break;case "tan<sup>-1</sup>":aroundU('atan(',')');break;case "e<sup>x</sup>":aroundU('exp(',')');break;case "ln":aroundU('ln(',')');break;case "\u221a":aroundU('sqrt(',')');break;case "x\u00b2":aroundU('(',')^2');break;case "x\u00b3":aroundU('(',')^3');break;case "rad":toggleRad(i);break;case "pi":pushU('pi');break;case "\u2190":var s=document.getElementById('u').value;s=s.substring(0,s.length-1);document.getElementById('u').value=s;break;default:}}}
function pushU(s){my.uDiv=document.getElementById('u');if(my.uDiv.selectionStart==0&&my.uDiv.selectionEnd==0){var txt=my.uDiv.value;my.uDiv.setSelectionRange(txt.length,txt.length);}
var txt=my.uDiv.value;my.uDiv.value=(txt.substring(0,my.uDiv.selectionStart)+s+txt.substring(my.uDiv.selectionEnd));my.uDiv.setSelectionRange(my.uDiv.selectionStart+s.length,my.uDiv.selectionStart+s.length);doCalc(false);}
function aroundU(s1,s2){var s=document.getElementById('u').value;var ops=["+","-","\u2212",'*',"\u00d7",'../index.html',"\u00f7",'^'];for(var i=s.length-1;i>=0;i--){if(ops.indexOf(s.charAt(i))>-1)break;}
var sNew=''
if(i==0){sNew=s1+s+s2;}else{i++;sNew=s.substr(0,i)+s1+s.substr(i)+s2;console.log("aroundU",s,i,sNew);}
document.getElementById('u').value=sNew;doCalc(false);}
function userKey(e){var kt=keyType(e.keyCode,e.shiftKey);var f=document.getElementById('u').value;switch(kt){case '=':f=f.substr(0,f.length-1);document.getElementById('u').value=f;doCalc(true);break;case '+':case '*':case '/':case '^':console.log("userKey",kt);if(f.length==1){document.getElementById('u').value=my.hists[0][0]+f;}
doCalc(false);break;default:doCalc(false);break;}}
function keyType(k,shift){if(k==13)return "=";if(k==61&&shift)return "+";if(k==61&&!shift)return "=";if(k==187&&shift)return "+";if(k==187&&!shift)return "=";if(k==173&&!shift)return "-";if(k==189&&!shift)return "-";if(k==191&&!shift)return "/";if(k==56&&shift)return "*";if(k==106)return "*";if(k==107)return "+";if(k==109)return "-";if(k==111)return "/";return "?";}
function doCalc(updateUQ){var f=document.getElementById('u').value;this.p.radiansQ=this.radsQ;this.p.newParse(f);var num=this.p.getVal();if(num==Number.POSITIVE_INFINITY)this.p.errMsg="undefined";if(num==Number.NEGATIVE_INFINITY)this.p.errMsg="undefined";if(this.p.errMsg.length>0){document.getElementById('a').innerHTML='&nbsp;';}else{if(updateUQ){document.getElementById('u').value='';}
document.getElementById('a').innerHTML=' = '+num;addHist(f,num);}
tgtCheck(num)}
function addHist(q,a){console.log("addHist",q,a);if(q!=a.toString()){var hist=q+" = "+a;if(hist!=my.lastHist){if(my.lastHistTime+2000>Date.now()){console.log("replace");my.hists[0]=[q,a];}else{console.log("unshift");my.hists.unshift([q,a]);}
my.lastHist=hist;my.lastHistTime=Date.now();var h='';for(var i=0;i<Math.min(8,my.hists.length-1);i++){h+=my.hists[i][0]+' = '+my.hists[i][1]+"\n";}
document.getElementById('hist').value=h;}}}
function keyOver(n){var div=document.getElementById('key'+n);div.style.background=keyClr(n,'over');}
function keyOut(n){var div=document.getElementById('key'+n);div.style.background=keyClr(n,'out');}
function keyClr(n,state){var clr='blue;';switch(state){case 'out':clr='linear-gradient(to right, #8af 0%, #acf 100%)';if(n%5>=3)clr='linear-gradient(to right, #fa8 0%, #fc8 100%)';if(n>=my.keysn)clr='linear-gradient(to right, #fa8 0%, #fc8 100%)';break;case 'over':clr='linear-gradient(to right, #acf 0%, #def 100%)';if(n%5>=3)clr='linear-gradient(to right, #fca 0%, #fdc 100%)';if(n>=my.keysn)clr='linear-gradient(to right, #fca 0%, #fdc 100%)';break;default:}
return clr;}
function getHist(){var s="";my.lastHistTime=0;for(var i=0;i<my.hists.length;i++){s+=my.hists[i]+"\n";}
return s;}
function fmt(num,digits){if(num==Number.POSITIVE_INFINITY)
return "undefined";if(num==Number.NEGATIVE_INFINITY)
return "undefined";return num;}
function Parser(){this.operators="+-*(/),^.";this.rootNode=null;this.tempNode=[];this.Variable="x";this.errMsg="";this.radiansQ=true;this.vals=[];for(var i=0;i<26;i++){this.vals[i]=0;}
this.reset();}
Parser.prototype.setVarVal=function(varName,newVal){switch(varName){case "x":this.vals[23]=newVal;break;case "y":this.vals[24]=newVal;break;case "z":this.vals[25]=newVal;break;default:if(varName.length==1){this.vals[varName.charCodeAt(0)-'a'.charCodeAt(0)]=newVal;}}};Parser.prototype.getVal=function(){return(this.rootNode.walk(this.vals));};Parser.prototype.newParse=function(s){this.reset();s=s.replace(/[^\w/\.\(\)\[\]\+\-\^\%\&\;\*\u2212\u00F7\u00D7\u00B2\u00B3\u221a]/gi,'');s=s.split("x").join("*");s=s.split("[").join("(");s=s.split("]").join(")");s=s.split("&nbsp;").join("");s=s.split("&mult;").join("*");s=s.split("&divide;").join("../index.html");s=s.split("&minus;").join("-");s=s.replace(/\u2212/g,'-');s=s.replace(/\u00F7/g,'../index.html');s=s.replace(/\u00D7/g,'*');s=s.replace(/\u00B2/g,'^2');s=s.replace(/\u00B3/g,'^3');s=s.replace(/\u221a/g,'sqrt');s=this.fixPercent(s);s=this.fixENotation(s);s=this.fixParentheses(s);s=this.fixUnaryMinus(s);s=this.fixImplicitMultply(s);this.rootNode=this.parse(s);};Parser.prototype.fixPercent=function(s){if(!s.match(/%/)){return s;}
var myRe=/[0-9]*\.?[0-9]+[%]/g;var bits=[];var stt=0;var arr;while((arr=myRe.exec(s))!==null){bits.push(s.substr(stt,arr.index-stt));var str=arr[0];str='('+str.replace(/%/,'/100')+')';bits.push(str);stt=arr.index+arr[0].length;}
bits.push(s.substr(stt));s=bits.join('');return s;};Parser.prototype.fixENotation=function(s){if(!s.match(/e/i)){return s;}
var myRe=/[0-9]*\.?[0-9]+[eE]{1}[-+]?[0-9]+/g;var bits=[];var stt=0;var arr;while((arr=myRe.exec(s))!==null){bits.push(s.substr(stt,arr.index-stt));var eStr=arr[0];eStr='('+eStr.replace(/e/gi,'*10^(')+'))';bits.push(eStr);stt=arr.index+arr[0].length;}
bits.push(s.substr(stt));s=bits.join('');return s;};Parser.prototype.fixParentheses=function(s){var sttParCount=0;var endParCount=0;for(var i=0;i<s.length;i++){if(s.charAt(i)=="(")sttParCount++;if(s.charAt(i)==")")endParCount++;}
while(sttParCount<endParCount){s="("+s;sttParCount++;}
while(endParCount<sttParCount){s+=")";endParCount++;}
return(s);};Parser.prototype.fixUnaryMinus=function(s){var x=s+"\n";var y="";var OpenQ=false;var prevType="(";var thisType="";for(var i=0;i<s.length;i++){var c=s.charAt(i);if((c>="0"&&c<="9")||c=='.'){thisType="N";}else{if(this.operators.indexOf(c)>=0){if(c=="-"){thisType="-";}else{thisType="O";}}else{if(c=="."||c==this.Variable){thisType="N";}else{thisType="C";}}
if(c=="("){thisType="(";}
if(c==")"){thisType=")";}}
x+=thisType;if(prevType=="("&&thisType=="-"){y+="0";}
if(OpenQ){switch(thisType){case "N":break;default:y+=")";OpenQ=false;}}
if(prevType=="O"&&thisType=="-"){y+="(0";OpenQ=true;}
y+=c;prevType=thisType;}
if(OpenQ){y+=")";OpenQ=false;}
return(y);};Parser.prototype.fixImplicitMultply=function(s){var x=s+"\n";var y="";var prevType="?";var prevName="";var thisType="?";var thisName="";for(var i=0;i<s.length;i++){var c=s.charAt(i);if(c>="0"&&c<="9"){thisType="N";}else{if(this.operators.indexOf(c)>=0){thisType="O";thisName="";}else{thisType="C";thisName+=c;}
if(c=="("){thisType="(";}
if(c==")"){thisType=")";}}
x+=thisType;if(prevType=="N"&&thisType=="C"){y+="*";thisName="";}
if(prevType=="N"&&thisType=="("){y+="*";}
if(prevType==")"&&thisType=="("){y+="*";}
if(thisType=="("){switch(prevName){case "i":case "pi":case "e":case "a":case this.Variable:y+="*";break;}}
y+=c;prevType=thisType;prevName=thisName;}
return(y);};Parser.prototype.reset=function(){this.tempNode=[];this.errMsg="";};Parser.prototype.parse=function(s){var nnew
if(s==""){this.errMsg+="Missing Value\n";return new MathNode("real","0",this.radiansQ);}
if(isNumeric(s)){return new MathNode("real",s,this.radiansQ);}
if(s.charAt(0)=="$"){if(isNumeric(s.substr(1))){return this.tempNode[Number(s.substr(1))];}}
var sLo=s.toLowerCase();if(sLo.length==1){if(sLo>="a"&&sLo<="z"){return new MathNode("var",sLo,this.radiansQ);}}
switch(sLo){case "pi":return new MathNode("var",sLo,this.radiansQ);}
var bracStt=s.lastIndexOf("(");if(bracStt>-1){var bracEnd=s.indexOf(")",bracStt);if(bracEnd<0){this.errMsg+="Missing ')'\n";return new MathNode("real","0",this.radiansQ);}
var isParam=false;if(bracStt==0){isParam=false;}else{var prefix=s.substr(bracStt-1,1);isParam=this.operators.indexOf(prefix)<=-1;}
if(!isParam){this.tempNode.push(this.parse(s.substr(bracStt+1,bracEnd-bracStt-1)));return this.parse(s.substr(0,bracStt)+"$"+(this.tempNode.length-1).toString()+s.substr(bracEnd+1,s.length-bracEnd-1));}else{var startM=-1;for(var u=bracStt-1;u>-1;u--){var found=this.operators.indexOf(s.substr(u,1));if(found>-1){startM=u;break;}}
nnew=new MathNode("func",s.substr(startM+1,bracStt-1-startM),this.radiansQ);nnew.addchild(this.parse(s.substr(bracStt+1,bracEnd-bracStt-1)));this.tempNode.push(nnew);return this.parse(s.substr(0,startM+1)+"$"+(this.tempNode.length-1).toString()+s.substr(bracEnd+1,s.length-bracEnd-1));}}
var k;var k1=s.lastIndexOf("+");var k2=s.lastIndexOf("-");if(k1>-1||k2>-1){if(k1>k2){k=k1;var nnew=new MathNode("op","add",this.radiansQ);nnew.addchild(this.parse(s.substr(0,k)));nnew.addchild(this.parse(s.substr(k+1,s.length-k-1)));return nnew;}else{k=k2;nnew=new MathNode("op","sub",this.radiansQ);nnew.addchild(this.parse(s.substr(0,k)));nnew.addchild(this.parse(s.substr(k+1,s.length-k-1)));return nnew;}}
k1=s.lastIndexOf("*");k2=s.lastIndexOf("../index.html");if(k1>-1||k2>-1){if(k1>k2){k=k1;nnew=new MathNode("op","mult",this.radiansQ);nnew.addchild(this.parse(s.substr(0,k)));nnew.addchild(this.parse(s.substr(k+1,s.length-k-1)));return nnew;}else{k=k2;nnew=new MathNode("op","div",this.radiansQ);nnew.addchild(this.parse(s.substr(0,k)));nnew.addchild(this.parse(s.substr(k+1,s.length-k-1)));return nnew;}}
k=s.indexOf("^");if(k>-1){nnew=new MathNode("op","pow",this.radiansQ);nnew.addchild(this.parse(s.substr(0,k)));nnew.addchild(this.parse(s.substr(k+1,s.length-k-1)));return nnew;}
if(isNumeric(s)){return new MathNode("real",s,this.radiansQ);}else{if(s.length==0){return new MathNode("real","0",this.radiansQ);}else{this.errMsg+="'"+s+"' is not a number.\n";return new MathNode("real","0",this.radiansQ);}}};function MathNode(typ,val,radQ){this.tREAL=0;this.tVAR=1;this.tOP=2;this.tFUNC=3;this.radiansQ=true;this.setNew(typ,val,radQ);}
MathNode.prototype.setNew=function(typ,val,radQ){this.radiansQ=typeof radQ!=='undefined'?radQ:true;this.clear();switch(typ){case "real":this.typ=this.tREAL;this.r=Number(val);break;case "var":this.typ=this.tVAR;this.v=val;break;case "op":this.typ=this.tOP;this.op=val;break;case "func":this.typ=this.tFUNC;this.op=val;break;}
return(this);};MathNode.prototype.clear=function(){this.r=1;this.v="";this.op="";this.child=[];this.childCount=0;};MathNode.prototype.addchild=function(n){this.child.push(n);this.childCount++;return(this.child[this.child.length-1]);};MathNode.prototype.getLevelsHigh=function(){var lvl=0;for(var i=0;i<this.childCount;i++){lvl=Math.max(lvl,this.child[i].getLevelsHigh());}
return(lvl+1);};MathNode.prototype.isLeaf=function(){return(this.childCount==0);};MathNode.prototype.getLastBranch=function(){if(this.isLeaf()){return(null);}
for(var i=0;i<this.childCount;i++){if(!this.child[i].isLeaf()){return(this.child[i].getLastBranch());}}
return(this);};MathNode.prototype.fmt=function(htmlQ){htmlQ=typeof htmlQ!=='undefined'?htmlQ:true;var s="";if(this.typ==this.tOP){switch(this.op.toLowerCase()){case "add":s="+";break;case "sub":s=htmlQ?"\u2212":"-";break;case "mult":s=htmlQ?"\u00d7":"x";break;case "div":s=htmlQ?"\u00f7":"/";break;case "pow":s="^";break;default:s=this.op;}}
if(this.typ==this.tREAL){s=this.r.toString();}
if(this.typ==this.tVAR){if(this.r==1){s=this.v;}else{if(this.r!=0){s=this.r+this.v;}}}
if(this.typ==this.tFUNC){s=this.op;}
return s;};MathNode.prototype.walkFmt=function(){var s=this.walkFmta(true,"");s=s.replace("Infinity","Undefined");return s;};MathNode.prototype.walkFmta=function(noparq,prevop){var s="";if(this.childCount>0){var parq=false;if(this.op=="add")parq=true;if(this.op=="sub")parq=true;if(prevop=="div")parq=true;if(noparq)parq=false;if(this.typ==this.tFUNC)parq=true;if(this.typ==this.tOP){}else{s+=this.fmt(true);}
if(parq)s+="(";for(var i=0;i<this.childCount;i++){if(this.typ==this.tOP&&i>0)s+=this.fmt();s+=this.child[i].walkFmta(false,this.op);if(this.typ==this.tFUNC||(parq&&i>0)){s+=")";}}}else{s+=this.fmt();if(prevop=="sin"||prevop=="cos"||prevop=="tan"){if(this.radiansQ){s+=" rad";}else{s+="\u00b0";}}}
return s;};MathNode.prototype.walkNodesFmt=function(level){var s="";for(var i=0;i<level;i++){s+="|   ";}
s+=this.fmt();s+="\n";for(i=0;i<this.childCount;i++){s+=this.child[i].walkNodesFmt(level+1);}
return s;};MathNode.prototype.walk=function(vals){if(this.typ==this.tREAL)return(this.r);if(this.typ==this.tVAR){switch(this.v){case "x":return(vals[23]);case "y":return(vals[24]);case "z":return(vals[25]);case "pi":return(Math.PI);case "e":return(Math.exp(1));case "a":return(vals[0]);case "n":return(vals[13]);default:return(0);}}
if(this.typ==this.tOP){var val=0;for(var i=0;i<this.childCount;i++){var val2=0;if(this.child[i]!=null)
val2=this.child[i].walk(vals);if(i==0){val=val2;}else{switch(this.op){case "add":val+=val2;break;case "sub":val-=val2;break;case "mult":val*=val2;break;case "div":val/=val2;break;case "pow":if(val2==2){val=val*val;}else{val=Math.pow(val,val2);}
break;default:}}}
return val;}
var val=0
if(this.typ==this.tFUNC){var lhs=this.child[0].walk(vals);var angleFact=1;if(!this.radiansQ)angleFact=180/Math.PI;switch(this.op){case "sqrt":val=Math.sqrt(lhs);break;case "sin":val=Math.sin(lhs/angleFact);break;case "cos":val=Math.cos(lhs/angleFact);break;case "tan":val=Math.tan(lhs/angleFact);break;case "asin":val=Math.asin(lhs)*angleFact;break;case "acos":val=Math.acos(lhs)*angleFact;break;case "atan":val=Math.atan(lhs)*angleFact;break;case "sinh":val=(Math.exp(lhs)-Math.exp(-lhs))/2;break;case "cosh":val=(Math.exp(lhs)+Math.exp(-lhs))/2;break;case "tanh":val=(Math.exp(lhs)-Math.exp(-lhs))/(Math.exp(lhs)+Math.exp(-lhs));break;case "exp":val=Math.exp(lhs);break;case "log":val=Math.log(lhs)*Math.LOG10E;break;case "ln":val=Math.log(lhs);break;case "abs":val=Math.abs(lhs);break;case "deg":val=lhs*180.0/Math.PI;break;case "rad":val=lhs*Math.PI/180.0;break;case "sign":if(lhs<0){val=-1;}else{val=1;}
break;case "round":val=Math.round(lhs);break;case "int":val=Math.floor(lhs);break;case "floor":val=Math.floor(lhs);break;case "ceil":val=Math.ceil(lhs);break;case "fact":val=factorial(lhs);break;default:val=NaN;}
return val;}
return val;};function factorial(n){if(n<0)return NaN;if(n<2)return 1;n=n<<0;var i;i=n;var f=n;while(i-->2){f*=i;}
return f;}
function isNumeric(n){return!isNaN(parseFloat(n))&&isFinite(n);}
class Timer{constructor(g,rad,secs,clr,funcEnd){this.g=g;this.rad=rad;this.secs=secs;this.clr=clr;this.funcEnd=funcEnd;this.x=rad;this.y=rad;this.stt=performance.now();this.stopQ=false;}
update(){}
restart(secs){this.secs=secs;this.stt=performance.now();this.stopQ=false;requestAnimationFrame(this.draw.bind(this));}
more(secs){this.stt+=secs*1000;}
stop(){this.stopQ=true;}
toString(){var s=''
var now=performance.now();var elapsed=now-this.stt;var secs=Math.round(elapsed/1000)
var mins=parseInt(secs/60)
secs-=mins*60
if(mins>0)s+=mins+'m '
if(secs>0)s+=secs+'s'
return s}
draw(){if(this.stopQ)
return;var now=performance.now();var elapsed=now-this.stt;var ratio=Math.min(1,elapsed/this.secs/1000);var g=this.g;g.beginPath();g.fillStyle="#def";g.arc(this.x,this.y,this.rad,0,2*Math.PI);g.fill();g.beginPath();g.moveTo(this.x,this.y);g.fillStyle=this.clr;g.arc(this.x,this.y,this.rad,-Math.PI/2,ratio*2*Math.PI-Math.PI/2);g.fill();if(ratio<1){requestAnimationFrame(this.draw.bind(this));}else{this.funcEnd();}}}
class Pop{constructor(id,yesStr='',yesFunc=null,noStr='',noFunc=null){this.id=id;this.div=document.getElementById(this.id);this.div.style="position:absolute; left:-450px; top:20px; width:auto; padding: 5px; border-radius: 9px; background-color: rgba(125,190,256,0.9); box-shadow: 8px 8px 5px 0px rgba(40,40,40,0.5); transition: all linear 0.3s; opacity:0; text-align: center; ";this.bodyDiv=document.createElement("div");this.div.appendChild(this.bodyDiv);var yesBtn=document.createElement("button");this.div.appendChild(yesBtn);if(yesStr.length<1){yesStr="&#x2714;";yesBtn.style='font: 22px Arial;';}
yesBtn.innerHTML=yesStr;yesBtn.classList.add('btn');yesBtn.onclick=this.yes.bind(this);var noBtn=document.createElement("button");this.div.appendChild(noBtn);if(noStr.length<1){noStr="&#x2718;";noBtn.style='font: 22px Arial;';}
noBtn.innerHTML=noStr;noBtn.classList.add('btn');noBtn.onclick=this.no.bind(this);this.yesFunc=yesFunc;this.noFunc=noFunc;return this;}
open(){var div=this.div;div.style.transitionDuration="0.3s";div.style.opacity=1;div.style.zIndex=12;div.style.left=10+'px';}
yes(me){console.log("me",me);var div=document.getElementById(this.id);div.style.opacity=0;div.style.zIndex=1;div.style.left='-999px';if(typeof this.yesFunc==="function"){this.yesFunc();}}
no(){console.log("Pop no");var div=this.div;div.style.opacity=0;div.style.zIndex=1;div.style.left='-999px';if(typeof this.noFunc==="function"){this.noFunc();}}
bodySet(s){this.bodyDiv.innerHTML=s;return s;}}
function radioHTML(prompt,id,lbls){var s='';s+='<div style="display:inline-block; border: 1px solid white; border-radius:5px; padding:3px; margin:3px; background-color:rgba(255,255,255,0.5);">';s+=prompt;for(var i=0;i<lbls.length;i++){var lbl=lbls[i];var idi=id+i;var chkStr=(i==0)?' checked ':'';s+='<input id="'+idi+'" type="radio" name="'+id+'" value="'+lbl+'" autocomplete="off" '+chkStr+' >';s+='<label for="'+idi+'">'+lbl.name+' </label>';}
s+='</div>';return s;}
function radioGetIndex(id,lbls){for(var i=0;i<lbls.length;i++){var div=document.getElementById(id+i)
if(div.checked)return i}
return-1}