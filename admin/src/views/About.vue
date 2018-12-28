<template>
    <div class="animated bounceInRight yourElement">
        <h2>sdasddsadas</h2>
        <h1>This is an about page</h1>
    </div>
    <!-- <div>
    <el-form-item label="时间选择"
      prop="addTime">
      <el-date-picker :editable="false"
        unlink-panels
        v-model="form.addTime"
        type="daterange"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        :default-value="defaultValue">
      </el-date-picker>
    </el-form-item>
  </div> -->
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
// export default {
//   data() {
//     let tool = this.tool;
//     let _this = this;
//     return {
//       form: {
//         time: [], //为时间范围段
//         addTime: [] //为最终选择的时间，组件绑定的时间
//       },
//       formRules: {
//         addTime: [
//           { required: true, message: "时间不能为空！", trigger: "blur" }
//         ]
//       },
//       pickerOptions: {
//         disabledDate(time) {
//           let t = _this.tool.date.format(new Date(), "yyyy-MM-dd");
//           t = t + " 00:00:00";
//           let myDate = new Date(_this.form.time[0]);
//           let year = myDate.getFullYear();
//           let month = myDate.getMonth();
//           let date = myDate.getDate();
//           if (_this.form.time[1]) {
//             if (new Date(year, month, date).getTime() < new Date(t).getTime()) {
//               return (
//                 time.getTime() > new Date(_this.form.time[1]).getTime() ||
//                 time.getTime() < new Date(t).getTime()
//               );
//             }
//             return (
//               time.getTime() > new Date(_this.form.time[1]).getTime() ||
//               time.getTime() < new Date(year, month, date).getTime()
//             );
//           } else {
//             if (new Date(year, month, date).getTime() < new Date(t).getTime()) {
//               return time.getTime() < new Date(t).getTime();
//             }
//             return time.getTime() < new Date(year, month, date).getTime();
//           }
//         }
//       },
//       defaultValue: tool.date.format(new Date(), "yyyy-MM-dd")
//     };
//   }
// };
</script>
