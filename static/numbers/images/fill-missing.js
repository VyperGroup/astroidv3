let w,h,my={};function init(){let version='0.89';my.optQ=true;my.mode='1-100';let m=getQueryVariable('g');if(m){my.mode=m;my.optQ=false;}
console.log("my",my);w=500;h=360;my.cellWd=46;my.cellHt=26;my.noClr='#f8f8f8';my.yesClr='#dfd';my.anims=[];loadGames();my.colMax=10;let optStr=''
if(my.optQ){optStr+=wrap({id:"rangeType",tag:'sel',opts:my.games,fn:'rangeChg()',style:"font: 0.9rem Verdana;margin: 0 auto 12px auto;",lbl:'Type:'})}
let s=wrap({cls:'js',style:'width:'+w+'px; min-height:'+h+'px; background-color: var(--b1Clr); padding:10px;'},getArrowBox(),optStr,wrap({id:"grid",style:"font: 17px Verdana;"},getGrid(my.mode)),wrap({id:"success",cls:"pop",pos:'abs',style:"font: 40px Verdana; color:blue; left: -500px; top: 120px; width: 300px; margin: auto; opacity: 0;  "},'Well Done!<br>','<button class="btn" onclick="restart()">Again</button>'),wrap({id:"ansBox",cls:'arrowBox',pos:'abs',style:"left: 50px; top: 60px; visibility: hidden; "}),wrap({cls:'copyrt',pos:'abs',style:'left:5px; bottom:3px'},` &copy; 2021 MathsIsFun.com v${version}`))
docInsert(s);my.animNo=0;my.loopNo=0;}
function restart(){let div=document.getElementById('grid');div.innerHTML=getGrid(my.mode);div=document.getElementById('success')
div.style.opacity=0;div.style.left='-600px';my.animNo=999;my.loopNo=999;}
function rangeChg(){document.getElementById('ansBox').style.visibility='hidden';let div=document.getElementById('rangeType');let s=div.options[div.selectedIndex].value;my.mode=s.toLowerCase();console.log("my.mode",my.mode);document.getElementById('grid').innerHTML=getGrid(my.mode);}
function sttAnim(){my.animNo=0;my.loopNo=0;doAnim();}
function doAnim(){let div=document.getElementById(my.anims[my.animNo]);div.style.backgroundColor=getRandomClr();my.animNo++;if(my.animNo>=my.anims.length){my.animNo=0;my.loopNo++;}
if(my.loopNo<3)
requestAnimationFrame(doAnim);}
function getAns(row,col){let x=0;if(my.game.typ=="units"){x=row*my.game.cols+col+1;}else{x=my.game.stt+(row*my.game.cols+col)*my.game.skip}
return(x);}
function getGrid(name){let s='';let game=null
for(let i=0;i<my.games.length;i++){game=my.games[i];if(game.name==name)break;}
console.log("getGrid",game);my.game=game
my.anims=[];let prob=0;let qN=0;let n=0;for(let i=0;i<my.game.rows;i++){s+='<div style="">';for(let j=0;j<my.game.cols;j++){let id=i+'-'+j;let clr=my.yesClr;let ans=0;if(my.game.typ=="units"){ans=i*my.game.cols+j+1;}else{ans=my.game.stt+(i*my.game.cols+j)*my.game.skip}
let v=ans;if(Math.random()<prob){v='&nbsp;';clr=my.noClr;qN++;}
s+='<div id="'+id+'" ans="'+ans+'" style="display: inline-block; width:'+(my.cellWd-2)+'px; height:'+(my.cellHt-2)+'px; text-align: center; background-color: '+clr+'; border: 1px solid white; cursor:pointer;" onmousedown="showOpts(this)">';s+=v;s+='</div>';my.anims.push(id);n++;let pct=qN/n;let overachievefactor=2;let density=my.game.density
if(pct<density){prob=density+overachievefactor*((density-pct)/(density-0))*(1-density)}else{prob=density+overachievefactor*((density-pct)/(1-density))*(density-0)}}
s+='</div>';}
return s;}
function checkSuccess(){let okQ=true;for(let i=0;i<my.game.rows;i++){for(let j=0;j<my.game.cols;j++){let id=i+'-'+j;let div=document.getElementById(id);let user=div.innerHTML<<0;let ans=div.getAttribute('ans')<<0;if(user!=ans){okQ=false;break;}}
if(!okQ)break;}
return okQ;}
function showOpts(me){let ids=me.id.split('-');let row=ids[0]<<0;let col=ids[1]<<0;let ans=me.getAttribute('ans')<<0;let div=document.getElementById('ansBox');div.style.left=(col*my.cellWd-my.cellWd/2)+'px';div.style.top=(row*my.cellHt+my.cellHt*2)+'px';div.style.visibility='visible';let s='';let anss=getChoices(ans<<0);let n=0;for(let i=0;i<2;i++){s+='<div style="font: 18px Verdana;">';for(let j=0;j<2;j++){let id=me.id+'-'+anss[n];s+='<div id="'+id+'" style="display: inline-block; width:50px; height:25px; text-align: center;  border: 1px solid white; cursor:pointer;" onmousedown="doAns(this)">';s+=anss[n];s+='</div>';n++;}
s+='</div>';}
div.innerHTML=s;}
function doAns(me){let ids=me.id.split('-');let a=ids.pop();let div=document.getElementById(ids.join('-'));div.innerHTML=a;document.getElementById('ansBox').style.visibility='hidden';let ans=div.getAttribute('ans')<<0;let clr=my.yesClr;if(a!=ans){clr=my.noClr;}
div.style.backgroundColor=clr;if(checkSuccess()){div=document.getElementById('success');div.style.opacity=1;div.style.left=(w-320)/2+'px';sttAnim();}}
function loadGames(){my.games=[{name:"1-100",descr:"1 to 100",typ:"list",rows:10,cols:10,stt:1,skip:1,yGap:0,density:0.2},{name:"0-99",descr:"0 to 99",typ:"list",rows:10,cols:10,stt:0,skip:1,yGap:0,density:0.2},{name:"evens",descr:"Even Numbers List",typ:"list",rows:3,cols:10,stt:2,skip:2,yGap:20,density:0.7},{name:"odds",descr:"Odd Numbers list",typ:"list",rows:3,cols:10,stt:1,skip:2,yGap:20,density:0.7},{name:"2s20",descr:"Skip Count by 2s to 20",typ:"list",rows:1,cols:10,stt:2,skip:2,yGap:20,density:0.5},{name:"2s100",descr:"Skip Count by 2 to 100",typ:"list",rows:5,cols:10,stt:2,skip:2,yGap:20,density:0.4},{name:"3s36",descr:"Skip Count by 3 to 36",typ:"list",rows:1,cols:12,stt:3,skip:3,yGap:20,density:0.6},{name:"3s90",descr:"Skip Count by 3 to 90",typ:"list",rows:3,cols:10,stt:3,skip:3,yGap:20,density:0.4},{name:"4s120",descr:"Skip Count by 4 to 120",typ:"list",rows:3,cols:10,stt:4,skip:4,yGap:20,density:0.4},{name:"4s48",descr:"Skip Count by 4 to 48",typ:"list",rows:1,cols:12,stt:4,skip:4,yGap:20,density:0.6},{name:"5s",descr:"Skip Count by 5 to 100",typ:"list",rows:2,cols:10,stt:5,skip:5,yGap:20,density:0.7},{name:"5s50",descr:"Skip Count by 5 to 50",typ:"list",rows:1,cols:10,stt:5,skip:5,yGap:20,density:0.6},{name:"5s100",descr:"Skip Count by 5 to 100",typ:"list",rows:2,cols:10,stt:5,skip:5,yGap:20,density:0.5},{name:"5s200",descr:"Skip Count by 5 to 200",typ:"list",rows:4,cols:10,stt:5,skip:5,yGap:20,density:0.4},{name:"10s",descr:"Skip Count by 10 to 200",typ:"list",rows:2,cols:10,stt:10,skip:10,yGap:20,density:0.7},{name:"10s100",descr:"Skip Count by 10 to 100",typ:"list",rows:1,cols:10,stt:10,skip:10,yGap:20,density:0.7},{name:"10s300",descr:"Skip Count by 10 to 300",typ:"list",rows:3,cols:10,stt:10,skip:10,yGap:20,density:0.5},{name:"25s1k",descr:"Skip Count by 25",typ:"list",rows:4,cols:10,stt:25,skip:25,yGap:20,density:0.5},{name:"50s1k",descr:"Skip Count by 50",typ:"list",rows:2,cols:10,stt:50,skip:50,yGap:20,density:0.6},{name:"100s1k",descr:"Skip Count by 100",typ:"list",rows:2,cols:10,stt:100,skip:100,yGap:20,density:0.75},{name:"20m1",descr:"Backwards from 20 to 1",typ:"list",rows:2,cols:10,stt:20,skip:-1,yGap:20,density:0.5},{name:"100m1",descr:"Backwards from 100 to 1",typ:"list",rows:10,cols:10,stt:100,skip:-1,yGap:0,density:0.2},{name:"100m2",descr:"Backwards from 100 by 2s",typ:"list",rows:5,cols:10,stt:100,skip:-2,yGap:20,density:0.5},{name:"100m5",descr:"Backwards from 100 by 5s",typ:"list",rows:2,cols:10,stt:100,skip:-5,yGap:20,density:0.7},{name:"100m10",descr:"Backwards from 100 by 10s",typ:"list",rows:1,cols:10,stt:100,skip:-10,yGap:20,density:0.7},{name:"even-units",descr:"Even Numbers",typ:"list",rows:5,cols:10,stt:0,skip:2,yGap:20,density:0.6},{name:"odd-units",descr:"Odd Numbers",typ:"list",rows:5,cols:10,stt:1,skip:2,yGap:10,density:0.8}];}
function getArrowBox(){let s='';s+='<style type="text/css">';s+='.arrowBox {position: relative; border: 1px solid black; background: #def; }';s+='.arrowBox:after, .arrowBox:before {content: " "; pointer-events: none; position: absolute; left: 50%; bottom: 100%; width: 0; height: 0; border: solid transparent; }';s+='.arrowBox:after {border-color: rgba(221, 238, 255, 0); border-bottom-color: #def; border-width: 30px; margin-left: -30px; }';s+='.arrowBox:before {border-color: rgba(0, 0, 0, 0); border-bottom-color: black; border-width: 31px; margin-left: -31px; }';s+='</style>';return s;}
function getChoices(ans){let wrongcount=9;let wrong=[];wrong[0]=ans+Math.round(Math.random()*(9-2)+2);wrong[1]=ans-Math.round(Math.random()*(9-2)+2);wrong[2]=ans+1;wrong[3]=ans-1;wrong[4]=ans+10;wrong[5]=ans-10;wrong[6]=ans+20;wrong[7]=ans+2;wrong[8]=ans+3;let anscount=4;let answers=[];for(let j=0;j<anscount;j++){let wrongno=0
do{wrongno=Math.floor(Math.random()*(wrongcount-1));}while(wrong[wrongno]=="(done)"||wrong[wrongno]<=0);answers.push(wrong[wrongno]);wrong[wrongno]="(done)"}
let anspos=getRandomInt(0,anscount-1);answers[anspos]=ans;return(answers);}
function getDropdownHTML(opts,funcName,id){let s='';s+='<select id="'+id+'" style="font: 13px Arial; color: #6600cc; background: rgba(200,220,256,0.7); padding: 1px; border-radius: 6px;" onchange="'+funcName+'()" autocomplete="off">';for(let i=0;i<opts.length;i++){let opt=opts[i];let idStr=id+i;let chkStr=i==0?'selected':'';s+='<option id="'+idStr+'" value="'+opt.name+'" style="height:18px;" '+chkStr+' >'+opt.descr+'</option>';}
s+='</select>';return s;}
function getRandomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function getRandomClr(){let ltrs="56789ABCDEF".split('');let clr="#";for(let i=0;i<6;i++){clr+=ltrs[Math.round(Math.random()*(ltrs.length-1))];}
return clr;}
function getQueryVariable(variable){let query=window.location.search.substring(1);let vars=query.split("&");for(let i=0;i<vars.length;i++){let pair=vars[i].split("=");if(pair[0]==variable){return pair[1];}}
return false;}
function docInsert(s){let div=document.createElement('div')
div.innerHTML=s
let script=document.currentScript
script.parentElement.insertBefore(div,script);}
function wrap({id='',cls='',pos='rel',style='',txt='',tag='div',lbl='',fn='',opts=[]},...mores){let s=''
s+='\n'
txt+=mores.join('')
switch(tag){case 'btn':if(cls.length==0)cls='btn'
s+='<button onclick="'+fn+'"'
break
case 'can':s+='<canvas'
break
case 'div':s+='<div'
break
case 'inp':if(cls.length==0)cls='input'
if(lbl.length>0)s+='<label class="label">'+lbl
s+='<input value="'+txt+'"'
if(fn.length>0)s+='  oninput="'+fn+'" onchange="'+fn+'"'
break
case 'rad':if(cls.length==0)cls="radio"
s+='<form';if(fn.length>0)s+=' onclick="'+fn+'"'
break
case 'sel':if(cls.length==0)cls="select"
if(lbl.length>0)s+='<label class="label">'+lbl+' '
s+='<select onchange="'+fn+'"'
break
case 'sld':s+='<input type="range" '+txt+' oninput="'+fn+'" onchange="'+fn+'"'
break
default:}
if(id.length>0)s+=' id="'+id+'"'
if(cls.length>0)s+=' class="'+cls+'"'
if(pos=='dib')s+=' style="position:relative; display:inline-block;'+style+'"'
if(pos=='rel')s+=' style="position:relative; '+style+'"'
if(pos=='abs')s+=' style="position:absolute; '+style+'"'
switch(tag){case 'btn':s+='>'+txt+'</button>'
break
case 'can':s+='></canvas>'
break
case 'div':s+=' >'+txt+'</div>'
break
case 'inp':s+='>'
if(lbl.length>0)s+='</label>'
break
case 'rad':s+='>\n'
for(let i=0;i<opts.length;i++){let chk='';if(i==0)chk='checked';s+='<input type="radio" id="r'+i+'" name="typ" style="cursor:pointer;" value="'+opts[i][0]+'" '+chk+' />\n';s+='<label for="r'+i+'" style="cursor:pointer;">'+opts[i][1]+'</label><br/>\n';}
s+='</form>';break
case 'sel':s+='>\n'
for(let i=0;i<opts.length;i++){let opt=opts[i];let idStr=id+i;let chkStr=i==99?' checked ':'';s+='<option id="'+idStr+'" value="'+opt.name+'"'+chkStr+'>'+opt.descr+'</option>\n';}
s+='</select>';if(lbl.length>0)s+='</label>'
break
case 'sld':s+='>'
break
default:}
s+='\n'
return s}
init()