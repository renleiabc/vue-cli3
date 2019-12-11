/*
 * @Author: aFei
 * @Date: 2018-07-10 16:11:44
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-07 10:25:37
 */
export default {
  name: 'userManagement',
  path: 'userManagement',
  redirect: {name: 'userManagementHome'},
  component: page => require(['@/views/userManagement/index'], page),
  meta: {
    title: 'views.nav.userManagement',
    icon: 'icon-ren'
  },
  children: [
    {
      name: 'userManagementHome',
      path: '',
      component: page => require(['@/views/userManagement/userManagementHome'], page),
      meta: {
        title: 'views.nav.userManagement',
        markName: 'userManagement',
        show: false,
        replaceIndex: true
      }
    },
    {
      name: 'userDetails',
      path: 'userDetails',
      component: page => require(['@/views/userManagement/userDetails'], page),
      meta: {
        title: 'views.nav.userDetails',
        markName: 'userManagement',
        show: false
      }
    },
    {
      name: 'addUser',
      path: 'editUser',
      component: page => require(['@/views/userManagement/addUser'], page),
      meta: {
        title: 'views.nav.addUser',
        markName: 'userManagement',
        show: false
      }
    }
  ]
}
