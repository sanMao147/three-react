import{r as e}from"./react-is-554aa597.js";import{e as n,f as t,n as r,c as i,d as a,i as u,j as o}from"./@babel-ebff8eee.js";function c(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=[];return React.Children.forEach(n,(function(n){(null!=n||t.keepEmpty)&&(Array.isArray(n)?r=r.concat(c(n)):e.isFragment(n)&&n.props?r=r.concat(c(n.props.children,t)):r.push(n))})),r}var f={};function s(e,n){}function E(e,n){var t,r;t=s,r=n,e||f[r]||(t(!1,r),f[r]=!0)}function d(e,n,t){var r=React.useRef({});return"value"in r.current&&!t(r.current.condition,n)||(r.current.value=e(),r.current.condition=n),r.current.value}function l(e,t){"function"==typeof e?e(t):"object"===n(e)&&e&&"current"in e&&(e.current=t)}function v(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];var r=n.filter((function(e){return e}));return r.length<=1?r[0]:function(e){n.forEach((function(n){l(n,e)}))}}function N(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return d((function(){return v.apply(void 0,n)}),n,(function(e,n){return e.length===n.length&&e.every((function(e,t){return e===n[t]}))}))}function p(n){var t,r,i=e.isMemo(n)?n.type.type:n.type;return!!("function"!=typeof i||null!==(t=i.prototype)&&void 0!==t&&t.render)&&!!("function"!=typeof n||null!==(r=n.prototype)&&void 0!==r&&r.render)}function h(e){return(n=e)instanceof HTMLElement||n instanceof SVGElement?e:e instanceof React.Component?ReactDOM.findDOMNode(e):null;var n}function _(e,n){var r=t({},e);return Array.isArray(n)&&n.forEach((function(e){delete r[e]})),r}function A(e,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=new Set;return function e(t,a){var u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,o=i.has(t);if(E(!o,"Warning: There may be circular references"),o)return!1;if(t===a)return!0;if(r&&u>1)return!1;i.add(t);var c=u+1;if(Array.isArray(t)){if(!Array.isArray(a)||t.length!==a.length)return!1;for(var f=0;f<t.length;f++)if(!e(t[f],a[f],c))return!1;return!0}if(t&&a&&"object"===n(t)&&"object"===n(a)){var s=Object.keys(t);return s.length===Object.keys(a).length&&s.every((function(n){return e(t[n],a[n],c)}))}return!1}(e,t)}function T(){return!("undefined"==typeof window||!window.document||!window.document.createElement)}var M="data-rc-order",S="rc-util-key",R=new Map;function y(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).mark;return e?e.startsWith("data-")?e:"data-".concat(e):S}function O(e){return e.attachTo?e.attachTo:document.querySelector("head")||document.body}function U(e){return Array.from((R.get(e)||e).children).filter((function(e){return"STYLE"===e.tagName}))}function C(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!T())return null;var t,r=n.csp,i=n.prepend,a=document.createElement("style");a.setAttribute(M,"queue"===(t=i)?"prependQueue":t?"prepend":"append"),null!=r&&r.nonce&&(a.nonce=null==r?void 0:r.nonce),a.innerHTML=e;var u=O(n),o=u.firstChild;if(i){if("queue"===i){var c=U(u).filter((function(e){return["prepend","prependQueue"].includes(e.getAttribute(M))}));if(c.length)return u.insertBefore(a,c[c.length-1].nextSibling),a}u.insertBefore(a,o)}else u.appendChild(a);return a}function m(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return U(O(n)).find((function(t){return t.getAttribute(y(n))===e}))}function g(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=m(e,n);t&&O(n).removeChild(t)}function I(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!function(e,n){var t=R.get(e);if(!t||!function(e,n){if(!e)return!1;if(e.contains)return e.contains(n);for(var t=n;t;){if(t===e)return!0;t=t.parentNode}return!1}(document,t)){var r=C("",n),i=r.parentNode;R.set(e,i),e.removeChild(r)}}(O(t),t);var r,i,a,u=m(n,t);if(u)return null!==(r=t.csp)&&void 0!==r&&r.nonce&&u.nonce!==(null===(i=t.csp)||void 0===i?void 0:i.nonce)&&(u.nonce=null===(a=t.csp)||void 0===a?void 0:a.nonce),u.innerHTML!==e&&(u.innerHTML=e),u;var o=C(e,t);return o.setAttribute(y(t),n),o}function L(e,n){for(var t=e,r=0;r<n.length;r+=1){if(null==t)return;t=t[n[r]]}return t}function P(e,n,a,u){if(!n.length)return a;var o,c=r(n),f=c[0],s=c.slice(1);return o=e||"number"!=typeof f?Array.isArray(e)?i(e):t({},e):[],u&&void 0===a&&1===s.length?delete o[f][s[0]]:o[f]=P(o[f],s,a,u),o}function w(e,n,t){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return n.length&&r&&void 0===t&&!L(e,n.slice(0,-1))?e:P(e,n,t,r)}var F=function(e){return+setTimeout(e,16)},b=function(e){return clearTimeout(e)};"undefined"!=typeof window&&"requestAnimationFrame"in window&&(F=function(e){return window.requestAnimationFrame(e)},b=function(e){return window.cancelAnimationFrame(e)});var H=0,K=new Map;function D(e){K.delete(e)}var W=function(e){var n=H+=1;return function t(r){if(0===r)D(n),e();else{var i=F((function(){t(r-1)}));K.set(n,i)}}(arguments.length>1&&void 0!==arguments[1]?arguments[1]:1),n};function B(e){var n=React.useRef(!1),t=React.useState(e),r=a(t,2),i=r[0],u=r[1];return React.useEffect((function(){return n.current=!1,function(){n.current=!0}}),[]),[i,function(e,t){t&&n.current||u(e)}]}W.cancel=function(e){var n=K.get(e);return D(n),b(n)};var G,Q={MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,META:91,WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221,WIN_KEY:224,MAC_FF_META:224,WIN_IME:229,isTextModifyingKeyEvent:function(e){var n=e.keyCode;if(e.altKey&&!e.ctrlKey||e.metaKey||n>=Q.F1&&n<=Q.F12)return!1;switch(n){case Q.ALT:case Q.CAPS_LOCK:case Q.CONTEXT_MENU:case Q.CTRL:case Q.DOWN:case Q.END:case Q.ESC:case Q.HOME:case Q.INSERT:case Q.LEFT:case Q.MAC_FF_META:case Q.META:case Q.NUMLOCK:case Q.NUM_CENTER:case Q.PAGE_DOWN:case Q.PAGE_UP:case Q.PAUSE:case Q.PRINT_SCREEN:case Q.RIGHT:case Q.SHIFT:case Q.UP:case Q.WIN_KEY:case Q.WIN_KEY_RIGHT:return!1;default:return!0}},isCharacterKey:function(e){if(e>=Q.ZERO&&e<=Q.NINE)return!0;if(e>=Q.NUM_ZERO&&e<=Q.NUM_MULTIPLY)return!0;if(e>=Q.A&&e<=Q.Z)return!0;if(-1!==window.navigator.userAgent.indexOf("WebKit")&&0===e)return!0;switch(e){case Q.SPACE:case Q.QUESTION_MARK:case Q.NUM_PLUS:case Q.NUM_MINUS:case Q.NUM_PERIOD:case Q.NUM_DIVISION:case Q.SEMICOLON:case Q.DASH:case Q.EQUALS:case Q.COMMA:case Q.PERIOD:case Q.SLASH:case Q.APOSTROPHE:case Q.SINGLE_QUOTE:case Q.OPEN_SQUARE_BRACKET:case Q.BACKSLASH:case Q.CLOSE_SQUARE_BRACKET:return!0;default:return!1}}},x=t({},ReactDOM),j=x.version,k=x.render,Y=x.unmountComponentAtNode;try{Number((j||"").split(".")[0])>=18&&(G=x.createRoot)}catch(ae){}function V(e){var t=x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;t&&"object"===n(t)&&(t.usingClientEntryPoint=e)}var q="__rc_react_root__";function Z(e,n){G?function(e,n){V(!0);var t=n[q]||G(n);V(!1),t.render(e),n[q]=t}(e,n):k(e,n)}function X(e){return J.apply(this,arguments)}function J(){return(J=u(o().mark((function e(n){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.resolve().then((function(){var e;null===(e=n[q])||void 0===e||e.unmount(),delete n[q]})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function z(e){Y(e)}function $(e){return ee.apply(this,arguments)}function ee(){return(ee=u(o().mark((function e(n){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===G){e.next=2;break}return e.abrupt("return",X(n));case 2:z(n);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}const ne=function(e){if(!e)return!1;if(e instanceof Element){if(e.offsetParent)return!0;if(e.getBBox){var n=e.getBBox(),t=n.width,r=n.height;if(t||r)return!0}if(e.getBoundingClientRect){var i=e.getBoundingClientRect(),a=i.width,u=i.height;if(a||u)return!0}}return!1};var te,re=T()?React.useLayoutEffect:React.useEffect;function ie(e){if("undefined"==typeof document)return 0;if(e||void 0===te){var n=document.createElement("div");n.style.width="100%",n.style.height="200px";var t=document.createElement("div"),r=t.style;r.position="absolute",r.top="0",r.left="0",r.pointerEvents="none",r.visibility="hidden",r.width="200px",r.height="150px",r.overflow="hidden",t.appendChild(n),document.body.appendChild(t);var i=n.offsetWidth;t.style.overflow="scroll";var a=n.offsetWidth;i===a&&(a=t.clientWidth),document.body.removeChild(t),te=i-a}return te}export{Q as K,E as a,re as b,T as c,N as d,d as e,Z as f,ie as g,W as h,A as i,$ as j,v as k,ne as l,L as m,w as n,_ as o,B as p,l as q,g as r,p as s,c as t,I as u,h as v,s as w};