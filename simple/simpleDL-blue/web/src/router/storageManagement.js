/*
 * @Author: aFei
 * @Date: 2018-07-10 16:16:50
 */
/*
 * @LastEditors: renlei
 * @LastEditTime: 2019-05-20 16:22:23
 */
export default {
  name: 'storageManagement',
  path: 'storageManagement',
  component: page => require(['@/views/storageManagement/index'], page),
  redirect: { name: 'announcement' },
  meta: {
    title: 'views.nav.storageManagement',
    icon: 'icon-cunchuchi'
  },
  children: [{
    name: 'announcement',
    path: 'announcement',
    component: page =>
      require(['@/views/storageManagement/announcement'], page),
    meta: {
      title: 'views.nav.announcement',
      markName: 'storageManagement',
      show: false,
      replaceIndex: true
    }
  },
  {
    name: 'cluster',
    path: 'cluster',
    component: page => require(['@/views/storageManagement/cluster'], page),
    meta: {
      title: 'views.nav.cluster',
      show: false
    }
  },
  {
    name: 'pubStorageDetail',
    path: 'pubStorageDetail',
    props: true,
    component: page =>
      require(['@/views/storageManagement/storageDetail'], page),
    meta: {
      title: 'views.nav.storageDetail',
      show: false,
      markName: 'storageManagement'
    }
  },
  {
    name: 'perStorageDetail',
    path: 'perStorageDetail',
    props: true,
    component: page =>
      require(['@/views/storageManagement/storageDetail'], page),
    meta: {
      title: 'views.nav.storageDetail',
      show: false,
      markName: 'storageManagement'
    }
  },
  {
    name: 'proStorageDetail',
    path: 'proStorageDetail',
    props: true,
    component: page =>
      require(['@/views/storageManagement/storageDetail'], page),
    meta: {
      title: 'views.nav.storageDetail',
      show: false,
      markName: 'storageManagement'
    }
  },
  {
    name: 'fileManagement',
    path: 'fileManagement',
    props: true,
    component: page =>
      require(['@/views/storageManagement/fileManagement'], page),
    meta: {
      title: 'views.nav.fileManagement',
      markName: 'storageManagement',
      show: false
    }
  },
  {
    name: 'projectManagement',
    path: 'projectManagement',
    props: true,
    component: page =>
      require(['@/views/storageManagement/projectManagement'], page),
    meta: {
      title: 'views.nav.projectManagement'
    }
  },
  {
    name: 'personalManagement',
    path: 'personalManagement',
    props: true,
    component: page => require(['@/views/storageManagement/personalManagement'], page),
    meta: {
      title: 'views.nav.personalManagement',
      markName: 'storageManagement',
      show: false
    }
  }
  ]
}
