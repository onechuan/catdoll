
interface EventMmitter {
    all: Map<string, Function[]>;
    on: (type: string, handler: Function) => void;
    off: (type: string, handler: Function) => void;
    emit: (type: string, params: any) => void;
    once: (type: string, handler: Function) => void;
}

class EventMitt implements EventMmitter {
    all: Map<string, Function[]>; // 存储所有事件类型以及对应的处理函数的Map，事件类型和处理函数的映射表
    constructor(){
        this.all = new Map();
    }
 
    // 注册事件处理函数
    on(type: string, handler: Function) {
        // 获取事件类型对应的处理函数列表
        const handlers = this.all.get(type);
        // 已有处理函数，将新的处理函数添加到处理函数列表中，没有则创建新的处理函数列表
        if (handlers) {
            handlers.push(handler);
        }else{
            this.all.set(type, [handler]);
        }
    }

    // 移除事件处理函数
    off(type: string, handler: Function) {
        const handlers = this.all.get(type);
        if(!handlers) return;
        // 找到对应的处理函数，将其从处理函数列表中删除，否则将事件类型对应的处理函数列表设置为空
        if(handler){
            const index = handlers.indexOf(handler);
            if(index !== -1){
                handlers.splice(index, 1);
            }
        }else{
            this.all.set(type, []);
        }
    }

    // 触发事件
    emit(type: string, params: any) {
        let handlers = this.all.get(type);
        if(handlers){
            // 如果有处理函数，依次调用处理函数并传入参数
            // 使用slice是为了创建一个数组的拷贝，避免影响原始数据
            handlers.slice().map(handler => handler(params));
        }
        // 获取通配符事件类型对应的处理函数列表，如果存在，依次调用处理函数并传入参数
        handlers = this.all.get('*');
        if(handlers){
            handlers.slice().map(handler => handler(params));
        }
    }
    
    // 注册事件处理函数，只触发一次
    once(type: string, handler: Function) {
        const fn = (...args: any[]) => {
            handler(...args);
            this.off(type, fn);
        };
        this.on(type, fn);
    }
}

export default EventMitt