webpackJsonp([36],{

/***/ "B6Sh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/index.vue
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var projectSpace = ({
  name: 'index',
  methods: {
    showNavigate: function showNavigate(name) {
      // 需要显示按钮页面的路由name
      var arr = ['developDetails', 'traningDetails', 'modelDetails', 'creatDevelop', 'createTraningTask', 'createModelJob', 'partCreatDevelop', 'partDevelopDetails', 'partCreateTraningTask', 'partModelDetails', 'partTraningDetails', 'partCreateModelJob', 'projectSetting'];
      if (arr.join(',').indexOf(name) !== -1) {
        this.$emit('showNavigate', true);
      } else {
        this.$emit('showNavigate', false);
      }
    }
  },
  created: function created() {
    this.showNavigate(this.$route.name);
  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    this.showNavigate(to.name);
    next();
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-aa10cabc","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"fade-transform","mode":"out-in"}},[_c('router-view')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var views_projectSpace = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/index.vue
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  projectSpace,
  views_projectSpace,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_views_projectSpace = __webpack_exports__["default"] = (Component.exports);


/***/ })

});