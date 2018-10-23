<template>
    <div>
        <h2>sdasddsadas</h2>
        <h1>This is an about page</h1>
        <input type="text"  v-blur="color" v-focus>
    </div>
</template>
<script>
export default {
  data() {
    return {
      color: "lime"
    };
  },
  directives: {
    blur: {
      inserted: function(el, banding) {
        el.style = "background:" + banding.value;
        el.blur();
      }
    }
  },
  created() {},
  methods: {}
};
</script>
