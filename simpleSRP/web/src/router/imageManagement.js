/*
 * @Author: aFei
 * @Date: 2018-07-10 16:19:31
 */
/*
 * @LastEditors: renlei
 * @LastEditTime: 2019-09-01 15:42:47
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
    icon: 'icon-xuniji'
  },
  children: [
    {
      name: 'publicImage',
      path: 'publicImage',
      component: page => require(['@/views/imageManagement/publicImage'], page),
      meta: {
        title: 'views.nav.publicImage',
        changeMark: 'pubEditImage'
      }
    },
    {
      name: 'objectImage',
      path: 'objectImage',
      component: page => require(['@/views/imageManagement/objectImage'], page),
      meta: {
        title: 'views.nav.objectImage',
        changeMark: 'proEditImage'
      }
    },
    {
      name: 'personalImage',
      path: 'personalImage',
      component: page =>
        require(['@/views/imageManagement/personalImage'], page),
      meta: {
        title: 'views.nav.personalImage',
        changeMark: 'perEditImage'
      }
    },
    {
      name: 'layoutImage',
      path: 'layoutImage',
      component: page => require(['@/views/imageManagement/layoutImage'], page),
      meta: {
        title: 'views.nav.layoutImage',
        changeMark: 'perEditImage'
      }
    },
    {
      name: 'imageSort',
      path: 'imageSort',
      component: page => require(['@/views/imageManagement/imageSort'], page),
      meta: {
        title: 'views.nav.imageSort'
      }
    },
    {
      name: 'pubEditImage',
      path: 'pubEditImage',
      component: page => require(['@/views/imageManagement/newImage'], page),
      meta: {
        title: 'views.nav.editImage',
        markName: 'publicImage',
        show: false
      }
    },
    {
      name: 'proEditImage',
      path: 'proEditImage',
      component: page => require(['@/views/imageManagement/newImage'], page),
      meta: {
        title: 'views.nav.editImage',
        markName: 'objectImage',
        show: false
      }
    },
    {
      name: 'perEditImage',
      path: 'perEditImage',
      component: page => require(['@/views/imageManagement/newImage'], page),
      meta: {
        title: 'views.nav.editImage',
        markName: 'personalImage',
        show: false
      }
    }
  ]
}
