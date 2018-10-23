
<script>
export default {
  render(createElement) {
    let item = {
      class: {
        btn: true,
        success: this.type === "success",
        error: this.type === "error",
        warn: this.type === "warn",
        default: this.type === "default"
      },
      domProps: {
        innerHTML: this.$slots.default[0].text
      },
      on: {
        click: () => {
          this.clickHandle(this.index);
        }
      }
    };
    return createElement("div", item);
  },
  methods: {
    clickHandle(index) {
      // dosomething
      console.log(index);
    }
  },
  props: {
    type: {
      type: String,
      default: "default"
    },
    text: {
      type: String,
      default: "default"
    },
    index: {
      type: Number,
      default: 0
    }
  }
};
</script>
