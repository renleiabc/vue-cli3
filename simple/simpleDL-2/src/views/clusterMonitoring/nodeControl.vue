/*
* @Author: aFei
* @Date: 2018-07-10 15:52:29
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-23 11:20:48
*/
<template>
  <div class="views-cluster-monitoring-node-control">
    <div class="tab-select">
      <div>
        <span class="tab-select-title">{{$t("views.clusterMonitoring.nodeName")}}</span>
        <el-input v-model="tableData1.sel.name"
                  :placeholder='$t("views.clusterMonitoring.enter")'></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.clusterMonitoring.creationTime")}}</span>
        <el-date-picker v-model="tableData1.sel.full_time"
                        type="daterange"
                        align="right"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="-"
                        :start-placeholder='$t("views.clusterMonitoring.beginTime")'
                        :end-placeholder='$t("views.clusterMonitoring.endTime")'
                        :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <!-- <div>
        <span class="tab-select-title">{{$t("views.clusterMonitoring.ip")}}</span>
        <el-input v-model="tableData1.sel.ip"
                  :placeholder='$t("views.clusterMonitoring.enter")'></el-input>
      </div> -->
      <div>
        <span class="tab-select-title">{{$t("views.clusterMonitoring.status")}}</span>
        <el-select v-model="tableData1.sel.node_status"
                   :placeholder='$t("views.clusterMonitoring.chose")'>
          <el-option v-for="item in node_status"
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
              :data="tableData1.msg"
              v-loading="tableData1.loading"
              @sort-change="addSort($event,'tableData1')"
              border>
      <el-table-column type="index"
                       :label='$t("views.clusterMonitoring.serialNumber")'
                       width="80"
                       align="center"></el-table-column>
      <el-table-column :label='$t("views.clusterMonitoring.nodeName")'>
        <router-link slot-scope="scope"
                     class="link"
                     :to="{name:'nodeControlDetail',query:{nodeId:scope.row.ip}}">
          {{scope.row.name}}
        </router-link>
      </el-table-column>
      <!--<el-table-column label="标签"-->
      <!--width="175">-->
      <!--<template slot-scope="item">-->
      <!--<span class="tag"-->
      <!--:key="index"-->
      <!--v-for="(one,index) in item.row.node_tag">{{one}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="ip"
                       align="center"
                       :label='$t("views.clusterMonitoring.ip")'></el-table-column>
      <el-table-column :label='$t("views.clusterMonitoring.status")'
                       align="center"
                       width="200">
        <template slot-scope="item">
          {{item.row.node_status===1?'ready':'false' }}
        </template>
      </el-table-column>
      <el-table-column prop="created_at"
                       sortable
                       align="center"
                       :label='$t("views.clusterMonitoring.creationTime")'></el-table-column>
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
  name: 'nodeControl',
  data () {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      node_status: [],
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
      tableData1: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/system/nodelist',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          name: '',
          node_status: '',
          // ip: '',
          full_time: '',
          start_time: '',
          end_time: '',
          order: '',
          prop: ''
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
    addSort (event, name) {
      console.log(arguments)
      this[name].sel.order = event.order
      this[name].sel.prop = event.prop
      this.getActiveTab(name)
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
        if (this[this.linTabData].sel.full_time === '' || this[this.linTabData].sel.full_time === null) {
          this[this.linTabData].sel.start_time = ''
          this[this.linTabData].sel.end_time = ''
        } else {
          this[this.linTabData].sel.start_time = this[this.linTabData].sel.full_time[0]
          this[this.linTabData].sel.end_time = this[this.linTabData].sel.full_time[1]
        }
        lin = Object.assign({}, lin, this[this.linTabData].sel)
      }
      this.$axios.get(this[this.linTabData].url, {params: lin}).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.node_list
        // 数据处理
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
    this.getActiveTab('tableData1')
    this.$axios.get('//rap2api.taobao.org/app/mock/21549/clusterMonitoring/nodeControl/sel').then(data => {
      this.node_status = [...data.data.data.node_status]
    })
  }
}
</script>
