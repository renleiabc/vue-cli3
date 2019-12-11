/*
 * @Author: Liang Liang
 * @Date: 2018-07-10 15:14:20
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-10 15:47:11
 * @Description:
 */

<template>
  <div :id="domId"
       :class="cname"
       :style="myStyle"></div>
</template>

<script>
export default {
  data () {
    return {
      myEcharts: null
    }
  },
  props: {
    myStyle: {
      type: String,
      default: 'width:20vw;height:20vw;'
    },
    cname: {
      type: String,
      default: ''
    },
    option: {
      type: Object,
      required: true
    },
    domId: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      const myEcharts = this.$echarts.init(document.querySelector('#' + this.domId))
      this.myEcharts = myEcharts
      this.checkAndSetOption()
      window.addEventListener('resize', () => { this.myEcharts.resize() })
    })
  },
  beforeDestroy () {
    if (!this.myEcharts) {
      return
    }
    this.myEcharts.dispose()
    this.myEcharts = null
  },
  watch: {
    option (option) {
      this.checkAndSetOption()
    }
  },
  methods: {
    checkAndSetOption () {
      let option = this.option // 配置等于父组件传过来的数据
      if (Object.keys(option).length > 0) {
        this.myEcharts.setOption(option) // 渲染出来
        this.myEcharts.hideLoading() // 隐藏加载动画
      } else {
        // 加载动画
        this.myEcharts.showLoading({
          maskColor: 'rgba(255, 255, 255, 0)'
        })
      }
    }
  }
}
</script>
