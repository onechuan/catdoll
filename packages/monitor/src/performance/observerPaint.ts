import { lazyReportBatch } from "../report";



// 统计和计算fp的时间
function observerPaint() {
  function entryHandler(entryList) {
    for(const entry of entryList.getEntries()){
      if(entry.name === 'first-paint'){
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
  observer.observe({ type: 'paint', buffered: true });
}

export default observerPaint