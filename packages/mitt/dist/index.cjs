"use strict";module.exports=class{all;constructor(){this.all=new Map}on(s,t){const l=this.all.get(s);l?l.push(t):this.all.set(s,[t])}off(s,t){const l=this.all.get(s);if(l)if(t){const s=l.indexOf(t);-1!==s&&l.splice(s,1)}else this.all.set(s,[])}emit(s,t){let l=this.all.get(s);l&&l.slice().map((s=>s(t))),l=this.all.get("*"),l&&l.slice().map((s=>s(t)))}once(s,t){const l=(...e)=>{t(...e),this.off(s,l)};this.on(s,l)}};
//# sourceMappingURL=index.cjs.map
