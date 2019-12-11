/*
 * @Author: Liang Liang
 * @Date: 2018-07-07 08:24:26
 * @LastEditors: 少侠
 * @LastEditTime: 2018-09-26 14:14:57
 * @Description: 使用频率非常高的全局函数
 */
import {
  mapGetters
} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      // 添加到全局计算属性中
      STORE_THEME_COLOR: 'themeColor',
      STORE_THEME_LANG: 'language',
      STORE_TEMPLATES: 'templates'
    })
  },
  methods: {
    mixinGoBack () {
      this.$router.go(-1)
    },
    /**
     *
     * @param {时间戳} timestamp
     * @param {时间格式 年月日 y-m-d} formatTime
     */
    timestampToTime (timestamp, formatTime) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      if (timestamp < 10000000000) {
        timestamp = timestamp * 1000
      }
      var date = new Date(timestamp)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ''
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      if (formatTime === 'y-m-d') {
        return Y + M + D
      } else if (formatTime === 'h:m:s') {
        return h + m + s
      } else {
        return Y + M + D + ' ' + h + m + s
      }
    },
    /**
     * url（必填）请求地址  params（可选）参数  message（可选）自定义提示信息
     */
    mixinConfirm (url, params, message) {
      let msg = message || this.$t('views.dialogText.deleteConfirm')
      return this.$confirm(msg, this.$t('views.dialogText.tip')).then(() => {
        return this.$post(url, params).then(data => {
          return new Promise((resolve) => {
            if (data.code === 200) {
              // 删除单个行
              this.$message({
                type: 'success',
                message: data.message
              })
              resolve(true)
            }
          })
        })
      }).catch(() => {
        return new Promise((resolve, reject) => {
          resolve(false)
        })
      })
    },
    mixinGetLess (filepath = '', filename) {
      return require(`../assets/template/${
        this.STORE_TEMPLATES
      }/${filepath}${filename}.less`)
    },
    mixinGetImage (filepath = '', filename = 'noimg.gif') {
      return require(`../assets/template/${
        this.STORE_TEMPLATES
      }/${filepath}${filename}`)
    }
  }
}
