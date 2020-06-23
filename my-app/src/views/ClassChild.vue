<!--
 * @Author: renlei
 * @Date: 2020-06-23 11:48:01
 * @LastEditors: renlei
 * @LastEditTime: 2020-06-23 17:36:18
 * @Description: 
-->
<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="1000"
      :current-page.sync="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleClick(row) {
      this.$router.push({ name: 'ClassChild', params: { id: row.id } });
    },
    handleCurrentChange(val) {
      this.$router.push({ path: '/class', query: { page: val } });
    }
  },
  watch: {
    $route: {
      // val是改变之后的路由，oldVal是改变之前的val
      handler: function(val, oldVal) {
        console.log(val, oldVal);
      },
      immediate: true,
      // 深度观察监听
      deep: true
    }
  },
  components: {},
  computed: {
    currentPage: {
      get: function() {
        return parseInt(this.$route.query.page) || 1;
      },
      set: function(newValue) {
        console.log(newValue);
        return newValue;
      }
    }
  }
};
</script>
