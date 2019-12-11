/*
 * @Author:任雷雷
 * @Date: 2018-07-16 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-23 10:31:59
 * @Description:项目详情
 */
<template>
    <div>
        <table class="views-project-details">
            <tr>
                <td>{{$t('views.projectContent.projectName')}}</td>
                <td>{{projectData.name}}</td>
                <td>{{$t('views.projectContent.createdTime')}}</td>
                <td>{{projectData.created_at}}</td>
            </tr>
            <tr>
                <td>{{$t('views.projectContent.projectQuota')}}</td>
                <td>
                    <span class="">CPU：{{projectData.cpu}}&nbsp;核</span>
                    <span class="views-table-margin">{{$t('views.projectContent.memory')}}：{{projectData.memory}}&nbsp;G</span>
                    <span class="views-table-margin">GPU：{{projectData.gpu}}&nbsp;个</span>
                </td>
                <td>{{$t('views.projectContent.alreadyUsed')}}</td>
                <td>
                    <span>CPU：{{projectData.use_cpu}}&nbsp;核</span>
                    <span class="views-table-margin">{{$t('views.projectContent.memory')}}：{{projectData.use_memory}}&nbsp;G</span>
                    <span class="views-table-margin">GPU：{{projectData.use_gpu}} &nbsp;个
                    </span>
                </td>
            </tr>
        </table>
        <div class="views-development">
            <!-- tag页面导航 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- 开发环境 -->
                <el-tab-pane :label="$t('views.development.development')" name="first">
                    <views-develop-content></views-develop-content>
                </el-tab-pane>
                <!-- 训练任务 -->
                <el-tab-pane :label="$t('views.trainingTask.trainingTask')" name="second">
                    <views-training-task></views-training-task>
                </el-tab-pane>
                <!--  模型预测-->
                <el-tab-pane :label="$t('views.modelPrediction.modelPrediction')" name="third">
                    <views-model-prediction></views-model-prediction>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
// 开发环境
import ViewsDevelopContent from './developContent'
// 训练任务
import ViewsTrainingTask from './trainingTask'
// 模型预测
import ViewsModelPrediction from './modelPrediction'

export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  created () {
    // 请求项目详情数据函数调用
    // this.$store.dispatch('getProjectDetails')
    let id = this.$route.query.id
    //  console.log(id)
    let active = localStorage.getItem('activeName')
    this.activeName = active
    // 请求项目详情数据函数调用
    let obj = {
      project_id: id
    }
    this.$store.dispatch('getProjectDetails', obj)
  },
  mounted () { },
  methods: {
    handleSelect (key, keyPath) {
      let activeIndex = key + ''
      window.localStorage.setItem('activeIndex', activeIndex)
    },
    handleClick (tab, event) {
      this.activeName = tab.name
      localStorage.setItem('activeName', this.activeName)
    }
  },
  components: { ViewsDevelopContent, ViewsTrainingTask, ViewsModelPrediction },
  computed: {
    projectData () {
      // console.log(this.$store.getters.postProjectData)
      return this.$store.getters.postProjectData
    }
  }
}
</script>
