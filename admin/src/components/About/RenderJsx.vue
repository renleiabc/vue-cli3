<script>
export default {
  data() {
    return {};
  },
  created() {},
  render(h) {
    var li = this.titles.map((item, index) => <li key={index}>{item.name}</li>);
    console.log(li);
    return <ul>{li}</ul>;
  },
  mounted() {},
  methods: {},
  components: {},
  computed: {},
  props: ["titles"]
};
</script>
