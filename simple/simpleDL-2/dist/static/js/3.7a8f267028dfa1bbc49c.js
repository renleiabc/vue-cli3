webpackJsonp([3],{

/***/ "+t8L":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/components/codeFile.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var codeFile = ({
  data: function data() {
    return {
      activeName: 'first',
      storagelist: '',
      common_storage: '',
      project_storage: '',
      obj: {
        project_id: ''
      }
    };
  },
  created: function created() {
    this.obj.project_id = this.projectId;
    // console.log(this.projectId)
    // console.log(this.obj)
    this.getStoragelist(this.obj);
  },
  mounted: function mounted() {},

  methods: {
    // 获取挂载信息地址
    getStoragelist: function getStoragelist(obj) {
      var _this = this;

      this.$post('/environmentproject/storagelist', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          _this.storagelist = res.data;
          var data = res.data.common_storage;
          _this.getCommmon(data);
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 公共存储空间列表数据
    getCommmon: function getCommmon(data) {
      this.common_storage = this.processingData(data);
      // console.log(data)
    },

    // 选项卡
    handleClick: function handleClick(tab) {
      var name = tab.name;
      if (this.storagelist === '') {
        this.$message({
          message: '挂载数据为空！',
          type: 'error'
        });
      } else {
        switch (name) {
          case 'first':
            this.common_storage = this.processingData(this.storagelist.common_storage);
            break;
          case 'second':
            this.project_storage = this.processingData(this.storagelist.project_storage);
            break;
          default:
            this.common_storage = this.processingData(this.storagelist.common_storage);
            break;
        }
      }
    },

    // 数据处理
    processingData: function processingData(data) {
      if (data.lenght === 0) {
        this.$message({
          message: '挂载数据为空！',
          type: 'error'
        });
      } else {
        data.forEach(function (item) {
          item.active = false;
          item.disabled = false;
        });
        // console.log(JSON.stringify(data))
        return data;
      }
    },

    // 公共存储空间列表
    conmmonStroage: function conmmonStroage(item, index) {
      this.common_storage.forEach(function (ele, i) {
        ele.active = false;
        if (i === index) {
          ele.active = true;
        }
      });
      // 浅拷贝
      this.common_storage = [].concat(toConsumableArray_default()(this.common_storage));
      this.$emit('selectStroage', item);
    },

    // 项目存储空间列表
    projectStroage: function projectStroage(item, index) {
      // console.log(item)
      this.project_storage.forEach(function (ele, i) {
        ele.active = false;
        if (i === index) {
          ele.active = true;
        }
      });
      // 浅拷贝
      this.project_storage = [].concat(toConsumableArray_default()(this.project_storage));
      this.$emit('selectStroage', item);
    }
  },
  components: {},
  computed: {},
  props: ['projectId']
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1ac1dc87","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/components/codeFile.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-tabs',{on:{"tab-click":_vm.handleClick},model:{value:(_vm.activeName),callback:function ($$v) {_vm.activeName=$$v},expression:"activeName"}},[_c('el-tab-pane',{attrs:{"label":_vm.$t('views.development.commonStorage'),"name":"first"}},[(_vm.common_storage.length === 0)?_c('div',{staticClass:"views-code-storage"},[_vm._v("\n                "+_vm._s(_vm.$t('views.table.noData'))+"\n            ")]):_vm._l((_vm.common_storage),function(item,index){return _c('div',{key:index,class:[{'views-code-select':item.active},{'views-code-disabled':item.disabled},'views-code-storage'],on:{"click":function($event){_vm.conmmonStroage(item,index)}}},[_c('i',{staticClass:"iconfont icon-xiangmu views-icon-project"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(item.name))])])})],2),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":_vm.$t('views.development.projectStorage'),"name":"second"}},[(_vm.project_storage.length === 0)?_c('div',{staticClass:"views-code-storage"},[_vm._v("\n                "+_vm._s(_vm.$t('views.table.noData'))+"\n            ")]):_vm._l((_vm.project_storage),function(item,index){return _c('div',{key:index,class:[{'views-code-select':item.active},'views-code-storage'],on:{"click":function($event){_vm.projectStroage(item,index)}}},[_c('i',{staticClass:"iconfont icon-xiangmu views-icon-project"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(item.name))])])})],2)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_codeFile = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/components/codeFile.vue
function injectStyle (ssrContext) {
  __webpack_require__("bp+E")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1ac1dc87"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  codeFile,
  components_codeFile,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var projectSpace_components_codeFile = __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "Sh20":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("lktm");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("2f7b9b7e", content, true, {});

/***/ }),

/***/ "Xnow":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/components/selectMirror.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var selectMirror = ({
  data: function data() {
    return {
      activeName: 'first',
      tableData: [],
      loading: true,
      radio: '',
      label: '',
      isCount: false,
      per: 0,
      total: 0,
      currentPage: 1,
      obj: {
        is_init: 1,
        category: '',
        page: 0
      },
      row: '',
      tag: [{ label: this.$t('views.development.publicImage'), name: 'first' }, { label: this.$t('views.development.projectImage'), name: 'second' }]
    };
  },
  created: function created() {
    var category = localStorage.getItem('category');
    console.log(category);
    this.obj.category = category;
    this.getImagelist(this.obj);
  },
  mounted: function mounted() {},

  methods: {
    handleClick: function handleClick(tab, event) {
      var name = this.activeName = tab.name;
      var category = localStorage.getItem('category');
      this.obj.page = 0;
      this.obj.category = category;
      switch (name) {
        // 公共是1
        case 'first':
          this.obj.is_init = 1;
          break;
        case 'second':
          // 项目是2
          this.obj.is_init = 2;
          break;
        default:
          break;
      }
      this.getImagelist(this.obj);
    },
    getImagelist: function getImagelist(obj) {
      var _this = this;

      // console.log(obj)
      this.$get('/image/imagelist', obj).then(function (res) {
        _this.loading = false;
        if (res.code === 200) {
          _this.tableData = res.data.image_list;
          // console.log(JSON.stringify(this.tableData))
          var total = parseInt(res.data.total_count);
          var per = parseInt(res.data.per_page);
          if (total <= per) {
            _this.isCount = false;
          } else {
            _this.isCount = true;
          }
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 分页
    currentChange: function currentChange(val) {
      this.obj.page = val;
      this.getImagelist(this.obj);
    },

    // 选中
    radioPublic: function radioPublic(row) {
      this.row = row;
    },

    // 选择镜像
    confirmChoices: function confirmChoices() {
      var row = this.row;
      if (row === '') {
        this.$message({
          message: '请选择镜像',
          type: 'warning'
        });
      } else {
        this.$emit('choiceName', row);
        this.$emit('choiceClose', false);
      }
    },

    // 关闭弹出窗
    dialogClose: function dialogClose() {
      this.radio = '';
      this.row = '';
      this.$emit('choiceClose', false);
    }
  },
  props: {
    category: {
      type: String
    }
  },
  watch: {
    'category': function category(newVal, oldVal) {
      console.log(newVal);
      this.obj.page = 0;
      this.obj.category = newVal;
      this.getImagelist(this.obj);
    }
  },
  components: {},
  computed: {}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-05e7711b","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/components/selectMirror.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-tabs',{staticClass:"views-select-mirror",on:{"tab-click":_vm.handleClick},model:{value:(_vm.activeName),callback:function ($$v) {_vm.activeName=$$v},expression:"activeName"}},_vm._l((_vm.tag),function(item,key){return _c('el-tab-pane',{key:key,attrs:{"label":item.label,"name":item.name}},[_c('el-button',{staticClass:"view-btn-medium",on:{"click":_vm.dialogClose}},[_vm._v(_vm._s(_vm.$t('views.button.close')))]),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.confirmChoices}},[_vm._v(_vm._s(_vm.$t('views.modelPrediction.choice')))]),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],ref:"multipleTable",refInFor:true,staticClass:"tab-content",staticStyle:{"width":"100%"},attrs:{"data":_vm.tableData,"tooltip-effect":"dark","border":""}},[_c('el-table-column',{attrs:{"label":_vm.$t('views.development.select'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-radio',{staticClass:"radio",attrs:{"label":scope.row.id},on:{"change":function($event){_vm.radioPublic(scope.row)}},model:{value:(_vm.radio),callback:function ($$v) {_vm.radio=$$v},expression:"radio"}},[_vm._v("\n                            "+_vm._s(_vm.label)+"\n                        ")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":_vm.$t('views.development.mirror'),"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"imageOs.name","label":_vm.$t('views.development.systemType'),"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","label":_vm.$t('views.projectContent.createdTime'),"header-align":"center","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"imageCategory.name","label":_vm.$t('views.development.classification'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"describe","label":_vm.$t('views.development.mirrorDescription'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('div',{staticClass:"views-page"},[(_vm.isCount)?_c('el-pagination',{attrs:{"page-size":_vm.per,"layout":"prev, pager, next","total":_vm.total,"current-page":_vm.currentPage},on:{"current-change":_vm.currentChange,"update:currentPage":function($event){_vm.currentPage=$event}}}):_vm._e()],1)],1)}))],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_selectMirror = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/components/selectMirror.vue
function injectStyle (ssrContext) {
  __webpack_require__("Sh20")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-05e7711b"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  selectMirror,
  components_selectMirror,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var projectSpace_components_selectMirror = __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "bp+E":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("uUlO");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("393053a4", content, true, {});

/***/ }),

/***/ "lktm":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "uUlO":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "ucCz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./src/util/validate.js
var validate = __webpack_require__("v46e");

// EXTERNAL MODULE: ./src/views/projectSpace/components/selectMirror.vue + 2 modules
var selectMirror = __webpack_require__("Xnow");

// EXTERNAL MODULE: ./src/views/projectSpace/components/codeFile.vue + 2 modules
var codeFile = __webpack_require__("+t8L");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/creatDevelop.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var creatDevelop = ({
  data: function data() {
    var _this = this;

    var firstPass = function firstPass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!Object(validate["f" /* validatePassword */])(value)) {
        callback(new Error('只能输入6-16位字母、数字或字符数字组合'));
      } else {
        if (_this.ruleForm.checkPass !== '') {
          _this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var nextPass = function nextPass(rule, value, callback) {
      if (value === '') {
        //  console.log(value, '++++')
        callback(new Error('请再次输入密码'));
      } else if (value !== _this.ruleForm.pass) {
        // console.log(value, this.ruleForm.pass)
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    // cpu验证
    var cpu = function cpu(rule, value, callback) {
      //  console.log(this.cpuMark)
      if (value === '') {
        //  console.log(value, '++++')
        callback(new Error('CPU不能为空'));
      } else if (_this.cpuMark) {
        // console.log(value, this.ruleForm.pass)
        callback(new Error('选择的值超出最大范围，请重新选择!'));
      } else {
        callback();
      }
    };
    // gpu验证
    var gpu = function gpu(rule, value, callback) {
      // console.log(this.gpuMark)
      if (value === '') {
        //  console.log(value, '++++')
        callback(new Error('GPU不能为空'));
      } else if (_this.gpuMark) {
        // console.log(value, this.ruleForm.pass)
        callback(new Error('选择的值超出最大范围，请重新选择!'));
      } else {
        callback();
      }
    };
    // 内存验证
    var memory = function memory(rule, value, callback) {
      // console.log(this.memoryMark)
      if (value === '') {
        //  console.log(value, '++++')
        callback(new Error('内存不能为空'));
      } else if (_this.memoryMark) {
        // console.log(value, this.ruleForm.pass)
        callback(new Error('选择的值超出最大范围，请重新选择!'));
      } else {
        callback();
      }
    };
    return {
      obj: {
        project_id: ''
      },
      projectId: '',
      cpuMark: false,
      gpuMark: false,
      memoryMark: false,
      dialogMirror: false,
      dialogAddress: false,
      labelWidth: '100px',
      category: '',
      stroageInf: '',
      index: '',
      mount_info: [],
      mirror_id: '',
      ruleForm: {
        name: '',
        id: '',
        desc: '',
        mirror: '',
        pass: '',
        checkPass: '',
        mounting: '',
        cpu: '',
        gpu: '',
        memory: '',
        address: []
      },
      createDevrules: {
        name: [{ required: true, message: '请输入环境名称', trigger: 'blur' }, { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }],
        pass: [{ required: true, validator: firstPass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: nextPass, trigger: 'blur' }],
        id: [{ required: true, message: '请选择镜像分类', trigger: 'change' }],
        cpu: [{ required: true, validator: cpu, trigger: 'change' }],
        gpu: [{ required: true, validator: gpu, trigger: 'change' }],
        memory: [{ required: true, validator: memory, trigger: 'change' }],
        mirror: [{ required: true, message: '请选择镜像', trigger: 'change' }],
        mounting: [{ required: true, message: '挂载信息不能为空', trigger: 'change' }],
        desc: [{ message: '请填写活动形式', trigger: 'blur' }]
      }
    };
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    var id = this.$route.query.id;
    if (to.name === 'projectDetails' && to.query.id === undefined) {
      this.$router.push({
        name: 'projectDetails',
        query: {
          id: id
        }
      });
    } else {
      next();
    }
  },
  created: function created() {
    this.projectId = this.obj.project_id = this.$route.query.id;
    // 项目配额限制函数调用
    this.$store.dispatch('getProjectconfig', this.obj);
    // 镜像分类列表函数调用
    this.$store.dispatch('getImagecategorylist');
  },

  watch: {
    STORE_THEME_LANG: {
      handler: function handler(options, oldOptions) {
        console.log(this.STORE_THEME_LANG);
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '100px';
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '180px';
        }
      }
    }
  },
  mounted: function mounted() {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '100px';
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '180px';
    }
  },

  methods: {
    choiceMirror: function choiceMirror(formName) {
      var _this2 = this;

      this.$refs[formName].validateField('id', function (valid) {
        // console.log(valid)
        if (valid === '') {
          var category = _this2.ruleForm.id;
          _this2.category = category;
          _this2.dialogMirror = true;
          localStorage.setItem('category', category);
        }
      });
    },

    // 选择镜像
    selectMirror: function selectMirror(val) {
      console.log(val);
      this.ruleForm.mirror = val.name;
      this.mirror_id = val.id;
    },

    // 关闭按钮
    dialogClose: function dialogClose($event) {
      this.dialogMirror = false;
    },

    // 添加挂载信息
    mountAddress: function mountAddress() {
      if (this.ruleForm.address.length <= 3) {
        var obj = {
          increaseAddress: '',
          createAddress: '',
          read: ''
        };
        this.ruleForm.address.push(obj);
      } else {
        this.$message({
          message: '最多可添加四个挂载地址',
          type: 'warning'
        });
      }
    },

    // 减少挂载信息
    reduceAddress: function reduceAddress(index) {
      console.log(index);
      this.ruleForm.address.splice(index, 1);
    },

    // 添加挂载信息地址
    developBrowse: function developBrowse(index, item) {
      console.log(index, item);
      this.index = index;
      this.dialogAddress = true;
    },

    // 创建开发环境
    getEnvironmentcreate: function getEnvironmentcreate(obj) {
      var _this3 = this;

      this.$post('/environmentproject/environmentcreate', obj).then(function (res) {
        console.log(stringify_default()(res));
        if (res.code === 200) {
          _this3.$message({
            message: res.message,
            type: 'success'
          });
          _this3.$router.go(-1);
        } else {
          _this3.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 提交
    submitForm: function submitForm(formName) {
      var _this4 = this;

      this.$refs[formName].validate(function (valid) {
        console.log(valid);
        if (valid) {
          var create = {
            'Environment[project_id]': _this4.obj.project_id,
            'Environment[name]': _this4.ruleForm.name,
            'Environment[image_id]': _this4.mirror_id,
            'Environment[describe]': _this4.ruleForm.desc,
            'Environment[cpu]': _this4.ruleForm.cpu,
            'Environment[memory]': _this4.ruleForm.memory,
            'Environment[gpu]': _this4.ruleForm.gpu,
            'Environment[password]': _this4.ruleForm.checkPass,
            'mount_info': _this4.mount_info
            // console.log(JSON.stringify(create))
          };_this4.getEnvironmentcreate(create);
        } else {
          _this4.$message({ showClose: true, message: '带*号为必填项', type: 'error' });
          return false;
        }
      });
    },

    // 取消
    resetForm: function resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1);
    },

    // 选择cpu
    changeCpu: function changeCpu(val) {
      // console.log(this.$store.state.projectSpace.projectconfig)
      var cpu = this.$store.state.projectSpace.projectconfig.cpu;
      console.log(cpu);
      var useCpu = this.$store.state.projectSpace.projectconfig.use_cpu;
      var use = val + useCpu;
      if (use > cpu) {
        this.cpuMark = true;
      } else {
        this.cpuMark = false;
      }
    },

    // GPU选择
    changeGpu: function changeGpu(val) {
      // console.log(this.$store.state.projectSpace.projectconfig)
      var gpu = this.$store.state.projectSpace.projectconfig.gpu;
      console.log(gpu);
      var useGpu = this.$store.state.projectSpace.projectconfig.use_gpu;
      var use = val + useGpu;
      if (use > gpu) {
        this.gpuMark = true;
      } else {
        this.gpuMark = false;
      }
    },
    changeMemory: function changeMemory(val) {
      // console.log(this.$store.state.projectSpace.projectconfig)
      var memory = this.$store.state.projectSpace.projectconfig.memory;
      console.log(memory);
      var useMemory = this.$store.state.projectSpace.projectconfig.use_memory;
      var use = val + useMemory;
      if (use > memory) {
        this.memoryMark = true;
      } else {
        this.memoryMark = false;
      }
    },

    // 确定
    dialogSure: function dialogSure() {
      var _this5 = this;

      var ruleForm = this.ruleForm.address;
      var index = this.index;
      console.log(stringify_default()(this.stroageInf));
      ruleForm[index].increaseAddress = this.stroageInf.name;
      ruleForm[index].createAddress = 's3://' + this.stroageInf.name;
      ruleForm[index].accessid = this.stroageInf.accessid;
      ruleForm[index].accesskey = this.stroageInf.accesskey;
      if (this.stroageInf.is_init === '1') {
        ruleForm[index].read = '该挂载地址权限为只读';
        ruleForm[index].flag = 'ro';
      } else if (this.stroageInf.is_init === '2') {
        ruleForm[index].read = '该挂载地址权限为读写';
        ruleForm[index].flag = 'rw';
      }
      this.ruleForm.address = [].concat(toConsumableArray_default()(ruleForm));
      console.log(stringify_default()(ruleForm));
      var obj = {};
      ruleForm.forEach(function (item) {
        if (item.increaseAddress !== '') {
          var key = item.createAddress;
          obj[key] = {
            'accessid': item.accessid,
            'accesskey': item.accesskey,
            'mount_flag': item.flag
          };
        }
        _this5.mount_info = obj;
        // console.log(JSON.stringify(obj))
      });
      this.dialogAddress = false;
    },
    handleClose: function handleClose(done) {
      done();
    },

    // 传递挂载信息
    showStroage: function showStroage($event) {
      this.stroageInf = $event;
    }
  },
  components: { ViewsSelectMirror: selectMirror["a" /* default */], ViewsCodeFile: codeFile["a" /* default */] },
  computed: {
    imagecategorylist: function imagecategorylist() {
      // 镜像分类
      return this.$store.getters.postImagecategorylist;
    },
    projectconfig: function projectconfig() {
      // 镜像分类
      return this.$store.getters.postProjectconfig;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8684b990","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/creatDevelop.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-personal"},[_c('el-form',{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.createDevrules,"label-width":_vm.labelWidth}},[_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.development.developingInformation'))+"\n            ")])]),_vm._v(" "),_c('div',{staticClass:"views-develop-inf"},[_c('div',{staticClass:"views-develop-text"},[_c('div',{staticClass:"views-develop-select"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.development.classification'),"prop":"id"}},[_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseImage'),"clearable":""},model:{value:(_vm.ruleForm.id),callback:function ($$v) {_vm.$set(_vm.ruleForm, "id", $$v)},expression:"ruleForm.id"}},_vm._l((_vm.imagecategorylist.category),function(item){return _c('el-option',{key:item.id,attrs:{"label":item.name,"value":item.id}})}))],1)],1),_vm._v(" "),_c('div',{staticClass:"views-develop-input"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.development.environmentalName'),"prop":"name"}},[_c('el-input',{attrs:{"placeholder":_vm.$t('views.development.youCan'),"minlength":"2","maxlength":"30","clearable":""},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"views-develop-image"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.development.selectMirror'),"prop":"mirror"}},[_c('div',{staticClass:"views-develop-choice"},[_c('el-input',{attrs:{"readonly":true},model:{value:(_vm.ruleForm.mirror),callback:function ($$v) {_vm.$set(_vm.ruleForm, "mirror", $$v)},expression:"ruleForm.mirror"}}),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":function($event){_vm.choiceMirror('ruleForm')}}},[_vm._v(_vm._s(_vm.$t('views.button.choice')))])],1)])],1)]),_vm._v(" "),_c('div',{staticClass:"views-develop-text"},[_c('div',{staticClass:"views-develop-image"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.development.remarks'),"prop":"desc"}},[_c('el-input',{attrs:{"type":"textarea","rows":6,"placeholder":_vm.$t('views.development.pleaseContents')},model:{value:(_vm.ruleForm.desc),callback:function ($$v) {_vm.$set(_vm.ruleForm, "desc", $$v)},expression:"ruleForm.desc"}})],1)],1)])]),_vm._v(" "),_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.development.cipherInformation')))])]),_vm._v(" "),_c('div',{staticClass:"views-develop-inf"},[_c('div',{staticClass:"views-develop-text"},[_c('div',{staticClass:"views-develop-input"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.development.pleasePassword'),"prop":"pass"}},[_c('el-input',{attrs:{"placeholder":_vm.$t('views.development.youCan'),"clearable":"","auto-complete":"off"},model:{value:(_vm.ruleForm.pass),callback:function ($$v) {_vm.$set(_vm.ruleForm, "pass", $$v)},expression:"ruleForm.pass"}})],1)],1)]),_vm._v(" "),_c('div',{staticClass:"views-develop-text"},[_c('div',{staticClass:"views-develop-input"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.development.confirmPassword'),"prop":"checkPass"}},[_c('el-input',{attrs:{"placeholder":_vm.$t('views.development.youCan'),"clearable":"","auto-complete":"off"},model:{value:(_vm.ruleForm.checkPass),callback:function ($$v) {_vm.$set(_vm.ruleForm, "checkPass", $$v)},expression:"ruleForm.checkPass"}})],1)],1)])]),_vm._v(" "),_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.development.storeInformation')))])]),_vm._v(" "),_c('div',{staticClass:"views-develop-mount"},_vm._l((_vm.ruleForm.address),function(item,index){return _c('el-form-item',{key:index,attrs:{"rules":{required: true, message: '挂载信息不能为空', trigger: 'change'},"prop":'address.'+index+ '.increaseAddress',"label-width":"0"}},[_c('el-input',{staticClass:"w8",attrs:{"placeholder":"","readonly":true},model:{value:(item.increaseAddress),callback:function ($$v) {_vm.$set(item, "increaseAddress", $$v)},expression:"item.increaseAddress"}}),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":function($event){_vm.developBrowse(index,item)}}},[_vm._v("\n                    "+_vm._s(_vm.$t('views.development.browse'))+"\n                ")]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":"","readonly":true},model:{value:(item.createAddress),callback:function ($$v) {_vm.$set(item, "createAddress", $$v)},expression:"item.createAddress"}}),_vm._v(" "),_c('span',{staticClass:"views-btn-reduce",on:{"click":function($event){_vm.reduceAddress(index)}}},[_vm._v("—")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(item.read))])],1)})),_vm._v(" "),_c('div',{staticClass:"views-develop-mount"},[_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.mountAddress}},[_vm._v("\n                "+_vm._s(_vm.$t('views.development.mountAddress'))+"\n            ")]),_vm._v(" "),_c('span',{staticClass:"views-mount-span"},[_vm._v("*"+_vm._s(_vm.$t('views.development.mountableAddresses')))])],1),_vm._v(" "),_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.development.resource')))])]),_vm._v(" "),_c('div',{staticClass:"views-develop-resources"},[_c('el-form-item',{attrs:{"label":"CPU","prop":"cpu"}},[_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},on:{"change":_vm.changeCpu},model:{value:(_vm.ruleForm.cpu),callback:function ($$v) {_vm.$set(_vm.ruleForm, "cpu", $$v)},expression:"ruleForm.cpu"}},_vm._l((_vm.projectconfig.cpu_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"GPU","prop":"gpu"}},[_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},on:{"change":_vm.changeGpu},model:{value:(_vm.ruleForm.gpu),callback:function ($$v) {_vm.$set(_vm.ruleForm, "gpu", $$v)},expression:"ruleForm.gpu"}},_vm._l((_vm.projectconfig.gpu_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":_vm.$t('views.projectContent.memory'),"prop":"memory"}},[_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},on:{"change":_vm.changeMemory},model:{value:(_vm.ruleForm.memory),callback:function ($$v) {_vm.$set(_vm.ruleForm, "memory", $$v)},expression:"ruleForm.memory"}},_vm._l((_vm.projectconfig.memory_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1)],1),_vm._v(" "),_c('div',{staticClass:"views-develop-btn"},[_c('el-button',{on:{"click":function($event){_vm.resetForm('ruleForm')}}},[_vm._v(_vm._s(_vm.$t('views.button.cancel')))]),_vm._v(" "),_c('el-button',{staticClass:"view-btn-big",attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v(_vm._s(_vm.$t('views.button.run')))])],1)]),_vm._v(" "),_c('el-dialog',{attrs:{"title":_vm.$t(' views.development.selectMirror '),"visible":_vm.dialogMirror,"before-close":_vm.handleClose},on:{"update:visible":function($event){_vm.dialogMirror=$event}}},[_c('div',{staticClass:"content"},[_c('views-select-mirror',{attrs:{"category":_vm.category},on:{"choiceClose":function($event){_vm.dialogClose($event)},"choiceName":function($event){_vm.selectMirror($event)}}})],1)]),_vm._v(" "),_c('el-dialog',{staticClass:"small",attrs:{"title":_vm.$t('views.trainingTask.codeDirectory'),"visible":_vm.dialogAddress,"before-close":_vm.handleClose},on:{"update:visible":function($event){_vm.dialogAddress=$event}}},[_c('div',{staticClass:"content"},[_c('views-code-file',{attrs:{"projectId":_vm.projectId},on:{"selectStroage":function($event){_vm.showStroage($event)}}})],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.dialogAddress = false}}},[_vm._v(_vm._s(_vm.$t('views.button.cancel')))]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.dialogSure}},[_vm._v(_vm._s(_vm.$t('views.button.sure')))])],1)])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var projectSpace_creatDevelop = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/creatDevelop.vue
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
  creatDevelop,
  projectSpace_creatDevelop,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_creatDevelop = __webpack_exports__["default"] = (Component.exports);


/***/ })

});