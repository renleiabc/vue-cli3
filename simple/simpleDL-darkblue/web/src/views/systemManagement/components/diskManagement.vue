/*
 * @Author: aFei
 * @Date: 2018-08-21 13:57:37
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:09:32
*/
<template>
  <div>
    <div class="disk-title">
      {{$t("views.systemManagement.warnManagementSettings")}}：{{$t("views.systemManagement.systemSetting.p1")}}
      <el-select v-model="clearTimeMsg"
                 clearable
                 filterable
                 :placeholder='$t("views.systemManagement.chose")'>
        <el-option v-for="item in clearTime"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      {{$t("views.systemManagement.systemSetting.p2")}}
      <el-button class="btn dark small"
                 @click="saveClearTime">{{$t("views.systemManagement.save")}}</el-button>
    </div>
    <el-tabs v-model="activeName"
             @tab-click="clearSearchTabs">
      <el-tab-pane :label='$t("views.systemManagement.diskCleaning")'
                   name="clearDisk">
        <el-table class="tab-content"
                  :data="tableData1"
                  v-loading="loading1"
                  border>
          <el-table-column prop="node_name"
                           align="center"
                           :label='$t("views.systemManagement.nodeName")'></el-table-column>
          <el-table-column prop="disk_type"
                           width="100"
                           align="center"
                           :label='$t("views.systemManagement.type")'></el-table-column>
          <el-table-column prop="disk_used"
                           align="center"
                           :label='$t("views.systemManagement.diskUsage")'>
            <template slot-scope="scope">
              <span>磁盘使用量达到{{scope.row.disk_used}}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="disk_status"
                           width="120"
                           align="center"
                           :label='$t("views.systemManagement.status")'>
            <template slot-scope="scope">
              <span :class="scope.row.disk_status===0?'':scope.row.disk_status===1?'green':scope.row.disk_status===2?'yellow':'red'">{{scope.row.disk_status===0?'良好':scope.row.disk_status===1?'低风险':scope.row.disk_status===2?'中风险':'高风险'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="disk_warn_time"
                           align="center"
                           :label='$t("views.systemManagement.alarmTime")'></el-table-column>
          <el-table-column :label='$t("views.systemManagement.operating")'
                           width="150"
                           align="center">
            <template slot-scope="scope">
              <button class="btn"
                      @click="diskCleaning(scope.row.node_id)">{{$t("views.systemManagement.diskCleaning")}}</button>
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
      </el-tab-pane>
      <el-tab-pane :label='$t("views.systemManagement.diskCleaningRecord")'
                   name="diskHistory"
                   :lazy="true">
        <div class="tab-select">
          <span class="tab-select-title">{{$t("views.systemManagement.nodeName")}}</span>
          <el-select v-model="tabSel2.node_name"
                     clearable
                     filterable
                     :placeholder='$t("views.systemManagement.chose")'>
            <el-option v-for="item in node_name"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <span class="tab-select-title">{{$t("views.systemManagement.cleaningTime")}}</span>
          <el-date-picker v-model="tabSel2.full_date"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="-"
                          :start-placeholder='$t("views.systemManagement.beginTime")'
                          :end-placeholder='$t("views.systemManagement.endTime")'
                          :picker-options="pickerOptions">
          </el-date-picker>
          <el-button class="btn light small"
                     @click="clearSearchTabs('tableData1')">{{$t("views.systemManagement.reset")}}</el-button>
          <el-button class="btn light small"
                     @click="doSearchTabs('tableData1')">{{$t("views.systemManagement.select")}}</el-button>
        </div>
        <!-- 磁盘清理记录表格 -->
        <el-table class="tab-content"
                  :data="tableData2"
                  v-loading="loading2"
                  border>
          <el-table-column prop="node_name"
                           align="center"
                           width="200"
                           :label='$t("views.systemManagement.nodeName")'></el-table-column>
          <el-table-column prop="option_content"
                           :label='$t("views.systemManagement.alarmContent")'></el-table-column>
          <el-table-column prop="disk_clear_time"
                           align="center"
                           width="200"
                           :label='$t("views.systemManagement.cleaningTime")'></el-table-column>
          <el-table-column prop="free_size"
                           align="center"
                           width="150"
                           :label='$t("views.systemManagement.freeSpace")'></el-table-column>
          <el-table-column prop="time_limt"
                           align="center"
                           :label='$t("views.systemManagement.cleanDiskRange")'></el-table-column>
          <el-table-column prop="option_name"
                           align="center"
                           width="100"
                           :label='$t("views.systemManagement.OperationSource")'></el-table-column>
          <!--暂无数据情况-->
          <div slot="empty">
            <div class="views-empty">
              <span class="views-empty-table"></span>
              <p class="views-empty-text">{{$t('views.table.noData')}}</p>
            </div>
          </div>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-pagination class="tab-page"
                   layout="prev, pager, next"
                   :page-size="pageSize"
                   :current-page.sync="page"
                   :total="total_count"
                   @current-change="changePageTabs"></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'diskManagement',
  data () {
    return {
      activeName: 'clearDisk', // 当前激活页
      linSelData: '',
      linTabData: '',
      linLoad: '',
      linUrl: '',
      node_name: [],
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
      tableData1: [],
      tableData2: [],
      tabSel2: {
        node_name: '',
        full_date: '',
        start_data: '',
        end_data: ''
      },
      loading1: true,
      loading2: true,
      page: 1,
      total_count: 1,
      clearTimeMsg: '',
      clearTime: [],
      pageSize: 10
    }
  },
  methods: {
    getActiveTabs () { // 获取当前展示的表格、搜索等信息
      switch (this.activeName) { // 对应tabs的name
        case 'clearDisk':
          this.linSelData = ''
          this.linTabData = 'tableData1'
          this.linLoad = 'loading1'
          this.linUrl = '//rap2api.taobao.org/app/mock/21549/disk-sys-setting'
          break
        case 'diskHistory':
          this.linSelData = 'tabSel2'
          this.linTabData = 'tableData2'
          this.linLoad = 'loading2'
          this.linUrl = '//rap2api.taobao.org/app/mock/21549/disk-clear-log'
          break
      }
      this.initMsgTabs()
    },
    clearSearchTabs () { // 清除搜索条件、分页切换
      let str
      switch (this.activeName) { // 对应tabs的name
        case 'first':
          str = ''
          break
        case 'second':
          str = 'tabSel2'
          break
      }
      for (let key in this[str]) {
        this[str][key] = ''
      }
      this.page = 1
      this.getActiveTabs()
    },
    doSearchTabs () { // 按条件搜索
      this.page = 1
      this.getActiveTabs()
    },
    changePageTabs () { // 改变分页
      this.getActiveTabs()
    },
    initMsgTabs () {
      this[this.linLoad] = true
      let lin = Object.assign({}, {
        page: this.page,
        count: this.pageSize
      })
      if (this[this.linSelData] !== undefined) {
        if (this[this.linSelData].full_date !== undefined) {
          if (this[this.linSelData].full_date !== null && this[this.linSelData].full_date !== '') {
            this[this.linSelData].start_data = this[this.linSelData].full_date[0]
            this[this.linSelData].end_data = this[this.linSelData].full_date[1]
          } else {
            this[this.linSelData].start_data = ''
            this[this.linSelData].end_data = ''
          }
        }
        lin = Object.assign({}, lin, this[this.linSelData])
      }
      this.$axios.get(this.linUrl, {params: lin}).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.disk_clear_table
        // 数据处理
        this[this.linTabData] = [...tableDate]
        // 重置数据总数
        this.total_count = data.data.data.total_count
        this[this.linLoad] = false
      })
    },
    saveClearTime () {
      this.$axios.post('//rap2api.taobao.org/app/mock/21549/clear-disk-setting', {time_number: this.clearTimeMsg}).then(data => {
        this.$message({message: this.$t('views.notification.saved'), type: 'success'})
      })
    },
    diskCleaning (id) {
      this.$emit('diskCleaning', id)
    }
  },
  mounted () {
    this.getActiveTabs()
    this.$axios.get('//rap2api.taobao.org/app/mock/21549/systemManagement/systemSetting/diskManagement/sel').then(data => {
      this.clearTime = [...data.data.data.clear_log_time]
      this.node_name = [...data.data.data.node_type]
    })
  }
}
</script>
