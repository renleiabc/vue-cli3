webpackJsonp([38],{mMuX:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("ZoQJ"),i=s("v46e"),r={data:function(){return{indexLink:"1",createDialog:!1,loading:!0,projectName:"",labelWidth:"120px",status:"",timeValue:"",readonly:!1,project_id:"",isCount:!1,per:0,total:0,options:[],archived:[],tableData:[],indexes:"",currentPage:1,archived_project:[],pickerOptions:Object(a.i)(),obj:{name:"",start_time:"",end_time:"",status:0,sort:"",page:0},ruleForm:{name:"",describe:""},rules:{name:[{required:!0,validator:function(e,t,s){""===t?s(new Error("请输入项目名称")):Object(i.e)(t)?s():s(new Error("项目名称不得包含：<>:'\"/\\."))},trigger:"blur"}],describe:[{required:!1,message:"请输入项目描述",trigger:"blur"}]},isLoading:!1,roleNum:""}},created:function(){var e=this.obj;this.getProjectSpaceData(e),this.$store.dispatch("getProjectStatus"),this.$store.dispatch("getUserinfo"),this.userinfo()},watch:{STORE_THEME_LANG:{handler:function(e,t){"zh"===this.STORE_THEME_LANG&&(this.labelWidth="120px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="200px")}}},mounted:function(){"zh"===this.STORE_THEME_LANG&&(this.labelWidth="120px"),"en"===this.STORE_THEME_LANG&&(this.labelWidth="200px")},methods:{userinfo:function(){this.roleNum=JSON.parse(window.sessionStorage.getItem("userinfo")).role},getProjectSpaceData:function(e){var t=this;this.$get("/project/myproject",e).then(function(e){if(200===e.code){t.loading=!1,t.tableData=e.data.project_space;var s=e.data.total_count,a=e.data.per_page;s<=a?t.isCount=!1:(t.isCount=!0,t.per=a,t.total=s)}else t.$message({message:e.message,type:"error"})})},sortTable:function(e){"descending"===e.order?this.obj.sort="-"+e.prop:this.obj.sort=e.prop,this.search()},reset:function(){var e={name:"",start_time:"",end_time:"",status:0,page:0};this.obj=e,this.timeValue="",this.currentPage=1,this.getProjectSpaceData(e)},search:function(){""===this.timeValue?(this.obj.start_time="",this.obj.end_time=""):(this.obj.start_time=this.timeValue[0],this.obj.end_time=this.timeValue[1]),this.currentPage=1,this.obj.page=0;var e=this.obj;this.getProjectSpaceData(e)},searchStatus:function(e){this.status=e},indexMethod:function(e){return e+1},handleSelectionChange:function(e){this.archived=e},openFile:function(){if(this.archived_project=[],0===this.archived.length)this.$message({message:this.$t("views.dialogText.archived"),type:"warning"});else{var e=this;if(this.archived.forEach(function(t,s){var a=t.status,i=t.id;"0"===a&&e.archived_project.push(i)}),0===this.archived_project.length)this.$message({message:this.$t("views.dialogText.archived"),type:"warning"});else{var t=this.archived_project;console.log(t),this.projectSetting(t)}}},fileClick:function(e){var t=[];t.push(e),this.projectSetting(t)},projectSetting:function(e){var t=this;this.$confirm(this.$t("views.dialogText.filed"),this.$t("views.dialogText.tip"),{confirmButtonText:this.$t("views.button.sure"),cancelButtonText:this.$t("views.button.cancel"),type:"warning",beforeClose:function(s,a,i){if("confirm"===s){a.confirmButtonLoading=!0;var r={project_id:e};t.$post("/project/archiveproject",r).then(function(e){if(200===e.code){t.$message({message:e.message,type:"success"});var s=t.obj;t.getProjectSpaceData(s)}else t.$message({message:e.message,type:"error"});a.confirmButtonLoading=!1,i()})}else i()}}).catch(function(){})},openProject:function(){this.createDialog=!0},submitForm:function(e){var t=this;this.$refs[e].validate(function(s){if(!s)return console.log("error submit!!"),!1;t.isLoading=!0;var a=t.ruleForm;t.$post("/project/projectcreate",{Project:a}).then(function(s){if(t.isLoading=!1,200===s.code){t.$message({message:s.message,type:"success"});t.getProjectSpaceData({name:"",start_time:"",end_time:"",status:0,page:1}),t.currentPage=1,t.$refs[e].resetFields(),t.createDialog=!1}else t.$message({message:s.message,type:"error"})})})},resetForm:function(e){this.$refs[e].resetFields(),this.createDialog=!1},handleClose:function(e){e()},projectCurrentChange:function(e){this.$set(this.obj,"page",e);var t=this.obj;this.getProjectSpaceData(t)},indexActive:function(){window.localStorage.setItem("activeName","first")}},components:{},computed:{projectStatus:function(){return this.$store.getters.postProjectStatus}}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"views-project-space"},[s("div",{staticClass:"tab-select"},[s("div",[s("span",{staticClass:"tab-select-title"},[e._v(e._s(e.$t("views.projectContent.projectName")))]),e._v(" "),s("el-input",{staticClass:"views-input-text",attrs:{placeholder:e.$t("views.projectContent.inputKeyword")},model:{value:e.obj.name,callback:function(t){e.$set(e.obj,"name",t)},expression:"obj.name"}})],1),e._v(" "),s("div",[s("span",{staticClass:"tab-select-title"},[e._v(e._s(e.$t("views.table.createTime")))]),e._v(" "),s("el-date-picker",{attrs:{type:"daterange",editable:!1,"range-separator":"-","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":e.$t("views.button.startDate"),"end-placeholder":e.$t("views.button.endDate"),"default-time":["00:00:00","23:59:59"]},model:{value:e.timeValue,callback:function(t){e.timeValue=t},expression:"timeValue"}})],1),e._v(" "),s("div",[s("el-button",{staticClass:"btn light small",on:{click:e.reset}},[e._v(e._s(e.$t("views.button.reset")))]),e._v(" "),s("el-button",{staticClass:"btn light small",on:{click:e.search}},[e._v(e._s(e.$t("views.button.search")))])],1)]),e._v(" "),3===e.roleNum?s("div",{staticClass:"views-table-project"},[s("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:e.openProject}},[e._v(e._s(e.$t("views.projectContent.createdProject")))]),e._v(" "),s("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:e.openFile}},[e._v(e._s(e.$t("views.projectContent.archivedItems")))])],1):e._e(),e._v(" "),s("div",{staticClass:"views-table-content"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:""},on:{"sort-change":e.sortTable,"selection-change":e.handleSelectionChange}},[3===e.roleNum?s("el-table-column",{attrs:{width:"55",type:"selection","header-align":"center",align:"center"}}):e._e(),e._v(" "),s("el-table-column",{attrs:{label:e.$t("views.projectContent.serial"),width:"50",type:"index",index:e.indexMethod,"header-align":"center",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{label:e.$t("views.projectContent.projectName"),"header-align":"center",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",{on:{click:e.indexActive}},[s("router-link",{staticClass:"views-table-link",class:{"views-table-cursor":!0},attrs:{to:{name:"projectDetails",query:{id:t.row.id}}}},[e._v(e._s(t.row.name))])],1)]}}])}),e._v(" "),s("el-table-column",{attrs:{label:e.$t("views.development.status"),"header-align":"center",align:"center",width:"100","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[s("div",{staticStyle:{"text-align":"left"}},["0"==t.row.status?s("i",{staticClass:"iconfont icon-kaifa views-icon-kaifa"}):e._e(),e._v(" "),0==t.row.status?s("span",[e._v(e._s(e.$t("views.status.development")))]):e._e(),e._v(" "),"1"==t.row.status?s("i",{staticClass:"iconfont icon-yiguidang views-icon-yiguidang"}):e._e(),e._v(" "),1==t.row.status?s("span",[e._v("已归档")]):e._e()])]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"created_at",sortable:"custom",label:e.$t("views.projectContent.createdTime"),"header-align":"center",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"describe",label:e.$t("views.projectContent.description"),"show-overflow-tooltip":"","header-align":"center",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{label:e.$t("views.projectContent.documentation"),"header-align":"center",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[s("a",{staticClass:"views-project-file",attrs:{href:t.row.document,target:"_blank"}},[e._v(e._s(t.row.document))])]}}])}),e._v(" "),3===e.roleNum?s("el-table-column",{attrs:{label:e.$t("views.projectContent.operation"),"header-align":"center",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return["0"===t.row.status?s("div",[s("router-link",{staticClass:"views-table-span views-table-margin",attrs:{to:{name:"projectSetting",query:{idSet:t.row.id}}}},[e._v(e._s(e.$t("views.projectContent.setting")))]),e._v(" "),s("span",{staticClass:"views-table-span views-table-margin",attrs:{size:"mini"},on:{click:function(s){return e.fileClick(t.row.id)}}},[e._v(e._s(e.$t("views.projectContent.file")))])],1):s("div",[s("span",[e._v("—— ——")])])]}}],null,!1,1810987832)}):e._e(),e._v(" "),s("div",{attrs:{slot:"empty"},slot:"empty"},[s("div",{staticClass:"views-empty"},[s("span",{staticClass:"views-empty-table"}),e._v(" "),s("p",{staticClass:"views-empty-text"},[e._v(e._s(e.$t("views.table.noData")))])])])],1),e._v(" "),s("div",{staticClass:"views-page"},[s("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.isCount,expression:"isCount"}],attrs:{"page-size":e.per,layout:"prev, pager, next",total:e.total,"current-page":e.currentPage},on:{"current-change":e.projectCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)],1),e._v(" "),s("el-dialog",{attrs:{title:e.$t("views.projectContent.newProject"),visible:e.createDialog,width:"30%","before-close":e.handleClose,top:"30vh"},on:{"update:visible":function(t){e.createDialog=t}}},[s("div",{staticClass:"content"},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":e.labelWidth},nativeOn:{submit:function(e){e.preventDefault()}}},[s("el-form-item",{attrs:{label:e.$t("views.projectContent.projectName"),prop:"name"}},[s("el-input",{attrs:{placeholder:"请输入名称",maxlength:"30"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:e.$t("views.projectContent.description"),prop:"describe"}},[s("el-input",{attrs:{type:"textarea",rows:6,placeholder:e.$t("views.projectContent.enterContent"),maxlength:"200"},model:{value:e.ruleForm.describe,callback:function(t){e.$set(e.ruleForm,"describe",t)},expression:"ruleForm.describe"}})],1)],1)],1),e._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("\n          "+e._s(e.$t("views.button.cancel"))+"\n        ")]),e._v(" "),s("el-button",{attrs:{type:"primary",loading:e.isLoading},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("\n          "+e._s(e.$t("views.button.sure"))+"\n        ")])],1)])],1)])},staticRenderFns:[]},o=s("C7Lr")(r,n,!1,null,null,null);t.default=o.exports}});