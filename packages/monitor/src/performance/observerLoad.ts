import { lazyReportBatch } from "../report";

function observerLoad(){
  window.addEventListener("pageshow",(event)=>{
    requestAnimationFrame(()=>{
      ["load"].forEach((type) => {
        const reportData = {
          type:"performance",
          subType: type,
          pageUrl: window.location.href,
          startTime: performance.now() - event.timeStamp, // 页面加载的时间
        }
        lazyReportBatch(reportData);
      })
    })
  }, true)
}

export default observerLoad