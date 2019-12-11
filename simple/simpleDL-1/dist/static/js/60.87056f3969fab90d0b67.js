webpackJsonp([60],{

/***/ "vxZN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("Dd8w");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/caseCenter/caseDetail.vue

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
//

/* harmony default export */ var caseDetail = ({
  name: 'caseDetail',
  data: function data() {
    return {
      data: { case_type: '' }
    };
  },
  created: function created() {
    var _this = this;

    this.$get('/casecenter/show', { case_center_id: this.$route.query.caseId }).then(function (res) {
      _this.data = extends_default()({}, res.data);
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-34d92046","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/caseCenter/caseDetail.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"case-detail"},[_c('el-row',[_c('el-col',{attrs:{"span":12}},[_c('div',{staticClass:"content-v"},[_c('span',[_vm._v("案例名称：")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.data.name))])])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('div',{staticClass:"content-v"},[_c('span',[_vm._v("案例文档：")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.data.document_link))])])])],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":12}},[_c('div',{staticClass:"content-v"},[_c('span',[_vm._v("创建时间：")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.data.created_at))])])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('div',{staticClass:"content-v"},[_c('span',[_vm._v("案例分类：")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.data.caseCategory ? _vm.data.caseCategory.name : ''))])])])],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":12}},[_c('div',{staticClass:"content-v"},[_c('span',[_vm._v("数据代码：")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.data.code_data))])])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('div',{staticClass:"content-v"},[_c('span',[_vm._v("关联镜像：")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.data.imageRel ? _vm.data.imageRel.name : ''))])])])],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":12}},[_c('div',{staticClass:"content-v"},[_c('span',[_vm._v("案例描述：")]),_vm._v(" "),_c('pre',[_vm._v(_vm._s(_vm.data.describe))])])]),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('div',{staticClass:"content-v"})])],1),_vm._v(" "),_c('div',{staticClass:"text-center",staticStyle:{"padding-top":"20px"}},[_c('el-button',{staticClass:"view-btn-big"},[_vm._v("案例展示")])],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var caseCenter_caseDetail = (esExports);
// CONCATENATED MODULE: ./src/views/caseCenter/caseDetail.vue
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
  caseDetail,
  caseCenter_caseDetail,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_caseCenter_caseDetail = __webpack_exports__["default"] = (Component.exports);


/***/ })

});