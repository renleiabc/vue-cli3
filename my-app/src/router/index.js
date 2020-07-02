/*
 * @Author: renlei
 * @Date: 2020-06-11 18:10:33
 * @LastEditors: renlei
 * @LastEditTime: 2020-06-24 11:15:11
 * @Description:
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '关于'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
    meta: {
      title: '测试'
    }
  },
  {
    path: '/class',
    component: () =>
      import(/* webpackChunkName: "class" */ '../views/Class.vue'),
    meta: {
      title: '类型',
      keepAlive: true
    },
    children: [
      {
        name: 'Class',
        path: '',
        component: () =>
          import(/* webpackChunkName: "class" */ '../views/ClassChild.vue'),
        meta: {
          title: '类型',
          keepAlive: true
        }
      },
      {
        name: 'ClassChild',
        path: 'classChild/:id',
        component: () =>
          import(/* webpackChunkName: "class" */ '../views/ClassChildId.vue'),
        meta: {
          title: '详情',
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "error" */ '../views/error.vue'),
    name: 'error',
    meta: {
      title: '页面没找到'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
// 根据不同的用户角色，去过滤不同的路由链接

export const handleRouterFilter = (arr, role) => {
  const showList = arr.filter((items) => {
    if (items.limit.includes(role)) {
      if (items.subs) {
        const firstItems = items.subs.filter((item) => {
          if (item.limit.includes(role)) {
            if (item.subs) {
              const secondItem = item.subs.filter((sub) => {
                return sub.limit.includes(role);
              });
              item.subs = secondItem;
              return secondItem;
            }
          }
          return item.limit.includes(role);
        });
        items.subs = firstItems;
        return items;
      }
    }
    return items.limit.includes(role);
  });
  return showList;
};
export default router;
