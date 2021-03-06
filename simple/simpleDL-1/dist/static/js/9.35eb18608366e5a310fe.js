webpackJsonp([9],{

/***/ "j3MC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("Dd8w");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./src/util/validate.js
var validate = __webpack_require__("v46e");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/storageManagement/projectManagement.vue



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var projectManagement = ({
  name: 'announcement',
  data: function data() {
    return {
      createStorageDialog: false,
      states: '',
      linTabData: '',
      linUrl: '',
      createStorage: {
        storage_name: '',
        project_id: '',
        storage_description: ''
      },
      proList: [],
      storageIdList: [],
      pageSize: 3,
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
      tableData: {
        // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/storage/storagelist',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          storage_name: '',
          is_init: 2,
          full_date: []
        }
      }
    };
  },

  methods: {
    // 创建弹窗
    changeStorage: function changeStorage() {
      this.createStorageDialog = true;
    },
    saveStorage: function saveStorage() {
      var _this = this;

      if (this.createStorage.storage_name === '') {
        this.$message({ message: this.$t('views.storageManagement.valid.notNullName'), type: 'error' });
        return false;
      }
      if (!Object(validate["b" /* valiName */])(this.createStorage.storage_name)) {
        this.$message({ message: "存储空间名称不能包含<>:\\'\"/.", type: 'error' });
        return false;
      }
      if (this.createStorage.storage_description === '') {
        this.$message({ message: this.$t('views.storageManagement.valid.notNullDes'), type: 'error' });
        return false;
      }
      var parms = { is_init: this.tableData.sel.is_init, name: this.createStorage.storage_name, project_id: this.createStorage.project_id, describe: this.createStorage.storage_description };
      this.$post('/storage/storagecreate', { Storage: parms }).then(function (res) {
        if (res.code === 200) {
          _this.$message({ message: _this.$t('views.notification.saved'), type: 'success' });
          _this.createStorageDialog = false;
          _this.getActiveTab('tableData');
        }
      });
    },

    // 保存认证
    saveAuthenticate: function saveAuthenticate(row) {
      var link = document.createElement('a');
      link.href = "//192.168.10.95:85" + '/v1/storage/downloadkey?access-token=' + JSON.parse(localStorage.getItem('userinfo')).access_token + '&storage_id=' + row.id;
      document.body.appendChild(link);
      setTimeout(function (res) {
        link.click();
        document.body.removeChild(link);
      }, 5);
    },
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
      var _this2 = this;

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
      this.$post(this[this.linTabData].url, { StorageSearch: extends_default()({}, lin), page: lin.page }).then(function (data) {
        // 根据后台接口更改
        var tableDate = data.data.storage_list;
        // 数据处理
        _this2[_this2.linTabData].msg = [].concat(toConsumableArray_default()(tableDate));
        // 重置数据总数
        if (_this2[_this2.linTabData].Pagination !== undefined) {
          _this2[_this2.linTabData].Pagination.total_count = data.data.total_count;
        }
        _this2.pageSize = data.data.per_page;
        _this2[_this2.linTabData].loading = false;
      });
    },
    fileManage: function fileManage(id) {
      this.$router.push({ name: 'proStorageDetail', query: { id: id, is_init: this.tableData.sel.is_init } });
    },
    deleteStorage: function deleteStorage(id) {
      var _this3 = this;

      // url请求地址  params参数  message自定义提示信息,默认提示 "确认要删除吗？"
      this.mixinConfirm('/storage/storagedelete', { storage_id: [id], force: 0 }).then(function (res) {
        if (res) {
          // 请求成功回调
          _this3.getActiveTab('tableData');
        }
      });
    }
  },
  created: function created() {
    var _this4 = this;

    // 每有一个表格就要写个初始化赋值
    this.$get('/storage/progectlist').then(function (res) {
      if (res.code === 200) {
        _this4.proList = res.data;
      }
    });
    this.getActiveTab('tableData');
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-425f515e","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/storageManagement/projectManagement.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"announcement"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.storageManagement.storage.storageName')))]),_vm._v(" "),_c('el-input',{staticClass:"views-input-text",attrs:{"placeholder":_vm.$t('views.storageManagement.storage.storageName')},model:{value:(_vm.tableData.sel.storage_name),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "storage_name", $$v)},expression:"tableData.sel.storage_name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.table.createTime')))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","editable":false,"range-separator":"-","picker-options":_vm.pickerOptions,"value-format":"yyyy-MM-dd","start-placeholder":_vm.$t('views.button.startDate'),"end-placeholder":_vm.$t('views.button.endDate')},model:{value:(_vm.tableData.sel.full_date),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "full_date", $$v)},expression:"tableData.sel.full_date"}})],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.doSearch('tableData')}}},[_vm._v(_vm._s(_vm.$t("views.button.search")))])],1)]),_vm._v(" "),_c('div',{staticClass:"controls-else"},[_c('el-button',{staticClass:"view-btn-medium",on:{"click":_vm.changeStorage}},[_vm._v(_vm._s(_vm.$t('views.storageManagement.storage.btnCreatePro')))])],1),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData.loading),expression:"tableData.loading"}],staticClass:"tab-content",attrs:{"data":_vm.tableData.msg,"border":""}},[_c('el-table-column',{attrs:{"type":"index","label":_vm.$t("views.table.number"),"width":"55","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.storageManagement.storage.storageName')},scopedSlots:_vm._u([{key:"default",fn:function(item){return [_c('router-link',{staticClass:"link",attrs:{"to":{name:'proStorageDetail',query:{id:item.row.id, is_init: _vm.tableData.sel.is_init}}}},[_vm._v(_vm._s(item.row.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","width":"200","align":"center","label":_vm.$t('views.table.createTime')}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"describe","label":_vm.$t('views.table.describe')}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.table.operate'),"width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(item){return _c('div',{staticClass:"options text-center"},[_c('button',{staticClass:"btn",on:{"click":function($event){_vm.fileManage(item.row.id)}}},[_vm._v("存储管理")]),_vm._v(" "),_c('button',{staticClass:"del",on:{"click":function($event){_vm.deleteStorage(item.row.id)}}},[_vm._v(_vm._s(_vm.$t('views.button.delete')))])])}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.tableData.Pagination.page,"total":_vm.tableData.Pagination.total_count},on:{"update:currentPage":function($event){_vm.$set(_vm.tableData.Pagination, "page", $event)},"current-change":function($event){_vm.changePage('tableData')}}}),_vm._v(" "),_c('el-dialog',{staticClass:"small",attrs:{"title":_vm.$t('views.storageManagement.storage.btnCreatePro'),"visible":_vm.createStorageDialog},on:{"update:visible":function($event){_vm.createStorageDialog=$event}}},[_c('div',[_c('div',{staticClass:"create-storage"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.storageManagement.storage.spaceName')))]),_vm._v(" "),_c('el-input',{model:{value:(_vm.createStorage.storage_name),callback:function ($$v) {_vm.$set(_vm.createStorage, "storage_name", $$v)},expression:"createStorage.storage_name"}})],1),_vm._v(" "),_c('div',{staticClass:"create-storage"},[_c('span',[_vm._v("所属项目空间")]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.createStorage.project_id),callback:function ($$v) {_vm.$set(_vm.createStorage, "project_id", $$v)},expression:"createStorage.project_id"}},_vm._l((_vm.proList),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('div',{staticClass:"create-storage"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.table.describe')))]),_vm._v(" "),_c('el-input',{attrs:{"type":"textarea","rows":"4"},model:{value:(_vm.createStorage.storage_description),callback:function ($$v) {_vm.$set(_vm.createStorage, "storage_description", $$v)},expression:"createStorage.storage_description"}})],1)]),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"size":"medium"},on:{"click":function($event){_vm.createStorageDialog = false}}},[_vm._v(_vm._s(_vm.$t('views.button.cancel')))]),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",on:{"click":_vm.saveStorage}},[_vm._v(_vm._s(_vm.$t('views.button.save')))])],1)])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var storageManagement_projectManagement = (esExports);
// CONCATENATED MODULE: ./src/views/storageManagement/projectManagement.vue
function injectStyle (ssrContext) {
  __webpack_require__("lPGz")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-425f515e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  projectManagement,
  storageManagement_projectManagement,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_storageManagement_projectManagement = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "lPGz":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("wcj8");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("e96d1aa6", content, true, {});

/***/ }),

/***/ "wcj8":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ })

});