webpackJsonp([18],{WvI5:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("IHPB"),i=a.n(s),n=a("aA9S"),l=a.n(n),r=a("rVsN"),o=a.n(r),u={name:"uploadUser",props:{params:{type:Object}},data:function(){return{uploadUrl:window.Simple.pingTai+"/oss/user/object/push",keySelected:"",keyListArr:[],keyName:"",keyType:!0,encrypt:!1,dialogCreateKey:!1,failFileList:[],newFile:"",uploadParams:{},fileList:[]}},methods:{handleRemove:function(e,t){console.log(e,t)},beforeAvatarUpload:function(e){var t=e.size/1024/1024<1024;return t||this.$message.error("上传文件大小不能超过 1G!"),this.states=1,t},fileSuccess:function(e,t,a){console.log(e),200===e.state?(this.$emit("closeNewFile"),this.$message({message:"上传成功",type:"success"}),this.$refs.upload.clearFiles()):this.$message({message:e.message,type:"error"})},submitUpload:function(){var e=this;setTimeout(function(){e.$refs.upload.submit()},10)},newFileCreate:function(){var e=this;if(this.encrypt)if(this.keyType)this.uploadParams.pin=this.keyListArr[this.keySelected].enc_key,this.uploadParams.verify=this.keyListArr[this.keySelected].enc_key_md5;else{var t=window.Simple.pingTai+"/oss/keysignature/"+this.ruleForm.keyMD5;this.uploadParams.pin=this.ruleForm.keyMD5,this.$get(t).then(function(t){e.uploadParams.verify=t.data})}else this.uploadParams.pin="";return new o.a(function(e,t){e(!0)})},fileChange:function(e,t){this.newFile="",this.newFile=e,this.fileList=t.splice(-1)},handleError:function(e,t){console.log(e,t),this.failFileList.push(t),this.$message({type:"error",message:"文件"+t.name+"上传失败，请重试"})},beforeRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"comp-upload-file"},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:e.uploadUrl,"on-remove":e.handleRemove,accept:"","before-upload":e.beforeAvatarUpload,name:"upload","auto-upload":!1,"on-change":e.fileChange,"before-remove":e.beforeRemove,"on-success":e.fileSuccess,"on-error":e.handleError,data:e.uploadParams,"file-list":e.fileList}},[a("el-button",{staticClass:"view-btn-small",attrs:{size:"small"}},[e._v("选择文件")]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("文件大小限制为1G")])],1)],1)},staticRenderFns:[]},d={name:"userManagementHome",components:{uploadUser:a("C7Lr")(u,c,!1,null,null,null).exports},data:function(){return{linTabData:"",linUrl:"",pageSize:10,dialogNewFile:!1,user_role:[],rant_status:[],routeId:"",params:{storageId:0,id:0},tableData:{msg:[],url:"/user/getuserlist",loading:!0,Pagination:{page:1,total_count:5},sel:{username:"",name:"",role:"",status:""}},userIdList:[],changePermissionPop:!1,changePermissionPopMsg:{user_id:[],user_role:""}}},methods:{getActiveTab:function(e){this.linTabData=e,this.linUrl=this[e].url,this.initMsg()},clearSearch:function(e){for(var t in this[e].sel)this[e].sel[t]="";void 0!==this[e].Pagination&&(this[e].Pagination.page=1),this.getActiveTab(e)},closeNewFile:function(){this.dialogNewFile=!1,this.searchNameBtn()},doSearch:function(e){void 0!==this[e].Pagination&&(this[e].Pagination.page=1),this.getActiveTab(e)},uploadUser:function(){this.dialogNewFile=!1},changePage:function(e){this.getActiveTab(e)},initMsg:function(){var e=this;this[this.linTabData].loading=!0;var t={};void 0!==this[this.linTabData].Pagination&&(t={pageNum:this.pageSize,pageNo:this[this.linTabData].Pagination.page-1}),void 0!==this[this.linTabData].sel&&(this[this.linTabData].sel.full_date&&2===this[this.linTabData].sel.full_date.length?(this[this.linTabData].sel.star_date=this[this.linTabData].sel.full_date[0],this[this.linTabData].sel.end_date=this[this.linTabData].sel.full_date[1]):(this[this.linTabData].sel.star_date="",this[this.linTabData].sel.end_date=""),t=l()({},t,this[this.linTabData].sel)),this.$get(this[this.linTabData].url,t).then(function(t){var a=t.data.records.list;e[e.linTabData].msg=[].concat(i()(a)),void 0!==e[e.linTabData].Pagination&&(e[e.linTabData].Pagination.total_count=t.data.total_count),e.pageSize=t.data.per_page||10,e[e.linTabData].loading=!1})},selectChange:function(e){this.userIdList=[];for(var t=0;t<e.length;t++)this.userIdList.push(e[t].id)},selectable:function(e,t){return 1!==Number(e.id)&&Number(e.id)!==this.thisId},changePermissionPopDo:function(){var e=this;this.$axios.post("/give-rant-user",this.changePermissionPopMsg).then(function(t){e.$message({message:"授权成功",type:"success"}),e.changePermissionPop=!1})},disableUser:function(e,t){var a=this;t=1===t?0:1,this.$post("/user/updateuserstatus",{user_id:e,status:t}).then(function(e){200===e.code?(a.$message({message:a.$t("views.notification.succeed"),type:"success"}),a.initMsg()):a.$message({message:e.message,type:"error"})})},initializePassword:function(e){var t=this;this.$post("/user/resetpassword",{id:e}).then(function(e){t.$message({message:t.$t("views.notification.succeed"),type:"success"})})},changeUser:function(e){isNaN(e)?(this.routeId="",this.$router.push({name:"addUser"})):(this.routeId=e,this.$router.push({name:"addUser",query:{userId:e}}))},deleteUser:function(e){var t=this,a=void 0;(a=isNaN(e)?[].concat(i()(this.userIdList)):[e]).length>0?this.mixinConfirm("/user/removeuser",{id:a}).then(function(e){e&&t.getActiveTab("tableData")}):this.$message({message:this.$t("views.dialogText.selectNull"),type:"warning"})}},created:function(){this.getActiveTab("tableData"),this.thisId=JSON.parse(sessionStorage.getItem("userinfo")).id},beforeRouteLeave:function(e,t,a){"addUser"===e.name&&(""===this.routeId?e.meta.title="views.nav.addUser":e.meta.title="views.nav.editUser"),a()}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"views-user-management-home"},[a("div",{staticClass:"tab-select"},[a("div",[a("span",{staticClass:"tab-select-title"},[e._v(e._s(e.$t("views.userManagement.username")))]),e._v(" "),a("el-input",{attrs:{placeholder:e.$t("views.userManagement.enter")},model:{value:e.tableData.sel.username,callback:function(t){e.$set(e.tableData.sel,"username",t)},expression:"tableData.sel.username"}})],1),e._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[e._v(e._s(e.$t("views.userManagement.name")))]),e._v(" "),a("el-input",{attrs:{placeholder:e.$t("views.userManagement.enter")},model:{value:e.tableData.sel.name,callback:function(t){e.$set(e.tableData.sel,"name",t)},expression:"tableData.sel.name"}})],1),e._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[e._v(e._s(e.$t("views.userManagement.character")))]),e._v(" "),a("el-select",{attrs:{placeholder:e.$t("views.userManagement.chose")},model:{value:e.tableData.sel.role,callback:function(t){e.$set(e.tableData.sel,"role",t)},expression:"tableData.sel.role"}},[a("el-option",{attrs:{label:e.$t("views.userManagement.addUser.admin"),value:2}}),e._v(" "),a("el-option",{attrs:{label:e.$t("views.userManagement.addUser.manager"),value:3}}),e._v(" "),a("el-option",{attrs:{label:e.$t("views.userManagement.addUser.participant"),value:4}})],1)],1),e._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[e._v(e._s(e.$t("views.userManagement.status")))]),e._v(" "),a("el-select",{attrs:{placeholder:e.$t("views.userManagement.chose")},model:{value:e.tableData.sel.status,callback:function(t){e.$set(e.tableData.sel,"status",t)},expression:"tableData.sel.status"}},[a("el-option",{attrs:{label:e.$t("views.userManagement.open"),value:1}}),e._v(" "),a("el-option",{attrs:{label:e.$t("views.userManagement.close"),value:2}})],1)],1),e._v(" "),a("div",[a("el-button",{staticClass:"btn light small",on:{click:function(t){return e.clearSearch("tableData")}}},[e._v(e._s(e.$t("views.userManagement.reset")))]),e._v(" "),a("el-button",{staticClass:"btn light small",on:{click:function(t){return e.doSearch("tableData")}}},[e._v(e._s(e.$t("views.userManagement.select")))])],1)]),e._v(" "),a("div",{staticClass:"controls-else"},[a("el-button",{staticClass:"btn dark mid",on:{click:e.changeUser}},[e._v(e._s(e.$t("views.userManagement.add")))]),e._v(" "),a("el-button",{staticClass:"btn dark mid",on:{click:e.deleteUser}},[e._v(e._s(e.$t("views.userManagement.batchDeletion")))])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableData.loading,expression:"tableData.loading"}],staticClass:"tab-content",attrs:{data:e.tableData.msg,border:""},on:{"selection-change":e.selectChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",selectable:e.selectable,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("views.userManagement.username"),"show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("router-link",{staticClass:"link",attrs:{to:{name:"userDetails",query:{userId:t.row.id}}}},[e._v(e._s(t.row.username))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("views.userManagement.status"),width:"80",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(1===t.row.status?e.$t("views.userManagement.open"):e.$t("views.userManagement.close"))+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("views.userManagement.character"),width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(2===t.row.role?e.$t("views.userManagement.addUser.admin"):"")+" "+e._s(3===t.row.role?e.$t("views.userManagement.addUser.manager"):"")+" "+e._s(4===t.row.role?e.$t("views.userManagement.addUser.participant"):"")+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",width:"100",align:"center","show-overflow-tooltip":"",label:e.$t("views.userManagement.name")}}),e._v(" "),a("el-table-column",{attrs:{prop:"email","show-overflow-tooltip":"",label:e.$t("views.userManagement.email")}}),e._v(" "),a("el-table-column",{attrs:{prop:"tel",label:e.$t("views.userManagement.phone"),align:"center",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("views.userManagement.operating"),width:"240",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return a("div",{staticClass:"options"},[1!=e.thisId&&1==t.row.id?a("div",[e._v("\n          --\n        ")]):a("div",[e.thisId!=t.row.id?a("button",{staticClass:"btn",on:{click:function(a){return e.disableUser(t.row.id,t.row.status)}}},[e._v("\n            "+e._s(1===t.row.status?e.$t("views.userManagement.disable"):e.$t("views.userManagement.enable"))+"\n          ")]):e._e(),e._v(" "),a("button",{staticClass:"btn",on:{click:function(a){return e.initializePassword(t.row.id)}}},[e._v(e._s(e.$t("views.userManagement.initializePassword")))]),e._v(" "),a("button",{staticClass:"btn",on:{click:function(a){return e.changeUser(t.row.id)}}},[e._v(e._s(e.$t("views.userManagement.modify")))]),e._v(" "),e.thisId!=t.row.id?a("button",{staticClass:"del",on:{click:function(a){return e.deleteUser(t.row.id)}}},[e._v(e._s(e.$t("views.userManagement.delete")))]):e._e()])])}}])}),e._v(" "),a("div",{attrs:{slot:"empty"},slot:"empty"},[a("div",{staticClass:"views-empty"},[a("span",{staticClass:"views-empty-table"}),e._v(" "),a("p",{staticClass:"views-empty-text"},[e._v(e._s(e.$t("views.table.noData")))])])])],1),e._v(" "),a("el-pagination",{staticClass:"tab-page",attrs:{layout:"prev, pager, next","page-size":e.pageSize,"current-page":e.tableData.Pagination.page,total:e.tableData.Pagination.total_count},on:{"update:currentPage":function(t){return e.$set(e.tableData.Pagination,"page",t)},"update:current-page":function(t){return e.$set(e.tableData.Pagination,"page",t)},"current-change":function(t){return e.changePage("tableData")}}}),e._v(" "),a("el-dialog",{staticClass:"changePermissionPop small",attrs:{title:e.$t("views.userManagement.userManagementHome.userAuthorization"),visible:e.changePermissionPop},on:{"update:visible":function(t){e.changePermissionPop=t}}},[a("div",{staticClass:"content"},[a("p",[e._v(e._s(e.$t("views.userManagement.userManagementHome.p1"))+"：")]),e._v(" "),a("ul",e._l(e.user_role,function(t){return a("li",{key:t.value},[a("el-radio",{attrs:{label:t.value},model:{value:e.changePermissionPopMsg.user_role,callback:function(t){e.$set(e.changePermissionPopMsg,"user_role",t)},expression:"changePermissionPopMsg.user_role"}},[e._v(e._s(t.label))])],1)}),0)]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"cancel",on:{click:function(t){e.changePermissionPop=!1}}},[e._v(e._s(e.$t("views.userManagement.cancel")))]),e._v(" "),a("el-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:e.changePermissionPopDo}},[e._v(e._s(e.$t("views.userManagement.save")))])],1)])],1)},staticRenderFns:[]},m=a("C7Lr")(d,v,!1,null,null,null);t.default=m.exports}});