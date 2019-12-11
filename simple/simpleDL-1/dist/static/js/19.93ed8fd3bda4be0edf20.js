webpackJsonp([19],{

/***/ "683F":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/systemManagement/systemAlarm.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var systemAlarm = ({
  name: 'systemAlarm',
  data: function data() {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      node_name: [],
      warn_status: [],
      warn_type: [],
      pickerOptions: {
        shortcuts: [{
          text: this.$t('views.systemManagement.recentOneWeek'),
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$t('views.systemManagement.recentOneMonth'),
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$t('views.systemManagement.recentThreeMonth'),
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      tableData: { // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '//rap2api.taobao.org/app/mock/21549/system-warn-table',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          node_name: '',
          full_date: '',
          star_date: '',
          end_date: '',
          warn_type: '',
          warn_status: ''
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
        if (this[this.linTabData].sel.full_date && this[this.linTabData].sel.full_date.length === 2) {
          this[this.linTabData].sel.star_date = this[this.linTabData].sel.full_date[0];
          this[this.linTabData].sel.end_date = this[this.linTabData].sel.full_date[1];
        } else {
          this[this.linTabData].sel.star_date = '';
          this[this.linTabData].sel.end_date = '';
        }
        lin = assign_default()({}, lin, this[this.linTabData].sel);
      }
      this.$axios.get(this[this.linTabData].url, { params: lin }).then(function (data) {
        // 根据后台接口更改
        var tableDate = data.data.data.sys_log_table;
        // 数据处理
        // this[this.linTabData].msg = [...tableDate]
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
    this.getActiveTab('tableData');
    // 获取搜索的数据
    this.$axios.get('//rap2api.taobao.org/app/mock/21549/systemManagement/systemAlarm/sel').then(function (data) {
      _this2.node_name = [].concat(toConsumableArray_default()(data.data.data.node_name));
      _this2.warn_status = [].concat(toConsumableArray_default()(data.data.data.warn_status));
      _this2.warn_type = [].concat(toConsumableArray_default()(data.data.data.warn_type));
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3ad1174f","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/systemManagement/systemAlarm.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-system-management-system-alarm"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.systemManagement.nodeName")))]),_vm._v(" "),_c('el-select',{attrs:{"clearable":"","filterable":"","placeholder":_vm.$t("views.systemManagement.chose")},model:{value:(_vm.tableData.sel.node_name),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "node_name", $$v)},expression:"tableData.sel.node_name"}},_vm._l((_vm.node_name),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.systemManagement.warnDate")))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","align":"right","unlink-panels":"","range-separator":"-","start-placeholder":_vm.$t("views.systemManagement.beginTime"),"end-placeholder":_vm.$t("views.systemManagement.endTime"),"picker-options":_vm.pickerOptions},model:{value:(_vm.tableData.sel.full_date),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "full_date", $$v)},expression:"tableData.sel.full_date"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.systemManagement.warnStates")))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t("views.systemManagement.chose")},model:{value:(_vm.tableData.sel.warn_status),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "warn_status", $$v)},expression:"tableData.sel.warn_status"}},_vm._l((_vm.warn_status),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.systemManagement.warnType")))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t("views.systemManagement.chose")},model:{value:(_vm.tableData.sel.warn_type),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "warn_type", $$v)},expression:"tableData.sel.warn_type"}},_vm._l((_vm.warn_type),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.clearSearch('tableData')}}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.reset")))]),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.doSearch('tableData')}}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.select")))])],1)]),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData.loading),expression:"tableData.loading"}],staticClass:"tab-content",attrs:{"data":_vm.tableData.msg,"border":""}},[_c('el-table-column',{attrs:{"prop":"node_name","width":"200","align":"center","label":_vm.$t("views.systemManagement.nodeName")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"warn_type.label","align":"center","width":"100","label":_vm.$t("views.systemManagement.warnType")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"warn_content","label":_vm.$t("views.systemManagement.warnContent")}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.systemManagement.warnStates"),"width":"100","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',{class:scope.row.warn_status.value===1?'':scope.row.warn_status.value===2?'green':scope.row.warn_status.value===3?'yellow':'red'},[_vm._v(_vm._s(scope.row.warn_status.label))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"warn_date","align":"center","width":"260","label":_vm.$t("views.systemManagement.warnDate"),"sortable":""}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.tableData.Pagination.page,"total":_vm.tableData.Pagination.total_count},on:{"update:currentPage":function($event){_vm.$set(_vm.tableData.Pagination, "page", $event)},"current-change":function($event){_vm.changePage('tableData')}}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var systemManagement_systemAlarm = (esExports);
// CONCATENATED MODULE: ./src/views/systemManagement/systemAlarm.vue
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
  systemAlarm,
  systemManagement_systemAlarm,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_systemManagement_systemAlarm = __webpack_exports__["default"] = (Component.exports);


/***/ })

});