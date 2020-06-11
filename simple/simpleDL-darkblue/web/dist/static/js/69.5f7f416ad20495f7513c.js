webpackJsonp([69],{rg0j:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("IHPB"),i=s.n(a),o=s("4YfN"),l=s.n(o),n={name:"nodeControlDetail",data:function(){return{cname:"charts",tableData1:{msg:[],loading:!0},tableData2:{msg:[],loading:!0},base_info:{},cpu:{option:{},loading:!0,data:""},memory:{option:{},loading:!0,data:""},pods:{option:{},loading:!0,data:""},gpu:{gpu_number:{},gpu_ave:{},eme_ave:{},gpu_detail:{statistics:{},list:[]},name:""},show:!1}},created:function(){var t=this;this.$parent.nodeId=this.$route.query.nodeId,this.$get("/cluster/computerinfo",{instance:this.$route.query.nodeId}).then(function(e){t.base_info=l()({},e.data.nodeInfo),t.tableData1.msg=[].concat(i()(e.data.conditions||[])),t.tableData1.loading=!1,t.tableData2.msg=e.data.pod_list||[],t.tableData2.loading=!1,t.gpu={gpu_number:{all:12,use:6},gpu_ave:{all:100,use:0,max:0,min:0},eme_ave:{all:100,use:0,max:0,min:0},gpu_detail:{statistics:{full:0,some:0,free:0,unknow:0},list:[{gpu_id:1,gpu_use:20,gpu_mem:10}]}},t.gpu.gpu_ave.max=((e.data.node_gpu.node_gpu_cores_precent||0)-0).toFixed(2),t.gpu.eme_ave.max=((e.data.node_gpu.node_gpu_mem_rate||0)-0).toFixed(2),t.gpu.eme_ave.use=e.data.node_gpu_use,t.gpu.gpu_ave.use=e.data.node_gpu_use,t.gpu.gpu_number.all=e.data.gpu_mem_rate.length,t.gpu.gpu_number.use=e.data.node_gpu_use,t.gpu.gpu_detail.list=e.data.gpu_mem_rate,t.gpu.name=e.data.node_gpu.gpu_name,e.data.gpu_mem_rate.length>0&&e.data.gpu_mem_rate.map(function(e){var s=e.values[0][1]-0>=80||e.metric.gpu_cores_precent_val[1]-0>=80,a=(e.values[0][1]-0).toFixed(2)-(e.metric.gpu_cores_precent_val[1]-0).toFixed(2);console.log(s,a),0===a?t.gpu.gpu_detail.statistics.free+=1:e.values[0][1]-0<80&&e.values[0][1]-0>0?t.gpu.gpu_detail.statistics.some+=1:s?t.gpu.gpu_detail.statistics.full+=1:t.gpu.gpu_detail.statistics.unknow+=1}),t.cpu.data=e.data.allocatedResources.cpuCapacity/1e3,t.cpu.loading=!1,t.cpu.option={tooltip:{show:!0,formatter:"{b} : {c} ({d}%)"},legend:{orient:"vertical",x:"left",data:[t.$t("views.clusterMonitoring.limitValue"),t.$t("views.clusterMonitoring.requestValue")]},series:[{type:"pie",clockWise:!1,radius:["70%","90%"],label:{show:!1},data:[{value:e.data.allocatedResources.cpuLimits/1e3,name:t.$t("views.clusterMonitoring.limitValue"),itemStyle:{color:"#417dd0"}},{value:t.cpu.data-e.data.allocatedResources.cpuLimits/1e3,tooltip:{show:!1},itemStyle:{color:"rgba(0,0,0,0)"}}]},{type:"pie",clockWise:!1,radius:["50%","70%"],label:{show:!1},data:[{value:e.data.allocatedResources.cpuRequests/1e3,name:t.$t("views.clusterMonitoring.requestValue"),itemStyle:{color:"#2ad7ae"}},{value:t.cpu.data-e.data.allocatedResources.cpuRequests/1e3,tooltip:{show:!1},itemStyle:{color:"rgba(0,0,0,0)"}}]}]},t.memory.data=(e.data.allocatedResources.memoryCapacity/Math.pow(1024,3)).toFixed(2);var s=(e.data.allocatedResources.memoryLimits/Math.pow(1024,3)).toFixed(2),a=(e.data.allocatedResources.memoryRequests/Math.pow(1024,3)).toFixed(2);t.memory.loading=!1,t.memory.option={tooltip:{show:!0,formatter:"{b} : {c}Gi ({d}%)"},legend:{orient:"vertical",left:"left",itemGap:3,data:[t.$t("views.clusterMonitoring.limitValue"),t.$t("views.clusterMonitoring.requestValue")]},series:[{type:"pie",clockWise:!1,radius:["70%","90%"],label:{show:!1},data:[{value:s,name:t.$t("views.clusterMonitoring.limitValue"),itemStyle:{color:"#417dd0"}},{value:t.memory.data-s,tooltip:{show:!1},itemStyle:{color:"rgba(0,0,0,0)"}}]},{type:"pie",clockWise:!1,radius:["50%","70%"],label:{show:!1},data:[{value:a,name:t.$t("views.clusterMonitoring.requestValue"),itemStyle:{color:"#2ad7ae"}},{value:t.memory.data-a,tooltip:{show:!1},itemStyle:{color:"rgba(0,0,0,0)"}}]}]},t.pods.data=e.data.allocatedResources.podCapacity,t.pods.loading=!1,t.pods.option={tooltip:{show:!0,formatter:"{b} : {c} ({d}%)"},color:["#f7a923","#f2e0c2"],series:[{type:"pie",radius:["70%","90%"],label:{show:!1},data:[{name:t.$t("views.clusterMonitoring.assigned"),value:e.data.allocatedResources.allocatedPods},{tooltip:{show:!1},hoverAnimation:!1,value:t.pods.data-e.data.allocatedResources.allocatedPods}]}]}})}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"views-cluster-monitoring-node-control-detail"},[s("ul",[s("li",[s("div",[s("div",[t._v(t._s(t.$t("views.clusterMonitoring.hostName")))]),t._v(" "),s("div",[t._v(t._s(t.base_info.host_name))])]),t._v(" "),s("div",[s("div",[t._v(t._s(t.$t("views.clusterMonitoring.creationTime")))]),t._v(" "),s("div",[t._v(t._s(t.base_info.create_time))])])]),t._v(" "),s("li",[s("div",[s("div",[t._v(t._s(t.$t("views.clusterMonitoring.ip")))]),t._v(" "),s("div",[t._v("\n          "+t._s(t.base_info.ip)+"\n        ")])]),t._v(" "),s("div",[s("div",[t._v(t._s(t.$t("views.clusterMonitoring.dockerVersion")))]),t._v(" "),s("div",[t._v(t._s(t.base_info.containerRuntimeVersion))])])]),t._v(" "),s("li",[s("div",[s("div",[t._v(t._s(t.$t("views.clusterMonitoring.kernelVersion")))]),t._v(" "),s("div",[t._v(t._s(t.base_info.kernelVersion))])]),t._v(" "),s("div",[s("div",[t._v(t._s(t.$t("views.clusterMonitoring.operatingSystem")))]),t._v(" "),s("div",[t._v(t._s(t.base_info.operatingSystem))])])])]),t._v(" "),s("div",{staticClass:"item"},[s("p",{staticClass:"tit"},[t._v(t._s(t.$t("views.clusterMonitoring.allocatedResources")))]),t._v(" "),s("div",{staticClass:"chart-content"},[s("div",{staticClass:"chart-item"},[s("sedu-echarts",{attrs:{domId:"a",cname:t.cname,myStyle:"width:320px;height220px;",option:t.cpu.option}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.cpu.loading,expression:"!cpu.loading"}],staticClass:"msg"},[s("p",[t._v(t._s(t.$t("views.clusterMonitoring.totalAmount")))]),t._v(" "),s("p",[t._v(t._s(t.cpu.data))])]),t._v(" "),s("p",[t._v("CPU allocation(cores)")])],1),t._v(" "),s("div",{staticClass:"chart-item"},[s("sedu-echarts",{attrs:{domId:"b",cname:t.cname,myStyle:"width:320px;height220px;",option:t.memory.option}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.memory.loading,expression:"!memory.loading"}],staticClass:"msg"},[s("p",[t._v(t._s(t.$t("views.clusterMonitoring.totalAmount")))]),t._v(" "),s("p",[t._v(t._s(t.memory.data)+"Gi")])]),t._v(" "),s("p",[t._v("Memory allocation(bytes)")])],1),t._v(" "),s("div",{staticClass:"chart-item"},[s("sedu-echarts",{attrs:{domId:"c",cname:t.cname,myStyle:"width:320px;height220px;",option:t.pods.option}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.pods.loading,expression:"!pods.loading"}],staticClass:"msg"},[s("p",[t._v(t._s(t.$t("views.clusterMonitoring.totalAmount")))]),t._v(" "),s("p",[t._v(t._s(t.pods.data))])]),t._v(" "),s("p",[t._v("Pods allocation")])],1)])]),t._v(" "),s("div",{staticClass:"item"},[s("p",{staticClass:"tit"},[t._v(t._s(t.$t("views.clusterMonitoring.statusQuo")))]),t._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableData1.loading,expression:"tableData1.loading"}],staticClass:"tab-content",attrs:{data:t.tableData1.msg,border:""}},[s("el-table-column",{attrs:{prop:"type",width:"150","show-overflow-tooltip":"",align:"center",label:t.$t("views.clusterMonitoring.type")}}),t._v(" "),s("el-table-column",{attrs:{label:t.$t("views.clusterMonitoring.status"),"show-overflow-tooltip":"",width:"60",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.status)+"\n        ")]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"lastProbeTime",width:"180","show-overflow-tooltip":"",align:"center",label:t.$t("views.clusterMonitoring.recentHeartbeat")},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.lastProbeTime?e.row.lastProbeTime:"1秒")+"\n        ")]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"lastTransitionTime",width:"180","show-overflow-tooltip":"",align:"center",label:t.$t("views.clusterMonitoring.recentChanges")}}),t._v(" "),s("el-table-column",{attrs:{prop:"reason","show-overflow-tooltip":"",label:t.$t("views.clusterMonitoring.reason")}}),t._v(" "),s("el-table-column",{attrs:{prop:"message","show-overflow-tooltip":"",label:t.$t("views.clusterMonitoring.message")}}),t._v(" "),s("div",{attrs:{slot:"empty"},slot:"empty"},[s("div",{staticClass:"views-empty"},[s("span",{staticClass:"views-empty-table"}),t._v(" "),s("p",{staticClass:"views-empty-text"},[t._v(t._s(t.$t("views.table.noData")))])])])],1)],1),t._v(" "),s("div",{staticClass:"item else"},[s("p",{staticClass:"tit"},[t._v(t._s(t.$t("views.clusterMonitoring.nodeControlDetail.p1")))]),t._v(" "),s("div",{staticClass:"gpu-content"},[s("div",{staticClass:"gpu-top"},[s("div",{staticClass:"gpu-top-item"},[s("div",{staticClass:"top"},[s("span",{staticClass:"name"},[t._v("GPU NUMBER："+t._s(t.gpu.gpu_number.all))]),t._v(" "),s("div",{staticClass:"legend"},[s("div",{staticClass:"legend-item"},[t._v(t._s(t.$t("views.clusterMonitoring.use")))]),t._v(" "),s("div",{staticClass:"legend-item"},[t._v(t._s(t.$t("views.clusterMonitoring.free")))])])]),t._v(" "),s("div",{staticClass:"center"},[s("p",{style:{width:t.gpu.gpu_number.use/t.gpu.gpu_number.all*100+"%"}})]),t._v(" "),s("div",{staticClass:"bottom"},[t.gpu.name?s("span",[t._v(t._s(t.gpu.name)+":"+t._s(t.gpu.gpu_number.all))]):s("span",[t._v(t._s(t.$t("views.clusterMonitoring.noGPU")))])])]),t._v(" "),s("div",{staticClass:"gpu-top-item"},[s("div",{staticClass:"top"},[s("span",{staticClass:"name"},[t._v("GPU AVE UTILIZATION")]),t._v(" "),s("div",{staticClass:"legend"},[s("div",{staticClass:"legend-item"},[t._v(t._s(t.$t("views.clusterMonitoring.use")))]),t._v(" "),s("div",{staticClass:"legend-item"},[t._v(t._s(t.$t("views.clusterMonitoring.free")))])])]),t._v(" "),s("div",{staticClass:"center"},[s("p",{style:{width:t.gpu.gpu_ave.max/t.gpu.gpu_ave.all*100+"%"}})]),t._v(" "),s("div",{staticClass:"bottom"},[s("span",[t._v("MAX:"+t._s(t.gpu.gpu_ave.max)+"%")]),t._v(" "),s("span",[t._v("MIN:"+t._s(t.gpu.gpu_ave.min)+"%")]),t._v(" "),s("span",[t._v("USE:"+t._s(t.gpu.gpu_ave.use))])])]),t._v(" "),s("div",{staticClass:"gpu-top-item"},[s("div",{staticClass:"top"},[s("span",{staticClass:"name"},[t._v("MEM AVE UTILIZATION")]),t._v(" "),s("div",{staticClass:"legend"},[s("div",{staticClass:"legend-item"},[t._v(t._s(t.$t("views.clusterMonitoring.use")))]),t._v(" "),s("div",{staticClass:"legend-item"},[t._v(t._s(t.$t("views.clusterMonitoring.free")))])])]),t._v(" "),s("div",{staticClass:"center"},[s("p",{style:{width:t.gpu.eme_ave.max/t.gpu.eme_ave.all*100+"%"}})]),t._v(" "),s("div",{staticClass:"bottom"},[s("span",[t._v("MAX:"+t._s(t.gpu.eme_ave.max)+"%")]),t._v(" "),s("span",[t._v("MIN:"+t._s(t.gpu.eme_ave.min)+"%")]),t._v(" "),s("span",[t._v("USE:"+t._s(t.gpu.eme_ave.use))])])])]),t._v(" "),s("div",{staticClass:"gpu-bottom"},[s("div",{staticClass:"legend"},[s("div",{staticClass:"legend-item"},[t._v(t._s(t.$t("views.clusterMonitoring.fullLoad"))+"："+t._s(t.gpu.gpu_detail.statistics.full))]),t._v(" "),s("div",{staticClass:"legend-item"},[t._v(t._s(t.$t("views.clusterMonitoring.section"))+"："+t._s(t.gpu.gpu_detail.statistics.some))]),t._v(" "),s("div",{staticClass:"legend-item"},[t._v(t._s(t.$t("views.clusterMonitoring.free"))+"："+t._s(t.gpu.gpu_detail.statistics.free))]),t._v(" "),s("div",{staticClass:"legend-item"},[t._v(t._s(t.$t("views.clusterMonitoring.unknown"))+"："+t._s(t.gpu.gpu_detail.statistics.unknow))])]),t._v(" "),t.gpu.gpu_detail.list.length>0?s("div",{staticClass:"watch"},t._l(t.gpu.gpu_detail.list,function(e,a){return s("div",{key:a,staticClass:"watch-item",class:(e.values[0][1]-0).toFixed(2)-(e.metric.gpu_cores_precent_val[1]-0).toFixed(2)==0?"free":e.values[0][1]>=80||e.metric.gpu_cores_precent_val[1]>=80?"full":"some"},[s("router-link",{attrs:{to:{name:"gpuDetail",query:{nodeId:t.$route.query.nodeId,uuid:e.metric.uuid,gpuId:e.metric.minor_number}}}},[s("p",{staticClass:"address"},[t._v(t._s(t.$route.query.nodeId))]),t._v(" "),s("p",[t._v("ID:GPU_"+t._s(e.metric.minor_number))]),t._v(" "),s("p",[t._v("GPU:"+t._s((e.metric.gpu_cores_precent_val[1]-0).toFixed(2))+"%")]),t._v(" "),s("p",[t._v("MEM:"+t._s((e.values[0][1]-0).toFixed(2))+"%")])])],1)}),0):s("div",{staticStyle:{"padding-bottom":"10px"}},[t._v("\n          "+t._s(t.$t("views.clusterMonitoring.noGPU"))+"\n        ")])])])]),t._v(" "),s("div",{staticClass:"item"},[s("p",{staticClass:"tit"},[t._v(t._s(t.$t("views.clusterMonitoring.containerGroup")))]),t._v(" "),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableData2.loading,expression:"tableData2.loading"}],staticClass:"tab-content",attrs:{height:"300","default-sort":{prop:"objectMeta.pod_data_time",order:"descending"},data:t.tableData2.msg,border:""}},[s("el-table-column",{attrs:{prop:"objectMeta.name","show-overflow-tooltip":"",label:t.$t("views.clusterMonitoring.name")}}),t._v(" "),s("el-table-column",{attrs:{prop:"nodeName","show-overflow-tooltip":"",label:t.$t("views.clusterMonitoring.node")}}),t._v(" "),s("el-table-column",{attrs:{prop:"podStatus.status",width:"100","show-overflow-tooltip":"",align:"center",label:t.$t("views.clusterMonitoring.status")}}),t._v(" "),s("el-table-column",{attrs:{prop:"restartCount",width:"100","show-overflow-tooltip":"",align:"center",label:t.$t("views.clusterMonitoring.numberOfRestarts")}}),t._v(" "),s("el-table-column",{attrs:{prop:"objectMeta.pod_data_time",width:"200","show-overflow-tooltip":"",align:"center",label:t.$t("views.clusterMonitoring.created")},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.objectMeta.creationTimestamp)+"\n        ")]}}])}),t._v(" "),s("div",{attrs:{slot:"empty"},slot:"empty"},[s("div",{staticClass:"views-empty"},[s("span",{staticClass:"views-empty-table"}),t._v(" "),s("p",{staticClass:"views-empty-text"},[t._v(t._s(t.$t("views.table.noData")))])])])],1)],1)])},staticRenderFns:[]},u=s("C7Lr")(n,r,!1,null,null,null);e.default=u.exports}});