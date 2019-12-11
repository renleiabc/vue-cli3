webpackJsonp([59],{

/***/ "68dW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./src/util/validate.js
var validate = __webpack_require__("v46e");

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/caseCenter/components/imagesTable.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var imagesTable = ({
  name: 'imageTableDialog',
  props: {
    selImageId: '',
    openDialog: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      pageSize: 10,
      selectImage: {
        id: 0,
        name: ''
      },
      tableData: { // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/casecenter/imagelist',
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
    this.getActiveTab('tableData');
  },
  updated: function updated() {
    this.selectImage.id = this.selImageId;
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
    getCurrentRow: function getCurrentRow(id, name) {
      this.selectImage['id'] = id;
      this.selectImage['name'] = name;
    },
    handleClose: function handleClose(done) {
      this.$emit('modalClose');
    },
    selectImages: function selectImages() {
      this.$emit('selectImage', this.selectImage);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-737f3e72","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/caseCenter/components/imagesTable.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-dialog',{attrs:{"title":"选择关联镜像","width":"80%","before-close":_vm.handleClose,"close-on-click-modal":false,"visible":_vm.openDialog},on:{"update:visible":function($event){_vm.openDialog=$event}}},[_c('div',{staticClass:"image-sel"},[_c('div',{staticClass:"query-v"},[_c('span',[_vm._v("镜像名称")]),_vm._v(" "),_c('el-input',{attrs:{"size":"small"},model:{value:(_vm.tableData.sel.name),callback:function ($$v) {_vm.$set(_vm.tableData.sel, "name", $$v)},expression:"tableData.sel.name"}}),_vm._v(" "),_c('el-button',{staticClass:"views-btn-query",on:{"click":function($event){_vm.doSearch('tableData')}}},[_vm._v("查询")])],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"view-btn-small",on:{"click":_vm.selectImages}},[_vm._v("选择")]),_vm._v(" "),_c('el-button',{staticClass:"view-btn-small",on:{"click":_vm.handleClose}},[_vm._v("关闭")])],1)]),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableData.loading),expression:"tableData.loading"}],staticClass:"tab-content",staticStyle:{"margin-top":"12px"},attrs:{"data":_vm.tableData.msg,"border":""}},[_c('el-table-column',{attrs:{"label":"","header-align":"center","align":"center","width":"50"},scopedSlots:_vm._u([{key:"default",fn:function(item){return [_c('el-radio',{staticClass:"radio",attrs:{"value":item.row.id,"name":"imageId","label":item.row.id},nativeOn:{"change":function($event){_vm.getCurrentRow(item.row.id,item.row.name)}},model:{value:(_vm.selectImage.id),callback:function ($$v) {_vm.$set(_vm.selectImage, "id", $$v)},expression:"selectImage.id"}})]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"name","label":"镜像名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"created_at","width":"180","align":"center","label":"创建时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"imageCategory.name","width":"150","label":"镜像分类"}}),_vm._v(" "),_c('el-table-column',{attrs:{"property":"describe","label":"镜像描述"}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v("你查询的结果为空")])])])],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.tableData.Pagination.page,"total":_vm.tableData.Pagination.total_count},on:{"update:currentPage":function($event){_vm.$set(_vm.tableData.Pagination, "page", $event)},"current-change":function($event){_vm.changePage('tableData')}}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_imagesTable = (esExports);
// CONCATENATED MODULE: ./src/views/caseCenter/components/imagesTable.vue
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
  imagesTable,
  components_imagesTable,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var caseCenter_components_imagesTable = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/caseCenter/components/treeFiles.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var treeFiles = ({
  name: 'treeFiles',
  props: {
    url: {
      type: String,
      default: ''
    },
    isInit: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      props1: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf',
        key: 'id',
        type: 'type'
      },
      storage_id: '',
      storage_name: '',
      pid: 0,
      dataArr: []
    };
  },
  mounted: function mounted() {},

  methods: {
    loadNode1: function loadNode1(node, resolve) {
      var _this = this;

      console.log(node);
      if (this.url === '') {
        this.$message({ message: '请求地址为空', type: 'error' });
      }
      var StorageSearch = {};
      if (node.level === 0) {
        StorageSearch.is_init = this.isInit;
        this.$post('/storage/storagelist', { StorageSearch: StorageSearch }).then(function (res) {
          if (res.code === 200) {
            _this.dataArr = res.data.storage_list;
            _this.dataArr.forEach(function (element) {
              element.type = 3;
              element.storage_id = element.id;
              element.storage_name = element.name;
              element.leaf = false;
              return element;
            });
          } else {
            _this.$message({ message: res.message, type: 'error' });
          }
          return resolve(_this.dataArr);
        });
      } else {
        if (node.level === 1) {
          this.storage_id = node.data.storage_id;
          this.storage_name = node.data.storage_name;
          this.pid = 0;
        } else {
          this.pid = node.data.id;
        }
        this.$post(this.url, { storage_id: this.storage_id, pid: this.pid }).then(function (res) {
          _this.dataArr = res.data;
          _this.dataArr.forEach(function (element) {
            if (element.type - 0 === 2) {
              element.leaf = true;
              element.storage_name = _this.storage_name;
            }
            return element;
          });
          if (node.level >= 1) {
            return resolve(_this.dataArr);
          }
        });
      }
    },

    // 点击的文件
    handleNodeClick: function handleNodeClick(data) {
      this.$emit('dataTreeSelect', data);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-36e5b40c","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/caseCenter/components/treeFiles.vue
var treeFiles_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticStyle:{"height":"400px"}},[_c('el-scrollbar',{staticStyle:{"height":"100%"}},[_c('el-tree',{attrs:{"props":_vm.props1,"load":_vm.loadNode1,"highlight-current":true,"empty-text":"暂无数据","accordion":"","lazy":""},on:{"node-click":_vm.handleNodeClick},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var node = ref.node;
var data = ref.data;
return _c('span',{staticClass:"custom-tree-node"},[(node.data.type==3 && !node.data.leaf)?_c('i',{staticClass:"iconfont icon-xiangmu"}):_c('i',{staticClass:"iconfont",class:node.data.type==2?"icon-wenjian1":"icon-wenjianjia"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(node.label))])])}}])})],1)],1)}
var treeFiles_staticRenderFns = []
var treeFiles_esExports = { render: treeFiles_render, staticRenderFns: treeFiles_staticRenderFns }
/* harmony default export */ var components_treeFiles = (treeFiles_esExports);
// CONCATENATED MODULE: ./src/views/caseCenter/components/treeFiles.vue
var treeFiles_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var treeFiles___vue_template_functional__ = false
/* styles */
var treeFiles___vue_styles__ = null
/* scopeId */
var treeFiles___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var treeFiles___vue_module_identifier__ = null
var treeFiles_Component = treeFiles_normalizeComponent(
  treeFiles,
  components_treeFiles,
  treeFiles___vue_template_functional__,
  treeFiles___vue_styles__,
  treeFiles___vue_scopeId__,
  treeFiles___vue_module_identifier__
)

/* harmony default export */ var caseCenter_components_treeFiles = (treeFiles_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/caseCenter/components/dataCode.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var dataCode = ({
  name: 'codeDataDialog',
  props: {
    openDialog: {
      type: Boolean,
      default: false
    }
  },
  components: {
    treeFiles: caseCenter_components_treeFiles
  },
  data: function data() {
    return {
      props1: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      select: '',
      activeName: 'first'
    };
  },
  mounted: function mounted() {},

  methods: {
    handleClose: function handleClose() {
      this.$parent.dataCodeVisible = false;
    },
    handleSure: function handleSure(done) {
      this.$emit('dataCodeClose', this.select);
    },
    dataTreeSelect: function dataTreeSelect(select) {
      this.select = select;
    },
    handleClick: function handleClick(tab, event) {}
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-02cdc5ad","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/caseCenter/components/dataCode.vue
var dataCode_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-dialog',{attrs:{"title":"选择数据和代码","before-close":_vm.handleClose,"close-on-click-modal":false,"visible":_vm.openDialog},on:{"update:visible":function($event){_vm.openDialog=$event}}},[_c('el-tabs',{on:{"tab-click":_vm.handleClick},model:{value:(_vm.activeName),callback:function ($$v) {_vm.activeName=$$v},expression:"activeName"}},[_c('el-tab-pane',{attrs:{"label":"公共存储空间列表","name":"first"}},[_c('div',[_c('treeFiles',{attrs:{"url":"/storage/objectlistall","isInit":"1"},on:{"dataTreeSelect":_vm.dataTreeSelect}})],1)])],1),_vm._v(" "),_c('span',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":_vm.handleClose}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.handleSure}},[_vm._v("确 定")])],1)],1)}
var dataCode_staticRenderFns = []
var dataCode_esExports = { render: dataCode_render, staticRenderFns: dataCode_staticRenderFns }
/* harmony default export */ var components_dataCode = (dataCode_esExports);
// CONCATENATED MODULE: ./src/views/caseCenter/components/dataCode.vue
var dataCode_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var dataCode___vue_template_functional__ = false
/* styles */
var dataCode___vue_styles__ = null
/* scopeId */
var dataCode___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var dataCode___vue_module_identifier__ = null
var dataCode_Component = dataCode_normalizeComponent(
  dataCode,
  components_dataCode,
  dataCode___vue_template_functional__,
  dataCode___vue_styles__,
  dataCode___vue_scopeId__,
  dataCode___vue_module_identifier__
)

/* harmony default export */ var caseCenter_components_dataCode = (dataCode_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/caseCenter/createCase.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var createCase = ({
  name: 'createCase',
  components: {
    imageTableDialog: caseCenter_components_imagesTable,
    codeDataDialog: caseCenter_components_dataCode
  },
  data: function data() {
    var _this = this;

    var validateStr = function validateStr(rule, value, callback) {
      if (!validate["b" /* valiName */](value)) {
        callback(new Error(_this.$t('views.validError.validStr')));
      } else {
        callback();
      }
    };
    return {
      dataCodeVisible: false,
      imageListVisible: false,
      pageSize: 10,
      openDialog1: false,
      caseTypeArr: [],
      ruleForm: {
        case_name: '',
        date_code: '',
        case_document_address: '',
        case_document_key: '',
        case_type: '',
        system_image_id: 0,
        system_image_name: '',
        case_description: ''
      },
      dailogForm1: {
        categoryName: ''
      },
      dailogFormRules1: {
        categoryName: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }, { validator: validateStr, trigger: 'blur' }]
      },
      selections: [],
      rules: {
        case_name: [{ required: true, message: '请输入案例名称', trigger: 'blur' }, { validator: validateStr, trigger: 'blur' }],
        case_type: [{ required: true, message: '请选择案例分类', trigger: 'blur' }],
        system_image_name: [{ required: true, message: '请选择关联镜像', trigger: 'change' }],
        date_code: [{ required: true, message: '请选择数据和代码', trigger: 'change' }],
        case_document_address: [{ required: true, message: '请输入案例文档链接', trigger: 'blur' }]
      }
    };
  },
  created: function created() {
    var _this2 = this;

    this.getTypeList();
    if (this.$route.query.hasOwnProperty('caseId')) {
      var id = this.$route.query.caseId;
      this.$get('/casecenter/show', { case_center_id: id }).then(function (res) {
        console.log(res);
        _this2.ruleForm.case_id = id;
        _this2.ruleForm.case_name = res.data.name;
        _this2.ruleForm.date_code = res.data.code_data;
        _this2.ruleForm.case_document_address = res.data.document_link;
        _this2.ruleForm.case_document_key = res.data.document_password;
        _this2.ruleForm.system_image_id = res.data.image_id;
        _this2.ruleForm.system_image_name = res.data.imageRel.name;
        _this2.ruleForm.case_description = res.data.describe;
        setTimeout(function () {
          _this2.ruleForm.case_type = res.data.category;
        }, 5);
      });
    }
  },

  methods: {
    selectImages: function selectImages(select) {
      if (select.id && select.id !== 0) {
        this.ruleForm.system_image_id = select.id;
        this.ruleForm.system_image_name = select.name;
        this.$message({ message: '选择成功', type: 'success' });
      } else {
        this.$message({ message: '请选择镜像', type: 'error' });
      }
    },

    // 获取案例分类数据
    getTypeList: function getTypeList(cb) {
      var _this3 = this;

      // 获取搜索的数据
      this.$get('/casecenter/casecentercategorylist').then(function (res) {
        _this3.selections = [].concat(toConsumableArray_default()(res.data));
        _this3.ruleForm.case_type = '';
        // this.case_status = [...res.data.case_status]
        if (typeof cb === 'function') {
          cb();
        }
      });
    },
    changeCategory: function changeCategory() {
      if (this.ruleForm.case_type === -1) {
        this.openDialog1 = true;
      }
    },
    handleClose1: function handleClose1() {
      this.$refs['dailogForm1'].resetFields();
      this.ruleForm.case_type = '';
    },

    // 案例分类
    handleSure1: function handleSure1() {
      var _this4 = this;

      this.$refs['dailogForm1'].validate(function (valid) {
        if (valid) {
          _this4.$post('/casecenter/addcasecentercategory', { name: _this4.dailogForm1.categoryName }).then(function (res) {
            if (res.code === 200) {
              _this4.$message({
                type: 'success',
                message: _this4.$t('views.notification.saved')
              });
              _this4.openDialog1 = false;
              _this4.getTypeList(function () {
                _this4.ruleForm.case_type = '' + res.data.id;
              });
            } else {
              _this4.$message({
                type: 'warning',
                message: res.message
              });
            }
          });
        }
      });
    },
    delCategory: function delCategory(ind) {
      var _this5 = this;

      var categoryId = this.selections[ind];
      this.$post('/casecenter/delcasecentercategory', { id: categoryId }).then(function (res) {
        if (res.code === 200) {
          _this5.$message({
            type: 'success',
            message: _this5.$t('views.notification.removed')
          });
          _this5.getTypeList();
        }
      });
    },
    modalClose: function modalClose() {
      this.imageListVisible = false;
    },
    dataCodeClose: function dataCodeClose(data) {
      console.log(data);
      if (data.leaf) {
        this.ruleForm.date_code = data.storage_name + '://' + data.path;
      } else {
        this.$message({ message: '请选择一个文件', type: 'error' });
      }
      this.dataCodeVisible = false;
    },
    getImages: function getImages() {
      this.imageListVisible = true;
    },
    getDataCode: function getDataCode() {
      this.dataCodeVisible = true;
    },
    submitForm: function submitForm(formName) {
      var _this6 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          var parms = {};
          parms.name = _this6.ruleForm.case_name;
          parms.category = _this6.ruleForm.case_type;
          parms.image_id = _this6.ruleForm.system_image_id;
          parms.code_data = _this6.ruleForm.date_code;
          parms.document_link = _this6.ruleForm.case_document_address;
          parms.document_password = _this6.ruleForm.case_document_key;
          parms.describe = _this6.ruleForm.case_description;
          if (_this6.$route.query.hasOwnProperty('caseId')) {
            parms.case_center_id = _this6.$route.query.caseId;
            _this6.$post('/casecenter/update', parms).then(function (res) {
              if (res.code === 200) {
                _this6.$message({ message: '保存成功', type: 'success' });
                _this6.mixinGoBack();
              } else {
                _this6.$message({ message: res.message, type: 'error' });
                return false;
              }
            });
          } else {
            _this6.$post('/casecenter/create', parms).then(function (res) {
              if (res.code === 200) {
                _this6.$message({ message: '保存成功', type: 'success' });
                _this6.mixinGoBack();
              } else {
                _this6.$message({ message: res.message, type: 'error' });
                return false;
              }
            });
          }
        }
      });
    },
    resetForm: function resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-c6a8f37e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/caseCenter/createCase.vue
var createCase_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"create_case"},[_c('el-form',{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":"120px"}},[_c('el-row',{attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":12}},[_c('el-form-item',{attrs:{"label":"案例名称","prop":"case_name"}},[_c('el-input',{attrs:{"maxlength":"30"},model:{value:(_vm.ruleForm.case_name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "case_name", $$v)},expression:"ruleForm.case_name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"关联镜像","prop":"system_image_name"}},[_c('el-input',{staticClass:"w8",attrs:{"readonly":"true"},model:{value:(_vm.ruleForm.system_image_name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "system_image_name", $$v)},expression:"ruleForm.system_image_name"}}),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",nativeOn:{"click":function($event){return _vm.getImages($event)}}},[_vm._v("选择")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"数据和代码","prop":"date_code"}},[_c('el-input',{staticClass:"w8",attrs:{"readonly":"true"},model:{value:(_vm.ruleForm.date_code),callback:function ($$v) {_vm.$set(_vm.ruleForm, "date_code", $$v)},expression:"ruleForm.date_code"}}),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",on:{"click":_vm.getDataCode}},[_vm._v("选择")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"案例文档链接","prop":"case_document_address"}},[_c('el-input',{model:{value:(_vm.ruleForm.case_document_address),callback:function ($$v) {_vm.$set(_vm.ruleForm, "case_document_address", $$v)},expression:"ruleForm.case_document_address"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"加密文档密码","prop":"name"}},[_c('el-input',{model:{value:(_vm.ruleForm.case_document_key),callback:function ($$v) {_vm.$set(_vm.ruleForm, "case_document_key", $$v)},expression:"ruleForm.case_document_key"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[_c('el-form-item',{attrs:{"label":"案例分类","prop":"case_type"}},[_c('el-select',{attrs:{"filterable":"","placeholder":"请选择"},on:{"change":_vm.changeCategory},model:{value:(_vm.ruleForm.case_type),callback:function ($$v) {_vm.$set(_vm.ruleForm, "case_type", $$v)},expression:"ruleForm.case_type"}},[_vm._l((_vm.selections),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.id}},[_c('span',{staticStyle:{"float":"left"}},[_vm._v(_vm._s(item.name))]),_vm._v(" "),_c('span',{staticStyle:{"float":"right","color":"#8492a6","font-size":"12px"},on:{"click":function($event){_vm.delCategory(index)}}},[_c('i',{staticClass:"iconfont icon-shanchu"})])])}),_vm._v(" "),_c('el-option',{key:-1,attrs:{"label":_vm.$t("views.imageManagement.customize"),"value":-1}})],2)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"案例描述"}},[_c('el-input',{attrs:{"type":"textarea","rows":"8","maxlength":"200"},model:{value:(_vm.ruleForm.case_description),callback:function ($$v) {_vm.$set(_vm.ruleForm, "case_description", $$v)},expression:"ruleForm.case_description"}})],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"text-center"},[_c('el-button',{on:{"click":function($event){_vm.mixinGoBack()}}},[_vm._v("返回")]),_vm._v(" "),_c('el-button',{staticClass:"btn dark",on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v("保存")])],1)],1),_vm._v(" "),_c('el-dialog',{staticClass:"small",attrs:{"title":_vm.$t("views.imageManagement.titleImageType"),"visible":_vm.openDialog1},on:{"close":_vm.handleClose1,"update:visible":function($event){_vm.openDialog1=$event}}},[_c('div',[_c('el-form',{ref:"dailogForm1",attrs:{"model":_vm.dailogForm1,"rules":_vm.dailogFormRules1,"label-width":"80px"}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.imageManagement.typeImageName"),"prop":"categoryName"}},[_c('el-input',{attrs:{"placeholder":_vm.$t("views.imageManagement.enter")},model:{value:(_vm.dailogForm1.categoryName),callback:function ($$v) {_vm.$set(_vm.dailogForm1, "categoryName", $$v)},expression:"dailogForm1.categoryName"}})],1)],1)],1),_vm._v(" "),_c('span',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.openDialog1=false}}},[_vm._v(_vm._s(_vm.$t("views.button.cancel")))]),_vm._v(" "),_c('el-button',{staticClass:"btn dark",on:{"click":_vm.handleSure1}},[_vm._v(_vm._s(_vm.$t("views.button.save")))])],1)]),_vm._v(" "),_c('imageTableDialog',{attrs:{"openDialog":_vm.imageListVisible,"selImageId":_vm.ruleForm.system_image_id},on:{"update:openDialog":function($event){_vm.imageListVisible=$event},"update:selImageId":function($event){_vm.$set(_vm.ruleForm, "system_image_id", $event)},"modalClose":_vm.modalClose,"selectImage":_vm.selectImages}}),_vm._v(" "),_c('codeDataDialog',{attrs:{"openDialog":_vm.dataCodeVisible},on:{"update:openDialog":function($event){_vm.dataCodeVisible=$event},"dataCodeClose":_vm.dataCodeClose}})],1)}
var createCase_staticRenderFns = []
var createCase_esExports = { render: createCase_render, staticRenderFns: createCase_staticRenderFns }
/* harmony default export */ var caseCenter_createCase = (createCase_esExports);
// CONCATENATED MODULE: ./src/views/caseCenter/createCase.vue
var createCase_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var createCase___vue_template_functional__ = false
/* styles */
var createCase___vue_styles__ = null
/* scopeId */
var createCase___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var createCase___vue_module_identifier__ = null
var createCase_Component = createCase_normalizeComponent(
  createCase,
  caseCenter_createCase,
  createCase___vue_template_functional__,
  createCase___vue_styles__,
  createCase___vue_scopeId__,
  createCase___vue_module_identifier__
)

/* harmony default export */ var views_caseCenter_createCase = __webpack_exports__["default"] = (createCase_Component.exports);


/***/ })

});