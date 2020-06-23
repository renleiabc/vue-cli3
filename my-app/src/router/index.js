/*
 * @Author: renlei
 * @Date: 2020-06-11 18:10:33
 * @LastEditors: renlei
 * @LastEditTime: 2020-06-23 17:44:12
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
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Test.vue'),
    meta: {
      title: '测试'
    }
  },
  {
    path: '/class',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Class.vue'),
    meta: {
      title: '类型',
      keepAlive: true
    },
    children: [
      {
        name: 'Class',
        path: '',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/ClassChild.vue'),
        meta: {
          title: '类型',
          keepAlive: true
        }
      },
      {
        name: 'ClassChild',
        path: 'classChild/:id',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/ClassChildId.vue'),
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

export default router;
