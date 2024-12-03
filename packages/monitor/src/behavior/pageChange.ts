import { lazyReportBatch } from "../report";
import { generateUniqueId } from "../utils";


export default function pageChange() {
    // hash history
    let oldUrl = "";
    window.addEventListener("hashchange",function(event){
        const newUrl = event.newURL;
        const reportData = {
            type:"behavior",
            subType: "pageChange",
            from: oldUrl,
            to: newUrl,
            startTime: performance.now(),
            uuid: generateUniqueId()
        };
        lazyReportBatch(reportData);
        oldUrl = newUrl;
    },true);

    let from = "";
    window.addEventListener("popstate",function(event){
        const to = window.location.href;
        const reportData = {
            from,
            to,
            type:"behavior",
            subType: "popstate",
            startTime: performance.now(),
            uuid: generateUniqueId()
        };
        lazyReportBatch(reportData);
        from = to;
    }, true)
}