
/**
 * @description 防抖函数
 * @param func 需要执行的函数
 * @param delay 延迟时间，单位毫秒
 * @param immediate 是否立即执行，默认false
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number, immediate: boolean = false): T {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let result: ReturnType<T> | undefined; // 用于存func函数的执行结果

    const later = function(context: ThisParameterType<T>, args: Parameters<T>) {
        timeout = null;
        if (args && args.length > 0) {
            result = func.apply(context, args);
        }
    };

    const debounced: T = function(this: ThisParameterType<T>,...args: Parameters<T>): ReturnType<T> {
        if (timeout) {
            clearTimeout(timeout);
        }

        if (immediate) {
            const callNow = !timeout;
            timeout = setTimeout(() => later(this, args), wait);
            if (callNow) {
                result = func.apply(this, args);
            }
        } else {
            timeout = setTimeout(() => later(this, args), wait);
        }

        return result as ReturnType<T>;
    } as T;

    return debounced;
}