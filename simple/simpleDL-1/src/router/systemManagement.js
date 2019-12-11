/*
 * @Author: aFei
 * @Date: 2018-07-10 16:09:44
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-09 16:29:19
 */
export default {
  name: 'systemManagement',
  path: 'systemManagement',
  component: page => require(['@/views/systemManagement/index'], page),
  redirect: {name: 'systemAlarm'},
  meta: {
    title: 'views.nav.systemManagement',
    icon: 'icon-xitong'
  },
  children: [
    {
      name: 'systemAlarm',
      path: 'systemAlarm',
      component: page => require(['@/views/systemManagement/systemAlarm'], page),
      meta: {
        title: 'views.nav.systemAlarm'
      }
    },
    {
      name: 'systemLog',
      path: 'systemLog',
      component: page => require(['@/views/systemManagement/systemLog'], page),
      meta: {
        title: 'views.nav.systemLog'
      }
    },
    {
      name: 'systemSetting',
      path: 'systemSetting',
      component: page => require(['@/views/systemManagement/systemSetting'], page),
      meta: {
        title: 'views.nav.systemSetting'
      }
    }
  ]
}
