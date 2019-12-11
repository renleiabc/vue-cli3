/*
 * @Author: Liang Liang
 * @Date: 2018-07-07 17:48:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-07 17:53:09
 * @Description:
 */
import LanguageSwitch from './languageSwitch'

const comment = {
  install (Vue) {
    Vue.component('SeduLanguageSwitch', LanguageSwitch)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}

export default comment
