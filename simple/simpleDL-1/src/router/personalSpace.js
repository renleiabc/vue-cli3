/*
 * @Author: aFei
 * @Date: 2018-07-10 16:31:27
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-15 17:25:49
 */
export default {
  name: 'personalSpace',
  path: 'personalSpace',
  component: page => require(['@/views/personalSpace/index'], page),
  redirect: { name: 'personalDevelop' },
  meta: {
    title: 'views.nav.personalSpace',
    icon: 'icon-ren'
  },
  // 个人空间-开发环境
  children: [{
    // 个人空间-开发环境内容
    name: 'personalDevelop',
    path: 'personalDevelop',
    component: page => require(['@/views/personalSpace/development'], page),
    meta: {
      title: 'views.nav.development'
    }
  },
  {
    // 个人空间创-创建开发环境
    name: 'perCreateDevelop',
    path: 'personalDevelop/perCreateDevelop',
    component: page => require(['@/views/personalSpace/createDevelop'], page),
    meta: {
      title: 'views.nav.createDevelop',
      markName: 'personalDevelop',
      show: false
    }
  },
  {
    // 个人空间-开发环境详情
    name: 'perDevelopDetails',
    path: 'personalDevelop/perDevelopDetails/:perDevelopId',
    component: page => require(['@/views/personalSpace/developDetails'], page),
    meta: {
      title: 'views.nav.detailsEnvironment',
      icon: '',
      markName: 'personalDevelop',
      show: false
    }
  },
  {
    // 个人空间-训练任务
    name: 'personalTraining',
    path: 'personalTraining',
    component: page => require(['@/views/personalSpace/trainingTask'], page),
    meta: {
      title: 'views.nav.trainingTask'
    }
  },
  {
    // 个人空间创-创建训练任务
    name: 'perCreateTask',
    path: 'personalTraining/perCreateTask',
    component: page => require(['@/views/personalSpace/createTraningTask'], page),
    meta: {
      title: 'views.nav.createTask',
      markName: 'personalTraining',
      show: false
    }
  },
  {
    // 个人空间创-训练任务详情
    name: 'perTraningDetails',
    path: 'personalTraining/perTraningDetails/:perTaskId',
    component: page => require(['@/views/personalSpace/traningDetails'], page),
    meta: {
      title: 'views.nav.trainingDetails',
      markName: 'personalTraining',
      show: false
    }
  },
  {
    // 个人空间-模型预测
    name: 'personalModel',
    path: 'personalModel',
    component: page => require(['@/views/personalSpace/modelPrediction'], page),
    meta: {
      title: 'views.nav.modelPrediction'
    }
  },
  {
    // 个人空间-创建模型预测
    name: 'perCreateModel',
    path: 'personalModel/perCreateModel',
    component: page => require(['@/views/personalSpace/createModel'], page),
    meta: {
      title: 'views.nav.creatingModel',
      markName: 'personalModel',
      show: false
    }
  },
  {
    // 个人空间-模型预测详情
    name: 'perModelDetails',
    path: 'personalModel/perModelDetails/:perModelId',
    component: page => require(['@/views/personalSpace/modelDetails'], page),
    meta: {
      title: 'views.nav.predictionDetails',
      markName: 'personalModel',
      show: false
    }
  }
  ]
}
