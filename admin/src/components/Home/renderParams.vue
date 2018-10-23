
<script>
export default {
  data() {
    return {};
  },
  render: function(createElement) {
    let child = {
      class: {
        child: true
      }
    };
    let first = createElement("span", child, "我是第一个span");
    let sencod = createElement("span", child, "我是第二个span");
    let params = {
      class: {
        create: true,
        animated: true,
        rotateIn: true,
        animate: true
      }
    };
    return createElement("div", params, [first, sencod]);
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
