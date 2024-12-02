interface XMLHttpRequestWithMethod extends XMLHttpRequest {
    method: string;
    url: string;
    startTime: number;
    endTime: number;
    duration: number;
}
declare const originalProto: XMLHttpRequestWithMethod;
declare const originalOpen: {
    (method: string, url: string | URL): void;
    (method: string, url: string | URL, async: boolean, username?: string | null | undefined, password?: string | null | undefined): void;
};
declare const originalSend: (body?: Document | XMLHttpRequestBodyInit | null | undefined) => void;

declare const performance_originalProto: typeof originalProto;
declare const performance_originalOpen: typeof originalOpen;
declare const performance_originalSend: typeof originalSend;
declare namespace performance {
  export { performance_originalProto as originalProto, performance_originalOpen as originalOpen, performance_originalSend as originalSend };
}

declare function error(): void;

declare namespace error$1 {
  export { error as default };
}

declare namespace behavior {
  export {  };
}

declare function install(Vue: any, options: any): void;
declare function init(options: any): void;
declare const _default: {
    install: typeof install;
    performance: typeof performance;
    error: typeof error$1;
    init: typeof init;
    behavior: typeof behavior;
};

export { _default as default, install };
