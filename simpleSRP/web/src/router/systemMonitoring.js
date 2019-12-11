/*
 * @Author: aFei
 * @Date: 2018-07-10 16:05:24
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-15 16:44:36
 */
export default {
  name: 'systemMonitoring',
  path: 'systemMonitoring',
  redirect: {
    name: 'systemMonitoringPage'
  },
  component: page => require(['@/views/systemMonitoring/index'], page),
  meta: {
    title: 'views.nav.systemMonitoring',
    icon: 'icon-monitor'
  },
  children: [{
    name: 'systemMonitoringPage',
    path: '/',
    component: page => require(['@/views/systemMonitoring/systemMonitoringPage'], page),
    meta: {
      title: 'views.nav.systemMonitoring',
      markName: 'systemMonitoring',
      show: false,
      replaceIndex: true
    }
  }, {
    name: 'recordList',
    path: 'systemMonitoring/recordList',
    component: page => require(['@/views/systemMonitoring/recordList'], page),
    meta: {
      title: 'views.nav.allowMonitoring',
      show: false,
      markName: 'systemMonitoring'
    }
  }, {
    name: 'personList',
    path: 'systemMonitoring/personList',
    component: page => require(['@/views/systemMonitoring/personList'], page),
    meta: {
      title: 'views.nav.perMonitoring',
      show: false,
      markName: 'systemMonitoring'
    }
  }, {
    name: 'projectList',
    path: 'systemMonitoring/projectList',
    component: page => require(['@/views/systemMonitoring/projectList'], page),
    meta: {
      title: 'views.nav.proMonitoring',
      show: false,
      markName: 'systemMonitoring'
    }
  }]
}
