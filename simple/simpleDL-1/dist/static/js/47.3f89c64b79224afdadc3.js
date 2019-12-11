webpackJsonp([47],{

/***/ "vKWT":
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

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/imageManagement/objectImage.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var objectImage = ({
  name: 'objectImage',
  data: function data() {
    return {
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
      detailDialogVisible: false,
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
          is_init: 2,
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
    handleDetail: function handleDetail(index, row) {
      this.detailDialogVisible = true;
      this.detailData = row;
    },
    handleSelectionChange: function handleSelectionChange(rows) {
      var _this2 = this;

      this.multipleSelection = [];
      if (rows) {
        rows.forEach(function (val, index, rows) {
          _this2.multipleSelection.push(val.id);
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
        this.tableData.sel.is_init = 2;
      }
      if (this.tableData.Pagination !== undefined) {
        this.tableData.Pagination.page = 1;
      }
      this.initMsg();
    },
    initMsg: function initMsg() {
      var _this3 = this;

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
        _this3.tableData.msg = [].concat(toConsumableArray_default()(tableDate)); // 深度拷贝
        // 重置数据总数
        if (_this3.tableData.Pagination !== undefined) {
          _this3.tableData.Pagination.total_count = res.data.total_count;
        }
        _this3.tableData.loading = false;
      });
    },
    deleteRequest: function deleteRequest(id) {
      var _this4 = this;

      this.mixinConfirm('/image/imagedelete', { image_id: id }).then(function (res) {
        if (res) {
          _this4.initMsg();
        }
      });
    },
    shareImage: function shareImage(id) {
      var _this5 = this;

      this.mixinConfirm('/image/imageshare', { image_id: id, is_init: 1 }, '将此项目镜像共享到公共镜像库？').then(function (res) {
        if (res) {
          _this5.initMsg();
        }
      });
    },
    changeImage: function changeImage(id) {
      if (isNaN(id)) {
        this.imageId = '';
        this.$router.push({ name: 'editImage', query: { is_init: 2 } });
      } else {
        this.imageId = id;
        this.$router.push({ name: 'editImage', query: { imageId: id, is_init: 2 } });
      }
    }
  },
  components: {
    ImageDetail: imageDetail["a" /* default */]
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-d504847c","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/imageManagement/objectImage.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-public-image-manage"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.imageManagement.mirrorName")))]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":_vm.$t('views.imageManagement.enter')},model:{value:(_vm.tableData.sel.name),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "name", $$v)},expression:"tableData.sel.name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.imageManagement.creationTime")))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","align":"right","unlink-panels":"","value-format":"yyyy-MM-dd","range-separator":"-","start-placeholder":_vm.$t('views.imageManagement.beginTime'),"end-placeholder":_vm.$t('views.imageManagement.endTime'),"picker-options":_vm.pickerOptions},model:{value:(_vm.tableData.sel.full_date),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "full_date", $$v)},expression:"tableData.sel.full_date"}})],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":function($event){_vm.initMsg()}}},[_vm._v(_vm._s(_vm.$t("views.imageManagement.select")))])],1)]),_vm._v(" "),_c('div',{staticClass:"controls-else"},[_c('el-button',{staticClass:"btn dark mid",on:{"click":function($event){_vm.changeImage()}}},[_vm._v("\n      "+_vm._s(_vm.$t("views.imageManagement.createMirror"))+"\n    ")])],1),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData.loading),expression:"tableData.loading"}],staticClass:"tab-content",staticStyle:{"margin-top":"10px"},attrs:{"data":_vm.tableData.msg,"border":""},on:{"selection-change":_vm.handleSelectionChange}},[_c('el-table-column',{attrs:{"type":"index","width":"55","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.imageManagement.mirrorName')},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('a',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleDetail(scope.$index, scope.row)}}},[_vm._v(_vm._s(scope.row.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","label":_vm.$t('views.imageManagement.creationTime'),"width":"200px","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"describe","label":_vm.$t('views.imageManagement.mirrorDescription')}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.imageManagement.operating'),"width":"150px","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('button',{staticClass:"btn",on:{"click":function($event){_vm.changeImage(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t("views.imageManagement.modify")))]),_vm._v(" "),_c('button',{staticClass:"btn",on:{"click":function($event){_vm.shareImage(scope.row.id)}}},[_vm._v("共享")]),_vm._v(" "),_c('button',{staticClass:"del",on:{"click":function($event){_vm.deleteSingleImage(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t("views.imageManagement.delete")))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.tableData.Pagination.page,"total":_vm.tableData.Pagination.total_count},on:{"update:currentPage":function($event){_vm.$set(_vm.tableData.Pagination, "page", $event)},"current-change":function($event){_vm.initMsg()}}}),_vm._v(" "),_c('el-dialog',{attrs:{"title":_vm.$t('views.imageManagement.mirrorDetails'),"visible":_vm.detailDialogVisible},on:{"update:visible":function($event){_vm.detailDialogVisible=$event}}},[_c('image-detail',{attrs:{"detailData":_vm.detailData}}),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":function($event){_vm.detailDialogVisible = false}}},[_vm._v(_vm._s(_vm.$t('views.imageManagement.close')))])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var imageManagement_objectImage = (esExports);
// CONCATENATED MODULE: ./src/views/imageManagement/objectImage.vue
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
  objectImage,
  imageManagement_objectImage,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_imageManagement_objectImage = __webpack_exports__["default"] = (Component.exports);


/***/ })

});