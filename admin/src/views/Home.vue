<template>
    <div>
        <div>
            <router-link to='/'>home</router-link>
            <router-link to='/about'>about</router-link>
        </div>

        <input type="text"
            v-model="searchInputValue">
        <hello-world></hello-world>
        <hello-dome :value="value"
            label="密码"
            placeholder="请填写密码"
            @input="handleInput"
            @focuVal="handleFocus">
        </hello-dome>
        <getters-demo></getters-demo>
        <render-dome v-for="(btn, index) in testData"
            :type="btn.type"
            :text="btn.text"
            :index="index"
            :key="index">{{btn.text}}</render-dome>
        <render-ui :items="items"></render-ui>
    </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      searchInputValue: "",
      i: 1,
      value: "",
      items: [{ name: "firts" }, { name: "second" }],
      testData: [
        { type: "success", text: "success" },
        { type: "error", text: "error" },
        { type: "warn", text: "warning" },
        { type: "default", text: "default" }
      ]
    };
  },
  created() {
    // console.log(process.env.VUE_APP_SECRET);
  },
  methods: {
    fetchPostList() {
      this.i++;
      console.log(this.i);
    },
    handleInput(val) {
      console.log(val);
    },
    handleFocus(val) {
      console.log(val);
    }
  },
  watch: {
    searchInputValue: {
      handler: "fetchPostList",
      immediate: true // 首先，在watchers中，可以直接使用函数的字面量名称；其次，声明immediate:true表示创建组件时立马执行一次。
    }
  },
  components: {}
};
</script>
