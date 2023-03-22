import{d as r}from"./react-router-0527009b.js";import{c as e,d as t,E as o}from"./@remix-run-7a90bf55.js";
/**
 * React Router DOM v6.9.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function n(){return n=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(r[o]=t[o])}return r},n.apply(this,arguments)}function s(o,n){return e({basename:null==n?void 0:n.basename,history:t({window:null==n?void 0:n.window}),hydrationData:(null==n?void 0:n.hydrationData)||a(),routes:o,detectErrorBoundary:r}).initialize()}function a(){var r;let e=null==(r=window)?void 0:r.__staticRouterHydrationData;return e&&e.errors&&(e=n({},e,{errors:i(e.errors)})),e}function i(r){if(!r)return null;let e=Object.entries(r),t={};for(let[n,s]of e)if(s&&"RouteErrorResponse"===s.__type)t[n]=new o(s.status,s.statusText,s.data,!0===s.internal);else if(s&&"Error"===s.__type){let r=new Error(s.message);r.stack="",t[n]=r}else t[n]=s;return t}var l,u,c;(c=l||(l={})).UseScrollRestoration="useScrollRestoration",c.UseSubmitImpl="useSubmitImpl",c.UseFetcher="useFetcher",function(r){r.UseFetchers="useFetchers",r.UseScrollRestoration="useScrollRestoration"}(u||(u={}));export{s as c};
