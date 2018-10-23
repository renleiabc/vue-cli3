

<script>
var getChildrenTextContent = function(children) {
  return children
    .map(function(node) {
      return node.children ? getChildrenTextContent(node.children) : node.text;
    })
    .join("");
};
export default {
  data() {
    return {};
  },
  render: function(createElement) {
    // 创建 kebab-case 风格的ID
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, "-")
      .replace(/(^-|-$)/g, "");
    console.log(this.$slots.default);
    return createElement("h" + this.level, [
      createElement(
        "a",
        {
          attrs: {
            name: headingId,
            href: "#" + headingId
          }
        },
        this.$slots.default
      )
    ]);
  },
  props: {
    level: {
      type: Number,
      required: true
    }
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
