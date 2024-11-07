import { sum } from "@catdoll/pkg1";
import EventEmitter from "@catdoll/mitt";


console.log(sum(1, 2));

const emitter = new EventEmitter();

function demoFn(count: number) {
    console.log("demoFn", count);
}

emitter.on("demoFn", demoFn )

demoFn(1)
demoFn(2)

emitter.off("demoFn", demoFn)

demoFn(3)