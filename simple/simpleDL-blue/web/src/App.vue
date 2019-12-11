/*
 * @Author: Liang Liang
 * @Date: 2018-07-06 17:14:40
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-16 16:11:52
 * @Description:
 */
<template>
  <div id="app"
       :class="this.$i18n.locale">
    <transition name="fade-transform"
                mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  created () {}
}
</script>
