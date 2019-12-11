webpackJsonp([18],{

/***/ "6hsl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/systemManagement/systemLog.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var systemLog = ({
  name: 'systemLog',
  data: function data() {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      option_type: [],
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
        url: '//rap2api.taobao.org/app/mock/21549/system-log-table',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          option_content: '',
          full_date: '',
          star_date: '',
          end_date: '',
          user_name: '',
          option_type: ''
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
    this.$axios.get('//rap2api.taobao.org/app/mock/21549/systemManagement/systemLog/sel').then(function (data) {
      _this2.option_type = [].concat(toConsumableArray_default()(data.data.data.option_type));
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-517e6d5c","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/systemManagement/systemLog.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-system-management-system-log"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.systemManagement.optionContent")))]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":_vm.$t("views.systemManagement.enter")},model:{value:(_vm.tableData.sel.option_content),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "option_content", $$v)},expression:"tableData.sel.option_content"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.systemManagement.optionData")))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","align":"right","unlink-panels":"","range-separator":"-","start-placeholder":_vm.$t("views.systemManagement.beginTime"),"end-placeholder":_vm.$t("views.systemManagement.endTime"),"picker-options":_vm.pickerOptions},model:{value:(_vm.tableData.sel.full_date),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "full_date", $$v)},expression:"tableData.sel.full_date"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.systemManagement.userName")))]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":_vm.$t("views.systemManagement.enter")},model:{value:(_vm.tableData.sel.user_name),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "user_name", $$v)},expression:"tableData.sel.user_name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.systemManagement.optionType")))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t("views.systemManagement.chose")},model:{value:(_vm.tableData.sel.option_type),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "option_type", $$v)},expression:"tableData.sel.option_type"}},_vm._l((_vm.option_type),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.clearSearch('tableData')}}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.reset")))]),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.doSearch('tableData')}}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.select")))])],1)]),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn dark mid"},[_vm._v(_vm._s(_vm.$t("views.systemManagement.printReport")))])],1),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData.loading),expression:"tableData.loading"}],staticClass:"tab-content",attrs:{"data":_vm.tableData.msg,"border":""}},[_c('el-table-column',{attrs:{"type":"index","align":"center","label":_vm.$t("views.systemManagement.serialNumber"),"width":"60"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"option_type.label","width":"200","align":"center","label":_vm.$t("views.systemManagement.optionType")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"option_content","label":_vm.$t("views.systemManagement.optionContent")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"ip","width":"200","align":"center","label":_vm.$t("views.systemManagement.ip")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"option_data","align":"center","width":"250","label":_vm.$t("views.systemManagement.optionData"),"sortable":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"user_name","label":_vm.$t("views.systemManagement.userName")}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.tableData.Pagination.page,"total":_vm.tableData.Pagination.total_count},on:{"update:currentPage":function($event){_vm.$set(_vm.tableData.Pagination, "page", $event)},"current-change":function($event){_vm.changePage('tableData')}}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var systemManagement_systemLog = (esExports);
// CONCATENATED MODULE: ./src/views/systemManagement/systemLog.vue
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
  systemLog,
  systemManagement_systemLog,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_systemManagement_systemLog = __webpack_exports__["default"] = (Component.exports);


/***/ })

});