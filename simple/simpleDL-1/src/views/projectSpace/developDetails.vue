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
                    <el-input placeholder="" v-model="developName" :disabled="editDisabled">
                    </el-input>
                    <i class="iconfont icon-edit views-icon-edit" @click="nameEdit"></i>
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
                <td colspan="3" class="views-basic-color3">{{devBasic.category}}</td>
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
                    <a :href="devBasic.notebook_url">
                        {{devBasic.notebook_url}}
                    </a>
                </td>
                <td class="views-basic-color1">远程登陆访问地址</td>
                <td>{{devBasic.ssh_url}}</td>
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
            <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="developarea" :disabled="editDisabled">
            </el-input>
        </div>
        <!-- 配置信息 -->
        <div class="views-header-inf">
            <span>配置信息</span>
        </div>
        <table class="views-project-details views-tabel-details">
            <tr>
                <td class="views-basic-color1">CPU</td>
                <td>{{devBasic.cpu}}个</td>
                <td class="views-basic-color1">GPU</td>
                <td>{{devBasic.gpu}}个</td>
            </tr>
            <tr>
                <td class="views-basic-color2">内存</td>
                <td colspan="3" class="views-basic-color3">{{devBasic.memory}}G</td>
            </tr>
        </table>
        <!-- 资源使用情况 -->
        <div class="views-header-inf">
            <span>资源使用情况</span>
        </div>
        <div class="views-charts-mt">
            <div class="views-chats-times">
                <el-select v-model="timeValue" placeholder="请选择" @change="changeTimes" ref="changeFocus">
                    <el-option v-for="item in timestatus" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <sedu-echarts domId="developUse" :option=resourcesUseData :myStyle=useProject />
        </div>
        <!-- 修改环境名称弹出窗 -->
        <el-dialog title="修改环境名称" :visible.sync="dialogDev" width="30%" :before-close="handleClose" top='30vh' custom-class="views-dialog">
            <div class="views-dialog-develop">
                <span class="views-dialog-name">环境名称</span>
                <el-input placeholder="" v-model="developName">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDev = false" class="cancel">取 消</el-button>
                <el-button type="primary" @click="changeDialogSingle" class="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改环备注名称弹出窗 -->
        <el-dialog title="修改备注信息" :visible.sync="remarksDialog" width="30%" :before-close="handleClose" top='30vh' custom-class="views-dialog">
            <div class="views-dialog-develop">
                <span class="views-dialog-remarks">备注信息</span>
                <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="developarea">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="remarksDialog = false" class="cancel">取 消</el-button>
                <el-button type="primary" @click="remarksDialogSingle" class="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { echratsData, toPercent } from '../../util/index.js'
export default {
  data () {
    return {
      devDetails: '',
      devBasic: '',
      developName: '',
      editDisabled: true,
      remarksDialog: false,
      dialogDev: false,
      developarea: '',
      useProject: 'width:98%;height:400px;',
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
      }
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
        //  console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 基本信息
          this.devBasic = res.data
          // console.log(JSON.stringify(this.devBasic))
          // 环境名称
          this.developName = res.data.name
          // 备注
          this.developarea = res.data.describe
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 修改环境名称
    nameEdit () {
      this.dialogDev = true
    },
    // 选择不同的时间段
    changeTimes (val) {
      this.resource.time_status = val
      this.environmentresource(this.resource)
    },
    // 修改备注信息
    remarksEdit () {
      this.remarksDialog = true
    },
    handleClose (done) {
      done()
    },
    // 修改开发环境名称、备注信息函数
    environmentupdate (obj) {
      this.$post('/environmentproject/environmentupdate', obj).then(res => {
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
    // 修改环境名称确定按钮
    changeDialogSingle () {
      let name = 'Environment[name]'
      let obj = {
        environment_id: this.obj.environment_id,
        [name]: this.developName
      }
      this.environmentupdate(obj)
      this.dialogDev = false
    },
    // 修改备注信息确定按钮
    remarksDialogSingle () {
      let name = 'Environment[describe]'
      let obj = {
        environment_id: this.obj.environment_id,
        [name]: this.developarea
      }
      this.environmentupdate(obj)
      this.remarksDialog = false
    },
    // 开发环境资源使用情况
    environmentresource (obj) {
      console.log(obj)
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
          this.resourcesUseData = echratsData(color, data)
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
