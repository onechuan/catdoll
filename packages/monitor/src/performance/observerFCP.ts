import { lazyReportBatch } from "../report";

function observerFCP() {
  function entryHandler(entryList) {
    for(const entry of entryList.getEntries()){
      if(entry.name === 'first-contentful-paint'){
        observer.disconnect();
        const json = entry.toJSON();
        console.log("entryJson", json);
        const reportData = {
          ...json,
          type:"performance",
          subType: entry.name,
          pageUrl: window.location.href
        }
        // 上报数据
        lazyReportBatch(reportData);
      }
    }
  }
  

  const observer = new PerformanceObserver(entryHandler); 
  // buffered: true，确保观察到所有的paint事件  
  observer.observe({ type: 'paint', buffered: true });
}

export default observerFCP