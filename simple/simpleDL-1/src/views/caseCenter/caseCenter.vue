/*
 * @Author: 少侠
 * @Date: 2018-08-01 15:03:36
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-08 17:00:21
 * @Description: 案例中心列表
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:22:25
*/
<template>
  <div>
    <div class="tab-select">
      <div>
        <span class="tab-select-title">{{$t('views.caseCenterPage.caseName')}}</span>
        <el-input v-model="tableData.sel.name"
                  :placeholder="$t('views.caseCenterPage.caseName')"
                  class="views-input-text"></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t('views.table.createTime')}}</span>
        <!-- 选择开始时间、结束时间 -->
        <el-date-picker type="daterange"
                        :editable='false'
                        align="right"
                        range-separator="-"
                        v-model="tableData.sel.full_date"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        :start-placeholder="$t('views.button.startDate')"
                        :end-placeholder="$t('views.button.endDate')">
        </el-date-picker>
      </div>
      <!-- <div>
        <span class="tab-select-title">{{$t('views.development.status')}}</span>
        <el-select v-model="tableData.sel.case_status"
                   :placeholder='$t("views.button.selectPlease")'>
          <el-option key="0"
                     :label="'创建中'"
                     value="0">
          </el-option>
          <el-option key="1"
                     :label="'可用'"
                     value="1">
          </el-option>
        </el-select>
      </div> -->
      <!-- <div>
        <span class="tab-select-title">{{$t('views.caseCenterPage.caseType')}}</span>
        <el-select v-model="tableData.sel.category"
                   :placeholder='$t("views.button.selectPlease")'>
          <el-option v-for="item in case_type"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </div> -->
      <div>
        <!-- <el-button class="btn light small"
                   @click="clearSearch('tableData')">{{$t("views.button.reset")}}</el-button> -->
        <el-button class="btn light small"
                   @click="doSearch('tableData')">{{$t("views.button.search")}}</el-button>
      </div>
    </div>
    <div v-if="role===2"
         class="controls-else">
      <el-button class="btn dark mid"
                 @click="changeCase()">{{$t('views.caseCenterPage.createBtnL')}}</el-button>
      <el-button class="btn dark mid"
                 @click="deleteCase()">{{$t("views.button.batchDelete")}}</el-button>
    </div>
    <el-table class="tab-content"
              :data="tableData.msg"
              @selection-change="selectChange"
              v-loading="tableData.loading"
              border>
      <el-table-column type="index"
                       width="55"
                       align="center"></el-table-column>
      <el-table-column :label="$t('views.caseCenterPage.caseName')">
        <template slot-scope="item">
          <router-link class="link"
                       :to="{name:'caseDetail',query:{caseId:item.row.id}}">{{item.row.name}}</router-link>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="case_states"
                       :label="$t('views.table.states')"
                       width="80"
                       align="center">
        <template slot-scope="item">
          {{item.type===1?'可用':'创建中'}}
        </template>
      </el-table-column> -->
      <el-table-column prop="created_at"
                       align="center"
                       :label="$t('views.table.createTime')"></el-table-column>
      <el-table-column prop="caseCategory.name"
                       width="160"
                       align="center"
                       :label="$t('views.caseCenterPage.caseType')"></el-table-column>
      <el-table-column prop="describe"
                       :label="$t('views.caseCenterPage.caseDesc')"></el-table-column>
      <el-table-column v-if="role===2"
                       :label="$t('views.table.operate')"
                       width="140">
        <div class="options"
             style="text-align:center;"
             slot-scope="item">
          <div v-if="item.row.is_built == 1">--</div>
          <div v-else>
            <button class="btn"
                    @click="changeCase(item.row.id)">{{$t('views.button.update')}}</button>
            <button class="del"
                    @click="deleteCase(item.row.id)">{{$t('views.button.delete')}}</button>
          </div>
        </div>
      </el-table-column>
      <!-- 当表格数据为空的时候 -->
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
  name: 'caseCenter',
  data () {
    return {
      states: '',
      role: 2,
      linTabData: '',
      linUrl: '',
      caseIdList: [],
      pageSize: 10,
      case_status: [],
      case_type: [],
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
        url: '/casecenter/index',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          name: '',
          full_date: [],
          case_status: '',
          category: ''
        }
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'createCase') {
      if (to.query.hasOwnProperty('caseId')) {
        to.meta.title = 'views.nav.updateCase'
      } else {
        to.meta.title = 'views.nav.createCase'
      }
    }
    next()
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
          this[this.linTabData].sel.start_time = this[this.linTabData].sel.full_date[0]
          this[this.linTabData].sel.end_time = this[this.linTabData].sel.full_date[1]
        } else {
          this[this.linTabData].sel.start_time = ''
          this[this.linTabData].sel.end_time = ''
        }
        lin = Object.assign({}, lin, this[this.linTabData].sel)
      }
      lin.type = this[this.linTabData].sel.case_status
      this.$axios.get(this[this.linTabData].url, {params: lin}).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.image_list
        // 数据处理
        this[this.linTabData].msg = [...tableDate]
        // 重置数据总数
        if (this[this.linTabData].Pagination !== undefined) {
          this[this.linTabData].Pagination.total_count = data.data.data.total_count
        }
        this[this.linTabData].loading = false
      })
    },
    selectChange (rows) {
      this.caseIdList = []
      for (let i = 0; i < rows.length; i++) {
        this.caseIdList.push(rows[i].id)
      }
    },
    changeCase (id) {
      if (isNaN(id)) {
        this.$router.push({name: 'createCase'})
      } else {
        this.$router.push({name: 'createCase', query: {caseId: id}})
      }
    },
    deleteCase (id) {
      let arr = []
      let switchBool = true
      if (id === undefined) {
        console.log(this.caseIdList)
        if (this.caseIdList.length > 0) {
          arr = [...this.caseIdList]
        } else {
          switchBool = false
          this.$message({message: '请选择删除数据', type: 'error'})
        }
      } else {
        arr = [id]
      }
      if (switchBool) {
        this.mixinConfirm('/casecenter/delete', {case_center_id: arr}).then(res => {
          if (res) {
          // 请求成功回调
            this.doSearch('tableData')
          }
        })
      }
    }
  },
  created () { // 每有一个表格就要写个初始化赋值
    this.getActiveTab('tableData')
    this.role = JSON.parse(localStorage.getItem('userinfo')).role
    // 获取搜索的数据
    this.$get('/casecenter/casecentercategorylist').then(res => {
      this.case_type = [...res.data]
    })
  }
}
</script>
