webpackJsonp([26],{It3q:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("IHPB"),i=a.n(n),o=a("aA9S"),s=a.n(o),r={name:"projectList",data:function(){return{linTabData:"",linUrl:"",pageSize:10,node_status:[],pickerOptions:{shortcuts:[{text:this.$t("views.clusterMonitoring.recentOneWeek"),onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:this.$t("views.clusterMonitoring.recentOneMonth"),onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:this.$t("views.clusterMonitoring.recentThreeMonth"),onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},tableData1:{msg:[],url:"/system/getprojectlist",loading:!0,Pagination:{page:1,total_count:5},sel:{name:"",type:"",full_time:"",start_time:"",end_time:"",sort:"-created_at"}}}},methods:{clearNamespace:function(t){var e=this;this.$confirm("是否清理分配的所有资源?","资源清理",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$post("/system/namespacedeleteall",{namespace_name:t.namespace_name,project_id:t.project_id}).then(function(t){200===t.code?(e.$message({type:"success",message:t.message}),e.getActiveTab("tableData1")):e.$message({type:"error",message:t.message})})}).catch(function(){})},getActiveTab:function(t){this.linTabData=t,this.linUrl=this[t].url,this.initMsg()},addSort:function(t,e){"descending"===t.order?this.tableData1.sel.sort="-"+t.prop:this.tableData1.sel.sort=t.prop,this.getActiveTab(e)},clearSearch:function(t){for(var e in this[t].sel)this[t].sel[e]="";void 0!==this[t].Pagination&&(this[t].Pagination.page=1),this.getActiveTab(t)},doSearch:function(t){void 0!==this[t].Pagination&&(this[t].Pagination.page=1),this.getActiveTab(t)},changePage:function(t){this.getActiveTab(t)},initMsg:function(){var t=this;this[this.linTabData].loading=!0;var e={};void 0!==this[this.linTabData].Pagination&&(e=s()({},this[this.linTabData].Pagination,{count:this.pageSize})),this.$axios.get(this[this.linTabData].url,{params:e}).then(function(e){var a=e.data.data.list;t[t.linTabData].msg=[].concat(i()(a)),void 0!==t[t.linTabData].Pagination&&(t[t.linTabData].Pagination.total_count=e.data.data.total_count),t.pageSize=e.data.data.per_page||10,t[t.linTabData].loading=!1})}},created:function(){var t=this;this.$get("/cluster/returnstatus").then(function(e){t.node_status=e.data}),this.getActiveTab("tableData1")}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"views-cluster-monitoring-node-control"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableData1.loading,expression:"tableData1.loading"}],staticClass:"tab-content",attrs:{data:t.tableData1.msg,border:""},on:{"sort-change":function(e){return t.addSort(e,"tableData1")}}},[a("el-table-column",{attrs:{type:"index",label:t.$t("views.clusterMonitoring.serialNumber"),width:"80",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"项目名称",prop:"name","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"cpu","show-overflow-tooltip":"",align:"center",label:"CPU"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.project_cpu_use)+"核/"+t._s((e.row.project_cpu_use/e.row.cpu).toFixed(2))+"%\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"memory","show-overflow-tooltip":"",align:"center",label:"内存"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.project_memory_use)+"G/"+t._s((e.row.project_memory_use/e.row.memory).toFixed(2))+"%\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"gpu","show-overflow-tooltip":"",align:"center",label:"GPU"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.project_gpu_use)+"个/"+t._s((e.row.project_gpu_use/e.row.gpu).toFixed(2))+"%\n      ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"created_at",sortable:"","show-overflow-tooltip":"",align:"center",label:"分配时间"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("button",{staticClass:"btn",on:{click:function(a){return t.clearNamespace(e.row)}}},[t._v("清理")])]}}])}),t._v(" "),a("div",{attrs:{slot:"empty"},slot:"empty"},[a("div",{staticClass:"views-empty"},[a("span",{staticClass:"views-empty-table"}),t._v(" "),a("p",{staticClass:"views-empty-text"},[t._v(t._s(t.$t("views.table.noData")))])])])],1),t._v(" "),a("el-pagination",{staticClass:"tab-page",attrs:{layout:"prev, pager, next","page-size":t.pageSize,"current-page":t.tableData1.Pagination.page,total:t.tableData1.Pagination.total_count},on:{"update:currentPage":function(e){return t.$set(t.tableData1.Pagination,"page",e)},"update:current-page":function(e){return t.$set(t.tableData1.Pagination,"page",e)},"current-change":function(e){return t.changePage("tableData1")}}})],1)},staticRenderFns:[]},c=a("C7Lr")(r,l,!1,null,null,null);e.default=c.exports}});