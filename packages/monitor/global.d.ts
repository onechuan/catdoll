declare global {
    interface Window {
        __webMonitorSdk__: {
            version: string;
            vue: boolean;
            react: boolean;
        };
    }
}

export {}