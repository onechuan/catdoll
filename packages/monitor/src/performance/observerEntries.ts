import { lazyReportBatch } from "../report";

function observerEvent(){
  
  function entryHandler(entryList) {
    const entries = entryList.getEntries();
    for(const entry of entries){
      for(const entry of entries){
        if(observer){
          observer.disconnect();
        }
        const reportData = {
          name: entry.name, // 资源的名字
          type: "performance", // 类型
          subType: entry.subType, // 子类型
          sourceType: entry.entryType, // 资源的类型
          duration: entry.duration, // 资源的时长
          dns: entry.domainLookupEnd - entry.domainLookupStart, // DNS解析的时长
          tcp: entry.connectEnd - entry.connectStart, // TCP连接的时长
          redirect: entry.redirectEnd - entry.redirectStart, // 重定向的时长
          ttfb: entry.responseStart, // 首字节时间
          protocol: entry.nextHopProtocol, // 请求协议
          responseBodySize: entry.responseBodySize, // 响应体大小
          responseHeaderSize: entry.transferSize - entry.encodedBodySize, // 响应头大小
          transferSize: entry.transferSize, // 请求内容大小
          resourceSize: entry.decodedBodySize, // 解压后的资源大小
          startTime: performance.now(), // 资源加载的时间
        }
        console.log("entry", entry);
        lazyReportBatch(reportData);
      }
    }
  }

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'resource', buffered: true });
}


function observerEntries() {
  if(document.readyState === "complete"){
    observerEvent();
  }else{
    const onLoad = () => {
      observerEvent();
      window.removeEventListener("load", onLoad, true);
      
    }
    window.addEventListener("load", onLoad, true);
  }
}

export default observerEntries