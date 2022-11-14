import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api'
  // baseURL: 'http://localhost:3000/admin/api'
})
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.token) {
    // Bearer 表示一种token的类型 还有其他的类型
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

http.interceptors.response.use(res => {
  return res
}, err => {
  // 这里可以跟服务端约定 message 里返回报错具体信息
  if (err.response.data.message) {
    console.log(err.response)
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  
  return Promise.reject(err)
})

export default http