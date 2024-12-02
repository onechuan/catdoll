import { lazyReportBatch } from "../report";

export const originalProto = XMLHttpRequest.prototype;
export const originalOpen = originalProto.open;
export const originalSend = originalProto.send;


function overwriteOpenAndEnd(){
  // 重写open
  originalProto.open = function(...args){
    this.method = args[0];
    this.url = args[1];
    originalOpen.apply(this, args);
  }
  // 重写send
  originalProto.send = function(...args){
    this.startTime = Date.now();
    const onLoaded = ()=>{
      this.endTime = Date.now();
      this.duration = this.endTime - this.startTime;
      const {
        status,
        duration,
        method,
        url,
        startTime,
        endTime

      } = this;

      const reportData = {
        type: "performance",
        subType: "xhr",
        success: status >= 200 && status < 300,
        method: method.toUpperCase(),
        status,
        duration,
        
        url,
        startTime,
        endTime
      }
      lazyReportBatch(reportData);
      this.removeEventListener("loaded", onLoaded, true);
    }
    this.addEventListener("loaded", onLoaded, true);
    originalSend.apply(this, args);
  }
}

function xhr(){
  overwriteOpenAndEnd()
}

export default xhr