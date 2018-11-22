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
                    <ul>
                        <li>SassASAs</li>
                        <li>asdasda</li>
                        <li>asdasd</li>
                        <li>asdasd</li>
                        <li>asdasdas</li>
                        <li>asdasda</li>
                        <li>asdasd</li>
                        <li>asdasd</li>
                        <li>asdasdas</li>
                        <li>asdasda</li>
                        <li>asdasd</li>
                        <li>asdasd</li>
                        <li>asdasdas</li>
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
      states: ["Alabama"]
    };
  },
  created() {},
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods: {
    selectBlur() {
      this.select = false;
    },
    selectFocus() {
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
    }
  },
  components: {},
  computed: {},
  watch: {
    value9(newVal, oldVal) {
      console.log(newVal);
    },
    serchInputValue(newVal, oldVal) {
      console.log(newVal);
    }
  }
};
</script>
<style  scoped>
</style>
