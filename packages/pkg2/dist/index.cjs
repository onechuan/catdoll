"use strict";function o(o){return o&&"object"==typeof o&&"default"in o?o:{default:o}}var e=o(require("@catdoll/mitt"));console.log(1+2);const n=new e.default;function t(o){console.log("demoFn",o)}n.on("demoFn",t),t(1),t(2),n.off("demoFn",t),t(3);
//# sourceMappingURL=index.cjs.map
