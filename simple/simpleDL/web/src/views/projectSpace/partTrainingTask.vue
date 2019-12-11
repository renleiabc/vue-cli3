/*
 * @Author:任雷雷
 * @Date: 2018-07-30 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-30 10:31:59
 * @Description:我参与的项目-训练任务
 */
<template>
  <div class="views-project-space">
    <div class="views-input-box">
      <div class="tab-select">
        <div>
          <span class="tab-select-title views-text-name">{{$t('views.trainingTask.trainingName')}}</span>
          <el-input v-model="obj.name"
            :placeholder="$t('views.projectContent.enterContent')"
            class="views-input-text"></el-input>
        </div>
        <div>
          <span class="tab-select-title views-text-name">{{$t('views.development.status')}}</span>
          <el-select v-model="obj.status"
            placeholder="请选择">
            <el-option v-for="item in practicestatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="tab-select-title views-text-name">{{$t('views.trainingTask.engineType')}}</span>
          <el-select v-model="obj.engine"
            placeholder="请选择">
            <el-option v-for="item in practiceengine"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="tab-select-title views-text-name">{{$t('views.table.createTime')}}</span>
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
            @click="taskReset">{{$t("views.button.reset")}}</el-button>
          <el-button class="btn light small"
            @click="taskSearch">{{$t("views.button.search")}}</el-button>
        </div>
      </div>
    </div>
    <!-- 创建训练任务 -->
    <div class="views-table-btn">
      <el-button type="primary"
        class="view-btn-medium"
        @click="creatTraining">{{$t('views.trainingTask.createtask')}}</el-button>
    </div>
    <div class="views-table-content">
      <el-table ref="multipleTable"
        v-loading="loading"
        @sort-change="sortTable"
        :data="trainingTask"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
        class="tab-content">
        <el-table-column :label="$t('views.projectContent.serial')"
          width="50"
          type="index"
          :index="trainingIndex"
          header-align="center"
          align="center">
        </el-table-column>
        <!-- 这里需要自定义模板，然后写链接跳转-->
        <el-table-column :label="$t('views.trainingTask.trainingName')"
          header-align="center"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <router-link :to="{name:'partTraningDetails',query:{partId:$route.query.partId,partTaskId:scope.row.id}}"
              class="views-table-link"
              tag='a'>{{scope.row.name}}</router-link>
          </template>
        </el-table-column>
        <!-- 训练任务的状态 -->
        <el-table-column :label="$t('views.development.status')"
          width="120"
          header-align="center"
          align="center">
          <template slot-scope="scope">
            <div style="text-align: left;">
              <!-- 失败 -->
              <i class="iconfont icon-warning views-icon-warning"
                v-if="scope.row.status==='0'"></i>
              <span v-if="scope.row.status==='0'">{{$t('views.status.error')}}</span>
              <!-- 运行中 -->
              <i class="iconfont icon-yunhangzhong views-icon-yunhangzhong"
                v-if="scope.row.status==='1'"></i>
              <span v-if="scope.row.status==='1'">{{$t('views.status.running')}}</span>
              <!-- 创建中 -->
              <i class="iconfont icon-warning views-icon-chuangjian"
                v-if="scope.row.status==='2'"></i>
              <span v-if="scope.row.status==='2'">创建中</span>
              <!-- 运行成功 -->
              <i class="iconfont icon-chenggong views-icon-success"
                v-if="scope.row.status==='3'"></i>
              <span v-if="scope.row.status==='3'">运行成功</span>
              <!-- 已停止 -->
              <i class="iconfont icon-stop views-icon-stop"
                v-if="scope.row.status==='4'"></i>
              <span v-if="scope.row.status==='4'">{{$t('views.status.stop')}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="engine"
          :label="$t('views.trainingTask.engineType')"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column prop="created_at"
          sortable='custom'
          :label="$t('views.projectContent.createdTime')"
          header-align="center"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column :label="$t('views.trainingTask.runningTime')"
          header-align="center"
          align="center">
          <template slot-scope="scope">
            {{formatSeconds(scope.row.used_time)}}
          </template>
        </el-table-column>
        <el-table-column prop="describe"
          :label="$t('views.development.remarks')"
          show-overflow-tooltip
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column :label="$t('views.projectContent.operation')"
          header-align="center"
          align="center"
          width="200">
          <template slot-scope="scope">
            <span class="views-table-span views-table-margin"
              size="mini"
              v-if="scope.row.status==='1'"
              @click="taskStop(scope.row.id)">{{$t('views.trainingTask.stop')}}</span>
            <span class="views-table-span views-table-margin del"
              size="mini"
              type="danger"
              @click="taskDelete(scope.row.id)">{{$t('views.projectContent.delete')}}</span>
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
          @current-change="taskCurrentChange"
          :current-page.sync="currentPage"
          v-if='isCount'>
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import { timeData, formatSeconds } from '../../util/index.js'
export default {
  data () {
    let time = timeData()
    return {
      linkIndex: '',
      trainingTask: [],
      num: 11,
      index: '',
      loading: true,
      task_id: '',
      timeValue: '',
      pickerOptions: time,
      obj: {// 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        project_id: '',
        engine: ''
      },
      isCount: false,
      per: 0,
      total: 0,
      currentPage: 1,
      project: {
        project_id: ''
      }
    }
  },
  created () {
    // 请求训练任务状态数据，函数调用
    this.$store.dispatch('getPracticestatus')
    // 请求引擎类型数据，函数调用
    this.$store.dispatch('getPracticeengine')
    let id = this.$route.query.partId
    this.project.project_id = this.obj.project_id = id
    this.getTraingTaskData(this.obj)
  },
  mounted () {
    this.linkIndex = 1
  },
  methods: {
    formatSeconds,
    handleSelectionChange (val) { },
    trainingIndex (index) {
      return index + 1
    },
    getTraingTaskData (obj) {
      this.$get('/practiceproject/projectpractice', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.loading = false
          this.trainingTask = res.data.training_task
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
    // 重置
    taskReset () {
      let id = this.$route.query.partId
      let obj = {// 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        sort: '',
        page: 0,
        project_id: id,
        engine: ''
      }
      this.timeValue = ''
      this.currentPage = 1
      this.obj = obj
      this.getTraingTaskData(obj)
      return obj
    },
    // 表格排序
    sortTable (event) {
      if (event.order === 'descending') {
        this.obj.sort = '-' + event.prop
      } else {
        this.obj.sort = event.prop
      }
      this.taskSearch()
    },
    // 查询
    taskSearch () {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0
        this.obj.start_time = 0
      } else {
        this.obj.end_time = this.timeValue[0]
        this.obj.start_time = this.timeValue[1]
      }
      this.currentPage = 1
      this.getTraingTaskData(this.obj)
    },
    taskCurrentChange (val) {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0
        this.obj.start_time = 0
      } else {
        this.obj.end_time = this.timeValue[0]
        this.obj.start_time = this.timeValue[1]
      }
      this.obj.page = val
      this.getTraingTaskData(this.obj)
    },
    creatTraining () {
      // 项目创建验证是否归档，函数调用
      let projectPart = this.projectPart
      let obj = this.project
      // console.log(obj)
      this.$store.dispatch('getProjectcheck', { obj, projectPart })
    },
    projectPart (val) {
      // console.log(val)
      if (val) {
        let id = this.$route.query.partId
        this.$router.push({ name: 'partCreateTraningTask', query: { partId: id } })
      }
    },
    // 打开删除弹出框
    taskDelete (id) {
      this.$confirm(this.$t('views.dialogText.deleteConfirm'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            let obj = {
              practice_id: id
            }
            this.$post('/practiceproject/practicedelete', obj).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                let reset = this.taskReset()
                this.getTraingTaskData(reset)
                // 请求项目详情数据函数调用
                this.$store.dispatch('getProjectDetails', this.project)
              } else {
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
              instance.confirmButtonLoading = false
              done()
            })
          } else {
            done()
          }
        }
      }).catch(() => {
      })
    },
    // 确定停止弹出框
    taskStop (id) {
      this.$confirm(this.$t('views.dialogText.task'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            let obj = {
              practice_id: id
            }
            this.$post('/practiceproject/practicestop', obj).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.getTraingTaskData(this.obj)
              } else {
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
              instance.confirmButtonLoading = false
              done()
            })
          } else {
            done()
          }
        }
      }).catch(() => {
      })
    }
  },
  components: {},
  computed: {
    // 训练任务状态
    practicestatus () {
      return this.$store.getters.postPracticestatus
    },
    // 引擎类型
    practiceengine () {
      return this.$store.getters.postPracticeengine
    }
  }
}
</script>
