import { lazyReportBatch } from "../report";

function error() {
    // 捕获资源加载失败的错误： js css img
    window.addEventListener("error", (event: any) => {
        const target = event.target as any;
        if(!target) return; // 说明这是js内部的语法错误
        if(target.src || target.href){
            const url = target.src || target.href;
            const reportData = {
                type:"error",
                subType: "resource",
                url,
                html: target.outerHTML,
                pageUrl: window.location.href,
                paths: event.path // 路径
            }
            lazyReportBatch(reportData);
        }
    }, true);

    // 捕获js错误
    window.onerror = (msg, url, lineNo, columnNo, error) => {
        const reportData = {
            type: "error",
            subType: "js",
            msg,
            url,
            lineNo,
            columnNo,
            stack: (error as Error).stack || "",
            pageUrl: window.location.href,
            startTime: performance.now()
        }
        lazyReportBatch(reportData);
    }

    // 捕获promise错误
    window.addEventListener("unhandledrejection", (event) => {
      const reportData = {
        type:"error",
        subType: "promise",
        msg: event.reason,
        pageUrl: window.location.href,
        startTime: event.timeStamp
      }
      lazyReportBatch(reportData);
    })
}


export default error;