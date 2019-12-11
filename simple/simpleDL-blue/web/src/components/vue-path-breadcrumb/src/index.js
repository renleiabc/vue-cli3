/*
 * @Author: Liang Liang
 * @Date: 2018-07-12 10:02:15
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-12 10:02:15
 * @Description:
 */
import seduPathBreadcrumb from './pathBreadcrumb'
const comment = {
  install (Vue) {
    Vue.component('seduPathBreadcrumb', seduPathBreadcrumb)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}

export default comment
