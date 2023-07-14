import axios from 'axios'
import { getToken } from '@/utils/auth'
const service = axios.create({
    baseURL: "",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
    }
})

// 请求拦截器
service.interceptors.request.use(config => {
    if (getToken()) {
        config.headers['X-Token'] = getToken()
    }
    return config
}, error => {
    console.log(error)
    return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(response => {
    const { code, msg } = response.data
    if (code == 1 || code == 1002) {
        // 错误提示
        return false
    } else if (code == 1001 || code == 1000) {
        // 退出登录
        return false
    } else {
        return response.data;
    }
}, error => {
    console.log(error)
    return Promise.reject(error)
})

export default service