class t{all;constructor(){this.all=new Map}on(t,s){const l=this.all.get(t);l?l.push(s):this.all.set(t,[s])}off(t,s){const l=this.all.get(t);if(l)if(s){const t=l.indexOf(s);-1!==t&&l.splice(t,1)}else this.all.set(t,[])}emit(t,s){let l=this.all.get(t);l&&l.slice().map((t=>t(s))),l=this.all.get("*"),l&&l.slice().map((t=>t(s)))}once(t,s){const l=(...e)=>{s(...e),this.off(t,l)};this.on(t,l)}}export{t as default};
//# sourceMappingURL=index.js.map
