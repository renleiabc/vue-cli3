<!--  -->
<template>
  <div class="home-link">
    <router-link to='/'
                 tag="a"
                 exact>首页</router-link>
    <router-link to='/about'
                 tag="a">关于</router-link>
    <router-link to='/algorithm'
                 tag='a'>算法</router-link>
    <router-link to='/canvas'
                 tag='a'>canavs</router-link>
    <router-link to='/component'
                 tag='a'>组件</router-link>
    <router-link to='/time'
                 tag='a'>时间</router-link>
    <router-link to='/upload'
                 tag='a'>vue-quill</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  components: {},
  computed: {}
};
</script>
<style  scoped>
</style>
