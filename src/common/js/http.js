import router from '@/router'
import axios from 'axios'
import { Loading, Message } from 'element-ui'

// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({
    // target: '.banner-middle,.main-box',
    fullscreen: true,
    text: '拼命加载中...'
  })
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  Message.error({
    message: '网络不给力呀！请稍候再试'
  })
  return Promise.reject(error)
  })


export default axios
