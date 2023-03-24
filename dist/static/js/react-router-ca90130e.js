import{i as e,g as t,r,j as n,A as o,p as a,s as l,m as s,a as u}from"./@remix-run-f8738e57.js";import{a as i,r as c}from"./react-aa034a1c.js";
/**
 * React Router v6.9.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const p="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},{useState:d,useEffect:m,useLayoutEffect:h,useDebugValue:v}=i;function f(e){const t=e.getSnapshot,r=e.value;try{const e=t();return!p(r,e)}catch(n){return!0}}const E="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t,r){return t()}:function(e,t,r){const n=t(),[{inst:o},a]=d({inst:{value:n,getSnapshot:t}});return h((()=>{o.value=n,o.getSnapshot=t,f(o)&&a({inst:o})}),[e,n,t]),m((()=>(f(o)&&a({inst:o}),e((()=>{f(o)&&a({inst:o})})))),[e]),v(n),n},g="useSyncExternalStore"in i?i.useSyncExternalStore:E,y=c.createContext(null),x=c.createContext(null),C=c.createContext(null),b=c.createContext(null),B=c.createContext({outlet:null,matches:[]}),R=c.createContext(null);function S(){return S=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},S.apply(this,arguments)}function P(){return null!=c.useContext(b)}function U(){return P()||e(!1),c.useContext(b).location}function k(){P()||e(!1);let{basename:o,navigator:a}=c.useContext(C),{matches:l}=c.useContext(B),{pathname:s}=U(),u=JSON.stringify(t(l).map((e=>e.pathnameBase))),i=c.useRef(!1);return c.useEffect((()=>{i.current=!0})),c.useCallback((function(e,t){if(void 0===t&&(t={}),!i.current)return;if("number"==typeof e)return void a.go(e);let l=r(e,JSON.parse(u),s,"path"===t.relative);"/"!==o&&(l.pathname="/"===l.pathname?o:n([o,l.pathname])),(t.replace?a.replace:a.push)(l,t.state,t)}),[o,a,u,s])}const O=c.createContext(null);function j(){let t=function(){var t;let r=c.useContext(R),n=function(t){let r=c.useContext(x);return r||e(!1),r}(M.UseRouteError),o=function(t){let r=function(t){let r=c.useContext(B);return r||e(!1),r}(),n=r.matches[r.matches.length-1];return n.route.id||e(!1),n.route.id}(M.UseRouteError);return r||(null==(t=n.errors)?void 0:t[o])}(),r=u(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null;return c.createElement(c.Fragment,null,c.createElement("h2",null,"Unexpected Application Error!"),c.createElement("h3",{style:{fontStyle:"italic"}},r),n?c.createElement("pre",{style:{padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"}},n):null,null)}class L extends c.Component{constructor(e){super(e),this.state={location:e.location,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location?{error:e.error,location:e.location}:{error:e.error||t.error,location:t.location}}componentDidCatch(e,t){}render(){return this.state.error?c.createElement(B.Provider,{value:this.props.routeContext},c.createElement(R.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function D(e){let{routeContext:t,match:r,children:n}=e,o=c.useContext(y);return o&&o.static&&o.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=r.route.id),c.createElement(B.Provider,{value:t},n)}var w,M,N,A;function F(e){let{fallbackElement:t,router:r}=e,n=c.useCallback((()=>r.state),[r]),o=g(r.subscribe,n,n),a=c.useMemo((()=>({createHref:r.createHref,encodeLocation:r.encodeLocation,go:e=>r.navigate(e),push:(e,t,n)=>r.navigate(e,{state:t,preventScrollReset:null==n?void 0:n.preventScrollReset}),replace:(e,t,n)=>r.navigate(e,{replace:!0,state:t,preventScrollReset:null==n?void 0:n.preventScrollReset})})),[r]),l=r.basename||"/",s=c.useMemo((()=>({router:r,navigator:a,static:!1,basename:l})),[r,a,l]);return c.createElement(c.Fragment,null,c.createElement(y.Provider,{value:s},c.createElement(x.Provider,{value:o},c.createElement(H,{basename:r.basename,location:r.state.location,navigationType:r.state.historyAction,navigator:a},r.state.initialized?c.createElement(I,null):t))),null)}function T(t){let{to:r,replace:n,state:o,relative:a}=t;P()||e(!1);let l=c.useContext(x),s=k();return c.useEffect((()=>{l&&"idle"!==l.navigation.state||s(r,{replace:n,state:o,relative:a})})),null}function z(e){return function(e){let t=c.useContext(B).outlet;return t?c.createElement(O.Provider,{value:e},t):t}(e.context)}function J(t){e(!1)}function H(t){let{basename:r="/",children:n=null,location:s,navigationType:u=o.Pop,navigator:i,static:p=!1}=t;P()&&e(!1);let d=r.replace(/^\/*/,"/"),m=c.useMemo((()=>({basename:d,navigator:i,static:p})),[d,i,p]);"string"==typeof s&&(s=a(s));let{pathname:h="/",search:v="",hash:f="",state:E=null,key:g="default"}=s,y=c.useMemo((()=>{let e=l(h,d);return null==e?null:{location:{pathname:e,search:v,hash:f,state:E,key:g},navigationType:u}}),[d,h,v,f,E,g,u]);return null==y?null:c.createElement(C.Provider,{value:m},c.createElement(b.Provider,{children:n,value:y}))}function I(t){let{children:r,location:l}=t,u=c.useContext(y);return function(t,r){P()||e(!1);let{navigator:l}=c.useContext(C),u=c.useContext(x),{matches:i}=c.useContext(B),p=i[i.length-1],d=p?p.params:{};!p||p.pathname;let m=p?p.pathnameBase:"/";p&&p.route;let h,v=U();if(r){var f;let t="string"==typeof r?a(r):r;"/"===m||(null==(f=t.pathname)?void 0:f.startsWith(m))||e(!1),h=t}else h=v;let E=h.pathname||"/",g="/"===m?E:E.slice(m.length)||"/",y=s(t,{pathname:g}),R=function(t,r,n){if(void 0===r&&(r=[]),null==t){if(null==n||!n.errors)return null;t=n.matches}let o=t,a=null==n?void 0:n.errors;if(null!=a){let t=o.findIndex((e=>e.route.id&&(null==a?void 0:a[e.route.id])));t>=0||e(!1),o=o.slice(0,Math.min(o.length,t+1))}return o.reduceRight(((e,t,l)=>{let s=t.route.id?null==a?void 0:a[t.route.id]:null,u=null;n&&(u=t.route.ErrorBoundary?c.createElement(t.route.ErrorBoundary,null):t.route.errorElement?t.route.errorElement:c.createElement(j,null));let i=r.concat(o.slice(0,l+1)),p=()=>{let r=e;return s?r=u:t.route.Component?r=c.createElement(t.route.Component,null):t.route.element&&(r=t.route.element),c.createElement(D,{match:t,routeContext:{outlet:e,matches:i},children:r})};return n&&(t.route.ErrorBoundary||t.route.errorElement||0===l)?c.createElement(L,{location:n.location,component:u,error:s,children:p(),routeContext:{outlet:null,matches:i}}):p()}),null)}(y&&y.map((e=>Object.assign({},e,{params:Object.assign({},d,e.params),pathname:n([m,l.encodeLocation?l.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:"/"===e.pathnameBase?m:n([m,l.encodeLocation?l.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])}))),i,u||void 0);return r&&R?c.createElement(b.Provider,{value:{location:S({pathname:"/",search:"",hash:"",state:null,key:"default"},h),navigationType:o.Pop}},R):R}(u&&!r?u.router.routes:V(r),l)}function V(t,r){void 0===r&&(r=[]);let n=[];return c.Children.forEach(t,((t,o)=>{if(!c.isValidElement(t))return;if(t.type===c.Fragment)return void n.push.apply(n,V(t.props.children,r));t.type!==J&&e(!1),t.props.index&&t.props.children&&e(!1);let a=[...r,o],l={id:t.props.id||a.join("-"),caseSensitive:t.props.caseSensitive,element:t.props.element,Component:t.props.Component,index:t.props.index,path:t.props.path,loader:t.props.loader,action:t.props.action,errorElement:t.props.errorElement,ErrorBoundary:t.props.ErrorBoundary,hasErrorBoundary:null!=t.props.ErrorBoundary||null!=t.props.errorElement,shouldRevalidate:t.props.shouldRevalidate,handle:t.props.handle,lazy:t.props.lazy};t.props.children&&(l.children=V(t.props.children,a)),n.push(l)})),n}function W(e){return Boolean(e.ErrorBoundary)||Boolean(e.errorElement)}(A=w||(w={})).UseBlocker="useBlocker",A.UseRevalidator="useRevalidator",function(e){e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator"}(M||(M={})),function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"}(N||(N={})),new Promise((()=>{}));export{T as N,z as O,F as R,U as a,W as d,k as u};