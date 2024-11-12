
// enum NavigationTypeEnum {
//     TypeNavigate = 0,
//     TypeReload = 1,
//     TypeBackForward = 2,
//     TypeReserved = 255
// }

// const navigationTypeMap = {
//     [NavigationTypeEnum.TypeNavigate]: "navigate",
//     [NavigationTypeEnum.TypeReload]: "reload",
//     [NavigationTypeEnum.TypeBackForward]: "back_forward",
// }

// // 获取性能相关的计时信息
// export function legacyTiming(){
//     const timing = performance.timing;
//     const navigationType = performance.navigation.type;

//     // 创建导航入口
//     const navigationEntry = {
//         entryType: "navigation",
//         startTime: 0,
//         type: navigationTypeMap[navigationType] ?? navigationTypeMap[NavigationTypeEnum.TypeNavigate],
//     }

//     for(const key in timing){
//         if(key !== "navigationStart" && key !== "toJSON" ){
//             navigationEntry[key] = Math.max(
//                 timing[key as keyof PerformanceTiming] as number - timing.navigationStart,
//                 0
//             )
//         }
//     }

//     return navigationEntry as unknown as PerformanceNavigationTiming
// }

// export function getNavTimingJSON(timing: PerformanceNavigationTiming){
//     return timing.toJSON ? timing.toJSON() : {};
// }

// type PEntry = PerformanceEntry & {
//     hadRecentInput: boolean;
//     value: number;
// };

// export type ObserveReturn = {
//     getVal: () => number;
//     disconnect: () => void;
// }

// // Cumulative Layout Shift（累计布局偏移)
// export function clsObserve(): ObserveReturn{
//     let clsValue = 0;
//     let clsEntries: PEntry[] = [];
//     let sessionValue = 0;
//     let sessionEntries: PEntry[] = [];

//     const {ob, disconnect} = createObserve((entryList: PerformanceObserverEntryList)=>{
//         for(const entry of entryList.getEntries() as PEntry[]){
//             // 只考虑没有近期用户输入导致的布局偏移条目
//             if(!entry.hadRecentInput){
//                 const firstSessionEntry = sessionEntries[0];
//                 const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
//                 // 通过比较当前条目与上一个条目及第一个条目的时间间隔，判断是否属于当前会话。
//                 // 如果当前条目发生在距离上一个条目不到 1 秒且距离会话第一个条目不到 5 秒的时间内，
//                 // 则将其纳入当前会话，更新sessionValue和sessionEntries。否则，开启一个新会话。
//                 if(
//                     sessionValue &&
//                     entry.startTime - lastSessionEntry?.startTime < 1000 &&
//                     entry.startTime - firstSessionEntry?.startTime < 5000
//                 ){
//                     sessionValue += entry.value;
//                     sessionEntries.push(entry);
//                 }else{
//                     sessionValue = entry.value;
//                     sessionEntries = [entry];
//                 }
//                 // 计算当前会话的累计布局偏移
//                 if(sessionValue > clsValue){
//                     clsValue = sessionValue;
//                     clsEntries = sessionEntries;
//                 }

//             }
//         }
//     })

//     ob.observe({type: "layout-shift", buffered: true})
//     return {
//         getVal: () => clsValue,
//         disconnect
//     }
// }

// // 获取首次输入延迟
// export function fidObserve():ObserveReturn{
//     let delay = 0;
//     const {ob, disconnect} = createObserve((entryList: PerformanceObserverEntryList)=>{
//         for(const entry of entryList.getEntries()){
//             delay = (entry?.processingStart || 0) - entry.startTime;
//         }
//     })
//     ob.observe({type: "first-input", buffered: true})
//     return {
//         getVal: () => delay,
//         disconnect
//     }
// }

// // 获取最大内容绘制
// export function lcpObserve():ObserveReturn{
//     let startTime = 0;
//     const {ob, disconnect} = createObserve((entryList: PerformanceObserverEntryList)=>{
//         for(const entry of entryList.getEntries()){
//             startTime = entry.startTime;
//         }
//     })
//     ob && ob.observe({type: "largest-contentful-paint", buffered: true})
//     return {
//         getVal: () => startTime,
//         disconnect
//     }
// }

// // 获取页面首次内容绘制的方法
// export function fcpObserver():ObserveReturn{
//     let startTime = 0;
//     // https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserverEntryList/getEntries
//     const {ob, disconnect} = createObserve((entryList: PerformanceObserverEntryList)=>{
//         const entries = entryList.getEntries();
//         for(const entry of entries){
//             if(entry.name === "first-contentful-paint"){
//                 startTime = entry.startTime;
//                 break;
//             }
//         }
//         if (startTime > 0) {
//             disconnect();
//         }
//     })
//     ob && ob.observe({type: "paint", buffered: true})
//     return {
//         getVal: () => startTime,
//         disconnect
//     }
// }

// // 获取首屏时间
// export function getFP(performance: Performance){
//     if(!performance.getEntriesByType) return 0;
//     const paintEntries = performance.getEntriesByType("paint");
//     for(const entry of paintEntries){
//         if(entry.name === "first-paint"){
//             return entry.startTime
//         }
//     }
//     return 0
// }

// // 获取TTFB
// export function getTTFB<T extends PerformanceNavigationTiming>(navEntry: T){
//     return Math.max(navEntry.responseStart - (navEntry?.startTime || 0), 0)
// }

// function createObserve(obCallback: PerformanceObserverCallback){
//     if(typeof PerformanceObserver !== "undefined"){
//         // https://developer.mozilla.org/docs/Web/API/PerformanceObserver
//         const ob = new PerformanceObserver(obCallback);
//         return {
//             ob,
//             disconnect: ()=>ob?.disconnect()
//         }
//     }
//     return {
//         ob: {
//             observe: (f: any)=>f
//         },
//         disconnect: ()=>{}
//     }
// }


