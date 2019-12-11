/*
* @Author: 夏至
* @Date: 2018-07-10 15:52:29
*/

<template>
  <div class="views-cluster-monitoring-node-control">
    <el-table class="tab-content"
              :data="tableData1.msg"
              v-loading="tableData1.loading"
              @sort-change="addSort($event,'tableData1')"
              border>
      <el-table-column type="index"
                       :label='$t("views.systemMonitoring.serialNumber")'
                       width="80"
                       align="center"></el-table-column>
      <el-table-column :label='$t("views.systemMonitoring.userName")'
                       prop="user_name"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="personal_cpu_use"
                       show-overflow-tooltip
                       align="center"
                       :label='$t("views.systemMonitoring.CPU")'>
        <template slot-scope="scope">
          {{scope.row.personal_cpu_use?scope.row.personal_cpu_use:0}}核/{{scope.row.personal_cpu_total?scope.row.personal_cpu_total:0}}核
        </template>
      </el-table-column>
      <el-table-column prop="personal_memory_use"
                       show-overflow-tooltip
                       align="center"
                       :label='$t("views.systemMonitoring.RAM")'>
        <template slot-scope="scope">
          {{scope.row.personal_memory_use?scope.row.personal_memory_use:0}}G/{{scope.row.personal_memory_total?scope.row.personal_memory_total:0}}G
        </template>
      </el-table-column>
      <el-table-column prop="personal_gpu_use"
                       show-overflow-tooltip
                       align="center"
                       :label='$t("views.systemMonitoring.GPU")'>
        <template slot-scope="scope">
          {{scope.row.personal_gpu_use?scope.row.personal_gpu_use:0}}个/{{scope.row.personal_gpu_total?scope.row.personal_gpu_total:0}}个
        </template>
      </el-table-column>
      <el-table-column prop="created_at"
                       sortable
                       show-overflow-tooltip
                       align="center"
                       :label='$t("views.systemMonitoring.allocationTime")'></el-table-column>
      <el-table-column :label='$t("views.systemMonitoring.operation")'
                       align="center"
                       width="100">
        <template slot-scope="scope">
          <button class="btn"
                  @click="clearNamespace(scope.row)">清理</button>
        </template>
      </el-table-column>
      <!--暂无数据情况-->
      <div slot="empty">
        <div class="views-empty">
          <span class="views-empty-table"></span>
          <p class="views-empty-text">{{$t('views.table.noData')}}</p>
        </div>
      </div>
    </el-table>
    <el-pagination class="tab-page"
                   layout="prev, pager, next"
                   :page-size="pageSize"
                   :current-page.sync="tableData1.Pagination.page"
                   :total="tableData1.Pagination.total_count"
                   @current-change="changePage('tableData1')"></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'projectList',
  data () {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      tableData1: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/system/getpersonallist',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          sort: '-created_at'
        }
      }
    }
  },
  methods: {
    clearNamespace (row) {
      this.$confirm('是否清理分配的所有资源?', '资源清理', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/system/namespacedeleteall', { namespace_name: row.namespace_name, user_id: row.user_id }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getActiveTab('tableData1')
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      }).catch(() => {
      })
    },
    getActiveTab (name) { // 获取当前展示的表格、搜索等信息
      this.linTabData = name
      this.linUrl = this[name].url
      this.initMsg()
    },
    addSort (event, name) {
      if (event.order === 'descending') {
        this.tableData1.sel.sort = '-' + event.prop
      } else {
        this.tableData1.sel.sort = event.prop
      }
      this.getActiveTab(name)
    },
    changePage (name) { // 改变分页
      this.getActiveTab(name)
    },
    initMsg () {
      this[this.linTabData].loading = true
      let lin = {}
      if (this[this.linTabData].Pagination !== undefined) {
        lin = Object.assign({}, this[this.linTabData].Pagination, {
          count: this.pageSize
        })
      }
      this.$axios.get(this[this.linTabData].url, { params: lin }).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.list
        // 数据处理
        let arr = []
        // 数据处理
        for (const key in tableDate) {
          arr.push(tableDate[key])
        }
        this[this.linTabData].msg = arr
        // 重置数据总数
        if (this[this.linTabData].Pagination !== undefined) {
          this[this.linTabData].Pagination.total_count = data.data.data.total_count
        }
        this.pageSize = data.data.data.per_page || 10
        this[this.linTabData].loading = false
      })
    }
  },
  created () { // 每有一个表格就要写个初始化赋值
    this.getActiveTab('tableData1')
  }
}
</script>
