/*
 * @Author: Liang Liang
 * @Date: 2018-07-06 17:25:04
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-07 17:55:29
 * @Description: 语言切换组件
 */
<template>
  <el-dropdown @command="_handleSetLanguage"
               :class="cname"
               :style="myStyle">
    <span class="el-dropdown-link">
      {{my18n.messages[my18n.locale].label}}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item,index) of my18n.messages"
                        :key="index"
                        :command="item.type"
                        :disabled="my18n.locale===item.type"
                        style="display:block">{{item.label}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      option: {
        cookies: {
          key: 'language',
          expires: 365
        }
      }
    }
  },
  props: {
    cname: {
      type: String,
      default: ''
    },
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
  },
  created () {
    if (!this.my18n) {
      console.warn('need to use vue-i18n')
      return false
    }

    if (this.cookies) {
      const cookies = {
        key: this.cookies
      }
      this.option.cookies = {
        ...this.option.cookies,
        ...cookies
      }
    }

    if (this.expires) {
      const cookies = {
        expires: this.expires
      }
      this.option.cookies = {
        ...this.option.cookies,
        ...cookies
      }
    }

    const lang = this._getSavedLanguage()
    if (lang) {
      this.my18n.locale = lang
    }
  },
  methods: {
    _getSavedLanguage () {
      return Cookies.get(this.option.cookies.key)
    },
    _setSavedLanguage () {
      Cookies.set(this.option.cookies.key, this.my18n.locale, {
        expires: this.option.cookies.expires
      })
    },
    _initLanguage (lang) {
      this.my18n.locale = lang
    },
    _handleSetLanguage (lang) {
      this._initLanguage(lang)
      this._setSavedLanguage()
    }
  }
}
</script>
