webpackJsonp([0],{"72WN":function(t,e,s){"use strict";var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("table",{staticClass:"views-project-details"},[s("tr",[s("td",[t._v(t._s(t.$t("views.personalDevelop.personalQuota")))]),t._v(" "),s("td",{staticClass:"views-table-color"},[s("span",[t._v("CPU："+t._s(t.personalData.cpu)+" 核")]),t._v(" "),s("span",{staticClass:"views-table-margin"},[t._v(t._s(t.$t("views.projectContent.memory"))+"："+t._s(t.personalData.memory)+" G")]),t._v(" "),s("span",{staticClass:"views-table-margin"},[t._v("GPU："+t._s(t.personalData.gpu)+" 个")])]),t._v(" "),s("td",[t._v(t._s(t.$t("views.projectContent.alreadyUsed")))]),t._v(" "),s("td",{staticClass:"views-table-color"},[s("span",[t._v("CPU："+t._s(t.personalData.use_cpu)+" 核")]),t._v(" "),s("span",{staticClass:"views-table-margin"},[t._v(t._s(t.$t("views.projectContent.memory"))+"："+t._s(t.personalData.use_memory)+" G")]),t._v(" "),s("span",{staticClass:"views-table-margin"},[t._v("GPU："+t._s(t.personalData.use_gpu)+"  个\n                ")])])])])])},staticRenderFns:[]},n=s("C7Lr")({name:"index",data:function(){return{}},created:function(){this.$store.dispatch("getPersonalDetails")},methods:{},computed:{personalData:function(){return this.$store.getters.postPersonalData}}},a,!1,null,null,null);e.a=n.exports},CjdV:function(t,e,s){(t.exports=s("UTlt")(!1)).push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},KxGM:function(t,e,s){"use strict";var a={data:function(){return{path:{storage_id:"",storage_child_id:"",type:""},propsChild:{label:"label",children:"zones",isLeaf:"leaf"},num:0}},created:function(){},mounted:function(){},methods:{loadNode:function(t,e){this.path.storage_id=this.item.id,this.path.type=this.type,0===t.level&&this.getProjectpath(this.path,e),t.level>=1&&(this.path.storage_child_id=t.data.id,this.getProjectpath(this.path,e))},getProjectpath:function(t,e){var s=this;this.$get("/practiceproject/projectpath",t).then(function(t){if(200===t.code){var a=[];t.data.forEach(function(t){var e={id:parseInt(t.id),storage_id:parseInt(t.storage_id),label:t.path,accessid:t.accessid,accesskey:t.accesskey,children:[]};"1"===t.type?(e.leaf=!1,e.type=1):"2"===t.type&&(e.leaf=!0,e.type=2),1===t.is_init?e.mount_flag="ro":e.mount_flag="rw",a.push(e)}),e(a)}else s.$message({message:t.message,type:"error"})})},handleNodeClick:function(t,e,s){var a=this.item.php_name;this.$store.commit("projectpath",{data:t,name:a})}},components:{},computed:{},props:{item:Object,type:Number}},n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[e("div",{staticClass:"views-code-tree"},[e("el-tree",{ref:"tree",attrs:{props:this.propsChild,lazy:"",load:this.loadNode,"highlight-current":"","empty-text":"暂无数据","node-key":"id"},on:{"node-click":this.handleNodeClick}})],1)])},staticRenderFns:[]};var i={data:function(){return{storagelist:"",common_storage:[],project_storage:[],project:"",common:"",activeName:"first",obj:{project_id:""}}},created:function(){this.obj.project_id=this.projectId,this.getStoragelist(this.obj)},mounted:function(){},methods:{getStoragelist:function(t){var e=this;this.$post("/environmentproject/storagelist",t).then(function(t){if(200===t.code){var s=t.data.project_storage,a=t.data.common_storage;0!==s.length&&(e.project=s[0].id),0!==a.length&&(e.common=a[0].id),s.forEach(function(t,e){t.active=!1,0===e&&(t.active=!0)}),a.forEach(function(t,e){t.active=!1,0===e&&(t.active=!0)}),e.project_storage=s,e.common_storage=a}else e.$message({message:t.message,type:"error"})})},changeRadio:function(t){this.project_storage.forEach(function(e,s){e.active=!1,e.id===t&&(e.active=!0)})},changeCommon:function(t){this.common_storage.forEach(function(e,s){e.active=!1,e.id===t&&(e.active=!0)})}},props:["type","isFirst","isSecond","projectId"],components:{ViewsTreeDir:s("C7Lr")(a,n,!1,function(t){s("hIKf")},"data-v-68c315dd",null).exports},computed:{}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[t.isFirst?s("el-tab-pane",{attrs:{label:t.$t("views.development.projectStorage"),name:"first"}},[s("div",{staticClass:"views-code-file"},[s("div",{staticClass:"views-code-left"},[s("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[0===t.project_storage.length?s("div",{staticClass:"views-code-storage"},[t._v("\n              "+t._s(t.$t("views.table.noData"))+"\n            ")]):s("el-radio-group",{on:{change:t.changeRadio},model:{value:t.project,callback:function(e){t.project=e},expression:"project"}},t._l(t.project_storage,function(e,a){return s("el-radio",{key:a,staticClass:"views-code-list",attrs:{label:e.id}},[s("i",{staticClass:"iconfont icon-wenjianjia views-icon-project"}),t._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.name,placement:"bottom-start"}},[s("span",{staticClass:"text-ellipsis views-storage-name"},[t._v(t._s(e.name))])])],1)}),1)],1)],1),t._v(" "),s("div",{staticClass:"views-code-right"},t._l(t.project_storage,function(e,a){return s("div",{directives:[{name:"show",rawName:"v-show",value:e.active,expression:"item.active"}],key:a,staticClass:"views-code-box"},[s("views-tree-dir",{attrs:{item:e,type:t.type}})],1)}),0)])]):t._e(),t._v(" "),t.isSecond?s("el-tab-pane",{attrs:{label:t.$t("views.development.commonStorage"),name:"second"}},[s("div",{staticClass:"views-code-file"},[s("div",{staticClass:"views-code-left"},[s("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},[0===t.common_storage.length?s("div",{staticClass:"views-code-storage"},[t._v("\n              "+t._s(t.$t("views.table.noData"))+"\n            ")]):s("el-radio-group",{on:{change:t.changeCommon},model:{value:t.common,callback:function(e){t.common=e},expression:"common"}},t._l(t.common_storage,function(e,a){return s("el-radio",{key:a,staticClass:"views-code-list",attrs:{label:e.id}},[s("i",{staticClass:"iconfont icon-wenjianjia views-icon-project"}),t._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.name,placement:"bottom-start"}},[s("span",{staticClass:"text-ellipsis views-storage-name"},[t._v(t._s(e.name))])])],1)}),1)],1)],1),t._v(" "),s("div",{staticClass:"views-code-right"},t._l(t.common_storage,function(e,a){return s("div",{directives:[{name:"show",rawName:"v-show",value:e.active,expression:"item.active"}],key:a,staticClass:"views-code-box"},[s("views-tree-dir",{attrs:{item:e,type:t.type}})],1)}),0)])]):t._e()],1)],1)},staticRenderFns:[]},r=s("C7Lr")(i,o,!1,null,null,null);e.a=r.exports},dclA:function(t,e,s){"use strict";var a={name:"imageDetail",props:{detailData:{type:Object,required:!0}},created:function(){console.log(this.detailData)}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"views-user-management-user-details"},[s("div",{staticClass:"row"},[s("div",{staticClass:"row-first"},[s("span",{staticClass:"tit"},[t._v(t._s(t.$t("views.imageManagement.mirrorName"))+"：")]),t._v(" "),s("div",{staticClass:"content"},[t._v(t._s(t.detailData.name))])]),t._v(" "),s("div",{staticClass:"row-last"},[s("span",{staticClass:"tit"},[t._v(t._s(t.$t("views.imageManagement.mirrorId"))+"：")]),t._v(" "),s("div",{staticClass:"content"},[t._v(t._s(t.detailData.uuid))])])]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"row-first"},[s("span",{staticClass:"tit"},[t._v(t._s(t.$t("views.imageManagement.status"))+"：")]),t._v(" "),s("div",{staticClass:"content"},[t._v(t._s(0==t.detailData.status?"上传中":1==t.detailData.status?"可用":"失败"))])]),t._v(" "),s("div",{staticClass:"row-last"},[s("span",{staticClass:"tit"},[t._v(t._s(t.$t("views.imageManagement.operatingSystem"))+"：")]),t._v(" "),s("div",{staticClass:"content"},[t._v(t._s(t.detailData.imageOs.name))])])]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"row-first"},[s("span",{staticClass:"tit"},[t._v(t._s(t.$t("views.imageManagement.creationTime"))+"：")]),t._v(" "),s("div",{staticClass:"content"},[t._v(t._s(t.detailData.created_at))])]),t._v(" "),t.detailData.project_name?s("div",{staticClass:"row-last"},[s("span",{staticClass:"tit"},[t._v("所属项目空间：")]),t._v(" "),s("div",{staticClass:"content"},[t._v(t._s(t.detailData.project_name))])]):t._e()]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"row-first else"},[s("span",{staticClass:"tit"},[t._v(t._s(t.$t("views.imageManagement.description"))+"：")]),t._v(" "),s("div",{staticClass:"content"},[t._v(t._s(t.detailData.describe))])])])])},staticRenderFns:[]},i=s("C7Lr")(a,n,!1,null,null,null);e.a=i.exports},hIKf:function(t,e,s){var a=s("CjdV");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("FIqI")("23ff3244",a,!0,{})},v46e:function(t,e,s){"use strict";e.k=function(t){return/^[a-zA-Z0-9_]+$/.test(t)},e.g=function(t){return/^[\u4e00-\u9fa5a-zA-Z ]+$/.test(t)},e.j=function(t){return/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(t)},e.f=function(t){return/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-z]+$/i.test(t)},e.h=function(t){return/^(?![\d]+$)(?![a-zA-Z]+$)(?![!@#$%^&*]+$)[\da-zA-Z!@#$%^&*]{6,16}$/.test(t)},e.e=function(t){return/^[^<>:'"/\\.]+$/g.test(t)},e.b=function(t){return/^[a-z0-9]+$/g.test(t)},e.a=function(t){return/^[a-zA-Z0-9]+$/g.test(t)},e.c=function(t,e){var s;switch(e){case 0:return(s=/^[0-9]*[1-9][0-9]*$/).test(t);case 1:return(s=/^(-?\d+)(\.\d+)?$/).test(t);case 2:return(s=/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/).test(t);case 3:return(s=/^0\.\d*[1-9]\d*$/).test(t);case 4:s=["fixed","step","exp","inv","multistep","ploy","sigmoid"];for(var a=0;a<s.length;a++)if(t===s[a])return!0;return!1}},e.d=function(t){return window.btoa(unescape(encodeURIComponent(t)))},e.i=function(t){var e=0;if(t.length<5||escape(t).indexOf("%u")>=0)return!1;t.match(/([a-z])+/)&&e++;t.match(/([0-9])+/)&&e++;t.match(/([A-Z])+/)&&e++;t.match(/[^a-zA-Z0-9]+/)&&e++;return!(e<2)}}});