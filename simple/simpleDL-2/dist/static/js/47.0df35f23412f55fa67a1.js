webpackJsonp([47],{

/***/ "sBR9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/clusterMonitoring/nodeControl.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var nodeControl = ({
  name: 'nodeControl',
  data: function data() {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      node_status: [],
      pickerOptions: {
        shortcuts: [{
          text: this.$t('views.clusterMonitoring.recentOneWeek'),
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$t('views.clusterMonitoring.recentOneMonth'),
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$t('views.clusterMonitoring.recentThreeMonth'),
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      tableData1: { // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/system/nodelist',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          name: '',
          node_status: '',
          // ip: '',
          full_time: '',
          start_time: '',
          end_time: '',
          order: '',
          prop: ''
        }
      }
    };
  },

  methods: {
    getActiveTab: function getActiveTab(name) {
      // 获取当前展示的表格、搜索等信息
      this.linTabData = name;
      this.linUrl = this[name].url;
      this.initMsg();
    },
    addSort: function addSort(event, name) {
      console.log(arguments);
      this[name].sel.order = event.order;
      this[name].sel.prop = event.prop;
      this.getActiveTab(name);
    },
    clearSearch: function clearSearch(name) {
      // 清除搜索条件
      for (var key in this[name].sel) {
        this[name].sel[key] = '';
      }
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1;
      }
      this.getActiveTab(name);
    },
    doSearch: function doSearch(name) {
      // 按条件搜索
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1;
      }
      this.getActiveTab(name);
    },
    changePage: function changePage(name) {
      // 改变分页
      this.getActiveTab(name);
    },
    initMsg: function initMsg() {
      var _this = this;

      this[this.linTabData].loading = true;
      var lin = {};
      if (this[this.linTabData].Pagination !== undefined) {
        lin = assign_default()({}, this[this.linTabData].Pagination, {
          count: this.pageSize
        });
      }
      if (this[this.linTabData].sel !== undefined) {
        if (this[this.linTabData].sel.full_time === '' || this[this.linTabData].sel.full_time === null) {
          this[this.linTabData].sel.start_time = '';
          this[this.linTabData].sel.end_time = '';
        } else {
          this[this.linTabData].sel.start_time = this[this.linTabData].sel.full_time[0];
          this[this.linTabData].sel.end_time = this[this.linTabData].sel.full_time[1];
        }
        lin = assign_default()({}, lin, this[this.linTabData].sel);
      }
      this.$axios.get(this[this.linTabData].url, { params: lin }).then(function (data) {
        // 根据后台接口更改
        var tableDate = data.data.data.node_list;
        // 数据处理
        _this[_this.linTabData].msg = [].concat(toConsumableArray_default()(tableDate));
        // 重置数据总数
        if (_this[_this.linTabData].Pagination !== undefined) {
          _this[_this.linTabData].Pagination.total_count = data.data.data.total_count;
        }
        _this[_this.linTabData].loading = false;
      });
    }
  },
  created: function created() {
    var _this2 = this;

    // 每有一个表格就要写个初始化赋值
    this.getActiveTab('tableData1');
    this.$axios.get('//rap2api.taobao.org/app/mock/21549/clusterMonitoring/nodeControl/sel').then(function (data) {
      _this2.node_status = [].concat(toConsumableArray_default()(data.data.data.node_status));
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-a4c8d23e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/clusterMonitoring/nodeControl.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-cluster-monitoring-node-control"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.nodeName")))]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":_vm.$t("views.clusterMonitoring.enter")},model:{value:(_vm.tableData1.sel.name),callback:function ($$v) {_vm.$set(_vm.tableData1.sel, "name", $$v)},expression:"tableData1.sel.name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.creationTime")))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","align":"right","value-format":"yyyy-MM-dd","unlink-panels":"","range-separator":"-","start-placeholder":_vm.$t("views.clusterMonitoring.beginTime"),"end-placeholder":_vm.$t("views.clusterMonitoring.endTime"),"picker-options":_vm.pickerOptions},model:{value:(_vm.tableData1.sel.full_time),callback:function ($$v) {_vm.$set(_vm.tableData1.sel, "full_time", $$v)},expression:"tableData1.sel.full_time"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.status")))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t("views.clusterMonitoring.chose")},model:{value:(_vm.tableData1.sel.node_status),callback:function ($$v) {_vm.$set(_vm.tableData1.sel, "node_status", $$v)},expression:"tableData1.sel.node_status"}},_vm._l((_vm.node_status),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.clearSearch('tableData1')}}},[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.reset")))]),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.doSearch('tableData1')}}},[_vm._v(_vm._s(_vm.$t("views.clusterMonitoring.select")))])],1)]),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData1.loading),expression:"tableData1.loading"}],staticClass:"tab-content",attrs:{"data":_vm.tableData1.msg,"border":""},on:{"sort-change":function($event){_vm.addSort($event,'tableData1')}}},[_c('el-table-column',{attrs:{"type":"index","label":_vm.$t("views.clusterMonitoring.serialNumber"),"width":"80","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.clusterMonitoring.nodeName")},scopedSlots:_vm._u([{key:"default",fn:function(scope){return _c('router-link',{staticClass:"link",attrs:{"to":{name:'nodeControlDetail',query:{nodeId:scope.row.ip}}}},[_vm._v("\n        "+_vm._s(scope.row.name)+"\n      ")])}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"ip","align":"center","label":_vm.$t("views.clusterMonitoring.ip")}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.clusterMonitoring.status"),"align":"center","width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(item){return [_vm._v("\n        "+_vm._s(item.row.node_status===1?'ready':'false')+"\n      ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","sortable":"","align":"center","label":_vm.$t("views.clusterMonitoring.creationTime")}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.tableData1.Pagination.page,"total":_vm.tableData1.Pagination.total_count},on:{"update:currentPage":function($event){_vm.$set(_vm.tableData1.Pagination, "page", $event)},"current-change":function($event){_vm.changePage('tableData1')}}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var clusterMonitoring_nodeControl = (esExports);
// CONCATENATED MODULE: ./src/views/clusterMonitoring/nodeControl.vue
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
  nodeControl,
  clusterMonitoring_nodeControl,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_clusterMonitoring_nodeControl = __webpack_exports__["default"] = (Component.exports);


/***/ })

});