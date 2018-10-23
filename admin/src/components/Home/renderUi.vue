
<script>
export default {
  data() {
    return {};
  },
  render: function(createElement) {
    console.log(this.items.length);
    if (this.items.length) {
      return createElement(
        "ul",
        {
          style: {
            width: "200px",
            height: "400px",
            background: "red"
          }
        },
        this.items.map(function(item) {
          return createElement("li", {
            style: {
              color: "lime",
              font: "bold 20px arial,sans-serif"
            },
            domProps: {
              innerHTML: item.name
            }
          });
        })
      );
    } else {
      return createElement("p", "No items found.");
    }
  },
  props: ["items"],
  created() {},
  mounted() {},
  methods: {},
  components: {},
  computed: {}
};
</script>
<style  scoped>
</style>
