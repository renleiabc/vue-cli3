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
    <table class="views-project-details views-tabel-details"
      v-if="modelBasic !== ''">
      <tr>
        <td class="views-basic-color1">{{$t('views.modelPrediction.jobName')}}</td>
        <td class="views-basic-name">
          <el-input placeholder=""
            v-model="modelBasic.name"
            :disabled="editDisabled">
          </el-input>
          <i class="iconfont icon-edit views-icon-edit"
            @click="modelEdit"></i>
        </td>
        <td class="views-basic-color1">作业状态</td>
        <td>
          <!-- 运行失败 -->
          <span v-if="modelBasic.status==='0'">运行失败</span>
          <!-- 运行中 -->
          <span v-if="modelBasic.status==='1'">{{$t('views.status.running')}}</span>
          <!-- 创建中 -->
          <span v-if="modelBasic.status==='2'">创建中</span>
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
        <td>{{formatSeconds(modelBasic.used_time)}}</td>
      </tr>
      <tr>
        <td class="views-basic-color2">计算节点规格</td>
        <td class="views-basic-color3">
          <span class="views-table-margin">
            CPU:{{modelBasic.cpu}}&nbsp;核
          </span>
          <span class="views-table-margin">
            内存:{{modelBasic.memory}}&nbsp;G
          </span>
        </td>
        <td class="views-basic-color2">使用模型</td>
        <td class="views-basic-color3">
          <div class="views-table-word">
            {{modelBasic.mount_info.model_path.s3_path}}
          </div>
        </td>
      </tr>
      <tr>
        <td class="views-basic-color1">接口类型</td>
        <td>{{modelBasic.type}}</td>
        <td class="views-basic-color1">计算节点个数</td>
        <td>1</td>
      </tr>
      <tr>
        <td class="views-basic-color2">作业参数</td>
        <td class="views-basic-color3">model_name={{modelBasic.param.model_name}}</td>
        <td class="views-basic-color2">服务器地址</td>
        <td class="views-basic-color3">
          <span>{{modelBasic.ip}}</span>
        </td>
      </tr>
    </table>
    <!-- 备注信息 -->
    <div class="views-header-inf">
      <span>备注信息</span>
    </div>
    <div class="views-develop-remarks">
      <div class="views-develop-edit">
        <i class="iconfont icon-edit views-icon-edit"
          @click="remarksEdit"></i>
      </div>
      <el-input type="textarea"
        :rows="8"
        placeholder="请输入内容"
        v-model="modelBasic.describe"
        :disabled="editDisabled">
      </el-input>
    </div>
    <!-- 预测日志 -->
    <div class="views-model-log">
      <div class="views-header-inf">
        <span>预测日志</span>
      </div>
      <div class="views-task-news">
        <div class="views-task-select">
          <el-select v-model="logParams.model_node"
            placeholder="请选择"
            @change="changeLogModel"
            ref="changeFocus">
            <el-option v-for="item in practice_node"
              :key="item.value"
              :label="item.label"
              :value="item.value" :title="item.label">
            </el-option>
          </el-select>
          <el-button class="view-btn-medium"
            type='primary'
            @click="downLog">下载日志</el-button>
        </div>
      </div>
      <p class="views-task-text">在运行日志内使用鼠标上下滚动获取更多的日志</p>
      <div class="views-task-log">
        <el-scrollbar style="height:100%;">
          <div class="veiws-text-log">
            <div v-for="(item,index) in journal"
              :key="index"
              class="views-text-span">
              <span>{{index}}：</span>
              <div v-for="(ele,i) in item"
                :key="i">
                {{ele}}
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <!-- 作业名称弹出窗 -->
    <el-dialog title="修改作业名称"
      :visible.sync="dialogModel"
      width="30%"
      :before-close="handleClose"
      top='30vh'
      custom-class="views-dialog">
      <el-form :model="ruleForm"
        :rules="modelRules"
        ref="ruleForm"
        :label-width="labelWidth"
        class="demo-ruleForm">
        <div class="views-modify-name">
          <el-form-item :label="$t('views.modelPrediction.jobName')"
            prop="name">
            <el-input v-model="ruleForm.name"
              :placeholder="$t('views.development.youCan')"
              minlength=2
              maxlength=30
              clearable></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="dialogCancel('ruleForm')"
          class="cancel">取 消</el-button>
        <el-button type="primary"
          @click="changeDialogSingle('ruleForm')"
          class="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改环备注弹出窗 -->
    <el-dialog title="修改备注信息"
      :visible.sync="remarksDialog"
      width="30%"
      :before-close="handleClose"
      top='30vh'
      custom-class="views-dialog">
      <el-form :model="ruleForm"
        :rules="descRules"
        ref="ruleForm"
        :label-width="labelWidth"
        class="demo-ruleForm">
        <div class="views-dialog-develop">
          <el-form-item label="备注信息"
            prop="desc">
            <el-input type="textarea"
              :rows="8"
              maxlength=200
              placeholder="请输入内容"
              v-model="ruleForm.desc">
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="remarksCancel('ruleForm')"
          class="cancel">取 消</el-button>
        <el-button type="primary"
          @click="remarksDialogSingle('ruleForm')"
          class="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 下载日志弹出窗 -->
    <el-dialog title="下载日志"
      :visible.sync="downDialog"
      width="30%"
      :before-close="handleClose"
      top='30vh'
      custom-class="views-dialog">
      <div class="views-dialog-develop views-dialog-loading">
        <div>
          <span class="tab-select-title tab-select-mg">选择节点：</span>
          <el-select v-model="nodeObj.node"
            :placeholder="$t('views.development.pleaseChoose')"
            clearable>
            <el-option v-for="item in practice_node"
              :key="item.value"
              :label="item.label"
              :value="item.value" :title="item.label">
            </el-option>
          </el-select>
        </div>
        <div class="views-input-box views-input-time">
          <span class="tab-select-title  tab-select-mg">选择时间：</span>
          <div class="views-date-picter">
            <el-date-picker v-model="nodeObj.start_time"
              align="right"
              type="date"
              :editable='false'
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              :clearable='clearable'>
            </el-date-picker><span class="views-time-now">&nbsp;~&nbsp;现在</span>
          </div>
        </div>
      </div>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="downDialog = false"
          class="cancel">取 消</el-button>
        <el-button type="primary"
          @click="dialogSingleSure"
          class="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 图片预测
// import ViewsPicturePrediction from './picturePrediction'
import { datePicker, getNowFormatDate, formatSeconds } from '@/util/index.js'
import { validateUsername, valiName } from '@/util/validate.js'
export default {
  data () {
    var name = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入名称'))
      } else if (!validateUsername(value)) {
        callback(new Error('只能输入2-30位字母、数字、下划线'))
      } else {
        callback()
      }
    }
    var desc = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (!valiName(value)) {
        callback(new Error('不得包含特殊字符:<>:\'"/\\.'))
      } else {
        callback()
      }
    }
    let time = datePicker()
    let date = new Date()
    let currentTime = getNowFormatDate(date)
    return {
      editDisabled: true,
      dialogModel: false,
      remarksDialog: false,
      downDialog: false,
      clearable: false,
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
        start_time: currentTime,
        type: 2
      },
      labelWidth: '120px',
      ruleForm: {
        name: '',
        desc: ''
      },
      descRules: {
        desc: [
          { required: false, validator: desc, trigger: 'blur' }
        ]
      },
      modelRules: {
        name: [
          { required: true, validator: name, trigger: 'blur' },
          { min: 2, max: 30, message: this.$t('views.development.youCan'), trigger: 'blur' }
        ]
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
  destroyed () {
    clearTimeout(this.timer)
  },
  mounted () { },
  methods: {
    formatSeconds,
    // 获取模型预测详情
    getModelDetails (obj) {
      // console.log(this.$route.params.id)
      this.$get('/model/modelpredictiondetail', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 基本信息
          this.modelBasic = res.data.model_prediction
          // 环境名称
          this.ruleForm.name = this.modelBasic.name
          // 备注信息
          this.ruleForm.desc = this.modelBasic.describe
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
    // 打开修改备注的弹出框
    remarksEdit () {
      this.ruleForm.desc = this.modelBasic.describe
      this.remarksDialog = true
    },
    // 打开修改作业名称编辑框
    modelEdit () {
      this.dialogModel = true
      this.ruleForm.name = this.modelBasic.name
    },
    // 取消修改名称
    dialogCancel (formName) {
      this.$refs[formName].resetFields()
      this.dialogModel = false
    },
    // 取消修改备注
    remarksCancel (formName) {
      this.$refs[formName].resetFields()
      this.remarksDialog = false
    },
    handleClose (done) {
      done()
    },
    // 确定修改作业名称
    changeDialogSingle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            model_id: this.obj.model_id,
            'ModelPrediction[name]': this.ruleForm.name
          }
          this.modelpredictionupdate(obj)
          this.dialogModel = false
        } else {
          return false
        }
      })
    },
    // 确定修改备注信息
    remarksDialogSingle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            model_id: this.obj.model_id,
            'ModelPrediction[describe]': this.ruleForm.desc
          }
          this.modelpredictionupdate(obj)
          this.remarksDialog = false
        } else {
          return false
        }
      })
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
      // console.log(JSON.stringify(this.nodeObj))
      this.$store.commit('downloadlog', this.nodeObj)
      this.downDialog = false
    }
  },
  computed: {}
}
</script>
