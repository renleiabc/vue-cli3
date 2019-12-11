/*
* @Author: aFei
* @Date: 2018-07-10 15:52:29
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:08:09
*/
<template>
  <div class="views-system-management-system-log">
    <div class="tab-select">
      <div>
        <span class="tab-select-title">{{$t("views.systemManagement.optionContent")}}</span>
        <el-input v-model="tableData.sel.information"
                  :placeholder='$t("views.systemManagement.enter")'></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.systemManagement.optionData")}}</span>
        <el-date-picker v-model="tableData.sel.full_date"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="-"
                        :start-placeholder='$t("views.systemManagement.beginTime")'
                        :end-placeholder='$t("views.systemManagement.endTime")'
                        :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.systemManagement.userName")}}</span>
        <el-input v-model="tableData.sel.name"
                  :placeholder='$t("views.systemManagement.enter")'></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.systemManagement.optionType")}}</span>
        <el-select v-model="tableData.sel.type"
                   :placeholder='$t("views.systemManagement.chose")'>
          <el-option v-for="item in option_type"
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
    <div>
      <el-button class="btn dark mid"
                 @click="exportLog">{{$t("views.systemManagement.printReport")}}</el-button>
    </div>
    <el-table class="tab-content"
              :data="tableData.msg"
              v-loading="tableData.loading"
              border>
      <el-table-column type="index"
                       align="center"
                       :label='$t("views.systemManagement.serialNumber")'
                       width="60"></el-table-column>
      <el-table-column prop="information"
                       show-overflow-tooltip
                       :label='$t("views.systemManagement.optionContent")'></el-table-column>
      <el-table-column prop="type"
                       show-overflow-tooltip
                       :label='$t("views.systemManagement.optionType")'></el-table-column>
      <el-table-column prop="ip"
                       width="180"
                       align="center"
                       show-overflow-tooltip
                       :label='$t("views.systemManagement.ip")'></el-table-column>
      <el-table-column prop="created_at"
                       align="center"
                       width="200"
                       show-overflow-tooltip
                       :label='$t("views.systemManagement.optionData")'
                       sortable></el-table-column>
      <el-table-column prop="username"
                       width="200"
                       show-overflow-tooltip
                       :label='$t("views.systemManagement.userName")'></el-table-column>
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
  name: 'systemLog',
  data () {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      option_type: [],
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
        url: '/system/systemlog',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          information: '',
          full_date: '',
          start_time: '',
          end_time: '',
          name: '',
          type: ''
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
    exportLog () {
      let url = window.Simple.php + '/v1/system/systemlogexport?access-token=' + JSON.parse(sessionStorage.getItem('userinfo')).access_token + '&type=' + this.tableData.sel.type + '&information=' + this.tableData.sel.information + '&name=' + this.tableData.sel.name + '&start_time=' + this.tableData.sel.start_time + '&end_time=' + this.tableData.sel.end_time
      let link = document.createElement('a')
      console.log(url)
      link.href = url
      document.body.appendChild(link)
      setTimeout(res => {
        link.click()
        document.body.removeChild(link)
      }, 5)
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
          this.tableData.sel.start_time = this.tableData.sel.full_date[0] + ' 00:00:00'
          this.tableData.sel.end_time = this.tableData.sel.full_date[1] + ' 23:59:59'
        } else {
          this[this.linTabData].sel.start_time = ''
          this[this.linTabData].sel.end_time = ''
        }
        lin = Object.assign({}, lin, this[this.linTabData].sel)
      }
      this.$axios.get(this[this.linTabData].url, {params: lin}).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.system_log
        // 数据处理
        this[this.linTabData].msg = [...tableDate]
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
    this.getActiveTab('tableData')
    // 获取搜索的数据
    this.$axios.get('/system/systemlogstatus').then(data => {
      this.option_type = [...data.data.data.type]
    })
  }
}
</script>
