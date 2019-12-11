/*
* @Author: aFei
* @Date: 2018-07-10 15:52:29
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:16:08
*/
<template>
  <div class="views-cluster-monitoring-namespaces">
    <div class="tab-select">
      <div>
        <span class="tab-select-title">{{$t("views.clusterMonitoring.name")}}</span>
        <el-input v-model="tableData1.sel.name"
                  :placeholder='$t("views.clusterMonitoring.enter")'></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.clusterMonitoring.creationTime")}}</span>
        <el-date-picker v-model="tableData1.sel.full_time"
                        type="daterange"
                        align="right"
                        value-format='yyyy-MM-dd'
                        unlink-panels
                        range-separator="-"
                        :start-placeholder='$t("views.clusterMonitoring.beginTime")'
                        :end-placeholder='$t("views.clusterMonitoring.endTime")'
                        :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.clusterMonitoring.spaceType")}}</span>
        <el-select v-model="tableData1.sel.type"
                   :placeholder='$t("views.clusterMonitoring.chose")'>
          <el-option v-for="item in space_type"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.clusterMonitoring.user")}}</span>
        <el-input v-model="tableData1.sel.user_name"
                  :placeholder='$t("views.clusterMonitoring.enter")'></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.clusterMonitoring.status")}}</span>
        <el-select v-model="tableData1.sel.status"
                   :placeholder='$t("views.clusterMonitoring.chose")'>
          <el-option v-for="item in space_status"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button class="btn light small"
                   @click="clearSearch('tableData1')">{{$t("views.clusterMonitoring.reset")}}</el-button>
        <el-button class="btn light small"
                   @click="doSearch('tableData1')">{{$t("views.clusterMonitoring.select")}}</el-button>
      </div>
    </div>
    <el-table class="tab-content"
              @sort-change="sortTable"
              :data="tableData1.msg"
              v-loading="tableData1.loading"
              border>
      <el-table-column type="index"
                       :label='$t("views.clusterMonitoring.serialNumber")'
                       align="center"
                       width="60"></el-table-column>
      <el-table-column :label='$t("views.clusterMonitoring.namespaceName")'
                       sortable='custom'
                       prop="namespace_name"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link class="link"
                       :to="{name:'namespacesDetail',query:{name:scope.row.namespace_name}}">{{scope.row.namespace_name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       show-overflow-tooltip
                       :label='$t("views.clusterMonitoring.project")'></el-table-column>
      <el-table-column prop="type"
                       align="center"
                       width="120"
                       :label='$t("views.clusterMonitoring.spaceType")'></el-table-column>
      <el-table-column prop="user_name"
                       show-overflow-tooltip
                       :label='$t("views.clusterMonitoring.user")'></el-table-column>
      <el-table-column prop="status"
                       align="center"
                       width="140"
                       :label='$t("views.clusterMonitoring.status")'></el-table-column>
      <el-table-column prop="created_at"
                       align="center"
                       sortable='custom'
                       width="180"
                       :label='$t("views.clusterMonitoring.creationTime")'></el-table-column>
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
  name: 'namespaces',
  data () {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      tableData1: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/cluster/namespacelist',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          name: '',
          status: '',
          type: '',
          sort: '-created_at',
          user_name: '',
          full_time: '',
          start_time: '',
          end_time: ''
        }
      },
      pickerOptions: {
        shortcuts: [{
          text: this.$t('views.clusterMonitoring.recentOneWeek'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('views.clusterMonitoring.recentOneMonth'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('views.clusterMonitoring.recentThreeMonth'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      space_type: [],
      space_status: []
    }
  },
  methods: {
    getActiveTab (name) { // 获取当前展示的表格、搜索等信息
      this.linTabData = name
      this.linUrl = this[name].url
      this.initMsg()
    },
    // 表格排序
    sortTable (event) {
      if (event.order === 'descending') {
        this.tableData1.sel.sort = '-' + event.prop
      } else {
        this.tableData1.sel.sort = event.prop
      }
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
    objToArr (obj) {
      let arr = []
      if (obj) {
        for (let key in obj) {
          arr.push(obj[key])
        }
      }
      return arr
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
        if (this[this.linTabData].sel.full_time === '' || this[this.linTabData].sel.full_time === null) {
          this[this.linTabData].sel.start_time = ''
          this[this.linTabData].sel.end_time = ''
        } else {
          this[this.linTabData].sel.start_time = this[this.linTabData].sel.full_time[0] + ' 00:00:00'
          this[this.linTabData].sel.end_time = this[this.linTabData].sel.full_time[1] + ' 23:59:59'
        }
        lin = Object.assign({}, lin, this[this.linTabData].sel)
      }
      this.$axios.get(this[this.linTabData].url, {params: lin}).then(data => {
        // 根据后台接口更改
        let tableDate = this.objToArr(data.data.data.list)
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
    this.getActiveTab('tableData1')
    this.space_status = [
      {
        'label': 'Active',
        'value': 'Active'
      },
      {
        'label': 'Terminating',
        'value': 'terminating'
      }
    ]
    this.space_type = [
      {
        'label': this.$t('views.clusterMonitoring.personalSpace'),
        'value': 1
      },
      {
        'label': this.$t('views.clusterMonitoring.projectSpace'),
        'value': 2
      }
    ]
  }
}
</script>
