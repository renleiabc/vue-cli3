/*
* @Author:任雷雷
* @Date: 2018-12-13 10:04:31
* @LastEditors: 任雷雷
* @LastEditTime: 2018-12-13 10:31:59
* @Description:项目空间-归档的项目
*/
<template>
  <div>
    <div class="views-project-space">
      <div class="tab-select">
        <div>
          <span class="tab-select-title">{{$t('views.projectContent.projectName')}}</span>
          <el-input v-model="obj.name"
            :placeholder="$t('views.projectContent.inputKeyword')"
            class="views-input-text"></el-input>
        </div>
        <div>
          <span class="tab-select-title">归档时间</span>
          <!-- 选择开始时间、结束时间 -->
          <el-date-picker type="daterange"
            :editable='false'
            range-separator="-"
            :picker-options="pickerOptions"
            v-model="timeValue"
            value-format="yyyy-MM-dd HH:mm:ss"
            :start-placeholder="$t('views.button.startDate')"
            :end-placeholder="$t('views.button.endDate')"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
        <!-- 查询、重置 -->
        <div>
          <el-button class="btn light small"
            @click="reset">{{$t("views.button.reset")}}</el-button>
          <el-button class="btn light small"
            @click="search">{{$t("views.button.search")}}</el-button>
        </div>
      </div>
      <!-- 项目表格数据 -->
      <div class="views-table-content">
        <el-table v-loading="loading"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @sort-change="sortTable"
          @selection-change="handleSelectionChange"
          border
          class="tab-content">
          <el-table-column :label="$t('views.projectContent.serial')"
            width="50"
            type="index"
            :index="indexMethod"
            header-align="center"
            align="center">
          </el-table-column>
          <!-- 这里需要自定义模板，然后写链接跳转-->
          <el-table-column :label="$t('views.projectContent.projectName')"
            header-align="center"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <router-link :to="{name:'archivedProjects'}"
                class="views-table-a">{{scope.row.name}}</router-link>
            </template>
          </el-table-column>
          <el-table-column :label="$t('views.development.status')"
            header-align="center"
            align="center"
            width="100"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="text-align: left;">
                <!-- 开发中 -->
                <i class="iconfont icon-kaifa views-icon-kaifa"
                  v-if="scope.row.status=='0'"></i>
                <span v-if="scope.row.status==0">{{$t('views.status.development')}}</span>
                <!-- 已归档 -->
                <i class="iconfont icon-yiguidang views-icon-yiguidang"
                  v-if="scope.row.status=='1'"></i>
                <span v-if="scope.row.status==1">已归档</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="archive_at"
            sortable='custom'
            label="归档时间"
            header-align="center"
            align="center">
          </el-table-column>
          <el-table-column prop="describe"
            :label="$t('views.projectContent.description')"
            show-overflow-tooltip
            header-align="center"
            align="center">
          </el-table-column>
          <!-- 这里需要自定义模板，然后写链接跳转-->
          <el-table-column :label="$t('views.projectContent.documentation')"
            header-align="center"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <a class="views-table-link"
                :href="scope.row.document"
                target="_blank"
                >{{scope.row.document}}</a>
              <!-- <a class="views-project-disabled"
                href="javascript:;"
                v-else>{{scope.row.document}}</a> -->
            </template>
          </el-table-column>
          <!-- <el-table-column label="提示"
            header-align="center"
            align="center"
            v-if="roleNum === 3"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.is_archive==='0'">
                归档{{archivesave.archive_save}}天后系统将自动清空项目文档内容，如需保存请于项目归档{{archivesave.archive_save}}天内自行导出留存
              </span>
              <span v-else>
                项目归档超过{{archivesave.archive_save}}天，项目文档空间已经被回收
              </span>
            </template>
          </el-table-column> -->
          <!-- 当表格数据为空的时候 -->
          <div slot="empty">
            <div class="views-empty">
              <span class="views-empty-table"></span>
              <p class="views-empty-text">{{$t('views.table.noData')}}</p>
            </div>
          </div>
        </el-table>
        <div class="views-page">
          <el-pagination :page-size="per"
            layout="prev, pager, next"
            :total="total"
            @current-change="projectCurrentChange"
            v-show="isCount"
            :current-page.sync="currentPage">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timeData } from '../../util/index.js'
export default {
  data () {
    let time = timeData()
    return {
      indexLink: '1',
      createDialog: false,
      loading: true,
      projectName: '',
      labelWidth: '120px',
      status: '',
      timeValue: '',
      readonly: false,
      project_id: '',
      isCount: false,
      per: 0,
      total: 0,
      options: [],
      archived: [],
      tableData: [],
      indexes: '',
      currentPage: 1,
      archived_project: [],
      pickerOptions: time,
      obj: {// 请求参数数据
        name: '',
        archive_start: '',
        archive_end: '',
        status: 1,
        sort: '',
        page: 0
      },
      ruleForm: {
        name: '',
        describe: ''
      },
      isLoading: false,
      roleNum: ''
    }
  },
  created () {
    // console.log(this.$store.state.projectSpace.get)
    // 请求项目空间数据，函数调用
    let obj = this.obj
    this.getProjectSpaceData(obj)
    // 请求项目状态数据，函数调用
    this.$store.dispatch('getProjectStatus')
    // 获取用户信息
    this.$store.dispatch('getUserinfo')
    // 用户角色处理函数调用
    this.userinfo()
    // 获取系统配置
    this.$store.dispatch('getArchivesave')
  },
  watch: {
    STORE_THEME_LANG: {
      handler (options, oldOptions) {
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '120px'
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '200px'
        }
      }
    }
  },
  mounted () {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '120px'
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '200px'
    }
  },
  methods: {
    // 用户角色数据处理
    userinfo () {
      this.roleNum = JSON.parse(window.sessionStorage.getItem('userinfo')).role
    },
    // 请求我的项目数据
    getProjectSpaceData (obj) {
      this.$get('/project/archive', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.loading = false
          this.tableData = res.data.project_space
          let total = res.data.total_count
          let per = res.data.per_page
          if (total <= per) {
            this.isCount = false
          } else {
            this.isCount = true
            this.per = per
            this.total = total
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 表格排序
    sortTable (event) {
      if (event.order === 'descending') {
        this.obj.sort = '-' + event.prop
      } else {
        this.obj.sort = event.prop
      }
      this.search()
    },
    // 重置
    reset () {
      let obj = {// 请求参数数据
        name: '',
        archive_start: '',
        archive_end: '',
        status: 1,
        page: 0
      }
      this.obj = obj
      this.timeValue = ''
      this.currentPage = 1
      this.getProjectSpaceData(obj)
    },
    // 查询
    search () {
      if (this.timeValue === '') {
        this.obj.archive_start = ''
        this.obj.archive_end = ''
      } else {
        this.obj.archive_start = this.timeValue[0]
        this.obj.archive_end = this.timeValue[1]
      }
      this.currentPage = 1
      this.obj.page = 0
      let obj = this.obj
      this.getProjectSpaceData(obj)
    },
    indexMethod (index) {
      return index + 1
    },
    handleSelectionChange (val) {
      // 选中的函数
      this.archived = val
      // console.log(JSON.stringify(val))
    },
    openFile () {
      this.archived_project = []
      if (this.archived.length === 0) {
        this.$message({
          message: this.$t('views.dialogText.archived'),
          type: 'warning'
        })
      } else {
        let that = this
        this.archived.forEach(function (val, index) {
          let value = val.status
          let id = val.id
          if (value === '0') {
            that.archived_project.push(id)
          }
        })
        if (this.archived_project.length === 0) {
          this.$message({
            message: this.$t('views.dialogText.archived'),
            type: 'warning'
          })
        } else {
          let archived = this.archived_project
          console.log(archived)
          this.projectSetting(archived)
        }
      }
    },
    // 单个项目归档
    fileClick (id) {
      let arr = []
      arr.push(id)
      this.projectSetting(arr)
    },

    projectCurrentChange (val) {
      this.$set(this.obj, 'page', val)
      // console.log(JSON.stringify(this.obj))
      let obj = this.obj
      this.getProjectSpaceData(obj)
    },
    indexActive () {
      let activeName = 'first'
      window.localStorage.setItem('activeName', activeName)
    }
  },
  components: {},
  computed: {
    projectStatus () {
      return this.$store.getters.postProjectStatus
    },
    archivesave () {
      return this.$store.getters.postArchivesave
    }
  }
}
</script>
