webpackJsonp([26],{

/***/ "kgUE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/setting/changePassword.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var changePassword = ({
  name: 'changePassword',
  data: function data() {
    var _this = this;

    var validatePass = function validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error(_this.$t('views.userManagement.tips.pwd1')));
      } else {
        if (_this.ruleForm.validPassword !== '') {
          _this.$refs.ruleForm.validateField('validPassword');
        }
        callback();
      }
    };
    var validateOldPass = function validateOldPass(rule, value, callback) {
      if (value === '') {
        callback(new Error(_this.$t('views.userManagement.tips.pwd1')));
      } else {
        callback();
      }
    };
    var validatePass2 = function validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error(_this.$t('views.userManagement.tips.pwd2')));
      } else if (value !== _this.ruleForm.password) {
        callback(new Error(_this.$t('views.userManagement.tips.pwd3')));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        validPassword: '',
        oldPassword: ''
      },
      rules: {
        password: [{ min: 6, max: 16, message: this.$t('views.userManagement.tips.pwd4'), trigger: 'blur' }, { validator: validatePass, trigger: 'blur' }],
        validPassword: [{ min: 6, max: 16, message: this.$t('views.userManagement.tips.pwd4'), trigger: 'blur' }, { validator: validatePass2, trigger: 'blur' }],
        oldPassword: [{ validator: validateOldPass, trigger: 'blur' }]
      }
    };
  },

  methods: {
    submitForm: function submitForm(formName) {
      var _this2 = this;

      this.$refs[formName].validate(function (valid) {
        var parms = {};
        parms.oldpass = _this2.ruleForm.oldPassword;
        parms.newpass = _this2.ruleForm.password;
        parms.repeatnewpass = _this2.ruleForm.validPassword;
        if (valid) {
          _this2.$post('/user/updatepassword', parms).then(function (res) {
            console.log(1);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-51ae9870","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/setting/changePassword.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-row',[_c('el-col',{attrs:{"span":10}},[_c('el-form',{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"status-icon":"","rules":_vm.rules,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"原密码","prop":"oldPassword"}},[_c('el-input',{attrs:{"type":"password"},model:{value:(_vm.ruleForm.oldPassword),callback:function ($$v) {_vm.$set(_vm.ruleForm, "oldPassword", _vm._n($$v))},expression:"ruleForm.oldPassword"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"新密码","prop":"password"}},[_c('el-input',{attrs:{"type":"password","auto-complete":"off"},model:{value:(_vm.ruleForm.password),callback:function ($$v) {_vm.$set(_vm.ruleForm, "password", $$v)},expression:"ruleForm.password"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"确认密码","prop":"validPassword"}},[_c('el-input',{attrs:{"type":"password","auto-complete":"off"},model:{value:(_vm.ruleForm.validPassword),callback:function ($$v) {_vm.$set(_vm.ruleForm, "validPassword", $$v)},expression:"ruleForm.validPassword"}})],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{staticClass:"btn",on:{"click":_vm.mixinGoBack}},[_vm._v("取消")]),_vm._v(" "),_c('el-button',{staticClass:"btn dark",attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v("保存")])],1)],1)],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var setting_changePassword = (esExports);
// CONCATENATED MODULE: ./src/views/setting/changePassword.vue
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
  changePassword,
  setting_changePassword,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_setting_changePassword = __webpack_exports__["default"] = (Component.exports);


/***/ })

});