
/*
* @Author: aFei
* @Date: 2018-07-10 15:52:29
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-08-15 10:31:59
 * @Description:项目空间-我的项目
*/
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
