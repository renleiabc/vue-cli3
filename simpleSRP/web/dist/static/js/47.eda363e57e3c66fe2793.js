webpackJsonp([47],{yR4D:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("a3Yh"),i=s.n(a),r=s("ZoQJ"),o=s("v46e"),l={data:function(){return{devDetails:"",devBasic:"",developName:"",editDisabled:!0,remarksDialog:!1,dialogDev:!1,developarea:"",useProject:"width:95%;height:400px;margin:0 auto;",resource:{environment_id:"",time_status:1},resourcesUseData:{},obj:{environment_id:""},timeValue:1,id:"",logParams:{practice_id:"",practice_node:""},labelWidth:"100px",ruleForm:{name:"",desc:""},descRules:{desc:[{required:!1,validator:function(e,t,s){""===t?s():Object(o.d)(t)?s():s(new Error("不得包含特殊字符:<>:'\"/\\."))},trigger:"blur"}]},createDevrules:{name:[{required:!0,validator:function(e,t,s){""===t?s(new Error("请输入名称")):Object(o.j)(t)?s():s(new Error("只能输入2-30位字母、数字、下划线"))},trigger:"blur"},{min:2,max:30,message:this.$t("views.development.youCan"),trigger:"blur"}]},mount:[]}},beforeRouteLeave:function(e,t,s){var a=this.$route.query.partId;"partProjectDetails"===e.name&&void 0===e.query.partId?this.$router.push({name:"partProjectDetails",query:{partId:a}}):s()},created:function(){this.$store.dispatch("getTimestatus"),this.index=this.$route.query.idDevelop,this.resource.environment_id=this.obj.environment_id=this.$route.query.idDevelop,this.getDevelopmentDetails(this.obj),this.environmentresource(this.resource)},mounted:function(){},methods:{getDevelopmentDetails:function(e){var t=this;this.$get("/environmentproject/environmentdetail",e).then(function(e){if(200===e.code){t.devBasic=e.data;var s=e.data.mount_info;if(null===s)t.mount=[];else for(var a in t.mount=[],s){var i={bucket:a.substring(5),dir:a};t.mount.push(i)}t.ruleForm.name=e.data.name,t.ruleForm.desc=e.data.describe}else t.$message({message:e.message,type:"error"})})},remarksEdit:function(){this.ruleForm.desc=this.devBasic.describe,this.remarksDialog=!0},nameEdit:function(){this.dialogDev=!0,this.ruleForm.name=this.devBasic.name},dialogCancel:function(e){this.$refs[e].resetFields(),this.dialogDev=!1},remarksCancel:function(e){this.$refs[e].resetFields(),this.remarksDialog=!1},changeTimes:function(e){this.resource.time_status=e,this.environmentresource(this.resource)},handleClose:function(e){e()},environmentupdate:function(e){var t=this;this.$post("/environmentproject/environmentupdate",e).then(function(e){200===e.code?(t.$message({message:e.message,type:"success"}),t.getDevelopmentDetails(t.obj)):t.$message({message:e.message,type:"error"})})},changeDialogSingle:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var s=i()({environment_id:t.obj.environment_id},"Environment[name]",t.ruleForm.name);t.environmentupdate(s),t.dialogDev=!1})},remarksDialogSingle:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var s={environment_id:t.obj.environment_id,"Environment[describe]":t.ruleForm.desc};t.environmentupdate(s),t.remarksDialog=!1})},environmentresource:function(e){var t=this;this.$post("/environmentproject/environmentresource",e).then(function(e){if(200===e.code){var s=e.data;s.show.value=Object(r.j)(s.show.value),s.cpu.value=Object(r.j)(s.cpu.value),s.memory.value=Object(r.j)(s.memory.value),s.gpu.value=Object(r.j)(s.gpu.value);console.log(s.time),s.time&&(t.resourcesUseData=Object(r.f)(["#F17472","#42E1BB","#FEC633","#54BECC"],s))}else t.$message({message:e.message,type:"error"})})},projectUse:function(e){setTimeout(function(){},1e3)}},components:{},computed:{timestatus:function(){return this.$store.getters.postTimestatus}}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"views-personal"},[s("div",{staticClass:"views-header-inf"},[s("span",[e._v(e._s(e.$t("views.modelPrediction.basicInf")))])]),e._v(" "),s("table",{staticClass:"views-project-details views-tabel-details"},[s("tr",[s("td",{staticClass:"views-basic-color1"},[e._v("环境名称")]),e._v(" "),s("td",{staticClass:"views-basic-name"},[s("el-input",{attrs:{placeholder:"",disabled:e.editDisabled},model:{value:e.devBasic.name,callback:function(t){e.$set(e.devBasic,"name",t)},expression:"devBasic.name"}}),e._v(" "),s("i",{staticClass:"iconfont icon-edit views-icon-edit",on:{click:e.nameEdit}})],1),e._v(" "),s("td",{staticClass:"views-basic-color1"},[e._v("环境ID")]),e._v(" "),s("td",[e._v(e._s(e.devBasic.environment_uid))])]),e._v(" "),s("tr",[s("td",{staticClass:"views-basic-color2"},[e._v("状态")]),e._v(" "),s("td",{staticClass:"views-basic-color3"},[0===e.devBasic.status?s("span",[e._v("\n          异常\n        ")]):e._e(),e._v(" "),1===e.devBasic.status?s("span",[e._v("\n          运行中\n        ")]):e._e(),e._v(" "),2===e.devBasic.status?s("span",[e._v("\n          创建中\n        ")]):e._e()]),e._v(" "),s("td",{staticClass:"views-basic-color2"},[e._v("密码")]),e._v(" "),s("td",{staticClass:"views-basic-color3"},[e._v(e._s(e.devBasic.password))])]),e._v(" "),s("tr",[s("td",{staticClass:"views-basic-color1"},[e._v("创建时间")]),e._v(" "),s("td",[e._v(e._s(e.devBasic.created_at))]),e._v(" "),s("td",{staticClass:"views-basic-color1"},[e._v("更新时间")]),e._v(" "),s("td",[e._v(e._s(e.devBasic.update_at))])]),e._v(" "),s("tr",[s("td",{staticClass:"views-basic-color2"},[e._v("镜像分类")]),e._v(" "),s("td",{staticClass:"views-basic-color3",attrs:{colspan:"3"}},[e._v(e._s(e.devBasic.category))])])]),e._v(" "),e._m(0),e._v(" "),s("table",{staticClass:"views-project-details views-tabel-details"},[s("tr",[s("td",{staticClass:"views-basic-color1"},[e._v("notebook访问地址")]),e._v(" "),s("td",[s("a",{attrs:{href:e.devBasic.notebook_url,target:"_blank"}},[e._v("\n          "+e._s(e.devBasic.notebook_url)+"\n        ")])]),e._v(" "),s("td",{staticClass:"views-basic-color1"},[e._v("远程登录访问地址")]),e._v(" "),s("td",[e._v(e._s(e.devBasic.ssh_url))])])]),e._v(" "),e._m(1),e._v(" "),s("div",{staticClass:"views-develop-remarks"},[s("div",{staticClass:"views-develop-edit"},[s("i",{staticClass:"iconfont icon-edit views-icon-edit",on:{click:e.remarksEdit}})]),e._v(" "),s("el-input",{attrs:{type:"textarea",rows:8,placeholder:"请输入内容",disabled:e.editDisabled},model:{value:e.devBasic.describe,callback:function(t){e.$set(e.devBasic,"describe",t)},expression:"devBasic.describe"}})],1),e._v(" "),e._m(2),e._v(" "),s("table",{staticClass:"views-project-details views-tabel-details"},[0===e.mount.length?s("tr",[s("td",[s("div",{attrs:{slot:"empty"},slot:"empty"},[s("div",{staticClass:"views-empty"},[s("span",{staticClass:"views-empty-table"}),e._v(" "),s("p",{staticClass:"views-empty-text"},[e._v(e._s(e.$t("views.table.noData")))])])])])]):e._l(e.mount,function(t,a){return s("tr",{key:a},[s("td",{staticClass:"views-basic-color1"},[e._v("ks3_bucket")]),e._v(" "),s("td",[e._v("\n        "+e._s(t.bucket)+"\n      ")]),e._v(" "),s("td",{staticClass:"views-basic-color1"},[e._v("local_dir")]),e._v(" "),s("td",[e._v(" "+e._s(t.dir))])])})],2),e._v(" "),e._m(3),e._v(" "),s("table",{staticClass:"views-project-details views-tabel-details"},[s("tr",[s("td",{staticClass:"views-basic-color1"},[e._v("CPU")]),e._v(" "),s("td",[e._v(e._s(e.devBasic.cpu)+" 核")]),e._v(" "),s("td",{staticClass:"views-basic-color1"},[e._v("GPU")]),e._v(" "),s("td",[e._v(e._s(e.devBasic.gpu)+" 个")])]),e._v(" "),s("tr",[s("td",{staticClass:"views-basic-color2"},[e._v("内存")]),e._v(" "),s("td",{staticClass:"views-basic-color3",attrs:{colspan:"3"}},[e._v(e._s(e.devBasic.memory)+" G")])])]),e._v(" "),e._m(4),e._v(" "),s("div",{staticClass:"views-charts-mt"},[s("div",{staticClass:"views-chats-times"},[s("el-select",{ref:"changeFocus",attrs:{placeholder:"请选择"},on:{change:e.changeTimes},model:{value:e.timeValue,callback:function(t){e.timeValue=t},expression:"timeValue"}},e._l(e.timestatus,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),"{}"!==JSON.stringify(e.resourcesUseData)?s("sedu-echarts",{attrs:{domId:"developUse",option:e.resourcesUseData,myStyle:e.useProject}}):s("span",[e._v("暂无数据")])],1),e._v(" "),s("el-dialog",{attrs:{title:"修改环境名称",visible:e.dialogDev,width:"30%","before-close":e.handleClose,top:"30vh","custom-class":"views-dialog"},on:{"update:visible":function(t){e.dialogDev=t}}},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.createDevrules,"label-width":e.labelWidth}},[s("div",{staticClass:"views-modify-name"},[s("el-form-item",{attrs:{label:e.$t("views.development.environmentalName"),prop:"name"}},[s("el-input",{attrs:{placeholder:e.$t("views.development.youCan"),minlength:"2",maxlength:"30",clearable:""},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1)],1)]),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"cancel",on:{click:function(t){return e.dialogCancel("ruleForm")}}},[e._v("取 消")]),e._v(" "),s("el-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:function(t){return e.changeDialogSingle("ruleForm")}}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"修改备注信息",visible:e.remarksDialog,width:"30%","before-close":e.handleClose,top:"30vh","custom-class":"views-dialog"},on:{"update:visible":function(t){e.remarksDialog=t}}},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.descRules,"label-width":e.labelWidth}},[s("div",{staticClass:"views-dialog-develop"},[s("el-form-item",{attrs:{label:"备注信息",prop:"desc"}},[s("el-input",{attrs:{type:"textarea",rows:8,maxlength:"200",placeholder:"请输入内容"},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1)],1)]),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"cancel",on:{click:function(t){return e.remarksCancel("ruleForm")}}},[e._v("取 消")]),e._v(" "),s("el-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:function(t){return e.remarksDialogSingle("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"views-header-inf"},[t("span",[this._v("服务器地址")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"views-header-inf"},[t("span",[this._v("备注信息")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"views-header-inf"},[t("span",[this._v("存储挂载信息")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"views-header-inf"},[t("span",[this._v("配置信息")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"views-header-inf"},[t("span",[this._v("资源使用情况")])])}]},c=s("C7Lr")(l,n,!1,null,null,null);t.default=c.exports}});