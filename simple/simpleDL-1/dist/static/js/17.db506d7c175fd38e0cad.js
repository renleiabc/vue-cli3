webpackJsonp([17],{

/***/ "QCcE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/systemManagement/components/diskManagement.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var diskManagement = ({
  name: 'diskManagement',
  data: function data() {
    return {
      activeName: 'clearDisk', // 当前激活页
      linSelData: '',
      linTabData: '',
      linLoad: '',
      linUrl: '',
      node_name: [],
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
      tableData1: [],
      tableData2: [],
      tabSel2: {
        node_name: '',
        full_date: '',
        start_data: '',
        end_data: ''
      },
      loading1: true,
      loading2: true,
      page: 1,
      total_count: 1,
      clearTimeMsg: '',
      clearTime: [],
      pageSize: 10
    };
  },

  methods: {
    getActiveTabs: function getActiveTabs() {
      // 获取当前展示的表格、搜索等信息
      switch (this.activeName) {// 对应tabs的name
        case 'clearDisk':
          this.linSelData = '';
          this.linTabData = 'tableData1';
          this.linLoad = 'loading1';
          this.linUrl = '//rap2api.taobao.org/app/mock/21549/disk-sys-setting';
          break;
        case 'diskHistory':
          this.linSelData = 'tabSel2';
          this.linTabData = 'tableData2';
          this.linLoad = 'loading2';
          this.linUrl = '//rap2api.taobao.org/app/mock/21549/disk-clear-log';
          break;
      }
      this.initMsgTabs();
    },
    clearSearchTabs: function clearSearchTabs() {
      // 清除搜索条件、分页切换
      var str = void 0;
      switch (this.activeName) {// 对应tabs的name
        case 'first':
          str = '';
          break;
        case 'second':
          str = 'tabSel2';
          break;
      }
      for (var key in this[str]) {
        this[str][key] = '';
      }
      this.page = 1;
      this.getActiveTabs();
    },
    doSearchTabs: function doSearchTabs() {
      // 按条件搜索
      this.page = 1;
      this.getActiveTabs();
    },
    changePageTabs: function changePageTabs() {
      // 改变分页
      this.getActiveTabs();
    },
    initMsgTabs: function initMsgTabs() {
      var _this = this;

      this[this.linLoad] = true;
      var lin = assign_default()({}, {
        page: this.page,
        count: this.pageSize
      });
      if (this[this.linSelData] !== undefined) {
        if (this[this.linSelData].full_date !== undefined) {
          if (this[this.linSelData].full_date !== null && this[this.linSelData].full_date !== '') {
            this[this.linSelData].start_data = this[this.linSelData].full_date[0];
            this[this.linSelData].end_data = this[this.linSelData].full_date[1];
          } else {
            this[this.linSelData].start_data = '';
            this[this.linSelData].end_data = '';
          }
        }
        lin = assign_default()({}, lin, this[this.linSelData]);
      }
      this.$axios.get(this.linUrl, { params: lin }).then(function (data) {
        // 根据后台接口更改
        var tableDate = data.data.data.disk_clear_table;
        // 数据处理
        _this[_this.linTabData] = [].concat(toConsumableArray_default()(tableDate));
        // 重置数据总数
        _this.total_count = data.data.data.total_count;
        _this[_this.linLoad] = false;
      });
    },
    saveClearTime: function saveClearTime() {
      var _this2 = this;

      this.$axios.post('//rap2api.taobao.org/app/mock/21549/clear-disk-setting', { time_number: this.clearTimeMsg }).then(function (data) {
        _this2.$message({ message: '保存成功', type: 'success' });
      });
    },
    diskCleaning: function diskCleaning(id) {
      this.$emit('diskCleaning', id);
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.getActiveTabs();
    this.$axios.get('//rap2api.taobao.org/app/mock/21549/systemManagement/systemSetting/diskManagement/sel').then(function (data) {
      _this3.clearTime = [].concat(toConsumableArray_default()(data.data.data.clear_log_time));
      _this3.node_name = [].concat(toConsumableArray_default()(data.data.data.node_type));
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8cabe1a0","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/systemManagement/components/diskManagement.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"disk-title"},[_vm._v("\n    "+_vm._s(_vm.$t("views.systemManagement.diskManagementSettings"))+"："+_vm._s(_vm.$t("views.systemManagement.systemSetting.p1"))+"\n    "),_c('el-select',{attrs:{"clearable":"","filterable":"","placeholder":_vm.$t("views.systemManagement.chose")},model:{value:(_vm.clearTimeMsg),callback:function ($$v) {_vm.clearTimeMsg=$$v},expression:"clearTimeMsg"}},_vm._l((_vm.clearTime),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v("\n    "+_vm._s(_vm.$t("views.systemManagement.systemSetting.p2"))+"\n    "),_c('el-button',{staticClass:"btn dark small",on:{"click":_vm.saveClearTime}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.save")))])],1),_vm._v(" "),_c('el-tabs',{on:{"tab-click":_vm.clearSearchTabs},model:{value:(_vm.activeName),callback:function ($$v) {_vm.activeName=$$v},expression:"activeName"}},[_c('el-tab-pane',{attrs:{"label":_vm.$t("views.systemManagement.diskCleaning"),"name":"clearDisk"}},[_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading1),expression:"loading1"}],staticClass:"tab-content",attrs:{"data":_vm.tableData1,"border":""}},[_c('el-table-column',{attrs:{"prop":"node_name","align":"center","label":_vm.$t("views.systemManagement.nodeName")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"disk_type","width":"100","align":"center","label":_vm.$t("views.systemManagement.type")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"disk_used","align":"center","label":_vm.$t("views.systemManagement.diskUsage")},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v("磁盘使用量达到"+_vm._s(scope.row.disk_used)+"%")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"disk_status","width":"120","align":"center","label":_vm.$t("views.systemManagement.status")},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',{class:scope.row.disk_status===0?'':scope.row.disk_status===1?'green':scope.row.disk_status===2?'yellow':'red'},[_vm._v(_vm._s(scope.row.disk_status===0?'良好':scope.row.disk_status===1?'低风险':scope.row.disk_status===2?'中风险':'高风险'))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"disk_warn_time","align":"center","label":_vm.$t("views.systemManagement.alarmTime")}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.systemManagement.operating"),"width":"150","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('button',{staticClass:"btn",on:{"click":function($event){_vm.diskCleaning(scope.row.node_id)}}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.diskCleaning")))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1)],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":_vm.$t("views.systemManagement.diskCleaningRecord"),"name":"diskHistory","lazy":true}},[_c('div',{staticClass:"tab-select"},[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.systemManagement.nodeName")))]),_vm._v(" "),_c('el-select',{attrs:{"clearable":"","filterable":"","placeholder":_vm.$t("views.systemManagement.chose")},model:{value:(_vm.tabSel2.node_name),callback:function ($$v) {_vm.$set(_vm.tabSel2, "node_name", $$v)},expression:"tabSel2.node_name"}},_vm._l((_vm.node_name),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v(" "),_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.systemManagement.cleaningTime")))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","align":"right","unlink-panels":"","range-separator":"-","start-placeholder":_vm.$t("views.systemManagement.beginTime"),"end-placeholder":_vm.$t("views.systemManagement.endTime"),"picker-options":_vm.pickerOptions},model:{value:(_vm.tabSel2.full_date),callback:function ($$v) {_vm.$set(_vm.tabSel2, "full_date", $$v)},expression:"tabSel2.full_date"}}),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.clearSearchTabs('tableData1')}}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.reset")))]),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.doSearchTabs('tableData1')}}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.select")))])],1),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading2),expression:"loading2"}],staticClass:"tab-content",attrs:{"data":_vm.tableData2,"border":""}},[_c('el-table-column',{attrs:{"prop":"node_name","align":"center","width":"200","label":_vm.$t("views.systemManagement.nodeName")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"option_content","label":_vm.$t("views.systemManagement.alarmContent")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"disk_clear_time","align":"center","width":"200","label":_vm.$t("views.systemManagement.cleaningTime")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"free_size","align":"center","width":"150","label":_vm.$t("views.systemManagement.freeSpace")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"time_limt","align":"center","label":_vm.$t("views.systemManagement.cleanDiskRange")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"option_name","align":"center","width":"100","label":_vm.$t("views.systemManagement.OperationSource")}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1)],1)],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.page,"total":_vm.total_count},on:{"update:currentPage":function($event){_vm.page=$event},"current-change":_vm.changePageTabs}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_diskManagement = (esExports);
// CONCATENATED MODULE: ./src/views/systemManagement/components/diskManagement.vue
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
  diskManagement,
  components_diskManagement,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var systemManagement_components_diskManagement = (Component.exports);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("Dd8w");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/systemManagement/components/quotaSetting.vue



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var quotaSetting = ({
  name: 'quotaSetting',
  data: function data() {
    return {
      linSelData: '',
      linTabData: '',
      linLoad: '',
      linUrl: '',
      languageList: [{ value: '中文', label: '中文' }, { value: '英文', label: '英文' }],
      basis: {
        disabled: true,
        valided: true,
        errorStr: {
          languages: '',
          page_num: '',
          user_create_num: ''
        },
        content: {
          languages: '中文',
          page_num: '20',
          user_create_num: '5'
        }
      },
      mirror: {
        disabled: true,
        valided: true,
        errorStr: {
          project_image_num: '',
          personal_image_num: ''
        },
        content: {
          project_image_num: '10',
          personal_image_num: '10'
        }
      },
      personal: {
        disabled: true,
        valided: true,
        errorStr: {
          cpu: '',
          memory: '',
          gpu: ''
        },
        content: {
          cpu: '8',
          memory: '24',
          gpu: '1'
        }
      },
      storage: {
        disabled: true,
        valided: true,
        errorStr: {
          project_storage_size: '',
          project_storage_num: '',
          personal_storage_size: '',
          personal_storage_num: ''
        },
        content: {
          project_storage_size: '100',
          project_storage_num: '10',
          personal_storage_size: '50',
          personal_storage_num: '10'
        }
      },
      tableData3: { // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '//rap2api.taobao.org/app/mock/21549/sys-setting-params/tab',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        }
      },
      pageSize: 10
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
    changePage: function changePage(name) {
      // 改变分页
      this.getActiveTab(name);
    },
    viladInput: function viladInput(input, errStr, num) {
      var arrInp = input.split('.');
      var arrErr = errStr.split('.');
      var isInit = this.limitInt(this[arrInp[0]][arrInp[1]][arrInp[2]], num);
      if (isInit) {
        this[arrInp[0]].valided = true;
        this[arrErr[0]][arrErr[1]][arrErr[2]] = '';
      } else {
        this[arrInp[0]].valided = false;
        this[arrErr[0]][arrErr[1]][arrErr[2]] = '\u8BF7\u8F93\u51651~' + num + '\u7684\u6574\u6570';
      }
    },

    // 整数判断
    limitInt: function limitInt(num, limitNum) {
      if (num - 0 !== 0 && num <= limitNum) {
        var regNum = /^\d+$/g;
        return regNum.test(num);
      } else {
        return false;
      }
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
        if (this[this.linTabData].sel.full_time !== undefined) {
          if (this[this.linTabData].sel.full_time === '' || this[this.linTabData].sel.full_time === null) {
            this[this.linTabData].sel.start_time = '';
            this[this.linTabData].sel.end_time = '';
          } else {
            this[this.linTabData].sel.start_time = this[this.linTabData].sel.full_time[0];
            this[this.linTabData].sel.end_time = this[this.linTabData].sel.full_time[1];
          }
        }
        lin = assign_default()({}, lin, this[this.linTabData].sel);
      }
      this.$axios.get(this[this.linTabData].url, { params: lin }).then(function (data) {
        // 根据后台接口更改
        var tableDate = data.data.data.project_list;
        // 数据处理
        _this[_this.linTabData].msg = [].concat(toConsumableArray_default()(tableDate));
        // 重置数据总数
        if (_this[_this.linTabData].Pagination !== undefined) {
          _this[_this.linTabData].Pagination.total_count = data.data.data.total_count;
        }
        _this[_this.linTabData].loading = false;
      });
    },
    setResource: function setResource(id) {
      this.$emit('setResource', id);
    },
    editBasis: function editBasis() {
      this.basis.disabled = false;
    },
    saveBasis: function saveBasis() {
      var _this2 = this;

      if (this.basis.valided) {
        var params = {};
        params.type = 'BasicConfig';
        params.data = {};
        params.data.language = this.basis.content.languages;
        params.data.per_page = this.basis.content.page_num;
        params.data.manage_project_num = this.basis.content.user_create_num;
        this.$post('/system/systemsetting', params).then(function (data) {
          _this2.basis.disabled = true;
          if (data.code === 200) {
            _this2.$message({ message: '保存成功', type: 'success' });
          } else {
            _this2.$message({ message: data.message, type: 'warning' });
          }
        });
      }
    },
    editMirror: function editMirror() {
      this.mirror.disabled = false;
    },
    saveMirror: function saveMirror() {
      var _this3 = this;

      if (this.mirror.valided) {
        var params = {};
        params.type = 'ImageConfig';
        params.data = {};
        params.data.project_image_num = this.mirror.content.project_image_num;
        params.data.personal_image_num = this.mirror.content.personal_image_num;
        this.$post('/system/systemsetting', params).then(function (data) {
          _this3.mirror.disabled = true;
          if (data.code === 200) {
            _this3.$message({ message: '保存成功', type: 'success' });
          } else {
            _this3.$message({ message: data.message, type: 'warning' });
          }
        });
      }
    },
    editPersonal: function editPersonal() {
      this.personal.disabled = false;
    },
    savePersonal: function savePersonal() {
      var _this4 = this;

      if (this.personal.valided) {
        var params = {};
        params.type = 'PersonalResourceConfig';
        params.data = {};
        params.data.cpu = this.personal.content.cpu;
        params.data.memory = this.personal.content.memory;
        this.$post('/system/systemsetting', params).then(function (data) {
          _this4.personal.disabled = true;
          if (data.code === 200) {
            _this4.$message({ message: '保存成功', type: 'success' });
          } else {
            _this4.$message({ message: data.message, type: 'warning' });
          }
        });
      }
    },
    editStorage: function editStorage() {
      this.storage.disabled = false;
    },
    saveStorage: function saveStorage() {
      var _this5 = this;

      if (this.storage.valided) {
        var params = {};
        params.type = 'StorageConfig';
        params.data = {};
        params.data.project_storage = this.storage.content.project_storage_size;
        params.data.project_num = this.storage.content.project_storage_num;
        params.data.personal_storage = this.storage.content.personal_storage_size;
        params.data.personal_num = this.storage.content.personal_storage_num;
        this.$post('/system/systemsetting', params).then(function (data) {
          _this5.storage.disabled = true;
          if (data.code === 200) {
            _this5.$message({ message: '保存成功', type: 'success' });
          } else {
            _this5.$message({ message: data.message, type: 'warning' });
          }
        });
      }
    }
  },
  mounted: function mounted() {
    var _this6 = this;

    this.getActiveTab('tableData3');
    this.$get('/system/systemconfig').then(function (data) {
      _this6.basis.content.languages = data.data.base_setting.language;
      _this6.basis.content.user_create_num = data.data.base_setting.manage_project_num;
      _this6.basis.content.page_num = data.data.base_setting.per_page;
      _this6.mirror.content = extends_default()({}, data.data.images_setting);
      _this6.personal.content = extends_default()({}, data.data.person_space_setting);
      _this6.storage.content.project_storage_size = data.data.storage_param_setting.project_storage;
      _this6.storage.content.project_storage_num = data.data.storage_param_setting.project_num;
      _this6.storage.content.personal_storage_size = data.data.storage_param_setting.personal_storage;
      _this6.storage.content.personal_storage_num = data.data.storage_param_setting.personal_num;
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7ab89df5","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/systemManagement/components/quotaSetting.vue
var quotaSetting_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"quota-title"},[_c('div',{staticClass:"item"},[_c('p',{staticClass:"item-top"},[_vm._v("\n        "+_vm._s(_vm.$t("views.systemManagement.basicSettings"))+"\n      ")]),_vm._v(" "),_c('div',{staticClass:"content"},[_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.language")))]),_vm._v(" "),_c('el-select',{attrs:{"disabled":_vm.basis.disabled===true,"placeholder":_vm.$t("views.systemManagement.chose")},model:{value:(_vm.basis.content.languages),callback:function ($$v) {_vm.$set(_vm.basis.content, "languages", $$v)},expression:"basis.content.languages"}},_vm._l((_vm.languageList),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.basis.errorStr.languages))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.systemSetting.p5")))]),_vm._v(" "),_c('el-input',{attrs:{"disabled":_vm.basis.disabled===true,"placeholder":"请输入内容"},on:{"blur":function($event){_vm.viladInput("basis.content.page_num", "basis.errorStr.page_num", 100)}},model:{value:(_vm.basis.content.page_num),callback:function ($$v) {_vm.$set(_vm.basis.content, "page_num", $$v)},expression:"basis.content.page_num"}}),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.basis.errorStr.page_num))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.systemSetting.p6")))]),_vm._v(" "),_c('el-input',{attrs:{"disabled":_vm.basis.disabled===true,"placeholder":"请输入内容"},on:{"blur":function($event){_vm.viladInput("basis.content.user_create_num", "basis.errorStr.user_create_num", 10)}},model:{value:(_vm.basis.content.user_create_num),callback:function ($$v) {_vm.$set(_vm.basis.content, "user_create_num", $$v)},expression:"basis.content.user_create_num"}}),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.basis.errorStr.user_create_num))])],1),_vm._v(" "),_c('div',{staticClass:"controls"},[(_vm.basis.disabled===true)?_c('el-button',{staticClass:"btn dark small",on:{"click":_vm.editBasis}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.modify")))]):_vm._e(),_vm._v(" "),(_vm.basis.disabled===false)?_c('el-button',{staticClass:"btn dark small",on:{"click":_vm.saveBasis}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.save")))]):_vm._e()],1)]),_vm._v(" "),_c('div',{staticClass:"item"},[_c('p',{staticClass:"item-top"},[_vm._v("\n        "+_vm._s(_vm.$t("views.systemManagement.mirrorParameterSetting"))+"\n      ")]),_vm._v(" "),_c('div',{staticClass:"content"},[_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.systemSetting.p7")))]),_vm._v(" "),_c('el-input',{attrs:{"disabled":_vm.mirror.disabled===true,"placeholder":"请输入内容"},on:{"blur":function($event){_vm.viladInput("mirror.content.project_image_num", "mirror.errorStr.project_image_num", 100)}},model:{value:(_vm.mirror.content.project_image_num),callback:function ($$v) {_vm.$set(_vm.mirror.content, "project_image_num", $$v)},expression:"mirror.content.project_image_num"}}),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.mirror.errorStr.project_image_num))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.systemSetting.p8")))]),_vm._v(" "),_c('el-input',{attrs:{"disabled":_vm.mirror.disabled===true,"placeholder":"请输入内容"},on:{"blur":function($event){_vm.viladInput("mirror.content.personal_image_num", "mirror.errorStr.personal_image_num", 100)}},model:{value:(_vm.mirror.content.personal_image_num),callback:function ($$v) {_vm.$set(_vm.mirror.content, "personal_image_num", $$v)},expression:"mirror.content.personal_image_num"}}),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.mirror.errorStr.personal_image_num))])],1),_vm._v(" "),_c('div',{staticClass:"controls"},[(_vm.mirror.disabled===true)?_c('el-button',{staticClass:"btn dark small",on:{"click":_vm.editMirror}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.modify")))]):_vm._e(),_vm._v(" "),(_vm.mirror.disabled===false)?_c('el-button',{staticClass:"btn dark small",on:{"click":_vm.saveMirror}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.save")))]):_vm._e()],1)]),_vm._v(" "),_c('div',{staticClass:"item"},[_c('p',{staticClass:"item-top"},[_vm._v("\n        "+_vm._s(_vm.$t("views.systemManagement.personalSpaceResourceQuota"))+"\n      ")]),_vm._v(" "),_c('div',{staticClass:"content"},[_c('p',[_vm._v("CPU")]),_vm._v(" "),_c('el-input',{attrs:{"disabled":_vm.personal.disabled===true,"placeholder":"请输入内容"},on:{"blur":function($event){_vm.viladInput("personal.content.cpu", "personal.errorStr.cpu", 48)}},model:{value:(_vm.personal.content.cpu),callback:function ($$v) {_vm.$set(_vm.personal.content, "cpu", $$v)},expression:"personal.content.cpu"}},[_c('template',{slot:"append"},[_vm._v("个")])],2),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.personal.errorStr.cpu))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.RAM")))]),_vm._v(" "),_c('el-input',{attrs:{"disabled":_vm.personal.disabled===true,"placeholder":"请输入内容"},on:{"blur":function($event){_vm.viladInput("personal.content.memory", "personal.errorStr.memory", 128)}},model:{value:(_vm.personal.content.memory),callback:function ($$v) {_vm.$set(_vm.personal.content, "memory", $$v)},expression:"personal.content.memory"}},[_c('template',{slot:"append"},[_vm._v("G")])],2),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.personal.errorStr.memory))]),_vm._v(" "),_c('p',[_vm._v("GPU")]),_vm._v(" "),_c('el-input',{attrs:{"disabled":true,"placeholder":"请输入内容"},model:{value:(_vm.personal.content.gpu),callback:function ($$v) {_vm.$set(_vm.personal.content, "gpu", $$v)},expression:"personal.content.gpu"}},[_c('template',{slot:"append"},[_vm._v("个")])],2),_vm._v(" "),_c('span',{staticClass:"error"})],1),_vm._v(" "),_c('div',{staticClass:"controls"},[(_vm.personal.disabled===true)?_c('el-button',{staticClass:"btn dark small",on:{"click":_vm.editPersonal}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.modify")))]):_vm._e(),_vm._v(" "),(_vm.personal.disabled===false)?_c('el-button',{staticClass:"btn dark small",on:{"click":_vm.savePersonal}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.save")))]):_vm._e()],1)]),_vm._v(" "),_c('div',{staticClass:"item else"},[_c('p',{staticClass:"item-top"},[_vm._v("\n        "+_vm._s(_vm.$t("views.systemManagement.storageSpaceParameterSetting"))+"\n      ")]),_vm._v(" "),_c('div',{staticClass:"content"},[_c('div',{staticClass:"group"},[_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.systemSetting.p9")))]),_vm._v(" "),_c('div',{staticClass:"group-content"},[_c('div',{staticClass:"group-content-item"},[_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.systemSetting.p10")))]),_vm._v(" "),_c('el-input',{attrs:{"disabled":_vm.storage.disabled===true,"placeholder":"请输入内容"},on:{"blur":function($event){_vm.viladInput("storage.content.project_storage_size", "storage.errorStr.project_storage_size", 1024)}},model:{value:(_vm.storage.content.project_storage_size),callback:function ($$v) {_vm.$set(_vm.storage.content, "project_storage_size", $$v)},expression:"storage.content.project_storage_size"}},[_c('template',{slot:"append"},[_vm._v("G")])],2),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.storage.errorStr.project_storage_size))])],1),_vm._v(" "),_c('div',{staticClass:"group-content-item"},[_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.count")))]),_vm._v(" "),_c('el-input',{attrs:{"disabled":_vm.storage.disabled===true,"placeholder":"请输入内容"},on:{"blur":function($event){_vm.viladInput("storage.content.project_storage_num", "storage.errorStr.project_storage_num", 20)}},model:{value:(_vm.storage.content.project_storage_num),callback:function ($$v) {_vm.$set(_vm.storage.content, "project_storage_num", $$v)},expression:"storage.content.project_storage_num"}}),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.storage.errorStr.project_storage_num))])],1)])]),_vm._v(" "),_c('div',{staticClass:"group"},[_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.systemSetting.p11")))]),_vm._v(" "),_c('div',{staticClass:"group-content"},[_c('div',{staticClass:"group-content-item"},[_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.systemSetting.p10")))]),_vm._v(" "),_c('el-input',{attrs:{"disabled":_vm.storage.disabled===true,"placeholder":"请输入内容"},on:{"blur":function($event){_vm.viladInput("storage.content.personal_storage_size", "storage.errorStr.personal_storage_size", 512)}},model:{value:(_vm.storage.content.personal_storage_size),callback:function ($$v) {_vm.$set(_vm.storage.content, "personal_storage_size", $$v)},expression:"storage.content.personal_storage_size"}},[_c('template',{slot:"append"},[_vm._v("G")])],2),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.storage.errorStr.personal_storage_size))])],1),_vm._v(" "),_c('div',{staticClass:"group-content-item"},[_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.count")))]),_vm._v(" "),_c('el-input',{attrs:{"disabled":_vm.storage.disabled===true,"placeholder":"请输入内容"},on:{"blur":function($event){_vm.viladInput("storage.content.personal_storage_num", "storage.errorStr.personal_storage_num", 20)}},model:{value:(_vm.storage.content.personal_storage_num),callback:function ($$v) {_vm.$set(_vm.storage.content, "personal_storage_num", $$v)},expression:"storage.content.personal_storage_num"}}),_vm._v(" "),_c('span',{staticClass:"error"},[_vm._v(_vm._s(_vm.storage.errorStr.personal_storage_num))])],1)])])]),_vm._v(" "),_c('div',{staticClass:"controls"},[(_vm.storage.disabled===true)?_c('el-button',{staticClass:"btn dark small",on:{"click":_vm.editStorage}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.modify")))]):_vm._e(),_vm._v(" "),(_vm.storage.disabled===false)?_c('el-button',{staticClass:"btn dark small",on:{"click":_vm.saveStorage}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.save")))]):_vm._e()],1)])]),_vm._v(" "),_c('div',{staticClass:"quota-content"},[_c('p',[_vm._v(_vm._s(_vm.$t("views.systemManagement.projectQuotaAdjustment")))]),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData3.loading),expression:"tableData3.loading"}],staticClass:"tab-content",attrs:{"data":_vm.tableData3.msg,"border":""}},[_c('el-table-column',{attrs:{"type":"index","label":_vm.$t("views.systemManagement.serialNumber"),"align":"center","width":"50"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"project_name","label":_vm.$t("views.systemManagement.projectName")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_user","label":_vm.$t("views.systemManagement.user")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"create_time","align":"center","width":"200","label":_vm.$t("views.systemManagement.creationTime")}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"project_description","label":_vm.$t("views.systemManagement.projectDescription")}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.systemManagement.operating"),"align":"center","width":"140"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('button',{staticClass:"btn",on:{"click":function($event){_vm.setResource(scope.row.project_id)}}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.setResourceQuota")))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.tableData3.Pagination.page,"total":_vm.tableData3.Pagination.total_count},on:{"update:currentPage":function($event){_vm.$set(_vm.tableData3.Pagination, "page", $event)},"current-change":function($event){_vm.changePage('tableData3')}}})],1)])}
var quotaSetting_staticRenderFns = []
var quotaSetting_esExports = { render: quotaSetting_render, staticRenderFns: quotaSetting_staticRenderFns }
/* harmony default export */ var components_quotaSetting = (quotaSetting_esExports);
// CONCATENATED MODULE: ./src/views/systemManagement/components/quotaSetting.vue
var quotaSetting_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var quotaSetting___vue_template_functional__ = false
/* styles */
var quotaSetting___vue_styles__ = null
/* scopeId */
var quotaSetting___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var quotaSetting___vue_module_identifier__ = null
var quotaSetting_Component = quotaSetting_normalizeComponent(
  quotaSetting,
  components_quotaSetting,
  quotaSetting___vue_template_functional__,
  quotaSetting___vue_styles__,
  quotaSetting___vue_scopeId__,
  quotaSetting___vue_module_identifier__
)

/* harmony default export */ var systemManagement_components_quotaSetting = (quotaSetting_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/systemManagement/systemSetting.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var systemSetting = ({
  name: 'systemSetting',
  data: function data() {
    var _this = this;

    var checkCPU = function checkCPU(rule, value, callback) {
      if (!value) {
        return callback(new Error('输入不能为空'));
      }
      if (_this.limitInt(value, 128)) {
        callback();
      } else {
        callback(new Error('请输入1~128的整数'));
      }
    };
    var checkGPU = function checkGPU(rule, value, callback) {
      if (!value) {
        return callback(new Error('输入不能为空'));
      }
      if (_this.limitInt(value, 16)) {
        callback();
      } else {
        callback(new Error('请输入1~256的整数'));
      }
    };
    var checkMemory = function checkMemory(rule, value, callback) {
      if (!value) {
        return callback(new Error('输入不能为空'));
      }
      if (_this.limitInt(value, 256)) {
        callback();
      } else {
        callback(new Error('请输入1~16的整数'));
      }
    };
    return {
      parentActiveName: 'diskManagement', // 外面当前激活页
      resourceForm: {
        CPU: '',
        GPU: '',
        memory: ''
      },
      resourceFormRules: {
        CPU: [{ validator: checkCPU, trigger: 'blur', required: true }],
        GPU: [{ validator: checkGPU, trigger: 'blur', required: true }],
        memory: [{ validator: checkMemory, trigger: 'blur', required: true }]
      },
      logTime: [],
      logTimeMsg: '',
      diskCleaningPop: false,
      diskCleaningPopMsg: {
        node_id: '',
        clear_time: ''
      },
      setResourcePop: false,
      setResourcePopMsg: {
        project_id: '',
        quota_id: ''
      }
    };
  },

  methods: {
    diskCleaning: function diskCleaning(id) {
      this.diskCleaningPopMsg.clear_time = '';
      this.diskCleaningPopMsg.node_id = id;
      this.diskCleaningPop = true;
    },
    diskCleaningPopDo: function diskCleaningPopDo() {
      var _this2 = this;

      this.$axios.post('/clear-disk', this.diskCleaningPopMsg).then(function (data) {
        _this2.diskCleaningPop = false;
      });
    },
    setResource: function setResource(id) {
      this.setResourcePopMsg.project_id = id;
      this.setResourcePopMsg.quota_id = '';
      this.setResourcePop = true;
    },

    // 整数判断
    limitInt: function limitInt(num, limitNum) {
      if (num - 0 !== 0 && num <= limitNum) {
        var regNum = /^\d+$/g;
        return regNum.test(num);
      } else {
        return false;
      }
    },
    setResourcePopDo: function setResourcePopDo() {
      var _this3 = this;

      this.$axios.post('//rap2api.taobao.org/app/mock/21549/systemManagement/systemSetting/quotaSetting/change', this.setResourcePopMsg).then(function (data) {
        _this3.$message({ message: '设置成功', type: 'success' });
        _this3.setResourcePop = false;
      });
    },
    saveLogTime: function saveLogTime() {
      var _this4 = this;

      this.$axios.post('//rap2api.taobao.org/app/mock/21549/log-sys-setting', { month_nunber: this.logTimeMsg }).then(function (data) {
        _this4.$message({ message: '保存成功', type: 'success' });
      });
    }
  },
  components: { diskManagement: systemManagement_components_diskManagement, quotaSetting: systemManagement_components_quotaSetting },
  created: function created() {
    var _this5 = this;

    this.$axios.get('//rap2api.taobao.org/app/mock/21549/log-sys-setting').then(function (data) {
      _this5.logTime = [].concat(toConsumableArray_default()(data.data.data.select_month));
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-63f4465a","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/systemManagement/systemSetting.vue
var systemSetting_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-system-management-system-setting"},[_c('el-tabs',{model:{value:(_vm.parentActiveName),callback:function ($$v) {_vm.parentActiveName=$$v},expression:"parentActiveName"}},[_c('el-tab-pane',{attrs:{"label":_vm.$t("views.systemManagement.diskManagementSettings"),"name":"diskManagement"}},[_c('disk-management',{on:{"diskCleaning":_vm.diskCleaning}})],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":_vm.$t("views.systemManagement.systemLogSettings"),"name":"logSetting","lazy":true}},[_c('div',{staticClass:"log-title"},[_vm._v("\n        "+_vm._s(_vm.$t("views.systemManagement.systemLogSettings"))+"："+_vm._s(_vm.$t("views.systemManagement.systemSetting.p3"))+"\n        "),_c('el-select',{attrs:{"clearable":"","filterable":"","placeholder":_vm.$t("views.systemManagement.chose")},model:{value:(_vm.logTimeMsg),callback:function ($$v) {_vm.logTimeMsg=$$v},expression:"logTimeMsg"}},_vm._l((_vm.logTime),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v("\n        "+_vm._s(_vm.$t("views.systemManagement.systemSetting.p4"))+"\n        "),_c('el-button',{staticClass:"btn dark small",on:{"click":_vm.saveLogTime}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.save")))])],1)]),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":_vm.$t("views.systemManagement.systemConfigurationSettings"),"name":"quotaSetting","lazy":true}},[_c('quota-setting',{on:{"setResource":_vm.setResource}})],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"diskCleaningPop small",attrs:{"title":_vm.$t("views.systemManagement.diskCleaning"),"visible":_vm.diskCleaningPop,"width":"30%"},on:{"update:visible":function($event){_vm.diskCleaningPop=$event}}},[_c('div',{staticClass:"content"},[_vm._v("\n      "+_vm._s(_vm.$t("views.systemManagement.clean"))+"\n      "),_c('el-date-picker',{attrs:{"type":"date","placeholder":_vm.$t("views.systemManagement.chose")},model:{value:(_vm.diskCleaningPopMsg.clear_time),callback:function ($$v) {_vm.$set(_vm.diskCleaningPopMsg, "clear_time", $$v)},expression:"diskCleaningPopMsg.clear_time"}}),_vm._v("\n      "+_vm._s(_vm.$t("views.systemManagement.systemSetting.p12"))+"\n    ")],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.diskCleaningPop = false}}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.cancel")))]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.diskCleaningPopDo}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.start")))])],1)]),_vm._v(" "),_c('el-dialog',{staticClass:"small",attrs:{"title":_vm.$t("views.systemManagement.setResourceQuota"),"visible":_vm.setResourcePop,"width":"50%"},on:{"update:visible":function($event){_vm.setResourcePop=$event}}},[_c('div',{staticClass:"content"},[_c('el-form',{ref:"resourceForm",attrs:{"model":_vm.resourceForm,"rules":_vm.resourceFormRules,"label-width":"80px"}},[_c('el-form-item',{attrs:{"label":"CPU","prop":"CPU"}},[_c('el-input',{attrs:{"placeholder":"请输入100以内的数字"},model:{value:(_vm.resourceForm.CPU),callback:function ($$v) {_vm.$set(_vm.resourceForm, "CPU", $$v)},expression:"resourceForm.CPU"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"内存","prop":"memory"}},[_c('el-input',{attrs:{"placeholder":"请输入256以内的数字"},model:{value:(_vm.resourceForm.memory),callback:function ($$v) {_vm.$set(_vm.resourceForm, "memory", $$v)},expression:"resourceForm.memory"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"GPU","prop":"GPU"}},[_c('el-input',{attrs:{"placeholder":"请输入10以内的数字"},model:{value:(_vm.resourceForm.GPU),callback:function ($$v) {_vm.$set(_vm.resourceForm, "GPU", $$v)},expression:"resourceForm.GPU"}})],1)],1)],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.setResourcePop = false}}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.cancel")))]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.setResourcePopDo}},[_vm._v(_vm._s(_vm.$t("views.systemManagement.save")))])],1)])],1)}
var systemSetting_staticRenderFns = []
var systemSetting_esExports = { render: systemSetting_render, staticRenderFns: systemSetting_staticRenderFns }
/* harmony default export */ var systemManagement_systemSetting = (systemSetting_esExports);
// CONCATENATED MODULE: ./src/views/systemManagement/systemSetting.vue
var systemSetting_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var systemSetting___vue_template_functional__ = false
/* styles */
var systemSetting___vue_styles__ = null
/* scopeId */
var systemSetting___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var systemSetting___vue_module_identifier__ = null
var systemSetting_Component = systemSetting_normalizeComponent(
  systemSetting,
  systemManagement_systemSetting,
  systemSetting___vue_template_functional__,
  systemSetting___vue_styles__,
  systemSetting___vue_scopeId__,
  systemSetting___vue_module_identifier__
)

/* harmony default export */ var views_systemManagement_systemSetting = __webpack_exports__["default"] = (systemSetting_Component.exports);


/***/ })

});