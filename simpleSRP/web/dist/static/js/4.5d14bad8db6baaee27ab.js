webpackJsonp([4],{"+t8L":function(e,t,n){"use strict";var i=n("IHPB"),s=n.n(i),r={data:function(){return{activeName:"first",storagelist:"",common_storage:"",project_storage:"",storage_user_on:{},obj:{project_id:""}}},created:function(){this.obj.project_id=this.projectId,this.getStoragelist(this.obj)},mounted:function(){},methods:{getStoragelist:function(e){var t=this;this.$post("/environmentproject/storagelist",e).then(function(e){if(200===e.code){t.storagelist=e.data;var n=e.data.common_storage;t.storage_user_on=e.data.storage_user_on,t.getCommmon(n)}else t.$message({message:e.message,type:"error"})})},getCommmon:function(e){this.common_storage=this.processingData(e)},handleClick:function(e){var t=e.name;if(""===this.storagelist)this.$message({message:"挂载数据为空！",type:"error"});else switch(t){case"first":this.common_storage=this.processingData(this.storagelist.common_storage);break;case"second":this.project_storage=this.processingData(this.storagelist.project_storage);break;default:this.common_storage=this.processingData(this.storagelist.common_storage)}},processingData:function(e){if(0!==e.lenght)return e.forEach(function(e){e.active=!1,e.disabled=!1}),e;this.$message({message:"挂载数据为空！",type:"error"})},conmmonStroage:function(e,t){this.common_storage.forEach(function(e,n){e.active=!1,n===t&&(e.active=!0)}),this.common_storage=[].concat(s()(this.common_storage));var n=this.storage_user_on;this.$emit("selectStroage",{item:e,storage_user_on:n})},projectStroage:function(e,t){this.project_storage.forEach(function(e,n){e.active=!1,n===t&&(e.active=!0)}),this.project_storage=[].concat(s()(this.project_storage));var n=this.storage_user_on;this.$emit("selectStroage",{item:e,storage_user_on:n})}},components:{},computed:{},props:["projectId"]},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:e.$t("views.development.commonStorage"),name:"first"}},[n("div",{staticClass:"views-code-file"},[n("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[0===e.common_storage.length?n("div",{staticClass:"views-code-storage"},[e._v("\n                    "+e._s(e.$t("views.table.noData"))+"\n                ")]):e._l(e.common_storage,function(t,i){return n("div",{key:i,class:[{"views-code-select":t.active},"views-code-storage"],on:{click:function(n){return e.conmmonStroage(t,i)}}},[n("i",{staticClass:"iconfont icon-xiangmu views-icon-project"}),e._v(" "),n("span",[e._v(e._s(t.name))])])})],2)],1)]),e._v(" "),n("el-tab-pane",{attrs:{label:e.$t("views.development.projectStorage"),name:"second"}},[n("div",{staticClass:"views-code-file"},[n("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[0===e.project_storage.length?n("div",{staticClass:"views-code-storage"},[e._v("\n                    "+e._s(e.$t("views.table.noData"))+"\n                ")]):e._l(e.project_storage,function(t,i){return n("div",{key:i,class:[{"views-code-select":t.active},"views-code-storage"],on:{click:function(n){return e.projectStroage(t,i)}}},[n("i",{staticClass:"iconfont icon-xiangmu views-icon-project"}),e._v(" "),n("span",[e._v(e._s(t.name))])])})],2)],1)])],1)},staticRenderFns:[]};var o=n("C7Lr")(r,a,!1,function(e){n("QECW")},"data-v-3366385d",null);t.a=o.exports},"88dG":function(e,t,n){(e.exports=n("UTlt")(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},QECW:function(e,t,n){var i=n("88dG");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("FIqI")("3d3f1172",i,!0,{})},Xnow:function(e,t,n){"use strict";var i={data:function(){return{activeName:"first",tableData:[],loading:!0,radio:"",label:"",isCount:!1,per:0,total:0,currentPage:1,obj:{is_init:1,category:"",page:0,project_id:"",status:1},row:"",tag:[{label:this.$t("views.development.publicImage"),name:"first"},{label:this.$t("views.development.projectImage"),name:"second"}]}},created:function(){this.handleImageInit()},mounted:function(){},methods:{handleImageInit:function(){switch(console.log(this.category),this.obj.page=0,this.obj.category=this.category.id,this.obj.is_init=this.category.is_init){case"1":this.title=this.$t("views.development.publicImage");break;case"2":this.title=this.$t("views.development.projectImage");break;case"3":this.title=this.$t("views.development.layoutImage")}this.getImagelist(this.obj)},getImagelist:function(e){var t=this;this.$get("/image/imagelist",e).then(function(e){if(t.loading=!1,200===e.code){t.tableData=e.data.image_list;var n=parseInt(e.data.total_count),i=parseInt(e.data.per_page);t.isCount=!(n<=i)}else t.$message({message:e.message,type:"error"})})},currentChange:function(e){this.obj.page=e,this.getImagelist(this.obj)},radioPublic:function(e){this.row=e},confirmChoices:function(){var e=this.row;""===e?this.$message({message:"请选择镜像",type:"warning"}):(this.$emit("choiceName",e),this.$emit("choiceClose",!1))},dialogClose:function(){this.radio="",this.row="",this.$emit("choiceClose",!1)},selectMirrorClick:function(e){this.row=""}},props:{category:{type:Object}},watch:{"category.id":function(e,t){this.handleImageInit()}},components:{},computed:{}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:""}},[n("el-table-column",{attrs:{label:e.$t("views.development.select"),"header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-radio",{staticClass:"radio",attrs:{label:t.row.id},on:{change:function(n){return e.radioPublic(t.row)}},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v("\n          "+e._s(e.label)+"\n        ")])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"name",label:e.$t("views.development.mirror"),"header-align":"center",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"imageOs.name",label:e.$t("views.development.systemType"),"header-align":"center",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"created_at",label:e.$t("views.projectContent.createdTime"),"header-align":"center",align:"center","show-overflow-tooltip":""}}),e._v(" "),n("el-table-column",{attrs:{prop:"imageCategory.name",label:e.$t("views.development.classification"),"show-overflow-tooltip":"","header-align":"center",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"describe",label:e.$t("views.development.mirrorDescription"),"show-overflow-tooltip":"","header-align":"center",align:"center"}}),e._v(" "),n("div",{attrs:{slot:"empty"},slot:"empty"},[n("div",{staticClass:"views-empty"},[n("span",{staticClass:"views-empty-table"}),e._v(" "),n("p",{staticClass:"views-empty-text"},[e._v(e._s(e.$t("views.table.noData")))])])])],1),e._v(" "),n("div",{staticClass:"views-page"},[e.isCount?n("el-pagination",{attrs:{"page-size":e.per,layout:"prev, pager, next",total:e.total,"current-page":e.currentPage},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}}):e._e()],1),e._v(" "),n("div",{staticClass:"views-mirror-class"},[n("el-button",{staticClass:"view-btn-medium",on:{click:e.dialogClose}},[e._v(e._s(e.$t("views.button.close")))]),e._v(" "),n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:e.confirmChoices}},[e._v(e._s(e.$t("views.modelPrediction.choice")))])],1)],1)},staticRenderFns:[]};var r=n("C7Lr")(i,s,!1,function(e){n("lbwT")},"data-v-b28b8f4c",null);t.a=r.exports},h60V:function(e,t,n){(e.exports=n("UTlt")(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},lbwT:function(e,t,n){var i=n("h60V");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("FIqI")("34aea096",i,!0,{})},ucCz:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("IHPB"),s=n.n(i),r=n("v46e"),a=n("Xnow"),o=n("+t8L"),l=n("y1Wr"),c={data:function(){var e=this;return{obj:{project_id:""},isLoading:!1,projectId:"",cpuMark:!1,gpuMark:!1,memoryMark:!1,dialogMirror:!1,ificationDialog:!1,dialogAddress:!1,labelWidth:"100px",mirrorWidth:"500px !important",category:"",stroageInf:"",index:"",mount_info:[],storage_id:[],mirror_id:"",imageObj:"",ruleForm:{name:"",image:"",desc:"",mirror:"",pass:"",checkPass:"",mounting:"",cpu:"1",gpu:"0",memory:"4",address:[]},createDevrules:{name:[{required:!0,validator:function(e,t,n){""===t?n(new Error("请输入名称")):Object(r.j)(t)?n():n(new Error("只能输入2-30位字母、数字、下划线"))},trigger:"blur"},{min:2,max:30,message:this.$t("views.development.youCan"),trigger:"blur"}],pass:[{required:!0,validator:function(t,n,i){""===n?i(new Error("请输入密码")):Object(r.g)(n)?(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),i()):i(new Error("请输入6-16位字母、数字、特殊字符(!@#$%^&*)，至少两种组合"))},trigger:"blur"},{min:6,max:16,message:this.$t("views.development.password"),trigger:"blur"}],checkPass:[{required:!0,validator:function(t,n,i){""===n?i(new Error("请再次输入密码")):n!==e.ruleForm.pass?i(new Error("两次输入密码不一致!")):i()},trigger:"blur"},{min:6,max:16,message:this.$t("views.development.password"),trigger:"blur"}],image:[{required:!0,message:"请选择镜像分类",trigger:"change"}],cpu:[{required:!0,validator:function(t,n,i){""===n?i(new Error("CPU不能为空")):e.cpuMark?i(new Error("选择的值超出最大范围，请重新选择!")):i()},trigger:"change"}],gpu:[{required:!0,validator:function(t,n,i){""===n?i(new Error("GPU不能为空")):e.gpuMark?i(new Error("选择的值超出最大范围，请重新选择!")):i()},trigger:"change"}],memory:[{required:!0,validator:function(t,n,i){""===n?i(new Error("内存不能为空")):e.memoryMark?i(new Error("选择的值超出最大范围，请重新选择!")):i()},trigger:"change"}],mirror:[{required:!0,message:"请选择镜像",trigger:"change"}],mounting:[{required:!0,message:"挂载信息不能为空",trigger:"change"}],desc:[{required:!1,validator:function(e,t,n){""===t?n():Object(r.d)(t)?n():n(new Error("不得包含特殊字符:<>:'\"/\\."))},trigger:"blur"}]}}},beforeRouteLeave:function(e,t,n){var i=this.$route.query.id;"projectDetails"===e.name&&void 0===e.query.id?this.$router.push({name:"projectDetails",query:{id:i}}):n()},created:function(){this.projectId=this.obj.project_id=this.$route.query.id,this.$store.dispatch("getProjectconfig",this.obj);var e={is_init:4,project_id:this.$route.query.id};this.$store.dispatch("getImagecategorylist",e)},watch:{STORE_THEME_LANG:{handler:function(e,t){console.log(this.STORE_THEME_LANG),"zh"===this.STORE_THEME_LANG&&(this.labelWidth="100px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="180px")}}},mounted:function(){"zh"===this.STORE_THEME_LANG&&(this.labelWidth="100px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="180px")},methods:{pleaseImage:function(){this.ruleForm.mirror=""},choiceMirrorClose:function(e){console.log(e),this.ificationDialog=e},classification:function(){this.ificationDialog=!0},selectMirrorClass:function(e){console.log(e),this.imageObj=e,this.ruleForm.image=e.name,this.ificationDialog=!1},choiceMirror:function(e){var t=this;console.log(e),this.$refs[e].validateField("image",function(e){if(""===e){var n=t.imageObj;t.category=n,t.dialogMirror=!0,t.$nextTick(function(){this.$refs.selectMirror.selectMirrorClick()})}})},selectMirror:function(e){this.ruleForm.mirror=e.name,this.mirror_id=e.id},dialogClose:function(e){this.dialogMirror=!1},mountAddress:function(){if(this.ruleForm.address.length<=3){this.ruleForm.address.push({increaseAddress:"",createAddress:"",read:""})}else this.$message({message:"最多可添加四个挂载地址",type:"warning"})},reduceAddress:function(e){console.log(e),this.ruleForm.address.splice(e,1)},developBrowse:function(e,t){this.index=e,this.dialogAddress=!0},getEnvironmentcreate:function(e){var t=this;this.$post("/environmentproject/environmentcreate",e).then(function(e){t.isLoading=!1,200===e.code?(t.$message({message:e.message,type:"success"}),t.$router.go(-1)):t.$message({message:e.message,type:"error"})})},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(console.log(e),!e)return!1;var n={"Environment[project_id]":t.obj.project_id,"Environment[name]":t.ruleForm.name,"Environment[image_id]":t.mirror_id,"Environment[describe]":t.ruleForm.desc,"Environment[cpu]":t.ruleForm.cpu,"Environment[memory]":t.ruleForm.memory,"Environment[gpu]":t.ruleForm.gpu,"Environment[password]":t.ruleForm.checkPass,mount_info:t.mount_info,storage_id:t.storage_id};t.isLoading=!0,t.getEnvironmentcreate(n)})},resetForm:function(e){this.$refs[e].resetFields(),this.$router.go(-1)},changeCpu:function(e){var t=this.$store.state.projectSpace.projectconfig.cpu;console.log(t);var n=e+this.$store.state.projectSpace.projectconfig.use_cpu;this.cpuMark=n>t},changeGpu:function(e){var t=this.$store.state.projectSpace.projectconfig.gpu;console.log(t);var n=e+this.$store.state.projectSpace.projectconfig.use_gpu;this.gpuMark=n>t},changeMemory:function(e){var t=this.$store.state.projectSpace.projectconfig.memory;console.log(t);var n=e+this.$store.state.projectSpace.projectconfig.use_memory;this.memoryMark=n>t},dialogSure:function(){var e=this,t=this.ruleForm.address,n=this.stroageInf.item,i=this.stroageInf.storage_user_on;if(""===this.stroageInf)return this.$message({message:"请选择存储地址！",type:"warning"}),!1;this.storage_id=[];for(var r=0;r<t.length;r++)if(t[r].id===n.id)return this.$message({message:"该存储地址已存在，请重新选择！",type:"warning"}),!1;var a=this.index;if(t[a].id=n.id,t[a].increaseAddress=n.name,t[a].createAddress=n.path,t[a].key_file=n.key_file,t[a].keyname=n.keyname,"1"===n.is_init?(t[a].read="该挂载地址权限为只读",t[a].flag="ro"):"0"===n.is_init&&(t[a].read="该挂载地址权限为只读",t[a].flag="rw"),this.ruleForm.address=[].concat(s()(t)),0===t.length)this.mount_info=[];else{var o={};t.forEach(function(t){if(""!==t.increaseAddress){var n=t.createAddress;o[n]={mount_flag:t.flag}}e.storage_id.push(t.id)}),o.keyFileName=i.keyname+".keytab",o.keyFile=i.key_file,this.mount_info=o}this.dialogAddress=!1},handleClose:function(e){e()},showStroage:function(e){this.stroageInf=e}},components:{ViewsSelectMirror:a.a,ViewsCodeFile:o.a,ViewsMirrorClass:l.a},computed:{imagecategorylist:function(){return this.$store.getters.postImagecategorylist},projectconfig:function(){return this.$store.getters.postProjectconfig}}},m={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"views-personal"},[n("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm views-dev-form",attrs:{model:e.ruleForm,rules:e.createDevrules,"label-width":e.labelWidth}},[n("div",{staticClass:"views-header-inf"},[n("span",[e._v(e._s(e.$t("views.development.developingInformation"))+"\n      ")])]),e._v(" "),n("div",{staticClass:"views-develop-inf"},[n("div",{staticClass:"views-develop-text"},[n("div",{staticClass:"views-develop-image"},[n("el-form-item",{attrs:{label:e.$t("views.development.environmentalName"),prop:"name"}},[n("div",{staticClass:"views-develop-choice"},[n("el-input",{attrs:{placeholder:e.$t("views.development.youCan"),minlength:"2",maxlength:"30",clearable:""},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}}),e._v(" "),n("el-button",{staticClass:"view-btn-medium",staticStyle:{opacity:"0",cursor:"default"},attrs:{type:"primary"}},[e._v(e._s(e.$t("views.button.choice")))])],1)])],1),e._v(" "),n("div",{staticClass:"views-develop-image"},[n("el-form-item",{attrs:{label:e.$t("views.development.classification"),prop:"image"}},[n("div",{staticClass:"views-develop-choice"},[n("el-input",{attrs:{readonly:!0},model:{value:e.ruleForm.image,callback:function(t){e.$set(e.ruleForm,"image",t)},expression:"ruleForm.image"}}),e._v(" "),n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:function(t){return e.classification("ruleForm")}}},[e._v(e._s(e.$t("views.button.choice")))])],1)])],1),e._v(" "),n("div",{staticClass:"views-develop-image"},[n("el-form-item",{attrs:{label:e.$t("views.development.selectMirror"),prop:"mirror"}},[n("div",{staticClass:"views-develop-choice"},[n("el-input",{attrs:{readonly:!0},model:{value:e.ruleForm.mirror,callback:function(t){e.$set(e.ruleForm,"mirror",t)},expression:"ruleForm.mirror"}}),e._v(" "),n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:function(t){return e.choiceMirror("ruleForm")}}},[e._v(e._s(e.$t("views.button.choice")))])],1)])],1)]),e._v(" "),n("div",{staticClass:"views-develop-text"},[n("div",{staticClass:"views-develop-image"},[n("el-form-item",{attrs:{label:e.$t("views.development.remarks"),prop:"desc"}},[n("el-input",{attrs:{type:"textarea",rows:6,placeholder:e.$t("views.development.pleaseContents"),maxlength:"200"},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1)],1)])]),e._v(" "),n("div",{staticClass:"views-header-inf"},[n("span",[e._v(e._s(e.$t("views.development.cipherInformation")))])]),e._v(" "),n("div",{staticClass:"views-develop-inf"},[n("div",{staticClass:"views-develop-text"},[n("div",{staticClass:"views-develop-image"},[n("el-form-item",{attrs:{label:e.$t("views.development.pleasePassword"),prop:"pass"}},[n("div",{staticClass:"views-develop-choice"},[n("el-input",{attrs:{placeholder:e.$t("views.development.password"),minlength:"6",maxlength:"16",clearable:"","auto-complete":"off"},model:{value:e.ruleForm.pass,callback:function(t){e.$set(e.ruleForm,"pass",t)},expression:"ruleForm.pass"}}),e._v(" "),n("el-button",{staticClass:"view-btn-medium",staticStyle:{opacity:"0",cursor:"default"},attrs:{type:"primary"}},[e._v(e._s(e.$t("views.button.choice")))])],1)])],1)]),e._v(" "),n("div",{staticClass:"views-develop-text"},[n("div",{staticClass:"views-develop-image"},[n("el-form-item",{attrs:{label:e.$t("views.development.confirmPassword"),prop:"checkPass"}},[n("div",{staticClass:"views-develop-choice"},[n("el-input",{attrs:{placeholder:e.$t("views.development.password"),minlength:"6",maxlength:"16",clearable:"","auto-complete":"off"},model:{value:e.ruleForm.checkPass,callback:function(t){e.$set(e.ruleForm,"checkPass",t)},expression:"ruleForm.checkPass"}}),e._v(" "),n("el-button",{staticClass:"view-btn-medium",staticStyle:{opacity:"0",cursor:"default"},attrs:{type:"primary"}},[e._v(e._s(e.$t("views.button.choice")))])],1)])],1)])]),e._v(" "),n("div",{staticClass:"views-header-inf"},[n("span",[e._v(e._s(e.$t("views.development.storeInformation")))])]),e._v(" "),n("div",{staticClass:"views-develop-mount"},e._l(e.ruleForm.address,function(t,i){return n("el-form-item",{key:i,attrs:{rules:{required:!0,message:"挂载信息不能为空",trigger:"change"},prop:"address."+i+".increaseAddress","label-width":"0"}},[n("el-input",{staticClass:"w8",attrs:{placeholder:"",readonly:!0},model:{value:t.increaseAddress,callback:function(n){e.$set(t,"increaseAddress",n)},expression:"item.increaseAddress"}}),e._v(" "),n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:function(n){return e.developBrowse(i,t)}}},[e._v("\n          "+e._s(e.$t("views.development.browse"))+"\n        ")]),e._v(" "),n("el-input",{attrs:{placeholder:"",readonly:!0},model:{value:t.createAddress,callback:function(n){e.$set(t,"createAddress",n)},expression:"item.createAddress"}}),e._v(" "),n("span",{staticClass:"views-btn-reduce",on:{click:function(t){return e.reduceAddress(i)}}},[e._v("—")]),e._v(" "),n("span",[e._v(e._s(t.read))])],1)}),1),e._v(" "),n("div",{staticClass:"views-develop-mount"},[n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:e.mountAddress}},[e._v("\n        "+e._s(e.$t("views.development.mountAddress"))+"\n      ")]),e._v(" "),n("span",{staticClass:"views-mount-span"},[e._v("*"+e._s(e.$t("views.development.mountableAddresses")))])],1),e._v(" "),n("div",{staticClass:"views-header-inf"},[n("span",[e._v(e._s(e.$t("views.development.resource")))])]),e._v(" "),n("div",{staticClass:"views-develop-resources"},[n("el-form-item",{attrs:{label:"CPU",prop:"cpu"}},[n("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},on:{change:e.changeCpu},model:{value:e.ruleForm.cpu,callback:function(t){e.$set(e.ruleForm,"cpu",t)},expression:"ruleForm.cpu"}},e._l(e.projectconfig.cpu_config,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" 核\n      ")],1),e._v(" "),n("el-form-item",{attrs:{label:"GPU",prop:"gpu"}},[n("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},on:{change:e.changeGpu},model:{value:e.ruleForm.gpu,callback:function(t){e.$set(e.ruleForm,"gpu",t)},expression:"ruleForm.gpu"}},e._l(e.projectconfig.gpu_config,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" 个\n      ")],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("views.projectContent.memory"),prop:"memory"}},[n("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},on:{change:e.changeMemory},model:{value:e.ruleForm.memory,callback:function(t){e.$set(e.ruleForm,"memory",t)},expression:"ruleForm.memory"}},e._l(e.projectconfig.memory_config,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" G\n      ")],1)],1),e._v(" "),n("div",{staticClass:"views-develop-btn"},[n("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v(e._s(e.$t("views.button.cancel")))]),e._v(" "),n("el-button",{staticClass:"view-btn-big",attrs:{type:"primary",loading:e.isLoading},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v(e._s(e.$t("views.button.run")))])],1)]),e._v(" "),n("el-dialog",{attrs:{title:e.$t("views.development.classification"),visible:e.ificationDialog,"before-close":e.handleClose,width:e.mirrorWidth},on:{"update:visible":function(t){e.ificationDialog=t}}},[n("div",{staticClass:"content"},[n("views-mirror-class",{ref:"selectMirror1",attrs:{imagecategorylist:e.imagecategorylist},on:{dialogMirrorClose:function(t){return e.choiceMirrorClose(t)},choiceMirrorName:function(t){return e.selectMirrorClass(t)}}})],1)]),e._v(" "),n("el-dialog",{attrs:{title:e.$t("views.development.selectMirror"),visible:e.dialogMirror,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogMirror=t}}},[n("div",{staticClass:"content"},[n("views-select-mirror",{ref:"selectMirror",attrs:{category:e.category},on:{choiceClose:function(t){return e.dialogClose(t)},choiceName:function(t){return e.selectMirror(t)}}})],1)]),e._v(" "),n("el-dialog",{staticClass:"small",attrs:{title:"选择存储挂载地址",visible:e.dialogAddress,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogAddress=t}}},[n("div",{staticClass:"content"},[n("views-code-file",{attrs:{projectId:e.projectId},on:{selectStroage:function(t){return e.showStroage(t)}}})],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{staticClass:"cancel",on:{click:function(t){e.dialogAddress=!1}}},[e._v(e._s(e.$t("views.button.cancel")))]),e._v(" "),n("el-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:e.dialogSure}},[e._v(e._s(e.$t("views.button.sure")))])],1)])],1)},staticRenderFns:[]},u=n("C7Lr")(c,m,!1,null,null,null);t.default=u.exports},y1Wr:function(e,t,n){"use strict";var i={data:function(){return{commonImage:[],objectImage:[],layoutImage:[],tableData:[],isCount:!1,radio:"",label:"",row:"",activeName:"first",tag:[{label:this.$t("views.development.publicImageType"),name:"first"},{label:this.$t("views.development.projectImageType"),name:"second"},{label:this.$t("views.development.layoutImageType"),name:"third"}]}},created:function(){var e=this.imagecategorylist.category;this.imagecategory(e)},mounted:function(){},props:{imagecategorylist:{type:Object}},methods:{imagecategory:function(e){this.tableData=this.commonImage=e.filter(function(e,t){return"1"===e.is_init}),this.objectImage=e.filter(function(e,t){return"2"===e.is_init}),this.layoutImage=e.filter(function(e,t){return"3"===e.is_init})},dialogClose:function(){this.$emit("dialogMirrorClose",!1)},confirmChoices:function(){if(this.radio){var e=this.row;this.$emit("choiceMirrorName",e)}else this.$message({message:"请选择镜像分类",type:"warning"})},handleClick:function(e,t){switch(this.activeName=e.name){case"first":this.tableData=this.commonImage;break;case"second":this.tableData=this.objectImage;break;case"third":this.tableData=this.layoutImage}},radioPublic:function(e){this.row=e}},components:{},computed:{}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-tabs",{staticClass:"views-select-mirror",on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.tag,function(t,i){return n("el-tab-pane",{key:i,attrs:{label:t.label,name:t.name}},[n("el-table",{ref:"multipleTable",refInFor:!0,staticClass:"tab-content",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:"",height:"250"}},[n("el-table-column",{attrs:{label:e.$t("views.development.select"),"header-align":"center",align:"center",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-radio",{staticClass:"radio",attrs:{label:t.row.id},on:{change:function(n){return e.radioPublic(t.row)}},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v("\n              "+e._s(e.label)+"\n            ")])]}}],null,!0)}),e._v(" "),n("el-table-column",{attrs:{prop:"name",label:e.$t("views.development.mirror"),"header-align":"center",align:"center"}}),e._v(" "),n("div",{attrs:{slot:"empty"},slot:"empty"},[n("div",{staticClass:"views-empty"},[n("span",{staticClass:"views-empty-table"}),e._v(" "),n("p",{staticClass:"views-empty-text"},[e._v(e._s(e.$t("views.table.noData")))])])])],1),e._v(" "),n("div",{staticClass:"views-page"},[e.isCount?n("el-pagination",{attrs:{"page-size":e.per,layout:"prev, pager, next",total:e.total,"current-page":e.currentPage},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}}):e._e()],1),e._v(" "),n("div",{staticClass:"views-mirror-class"},[n("el-button",{staticClass:"view-btn-medium",on:{click:e.dialogClose}},[e._v(e._s(e.$t("views.button.close")))]),e._v(" "),n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:e.confirmChoices}},[e._v(e._s(e.$t("views.modelPrediction.choice")))])],1)],1)}),1)],1)},staticRenderFns:[]},r=n("C7Lr")(i,s,!1,null,null,null);t.a=r.exports}});