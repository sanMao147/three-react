import{f as e,d as t,g as n,b as a}from"./@babel-ebff8eee.js";import{r}from"./react-aa034a1c.js";import{P as o}from"./@rc-component-a65194ac.js";import{a as l,K as s,b as c}from"./rc-util-fd3bf20b.js";import{c as i}from"./classnames-46b2866a.js";import{C as u}from"./rc-motion-0b6d8135.js";var d=function(t){var n=t.prefixCls,a=t.className,o=t.style,l=t.children,s=t.containerRef;return r.createElement(r.Fragment,null,r.createElement("div",{className:i("".concat(n,"-content"),a),style:e({},o),"aria-modal":"true",role:"dialog",ref:s},l))},f=r.createContext(null);function m(e){return"string"==typeof e&&String(Number(e))===e?(l(!1,"Invalid value type of `width` or `height` which should be number type instead."),Number(e)):e}var v={width:0,height:0,overflow:"hidden",outline:"none",position:"absolute"};var p=r.forwardRef((function(o,l){var c,p,h,y,b=o.prefixCls,C=o.open,k=o.placement,E=o.inline,g=o.push,x=o.forceRender,w=o.autoFocus,N=o.keyboard,R=o.rootClassName,S=o.rootStyle,I=o.zIndex,j=o.className,D=o.style,O=o.motion,F=o.width,K=o.height,P=o.children,z=o.contentWrapperStyle,A=o.mask,B=o.maskClosable,L=o.maskMotion,M=o.maskClassName,T=o.maskStyle,X=o.afterOpenChange,Y=o.onClose,H=r.useRef(),V=r.useRef(),W=r.useRef();r.useImperativeHandle(l,(function(){return H.current})),r.useEffect((function(){var e;C&&w&&(null===(e=H.current)||void 0===e||e.focus({preventScroll:!0}))}),[C]);var q=r.useState(!1),G=t(q,2),J=G[0],Q=G[1],U=r.useContext(f),Z=null!==(c=null!==(p=null===(h=!1===g?{distance:0}:!0===g?{}:g||{})||void 0===h?void 0:h.distance)&&void 0!==p?p:null==U?void 0:U.pushDistance)&&void 0!==c?c:180,$=r.useMemo((function(){return{pushDistance:Z,push:function(){Q(!0)},pull:function(){Q(!1)}}}),[Z]);r.useEffect((function(){var e,t;C?null==U||null===(e=U.push)||void 0===e||e.call(U):null==U||null===(t=U.pull)||void 0===t||t.call(U)}),[C]),r.useEffect((function(){return function(){var e;null==U||null===(e=U.pull)||void 0===e||e.call(U)}}),[]);var _=A&&r.createElement(u,n({key:"mask"},L,{visible:C}),(function(t,n){var a=t.className,o=t.style;return r.createElement("div",{className:i("".concat(b,"-mask"),a,M),style:e(e({},o),T),onClick:B&&C?Y:void 0,ref:n})})),ee="function"==typeof O?O(k):O,te={};if(J&&Z)switch(k){case"top":te.transform="translateY(".concat(Z,"px)");break;case"bottom":te.transform="translateY(".concat(-Z,"px)");break;case"left":te.transform="translateX(".concat(Z,"px)");break;default:te.transform="translateX(".concat(-Z,"px)")}"left"===k||"right"===k?te.width=m(F):te.height=m(K);var ne=r.createElement(u,n({key:"panel"},ee,{visible:C,forceRender:x,onVisibleChanged:function(e){null==X||X(e)},removeOnLeave:!1,leavedClassName:"".concat(b,"-content-wrapper-hidden")}),(function(t,n){var a=t.className,o=t.style;return r.createElement("div",{className:i("".concat(b,"-content-wrapper"),a),style:e(e(e({},te),o),z)},r.createElement(d,{containerRef:n,prefixCls:b,className:j,style:D},P))})),ae=e({},S);return I&&(ae.zIndex=I),r.createElement(f.Provider,{value:$},r.createElement("div",{className:i(b,"".concat(b,"-").concat(k),R,(y={},a(y,"".concat(b,"-open"),C),a(y,"".concat(b,"-inline"),E),y)),style:ae,tabIndex:-1,ref:H,onKeyDown:function(e){var t=e.keyCode,n=e.shiftKey;switch(t){case s.TAB:var a;if(t===s.TAB)if(n||document.activeElement!==W.current){var r;if(n&&document.activeElement===V.current)null===(r=W.current)||void 0===r||r.focus({preventScroll:!0})}else null===(a=V.current)||void 0===a||a.focus({preventScroll:!0});break;case s.ESC:Y&&N&&(e.stopPropagation(),Y(e))}}},_,r.createElement("div",{tabIndex:0,ref:V,style:v,"aria-hidden":"true","data-sentinel":"start"}),ne,r.createElement("div",{tabIndex:0,ref:W,style:v,"aria-hidden":"true","data-sentinel":"end"})))})),h=function(n){var a=n.open,l=void 0!==a&&a,s=n.prefixCls,i=void 0===s?"rc-drawer":s,u=n.placement,d=void 0===u?"right":u,f=n.autoFocus,m=void 0===f||f,v=n.keyboard,h=void 0===v||v,y=n.width,b=void 0===y?378:y,C=n.mask,k=void 0===C||C,E=n.maskClosable,g=void 0===E||E,x=n.getContainer,w=n.forceRender,N=n.afterOpenChange,R=n.destroyOnClose,S=r.useState(!1),I=t(S,2),j=I[0],D=I[1],O=r.useState(!1),F=t(O,2),K=F[0],P=F[1];c((function(){P(l)}),[l]);var z=r.useRef(),A=r.useRef();if(c((function(){K&&(A.current=document.activeElement)}),[K]),!w&&!j&&!K&&R)return null;var B=e(e({},n),{},{open:K,prefixCls:i,placement:d,autoFocus:m,keyboard:h,width:b,mask:k,maskClosable:g,inline:!1===x,afterOpenChange:function(e){var t,n;D(e),null==N||N(e),e||!A.current||(null===(t=z.current)||void 0===t?void 0:t.contains(A.current))||null===(n=A.current)||void 0===n||n.focus()},ref:z});return r.createElement(o,{open:K||w||j,autoDestroy:!1,getContainer:x,autoLock:k&&(K||j)},r.createElement(p,B))};export{h as D};