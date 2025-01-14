import axios from 'axios';

// 请求重试
axios.interceptors.request.use(null, (error) => {
    let config = error.config; // 获取请求配置信息
    if (!config || !config.retry) return Promise.reject(error); // 如果请求配置不存在或者不需要重试，则直接返回错误信息
    const { _retryCount = 0, retryDelay = 300, retryTimes = 3 } = config; // 获取请求配置信息中的重试信息
    // 在请求配置信息中添加重试次数
    config._retryCount = _retryCount;
    // 如果重试次数超过了最大重试次数，则直接返回错误信息
    if (_retryCount >= retryTimes) return Promise.reject(error);
    // 计算下一次重试的时间
    const waitTime = retryDelay * Math.pow(2, _retryCount);
    // 设置请求配置信息的重试次数
    config._retryCount += 1;
    // 返回一个延迟的 Promise 对象
    return new Promise((resolve) => setTimeout(() => resolve(axios(config)), waitTime));
});