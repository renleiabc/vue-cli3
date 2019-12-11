/*
 * @Author: Liang Liang
 * @Date: 2018-08-08 10:45:41
 * @LastEditors: 少侠
 * @LastEditTime: 2018-10-18 10:29:20
 * @Description: 404 page
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
