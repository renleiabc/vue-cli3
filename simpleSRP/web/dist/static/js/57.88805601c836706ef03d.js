webpackJsonp([57],{lhJT:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("72WN"),n=a("ZoQJ"),i={data:function(){return{linkIndex:"",trainingTask:[],loading:!0,timeValue:"",pickerOptions:Object(n.i)(),obj:{name:"",start_time:"",end_time:"",status:"",page:0,sort:"",engine:""},isCount:!1,per:0,total:0,currentPage:1}},created:function(){this.$store.dispatch("getPracticestatus"),this.$store.dispatch("getPracticeengine"),this.getTraingTaskData(this.obj)},mounted:function(){this.linkIndex=1},methods:{formatSeconds:n.c,trainingIndex:function(t){return t+1},getTraingTaskData:function(t){var e=this;this.$get("/personal/personalpractice",t).then(function(t){if(200===t.code){e.loading=!1,e.trainingTask=t.data.training_task;var a=t.data.total_count,s=t.data.per_page;a<=s?e.isCount=!1:(e.isCount=!0,e.per=s,e.total=a)}else e.$message({message:t.message,type:"error"})})},sortTable:function(t){"descending"===t.order?this.obj.sort="-"+t.prop:this.obj.sort=t.prop,this.taskSearch()},taskReset:function(){var t={name:"",start_time:"",end_time:"",status:"",page:0,engine:""};return this.timeValue="",this.currentPage=1,this.obj=t,this.getTraingTaskData(t),t},taskSearch:function(){0===this.timeValue.length?(this.obj.end_time=0,this.obj.start_time=0):(this.obj.start_time=this.timeValue[0],this.obj.end_time=this.timeValue[1]),this.currentPage=1,this.getTraingTaskData(this.obj)},taskCurrentChange:function(t){0===this.timeValue.length?(this.obj.end_time=0,this.obj.start_time=0):(this.obj.start_time=this.timeValue[0],this.obj.end_time=this.timeValue[1]),this.obj.page=t,this.getTraingTaskData(this.obj)},creatTraining:function(){this.$router.push({name:"perCreateTask"})},taskDelete:function(t){var e=this;this.$confirm(this.$t("views.dialogText.deleteConfirm"),this.$t("views.dialogText.tip"),{confirmButtonText:this.$t("views.button.sure"),cancelButtonText:this.$t("views.button.cancel"),type:"warning",beforeClose:function(a,s,n){if("confirm"===a){s.confirmButtonLoading=!0;var i={practice_id:t};e.$post("/practiceproject/practicedelete",i).then(function(t){if(200===t.code){e.$message({message:t.message,type:"success"});var a=e.taskReset();e.$store.dispatch("getPersonalDetails"),e.getTraingTaskData(a)}else e.$message({message:t.message,type:"error"});s.confirmButtonLoading=!1,n()})}else n()}}).then(function(){}).catch(function(){})},taskStop:function(t){var e=this;this.$confirm(this.$t("views.dialogText.task"),this.$t("views.dialogText.tip"),{confirmButtonText:this.$t("views.button.sure"),cancelButtonText:this.$t("views.button.cancel"),type:"warning",beforeClose:function(a,s,n){if("confirm"===a){s.confirmButtonLoading=!0;var i={practice_id:t};e.$post("/practiceproject/practicestop",i).then(function(t){s.confirmButtonLoading=!1,200===t.code?(e.$message({message:t.message,type:"success"}),e.getTraingTaskData(e.obj)):e.$message({message:t.message,type:"error"}),s.confirmButtonLoading=!1,n()})}else n()}}).catch(function(){})}},components:{ViewsPersonalContent:s.a},computed:{practicestatus:function(){return this.$store.getters.postPracticestatus},practiceengine:function(){return this.$store.getters.postPracticeengine}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"views-project-space"},[a("views-personal-content"),t._v(" "),a("div",{staticClass:"views-input-box"},[a("div",{staticClass:"tab-select"},[a("div",[a("span",{staticClass:"tab-select-title views-text-title"},[t._v("\n          "+t._s(t.$t("views.trainingTask.trainingName"))+"\n        ")]),t._v(" "),a("el-input",{staticClass:"views-input-text",attrs:{placeholder:t.$t("views.projectContent.enterContent")},model:{value:t.obj.name,callback:function(e){t.$set(t.obj,"name",e)},expression:"obj.name"}})],1),t._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[t._v(t._s(t.$t("views.development.status")))]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.obj.status,callback:function(e){t.$set(t.obj,"status",e)},expression:"obj.status"}},t._l(t.practicestatus,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[t._v(t._s(t.$t("views.trainingTask.engineType")))]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.obj.engine,callback:function(e){t.$set(t.obj,"engine",e)},expression:"obj.engine"}},t._l(t.practiceengine,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[t._v(t._s(t.$t("views.table.createTime")))]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange",editable:!1,"range-separator":"-","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":t.$t("views.button.startDate"),"end-placeholder":t.$t("views.button.endDate"),"default-time":["00:00:00","23:59:59"]},model:{value:t.timeValue,callback:function(e){t.timeValue=e},expression:"timeValue"}})],1),t._v(" "),a("div",[a("el-button",{staticClass:"btn light small",on:{click:t.taskReset}},[t._v(t._s(t.$t("views.button.reset")))]),t._v(" "),a("el-button",{staticClass:"btn light small",on:{click:t.taskSearch}},[t._v(t._s(t.$t("views.button.search")))])],1)])]),t._v(" "),a("div",{staticClass:"views-table-btn"},[a("el-button",{staticClass:"view-btn-medium",attrs:{type:"primary"},on:{click:t.creatTraining}},[t._v("\n      "+t._s(t.$t("views.trainingTask.createtask"))+"\n    ")])],1),t._v(" "),a("div",{staticClass:"views-table-content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{width:"100%"},attrs:{data:t.trainingTask,"tooltip-effect":"dark",border:"","show-overflow-tooltip":""},on:{"sort-change":t.sortTable}},[a("el-table-column",{attrs:{label:t.$t("views.projectContent.serial"),width:"50",type:"index",index:t.trainingIndex,"header-align":"center",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("views.trainingTask.trainingName"),"header-align":"center",align:"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"views-table-link",attrs:{to:{name:"perTraningDetails",params:{perTaskId:e.row.id}},tag:"a"}},[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("views.development.status"),width:"120","header-align":"center",align:"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticStyle:{"text-align":"left"}},["0"===e.row.status?a("i",{staticClass:"iconfont icon-warning views-icon-warning"}):t._e(),t._v(" "),"0"===e.row.status?a("span",[t._v(t._s(t.$t("views.status.error")))]):t._e(),t._v(" "),"1"===e.row.status?a("i",{staticClass:"iconfont icon-yunhangzhong views-icon-yunhangzhong"}):t._e(),t._v(" "),"1"===e.row.status?a("span",[t._v(t._s(t.$t("views.status.running")))]):t._e(),t._v(" "),"2"===e.row.status?a("i",{staticClass:"iconfont icon-warning views-icon-chuangjian"}):t._e(),t._v(" "),"2"===e.row.status?a("span",[t._v("创建中")]):t._e(),t._v(" "),"3"===e.row.status?a("i",{staticClass:"iconfont icon-chenggong views-icon-success"}):t._e(),t._v(" "),"3"===e.row.status?a("span",[t._v("运行成功")]):t._e(),t._v(" "),"4"===e.row.status?a("i",{staticClass:"iconfont icon-stop views-icon-stop"}):t._e(),t._v(" "),"4"===e.row.status?a("span",[t._v(t._s(t.$t("views.status.stop")))]):t._e()])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"engine",label:t.$t("views.trainingTask.engineType"),"header-align":"center",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"created_at",sortable:"custom",label:t.$t("views.projectContent.createdTime"),"header-align":"center",align:"center","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("views.trainingTask.runningTime"),"header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t.formatSeconds(e.row.used_time))+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"describe",label:t.$t("views.development.remarks"),"show-overflow-tooltip":"","header-align":"center",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("views.projectContent.operation"),"header-align":"center",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"===e.row.status?a("span",{staticClass:"views-table-span views-table-margin",attrs:{size:"mini"},on:{click:function(a){return t.taskStop(e.row.id)}}},[t._v(t._s(t.$t("views.trainingTask.stop")))]):t._e(),t._v(" "),a("span",{staticClass:"views-table-span views-table-margin del",attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.taskDelete(e.row.id)}}},[t._v(t._s(t.$t("views.projectContent.delete")))])]}}])}),t._v(" "),a("div",{attrs:{slot:"empty"},slot:"empty"},[a("div",{staticClass:"views-empty"},[a("span",{staticClass:"views-empty-table"}),t._v(" "),a("p",{staticClass:"views-empty-text"},[t._v(t._s(t.$t("views.table.noData")))])])])],1),t._v(" "),a("div",{staticClass:"views-page"},[t.isCount?a("el-pagination",{attrs:{"page-size":t.per,layout:"prev, pager, next",total:t.total,"current-page":t.currentPage},on:{"current-change":t.taskCurrentChange,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}}):t._e()],1)],1)],1)},staticRenderFns:[]},r=a("C7Lr")(i,o,!1,null,null,null);e.default=r.exports}});