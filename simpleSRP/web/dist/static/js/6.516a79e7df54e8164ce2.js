webpackJsonp([6],{"1bY3":function(e,t,n){var s=n("fizW");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);n("FIqI")("257069b9",s,!0,{})},"7LsO":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("IHPB"),i=n.n(s),a=n("v46e"),r={data:function(){return{activeName:"first",tableData:[],loading:!0,radio:"",label:"",isCount:!1,per:0,total:0,currentPage:1,title:"",obj:{is_init:1,category:"",page:0,status:1},row:"",tag:[{label:this.$t("views.development.publicImage"),name:"first"},{label:this.$t("views.development.personalImage"),name:"second"},{label:this.$t("views.development.layoutImage"),name:"third"}]}},created:function(){this.handleImageInit()},mounted:function(){},methods:{handleImageInit:function(){switch(console.log(this.category),this.obj.page=0,this.obj.category=this.category.id,this.obj.is_init=this.category.is_init){case"1":this.title=this.$t("views.development.publicImage");break;case"0":this.title=this.$t("views.development.personalImage");break;case"3":this.title=this.$t("views.development.layoutImage")}this.getImagelist(this.obj)},getImagelist:function(e){var t=this;this.$get("/image/imagelist",e).then(function(e){if(t.loading=!1,200===e.code){t.tableData=e.data.image_list;var n=parseInt(e.data.total_count),s=parseInt(e.data.per_page);t.isCount=!(n<=s)}else t.$message({message:e.message,type:"error"})})},currentChange:function(e){this.obj.page=e,this.getImagelist(this.obj)},radioPublic:function(e){this.row=e},confirmChoices:function(){var e=this.row;""===e?this.$message({message:"请选择镜像",type:"warning"}):(this.$emit("choiceName",e),this.$emit("choiceClose",!1))},dialogClose:function(){this.radio="",this.row="",this.$emit("choiceClose",!1)},selectMirrorClick:function(e){this.row=""}},props:{category:{type:Object}},watch:{"category.id":function(e,t){this.handleImageInit()}},components:{},computed:{}},o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:""}},[n("el-table-column",{attrs:{label:e.$t("views.development.select"),"header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-radio",{staticClass:"radio",attrs:{label:t.row.id},on:{change:function(n){return e.radioPublic(t.row)}},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v("\n          "+e._s(e.label)+"\n        ")])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"name",label:e.$t("views.development.mirror"),"header-align":"center",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"imageOs.name",label:e.$t("views.development.systemType"),"header-align":"center",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"created_at",label:e.$t("views.projectContent.createdTime"),"header-align":"center",align:"center","show-overflow-tooltip":""}}),e._v(" "),n("el-table-column",{attrs:{prop:"imageCategory.name",label:e.$t("views.development.classification"),"show-overflow-tooltip":"","header-align":"center",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{prop:"describe",label:e.$t("views.development.mirrorDescription"),"show-overflow-tooltip":"","header-align":"center",align:"center"}}),e._v(" "),n("div",{attrs:{slot:"empty"},slot:"empty"},[n("div",{staticClass:"views-empty"},[n("span",{staticClass:"views-empty-table"}),e._v(" "),n("p",{staticClass:"views-empty-text"},[e._v(e._s(e.$t("views.table.noData")))])])])],1),e._v(" "),n("div",{staticClass:"views-page"},[e.isCount?n("el-pagination",{attrs:{"page-size":e.per,layout:"prev, pager, next",total:e.total,"current-page":e.currentPage},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}}):e._e()],1),e._v(" "),n("div",{staticClass:"views-mirror-class"},[n("el-button",{staticClass:"view-btn-medium",on:{click:e.dialogClose}},[e._v(e._s(e.$t("views.button.close")))]),e._v(" "),n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:e.confirmChoices}},[e._v(e._s(e.$t("views.modelPrediction.choice")))])],1)],1)},staticRenderFns:[]};var l=n("C7Lr")(r,o,!1,function(e){n("q5el")},"data-v-47c525c7",null).exports,c={data:function(){return{activeName:"first",storagelist:"",common_storage:"",personal_storage:"",storage_user_on:{}}},created:function(){this.getStoragelist()},mounted:function(){},methods:{getStoragelist:function(e){var t=this;this.$post("/environmentproject/storagelist").then(function(e){if(200===e.code){t.storagelist=e.data,t.storage_user_on=e.data.storage_user_on;var n=e.data.common_storage;t.getCommmon(n)}else t.$message({message:e.message,type:"error"})})},getCommmon:function(e){this.common_storage=this.processingData(e)},handleClick:function(e){var t=e.name;if(""===this.storagelist)this.$message({message:"挂载数据为空！",type:"error"});else switch(t){case"first":this.common_storage=this.processingData(this.storagelist.common_storage);break;case"second":this.personal_storage=this.processingData(this.storagelist.personal_storage);break;default:this.common_storage=this.processingData(this.storagelist.common_storage)}},processingData:function(e){if(0!==e.lenght)return e.forEach(function(e){e.active=!1,e.disabled=!1}),e;this.$message({message:"挂载数据为空！",type:"error"})},conmmonStroage:function(e,t){var n=this.storage_user_on;this.$emit("selectStroage",{item:e,storage_user_on:n}),this.common_storage.forEach(function(e,n){e.active=!1,e.check=!0,n===t&&(e.disabled=!0,e.active=!0,e.check=!1)}),this.common_storage=[].concat(i()(this.common_storage))},personalStroage:function(e,t){var n=this.storage_user_on;this.$emit("selectStroage",{item:e,storage_user_on:n}),this.personal_storage.forEach(function(e,n){e.active=!1,e.check=!0,n===t&&(e.disabled=!0,e.active=!0,e.check=!1)}),this.personal_storage=[].concat(i()(this.personal_storage))}},components:{},computed:{}},m={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:e.$t("views.development.commonStorage"),name:"first"}},[n("div",{staticClass:"views-code-file"},[n("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[0===e.common_storage.length?n("div",{staticClass:"views-code-storage"},[e._v("\n          "+e._s(e.$t("views.table.noData"))+"\n        ")]):e._l(e.common_storage,function(t,s){return n("div",{key:s,class:[{"views-code-select":t.active},"views-code-storage"],on:{click:function(n){return e.conmmonStroage(t,s)}}},[n("i",{staticClass:"iconfont icon-xiangmu views-icon-project"}),e._v(" "),n("span",[e._v(e._s(t.name))])])})],2)],1)]),e._v(" "),n("el-tab-pane",{attrs:{label:e.$t("views.development.personalStorage"),name:"second"}},[n("div",{staticClass:"views-code-file"},[n("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[0===e.personal_storage.length?n("div",{staticClass:"views-code-storage"},[e._v("\n          "+e._s(e.$t("views.table.noData"))+"\n        ")]):e._l(e.personal_storage,function(t,s){return n("div",{key:s,class:[{"views-code-select":t.active},"views-code-storage"],on:{click:function(n){return e.personalStroage(t,s)}}},[n("i",{staticClass:"iconfont icon-xiangmu views-icon-project"}),e._v(" "),n("span",[e._v(e._s(t.name))])])})],2)],1)])],1)},staticRenderFns:[]};var u=n("C7Lr")(c,m,!1,function(e){n("1bY3")},"data-v-141a99ba",null).exports,d={data:function(){return{commonImage:[],personalImage:[],layoutImage:[],tableData:[],isCount:!1,radio:"",label:"",row:"",activeName:"first",tag:[{label:this.$t("views.development.publicImageType"),name:"first"},{label:this.$t("views.development.personalImageType"),name:"second"},{label:this.$t("views.development.layoutImageType"),name:"third"}]}},created:function(){var e=this.imagecategorylist.category;this.imagecategory(e)},mounted:function(){},props:{imagecategorylist:{type:Object}},methods:{imagecategory:function(e){this.tableData=this.commonImage=e.filter(function(e,t){return"1"===e.is_init}),this.personalImage=e.filter(function(e,t){return"0"===e.is_init}),this.layoutImage=e.filter(function(e,t){return"3"===e.is_init})},dialogClose:function(){this.$emit("dialogMirrorClose",!1)},confirmChoices:function(){if(this.radio){var e=this.row;this.$emit("choiceMirrorName",e)}else this.$message({message:"请选择镜像分类",type:"warning"})},handleClick:function(e,t){switch(this.activeName=e.name){case"first":this.tableData=this.commonImage;break;case"second":this.tableData=this.personalImage;break;case"third":this.tableData=this.layoutImage}},radioPublic:function(e){this.row=e}},components:{},computed:{}},v={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-tabs",{staticClass:"views-select-mirror",on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.tag,function(t,s){return n("el-tab-pane",{key:s,attrs:{label:t.label,name:t.name}},[n("el-table",{ref:"multipleTable",refInFor:!0,staticClass:"tab-content",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:"",height:"250"}},[n("el-table-column",{attrs:{label:e.$t("views.development.select"),"header-align":"center",align:"center",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-radio",{staticClass:"radio",attrs:{label:t.row.id},on:{change:function(n){return e.radioPublic(t.row)}},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v("\n              "+e._s(e.label)+"\n            ")])]}}],null,!0)}),e._v(" "),n("el-table-column",{attrs:{prop:"name",label:e.$t("views.development.mirror"),"header-align":"center",align:"center"}}),e._v(" "),n("div",{attrs:{slot:"empty"},slot:"empty"},[n("div",{staticClass:"views-empty"},[n("span",{staticClass:"views-empty-table"}),e._v(" "),n("p",{staticClass:"views-empty-text"},[e._v(e._s(e.$t("views.table.noData")))])])])],1),e._v(" "),n("div",{staticClass:"views-page"},[e.isCount?n("el-pagination",{attrs:{"page-size":e.per,layout:"prev, pager, next",total:e.total,"current-page":e.currentPage},on:{"current-change":e.currentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}}):e._e()],1),e._v(" "),n("div",{staticClass:"views-mirror-class"},[n("el-button",{staticClass:"view-btn-medium",on:{click:e.dialogClose}},[e._v(e._s(e.$t("views.button.close")))]),e._v(" "),n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:e.confirmChoices}},[e._v(e._s(e.$t("views.modelPrediction.choice")))])],1)],1)}),1)],1)},staticRenderFns:[]},g={data:function(){var e=this;return{cpuMark:!1,gpuMark:!1,isLoading:!1,memoryMark:!1,dialogMirror:!1,dialogAddress:!1,ificationDialog:!1,labelWidth:"100px",mirrorWidth:"500px !important",category:"",stroageInf:"",index:"",mount_info:{},storage_id:[],mirror_id:"",objImage:{},ruleForm:{name:"",image:"",desc:"",mirror:"",pass:"",checkPass:"",mounting:"",cpu:"1",gpu:"0",memory:"4",address:[]},createDevrules:{name:[{required:!0,validator:function(e,t,n){""===t?n(new Error("请输入名称")):Object(a.j)(t)?n():n(new Error("只能输入2-30位字母、数字、下划线"))},trigger:"blur"},{min:2,max:30,message:this.$t("views.development.youCan"),trigger:"blur"}],pass:[{required:!0,validator:function(t,n,s){""===n?s(new Error("请输入密码")):Object(a.g)(n)?(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),s()):s(new Error("请输入6-16位字母、数字、特殊字符(!@#$%^&*)，至少两种组合"))},trigger:"blur"},{min:6,max:16,message:this.$t("views.development.password"),trigger:"blur"}],checkPass:[{required:!0,validator:function(t,n,s){""===n?s(new Error("请再次输入密码")):n!==e.ruleForm.pass?s(new Error("两次输入密码不一致!")):s()},trigger:"blur"},{min:6,max:16,message:this.$t("views.development.password"),trigger:"blur"}],image:[{required:!0,message:"请选择镜像分类",trigger:"change"}],cpu:[{required:!0,validator:function(t,n,s){""===n?s(new Error("CPU不能为空")):e.cpuMark?s(new Error("选择的值超出最大范围，请重新选择!")):s()},trigger:"change"}],gpu:[{required:!0,validator:function(t,n,s){""===n?s(new Error("GPU不能为空")):e.gpuMark?s(new Error("选择的值超出最大范围，请重新选择!")):s()},trigger:"change"}],memory:[{required:!0,validator:function(t,n,s){""===n?s(new Error("内存不能为空")):e.memoryMark?s(new Error("选择的值超出最大范围，请重新选择!")):s()},trigger:"change"}],mirror:[{required:!0,message:"请选择镜像",trigger:"change"}],mounting:[{required:!0,message:"挂载信息不能为空",trigger:"change"}],desc:[{required:!1,validator:function(e,t,n){""===t?n():Object(a.d)(t)?n():n(new Error("不得包含特殊字符:<>:'\"/\\."))},trigger:"blur"}]}}},created:function(){this.$store.dispatch("getPersonalconfig");this.$store.dispatch("getImagecategorylist",{is_init:3})},watch:{STORE_THEME_LANG:{handler:function(e,t){"zh"===this.STORE_THEME_LANG&&(this.labelWidth="100px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="180px")}}},mounted:function(){"zh"===this.STORE_THEME_LANG&&(this.labelWidth="100px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="180px")},methods:{pleaseImage:function(){this.ruleForm.mirror=""},choiceMirrorClose:function(e){console.log(e),this.ificationDialog=e},classification:function(){this.ificationDialog=!0},selectMirrorClass:function(e){this.objImage=e,this.ruleForm.image=e.name,this.ificationDialog=!1},choiceMirror:function(e){var t=this;console.log(e),this.$refs[e].validateField("image",function(e){if(""===e){var n=t.objImage;console.log(n),t.category=n,t.dialogMirror=!0,t.$nextTick(function(){this.$refs.selectMirror.selectMirrorClick()})}})},selectMirror:function(e){this.ruleForm.mirror=e.name,this.mirror_id=e.id},dialogClose:function(e){this.dialogMirror=!1},mountAddress:function(){if(this.ruleForm.address.length<=3){this.ruleForm.address.push({increaseAddress:"",createAddress:"",read:""})}else this.$message({message:"最多可添加四个挂载地址",type:"warning"})},reduceAddress:function(e){console.log(e),this.ruleForm.address.splice(e,1)},developBrowse:function(e,t){this.index=e,this.dialogAddress=!0},getEnvironmentcreate:function(e){var t=this;this.$post("/personal/environmentcreate",e).then(function(e){t.isLoading=!1,200===e.code?(t.$message({message:e.message,type:"success"}),t.$router.go(-1)):t.$message({message:e.message,type:"error"})})},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(console.log(e),!e)return!1;var n={"Environment[name]":t.ruleForm.name,"Environment[image_id]":t.mirror_id,"Environment[describe]":t.ruleForm.desc,"Environment[cpu]":t.ruleForm.cpu,"Environment[memory]":t.ruleForm.memory,"Environment[gpu]":t.ruleForm.gpu,"Environment[password]":t.ruleForm.checkPass,mount_info:t.mount_info,storage_id:t.storage_id};t.isLoading=!0,t.getEnvironmentcreate(n)})},resetForm:function(e){this.$refs[e].resetFields(),this.$router.go(-1)},changeCpu:function(e){var t=this.$store.state.projectSpace.personalconfig.cpu;console.log(t);var n=e+this.$store.state.projectSpace.personalconfig.use_cpu;this.cpuMark=n>t},changeGpu:function(e){var t=this.$store.state.projectSpace.personalconfig.gpu;console.log(t);var n=e+this.$store.state.projectSpace.personalconfig.use_gpu;this.gpuMark=n>t},changeMemory:function(e){var t=this.$store.state.projectSpace.personalconfig.memory;console.log(t);var n=e+this.$store.state.projectSpace.personalconfig.use_memory;this.memoryMark=n>t},dialogSure:function(){var e=this,t=this.ruleForm.address,n=this.stroageInf.item,s=this.stroageInf.storage_user_on;if(""===this.stroageInf)return this.$message({message:"请选择存储地址！",type:"warning"}),!1;this.storage_id=[];for(var a=0;a<t.length;a++)if(t[a].id===n.id)return this.$message({message:"该存储地址已存在，请重新选择！",type:"warning"}),!1;var r=this.index;if(t[r].id=n.id,t[r].increaseAddress=n.name,t[r].createAddress=n.path,t[r].key_file=n.key_file,t[r].keyname=n.keyname,"1"===n.is_init?(t[r].read="该挂载地址权限为只读",t[r].flag="ro"):"0"===n.is_init&&(t[r].read="该挂载地址权限为只读",t[r].flag="rw"),this.ruleForm.address=[].concat(i()(t)),0===t.length)this.mount_info=[];else{var o={};t.forEach(function(t){if(""!==t.increaseAddress){var n=t.createAddress;o[n]={mount_flag:t.flag}}e.storage_id.push(t.id)}),o.keyFileName=s.keyname+".keytab",o.keyFile=s.key_file,this.mount_info=o}this.dialogAddress=!1},handleClose:function(e){e()},showStroage:function(e){this.stroageInf=e}},components:{ViewsSelectMirror:l,ViewsCodeFile:u,ViewsMirrorClass:n("C7Lr")(d,v,!1,null,null,null).exports},computed:{imagecategorylist:function(){return this.$store.getters.postImagecategorylist},personalconfig:function(){return this.$store.getters.postPersonalconfig}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"views-personal"},[n("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm views-dev-form",attrs:{model:e.ruleForm,rules:e.createDevrules,"label-width":e.labelWidth}},[n("div",{staticClass:"views-header-inf"},[n("span",[e._v(e._s(e.$t("views.development.developingInformation"))+"\n      ")])]),e._v(" "),n("div",{staticClass:"views-develop-inf"},[n("div",{staticClass:"views-develop-text"},[n("div",{staticClass:"views-develop-image"},[n("el-form-item",{attrs:{label:e.$t("views.development.environmentalName"),prop:"name"}},[n("div",{staticClass:"views-develop-choice"},[n("el-input",{attrs:{placeholder:e.$t("views.development.youCan"),minlength:"2",maxlength:"30",clearable:""},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}}),e._v(" "),n("el-button",{staticClass:"view-btn-medium",staticStyle:{opacity:"0",cursor:"default"},attrs:{type:"primary"}},[e._v(e._s(e.$t("views.button.choice")))])],1)])],1),e._v(" "),n("div",{staticClass:"views-develop-image"},[n("el-form-item",{attrs:{label:e.$t("views.development.classification"),prop:"image"}},[n("div",{staticClass:"views-develop-choice"},[n("el-input",{attrs:{readonly:!0},model:{value:e.ruleForm.image,callback:function(t){e.$set(e.ruleForm,"image",t)},expression:"ruleForm.image"}}),e._v(" "),n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:function(t){return e.classification("ruleForm")}}},[e._v(e._s(e.$t("views.button.choice")))])],1)])],1),e._v(" "),n("div",{staticClass:"views-develop-image"},[n("el-form-item",{attrs:{label:e.$t("views.development.selectMirror"),prop:"mirror"}},[n("div",{staticClass:"views-develop-choice"},[n("el-input",{attrs:{readonly:!0},model:{value:e.ruleForm.mirror,callback:function(t){e.$set(e.ruleForm,"mirror",t)},expression:"ruleForm.mirror"}}),e._v(" "),n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:function(t){return e.choiceMirror("ruleForm")}}},[e._v(e._s(e.$t("views.button.choice")))])],1)])],1)]),e._v(" "),n("div",{staticClass:"views-develop-text"},[n("div",{staticClass:"views-develop-image"},[n("el-form-item",{attrs:{label:e.$t("views.development.remarks"),prop:"desc"}},[n("el-input",{attrs:{type:"textarea",rows:6,maxlength:"200",placeholder:e.$t("views.development.pleaseContents")},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1)],1)])]),e._v(" "),n("div",{staticClass:"views-header-inf"},[n("span",[e._v(e._s(e.$t("views.development.cipherInformation")))])]),e._v(" "),n("div",{staticClass:"views-develop-inf"},[n("div",{staticClass:"views-develop-text"},[n("div",{staticClass:"views-develop-input"},[n("el-form-item",{attrs:{label:e.$t("views.development.pleasePassword"),prop:"pass"}},[n("el-input",{attrs:{placeholder:e.$t("views.development.password"),clearable:"",minlength:"6",maxlength:"16","auto-complete":"off"},model:{value:e.ruleForm.pass,callback:function(t){e.$set(e.ruleForm,"pass",t)},expression:"ruleForm.pass"}})],1)],1)]),e._v(" "),n("div",{staticClass:"views-develop-text"},[n("div",{staticClass:"views-develop-input"},[n("el-form-item",{attrs:{label:e.$t("views.development.confirmPassword"),prop:"checkPass"}},[n("el-input",{attrs:{placeholder:e.$t("views.development.password"),clearable:"",minlength:"6",maxlength:"16","auto-complete":"off"},model:{value:e.ruleForm.checkPass,callback:function(t){e.$set(e.ruleForm,"checkPass",t)},expression:"ruleForm.checkPass"}})],1)],1)])]),e._v(" "),n("div",{staticClass:"views-header-inf"},[n("span",[e._v(e._s(e.$t("views.development.storeInformation")))])]),e._v(" "),n("div",{staticClass:"views-develop-mount"},e._l(e.ruleForm.address,function(t,s){return n("el-form-item",{key:s,attrs:{rules:{required:!0,message:"挂载信息不能为空",trigger:"change"},prop:"address."+s+".increaseAddress","label-width":"0"}},[n("el-input",{staticClass:"w8",attrs:{placeholder:"",readonly:!0},model:{value:t.increaseAddress,callback:function(n){e.$set(t,"increaseAddress",n)},expression:"item.increaseAddress"}}),e._v(" "),n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:function(n){return e.developBrowse(s,t)}}},[e._v("\n          "+e._s(e.$t("views.development.browse"))+"\n        ")]),e._v(" "),n("el-input",{attrs:{placeholder:"",readonly:!0},model:{value:t.createAddress,callback:function(n){e.$set(t,"createAddress",n)},expression:"item.createAddress"}}),e._v(" "),n("span",{staticClass:"views-btn-reduce",on:{click:function(t){return e.reduceAddress(s)}}},[e._v("—")]),e._v(" "),n("span",[e._v(e._s(t.read))])],1)}),1),e._v(" "),n("div",{staticClass:"views-develop-mount"},[n("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:e.mountAddress}},[e._v("\n        "+e._s(e.$t("views.development.mountAddress"))+"\n      ")]),e._v(" "),n("span",{staticClass:"views-mount-span"},[e._v("*"+e._s(e.$t("views.development.mountableAddresses")))])],1),e._v(" "),n("div",{staticClass:"views-header-inf"},[n("span",[e._v(e._s(e.$t("views.development.resource")))])]),e._v(" "),n("div",{staticClass:"views-develop-resources"},[n("el-form-item",{attrs:{label:"CPU",prop:"cpu"}},[n("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},on:{change:e.changeCpu},model:{value:e.ruleForm.cpu,callback:function(t){e.$set(e.ruleForm,"cpu",t)},expression:"ruleForm.cpu"}},e._l(e.personalconfig.cpu_config,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" 核\n      ")],1),e._v(" "),n("el-form-item",{attrs:{label:"GPU",prop:"gpu"}},[n("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},on:{change:e.changeGpu},model:{value:e.ruleForm.gpu,callback:function(t){e.$set(e.ruleForm,"gpu",t)},expression:"ruleForm.gpu"}},e._l(e.personalconfig.gpu_config,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" 个\n      ")],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("views.projectContent.memory"),prop:"memory"}},[n("el-select",{attrs:{placeholder:e.$t("views.development.pleaseChoose")},on:{change:e.changeMemory},model:{value:e.ruleForm.memory,callback:function(t){e.$set(e.ruleForm,"memory",t)},expression:"ruleForm.memory"}},e._l(e.personalconfig.memory_config,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" G\n      ")],1)],1),e._v(" "),n("div",{staticClass:"views-develop-btn"},[n("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v(e._s(e.$t("views.button.cancel")))]),e._v(" "),n("el-button",{staticClass:"view-btn-big",attrs:{type:"primary",loading:e.isLoading},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v(e._s(e.$t("views.button.run")))])],1)]),e._v(" "),n("el-dialog",{attrs:{title:e.$t("views.development.classification"),visible:e.ificationDialog,"before-close":e.handleClose,width:e.mirrorWidth},on:{"update:visible":function(t){e.ificationDialog=t}}},[n("div",{staticClass:"content"},[n("views-mirror-class",{ref:"selectMirror1",attrs:{imagecategorylist:e.imagecategorylist},on:{dialogMirrorClose:function(t){return e.choiceMirrorClose(t)},choiceMirrorName:function(t){return e.selectMirrorClass(t)}}})],1)]),e._v(" "),n("el-dialog",{attrs:{title:e.$t("views.development.selectMirror"),visible:e.dialogMirror,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogMirror=t}}},[n("div",{staticClass:"content"},[n("views-select-mirror",{ref:"selectMirror",attrs:{category:e.category},on:{choiceClose:function(t){return e.dialogClose(t)},choiceName:function(t){return e.selectMirror(t)}}})],1)]),e._v(" "),n("el-dialog",{staticClass:"small",attrs:{title:"选择存储挂载地址",visible:e.dialogAddress,"before-close":e.handleClose},on:{"update:visible":function(t){e.dialogAddress=t}}},[n("div",{staticClass:"content"},[n("views-code-file",{on:{selectStroage:function(t){return e.showStroage(t)}}})],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{staticClass:"cancel",on:{click:function(t){e.dialogAddress=!1}}},[e._v(e._s(e.$t("views.button.cancel")))]),e._v(" "),n("el-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:e.dialogSure}},[e._v(e._s(e.$t("views.button.sure")))])],1)])],1)},staticRenderFns:[]},h=n("C7Lr")(g,p,!1,null,null,null);t.default=h.exports},X9v2:function(e,t,n){(e.exports=n("UTlt")(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},fizW:function(e,t,n){(e.exports=n("UTlt")(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},q5el:function(e,t,n){var s=n("X9v2");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);n("FIqI")("39b757fa",s,!0,{})}});