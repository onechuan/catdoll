import { lazyReportBatch } from "../report";
import { generateUniqueId } from "../utils";


export default function pv() {
    const reportData = {
        type:"behavior",
        subType: "pv",
        pageUrl: window.location.href,
        startTime: performance.now(),
        referrer: document.referrer,
        uuid: generateUniqueId()
    };

    lazyReportBatch(reportData);
}