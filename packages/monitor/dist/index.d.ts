declare function performance(): void;

declare function error(): void;

declare function behavior(): void;

declare function install(Vue: any, options: any): void;
declare function errorBoundary(err: any, info: any): void;
declare function init(options: any): void;
declare const _default: {
    install: typeof install;
    performance: typeof performance;
    error: typeof error;
    init: typeof init;
    behavior: typeof behavior;
    errorBoundary: typeof errorBoundary;
};

export { _default as default, errorBoundary, init, install };
