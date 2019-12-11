/*
 @Author: 任雷雷 *
 @Date: 2018 - 07 - 10 16: 27: 12 *
 @LastEditors:任雷雷 *
 @LastEditTime: 2018 - 07 - 10 16: 27: 12 *
 @Description: 主入口
*/
import axios from 'axios'
import {
  Message
} from 'element-ui'
import router from '../router/index'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 30000
// axios.defaults.baseURL = 'http://basic.com' // 内网
axios.defaults.baseURL = window.Simple.php + '/v1' // 内网
// axios.defaults.baseURL = process.env.API_HOST + '/v1' // 内网
// axios.defaults.baseURL = '' // 内网
// axios.defaults.baseURL = '' // 内网
// 请求拦截器，请求前
axios.interceptors.request.use(
  config => {
    // 在请求发送之前获取cookie,并且加上定时器以及全局动画
    const token = sessionStorage.getItem('access_token')
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }
    // 如果token存在就把token存再header当中
    if (token) {
      config.headers.authorization = 'Bearer ' + token
    } else {
      // 否则就重新进行登录
      router.replace({
        path: 'login'
      })
    }
    return config
  },
  err => {
    // 发送请求失败
    console.log(err) // for debug
    Promise.reject(err)
  }
)
// 应答拦截器,请求后
axios.interceptors.response.use(
  response => {
    let code = response.data.state || response.data.code
    // 文件流请求处理
    if (typeof response.data === 'string') {
      return response
    }
    let message = response.data.message
    if (code !== 200) {
      switch (code) {
        case 99999999:
          Message({
            message: message,
            type: 'error',
            duration: 3 * 1000
          })
          router.replace({
            name: 'login'
          })
          sessionStorage.clear()
          break
        default:
          Message({
            message: message,
            type: 'error',
            duration: 3 * 1000
          })
      }
    }
    return response
  },
  err => {
    console.log(err)
    if (err && err.response) {
      switch (err.response.status) {
        case 500:
          err.message = '服务器错误'
          break
        default:
          err.message = `网络连接错误${err.response.status}`
      }
      Message({
        message: err.message,
        type: 'error',
        duration: 3 * 1000
      })
    } else {
      console.log('请求未完成')
    }
    return Promise.reject(err)
  }
)
// 设置全局的请求次数，请求的间隙
// axios.defaults.retry = 4
// axios.defaults.retryDelay = 1000
// axios.interceptors.response.use(undefined, function axiosRetryInterceptor (err) {
//   var config = err.config
//   // 如果配置不存在或未设置重试选项，则拒绝
//   if (!config || !config.retry) return Promise.reject(err)

//   // 设置变量以跟踪重试次数
//   config.__retryCount = config.__retryCount || 0

//   // 检查我们是否已经注销了总重试次数
//   if (config.__retryCount >= config.retry) {
//     // 剔除错误
//     return Promise.reject(err)
//   }

//   // 增加重试次数
//   config.__retryCount += 1

//   // 创建新的承诺来处理指数退避
//   var backoff = new Promise(function (resolve) {
//     setTimeout(function () {
//       resolve()
//     }, config.retryDelay || 1)
//   })

//   // 返回调用AXIOS来重试请求的承诺
//   return backoff.then(function () {
//     return axios(config)
//   })
// })
/**
 * get 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, ...key) {
  let eject = testing(key)
  return new Promise((resolve, reject) => {
    var getUrl = url + '?var=' + Date.now()
    axios.get(getUrl, {
      params: eject.data
    }).then(response => {
      resolve(response.data)
    })
  })
}
/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, ...key) {
  let eject = testing(key)
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(eject.data)).then(
      response => {
        resolve(response.data)
      }).catch(res => {
      reject(res)
    })
  })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch (url, ...key) {
  let eject = testing(key)
  return new Promise((resolve, reject) => {
    axios.patch(url, eject.data).then(
      response => {
        resolve(response.data)
      },
      err => {
        Message({
          message: eject.error || err.message,
          type: 'error'
        })
      }
    )
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, ...key) {
  let eject = testing(key)
  return new Promise((resolve, reject) => {
    axios.put(url, eject.data).then(
      response => {
        resolve(response.data)
      },
      err => {
        Message({
          message: eject.error || err.message,
          type: 'error'
        })
      }
    )
  })
}

/**
 * delete 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function cut (url, ...key) {
  let eject = testing(key)
  return new Promise((resolve, reject) => {
    axios.delete(url, eject.data).then(
      response => {
        resolve(response.data)
      },
      err => {
        Message({
          message: eject.error || err.message,
          type: 'error'
        })
      }
    )
  })
}
// 检测参数以及数据类型函数
function testing (arr) {
  let len = arr.length
  let eject = {}
  switch (len) {
    case 0:
      eject.data = {}
      eject.error = ''
      break
    case 1:
      if (isObject(arr[0])) {
        eject.data = arr[0]
        eject.error = ''
      } else {
        eject.data = {}
        eject.error = arr[0]
      }
      break
    case 2:
      eject.data = arr[0]
      eject.error = arr[1]
      break
    default:
      break
  }
  return eject
}
// 判断是否是对象的函数
function isObject (value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}
