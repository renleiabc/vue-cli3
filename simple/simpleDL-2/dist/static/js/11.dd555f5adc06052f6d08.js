webpackJsonp([11],{

/***/ "FYWr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("Dd8w");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/userManagement/userDetails.vue

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
//
//
//
//
//
//
//
//
//

/* harmony default export */ var userDetails = ({
  name: 'userDetails',
  data: function data() {
    return {
      msg: {}
    };
  },
  created: function created() {
    var _this = this;

    this.$post('/user/getuserinfo', { id: this.$route.query.userId }).then(function (data) {
      _this.msg = extends_default()({}, data.data);
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-57828a20","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/userManagement/userDetails.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-user-management-user-details"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"row-first"},[_c('span',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.userManagement.username"))+"：")]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.msg.username))])]),_vm._v(" "),_c('div',{staticClass:"row-last"},[_c('span',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.userManagement.name"))+"：")]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.msg.name))])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"row-first"},[_c('span',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.userManagement.status"))+"：")]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.msg.status===1?'开启':'关闭'))])]),_vm._v(" "),_c('div',{staticClass:"row-last"},[_c('span',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.userManagement.gender"))+"：")]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.msg.gender===1?'男':'女'))])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"row-first"},[_c('span',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.userManagement.department"))+"：")]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.msg.department))])]),_vm._v(" "),_c('div',{staticClass:"row-last"},[_c('span',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.userManagement.grade"))+"：")]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.msg.grade))])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"row-first"},[_c('span',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.userManagement.class"))+"：")]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.msg.classes))])]),_vm._v(" "),_c('div',{staticClass:"row-last"},[_c('span',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.userManagement.phone"))+"：")]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.msg.tel))])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"row-first"},[_c('span',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.userManagement.email"))+"：")]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.msg.email))])]),_vm._v(" "),_c('div',{staticClass:"row-last"},[_c('span',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.userManagement.weChatNumber"))+"：")]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.msg.wexin))])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"row-first else"},[_c('span',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.userManagement.personalProfile"))+"：")]),_vm._v(" "),_c('div',{staticClass:"content"},[_vm._v(_vm._s(_vm.msg.introduce))])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var userManagement_userDetails = (esExports);
// CONCATENATED MODULE: ./src/views/userManagement/userDetails.vue
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
  userDetails,
  userManagement_userDetails,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_userManagement_userDetails = __webpack_exports__["default"] = (Component.exports);


/***/ })

});