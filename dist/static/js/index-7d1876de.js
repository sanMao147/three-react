import{j as e,a as t,F as o}from"./index-ac32f76b.js";import{r}from"./react-aa034a1c.js";import{S as i,P as s,W as n,A as a,O as c,T as m,N as d,M as l,a as p,b as h,C as w,c as j,D as f,B as u,d as g,e as y,f as b,G as x,g as v,h as k}from"./three-a38806bf.js";import{u as N,a as C,O as z}from"./react-router-ca90130e.js";import{B as M,D as S}from"./antd-3b5cb232.js";import"./react-dom-67b4aaa0.js";import"./classnames-46b2866a.js";import"./scheduler-6fdbf8de.js";import"./react-router-dom-824b8f8a.js";import"./@remix-run-f8738e57.js";import"./rc-util-fd3bf20b.js";import"./react-is-554aa597.js";import"./@babel-ebff8eee.js";import"./rc-resize-observer-154f2093.js";import"./resize-observer-polyfill-4ed993c7.js";import"./rc-motion-0b6d8135.js";import"./@ant-design-ddbed6df.js";import"./@emotion-99675243.js";import"./stylis-68087142.js";import"./@ctrl-f501ea2e.js";import"./rc-dialog-088eaa68.js";import"./rc-select-d3714254.js";import"./rc-overflow-9955ebfc.js";import"./rc-virtual-list-f32159fb.js";import"./rc-menu-926636d5.js";import"./rc-trigger-99dcb669.js";import"./rc-align-264b9fe6.js";import"./rc-picker-29a298db.js";import"./dayjs-4ed993c7.js";import"./rc-cascader-3e735245.js";import"./rc-collapse-d2236808.js";import"./rc-drawer-203c030a.js";import"./@rc-component-a65194ac.js";import"./rc-field-form-bae4a1f3.js";import"./async-validator-455bc203.js";import"./rc-pagination-d8916dd7.js";import"./rc-image-59ac47f3.js";import"./rc-input-number-ed29ffc1.js";import"./rc-mentions-82bfee74.js";import"./qrcode.react-6863cdb3.js";import"./rc-segmented-d2236808.js";import"./rc-switch-d38775c9.js";import"./rc-tree-7ced53a2.js";import"./rc-table-f892bf85.js";import"./rc-tree-select-d3859ea6.js";const E=()=>{let o=r.useRef(null);r.useEffect((()=>{N()}),[]);const N=()=>{const e={width:window.innerWidth,height:window.innerHeight},t="#ffeded",r=new i,N=new s(75,e.width/e.height,1,1e3);N.position.set(0,0,16),r.add(N);const C=new n({canvas:o.current,antialias:!0});C.setPixelRatio(Math.min(window.devicePixelRatio,2)),C.setSize(e.width,e.height),C.toneMapping=a;const z=new c(N,o.current);z.target.set(0,0,0),z.enableDamping=!0,z.enablePan=!1,window.addEventListener("resize",(()=>{N.aspect=window.innerWidth/window.innerHeight,N.updateProjectionMatrix(),C.setSize(window.innerWidth,window.innerHeight)}),!1);const M=new m,S=M.load("/three-react/static/jpg/3-11dace94.jpg");S.magFilter=d;const E=new l({color:t,gradientMap:S}),A=new p(new h(1,.4,16,60),E),F=new p(new w(1,2,32),E),I=new p(new j(.8,.35,100,16),E);A.position.x=2,F.position.x=-2,I.position.x=2,A.position.y=-0,F.position.y=-4,I.position.y=-8,r.add(A,F,I);const P=[A,F,I],B=new f("#ffffff",1);B.position.set(1,1,0),r.add(B);const O=new Float32Array(600);for(let o=0;o<200;o++)O[3*o+0]=10*(Math.random()-.5),O[3*o+1]=2-4*Math.random()*P.length,O[3*o+2]=10*(Math.random()-.5);const W=new u;W.setAttribute("position",new g(O,3));const q=new y({color:t,sizeAttenuation:M,size:.03}),D=new b(W,q);r.add(D);const G=new x;r.add(G),N.position.z=4,G.add(N);let H=window.scrollY,L=0;window.addEventListener("scroll",(()=>{H=window.scrollY;const t=Math.round(H/e.height);if(t!=L){L=t;var o=new v.Tween(P[L].rotation);o.to({x:"+=6",y:"+=3",z:"+=1.5"}),o.easing(v.Easing.Cubic.InOut)}}));const R={x:0,y:0};window.addEventListener("mousemove",(t=>{R.x=t.clientX/e.width-.5,R.y=t.clientY/e.height-.5}));const T=new k;let Y=0;const K=()=>{const t=T.getElapsedTime(),o=t-Y;Y=t,N.position.y=-H/e.height*4;const i=.5*R.x,s=.5*-R.y;G.position.x+=5*(i-G.position.x)*o,G.position.y+=5*(s-G.position.y)*o;for(const e of P)e.rotation.x+=.1*o,e.rotation.y+=.12*o;C.render(r,N),requestAnimationFrame(K)};K()};return e("div",{className:"dashboardPage",children:[t("canvas",{className:"homeGl",ref:o}),t("section",{className:"section",children:t("h2",{children:"首页展示"})}),t("section",{className:"section",children:t("h2",{children:"作品简介"})}),t("section",{className:"section",children:t("h2",{children:"底部展示"})})]})},A=()=>{const[i,s]=r.useState(!1),[n,a]=r.useState(!1),c=N(),{pathname:m}=C();r.useEffect((()=>{a("/home"!==m)}),[m]);const d=e=>{switch(e){case"sea":c("/home/ocean");break;case"nature":c("/home/nature");break;case"earth":c("/home/earth");break;case"world":c("/home/world");break;default:c("/home")}s(!1)};return e(o,{children:[t(M,{className:"nav",type:"primary",onClick:()=>{s(!0)},children:"导航"}),e(S,{bodyStyle:{backgroundColor:"#3F51B6",color:"#fff"},headerStyle:{backgroundColor:"#3F51B6",color:"#fff"},title:"页面菜单",placement:"left",onClose:()=>{s(!1)},open:i,children:[n?t("p",{className:"drawItem",onClick:()=>d("home"),children:"返回首页"}):"",t("p",{className:"drawItem",onClick:()=>d("sea"),children:"海岛风情"}),t("p",{className:"drawItem",onClick:()=>d("nature"),children:"自然风光"}),t("p",{className:"drawItem",onClick:()=>d("earth"),children:"数字地球"}),t("p",{className:"drawItem",onClick:()=>d("world"),children:"中国地图"})]})]})},F=()=>{const{pathname:r}=C();return e(o,{children:[t(A,{}),"/home"==r?t(E,{}):"",t(z,{})]})};export{F as default};
