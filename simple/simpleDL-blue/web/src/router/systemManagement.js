/*
 * @Author: aFei
 * @Date: 2018-07-10 16:09:44
 */
/*
 * @LastEditors: renlei
 * @LastEditTime: 2019-05-23 14:03:23
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
