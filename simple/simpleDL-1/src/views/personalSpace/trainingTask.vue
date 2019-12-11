/*
 * @Author:任雷雷
 * @Date: 2018-07-30 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-30 10:31:59
 * @Description:个人空间-训练任务
 */
<template>
    <div class="views-project-space">
        <!-- 个人空间信息 -->
        <views-personal-content></views-personal-content>
        <div class="views-input-box">
            <div class="tab-select">
                <!-- 训练任务名称 -->
                <div>
                    <span class="tab-select-title views-text-title">
                        {{$t('views.trainingTask.trainingName')}}
                    </span>
                    <el-input v-model="obj.name" :placeholder="$t('views.projectContent.enterContent')" class="views-input-text"></el-input>
                </div>
                <!-- 状态 -->
                <div>
                    <span class="tab-select-title">{{$t('views.development.status')}}</span>
                    <el-select v-model="obj.status" placeholder="请选择">
                        <el-option v-for="item in practicestatus" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!-- 引擎类型 -->
                <div>
                    <span class="tab-select-title">{{$t('views.trainingTask.engineType')}}</span>
                    <el-select v-model="obj.engine" placeholder="请选择">
                        <el-option v-for="item in practiceengine" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!-- 创建时间 -->
                <div>
                    <span class="tab-select-title">{{$t('views.table.createTime')}}</span>
                    <!-- 选择开始时间、结束时间 -->
                    <el-date-picker type="daterange" :editable='false' range-separator="-" :picker-options="pickerOptions" v-model="timeValue" value-format="yyyy-MM-dd HH:mm:ss" :start-placeholder="$t('views.button.startDate')" :end-placeholder="$t('views.button.endDate')" :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </div>
                <!-- 查询、重置 -->
                <div>
                    <el-button class="btn light small" @click="taskReset">{{$t("views.button.reset")}}</el-button>
                    <el-button class="btn light small" @click="taskSearch">{{$t("views.button.search")}}</el-button>
                </div>
            </div>
        </div>
        <!-- 创建训练任务 -->
        <div class="views-table-btn">
            <el-button type="primary" class="view-btn-medium" @click="creatTraining">
                {{$t('views.trainingTask.createtask')}}
            </el-button>
        </div>
        <div class="views-table-content">
            <el-table ref="multipleTable" v-loading="loading" :data="trainingTask" tooltip-effect="dark" style="width: 100%" border class="tab-content">
                <el-table-column :label="$t('views.projectContent.serial')" width="50" type="index" :index="trainingIndex" header-align="center" align="center">
                </el-table-column>
                <!-- 这里需要自定义模板，然后写链接跳转-->
                <el-table-column :label="$t('views.trainingTask.trainingName')" header-align="center" align="center">
                    <template slot-scope="scope">
                        <router-link :to="{name:'perTraningDetails',params:{perTaskId:scope.row.id}}" class="views-table-link" tag='a'>{{scope.row.name}}</router-link>
                    </template>
                </el-table-column>
                <!-- 训练任务的状态 -->
                <el-table-column :label="$t('views.development.status')" width="120" header-align="center" align="center">
                    <template slot-scope="scope">
                        <div style="text-align: left;">
                            <!-- 失败 -->
                            <i class="iconfont icon-stop views-icon-error" v-if="scope.row.status==='0'"></i>
                            <span v-if="scope.row.status==='0'">{{$t('views.status.error')}}</span>
                            <!-- 运行中 -->
                            <i class="iconfont icon-yunhangzhong views-icon-yunhangzhong" v-if="scope.row.status==='1'"></i>
                            <span v-if="scope.row.status==='1'">{{$t('views.status.running')}}</span>
                            <!-- 运行失败 -->
                            <i class="iconfont icon-warning views-icon-chuangjian" v-if="scope.row.status==='2'"></i>
                            <span v-if="scope.row.status==='2'">创建中</span>
                            <!-- 运行成功 -->
                            <i class="iconfont icon-chenggong views-icon-success" v-if="scope.row.status==='3'"></i>
                            <span v-if="scope.row.status==='3'">运行成功</span>
                            <!-- 已停止 -->
                            <i class="iconfont icon-stop views-icon-stop" v-if="scope.row.status==='4'"></i>
                            <span v-if="scope.row.status==='4'">{{$t('views.status.stop')}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="engine" :label="$t('views.trainingTask.engineType')" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="created_at" :label="$t('views.projectContent.createdTime')" header-align="center" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column :label="$t('views.trainingTask.runningTime')" header-align="center" align="center">
                    <template slot-scope="scope">
                        {{scope.row.used_time}}s
                    </template>
                </el-table-column>
                <el-table-column prop="describe" :label="$t('views.development.remarks')" show-overflow-tooltip header-align="center" align="center">
                </el-table-column>
                <!-- 启动文件名称 -->
                <el-table-column :label="$t('views.trainingTask.startFile')" show-overflow-tooltip header-align="center" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.engine==='tensorflow'">
                            {{scope.row.mount_info.launch_script.s3_path}}
                        </span>
                        <span v-if="scope.row.engine==='caffe'">
                            {{scope.row.mount_info.proto_file.s3_path}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('views.projectContent.operation')" header-align="center" align="center" width="200">
                    <template slot-scope="scope">
                        <span class="views-table-span views-table-margin" size="mini" v-if="scope.row.status==='1'" @click="taskStop(scope.row.id)">{{$t('views.trainingTask.stop')}}</span>
                        <span class="views-table-span views-table-margin del" size="mini" type="danger" @click="taskDelete(scope.row.id)">{{$t('views.projectContent.delete')}}</span>
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
                <el-pagination :page-size="per" layout="prev, pager, next" :total="total" @current-change="taskCurrentChange" :current-page.sync="currentPage" v-if='isCount'>
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import ViewsPersonalContent from './personalContent'
import { timeData } from '../../util/index.js'
export default {
  data () {
    let time = timeData()
    return {
      linkIndex: '',
      trainingTask: [],
      loading: true,
      timeValue: '',
      pickerOptions: time,
      obj: {// 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        engine: ''
      },
      isCount: false,
      per: 0,
      total: 0,
      currentPage: 1
    }
  },
  created () {
    // 请求训练任务状态数据，函数调用
    this.$store.dispatch('getPracticestatus')
    // 请求引擎类型数据，函数调用
    this.$store.dispatch('getPracticeengine')
    // 默认请求个人空间-训练任务列表
    this.getTraingTaskData(this.obj)
  },
  mounted () {
    this.linkIndex = 1
  },
  methods: {
    trainingIndex (index) {
      return index + 1
    },
    // 请求个人空间-训练任务列表
    getTraingTaskData (obj) {
      this.$get('/personal/personalpractice', obj).then(res => {
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
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 重置
    taskReset () {
      let obj = {// 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        engine: ''
      }
      this.timeValue = ''
      this.obj = obj
      return obj
    },
    // 查询
    taskSearch () {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0
        this.obj.start_time = 0
      } else {
        this.obj.start_time = this.timeValue[0]
        this.obj.end_time = this.timeValue[1]
      }
      this.currentPage = 1
      this.getTraingTaskData(this.obj)
    },
    // 分页
    taskCurrentChange (val) {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0
        this.obj.start_time = 0
      } else {
        this.obj.start_time = this.timeValue[0]
        this.obj.end_time = this.timeValue[1]
      }
      this.obj.page = val
      this.getTraingTaskData(this.obj)
    },
    creatTraining () {
      this.$router.push({ name: 'perCreateTask' })
    },
    // 打开删除弹出框
    taskDelete (id) {
      this.$confirm(this.$t('views.dialogText.deleteConfirm'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning'
      }).then(() => {
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
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('views.dialogText.cancelled')
        })
      })
    },
    // 确定停止弹出框
    taskStop (id) {
      this.$confirm(this.$t('views.dialogText.task'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning'
      }).then(() => {
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
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('views.dialogText.cancelled')
        })
      })
    }
  },
  components: { ViewsPersonalContent },
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
