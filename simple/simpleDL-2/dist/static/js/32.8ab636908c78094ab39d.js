webpackJsonp([32],{

/***/ "yR4D":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("bOdI");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/util/index.js
var util = __webpack_require__("ZoQJ");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/partDevelopDetails.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var partDevelopDetails = ({
  data: function data() {
    return {
      devDetails: '',
      devBasic: '',
      developName: '',
      editDisabled: true,
      remarksDialog: false,
      dialogDev: false,
      developarea: '',
      useProject: 'width:98%;height:400px;',
      resource: {
        environment_id: '',
        time_status: 1
      },
      resourcesUseData: {},
      obj: {
        environment_id: ''
      },
      timeValue: 1,
      id: '',
      logParams: {
        practice_id: '',
        practice_node: ''
      }
    };
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    var partId = this.$route.query.partId;
    if (to.name === 'partProjectDetails' && to.query.partId === undefined) {
      this.$router.push({
        name: 'partProjectDetails',
        query: {
          partId: partId
        }
      });
    } else {
      next();
    }
  },
  created: function created() {
    console.log(this.$route.query);
    // 获取不同时间段函数调用
    this.$store.dispatch('getTimestatus');
    this.index = this.$route.query.idDevelop;
    this.resource.environment_id = this.obj.environment_id = this.$route.query.idDevelop;
    // 获取开发环境信息函数调用
    this.getDevelopmentDetails(this.obj);
    // 开发环境资源使用情况
    this.environmentresource(this.resource);
  },
  mounted: function mounted() {},

  methods: {
    // 获取开发环境信息函数
    getDevelopmentDetails: function getDevelopmentDetails(obj) {
      var _this = this;

      this.$get('/environmentproject/environmentdetail', obj).then(function (res) {
        //  console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 基本信息
          _this.devBasic = res.data;
          // console.log(JSON.stringify(this.devBasic))
          // 环境名称
          _this.developName = res.data.name;
          // 备注
          _this.developarea = res.data.describe;
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 修改环境名称
    nameEdit: function nameEdit() {
      this.dialogDev = true;
    },

    // 选择不同的时间段
    changeTimes: function changeTimes(val) {
      this.resource.time_status = val;
      this.environmentresource(this.resource);
    },

    // 修改备注信息
    remarksEdit: function remarksEdit() {
      this.remarksDialog = true;
    },
    handleClose: function handleClose(done) {
      done();
    },

    // 修改开发环境名称、备注信息函数
    environmentupdate: function environmentupdate(obj) {
      var _this2 = this;

      this.$post('/environmentproject/environmentupdate', obj).then(function (res) {
        if (res.code === 200) {
          _this2.$message({
            message: res.message,
            type: 'success'
          });
          _this2.getDevelopmentDetails(_this2.obj);
        } else {
          _this2.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 修改环境名称确定按钮
    changeDialogSingle: function changeDialogSingle() {
      var name = 'Environment[name]';
      var obj = defineProperty_default()({
        environment_id: this.obj.environment_id
      }, name, this.developName);
      this.environmentupdate(obj);
      this.dialogDev = false;
    },

    // 修改备注信息确定按钮
    remarksDialogSingle: function remarksDialogSingle() {
      var name = 'Environment[describe]';
      var obj = defineProperty_default()({
        environment_id: this.obj.environment_id
      }, name, this.developarea);
      this.environmentupdate(obj);
      this.remarksDialog = false;
    },

    // 开发环境资源使用情况
    environmentresource: function environmentresource(obj) {
      var _this3 = this;

      console.log(obj);
      this.$post('/environmentproject/environmentresource', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          var data = res.data;
          data.show.value = Object(util["f" /* toPercent */])(data.show.value);
          data.cpu.value = Object(util["f" /* toPercent */])(data.cpu.value);
          data.memory.value = Object(util["f" /* toPercent */])(data.memory.value);
          data.gpu.value = Object(util["f" /* toPercent */])(data.gpu.value);
          // console.log(JSON.stringify(data))
          var color = ['#F17472', '#42E1BB', '#FEC633', '#54BECC'];
          _this3.resourcesUseData = Object(util["b" /* echratsData */])(color, data);
        } else {
          _this3.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 项目使用情况数据渲染
    projectUse: function projectUse(data) {
      setTimeout(function () {}, 1000);
    }
  },
  components: {},
  computed: {
    timestatus: function timestatus() {
      return this.$store.getters.postTimestatus;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-924e05c2","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/partDevelopDetails.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-personal"},[_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.modelPrediction.basicInf')))])]),_vm._v(" "),_c('table',{staticClass:"views-project-details views-tabel-details"},[_c('tr',[_c('td',{staticClass:"views-basic-color1"},[_vm._v("环境名称")]),_vm._v(" "),_c('td',{staticClass:"views-basic-name"},[_c('el-input',{attrs:{"placeholder":"","disabled":_vm.editDisabled},model:{value:(_vm.developName),callback:function ($$v) {_vm.developName=$$v},expression:"developName"}}),_vm._v(" "),_c('i',{staticClass:"iconfont icon-edit views-icon-edit",on:{"click":_vm.nameEdit}})],1),_vm._v(" "),_c('td',{staticClass:"views-basic-color1"},[_vm._v("环境ID")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.devBasic.environment_uid))])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color2"},[_vm._v("状态")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},[(_vm.devBasic.status === 0)?_c('span',[_vm._v("\n                    异常\n                ")]):_vm._e(),_vm._v(" "),(_vm.devBasic.status === 1)?_c('span',[_vm._v("\n                    运行中\n                ")]):_vm._e()]),_vm._v(" "),_c('td',{staticClass:"views-basic-color2"},[_vm._v("密码")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},[_vm._v(_vm._s(_vm.devBasic.password))])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color1"},[_vm._v("创建时间")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.devBasic.created_at))]),_vm._v(" "),_c('td',{staticClass:"views-basic-color1"},[_vm._v("更新时间")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.devBasic.update_at))])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color2"},[_vm._v("镜像分类")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3",attrs:{"colspan":"3"}},[_vm._v(_vm._s(_vm.devBasic.category))])])]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('table',{staticClass:"views-project-details views-tabel-details"},[_c('tr',[_c('td',{staticClass:"views-basic-color1"},[_vm._v("notebook访问地址")]),_vm._v(" "),_c('td',[_c('a',{attrs:{"href":_vm.devBasic.notebook_url}},[_vm._v("\n                    "+_vm._s(_vm.devBasic.notebook_url)+"\n                ")])]),_vm._v(" "),_c('td',{staticClass:"views-basic-color1"},[_vm._v("远程登陆访问地址")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.devBasic.ssh_url))])])]),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"views-develop-remarks"},[_c('div',{staticClass:"views-develop-edit"},[_c('i',{staticClass:"iconfont icon-edit views-icon-edit",on:{"click":_vm.remarksEdit}})]),_vm._v(" "),_c('el-input',{attrs:{"type":"textarea","rows":8,"placeholder":"请输入内容","disabled":_vm.editDisabled},model:{value:(_vm.developarea),callback:function ($$v) {_vm.developarea=$$v},expression:"developarea"}})],1),_vm._v(" "),_vm._m(2),_vm._v(" "),_c('table',{staticClass:"views-project-details views-tabel-details"},[_c('tr',[_c('td',{staticClass:"views-basic-color1"},[_vm._v("CPU")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.devBasic.cpu)+"个")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color1"},[_vm._v("GPU")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.devBasic.gpu)+"个")])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color2"},[_vm._v("内存")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3",attrs:{"colspan":"3"}},[_vm._v(_vm._s(_vm.devBasic.memory)+"G")])])]),_vm._v(" "),_vm._m(3),_vm._v(" "),_c('div',{staticClass:"views-charts-mt"},[_c('div',{staticClass:"views-chats-times"},[_c('el-select',{ref:"changeFocus",attrs:{"placeholder":"请选择"},on:{"change":_vm.changeTimes},model:{value:(_vm.timeValue),callback:function ($$v) {_vm.timeValue=$$v},expression:"timeValue"}},_vm._l((_vm.timestatus),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('sedu-echarts',{attrs:{"domId":"developUse","option":_vm.resourcesUseData,"myStyle":_vm.useProject}})],1),_vm._v(" "),_c('el-dialog',{attrs:{"title":"修改环境名称","visible":_vm.dialogDev,"width":"30%","before-close":_vm.handleClose,"top":"30vh","custom-class":"views-dialog"},on:{"update:visible":function($event){_vm.dialogDev=$event}}},[_c('div',{staticClass:"views-dialog-develop"},[_c('span',{staticClass:"views-dialog-name"},[_vm._v("环境名称")]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":""},model:{value:(_vm.developName),callback:function ($$v) {_vm.developName=$$v},expression:"developName"}})],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.dialogDev = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.changeDialogSingle}},[_vm._v("确 定")])],1)]),_vm._v(" "),_c('el-dialog',{attrs:{"title":"修改备注信息","visible":_vm.remarksDialog,"width":"30%","before-close":_vm.handleClose,"top":"30vh","custom-class":"views-dialog"},on:{"update:visible":function($event){_vm.remarksDialog=$event}}},[_c('div',{staticClass:"views-dialog-develop"},[_c('span',{staticClass:"views-dialog-remarks"},[_vm._v("备注信息")]),_vm._v(" "),_c('el-input',{attrs:{"type":"textarea","rows":8,"placeholder":"请输入内容"},model:{value:(_vm.developarea),callback:function ($$v) {_vm.developarea=$$v},expression:"developarea"}})],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.remarksDialog = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.remarksDialogSingle}},[_vm._v("确 定")])],1)])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v("服务器地址")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v("备注信息")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v("配置信息")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v("资源使用情况")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var projectSpace_partDevelopDetails = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/partDevelopDetails.vue
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
  partDevelopDetails,
  projectSpace_partDevelopDetails,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_partDevelopDetails = __webpack_exports__["default"] = (Component.exports);


/***/ })

});