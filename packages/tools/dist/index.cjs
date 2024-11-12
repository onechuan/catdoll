"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.debounce=function(e,t,r){void 0===r&&(r=!1);var n=null;return function(){for(var u=[],o=0;o<arguments.length;o++)u[o]=arguments[o];var l=this,i=r&&!n;return n&&clearTimeout(n),n=setTimeout((function(){r||e.apply(l,u),n=null}),t),i&&e.apply(l,u),e.apply(l,u)}};
//# sourceMappingURL=index.cjs.map
