import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./vuex/store";
import "./components/global";
import "./plugins/element";
import mixin from "./util/mixin";
import "animate.css/animate.min.css";
import axios from "axios";
import VueAxios from "vue-axios";
import service from "./plugins/http";
import "./assets/styles/editor.scss";
Vue.use(VueAxios, service, axios);
Vue.config.productionTip = false;
Vue.config.errorHandler = function(err, vm, info) {
  // console.group(err);
  //console.group(vm);
  //console.group(info);
};
Vue.mixin(mixin);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
