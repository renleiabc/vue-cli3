webpackJsonp([14],{EuJu:function(e,t,s){"use strict";var i={data:function(){return{path:{storage_id:"",storage_child_id:"",type:""},propsChild:{label:"label",children:"zones",isLeaf:"leaf"},num:0}},created:function(){},mounted:function(){},methods:{loadNode:function(e,t){this.path.storage_id=this.item.id,this.path.type=this.type,0===e.level&&this.getProjectpath(this.path,t),e.level>=1&&(this.path.storage_child_id=e.data.id,this.getProjectpath(this.path,t))},getProjectpath:function(e,t){var s=this;this.$get("/practiceproject/projectpath",e).then(function(e){if(200===e.code){var i=[];e.data.forEach(function(e){var t={id:parseInt(e.id),storage_id:parseInt(e.storage_id),label:e.path,accessid:e.accessid,accesskey:e.accesskey,children:[]};"1"===e.type?(t.leaf=!1,t.type=1):"2"===e.type&&(t.leaf=!0,t.type=2),1===e.is_init?t.mount_flag="ro":t.mount_flag="rw",i.push(t)}),t(i)}else s.$message({message:e.message,type:"error"})})},handleNodeClick:function(e,t,s){var i=this.item.php_name;this.$store.commit("projectpath",{data:e,name:i})}},components:{},computed:{},props:{item:Object,type:Number}},a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[t("div",{staticClass:"views-code-tree"},[t("el-tree",{ref:"tree",attrs:{props:this.propsChild,lazy:"",load:this.loadNode,"highlight-current":"","empty-text":"暂无数据","node-key":"id"},on:{"node-click":this.handleNodeClick}})],1)])},staticRenderFns:[]},o={data:function(){return{storagelist:"",common_storage:[],personal_storage:[],personal:"",common:"",activeName:"first"}},created:function(){this.getStoragelist()},mounted:function(){},methods:{getStoragelist:function(){var e=this;this.$post("/environmentproject/storagelist").then(function(t){if(200===t.code){var s=t.data.personal_storage,i=t.data.common_storage;0!==s.length&&(e.personal=s[0].id),0!==i.length&&(e.common=i[0].id),s.forEach(function(e,t){e.active=!1,0===t&&(e.active=!0)}),i.forEach(function(e,t){e.active=!1,0===t&&(e.active=!0)}),e.personal_storage=s,e.common_storage=i}else e.$message({message:t.message,type:"error"})})},changeRadio:function(e){this.personal_storage.forEach(function(t,s){t.active=!1,t.id===e&&(t.active=!0)})},changeCommon:function(e){this.common_storage.forEach(function(t,s){t.active=!1,t.id===e&&(t.active=!0)})}},props:["type","isFirst","isSecond"],components:{ViewsTreeDir:s("C7Lr")(i,a,!1,null,null,null).exports},computed:{}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[e.isFirst?s("el-tab-pane",{attrs:{label:e.$t("views.development.personalStorage"),name:"first"}},[s("div",{staticClass:"views-code-file"},[s("div",{staticClass:"views-code-left"},[s("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[0===e.personal_storage.length?s("div",{staticClass:"views-code-storage"},[e._v("\n                "+e._s(e.$t("views.table.noData"))+"\n              ")]):e._e(),e._v(" "),s("el-radio-group",{on:{change:e.changeRadio},model:{value:e.personal,callback:function(t){e.personal=t},expression:"personal"}},e._l(e.personal_storage,function(t,i){return s("el-radio",{key:i,staticClass:"views-code-list",attrs:{label:t.id}},[s("i",{staticClass:"iconfont icon-wenjianjia views-icon-project"}),e._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.name,placement:"bottom-start"}},[s("span",{staticClass:"text-ellipsis views-storage-name"},[e._v(e._s(t.name))])])],1)}),1)],1)],1),e._v(" "),s("div",{staticClass:"views-code-right"},e._l(e.personal_storage,function(t,i){return s("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"item.active"}],key:i,staticClass:"views-code-box"},[s("views-tree-dir",{attrs:{item:t,type:e.type}})],1)}),0)])]):e._e(),e._v(" "),e.isSecond?s("el-tab-pane",{attrs:{label:e.$t("views.development.commonStorage"),name:"second"}},[s("div",{staticClass:"views-code-file"},[s("div",{staticClass:"views-code-left"},[s("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[0===e.common_storage.length?s("div",{staticClass:"views-code-storage"},[e._v("\n                "+e._s(e.$t("views.table.noData"))+"\n              ")]):s("el-radio-group",{on:{change:e.changeCommon},model:{value:e.common,callback:function(t){e.common=t},expression:"common"}},e._l(e.common_storage,function(t,i){return s("el-radio",{key:i,staticClass:"views-code-list",attrs:{label:t.id}},[s("i",{staticClass:"iconfont icon-wenjianjia views-icon-project"}),e._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.name,placement:"bottom-start"}},[s("span",{staticClass:"text-ellipsis views-storage-name"},[e._v(e._s(t.name))])])],1)}),1)],1)],1),e._v(" "),s("div",{staticClass:"views-code-right"},e._l(e.common_storage,function(t,i){return s("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"item.active"}],key:i,staticClass:"views-code-box"},[s("views-tree-dir",{attrs:{item:t,type:e.type}})],1)}),0)])]):e._e()],1)],1)},staticRenderFns:[]},n=s("C7Lr")(o,r,!1,null,null,null);t.a=n.exports},H7XF:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("ZLEe"),a=s.n(i),o=s("zsLt"),r=s.n(o),n=s("kfHR"),l=s.n(n),c=s("IHPB"),u=s.n(c),v=s("EuJu"),p=s("v46e"),f={data:function(){return{input:"",textarea:"",radio:0,dialogCode:!1,dialogFile:!1,active:"first",isLoading:!1,isFirst:!1,psTip:"",psShow:!0,choose:"",workerTip:"",workerShow:!0,isSecond:!1,caffe:{cpu:1,gpu:0,memory:4},tensorflow:{ps_node:{num:1,cpu:1,gpu:0,memory:4},work_node:{num:1,cpu:1,gpu:0,memory:4}},caffe_show:!1,tensorflow_show:!1,labelWidth:"150px",obj:{project_id:""},projectId:"",ruleForm:{name:"",operating:[],desc:"",engine:"tensorflow",version:"",params:"",caffeParams:[],caffeChoice:[{title:"训练数据路径",dialogCode:!1,isFirst:!1,isSecond:!1,type:1,input:""},{title:"测试数据路径",dialogCode:!1,isFirst:!1,isSecond:!1,type:1,input:""},{title:"网络层文件",dialogCode:!1,isFirst:!1,isSecond:!1,type:1,input:""},{title:"模型保存路径",dialogCode:!1,isFirst:!1,isSecond:!1,type:1,input:""}],choice:[{title:this.$t("views.trainingTask.codeDirectory"),dialogCode:!1,isFirst:!1,isSecond:!1,type:1,input:""},{title:this.$t("views.trainingTask.trainingData"),dialogCode:!1,isFirst:!1,isSecond:!1,type:1,input:""},{title:this.$t("views.trainingTask.startupFile"),dialogCode:!1,isFirst:!1,isSecond:!1,type:1,input:""},{title:this.$t("views.trainingTask.trainingLog"),dialogCode:!1,isFirst:!1,isSecond:!1,type:1,input:""}]},createDevrules:{name:[{required:!0,validator:function(e,t,s){""===t?s(new Error("请输入名称")):Object(p.k)(t)?s():s(new Error("只能输入2-30位字母、数字、下划线"))},trigger:"blur"},{min:2,max:30,message:this.$t("views.development.youCan"),trigger:"blur"}],engine:[{required:!0,message:"请选择引擎类型",trigger:"change"}],params:[{required:!1,message:" ",trigger:"change"}],version:[{required:!0,message:"请选择版本信息",trigger:"change"}],desc:[{required:!1,validator:function(e,t,s){""===t?s():Object(p.e)(t)?s():s(new Error("不得包含特殊字符:<>:'\"/\\."))},trigger:"blur"}],node:[{required:!0,type:"number",message:"必须为数字值"}]},postData:{code_path:"",launch_script:"",dataset:"",model_path:""},postCaffe:{train_data_dir:"",proto_file:"",test_data_dir:"",snapshot_prefix:""},caffeParams:[],mark:0,tensorflowParams:[],storage_id:{},storage_object_id:{}}},created:function(){this.init(),this.$store.dispatch("getPracticeengine"),this.$store.dispatch("getPracticeengineversion"),this.$store.dispatch("getPersonalconfig"),this.getPracticeparam(),this.choose=this.ruleForm.choice},watch:{STORE_THEME_LANG:{handler:function(e,t){"zh"===this.STORE_THEME_LANG&&(this.labelWidth="150px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="200px")}}},mounted:function(){"zh"===this.STORE_THEME_LANG&&(this.labelWidth="150px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="200px")},methods:{init:function(){"tensorflow"===this.ruleForm.engine&&(this.tensorflow_show=!0,this.radio=0)},configure:function(e){this.$refs[e].resetFields(),this.tensorflow_show=!0,this.caffe_show=!1,this.tensorflowParams.forEach(function(e){e.value=""})},lastConfigure:function(){console.log("====")},changeType:function(e){switch(console.log(e),e){case"tensorflow":this.caffe_show=!1,this.tensorflow_show=!0,this.$store.commit("changeVersion","tensorflow"),this.ruleForm.version="",this.radio=0,this.tip="",this.choose=this.ruleForm.choice,this.choose.forEach(function(e){e.input=""});break;case"caffe":this.caffe_show=!0,this.tensorflow_show=!1,this.$store.commit("changeVersion","caffe"),this.ruleForm.version="",this.radio=0,this.tip="",this.choose=this.ruleForm.caffeChoice,this.choose.forEach(function(e){e.input=""});break;default:this.caffe_show=!1,this.tensorflow_show=!0,this.ruleForm.version=""}},tensorflowBlur:function(e){var t=this.tensorflowParams,s=t[e].value;if(""===s)t[e].isShow=!1;else switch(e){case 3:if(!Object(p.c)(s,3))return t[e].isShow=!0,t[e].tip="请输入大于0小于1的小数",!1;t[e].isShow=!1;break;default:if(!Object(p.c)(s,0))return t[e].isShow=!0,t[e].tip="请输入正整数",!1;t[e].isShow=!1}this.tensorflowParams=[].concat(u()(t))},caffeBlur:function(e){console.log(e);var t=this.ruleForm.caffeParams,s=t[e].value;if(""===s)t[e].isShow=!1;else if(e!==t.length-1){switch(e){case 2:case 5:if(!Object(p.c)(s,1))return t[e].isShow=!0,t[e].tip="请输入实数",!1;t[e].isShow=!1;break;case 8:if(!Object(p.c)(s,4))return t[e].isShow=!0,t[e].tip="请输入正确的字符",!1;t[e].isShow=!1;break;case 7:if(!Object(p.c)(s,1))return t[e].isShow=!0,t[e].tip="请输入实数",!1;t[e].isShow=!1;break;case 9:if(!Object(p.c)(s,2))return t[e].isShow=!0,t[e].tip="请输入正实数",!1;t[e].isShow=!1;break;default:if(!Object(p.c)(s,0))return t[e].isShow=!0,t[e].tip="请输入正整数",!1;t[e].isShow=!1}t[e].isShow=!1}this.caffeParams=[].concat(u()(t))},psBlur:function(){var e=this.tensorflow.ps_node.num;this.nodeSitting(e,"psShow","psTip")},workerBlur:function(){var e=this.tensorflow.work_node.num;this.nodeSitting(e,"workerShow","workerTip")},nodeSitting:function(e,t,s){if(""===e)this[t]=!0,this[s]="输入不能为空";else{if(!Object(p.c)(e,0))return this[t]=!0,this[s]="请输入正整数",!1;this[t]=!1}},selectGpu:function(e){var t=this.ruleForm.caffeParams;t[t.length-1].value=0===e?"CPU":"GPU",this.ruleForm.caffeParams=[].concat(u()(t))},practicecreate:function(e){var t=this;this.$post("/personal/practicecreate",e).then(function(e){t.isLoading=!1,200===e.code?(t.$message({message:e.message,type:"success"}),t.isLoading=!1,t.$router.go(-1)):t.$message({message:e.message,type:"error"})})},operatParams:function(){var e={keys:"",value:""};this.ruleForm.operating.push(e)},reduceAddress:function(e){this.ruleForm.operating.splice(e,1)},paramsData:function(e){var t=[],s=[],i={};e.forEach(function(e,i){t.push(e.keys),s.push(e.value)});for(var a=0;a<t.length;a++)i[t[a]]=s[a];for(var o in i)""===o||0===i[o]?delete i[o]:i[o]=parseInt(i[o]);return i},paramsCaffe:function(e){var t={};return e.forEach(function(e,s){t[e.label]=e.value}),t},paramsTensorflow:function(e){var t={};return e.forEach(function(e,s){""!==e.value&&(t[e.label]=e.value)}),t},storageId:function(e){var t=[];for(var s in e)t.push(e[s]);return t},submitForm:function(e){var t=this;if("caffe"===this.ruleForm.engine)for(var s=0;s<this.caffeParams.length;s++){var i=this.caffeParams[s];if(""===i.value)return!1;if(s!==this.caffeParams.length-1)switch(s){case 2:case 5:if(!Object(p.c)(i.value,1))return!1;break;case 8:if(!Object(p.c)(i.value,4))return!1;break;case 7:if(!Object(p.c)(i.value,1))return!1;break;case 9:if(!Object(p.c)(i.value,2))return!1;break;default:if(!Object(p.c)(i.value,0))return!1}}else if("tensorflow"===this.ruleForm.engine){for(var a=0;a<this.tensorflowParams.length;a++){var o=this.tensorflowParams[a];if(""!==o.value)switch(a){case 3:if(!Object(p.c)(o.value,3))return!1;break;default:if(!Object(p.c)(o.value,0))return!1}}var n=this.tensorflow.ps_node.num;if(""===n)return!1;if(!Object(p.c)(n,0))return!1;var c=this.tensorflow.work_node.num;if(""===c)return!1;if(!Object(p.c)(c,0))return!1}this.$refs[e].validate(function(e){if(!e)return!1;var s=t.paramsTensorflow(t.tensorflowParams),i=t.paramsCaffe(t.ruleForm.caffeParams),a=t.storageId(t.storage_id),o=t.storageId(t.storage_object_id),n=l()(new r.a(a)),c=l()(new r.a(o)),u={"Practice[name]":t.ruleForm.name,"Practice[engine]":t.ruleForm.engine,"Practice[describe]":t.ruleForm.desc,"Practice[engine_version]":t.ruleForm.version,storage_object_id:c,storage_id:n};"caffe"===t.ruleForm.engine?(u["Practice[mount_info]"]=t.postCaffe,u["Practice[param]"]=i,u.resource=t.caffe,u["Practice[is_visible]"]=0):"tensorflow"===t.ruleForm.engine&&(u["Practice[mount_info]"]=t.postData,u["Practice[param]"]=s,u.resource=t.tensorflow,u["Practice[is_visible]"]=t.radio),t.isLoading=!0,t.practicecreate(u)})},resetForm:function(e){this.$refs[e].resetFields(),this.$router.go(-1)},chocieBtn:function(e){this.mark=2===e?0:1;this.$store.commit("projectpath",{data:[]});var t=this.choose;switch(t.forEach(function(e,t){e.dialogCode=!1,e.isFirst=!1,e.isSecond=!1,e.type=1}),t[e].dialogCode=!0,e){case 0:t[e].isFirst=!0,t[e].isSecond=!1,t[e].type=1;break;case 1:t[e].isFirst=!0,t[e].isSecond=!0,t[e].type=1;break;case 2:t[e].isFirst=!0,t[e].isSecond=!1,t[e].type=2;break;case 3:t[e].isFirst=!0,t[e].isSecond=!1,t[e].type=1}this.choose=[].concat(u()(t))},chocieCaffe:function(e){this.mark=2===e?0:1;this.$store.commit("projectpath",{data:[]});var t=this.choose;switch(t.forEach(function(e,t){e.dialogCode=!1,e.isFirst=!1,e.isSecond=!1,e.type=1}),t[e].dialogCode=!0,e){case 0:case 1:t[e].isFirst=!0,t[e].isSecond=!0,t[e].type=1;break;case 2:t[e].isFirst=!0,t[e].isSecond=!1,t[e].type=2;break;case 3:t[e].isFirst=!0,t[e].isSecond=!1,t[e].type=1}this.choose=[].concat(u()(t))},handleClose:function(e){e()},dialogSure:function(e){var t=this.$store.state.projectSpace.projectpath;if(""===t&&0===this.mark)this.$message({message:"请选择文件",type:"warning"});else if(""===t&&1===this.mark)this.$message({message:"请选择目录",type:"warning"});else if("caffe"===this.ruleForm.engine){var s=this.ruleForm.caffeChoice,i=this.choiceCaffe(s,e,t,"caffe");this.ruleForm.choice=[].concat(u()(i))}else if("tensorflow"===this.ruleForm.engine){var a=this.ruleForm.choice,o=this.choiceCaffe(a,e,t,"tensorflow");this.ruleForm.choice=[].concat(u()(o))}},choiceCaffe:function(e,t,s,i){var o=a()(s)[0],r=s.type;switch(t){case 0:if(1===r)e[t].input=o,this.storage_id.first=s.storage_id,this.storage_object_id.first=s.storage_object_id,"caffe"===i?this.postCaffe.train_data_dir=s[o]:"tensorflow"===i&&(this.postData.code_path=s[o]);else if(2===r)return this.$message({message:"请选择目录",type:"warning"}),e;break;case 1:if(1===r)e[t].input=o,this.storage_id.second=s.storage_id,this.storage_object_id.senond=s.storage_object_id,"caffe"===i?this.postCaffe.test_data_dir=s[o]:"tensorflow"===i&&(this.postData.dataset=s[o]);else if(2===r)return this.$message({message:"请选择目录",type:"warning"}),e;break;case 2:if(1===r)return this.$message({message:"请选择文件",type:"warning"}),e;2===r&&(this.storage_id.third=s.storage_id,this.storage_object_id.third=s.storage_object_id,e[t].input=o,"caffe"===i?this.postCaffe.proto_file=s[o]:"tensorflow"===i&&(this.postData.launch_script=s[o]));break;case 3:if(1===r)e[t].input=o,this.storage_id.fourth=s.storage_id,this.storage_object_id.fourth=s.storage_object_id,"caffe"===i?this.postCaffe.snapshot_prefix=s[o]:"tensorflow"===i&&(this.postData.model_path=s[o]);else if(2===r)return this.$message({message:"请选择目录",type:"warning"}),e}return e.forEach(function(e,t){e.dialogCode=!1,e.isFirst=!1,e.isSecond=!1,e.type=1}),e},dialogColse:function(){if("caffe"===this.ruleForm.engine){var e=this.ruleForm.caffeChoice;e.forEach(function(e,t){e.dialogCode=!1,e.isFirst=!1,e.isSecond=!1,e.type=1}),this.ruleForm.choice=[].concat(u()(e))}else if("tensorflow"===this.ruleForm.engine){var t=this.ruleForm.choice;t.forEach(function(e,t){e.dialogCode=!1,e.isFirst=!1,e.isSecond=!1,e.type=1}),this.ruleForm.choice=[].concat(u()(t))}},runningParams:function(e){var t=[];for(var s in e){var i={label:s,value:e[s],isShow:!1,tip:""};t.push(i)}return t},getPracticeparam:function(){var e=this;this.$post("/practiceproject/practiceparam").then(function(t){if(200===t.code){var s=t.data.caffe_param;e.ruleForm.caffeParams=e.runningParams(s);var i=t.data.tensorflow_param;e.tensorflowParams=e.runningParams(i)}else e.$message({message:t.message,type:"error"})})}},components:{ViewsCodeDirectory:v.a},computed:{practiceengine:function(){return this.$store.getters.postPracticeengine},personalconfig:function(){return this.$store.getters.postPersonalconfig},version:function(){return this.$store.getters.postVersion},projectpath:function(){return this.$store.getters.postprojectpath}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"views-personal"},[s("el-form",{ref:"ruleForm",staticClass:"views-icon-ruleForm",attrs:{model:e.ruleForm,rules:e.createDevrules,"label-width":e.labelWidth}},[s("div",{staticClass:"views-header-inf"},[s("span",[e._v(" "+e._s(e.$t("views.trainingTask.taskInformation")))])]),e._v(" "),s("div",{staticClass:"views-develop-inf"},[s("div",{staticClass:"views-task-input"},[s("el-form-item",{attrs:{label:e.$t("views.trainingTask.taskName"),prop:"name"}},[s("el-input",{attrs:{placeholder:e.$t("views.development.youCan"),minlength:"2",maxlength:"30",clearable:""},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1)],1),e._v(" "),s("div",{staticClass:"views-task-image"},[s("el-form-item",{attrs:{label:e.$t("views.development.remarks"),prop:"desc"}},[s("el-input",{attrs:{type:"textarea",rows:6,placeholder:e.$t("views.development.pleaseContents"),maxlength:"200",max:"200"},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1)],1)]),e._v(" "),s("div",{staticClass:"views-header-inf"},[s("span",[e._v(e._s(e.$t("views.modelPrediction.parameterConfig")))])]),e._v(" "),s("div",{staticClass:"views-develop-inf views-model-image"},[e._e(),e._v(" "),s("div",{staticClass:"views-develop-resources"},[s("el-form-item",{attrs:{label:e.$t("views.trainingTask.engineType"),prop:"engine"}},[s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},on:{change:e.changeType},model:{value:e.ruleForm.engine,callback:function(t){e.$set(e.ruleForm,"engine",t)},expression:"ruleForm.engine"}},e._l(e.practiceengine,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),s("el-form-item",{attrs:{label:e.$t("views.trainingTask.versionInf"),prop:"version"}},[s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},model:{value:e.ruleForm.version,callback:function(t){e.$set(e.ruleForm,"version",t)},expression:"ruleForm.version "}},e._l(e.version,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.tensorflow_show,expression:"tensorflow_show"}],staticClass:"views-task-show"},[s("span",{staticClass:"views-task-radio "},[e._v(e._s(e.$t("views.trainingTask.whetherVisualization")))]),e._v(" "),s("el-radio-group",{model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[s("el-radio",{attrs:{label:1}},[e._v(e._s(e.$t("views.trainingTask.yes")))]),e._v(" "),s("el-radio",{attrs:{label:0}},[e._v(e._s(e.$t("views.trainingTask.no")))])],1)],1)],1),e._v(" "),e._l(e.ruleForm.caffeChoice,function(t,i){return s("div",{directives:[{name:"show",rawName:"v-show",value:e.caffe_show,expression:"caffe_show"}],key:t.title,staticClass:"views-develop-image"},[s("el-form-item",{attrs:{label:t.title,rules:{required:!0,message:"选择不能为空",trigger:"change"},prop:"choice."+i+".input"}},[s("div",{staticClass:"views-develop-choice"},[s("el-input",{attrs:{readonly:!0},model:{value:t.input,callback:function(s){e.$set(t,"input",s)},expression:"item.input"}}),e._v(" "),s("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary "},on:{click:function(t){return e.chocieCaffe(i)}}},[e._v("\n              "+e._s(e.$t("views.button.choice"))+"\n            ")])],1)])],1)}),e._v(" "),e._l(e.ruleForm.choice,function(t,i){return s("div",{directives:[{name:"show",rawName:"v-show",value:e.tensorflow_show,expression:"tensorflow_show"}],key:i,staticClass:"views-develop-image"},[s("el-form-item",{attrs:{label:t.title,rules:{required:!0,message:"选择不能为空",trigger:"change"},prop:"choice."+i+".input"}},[s("div",{staticClass:"views-develop-choice"},[s("el-input",{attrs:{readonly:!0},model:{value:t.input,callback:function(s){e.$set(t,"input",s)},expression:"item.input"}}),e._v(" "),s("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary "},on:{click:function(t){return e.chocieBtn(i)}}},[e._v("\n              "+e._s(e.$t("views.button.choice"))+"\n            ")])],1)])],1)}),e._v(" "),e.caffe_show?s("div",{staticClass:"views-develop-image views-caffe-required"},[s("el-form-item",{attrs:{label:e.$t("views.trainingTask.operatParameters"),prop:"params"}},[s("div",{staticClass:"views-develop-params "},e._l(e.ruleForm.caffeParams,function(t,i){return s("div",{key:t.label,staticClass:"views-develop-caffe "},[s("el-input",{attrs:{disabled:""},model:{value:t.label,callback:function(s){e.$set(t,"label",s)},expression:"item.label"}}),e._v(" "),s("b",{staticClass:"views-task-sign"},[e._v("=")]),e._v(" "),s("el-form-item",{attrs:{"label-width":"0",rules:{required:!0,message:"输入不能为空",trigger:"change"},prop:"caffeParams."+i+".value"}},[i===e.ruleForm.caffeParams.length-1?s("el-input",{attrs:{disabled:""},model:{value:t.value,callback:function(s){e.$set(t,"value",s)},expression:"item.value"}}):s("el-input",{on:{input:function(t){return e.caffeBlur(i)}},model:{value:t.value,callback:function(s){e.$set(t,"value",s)},expression:"item.value"}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"item.isShow"}],staticClass:"views-task-tips"},[e._v(e._s(t.tip))])],1)],1)}),0)])],1):e._e(),e._v(" "),e.tensorflow_show?s("div",{staticClass:"views-develop-image"},[s("el-form-item",{attrs:{label:e.$t("views.trainingTask.operatParameters"),prop:"params"}},[s("div",{staticClass:"views-develop-params"},e._l(e.tensorflowParams,function(t,i){return s("div",{key:t.label,staticClass:"views-develop-caffe"},[s("el-input",{attrs:{disabled:""},model:{value:t.label,callback:function(s){e.$set(t,"label",s)},expression:"item.label"}}),e._v(" "),s("b",{staticClass:"views-task-sign"},[e._v("=")]),e._v(" "),s("el-input",{on:{input:function(t){return e.tensorflowBlur(i)}},model:{value:t.value,callback:function(s){e.$set(t,"value",s)},expression:"item.value"}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"item.isShow"}],staticClass:"views-task-tips"},[e._v(e._s(t.tip))])],1)}),0)])],1):e._e(),e._v(" "),s("div",{staticClass:"views-develop-image views-task-mb",staticStyle:{display:"none"}},[s("el-form-item",{attrs:{label:e.$t("views.trainingTask.operatParameters"),prop:"params"}},[e._l(e.ruleForm.operating,function(t,i){return s("el-form-item",{key:i,attrs:{rules:{required:!0,message:"输入不能为空",trigger:"change"},prop:"operating."+i+".keys","label-width":"0"}},[s("div",{staticClass:"views-develop-choice"},[s("el-input",{model:{value:t.keys,callback:function(s){e.$set(t,"keys",s)},expression:"item.keys"}}),e._v(" "),s("b",{staticClass:"views-task-sign"},[e._v("=")]),e._v(" "),s("el-input",{model:{value:t.value,callback:function(s){e.$set(t,"value",s)},expression:"item.value"}}),e._v(" "),s("span",{staticClass:"views-btn-reduce ",on:{click:function(t){return e.reduceAddress(i)}}},[e._v("—")])],1)])}),e._v(" "),s("div",{staticClass:"views-develop-choice"},[s("el-button",{staticClass:"view-btn-medium views-btn-choice ",attrs:{type:"primary "},on:{click:e.operatParams}},[e._v(e._s(e.$t("views.trainingTask.increaseParameters")))])],1)],2)],1)],2),e._v(" "),s("div",{staticClass:"views-header-inf"},[s("span",[e._v(e._s(e.$t("views.trainingTask.nodeConfig")))])]),e._v(" "),s("div",{staticClass:"views-task-type "},[s("div",{staticClass:"views-task-right views-task-border "},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.caffe_show,expression:"caffe_show"}],staticClass:"views-task-sitting views-task-sitting-mg "},[s("span",{staticClass:"views-task-cpu "},[e._v("CPU")]),e._v(" "),s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},model:{value:e.caffe.cpu,callback:function(t){e.$set(e.caffe,"cpu",t)},expression:"caffe.cpu"}},e._l(e.personalconfig.cpu_config,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" 核\n          "),s("span",{staticClass:"views-task-cpu "},[e._v("GPU")]),e._v(" "),s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},on:{change:e.selectGpu},model:{value:e.caffe.gpu,callback:function(t){e.$set(e.caffe,"gpu",t)},expression:"caffe.gpu"}},e._l(e.personalconfig.gpu_config,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" 个\n          "),s("span",{staticClass:"views-task-cpu "},[e._v(e._s(e.$t("views.projectContent.memory")))]),e._v(" "),s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},model:{value:e.caffe.memory,callback:function(t){e.$set(e.caffe,"memory",t)},expression:"caffe.memory"}},e._l(e.personalconfig.memory_config,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v("\n           G\n        ")],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.tensorflow_show,expression:"tensorflow_show"}],staticClass:"views-task-tensorflow"},[s("div",{staticClass:"views-task-node "},[s("span",{staticClass:"views-task-node-span "},[e._v(e._s(e.$t("views.trainingTask.psNode")))]),e._v(" "),s("div",{staticClass:"views-task-sitting views-task-select "},[s("span",{staticClass:"views-task-cpu"},[e._v(e._s(e.$t("views.projectContent.unit")))]),e._v(" "),s("el-input",{staticClass:"views-node-input",attrs:{placeholder:"请输入",clearable:""},on:{blur:e.psBlur},model:{value:e.tensorflow.ps_node.num,callback:function(t){e.$set(e.tensorflow.ps_node,"num",t)},expression:"tensorflow.ps_node.num"}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.psShow,expression:"psShow"}],staticClass:"views-task-tips"},[e._v(e._s(e.psTip))]),e._v(" "),s("span",{staticClass:"views-task-cpu "},[e._v("CPU")]),e._v(" "),s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},model:{value:e.tensorflow.ps_node.cpu,callback:function(t){e.$set(e.tensorflow.ps_node,"cpu",t)},expression:"tensorflow.ps_node.cpu"}},e._l(e.personalconfig.cpu_config,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" 核\n              "),e._v(" "),s("span",{staticClass:"views-task-cpu "},[e._v("GPU")]),e._v(" "),s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},model:{value:e.tensorflow.ps_node.gpu,callback:function(t){e.$set(e.tensorflow.ps_node,"gpu",t)},expression:"tensorflow.ps_node.gpu"}},e._l(e.personalconfig.gpu_config,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" 个\n              "),e._v(" "),s("span",{staticClass:"views-task-cpu "},[e._v(e._s(e.$t("views.projectContent.memory")))]),e._v(" "),s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},model:{value:e.tensorflow.ps_node.memory,callback:function(t){e.$set(e.tensorflow.ps_node,"memory",t)},expression:"tensorflow.ps_node.memory"}},e._l(e.personalconfig.memory_config,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v("\n               G\n            ")],1),e._v(" "),s("div",{staticClass:"views-task-node views-task-bottom "},[s("span",{staticClass:"views-task-node-span "},[e._v(e._s(e.$t("views.trainingTask.workerNode")))]),e._v(" "),s("div",{staticClass:"views-task-sitting views-task-select"},[s("span",{staticClass:"views-task-cpu "},[e._v(e._s(e.$t("views.projectContent.unit")))]),e._v(" "),s("el-input",{staticClass:"views-node-input",attrs:{placeholder:"请输入",clearable:""},on:{blur:e.workerBlur},model:{value:e.tensorflow.work_node.num,callback:function(t){e.$set(e.tensorflow.work_node,"num",t)},expression:"tensorflow.work_node.num"}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.workerShow,expression:"workerShow"}],staticClass:"views-task-tips"},[e._v(e._s(e.workerTip))]),e._v(" "),s("span",{staticClass:"views-task-cpu"},[e._v("CPU")]),e._v(" "),s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},model:{value:e.tensorflow.work_node.cpu,callback:function(t){e.$set(e.tensorflow.work_node,"cpu",t)},expression:"tensorflow.work_node.cpu"}},e._l(e.personalconfig.cpu_config,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" 核\n                "),e._v(" "),s("span",{staticClass:"views-task-cpu "},[e._v("GPU")]),e._v(" "),s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},model:{value:e.tensorflow.work_node.gpu,callback:function(t){e.$set(e.tensorflow.work_node,"gpu",t)},expression:"tensorflow.work_node.gpu"}},e._l(e.personalconfig.gpu_config,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" 个\n                "),e._v(" "),s("span",{staticClass:"views-task-cpu "},[e._v(e._s(e.$t("views.projectContent.memory")))]),e._v(" "),s("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},model:{value:e.tensorflow.work_node.memory,callback:function(t){e.$set(e.tensorflow.work_node,"memory",t)},expression:"tensorflow.work_node.memory"}},e._l(e.personalconfig.memory_config,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v("\n                 G\n              ")],1)])])])])]),e._v(" "),s("div",{staticClass:"views-develop-btn "},[s("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v(" "+e._s(e.$t("views.button.cancel")))]),e._v(" "),s("el-button",{staticClass:"view-btn-big ",attrs:{type:"primary ",loading:e.isLoading},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v(e._s(e.$t("views.button.run")))])],1)]),e._v(" "),e._l(e.choose,function(t,i){return s("div",{key:i},[s("el-dialog",{staticClass:"small",attrs:{title:t.title,visible:t.dialogCode,"before-close":e.handleClose},on:{"update:visible":function(s){return e.$set(t,"dialogCode",s)}}},[s("div",{staticClass:"content"},[s("views-code-directory",{attrs:{isFirst:t.isFirst,isSecond:t.isSecond,type:t.type}})],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"cancel",on:{click:e.dialogColse}},[e._v(e._s(e.$t("views.button.cancel")))]),e._v(" "),s("el-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:function(t){return e.dialogSure(i)}}},[e._v(e._s(e.$t("views.button.sure")))])],1)])],1)})],2)},staticRenderFns:[]},h=s("C7Lr")(f,d,!1,null,null,null);t.default=h.exports}});