webpackJsonp([38],{

/***/ "z/gS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var keys = __webpack_require__("fZjL");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./src/views/projectSpace/components/codeDirectory.vue + 5 modules
var codeDirectory = __webpack_require__("KxGM");

// EXTERNAL MODULE: ./src/util/validate.js
var validate = __webpack_require__("v46e");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/partCreateTraningTask.vue



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var partCreateTraningTask = ({
  data: function data() {
    return {
      input: '',
      textarea: '',
      radio: 0,
      dialogCode: false,
      dialogFile: false,
      active: 'first',
      isFirst: false,
      psTip: '',
      psShow: true,
      workerTip: '',
      workerShow: true,
      isSecond: false,
      caffe: { cpu: 1, gpu: 0, memory: 1 },
      tensorflow: {
        'ps_node': { 'num': 1, 'cpu': 1, 'gpu': 0, 'memory': 1 },
        'work_node': { 'num': 1, 'cpu': 1, 'gpu': 0, 'memory': 1 }
      },
      caffe_show: false,
      tensorflow_show: false,
      labelWidth: '150px',
      obj: {
        project_id: ''
      },
      projectId: '',
      ruleForm: {
        name: '',
        operating: [],
        desc: '',
        engine: 'tensorflow',
        version: '',
        params: '',
        caffeChoice: [{ title: '训练数据路径', dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' }, { title: '测试数据路径', dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' }, { title: '网络层文件', dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' }, { title: '模型保存路径', dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' }],
        choice: [{ title: this.$t('views.trainingTask.codeDirectory'), dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' }, { title: this.$t('views.trainingTask.trainingData'), dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' }, { title: this.$t('views.trainingTask.startupFile'), dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' }, { title: this.$t('views.trainingTask.trainingLog'), dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' }]
      },
      createDevrules: {
        name: [{ required: true, message: '请输入环境名称', trigger: 'blur' }, { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }],
        engine: [{ required: true, message: '请选择引擎类型', trigger: 'change' }],
        params: [{ required: false, message: ' ', trigger: 'change' }],
        version: [{ required: true, message: '请选择版本信息', trigger: 'change' }],
        desc: [{ message: '请填写活动形式', trigger: 'blur' }],
        node: [{ required: true, type: 'number', message: '必须为数字值' }]
      },
      postData: {
        code_path: '',
        launch_script: '',
        dataset: '',
        model_path: ''
      },
      postCaffe: {
        train_data_dir: '',
        proto_file: '',
        test_data_dir: '',
        snapshot_prefix: ''
      },
      caffeParams: [],
      tensorflowParams: [],
      id: ''
    };
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    if (to.name === 'partProjectDetails' && to.query.partId === undefined) {
      this.$router.push({
        name: 'partProjectDetails',
        query: {
          partId: this.id
        }
      });
    } else {
      next();
    }
  },
  created: function created() {
    // 初始化
    this.init();
    // 请求引擎类型数据，函数调用
    this.$store.dispatch('getPracticeengine');
    // 请求版本信息数据，函数调用
    this.$store.dispatch('getPracticeengineversion');
    // 请求节点配置数据，函数调用
    this.projectId = this.obj.project_id = this.id = this.$route.query.partId;
    this.$store.dispatch('getProjectconfig', this.obj);
    // caffe训练任务参数
    this.getPracticeparam();
  },

  watch: {
    STORE_THEME_LANG: {
      handler: function handler(options, oldOptions) {
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '150px';
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '200px';
        }
      }
    }
  },
  mounted: function mounted() {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '150px';
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '200px';
    }
  },

  methods: {
    init: function init() {
      if (this.ruleForm.engine === 'tensorflow') {
        this.tensorflow_show = true;
        this.radio = 0;
      }
    },

    // 选择引擎类型
    changeType: function changeType(val) {
      switch (val) {
        case 'tensorflow':
          this.caffe_show = false;
          this.tensorflow_show = true;
          this.$store.commit('changeVersion', 'tensorflow');
          this.ruleForm.version = '';
          this.radio = 0;
          this.tip = '';
          this.ruleForm.choice.forEach(function (item) {
            item.input = '';
          });
          break;
        case 'caffe':
          this.caffe_show = true;
          this.tensorflow_show = false;
          this.$store.commit('changeVersion', 'caffe');
          this.ruleForm.version = '';
          this.radio = 0;
          this.tip = '';
          this.ruleForm.caffeChoice.forEach(function (item) {
            item.input = '';
          });
          break;
        default:
          this.caffe_show = false;
          this.tensorflow_show = true;
          // this.version = this.ineversion.Tensorflow
          this.ruleForm.version = '';
          break;
      }
    },

    // 引擎在tensorflow验证运行参数
    tensorflowBlur: function tensorflowBlur(index) {
      var tensorflow = this.tensorflowParams;
      var value = tensorflow[index].value;
      if (value === '') {
        tensorflow[index].isShow = true;
        tensorflow[index].tip = '输入不能为空';
        return false;
      } else {
        switch (index) {
          case 3:
            if (Object(validate["a" /* spaceTest */])(value, 3)) {
              tensorflow[index].isShow = false;
            } else {
              tensorflow[index].isShow = true;
              tensorflow[index].tip = '请输入大于0小于1的值';
              return false;
            }
            break;
          default:
            if (Object(validate["a" /* spaceTest */])(value, 0)) {
              tensorflow[index].isShow = false;
            } else {
              tensorflow[index].isShow = true;
              tensorflow[index].tip = '请输入正整数';
              return false;
            }
            break;
        }
      }
      // console.log(JSON.stringify(caffeParams))
      this.tensorflowParams = [].concat(toConsumableArray_default()(tensorflow));
    },

    // 引擎在caffe验证运行参数
    caffeBlur: function caffeBlur(index) {
      console.log(index);
      var caffe = this.caffeParams;
      var value = caffe[index].value;
      if (value === '') {
        caffe[index].isShow = true;
        caffe[index].tip = '输入不能为空';
      } else if (index !== caffe.length - 1) {
        switch (index) {
          case 2:
            if (Object(validate["a" /* spaceTest */])(value, 1)) {
              caffe[index].isShow = false;
            } else {
              caffe[index].isShow = true;
              caffe[index].tip = '请输入实数';
              return false;
            }
            break;
          case 5:
            if (Object(validate["a" /* spaceTest */])(value, 1)) {
              caffe[index].isShow = false;
            } else {
              caffe[index].isShow = true;
              caffe[index].tip = '请输入实数';
              return false;
            }
            break;
          case 8:
            if (Object(validate["a" /* spaceTest */])(value, 4)) {
              caffe[index].isShow = false;
            } else {
              caffe[index].isShow = true;
              caffe[index].tip = '请输入正确的字符';
              return false;
            }
            break;
          case 7:
            if (Object(validate["a" /* spaceTest */])(value, 1)) {
              caffe[index].isShow = false;
            } else {
              caffe[index].isShow = true;
              caffe[index].tip = '请输入实数';
              return false;
            }
            break;
          case 9:
            if (Object(validate["a" /* spaceTest */])(value, 2)) {
              caffe[index].isShow = false;
            } else {
              caffe[index].isShow = true;
              caffe[index].tip = '请输入正实数';
              return false;
            }
            break;
          default:
            if (Object(validate["a" /* spaceTest */])(value, 0)) {
              caffe[index].isShow = false;
            } else {
              caffe[index].isShow = true;
              caffe[index].tip = '请输入正整数';
              return false;
            }
            break;
        }
        caffe[index].isShow = false;
      }
      // console.log(JSON.stringify(caffeParams))
      this.caffeParams = [].concat(toConsumableArray_default()(caffe));
    },
    psBlur: function psBlur() {
      var value = this.tensorflow.ps_node.num;
      this.nodeSitting(value, 'psShow', 'psTip');
    },
    workerBlur: function workerBlur() {
      var value = this.tensorflow.work_node.num;
      this.nodeSitting(value, 'workerShow', 'workerTip');
    },
    nodeSitting: function nodeSitting(value, show, tip) {
      if (value === '') {
        this[show] = true;
        this[tip] = '输入不能为空';
      } else {
        if (Object(validate["a" /* spaceTest */])(value, 0)) {
          this[show] = false;
        } else {
          this[show] = true;
          this[tip] = '请输入正整数';
          return false;
        }
      }
    },
    selectGpu: function selectGpu(val) {
      var caffe = this.caffeParams;
      if (val === 0) {
        caffe[caffe.length - 1].value = 'CPU';
      } else {
        caffe[caffe.length - 1].value = 'GPU';
      }
      this.caffeParams = [].concat(toConsumableArray_default()(caffe));
    },

    // 创建训练任务
    practicecreate: function practicecreate(obj) {
      var _this = this;

      this.$post('/practiceproject/practicecreate', obj).then(function (res) {
        console.log(stringify_default()(res));
        if (res.code === 200) {
          _this.$message({
            message: res.message,
            type: 'success'
          });
          _this.$router.go(-1);
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 增加作业参数
    operatParams: function operatParams() {
      var obj = {};
      obj.keys = '';
      obj.value = '';
      this.ruleForm.operating.push(obj);
    },

    // 减少作业参数
    reduceAddress: function reduceAddress(index) {
      this.ruleForm.operating.splice(index, 1);
    },
    creatDevelop: function creatDevelop() {},

    // 数据重组
    paramsData: function paramsData(params) {
      var key = [];
      var val = [];
      var rst = {};
      params.forEach(function (item, index) {
        key.push(item.keys);
        val.push(item.value);
      });
      for (var i = 0; i < key.length; i++) {
        rst[key[i]] = val[i];
      }
      // 删除对象空键值对
      for (var k in rst) {
        if (k === '' || rst[k] === 0) {
          delete rst[k];
        } else {
          rst[k] = parseInt(rst[k]);
        }
      }
      return rst;
    },

    // tensorflow 、caffe数据重组
    paramsCaffe: function paramsCaffe(params) {
      var obj = {};
      params.forEach(function (item, i) {
        obj[item.label] = item.value;
      });
      return obj;
    },

    // 提交
    submitForm: function submitForm(formName) {
      var _this2 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          var tensorflow = _this2.paramsCaffe(_this2.tensorflowParams);
          var caffe = _this2.paramsCaffe(_this2.caffeParams);

          var create = {
            'Practice[project_id]': _this2.obj.project_id,
            'Practice[name]': _this2.ruleForm.name,
            'Practice[engine]': _this2.ruleForm.engine,
            'Practice[describe]': _this2.ruleForm.desc,
            'Practice[engine_version]': _this2.ruleForm.version
          };
          if (_this2.ruleForm.engine === 'caffe') {
            create['Practice[mount_info]'] = _this2.postCaffe;
            create['Practice[param]'] = caffe;
            create['resource'] = _this2.caffe;
            create['Practice[is_visible]'] = 0;
          } else if (_this2.ruleForm.engine === 'tensorflow') {
            create['Practice[mount_info]'] = _this2.postData;
            create['Practice[param]'] = tensorflow;
            create['resource'] = _this2.tensorflow;
            create['Practice[is_visible]'] = _this2.radio;
          }
          console.log(stringify_default()(create));
          _this2.practicecreate(create);
        } else {
          _this2.$message({ showClose: true, message: '带*号为必填项', type: 'error' });
          return false;
        }
      });
    },

    // 打开代码目录、启动文件、训练数据集、训练日志目录弹出框
    chocieBtn: function chocieBtn(index) {
      console.log(index);
      var choice = this.ruleForm.choice;
      choice.forEach(function (item, i) {
        item.dialogCode = false;
        item.isFirst = false;
        item.isSecond = false;
        item.type = 1;
      });
      choice[index].dialogCode = true;
      switch (index) {
        case 0:
          choice[index].isFirst = true;
          choice[index].isSecond = false;
          choice[index].type = 1;
          break;
        case 1:
          choice[index].isFirst = true;
          choice[index].isSecond = true;
          choice[index].type = 1;
          break;
        case 2:
          choice[index].isFirst = true;
          choice[index].isSecond = false;
          choice[index].type = 2;
          break;
        case 3:
          choice[index].isFirst = true;
          choice[index].isSecond = false;
          choice[index].type = 1;
          break;
        default:
          break;
      }
      // console.log(JSON.stringify(choice))
      this.ruleForm.choice = [].concat(toConsumableArray_default()(choice));
    },

    // 训练数据路径、测试数据路径、网络层文件路径、模型保存路径路径
    chocieCaffe: function chocieCaffe(index) {
      console.log(index);
      var choice = this.ruleForm.choice;
      choice.forEach(function (item, i) {
        item.dialogCode = false;
        item.isFirst = false;
        item.isSecond = false;
        item.type = 1;
      });
      choice[index].dialogCode = true;
      switch (index) {
        case 0:
          choice[index].isFirst = true;
          choice[index].isSecond = true;
          choice[index].type = 1;
          break;
        case 1:
          choice[index].isFirst = true;
          choice[index].isSecond = true;
          choice[index].type = 1;
          break;
        case 2:
          choice[index].isFirst = true;
          choice[index].isSecond = false;

          choice[index].type = 2;
          break;
        case 3:
          choice[index].isFirst = true;
          choice[index].isSecond = false;
          choice[index].type = 1;
          break;
        default:
          break;
      }
      // console.log(JSON.stringify(choice))
      this.ruleForm.choice = [].concat(toConsumableArray_default()(choice));
    },

    // 关闭代码目录
    handleClose: function handleClose(done) {
      done();
    },

    // 确定选择代码目录
    dialogSure: function dialogSure(index) {
      var projectpath = this.$store.state.projectSpace.projectpath;
      if (projectpath === '') {
        this.$message({
          message: '请选择目录或文件',
          type: 'warning'
        });
      } else {
        if (this.ruleForm.engine === 'caffe') {
          var arr = this.ruleForm.caffeChoice;
          var caffeChoice = this.choiceCaffe(arr, index, projectpath, 'caffe');
          this.ruleForm.choice = [].concat(toConsumableArray_default()(caffeChoice));
        } else if (this.ruleForm.engine === 'tensorflow') {
          var _arr = this.ruleForm.choice;
          var choice = this.choiceCaffe(_arr, index, projectpath, 'tensorflow');
          this.ruleForm.choice = [].concat(toConsumableArray_default()(choice));
        }
      }
      // console.log(JSON.stringify(this.postData))
    },

    // 确定选择代码目录、启动文件、训练数据集、训练日志目录函数封装
    choiceCaffe: function choiceCaffe(arr, index, projectpath, str) {
      //  console.log(index)
      var key = keys_default()(projectpath)[0];
      var type = this.$store.state.projectSpace.projectpath.type;
      switch (index) {
        case 0:
          if (type === 1) {
            arr[index].input = key;
            if (str === 'caffe') {
              this.postCaffe.train_data_dir = this.$store.state.projectSpace.projectpath[key];
            } else if (str === 'tensorflow') {
              this.postData.code_path = this.$store.state.projectSpace.projectpath[key];
            }
          } else if (type === 2) {
            this.$message({
              message: '请选择目录',
              type: 'warning'
            });
            return arr;
          }
          break;
        case 1:
          if (type === 1) {
            arr[index].input = key;
            if (str === 'caffe') {
              this.postCaffe.test_data_dir = this.$store.state.projectSpace.projectpath[key];
            } else if (str === 'tensorflow') {
              this.postData.launch_script = this.$store.state.projectSpace.projectpath[key];
            }
          } else if (type === 2) {
            this.$message({
              message: '请选择目录',
              type: 'warning'
            });
            return arr;
          }
          break;
        case 2:
          if (type === 1) {
            this.$message({
              message: '请选择文件',
              type: 'warning'
            });
            return arr;
          } else if (type === 2) {
            arr[index].input = key;
            if (str === 'caffe') {
              this.postCaffe.proto_file = this.$store.state.projectSpace.projectpath[key];
            } else if (str === 'tensorflow') {
              this.postData.dataset = this.$store.state.projectSpace.projectpath[key];
            }
          }
          break;
        case 3:
          if (type === 1) {
            arr[index].input = key;
            if (str === 'caffe') {
              this.postCaffe.snapshot_prefix = this.$store.state.projectSpace.projectpath[key];
            } else if (str === 'tensorflow') {
              this.postData.model_path = this.$store.state.projectSpace.projectpath[key];
            }
          } else if (type === 2) {
            this.$message({
              message: '请选择目录',
              type: 'warning'
            });
            return arr;
          }
          break;
        default:
          break;
      }
      arr.forEach(function (item, i) {
        item.dialogCode = false;
        item.isFirst = false;
        item.isSecond = false;
        item.type = 1;
      });
      return arr;
    },

    // 取消
    resetForm: function resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1);
    },

    // 请求在caffe引擎下的运行参数
    getPracticeparam: function getPracticeparam() {
      var _this3 = this;

      this.$post('/practiceproject/practiceparam').then(function (res) {
        if (res.code === 200) {
          var caffe = res.data.caffe_param;
          // console.log(JSON.stringify(res))
          for (var key in caffe) {
            var obj = {
              label: key,
              value: caffe[key],
              isShow: false,
              tip: ''
              // 引擎caffe下的运行参数
            };_this3.caffeParams.push(obj);
          }
          var tensorflow = res.data.tensorflow_param;
          for (var _key in tensorflow) {
            var _obj = {
              label: _key,
              value: tensorflow[_key],
              isShow: false,
              tip: ''

              // 引擎tensorflow下的运行参数
            };_this3.tensorflowParams.push(_obj);
          }
        } else {
          _this3.$message({
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

    // 代码目录
    projectpath: function projectpath() {
      return this.$store.getters.postprojectpath;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-da1dbe54","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/partCreateTraningTask.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-personal"},[_c('el-form',{ref:"ruleForm",staticClass:"views-icon-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.createDevrules,"label-width":_vm.labelWidth}},[_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(" "+_vm._s(_vm.$t('views.trainingTask.taskInformation')))])]),_vm._v(" "),_c('div',{staticClass:"views-develop-inf"},[_c('div',{staticClass:"views-task-input"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.trainingTask.taskName'),"prop":"name"}},[_c('el-input',{attrs:{"placeholder":_vm.$t('views.development.youCan'),"clearable":""},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"views-task-image"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.development.remarks'),"prop":"desc"}},[_c('el-input',{attrs:{"type":"textarea","rows":6,"placeholder":_vm.$t('views.development.pleaseContents')},model:{value:(_vm.ruleForm.desc),callback:function ($$v) {_vm.$set(_vm.ruleForm, "desc", $$v)},expression:"ruleForm.desc"}})],1)],1)]),_vm._v(" "),_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.modelPrediction.parameterConfig')))])]),_vm._v(" "),_c('div',{staticClass:"views-develop-inf views-model-image"},[_c('div',{staticClass:"views-task-input"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.modelPrediction.parameterSource')}},[_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.creatDevelop}},[_vm._v("\n                        "+_vm._s(_vm.$t('views.trainingTask.manualParameter'))+"\n                    ")]),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.creatDevelop}},[_vm._v("\n                        "+_vm._s(_vm.$t('views.trainingTask.useParameter'))+"\n                    ")])],1)],1),_vm._v(" "),_c('div',{staticClass:"views-develop-resources"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.trainingTask.engineType'),"prop":"engine"}},[_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},on:{"change":_vm.changeType},model:{value:(_vm.ruleForm.engine),callback:function ($$v) {_vm.$set(_vm.ruleForm, "engine", $$v)},expression:"ruleForm.engine"}},_vm._l((_vm.practiceengine),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":_vm.$t( 'views.trainingTask.versionInf'),"prop":"version"}},[_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.ruleForm.version ),callback:function ($$v) {_vm.$set(_vm.ruleForm, "version", $$v)},expression:"ruleForm.version "}},_vm._l((_vm.version),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.tensorflow_show),expression:"tensorflow_show"}],staticClass:"views-task-show"},[_c('span',{staticClass:"views-task-radio "},[_vm._v(_vm._s(_vm.$t('views.trainingTask.whetherVisualization')))]),_vm._v(" "),_c('el-radio-group',{model:{value:(_vm.radio),callback:function ($$v) {_vm.radio=$$v},expression:"radio"}},[_c('el-radio',{attrs:{"label":1}},[_vm._v(_vm._s(_vm.$t('views.trainingTask.yes')))]),_vm._v(" "),_c('el-radio',{attrs:{"label":0}},[_vm._v(_vm._s(_vm.$t('views.trainingTask.no')))])],1)],1)],1),_vm._v(" "),_vm._l((_vm.ruleForm.caffeChoice),function(item,index){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.caffe_show),expression:"caffe_show"}],key:item.title,staticClass:"views-develop-image"},[_c('el-form-item',{attrs:{"label":item.title,"rules":{required: true, message: '选择不能为空', trigger: 'change'},"prop":'choice.'+index+ '.input'}},[_c('div',{staticClass:"views-develop-choice"},[_c('el-input',{attrs:{"readonly":true},model:{value:(item.input),callback:function ($$v) {_vm.$set(item, "input", $$v)},expression:"item.input"}}),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary "},on:{"click":function($event){_vm.chocieCaffe(index)}}},[_vm._v("\n                            "+_vm._s(_vm.$t('views.button.choice'))+"\n                        ")])],1)])],1)}),_vm._v(" "),_vm._l((_vm.ruleForm.choice),function(item,index){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.tensorflow_show),expression:"tensorflow_show"}],key:index,staticClass:"views-develop-image"},[_c('el-form-item',{attrs:{"label":item.title,"rules":{required: true, message: '选择不能为空', trigger: 'change'},"prop":'choice.'+index+ '.input'}},[_c('div',{staticClass:"views-develop-choice"},[_c('el-input',{attrs:{"readonly":true},model:{value:(item.input),callback:function ($$v) {_vm.$set(item, "input", $$v)},expression:"item.input"}}),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary "},on:{"click":function($event){_vm.chocieBtn(index)}}},[_vm._v("\n                            "+_vm._s(_vm.$t('views.button.choice'))+"\n                        ")])],1)])],1)}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.caffe_show),expression:"caffe_show"}],staticClass:"views-develop-image"},[_c('el-form-item',{attrs:{"label":_vm.$t( 'views.trainingTask.operatParameters'),"prop":"params"}},[_c('div',{staticClass:"views-develop-params"},_vm._l((_vm.caffeParams),function(item,index){return _c('div',{key:item.label,staticClass:"views-develop-caffe"},[_c('el-input',{attrs:{"disabled":""},model:{value:(item.label),callback:function ($$v) {_vm.$set(item, "label", $$v)},expression:"item.label"}}),_vm._v(" "),_c('b',{staticClass:"views-task-sign"},[_vm._v("=")]),_vm._v(" "),(index === _vm.caffeParams.length-1)?_c('el-input',{attrs:{"readonly":""},on:{"blur":function($event){_vm.caffeBlur(index)}},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", $$v)},expression:"item.value"}}):_c('el-input',{on:{"blur":function($event){_vm.caffeBlur(index)}},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", $$v)},expression:"item.value"}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(item.isShow),expression:"item.isShow"}],staticClass:"views-task-tips"},[_vm._v(_vm._s(item.tip))])],1)}))])],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.tensorflow_show),expression:"tensorflow_show"}],staticClass:"views-develop-image"},[_c('el-form-item',{attrs:{"label":_vm.$t( 'views.trainingTask.operatParameters'),"prop":"params"}},[_c('div',{staticClass:"views-develop-params"},_vm._l((_vm.tensorflowParams),function(item,index){return _c('div',{key:item.label,staticClass:"views-develop-caffe"},[_c('el-input',{attrs:{"disabled":""},model:{value:(item.label),callback:function ($$v) {_vm.$set(item, "label", $$v)},expression:"item.label"}}),_vm._v(" "),_c('b',{staticClass:"views-task-sign"},[_vm._v("=")]),_vm._v(" "),_c('el-input',{on:{"blur":function($event){_vm.tensorflowBlur(index)}},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", $$v)},expression:"item.value"}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(item.isShow),expression:"item.isShow"}],staticClass:"views-task-tips"},[_vm._v(_vm._s(item.tip))])],1)}))])],1),_vm._v(" "),_c('div',{staticClass:"views-develop-image views-task-mb",staticStyle:{"display":"none"}},[_c('el-form-item',{attrs:{"label":_vm.$t('views.trainingTask.operatParameters'),"prop":"params"}},[_vm._l((_vm.ruleForm.operating),function(item,index){return _c('el-form-item',{key:index,attrs:{"rules":{required: true, message: '输入不能为空', trigger: 'change'},"prop":'operating.'+index+ '.keys',"label-width":"0"}},[_c('div',{staticClass:"views-develop-choice"},[_c('el-input',{model:{value:(item.keys),callback:function ($$v) {_vm.$set(item, "keys", $$v)},expression:"item.keys"}}),_vm._v(" "),_c('b',{staticClass:"views-task-sign"},[_vm._v("=")]),_vm._v(" "),_c('el-input',{model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", $$v)},expression:"item.value"}}),_vm._v(" "),_c('span',{staticClass:"views-btn-reduce ",on:{"click":function($event){_vm.reduceAddress(index)}}},[_vm._v("—")])],1)])}),_vm._v(" "),_c('div',{staticClass:"views-develop-choice"},[_c('el-button',{staticClass:"view-btn-medium views-btn-choice ",attrs:{"type":"primary "},on:{"click":_vm.operatParams}},[_vm._v(_vm._s(_vm.$t('views.trainingTask.increaseParameters')))])],1)],2)],1)],2),_vm._v(" "),_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.trainingTask.nodeConfig')))])]),_vm._v(" "),_c('div',{staticClass:"views-task-type "},[_c('div',{staticClass:"views-task-right views-task-border "},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.caffe_show),expression:"caffe_show"}],staticClass:"views-task-sitting views-task-sitting-mg "},[_c('span',{staticClass:"views-task-cpu "},[_vm._v("CPU")]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.caffe.cpu),callback:function ($$v) {_vm.$set(_vm.caffe, "cpu", $$v)},expression:"caffe.cpu"}},_vm._l((_vm.projectconfig.cpu_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v(" "),_c('span',{staticClass:"views-task-cpu "},[_vm._v("GPU")]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},on:{"change":_vm.selectGpu},model:{value:(_vm.caffe.gpu),callback:function ($$v) {_vm.$set(_vm.caffe, "gpu", $$v)},expression:"caffe.gpu"}},_vm._l((_vm.projectconfig.gpu_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v(" "),_c('span',{staticClass:"views-task-cpu "},[_vm._v(_vm._s(_vm.$t('views.projectContent.memory')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.caffe.memory),callback:function ($$v) {_vm.$set(_vm.caffe, "memory", $$v)},expression:"caffe.memory"}},_vm._l((_vm.projectconfig.memory_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v("\n                    G\n                ")],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.tensorflow_show),expression:"tensorflow_show"}],staticClass:"views-task-tensorflow"},[_c('div',{staticClass:"views-task-node "},[_c('span',{staticClass:"views-task-node-span "},[_vm._v(_vm._s(_vm.$t('views.trainingTask.psNode')))]),_vm._v(" "),_c('div',{staticClass:"views-task-sitting views-task-select "},[_c('span',{staticClass:"views-task-cpu"},[_vm._v(_vm._s(_vm.$t('views.projectContent.unit')))]),_vm._v(" "),_c('el-input',{staticClass:"views-node-input",attrs:{"placeholder":_vm.$t('views.development.pleaseChoose'),"clearable":""},on:{"blur":_vm.psBlur},model:{value:(_vm.tensorflow.ps_node.num),callback:function ($$v) {_vm.$set(_vm.tensorflow.ps_node, "num", $$v)},expression:"tensorflow.ps_node.num"}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.psShow),expression:"psShow"}],staticClass:"views-task-tips"},[_vm._v(_vm._s(_vm.psTip))]),_vm._v(" "),_c('span',{staticClass:"views-task-cpu "},[_vm._v("CPU")]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.tensorflow.ps_node.cpu),callback:function ($$v) {_vm.$set(_vm.tensorflow.ps_node, "cpu", $$v)},expression:"tensorflow.ps_node.cpu"}},_vm._l((_vm.projectconfig.cpu_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v(" "),_c('span',{staticClass:"views-task-cpu "},[_vm._v("GPU")]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.tensorflow.ps_node.gpu),callback:function ($$v) {_vm.$set(_vm.tensorflow.ps_node, "gpu", $$v)},expression:"tensorflow.ps_node.gpu"}},_vm._l((_vm.projectconfig.gpu_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v(" "),_c('span',{staticClass:"views-task-cpu "},[_vm._v(_vm._s(_vm.$t('views.projectContent.memory')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.tensorflow.ps_node.memory),callback:function ($$v) {_vm.$set(_vm.tensorflow.ps_node, "memory", $$v)},expression:"tensorflow.ps_node.memory"}},_vm._l((_vm.projectconfig.memory_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v("\n                            G\n                        ")],1),_vm._v(" "),_c('div',{staticClass:"views-task-node views-task-bottom "},[_c('span',{staticClass:"views-task-node-span "},[_vm._v(_vm._s(_vm.$t('views.trainingTask.workerNode')))]),_vm._v(" "),_c('div',{staticClass:"views-task-sitting views-task-select"},[_c('span',{staticClass:"views-task-cpu "},[_vm._v(_vm._s(_vm.$t('views.projectContent.unit')))]),_vm._v(" "),_c('el-input',{staticClass:"views-node-input",attrs:{"placeholder":_vm.$t('views.development.pleaseChoose'),"clearable":""},on:{"blur":_vm.workerBlur},model:{value:(_vm.tensorflow.work_node.num),callback:function ($$v) {_vm.$set(_vm.tensorflow.work_node, "num", $$v)},expression:"tensorflow.work_node.num"}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.workerShow),expression:"workerShow"}],staticClass:"views-task-tips"},[_vm._v(_vm._s(_vm.workerTip))]),_vm._v(" "),_c('span',{staticClass:"views-task-cpu"},[_vm._v("CPU")]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.tensorflow.work_node.cpu),callback:function ($$v) {_vm.$set(_vm.tensorflow.work_node, "cpu", $$v)},expression:"tensorflow.work_node.cpu"}},_vm._l((_vm.projectconfig.cpu_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v(" "),_c('span',{staticClass:"views-task-cpu "},[_vm._v("GPU")]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.tensorflow.work_node.gpu),callback:function ($$v) {_vm.$set(_vm.tensorflow.work_node, "gpu", $$v)},expression:"tensorflow.work_node.gpu"}},_vm._l((_vm.projectconfig.gpu_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v(" "),_c('span',{staticClass:"views-task-cpu "},[_vm._v(_vm._s(_vm.$t('views.projectContent.memory')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.tensorflow.work_node.memory),callback:function ($$v) {_vm.$set(_vm.tensorflow.work_node, "memory", $$v)},expression:"tensorflow.work_node.memory"}},_vm._l((_vm.projectconfig.memory_config),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v("\n                                G\n                            ")],1)])])])])]),_vm._v(" "),_c('div',{staticClass:"views-develop-btn "},[_c('el-button',{on:{"click":function($event){_vm.resetForm( 'ruleForm')}}},[_vm._v(" "+_vm._s(_vm.$t('views.button.cancel')))]),_vm._v(" "),_c('el-button',{staticClass:"view-btn-big ",attrs:{"type":"primary "},on:{"click":function($event){_vm.submitForm( 'ruleForm')}}},[_vm._v(_vm._s(_vm.$t('views.button.run')))])],1)]),_vm._v(" "),_vm._l((_vm.ruleForm.choice),function(item,index){return _c('div',{key:index},[_c('el-dialog',{staticClass:"small",attrs:{"title":item.title,"visible":item.dialogCode,"before-close":_vm.handleClose},on:{"update:visible":function($event){_vm.$set(item, "dialogCode", $event)}}},[_c('div',{staticClass:"content"},[_c('views-code-directory',{attrs:{"isFirst":item.isFirst,"isSecond":item.isSecond,"type":item.type,"projectId":_vm.projectId}})],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){item.dialogCode = false}}},[_vm._v(_vm._s(_vm.$t('views.button.cancel')))]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":function($event){_vm.dialogSure(index)}}},[_vm._v(_vm._s(_vm.$t('views.button.sure')))])],1)])],1)})],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var projectSpace_partCreateTraningTask = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/partCreateTraningTask.vue
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
  partCreateTraningTask,
  projectSpace_partCreateTraningTask,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_partCreateTraningTask = __webpack_exports__["default"] = (Component.exports);


/***/ })

});