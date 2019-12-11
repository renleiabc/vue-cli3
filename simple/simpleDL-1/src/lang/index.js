/*
 * @Author: Liang Liang
 * @Date: 2018-07-06 17:04:34
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-11 11:43:56
 * @Description:
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import ElementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
// import ElementDeLocale from 'element-ui/lib/locale/lang/de' // element-ui lang
import EnLocale from './en/'
import ZhLocale from './zh/'
// import DeLocale from './de/'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages: {
    zh: {
      type: 'zh',
      label: '简体中文',
      ...ZhLocale,
      ...ElementZhLocale
    },
    en: {
      type: 'en',
      label: 'English',
      ...EnLocale,
      ...ElementEnLocale
    }
    // de: {
    //   type: 'de',
    //   label: 'German',
    //   ...DeLocale,
    //   ...ElementDeLocale
    // }
  }
})

export default i18n
