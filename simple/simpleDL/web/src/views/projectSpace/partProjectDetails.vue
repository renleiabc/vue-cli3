/*
 * @Author:任雷雷
 * @Date: 2018-07-16 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-23 10:31:59
 * @Description:我参与的项目-项目详情
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
                    <span class="views-table-margin">GPU：{{projectData.gpu}}&nbsp;{{$t('views.projectContent.unit')}}</span>
                </td>
                <td>{{$t('views.projectContent.alreadyUsed')}}</td>
                <td>
                    <span>CPU：{{projectData.use_cpu}} &nbsp;核</span>
                    <span class="views-table-margin">{{$t('views.projectContent.memory')}}：{{projectData.use_memory}}&nbsp;G</span>
                    <span class="views-table-margin">GPU：{{projectData.use_gpu}}&nbsp;{{$t('views.projectContent.unit')}}
                    </span>
                </td>
            </tr>
        </table>
        <div class="views-development">
            <!-- 我参与的项目 tag页面导航 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- 我参与的项目 开发环境 -->
                <el-tab-pane :label="$t('views.development.development')" name="first">
                    <views-part-develop-content></views-part-develop-content>
                </el-tab-pane>
                <!-- 我参与的项目 训练任务 -->
                <el-tab-pane :label="$t('views.trainingTask.trainingTask')" name="second">
                    <views-part-training-task></views-part-training-task>
                </el-tab-pane>
                <!--  我参与的项目 模型预测-->
                <el-tab-pane :label="$t('views.modelPrediction.modelPrediction')" name="third">
                    <views-part-model-prediction></views-part-model-prediction>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import ViewsPartDevelopContent from './partDevelopContent'
import ViewsPartTrainingTask from './partTrainingTask'
import ViewsPartModelPrediction from './partModelPrediction'
export default {
  data () {
    return {
      activeName: 'first',
      obj: {
        project_id: ''
      }
    }
  },
  created () {
    let active = localStorage.getItem('activeName')
    this.activeName = active
    // 请求项目详情数据函数调用
    let id = this.$route.query.partId
    this.obj.project_id = id
    // 请求项目详情数据函数调用
    this.$store.dispatch('getProjectDetails', this.obj)
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
  components: { ViewsPartDevelopContent, ViewsPartTrainingTask, ViewsPartModelPrediction },
  computed: {
    projectData () {
      // console.log(this.$store.getters.postProjectData)
      return this.$store.getters.postProjectData
    }
  }
}
</script>
