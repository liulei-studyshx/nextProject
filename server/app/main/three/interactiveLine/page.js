(()=>{var e={};e.id=704,e.ids=[704],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},9551:e=>{"use strict";e.exports=require("url")},6310:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>s.a,__next_app__:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var n=r(260),o=r(8203),i=r(5155),s=r.n(i),a=r(7292),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);r.d(t,l);let d=["",{children:["main",{children:["three",{children:["interactiveLine",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,7097)),"/home/runner/work/nextProject/nextProject/src/app/main/three/interactiveLine/page.jsx"]}]},{}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1354)),"/home/runner/work/nextProject/nextProject/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9937,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/home/runner/work/nextProject/nextProject/src/app/main/three/interactiveLine/page.jsx"],p={require:r,loadChunk:()=>Promise.resolve()},u=new n.AppPageRouteModule({definition:{kind:o.RouteKind.APP_PAGE,page:"/main/three/interactiveLine/page",pathname:"/main/three/interactiveLine",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},2849:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,3219,23)),Promise.resolve().then(r.t.bind(r,4863,23)),Promise.resolve().then(r.t.bind(r,5155,23)),Promise.resolve().then(r.t.bind(r,9350,23)),Promise.resolve().then(r.t.bind(r,6313,23)),Promise.resolve().then(r.t.bind(r,8530,23)),Promise.resolve().then(r.t.bind(r,8921,23))},9297:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,6959,23)),Promise.resolve().then(r.t.bind(r,3875,23)),Promise.resolve().then(r.t.bind(r,8903,23)),Promise.resolve().then(r.t.bind(r,4178,23)),Promise.resolve().then(r.t.bind(r,6013,23)),Promise.resolve().then(r.t.bind(r,7190,23)),Promise.resolve().then(r.t.bind(r,1365,23))},6386:(e,t,r)=>{Promise.resolve().then(r.bind(r,1354))},9594:(e,t,r)=>{Promise.resolve().then(r.bind(r,9246))},6785:(e,t,r)=>{Promise.resolve().then(r.bind(r,7097))},4699:(e,t,r)=>{Promise.resolve().then(r.bind(r,7149))},9246:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var n=r(5512),o=r(4133),i=r(7494),s=r(3819),a=r(8009),l=r(9334),d=r(6512);r(161),r(4263);let c=[{label:"React",key:"reacts"},{label:"Next.js",key:"next"},{label:"Three.js",key:"three",children:[{key:"euler",label:"欧拉角"},{key:"3DRoom",label:"3D房间"},{key:"BufferGeometry",label:"BufferGeometry"}]},{label:"",key:"4",icon:(0,n.jsx)(d.A,{})}];function p({children:e}){let t=(0,l.useRouter)(),[r,d]=(0,a.useState)([]),p=async({key:e})=>{if("4"==e)t.push("/set");else{let r=await fetch(`${window.location.origin}/api/set/getListByType?type=${e}`),n=await r.json();n.map(e=>{e.key=e.path,e.label=e.title}),d(n),t.push(e)}};return(0,n.jsx)("html",{lang:"en",children:(0,n.jsx)("body",{children:(0,n.jsx)(o.Z,{children:(0,n.jsxs)(i.Ay,{wave:{disabled:!0},children:[(0,n.jsx)(s.A,{onSelect:p,items:c,mode:"horizontal",theme:"dark",style:{display:"flex",justifyContent:"flex-end"}}),(0,n.jsxs)("div",{style:{display:"flex",height:"calc( 100% - 46px)"},children:[(0,n.jsx)(s.A,{items:r,onSelect:({key:e})=>{t.push(e)}}),e]})]})})})})}},7149:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var n=r(5512);function o(){return(0,n.jsx)("div",{id:"three-contain",style:{width:"100%",height:"calc(100vh - 46px)"}})}r(8009),r(29)},1354:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});let n=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/runner/work/nextProject/nextProject/src/app/layout.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/runner/work/nextProject/nextProject/src/app/layout.tsx","default")},7097:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});let n=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/runner/work/nextProject/nextProject/src/app/main/three/interactiveLine/page.jsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/runner/work/nextProject/nextProject/src/app/main/three/interactiveLine/page.jsx","default")},440:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var n=r(8077);let o=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,n.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},4263:()=>{}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[989,314,77,29],()=>r(6310));module.exports=n})();