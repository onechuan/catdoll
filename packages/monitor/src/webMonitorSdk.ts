import * as performance from "./performance";
import * as error from "./error"
import * as behavior from "./behavior"
import { setConfig } from "./config";

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
        // TODO: 上报具体的错误信息
        if(handler){
            handler.call(this, err, vm, info)
        }
    }
}

// 针对React的错误捕获
function errorBoundary(err){
    if(window.__webMonitorSdk__.react) return;
    window.__webMonitorSdk__.react = true;
    // TODO: 上报具体的错误信息
}

function init(options){
    setConfig(options);
}

export default {
    install,
    performance,
    error,
    init,
    behavior
}

// webMonitorSdk.init({
//     batchSize: 50
// })