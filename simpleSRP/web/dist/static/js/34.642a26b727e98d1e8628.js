webpackJsonp([34],{iECu:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=t("v46e"),a={name:"personalSettings",data:function(){var e=this,r=function(r,t,a){""!==t?s.d(t)?a():a(new Error(e.$t("views.validError.validStr"))):a()};return{passwordEnable:!0,isEnUsername:!1,isCreatUser:!1,checkedInit:!1,checkedRest:!1,labelWidth:"100px",ruleForm:{username:"",name:"",status:!0,gender:1,department:"",grade:"",classes:"",tel:"",email:"",weixin:"",userinfo:"",isInitPwd:0,password:"",role:2,validPassword:""},rules:{username:[{required:!0,message:this.$t("views.validError.notNull"),trigger:"blur"},{validator:function(r,t,a){s.j(t)?a():a(new Error(e.$t("views.userManagement.tips.validateUsername")))},trigger:"blur"}],role:[{required:!0,message:this.$t("views.userManagement.addUser.selRole"),trigger:"change"}],department:[{validator:r,trigger:"blur"}],grade:[{validator:r,trigger:"blur"}],classes:[{validator:r,trigger:"blur"}],weixin:[{validator:r,trigger:"blur"}],userinfo:[{validator:function(e,r,t){t()},trigger:"blur"}],name:[{required:!0,message:this.$t("views.validError.notNull"),trigger:"blur"},{validator:function(r,t,a){""===t.trim()?a(new Error(e.$t("views.validError.notNull"))):s.f(t)?a():a(new Error(e.$t("views.userManagement.tips.validateName")))},trigger:"blur"}],tel:[{required:!0,message:this.$t("views.validError.notNull"),trigger:"blur"},{validator:function(r,t,a){s.i(t)?a():a(new Error(e.$t("views.userManagement.tips.validateTel")))},trigger:"blur"}],password:[{min:5,max:16,message:this.$t("views.userManagement.tips.pwd4"),trigger:"blur"},{validator:function(r,t,a){console.log(e.checkedRest),e.checkedRest?""===t?a(new Error(e.$t("views.userManagement.tips.pwd1"))):s.h(t)?""!==e.ruleForm.validPassword?(e.$refs.ruleForm.validateField("validPassword"),a()):a():a(new Error(e.$t("views.userManagement.tips.pwd4"))):a()},trigger:"blur"}],validPassword:[{min:5,max:16,message:this.$t("views.userManagement.tips.pwd4"),trigger:"blur"},{validator:function(r,t,a){e.checkedRest?""===t?a(new Error(e.$t("views.userManagement.tips.pwd2"))):s.h(t)?t!==e.ruleForm.password?a(new Error(e.$t("views.userManagement.tips.pwd3"))):a():a(new Error(e.$t("views.userManagement.tips.pwd4"))):a()},trigger:"blur"}],email:[{required:!0,message:this.$t("views.validError.notNull"),trigger:"blur"},{validator:function(r,t,a){s.e(t)?a():a(new Error(e.$t("views.userManagement.tips.validateEmail")))},trigger:"blur"}]}}},created:function(){this.initPage()},watch:{STORE_THEME_LANG:{handler:function(e,r){"zh"===this.STORE_THEME_LANG&&(this.labelWidth="100px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="200px")}}},mounted:function(){"zh"===this.STORE_THEME_LANG&&(this.labelWidth="100px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="200px")},methods:{pwdRest:function(){this.$refs.ruleForm.clearValidate(["password","validPassword"]),this.checkedRest?(this.checkedInit=!1,this.passwordEnable=!1):this.passwordEnable=!0},initPage:function(){var e=this;if(this.$route.query.hasOwnProperty("userId")){this.isCreatUser=!1;var r=this.$route.query.userId;this.$post("/user/getuserinformation",{id:r}).then(function(r){e.isEnUsername=!0,e.ruleForm.username=r.data.username,e.ruleForm.name=r.data.name,e.ruleForm.status=1===r.data.status,e.ruleForm.grade=r.data.grade,e.ruleForm.gender=r.data.gender,e.ruleForm.classes=r.data.classes_id,e.ruleForm.department=r.data.department,e.ruleForm.tel=r.data.tel,e.ruleForm.email=r.data.email,e.ruleForm.weixin=r.data.weixin,e.ruleForm.userinfo=r.data.introduce})}else this.isCreatUser=!0,this.checkedRest=!0,this.passwordEnable=!1},pwdInit:function(){this.$refs.ruleForm.clearValidate(["password","validPassword"]),this.ruleForm.password="",this.ruleForm.validPassword="",this.checkedInit?(this.checkedRest=!1,this.passwordEnable=!0):this.isCreatUser&&(this.passwordEnable=!1,this.checkedRest=!0)},submitForm:function(e){var r=this,t={};t.username=this.ruleForm.username,t.name=this.ruleForm.name.trim(),t.username=this.ruleForm.username.trim(),this.checkedInit?this.ruleForm.isInitPwd=1:(this.ruleForm.isInitPwd=0,t.password=s.c(this.ruleForm.password)),t.isInitPwd=this.ruleForm.isInitPwd,t.email=this.ruleForm.email,t.phone=this.ruleForm.tel,t.weixin=this.ruleForm.weixin,t.classes_id=this.ruleForm.classes,t.gender=this.ruleForm.gender,t.grade=this.ruleForm.grade,t.status=this.ruleForm.status?1:0,t.department=this.ruleForm.department,t.introduce=this.ruleForm.userinfo,this.isCreatUser&&(t.role=this.ruleForm.role),this.$refs[e].validate(function(e){if(!e)return!1;r.$post("/user/update",t).then(function(e){200===e.code?(r.$message({message:r.$t("views.notification.saved"),type:"success"}),r.$router.push({name:"userManagementHome"})):r.$message({message:e.message,type:"error"})})})},resetForm:function(e){this.isCreatUser?(this.$refs[e].resetFields(),this.checkedInit=!1,this.passwordEnable=!1):(this.initPage(),this.checkedInit=!1,this.checkedRest=!1,this.passwordEnable=!0,this.$refs[e].resetFields())}}},l={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"views-user-management-add-user"},[t("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":e.labelWidth}},[t("el-row",[t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{label:e.$t("views.userManagement.username"),prop:"username"}},[t("el-input",{attrs:{maxlength:"16",disabled:e.isEnUsername},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:10,push:2}},[t("el-form-item",{attrs:{label:e.$t("views.userManagement.name"),prop:"name"}},[t("el-input",{attrs:{maxlength:"16"},model:{value:e.ruleForm.name,callback:function(r){e.$set(e.ruleForm,"name",r)},expression:"ruleForm.name"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:4}})],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{label:e.$t("views.userManagement.department"),prop:"department"}},[t("el-input",{attrs:{maxlength:"20"},model:{value:e.ruleForm.department,callback:function(r){e.$set(e.ruleForm,"department",r)},expression:"ruleForm.department"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:10,push:2}},[t("el-form-item",{attrs:{label:e.$t("views.userManagement.gender"),prop:"gender"}},[t("el-radio-group",{model:{value:e.ruleForm.gender,callback:function(r){e.$set(e.ruleForm,"gender",r)},expression:"ruleForm.gender"}},[t("el-radio",{attrs:{label:1}},[e._v(e._s(e.$t("views.userManagement.man")))]),e._v(" "),t("el-radio",{attrs:{label:2}},[e._v(e._s(e.$t("views.userManagement.woman")))])],1)],1)],1),e._v(" "),t("el-col",{attrs:{span:4}})],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{label:e.$t("views.userManagement.grade"),prop:"grade"}},[t("el-input",{attrs:{maxlength:"20"},model:{value:e.ruleForm.grade,callback:function(r){e.$set(e.ruleForm,"grade",r)},expression:"ruleForm.grade"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:10,push:2}},[t("el-form-item",{attrs:{label:e.$t("views.userManagement.class"),prop:"classes"}},[t("el-input",{attrs:{maxlength:"20"},model:{value:e.ruleForm.classes,callback:function(r){e.$set(e.ruleForm,"classes",r)},expression:"ruleForm.classes"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{label:e.$t("views.userManagement.phone"),prop:"tel"}},[t("el-input",{attrs:{maxlength:"11"},model:{value:e.ruleForm.tel,callback:function(r){e.$set(e.ruleForm,"tel",r)},expression:"ruleForm.tel"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:10,push:2}},[t("el-form-item",{attrs:{label:e.$t("views.userManagement.weChatNumber"),prop:"weixin"}},[t("el-input",{attrs:{maxlength:"30"},model:{value:e.ruleForm.weixin,callback:function(r){e.$set(e.ruleForm,"weixin",r)},expression:"ruleForm.weixin"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:4}})],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{label:e.$t("views.userManagement.email"),prop:"email"}},[t("el-input",{attrs:{maxlength:"50"},model:{value:e.ruleForm.email,callback:function(r){e.$set(e.ruleForm,"email",r)},expression:"ruleForm.email"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:22}},[t("el-form-item",{attrs:{label:e.$t("views.userManagement.personalProfile"),prop:"userinfo"}},[t("el-input",{attrs:{type:"textarea",rows:4,maxlength:"100"},model:{value:e.ruleForm.userinfo,callback:function(r){e.$set(e.ruleForm,"userinfo",r)},expression:"ruleForm.userinfo"}})],1)],1)],1),e._v(" "),t("el-form-item",{attrs:{label:e.$t("views.userManagement.updatePassword"),prop:"type"}},[t("el-checkbox",{on:{change:e.pwdRest},model:{value:e.checkedRest,callback:function(r){e.checkedRest=r},expression:"checkedRest"}},[e._v(e._s(e.$t("views.userManagement.resetPassword")))]),e._v(" "),t("el-checkbox",{on:{change:e.pwdInit},model:{value:e.checkedInit,callback:function(r){e.checkedInit=r},expression:"checkedInit"}},[e._v(e._s(e.$t("views.userManagement.initPassword")))])],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{type:"password",prop:"password"}},[t("span",{attrs:{slot:"label"},slot:"label"},[t("i",{staticStyle:{color:"red"}},[e._v("*")]),e._v(" "+e._s(e.$t("views.userManagement.password"))+"\n          ")]),e._v(" "),t("el-input",{attrs:{type:"password",disabled:e.passwordEnable},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{type:"password",prop:"validPassword"}},[t("span",{attrs:{slot:"label"},slot:"label"},[t("i",{staticStyle:{color:"red"}},[e._v("*")]),e._v(" "+e._s(e.$t("views.userManagement.confirmPassword"))+"\n          ")]),e._v(" "),t("el-input",{attrs:{type:"password",disabled:e.passwordEnable},model:{value:e.ruleForm.validPassword,callback:function(r){e.$set(e.ruleForm,"validPassword",r)},expression:"ruleForm.validPassword"}})],1)],1)],1),e._v(" "),t("el-form-item",{staticClass:"text-center"},[t("el-button",{on:{click:e.mixinGoBack}},[e._v(e._s(e.$t("views.button.back")))]),e._v(" "),t("el-button",{staticClass:"btn light",on:{click:function(r){return e.resetForm("ruleForm")}}},[e._v(e._s(e.$t("views.button.reset")))]),e._v(" "),t("el-button",{staticClass:"btn dark",attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v(e._s(e.$t("views.button.save")))])],1)],1)],1)},staticRenderFns:[]},i=t("C7Lr")(a,l,!1,null,null,null);r.default=i.exports}});