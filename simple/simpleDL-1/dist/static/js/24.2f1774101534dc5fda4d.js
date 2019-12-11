webpackJsonp([24],{

/***/ "iECu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/util/validate.js
var validate = __webpack_require__("v46e");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/setting/personalSettings.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var personalSettings = ({
  name: 'personalSettings',
  data: function data() {
    var _this = this;

    var validatePass = function validatePass(rule, value, callback) {
      if (_this.checkedRest) {
        if (value === '') {
          callback(new Error(_this.$t('views.userManagement.tips.pwd1')));
        } else {
          if (_this.ruleForm.validPassword !== '') {
            _this.$refs.ruleForm.validateField('validPassword');
          }
          callback();
        }
      } else {
        callback();
      }
    };
    var validatePass2 = function validatePass2(rule, value, callback) {
      if (_this.checkedRest) {
        if (value === '') {
          callback(new Error(_this.$t('views.userManagement.tips.pwd2')));
        } else if (value !== _this.ruleForm.password) {
          callback(new Error(_this.$t('views.userManagement.tips.pwd3')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validateUsername = function validateUsername(rule, value, callback) {
      if (!validate["h" /* validateUsername */](value)) {
        callback(new Error(_this.$t('views.userManagement.tips.validateUsername')));
      } else {
        callback();
      }
    };
    var validateName = function validateName(rule, value, callback) {
      if (value.trim() === '') {
        callback(new Error(_this.$t('views.validError.notNull')));
      } else if (!validate["e" /* validateName */](value)) {
        callback(new Error(_this.$t('views.userManagement.tips.validateName')));
      } else {
        callback();
      }
    };
    var validateCommon = function validateCommon(rule, value, callback) {
      if (value !== '') {
        if (!validate["c" /* validateCommon */](value)) {
          callback(new Error(_this.$t('views.validError.validateCommon')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var enabelNull = function enabelNull(rule, value, callback) {
      callback();
    };
    var validateTel = function validateTel(rule, value, callback) {
      if (!validate["g" /* validateTel */](value)) {
        callback(new Error(_this.$t('views.userManagement.tips.validateTel')));
      } else {
        callback();
      }
    };
    var validateEmail = function validateEmail(rule, value, callback) {
      if (!validate["d" /* validateEmail */](value)) {
        callback(new Error(_this.$t('views.userManagement.tips.validateEmail')));
      } else {
        callback();
      }
    };
    return {
      passwordEnable: true,
      isEnUsername: false,
      isCreatUser: false,
      checkedInit: false,
      checkedRest: false,
      labelWidth: '100px',
      ruleForm: {
        username: '',
        name: '',
        status: true,
        gender: 1,
        department: '',
        grade: '',
        classes: '',
        tel: '',
        email: '',
        weixin: '',
        userinfo: '',
        isInitPwd: 0,
        password: '',
        role: 2,
        validPassword: ''
      },
      rules: {
        username: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }, { validator: validateUsername, trigger: 'blur' }],
        role: [{ required: true, message: this.$t('views.userManagement.addUser.selRole'), trigger: 'change' }],
        department: [{ validator: validateCommon, trigger: 'blur' }],
        grade: [{ validator: validateCommon, trigger: 'blur' }],
        classes: [{ validator: validateCommon, trigger: 'blur' }],
        weixin: [{ validator: enabelNull, trigger: 'blur' }],
        userinfo: [{ validator: enabelNull, trigger: 'blur' }],
        name: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }, { validator: validateName, trigger: 'blur' }],
        tel: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }, { validator: validateTel, trigger: 'blur' }],
        password: [{ min: 6, max: 16, message: this.$t('views.userManagement.tips.pwd4'), trigger: 'blur' }, { validator: validatePass, trigger: 'blur' }],
        validPassword: [{ min: 6, max: 16, message: this.$t('views.userManagement.tips.pwd4'), trigger: 'blur' }, { validator: validatePass2, trigger: 'blur' }],
        email: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }, { validator: validateEmail, trigger: 'blur' }]
      }
    };
  },
  created: function created() {
    var _this2 = this;

    if (this.$route.query.hasOwnProperty('userId')) {
      this.isCreatUser = false;
      this.$post('/user/getuserinformation').then(function (res) {
        _this2.isEnUsername = true;
        _this2.ruleForm.username = res.data.username;
        _this2.ruleForm.name = res.data.name;
        _this2.ruleForm.status = res.data.status;
        _this2.ruleForm.grade = res.data.grade;
        _this2.ruleForm.gender = res.data.gender;
        _this2.ruleForm.classes = res.data.classes_id;
        _this2.ruleForm.department = res.data.department;
        _this2.ruleForm.tel = res.data.tel;
        _this2.ruleForm.email = res.data.email;
        _this2.ruleForm.weixin = res.data.weixin;
        _this2.ruleForm.userinfo = res.data.introduce;
      });
    } else {
      this.isCreatUser = true;
      this.checkedRest = true;
      this.passwordEnable = false;
    }
  },

  watch: {
    STORE_THEME_LANG: {
      handler: function handler(options, oldOptions) {
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '100px';
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '200px';
        }
      }
    }
  },
  mounted: function mounted() {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '100px';
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '200px';
    }
  },

  methods: {
    pwdRest: function pwdRest() {
      if (this.checkedRest) {
        this.checkedInit = false;
        this.passwordEnable = false;
      } else {
        this.passwordEnable = true;
      }
    },
    pwdInit: function pwdInit() {
      this.$refs['ruleForm'].clearValidate(['password', 'validPassword']);
      if (this.checkedInit) {
        this.checkedRest = false;
        this.passwordEnable = true;
      } else {
        if (this.isCreatUser) {
          this.passwordEnable = false;
          this.checkedRest = true;
        }
      }
    },
    submitForm: function submitForm(formName) {
      var _this3 = this;

      var parms = {};
      parms.username = this.ruleForm.username;
      parms.name = this.ruleForm.name.trim();
      // 是否初始化密码
      if (this.checkedInit) {
        this.ruleForm.isInitPwd = 1;
      } else {
        this.ruleForm.isInitPwd = 0;
        parms.password = this.ruleForm.password;
      }
      parms.isInitPwd = this.ruleForm.isInitPwd;
      parms.email = this.ruleForm.email;
      parms.phone = this.ruleForm.tel;
      parms.weixin = this.ruleForm.weixin;
      parms.classes_id = this.ruleForm.classes;
      parms.gender = this.ruleForm.gender;
      parms.grade = this.ruleForm.grade;
      parms.status = this.ruleForm.status ? 1 : 0;
      parms.department = this.ruleForm.department;
      parms.introduce = this.ruleForm.userinfo;
      // 是否修改用户信息
      if (this.isCreatUser) {
        parms.role = this.ruleForm.role;
      }
      this.$refs[formName].validate(function (valid) {
        if (valid) {
          _this3.$post('/user/update', parms).then(function (res) {
            console.log(res);
            if (res.code === 200) {
              _this3.$message({
                message: _this3.$t('views.notification.saved'),
                type: 'success'
              });
              _this3.$router.push({ name: 'userManagementHome' });
            } else {
              _this3.$message({
                message: res.message,
                type: 'error'
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm: function resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-04392ee0","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/setting/personalSettings.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-user-management-add-user"},[_c('el-form',{ref:"ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":_vm.labelWidth}},[_c('el-row',[_c('el-col',{attrs:{"span":10}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.userManagement.username"),"prop":"username"}},[_c('el-input',{attrs:{"maxlength":"16","disabled":_vm.isEnUsername},model:{value:(_vm.ruleForm.username),callback:function ($$v) {_vm.$set(_vm.ruleForm, "username", $$v)},expression:"ruleForm.username"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":10,"push":2}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.userManagement.name"),"prop":"name"}},[_c('el-input',{attrs:{"maxlength":"16"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}})],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":10}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.userManagement.department"),"prop":"department"}},[_c('el-input',{attrs:{"maxlength":"20"},model:{value:(_vm.ruleForm.department),callback:function ($$v) {_vm.$set(_vm.ruleForm, "department", $$v)},expression:"ruleForm.department"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":10,"push":2}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.userManagement.gender"),"prop":"gender"}},[_c('el-radio-group',{model:{value:(_vm.ruleForm.gender),callback:function ($$v) {_vm.$set(_vm.ruleForm, "gender", $$v)},expression:"ruleForm.gender"}},[_c('el-radio',{attrs:{"label":1}},[_vm._v(_vm._s(_vm.$t("views.userManagement.man")))]),_vm._v(" "),_c('el-radio',{attrs:{"label":2}},[_vm._v(_vm._s(_vm.$t("views.userManagement.woman")))])],1)],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}})],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":10}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.userManagement.grade"),"prop":"grade"}},[_c('el-input',{attrs:{"maxlength":"20"},model:{value:(_vm.ruleForm.grade),callback:function ($$v) {_vm.$set(_vm.ruleForm, "grade", $$v)},expression:"ruleForm.grade"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":10,"push":2}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.userManagement.class"),"prop":"classes"}},[_c('el-input',{attrs:{"maxlength":"20"},model:{value:(_vm.ruleForm.classes),callback:function ($$v) {_vm.$set(_vm.ruleForm, "classes", $$v)},expression:"ruleForm.classes"}})],1)],1)],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":10}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.userManagement.phone"),"prop":"tel"}},[_c('el-input',{attrs:{"maxlength":"11"},model:{value:(_vm.ruleForm.tel),callback:function ($$v) {_vm.$set(_vm.ruleForm, "tel", $$v)},expression:"ruleForm.tel"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":10,"push":2}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.userManagement.weChatNumber"),"prop":"weixin"}},[_c('el-input',{attrs:{"maxlength":"30"},model:{value:(_vm.ruleForm.weixin),callback:function ($$v) {_vm.$set(_vm.ruleForm, "weixin", $$v)},expression:"ruleForm.weixin"}})],1)],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}})],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":10}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.userManagement.email"),"prop":"email"}},[_c('el-input',{attrs:{"maxlength":"50"},model:{value:(_vm.ruleForm.email),callback:function ($$v) {_vm.$set(_vm.ruleForm, "email", $$v)},expression:"ruleForm.email"}})],1)],1)],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":22}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.userManagement.personalProfile"),"prop":"userinfo"}},[_c('el-input',{attrs:{"type":"textarea","rows":4,"maxlength":"100"},model:{value:(_vm.ruleForm.userinfo),callback:function ($$v) {_vm.$set(_vm.ruleForm, "userinfo", $$v)},expression:"ruleForm.userinfo"}})],1)],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":_vm.$t("views.userManagement.updatePassword"),"prop":"type"}},[_c('el-checkbox',{on:{"change":_vm.pwdRest},model:{value:(_vm.checkedRest),callback:function ($$v) {_vm.checkedRest=$$v},expression:"checkedRest"}},[_vm._v(_vm._s(_vm.$t("views.userManagement.resetPassword")))]),_vm._v(" "),_c('el-checkbox',{on:{"change":_vm.pwdInit},model:{value:(_vm.checkedInit),callback:function ($$v) {_vm.checkedInit=$$v},expression:"checkedInit"}},[_vm._v(_vm._s(_vm.$t("views.userManagement.initPassword")))])],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":10}},[_c('el-form-item',{attrs:{"label":"","type":"password","prop":"password"}},[_c('el-input',{attrs:{"type":"password","disabled":_vm.passwordEnable},model:{value:(_vm.ruleForm.password),callback:function ($$v) {_vm.$set(_vm.ruleForm, "password", $$v)},expression:"ruleForm.password"}})],1)],1)],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":10}},[_c('el-form-item',{attrs:{"label":"","type":"password","prop":"validPassword"}},[_c('el-input',{attrs:{"type":"password","disabled":_vm.passwordEnable},model:{value:(_vm.ruleForm.validPassword),callback:function ($$v) {_vm.$set(_vm.ruleForm, "validPassword", $$v)},expression:"ruleForm.validPassword"}})],1)],1)],1),_vm._v(" "),_c('el-form-item',{staticClass:"text-center"},[_c('el-button',{on:{"click":_vm.mixinGoBack}},[_vm._v(_vm._s(_vm.$t("views.button.back")))]),_vm._v(" "),_c('el-button',{staticClass:"btn light",on:{"click":function($event){_vm.resetForm('ruleForm')}}},[_vm._v(_vm._s(_vm.$t("views.button.reset")))]),_vm._v(" "),_c('el-button',{staticClass:"btn dark",attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v(_vm._s(_vm.$t("views.button.save")))])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var setting_personalSettings = (esExports);
// CONCATENATED MODULE: ./src/views/setting/personalSettings.vue
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
  personalSettings,
  setting_personalSettings,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_setting_personalSettings = __webpack_exports__["default"] = (Component.exports);


/***/ })

});