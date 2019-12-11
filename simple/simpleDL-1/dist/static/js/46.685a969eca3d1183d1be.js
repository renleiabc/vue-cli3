webpackJsonp([46],{

/***/ "tQcI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./src/views/imageManagement/imageDetail.vue + 2 modules
var imageDetail = __webpack_require__("dclA");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/imageManagement/components/shareProjectImage.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var shareProjectImage = ({
  name: 'shareProjectImage',
  props: {
    selImageId: {
      type: Number,
      default: 0
    },
    openDialog: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      pageSize: 10,
      selectImage: [],
      tableData: { // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/project/myproject',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          name: ''
        }
      }
    };
  },
  mounted: function mounted() {
    // 每有一个表格就要写个初始化赋值
    this.selectImage.id = this.selImageId;
    this.getActiveTab('tableData');
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
        var tableDate = data.data.data.project_space;
        // 数据处理
        _this[_this.linTabData].msg = [].concat(toConsumableArray_default()(tableDate));
        // 重置数据总数
        if (_this[_this.linTabData].Pagination !== undefined) {
          _this[_this.linTabData].Pagination.total_count = data.data.data.total_count;
        }
        _this[_this.linTabData].loading = false;
      });
    },
    handleSelectionChange: function handleSelectionChange(rows) {
      var _this2 = this;

      this.selectImage = [];
      if (rows) {
        rows.forEach(function (row) {
          _this2.selectImage.push(row.id);
        });
      }
    },
    handleClose: function handleClose() {
      this.$parent.selProjectDialog = false;
    },
    selectImages: function selectImages() {
      this.$emit('selectImage', this.selectImage);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0cca39cd","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/imageManagement/components/shareProjectImage.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-dialog',{staticClass:"big shareSelectDialog",attrs:{"title":"选择共享项目空间","before-close":_vm.handleClose,"visible":_vm.openDialog},on:{"update:visible":function($event){_vm.openDialog=$event}}},[_c('div',{staticClass:"image-sel"},[_c('div',{staticClass:"query-v"},[_c('span',[_vm._v("项目名称")]),_vm._v(" "),_c('el-input',{attrs:{"size":"small"},model:{value:(_vm.tableData.sel.name),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "name", $$v)},expression:"tableData.sel.name"}}),_vm._v(" "),_c('el-button',{staticClass:"views-btn-query",on:{"click":function($event){_vm.doSearch('tableData')}}},[_vm._v("查询")])],1)]),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData.loading),expression:"tableData.loading"}],staticClass:"tab-content",staticStyle:{"margin-top":"12px"},attrs:{"data":_vm.tableData.msg,"border":""},on:{"selection-change":_vm.handleSelectionChange}},[_c('el-table-column',{attrs:{"type":"selection","align":"center","width":"55"}}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"name","label":"项目名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"created_at","align":"center","width":"180","label":"创建时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"describe","label":"项目描述"}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.tableData.Pagination.page,"total":_vm.tableData.Pagination.total_count},on:{"update:currentPage":function($event){_vm.$set(_vm.tableData.Pagination, "page", $event)},"current-change":function($event){_vm.changePage('tableData')}}}),_vm._v(" "),_c('span',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":_vm.handleClose}},[_vm._v(_vm._s(_vm.$t('views.button.cancel')))]),_vm._v(" "),_c('el-button',{staticClass:"btn dark",on:{"click":_vm.selectImages}},[_vm._v(_vm._s(_vm.$t('views.button.sure')))])],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_shareProjectImage = (esExports);
// CONCATENATED MODULE: ./src/views/imageManagement/components/shareProjectImage.vue
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
  shareProjectImage,
  components_shareProjectImage,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var imageManagement_components_shareProjectImage = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/imageManagement/personalImage.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var personalImage = ({
  name: 'objectImage',
  components: {
    shareProjectImage: imageManagement_components_shareProjectImage,
    ImageDetail: imageDetail["a" /* default */]
  },
  data: function data() {
    return {
      selProjectDialog: false,
      pickerOptions: {
        shortcuts: [{
          text: this.$t('views.imageManagement.recentOneWeek'),
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$t('views.imageManagement.recentOneMonth'),
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: this.$t('views.imageManagement.recentThreeMonth'),
          onClick: function onClick(picker) {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      imageTypeOptions: [],
      imageStatusOptions: [{
        value: 1,
        label: '未生成'
      }, {
        value: 2,
        label: '可用'
      }, {
        value: 3,
        label: '停用'
      }],
      pageSize: 10,
      shareType: 1,
      detailDialogVisible: false,
      shareImageDialog: false,
      detailData: {},
      multipleSelection: [],
      tableData: { // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/image/imagelist',
        loading: false,
        Pagination: {
          page: 1,
          total_count: 1
        },
        sel: {
          is_init: 0,
          name: '',
          category: '',
          // image_status: '',
          full_date: '',
          start_time: '',
          end_time: ''
        }
      },
      imageId: ''
    };
  },
  created: function created() {
    var _this = this;

    this.initMsg();
    this.$post('/image/imagecategorylist', { is_init: this.tableData.sel.is_init }).then(function (res) {
      if (res.code === 200) {
        _this.imageTypeOptions = res.data.category;
      }
    });
  },

  methods: {
    // 镜像保存类型
    shareSaveType: function shareSaveType() {
      var _this2 = this;

      this.shareImageDialog = false;
      setTimeout(function () {
        if (_this2.shareType === 1) {
          _this2.mixinConfirm('/image/imageshare', { image_id: _this2.shareImageId, is_init: 1 }, '将此镜像共享到公共镜像库？').then(function (res) {
            if (res) {
              _this2.initMsg();
            }
          });
        } else {
          _this2.selProjectDialog = true;
        }
      }, 200);
    },
    selectImage: function selectImage(arrSel) {
      var _this3 = this;

      console.log(arrSel);
      if (arrSel.length > 0) {
        this.$post('/image/imageshare', { image_id: this.shareImageId, is_init: 2, project_id: arrSel }).then(function (res) {
          if (res.code === 200) {
            _this3.selProjectDialog = false;
          } else {
            _this3.$message({
              type: 'error',
              message: res.message
            });
          }
        });
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('views.dialogText.selectNull')
        });
      }
    },
    handleDetail: function handleDetail(index, row) {
      this.detailDialogVisible = true;
      this.detailData = row;
    },
    handleSelectionChange: function handleSelectionChange(rows) {
      var _this4 = this;

      this.multipleSelection = [];
      if (rows) {
        rows.forEach(function (val, index, rows) {
          _this4.multipleSelection.push(val.id);
        });
      }
      this.multipleSelection = [].concat(toConsumableArray_default()(this.multipleSelection));
    },
    deleteMulImage: function deleteMulImage() {
      if (this.multipleSelection.length) {
        this.deleteRequest(this.multipleSelection);
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('views.dialogText.selectNull')
        });
      }
    },
    deleteSingleImage: function deleteSingleImage(id) {
      this.deleteRequest([id]);
    },
    clearSearch: function clearSearch() {
      for (var key in this.tableData.sel) {
        this.tableData.sel[key] = '';
        this.tableData.sel.is_init = 0;
      }
      if (this.tableData.Pagination !== undefined) {
        this.tableData.Pagination.page = 1;
      }
      this.initMsg();
    },
    initMsg: function initMsg() {
      var _this5 = this;

      this.tableData.loading = true;
      var lin = {};
      if (this.tableData.Pagination !== undefined) {
        lin = { // 对象合并，也属于深度拷贝，只复制值，不改变原数据
          count: this.pageSize,
          page: this.tableData.Pagination.page
        };
      }
      if (this.tableData.sel !== undefined) {
        if (this.tableData.sel.full_date && this.tableData.sel.full_date.length === 2) {
          this.tableData.sel.start_time = this.tableData.sel.full_date[0] + ' 00:00:00';
          this.tableData.sel.end_time = this.tableData.sel.full_date[1] + ' 23:59:59';
        } else {
          this.tableData.sel.start_time = '';
          this.tableData.sel.end_time = '';
        }
        lin = assign_default()({}, lin, this.tableData.sel);
      }
      this.$get(this.tableData.url, lin).then(function (res) {
        // 根据后台接口更改
        var tableDate = res.data.image_list;
        // 数据处理
        _this5.tableData.msg = [].concat(toConsumableArray_default()(tableDate)); // 深度拷贝
        // 重置数据总数
        if (_this5.tableData.Pagination !== undefined) {
          _this5.tableData.Pagination.total_count = res.data.total_count;
        }
        _this5.tableData.loading = false;
      });
    },
    deleteRequest: function deleteRequest(id) {
      var _this6 = this;

      this.mixinConfirm('/image/imagedelete', { image_id: id }).then(function (res) {
        if (res) {
          _this6.initMsg();
        }
      });
    },
    shareImage: function shareImage(id) {
      this.shareImageDialog = true;
      this.shareImageId = id;
    },
    changeImage: function changeImage(id) {
      if (isNaN(id)) {
        this.imageId = '';
        this.$router.push({ name: 'editImage', query: { is_init: 0 } });
      } else {
        this.imageId = id;
        this.$router.push({ name: 'editImage', query: { imageId: id, is_init: 0 } });
      }
    }
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    if (to.name === 'editImage') {
      if (this.imageId === '') {
        to.meta.title = 'views.nav.addImage';
      } else {
        to.meta.title = 'views.nav.editImage';
      }
    }
    next();
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5974667e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/imageManagement/personalImage.vue
var personalImage_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-personal-image-manage"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.imageManagement.mirrorName")))]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":_vm.$t('views.imageManagement.enter')},model:{value:(_vm.tableData.sel.name),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "name", $$v)},expression:"tableData.sel.name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.imageManagement.creationTime")))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","align":"right","unlink-panels":"","value-format":"yyyy-MM-dd","range-separator":"-","start-placeholder":_vm.$t('views.imageManagement.beginTime'),"end-placeholder":_vm.$t('views.imageManagement.endTime'),"picker-options":_vm.pickerOptions},model:{value:(_vm.tableData.sel.full_date),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "full_date", $$v)},expression:"tableData.sel.full_date"}})],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.initMsg()}}},[_vm._v(_vm._s(_vm.$t("views.imageManagement.select")))])],1)]),_vm._v(" "),_c('div',{staticClass:"controls-else"},[_c('el-button',{staticClass:"btn dark mid",on:{"click":function($event){_vm.changeImage()}}},[_vm._v("\n      "+_vm._s(_vm.$t("views.imageManagement.createMirror"))+"\n    ")])],1),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData.loading),expression:"tableData.loading"}],staticClass:"tab-content",staticStyle:{"margin-top":"10px"},attrs:{"data":_vm.tableData.msg,"border":""},on:{"selection-change":_vm.handleSelectionChange}},[_c('el-table-column',{attrs:{"type":"selection","width":"55","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.imageManagement.mirrorName')},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('a',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleDetail(scope.$index, scope.row)}}},[_vm._v(_vm._s(scope.row.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","label":_vm.$t('views.imageManagement.creationTime'),"width":"200px","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"imageCategory.name","label":_vm.$t('views.imageManagement.mirrorClassification')}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"describe","label":_vm.$t('views.imageManagement.mirrorDescription')}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.imageManagement.operating'),"width":"150px","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('button',{staticClass:"btn",on:{"click":function($event){_vm.changeImage(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t("views.imageManagement.modify")))]),_vm._v(" "),_c('button',{staticClass:"del",on:{"click":function($event){_vm.deleteSingleImage(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t("views.imageManagement.delete")))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.tableData.Pagination.page,"total":_vm.tableData.Pagination.total_count},on:{"update:currentPage":function($event){_vm.$set(_vm.tableData.Pagination, "page", $event)},"current-change":function($event){_vm.initMsg()}}}),_vm._v(" "),_c('el-dialog',{attrs:{"title":_vm.$t('views.imageManagement.mirrorDetails'),"visible":_vm.detailDialogVisible},on:{"update:visible":function($event){_vm.detailDialogVisible=$event}}},[_c('image-detail',{attrs:{"detailData":_vm.detailData}}),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":function($event){_vm.detailDialogVisible = false}}},[_vm._v(_vm._s(_vm.$t('views.imageManagement.close')))])],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"small",attrs:{"title":"选择共享位置","visible":_vm.shareImageDialog},on:{"update:visible":function($event){_vm.shareImageDialog=$event}}},[_c('div',{staticClass:"share-dialog"},[_c('p',{staticStyle:{"line-height":"200%"}},[_vm._v("将此镜像共享到：")]),_vm._v(" "),_c('el-row',[_c('el-radio',{attrs:{"label":1},model:{value:(_vm.shareType),callback:function ($$v) {_vm.shareType=$$v},expression:"shareType"}},[_vm._v("公共镜像")])],1),_vm._v(" "),_c('el-row',[_c('el-radio',{attrs:{"label":2},model:{value:(_vm.shareType),callback:function ($$v) {_vm.shareType=$$v},expression:"shareType"}},[_vm._v("项目镜像")])],1)],1),_vm._v(" "),_c('span',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.shareImageDialog=false}}},[_vm._v(_vm._s(_vm.$t('views.button.cancel')))]),_vm._v(" "),_c('el-button',{staticClass:"btn dark",on:{"click":_vm.shareSaveType}},[_vm._v(_vm._s(_vm.$t('views.button.sure')))])],1)]),_vm._v(" "),_c('shareProjectImage',{attrs:{"openDialog":_vm.selProjectDialog},on:{"update:openDialog":function($event){_vm.selProjectDialog=$event},"selectImage":_vm.selectImage}})],1)}
var personalImage_staticRenderFns = []
var personalImage_esExports = { render: personalImage_render, staticRenderFns: personalImage_staticRenderFns }
/* harmony default export */ var imageManagement_personalImage = (personalImage_esExports);
// CONCATENATED MODULE: ./src/views/imageManagement/personalImage.vue
var personalImage_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var personalImage___vue_template_functional__ = false
/* styles */
var personalImage___vue_styles__ = null
/* scopeId */
var personalImage___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var personalImage___vue_module_identifier__ = null
var personalImage_Component = personalImage_normalizeComponent(
  personalImage,
  imageManagement_personalImage,
  personalImage___vue_template_functional__,
  personalImage___vue_styles__,
  personalImage___vue_scopeId__,
  personalImage___vue_module_identifier__
)

/* harmony default export */ var views_imageManagement_personalImage = __webpack_exports__["default"] = (personalImage_Component.exports);


/***/ })

});