<!--  -->
<template>
  <div>
    <div v-for="(item,index) in datas"
      :key="index">
      {{item}}red
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  errorCaptured(err, vm, info) {
    console.group(err);
    console.group(vm);
    console.group(info);
  },
  mounted() {},
  methods: {},
  components: {},
  computed: {},
  props: ["datas"]
};
</script>
<style  scoped>
</style>
