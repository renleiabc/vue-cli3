/*
 * @Author: aFei
 * @Date: 2018-08-22 15:09:48
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-23 11:43:03
 */
export default {
  name: 'setting',
  path: 'setting',
  component: page => require(['@/views/setting/index'], page),
  meta: {
    title: 'views.nav.personalSettings',
    show: false
  },
  children: [
    {
      name: 'personalSettings',
      path: '/',
      component: page => require(['@/views/setting/personalSettings'], page),
      meta: {
        markName: 'setting',
        show: false,
        replaceIndex: true
      }
    },
    {
      name: 'changePassword',
      path: '/',
      component: page => require(['@/views/setting/changePassword'], page),
      meta: {
        markName: 'setting',
        show: false,
        replaceIndex: true
      }
    }
  ]
}
