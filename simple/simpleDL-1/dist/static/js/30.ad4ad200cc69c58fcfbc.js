webpackJsonp([30],{

/***/ "9+WO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/util/index.js
var util = __webpack_require__("ZoQJ");

// CONCATENATED MODULE: ./src/util/i18n.js
// translate router.meta.title, be used in breadcrumb sidebar tagsview
function generateTitle(title) {
  var hasKey = this.$te('views.' + title);
  var translatedTitle = this.$t('views.' + title); // $t :this method from vue-i18n, inject in @/lang/index.js
  if (hasKey) {
    return translatedTitle;
  }
  return title;
}
function generateSkinColor(color) {
  var hasKey = this.$te('skin.' + color);
  var translatedTitle = this.$t('skin.' + color); // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle;
  }
  return color;
}
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/researchForum/forumCenter.vue
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



/* harmony default export */ var forumCenter = ({
  name: 'forumCenter',
  data: function data() {
    return {
      linTabData: '',
      linUrl: '',
      forumData: [],
      loading: true,
      isCount: false,
      total: 100,
      per: 10,
      forumTitle: '',
      currentPage: 1,
      tag: [{ label: 'researchForum.all', active: true }, { label: 'researchForum.help', active: false }, { label: 'researchForum.share', active: false }, { label: 'researchForum.notice', active: false }, { label: 'researchForum.announcement', active: false }],
      obj: {
        page: 0,
        keyword: '',
        type: 0,
        created_at: '',
        last_at: '',
        views: '',
        id: 'DESC'
      }
    };
  },

  methods: {
    generateTitle: generateTitle, // generateTitle by vue-i18n
    doSearch: function doSearch() {
      var keyword = this.forumTitle;
      this.obj.keyword = keyword;
      var obj = this.obj;
      this.currentPage = 1;
      this.getForumData(obj);
    },

    // 改变分页
    changePage: function changePage(val) {
      var obj = this.obj;
      obj.page = val;
      this.getForumData(obj);
    },

    // 请求论坛中心的数据
    getForumData: function getForumData(obj) {
      var _this = this;

      this.$get('/forum/forumlist', obj).then(function (res) {
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

    // 改变类型
    changeType: function changeType(index) {
      console.log(index);
      this.tag.forEach(function (item, i) {
        item.active = false;
        if (index === i) {
          item.active = true;
        }
      });
      var obj = this.obj;
      obj.id = 'DESC';
      obj.views = '';
      obj.created_at = '';
      obj.last_at = '';
      obj.type = index;
      this.currentPage = 1;
      this.getForumData(obj);
    },

    // 排序
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
        // console.log(key, status)
        var result = status === 'descending' ? 'ASC' : 'DESC';
        // console.log(result)
        // console.log(sortData(key, result))
        // 排序函数调用
        var obj = Object(util["e" /* sortData */])(key, result);
        obj.keyword = this.obj.keyword;
        obj.type = this.obj.type;
        this.getForumData(obj);
      }
    }
  },
  created: function created() {
    // 调用论坛中心的数据函数，进行初始化
    var obj = this.obj;
    this.getForumData(obj);
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5b58295a","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/researchForum/forumCenter.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-research-forum-center"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('el-input',{attrs:{"placeholder":_vm.$t("views.researchForum.enter"),"clearable":""},model:{value:(_vm.forumTitle),callback:function ($$v) {_vm.forumTitle=$$v},expression:"forumTitle"}},[_c('el-button',{attrs:{"slot":"append","icon":"el-icon-search"},on:{"click":_vm.doSearch},slot:"append"})],1)],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn dark small link"},[_c('router-link',{attrs:{"to":{name:'forumSend'}}},[_vm._v("\n                    "+_vm._s(_vm.$t("views.researchForum.post"))+"\n                ")])],1)],1)]),_vm._v(" "),_c('p',{staticClass:"sel"},_vm._l((_vm.tag),function(item,index){return _c('button',{key:index,class:{active:item.active},on:{"click":function($event){_vm.changeType(index)}}},[_vm._v("\n            "+_vm._s(_vm.generateTitle(item.label))+"\n        ")])})),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],staticClass:"tab-content",attrs:{"data":_vm.forumData},on:{"sort-change":_vm.sortChange}},[_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.postTopic"),"default-sort":{prop: 'poster_time'}},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('router-link',{staticClass:"link",attrs:{"to":{name:'forumDetails',query:{forumId:scope.row.id}}}},[_c('i',{staticClass:"icon iconfont",class:scope.row.type==='1'?'icon-bangzhu':scope.row.type==='2'?'icon-fenxiang':scope.row.type==='3'?'icon-tongzhi1':'icon-notice'}),_vm._v("\n                    "+_vm._s(scope.row.title)+"\n                ")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.authorReleaseTime"),"width":"180","sortable":"custom","prop":"created_at"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('p',{staticClass:"top"},[_vm._v(_vm._s(scope.row.user_name))]),_vm._v(" "),_c('p',{staticClass:"bottom"},[_vm._v(_vm._s(scope.row.created_at))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.replyClick"),"width":"180","sortable":"custom","prop":"views"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('p',{staticClass:"top"},[_vm._v(_vm._s(scope.row.reply_num))]),_vm._v(" "),_c('p',{staticClass:"bottom"},[_vm._v(_vm._s(scope.row.views))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.researchForum.lastReply"),"width":"180","sortable":"custom","prop":"last_at"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.last_reply ===null)?_c('div',[_vm._v("\n                    --\n                ")]):_c('div',[_c('p',{staticClass:"top"},[_vm._v(_vm._s(scope.row.last_reply))]),_vm._v(" "),_c('p',{staticClass:"bottom"},[_vm._v(_vm._s(scope.row.last_at))])])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{directives:[{name:"show",rawName:"v-show",value:(_vm.isCount),expression:"isCount"}],staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.per,"current-page":_vm.currentPage,"total":_vm.total},on:{"update:currentPage":function($event){_vm.currentPage=$event},"current-change":_vm.changePage}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var researchForum_forumCenter = (esExports);
// CONCATENATED MODULE: ./src/views/researchForum/forumCenter.vue
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
  forumCenter,
  researchForum_forumCenter,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_researchForum_forumCenter = __webpack_exports__["default"] = (Component.exports);


/***/ })

});