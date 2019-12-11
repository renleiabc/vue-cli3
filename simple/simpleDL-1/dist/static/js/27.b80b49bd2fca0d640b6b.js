webpackJsonp([27],{

/***/ "u3Zw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./src/util/index.js
var util = __webpack_require__("ZoQJ");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/researchForum/myForum.vue

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


/* harmony default export */ var myForum = ({
  name: 'myForum',
  data: function data() {
    return {
      activeName: 'first', // 当前激活页
      total: 0,
      per: 0,
      currentPage: 1,
      loading: true,
      forumData: [],
      isCount: false,
      obj: {
        page: 0,
        keyword: '',
        type: 0,
        created_at: '',
        last_at: '',
        views: '',
        id: 'DESC',
        card: 1
      },
      tag: [{ label: this.$t('views.researchForum.myPosts'), name: 'first', lazy: true }, { label: this.$t('views.researchForum.iParticipated'), name: 'second', lazy: true }],
      type: [{ label: this.$t('views.researchForum.all'), active: true }, { label: this.$t('views.researchForum.help'), active: false }, { label: this.$t('views.researchForum.share'), active: false }, { label: this.$t('views.researchForum.notice'), active: false }, { label: this.$t('views.researchForum.announcement'), active: false }]
    };
  },

  methods: {
    // 请求论坛表格的数据
    getForumData: function getForumData(obj) {
      var _this = this;

      this.$get('/forum/myforummanagelist', obj).then(function (res) {
        // console.log(JSON.stringify(res))
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

    // tag事件调用
    searchTabs: function searchTabs() {
      //  清除搜索条件函数调用
      this.clearSearch();
      this.initTag();
      switch (this.activeName) {
        case 'first':
          this.obj.card = 1;
          break;
        case 'second':
          this.obj.card = 2;
          break;
        default:
          this.obj.card = 1;
      }
      var obj = this.obj;
      this.getForumData(obj);
      this.currentPage = 1;
      console.log(stringify_default()(this.obj));
    },

    // 清除搜索条件、分页切换
    clearSearch: function clearSearch() {
      var obj = {
        page: 0,
        keyword: '',
        type: 0,
        created_at: '',
        last_at: '',
        views: '',
        id: 'DESC',
        card: 1
      };
      this.obj = obj;
      return obj;
    },

    // 排序
    sortChange: function sortChange(_ref) {
      var column = _ref.column,
          prop = _ref.prop,
          order = _ref.order;

      console.log('+++');
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
        // console.log(key, status)
        var result = status === 'descending' ? 'ASC' : 'DESC';
        // console.log(result)
        console.log(Object(util["e" /* sortData */])(key, result));
        // 排序函数调用
        var obj = Object(util["e" /* sortData */])(key, result);
        obj.keyword = this.obj.keyword;
        obj.type = this.obj.type;
        obj.card = this.obj.card;
        this.getForumData(obj);
      }
    },


    // 改变分页
    changePageTabs: function changePageTabs(val) {
      var obj = this.obj;
      obj.page = val;
      this.getForumData(obj);
    },

    // 按照查询条件查找
    doSearch: function doSearch() {
      this.initTag();
      this.obj.type = 0;
      this.obj.page = 0;
      this.obj.created_at = '';
      this.obj.last_at = '';
      this.obj.views = '';
      var obj = this.obj;
      console.log(stringify_default()(this.obj));
      this.getForumData(obj);
    },

    // 改变类型
    changeType: function changeType(index) {
      console.log(index);
      this.type.forEach(function (item, i) {
        item.active = false;
        if (index === i) {
          item.active = true;
        }
      });
      this.obj.id = 'DESC';
      this.obj.views = '';
      this.obj.created_at = '';
      this.obj.last_at = '';
      this.obj.type = index;
      this.currentPage = 1;
      console.log(stringify_default()(this.obj));
      this.getForumData(this.obj);
    },

    // 初始化tag数据
    initTag: function initTag() {
      this.type.forEach(function (item, i) {
        item.active = false;
        if (i === 0) {
          item.active = true;
        }
      });
    }
  },
  created: function created() {
    // 默认请求数据
    var obj = this.obj;
    this.getForumData(obj);
  },

  computed: {
    // forumData () {
    //   console.log(JSON.stringify(this.$store.getters.postForumData))
    //   return this.$store.getters.postForumData
    // },
    // loading () {
    //   return this.$store.getters.postLoading
    // }
    // chapterData () {
    //   console.log(JSON.stringify(this.$store.getters.chapterData))
    //   let res = this.$store.getters.chapterData
    //   return Object.assign([], res)
    //   // return res;
    // }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5a787900","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/researchForum/myForum.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-research-forum-my"},[_c('el-tabs',{on:{"tab-click":_vm.searchTabs},model:{value:(_vm.activeName),callback:function ($$v) {_vm.activeName=$$v},expression:"activeName"}},_vm._l((_vm.tag),function(item,index){return _c('el-tab-pane',{key:index,attrs:{"label":item.label,"name":item.name}},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('el-input',{attrs:{"placeholder":_vm.$t("views.researchForum.enter"),"clearable":""},model:{value:(_vm.obj.keyword),callback:function ($$v) {_vm.$set(_vm.obj, "keyword", $$v)},expression:"obj.keyword"}},[_c('el-button',{attrs:{"slot":"append","icon":"el-icon-search"},on:{"click":_vm.doSearch},slot:"append"})],1)],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn dark small link"},[_c('router-link',{attrs:{"to":{name:'forumSend'}}},[_vm._v("\n              "+_vm._s(_vm.$t("views.researchForum.post"))+"\n            ")])],1)],1)]),_vm._v(" "),_c('p',{staticClass:"sel"},_vm._l((_vm.type),function(item,index){return _c('button',{key:index,class:{active:item.active},on:{"click":function($event){_vm.changeType(index)}}},[_vm._v("\n          "+_vm._s(item.label)+"\n        ")])})),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],staticClass:"tab-content",attrs:{"data":_vm.forumData},on:{"sort-change":_vm.sortChange}},[_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.postTopic")},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('router-link',{staticClass:"link",attrs:{"to":{name:'forumDetails',query:{forumId:scope.row.id}}}},[_c('i',{staticClass:"icon iconfont",class:scope.row.type==='1'?'icon-bangzhu':scope.row.type==='2'?'icon-fenxiang':scope.row.type==='3'?'icon-tongzhi1':'icon-notice'}),_vm._v("\n              "+_vm._s(scope.row.title)+"\n            ")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.authorReleaseTime"),"width":"180","sortable":"custom","prop":"created_at"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('p',{staticClass:"top"},[_vm._v(_vm._s(scope.row.user_name))]),_vm._v(" "),_c('p',{staticClass:"bottom"},[_vm._v(_vm._s(scope.row.created_at))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.replyClick"),"width":"180","sortable":"custom","prop":"views"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('p',{staticClass:"top"},[_vm._v(_vm._s(scope.row.reply_num))]),_vm._v(" "),_c('p',{staticClass:"bottom"},[_vm._v(_vm._s(scope.row.views))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.lastReply"),"width":"180","sortable":"custom","prop":"last_at"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.last_reply ===null)?_c('div',[_vm._v("\n              --\n            ")]):_c('div',[_c('p',{staticClass:"top"},[_vm._v(_vm._s(scope.row.last_reply))]),_vm._v(" "),_c('p',{staticClass:"bottom"},[_vm._v(_vm._s(scope.row.last_at))])])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{directives:[{name:"show",rawName:"v-show",value:(_vm.isCount),expression:"isCount"}],staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.per,"current-page":_vm.currentPage,"total":_vm.total},on:{"update:currentPage":function($event){_vm.currentPage=$event},"current-change":_vm.changePageTabs}})],1)}))],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var researchForum_myForum = (esExports);
// CONCATENATED MODULE: ./src/views/researchForum/myForum.vue
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
  myForum,
  researchForum_myForum,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_researchForum_myForum = __webpack_exports__["default"] = (Component.exports);


/***/ })

});