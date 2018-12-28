<template>
  <div>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker v-model="value1"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker v-model="value2"
        align="right"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="changeTime"
        :default-value="timeDefaultShow"
        :picker-options="pickerOptions1">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeDefaultShow: new Date("2018-12-27"),
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: ""
    };
  },
  mounted() {
    console.log(this.value1);
  },
  methods: {
    changeTime(val) {
      console.log(this.value2);
    }
  }
};
</script>
