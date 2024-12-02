const originalFetch = window.fetch;

function overwriteFetch(): void {
    window.fetch = function newFetch(
      url: URL | RequestInfo,
      config: RequestInit | undefined
    ): Promise<Response> {
      const startTime = Date.now();
      const reportData = {
        type: "performance",
        subType: "fetch",
        url,
        startTime,
        method: config?.method,
        endTime: 0,
        duration: 0,
        status: 0,
        success: false
      };
      return originalFetch(url, config).then((res: Response) => {
        const endTime = Date.now();
        reportData.endTime = endTime; // 请求完成的时间
        reportData.duration = endTime - startTime; // 请求的时长
        const data = res.clone();
        reportData.status = res.status;
        reportData.success = res.ok;
        return res;
      }).catch((error: any) => {
        const endTime = Date.now();
        reportData.endTime = endTime; // 请求完成的时间
        reportData.duration = endTime - startTime; // 请求的时长
        reportData.status = error.status;
        reportData.success = false;
        return new Response(null, { status: error.status }); // Return a Response object
      });
    };
  }
export default function fetch() {
    overwriteFetch();
}