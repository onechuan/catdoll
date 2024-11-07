
enum NavigationTypeEnum {
    TypeNavigate = 0,
    TypeReload = 1,
    TypeBackForward = 2,
    TypeReserved = 255
}

const navigationTypeMap = {
    [NavigationTypeEnum.TypeNavigate]: "navigate",
    [NavigationTypeEnum.TypeReload]: "reload",
    [NavigationTypeEnum.TypeBackForward]: "back_forward",
}

// 获取性能相关的计时信息
export function legacyTiming(){
    const timing = performance.timing;
    const navigationType = performance.navigation.type;

    // 创建导航入口
    const navigationEntry = {
        entryType: "navigation",
        startTime: 0,
        type: navigationTypeMap[navigationType] ?? navigationTypeMap[NavigationTypeEnum.TypeNavigate],
    }

    for(const key in timing){
        if(key !== "navigationStart" && key !== "toJSON" ){
            navigationEntry[key] = Math.max(
                timing[key as keyof PerformanceTiming] as number - timing.navigationStart,
                0
            )
        }
    }

    return navigationEntry as unknown as PerformanceNavigationTiming
}

type PEntry = PerformanceEntry & {
    hadRecentInput: boolean;
    value: number;
};
// Cumulative Layout Shift（累计布局偏移)
export function clsObserve(){
    let clsValue = 0;
    let clsEntries: PEntry[] = [];
}

// 获取首次输入延迟
export function fidObserve(){
    let delay = 0;
    const {ob, disconnect} = createObserve((entryList: PerformanceObserverEntryList)=>{
        for(const entry of entryList.getEntries()){
            delay = (entry?.processingStart || 0) - entry.startTime;
        }
    })
    ob.observe({type: "first-input", buffered: true})
    return {
        getVal: () => delay,
        disconnect
    }
}

// 获取最大内容绘制
export function lcpObserve(){
    let startTime = 0;
    const {ob, disconnect} = createObserve((entryList: PerformanceObserverEntryList)=>{
        for(const entry of entryList.getEntries()){
            startTime = entry.startTime;
        }
    })
    ob && ob.observe({type: "largest-contentful-paint", buffered: true})
    return {
        getVal: () => startTime,
        disconnect
    }
}

// 获取页面首次内容绘制的方法
export function fcpObserver(){
    let startTime = 0;
    // https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserverEntryList/getEntries
    const {ob, disconnect} = createObserve((entryList: PerformanceObserverEntryList)=>{
        const entries = entryList.getEntries();
        for(const entry of entries){
            if(entry.name === "first-contentful-paint"){
                startTime = entry.startTime;
                break;
            }
        }
        if (startTime > 0) {
            disconnect();
        }
    })
    ob && ob.observe({type: "paint", buffered: true})
    return {
        getVal: () => startTime,
        disconnect
    }
}

function createObserve(obCallback: PerformanceObserverCallback){
    if(typeof PerformanceObserver !== "undefined"){
        // https://developer.mozilla.org/docs/Web/API/PerformanceObserver
        const ob = new PerformanceObserver(obCallback);
        return {
            ob,
            disconnect: ()=>ob?.disconnect()
        }
    }
    return {
        ob: {
            observe: (f: any)=>f
        },
        disconnect: ()=>{}
    }
}