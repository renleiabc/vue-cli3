webpackJsonp([40],{

/***/ "ZT7O":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("bOdI");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/picturePrediction.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var picturePrediction = ({
  data: function data() {
    return {
      imageUrl: '',
      gender: '',
      age: '',
      dialogImageUrl: '',
      dialogVisible: false,
      states: 0
    };
  },
  created: function created() {},
  mounted: function mounted() {},

  methods: {
    handleAvatarSuccess: function handleAvatarSuccess(res, file) {
      console.log(res);
      this.states = 2;
      if (res.gender.length > 0) {
        this.age = res.ages[0].age || '无';
        this.gender = res.gender[0].gender === 0 ? '男' : '女';
      } else {
        this.age = '无';
        this.gender = '无';
      }
    },
    handleExceed: function handleExceed(files, fileList) {
      this.$message.warning('\u63D0\u4F9B\u4E00\u5F20\u56FE\u7247\u5373\u53EF');
    },
    handleRemove: function handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleAvatarError: function handleAvatarError() {
      this.$message.error('上传图片失败，请重试!');
      this.states = 0;
    },
    handlePictureCardPreview: function handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarRemove: function beforeAvatarRemove(file) {
      this.states = 0;
    },
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      var isPass = false;
      var isJPG = file.type === 'image/jpg';
      var isJPEG = file.type === 'image/jpeg';
      var isPNG = file.type === 'image/png';
      var isLt2M = file.size / 1024 / 1024 < 2;

      if (isJPG || isJPEG || isPNG) {
        isPass = true;
      } else {
        isPass = false;
        this.$message.error('上传图片格式错误!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      this.states = 1;
      return isPass && isLt2M;
    }
  },
  components: {},
  computed: {}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2ae2d121","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/picturePrediction.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"pictureTrain"},[_c('div',[_c('h6',[_vm._v("上传图片")]),_vm._v(" "),_c('p',[_vm._v("图片格式为 jpg，jpeg，png，大小不能超过 10MB")]),_vm._v(" "),_c('el-upload',{attrs:{"action":"//192.168.10.95:18000/api/v1.0/all/","list-type":"picture-card","on-exceed":_vm.handleExceed,"limit":1,"on-success":_vm.handleAvatarSuccess,"on-error":_vm.handleAvatarError,"before-upload":_vm.beforeAvatarUpload,"before-remove":_vm.beforeAvatarRemove,"on-remove":_vm.handleRemove}},[_c('i',{staticClass:"el-icon-plus"})])],1),_vm._v(" "),_c('div',[_c('h6',[_vm._v("预测结果")]),_vm._v(" "),(_vm.states === 0)?_c('p',[_vm._v("暂无结果，请上传图片")]):_vm._e(),_vm._v(" "),(_vm.states === 1)?_c('div',{staticClass:"working"},[_c('div',{staticClass:"loader"}),_vm._v(" "),_c('div',{staticClass:"loaderText"},[_vm._v("Working......")])]):_vm._e(),_vm._v(" "),(_vm.states === 2)?_c('div',[_c('p',[_c('span',[_vm._v("性别：")]),_vm._v(_vm._s(_vm.gender))]),_vm._v(" "),_c('p',[_c('span',[_vm._v("年龄：")]),_vm._v(_vm._s(_vm.age))])]):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var projectSpace_picturePrediction = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/picturePrediction.vue
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
  picturePrediction,
  projectSpace_picturePrediction,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_picturePrediction = (Component.exports);

// EXTERNAL MODULE: ./src/util/index.js
var util = __webpack_require__("ZoQJ");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/modelDetails.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 图片预测


/* harmony default export */ var modelDetails = ({
  data: function data() {
    var time = Object(util["f" /* timeData */])();
    return {
      editDisabled: true,
      dialogModel: false,
      remarksDialog: false,
      downDialog: false,
      modelBasic: '',
      modelarea: '',
      modelName: '',
      journal: '',
      pickerOptions: time,
      nodeTime: '',
      practice_node: '',
      obj: {
        model_id: ''
      },
      logParams: {
        model_id: '',
        model_node: ''
      },
      id: '',
      timer: '',
      nodeObj: {
        id: '',
        node: '',
        end_time: '',
        start_time: '',
        type: 2
      }
    };
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    window.clearTimeout(this.timer);
    if (to.name === 'projectDetails' && to.query.id === undefined) {
      var id = this.id;
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
    this.nodeObj.id = this.logParams.model_id = this.obj.model_id = this.$route.query.idModel;
    this.id = this.$route.query.id;
    // 获取模型预测详情函数调用
    this.getModelDetails(this.obj);
    // 获取模型预测日志调用
    this.getModelpredictionlog(this.logParams);
  },
  mounted: function mounted() {},

  methods: {
    // 获取模型预测详情
    getModelDetails: function getModelDetails(obj) {
      var _this = this;

      // console.log(this.$route.params.id)
      this.$get('/model/modelpredictiondetail', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 基本信息
          _this.modelBasic = res.data.model_prediction;
          // 环境名称
          _this.modelName = _this.modelBasic.name;
          // 备注信息
          _this.modelarea = _this.modelBasic.describe;
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 模型预测修改作业名称、备注信息
    modelpredictionupdate: function modelpredictionupdate(obj) {
      var _this2 = this;

      this.$post('/model/modelpredictionupdate', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          _this2.$message({
            message: res.message,
            type: 'success'
          });
          _this2.getModelDetails(_this2.obj);
        } else {
          _this2.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 获取模型预测日志
    getModelpredictionlog: function getModelpredictionlog(obj) {
      var _this3 = this;

      var that = this;
      this.$post('/model/modelpredictionlog', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 训练日志
          if (res.data.length !== 0) {
            _this3.journal = res.data.model_log;
            _this3.practice_node = [{ label: '全部', value: '' }].concat(toConsumableArray_default()(res.data.model_node));
          }
          _this3.timer = setTimeout(function () {
            that.getModelpredictionlog(_this3.logParams);
          }, 10000);
        } else {
          _this3.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 打开修改作业名称编辑框
    modelEdit: function modelEdit() {
      this.dialogModel = true;
    },
    handleClose: function handleClose(done) {
      done();
    },

    // 确定修改作业名称
    changeDialogSingle: function changeDialogSingle(key, name) {
      var obj = defineProperty_default()({
        model_id: this.obj.model_id
      }, key, this[name]);
      this.modelpredictionupdate(obj);
      this.dialogModel = false;
    },

    // 打开修改备注的弹出框
    remarksEdit: function remarksEdit() {
      this.remarksDialog = true;
    },

    // 确定修改备注信息
    remarksDialogSingle: function remarksDialogSingle(key, name) {
      var obj = defineProperty_default()({
        model_id: this.obj.model_id
      }, key, this[name]);
      this.modelpredictionupdate(obj);
      this.remarksDialog = false;
    },
    changeLogModel: function changeLogModel(val) {
      this.logParams.model_node = val;
      this.getModelpredictionlog(this.logParams);
    },

    // 下载的日志
    downLog: function downLog() {
      this.downDialog = true;
    },

    // 确定下载日志
    dialogSingleSure: function dialogSingleSure() {
      console.log('====');
      if (this.nodeTime === '') {
        this.nodeObj = this.nodeObj;
      } else {
        this.nodeObj.start_time = this.nodeTime[0];
        this.nodeObj.end_time = this.nodeTime[1];
      }
      console.log(this.nodeObj);
      this.$store.commit('downloadlog', this.nodeObj);
    }
  },
  components: { ViewsPicturePrediction: views_projectSpace_picturePrediction },
  computed: {}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5b8d873d","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/modelDetails.vue
var modelDetails_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-personal"},[_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.modelPrediction.basicInf')))])]),_vm._v(" "),(_vm.modelBasic !== '')?_c('table',{staticClass:"views-project-details views-tabel-details"},[_c('tr',[_c('td',{staticClass:"views-basic-color1"},[_vm._v("作业名称")]),_vm._v(" "),_c('td',{staticClass:"views-basic-name"},[_c('el-input',{attrs:{"placeholder":"","disabled":_vm.editDisabled},model:{value:(_vm.modelName),callback:function ($$v) {_vm.modelName=$$v},expression:"modelName"}}),_vm._v(" "),_c('i',{staticClass:"iconfont icon-edit views-icon-edit",on:{"click":_vm.modelEdit}})],1),_vm._v(" "),_c('td',{staticClass:"views-basic-color1"},[_vm._v("作业状态")]),_vm._v(" "),_c('td',[(_vm.modelBasic.status==='0')?_c('span',[_vm._v("运行失败")]):_vm._e(),_vm._v(" "),(_vm.modelBasic.status==='1')?_c('span',[_vm._v(_vm._s(_vm.$t('views.status.running')))]):_vm._e()])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color2"},[_vm._v("引擎类型")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},[_vm._v(_vm._s(_vm.modelBasic.engine))]),_vm._v(" "),_c('td',{staticClass:"views-basic-color2"},[_vm._v("ID")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},[_vm._v(_vm._s(_vm.modelBasic.model_uid))])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color1"},[_vm._v("创建时间")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.modelBasic.created_at))]),_vm._v(" "),_c('td',{staticClass:"views-basic-color1"},[_vm._v("运行时长")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.modelBasic.used_time))])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color2"},[_vm._v("计算节点规格")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},[_c('span',[_vm._v("\n                    GPU:"+_vm._s(_vm.modelBasic.gpu)+"\n                ")]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v("\n                    CPU:"+_vm._s(_vm.modelBasic.cpu)+"\n                ")]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v("\n                    内存:"+_vm._s(_vm.modelBasic.memory)+"\n                ")])]),_vm._v(" "),_c('td',{staticClass:"views-basic-color2"},[_vm._v("使用模型")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},[_vm._v(_vm._s(_vm.modelBasic.mount_info.model_path.s3_path))])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color1"},[_vm._v("接口类型")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.modelBasic.type))]),_vm._v(" "),_c('td',{staticClass:"views-basic-color1"},[_vm._v("计算节点个数")]),_vm._v(" "),_c('td',[_vm._v("1")])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color2"},[_vm._v("作业参数")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},[_vm._v(_vm._s(_vm.modelBasic.param.model_name))]),_vm._v(" "),_c('td',{staticClass:"views-basic-color2"},[_vm._v("服务地址")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},[_c('a',{attrs:{"href":_vm.modelBasic.ip}},[_vm._v(_vm._s(_vm.modelBasic.ip))])])])]):_vm._e(),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"views-develop-remarks"},[_c('div',{staticClass:"views-develop-edit"},[_c('i',{staticClass:"iconfont icon-edit views-icon-edit",on:{"click":_vm.remarksEdit}})]),_vm._v(" "),_c('el-input',{attrs:{"type":"textarea","rows":8,"placeholder":"请输入内容","disabled":_vm.editDisabled},model:{value:(_vm.modelarea),callback:function ($$v) {_vm.modelarea=$$v},expression:"modelarea"}})],1),_vm._v(" "),_c('div',{staticClass:"views-model-log"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"views-task-news"},[_c('div',{staticClass:"views-task-select"},[_c('el-select',{ref:"changeFocus",attrs:{"placeholder":"请选择"},on:{"change":_vm.changeLogModel},model:{value:(_vm.logParams.model_node),callback:function ($$v) {_vm.$set(_vm.logParams, "model_node", $$v)},expression:"logParams.model_node"}},_vm._l((_vm.practice_node),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.downLog}},[_vm._v("下载日志")])],1)]),_vm._v(" "),_c('p',{staticClass:"views-task-text"},[_vm._v("在运行日志内使用鼠标上下滚动获取更多的日志")]),_vm._v(" "),_c('div',{staticClass:"views-task-log"},[_c('el-scrollbar',{staticStyle:{"height":"100%"}},[_c('div',{staticClass:"veiws-text-log"},_vm._l((_vm.journal),function(item,index){return _c('div',{key:index,staticClass:"views-text-span"},[_c('span',[_vm._v(_vm._s(index)+"：")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(item))])])}))])],1)]),_vm._v(" "),_vm._m(2),_vm._v(" "),_c('div',{staticClass:"views-picture-box"},[_c('views-picture-prediction')],1),_vm._v(" "),_c('el-dialog',{attrs:{"title":"修改作业名称","visible":_vm.dialogModel,"width":"30%","before-close":_vm.handleClose,"top":"30vh","custom-class":"views-dialog"},on:{"update:visible":function($event){_vm.dialogModel=$event}}},[_c('div',{staticClass:"views-dialog-develop"},[_c('span',{staticClass:"views-dialog-name"},[_vm._v("作业名称")]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":""},model:{value:(_vm.modelName),callback:function ($$v) {_vm.modelName=$$v},expression:"modelName"}})],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.dialogModel = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":function($event){_vm.changeDialogSingle('ModelPrediction[name]','modelName')}}},[_vm._v("确 定")])],1)]),_vm._v(" "),_c('el-dialog',{attrs:{"title":"修改备注信息","visible":_vm.remarksDialog,"width":"30%","before-close":_vm.handleClose,"top":"30vh","custom-class":"views-dialog"},on:{"update:visible":function($event){_vm.remarksDialog=$event}}},[_c('div',{staticClass:"views-dialog-develop"},[_c('span',{staticClass:"views-dialog-remarks"},[_vm._v("备注信息")]),_vm._v(" "),_c('el-input',{attrs:{"type":"textarea","rows":8,"placeholder":"请输入内容"},model:{value:(_vm.modelarea),callback:function ($$v) {_vm.modelarea=$$v},expression:"modelarea"}})],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.remarksDialog = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":function($event){_vm.remarksDialogSingle('ModelPrediction[describe]','modelarea')}}},[_vm._v("确 定")])],1)]),_vm._v(" "),_c('el-dialog',{attrs:{"title":"下载日志","visible":_vm.downDialog,"width":"30%","before-close":_vm.handleClose,"top":"30vh","custom-class":"views-dialog"},on:{"update:visible":function($event){_vm.downDialog=$event}}},[_c('div',{staticClass:"views-dialog-develop views-dialog-loading"},[_c('div',[_c('span',{staticClass:"tab-select-title tab-select-mg"},[_vm._v("选择节点：")]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose'),"clearable":""},model:{value:(_vm.logParams.model_node),callback:function ($$v) {_vm.$set(_vm.logParams, "model_node", $$v)},expression:"logParams.model_node"}},_vm._l((_vm.practice_node),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',{staticClass:"views-input-box"},[_c('span',{staticClass:"tab-select-title  tab-select-mg"},[_vm._v("选择时间：")]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","editable":false,"range-separator":"-","picker-options":_vm.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":_vm.$t('views.button.startDate'),"end-placeholder":_vm.$t('views.button.endDate'),"default-time":['00:00:00', '23:59:59']},model:{value:(_vm.nodeTime),callback:function ($$v) {_vm.nodeTime=$$v},expression:"nodeTime"}})],1)]),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.downDialog = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.dialogSingleSure}},[_vm._v("确 定")])],1)])],1)}
var modelDetails_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v("备注信息")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v("预测日志")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v("预测示例")])])}]
var modelDetails_esExports = { render: modelDetails_render, staticRenderFns: modelDetails_staticRenderFns }
/* harmony default export */ var projectSpace_modelDetails = (modelDetails_esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/modelDetails.vue
var modelDetails_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var modelDetails___vue_template_functional__ = false
/* styles */
var modelDetails___vue_styles__ = null
/* scopeId */
var modelDetails___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var modelDetails___vue_module_identifier__ = null
var modelDetails_Component = modelDetails_normalizeComponent(
  modelDetails,
  projectSpace_modelDetails,
  modelDetails___vue_template_functional__,
  modelDetails___vue_styles__,
  modelDetails___vue_scopeId__,
  modelDetails___vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_modelDetails = __webpack_exports__["default"] = (modelDetails_Component.exports);


/***/ })

});