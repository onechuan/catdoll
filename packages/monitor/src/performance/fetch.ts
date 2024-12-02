const originalFetch = window.fetch;

function overwriteFetch(){
    window.fetch = function newFetch(url, config){
        const startTime = Date.now();
        const reportData = {
            type:"performance",
            subType: "fetch",
            url,
            startTime,
            method: config.method,
        }
        return originalFetch(url, config).then(res => {
            const endTime = Date.now();
            reportData.endTime = endTime; // 请求完成的时间
            reportData.duration = endTime - startTime; // 请求的时长
            const data = res.clone();
            reportData.status = res.status;
            reportData.success = res.ok;
            return res;
        }).catch(error => {
            const endTime = Date.now();
            reportData.endTime = endTime; // 请求完成的时间
            reportData.duration = endTime - startTime; // 请求的时长
            reportData.status = error.status;
            reportData.success = false;
        })
    }
}

export default function fetch() {
    overwriteFetch();
}