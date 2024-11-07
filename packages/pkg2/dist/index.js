import EventEmitter from '@catdoll/mitt';

function sum(num1, num2) {
    return num1 + num2;
}

console.log(sum(1, 2));
const emitter = new EventEmitter();
function demoFn(count) {
    console.log("demoFn", count);
}
emitter.on("demoFn", demoFn);
demoFn(1);
demoFn(2);
emitter.off("demoFn", demoFn);
demoFn(3);
//# sourceMappingURL=index.js.map
