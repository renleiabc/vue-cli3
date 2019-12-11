/*
 * @Author:任雷雷
 * @Date: 2018-08-06 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-08-06 10:31:59
 * @Description:我参与的项目内容
 */
<template>
  <div>
    <div class="views-project-space">
      <div class="tab-select">
        <div>
          <span class="tab-select-title">{{$t('views.projectContent.projectName')}}</span>
          <el-input v-model="obj.name"
            :placeholder="$t('views.projectContent.projectName')"
            class="views-input-text"></el-input>
        </div>
        <div>
          <span class="tab-select-title">{{$t('views.projectContent.projectStatus')}}</span>
          <el-select v-model="obj.status"
            :placeholder="$t('views.development.pleaseChoose')"
            @change="searchStatus"
            clearable>
            <el-option v-for="item in projectStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="tab-select-title">{{$t('views.projectContent.subordinate')}}</span>
          <el-select v-model="obj.belong_name"
            :placeholder="$t('views.development.pleaseChoose')"
            filterable
            @change="searchBelong"
            clearable>
            <el-option v-for="item in belongname"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="tab-select-title">{{$t('views.table.createTime')}}</span>
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
        <!-- 重置、查询 -->
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
          @sort-change="sortTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
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
              <router-link :to="{name:'partProjectDetails',query:{partId:scope.row.project_id}}"
                class="views-table-link"
                tag='a'
                v-if="scope.row.status==='0'">
                <span @click="clickActive">
                  {{scope.row.name}}
                </span>
              </router-link>
              <router-link :to="{name:'partSpaceContent'}"
                v-else
                class="views-table-a">{{scope.row.name}}</router-link>
            </template>
          </el-table-column>
          <el-table-column :label="$t('views.projectContent.projectStatus')"
            width="120"
            header-align="center"
            align="center">
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
          <el-table-column prop="belong_name"
            :label="$t('views.projectContent.subordinate')"
            header-align="center"
            align="center">
          </el-table-column>
          <el-table-column prop="created_at"
            sortable='custom'
            :label="$t('views.projectContent.createdTime')"
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
              <a class="views-project-file"
                :href="scope.row.document"
                target="_blank"
                v-if="scope.row.is_archive==='0'">{{scope.row.document}}</a>
              <a class="views-project-disabled"
                href="javascript:;"
                v-else>{{scope.row.document}}</a>
            </template>
          </el-table-column>
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
      indexLink: '2',
      partProject: [],
      loading: true,
      timeValue: '',
      readonly: false,
      pickerOptions: time,
      selectSelection: [],
      tableData: [],
      isCount: false,
      total: 0,
      per: 0,
      currentPage: 1,
      obj: {
        name: '',
        belong_name: '',
        start_time: '',
        end_time: '',
        status: '',
        sort: '',
        page: 0
      },
      indexes: ''
    }
  },
  created () {
    // console.log(this.$store.state.projectSpace.get)
    // 请求项目空间数据，函数调用
    let obj = this.obj
    this.getProjectSpaceData(obj)
    // 请求项目状态数据，函数调用
    this.$store.dispatch('getProjectStatus')
    // 请求所属用户，函数调用
    this.$store.dispatch('getBelongname')
  },
  mounted () { },
  methods: {
    // 请求项目空间数据
    getProjectSpaceData (obj) {
      this.$get('/project/attendproject', obj).then(res => {
        if (res.code === 200) {
          this.loading = false
          // console.log(JSON.stringify(res))
          let total = res.data.total_count
          let per = res.data.per_page
          if (total <= per) {
            this.isCount = false
          } else {
            this.isCount = true
            this.total = total
            this.per = per
          }
          this.tableData = res.data.project_space
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 选择状态
    searchStatus (val) {
      this.partStatus = val
    },
    // 选择所属用户
    searchBelong (val) {
      // console.log(val)
      this.belong = val
    },
    indexMethod (index) {
      return index + 1
    },
    handleSelectionChange (val) {
      // 选中的函数
      // console.log(val)
      this.selectSelection = val
    },
    // 重置
    reset () {
      let obj = {
        name: '',
        belong_name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0
      }
      this.timeValue = ''
      this.currentPage = 1
      this.obj = obj
      this.getProjectSpaceData(obj)
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
    // 查询
    search () {
      if (this.timeValue === '') {
        this.obj.start_time = ''
        this.obj.end_time = ''
      } else {
        this.obj.start_time = this.timeValue[0]
        this.obj.end_time = this.timeValue[1]
      }
      this.obj.page = 0
      this.currentPage = 1
      let obj = this.obj
      this.getProjectSpaceData(obj)
    },
    // 分页
    projectCurrentChange (val) {
      console.log(val)
      this.$set(this.obj, 'page', val)
      let obj = this.obj
      this.getProjectSpaceData(obj)
    },
    clickActive () {
      let activeName = 'first'
      window.localStorage.setItem('activeName', activeName)
    }
  },
  components: {},
  computed: {
    projectStatus () {
      return this.$store.getters.postProjectStatus
    },
    belongname () {
      return this.$store.getters.postBelongname
    }
  }
}
</script>
<style  scoped>
</style>
