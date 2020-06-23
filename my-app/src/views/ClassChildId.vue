<!--
 * @Author: renlei
 * @Date: 2020-06-23 15:36:06
 * @LastEditors: renlei
 * @LastEditTime: 2020-06-23 16:27:13
 * @Description: 
-->
<template>
  <div>
    <el-button @click="returnBack">返回</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    returnBack() {
      this.$router.back(-1);
    }
  },
  watch: {
    $route: {
      // val是改变之后的路由，oldVal是改变之前的val
      handler: function(val, oldVal) {
        console.log(val, oldVal);
      },
      immediate: true,
      // 深度观察监听
      deep: true
    }
  },
  components: {},
  computed: {}
};
</script>
