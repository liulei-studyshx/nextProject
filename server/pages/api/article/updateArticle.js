"use strict";(()=>{var e={};e.id=369,e.ids=[369],e.modules={5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6762:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},8025:(e,t,n)=>{n.r(t),n.d(t,{config:()=>d,default:()=>c,routeModule:()=>l});var r={};n.r(r),n.d(r,{default:()=>u});var o=n(9947),i=n(325),a=n(6762),s=n(1246);async function u(e,t){let n=e.body;console.log("content: ",n);try{await s.default.query("UPDATE article SET content = ? ",[n]),t.status(200).json("success")}catch(e){t.status(500).json({message:e.message})}}let c=(0,a.M)(r,"default"),d=(0,a.M)(r,"config"),l=new o.PagesAPIRouteModule({definition:{kind:i.A.PAGES_API,page:"/api/article/updateArticle",pathname:"/api/article/updateArticle",bundlePath:"",filename:""},userland:r})},1246:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});let r=require("mysql2/promise"),o=n.n(r)().createPool({host:process.env.MYSQL_HOST,user:process.env.MYSQL_USER,password:process.env.MYSQL_PASSWORD,database:process.env.MYSQL_DATABASE,waitForConnections:!0,connectionLimit:10,queueLimit:0})},325:(e,t)=>{var n;Object.defineProperty(t,"A",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE"}(n||(n={}))},9947:(e,t,n)=>{e.exports=n(5600)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var n=t(t.s=8025);module.exports=n})();