/*
 * @Author: Liang Liang
 * @Date: 2018-07-06 17:13:20
 * @LastEditors: 少侠
 * @LastEditTime: 2018-10-18 10:19:55
 * @Description:
 */
/*
 * @LastEditors: renlei
 * @LastEditTime: 2019-05-20 17:37:15
 */
import Vue from 'vue'
import Router from 'vue-router'
import main from '@/views/main/main'
import login from '@/views/login/index'
import error from '@/views/error/index'
import systemMonitoring from './systemMonitoring'
import systemManagement from './systemManagement'
import userManagement from './userManagement'
import clusterMonitoring from './clusterMonitoring'
import home from './home'
import projectSpace from './projectSpace'
import personalSpace from './personalSpace'
import storageManagement from './storageManagement'
import imageManagement from './imageManagement'
import caseCenter from './caseCenter'
import keyManagement from './keyManagement'
import researchForum from './researchForum'
import help from './help'
import setting from './setting'
import about from './about'

Vue.use(Router)
export default new Router({
  linkActiveClass: 'active-link',
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'login',
    beforeEnter (to, from, next) {
      sessionStorage.clear()
      next()
    },
    component: login
  },
  {
    path: '/',
    name: 'main',
    component: main,
    redirect: to => {
      if (JSON.parse(sessionStorage.getItem('isLogin')) === true) {
        const navInformation = JSON.parse(sessionStorage.getItem('navInformation'))
        console.log(navInformation[0].children.length > 0 ? navInformation[0].children[0].path : navInformation[0].path)
        return navInformation[0].children.length > 0 ? navInformation[0].children[0].path : navInformation[0].path
      } else {
        return '/login'
      }
    },
    children: [
      systemMonitoring,
      systemManagement,
      clusterMonitoring,
      userManagement,
      home,
      projectSpace,
      personalSpace,
      storageManagement,
      imageManagement,
      caseCenter,
      keyManagement,
      researchForum,
      help,
      about,
      setting
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: error
  },
  {
    path: '*',
    redirect: '/'
  }
  ]
})
