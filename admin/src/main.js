import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./vuex/store";
import "./components/global";
import "./plugins/element";
import mixin from "./util/mixin";
import "animate.css/animate.min.css";
Vue.config.productionTip = false;
// 自定义指令
Vue.directive("focus", {
  inserted: function(el) {
    el.style.border = "1px solid red";
    el.focus();
  }
});
Vue.mixin(mixin);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
