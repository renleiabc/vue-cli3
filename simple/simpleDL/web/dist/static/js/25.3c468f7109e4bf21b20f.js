webpackJsonp([25],{"6hsl":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("IHPB"),i=a.n(s),n=a("aA9S"),l=a.n(n),o={name:"systemLog",data:function(){return{linTabData:"",linUrl:"",pageSize:10,option_type:[],pickerOptions:{shortcuts:[{text:this.$t("views.systemManagement.recentOneWeek"),onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:this.$t("views.systemManagement.recentOneMonth"),onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:this.$t("views.systemManagement.recentThreeMonth"),onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},tableData:{msg:[],url:"/system/systemlog",loading:!0,Pagination:{page:1,total_count:5},sel:{information:"",full_date:"",start_time:"",end_time:"",name:"",type:""}}}},methods:{getActiveTab:function(t){this.linTabData=t,this.linUrl=this[t].url,this.initMsg()},clearSearch:function(t){for(var e in this[t].sel)this[t].sel[e]="";void 0!==this[t].Pagination&&(this[t].Pagination.page=1),this.getActiveTab(t)},doSearch:function(t){void 0!==this[t].Pagination&&(this[t].Pagination.page=1),this.getActiveTab(t)},changePage:function(t){this.getActiveTab(t)},exportLog:function(){var t=window.Simple.php+"/v1/system/systemlogexport?access-token="+JSON.parse(sessionStorage.getItem("userinfo")).access_token+"&type="+this.tableData.sel.type+"&information="+this.tableData.sel.information+"&name="+this.tableData.sel.name+"&start_time="+this.tableData.sel.start_time+"&end_time="+this.tableData.sel.end_time,e=document.createElement("a");console.log(t),e.href=t,document.body.appendChild(e),setTimeout(function(t){e.click(),document.body.removeChild(e)},5)},initMsg:function(){var t=this;this[this.linTabData].loading=!0;var e={};void 0!==this[this.linTabData].Pagination&&(e=l()({},this[this.linTabData].Pagination,{count:this.pageSize})),void 0!==this[this.linTabData].sel&&(this[this.linTabData].sel.full_date&&2===this[this.linTabData].sel.full_date.length?(this.tableData.sel.start_time=this.tableData.sel.full_date[0]+" 00:00:00",this.tableData.sel.end_time=this.tableData.sel.full_date[1]+" 23:59:59"):(this[this.linTabData].sel.start_time="",this[this.linTabData].sel.end_time=""),e=l()({},e,this[this.linTabData].sel)),this.$axios.get(this[this.linTabData].url,{params:e}).then(function(e){var a=e.data.data.system_log;t[t.linTabData].msg=[].concat(i()(a)),void 0!==t[t.linTabData].Pagination&&(t[t.linTabData].Pagination.total_count=e.data.data.total_count),t.pageSize=e.data.data.per_page||10,t[t.linTabData].loading=!1})}},created:function(){var t=this;this.getActiveTab("tableData"),this.$axios.get("/system/systemlogstatus").then(function(e){t.option_type=[].concat(i()(e.data.data.type))})}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"views-system-management-system-log"},[a("div",{staticClass:"tab-select"},[a("div",[a("span",{staticClass:"tab-select-title"},[t._v(t._s(t.$t("views.systemManagement.optionContent")))]),t._v(" "),a("el-input",{attrs:{placeholder:t.$t("views.systemManagement.enter")},model:{value:t.tableData.sel.information,callback:function(e){t.$set(t.tableData.sel,"information",e)},expression:"tableData.sel.information"}})],1),t._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[t._v(t._s(t.$t("views.systemManagement.optionData")))]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","value-format":"yyyy-MM-dd","range-separator":"-","start-placeholder":t.$t("views.systemManagement.beginTime"),"end-placeholder":t.$t("views.systemManagement.endTime"),"picker-options":t.pickerOptions},model:{value:t.tableData.sel.full_date,callback:function(e){t.$set(t.tableData.sel,"full_date",e)},expression:"tableData.sel.full_date"}})],1),t._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[t._v(t._s(t.$t("views.systemManagement.userName")))]),t._v(" "),a("el-input",{attrs:{placeholder:t.$t("views.systemManagement.enter")},model:{value:t.tableData.sel.name,callback:function(e){t.$set(t.tableData.sel,"name",e)},expression:"tableData.sel.name"}})],1),t._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[t._v(t._s(t.$t("views.systemManagement.optionType")))]),t._v(" "),a("el-select",{attrs:{placeholder:t.$t("views.systemManagement.chose")},model:{value:t.tableData.sel.type,callback:function(e){t.$set(t.tableData.sel,"type",e)},expression:"tableData.sel.type"}},t._l(t.option_type,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),a("div",[a("el-button",{staticClass:"btn light small",on:{click:function(e){return t.clearSearch("tableData")}}},[t._v(t._s(t.$t("views.systemManagement.reset")))]),t._v(" "),a("el-button",{staticClass:"btn light small",on:{click:function(e){return t.doSearch("tableData")}}},[t._v(t._s(t.$t("views.systemManagement.select")))])],1)]),t._v(" "),a("div",[a("el-button",{staticClass:"btn dark mid",on:{click:t.exportLog}},[t._v(t._s(t.$t("views.systemManagement.printReport")))])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableData.loading,expression:"tableData.loading"}],staticClass:"tab-content",attrs:{data:t.tableData.msg,border:""}},[a("el-table-column",{attrs:{type:"index",align:"center",label:t.$t("views.systemManagement.serialNumber"),width:"60"}}),t._v(" "),a("el-table-column",{attrs:{prop:"information","show-overflow-tooltip":"",label:t.$t("views.systemManagement.optionContent")}}),t._v(" "),a("el-table-column",{attrs:{prop:"type","show-overflow-tooltip":"",label:t.$t("views.systemManagement.optionType")}}),t._v(" "),a("el-table-column",{attrs:{prop:"ip",width:"180",align:"center","show-overflow-tooltip":"",label:t.$t("views.systemManagement.ip")}}),t._v(" "),a("el-table-column",{attrs:{prop:"created_at",align:"center",width:"200","show-overflow-tooltip":"",label:t.$t("views.systemManagement.optionData"),sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"username",width:"200","show-overflow-tooltip":"",label:t.$t("views.systemManagement.userName")}}),t._v(" "),a("div",{attrs:{slot:"empty"},slot:"empty"},[a("div",{staticClass:"views-empty"},[a("span",{staticClass:"views-empty-table"}),t._v(" "),a("p",{staticClass:"views-empty-text"},[t._v(t._s(t.$t("views.table.noData")))])])])],1),t._v(" "),a("el-pagination",{staticClass:"tab-page",attrs:{layout:"prev, pager, next","page-size":t.pageSize,"current-page":t.tableData.Pagination.page,total:t.tableData.Pagination.total_count},on:{"update:currentPage":function(e){return t.$set(t.tableData.Pagination,"page",e)},"update:current-page":function(e){return t.$set(t.tableData.Pagination,"page",e)},"current-change":function(e){return t.changePage("tableData")}}})],1)},staticRenderFns:[]},c=a("C7Lr")(o,r,!1,null,null,null);e.default=c.exports}});