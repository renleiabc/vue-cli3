webpackJsonp([39],{V0R0:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("ZoQJ"),r={name:"forumManagement",data:function(){return{linTabData:"",linUrl:"",pageSize:10,sel:[],forumList:[],forumData:[],loading:!0,obj:{title:"",type:"",name:"",created_at:"DESC",last_at:"",page:0},isCount:!1,per:0,total:0,options:[],currentPage:1}},methods:{getForumData:function(e){var t=this;this.$get("/forum/forummanagelist",e).then(function(e){if(200===e.code){t.loading=!1,t.forumData=e.data.forums;var a=e.data.total_count,s=e.data.per_page;a<=s?t.isCount=!1:(t.isCount=!0,t.per=s,t.total=a)}else t.$message({message:e.message,type:"error"})})},clearSearch:function(){return this.obj={title:"",type:"",name:"",created_at:"DESC",last_at:"",page:0},this.currentPage=1,this.getForumData(this.obj),this.obj},forumSend:function(){this.$router.push({name:"forumSend"})},doSearch:function(){this.obj.page=0;var e=this.obj;this.currentPage=1,this.getForumData(e)},changePage:function(e){this.obj.page=e;var t=this.obj;this.getForumData(t)},selectChange:function(e){this.forumList=[],this.forumList=e},deleteCard:function(e,t){var a=this;this.$confirm("确定删除该帖子?","删除帖子",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",beforeClose:function(s,r,o){if("confirm"===s){r.confirmButtonLoading=!0;var n={type:t,forum_id:e};a.$post("/forum/deletebench",n).then(function(e){if(200===e.code){a.$message({message:e.message,type:"success"});var t=a.clearSearch();a.getForumData(t)}else a.$message({message:e.message,type:"error"});r.confirmButtonLoading=!1,o()})}else o()}}).catch(function(){})},deleteForum:function(){var e=this.forumList;if(0===e.length)return this.$message({type:"warning",message:this.$t("views.dialogText.selectNull")}),!1;var t=[];e.forEach(function(e,a){t.push(e.id)}),this.deleteCard(t,1)},deleteSingle:function(e){var t=[];t.push(e),this.deleteCard(t,0)},sortChange:function(e){var t=e.column,a=e.prop,r=e.order;if(0===this.forumData.length)return this.$message({message:"数据为空",type:"warning"}),!1;var o={column:t,prop:a,order:r},n=o.prop,i=o.order;console.log(n,i);var l="descending"===i?"ASC":"DESC",c=Object(s.h)(n,l);c.type=this.obj.type,c.name=this.obj.name,c.title=this.obj.title,c.created_at="",this.getForumData(c)}},created:function(){var e=this.obj;this.getForumData(e),this.$store.dispatch("getforumaddper")},computed:{forumaddper:function(){return this.$store.getters.postForumaddper}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"views-research-forum-management"},[a("div",{staticClass:"tab-select"},[a("div",[a("span",{staticClass:"tab-select-title"},[e._v(e._s(e.$t("views.researchForum.theme")))]),e._v(" "),a("el-input",{attrs:{placeholder:e.$t("views.researchForum.enter")},model:{value:e.obj.title,callback:function(t){e.$set(e.obj,"title",t)},expression:"obj.title"}})],1),e._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[e._v(e._s(e.$t("views.researchForum.type")))]),e._v(" "),a("el-select",{attrs:{placeholder:e.$t("views.researchForum.chose"),clearable:""},model:{value:e.obj.type,callback:function(t){e.$set(e.obj,"type",t)},expression:"obj.type"}},e._l(e.forumaddper.data,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("div",[a("span",{staticClass:"tab-select-title"},[e._v(e._s(e.$t("views.researchForum.poster")))]),e._v(" "),a("el-input",{attrs:{placeholder:e.$t("views.researchForum.enter")},model:{value:e.obj.name,callback:function(t){e.$set(e.obj,"name",t)},expression:"obj.name"}})],1),e._v(" "),a("div",[a("el-button",{staticClass:"btn light small",on:{click:e.clearSearch}},[e._v(e._s(e.$t("views.researchForum.reset")))]),e._v(" "),a("el-button",{staticClass:"btn light small",on:{click:e.doSearch}},[e._v(e._s(e.$t("views.researchForum.select")))])],1)]),e._v(" "),a("div",{staticClass:"else-do"},[a("el-button",{staticClass:"btn dark mid",on:{click:e.deleteForum}},[e._v("\n      "+e._s(e.$t("views.researchForum.batchDeletion"))+"\n    ")]),e._v(" "),a("el-button",{staticClass:"btn dark mid link",on:{click:e.forumSend}},[a("a",[e._v("\n        "+e._s(e.$t("views.researchForum.post"))+"\n      ")])])],1),e._v(" "),a("div",{staticClass:"views-forum-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"tab-content",attrs:{data:e.forumData,border:""},on:{"selection-change":e.selectChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("views.researchForum.theme"),align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("router-link",{staticClass:"link",attrs:{to:{name:"forumDetails",query:{forumId:t.row.id}}}},[e._v(e._s(t.row.title))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("views.researchForum.postType"),width:"80",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["1"===t.row.type?a("span",[e._v(e._s(e.$t("views.researchForum.help")))]):e._e(),e._v(" "),"2"===t.row.type?a("span",[e._v(e._s(e.$t("views.researchForum.share")))]):e._e(),e._v(" "),"3"===t.row.type?a("span",[e._v(e._s(e.$t("views.researchForum.notice")))]):e._e(),e._v(" "),"4"===t.row.type?a("span",[e._v(e._s(e.$t("views.researchForum.announcement")))]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:e.$t("views.researchForum.poster"),align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("views.researchForum.replyView"),align:"center",prop:"views"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.reply_num)+" / "+e._s(t.row.views)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("views.researchForum.finalPost"),align:"center",prop:"last_at","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[null===t.row.last_reply?a("div",[e._v("\n            --\n          ")]):null===t.row.last_reply&&""!==t.row.last_at?a("div",[e._v("\n            用户已注销\n          ")]):a("div",[e._v("\n            "+e._s(t.row.last_reply)+" / "+e._s(t.row.last_at)+"\n          ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:e.$t("views.researchForum.operating"),width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("button",{staticClass:"btn",on:{click:function(a){return e.deleteSingle(t.row.id)}}},[e._v(e._s(e.$t("views.researchForum.delete")))])]}}])}),e._v(" "),a("div",{attrs:{slot:"empty"},slot:"empty"},[a("div",{staticClass:"views-empty"},[a("span",{staticClass:"views-empty-table"}),e._v(" "),a("p",{staticClass:"views-empty-text"},[e._v(e._s(e.$t("views.table.noData")))])])])],1)],1),e._v(" "),a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.isCount,expression:"isCount"}],staticClass:"tab-page",attrs:{layout:"prev, pager, next","page-size":e.per,"current-page":e.currentPage,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"current-change":e.changePage}})],1)},staticRenderFns:[]},n=a("C7Lr")(r,o,!1,null,null,null);t.default=n.exports}});