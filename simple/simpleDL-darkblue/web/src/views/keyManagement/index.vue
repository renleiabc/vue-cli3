/*
* @Author: aFei
* @Date: 2018-07-10 15:52:29
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-07-24 16:53:39
*/
<template>
  <transition name="fade-transform"
              mode="out-in">
    <router-view>
    </router-view>
  </transition>
</template>

<script>
export default {
  name: 'index',
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
