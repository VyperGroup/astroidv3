var w,h,my={};function roundtypesMain(){var version='0.51';w=Math.min(window.innerWidth-20,500)
h=350;my.roundTypes=[{id:"5up",name:"Round Half Up"},{id:"5down",name:"Round Half Down"},{id:"5away0",name:"Round Half Away From 0"},{id:"5to0",name:"Round Half Towards 0"},{id:"5even",name:"Round Half Even"},{id:"5odd",name:"Round Half Odd"},{id:"floor",name:"Floor"},{id:"ceiling",name:"Ceiling"}];var s='';s+='<style>'
s+='.btn { display: inline-block; position: relative; text-align: center; margin: 2px; text-decoration: none; font: 15px/25px Arial, sans-serif; color: #268; border: 1px solid #88aaff; border-radius: 10px;cursor: pointer; background: linear-gradient(to top right, rgba(170,190,255,1) 0%, rgba(255,255,255,1) 100%); outline-style:none;}'
s+='.btn:hover { background: linear-gradient(to top, rgba(255,255,0,1) 0%, rgba(255,255,255,1) 100%); }'
s+='.yy { border: solid 2px #eeeeaa; background: linear-gradient(to top, rgba(255,220,130,1) 0%, rgba(255,255,255,1) 100%);  }'
s+='.hi { border: solid 2px #eeeeaa; background: linear-gradient(to top, rgba(130,220,255,1) 0%, rgba(255,255,255,1) 100%); box-shadow: 2px 2px 6px #66a; }'
s+='.lo { border: solid 1px #888888; background: linear-gradient(to top, rgba(170,170,170,1) 0%, rgba(205,205,205,1) 100%);  }'
s+='</style>'
s+=`<div id="main" style="position:relative; max-width:${w}px; min-height:${h}px; 
  background: linear-gradient(to right, rgba(156,175,241,0.5) 0%, rgba(156,175,251,0.5) 30%, rgba(255,255,255,0.5) 50%, rgba(156,175,241,0.5) 70%, rgba(156,175,241,0.5) 100%); 
  margin:auto; display:block; border: 1px solid lightblue; 
  border-radius: 10px; text-align:center; ">`
s+=`<div style="font: 17px Arial; margin:0; ">`
s+='<div style="display:inline-block; width: 48%; vertical-align:top;">';s+='<div style="font: bold 20px Arial; color: #00f; margin:0; ">Raw Data</div>'
s+='<textarea id="rawnums" style="width:90%; height: 210px; text-align: center; border-radius: 10px; font: 17px Arial; color: #00f; background-color: #efe; " value="" onKeyUp="go()"></textarea>';s+='<textarea id="rawstats" style="width:90%; height: 20px; text-align: center; border-radius: 10px; font: 15px Arial; color: #00f; background-color: #cdf; border: 1px solid white; " value="" onKeyUp="go()"></textarea>';s+='<div style="height:65px;">';s+=inputFmt('From',"rawfrom",0)
s+=inputFmt('To',"rawto",10)
s+=inputFmt('Count',"rawmax",5)
s+='<button type="button"  class="btn" onclick=" genGo()">Generate</button>'
s+='</div>';s+='</div>';s+='<div style="display:inline-block; width: 48%;  vertical-align:top;">';s+='<div style="font: bold 20px Arial; color:orange;  ">Rounded</div>'
s+=`<button id="detailBtn" style="color: #000aae; width:30px; font: italic 16px Times New Roman; position:absolute; right:20px;"
   class="btn"  onclick="detailToggle()" >i</button>`
s+='<textarea id="roundnums" style="width:90%; height: 210px; text-align: center; border-radius: 10px; font: 17px Arial; color: orange; background-color: #efe;  " value="" onKeyUp="go()"></textarea>';s+='<textarea id="roundstats" style="width:90%; height: 20px; text-align: center; border-radius: 10px; font: 15px Arial; color: orange; background-color: #cdf; border: 1px solid white; " value="" onKeyUp="go()"></textarea>';s+='<div style="height:65px;">';s+=getDropdownHTML(my.roundTypes,'go(-1)','type');s+='<div style="display:inline-block;  font-size: 16px; margin: 0 6px 0 10px; text-align:right;">Decimals:</div>';s+='<input type="text" id="dec" style="color: #0000ff; background-color: #eeffee; text-align:center; font-size: 17px; width:50px; border-radius: 10px; " value="0" onKeyUp="go()" />';s+='<button id="dnBtn" style="color: #000aae;  font-size: 12px; " class="btn"  onclick="decDn()" >&#x25BC;</button>';s+='<button id="upBtn" style="color: #000aae;  font-size: 12px; " class="btn"  onclick="decUp()" >&#x25B2;</button>';s+='<div id="decDescr" style=" font-size: 16px; margin: 0 6px 0 10px;">&nbsp;</div>';s+='</div>';s+='</div>';s+='</div>';s+='<div style="font: 10px Arial; color: #6600cc; text-align:left; margin-left:5px; ">&copy; 2019 MathsIsFun.com  v'+version+'&nbsp; &nbsp;</div>';s+='</div>';document.write(s);var rawStr=''
rawStr="3.5\r2.5\r1.5\r0.5\r-0.5\r-1.5\r-2.5\r-3.5";my.detailQ=true
detailToggle()
document.getElementById('rawnums').value=rawStr
go()}
function genGo(){generate()
go()}
function inputFmt(name,id,val){var s=''
s+='<div style="display:inline-block; font: 16px Arial; margin: 0 6px 0 10px; text-align:right;">'+name+':</div>';s+=`<input type="text" id="${id}" style="font-size: 17px;  margin: 2px 0 0 0;  width:60px; 
  background-color: #f0f8ff; text-align:center; border-radius: 10px; border: 1px solid blue;" 
  value="${val}" />`
return s}
function go(){var div=document.getElementById('type');my.type=my.roundTypes[div.selectedIndex].id
console.log("type",my.type);let dec=parseInt(document.getElementById("dec").value)
let rawStr=document.getElementById('rawnums').value
let raws=parse(rawStr)
if(my.detailQ){if(raws.length>0){let raw=raws[0]
let num=new Num(raw)
let s=''
s+=raw+' rounds:'+'\n'
my.roundTypes.map(type=>{s+='\n'+type.name.replace('Round ','')+': '+num.round(dec,type.id)})
document.getElementById('roundnums').value=s
document.getElementById('roundstats').value=''}}else{let rounds=raws.map(raw=>{var num=new Num(raw)
return num.round(dec,my.type)});document.getElementById('roundnums').value=rounds.join('\n')
document.getElementById('rawstats').value=getStats(raws)
document.getElementById('roundstats').value=getStats(rounds)}}
function getDec(){var dec=document.getElementById("dec").value;dec=dec.replace(/,/gm,"");return parseInt(dec);}
function decDn(){var dec=getDec();if(dec>-10){dec--;document.getElementById("dec").value=dec;document.getElementById("decDescr").innerHTML=decDescr(dec)
go();}}
function decUp(){var dec=getDec();if(dec<10){dec++;document.getElementById("dec").value=dec;document.getElementById("decDescr").innerHTML=decDescr(dec)
go();}}
function decDescr(dec){let descrs=['thousands','hundreds','tens','ones','tenths','hundredths','thousandths']
let s=''
if(dec>=-3&&dec<=3)s=descrs[dec+3]
return s}
function detailToggle(){console.log('detailToggle',my.detailQ)
var btn='detailBtn'
if(my.detailQ){my.detailQ=false;document.getElementById(btn).classList.add("lo");document.getElementById(btn).classList.remove("hi");}else{my.detailQ=true;document.getElementById(btn).classList.add("hi");document.getElementById(btn).classList.remove("lo");}
go()}
function generate(){var fromVal=Number(document.getElementById('rawfrom').value);var toVal=Number(document.getElementById('rawto').value);var n=Number(document.getElementById('rawmax').value);console.log("generate="+fromVal,toVal,n);var s="";for(var i=0;i<n;i++){var rand=fromVal+Math.random()*(toVal-fromVal);var randStr=rand.toPrecision(10);if(i>0)s+="\n";s+=randStr;}
var div=document.getElementById('rawnums')
div.value=s}
function parse(s){s=s.trim();s=s.replace(/({|})/gi,"");s=s.replace(/\s*\,\s*/g,",");s=s.replace(/\s+/g,",");while(s[s.length-1]==','||s[s.length-1]==' ')s=s.slice(0,-1);if(s.length==0)return[]
var vals=s.split(",");return vals}
function getStats(nums){var sum=new Num("0");for(var i=0;i<nums.length;i++){sum=sum.add(new Num(nums[i]));}
return "sum = "+sum.fmt()}
function getDropdownHTML(opts,funcName,id){var s='';s+='<select id="'+id+'" onclick="'+funcName+'" style="font: 16px Arial; color: #6600cc; background: rgba(200,220,256,0.7); padding: 2px;line-height:30px; border-radius:10px; outline-style:none;">';for(var i=0;i<opts.length;i++){var opt=opts[i]
var idStr=id+i;var chkStr=i==99?'checked':'';s+='<option id="'+idStr+'" value="'+opt.id+'" style="height:21px;" '+chkStr+' >'+opt.name+'</option>';}
s+='</select>';return s;}
function Num(s,base){s=typeof s!=='undefined'?s:'';base=typeof base!=='undefined'?base:10;this.sign=1;this.digits="";this.dec=0;this.MAXDEC=20;this.baseDigits="0123456789ABCDEFGHJKLMNP";this.setNum(s,base);}
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
return s;};Num.prototype.abs=function(){var ansNum=this.clone();ansNum.sign=1;return ansNum;};Num.prototype.mult10=function(n){var xNew=this.clone();xNew.dec=xNew.dec-n;if(xNew.dec<0){xNew.digits=xNew.digits+"0".repeat(-xNew.dec);xNew.dec=0;}
return xNew;};Num.prototype.clone=function(){var ansNum=new Num();ansNum.digits=this.digits;ansNum.dec=this.dec;ansNum.sign=this.sign;return ansNum;};Num.prototype.fullMultiply=function(x,y){return this.multNums(new Num(x),new Num(y)).fmt();};Num.prototype.multNums=function(xNum,yNum){var N1=xNum.digits;var N2=yNum.digits;var ans="0";for(var i=N1.length-1;i>=0;i--){ans=this.fullAdd(ans,(this.fullMultiply1(N2,N1.charAt(i))+"0".repeat(N1.length-i-1)));}
var ansNum=new Num(ans);ansNum.dec=xNum.dec+yNum.dec;ansNum.sign=xNum.sign*yNum.sign;return ansNum;};Num.prototype.fullMultiply1=function(x,y1){var carry="0";var ans="";for(var i=x.length-1;i>(-1);i--){var product=((x.charAt(i))>>0)*(y1>>0)+(carry>>0);var prodStr=product.toString();if(product<10){prodStr="0"+prodStr;}
carry=prodStr.charAt(0);ans=prodStr.charAt(1)+ans;}
if(carry!="0"){ans=carry+ans;}
return ans;};Num.prototype.fullAdd=function(x,y){return this.addNums(new Num(x),new Num(y)).fmt();};Num.prototype.addNums=function(xNum,yNum){var ansNum=new Num();if(xNum.sign*yNum.sign==-1){ansNum=this.subNums(xNum.abs(),yNum.abs());if(xNum.sign==-1){ansNum.sign*=-1;}
return ansNum;}
var maxdec=Math.max(xNum.dec,yNum.dec);var xdig=xNum.digits+"0".repeat(maxdec-xNum.dec);var ydig=yNum.digits+"0".repeat(maxdec-yNum.dec);var maxlen=Math.max(xdig.length,ydig.length);xdig="0".repeat(maxlen-xdig.length)+xdig;ydig="0".repeat(maxlen-ydig.length)+ydig;var ans="";var carry=0;for(var i=xdig.length-1;i>=0;i--){var temp=((xdig.charAt(i))>>0)+((ydig.charAt(i))>>0)+carry;if((temp>=0)&&(temp<20)){if(temp>9){carry=1;ans=temp-10+ans;}else{carry=0;ans=temp+ans;}}}
if(carry==1){ans="1"+ans;}
ansNum.setNum(ans);ansNum.sign=xNum.sign;ansNum.dec=maxdec;return ansNum;};Num.prototype.fullPower=function(x,n){return this.expNums(new Num(x),n).fmt();};Num.prototype.expNums=function(xNum,nInt){var n=nInt;var b2pow=0;while((n&1)==0){b2pow++;n>>=1;}
var x=xNum.digits;var r=x;while((n>>=1)>0){x=this.fullMultiply(x,x);if((n&1)!=0){r=this.fullMultiply(r,x);}}
while(b2pow-->0){r=this.fullMultiply(r,r);}
var ansNum=new Num(r);ansNum.dec=xNum.dec*nInt;return ansNum;};Num.prototype.div=function(num,decimals){return this.divNums(this,num,decimals);};Num.prototype.fullDivide=function(x,y,decimals){return this.divNums(new Num(x),new Num(y),decimals).fmt();};Num.prototype.divNums=function(xNum,yNum,decimals){decimals=typeof decimals!=='undefined'?decimals:this.MAXDEC;if(xNum.digits.length==0){return new Num("0");}
if(yNum.digits.length==0){return new Num("0");}
var xDec=xNum.mult10(decimals);var maxdec=Math.max(xDec.dec,yNum.dec);var xdig=xDec.digits+"0".repeat(maxdec-xDec.dec);var ydig=yNum.digits+"0".repeat(maxdec-yNum.dec);if(this.compareDigits(xdig,"0")==0){return new Num("0");}
if(this.compareDigits(ydig,"0")==0){return new Num("0");}
var timestable=new Array(10);for(var i=0;i<10;i++){timestable[i]=this.fullMultiply(ydig,i.toString());}
var ans="0";var xNew=xdig;while(this.compareDigits(xNew,ydig)>=0){var col=1;while(this.compareDigits(xNew.substring(0,col),ydig)<0){col++;}
var xCurr=xNew.substring(0,col);var mult=9;while(this.compareDigits(timestable[mult],xCurr)>0){mult--;}
var fullmult=mult+""+"0".repeat(xNew.length-xCurr.length);ans=this.fullAdd(ans,fullmult);xNew=this.fullSubtract(xNew,this.fullMultiply(ydig,fullmult));}
var ansNum=new Num(ans);ansNum.dec=decimals;ansNum.sign=xNum.sign*yNum.sign;return ansNum;};Num.prototype.add=function(num){return this.addNums(this,num);};Num.prototype.sub=function(num){return this.subNums(this,num);};Num.prototype.fullSubtract=function(x,y){return this.subNums(new Num(x),new Num(y)).fmt();};Num.prototype.subNums=function(xNum,yNum){var ansNum=new Num();if(xNum.sign*yNum.sign==-1){ansNum=xNum.abs().add(yNum.abs());if(xNum.sign==-1){ansNum.sign*=-1;}
return ansNum;}
var maxdec=Math.max(xNum.dec,yNum.dec);var xdig=xNum.digits+"0".repeat(maxdec-xNum.dec);var ydig=yNum.digits+"0".repeat(maxdec-yNum.dec);var maxlen=Math.max(xdig.length,ydig.length);xdig="0".repeat(maxlen-xdig.length)+xdig;ydig="0".repeat(maxlen-ydig.length)+ydig;var sign=this.compareDigits(xdig,ydig);if(sign==0){return new Num("0");}
if(sign==-1){var temp=xdig;xdig=ydig;ydig=temp;}
var ans="";var isborrow=0;for(var i=xdig.length-1;i>=0;i--){var xPiece=(xdig.charAt(i))>>0;var yPiece=(ydig.charAt(i))>>0;if(isborrow==1){isborrow=0;xPiece=xPiece-1;}
if(xPiece<0){xPiece=9;isborrow=1;}
if(xPiece<yPiece){xPiece=xPiece+10;isborrow=1;}
ans=(xPiece-yPiece)+ans;}
ansNum.setNum(ans);ansNum.sign=sign*xNum.sign;ansNum.dec=maxdec;return ansNum;};Num.prototype.round=function(roundDec=0,roundType="5up"){var dec=this.dec
var digits=this.digits
if(roundDec>dec){var extra=roundDec-dec;digits+="0".repeat(extra);dec+=extra}
var rtn=''
var keepDigits=''
var cutDigits=''
var cutRightN=dec-roundDec
var cutLeftN=digits.length-cutRightN
if(cutLeftN>=0){keepDigits=digits.substr(0,cutLeftN);cutDigits=digits.substr(cutLeftN);dec=dec-cutDigits.length}else{keepDigits='';cutDigits='0'.repeat(-cutLeftN)+digits;dec=dec-cutDigits.length}
if(roundDec<0){dec=roundDec}
var compareDigits=cutDigits.replace(/0+$/,'')
switch(roundType){case "5up":if(compareDigits>"5"||(compareDigits=="5"&&this.sign==1)){keepDigits=this.fullAdd(keepDigits,"1");}
break;case "5down":if(compareDigits>"5"||(compareDigits=="5"&&this.sign==-1)){keepDigits=this.fullAdd(keepDigits,"1");}
break;case "5away0":console.log('compareDigits',compareDigits)
if(compareDigits>="5"){keepDigits=this.fullAdd(keepDigits,"1");}
break;case "5to0":if(compareDigits>"5"){keepDigits=this.fullAdd(keepDigits,"1");}
break;case "5even":if(compareDigits>"5"){keepDigits=this.fullAdd(keepDigits,"1");}else{if(compareDigits=="5"){let lastDigit=keepDigits.length==0?'0':parseInt(keepDigits.charAt(keepDigits.length-1))
console.log('5even',lastDigit,lastDigit%2==0)
if(lastDigit%2!=0){keepDigits=this.fullAdd(keepDigits,"1");}}}
break;case "5odd":if(compareDigits>"5"){keepDigits=this.fullAdd(keepDigits,"1");}else{if(compareDigits=="5"){let lastDigit=keepDigits.length==0?'0':parseInt(keepDigits.charAt(keepDigits.length-1))
console.log('5odd',lastDigit,lastDigit%2==0)
if(lastDigit%2==0){keepDigits=this.fullAdd(keepDigits,"1");}}}
break;case "floor":if(this.sign==-1){if(compareDigits.length!=0)keepDigits=this.fullAdd(keepDigits,"1");}
break;case "ceiling":if(this.sign==1){console.log('ceiling',compareDigits,keepDigits,cutLeftN,dec)
if(compareDigits.length!=0)keepDigits=this.fullAdd(keepDigits,"1");}
break;default:}
rtn+=this.fmtDec(keepDigits,dec)
return rtn};Num.prototype.fmtDec=function(s,decpos){var relDec=s.length-decpos
if(relDec<0){s="0."+"0".repeat(-relDec)+s;}else if(relDec==0){s="0."+s;}else if(relDec>0){if(decpos>=0){s=s.substr(0,relDec)+"."+s.substr(relDec);}else{console.log("fmt=dec to right");s+="0".repeat(-decpos)+".";}}
s=s.replace(/^0{2,}/,'0')
s=s.replace(/0+$/,'')
if(s.charAt(s.length-1)=="."){s=s.substring(0,s.length-1);}
if(this.sign==-1){if(s!="0"){s="-"+s;}}
return s};Num.prototype.fmt=function(sigDigits=0,eStt=0,roundType="5up",sigOrDec="sig"){var decWas=this.dec;var digitsWas=this.digits;if(sigDigits>this.digits.length){this.dec+=sigDigits-this.digits.length;this.digits+="0".repeat(sigDigits-this.digits.length);}
var s=this.digits;var decpos=s.length-this.dec;var eVal=decpos-1;if(eStt>0&&Math.abs(eVal)>=eStt){var s1=s.substr(0,1)+"."+s.substr(1);s1=s1.replace(/0+$/,'');if(s1.charAt(s1.length-1)=="."){s1=s1.substr(0,s1.length-1);}
if(eVal>0){s=s1+"e+"+eVal;}else{s=s1+"e"+eVal;}}else{if(decpos<0){s="0."+"0".repeat(-decpos)+s;}else if(decpos==0){s="0."+s;}else if(decpos>0){if(this.dec>=0){s=s.substr(0,decpos)+"."+s.substr(decpos,this.dec);}else{s=s+"0".repeat(-this.dec)+".";}}
if(s.charAt(s.length-1)=="."){s=s.substring(0,s.length-1);}}
if(this.sign==-1){if(s!="0"){s="-"+s;}}
this.dec=decWas;this.digits=digitsWas;return s;};Num.prototype.compareDigits=function(x,y){if(x.length>y.length){return 1;}
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
return s.substr(decpos);};if(!String.prototype.repeat){console.log("String.prototype.repeat");String.prototype.repeat=function(count){'use strict';var str=''+this;count=+count;if(count!=count){count=0;}
count=Math.floor(count);if(str.length==0||count==0){return '';}
var rpt='';for(;;){if((count&1)==1){rpt+=str;}
count>>>=1;if(count==0){break;}
str+=str;}
return rpt;}}