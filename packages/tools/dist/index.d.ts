/**
 * @description 防抖函数
 * @param func 需要执行的函数
 * @param delay 延迟时间，单位毫秒
 * @param immediate 是否立即执行，默认false
 */
declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number, immediate?: boolean): T;

export { debounce };
