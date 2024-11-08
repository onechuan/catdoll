interface EventMmitter {
    all: Map<string, Function[]>;
    on: (type: string, handler: Function) => void;
    off: (type: string, handler: Function) => void;
    emit: (type: string, params: any) => void;
    once: (type: string, handler: Function) => void;
}
declare class EventMitt implements EventMmitter {
    all: Map<string, Function[]>;
    constructor();
    on(type: string, handler: Function): void;
    off(type: string, handler: Function): void;
    emit(type: string, params: any): void;
    once(type: string, handler: Function): void;
}

export { EventMitt as default };
