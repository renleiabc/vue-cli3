/*
 * @Author: Liang Liang
 * @Date: 2018-07-07 17:48:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-10 15:36:39
 * @Description:
 */
import seduEcharts from './seduEcharts'
import echarts from 'echarts'
const comment = {
  install (Vue) {
    Vue.prototype.$echarts = echarts
    Vue.component('seduEcharts', seduEcharts)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}

export default comment
