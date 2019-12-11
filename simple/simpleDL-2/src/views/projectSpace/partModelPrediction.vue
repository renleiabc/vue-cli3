/*
 * @Author:任雷雷
 * @Date: 2018-07-30 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-30 10:31:59
 * @Description:我的项目-模型预测
 */
<template>
    <div class="views-project-space">
        <div class="views-input-box">
            <div class="tab-select">
                <div>
                    <span class="tab-select-title views-text-name">{{$t('views.modelPrediction.modelJobName')}}</span>
                    <el-input v-model="obj.name" :placeholder="$t('views.projectContent.enterContent')" class="views-input-text"></el-input>
                </div>
                <div>
                    <span class="tab-select-title views-text-name">{{$t('views.development.status')}}</span>
                    <el-select v-model="obj.status" placeholder="请选择">
                        <el-option v-for="item in modelstatus" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span class="tab-select-title views-text-name">{{$t('views.trainingTask.engineType')}}</span>
                    <el-select v-model="obj.engine" placeholder="请选择">
                        <el-option v-for="item in modelengine" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span class="tab-select-title views-text-name">{{$t('views.table.createTime')}}</span>
                    <!-- 选择开始时间、结束时间 -->
                    <el-date-picker type="daterange" :editable='false' range-separator="-" :picker-options="pickerOptions" v-model="timeValue" value-format="yyyy-MM-dd HH:mm:ss" :start-placeholder="$t('views.button.startDate')" :end-placeholder="$t('views.button.endDate')" :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </div>
                <!-- 查询、重置 -->
                <div>
                    <el-button class="btn light small" @click="modelReset">{{$t("views.button.reset")}}</el-button>
                    <el-button class="btn light small" @click="modelSearch">{{$t("views.button.search")}}</el-button>
                </div>
            </div>
        </div>
        <!-- 创建模型预测作业-->
        <div class="views-table-btn">
            <el-button type="primary" class="view-btn-medium" @click="createModel">{{$t('views.modelPrediction.createModel')}}</el-button>
        </div>
        <div class="views-table-content">
            <el-table ref="multipleTable" v-loading="loading" :data="modelPrediction" tooltip-effect="dark" style="width: 100%" border class="tab-content">
                <el-table-column :label="$t('views.projectContent.serial')" width="50" type="index" :index="trainingIndex" header-align="center" align="center">
                </el-table-column>
                <!-- 这里需要自定义模板，然后写链接跳转-->
                <el-table-column :label="$t('views.modelPrediction.modelJobName')" header-align="center" align="center">
                    <template slot-scope="scope">
                        <router-link :to="{name:'partModelDetails',query:{partId:$route.query.partId,idModel:scope.row.id}}" class="views-table-link" tag='a'>{{scope.row.name}}</router-link>
                    </template>
                </el-table-column>
                <!-- 模型预测的状态 -->
                <el-table-column :label="$t('views.development.status')" width="120" header-align="center" align="center">
                    <template slot-scope="scope">
                        <div style="text-align: left;">
                            <!-- 运行失败 -->
                            <i class="iconfont icon-warning views-icon-warning" v-if="scope.row.status==='0'"></i>
                            <span v-if="scope.row.status==='0'">运行失败</span>
                            <!-- 运行中 -->
                            <i class="iconfont icon-yunhangzhong views-icon-yunhangzhong" v-if="scope.row.status==='1'"></i>
                            <span v-if="scope.row.status==='1'">运行中</span>
                        </div>
                    </template>
                </el-table-column>
                <!-- 使用模型 -->
                <el-table-column :label="$t('views.modelPrediction.useModel')" header-align="center" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.mount_info.model_path.s3_path}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="engine" :label="$t('views.trainingTask.engineType')" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="created_at" :label="$t('views.projectContent.createdTime')" header-align="center" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="ip" :label="$t('views.modelPrediction.serverAddress')" show-overflow-tooltip header-align="center" align="center">
                </el-table-column>
                <el-table-column :label="$t('views.trainingTask.runningTime')" header-align="center" align="center">
                    <template slot-scope="scope">
                        {{scope.row.used_time}}s
                    </template>
                </el-table-column>
                <el-table-column prop="describe" :label="$t('views.development.remarks')" show-overflow-tooltip header-align="center" align="center">
                </el-table-column>
                <el-table-column :label="$t('views.projectContent.operation')" header-align="center" align="center" width="200">
                    <template slot-scope="scope">
                        <!-- <span class="views-table-span views-table-margin" size="mini" v-if="scope.row.status==='1'" @click="stopModel(scope.$index,scope.row)">{{$t('views.trainingTask.stop')}}</span> -->
                        <span class="views-table-span views-table-margin del" size="mini" type="danger" @click="modelDelete(scope.row.id)">{{$t('views.projectContent.delete')}}</span>
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
                <el-pagination :page-size="per" layout="prev, pager, next" :total="total" @current-change="modelCurrentChange" :current-page.sync="currentPage" v-if='isCount'>
                </el-pagination>
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
      timeValue: '',
      modelPrediction: [],
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
      loading: true,
      isCount: false,
      per: 0,
      total: 0,
      currentPage: 1
    }
  },
  created () {
    // 请求模型预测状态,函数调用
    this.$store.dispatch('getModelstatus')
    // 请求模型预测状态,函数调用
    this.$store.dispatch('getModelengine')
    let id = this.$route.query.partId
    this.obj.project_id = id
    // 请求模型预测列表数据
    this.getModelPrediction(this.obj)
  },
  mounted () {
    this.linkIndex = 1
  },
  methods: {
    trainingIndex (index) {
      return index + 1
    },
    getModelPrediction (obj) {
      this.$get('/model/modelprediction', obj).then(res => {
        if (res.code === 200) {
          // console.log(JSON.stringify(res))
          this.loading = false
          this.modelPrediction = res.data.model_prediction
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
    modelReset () {
      let id = this.$route.query.partId
      let obj = {// 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        project_id: id,
        engine: ''
      }
      this.timeValue = ''
      this.obj = obj
      return obj
    },
    // 查询
    modelSearch () {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0
        this.obj.start_time = 0
      } else {
        this.obj.start_time = this.timeValue[0]
        this.obj.end_time = this.timeValue[1]
      }
      this.currentPage = 1
      this.getModelPrediction(this.obj)
    },
    // 分页
    modelCurrentChange (val) {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0
        this.obj.start_time = 0
      } else {
        this.obj.start_time = this.timeValue[0]
        this.obj.end_time = this.timeValue[1]
      }
      this.obj.page = val
      this.getModelPrediction(this.obj)
    },
    createModel () {
      let id = this.$route.query.partId
      this.$router.push({ name: 'partCreateModelJob', query: { partId: id } })
    },
    // 打开删除弹出框
    modelDelete (id) {
      this.$confirm(this.$t('views.dialogText.deleteConfirm'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning'
      }).then(() => {
        let obj = {
          model_id: id
        }
        this.$post('/model/modelpredictiondelete', obj).then(res => {
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.getModelPrediction(this.obj)
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
    stopDialogSingle (id) {
      this.$confirm('确定停止该模型预测?', '停止模型预测', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let error = this.$t('views.projectContent.requestError')
        let obj = {
          model_id: id
        }
        this.$post('personal-space/model-stop', obj, error).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停止'
        })
      })
    }

  },
  components: {},
  computed: {
    modelstatus () { // 模型预测状态
      return this.$store.getters.postModelstatus
    },
    modelengine () { // 引擎类型
      return this.$store.getters.postModelengine
    }
  }
}
</script>
