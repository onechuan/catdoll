import { getCache, addCache, clearCache } from "./cache";
import config from "./config";
import { generateUniqueId } from "./utils";

export const originalProto = XMLHttpRequest.prototype;
export const originalOpen = XMLHttpRequest.prototype.open;
export const originalSend = XMLHttpRequest.prototype.send;

// 数据上报函数 优先使用 sendBeacon方法，如果不支持，根据是否开启图片上传，选择使用imgRequest或者xhrRequest
export function report(data: any){
    if(!config.url){
        console.error("请设置上传url地址");
        return;
    }
    const reportData = JSON.stringify({
        id: generateUniqueId(),
        data
    });

    // 图片上传，直接使用imgRequest
    if(config.isImageUpload){
        imgRequest(reportData);
    }else{
        // 如果浏览器支持sendBeacon，使用sendBeacon，否则使用xhr
        if(!!window.navigator.sendBeacon) return beaconRequest(reportData);
        xhrRequest(config.url, reportData);
    }
}

/**
 * 批量延迟上报数据
 * @description 首先将传入的数据添加到缓存中，如果缓存中的数据大于等于20条，就进行上报并清空缓存
 * @param data 
 */
export function lazyReportBatch(data: any){
    addCache(data);
    const cacheData = getCache();
    console.error("cacheData", cacheData);
    if(cacheData.length && cacheData.length > config.batchSize){
        report(cacheData);
        clearCache()
    }
}

// 发送图片数据
export function imgRequest(data: any){
    const img = new Image();
    img.src = `${config.url}?data=${encodeURIComponent(JSON.stringify(data))}`
}

// 普通ajax发送请求数据
export function xhrRequest(url: string, data: any){
    // 浏览器支持requestIdleCallback
    if(window.requestIdleCallback){
        window.requestIdleCallback(()=>{
            const xhr = new XMLHttpRequest();
            originalOpen.call(xhr, "post", url, true);
            originalSend.call(xhr, JSON.stringify(data));
        },{ timeout: 3000 })
    }else{
        // 浏览器不支持requestIdleCallback，使用setTimeout，避免在页面加载或其他关键操作期间占用过多的资源
        setTimeout(()=>{
            const xhr = new XMLHttpRequest();
            originalOpen.call(xhr, "post", url, true);
            originalSend.call(xhr, JSON.stringify(data));
        })
    }
}

export function beaconRequest(data) {
    if (window.requestIdleCallback) {
        window.requestIdleCallback(
            () => {
                window.navigator.sendBeacon(config.url, data);
            },
            { timeout: 3000 }
        );
    } else {
        setTimeout(() => {
            window.navigator.sendBeacon(config.url, data);
        });
    }
}