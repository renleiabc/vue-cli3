/*
 * @Author: xiYou
 * @Date: 2018-08-07 16:17:19
 * @Last Modified by: xiYou
 * @Last Modified time: 2018-08-08 11:58:02
 */

export default {
  name: 'help',
  path: 'help',
  component: page => require(['@/views/help/index'], page),
  // 重定向到第一个子路由，即开发环境当中
  redirect: { name: 'downloadData' },
  meta: {
    title: 'views.nav.help',
    icon: 'icon-Group'
  },
  children: [
    {
      name: 'downloadData',
      path: 'downloadData',
      component: page => require(['@/views/help/downloadData'], page),
      meta: {
        title: 'views.nav.downloadData'
      }
    }
  ]
}
