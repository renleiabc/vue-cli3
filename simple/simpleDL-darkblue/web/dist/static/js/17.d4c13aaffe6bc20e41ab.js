webpackJsonp([17],{EuJu:function(e,t,s){"use strict";var i={data:function(){return{path:{storage_id:"",storage_child_id:"",type:""},propsChild:{label:"label",children:"zones",isLeaf:"leaf"},num:0}},created:function(){},mounted:function(){},methods:{loadNode:function(e,t){this.path.storage_id=this.item.id,this.path.type=this.type,0===e.level&&this.getProjectpath(this.path,t),e.level>=1&&(this.path.storage_child_id=e.data.id,this.getProjectpath(this.path,t))},getProjectpath:function(e,t){var s=this;this.$get("/practiceproject/projectpath",e).then(function(e){if(200===e.code){var i=[];e.data.forEach(function(e){var t={id:parseInt(e.id),storage_id:parseInt(e.storage_id),label:e.path,accessid:e.accessid,accesskey:e.accesskey,children:[]};"1"===e.type?(t.leaf=!1,t.type=1):"2"===e.type&&(t.leaf=!0,t.type=2),1===e.is_init?t.mount_flag="ro":t.mount_flag="rw",i.push(t)}),t(i)}else s.$message({message:e.message,type:"error"})})},handleNodeClick:function(e,t,s){var i=this.item.php_name;this.$store.commit("projectpath",{data:e,name:i})}},components:{},computed:{},props:{item:Object,type:Number}},a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[t("div",{staticClass:"views-code-tree"},[t("el-tree",{ref:"tree",attrs:{props:this.propsChild,lazy:"",load:this.loadNode,"highlight-current":"","empty-text":"暂无数据","node-key":"id"},on:{"node-click":this.handleNodeClick}})],1)])},staticRenderFns:[]},o={data:function(){return{storagelist:"",common_storage:[],personal_storage:[],personal:"",common:"",activeName:"first"}},created:function(){this.getStoragelist()},mounted:function(){},methods:{getStoragelist:function(){var e=this;this.$post("/environmentproject/storagelist").then(function(t){if(200===t.code){var s=t.data.personal_storage,i=t.data.common_storage;0!==s.length&&(e.personal=s[0].id),0!==i.length&&(e.common=i[0].id),s.forEach(function(e,t){e.active=!1,0===t&&(e.active=!0)}),i.forEach(function(e,t){e.active=!1,0===t&&(e.active=!0)}),e.personal_storage=s,e.common_storage=i}else e.$message({message:t.message,type:"error"})})},changeRadio:function(e){this.personal_storage.forEach(function(t,s){t.active=!1,t.id===e&&(t.active=!0)})},changeCommon:function(e){this.common_storage.forEach(function(t,s){t.active=!1,t.id===e&&(t.active=!0)})}},props:["type","isFirst","isSecond"],components:{ViewsTreeDir:s("C7Lr")(i,a,!1,null,null,null).exports},computed:{}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[e.isFirst?s("el-tab-pane",{attrs:{label:e.$t("views.development.personalStorage"),name:"first"}},[s("div",{staticClass:"views-code-file"},[s("div",{staticClass:"views-code-left"},[s("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[0===e.personal_storage.length?s("div",{staticClass:"views-code-storage"},[e._v("\n                "+e._s(e.$t("views.table.noData"))+"\n              ")]):e._e(),e._v(" "),s("el-radio-group",{on:{change:e.changeRadio},model:{value:e.personal,callback:function(t){e.personal=t},expression:"personal"}},e._l(e.personal_storage,function(t,i){return s("el-radio",{key:i,staticClass:"views-code-list",attrs:{label:t.id}},[s("i",{staticClass:"iconfont icon-wenjianjia views-icon-project"}),e._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.name,placement:"bottom-start"}},[s("span",{staticClass:"text-ellipsis views-storage-name"},[e._v(e._s(t.name))])])],1)}),1)],1)],1),e._v(" "),s("div",{staticClass:"views-code-right"},e._l(e.personal_storage,function(t,i){return s("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"item.active"}],key:i,staticClass:"views-code-box"},[s("views-tree-dir",{attrs:{item:t,type:e.type}})],1)}),0)])]):e._e(),e._v(" "),e.isSecond?s("el-tab-pane",{attrs:{label:e.$t("views.development.commonStorage"),name:"second"}},[s("div",{staticClass:"views-code-file"},[s("div",{staticClass:"views-code-left"},[s("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[0===e.common_storage.length?s("div",{staticClass:"views-code-storage"},[e._v("\n                "+e._s(e.$t("views.table.noData"))+"\n              ")]):s("el-radio-group",{on:{change:e.changeCommon},model:{value:e.common,callback:function(t){e.common=t},expression:"common"}},e._l(e.common_storage,function(t,i){return s("el-radio",{key:i,staticClass:"views-code-list",attrs:{label:t.id}},[s("i",{staticClass:"iconfont icon-wenjianjia views-icon-project"}),e._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.name,placement:"bottom-start"}},[s("span",{staticClass:"text-ellipsis views-storage-name"},[e._v(e._s(t.name))])])],1)}),1)],1)],1),e._v(" "),s("div",{staticClass:"views-code-right"},e._l(e.common_storage,function(t,i){return s("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"item.active"}],key:i,staticClass:"views-code-box"},[s("views-tree-dir",{attrs:{item:t,type:e.type}})],1)}),0)])]):e._e()],1)],1)},staticRenderFns:[]},l=s("C7Lr")(o,r,!1,null,null,null);t.a=l.exports},uTbl:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("ZLEe"),a=s.n(i),o=s("zsLt"),r=s.n(o),l=s("kfHR"),n=s.n(l),c=s("EuJu"),d=s("v46e"),m={data:function(){return{input:"",textarea:"",obj:{project_id:""},labelWidth:"120px",modelDialog:{title:"选择使用模型",dialogCode:!1,isFirst:!1,isSecond:!1,type:1},storage_id:{},storage_object_id:{},mount_info:"",ruleForm:{name:"",memory:"4",useModel:"",task:"",engine:"tensorflow",version:"",cpu:"1",paramsName:"model_name",model:"",radio:"GRPC"},isLoading:!1,assembly:"",modelRules:{name:[{required:!0,validator:function(e,t,s){""===t?s(new Error("请输入名称")):Object(d.k)(t)?s():s(new Error("只能输入2-30位字母、数字、下划线"))},trigger:"blur"},{min:2,max:30,message:this.$t("views.development.youCan"),trigger:"blur"}],engine:[{required:!0,message:"请选择引擎类型",trigger:"change"}],version:[{required:!0,message:"请选择版本信息",trigger:"change"}],memory:[{required:!0,message:"内存不能为空",trigger:"change"}],desc:[{required:!1,validator:function(e,t,s){""===t?s():Object(d.e)(t)?s():s(new Error("不得包含特殊字符:<>:'\"/\\."))},trigger:"blur"}],cpu:[{required:!0,message:"CPU不能为空",trigger:"change"}],useModel:[{required:!0,message:"请选择使用的模型",trigger:"change"}],task:[{required:!0,validator:function(e,t,s){""===t?s(new Error("请输入作业名称")):Object(d.k)(t)?s():s(new Error("只能输入2-30位字母、数字、下划线"))},trigger:"blur"},{min:2,max:30,message:this.$t("views.development.youCan"),trigger:"blur"}],radio:[{required:!0,message:"请选择接口类型",trigger:"change"}]},value1:"1000"}},created:function(){this.$store.dispatch("getPracticeengine"),this.$store.dispatch("getPracticeengineversion"),this.$store.dispatch("getModelinterfacetype"),this.$store.dispatch("getPersonalconfig")},watch:{STORE_THEME_LANG:{handler:function(e,t){"zh"===this.STORE_THEME_LANG&&(this.labelWidth="120px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="200px")}}},mounted:function(){"zh"===this.STORE_THEME_LANG&&(this.labelWidth="120px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="200px")},methods:{storageId:function(e){var t=[];for(var s in e)t.push(e[s]);return t},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var s=t.storageId(t.storage_id),i=t.storageId(t.storage_object_id),a=n()(new r.a(s)),o=n()(new r.a(i)),l={ModelPrediction:{name:t.ruleForm.name,describe:t.ruleForm.desc,engine:t.ruleForm.engine,engine_version:t.ruleForm.version,mount_info:t.mount_info,gpu:0,cpu:t.ruleForm.cpu,memory:t.ruleForm.memory,type:t.ruleForm.radio,param:{model_name:t.ruleForm.task}},storage_object_id:o,storage_id:a};t.isLoading=!0,t.modelpredictioncreate(l)})},resetForm:function(e){this.$refs[e].resetFields(),this.$router.go(-1)},interfaceType:function(e){console.log(e)},choice:function(){this.assembly="ViewsCodeDirectory";this.$store.commit("projectpath",{data:[]}),this.modelDialog.dialogCode=!0,this.modelDialog.isFirst=!0,this.modelDialog.isSecond=!0},dialogSure:function(){var e=this.$store.state.projectSpace.projectpath;if(""===e)this.$message({message:"请选择目录",type:"warning"});else{var t=a()(e)[0];this.ruleForm.useModel=t,this.storage_id.first=e.storage_id,this.storage_object_id.first=e.storage_object_id,this.mount_info={model_path:e[t]},this.modelDialog.dialogCode=!1,this.assembly=""}},handleClose:function(e){e(),this.assembly=""},dialogColse:function(){this.modelDialog.dialogCode=!1,this.assembly=""},modelpredictioncreate:function(e){var t=this;this.$post("/personal/modelpredictioncreate",e).then(function(e){t.isLoading=!1,200===e.code?(t.$message({message:e.message,type:"success"}),t.$router.go(-1)):t.$message({message:e.message,type:"error"})})}},components:{ViewsCodeDirectory:c.a},computed:{practiceengine:function(){return this.$store.getters.postPracticeengine},personalconfig:function(){return this.$store.getters.postPersonalconfig},version:function(){return this.$store.getters.postVersion},faceType:function(){return this.$store.getters.postFaceType}}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"views-personal"},[s("el-form",{ref:"ruleForm",staticClass:"views-icon-ruleForm",attrs:{model:e.ruleForm,rules:e.modelRules,"label-width":e.labelWidth}},[s("div",{staticClass:"views-header-inf"},[s("span",[e._v(e._s(e.$t("views.modelPrediction.basicInf")))])]),e._v(" "),s("div",{staticClass:"views-develop-inf"},[s("div",{staticClass:"views-task-input"},[s("el-form-item",{attrs:{label:e.$t("views.modelPrediction.job"),prop:"name"}},[s("el-input",{attrs:{placeholder:e.$t("views.development.youCan"),minlength:"2",maxlength:"30",clearable:""},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1)],1),e._v(" "),s("div",{staticClass:"views-task-image"},[s("el-form-item",{attrs:{label:e.$t("views.development.remarks"),prop:"desc"}},[s("el-input",{attrs:{type:"textarea",rows:6,maxlength:"200",placeholder:e.$t("views.development.pleaseContents")},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1)],1)]),e._v(" "),s("div",{staticClass:"views-header-inf"},[s("span",[e._v(e._s(e.$t("views.modelPrediction.parameterConfig")))])]),e._v(" "),s("div",{staticClass:"views-develop-inf views-model-image"},[s("div",{staticClass:"views-task-input"},[s("el-form-item",{attrs:{label:e.$t("views.modelPrediction.interfaceType"),prop:"radio"}},[s("el-radio-group",{on:{change:e.interfaceType},model:{value:e.ruleForm.radio,callback:function(t){e.$set(e.ruleForm,"radio",t)},expression:"ruleForm.radio"}},e._l(e.faceType,function(t){return s("el-radio",{key:t.label,attrs:{label:t.label}},[e._v("\n                            "+e._s(t.value)+"\n                        ")])}),1)],1)],1),e._v(" "),s("div",{staticClass:"views-develop-resources"},[s("el-form-item",{attrs:{label:e.$t("views.trainingTask.engineType"),prop:"engine"}},[s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose"),disabled:""},model:{value:e.ruleForm.engine,callback:function(t){e.$set(e.ruleForm,"engine",t)},expression:"ruleForm.engine"}},e._l(e.practiceengine,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),s("el-form-item",{attrs:{label:e.$t("views.trainingTask.versionInf"),prop:"version"}},[s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},model:{value:e.ruleForm.version,callback:function(t){e.$set(e.ruleForm,"version",t)},expression:"ruleForm.version"}},e._l(e.version,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),s("div",{staticClass:"views-develop-image"},[s("el-form-item",{attrs:{label:e.$t("views.modelPrediction.useModel"),prop:"useModel"}},[s("div",{staticClass:"views-develop-choice"},[s("el-input",{attrs:{readonly:!0},model:{value:e.ruleForm.useModel,callback:function(t){e.$set(e.ruleForm,"useModel",t)},expression:"ruleForm.useModel"}}),e._v(" "),s("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:e.choice}},[e._v("选择")])],1)])],1),e._v(" "),s("div",{staticClass:"views-develop-image views-model-job"},[s("el-form-item",{staticClass:"views-divelop-none",attrs:{label:e.$t("views.modelPrediction.jobParameter"),prop:"task"}},[s("div",{staticClass:"views-develop-choice views-develop-block"},[s("el-input",{attrs:{disabled:""},model:{value:e.ruleForm.paramsName,callback:function(t){e.$set(e.ruleForm,"paramsName",t)},expression:"ruleForm.paramsName"}}),e._v(" "),s("b",{staticClass:"views-task-sign"},[e._v("=")]),e._v(" "),s("el-form-item",{attrs:{"label-width":"0",prop:"task"}},[s("el-input",{attrs:{placeholder:e.$t("views.development.youCan"),minlength:"2",maxlength:"30",clearable:""},model:{value:e.ruleForm.task,callback:function(t){e.$set(e.ruleForm,"task",t)},expression:"ruleForm.task"}})],1)],1)])],1),e._v(" "),s("div",{staticClass:"views-develop-image"},[s("el-form-item",{attrs:{label:e.$t("views.modelPrediction.nodeRules"),prop:"memory"}},[s("div",{staticClass:"views-model-task views-task-border"},[s("div",{staticClass:"views-task-sitting views-task-sitting-mg"},[s("span",{staticClass:"views-task-cpu"},[e._v("CPU")]),e._v(" "),s("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.cpu,callback:function(t){e.$set(e.ruleForm,"cpu",t)},expression:"ruleForm.cpu"}},e._l(e.personalconfig.cpu_config,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" 核\n                            "),e._v(" "),s("span",{staticClass:"views-task-cpu"},[e._v(e._s(e.$t("views.projectContent.memory")))]),e._v(" "),s("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.memory,callback:function(t){e.$set(e.ruleForm,"memory",t)},expression:"ruleForm.memory"}},e._l(e.personalconfig.memory_config,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v("\n                             G\n                        ")],1)])])],1)]),e._v(" "),s("div",{staticClass:"views-develop-btn"},[s("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v(e._s(e.$t("views.button.cancel")))]),e._v(" "),s("el-button",{staticClass:"view-btn-big",attrs:{type:"primary",loading:e.isLoading},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("\n                "+e._s(e.$t("views.button.run"))+"\n            ")])],1)]),e._v(" "),s("el-dialog",{staticClass:"small",attrs:{title:e.modelDialog.title,visible:e.modelDialog.dialogCode,"before-close":e.handleClose},on:{"update:visible":function(t){return e.$set(e.modelDialog,"dialogCode",t)}}},[s("div",{staticClass:"content"},[s(e.assembly,{tag:"component",attrs:{isFirst:e.modelDialog.isFirst,isSecond:e.modelDialog.isSecond,type:e.modelDialog.type}})],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"cancel",on:{click:e.dialogColse}},[e._v(e._s(e.$t("views.button.cancel")))]),e._v(" "),s("el-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:function(t){return e.dialogSure()}}},[e._v(e._s(e.$t("views.button.sure")))])],1)])],1)},staticRenderFns:[]},v=s("C7Lr")(m,u,!1,null,null,null);t.default=v.exports}});