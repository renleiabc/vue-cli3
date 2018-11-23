<!-- 组件 -->
<template>
    <div>
        <slot></slot>
        <slot name='wise'
            class="demo"></slot>
        <el-radio-group v-model="tabView">
            <el-radio-button label="simple1">
                <button @click="toSim(1)">页面一</button>
            </el-radio-button>
            <el-radio-button label="simple2">
                <button @click="toSim(2)">页面二</button>
            </el-radio-button>
        </el-radio-group>
        <keep-alive>
            <component :is="tabView"></component>
        </keep-alive>
        <div class="demo-select">
            <span class="demo-title">监听：</span>
            <input type="text"
                v-model="serchInputValue"
                class="demo-input"
                @blur="selectBlur"
                @focus="selectFocus">
            <div class="demo-select-box"
                v-show="select">
                <el-scrollbar style="height:100%;">
                    <ul @click="valueClick"
                        @mouseenter="enter"
                        @mouseleave="leave">
                        <li v-if="selectData.length ===0">
                            暂无数据
                        </li>
                        <li v-for="(item,index) in selectData"
                            :key="index"
                            @mousedown="selectClick(index)">
                            {{item.label}}
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </div>
        <div>
            <el-select v-model="value9"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="home-link">
            <router-link v-for="(item) in dataLink"
                :key="item.id"
                :to="{name:'a',params:{id:item.id}}" >组件{{item.name}}</router-link>
        </div>
        <div>
            <!-- 通俗点来讲,就是一个列表项要有一个key值,这个key值如果唯一且未发生变化,则dom就会被复用,反之则需要重新生成-->
            <router-view :key="$route.path"></router-view>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tabView: "simple1",
      serchInputValue: "",
      options4: [],
      value9: [],
      list: [],
      loading: false,
      select: false,
      states: ["Alabama"],
      selectData: [],
      dataLink: [{ name: "A", id: "a" }, { name: "B", id: "b" }]
    };
  },
  created() {
    // console.log(this.$route);
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods: {
    enter() {
      // console.log("++++++s");
      //  this.select = true;
    },
    leave() {
      // this.select = false;
    },
    valueClick() {
      // console.log("++++++s");
    },
    selectBlur() {
      this.select = false;
    },
    selectFocus() {
      //  this.getSelect();
      this.select = true;
    },
    toSim(index) {
      console.log(index);
      this.tabView = `simple${index}`;
    },
    remoteMethod(query) {
      console.log(query);
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    },
    getSelect() {
      this.axios.get("select").then(res => {
        // console.log(JSON.stringify(res));
        this.selectData = res.data.data;
      });
    },
    selectClick(index) {
      console.log(index);
      this.serchInputValue = this.selectData[index].label;
    }
  },
  components: {},
  computed: {},
  watch: {
    value9(newVal, oldVal) {
      console.log(newVal);
    },
    serchInputValue: {
      handler: "getSelect",
      immediate: true
    }
  }
};
</script>
<style  scoped>
</style>
