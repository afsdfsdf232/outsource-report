import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
// http://42.193.39.158:8812/api/homeArticleList

// 请求拦截
service.interceptors.request.use(config => {
  if (config.method === 'get') {
    //  给data赋值以绕过if判断
    config.data = true
    if (config.headers) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
  }
  return config
})

// 响应拦截
service.interceptors.response.use(config => {
  if (config.data.code && config.data.code !== 200) {
    ElMessage.error(config.data.msg)
  }
  return config.data
}, err => {
  ElMessage.error(err.response.data.error)
  return Promise.reject(err)
})

export const get = (url: string, params?: any): any => {
  return service({
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url,
    params
  })
}

export const post = (url: string, data?: any): any => {
  return service({
    method: 'post',
    url,
    data
  })
}

export const getDownloadFile = (url: string, params?: any): any => {
  return service({
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url,
    params
  })
}
