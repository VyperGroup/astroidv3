var my={};my.optQ=true
var canvas
var ccanvas
var ctx
var img
var w=600
var h=400
var zoomStart=3.4;var zoom=[zoomStart,zoomStart];var lookAtDefault=[-0.6,0];var lookAt=lookAtDefault;var xRange=[0,0];var yRange=[0,0];var escapeRadius=10.0;var interiorColor=[0,0,0,255];var reInitCanvas=true;var dragToZoom=true;var colors=[[0,0,0,0]];var renderId=0;function mandelMain(){s=''
s+='<style type="text/css">'
s+='#bottom { color: #666; }'
s+='#bottom a { color: #666; }'
s+='#bottom a:hover { color: #FF3B03; }'
s+='#canvasMandelbrot { background-color: black; position: absolute; left: 0px; top: 0px; z-index: 0; padding: 0px; margin: 0px; }'
s+='#canvasControls { background-color: transparent; position: absolute; left: 0px; top: 0px; z-index: 5; padding: 0px; margin: 0px; }'
s+='#description { z-index: 10; position: absolute; background-color: rgba(30, 30, 30, 0.6); font-family: sans-serif; padding: 10px; margin: 20px; border: 2px solid rgba(20, 20, 20, 0.6); color: #FF3B03; text-shadow: 0px 1px 0px rgb(40, 40, 40); width: 300px; user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; }'
s+='#infoBox { z-index: 10; position: absolute; left: 5px; bottom: 5px; padding: 5px; background: transparent; color: rgba(51,51,51,0.9); text-shadow: none; font-family: sans-serif; font-size:8pt; }'
s+='#infoBox:hover { background-color: rgba(30, 30, 30, 0.3); color: #fff; border: #222 1px solid; }'
s+='#description table { color: #ccc; }'
s+='#description input { color: #ccc; outline: none; background-color: rgba(48,48,48,0.3); border-width: 1px; border-color: #444; }'
s+='#description select { border: #444 1px solid; color: #ccc; outline: none; background-color: #333; -webkit-appearance: none; font-size: 10pt; }'
s+='#autoIterations { border: #444 1px solid; color: #ccc; outline: none; background-color: #333; font-size: 10pt; }'
s+='#description .textInput { text-align: right; background-color: transparent; border: #444 1px solid; font-size: 10pt; }'
s+='</style>'
s+='<div style="position:relative; width:'+w+'px; height:'+h+'px; margin:auto; display:block; font:14px Arial; border-radius:10px; ">';s+='<div style="position:absolute; z-index:15;">';s+='<button style="font: 16px Arial; " class="togglebtn" onclick="optToggle()" >Options</button>';s+='<button style="font: 16px Arial; " class="togglebtn" onclick="reset()" >Reset</button>';s+='</div>';s+='<div id="description">'
s+='<form id="settingsForm" action="javascript:draw(getColorPicker(), getSamples());">'
s+='<table>'
s+='<tr> <td>Rendering time</td> <td> <span id="renderTime">0.0</span> seconds</td> </tr>'
s+='<tr> <td>Speed</td> <td> <span id="renderSpeed">0.00</span> pixels /  <span id="renderSpeedUnit">second</span> </td> </tr>'
s+='<tr> <td>Iterations</td> <td> <input class="textInput" size="4" type="text" id="steps" value="50" /> <input type="checkbox" id="autoIterations" checked /> <small>auto</small></td> </tr>'
s+='<tr> <td>Escape radius</td> <td> <input class="textInput" size="4" type="text" id="escapeRadius" value="10.0" /> </td> </tr>'
s+='<tr> <td>Color scheme</td> <td>'
s+='<select id="colorScheme">'
s+='<option value="pickColorHSV1">HSV #1</option>'
s+='<option value="pickColorHSV2">HSV #2 Red</option>'
s+='<option value="pickColorHSV3">HSV #3 Blue</option>'
s+='<option value="pickColorHSV4">HSV #4</option>'
s+='<option value="pickColorHSV5">HSV #5</option>'
s+='<option value="pickColorGrayscale">Grayscale #1</option>'
s+='<option value="pickColorGrayscale2">Grayscale #2</option>'
s+='</select>'
s+='</td> </tr>'
s+='<tr> <td>Supersamples</td> <td><input class="textInput" size="4" type="text" id="superSamples" value="1" /></td> </tr>'
s+='<tr> <td>Scanline update (ms)</td> <td><input class="textInput" size="4" type="text" id="updateTimeout" value="200" /></td> </tr>'
s+='<tr> <td colspan="2">&nbsp;</td> </tr>'
s+='<tr> <td colspan="2"><input type="submit" id="submitButton" value="Draw" /> &nbsp; <input type="reset" id="resetButton" value="Reset" /> &nbsp; <input type="button" id="viewPNG" value="View as PNG" /> </td> </tr>'
s+='</table>'
s+='</form>'
s+='</div>'
s+='<div id="canvasContainer">'
s+='<canvas id="canvasMandelbrot" width="0" height="0"> </canvas>'
s+='<canvas id="canvasControls" width="0" height="0"> </canvas>'
s+='</div>'
s+='<div id="infoBox"> <span id="infoText"></span> </div>'
s+='</div>'
document.write(s)
canvas=elem('canvasMandelbrot');canvas.width=w
canvas.height=h
ccanvas=elem('canvasControls');ccanvas.width=canvas.width
ccanvas.height=canvas.height
ctx=canvas.getContext('2d');img=ctx.createImageData(canvas.width,1);main()
optNo()}
function optToggle(){my.optQ=!my.optQ
if(my.optQ){optYes()}else{optNo()}}
function optYes(){my.optQ=true
elem('description').style.left='20px'}
function optNo(){my.optQ=false
elem('description').style.left='-1000px'}
function elem(id){return document.getElementById(id);}
function focusOnSubmit(){var e=elem('submitButton');if(e)e.focus();}
function getColorPicker(){var p=elem("colorScheme").value;if(p=="pickColorHSV1")return pickColorHSV1;if(p=="pickColorHSV2")return pickColorHSV2;if(p=="pickColorHSV3")return pickColorHSV3;if(p=="pickColorHSV4")return pickColorHSV4;if(p=="pickColorHSV5")return pickColorHSV5;if(p=="pickColorGrayscale2")return pickColorGrayscale2;return pickColorGrayscale;}
function getSamples(){var i=parseInt(elem('superSamples').value,10);return i<=0?1:i;}
function iterateEquation(Cr,Ci,escapeRadius,iterations){var Zr=0;var Zi=0;var Tr=0;var Ti=0;var n=0;for(;n<iterations&&(Tr+Ti)<=escapeRadius;++n){Zi=2*Zr*Zi+Ci;Zr=Tr-Ti+Cr;Tr=Zr*Zr;Ti=Zi*Zi;}
for(var e=0;e<4;++e){Zi=2*Zr*Zi+Ci;Zr=Tr-Ti+Cr;Tr=Zr*Zr;Ti=Zi*Zi;}
return[n,Tr,Ti];}
function updateInfoBox(){s=''
s+='Midpoint: ('+lookAt+')'
s+='<br>Zoom: '+5.1/zoom[0]
s+='<br>Area: '+(zoom[0]/5.1)*(zoom[1]/3.4)
elem('infoBox').innerHTML=s}
function updateHashTag(samples,iterations){var radius=elem('escapeRadius').value;var scheme=elem('colorScheme').value;location.hash='zoom='+zoom+'&'+
'lookAt='+lookAt+'&'+
'iterations='+iterations+'&'+
'superSamples='+samples+'&'+
'escapeRadius='+radius+'&'+
'colorScheme='+scheme;}
function readHashTag(){var redraw=false;var tags=location.hash.split('&');for(var i=0;i<tags.length;++i){var tag=tags[i].split('=');var key=tag[0];var val=tag[1];switch(key){case '#zoom':{var z=val.split(',');zoom=[parseFloat(z[0]),parseFloat(z[1])];redraw=true;}
break;case 'lookAt':{var l=val.split(',');lookAt=[parseFloat(l[0]),parseFloat(l[1])];redraw=true;}
break;case 'iterations':{elem('steps').value=String(parseInt(val,10));elem('autoIterations').checked=false;redraw=true;}
break;case 'escapeRadius':{escapeRadius=parseFloat(val);elem('escapeRadius').value=String(escapeRadius);redraw=true;}
break;case 'superSamples':{elem('superSamples').value=String(parseInt(val,10));redraw=true;}
break;case 'colorScheme':{elem('colorScheme').value=String(val);redraw=true;}
break;}}
if(redraw)
reInitCanvas=true;return redraw;}
function metric_units(number){var unit=["","k","M","G","T","P","E"];var mag=Math.ceil((1+Math.log(number)/Math.log(10))/3);return ""+(number/Math.pow(10,3*(mag-1))).toFixed(2)+unit[mag];}
function hsv2rgb(h,s,v){if(v>1.0)v=1.0;var hp=h/60.0;var c=v*s;var x=c*(1-Math.abs((hp%2)-1));var rgb=[0,0,0];if(0<=hp&&hp<1)rgb=[c,x,0];if(1<=hp&&hp<2)rgb=[x,c,0];if(2<=hp&&hp<3)rgb=[0,c,x];if(3<=hp&&hp<4)rgb=[0,x,c];if(4<=hp&&hp<5)rgb=[x,0,c];if(5<=hp&&hp<6)rgb=[c,0,x];var m=v-c;rgb[0]+=m;rgb[1]+=m;rgb[2]+=m;rgb[0]*=255;rgb[1]*=255;rgb[2]*=255;return rgb;}
function adjustAspectRatio(xRange,yRange,canvas){var ratio=Math.abs(xRange[1]-xRange[0])/Math.abs(yRange[1]-yRange[0]);var sratio=canvas.width/canvas.height;if(sratio>ratio){var xf=sratio/ratio;xRange[0]*=xf;xRange[1]*=xf;zoom[0]*=xf;}else{var yf=ratio/sratio;yRange[0]*=yf;yRange[1]*=yf;zoom[1]*=yf;}}
function addRGB(v,w){v[0]+=w[0];v[1]+=w[1];v[2]+=w[2];v[3]+=w[3];return v;}
function divRGB(v,div){v[0]/=div;v[1]/=div;v[2]/=div;v[3]/=div;return v;}
function draw(pickColor,superSamples){if(lookAt===null)lookAt=[-0.6,0];if(zoom===null)zoom=[zoomStart,zoomStart];xRange=[lookAt[0]-zoom[0]/2,lookAt[0]+zoom[0]/2];yRange=[lookAt[1]-zoom[1]/2,lookAt[1]+zoom[1]/2];optNo()
if(reInitCanvas){reInitCanvas=false;canvas=elem('canvasMandelbrot');ccanvas=elem('canvasControls');ctx=canvas.getContext('2d');img=ctx.createImageData(canvas.width,1);adjustAspectRatio(xRange,yRange,canvas);}
var steps=parseInt(elem('steps').value,10);if(elem('autoIterations').checked){var f=Math.sqrt(0.001+2.0*Math.min(Math.abs(xRange[0]-xRange[1]),Math.abs(yRange[0]-yRange[1])));steps=Math.floor(223.0/f);elem('steps').value=String(steps);}
var escapeRadius=Math.pow(parseFloat(elem('escapeRadius').value),2.0);var dx=(xRange[1]-xRange[0])/(0.5+(canvas.width-1));var dy=(yRange[1]-yRange[0])/(0.5+(canvas.height-1));var Ci_step=(yRange[1]-yRange[0])/(0.5+(canvas.height-1));updateInfoBox();renderId+=1;function drawLineSuperSampled(Ci,off,Cr_init,Cr_step){var Cr=Cr_init;for(var x=0;x<canvas.width;++x,Cr+=Cr_step){var color=[0,0,0,255];for(var s=0;s<superSamples;++s){var rx=Math.random()*Cr_step;var ry=Math.random()*Ci_step;var p=iterateEquation(Cr-rx/2,Ci-ry/2,escapeRadius,steps);color=addRGB(color,pickColor(steps,p[0],p[1],p[2]));}
color=divRGB(color,superSamples);img.data[off++]=color[0];img.data[off++]=color[1];img.data[off++]=color[2];img.data[off++]=255;}}
function drawLine(Ci,off,Cr_init,Cr_step){var Cr=Cr_init;for(var x=0;x<canvas.width;++x,Cr+=Cr_step){var p=iterateEquation(Cr,Ci,escapeRadius,steps);var color=pickColor(steps,p[0],p[1],p[2]);img.data[off++]=color[0];img.data[off++]=color[1];img.data[off++]=color[2];img.data[off++]=255;}}
function drawSolidLine(y,color){var off=y*canvas.width;for(var x=0;x<canvas.width;++x){img.data[off++]=color[0];img.data[off++]=color[1];img.data[off++]=color[2];img.data[off++]=color[3];}}
function render(){var start=(new Date).getTime();var startHeight=canvas.height;var startWidth=canvas.width;var lastUpdate=start;var updateTimeout=parseFloat(elem('updateTimeout').value);var pixels=0;var Ci=yRange[0];var sy=0;var drawLineFunc=superSamples>1?drawLineSuperSampled:drawLine;var ourRenderId=renderId;var scanline=function(){if(renderId!=ourRenderId||startHeight!=canvas.height||startWidth!=canvas.width){return;}
drawLineFunc(Ci,0,xRange[0],dx);Ci+=Ci_step;pixels+=canvas.width;ctx.putImageData(img,0,sy);var now=(new Date).getTime();if(sy++<canvas.height){if((now-lastUpdate)>=updateTimeout){drawSolidLine(0,[255,59,3,255]);ctx.putImageData(img,0,sy);var elapsedMS=now-start;elem('renderTime').innerHTML=(elapsedMS/1000.0).toFixed(1);var speed=Math.floor(pixels/elapsedMS);if(metric_units(speed).substr(0,3)=="NaN"){speed=Math.floor(60.0*pixels/elapsedMS);elem('renderSpeedUnit').innerHTML='minute';}else
elem('renderSpeedUnit').innerHTML='second';elem('renderSpeed').innerHTML=metric_units(speed);lastUpdate=now;setTimeout(scanline,0);}else
scanline();}};scanline();}
render();}
var logBase=1.0/Math.log(2.0);var logHalfBase=Math.log(0.5)*logBase;function smoothColor(steps,n,Tr,Ti){return 5+n-logHalfBase-Math.log(Math.log(Tr+Ti))*logBase;}
function pickColorHSV1(steps,n,Tr,Ti){if(n==steps)return interiorColor;var v=smoothColor(steps,n,Tr,Ti);var c=hsv2rgb(360.0*v/steps,1.0,1.0);c.push(255);return c;}
function pickColorHSV2(steps,n,Tr,Ti){if(n==steps)return interiorColor;var v=smoothColor(steps,n,Tr,Ti);var c=hsv2rgb(360.0*v/steps,1.0,10.0*v/steps);c.push(255);return c;}
function pickColorHSV3(steps,n,Tr,Ti){if(n==steps)return interiorColor;var v=smoothColor(steps,n,Tr,Ti);var c=hsv2rgb(360.0*v/steps,1.0,10.0*v/steps);var t=c[0];c[0]=c[2];c[2]=t;c.push(255);return c;}
function pickColorHSV4(steps,n,Tr,Ti){if(n==steps)return interiorColor;var v=smoothColor(steps,n,Tr,Ti);var c=hsv2rgb(360.0*v/steps,1.0,10.0*v/steps);c[0]=255-c[0];c[1]=255-c[1];c[2]=255-c[2];c.push(255);return c;}
function pickColorHSV5(steps,n,Tr,Ti){if(n==steps)return interiorColor;var v=smoothColor(steps,n,Tr,Ti);var c=hsv2rgb(360.0*v/steps,1.0,10.0*v/steps);c[0]=wierd(c[0]);c[1]=wierd(c[1]);c[2]=wierd(c[2]);c.push(255);return c;}
function wierd(n){n=(n*n/255)<<0
return n}
function pickColorGrayscale(steps,n,Tr,Ti){if(n==steps)return interiorColor;var v=smoothColor(steps,n,Tr,Ti);v=Math.floor(512.0*v/steps);if(v>255)v=255;return[v,v,v,255];}
function pickColorGrayscale2(steps,n,Tr,Ti){if(n==steps){var c=255-Math.floor(255.0*Math.sqrt(Tr+Ti))%255;if(c<0)c=0;if(c>255)c=255;return[c,c,c,255];}
return pickColorGrayscale(steps,n,Tr,Ti);}
function reset(){zoom=[zoomStart,zoomStart];lookAt=lookAtDefault;reInitCanvas=true;draw(getColorPicker(),getSamples());}
function main(){elem('viewPNG').onclick=function(event){window.location=canvas.toDataURL('image/png');};elem('steps').onkeypress=function(event){elem('autoIterations').checked=false;}
elem('resetButton').onclick=function(even){reset()};if(dragToZoom==true){var box=null;elem('canvasControls').onmousedown=function(e){if(box==null){var bRect=ccanvas.getBoundingClientRect();mouseX=(e.clientX-bRect.left)
mouseY=(e.clientY-bRect.top)
box=[mouseX,mouseY,0,0];}}
elem('canvasControls').onmousemove=function(e){if(box!=null){var c=ccanvas.getContext('2d');c.lineWidth=1;c.clearRect(0,0,ccanvas.width,ccanvas.height);var bRect=ccanvas.getBoundingClientRect();mouseX=(e.clientX-bRect.left)
mouseY=(e.clientY-bRect.top)
box[2]=mouseX;box[3]=mouseY;c.strokeStyle='#FF3B03';c.lineWidth=2;c.strokeStyle='white';c.strokeRect(box[0],box[1],box[2]-box[0],box[3]-box[1]);c.lineWidth=1;c.strokeStyle='black';c.strokeRect(box[0],box[1],box[2]-box[0],box[3]-box[1]);}}
var zoomOut=function(e){var bRect=ccanvas.getBoundingClientRect();var x=(e.clientX-bRect.left)
var y=(e.clientY-bRect.top)
var dx=(xRange[1]-xRange[0])/(0.5+(canvas.width-1));var dy=(yRange[1]-yRange[0])/(0.5+(canvas.height-1));x=xRange[0]+x*dx;y=yRange[0]+y*dy;lookAt=[x,y];if(e.shiftKey){zoom[0]/=0.5;zoom[1]/=0.5;}
draw(getColorPicker(),getSamples());};elem('canvasControls').onmouseup=function(e){if(box!=null){if(e.shiftKey){box=null;zoomOut(e);return;}
var c=ccanvas.getContext('2d');c.clearRect(0,0,ccanvas.width,ccanvas.height);var x=Math.min(box[0],box[2])+Math.abs(box[0]-box[2])/2.0;var y=Math.min(box[1],box[3])+Math.abs(box[1]-box[3])/2.0;var dx=(xRange[1]-xRange[0])/(0.5+(canvas.width-1));var dy=(yRange[1]-yRange[0])/(0.5+(canvas.height-1));x=xRange[0]+x*dx;y=yRange[0]+y*dy;lookAt=[x,y];var xf=Math.abs(Math.abs(box[0]-box[2])/canvas.width);var yf=Math.abs(Math.abs(box[1]-box[3])/canvas.height);zoom[0]*=Math.max(xf,yf);zoom[1]*=Math.max(xf,yf);box=null;draw(getColorPicker(),getSamples());}}}
if(dragToZoom==false){elem('canvasMandelbrot').onclick=function(event){var x=event.clientX;var y=event.clientY;var dx=(xRange[1]-xRange[0])/(0.5+(canvas.width-1));var dy=(yRange[1]-yRange[0])/(0.5+(canvas.height-1));x=xRange[0]+x*dx;y=yRange[0]+y*dy;lookAt=[x,y];if(event.shiftKey){zoom[0]/=0.5;zoom[1]/=0.5;}else{zoom[0]*=0.5;zoom[1]*=0.5;}
draw(getColorPicker(),getSamples());};}
window.onresize=function(event){reInitCanvas=true;};readHashTag();draw(getColorPicker(),getSamples());draw(getColorPicker(),getSamples());}