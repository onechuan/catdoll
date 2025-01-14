import axiosRetry from 'axios-retry';
import axios from 'axios';

axiosRetry(axios, {
    retries: 3, // 设置重试次数，默认是3次
    retryCondition: (error)=> axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 404, // 设置重试条件，默认是网络错误或者超时错误
    shouldResetTimeout: true, // 是否重置超时时间，默认是false，也就是说多次重试请求必须在timeout内结束
    retryDelay: (retryCount)=> axiosRetry.exponentialDelay(retryCount), // 设置重试延迟时间，默认是0，也就是说没有延迟
});