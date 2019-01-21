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
      component: () => {
        import(/* webpackChunkName: "algorithm" */ "@/views/algorithm.vue");
      }
    },
    {
      name: "canvas",
      path: "/canvas",
      component: () => {
        import(/* webpackChunkName: "canvas" */ "@/views/canvas.vue");
      }
    },
    {
      name: "time",
      path: "/time",
      component: () => {
        import(/* webpackChunkName: "time" */ "@/views/time.vue");
      }
    },
    {
      name: "component",
      path: "/component",
      component: () => {
        import(/* webpackChunkName: "component" */ "@/views/component.vue");
      },
      children: [
        {
          name: "a",
          path: "post-page/:id",
          component: () => {
            import(/* webpackChunkName: "demoA" */ "@/views/demoA.vue");
          }
        }
      ]
    }
  ]
});
