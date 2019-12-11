<!--
 * @Author: renlei
 * @Date: 2019-05-17 17:28:58
 * @LastEditors: renlei
 * @LastEditTime: 2019-08-27 15:47:11
 * @Description:项目空间-我的项目
 -->

<template>
  <transition name='form-fade'
              mode='in-out'>
    <router-view/>
  </transition>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    showNavigate (name) {
      // 需要显示按钮页面的路由name
      let arr = []
      if (arr.join(',').indexOf(name) !== -1) {
        this.$emit('showNavigate', true)
      } else {
        this.$emit('showNavigate', false)
      }
    }
  },
  created () {
    this.showNavigate(this.$route.name)
  },
  beforeRouteUpdate (to, from, next) {
    this.showNavigate(to.name)
    next()
  }
}
</script>
