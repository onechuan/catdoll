'use strict';

var EventEmitter = require('@catdoll/mitt');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var EventEmitter__default = /*#__PURE__*/_interopDefaultLegacy(EventEmitter);

function sum(num1, num2) {
    return num1 + num2;
}

console.log(sum(1, 2));
const emitter = new EventEmitter__default["default"]();
function demoFn(count) {
    console.log("demoFn", count);
}
emitter.on("demoFn", demoFn);
demoFn(1);
demoFn(2);
emitter.off("demoFn", demoFn);
demoFn(3);
//# sourceMappingURL=index.cjs.map
