/*
 * @Author: 少侠
 * @Date: 2018-10-18 10:17:42
 * @LastEditors: 少侠
 * @LastEditTime: 2018-10-18 10:32:17
 * @Description: 关于
 */

export default {
  name: 'about',
  path: 'about',
  component: page => require(['@/views/about/index'], page),
  redirect: {
    name: 'aboutPage'
  },
  meta: {
    title: 'views.nav.about',
    show: false
  },
  children: [{
    name: 'aboutPage',
    path: '/',
    component: page => require(['@/views/about/aboutPage'], page),
    meta: {
      markName: 'about',
      show: false,
      replaceIndex: true
    }
  }]
}
