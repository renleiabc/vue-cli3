<!--  -->
<template>
  <div>
    <div v-for="(item,index) in datas"
      :key="index" class="wow slideInLeft">
      {{item.type}}red
    </div>
  </div>

</template>

<script>
import { WOW } from "wowjs";

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
  mounted() {
    this.$nextTick(() => {
      // 在dom渲染完后,再执行动画
      var wow = new WOW({
        live: true,
        offset: 200
      });
      wow.init();
    });
  },
  methods: {},
  components: {},
  computed: {},
  props: ["datas"],
  watch: {
    datas() {
      this.$nextTick(() => {
        // 在dom渲染完后,再执行动画
        var wow = new WOW({
          live: true,
          offset: 200
        });
        wow.init();
      });
    }
  }
};
</script>
<style  scoped>
</style>
