"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import pkg1_1 from "@catdoll/pkg1"
import mitt_1 from "@catdoll/mitt"
console.log((0, pkg1_1.sum)(1, 2));
var emitter = new mitt_1.default();
function demoFn(count) {
    console.log("demoFn", count);
}
emitter.on("demoFn", demoFn);
demoFn(1);
demoFn(2);
emitter.off("demoFn", demoFn);
demoFn(3);
