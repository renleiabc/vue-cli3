webpackJsonp([54],{

/***/ "V203":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/clusterMonitoring/namespacesDetail.vue

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

/* harmony default export */ var namespacesDetail = ({
  name: 'namespacesDetail',
  data: function data() {
    return {
      tableData1: { // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        loading: true
      },
      tableData2: { // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        loading: true
      },
      tableData3: { // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        loading: true
      },
      tableData4: { // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        loading: true
      },
      tableData5: { // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        loading: true
      },
      duplicate: {
        option: {},
        loading: true,
        data: ''
      },
      deployment: {
        option: {},
        loading: true,
        data: ''
      },
      task: {
        option: {},
        loading: true,
        data: ''
      },
      services: {
        option: {},
        loading: true,
        data: ''
      },
      docker_list: {
        option: {},
        loading: true,
        data: ''
      },
      cname: 'charts'
    };
  },
  created: function created() {
    var _this = this;

    this.$axios.post('//rap2api.taobao.org/app/mock/21549/space-detail', { spaces_id: this.$route.query.spacesId }).then(function (data) {
      _this.duplicate.data = data.data.data.work_states.duplicate;
      _this.duplicate.loading = false;
      _this.duplicate.option = {
        legend: {
          show: false
        },
        tooltip: {
          show: false
        },
        color: ['#f7a923', '#f2e0c2'],
        series: [{
          type: 'pie',
          radius: ['70%', '90%'],
          label: {
            show: false
          },
          data: [_this.duplicate.data, 100 - _this.duplicate.data]
        }]
      };
      _this.deployment.data = data.data.data.work_states.deployment;
      _this.deployment.loading = false;
      _this.deployment.option = {
        legend: {
          show: false
        },
        tooltip: {
          show: false
        },
        color: ['#f7a923', '#f2e0c2'],
        series: [{
          type: 'pie',
          radius: ['70%', '90%'],
          label: {
            show: false
          },
          data: [_this.deployment.data, 100 - _this.deployment.data]
        }]
      };
      _this.task.data = data.data.data.work_states.task;
      _this.task.loading = false;
      _this.task.option = {
        legend: {
          show: false
        },
        tooltip: {
          show: false
        },
        color: ['#f7a923', '#f2e0c2'],
        series: [{
          type: 'pie',
          radius: ['70%', '90%'],
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [_this.task.data, 100 - _this.task.data]
        }]
      };
      _this.services.data = data.data.data.work_states.services;
      _this.services.loading = false;
      _this.services.option = {
        legend: {
          show: false
        },
        tooltip: {
          show: false
        },
        color: ['#f7a923', '#f2e0c2'],
        series: [{
          type: 'pie',
          radius: ['70%', '90%'],
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [_this.services.data, 100 - _this.services.data]
        }]
      };
      _this.docker_list.data = data.data.data.work_states.docker_list;
      _this.docker_list.loading = false;
      _this.docker_list.option = {
        legend: {
          show: false
        },
        tooltip: {
          show: false
        },
        color: ['#f7a923', '#f2e0c2'],
        series: [{
          type: 'pie',
          radius: ['70%', '90%'],
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [_this.docker_list.data, 100 - _this.docker_list.data]
        }]
      };
      _this.tableData1.msg = [].concat(toConsumableArray_default()(data.data.data.duplicate));
      _this.tableData1.loading = false;
      _this.tableData2.msg = [].concat(toConsumableArray_default()(data.data.data.deployment));
      _this.tableData2.loading = false;
      _this.tableData3.msg = [].concat(toConsumableArray_default()(data.data.data.task));
      _this.tableData3.loading = false;
      _this.tableData4.msg = [].concat(toConsumableArray_default()(data.data.data.services));
      _this.tableData4.loading = false;
      _this.tableData5.msg = [].concat(toConsumableArray_default()(data.data.data.docker_list));
      _this.tableData5.loading = false;
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-739f5064","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/clusterMonitoring/namespacesDetail.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-cluster-monitoring-namespaces-detail"},[_c('div',{staticClass:"item"},[_c('p',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.workloadStatus")))]),_vm._v(" "),_c('div',{staticClass:"content"},[_c('div',{staticClass:"chart-item"},[_c('sedu-echarts',{attrs:{"domId":"a","cname":_vm.cname,"option":_vm.duplicate.option}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.duplicate.loading),expression:"!duplicate.loading"}]},[_vm._v(_vm._s(_vm.duplicate.data)+"%")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.replicaSet")))])],1),_vm._v(" "),_c('div',{staticClass:"chart-item"},[_c('sedu-echarts',{attrs:{"domId":"b","cname":_vm.cname,"option":_vm.deployment.option}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.deployment.loading),expression:"!deployment.loading"}]},[_vm._v(_vm._s(_vm.deployment.data)+"%")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.deploy")))])],1),_vm._v(" "),_c('div',{staticClass:"chart-item"},[_c('sedu-echarts',{attrs:{"domId":"c","cname":_vm.cname,"option":_vm.task.option}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.task.loading),expression:"!task.loading"}]},[_vm._v(_vm._s(_vm.task.data)+"%")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.task")))])],1),_vm._v(" "),_c('div',{staticClass:"chart-item"},[_c('sedu-echarts',{attrs:{"domId":"d","cname":_vm.cname,"option":_vm.services.option}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.services.loading),expression:"!services.loading"}]},[_vm._v(_vm._s(_vm.services.data)+"%")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.service")))])],1),_vm._v(" "),_c('div',{staticClass:"chart-item"},[_c('sedu-echarts',{attrs:{"domId":"e","cname":_vm.cname,"option":_vm.docker_list.option}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!_vm.docker_list.loading),expression:"!docker_list.loading"}]},[_vm._v(_vm._s(_vm.docker_list.data)+"%")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.containerGroup")))])],1)])]),_vm._v(" "),_c('div',{staticClass:"item"},[_c('p',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.replicaSet")))]),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData1.loading),expression:"tableData1.loading"}],staticClass:"tab-content",attrs:{"data":_vm.tableData1.msg,"border":""}},[_c('el-table-column',{attrs:{"prop":"name","label":_vm.$t("views.clusterMonitoring.name")}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.clusterMonitoring.label"),"width":"175"},scopedSlots:_vm._u([{key:"default",fn:function(item){return _vm._l((item.row.tag),function(one,index){return _c('span',{key:index,staticClass:"tag"},[_vm._v(_vm._s(one))])})}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"container_group","label":_vm.$t("views.clusterMonitoring.containerGroup")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created","label":_vm.$t("views.clusterMonitoring.created")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"images","label":_vm.$t("views.clusterMonitoring.mirror")}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1)],1),_vm._v(" "),_c('div',{staticClass:"item"},[_c('p',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.deploy")))]),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData2.loading),expression:"tableData2.loading"}],staticClass:"tab-content",attrs:{"data":_vm.tableData2.msg,"border":""}},[_c('el-table-column',{attrs:{"prop":"name","label":_vm.$t("views.clusterMonitoring.name")}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.clusterMonitoring.label"),"width":"175"},scopedSlots:_vm._u([{key:"default",fn:function(item){return _vm._l((item.row.tag),function(one,index){return _c('span',{key:index,staticClass:"tag"},[_vm._v(_vm._s(one))])})}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"container_group","label":_vm.$t("views.clusterMonitoring.containerGroup")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created","label":_vm.$t("views.clusterMonitoring.created")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"images","label":_vm.$t("views.clusterMonitoring.mirror")}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1)],1),_vm._v(" "),_c('div',{staticClass:"item"},[_c('p',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.task")))]),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData3.loading),expression:"tableData3.loading"}],staticClass:"tab-content",attrs:{"data":_vm.tableData3.msg,"border":""}},[_c('el-table-column',{attrs:{"prop":"name","label":_vm.$t("views.clusterMonitoring.name")}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.clusterMonitoring.label"),"width":"175"},scopedSlots:_vm._u([{key:"default",fn:function(item){return _vm._l((item.row.tag),function(one,index){return _c('span',{key:index,staticClass:"tag"},[_vm._v(_vm._s(one))])})}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"container_group","label":_vm.$t("views.clusterMonitoring.containerGroup")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created","label":_vm.$t("views.clusterMonitoring.created")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"images","label":_vm.$t("views.clusterMonitoring.mirror")}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1)],1),_vm._v(" "),_c('div',{staticClass:"item"},[_c('p',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.service")))]),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData5.loading),expression:"tableData5.loading"}],staticClass:"tab-content",attrs:{"data":_vm.tableData4.msg,"border":""}},[_c('el-table-column',{attrs:{"prop":"name","label":_vm.$t("views.clusterMonitoring.name")}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.clusterMonitoring.label"),"width":"175"},scopedSlots:_vm._u([{key:"default",fn:function(item){return _vm._l((item.row.tag),function(one,index){return _c('span',{key:index,staticClass:"tag"},[_vm._v(_vm._s(one))])})}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"ip","label":_vm.$t("views.clusterMonitoring.clusterIP")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"externalEndpoint","label":_vm.$t("views.clusterMonitoring.externalEndpoint")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"internalEndpoint","label":_vm.$t("views.clusterMonitoring.internalEndpoint")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created","label":_vm.$t("views.clusterMonitoring.created")}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1)],1),_vm._v(" "),_c('div',{staticClass:"item"},[_c('p',{staticClass:"tit"},[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.containerGroup")))]),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData4.loading),expression:"tableData4.loading"}],staticClass:"tab-content",attrs:{"data":_vm.tableData5.msg,"border":""}},[_c('el-table-column',{attrs:{"prop":"name","label":_vm.$t("views.clusterMonitoring.name")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"node","label":_vm.$t("views.clusterMonitoring.node")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"status","label":_vm.$t("views.clusterMonitoring.status")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"restarted","label":_vm.$t("views.clusterMonitoring.restarted")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created","label":_vm.$t("views.clusterMonitoring.created")}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var clusterMonitoring_namespacesDetail = (esExports);
// CONCATENATED MODULE: ./src/views/clusterMonitoring/namespacesDetail.vue
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
  namespacesDetail,
  clusterMonitoring_namespacesDetail,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_clusterMonitoring_namespacesDetail = __webpack_exports__["default"] = (Component.exports);


/***/ })

});