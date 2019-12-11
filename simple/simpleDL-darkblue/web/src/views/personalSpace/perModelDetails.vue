/*
 * @Author:任雷雷
 * @Date: 2018-07-12 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-12 10:31:59
 * @Description:模型预测详情
<template>
    <div>模型预测详情{{index}}</div>
</template>

<script>
export default {
  data () {
    return {
      index: ''
    }
  },
  created () {
    this.index = this.$route.params.perModelId
    console.log(this.$route.params)
  },
  mounted () {},
  methods: {},
  components: {},
  computed: {}
}
</script>
<style  scoped>
</style>
