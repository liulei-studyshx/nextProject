(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[778],{9621:(e,t,n)=>{Promise.resolve().then(n.bind(n,9282))},9282:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>l});var i=n(5155),r=n(2115),o=n(337);class a extends o.BRH{constructor(e){super(e),this.type=o.ix0}parse(e){let t,n,i;let r=function(e,t){switch(e){case 1:throw Error("THREE.RGBELoader: Read Error: "+(t||""));case 2:throw Error("THREE.RGBELoader: Write Error: "+(t||""));case 3:throw Error("THREE.RGBELoader: Bad File Format: "+(t||""));default:throw Error("THREE.RGBELoader: Memory Error: "+(t||""))}},a=function(e,t,n){t=t||1024;let i=e.pos,r=-1,o=0,a="",s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(i,i+128)));for(;0>(r=s.indexOf("\n"))&&o<t&&i<e.byteLength;)a+=s,o+=s.length,i+=128,s+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(i,i+128)));return -1<r&&(!1!==n&&(e.pos+=o+r+1),a+s.slice(0,r))},s=new Uint8Array(e);s.pos=0;let l=function(e){let t,n;let i=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,s=/^\s*FORMAT=(\S+)\s*$/,l=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,c={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};for(!(e.pos>=e.byteLength)&&(t=a(e))||r(1,"no header found"),(n=t.match(/^#\?(\S+)/))||r(3,"bad initial token"),c.valid|=1,c.programtype=n[1],c.string+=t+"\n";!1!==(t=a(e));){if(c.string+=t+"\n","#"===t.charAt(0)){c.comments+=t+"\n";continue}if((n=t.match(i))&&(c.gamma=parseFloat(n[1])),(n=t.match(o))&&(c.exposure=parseFloat(n[1])),(n=t.match(s))&&(c.valid|=2,c.format=n[1]),(n=t.match(l))&&(c.valid|=4,c.height=parseInt(n[1],10),c.width=parseInt(n[2],10)),2&c.valid&&4&c.valid)break}return 2&c.valid||r(3,"missing format specifier"),4&c.valid||r(3,"missing image size specifier"),c}(s),c=l.width,d=l.height,h=function(e,t,n){if(t<8||t>32767||2!==e[0]||2!==e[1]||128&e[2])return new Uint8Array(e);t!==(e[2]<<8|e[3])&&r(3,"wrong scanline width");let i=new Uint8Array(4*t*n);i.length||r(4,"unable to allocate buffer space");let o=0,a=0,s=4*t,l=new Uint8Array(4),c=new Uint8Array(s),d=n;for(;d>0&&a<e.byteLength;){a+4>e.byteLength&&r(1),l[0]=e[a++],l[1]=e[a++],l[2]=e[a++],l[3]=e[a++],(2!=l[0]||2!=l[1]||(l[2]<<8|l[3])!=t)&&r(3,"bad rgbe scanline format");let n=0,h;for(;n<s&&a<e.byteLength;){let t=(h=e[a++])>128;if(t&&(h-=128),(0===h||n+h>s)&&r(3,"bad scanline data"),t){let t=e[a++];for(let e=0;e<h;e++)c[n++]=t}else c.set(e.subarray(a,a+h),n),n+=h,a+=h}for(let e=0;e<t;e++){let n=0;i[o]=c[e+n],n+=t,i[o+1]=c[e+n],n+=t,i[o+2]=c[e+n],n+=t,i[o+3]=c[e+n],o+=4}d--}return i}(s.subarray(s.pos),c,d);switch(this.type){case o.RQf:let p=new Float32Array(4*(i=h.length/4));for(let e=0;e<i;e++)!function(e,t,n,i){let r=Math.pow(2,e[t+3]-128)/255;n[i+0]=e[t+0]*r,n[i+1]=e[t+1]*r,n[i+2]=e[t+2]*r,n[i+3]=1}(h,4*e,p,4*e);t=p,n=o.RQf;break;case o.ix0:let m=new Uint16Array(4*(i=h.length/4));for(let e=0;e<i;e++)!function(e,t,n,i){let r=Math.pow(2,e[t+3]-128)/255;n[i+0]=o.GxU.toHalfFloat(Math.min(e[t+0]*r,65504)),n[i+1]=o.GxU.toHalfFloat(Math.min(e[t+1]*r,65504)),n[i+2]=o.GxU.toHalfFloat(Math.min(e[t+2]*r,65504)),n[i+3]=o.GxU.toHalfFloat(1)}(h,4*e,m,4*e);t=m,n=o.ix0;break;default:throw Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:c,height:d,data:t,header:l.string,gamma:l.gamma,exposure:l.exposure,type:n}}setDataType(e){return this.type=e,this}load(e,t,n,i){return super.load(e,function(e,n){switch(e.type){case o.RQf:case o.ix0:e.colorSpace=o.Zr2,e.minFilter=o.k6q,e.magFilter=o.k6q,e.generateMipmaps=!1,e.flipY=!0}t&&t(e,n)},n,i)}}n(1068);let s=[{position:{x:-200,y:-4,z:-147},content:{title:"进入厨房",text:"",image:1,showTip:!1,showTitle:!0}},{position:{x:-100,y:0,z:-231},content:{title:"信息点2",text:"77989",showTip:!0,showTitle:!1}},{position:{x:150,y:-50,z:-198},content:{title:"信息点3",text:"qwdcz",showTip:!0,showTitle:!1}},{position:{x:210,y:11,z:-140},content:{title:"信息点4",text:"大豆食心虫侦察十大大苏打大大大大大大大",showTip:!0,showTitle:!1}},{position:{x:208,y:-12,z:140},content:{title:"信息点5",text:"eq",showTip:!0,showTitle:!1}},{position:{x:86,y:-9,z:236},content:{title:"进入房间",text:"",showTip:!1,showTitle:!0}}];function l(){let e=(0,r.useRef)(!1),t=(0,r.useRef)([]),[l,c]=(0,r.useState)({}),[d,h]=(0,r.useState)({top:"-100%",left:"-100%"});(0,r.useEffect)(()=>{p()},[]);let p=async()=>{let{scene:i,renderer:r,camera:l,controls:c}=await Promise.all([n.e(367),n.e(451),n.e(866)]).then(n.bind(n,7866)),d=new o.IzY(30);i.add(d);let h=new o.Gu$(5,32,32),p=new a,m=null;p.load("/imgs/hdr/ersisd-Beerse_Kitchen_4k.hdr",e=>{let t=new o.V9B({map:e});(m=new o.eaF(h,t)).geometry.scale(1,1,-1),i.add(m)}),l.position.z=.1,c.rotateSpeed=-1;let u=new o.Tap().load("/imgs/tip.1fcbc2bb.png"),w=new o.RoJ({map:u});s.forEach(e=>{let{position:n,content:r}=e;console.log("position: ",n);let{title:a,text:s,showTip:l,showTitle:c}=r,d=new o.kxk(w);d.scale.set(.06,.06,.06),d.position.set(n.x/100,n.y/100,n.z/100),d.content=r,t.current.push(d),i.add(d)});let f=new o.Tap,g=null;f.load("/imgs/enter.png",e=>{let t=e.image.width,n=e.image.height,r=new o.bdM(t,n),a=new o.V9B({map:e,transparent:!0});(g=new o.eaF(r,a)).position.set(-4.5,0,-1.6),g.scale.set(.007,.007,.007),g.rotation.set(0,Math.PI/2,0),i.add(g)});let y=new o.tBo;y.params.Line.threshold=.1;let x=new o.I9Y,b=document.querySelector("#three-contain"),E=document.querySelector(".home");document.addEventListener("mousedown",t=>{x.x=t.clientX/(null==b?void 0:b.clientWidth)*2-1,x.y=-(2*((t.clientY-(null==b?void 0:b.offsetTop))/(null==b?void 0:b.clientHeight)))+1,y.setFromCamera(x,l),y.intersectObject(g,!0).length>0&&p.load(e.current?"/imgs/hdr/ersisd-Beerse_Kitchen_4k.hdr":"/imgs/hdr/Living.hdr",t=>{e.current=!e.current,m.material.map=t,e.current?(g.position.set(-2.6,0,4),g.rotation.set(0,Math.PI,0),g.scale.set(.009,.009,.009)):(g.position.set(-4.5,0,-1.6),g.rotation.set(0,Math.PI/2,0),g.scale.set(.007,.007,.007))})}),document.addEventListener("mousemove",function(e){x.x=e.clientX/(null==b?void 0:b.clientWidth)*2-1,x.y=-(2*((e.clientY-(null==E?void 0:E.offsetTop))/(null==b?void 0:b.clientHeight)))+1,y.setFromCamera(x,l);let n=y.intersectObjects(t.current,!0);n.length>0&&(console.log("objects: ",n),element.clientWidth,element.clientHeight,new o.Pq0(n[0].object.position.x,n[0].object.position.y,n[0].object.position.z).project(l))});let v=()=>{r.render(i,l),window.requestAnimationFrame(v),c.update(),y.setFromCamera(x,l)};v()};return(0,i.jsxs)("div",{className:"home",children:[(0,i.jsx)("div",{id:"three-contain",style:{width:"100%",height:"calc(100vh - 46px)"}}),(0,i.jsx)("div",{className:"tooltip-box",style:d,children:(0,i.jsxs)("div",{className:"container",children:[(0,i.jsxs)("div",{className:"title",children:["标题：",l.title]}),(0,i.jsxs)("div",{className:"explain",children:["说明：",l.text]})]})})]})}},1068:()=>{}},e=>{var t=t=>e(e.s=t);e.O(0,[829,831,441,517,358],()=>t(9621)),_N_E=e.O()}]);