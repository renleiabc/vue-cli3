/*
 * @Author: Liang Liang
 * @Date: 2018-07-06 17:04:31
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-01 17:07:22
 * @Description:
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-06 13:42:29
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './lang'
import elementUI from 'element-ui'
import store from './vuex/store'
import axios from 'axios'
import {
  post,
  get,
  patch,
  put,
  cut
} from './util/http' // 引入axios方法，在组件当中使用
import mixin from './util/mixin'
import BreakpointUpload from '@/components/breakpointUpload'
import seduLanguageSwitch from 'vue-language-switch'
import seduEcharts from 'vue-echarts-sedu'
import seduPathBreadcrumb from 'vue-path-breadcrumb'
import * as filters from '@/util/filters'
import eleNav from 'vue-ele-nav'
import 'babel-polyfill'
Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.use(elementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(seduLanguageSwitch)
Vue.use(BreakpointUpload)
Vue.use(seduEcharts)
Vue.use(seduPathBreadcrumb)
Vue.use(eleNav)
Vue.mixin(mixin)
// 这时候如果在其它的组件中，是无法使用 axios 命令的。但如果将 axios 改写为 Vue 的原型属性，就能解决这个问题
Vue.prototype.$axios = axios
Vue.prototype.$post = post // 发送函数
Vue.prototype.$get = get // 获取
Vue.prototype.$patch = patch // 更新局部资源
Vue.prototype.$put = put // 完整更新
Vue.prototype.$cut = cut // 删除
Vue.prototype.$18n = i18n
Vue.prototype.numberFormatter = filters.numberFormatter // 删除

// 把util下的方法注册到全局
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
const ignoreList = ['login', 'error'].join(',') // 不需要登陆
// 路由过滤
router.beforeEach((to, from, next) => {
  const permissionList = sessionStorage.getItem('permissionList')
  const permissionTemplate = JSON.parse(sessionStorage.getItem('permissionTemplate'))
  const closePermission = JSON.parse(sessionStorage.getItem('closePermission'))
  // 临时数据
  const cookieTrue = false
  const apiTrue = false
  if (ignoreList.indexOf(to.name) !== -1) { // 进入的是任何人都可以进入的页面
    next()
  } else {
    next()
    if (JSON.parse(sessionStorage.getItem('isLogin')) === true) { // 已登陆
      if (closePermission === true) {
        next()
      } else {
        if (permissionList.indexOf(`,${permissionTemplate[to.name]},`) !== -1) {
          next()
        } else {
          next({
            name: 'main'
          })
        }
      }
    } else { // 未登录
      if (cookieTrue === true) {
        // cookie验证
        sessionStorage.setItem('isLogin', 'true')
        // 此处可以设置第一次时自动登陆
        next({
          name: 'main'
        })
      } else {
        if (apiTrue === true) {
          // 向后台请求验证是否登陆
          sessionStorage.setItem('isLogin', 'true')
          // 此处可以设置第一次时自动登陆
          next({
            name: 'main'
          })
        } else {
          next({
            name: 'login'
          })
        }
      }
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
