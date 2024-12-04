declare function performance(): void;

declare function error(): void;

declare function behavior(): void;

declare function install(Vue: any, options: any): void;
declare function errorBoundary(err: any, info: any): void;
declare function init(options: any): void;
declare const _default: {
    install: typeof install;
    errorBoundary: typeof errorBoundary;
    init: typeof init;
    error: typeof error;
    behavior: typeof behavior;
    performance: typeof performance;
};

export { _default as default, errorBoundary, init, install };
