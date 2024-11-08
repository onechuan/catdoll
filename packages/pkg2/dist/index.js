import o from"@catdoll/mitt";console.log(1+2);const n=new o;function e(o){console.log("demoFn",o)}n.on("demoFn",e),e(1),e(2),n.off("demoFn",e),e(3);
//# sourceMappingURL=index.js.map
