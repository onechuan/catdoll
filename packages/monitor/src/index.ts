import performance from "./performance";
import error from "./error"
import  behavior from "./behavior"
import { setConfig } from "./config";
import { lazyReportBatch } from "./report";

window.__webMonitorSdk__ = {
    version: "0.0.1",
    vue: false,
    react: false
}

// 针对Vue的错误捕获
export function install(Vue: any, options: any){
    if(window.__webMonitorSdk__.vue) return;
    window.__webMonitorSdk__.vue = true;
    const handler = Vue.config.errorHandler;

    // vue项目中通过Vue.config.errorHandler来捕获错误 https://cn.vuejs.org/api/application.html#app-config-errorhandler
    Vue.config.errorHandler = function(err, vm, info) {
        // 上报具体的错误信息
        const reportData = {
            info,
            error: err.stack,
            subType:"vue",
            type:"error",
            startTime: window.performance.now(),
            pageUrl: window.location.href
        }
        console.log("vue error", reportData);
        
        lazyReportBatch(reportData);
        if(handler){
            handler.call(this, err, vm, info)
        }
    }
}

// 针对React的错误捕获
export function errorBoundary(err, info){
    if(window.__webMonitorSdk__.react) return;
    window.__webMonitorSdk__.react = true;
    // 上报具体的错误信息
    const reportData = {
        error: err.stack,
        info,
        subType:"react",
        type:"error",
        startTime: window.performance.now(),
        pageUrl: window.location.href
    }
    lazyReportBatch(reportData);
}

export function init(options){
    setConfig(options);
    // error()
    // performance()
    behavior()
}

export default {
    install,
    errorBoundary,
    init,
    error,
    behavior,
    performance
}


// webMonitorSdk.init({
//     batchSize: 50
// })