<!--  -->
<template>
    <div>
        <label>
            {{label}}:
            <input type="text"
                :value="value"
                v-bind="$attrs"
                v-on="$listeners"
                class="demo-input">
        </label>
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
    listeners() {
      return {
        ...this.$listeners,
        input: event => {
          this.$emit("input", event.target.value);
        }
      };
    }
  },
  components: {},
  computed: {},
  props: ["label", "value"],
  inheritAttrs: false
};
</script>
<style>
.demo-input {
  border: 1px solid #333;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  width: 200px;
  font-size: 16px;
}
</style>
