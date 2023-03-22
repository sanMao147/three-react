import{f as e,d as t,g as a,b as n}from"./@babel-ebff8eee.js";import{P as r}from"./@rc-component-224fb8a7.js";import{a as c,K as o,b as l}from"./rc-util-1ed7d15f.js";import{c as s}from"./classnames-6d47fc8c.js";import{C as i}from"./rc-motion-b896e247.js";var u=function(t){var a=t.prefixCls,n=t.className,r=t.style,c=t.children,o=t.containerRef;return React.createElement(React.Fragment,null,React.createElement("div",{className:s("".concat(a,"-content"),n),style:e({},r),"aria-modal":"true",role:"dialog",ref:o},c))},d=React.createContext(null);function f(e){return"string"==typeof e&&String(Number(e))===e?(c(!1,"Invalid value type of `width` or `height` which should be number type instead."),Number(e)):e}var m={width:0,height:0,overflow:"hidden",outline:"none",position:"absolute"};var v=React.forwardRef((function(r,c){var l,v,p,R,h=r.prefixCls,y=r.open,b=r.placement,C=r.inline,k=r.push,E=r.forceRender,g=r.autoFocus,x=r.keyboard,w=r.rootClassName,N=r.rootStyle,S=r.zIndex,I=r.className,j=r.style,D=r.motion,O=r.width,F=r.height,K=r.children,P=r.contentWrapperStyle,z=r.mask,A=r.maskClosable,B=r.maskMotion,L=r.maskClassName,M=r.maskStyle,T=r.afterOpenChange,X=r.onClose,Y=React.useRef(),H=React.useRef(),V=React.useRef();React.useImperativeHandle(c,(function(){return Y.current})),React.useEffect((function(){var e;y&&g&&(null===(e=Y.current)||void 0===e||e.focus({preventScroll:!0}))}),[y]);var W=React.useState(!1),q=t(W,2),G=q[0],J=q[1],Q=React.useContext(d),U=null!==(l=null!==(v=null===(p=!1===k?{distance:0}:!0===k?{}:k||{})||void 0===p?void 0:p.distance)&&void 0!==v?v:null==Q?void 0:Q.pushDistance)&&void 0!==l?l:180,Z=React.useMemo((function(){return{pushDistance:U,push:function(){J(!0)},pull:function(){J(!1)}}}),[U]);React.useEffect((function(){var e,t;y?null==Q||null===(e=Q.push)||void 0===e||e.call(Q):null==Q||null===(t=Q.pull)||void 0===t||t.call(Q)}),[y]),React.useEffect((function(){return function(){var e;null==Q||null===(e=Q.pull)||void 0===e||e.call(Q)}}),[]);var $=z&&React.createElement(i,a({key:"mask"},B,{visible:y}),(function(t,a){var n=t.className,r=t.style;return React.createElement("div",{className:s("".concat(h,"-mask"),n,L),style:e(e({},r),M),onClick:A&&y?X:void 0,ref:a})})),_="function"==typeof D?D(b):D,ee={};if(G&&U)switch(b){case"top":ee.transform="translateY(".concat(U,"px)");break;case"bottom":ee.transform="translateY(".concat(-U,"px)");break;case"left":ee.transform="translateX(".concat(U,"px)");break;default:ee.transform="translateX(".concat(-U,"px)")}"left"===b||"right"===b?ee.width=f(O):ee.height=f(F);var te=React.createElement(i,a({key:"panel"},_,{visible:y,forceRender:E,onVisibleChanged:function(e){null==T||T(e)},removeOnLeave:!1,leavedClassName:"".concat(h,"-content-wrapper-hidden")}),(function(t,a){var n=t.className,r=t.style;return React.createElement("div",{className:s("".concat(h,"-content-wrapper"),n),style:e(e(e({},ee),r),P)},React.createElement(u,{containerRef:a,prefixCls:h,className:I,style:j},K))})),ae=e({},N);return S&&(ae.zIndex=S),React.createElement(d.Provider,{value:Z},React.createElement("div",{className:s(h,"".concat(h,"-").concat(b),w,(R={},n(R,"".concat(h,"-open"),y),n(R,"".concat(h,"-inline"),C),R)),style:ae,tabIndex:-1,ref:Y,onKeyDown:function(e){var t=e.keyCode,a=e.shiftKey;switch(t){case o.TAB:var n;if(t===o.TAB)if(a||document.activeElement!==V.current){var r;if(a&&document.activeElement===H.current)null===(r=V.current)||void 0===r||r.focus({preventScroll:!0})}else null===(n=H.current)||void 0===n||n.focus({preventScroll:!0});break;case o.ESC:X&&x&&(e.stopPropagation(),X(e))}}},$,React.createElement("div",{tabIndex:0,ref:H,style:m,"aria-hidden":"true","data-sentinel":"start"}),te,React.createElement("div",{tabIndex:0,ref:V,style:m,"aria-hidden":"true","data-sentinel":"end"})))})),p=function(a){var n=a.open,c=void 0!==n&&n,o=a.prefixCls,s=void 0===o?"rc-drawer":o,i=a.placement,u=void 0===i?"right":i,d=a.autoFocus,f=void 0===d||d,m=a.keyboard,p=void 0===m||m,R=a.width,h=void 0===R?378:R,y=a.mask,b=void 0===y||y,C=a.maskClosable,k=void 0===C||C,E=a.getContainer,g=a.forceRender,x=a.afterOpenChange,w=a.destroyOnClose,N=React.useState(!1),S=t(N,2),I=S[0],j=S[1],D=React.useState(!1),O=t(D,2),F=O[0],K=O[1];l((function(){K(c)}),[c]);var P=React.useRef(),z=React.useRef();if(l((function(){F&&(z.current=document.activeElement)}),[F]),!g&&!I&&!F&&w)return null;var A=e(e({},a),{},{open:F,prefixCls:s,placement:u,autoFocus:f,keyboard:p,width:h,mask:b,maskClosable:k,inline:!1===E,afterOpenChange:function(e){var t,a;j(e),null==x||x(e),e||!z.current||(null===(t=P.current)||void 0===t?void 0:t.contains(z.current))||null===(a=z.current)||void 0===a||a.focus()},ref:P});return React.createElement(r,{open:F||g||I,autoDestroy:!1,getContainer:E,autoLock:b&&(F||I)},React.createElement(v,A))};export{p as D};
