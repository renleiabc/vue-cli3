/*
 * @Author: aFei
 * @Date: 2018-07-10 16:27:07
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-16 14:27:37
 */
// import my from '@/views/projectSpace/projectContent'
export default {
  name: 'projectSpace', // ..项目空间
  path: 'projectSpace',
  component: page => require(['@/views/projectSpace/index'], page),
  redirect: {
    name: 'spaceContent'
  },
  meta: {
    title: '项目管理',
    icon: ''
  },
  children: [{
    // 我的项目
    name: 'spaceContent',
    path: 'spaceContent',
    component: page => require(['@/views/projectSpace/projectContent'], page),
    meta: {
      title: 'views.nav.myProject',
      icon: ''
    }
  },
  {
    // 我的项目-项目设置
    name: 'projectSetting',
    path: 'projectSetting',
    component: page => require(['@/views/projectSpace/projectSetting'], page),
    meta: {
      title: 'views.nav.projectSetting',
      icon: '',
      show: false,
      markName: 'spaceContent'
    }
  },
  { // 项目详情
    name: 'projectDetails',
    path: 'projectDetails',
    component: page => require(['@/views/projectSpace/projectDetails'], page),
    meta: {
      title: 'views.nav.projectDetails',
      icon: '',
      show: false,
      markName: 'spaceContent'
    }
  }, {
    // 开发环境详情
    name: 'developDetails',
    path: 'projectDetails/developDetails',
    component: page => require(['@/views/projectSpace/developDetails'], page),
    meta: {
      title: 'views.nav.detailsEnvironment',
      icon: '',
      show: false,
      markName: 'spaceContent',
      parents: ['projectDetails']
    }
  }, {
    // 训练任务详情
    name: 'traningDetails',
    path: 'projectDetails/traningDetails',
    component: page => require(['@/views/projectSpace/traningDetails'], page),
    meta: {
      title: 'views.nav.trainingDetails',
      icon: '',
      show: false,
      markName: 'spaceContent',
      parents: ['projectDetails']
    }
  }, {
    // 模型预测详情
    name: 'modelDetails',
    path: 'projectDetails/modelDetails',
    component: page => require(['@/views/projectSpace/modelDetails'], page),
    meta: {
      title: 'views.nav.predictionDetails',
      icon: '',
      show: false,
      markName: 'spaceContent',
      parents: ['projectDetails']
    }
  },
    // 创建开发环境
  {
    name: 'creatDevelop',
    path: 'creatDevelop',
    component: page => require(['@/views/projectSpace/creatDevelop'], page),
    meta: {
      title: 'views.nav.createDevelop',
      icon: '',
      show: false,
      markName: 'spaceContent',
      parents: ['projectDetails']
    }
  },
  {
    // 创建训练任务
    name: 'createTraningTask',
    path: 'createTraningTask',
    component: page => require(['@/views/projectSpace/createTraningTask'], page),
    meta: {
      title: 'views.nav.createTask',
      icon: '',
      show: false,
      markName: 'spaceContent',
      parents: ['projectDetails']
    }
  },
  {
    // 创建模型预测作业
    name: 'createModelJob',
    path: 'createModelJob',
    component: page => require(['@/views/projectSpace/createModelJob'], page),
    meta: {
      title: 'views.nav.creatingModel',
      icon: '',
      show: false,
      markName: 'spaceContent',
      parents: ['projectDetails']
    }
  },
    // {
    //   // 我参与的项目
    //   name: 'partSpaceContent',
    //   path: 'partSpaceContent',
    //   component: page => require(['@/views/projectSpace/partProjectContent'], page),
    //   meta: {
    //     title: 'views.nav.partProjects',
    //     icon: ''
    //   }
    // },
  { // 我参与开发 项目详情
    name: 'partProjectDetails',
    path: 'partProjectDetails',
    component: page => require(['@/views/projectSpace/partProjectDetails'], page),
    meta: {
      title: 'views.nav.projectDetails',
      icon: '',
      show: false,
      markName: 'partSpaceContent'
    }
  },
  {
    // 我参与开发  开发环境详情
    name: 'partDevelopDetails',
    path: 'partProjectDetails/partDevelopDetails',
    component: page => require(['@/views/projectSpace/partDevelopDetails'], page),
    meta: {
      title: 'views.nav.detailsEnvironment',
      icon: '',
      show: false,
      markName: 'partSpaceContent',
      parents: ['partProjectDetails']
    }
  }, {
    // 我参与开发  训练任务详情
    name: 'partTraningDetails',
    path: 'partProjectDetails/partTraningDetails',
    component: page => require(['@/views/projectSpace/partTraningDetails'], page),
    meta: {
      title: 'views.nav.trainingDetails',
      icon: '',
      show: false,
      markName: 'partSpaceContent',
      parents: ['partProjectDetails']
    }
  }, {
    // 我参与开发  模型预测详情
    name: 'partModelDetails',
    path: 'partProjectDetails/partModelDetails',
    component: page => require(['@/views/projectSpace/partModelDetails'], page),
    meta: {
      title: 'views.nav.predictionDetails',
      icon: '',
      show: false,
      markName: 'partSpaceContent',
      parents: ['partProjectDetails']
    }
  },
  {
    // 我参与开发 创建开发环境
    name: 'partCreatDevelop',
    path: 'partCreatDevelop',
    component: page => require(['@/views/projectSpace/partCreatDevelop'], page),
    meta: {
      title: 'views.nav.createDevelop',
      icon: '',
      show: false,
      markName: 'partSpaceContent',
      parents: ['partProjectDetails']
    }
  },
  {
    // 我参与开发  创建训练任务
    name: 'partCreateTraningTask',
    path: 'partCreateTraningTask',
    component: page => require(['@/views/projectSpace/partCreateTraningTask'], page),
    meta: {
      title: 'views.nav.createTask',
      icon: '',
      show: false,
      markName: 'partSpaceContent',
      parents: ['partProjectDetails']
    }
  },
  {
    // 我参与开发  创建模型预测作业
    name: 'partCreateModelJob',
    path: 'partCreateModelJob',
    component: page => require(['@/views/projectSpace/partCreateModelJob'], page),
    meta: {
      title: 'views.nav.creatingModel',
      icon: '',
      show: false,
      markName: 'partSpaceContent',
      parents: ['partProjectDetails']
    }
  }
  ]
}
