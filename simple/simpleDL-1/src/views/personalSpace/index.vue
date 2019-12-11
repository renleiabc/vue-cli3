/*
 * @Author:任雷雷
 * @Date: 2018-08-02 10:04:31
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-08-08 11:24:32
 * @Description:个人空间-开发环境视图
 */
<template>
    <transition name="fade-transform" mode="out-in">
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
      let arr = [
        'perCreateDevelop',
        'perDevelopDetails',
        'perCreateTask',
        'perTraningDetails',
        'perCreateModel',
        'perModelDetails'
      ]
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
