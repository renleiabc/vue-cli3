## 国际化切换下拉菜单组件

```
//安装依赖
npm i -S vue-i18n element-ui js-cookie
npm i -S vue-language-switch
//配置好语言文件，下方有详细说明。
//运行项目
npm run dev
```

> 调用

```
main.js:
  import elementUI from 'element-ui';
  import i18n from './lang';
  import seduLanguageSwitch from 'vue-language-switch'

  //全局注册 elementUI 和 vue-language-switch
  Vue.use(elementUI, {
    i18n: (key, value) => i18n.t(key, value)
  })
  Vue.use(seduLanguageSwitch)

  // 加载i18n
  new Vue({
    el: '#app',
    i18n,
    components: {
      App
    },
    template: '<App/>'
  })


<template> 加如下代码，传入 $i18n 对象：
  <sedu-language-switch cname="views-main-el-header-el-dropdown"
                      :my18n="this.$i18n" />
```

> 参数

```
props: {
    // 自定义class
    cname: {
      type: String,
      default: ''
    },
    // 自定义行内样式
    myStyle: {
      type: String,
      default: ''
    },
    // i18n对象
    my18n: {
      type: Object,
      required: true
    },
    // cookies 存取的key
    cookies: {
      type: String,
      default: null
    },
    // cookies 时效
    expires: {
      type: Number,
      default: null
    }
  }
```

> vue-i18n 语言文件配置

```
src/
  ∟ lang/
    ∟ en/
        ∟ views/
          ∟ main.js
            ...
        ∟ index.js  //子语言包主入口 import子目录下的子文件 结构仅供参考


    ∟ index.js // * 全局配置在这里
      ---
        import Vue from 'vue'
        import VueI18n from 'vue-i18n'
        import ElementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
        import ElementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
        import ElementDeLocale from 'element-ui/lib/locale/lang/de' // element-ui lang
        import EnLocale from './en/'
        import ZhLocale from './zh/'
        import DeLocale from './de/'

        Vue.use(VueI18n)

        const i18n = new VueI18n({
          locale: 'zh', // set locale
          messages: {
            zh: {
              type: 'zh',           // * 必须
              label: '简体中文',     // * 必须
              ...ZhLocale,
              ...ElementZhLocale
            },
            en: {
              type: 'en',
              label: 'English',
              ...EnLocale,
              ...ElementEnLocale
            },
            de: {
              type: 'de',
              label: 'German',
              ...DeLocale,
              ...ElementDeLocale
            }
          }
        })

        export default i18n
      ---
```
