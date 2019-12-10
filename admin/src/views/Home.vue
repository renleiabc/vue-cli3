<template>
  <div>
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
    <slot-dome></slot-dome>
    <check-dome></check-dome>
    <span>{{num}}</span>
    <button @click="updateDom">update</button>

    <div class="wow slideInUp wow-div">

    </div>
    <slot-com :datas="testData">asdas</slot-com>
    <el-select v-model="value1"
      placeholder="请选择">
      <el-option v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { WOW } from "wowjs";
export default {
  name: "home",
  data() {
    return {
      searchInputValue: "",
      i: 1,
      value: "",
      num: 0,
      items: [{ name: "firts" }, { name: "second" }],
      testData: [
        { type: "success", text: "success" },
        { type: "error", text: "error" },
        { type: "warn", text: "warning" },
        { type: "default", text: "default" }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value1: ""
    };
  },
  created() {
    // console.log(process.env.VUE_APP_SECRET);
  },
  //数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
  beforeUpdate: function() {
    console.group("beforeUpdate 更新前状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  updated: function() {
    console.group("updated 更新完成状态===============》");
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  //实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeDestroy() {
    console.group("beforeDestroy 销毁前状态===============》");
  },
  //Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
  destroyed() {
    console.group("destroyed 销毁完成状态===============》");
  },
  methods: {
    fetchPostList() {
      this.i++;
      console.log(this.i);
    },
    updateDom() {
      this.num++;
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
    },
    cases() {
      this.$nextTick(() => {
        // 在dom渲染完后,再执行动画
        var wow = new WOW({
          live: false
        });
        wow.init();
      });
    }
  },
  components: {}
};
</script>
