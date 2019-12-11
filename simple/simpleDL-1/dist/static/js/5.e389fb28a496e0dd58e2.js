webpackJsonp([5],{

/***/ "Dbsp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/promise.js
var promise = __webpack_require__("//Fk");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var keys = __webpack_require__("fZjL");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__("woOf");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__("Zrlr");
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/createClass.js
var createClass = __webpack_require__("wxAW");
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/vue-ueditor-wrap/lib/index.vue






//
//
//
//

// 一个简单的事件订阅发布的实现,取代原始Event对象,提升IE下的兼容性
var lib_LoadEvent = function () {
  function LoadEvent() {
    classCallCheck_default()(this, LoadEvent);

    this.listeners = {};
  }

  createClass_default()(LoadEvent, [{
    key: 'on',
    value: function on(eventName, callback) {
      this.listeners[eventName] === undefined ? this.listeners[eventName] = [] : '';
      this.listeners[eventName].push(callback);
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {
      this.listeners[eventName] && this.listeners[eventName].forEach(function (callback) {
        return callback();
      });
    }
  }]);

  return LoadEvent;
}();

/* harmony default export */ var lib = ({
  name: 'VueUeditorWrap',
  data: function data() {
    return {
      id: 'editor' + Math.random().toString().slice(-10),
      editor: null,
      defaultConfig: {
        UEDITOR_HOME_URL: './static/UEditor/',
        enableAutoSave: false
      }
    };
  },

  props: {
    value: {
      type: String,
      default: 'Vue2.x + UEditor + v-model双向绑定'
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    init: {
      type: Function,
      default: function _default() {
        return function () {};
      }
    },
    destroy: Boolean
  },
  computed: {
    mixedConfig: function mixedConfig() {
      return assign_default()({}, this.defaultConfig, this.config);
    }
  },
  methods: {
    registerButton: function registerButton(_ref) {
      var name = _ref.name,
          icon = _ref.icon,
          tip = _ref.tip,
          handler = _ref.handler,
          _ref$UE = _ref.UE,
          UE = _ref$UE === undefined ? window.UE : _ref$UE;

      UE.registerUI(name, function (editor, name) {
        editor.registerCommand(name, {
          execCommand: function execCommand() {
            handler(editor, name);
          }
        });
        var btn = new UE.ui.Button({
          name: name,
          title: tip,
          cssRules: 'background-image: url(' + icon + ') !important;background-size: cover;',
          onclick: function onclick() {
            editor.execCommand(name);
          }
        });
        editor.addListener('selectionchange', function () {
          var state = editor.queryCommandState(name);
          if (state === -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
          } else {
            btn.setDisabled(false);
            btn.setChecked(state);
          }
        });
        return btn;
      });
    },
    // 实例化编辑器之前-JS依赖检测
    _beforeInitEditor: function _beforeInitEditor(value) {
      var _this = this;

      // 准确判断ueditor.config.js和ueditor.all.js均已加载 仅加载完ueditor.config.js时UE对象和UEDITOR_CONFIG对象也存在,仅加载完ueditor.all.js时UEDITOR_CONFIG对象也存在,但为空对象
      !!window.UE && !!window.UEDITOR_CONFIG && keys_default()(window.UEDITOR_CONFIG).length !== 0 && !!window.UE.getEditor ? this._initEditor(value) : this._loadScripts().then(function () {
        return _this._initEditor(value);
      });
    },

    // 实例化编辑器
    _initEditor: function _initEditor(value) {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.init();
        // 没有按官网示例那样链式调用ready方法的原因在于需要拿到getEditor返回的实例
        _this2.editor = window.UE.getEditor(_this2.id, _this2.mixedConfig);
        _this2.editor.addListener('ready', function () {
          _this2.$emit('ready', _this2.editor);
          _this2.editor.setContent(value);
          _this2.editor.addListener('contentChange', function () {
            _this2.$emit('input', _this2.editor.getContent());
          });
        });
      });
    },

    // 动态添加JS依赖
    _loadScripts: function _loadScripts() {
      var _this3 = this;

      // 确保多个实例同时渲染时不会重复创建SCRIPT标签
      if (window.loadEnv) {
        return new promise_default.a(function (resolve, reject) {
          window.loadEnv.on('scriptsLoaded', function () {
            resolve();
          });
        });
      } else {
        window.loadEnv = new lib_LoadEvent();
        return new promise_default.a(function (resolve, reject) {
          // 如果在其他地方只引用ueditor.all.min.js，在加载ueditor.config.js之后仍需要重新加载ueditor.all.min.js，所以必须确保ueditor.config.js已加载
          _this3._loadConfig().then(function () {
            return _this3._loadCore();
          }).then(function () {
            window.loadEnv.emit('scriptsLoaded');
            resolve();
          });
        });
      }
    },
    _loadConfig: function _loadConfig() {
      var _this4 = this;

      return new promise_default.a(function (resolve, reject) {
        if (!!window.UE && !!window.UEDITOR_CONFIG && keys_default()(window.UEDITOR_CONFIG).length !== 0) {
          resolve();
          return;
        }
        var configScript = document.createElement('script');
        configScript.type = 'text/javascript';
        configScript.src = _this4.mixedConfig.UEDITOR_HOME_URL + 'ueditor.config.js';
        document.getElementsByTagName('head')[0].appendChild(configScript);
        configScript.onload = function () {
          if (!!window.UE && !!window.UEDITOR_CONFIG && keys_default()(window.UEDITOR_CONFIG).length !== 0) {
            resolve();
          } else {
            console && console.error('加载ueditor.config.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!');
          }
        };
      });
    },
    _loadCore: function _loadCore() {
      var _this5 = this;

      return new promise_default.a(function (resolve, reject) {
        if (!!window.UE && !!window.UE.getEditor) {
          resolve();
          return;
        }
        var coreScript = document.createElement('script');
        coreScript.type = 'text/javascript';
        coreScript.src = _this5.mixedConfig.UEDITOR_HOME_URL + 'ueditor.all.min.js';
        document.getElementsByTagName('head')[0].appendChild(coreScript);
        coreScript.onload = function () {
          if (!!window.UE && !!window.UE.getEditor) {
            resolve();
          } else {
            console && console.error('加载ueditor.all.min.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!');
          }
        };
      });
    },

    // 设置内容
    _setContent: function _setContent(value) {
      value === this.editor.getContent() || this.editor.setContent(value);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.destroy && this.editor && this.editor.destroy) this.editor.destroy();
  },

  // v-model语法糖实现
  watch: {
    value: {
      handler: function handler(value) {
        this.editor ? this._setContent(value) : this._beforeInitEditor(value);
      },

      immediate: true
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-20716480","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/vue-ueditor-wrap/lib/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('script',{attrs:{"id":_vm.id,"type":"text/plain"}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var vue_ueditor_wrap_lib = (esExports);
// CONCATENATED MODULE: ./node_modules/vue-ueditor-wrap/lib/index.vue
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
  lib,
  vue_ueditor_wrap_lib,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var node_modules_vue_ueditor_wrap_lib = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "WMqk":
/***/ (function(module, exports, __webpack_require__) {

module.exports=__webpack_require__("Dbsp")

/***/ }),

/***/ "Zrlr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ "vfs7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/vue-ueditor-wrap/index.js
var vue_ueditor_wrap = __webpack_require__("WMqk");
var vue_ueditor_wrap_default = /*#__PURE__*/__webpack_require__.n(vue_ueditor_wrap);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/researchForum/forumDetails.vue

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




/* harmony default export */ var forumDetails = ({
  name: 'forumDetails',
  data: function data() {
    return {
      forumMsg: {
        forum_id: '',
        content: ''
      },
      forum: {},
      obj: {
        forum_id: ''
      },
      isReply: false,
      reply_list: [],
      // 4、根据项目需求自行配置,具体配置参见ueditor.config.js源码或 http://fex.baidu.com/ueditor/#start-start
      config: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        // serverUrl: 'http://api.demo.com/ueditor/upload',
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: '/static/UEditor/',
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 400,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 关闭自动保存
        enableAutoSave: true
      },
      userCharacter: '',
      replyPop: false
    };
  },

  components: { VueUeditorWrap: vue_ueditor_wrap_default.a },
  methods: {
    // 请求帖子详情的借口
    getForumdetail: function getForumdetail(obj) {
      var _this = this;

      this.$get('/forum/forumdetail', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          _this.forum = res.data.forum;
          _this.reply_list = res.data.forum_article;
          if (_this.reply_list.length === 0) {
            _this.isReply = false;
          } else {
            _this.isReply = true;
          }
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 5、 你可以在ready方法中拿到editorInstance实例,之后的所有API就和官方的实例一样了,Just Do What You Want! http://fex.baidu.com/ueditor/#api-common
    ready: function ready(editorInstance) {
      console.log('\u4F60\u8981\u7684\u5B9E\u4F8B' + editorInstance.key + '\u5728\u6B64:', editorInstance);
    },

    // 7. 结合init方法,自定义按钮
    myInit: function myInit() {
      this.$refs.ueditor.registerButton({
        name: 'test',
        icon: './static/test-button.png',
        tip: 'this is a test tip',
        handler: function handler(editor, name) {
          editor.execCommand('inserthtml', '<span>text inserted by test button</span>');
        }
      });
    },

    // 删除回帖
    deleteItem: function deleteItem(id) {
      var _this2 = this;

      this.$confirm('确定删除该帖子回复?', '删除帖子回复', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var obj = {
          forum_article_id: id
        };
        _this2.$post('/forum/deletforumarticle', obj).then(function (res) {
          console.log(stringify_default()(res));
          if (res.code === 200) {
            _this2.$message({
              message: res.message,
              type: 'success'
            });
            _this2.getForumdetail(_this2.obj);
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
    showReplyPop: function showReplyPop() {
      this.replyPop = true;
      this.forumMsg.content = '';
    },

    // 确定回复贴子
    changeReplyPop: function changeReplyPop() {
      var _this3 = this;

      if (this.forumMsg.content === '') {
        this.$message({
          message: '回复内容不能为空',
          type: 'warning'
        });
        return false;
      } else {
        this.$post('/forum/forumreply', this.forumMsg).then(function (res) {
          console.log(stringify_default()(res));
          if (res.code === 200) {
            _this3.$message({
              message: res.message,
              type: 'success'
            });
            _this3.getForumdetail(_this3.obj);
            _this3.replyPop = false;
          } else {
            _this3.$message({
              message: res.message,
              type: 'error'
            });
          }
        });
      }
    }
  },
  created: function created() {
    // console.log(this.$route.query.forumId)
    this.obj.forum_id = this.forumMsg.forum_id = this.$route.query.forumId;
    // console.log(this.obj, this.forumMsg)
    // 默认情况下请求论坛详情数据
    this.getForumdetail(this.obj);
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-49d56447","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/researchForum/forumDetails.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-research-forum-details"},[_c('p',{staticClass:"forum-title"},[_vm._v("\n        "+_vm._s(_vm.forum.title)+"\n        "),_c('el-button',{staticClass:"btn dark small",on:{"click":_vm.showReplyPop}},[_vm._v(_vm._s(_vm.$t("views.researchForum.reply")))])],1),_vm._v(" "),_c('div',{staticClass:"content"},[_c('div',{staticClass:"title"},[_c('div',[_c('span',[_vm._v(_vm._s(_vm.$t("views.researchForum.author"))+"："+_vm._s(_vm.forum.user_name))]),_vm._v("\n                |\n                "),_c('span',[_vm._v(_vm._s(_vm.$t("views.researchForum.issuingTime"))+"："+_vm._s(_vm.forum.created_at))])]),_vm._v(" "),_c('div',[_c('span',[_vm._v(_vm._s(_vm.$t("views.researchForum.click"))+"："+_vm._s(_vm.forum.views))]),_vm._v("\n                |\n                "),_c('span',[_vm._v(_vm._s(_vm.$t("views.researchForum.reply"))+"："+_vm._s(_vm.forum.reply_num))])])]),_vm._v(" "),_c('div',{staticClass:"msg",domProps:{"innerHTML":_vm._s(_vm.forum.content)}})]),_vm._v(" "),(_vm.isReply)?_c('ul',{staticClass:"reply"},_vm._l((_vm.reply_list),function(item,index){return _c('li',{key:index},[_c('p',{staticClass:"name"},[_vm._v(_vm._s(_vm.$t("views.researchForum.replies"))+"："+_vm._s(item.replyer))]),_vm._v(" "),_c('p',{staticClass:"views-forum-reply",domProps:{"innerHTML":_vm._s(item.content)}}),_vm._v(" "),_c('p',{staticClass:"time"},[_vm._v("\n                "+_vm._s(_vm.$t("views.researchForum.postingTime"))+"："+_vm._s(item.created_at)+"\n                "),(item.delete==='delete')?_c('button',{on:{"click":function($event){_vm.deleteItem(item.id)}}},[_c('i',{staticClass:"icon iconfont icon-shanchu2"}),_vm._v(_vm._s(_vm.$t("views.researchForum.delete")))]):_vm._e()])])})):_c('div',{staticClass:"views-empty reply"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v("暂无回复")])]),_vm._v(" "),_c('el-dialog',{staticClass:"replyPop big",attrs:{"title":_vm.$t("views.researchForum.postReply"),"visible":_vm.replyPop},on:{"update:visible":function($event){_vm.replyPop=$event}}},[_c('div',{staticClass:"content"},[_c('vue-ueditor-wrap',{ref:"ueditor",attrs:{"destroy":false,"config":_vm.config,"init":_vm.myInit},on:{"ready":_vm.ready},model:{value:(_vm.forumMsg.content),callback:function ($$v) {_vm.$set(_vm.forumMsg, "content", $$v)},expression:"forumMsg.content"}})],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.replyPop = false}}},[_vm._v(_vm._s(_vm.$t("views.researchForum.cancel")))]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.changeReplyPop}},[_vm._v(_vm._s(_vm.$t("views.researchForum.release")))])],1)])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var researchForum_forumDetails = (esExports);
// CONCATENATED MODULE: ./src/views/researchForum/forumDetails.vue
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
  forumDetails,
  researchForum_forumDetails,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_researchForum_forumDetails = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "wxAW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__("C4MV");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ })

});