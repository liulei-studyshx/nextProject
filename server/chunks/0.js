"use strict";exports.id=0,exports.ids=[0],exports.modules={1e3:(e,t,i)=>{i.d(t,{camera:()=>r,controls:()=>h,directionalLight:()=>s,renderer:()=>w,resizeRenderer:()=>f,scene:()=>l,textLoader:()=>x});var n=i(29),d=i(6206),a=i(1029);let o=document.querySelector("#three-contain"),l=new n.Z58,r=new n.ubm(45,o.clientWidth/o.clientHeight,.1,1e3),c=new n.$p8(0xffffff,1);l.add(c);let s=new n.ZyN(0xffffff,3);s.castShadow=!0,l.add(s);let w=new d.JeP({antialias:!0});w.setSize(o.clientWidth,o.clientHeight),w.shadowMap.enabled=!0,o.appendChild(w.domElement),w.setPixelRatio(window.devicePixelRatio),window.addEventListener("resize",()=>{f()});let f=(e=o.clientWidth)=>{r.aspect=e/o.clientHeight,r.updateProjectionMatrix(),w.setSize(e,o.clientHeight),w.setPixelRatio(window.devicePixelRatio)},h=new a.N(r,w.domElement);function x(e){let t=new n.Tap;return new Promise(async i=>{t.load(e,e=>{i(e)})})}}};