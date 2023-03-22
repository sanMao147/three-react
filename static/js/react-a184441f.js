var e={},r={get exports(){return e},set exports(r){e=r}},t={},o=React,n=Symbol.for("react.element"),_=Symbol.for("react.fragment"),f=Object.prototype.hasOwnProperty,s=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function p(e,r,t){var o,_={},p=null,l=null;for(o in void 0!==t&&(p=""+t),void 0!==r.key&&(p=""+r.key),void 0!==r.ref&&(l=r.ref),r)f.call(r,o)&&!a.hasOwnProperty(o)&&(_[o]=r[o]);if(e&&e.defaultProps)for(o in r=e.defaultProps)void 0===_[o]&&(_[o]=r[o]);return{$$typeof:n,type:e,key:p,ref:l,props:_,_owner:s.current}}t.Fragment=_,t.jsx=p,t.jsxs=p,r.exports=t;export{e as j};
