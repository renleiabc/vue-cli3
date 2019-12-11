/*
 * @Author: aFei
 * @Date: 2018-07-10 16:19:31
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-03 16:16:21
 */
export default {
  name: 'imageManagement',
  path: 'imageManagement',
  component: page => require(['@/views/imageManagement/index'], page),
  redirect: {
    name: 'publicImage'
  },
  meta: {
    title: 'views.nav.imageManagement',
    icon: ''
  },
  children: [{
    name: 'publicImage',
    path: 'publicImage',
    component: page => require(['@/views/imageManagement/publicImage'], page),
    meta: {
      title: '共享镜像',
      changeMark: 'editImage'
    }
  },
  {
    name: 'objectImage',
    path: 'objectImage',
    component: page => require(['@/views/imageManagement/objectImage'], page),
    meta: {
      title: '项目镜像',
      changeMark: 'editImage'
    }
  },
    // {
    //   name: 'personalImage',
    //   path: 'personalImage',
    //   component: page => require(['@/views/imageManagement/personalImage'], page),
    //   meta: {
    //     title: 'views.nav.personalImage',
    //     changeMark: 'editImage'
    //   }
    // },
  {
    name: 'editImage',
    path: 'editImage',
    component: page => require(['@/views/imageManagement/newImage'], page),
    meta: {
      title: 'views.nav.editImage',
      markName: 'publicImage',
      show: false
    }
  }
  ]
}
