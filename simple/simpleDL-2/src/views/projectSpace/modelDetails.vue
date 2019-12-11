/*
 * @Author:任雷雷
 * @Date: 2018-07-12 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-12 10:31:59
 * @Description:我的项目-模型预测详情
<template>
    <div class="views-personal">
        <!-- 基本信息 -->
        <div class="views-header-inf">
            <span>{{$t('views.modelPrediction.basicInf')}}</span>
        </div>
        <table class="views-project-details views-tabel-details" v-if="modelBasic !== ''">
            <tr>
                <td class="views-basic-color1">作业名称</td>
                <td class="views-basic-name">
                    <el-input placeholder="" v-model="modelName" :disabled="editDisabled">
                    </el-input>
                    <i class="iconfont icon-edit views-icon-edit" @click="modelEdit"></i>
                </td>
                <td class="views-basic-color1">作业状态</td>
                <td>
                    <!-- 运行失败 -->
                    <span v-if="modelBasic.status==='0'">运行失败</span>
                    <!-- 运行中 -->
                    <span v-if="modelBasic.status==='1'">{{$t('views.status.running')}}</span>
                </td>
            </tr>
            <tr>
                <td class="views-basic-color2">引擎类型</td>
                <td class="views-basic-color3">{{modelBasic.engine}}</td>
                <td class="views-basic-color2">ID</td>
                <td class="views-basic-color3">{{modelBasic.model_uid}}</td>
            </tr>
            <tr>
                <td class="views-basic-color1">创建时间</td>
                <td>{{modelBasic.created_at}}</td>
                <td class="views-basic-color1">运行时长</td>
                <td>{{modelBasic.used_time}}</td>
            </tr>
            <tr>
                <td class="views-basic-color2">计算节点规格</td>
                <td class="views-basic-color3">
                    <span>
                        GPU:{{modelBasic.gpu}}
                    </span>
                    <span class="views-table-margin">
                        CPU:{{modelBasic.cpu}}
                    </span>
                    <span class="views-table-margin">
                        内存:{{modelBasic.memory}}
                    </span>
                </td>
                <td class="views-basic-color2">使用模型</td>
                <td class="views-basic-color3">{{modelBasic.mount_info.model_path.s3_path}}</td>
            </tr>
            <tr>
                <td class="views-basic-color1">接口类型</td>
                <td>{{modelBasic.type}}</td>
                <td class="views-basic-color1">计算节点个数</td>
                <td>1</td>
            </tr>
            <tr>
                <td class="views-basic-color2">作业参数</td>
                <td class="views-basic-color3">{{modelBasic.param.model_name}}</td>
                <td class="views-basic-color2">服务地址</td>
                <td class="views-basic-color3">
                    <a :href="modelBasic.ip">{{modelBasic.ip}}</a>
                </td>
            </tr>
        </table>
        <!-- 备注信息 -->
        <div class="views-header-inf">
            <span>备注信息</span>
        </div>
        <div class="views-develop-remarks">
            <div class="views-develop-edit">
                <i class="iconfont icon-edit views-icon-edit" @click="remarksEdit"></i>
            </div>
            <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="modelarea" :disabled="editDisabled">
            </el-input>
        </div>
        <!-- 预测日志 -->
        <div class="views-model-log">
            <div class="views-header-inf">
                <span>预测日志</span>
            </div>
            <div class="views-task-news">
                <div class="views-task-select">
                    <el-select v-model="logParams.model_node" placeholder="请选择" @change="changeLogModel" ref="changeFocus">
                        <el-option v-for="item in practice_node" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button class="view-btn-medium" type='primary' @click="downLog">下载日志</el-button>
                </div>
            </div>
            <p class="views-task-text">在运行日志内使用鼠标上下滚动获取更多的日志</p>
            <div class="views-task-log">
                <el-scrollbar style="height:100%;">
                    <div class="veiws-text-log">
                        <div v-for="(item,index) in journal" :key="index" class="views-text-span">
                            <span>{{index}}：</span>
                            <span>{{item}}</span>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
            <!-- <p class="views-task-text views-model-load">预测作业创建成功后，可下载、适配、运行样例代码发起预测请求，样例代码下载及使用说明点击
                <a href="#">这里</a>下载
            </p> -->
        </div>
        <div class="views-header-inf">
            <span>预测示例</span>
        </div>
        <div class="views-picture-box">
            <views-picture-prediction></views-picture-prediction>
        </div>
        <!-- 作业名称弹出窗 -->
        <el-dialog title="修改作业名称" :visible.sync="dialogModel" width="30%" :before-close="handleClose" top='30vh' custom-class="views-dialog">
            <div class="views-dialog-develop">
                <span class="views-dialog-name">作业名称</span>
                <el-input placeholder="" v-model="modelName">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogModel = false" class="cancel">取 消</el-button>
                <el-button type="primary" @click="changeDialogSingle('ModelPrediction[name]','modelName')" class="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改环备注名称弹出窗 -->
        <el-dialog title="修改备注信息" :visible.sync="remarksDialog" width="30%" :before-close="handleClose" top='30vh' custom-class="views-dialog">
            <div class="views-dialog-develop">
                <span class="views-dialog-remarks">备注信息</span>
                <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="modelarea">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="remarksDialog = false" class="cancel">取 消</el-button>
                <el-button type="primary" @click="remarksDialogSingle('ModelPrediction[describe]','modelarea')" class="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 下载日志弹出窗 -->
        <el-dialog title="下载日志" :visible.sync="downDialog" width="30%" :before-close="handleClose" top='30vh' custom-class="views-dialog">
            <div class="views-dialog-develop views-dialog-loading">
                <div>
                    <span class="tab-select-title tab-select-mg">选择节点：</span>
                    <el-select v-model="logParams.model_node" :placeholder="$t('views.development.pleaseChoose')" clearable>
                        <el-option v-for="item in practice_node" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="views-input-box">
                    <span class="tab-select-title  tab-select-mg">选择时间：</span>
                    <!-- 选择开始时间、结束时间 -->
                    <el-date-picker type="daterange" :editable='false' range-separator="-" :picker-options="pickerOptions" v-model="nodeTime" value-format="yyyy-MM-dd HH:mm:ss" :start-placeholder="$t('views.button.startDate')" :end-placeholder="$t('views.button.endDate')" :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="downDialog = false" class="cancel">取 消</el-button>
                <el-button type="primary" @click="dialogSingleSure" class="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 图片预测
import ViewsPicturePrediction from './picturePrediction'
import { timeData } from '../../util/index.js'
export default {
  data () {
    let time = timeData()
    return {
      editDisabled: true,
      dialogModel: false,
      remarksDialog: false,
      downDialog: false,
      modelBasic: '',
      modelarea: '',
      modelName: '',
      journal: '',
      pickerOptions: time,
      nodeTime: '',
      practice_node: '',
      obj: {
        model_id: ''
      },
      logParams: {
        model_id: '',
        model_node: ''
      },
      id: '',
      timer: '',
      nodeObj: {
        id: '',
        node: '',
        end_time: '',
        start_time: '',
        type: 2
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    window.clearTimeout(this.timer)
    if (to.name === 'projectDetails' && to.query.id === undefined) {
      let id = this.id
      this.$router.push({
        name: 'projectDetails',
        query: {
          id: id
        }
      })
    } else {
      next()
    }
  },
  created () {
    this.nodeObj.id = this.logParams.model_id = this.obj.model_id = this.$route.query.idModel
    this.id = this.$route.query.id
    // 获取模型预测详情函数调用
    this.getModelDetails(this.obj)
    // 获取模型预测日志调用
    this.getModelpredictionlog(this.logParams)
  },
  mounted () { },
  methods: {
    // 获取模型预测详情
    getModelDetails (obj) {
      // console.log(this.$route.params.id)
      this.$get('/model/modelpredictiondetail', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 基本信息
          this.modelBasic = res.data.model_prediction
          // 环境名称
          this.modelName = this.modelBasic.name
          // 备注信息
          this.modelarea = this.modelBasic.describe
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 模型预测修改作业名称、备注信息
    modelpredictionupdate (obj) {
      this.$post('/model/modelpredictionupdate', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.getModelDetails(this.obj)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 获取模型预测日志
    getModelpredictionlog (obj) {
      let that = this
      this.$post('/model/modelpredictionlog', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 训练日志
          if (res.data.length !== 0) {
            this.journal = res.data.model_log
            this.practice_node = [{ label: '全部', value: '' }, ...res.data.model_node]
          }
          this.timer = setTimeout(() => {
            that.getModelpredictionlog(this.logParams)
          }, 10000)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 打开修改作业名称编辑框
    modelEdit () {
      this.dialogModel = true
    },
    handleClose (done) {
      done()
    },
    // 确定修改作业名称
    changeDialogSingle (key, name) {
      let obj = {
        model_id: this.obj.model_id,
        [key]: this[name]
      }
      this.modelpredictionupdate(obj)
      this.dialogModel = false
    },
    // 打开修改备注的弹出框
    remarksEdit () {
      this.remarksDialog = true
    },
    // 确定修改备注信息
    remarksDialogSingle (key, name) {
      let obj = {
        model_id: this.obj.model_id,
        [key]: this[name]
      }
      this.modelpredictionupdate(obj)
      this.remarksDialog = false
    },
    changeLogModel (val) {
      this.logParams.model_node = val
      this.getModelpredictionlog(this.logParams)
    },
    // 下载的日志
    downLog () {
      this.downDialog = true
    },
    // 确定下载日志
    dialogSingleSure () {
      console.log('====')
      if (this.nodeTime === '') {
        this.nodeObj = this.nodeObj
      } else {
        this.nodeObj.start_time = this.nodeTime[0]
        this.nodeObj.end_time = this.nodeTime[1]
      }
      console.log(this.nodeObj)
      this.$store.commit('downloadlog', this.nodeObj)
    }
  },
  components: { ViewsPicturePrediction },
  computed: {}
}
</script>
