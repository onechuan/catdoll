
/**
 * @description 防抖函数
 * @param func 需要执行的函数
 * @param delay 延迟时间，单位毫秒
 * @param immediate 是否立即执行，默认false
 */
function debounce<T extends (...args: any[])=>any>(func: T, delay: number, immediate: boolean = false): T {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
        const _this = this;
        const callNow = immediate && !timer;

        if(timer){
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            if(!immediate){
                func.apply(_this, args);
            }
            timer = null;
        }, delay);

        if(callNow){
            func.apply(_this, args);
        }
        return func.apply(_this, args);
    } as T;
}

export default debounce