import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active-link",
  linkExactActiveClass: "active-link-exact",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue")
    },
    {
      name: "algorithm",
      path: "/algorithm",
      component: resolve => {
        require(["@/views/algorithm.vue"], resolve);
      }
    },
    {
      name: "canvas",
      path: "/canvas",
      component: resolve => {
        require(["@/views/canvas.vue"], resolve);
      }
    },
    {
      name: "time",
      path: "/time",
      component: resolve => {
        require(["@/views/time.vue"], resolve);
      }
    },
    {
      name: "upload",
      path: "/upload",
      component: resolve => {
        require(["@/views/upload.vue"], resolve);
      }
    },
    {
      name: "component",
      path: "/component",
      component: resolve => {
        require(["@/views/component.vue"], resolve);
      },
      children: [
        {
          name: "a",
          path: "post-page/:id",
          component: resolve => {
            require(["@/views/demoA.vue"], resolve);
          }
        }
      ]
    }
  ]
});
