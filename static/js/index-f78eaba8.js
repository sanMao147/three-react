import{j as e,a as t}from"./index-d5771912.js";import{a as n}from"./axios-1aa4d7e2.js";import{r as a}from"./react-aa034a1c.js";import{S as s,P as o,W as i,A as r,w as c,H as d,V as p,I as h,J as l,K as w,a as m,i as g,O as u,u as f,Q as S,G as j,y as x,U as v,X as z,Y as b,Z as y,r as P,D as A,_ as E,s as M}from"./three-b38ba3aa.js";import{m as C}from"./d3-geo-80b69124.js";import"./react-dom-67b4aaa0.js";import"./classnames-46b2866a.js";import"./scheduler-6fdbf8de.js";import"./react-router-dom-824b8f8a.js";import"./react-router-ca90130e.js";import"./@remix-run-f8738e57.js";import"./d3-array-7cca7373.js";n.defaults.timeout=6e4,n.interceptors.request.use((e=>(e.headers={"Content-Type":"application/json;charset=UTF-8"},e)),(e=>Promise.reject(e))),n.interceptors.response.use((e=>e),(e=>{const{response:t}=e;if(t)return Promise.reject(t.data)}));const T=()=>{const T=C().center([104,37.5]).scale(80).translate([0,0]),[W,F]=a.useState(""),[H,D]=a.useState({left:"",top:""});let O=a.useRef(null),_=null,J=null,R=null;a.useEffect((()=>{X()}),[]);const X=async()=>{const e=await function(){return e={url:"/three-react/json/china.json",method:"get"},new Promise(((t,a)=>{n(e).then((e=>{t(e.data)})).catch((e=>{a(e)}))}));var e}(),t=JSON.parse(JSON.stringify(e)),a={width:window.innerWidth,height:window.innerHeight};J=new s;const j=new o(75,a.width/a.height,1,5e3);j.position.set(0,-60,70),j.lookAt(0,0,0),J.add(j);const x=new i({canvas:O.current,antialias:!0});x.setPixelRatio(Math.min(window.devicePixelRatio,2)),x.setSize(a.width,a.height),x.toneMapping=r,x.shadowMap.enabled=!0,x.toneMappingExposure=1.25,x.outputEncoding=c,x.setClearColor(16777215,0);const v=new d({maxFar:1e3,cascades:4,mode:"practical",parent:J,shadowMapSize:1024,lightDirection:new p(-1,-1,-1).normalize(),camera:j}),z=new h(v);z.visible=!1,J.add(z);const b=new l({color:202807,metalness:0,roughness:1,opacity:.5,transparent:!0});_=new w,J.add(_);const y=new m(new g(2e3,2e3,1,1),b);y.position.z=0,y.receiveShadow=!0,J.add(y);const P=new u(j,O.current);P.target.set(0,0,0),P.enableDamping=!0,P.enablePan=!1,P.minPolarAngle=1,P.maxPolarAngle=1.6,P.minAzimuthAngle=-.2,P.maxAzimuthAngle=.2,P.maxDistance=250,Y(t),$(),window.addEventListener("resize",(()=>{j.aspect=window.innerWidth/window.innerHeight,j.updateProjectionMatrix(),x.setSize(window.innerWidth,window.innerHeight)}),!1);const A=new f;let E=new S;window.addEventListener("mousemove",(e=>{E.x=e.clientX/window.innerWidth*2-1,E.y=-e.clientY/window.innerHeight*2+1,D({left:e.clientX+10+"px",top:e.clientY-20+"px"})}),!1);const M=()=>{if(P.update(),j.updateMatrixWorld(),v.update(),A&&R.children.length>0){A.setFromCamera(E,j);const e=A.intersectObjects(R.children);if(1===e.length){const t=e[0].object.parent.properties;F(t.name)}else F("")}x.render(J,j),requestAnimationFrame(M)};M()},Y=e=>{R=new j;(new x).load(["/three-react/static/png/px-cb335eb9.png","/three-react/static/png/nx-7d0ddd41.png","/three-react/static/png/py-80a5d17d.png","/three-react/static/png/ny-2161698a.png","/three-react/static/png/pz-92089d82.png","/three-react/static/png/nz-253635ef.png"],(t=>{_.copy(v.fromCubeTexture(t)),e.features.forEach(((e,t)=>{const n=new z,{coordinates:a}=e.geometry,s=16777215*Math.random();if(a.forEach((e=>{e.forEach((e=>{const a=new b;for(let t=0;t<e.length;t++){let[n,s]=T(e[t]);0===t&&a.moveTo(n,-s),a.lineTo(n,-s)}const o=new y(a,{depth:4,bevelEnabled:!0,bevelSegments:1,bevelThickness:.2}),i=new l({color:s,metalness:1}),r=new l({color:s,metalness:1,roughness:1}),c=new m(o,[i,r]);t%2==0&&c.scale.set(1,1,1.2),c.castShadow=!0,c.receiveShadow=!0,c._color=s,n.add(c)}))})),n.properties=e.properties,e.properties.centroid){const[t,a]=T(e.properties.centroid);n.properties._centroid=[t,a]}R.add(n)})),J.environment=t,t.dispose(),J.add(R)}))},$=()=>{const e=new j;let t=new P(16777215,.2);const n=new A(16777215,.5);n.position.set(20,-50,20),n.castShadow=!0,n.shadow.mapSize.width=1024,n.shadow.mapSize.height=1024;let a=new E("#80edff","#75baff",.3);a.position.set(20,-50,0);const s=new M(16777215,.5);s.position.set(20,-50,50),s.castShadow=!0,s.shadow.mapSize.width=1024,s.shadow.mapSize.height=1024;const o=new M(16777215,.5);o.position.set(50,-50,20),o.castShadow=!0,o.shadow.mapSize.width=1024,o.shadow.mapSize.height=1024;const i=new M(16777215,.5);i.position.set(-50,-50,20),i.castShadow=!0,i.shadow.mapSize.width=1024,i.shadow.mapSize.height=1024,e.add(t,i,n,s,o,a),J.add(e)},k={position:"absolute",top:`${H.top}`,left:`${H.left}`,color:"#000",userSelect:"none"};return e("div",{style:{position:"relative"},children:[t("div",{style:k,children:W}),t("canvas",{ref:O})]})};export{T as default};
