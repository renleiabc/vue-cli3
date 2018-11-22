<!-- 使用vue来做局部刷新 -->
<template>
    <div>
        <slot></slot>
        <slot name='wise'
            class="demo"></slot>
        <el-radio-group v-model="tabView">
            <el-radio-button label="simple1"
                @click="toSim(1)">
                <button>页面一</button></el-radio-button>
            <el-radio-button label="simple2"
                @click="toSim(2)"><button>页面二</button></el-radio-button>
        </el-radio-group>
        <component :is="tabView"></component>
    </div>
</template>

<script>
import simple1 from "../simple/simple1";
import simple2 from "../simple/simple2";
export default {
  data() {
    return {
      tabView: "simple1"
    };
  },
  methods: {
    toSim(index) {
      console.log(index);
      this.tabView = `simple${index}`;
    }
  },
  components: {
    simple1,
    simple2
  }
};
</script>
<style  scoped>
</style>
