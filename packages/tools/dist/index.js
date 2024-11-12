function n(n,t,r){void 0===r&&(r=!1);var l=null;return function(){for(var u=[],e=0;e<arguments.length;e++)u[e]=arguments[e];var o=this,a=r&&!l;return l&&clearTimeout(l),l=setTimeout((function(){r||n.apply(o,u),l=null}),t),a&&n.apply(o,u),n.apply(o,u)}}export{n as debounce};
//# sourceMappingURL=index.js.map
