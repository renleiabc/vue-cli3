webpackJsonp([25],{hnOx:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("IHPB"),n=a.n(i),s=a("aA9S"),l=a.n(s),o={name:"recordList",data:function(){return{linTabData:"",linUrl:"",pageSize:10,node_status:[],pickerOptions:{shortcuts:[{text:this.$t("views.clusterMonitoring.recentOneWeek"),onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:this.$t("views.clusterMonitoring.recentOneMonth"),onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:this.$t("views.clusterMonitoring.recentThreeMonth"),onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},tableData1:{msg:[],url:"/cluster/nodelist",loading:!0,Pagination:{page:1,total_count:5},sel:{name:"",type:"",full_time:"",start_time:"",end_time:"",sort:"-created_at"}}}},methods:{getActiveTab:function(t){this.linTabData=t,this.linUrl=this[t].url,this.initMsg()},addSort:function(t,e){console.log(t),"descending"===t.order?this.tableData1.sel.sort="-"+t.prop:this.tableData1.sel.sort=t.prop,this.getActiveTab(e)},clearSearch:function(t){for(var e in this[t].sel)this[t].sel[e]="";void 0!==this[t].Pagination&&(this[t].Pagination.page=1),this.getActiveTab(t)},doSearch:function(t){void 0!==this[t].Pagination&&(this[t].Pagination.page=1),this.getActiveTab(t)},changePage:function(t){this.getActiveTab(t)},initMsg:function(){var t=this;this[this.linTabData].loading=!0;var e={};void 0!==this[this.linTabData].Pagination&&(e=l()({},this[this.linTabData].Pagination,{count:this.pageSize})),void 0!==this[this.linTabData].sel&&(""===this[this.linTabData].sel.full_time||null===this[this.linTabData].sel.full_time?(this[this.linTabData].sel.start_time="",this[this.linTabData].sel.end_time=""):(this[this.linTabData].sel.start_time=this[this.linTabData].sel.full_time[0]+" 00:00:00",this[this.linTabData].sel.end_time=this[this.linTabData].sel.full_time[1]+" 23:59:59"),e=l()({},e,this[this.linTabData].sel)),this.$axios.get(this[this.linTabData].url,{params:e}).then(function(e){var a=e.data.data.node_list;t[t.linTabData].msg=[].concat(n()(a)),void 0!==t[t.linTabData].Pagination&&(t[t.linTabData].Pagination.total_count=e.data.data.total_count),t.pageSize=e.data.data.per_page||10,t[t.linTabData].loading=!1})}},created:function(){var t=this;this.$get("/cluster/returnstatus").then(function(e){t.node_status=e.data}),this.getActiveTab("tableData1")}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"views-cluster-monitoring-node-control"},[a("div",{staticClass:"tab-select"},[a("div",[a("span",{staticClass:"tab-select-title"},[t._v(t._s(t.$t("views.systemMonitoring.name")))]),t._v(" "),a("el-input",{attrs:{placeholder:t.$t("views.systemMonitoring.enter")},model:{value:t.tableData1.sel.name,callback:function(e){t.$set(t.tableData1.sel,"name",e)},expression:"tableData1.sel.name"}})],1),t._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[t._v(t._s(t.$t("views.systemMonitoring.allocationTime")))]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange",align:"right","value-format":"yyyy-MM-dd","unlink-panels":"","range-separator":"-","start-placeholder":t.$t("views.systemMonitoring.beginTime"),"end-placeholder":t.$t("views.systemMonitoring.endTime"),"picker-options":t.pickerOptions},model:{value:t.tableData1.sel.full_time,callback:function(e){t.$set(t.tableData1.sel,"full_time",e)},expression:"tableData1.sel.full_time"}})],1),t._v(" "),a("div",[a("el-button",{staticClass:"btn light small",on:{click:function(e){return t.doSearch("tableData1")}}},[t._v(t._s(t.$t("views.systemMonitoring.search")))]),t._v(" "),a("el-button",{staticClass:"btn light small",on:{click:function(e){return t.clearSearch("tableData1")}}},[t._v(t._s(t.$t("views.systemMonitoring.export")))])],1)]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableData1.loading,expression:"tableData1.loading"}],staticClass:"tab-content",attrs:{data:t.tableData1.msg,border:""},on:{"sort-change":function(e){return t.addSort(e,"tableData1")}}},[a("el-table-column",{attrs:{type:"index",label:t.$t("views.systemMonitoring.serialNumber"),width:"80",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("views.systemMonitoring.name"),sortable:"",prop:"name","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return a("router-link",{staticClass:"link",attrs:{to:1==e.row.type?"":{name:"nodeControlDetail",query:{nodeId:e.row.ip}}}},[t._v("\n        "+t._s(e.row.name)+"\n      ")])}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"ip","show-overflow-tooltip":"",sortable:"",align:"center",label:t.$t("views.systemMonitoring.CPU")}}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("views.systemMonitoring.RAM"),sortable:"",align:"center","show-overflow-tooltip":"",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"created_at",sortable:"","show-overflow-tooltip":"",align:"center",label:t.$t("views.systemMonitoring.GPU")}}),t._v(" "),a("el-table-column",{attrs:{prop:"created_at",sortable:"","show-overflow-tooltip":"",align:"center",label:t.$t("views.systemMonitoring.allocationTime")}}),t._v(" "),a("div",{attrs:{slot:"empty"},slot:"empty"},[a("div",{staticClass:"views-empty"},[a("span",{staticClass:"views-empty-table"}),t._v(" "),a("p",{staticClass:"views-empty-text"},[t._v(t._s(t.$t("views.table.noData")))])])])],1),t._v(" "),a("el-pagination",{staticClass:"tab-page",attrs:{layout:"prev, pager, next","page-size":t.pageSize,"current-page":t.tableData1.Pagination.page,total:t.tableData1.Pagination.total_count},on:{"update:currentPage":function(e){return t.$set(t.tableData1.Pagination,"page",e)},"update:current-page":function(e){return t.$set(t.tableData1.Pagination,"page",e)},"current-change":function(e){return t.changePage("tableData1")}}})],1)},staticRenderFns:[]},c=a("C7Lr")(o,r,!1,null,null,null);e.default=c.exports}});