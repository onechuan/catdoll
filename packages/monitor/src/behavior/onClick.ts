import { lazyReportBatch } from "../report";


export default function click(){
    ["mousedown","touchstart"].forEach(eventType=>{
        window.addEventListener(eventType, (event)=>{
            const target = event.target as any;
            const path = (event as MouseEvent).composedPath ? (event as MouseEvent).composedPath() : undefined;
            if(target && target.tagName){
                const reportData = {
                    type:"behavior",
                    subType: "click",
                    target: target.tagName,
                    startTime: event.timeStamp,
                    innerHtml: target.innerHTML,
                    outerHtml: target.outerHTML,
                    with: target.offsetWidth,
                    height: target.offsetHeight,
                    eventType,
                    path
                }
                lazyReportBatch(reportData);
            }
        })
    })
}