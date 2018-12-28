<!-- 组件的子页面A -->
<template>
  <div>
      组件的子页面{{id}}
       <render-jsx :titles="title"></render-jsx>
      </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      title: [
        { name: "任磊", id: "1111" },
        { name: "张三", id: "2222" },
        { name: "李四", id: "3333" },
        { name: "王五", id: "4444" }
      ]
    };
  },
  created() {
    console.log("=====");
    this.id = this.$route.params.id;
  },
  mounted() {},
  methods: {
    resetData() {
      this.id = this.$route.params.id;
    }
  },
  components: {},
  computed: {},
  watch: {
    // $route: {
    //   handler: "resetData",
    //   immediate: true
    // }
  }
};
</script>
<style  scoped>
</style>
