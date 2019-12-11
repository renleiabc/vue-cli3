/*
 * @Author: aFei
 * @Date: 2018-07-10 16:20:35
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-15 17:00:11
 */
export default {
  name: 'caseCenter',
  path: 'caseCenter',
  redirect: {
    name: 'caseCenterList'
  },
  component: page => require(['@/views/caseCenter/index'], page),
  meta: {
    title: 'views.nav.caseCenter',
    icon: 'icon-anli'
  },
  children: [{
    name: 'caseCenterList',
    path: '/',
    component: page => require(['@/views/caseCenter/caseCenter'], page),
    meta: {
      title: 'views.nav.caseCenter',
      markName: 'caseCenter',
      show: false,
      replaceIndex: true
    }
  },
  {
    name: 'caseDetail',
    path: 'caseDetail',
    component: page => require(['@/views/caseCenter/caseDetail'], page),
    meta: {
      title: 'views.nav.caseDetail',
      markName: 'caseCenter',
      show: false
    }
  },
  {
    name: 'createCase',
    path: 'editCase',
    component: page => require(['@/views/caseCenter/createCase'], page),
    meta: {
      title: 'views.nav.createCase',
      markName: 'caseCenter',
      show: false
    }
  }
  ]
}
