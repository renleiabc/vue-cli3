webpackJsonp([29],{

/***/ "V0R0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./src/util/index.js
var util = __webpack_require__("ZoQJ");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/researchForum/forumManagement.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var forumManagement = ({
  name: 'forumManagement',
  data: function data() {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      sel: [],
      forumList: [],
      forumData: [],
      loading: true,
      obj: {
        title: '',
        type: '',
        name: '',
        created_at: '',
        last_at: '',
        page: 0
      },
      isCount: false,
      per: 0,
      total: 0,
      options: [],
      currentPage: 1
    };
  },

  methods: {
    // 请求论坛管理的数据
    getForumData: function getForumData(obj) {
      var _this = this;

      this.$get('/forum/forummanagelist', obj).then(function (res) {
        console.log(stringify_default()(res));
        if (res.code === 200) {
          _this.loading = false;
          _this.forumData = res.data.forums;
          var total = res.data.total_count;
          var per = res.data.per_page;
          if (total <= per) {
            _this.isCount = false;
          } else {
            _this.isCount = true;
            _this.per = per;
            _this.total = total;
          }
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 重置
    clearSearch: function clearSearch() {
      this.obj = {
        title: '',
        type: '',
        name: '',
        created_at: '',
        last_at: '',
        page: 0
      };
      return this.obj;
    },

    // 查询
    doSearch: function doSearch() {
      this.obj.page = 0;
      var obj = this.obj;
      this.currentPage = 1;
      this.getForumData(obj);
    },

    // 分页
    changePage: function changePage(val) {
      this.obj.page = val;
      var obj = this.obj;
      this.getForumData(obj);
    },
    selectChange: function selectChange(rows) {
      this.forumList = [];
      this.forumList = rows;
      console.log(stringify_default()(rows));
    },

    // 删除帖子函数封装
    deleteCard: function deleteCard(arr) {
      var _this2 = this;

      this.$confirm('确定删除该帖子?', '删除帖子', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var obj = {
          forum_id: arr
          // console.log(JSON.stringify(obj))
        };_this2.$post('/forum/deletebench', obj).then(function (res) {
          console.log(stringify_default()(res));
          if (res.code === 200) {
            _this2.$message({
              message: res.message,
              type: 'success'
            });
            var _obj = _this2.clearSearch();
            _this2.getForumData(_obj);
          } else {
            _this2.$message({
              message: res.message,
              type: 'error'
            });
          }
        });
      }).catch(function () {
        _this2.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 批量删除
    deleteForum: function deleteForum() {
      // console.log(JSON.stringify(this.forumList))
      var forumList = this.forumList;
      if (forumList.length === 0) {
        this.$message({
          message: '请选择需要删除的内容',
          type: 'warning'
        });
        return false;
      } else {
        var listId = [];
        forumList.forEach(function (item, index) {
          listId.push(item.id);
        });
        console.log(stringify_default()(listId));
        this.deleteCard(listId);
      }
    },

    // 单个删除
    deleteSingle: function deleteSingle(id) {
      var listId = [];
      listId.push(id);
      console.log(stringify_default()(listId));
      this.deleteCard(listId);
    },
    sortChange: function sortChange(_ref) {
      var column = _ref.column,
          prop = _ref.prop,
          order = _ref.order;

      if (this.forumData.length === 0) {
        this.$message({
          message: '数据为空',
          type: 'warning'
        });
        return false;
      } else {
        var sort = { column: column, prop: prop, order: order
          // console.log(JSON.stringify(sort.prop))
        };var key = sort.prop;
        var status = sort.order;
        console.log(key, status);
        var result = status === 'descending' ? 'ASC' : 'DESC';
        // console.log(result)
        // console.log(sortData(key, result))
        // 排序函数调用
        var obj = Object(util["e" /* sortData */])(key, result);
        obj.type = this.obj.type;
        obj.name = this.obj.name;
        obj.title = this.obj.title;
        this.getForumData(obj);
      }
    }
  },

  created: function created() {
    // 请求论坛管理的数据，函数调用
    var obj = this.obj;
    this.getForumData(obj);
    this.$store.dispatch('getforumaddper');
  },

  computed: {
    forumaddper: function forumaddper() {
      return this.$store.getters.postForumaddper;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-fe772170","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/researchForum/forumManagement.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-research-forum-management"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.researchForum.theme")))]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":_vm.$t("views.researchForum.enter")},model:{value:(_vm.obj.title),callback:function ($$v) {_vm.$set(_vm.obj, "title", $$v)},expression:"obj.title"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.researchForum.type")))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t("views.researchForum.chose"),"clearable":""},model:{value:(_vm.obj.type),callback:function ($$v) {_vm.$set(_vm.obj, "type", $$v)},expression:"obj.type"}},_vm._l((_vm.forumaddper),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t("views.researchForum.poster")))]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":_vm.$t("views.researchForum.enter")},model:{value:(_vm.obj.name),callback:function ($$v) {_vm.$set(_vm.obj, "name", $$v)},expression:"obj.name"}})],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":_vm.clearSearch}},[_vm._v(_vm._s(_vm.$t("views.researchForum.reset")))]),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":_vm.doSearch}},[_vm._v(_vm._s(_vm.$t("views.researchForum.select")))])],1)]),_vm._v(" "),_c('div',{staticClass:"else-do"},[_c('el-button',{staticClass:"btn dark mid",on:{"click":_vm.deleteForum}},[_vm._v(_vm._s(_vm.$t("views.researchForum.batchDeletion")))]),_vm._v(" "),_c('el-button',{staticClass:"btn dark mid link"},[_c('router-link',{attrs:{"to":{name:'forumSend'}}},[_vm._v("\n                "+_vm._s(_vm.$t("views.researchForum.post"))+"\n            ")])],1)],1),_vm._v(" "),_c('div',{staticClass:"views-forum-table"},[_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],staticClass:"tab-content",attrs:{"data":_vm.forumData,"border":""},on:{"selection-change":_vm.selectChange,"sort-change":_vm.sortChange}},[_c('el-table-column',{attrs:{"type":"selection","width":"55","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.theme"),"align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('router-link',{staticClass:"link",attrs:{"to":{name:'forumDetails',query:{forumId:scope.row.id}}}},[_vm._v(_vm._s(scope.row.title))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.postType"),"width":"80","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(item){return [(item.row.type === '1')?_c('span',[_vm._v(_vm._s(_vm.$t('views.researchForum.help')))]):_vm._e(),_vm._v(" "),(item.row.type === '2')?_c('span',[_vm._v(_vm._s(_vm.$t('views.researchForum.share')))]):_vm._e(),_vm._v(" "),(item.row.type === '3')?_c('span',[_vm._v(_vm._s(_vm.$t('views.researchForum.notice')))]):_vm._e(),_vm._v(" "),(item.row.type === '4')?_c('span',[_vm._v(_vm._s(_vm.$t('views.researchForum.announcement')))]):_vm._e()]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"user_name","label":_vm.$t("views.researchForum.poster"),"align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.replyView"),"align":"center","prop":"views","sortable":"custom"},scopedSlots:_vm._u([{key:"default",fn:function(item){return [_vm._v("\n                    "+_vm._s(item.row.reply_num)+"/"+_vm._s(item.row.views)+"\n                ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.finalPost"),"align":"center","prop":"last_at","sortable":"custom"},scopedSlots:_vm._u([{key:"default",fn:function(item){return [(item.row.last_reply ===null)?_c('div',[_vm._v("\n                        --\n                    ")]):_c('div',[_vm._v("\n                        "+_vm._s(item.row.last_reply)+"、"+_vm._s(item.row.last_at)+"\n                    ")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.operating"),"width":"100","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('button',{staticClass:"btn",on:{"click":function($event){_vm.deleteSingle(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t("views.researchForum.delete")))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1)],1),_vm._v(" "),_c('el-pagination',{directives:[{name:"show",rawName:"v-show",value:(_vm.isCount),expression:"isCount"}],staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.per,"current-page":_vm.currentPage,"total":_vm.total},on:{"update:currentPage":function($event){_vm.currentPage=$event},"current-change":_vm.changePage}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var researchForum_forumManagement = (esExports);
// CONCATENATED MODULE: ./src/views/researchForum/forumManagement.vue
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  forumManagement,
  researchForum_forumManagement,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_researchForum_forumManagement = __webpack_exports__["default"] = (Component.exports);


/***/ })

});