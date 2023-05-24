var w,h,numLeft,my={};function primefactorsMain(){my.version='0.93';w=540;h=180;my.MAX=9007199254740991;my.lowPrimes=[];loadLowPrimes();my.lowPrimeN=100;console.log("my.lowPrimes.length",my.lowPrimes.length);var s=''
s+='<div style="position:relative; max-width:'+w+'px; border: none; border-radius: 20px; background-color: #eeeeff; margin:auto; display:block;">'
s+='<br>'
s+='<div style=" text-align:center;">'
s+='<span style="font: bold 16px Arial; color: #000000;">Number: </span>'
s+='<input type="text" id="number" style="font-size: 19px; color: #0000ff; background-color: #f0f8ff; text-align:center; border-radius: 10px; margin-right:60px; " value="12" onkeyup="go(0)" />'
s+='</div>'
s+='<div style="font: 14px arial; color: #000000; margin:5px 0 0 5px;">With Exponents: </div>'
s+='<div id="ansText" style="background-color: #ffffff; max-height: 100px; overflow: auto; font: 20px arial; text-align:center; border: 1px solid black; padding: 2px; margin:5px; ">&nbsp;</div>'
s+='<div style="font: 14px arial; color: #000000; margin:15px 0 0 5px;">Without Exponents: </div>'
s+='<div id="morText" style="background-color: #ffffff; max-height: 100px; overflow: auto; font: 20px arial; text-align:center; border: 1px solid black; padding: 2px; margin:5px; ">&nbsp;</div>'
s+='<div style="font: 11px arial; color: #6600cc; text-align:center;">&copy; 2020 MathsIsFun.com  v'+my.version+'</div>'
s+='</div>'
document.write(s);go(0);}
function test(){var tests=[79523,80089,82919,82920,99907,9007199254740881,9007199254740991];for(var i=0;i<tests.length;i++){var sttTm=performance.now();var t=tests[i];var r=getFactors(t);var elapse=performance.now()-sttTm;console.log("test",elapse,my.lowPrimeN,t,r);}}
function go(typ){document.getElementById("ansText").innerHTML="&nbsp;";document.getElementById("morText").innerHTML="&nbsp;";var nStr=document.getElementById("number").value;var nStrWas=nStr;nStr=nStr.replace(/[^0-9]/g,'');if(nStr!=nStrWas){document.getElementById("number").value=nStr;}
if(nStr.length==0){return;}
if(nStr=="0"){document.getElementById("number").value='';return;}
var n=parseInt(nStr);if(n<2||n>my.MAX){document.getElementById("morText").innerHTML="Please enter a number between 2 and  "+my.MAX;return;}
var F=getFactors(n);var s="&nbsp;";var ansMore="&nbsp;";if(F.length==1){s=n+' is a Prime Number';}
if(F.length>1){s=expArrayFmt(getExpFactors(F));ansMore=arrayFmt(F);}
document.getElementById("ansText").innerHTML=s;document.getElementById("morText").innerHTML=ansMore;}
function getExpFactors(F){var FP=[[F[0],1]];var n=0;for(var i=1;i<F.length;i++){if(F[i]==FP[n][0]){FP[n][1]++;}else{n++;FP[n]=[F[i],1];}}
return FP;}
function getFactors(TheNum){my.FArr=[];if(TheNum>my.MAX){return my.FArr;}
numLeft=TheNum;if(numLeft==0||numLeft==1){return my.FArr;}else{var doneQ=false;for(var p=0;p<my.lowPrimeN;p++){if(!testFact(my.lowPrimes[p])){doneQ=true;break;}}
if(!doneQ){var fact=(((my.lowPrimes[p-1]+5)/6)<<0)*6-1;while(true){if(!testFact(fact))break;fact+=2;if(!testFact(fact))break;fact+=4;}}
if(numLeft!=1)addFact(numLeft,1);}
return my.FArr;}
function testFact(fact){var power=0;while(numLeft%fact==0){power++;numLeft=numLeft/fact;}
if(power!=0){addFact(fact,power);}
return numLeft/fact>fact;}
function addFact(fact,power){for(var i=0;i<power;i++){my.FArr.push(fact);}}
function arrayFmt(P){var s="";for(var i=0;i<P.length;i++){if(i>0)
s+=" &times; ";s+=P[i];}
return s;}
function expArrayFmt(P){var s="";for(var i=0;i<P.length;i++){if(i>0)
s+=" &times; ";s+=P[i][0];if(P[i][1]>1)
s+='<sup>'+P[i][1]+'</sup>';}
return s;}
function loadLowPrimes(){my.lowPrimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009,1013,1019,1021,1031,1033,1039];}