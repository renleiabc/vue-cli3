/*
 * @Author: aFei
 * @Date: 2018-07-10 16:14:05
 */
/*
 * @LastEditors: aFei
 * @LastEditTime: 2018-08-07 10:26:23
 */
export default {
  name: 'clusterMonitoring',
  path: 'clusterMonitoring',
  component: page => require(['@/views/clusterMonitoring/index'], page),
  redirect: {name: 'nodeControl'},
  meta: {
    title: 'views.nav.clusterMonitoring',
    icon: 'icon-colonyIO'
  },
  children: [
    {
      name: 'nodeControl',
      path: 'nodeControl',
      component: page => require(['@/views/clusterMonitoring/nodeControl'], page),
      meta: {
        title: 'views.nav.nodeControl'
      }
    },
    {
      name: 'nodeControlDetail',
      path: 'nodeControl/nodeControlDetail',
      component: page => require(['@/views/clusterMonitoring/nodeControlDetail'], page),
      meta: {
        title: 'views.nav.nodeControlDetail',
        show: false,
        markName: 'nodeControl'
      }
    },
    {
      name: 'gpuDetail',
      path: 'nodeControl/nodeControlDetail/gpuDetail',
      component: page => require(['@/views/clusterMonitoring/gpuDetail'], page),
      meta: {
        title: 'views.nav.gpuDetail',
        parents: ['nodeControlDetail'],
        show: false,
        markName: 'nodeControl'
      }
    },
    {
      name: 'namespaces',
      path: 'namespaces',
      component: page => require(['@/views/clusterMonitoring/namespaces'], page),
      meta: {
        title: 'views.nav.namespaces'
      }
    },
    {
      name: 'namespacesDetail',
      path: 'namespaces/namespacesDetail',
      component: page => require(['@/views/clusterMonitoring/namespacesDetail'], page),
      meta: {
        title: 'views.nav.namespacesDetail',
        show: false,
        markName: 'namespaces'
      }
    }
  ]
}
