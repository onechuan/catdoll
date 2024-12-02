import { lazyReportBatch } from "../report";



// 观察LCP
function observerLCP() {

  function entryHandler(entryList) {
    for(const entry of entryList.getEntries()){
      if(entry.name === 'largest-contentful-paint'){
        observer.disconnect();
        const json = entry.toJSON();
        console.log("entryJson", json);
        const reportData = {
          ...json,
          type:"performance",
          subType: entry.name,
          pageUrl: window.location.href
        }
        lazyReportBatch(reportData);
      }
    }
  }
  
  const observer = new PerformanceObserver(entryHandler);
  // buffered: true，确保观察到所有的paint事件
  observer.observe({ type: 'largest-contentful-paint', buffered: true });
}

export default observerLCP