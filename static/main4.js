let main={theme:'lite',version:'0.804',timePrev:performance.now(),searchScript:'no',searchStatus:'no',searchData:''}
let menuVis=false
let searchVis=false
function pathAbsolute(base,relative){let stack=base.split('index.html'),parts=relative.split('index.html')
stack.pop()
for(let i=0;i<parts.length;i++){if(parts[i]=='.')continue
if(parts[i]=='..')stack.pop()
else stack.push(parts[i])}
return stack.join('index.html')}
let userLang=window.navigator.userLanguage||window.navigator.language
let DecSep=(1.5).toLocaleString(userLang).charAt(1)
let ThouSep=String.fromCharCode(90-DecSep.charCodeAt(0))
let DecType=''
if(DecSep==','){DecType='c'}
function decfmt(){if(DecSep==','){fixSpells(document.body,'d')
let imgs=document.body.getElementsByTagName('img')
for(let i=0;i<imgs.length;i++){if(imgs[i].getAttribute('hasdec')!=null&&imgs[i].getAttribute('hasdec')!=''){imgs[i].src=imgs[i].src.replace(/\.(gif|jpg|png)/g,'c.$1')}}}}
function doSpell(){if(typeof reSpell=='undefined')return
let userLang=window.navigator.userLanguage||window.navigator.language
switch(userLang.toLowerCase()){case 'en-us':break
case 'en-au':case 'en-ca':case 'en-gb':case 'en-ie':case 'en-nz':case 'en-za':fixSpells(document.body,'s')
break
default:}}
function doChina(){let userLang=window.navigator.userLanguage||window.navigator.language
let transQ=false
let zhQ=false
switch(userLang.toLowerCase()){case 'zh-tw':case 'zh-hk':break
case 'zh-sg':case 'zh-cn':zhQ=true
break
default:}
if(zhQ){let path=location.pathname
path=path.split('mathsisfun/index.html').join('index.html')
let dir=path.substring(0,path.lastIndexOf('index.html'))
let file=path.substring(path.lastIndexOf('index.html')+1)
switch(dir){case '':case '/activity':case '/algebra':case '/calculus':case '/data':case '/geometry':case '/measure':case '/money':case '/numbers':case '/physics':case '/sets':transQ=true
break
default:}
if(transQ){path='http://www.shuxuele.com'+path
let newDiv=document.createElement('div')
let tgtDiv=document.getElementById('content')
document.body.insertBefore(newDiv,tgtDiv)
let str='<div style="position: absolute; right: 50%; margin-right: 260px; top:120px; font:45px Arial; background-color: rgba(255, 220, 0, 0.5);  border-radius:5px; border: 1px solid red; "><a href="'+path+'" style="color:red; text-decoration: none;">中文</a></div>'
newDiv.innerHTML=str}}
if(!transQ){let path=location.pathname
path=path.split('mathsisfun/index.html').join('index.html')
let dir=path.substring(0,path.lastIndexOf('index.html'))
let file=path.substring(path.lastIndexOf('index.html')+1)
let fbQ=false
if(fbQ){path='https://www.facebook.com/Mathisfun-249324325634773/'
let newDiv=document.createElement('div')
let tgtDiv=document.getElementById('content')
document.body.insertBefore(newDiv,tgtDiv)
let str='<div style="position: absolute; right: 50%; margin-right: 260px; top:120px; "><a href="https://www.facebook.com/Mathisfun-249324325634773/" rel="nofollow"><img src="images/style/facebook.svg"></a></div>'
newDiv.innerHTML=str}}}
function fixSpells(elem,tp){if(!(elem instanceof Node)||elem.nodeType!==Node.ELEMENT_NODE)return
let children=elem.childNodes
for(let i=0;children[i];++i){let node=children[i]
switch(node.nodeType){case Node.ELEMENT_NODE:fixSpells(node,tp)
break
case Node.TEXT_NODE:if(tp=='s')fixSpell(node)
if(tp=='d')fixDec(node)
break}}}
function fixSpell(node){let s=node.nodeValue
if(s.length<4)return
if(s.match(/(?=.*[a-zA-Z])/)){let sStt=s
for(let j=0;j<reSpell.length;j++){let s0=reSpell[j][0]
let s1=reSpell[j][1]
s=s.replace(new RegExp('\\b'+s0+'\\b','g'),s1)
s=s.replace(new RegExp('\\b'+proper(s0)+'\\b','g'),proper(s1))}
if(s!=sStt)node.nodeValue=s}}
function fixDec(node){let s=node.nodeValue
let sStt=s
s=s.replace(/(\d),(\d\d)/g,'$1#$2').replace(/(\d)\.(\d)/g,'$1,$2').replace(/(\d)#(\d)/g,'$1.$2')
if(s!=sStt){node.nodeValue=s}}
function doLocal(){decfmt()
doSpell()
relatedLinks()
doChina()}
function proper(s){return s.charAt(0).toUpperCase()+s.substring(1,s.length).toLowerCase()}
function tellAFriend(){let msg="\nI found '"+document.title+"' here: "+location.href+'\n'
window.location='mailto:?subject='+encodeURIComponent(document.title)+'&body='+encodeURIComponent(msg)}
function addFavorites(){if(window.sidebar){window.sidebar.addPanel(document.title,location.href,'')}else if(window.external){window.external.AddFavorite(location.href,document.title)}}
function openEnglish(){if(typeof tranfrom=='undefined')tranfrom='index-2.html'
let path=tranfrom
let url='https://www.mathsisfun.com/'+path
window.location=url}
function linkToUs(){let dom=document.domain
if(dom=='localhost')dom='localhost/mathsisfun'
let pgURL=dom+'/link-to-us.html'
pgURL+='?path='+toHex(location.pathname+location.search)
pgURL+='&title='+toHex(document.title)
console.log('dom',dom,pgURL)
window.location='https://'+pgURL}
function citation(){let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
let path=location.pathname+location.search
let atitle=document.title
let md=new Date(document.lastModified)
let mDate=md.getDate()+' '+months[md.getMonth()]+' '+md.getFullYear()
let author=typeof Author=='undefined'?'Pierce, Rod':Author
let urlStt=urlSttGet()
let to=urlStt+'citation.php'
console.log('citation',to)
postWith(to,{path:path,title:atitle,moddate:mDate,author:author,})}
function postWith(to,p){let myForm=document.createElement('form')
myForm.method='post'
myForm.action=to
for(let k in p){let myInput=document.createElement('input')
myInput.setAttribute('name',k)
myInput.setAttribute('value',p[k])
myForm.appendChild(myInput)}
document.body.appendChild(myForm)
myForm.submit()
document.body.removeChild(myForm)}
function URLEncode(text){let SAFECHARS='0123456789'+'ABCDEFGHIJKLMNOPQRSTUVWXYZ'+'abcdefghijklmnopqrstuvwxyz'+"-_.!~*'()"
let HEX='0123456789ABCDEF'
let s=''
for(let i=0;i<text.length;i++){let ch=text.charAt(i)
if(ch==' '){s+='+'}else if(SAFECHARS.indexOf(ch)!=-1){s+=ch}else{let charCode=ch.charCodeAt(0)
if(charCode>255){s+='+'}else{s+='%'
s+=HEX.charAt((charCode>>4)&0xf)
s+=HEX.charAt(charCode&0xf)}}}
return s}
function copyToClipboard(txtArea){txtArea.focus()
txtArea.select()
let copiedTxt=document.selection.createRange()
copiedTxt.execCommand('Copy')}
function toHex(s){let hex=''
for(let i=0;i<s.length;i++){let cc=s.charCodeAt(i).toString(16)
if(cc.length<2)cc='0'+cc
hex+=''+cc}
return hex}
function adOffQ(){let item=localStorage.getItem('adoff')
if(item===null)return false
let object=JSON.parse(item)
let dateString=object.when
let until=new Date(dateString)
until.setTime(until.getTime()+1*60*1000)
let now=new Date()
return until>now}
function adOffSet(){let object={value:false,when:new Date()}
localStorage.setItem('adoff',JSON.stringify(object))}
function adOffReset(){let object={value:false,when:0}
localStorage.setItem('adoff',JSON.stringify(object))}
let adIDs=[{id:'adTop',withAdsQ:true},{id:'adend',withAdsQ:true},{id:'adsHide1',withAdsQ:true},{id:'adsShow1',withAdsQ:false},]
function adsSet(onQ){for(let i=0;i<adIDs.length;i++){let ad=adIDs[i]
let div=document.getElementById(ad.id)
if(div){let showQ=ad.withAdsQ
if(!onQ)showQ=!showQ
if(showQ){div.style.display='inline'}else{div.style.display='none'}}}}
function adsHide(){adOffSet()
adsSet(false)}
function adsShow(){adOffReset()
adsSet(true)}
function printImg(s){let pwin=window.open(s,'_blank')
setTimeout('pwin.print()',2000)}
function doQ(id,qs){let fromPath=location.pathname+location.search
let title=document.title
let url='http://www.mathopolis.com/questions/q.html?id='+parseInt(id)+'&t=mif'
if(typeof qs=='undefined'){url+='&qs=0'}else{url+='&qs='+qs}
url+='&site=1'+'&ref='+toHex(fromPath)+'&title='+toHex(title)
window.open(url,'mathopolis')}
function getQ(){let qs=''
for(let i=0;i<arguments.length;i++){if(i>0)qs+='_'
qs+=arguments[i]}
let s=''
for(let i=0;i<arguments.length;i++){s+='<a href="javascript:doQ('+arguments[i]+",'"+qs+"'"+')">Question&nbsp;'+(i+1)+'</a> '}
document.write(s)}
function urlSttGet(){let url=location.href
url=url.replace('localhost/index.html','')
let slashN=url.split('index.html').length-4
let urlStt=''
for(let i=0;i<slashN;i++)urlStt+='index.html'
return urlStt}
function menuHTML(typ){let urlStt=urlSttGet()
let links=[['worksheets/index.html','Home',0],['worksheets/index.html','Algebra',0],['worksheets/index.html','Calculus',1],['worksheets/index.html','Data',0],['worksheets/index.html','Geometry',0],['worksheets/index.html','Measure',0],['worksheets/index.html','Money',1],['worksheets/index.html','Numbers',0],['worksheets/index.html','Physics',0],['worksheets/index.html','Activities',1],['worksheets/index.html','Dictionary',0],['worksheets/index.html','Games',0],['worksheets/index.html','Puzzles',0],['worksheets/index.php','Worksheets',1],]
let s=''
let linkLen=links.length
let i
if(typ==0){s+='<ul role="list">'
for(i=0;i<linkLen;i++){if(links[i][2]==0){s+='<li role="listitem" tabindex="0"><a href="'+urlStt+links[i][0]+'">'+links[i][1]+'</a></li>'
s+='\n'}}
s+='</ul>'}
if(typ==1){s+='<ul role="list">'
s+='<li><a role="listitem" href="'+urlStt+links[0][0]+'">'+links[0][1]+'</a></li>'
s+='<li><a role="listitem" href="#">Subjects &#x25BC;</a>'
s+='<ul>'
for(i=1;i<=8;i++){s+='<li><a role="listitem" href="'+urlStt+links[i][0]+'">'+links[i][1]+'</a></li>'}
s+='</ul>'
s+='</li>'
s+='<li><a role="listitem" href="#">More &#x25BC;</a>'
s+='<ul role="list">'
for(i=9;i<links.length;i++){s+='<li><a role="listitem" href="'+urlStt+links[i][0]+'">'+links[i][1]+'</a></li>'}
s+='</ul>'
s+='</li>'
s+='</ul>'}
if(typ==2){s+='&nbsp;'
s+='<a href="javascript:menuShow()" style="text-decoration: none;" aria-label="Show Menu">'
s+='<img src="'+urlStt+'images/style/menu.svg" class="hov" alt="Menu" />'
s+='</a>'
s+=' '
s+='<a href="javascript:searchShow()" style="text-decoration: none; " aria-label="Show Search">'
s+='<img src="'+urlStt+'images/style/search.svg" class="hov" alt="Search" />'
s+='</a>'}
return s}
function themeChgHTML(){let s=''
s+='<label id="themeSwitch">'
s+='<input type="checkbox" onchange="themeChg()" id="themeSlider">'
s+='<span id="themeSlider1" class="round"></span>'
s+='</label>'
return s}
function menuShow(){console.log('menuShow',menuVis)
let div=document.getElementById('menuSlim')
if(menuVis){div.style.display='none'}else{div.style.display='block'
if(searchVis)searchShow()}
menuVis=!menuVis}
function searchShow(){console.log('searchShow',searchVis)
let div=document.getElementById('search')
if(searchVis){div.style.display='none'
div.style.position='relative'}else{div.style.display='block'
div.style.position='absolute'
if(menuVis)menuShow()}
searchVis=!searchVis}
function translateHTML(){let s=''
s+='<div id="google_translate_element"></div>'
s+='<script type="text/javascript">'
s+='	function googleTranslateElementInit() {'
s+="new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');"
s+='}'
if(false){s+='</script>'
s+='	<script type="text/javascript" src="../translate.google.com/translate_a/elementa0d8.js?cb=googleTranslateElementInit"></script>'}else{console.log('async translate2')
s+='let googleTranslateScript = document.createElement("script");'
s+='googleTranslateScript.type = "text/javascript";'
s+='googleTranslateScript.async = true;'
s+='googleTranslateScript.src = "../translate.google.com/translate_a/elementa0d8.js?cb=googleTranslateElementInit";'
s+='( document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0] ).appendChild(googleTranslateScript);'
s+='</script>'}
return s}
function cookMsg(){let s=''
let imgHome=(document.domain=='localhost'?'/mathsisfun':'')+'/'
s+='We may use <a href="'+imgHome+'about-ads.html">Cookies</a> &nbsp;'
s+='<div class="btn" style="display:inline-block; cursor: pointer;" onclick="cookOK()">OK</div>'
return s}
function cookOK(){console.log('cookOK')
document.getElementById('cookOK').style.display='none'
localStorage.setItem('cookie','ok')}
function adsenseDo(){console.log('adsenseDo')
let script=document.createElement('script')
script.type='text/javascript'
script.setAttribute('async','async')
script.src='../pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
document.getElementsByTagName('body')[0].appendChild(script)
let ins=document.createElement('ins')
ins.setAttribute('class','adsbygoogle')
ins.setAttribute('style','display:block;')
ins.setAttribute('data-ad-client','ca-pub-1389989178296449')
ins.setAttribute('data-ad-slot','2009442555')
ins.setAttribute('data-ad-format','auto')
ins.setAttribute('data-full-width-responsive','true')
let dest=document.getElementById('adend')
dest.appendChild(ins)
var inlineScript=document.createElement('script')
inlineScript.type='text/javascript'
inlineScript.text='(adsbygoogle = window.adsbygoogle || []).push({});'
dest.appendChild(inlineScript)
console.log('adsenseDo done')}
function adTopHTML(){let path=location.pathname
path=path.split('mathsisfun/index.html').join('index.html')
let dir=path.substring(0,path.lastIndexOf('index.html'))
let file=path.substring(path.lastIndexOf('index.html')+1)
let s=''
let src=''
s+=adCodeGet(src)
return s}
function adEndHTML(){let path=location.pathname
path=path.split('mathsisfun/index.html').join('index.html')
let src=''
src=document.domain=='localhost'?'dummy':'adsense'
let s=adCodeGet(src)
return s}
function adCodeGet(src){let s=''
switch(src){case '300x250':s+='<img src="../images/style/300x250.jpg" alt="dummy" width="300" height="250">'
break
case 'dummy':s+='<img src="/mathsisfun/images/style/320x60.jpg" alt="nice image"  width="300" height="250">'
break
case 'adsense':s+=`
      <script async src="../pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <!-- mif1905 -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-1389989178296449"
           data-ad-slot="2009442555"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script> 
      `
break
default:}
return s}
function linksHTML(){let url=location.href
let urlenc=encodeURIComponent(location.href)
let title=encodeURIComponent(document.title)
let linkstt='<a target="_blank"  rel="noopener nofollow" href="'
let s=''
s+='<a href="javascript:linkToUs()" id="linkus" title="Link To Us"></a>'
s+=linkstt+'https://www.facebook.com/sharer/sharer.php?u='+url+'&t='+title+'" title="Share on Facebook" id="linkfb"></a> '
s+=linkstt+'https://twitter.com/intent/tweet?source='+url+'&text='+title+':%20'+url+'" title="Tweet it" id="linktw"></a> '
s+=linkstt+'http://pinterest.com/pin/create/button/?url='+url+'&description='+title+'" title="Pin it" id="linkpi"></a>'
s+='<a href="javascript:tellAFriend()" id="linkem" title="eMail a Friend"></a>'
return s}
function footerHTML(){let s=''
let urlStt=urlSttGet()
let sep=' &cir; '
s+='<div id="footMenu">'
s+='<a href="'+urlStt+'search/search.html">Search</a>'+sep
s+='<a href="'+urlStt+'links/index.html">Index</a>'+sep
s+='<a href="'+urlStt+'aboutmathsisfun.html">About</a>'+sep
s+='<a href="'+urlStt+'contact.php">Contact</a>'+sep
s+='<a href="javascript:citation()">Cite&nbsp;This&nbsp;Page</a>'+sep
s+='<b><a href="'+urlStt+'Privacy.htm">Privacy</a></b>'
s+='</div>'
return s}
function footer2HTML(){let urlStt=urlSttGet()
let links=[['<div style="margin:5px 0 10px 5px;"><a href="'+urlStt+'index.htm"><img src="'+urlStt+'images/style/logo.svg" alt="logo"></a></div>','',1],['index.htm','Home',0],['links/index.html','Index',0],['aboutmathsisfun.html','About Us',0],['contact.php','Contact Us',0],['Privacy.htm','Privacy',0],['<div class="footHdr">Subjects</div> ','',1],['algebra/index.html','Algebra',0],['algebra/index-2.html','Algebra 2',0],['calculus/index.html','Calculus',0],['data/index.html','Data',0],['geometry/plane-geometry.html','Plane Geometry',0],['geometry/solid-geometry.html','Solid Geometry',0],['measure/index.html','Measure',0],['money/index.html','Money',0],['numbers/index.html','Numbers',0],['physics/index.html','Physics',0],['<div class="footHdr">Other</div> ','',1],['activity/index.html','Activities',0],['definitions/index.html','Dictionary',0],['games/index.html','Games',0],['worksheets/index.html','Puzzles',0],['worksheets/index.html','Worksheets',0],]
let s=''
s+='<div class="foot">'
for(let i=0;i<links.length;i++){let link=links[i]
if(link[2]==1){if(i>0)s+='</div>'
s+='<div class="footCol">'
s+=link[0]}else{s+='<div class="footItem">'
s+='<a href="'+urlStt+link[0]+'">'+link[1]+'</a>'
s+='</div>\n'}}
s+='<br><a href="javascript:citation()">Cite This Page</a>'
s+='</div>'
console.log('foot',s)
return s}
function themeChg(){let was=themeGet()
let theme=was=='lite'?'dark':'lite'
themeSet(theme)
document.getElementById('themeSlider').checked=theme=='dark'}
function themeGet(){let theme=localStorage.getItem('theme')
if(theme==null){let prefersDarkScheme=window.matchMedia('(prefers-color-scheme: dark)').matches
theme=prefersDarkScheme?'dark':'lite'
localStorage.setItem('theme',theme)}
if(theme!='lite'&&theme!='dark'){theme='lite'
localStorage.setItem('theme',theme)}
return theme}
function themeSet(theme){localStorage.setItem('theme',theme)
console.log('themeSet',theme,document.documentElement.hasAttribute('theme'))
document.documentElement.setAttribute('theme',theme)}
function adsHideHTML(){let s=''
s+='<div id="adsShow1"><a href="javascript:adsShow()">Show Ads</a></div>'
s+='<div id="adsHide1"><a href="javascript:adsHide()">Hide Ads</a> | '
let imgHome=(document.domain=='localhost'?'/mathsisfun':'')+'/'
s+='<a href="'+imgHome+'about-ads.html">About Ads</a> </div>'
return s}
function adsHideSet(){if(adOffQ()){adsSet(false)}}
function gTagHTML(){let s=''
s+='<script async src="https://www.googletagmanager.com/gtag/js?id=UA-29771508-1"></script>'
s+='<script>'
s+='window.dataLayer = window.dataLayer || [];'
s+='function gtag(){dataLayer.push(arguments);}'
s+="gtag('js', new Date());"
s+="gtag('config', 'UA-29771508-1');"
s+='</script>'
return s}
function logVisit(){let pg=location.pathname
if(pg=='index.html')return
let pgHex=toHex(pg)
addVisit(pgHex,'visit',window.location.hostname)}
if(Math.random()<0.1)logVisit()
function addVisit(pg,viewtype,hostname){console.log('addVisit',viewtype,hostname)
let req
req=new XMLHttpRequest()
let params='type='+viewtype
params+='&site=mif'
params+='&pg='+encodeURIComponent(pg)
params+='&lang='+encodeURIComponent(window.navigator.language)
params+='&ref='+encodeURIComponent(toHex(document.referrer))
req.open('POST.html','https://mi2f.com/update.php',true)
req.setRequestHeader('Content-type','application/x-www-form-urlencoded')
req.send(params)}
function onScroll(){let scrollTop=document.documentElement?document.documentElement.scrollTop:document.body.scrollTop
let menu=document.getElementById('menu')
if(scrollTop>100){menu.style.top='0px'
menu.style.width='1000px'
menu.style.border='1px solid #ffffff'
menu.style.boxShadow='0px 12px 12px -12px #77cc77'
menu.style.backgroundColor='white'
menu.style.textAlign='center'
menu.style.position='fixed'
menu.style.zIndex='5000'}else{menu.style.boxShadow='none'
menu.style.position='static'}}
function relatedLinks(){if(window.innerWidth<990){return}
let rels=document.getElementsByClassName('related')
if(rels.length==0){return}
let rel=rels[0]
let links=rel.getElementsByTagName('a')
let count=links.length
let right=null
let left=null
if(count>0){right=links[0]
if(count>1){left=links[count-1]}}
let s=''
let top=160
if(left!=null){s+='<div style="position: absolute; top: '+top+'px; left: 0px; text-align: left; ">'
s+=fmtMenuBox(left.href,left.text,0)
s+='</div>'}
if(right!=null){s+='<div style="position: absolute; top: '+top+'px; right: 0px; text-align: right; ">'
s+=fmtMenuBox(right.href,right.text,1)
s+='</div>'}
document.getElementById('stt').innerHTML+=s}
function fmtMenuBox(url,txt,dirn){let s=''
let boxID=dirn==0?'menuLt':'menuRt'
s+='<a href="'+url+'"  style="text-decoration: none; color: #8ac;">'
s+='<div id="'+boxID+'" >'
s+=txt
s+='</div>'
s+='</a>'
return s}
function vidDo(id,spanid){let s=''
let visIndex=videoVis.indexOf(spanid)
let visQ=visIndex>-1?true:false
if(visQ){let frame=document.getElementById(spanid+'v1')
frame.parentNode.removeChild(frame)
videoVis.splice(visIndex,1)
visQ=false}else{s+='<div style="width:100vw;"></div>'
s+='<iframe id="'+spanid+'v1" src="https://www.youtube.com/embed/'+id+'?rel=0&autoplay=1" frameborder="0" allowfullscreen style=" vertical-align:top; "></iframe>'
s+='<div style="width:100vw;"></div>'
videoVis.push(spanid)
visQ=true}
let vid=document.getElementById(spanid)
vid.innerHTML=s
vid.style.border='5px solid blue;'
console.log('vidDo',vid)
if(visQ)resizeVideo(spanid)}
function resizeVideo(spanid){let v1=document.getElementById(spanid+'v1')
let wd=window.innerWidth-40
if(wd>640)wd=640
v1.style.width=wd+'px'
v1.style.height=wd*(340/640)+80+'px'}
let videoVis=[]
function mainDo(){if(document.getElementById('menuWide')==null)return
document.getElementById('menuWide').innerHTML=menuHTML(0)
document.getElementById('menuSlim').innerHTML=menuHTML(1)
document.getElementById('menuTiny').innerHTML=menuHTML(2)
document.getElementById('adHide').innerHTML=adsHideHTML()
if(localStorage.getItem('cookie')=='ok'){}else{document.getElementById('cookOK').innerHTML=cookMsg()}
document.getElementById('search').innerHTML=searchHTML()
document.getElementById('linkto').innerHTML=linksHTML()
document.getElementById('logo').innerHTML+=themeChgHTML()
document.getElementById('themeSlider').checked=themeGet()=='dark'
document.getElementById('footer').innerHTML=footerHTML()
let qDivs=document.querySelectorAll('.questions')
for(let i=0;i<qDivs.length;i++){qsExpand(qDivs[i])}
let vidDivs=document.querySelectorAll('.video')
for(let i=0;i<vidDivs.length;i++){vidExpand(vidDivs[i],i)}
let scriptDivs=document.querySelectorAll('.script')
for(let i=0;i<scriptDivs.length;i++){scriptExpand(scriptDivs[i])}
if(document.domain=='localhost'){let dummy=document.createElement('img')
dummy.setAttribute('src','mathsisfun/images/style/320x60.html')
dummy.setAttribute('alt','dummy image')
dummy.setAttribute('width','320')
dummy.setAttribute('height','60')
let dest=document.getElementById('adend')
dest.appendChild(dummy)}else{setTimeout(adsenseDo,1000)}
adsHideSet()
doLocal()
document.getElementById('searchFld').addEventListener('keyup',searchKey)}
function searchHTML(){let s=''
s+='<form autocomplete="off" action="'+urlSttGet()+'worksheets/index.html" method="get">'
s+='<input type="text" id="searchFld" name="query" value="" placeholder="Search" aria-label="Search" />'
s+='<input type="submit" id="searchBtn" name="submit" value="" aria-label="Search Button" />'
s+='<input type="hidden" name="search" value="1" />'
s+='</form>'
return s}
function searchKey(ev){let val=ev.target.value
console.log('searchKey',val)
if(main.searchScript=='no'){main.searchScript='loading'
let script=document.createElement('script')
script.onload=function(){console.log('Script loaded and ready')
searchDo(ev)
main.searchScript='yes'}
let imgHome=(document.domain=='localhost'?'/mathsisfun':'')+'/search/images/'
script.src=imgHome+'search-lib.js'
document.getElementsByTagName('head')[0].appendChild(script)}
if(main.searchScript=='yes')searchDo(ev)
return}
function qsExpand(node){let str=node.innerHTML
if(str.includes('getQ('))return
console.log('qsExpand',str)
let newStr=qsHTML(str)
node.innerHTML=newStr}
function qsHTML(qStr){let qs=qStr.trim().split(/[^0-9]+/)
let joinedStr=qs.join('_')
let s=''
for(let i=0;i<qs.length;i++){s+='<a href="javascript:doQ('+qs[i]+",'"+joinedStr+"'"+')">Question&nbsp;'+(i+1)+'</a> '}
return s}
function vidExpand(div,n){let str=div.innerHTML
if(str.trim().length<=1)return
let newStr=vidHTML(str,'title','video'+n)
div.innerHTML=newStr}
function vidHTML(id,titleid='title',spanid='video',style='span'){id=id.replace(/&minus;/g,'-')
let s=''
switch(style){case 'span':s+='<a href="javascript:vidDo(\''+id+"','"+spanid+'\')">'
s+='<img src="'+urlSttGet()+'images/style/video.svg" alt="Video" style="width:70px; height:37px;vertical-align:middle; border:none;" />'
s+='</a>'
s+='<span id="'+spanid+'" style=""></span>'
break
case 'h1':let title=document.getElementById(titleid).innerHTML
s+='<div class="centerfull" style="clear:both; font-weight:400; padding: 0;">'
s+='<div style="float:left; width:60px; text-align:left;">'
s+='  <a href="javascript:vidDo(\''+id+"','"+spanid+'\')">'
s+='    <img src="'+urlSttGet()+'images/style/video.svg" alt="Video" height="32" style="vertical-align:middle; border:none;" />'
s+=' </a>'
s+='</div>'
s+='<div style="float:right; width:60px; text-align:right;">&nbsp;</div>'
s+='  <div style="margin:0 auto;">'
s+='    <h1>'+title+'</h1>'
s+='  </div>'
s+='</div>'
break
case 'h2':title=document.getElementById(titleid).innerHTML
s+='<div style="float:right; width:100px; margin: -10px 0 5px 0;">'
s+='  <a href="javascript:vidDo(\''+id+"','"+spanid+'\')">'
s+='    <img src="'+urlSttGet()+'images/style/video.svg" alt="Video" height="32" style="vertical-align:middle; border:none;" />'
s+=' </a>'
s+='</div>'
s+='    <h2>'+title+'</h2>'
break}
return s}
function initVideo(id,titleid,spanid,style){titleid=typeof titleid!=='undefined'?titleid:'title'
spanid=typeof spanid!=='undefined'?spanid:'video'
style=typeof style!=='undefined'?style:'h1'
document.getElementById(titleid).innerHTML=vidHTML(id,titleid,spanid,style)}
function scriptExpand(node){let str=node.innerHTML
if(str.trim().length<=1)return
iframeDo(node,str)}
function putFlash6(w,h,swf,querystring,clr,noflash){}
function putFlash7(w,h,swf,querystring,clr,noflash){console.log('putFlash7: '+swf)
let s='<div id="container"></div>'
document.write(s)
window.RufflePlayer=window.RufflePlayer||{}
window.addEventListener('load',(event)=>{const ruffle=window.RufflePlayer.newest()
const player=ruffle.createPlayer()
const container=document.getElementById('container')
container.appendChild(player)
player.load(swf)})}
function iframeDo(node,fileStr){let fileNames=fileStr.split(',')
let filename=fileNames[fileNames.length-1].trim()
let imgHome=document.domain=='localhost'?'/mathsisfun/':'/'
let sttWd=parseInt(node.getBoundingClientRect().width)
let sttHt=parseInt(node.getBoundingClientRect().height)
let htQ=node.style.height.length>0
console.log('iframe',filename,sttWd,sttHt,htQ)
let iframe=document.createElement('iframe')
if(htQ){iframe.width=sttWd
iframe.height=sttHt}else{iframe.height='200'}
iframe.style=`display:block; margin:auto; border:none; background-color:transparent; overflow:hidden;
  transition:all 0.6s ease-in-out;`
iframe.scrolling='no'
iframe.setAttribute('title','JavaScript Animation')
let html='<!doctype html><html><head>'
html+='<meta http-equiv="content-type" content="text/html; charset=utf-8" />'
for(let i=0;i<fileNames.length-1;i++){html+='<script src="'+imgHome+fileNames[i].trim()+'"></script>'}
html+='<link rel="stylesheet" href="'+imgHome+'style4.css">'
html+='<script src="'+imgHome+'iframe.js" defer></script>'
html+='<style>body { background: transparent; }</style>'
html+='</head>'
html+='<body style="text-align:center;">'
html+=`<script defer src="${filename}"></script>`
html+='</body>'
html+='</html>'
node.parentElement.insertBefore(iframe,node)
node.style.display='none'
iframe.contentWindow.document.open()
iframe.contentWindow.document.write(html)
iframe.contentWindow.document.close()
iframe.addEventListener('load',function(){let btnQ=false
let aQ=false
iframe.style.maxWidth='100%'
let bestWd=0,bestHt=0
if(htQ){bestWd=sttWd
bestHt=sttHt}else{bestWd=0
iframe.width=bestWd+'px'
bestHt=iframe.contentDocument.body.scrollHeight+1
iframe.height=bestHt+'px'}
setInterval(function(){let wd,ht
if(false){let div=iframe.contentDocument.body.children[0].children[0]
let rect=div.getBoundingClientRect()
wd=rect.width
ht=rect.height}else{wd=iframe.contentDocument.body.scrollWidth+1
ht=iframe.contentDocument.body.scrollHeight+1}
if(wd!=bestWd){console.log('chg wd',bestWd,'to',wd)
bestWd=wd
if(!aQ){iframe.width='100%'}else{iframe.width=bestWd+'px'
aQ=true}}
if(ht>bestHt||ht<bestHt-10){console.log('chg ht',bestHt,'to',ht)
bestHt=ht
iframe.height=bestHt+'px'}
if(!btnQ){let wd=iframe.contentDocument.body.scrollWidth+40
let ht=iframe.contentDocument.body.scrollHeight+1
let div=iframe.contentDocument.getElementById('resize')
if(div!=null){let btnStr='<button type="button" class="btn" style="z-index:2; position:absolute; right:0; bottom:0;" onclick="inNew(\''+filename+"',"+wd+','+ht+')">&rect;</button>'
div.innerHTML=btnStr}
btnQ=true}},650)})}
function rpLog(id){let now=performance.now()
if(main.timeStt==undefined){main.timeStt=performance.now()
main.timePrev=performance.now()}
console.log(''+id+': '+parseInt(now-main.timeStt)+'ms => '+parseInt(now-main.timePrev)+'ms')
main.timePrev=now}
themeSet(themeGet())
window.onload=mainDo
