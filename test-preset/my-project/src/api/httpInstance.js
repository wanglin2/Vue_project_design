import axios from 'axios'
import { Message } from 'element-ui'

// 创建一个新实例
const http = axios.create({
    timeout: 10000, // 超时时间设为10秒
    // withCredentials: true, // 跨域请求时是否需要使用凭证，设置为需要
    headers: {
        'X-Requested-With': 'XMLHttpRequest' // 表明是ajax请求
    },
})

// 请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(
    function (response) {
        // 对错误进行统一处理
        if (response.data.code !== '0') {
            // 弹出错误提示
            if (!response.config.noMsg && response.data.info) {
                Message.error(response.data.info)
            }
            return Promise.reject(response)
        } else if (response.data.code === '0' && response.config.successNotify && response.data.msg) {
            // 弹出成功提示
            Message.success(response.data.msg)
        }
        return Promise.resolve({
            code: response.data.code,
            msg: response.data.msg,
            data: response.data.data,
        })
    },
    function (error) {
        // 登录过期
        if (error.status === 403) {
            location.reload()
            return
        }
        // 超时提示
        if (error.message.indexOf('timeout') > -1) {
            Message.error('请求超时，请重试！')
        }
        return Promise.reject(error)
    },
)

export default http
