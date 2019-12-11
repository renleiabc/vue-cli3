/*
 * @Author:任雷雷
 * @Date: 2018-07-16 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-16 10:31:59
 * @Description:我的项目-开发环境详情
 */
<template>
  <div class="views-personal">
    <!-- 基本信息 -->
    <div class="views-header-inf">
      <span>{{$t('views.modelPrediction.basicInf')}}</span>
    </div>
    <table class="views-project-details views-tabel-details">
      <tr>
        <td class="views-basic-color1">环境名称</td>
        <td class="views-basic-name">
          <el-input placeholder=""
                    v-model="devBasic.name"
                    :disabled="editDisabled">
          </el-input>
          <i class="iconfont icon-edit views-icon-edit"
             @click="nameEdit"></i>
        </td>
        <td class="views-basic-color1">环境ID</td>
        <td>{{devBasic.environment_uid}}</td>
      </tr>
      <tr>
        <td class="views-basic-color2">状态</td>
        <td class="views-basic-color3">
          <span v-if="devBasic.status === 0">
            异常
          </span>
          <span v-if="devBasic.status === 1">
            运行中
          </span>
          <span v-if="devBasic.status === 2">
            创建中
          </span>
        </td>
        <td class="views-basic-color2">密码</td>
        <td class="views-basic-color3">{{devBasic.password}}</td>
      </tr>
      <tr>
        <td class="views-basic-color1">创建时间</td>
        <td>{{devBasic.created_at}}</td>
        <td class="views-basic-color1">更新时间</td>
        <td>{{devBasic.update_at}}</td>
      </tr>
      <tr>
        <td class="views-basic-color2">镜像分类</td>
        <td colspan="3"
            class="views-basic-color3">{{devBasic.category}}</td>
      </tr>
    </table>
    <!-- 服务器地址 -->
    <div class="views-header-inf">
      <span>服务器地址</span>
    </div>
    <table class="views-project-details views-tabel-details">
      <tr>
        <td class="views-basic-color1">notebook访问地址</td>
        <td>
          <a :href="devBasic.notebook_url"
             target="_blank">
            {{devBasic.notebook_url}}
          </a>
        </td>
        <td class="views-basic-color1">远程登录访问地址</td>
        <td>{{devBasic.ssh_url}}</td>
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
                v-model="devBasic.describe"
                :disabled="editDisabled">
      </el-input>
    </div>
    <!-- 服务器地址 -->
    <div class="views-header-inf">
      <span>存储挂载信息</span>
    </div>
    <table class="views-project-details views-tabel-details">
      <tr v-if="mount.length === 0">
        <td>
          <div slot="empty">
            <div class="views-empty">
              <span class="views-empty-table"></span>
              <p class="views-empty-text">{{$t('views.table.noData')}}</p>
            </div>
          </div>
        </td>
      </tr>
      <tr v-for="(item,index) in mount"
          :key="index"
          v-else>
        <td class="views-basic-color1">ks3_bucket</td>
        <td>
          {{item.bucket}}
        </td>
        <td class="views-basic-color1">local_dir</td>
        <td> {{item.dir}}</td>
      </tr>
    </table>
    <!-- 配置信息 -->
    <div class="views-header-inf">
      <span>配置信息</span>
    </div>
    <table class="views-project-details views-tabel-details">
      <tr>
        <td class="views-basic-color1">CPU</td>
        <td>{{devBasic.cpu}}&nbsp;核</td>
        <td class="views-basic-color1">GPU</td>
        <td>{{devBasic.gpu}}&nbsp;个</td>
      </tr>
      <tr>
        <td class="views-basic-color2">内存</td>
        <td colspan="3"
            class="views-basic-color3">{{devBasic.memory}}&nbsp;G</td>
      </tr>
    </table>
    <!-- 资源使用情况 -->
    <div class="views-header-inf">
      <span>资源使用情况</span>
    </div>
    <div class="views-charts-mt">
      <div class="views-chats-times">
        <el-select v-model="timeValue"
                   placeholder="请选择"
                   @change="changeTimes"
                   ref="changeFocus">
          <el-option v-for="item in timestatus"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <sedu-echarts v-if="JSON.stringify(resourcesUseData)!=='{}'"
                    domId="developUse"
                    :option=resourcesUseData
                    :myStyle=useProject />
      <div v-else>
        <span>暂无数据</span>
      </div>
    </div>
    <!-- 修改环境名称弹出窗 -->
    <el-dialog title="修改环境名称"
               :visible.sync="dialogDev"
               width="30%"
               :before-close="handleClose"
               top='30vh'
               custom-class="views-dialog">
      <el-form :model="ruleForm"
               :rules="createDevrules"
               ref="ruleForm"
               :label-width="labelWidth"
               class="demo-ruleForm">
        <div class="views-modify-name">
          <el-form-item :label="$t('views.development.environmentalName')"
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
    <!-- 修改环备注名称弹出窗 -->
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
  </div>
</template>

<script>

import { toPercent, nameEcharts } from '../../util/index.js'
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
    return {
      devDetails: '',
      devBasic: '',
      developName: '',
      editDisabled: true,
      remarksDialog: false,
      dialogDev: false,
      developarea: '',
      useProject: 'width:95%;height:400px;margin:0 auto;',
      resource: {
        environment_id: '',
        time_status: 1
      },
      resourcesUseData: {},
      obj: {
        environment_id: ''
      },
      timeValue: 1,
      id: '',
      logParams: {
        practice_id: '',
        practice_node: ''
      },
      labelWidth: '100px',
      ruleForm: {
        name: '',
        desc: ''
      },
      descRules: {
        desc: [
          { required: false, validator: desc, trigger: 'blur' }
        ]
      },
      createDevrules: {
        name: [
          { required: true, validator: name, trigger: 'blur' },
          { min: 2, max: 30, message: this.$t('views.development.youCan'), trigger: 'blur' }
        ]
      },
      mount: []
    }
  },
  beforeRouteLeave (to, from, next) {
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
    this.id = this.$route.query.id
    // console.log(this.id)
    // 获取不同时间段函数调用
    this.$store.dispatch('getTimestatus')
    this.index = this.$route.query.idChild
    this.resource.environment_id = this.obj.environment_id = this.$route.query.idChild
    // 获取开发环境信息函数调用
    this.getDevelopmentDetails(this.obj)
    // 开发环境资源使用情况
    this.environmentresource(this.resource)
  },
  mounted () { },
  methods: {
    // 获取开发环境信息函数
    getDevelopmentDetails (obj) {
      this.$get('/environmentproject/environmentdetail', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 基本信息
          this.devBasic = res.data
          // console.log(JSON.stringify(this.devBasic))
          let mountData = res.data.mount_info
          if (mountData === null) {
            this.mount = []
          } else {
            this.mount = []
            for (let key in mountData) {
              let obj = {
                bucket: key.substring(5),
                dir: key
              }
              this.mount.push(obj)
            }
          }
          // console.log(JSON.stringify(this.mount))
          // 环境名称
          this.ruleForm.name = res.data.name
          // 备注
          this.ruleForm.desc = res.data.describe
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 选择不同的时间段
    changeTimes (val) {
      this.resource.time_status = val
      this.environmentresource(this.resource)
    },
    // 打开修改备注的弹出框
    remarksEdit () {
      this.ruleForm.desc = this.devBasic.describe
      this.remarksDialog = true
    },
    // 打开修改作业名称编辑框
    nameEdit () {
      this.dialogDev = true
      this.ruleForm.name = this.devBasic.name
    },
    // 取消修改名称
    dialogCancel (formName) {
      this.$refs[formName].resetFields()
      this.dialogDev = false
    },
    // 取消修改备注
    remarksCancel (formName) {
      this.$refs[formName].resetFields()
      this.remarksDialog = false
    },
    handleClose (done) {
      done()
    },
    // 修改开发环境名称、备注信息函数
    environmentupdate (obj) {
      this.$post('/environmentproject/environmentupdate', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.getDevelopmentDetails(this.obj)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 确定修改作业名称
    changeDialogSingle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let name = 'Environment[name]'
          let obj = {
            environment_id: this.obj.environment_id,
            [name]: this.ruleForm.name
          }
          this.environmentupdate(obj)
          this.dialogDev = false
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
            environment_id: this.obj.environment_id,
            'Environment[describe]': this.ruleForm.desc
          }
          this.environmentupdate(obj)
          this.remarksDialog = false
        } else {
          return false
        }
      })
    },
    // 开发环境资源使用情况
    environmentresource (obj) {
      this.$post('/environmentproject/environmentresource', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          let data = res.data
          data.show.value = toPercent(data.show.value)
          data.cpu.value = toPercent(data.cpu.value)
          data.memory.value = toPercent(data.memory.value)
          data.gpu.value = toPercent(data.gpu.value)
          // console.log(JSON.stringify(data))
          let color = ['#F17472', '#42E1BB', '#FEC633', '#54BECC']
          console.log(data.time)
          if (data.time) {
            this.resourcesUseData = nameEcharts(color, data)
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 项目使用情况数据渲染
    projectUse (data) {
      setTimeout(() => {

      }, 1000)
    }
  },
  components: {},
  computed: {
    timestatus () {
      return this.$store.getters.postTimestatus
    }
  }
}

</script>
