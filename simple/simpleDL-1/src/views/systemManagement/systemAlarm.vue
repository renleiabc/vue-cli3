/*
* @Author: aFei
* @Date: 2018-07-10 15:52:29
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:08:14
*/
<template>
  <div class="views-system-management-system-alarm">
    <div class="tab-select">
      <div>
        <span class="tab-select-title">{{$t("views.systemManagement.nodeName")}}</span>
        <el-select v-model="tableData.sel.node_name"
                   clearable
                   filterable
                   :placeholder='$t("views.systemManagement.chose")'>
          <el-option v-for="item in node_name"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.systemManagement.warnDate")}}</span>
        <el-date-picker v-model="tableData.sel.full_date"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        :start-placeholder='$t("views.systemManagement.beginTime")'
                        :end-placeholder='$t("views.systemManagement.endTime")'
                        :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.systemManagement.warnStates")}}</span>
        <el-select v-model="tableData.sel.warn_status"
                   :placeholder='$t("views.systemManagement.chose")'>
          <el-option v-for="item in warn_status"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.systemManagement.warnType")}}</span>
        <el-select v-model="tableData.sel.warn_type"
                   :placeholder='$t("views.systemManagement.chose")'>
          <el-option v-for="item in warn_type"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button class="btn light small"
                   @click="clearSearch('tableData')">{{$t("views.systemManagement.reset")}}</el-button>
        <el-button class="btn light small"
                   @click="doSearch('tableData')">{{$t("views.systemManagement.select")}}</el-button>
      </div>
    </div>
    <el-table class="tab-content"
              :data="tableData.msg"
              v-loading="tableData.loading"
              border>
      <el-table-column prop="node_name"
                       width="200"
                       align="center"
                       :label='$t("views.systemManagement.nodeName")'></el-table-column>
      <el-table-column prop="warn_type.label"
                       align="center"
                       width="100"
                       :label='$t("views.systemManagement.warnType")'></el-table-column>
      <el-table-column prop="warn_content"
                       :label='$t("views.systemManagement.warnContent")'></el-table-column>
      <el-table-column :label='$t("views.systemManagement.warnStates")'
                       width="100"
                       align="center">
        <template slot-scope="scope">
          <span :class="scope.row.warn_status.value===1?'':scope.row.warn_status.value===2?'green':scope.row.warn_status.value===3?'yellow':'red'">{{scope.row.warn_status.label}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="warn_date"
                       align="center"
                       width="260"
                       :label='$t("views.systemManagement.warnDate")'
                       sortable></el-table-column>

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
                   :current-page.sync="tableData.Pagination.page"
                   :total="tableData.Pagination.total_count"
                   @current-change="changePage('tableData')"></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'systemAlarm',
  data () {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      node_name: [],
      warn_status: [],
      warn_type: [],
      pickerOptions: {
        shortcuts: [{
          text: this.$t('views.systemManagement.recentOneWeek'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('views.systemManagement.recentOneMonth'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('views.systemManagement.recentThreeMonth'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '//rap2api.taobao.org/app/mock/21549/system-warn-table',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          node_name: '',
          full_date: '',
          star_date: '',
          end_date: '',
          warn_type: '',
          warn_status: ''
        }
      }
    }
  },
  methods: {
    getActiveTab (name) { // 获取当前展示的表格、搜索等信息
      this.linTabData = name
      this.linUrl = this[name].url
      this.initMsg()
    },
    clearSearch (name) { // 清除搜索条件
      for (let key in this[name].sel) {
        this[name].sel[key] = ''
      }
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1
      }
      this.getActiveTab(name)
    },
    doSearch (name) { // 按条件搜索
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1
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
      if (this[this.linTabData].sel !== undefined) {
        if (this[this.linTabData].sel.full_date && this[this.linTabData].sel.full_date.length === 2) {
          this[this.linTabData].sel.star_date = this[this.linTabData].sel.full_date[0]
          this[this.linTabData].sel.end_date = this[this.linTabData].sel.full_date[1]
        } else {
          this[this.linTabData].sel.star_date = ''
          this[this.linTabData].sel.end_date = ''
        }
        lin = Object.assign({}, lin, this[this.linTabData].sel)
      }
      this.$axios.get(this[this.linTabData].url, {params: lin}).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.sys_log_table
        // 数据处理
        // this[this.linTabData].msg = [...tableDate]
        this[this.linTabData].msg = [...tableDate]
        // 重置数据总数
        if (this[this.linTabData].Pagination !== undefined) {
          this[this.linTabData].Pagination.total_count = data.data.data.total_count
        }
        this[this.linTabData].loading = false
      })
    }
  },
  created () { // 每有一个表格就要写个初始化赋值
    this.getActiveTab('tableData')
    // 获取搜索的数据
    this.$axios.get('//rap2api.taobao.org/app/mock/21549/systemManagement/systemAlarm/sel').then(data => {
      this.node_name = [...data.data.data.node_name]
      this.warn_status = [...data.data.data.warn_status]
      this.warn_type = [...data.data.data.warn_type]
    })
  }
}
</script>
