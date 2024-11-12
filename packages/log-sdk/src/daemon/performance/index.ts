// import { clsObserve, fcpObserver, fidObserve, lcpObserve, legacyTiming } from "./lib"
// let onloadMemory = {};

// // load事件获取此时页面内存大小
// window.addEventListener('load', () => {
//     onloadMemory = (performance as any)?.memory;
// })

// // 获取性能数据
// function getObserve(){
//     const cls = clsObserve();
//     const fid = fidObserve();
//     const lcp = lcpObserve();
//     const fcp = fcpObserver();

//     return {
//         getVal: ()=>({
//             cls: cls.getVal(),
//             fid: fid.getVal(),
//             lcp: lcp.getVal(),
//             fcp: fcp.getVal()
//         }),
//         disconnect: ()=>{
//             cls.disconnect();
//             fid.disconnect();
//             lcp.disconnect();
//             fcp.disconnect();
//         }
//     }
// }

// interface Perf extends Performance{
//     _navEntry?: PerformanceNavigationTiming
// }
// function createPerformance(): Perf{
//     let t;
//     let p = window.performance as Perf;
//     if(p){
//         if(p.getEntriesByType?.("navigation")?.[0]){
//             t = p.getEntriesByType("navigation")[0];
//         }else{
//             t = legacyTiming();
//         }
//         p._navEntry = t as unknown as PerformanceNavigationTiming;
//     }
//     return p
// }