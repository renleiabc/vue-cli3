webpackJsonp([8],{

/***/ "+CcA":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("uWvK");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("5b991cde", content, true, {});

/***/ }),

/***/ "mDZD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./src/util/validate.js
var validate = __webpack_require__("v46e");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/projectSetting.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var projectSetting = ({
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
      index: 0,
      textarea: '',
      setingDisabled: true,
      loading: true,
      userTable: [],
      addMember: false,
      memberName: '',
      user_id: '',
      obj: '',
      isCount: false,
      per: 0,
      total: 0,
      labelWidth: '80px',
      currentPage: 1,
      ruleForm: {
        name: '',
        describe: ''
      },
      rules: {
        name: [{ required: true, validator: name, trigger: 'blur' }, { min: 2, max: 30, message: this.$t('views.development.youCan'), trigger: 'blur' }],
        describe: [{ required: false, message: '请输入项目描述', trigger: 'blur' }, { max: 200, message: '长度在 10 到 200 个字符', trigger: 'blur' }]
      }
    };
  },
  created: function created() {
    this.index = this.$route.params.idSet;
    // 项目设置函数调用
    var id = this.$route.query.idSet;
    this.obj = {
      project_id: id
    };
    var obj = this.obj;
    // 请求项目设置
    this.setProjectData(obj);
    // 请求项目成员列表
    var pant = {
      project_id: id,
      page: 0
    };
    this.getProjectparticipant(pant);
  },

  watch: {
    STORE_THEME_LANG: {
      handler: function handler(options, oldOptions) {
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '80px';
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '200px';
        }
      }
    }
  },
  mounted: function mounted() {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '80px';
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '200px';
    }
  },

  methods: {
    // 进行项目设置
    setProjectData: function setProjectData(obj) {
      var _this = this;

      this.$get('/project/projectsetting', obj).then(function (res) {
        if (res.code === 200) {
          // console.log(JSON.stringify(res))
          // this.userTable = res.data.member_manage
          var basic = res.data.project_basic;
          _this.ruleForm.name = basic.name;
          _this.ruleForm.describe = basic.describe;
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 项目成员列表
    getProjectparticipant: function getProjectparticipant(obj) {
      var _this2 = this;

      this.$get('/project/projectparticipant', obj).then(function (res) {
        if (res.code === 200) {
          _this2.loading = false;
          _this2.userTable = res.data.member_manage;
          var total = res.data.total_count;
          var per = res.data.per_page;
          if (total <= per) {
            _this2.isCount = false;
          } else {
            _this2.isCount = true;
            _this2.per = per;
            _this2.total = total;
          }
        } else {
          _this2.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 分页
    projectCurrentChange: function projectCurrentChange(val) {
      var pant = {};
      pant.project_id = this.obj.project_id;
      pant.page = val;
      this.getProjectparticipant(pant);
    },

    // 删除项目成员
    devDelete: function devDelete(index, row) {
      var _this3 = this;

      var user = {
        id: row
      };
      var obj = this.obj;
      this.$post('/project/participantdelete', user).then(function (res) {
        console.log(stringify_default()(res));
        if (res.code === 200) {
          _this3.$message({
            message: res.message,
            type: 'success'
          });
          _this3.getProjectparticipant(obj);
        } else {
          _this3.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 选择用户
    searchMember: function searchMember(val) {
      this.user_id = val;
    },
    handleClose: function handleClose(done) {
      done();
    },

    // 确定添加
    changeDialogMember: function changeDialogMember() {
      var _this4 = this;

      var part = {};
      var obj = this.obj;
      part.user_id = this.user_id;
      part.project_id = this.obj.project_id;
      this.$post('/project/participantadd', part).then(function (res) {
        console.log(stringify_default()(res));
        if (res.code === 200) {
          _this4.addMember = false;
          _this4.$message({
            message: res.message,
            type: 'success'
          });
          _this4.getProjectparticipant(obj);
          _this4.user_id = '';
        } else {
          _this4.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 打开弹出窗,并请求数据
    addClick: function addClick() {
      var obj = this.obj;
      this.$store.dispatch('getShowuser', obj);
      this.addMember = true;
    },

    // 确定按钮
    settingClick: function settingClick(formName) {
      var _this5 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          // console.log(this.ruleForm)
          var form = _this5.ruleForm;
          console.log(_this5.ruleForm);
          form.project_id = _this5.obj.project_id;
          _this5.$post('/project/projectsetting', form).then(function (res) {
            console.log(stringify_default()(res));
            if (res.code === 200) {
              _this5.$message({
                message: res.message,
                type: 'success'
              });
              _this5.currentPage = 1;
              _this5.$refs[formName].resetFields();
              _this5.$router.go(-1);
            } else {
              _this5.$message({
                message: res.message,
                type: 'error'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 取消按钮
    cancelBtn: function cancelBtn(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1);
    }
  },
  components: {},
  computed: {
    memberManage: function memberManage() {
      return this.$store.getters.postMemberManage;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4a8bf3a4","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/projectSetting.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-personal"},[_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.modelPrediction.basicInf')))])]),_vm._v(" "),_c('div',{staticClass:"views-develop-inf"},[_c('el-form',{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":_vm.labelWidth}},[_c('div',{staticClass:"views-task-input"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.projectContent.projectName'),"prop":"name"}},[_c('el-input',{attrs:{"placeholder":_vm.$t('views.development.youCan'),"clearable":""},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1)],1),_vm._v(" "),(false)?_c('div',{staticClass:"views-task-image"},[_c('el-form-item',{attrs:{"label":_vm.$t('views.projectContent.description'),"prop":"describe"}},[_c('el-input',{attrs:{"type":"textarea","rows":6,"placeholder":_vm.$t('views.projectContent.enterContent'),"clearable":""},model:{value:(_vm.ruleForm.describe),callback:function ($$v) {_vm.$set(_vm.ruleForm, "describe", $$v)},expression:"ruleForm.describe"}})],1)],1):_vm._e()])],1),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"views-develop-inf"},[_c('div',{staticClass:"views-develop-mount"},[_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.addClick}},[_vm._v("添加项目成员")])],1),_vm._v(" "),_c('div',{staticClass:"views-table-content"},[_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{"width":"100%"},attrs:{"data":_vm.userTable,"tooltip-effect":"dark","border":""}},[_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.user'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v(_vm._s(scope.row.userProfile.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","label":_vm.$t('views.projectContent.addTime'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.operation'),"header-align":"center","align":"center","width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',{staticClass:"views-table-span views-table-margin del ",attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.devDelete(scope.$index, scope.row.id)}}},[_vm._v(_vm._s(_vm.$t('views.projectContent.delete')))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('div',{staticClass:"views-page"},[_c('el-pagination',{directives:[{name:"show",rawName:"v-show",value:(_vm.isCount),expression:"isCount"}],attrs:{"page-size":_vm.per,"layout":"prev, pager, next","total":_vm.total,"current-page":_vm.currentPage},on:{"current-change":_vm.projectCurrentChange,"update:currentPage":function($event){_vm.currentPage=$event}}})],1)],1),_vm._v(" "),_c('div',{staticClass:"views-develop-btn"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.cancelBtn('ruleForm')}}},[_vm._v("\n                "+_vm._s(_vm.$t('views.button.cancel'))+"\n            ")]),_vm._v(" "),_c('el-button',{staticClass:"view-btn-big",attrs:{"type":"primary"},on:{"click":function($event){_vm.settingClick('ruleForm')}}},[_vm._v("\n                "+_vm._s(_vm.$t('views.button.sure'))+"\n            ")])],1)]),_vm._v(" "),_c('el-dialog',{staticClass:"small",attrs:{"title":_vm.$t('views.projectContent.members'),"visible":_vm.addMember,"width":"30%","before-close":_vm.handleClose,"top":"30vh","custom-class":"views-dialog"},on:{"update:visible":function($event){_vm.addMember=$event}}},[_c('div',{staticClass:"views-dialog-develop views-dialog-setting"},[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.projectContent.select')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose'),"filterable":"","clearable":""},on:{"change":_vm.searchMember},model:{value:(_vm.memberName),callback:function ($$v) {_vm.memberName=$$v},expression:"memberName"}},_vm._l((_vm.memberManage),function(item){return _c('el-option',{key:item.name,attrs:{"label":item.name,"value":item.user_id,"disabled":item.disabled}})}))],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.addMember = false}}},[_vm._v("\n                "+_vm._s(_vm.$t('views.button.cancel'))+"\n            ")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.changeDialogMember}},[_vm._v("\n                "+_vm._s(_vm.$t('views.button.sure'))+"\n            ")])],1)])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v("项目成员管理")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var projectSpace_projectSetting = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/projectSetting.vue
function injectStyle (ssrContext) {
  __webpack_require__("+CcA")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4a8bf3a4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  projectSetting,
  projectSpace_projectSetting,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_projectSetting = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "uWvK":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ })

});