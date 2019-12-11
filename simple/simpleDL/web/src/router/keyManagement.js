/*
 * @Author: aFei
 * @Date: 2018-07-10 16:23:50
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-13 10:49:14
 */
export default {
  name: 'keyManagement',
  path: 'keyManagement',
  redirect: {
    name: 'keyManagementHome'
  },
  component: page => require(['@/views/keyManagement/index'], page),
  meta: {
    title: 'views.nav.keyManagement',
    icon: 'icon-yuechi'
  },
  children: [{
    name: 'keyManagementHome',
    path: '/',
    component: page => require(['@/views/keyManagement/keyManagement'], page),
    meta: {
      markName: 'keyManagement',
      show: false,
      replaceIndex: true
    }
  }]
}
