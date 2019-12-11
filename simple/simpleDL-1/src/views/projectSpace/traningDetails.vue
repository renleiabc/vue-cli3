/*
 * @Author:任雷雷
 * @Date: 2018-07-30 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-30 10:31:59
 * @Description:我的项目-训练任务详情
 */
<template>
    <div class="views-personal">
        <!-- 基本信息 -->
        <div class="views-header-inf">
            <span>{{$t('views.modelPrediction.basicInf')}}</span>
        </div>
        <table class="views-project-details views-tabel-details" v-if="taskBasic !== ''">
            <tr>
                <td class="views-basic-color1">任务名称</td>
                <td class="views-basic-name">
                    <el-input placeholder="" v-model="taskName" :disabled="editDisabled">
                    </el-input>
                    <i class="iconfont icon-edit views-icon-edit" @click="taskEdit"></i>
                </td>
                <td class="views-basic-color1">作业状态</td>
                <td>
                    <span v-if="taskBasic.status==='0'">失败</span>
                    <span v-if="taskBasic.status==='1'">运行中</span>
                    <span v-if="taskBasic.status==='2'">创建中</span>
                    <span v-if="taskBasic.status==='3'">运行成功</span>
                    <span v-if="taskBasic.status==='4'">停止</span>
                </td>
            </tr>
            <tr>
                <td class="views-basic-color2">引擎类型</td>
                <td class="views-basic-color3">{{taskBasic.engine}}</td>
                <td class="views-basic-color2">ID</td>
                <td class="views-basic-color3">{{taskBasic.practice_uid}}</td>
            </tr>
            <tr>
                <td class="views-basic-color1">创建时间</td>
                <td>{{taskBasic.created_at}}</td>
                <td class="views-basic-color1">运行时长</td>
                <td>{{taskBasic.used_time}}</td>
            </tr>
            <tr>
                <td class="views-basic-color2">运行参数</td>
                <td class="views-basic-color3">
                    <span v-for="(item,key) in taskBasic.param" :key="key">
                        <span>{{key}}:</span>
                        <span>{{item}};&nbsp;&nbsp;</span>
                    </span>
                </td>
                <td class="views-basic-color2" v-if="taskBasic.engine==='tensorflow'">代码目录</td>
                <td class="views-basic-color3" v-if="taskBasic.engine==='tensorflow'">{{taskBasic.mount_info.code_path.s3_path}}</td>
                <td class="views-basic-color1" v-if="taskBasic.engine==='caffe'">训练数据路径</td>
                <td v-if="taskBasic.engine==='caffe'">{{taskBasic.mount_info.train_data_dir.s3_path}}</td>
            </tr>
            <tr>
                <td class="views-basic-color1">计算节点个数</td>
                <td>{{taskBasic.node_num}}</td>
                <td class="views-basic-color1" v-if="taskBasic.engine==='tensorflow'">启动文件</td>
                <td v-if="taskBasic.engine==='tensorflow'">{{taskBasic.mount_info.launch_script.s3_path}}</td>
                <td class="views-basic-color1" v-if="taskBasic.engine==='caffe'">网络层文件</td>
                <td v-if="taskBasic.engine==='caffe'">{{taskBasic.mount_info.proto_file.s3_path}}</td>
            </tr>
            <tr>
                <td class="views-basic-color2">计算节点规格</td>
                <td class="views-basic-color3">
                    <span>
                        GPU:{{taskBasic.gpu}}
                    </span>
                    <span class="views-table-margin">
                        CPU:{{taskBasic.cpu}}
                    </span>
                    <span class="views-table-margin">
                        内存:{{taskBasic.memory}}
                    </span>
                </td>
                <td class="views-basic-color2" v-if="taskBasic.engine==='tensorflow'">训练数据集</td>
                <td class="views-basic-color3" v-if="taskBasic.engine==='tensorflow'">{{taskBasic.mount_info.dataset.s3_path}}</td>
                <td class="views-basic-color1" v-if="taskBasic.engine==='caffe'">测试数据路径</td>
                <td v-if="taskBasic.engine==='caffe'">{{taskBasic.mount_info.test_data_dir.s3_path}}</td>
            </tr>
            <tr>
                <td class="views-basic-color1">可视化链接</td>
                <td colspan="3" class="views-table-link">
                    <a :href="taskBasic.tensorboard_url">{{taskBasic.tensorboard_url}}</a>
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
            <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="taskarea" :disabled="editDisabled">
            </el-input>
        </div>
        <!-- 训练日志 -->
        <div class="views-header-inf">
            <span>训练日志</span>
        </div>
        <div class="views-task-news">
            <div class="views-task-select">
                <el-select v-model="logParams.practice_node" placeholder="请选择" @change="changeLog" ref="changeFocus">
                    <el-option v-for="item in practicenode" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="view-btn-medium" type='primary' @click="downLog" :disabled ="isDisabled">下载日志</el-button>
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
        <!-- 资源监控 -->
        <div class="views-header-inf">
            <span>资源监控</span>
        </div>
        <div class="views-table-content">
            <el-table ref="multipleTable" :data="trainingDetails" tooltip-effect="dark" style="width: 100%" border class="tab-content">
                <el-table-column prop="ndoe_name" label="节点名称" width="110" header-align="center" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="type" label="节点类型" width="100" header-align="center" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="CPU使用率" header-align="center" align="center" width="100">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.cpu*100}}%
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="memory_use" label="内存使用" show-overflow-tooltip header-align="center" align="center" width="100">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.memory_use}}G
                        </span>
                        /<span>
                            {{scope.row.memory_all}}G
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="GPU使用率" header-align="center" align="left" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span class="views-table-details views-table-margin" size="mini" v-for="(item,key) in scope.row.gpu" :key="key">
                            {{item.name}}&nbsp;:&nbsp;{{item.value}}
                        </span>
                    </template>
                </el-table-column>;
                <el-table-column label="显存使用" header-align="center" align="left" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span class="views-table-details views-table-margin" size="mini" v-for="(item,key) in scope.row.show" :key="key">
                            {{item.name}}&nbsp;:&nbsp;{{item.value}}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="views-charts-box">
                <div class="views-charts-mt views-charts-task" v-for="(item,index) in taskResourcesData" :key='index'>
                    <div class="views-node-name">
                        <span>节点名称：{{item.node_name}}</span>
                        <span>（节点类型：{{item.node_type}}）</span>
                    </div>
                    <div class="views-chats-times">
                        <el-select v-model="item.value" placeholder="请选择" @change="changeTimes($event,index)" :name=String(index)>
                            <el-option v-for="item in timestatus" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <sedu-echarts :domId="'taskUse'+index" :option=item.echarts :myStyle=useProject />
                </div>
            </div>
        </div>
        <!-- 修改任务名称弹出窗 -->
        <el-dialog title="修改任务名称" :visible.sync="dialogTask" width="30%" :before-close="handleClose" top='30vh' custom-class="views-dialog">
            <div class="views-dialog-develop">
                <span class="views-dialog-name">任务名称</span>
                <el-input placeholder="" v-model="taskName">
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
                <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="taskarea">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="remarksDialog = false" class="cancel">取 消</el-button>
                <el-button type="primary" @click="remarksDialogSingle" class="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 下载日志弹出窗 -->
        <el-dialog title="下载日志" :visible.sync="downDialog" width="30%" :before-close="handleClose" top='30vh' custom-class="views-dialog">
            <div class="views-dialog-develop views-dialog-loading">
                <div>
                    <span class="tab-select-title tab-select-mg">选择节点：</span>
                    <el-select v-model="nodeObj.node" :placeholder="$t('views.development.pleaseChoose')" clearable>
                        <el-option v-for="item in practicenode" :key="item.value" :label="item.label" :value="item.value">
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
import { echratsData, timeData, toPercent } from '../../util/index.js'
export default {
  data () {
    let time = timeData()
    return {
      dialogTask: false,
      remarksDialog: false,
      downDialog: false,
      taskName: '',
      taskBasic: '',
      timeValue: '',
      taskarea: '',
      editDisabled: true,
      trainingDetails: [],
      practice_node: '',
      journal: {},
      pickerOptions: time,
      useProject: 'height:400px;',
      taskResourcesData: [],
      resources: '',
      id: '',
      obj: {
        practice_id: ''
      },
      logParams: {
        practice_id: '',
        practice_node: ''
      },
      resource: {
        pod_uid: '',
        time_status: 1
      },
      resourceData: '',
      nodeTime: '',
      nodeObj: {
        id: '',
        node: '',
        end_time: '',
        start_time: '',
        type: 1
      },
      timer: '',
      isDisabled: false
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
    // 获取不同时间段函数调用
    this.$store.dispatch('getTimestatus')
    this.nodeObj.id = this.logParams.practice_id = this.obj.practice_id = this.$route.query.idTask
    this.id = this.$route.query.id
    // 获取训练任务数据函数调用
    this.getDevelopmentDetails(this.obj)
    // 训练任务日志记录
    this.getPracticelog(this.logParams)
    // 获取资源信息数据 函数调用
    this.getResouseData(this.obj)
    // 获取不同时间段函数调用
    this.$store.dispatch('postPracticenode', this.obj)
  },
  mounted () { },
  methods: {
    // 获取训练任务详情
    getDevelopmentDetails (obj) {
      this.$post('/practiceproject/practicedetail', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 基本信息
          this.taskBasic = res.data.practice
          // 环境名称
          this.taskName = res.data.practice.name
          // 备注信息
          this.taskarea = res.data.practice.describe
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 获取训练任务日志
    getPracticelog (obj) {
      let that = this
      this.$post('/practiceproject/practicelog', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 训练日志
          if (res.data.length !== 0) {
            this.isDisabled = false
            this.journal = res.data.practice_log
            this.timer = setTimeout(() => {
              that.getPracticelog(this.logParams)
            }, 10000)
          } else {
            this.isDisabled = true
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 修改训练任务详情
    getPracticeupdate (obj) {
      this.$post('/practiceproject/practiceupdate', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          // 获取训练任务数据函数调用
          this.getDevelopmentDetails(this.obj)
          // 训练任务日志记录
          this.getPracticelog(this.obj)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 获取资源信息数据
    getResouseData (obj) {
      this.$post('/practiceproject/practiceresource', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 资源数据监控
          let data
          this.trainingDetails = data = res.data
          for (let i = 0; i < data.length; i++) {
            // 节点资源信息ID
            this.resource.pod_uid = data[i].pod_uid
            this.practicenoderesource(this.resource, data[i])
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 训练任务每一个节点资源使用情况
    practicenoderesource (obj, data) {
      let color = ['#F17472', '#42E1BB', '#FEC633', '#54BECC']
      this.$post('/practiceproject/practicenoderesource', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          let echartsData = {}
          let resourceData = res.data
          resourceData.show.value = toPercent(resourceData.show.value)
          resourceData.cpu.value = toPercent(resourceData.cpu.value)
          resourceData.memory.value = toPercent(resourceData.memory.value)
          resourceData.gpu.value = toPercent(resourceData.gpu.value)
          echartsData.echarts = echratsData(color, resourceData)
          // 节点名称
          echartsData.node_name = data.ndoe_name
          // 节点类型
          echartsData.node_type = data.type
          echartsData.value = 1
          // 默认时间段
          // echartsData.value = resources[i].value
          this.taskResourcesData.push(echartsData)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 改变时间段，训练任务每一个节点资源使用情况
    noderesource (obj, item) {
      let color = ['#F17472', '#42E1BB', '#FEC633', '#54BECC']
      this.$post('/practiceproject/practicenoderesource', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.taskResourcesData[item].echarts = echratsData(color, res.data)
          this.taskResourcesData = [...this.taskResourcesData]
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 确定修改任务名称按钮
    changeDialogSingle () {
      let name = 'Practice[name]'
      let obj = {
        practice_id: this.obj.practice_id,
        [name]: this.taskName
      }
      this.getPracticeupdate(obj)
      this.dialogTask = false
    },
    // 确定修改备注内容
    remarksDialogSingle () {
      let describe = 'Practice[describe]'
      let obj = {
        practice_id: this.obj.practice_id,
        [describe]: this.taskarea
      }
      this.getPracticeupdate(obj)
      this.remarksDialog = false
    },
    handleClose (done) {
      done()
    },
    // 打开修改任务名称的弹出框
    taskEdit () {
      this.dialogTask = true
    },
    // 打开修改备注的弹出框
    remarksEdit () {
      this.remarksDialog = true
    },
    trainingIndex (index) {
      return index + 1
    },
    changeLog (val) {
      this.logParams.practice_node = val
      // 训练任务日志记录
      this.getPracticelog(this.logParams)
    },
    // 下载的日志
    downLog () {
      this.downDialog = true
    },
    // 确定下载日志
    dialogSingleSure () {
      if (this.nodeTime === '') {
        this.nodeObj = this.nodeObj
      } else {
        this.nodeObj.start_time = this.nodeTime[0]
        this.nodeObj.end_time = this.nodeTime[1]
      }
      console.log(this.nodeObj)
      this.$store.commit('downloadlog', this.nodeObj)
      this.downDialog = false
    },
    changeTimes ($event, item) {
      console.log($event)
      this.resource.time_status = $event
      this.noderesource(this.resource, item)
      // console.log(JSON.stringify(this.taskResourcesData))
    }
  },
  components: {},
  computed: {
    timestatus () {
      return this.$store.getters.postTimestatus
    },
    practicenode () {
      return this.$store.getters.postPracticenode
    }

  }
}
</script>
