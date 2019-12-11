/*
 * @Author: aFei
 * @Date: 2018-07-10 16:22:54
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-07 10:27:12
 */
export default {
  name: 'researchForum',
  path: 'researchForum',
  component: page => require(['@/views/researchForum/index'], page),
  redirect: to => {
    let navInformation = JSON.parse(sessionStorage.getItem('navInformation'))
    navInformation = navInformation.filter(function (item) {
      return item.linkName === to.name
    })[0]
    return navInformation.children[0].path
  },
  meta: {
    title: 'views.nav.researchForum',
    icon: 'icon-luntan1'

  },
  children: [{
    name: 'forumManagement',
    path: 'forumManagement',
    component: page => require(['@/views/researchForum/forumManagement'], page),
    meta: {
      title: 'views.nav.forumManagement',
      changeMark: ['forumSend', 'forumDetails']
    }
  },
  {
    name: 'forumCenter',
    path: 'forumCenter',
    component: page => require(['@/views/researchForum/forumCenter'], page),
    meta: {
      title: 'views.nav.forumCenter',
      changeMark: ['forumSend', 'forumDetails']
    }
  },
  {
    name: 'myForum',
    path: 'myForum',
    component: page => require(['@/views/researchForum/myForum'], page),
    meta: {
      title: 'views.nav.myForum',
      changeMark: ['forumSend', 'forumDetails']
    }
  },
  {
    name: 'forumSend',
    path: 'forumSend',
    component: page => require(['@/views/researchForum/forumSend'], page),
    meta: {
      title: 'views.nav.forumSend',
      show: false,
      markName: 'forumManagement'
    }
  },
  {
    name: 'forumDetails',
    path: 'forumDetails',
    component: page => require(['@/views/researchForum/forumDetails'], page),
    meta: {
      title: 'views.nav.forumDetails',
      show: false,
      markName: 'forumManagement'
    }
  }
  ]
}
