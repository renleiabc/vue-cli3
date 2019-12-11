<!--
 * @Author: renlei
 * @Date: 2019-08-14 10:46:32
 * @LastEditors: renlei
 * @LastEditTime: 2019-08-23 14:17:21
 * @Description:我参与的项目-开发环境视图
 -->
<template>
    <div>
        <table class="views-project-details">
            <tr>
                <td>{{$t('views.projectContent.projectName')}}</td>
                <td colspan="3">{{projectData.project_name}}</td>
            </tr>
            <tr>
                <td>{{$t('views.projectContent.projectStorage')}}</td>
                <td>{{projectData.storage_id}}</td>
                <td>{{$t('views.projectContent.projectStorageKey')}}</td>
                <td>{{projectData.storage_key}}</td>
            </tr>
            <tr>
                <td>{{$t('views.projectContent.projectQuota')}}</td>
                <td>
                    <span class="">CPU：{{projectData.project_cpu}}{{$t('views.projectContent.unit')}}</span>
                    <span class="views-table-margin">{{$t('views.projectContent.memory')}}：{{projectData.project_memory}}(G)</span>
                    <span class="views-table-margin">GPU：{{projectData.project_gpu}}{{$t('views.projectContent.unit')}}</span>
                </td>
                <td>{{$t('views.projectContent.alreadyUsed')}}</td>
                <td>
                    <span>CPU：{{projectData.use_cpu}} {{$t('views.projectContent.unit')}}</span>
                    <span class="views-table-margin">{{$t('views.projectContent.memory')}}：{{projectData.use_memory}}(G)</span>
                    <span class="views-table-margin">GPU：{{projectData.use_gpu}} {{$t('views.projectContent.unit')}}
                    </span>
                </td>
            </tr>
        </table>
        <div class="views-development">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">
                    <router-link :to="{name:'partDevelopContent'}" tag="a">
                        {{$t('views.development.development')}}
                    </router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link :to="{name:'partTrainingTask'}" tag="a">
                        {{$t('views.trainingTask.trainingTask')}}
                    </router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link :to="{name:'partModelPrediction'}" tag="a">
                        {{$t('views.modelPrediction.modelPrediction')}}
                    </router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <transition name="fade-transform" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
      projectData: '',
      activeIndex: '1',
      activeIndex2: '1',
      developLink: [
        { name: 'development', value: '开发环境', isActive: true },
        { name: 'trainingTask', value: '训练任务', isActive: false },
        { name: 'modelPrediction', value: '模型预测', isActive: false }
      ]
    }
  },
  created () {
    // 请求项目详情数据函数调用
    // this.$store.dispatch('getProjectDetails')
    let active = window.localStorage.getItem('activeIndex')
    this.activeIndex = active
    this.getProjectDetails()
  },
  mounted () { },
  methods: {
    // 请求项目详情数据函数
    getProjectDetails () {
      this.$get('/project-space/project-details').then(res => {
        this.projectData = res.data
      })
    },
    handleSelect (key, keyPath) {
      let activeIndex = key + ''
      window.localStorage.setItem('activeIndex', activeIndex)
    }
  },
  components: {},
  computed: {}
}
</script>
