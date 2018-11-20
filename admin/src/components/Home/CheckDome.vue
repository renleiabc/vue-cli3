<!--  -->
<template>
    <div>
        <ul>
            <li v-for="(item, index) in list"
                :data-index="index"
                @click="item.check && setListCheck(index)"
                :key="index">
                <span>{{ item.check }}</span>
                <span>{{ item.label }}</span>
            </li>
        </ul>
        <button @click="flag && btn()">点击</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { check: false, label: "1" },
        { check: true, label: "2" },
        { check: false, label: "3" }
      ],
      flag: true
    };
  },
  created() {},
  mounted() {},
  methods: {
    setListCheck: function(idx) {
      var check = this.list[idx].check;
      this.list[idx].check = check === true ? false : true;
    },
    btn() {
      console.log("11111111111111");
    }
  },
  components: {},
  computed: {}
};
</script>
<style  scoped>
</style>
