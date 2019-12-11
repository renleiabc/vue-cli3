webpackJsonp([44],{

/***/ "jzsC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var keys = __webpack_require__("fZjL");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/set.js
var set = __webpack_require__("lHA8");
var set_default = /*#__PURE__*/__webpack_require__.n(set);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/array/from.js
var from = __webpack_require__("c/Tr");
var from_default = /*#__PURE__*/__webpack_require__.n(from);

// EXTERNAL MODULE: ./src/views/projectSpace/components/codeDirectory.vue + 5 modules
var codeDirectory = __webpack_require__("KxGM");

// EXTERNAL MODULE: ./src/util/validate.js
var validate = __webpack_require__("v46e");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/createModelJob.vue




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var createModelJob = ({
  data: function data() {
    var name = function name(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入名称'));
      } else if (!Object(validate["h" /* validateUsername */])(value)) {
        callback(new Error('只能输入2-30位字母、数字、下划线'));
      } else {
        callback();
      }
    };
    return {
      input: '',
      textarea: '',
      isLoading: false,
      obj: {
        project_id: ''
      },
      projectId: '',
      labelWidth: '120px',
      modelDialog: {
        title: '选择使用模型',
        dialogCode: false,
        isFirst: false,
        isSecond: false,
        type: 1
      },
      mount_info: '',
      storage_id: {},
      storage_object_id: {},
      ruleForm: {
        name: '',
        memory: '1',
        useModel: '',
        task: '',
        engine: 'tensorflow',
        version: '',
        cpu: '1',
        paramsName: 'model_name',
        model: '',
        radio: 'GRPC',
        desc: ''
      },
      modelRules: {
        name: [{ required: true, validator: name, trigger: 'blur' }, { min: 2, max: 30, message: this.$t('views.development.youCan'), trigger: 'blur' }],
        engine: [{ required: true, message: '请选择引擎类型', trigger: 'change' }],
        version: [{ required: true, message: '请选择版本信息', trigger: 'change' }],
        memory: [{ required: true, message: '内存不能为空', trigger: 'change' }],
        cpu: [{ required: true, message: 'CPU不能为空', trigger: 'change' }],
        useModel: [{ required: true, message: '请选择使用的模型', trigger: 'change' }],
        task: [{ required: true, message: ' ', trigger: 'change' }],
        radio: [{ required: true, message: '请选择接口类型', trigger: 'change' }]
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
    // 请求引擎类型数据，函数调用
    this.$store.dispatch('getPracticeengine');
    // 请求版本信息数据，函数调用
    this.$store.dispatch('getPracticeengineversion');
    // 请求接口类型数据，函数调用
    this.$store.dispatch('getModelinterfacetype');
    var id = this.$route.query.id;
    this.projectId = this.obj.project_id = id;
    this.$store.dispatch('getProjectconfig', this.obj);
  },

  watch: {
    STORE_THEME_LANG: {
      handler: function handler(options, oldOptions) {
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '120px';
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '200px';
        }
      }
    }
  },
  mounted: function mounted() {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '120px';
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '200px';
    }
  },

  methods: {
    // 处理storage_id和storage_object_id数据函数封装
    storageId: function storageId(data) {
      // console.log(JSON.stringify(data))
      var arr = [];
      for (var key in data) {
        arr.push(data[key]);
      }
      // console.log(JSON.stringify(arr))
      return arr;
    },

    // 提交
    submitForm: function submitForm(formName) {
      var _this = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          var storage = _this.storageId(_this.storage_id);
          var storageObject = _this.storageId(_this.storage_object_id);
          var storageId = from_default()(new set_default.a(storage));
          var storageObjectId = from_default()(new set_default.a(storageObject));
          var obj = {
            project_id: _this.obj.project_id,
            name: _this.ruleForm.name,
            describe: _this.ruleForm.desc,
            engine: _this.ruleForm.engine,
            engine_version: _this.ruleForm.version,
            mount_info: _this.mount_info,
            gpu: 0,
            cpu: _this.ruleForm.cpu,
            memory: _this.ruleForm.memory,
            type: _this.ruleForm.radio,
            storage_object_id: storageObjectId,
            storage_id: storageId,
            param: {
              model_name: _this.ruleForm.task
            }
            // console.log(JSON.stringify(obj))
          };_this.isLoading = true;
          _this.modelpredictioncreate(obj);
        } else {
          _this.$message({ showClose: true, message: '带*号为必填项', type: 'error' });
          return false;
        }
      });
    },

    // 取消
    resetForm: function resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1);
    },
    interfaceType: function interfaceType(value) {
      console.log(value);
    },

    // 打开使用模型弹出框
    choice: function choice() {
      this.modelDialog.dialogCode = true;
      this.modelDialog.isFirst = true;
      this.modelDialog.isSecond = true;
    },

    // 确定选择的使用模型
    dialogSure: function dialogSure() {
      var projectpath = this.$store.state.projectSpace.projectpath;
      if (projectpath === '') {
        this.$message({
          message: '请选择目录或文件',
          type: 'warning'
        });
      } else {
        var key = keys_default()(projectpath)[0];
        this.ruleForm.useModel = key;
        this.storage_id.first = projectpath.storage_id;
        this.storage_object_id.first = projectpath.storage_object_id;
        this.mount_info = {
          'model_path': projectpath[key]
        };
        this.modelDialog.dialogCode = false;
        console.log(this.mount_info);
      }
    },

    // 关闭弹出框
    handleClose: function handleClose(done) {
      done();
    },

    // 创建模型预测
    modelpredictioncreate: function modelpredictioncreate(obj) {
      var _this2 = this;

      this.$post('/model/modelpredictioncreate', { ModelPrediction: obj }).then(function (res) {
        console.log(stringify_default()(res));
        if (res.code === 200) {
          _this2.$message({
            message: res.message,
            type: 'success'
          });
          _this2.isLoading = false;
          _this2.$router.go(-1);
        } else {
          _this2.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    }
  },
  components: { ViewsCodeDirectory: codeDirectory["a" /* default */] },
  computed: {
    // 引擎类型
    practiceengine: function practiceengine() {
      return this.$store.getters.postPracticeengine;
    },

    // 节点配置
    projectconfig: function projectconfig() {
      return this.$store.getters.postProjectconfig;
    },

    // 版本信息
    version: function version() {
      return this.$store.getters.postVersion;
    },

    // 接口类型
    faceType: function faceType() {
      return this.$store.getters.postFaceType;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5d24a07a","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/createModelJob.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-personal"},[_c('el-form',{ref:"ruleForm",staticClass:"views-icon-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.modelRules,"label-width":_vm.labelWidth}},[_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.modelPrediction.basicInf')))])]),_vm._v(" "),_c('div',{staticClass:"views-develop-inf"},[_c('div',{staticClass:"views-task-input"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.trainingTask.taskName'),"prop":"name"}},[_c('el-input',{attrs:{"placeholder":_vm.$t('views.development.youCan'),"clearable":""},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"views-task-image"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.development.remarks'),"prop":"desc"}},[_c('el-input',{attrs:{"type":"textarea","rows":6,"placeholder":_vm.$t('views.development.pleaseContents')},model:{value:(_vm.ruleForm.desc),callback:function ($$v) {_vm.$set(_vm.ruleForm, "desc", $$v)},expression:"ruleForm.desc"}})],1)],1)]),_vm._v(" "),_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.modelPrediction.parameterConfig')))])]),_vm._v(" "),_c('div',{staticClass:"views-develop-inf views-model-image"},[_c('div',{staticClass:"views-task-input"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.modelPrediction.interfaceType'),"prop":"radio"}},[_c('el-radio-group',{on:{"change":_vm.interfaceType},model:{value:(_vm.ruleForm.radio),callback:function ($$v) {_vm.$set(_vm.ruleForm, "radio", $$v)},expression:"ruleForm.radio"}},_vm._l((_vm.faceType),function(item){return _c('el-radio',{key:item.label,attrs:{"label":item.label}},[_vm._v("\n                            "+_vm._s(item.value)+"\n                        ")])}))],1)],1),_vm._v(" "),_c('div',{staticClass:"views-develop-resources"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.trainingTask.engineType'),"prop":"engine"}},[_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose'),"disabled":""},model:{value:(_vm.ruleForm.engine),callback:function ($$v) {_vm.$set(_vm.ruleForm, "engine", $$v)},expression:"ruleForm.engine"}},_vm._l((_vm.practiceengine),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":_vm.$t('views.trainingTask.versionInf'),"prop":"version"}},[_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.ruleForm.version),callback:function ($$v) {_vm.$set(_vm.ruleForm, "version", $$v)},expression:"ruleForm.version"}},_vm._l((_vm.version),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1)],1),_vm._v(" "),_c('div',{staticClass:"views-develop-image"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.modelPrediction.useModel'),"prop":"useModel"}},[_c('div',{staticClass:"views-develop-choice"},[_c('el-input',{attrs:{"readonly":true},model:{value:(_vm.ruleForm.useModel),callback:function ($$v) {_vm.$set(_vm.ruleForm, "useModel", $$v)},expression:"ruleForm.useModel"}}),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.choice}},[_vm._v("选择")])],1)])],1),_vm._v(" "),_c('div',{staticClass:"views-develop-image views-model-job"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.modelPrediction.jobParameter'),"prop":"task"}},[_c('div',{staticClass:"views-develop-choice"},[_c('el-input',{attrs:{"disabled":""},model:{value:(_vm.ruleForm.paramsName),callback:function ($$v) {_vm.$set(_vm.ruleForm, "paramsName", $$v)},expression:"ruleForm.paramsName"}}),_vm._v(" "),_c('b',{staticClass:"views-task-sign"},[_vm._v("=")]),_vm._v(" "),_c('el-form-item',{attrs:{"label-width":"0","prop":"task","rules":[{required: true, message: '请输入模型名称', trigger: 'blur'},  { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }]}},[_c('el-input',{model:{value:(_vm.ruleForm.task),callback:function ($$v) {_vm.$set(_vm.ruleForm, "task", $$v)},expression:"ruleForm.task"}})],1)],1)])],1),_vm._v(" "),_c('div',{staticClass:"views-develop-image"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.modelPrediction.nodeRules'),"prop":"memory"}},[_c('div',{staticClass:"views-model-task views-task-border"},[_c('div',{staticClass:"views-task-sitting views-task-sitting-mg"},[_c('span',{staticClass:"views-task-cpu"},[_vm._v("CPU")]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.ruleForm.cpu),callback:function ($$v) {_vm.$set(_vm.ruleForm, "cpu", $$v)},expression:"ruleForm.cpu"}},_vm._l((_vm.projectconfig.cpu_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v(" "),_c('span',{staticClass:"views-task-cpu"},[_vm._v(_vm._s(_vm.$t('views.projectContent.memory')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.ruleForm.memory),callback:function ($$v) {_vm.$set(_vm.ruleForm, "memory", $$v)},expression:"ruleForm.memory"}},_vm._l((_vm.projectconfig.memory_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v("\n                            G\n                        ")],1)])])],1)]),_vm._v(" "),_c('div',{staticClass:"views-develop-btn"},[_c('el-button',{on:{"click":function($event){_vm.resetForm('ruleForm')}}},[_vm._v(_vm._s(_vm.$t('views.button.cancel')))]),_vm._v(" "),_c('el-button',{staticClass:"view-btn-big",attrs:{"type":"primary","loading":_vm.isLoading},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v("\n                "+_vm._s(_vm.$t('views.button.run'))+"\n            ")])],1)]),_vm._v(" "),_c('el-dialog',{staticClass:"small",attrs:{"title":_vm.modelDialog.title,"visible":_vm.modelDialog.dialogCode,"before-close":_vm.handleClose},on:{"update:visible":function($event){_vm.$set(_vm.modelDialog, "dialogCode", $event)}}},[_c('div',{staticClass:"content"},[_c('views-code-directory',{attrs:{"isFirst":_vm.modelDialog.isFirst,"isSecond":_vm.modelDialog.isSecond,"type":_vm.modelDialog.type,"projectId":_vm.projectId}})],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.modelDialog.dialogCode = false}}},[_vm._v(_vm._s(_vm.$t('views.button.cancel')))]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":function($event){_vm.dialogSure()}}},[_vm._v(_vm._s(_vm.$t('views.button.sure')))])],1)])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var projectSpace_createModelJob = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/createModelJob.vue
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
  createModelJob,
  projectSpace_createModelJob,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_createModelJob = __webpack_exports__["default"] = (Component.exports);


/***/ })

});