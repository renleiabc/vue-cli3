webpackJsonp([61],{

/***/ "ILRq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/caseCenter/caseCenter.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var caseCenter = ({
  name: 'caseCenter',
  data: function data() {
    return {
      states: '',
      role: 2,
      linTabData: '',
      linUrl: '',
      caseIdList: [],
      pageSize: 10,
      case_status: [],
      case_type: [],
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
        url: '/casecenter/index',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          name: '',
          full_date: [],
          case_status: '',
          category: ''
        }
      }
    };
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    if (to.name === 'createCase') {
      if (to.query.hasOwnProperty('caseId')) {
        to.meta.title = 'views.nav.updateCase';
      } else {
        to.meta.title = 'views.nav.createCase';
      }
    }
    next();
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
          this[this.linTabData].sel.start_time = this[this.linTabData].sel.full_date[0];
          this[this.linTabData].sel.end_time = this[this.linTabData].sel.full_date[1];
        } else {
          this[this.linTabData].sel.start_time = '';
          this[this.linTabData].sel.end_time = '';
        }
        lin = assign_default()({}, lin, this[this.linTabData].sel);
      }
      lin.type = this[this.linTabData].sel.case_status;
      this.$axios.get(this[this.linTabData].url, { params: lin }).then(function (data) {
        // 根据后台接口更改
        var tableDate = data.data.data.image_list;
        // 数据处理
        _this[_this.linTabData].msg = [].concat(toConsumableArray_default()(tableDate));
        // 重置数据总数
        if (_this[_this.linTabData].Pagination !== undefined) {
          _this[_this.linTabData].Pagination.total_count = data.data.data.total_count;
        }
        _this[_this.linTabData].loading = false;
      });
    },
    selectChange: function selectChange(rows) {
      this.caseIdList = [];
      for (var i = 0; i < rows.length; i++) {
        this.caseIdList.push(rows[i].id);
      }
    },
    changeCase: function changeCase(id) {
      if (isNaN(id)) {
        this.$router.push({ name: 'createCase' });
      } else {
        this.$router.push({ name: 'createCase', query: { caseId: id } });
      }
    },
    deleteCase: function deleteCase(id) {
      var _this2 = this;

      var arr = [];
      var switchBool = true;
      if (id === undefined) {
        console.log(this.caseIdList);
        if (this.caseIdList.length > 0) {
          arr = [].concat(toConsumableArray_default()(this.caseIdList));
        } else {
          switchBool = false;
          this.$message({ message: '请选择删除数据', type: 'error' });
        }
      } else {
        arr = [id];
      }
      if (switchBool) {
        this.mixinConfirm('/casecenter/delete', { case_center_id: arr }).then(function (res) {
          if (res) {
            // 请求成功回调
            _this2.doSearch('tableData');
          }
        });
      }
    }
  },
  created: function created() {
    var _this3 = this;

    // 每有一个表格就要写个初始化赋值
    this.getActiveTab('tableData');
    this.role = JSON.parse(localStorage.getItem('userinfo')).role;
    // 获取搜索的数据
    this.$get('/casecenter/casecentercategorylist').then(function (res) {
      _this3.case_type = [].concat(toConsumableArray_default()(res.data));
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-28c401c2","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/caseCenter/caseCenter.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.caseCenterPage.caseName')))]),_vm._v(" "),_c('el-input',{staticClass:"views-input-text",attrs:{"placeholder":_vm.$t('views.caseCenterPage.caseName')},model:{value:(_vm.tableData.sel.name),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "name", $$v)},expression:"tableData.sel.name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.table.createTime')))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","editable":false,"align":"right","range-separator":"-","value-format":"yyyy-MM-dd","picker-options":_vm.pickerOptions,"start-placeholder":_vm.$t('views.button.startDate'),"end-placeholder":_vm.$t('views.button.endDate')},model:{value:(_vm.tableData.sel.full_date),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "full_date", $$v)},expression:"tableData.sel.full_date"}})],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.doSearch('tableData')}}},[_vm._v(_vm._s(_vm.$t("views.button.search")))])],1)]),_vm._v(" "),(_vm.role===2)?_c('div',{staticClass:"controls-else"},[_c('el-button',{staticClass:"btn dark mid",on:{"click":function($event){_vm.changeCase()}}},[_vm._v(_vm._s(_vm.$t('views.caseCenterPage.createBtnL')))]),_vm._v(" "),_c('el-button',{staticClass:"btn dark mid",on:{"click":function($event){_vm.deleteCase()}}},[_vm._v(_vm._s(_vm.$t("views.button.batchDelete")))])],1):_vm._e(),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData.loading),expression:"tableData.loading"}],staticClass:"tab-content",attrs:{"data":_vm.tableData.msg,"border":""},on:{"selection-change":_vm.selectChange}},[_c('el-table-column',{attrs:{"type":"index","width":"55","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.caseCenterPage.caseName')},scopedSlots:_vm._u([{key:"default",fn:function(item){return [_c('router-link',{staticClass:"link",attrs:{"to":{name:'caseDetail',query:{caseId:item.row.id}}}},[_vm._v(_vm._s(item.row.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","align":"center","label":_vm.$t('views.table.createTime')}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"caseCategory.name","width":"160","align":"center","label":_vm.$t('views.caseCenterPage.caseType')}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"describe","label":_vm.$t('views.caseCenterPage.caseDesc')}}),_vm._v(" "),(_vm.role===2)?_c('el-table-column',{attrs:{"label":_vm.$t('views.table.operate'),"width":"140"},scopedSlots:_vm._u([{key:"default",fn:function(item){return _c('div',{staticClass:"options",staticStyle:{"text-align":"center"}},[(item.row.is_built == 1)?_c('div',[_vm._v("--")]):_c('div',[_c('button',{staticClass:"btn",on:{"click":function($event){_vm.changeCase(item.row.id)}}},[_vm._v(_vm._s(_vm.$t('views.button.update')))]),_vm._v(" "),_c('button',{staticClass:"del",on:{"click":function($event){_vm.deleteCase(item.row.id)}}},[_vm._v(_vm._s(_vm.$t('views.button.delete')))])])])}}])}):_vm._e(),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.tableData.Pagination.page,"total":_vm.tableData.Pagination.total_count},on:{"update:currentPage":function($event){_vm.$set(_vm.tableData.Pagination, "page", $event)},"current-change":function($event){_vm.changePage('tableData')}}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var caseCenter_caseCenter = (esExports);
// CONCATENATED MODULE: ./src/views/caseCenter/caseCenter.vue
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
  caseCenter,
  caseCenter_caseCenter,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_caseCenter_caseCenter = __webpack_exports__["default"] = (Component.exports);


/***/ })

});