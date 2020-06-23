/*
 * @Author: renlei
 * @Date: 2020-06-09 09:42:43
 * @LastEditors: renlei
 * @LastEditTime: 2020-06-23 17:43:33
 * @Description:
 */

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import axios from 'axios';
import { post, get, patch, put, cut } from './util/http'; // 引入axios方法，在组件当中使用
import store from './store';
Vue.use(ElementUI);
// 这时候如果在其它的组件中，是无法使用 axios 命令的。但如果将 axios 改写为 Vue 的原型属性，就能解决这个问题
Vue.prototype.$axios = axios;
Vue.prototype.$post = post; // 发送函数
Vue.prototype.$get = get; // 获取
Vue.prototype.$patch = patch; // 更新局部资源
Vue.prototype.$put = put; // 完整更新
Vue.prototype.$cut = cut; // 删除
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});
router.afterEach(() => {
  window.scrollTo(0, 0);
});
Vue.filter('addNum', function(value, num) {
  return value + 2 + num;
});
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
