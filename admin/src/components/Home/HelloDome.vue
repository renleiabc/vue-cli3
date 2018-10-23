<!--  -->
<template>
    <div>
        <label>
            {{ label }}
            <input :value="value"
                v-bind="$attrs"
                v-on="listeners">
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
  methods: {},
  components: {},
  props: ["value", "label"],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit("input", event.target.value),
        focus: event => this.$emit("focuVal", event.target.value)
      };
    }
  }
};
</script>
