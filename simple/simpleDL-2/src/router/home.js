/*
 * @Author: aFei
 * @Date: 2018-07-10 16:25:58
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-15 17:14:47
 */
export default {
  name: 'home',
  path: 'home',
  redirect: {
    name: 'projectHome'
  },
  component: page => require(['@/views/home/index'], page),
  meta: {
    title: 'views.nav.home',
    icon: ''
  },
  children: [{
    name: 'projectHome',
    path: '/',
    component: page => require(['@/views/home/projectHome'], page),
    meta: {
      show: false,
      replaceIndex: true,
      markName: 'home'
    }
  }]
}
