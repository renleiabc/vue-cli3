webpackJsonp([0],{

/***/ "KxGM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/components/treeDir.vue
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var treeDir = ({
  data: function data() {
    return {
      path: {
        storage_id: '',
        storage_child_id: '',
        type: ''
      },
      propsChild: {
        label: 'label',
        children: 'zones',
        isLeaf: 'leaf'
      },
      num: 0
    };
  },
  created: function created() {
    // console.log(this.item)
  },
  mounted: function mounted() {},

  methods: {
    // 异步树叶子节点懒加载逻辑
    loadNode: function loadNode(node, resolve) {
      this.path.storage_id = this.item.id;
      this.path.type = this.type;
      //  console.log(node)
      // 一级节点处理
      if (node.level === 0) {
        this.getProjectpath(this.path, resolve);
      }
      // 其余节点处理
      if (node.level >= 1) {
        // 注意！把resolve传到你自己的异步中去
        this.path.storage_child_id = node.data.id;
        this.getProjectpath(this.path, resolve);
      }
    },

    // 公共存储空间列表-项目训练任务路径信息
    getProjectpath: function getProjectpath(obj, resolve) {
      var _this = this;

      this.$get('/practiceproject/projectpath', obj).then(function (res) {
        //  console.log(JSON.stringify(res))
        if (res.code === 200) {
          var data = res.data;
          var dataTree = [];
          data.forEach(function (elt) {
            var obj = {
              id: parseInt(elt.id),
              storage_id: parseInt(elt.storage_id),
              label: elt.path,
              accessid: elt.accessid,
              accesskey: elt.accesskey,
              children: []
            };
            if (elt.type === '1') {
              obj.leaf = false;
              obj.type = 1;
            } else if (elt.type === '2') {
              obj.leaf = true;
              obj.type = 2;
            }
            if (elt.is_init === 1) {
              obj.mount_flag = 'ro';
            } else {
              obj.mount_flag = 'rw';
            }
            dataTree.push(obj);
          });
          // console.log(JSON.stringify(dataTree))
          resolve(dataTree);
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 异步树节点点击事件
    handleNodeClick: function handleNodeClick(data, node, itself) {
      this.$store.commit('projectpath', data);
    }
  },
  components: {},
  computed: {},
  props: { item: Object, type: Number }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1f0fd536","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/components/treeDir.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-scrollbar',{staticStyle:{"width":"100%","height":"100%"}},[_c('div',{staticClass:"views-code-tree",staticStyle:{"width":"1000px"}},[_c('el-tree',{ref:"tree",attrs:{"props":_vm.propsChild,"lazy":"","load":_vm.loadNode,"highlight-current":"","empty-text":"暂无数据","node-key":"id"},on:{"node-click":_vm.handleNodeClick}})],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_treeDir = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/components/treeDir.vue
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
  treeDir,
  components_treeDir,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var projectSpace_components_treeDir = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/components/codeDirectory.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var codeDirectory = ({
  data: function data() {
    return {
      storagelist: '',
      common_storage: [],
      project_storage: [],
      project: '',
      common: '',
      activeName: 'first',
      obj: {
        project_id: ''
      }
    };
  },
  created: function created() {
    this.obj.project_id = this.projectId;
    this.getStoragelist(this.obj);
  },
  mounted: function mounted() {},

  methods: {
    // 获取挂载信息地址
    getStoragelist: function getStoragelist(obj) {
      var _this = this;

      this.$post('/environmentproject/storagelist', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          var project = res.data.project_storage;
          var common = res.data.common_storage;
          _this.project = project[0].id;
          _this.common = common[0].id;
          project.forEach(function (item, i) {
            item.active = false;
            if (i === 0) {
              item.active = true;
            }
          });
          common.forEach(function (item, i) {
            item.active = false;
            if (i === 0) {
              item.active = true;
            }
          });
          _this.project_storage = project;
          _this.common_storage = common;
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 单选框函数
    changeRadio: function changeRadio(val) {
      this.project_storage.forEach(function (item, i) {
        item.active = false;
        if (item.id === val) {
          item.active = true;
        }
      });
      // console.log(JSON.stringify(this.project_storage))
    },
    changeCommon: function changeCommon(val) {
      this.common_storage.forEach(function (item, i) {
        item.active = false;
        if (item.id === val) {
          item.active = true;
        }
      });
    }
  },
  props: ['type', 'isFirst', 'isSecond', 'projectId'],
  components: { ViewsTreeDir: projectSpace_components_treeDir },
  computed: {}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3444d04d","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/components/codeDirectory.vue
var codeDirectory_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-tabs',{model:{value:(_vm.activeName),callback:function ($$v) {_vm.activeName=$$v},expression:"activeName"}},[(_vm.isFirst)?_c('el-tab-pane',{attrs:{"label":_vm.$t('views.development.projectStorage'),"name":"first"}},[_c('div',{staticClass:"views-code-left"},[_c('el-radio-group',{on:{"change":_vm.changeRadio},model:{value:(_vm.project),callback:function ($$v) {_vm.project=$$v},expression:"project"}},_vm._l((_vm.project_storage),function(item,index){return _c('el-radio',{key:index,staticClass:"views-code-list",attrs:{"label":item.id}},[_c('i',{staticClass:"iconfont icon-wenjianjia views-icon-project"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(item.name))])])}))],1),_vm._v(" "),_c('div',{staticClass:"views-code-right"},_vm._l((_vm.project_storage),function(item,index){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(item.active),expression:"item.active"}],key:index,staticClass:"views-code-box"},[_c('views-tree-dir',{attrs:{"item":item,"type":_vm.type}})],1)}))]):_vm._e(),_vm._v(" "),(_vm.isSecond)?_c('el-tab-pane',{attrs:{"label":_vm.$t('views.development.commonStorage'),"name":"second"}},[_c('div',{staticClass:"views-code-left"},[_c('el-radio-group',{on:{"change":_vm.changeCommon},model:{value:(_vm.common),callback:function ($$v) {_vm.common=$$v},expression:"common"}},_vm._l((_vm.common_storage),function(item,index){return _c('el-radio',{key:index,staticClass:"views-code-list",attrs:{"label":item.id}},[_c('i',{staticClass:"iconfont icon-wenjianjia views-icon-project"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(item.name))])])}))],1),_vm._v(" "),_c('div',{staticClass:"views-code-right"},_vm._l((_vm.common_storage),function(item,index){return _c('div',{directives:[{name:"show",rawName:"v-show",value:(item.active),expression:"item.active"}],key:index,staticClass:"views-code-box"},[_c('views-tree-dir',{attrs:{"item":item,"type":_vm.type}})],1)}))]):_vm._e()],1)],1)}
var codeDirectory_staticRenderFns = []
var codeDirectory_esExports = { render: codeDirectory_render, staticRenderFns: codeDirectory_staticRenderFns }
/* harmony default export */ var components_codeDirectory = (codeDirectory_esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/components/codeDirectory.vue
var codeDirectory_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var codeDirectory___vue_template_functional__ = false
/* styles */
var codeDirectory___vue_styles__ = null
/* scopeId */
var codeDirectory___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var codeDirectory___vue_module_identifier__ = null
var codeDirectory_Component = codeDirectory_normalizeComponent(
  codeDirectory,
  components_codeDirectory,
  codeDirectory___vue_template_functional__,
  codeDirectory___vue_styles__,
  codeDirectory___vue_scopeId__,
  codeDirectory___vue_module_identifier__
)

/* harmony default export */ var projectSpace_components_codeDirectory = __webpack_exports__["a"] = (codeDirectory_Component.exports);


/***/ }),

/***/ "v46e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export limitInt */
/* unused harmony export validateURL */
/* harmony export (immutable) */ __webpack_exports__["h"] = validateUsername;
/* harmony export (immutable) */ __webpack_exports__["c"] = validateCommon;
/* harmony export (immutable) */ __webpack_exports__["e"] = validateName;
/* unused harmony export validateLowerCase */
/* unused harmony export validateUpperCase */
/* unused harmony export validateAlphabets */
/* harmony export (immutable) */ __webpack_exports__["g"] = validateTel;
/* unused harmony export validateIdentityCard */
/* harmony export (immutable) */ __webpack_exports__["d"] = validateEmail;
/* harmony export (immutable) */ __webpack_exports__["f"] = validatePassword;
/* unused harmony export validateIP */
/* harmony export (immutable) */ __webpack_exports__["b"] = valiName;
/* harmony export (immutable) */ __webpack_exports__["a"] = spaceTest;
/*
 * @Author: Liang Liang
 * @Date: 2018-08-21 15:52:50
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-30 11:49:27
 * @Description:
 */
/**
 * 整形数字验证 1~num
 * @param {输入值} num
 * @param {最大值} limitNum
 */
function limitInt(num, limitNum) {
  if (num - 0 !== 0 && num <= limitNum) {
    var regNum = /^\d+$/g;
    return regNum.test(num);
  } else {
    return false;
  }
}
/* 合法uri */
function validateURL(textval) {
  var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}
/* 字母，数字，下划线 */
function validateUsername(str) {
  var reg = /^[a-zA-Z0-9_]+$/;
  return reg.test(str);
}
/* 字母，汉字, 数字，下划线 */
function validateCommon(str) {
  var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;
  return reg.test(str);
}
/* 字母，汉字，空格 */
function validateName(str) {
  var reg = /^[\u4e00-\u9fa5a-zA-Z ]+$/;
  return reg.test(str);
}
/* 小写字母 */
function validateLowerCase(str) {
  var reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母 */
function validateUpperCase(str) {
  var reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母 */
function validateAlphabets(str) {
  var reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/* 手机号码和带区号的电话号码 */
function validateTel(str) {
  var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
  return reg.test(str);
}

/* 正确的身份证号格式 */
function validateIdentityCard(str) {
  var reg = /^\d{6}((1[89])|(2\d))\d{2}((0\d)|(1[0-2]))((3[01])|([0-2]\d))\d{3}(\d|X)$/i;
  return reg.test(str);
}
/* 正确的邮箱格式 */
function validateEmail(str) {
  var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-z]+$/i;
  return reg.test(str);
}
/* 包含常用特殊字符的验证，如密码等 ，该验证包含大小写字母，数字，下划线，常用特殊字符 */
function validatePassword(str) {
  var reg = /^[A-Za-z0-9-_`~!^&*+=:;"?.,'@#$%]{6,16}$/;
  return reg.test(str);
}
/* IP地址加子网掩码的验证，如192.168.200.154/25，如果只填IP，限制字符长度为15位，如果IP，子网掩码都填，限制字符长度为18位 */
function validateIP(str) {
  var reg = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/;
  return reg.test(str);
}
/*  名称验证 */
function valiName(str) {
  var reg = /^[^<>:'"/\\.]+$/g;
  return reg.test(str);
}
/*
 **value 参数是传值的字符串或者数字
 **type是类型，
 **0判断正整数
 **1判断实数
 **2判断正实数
 **3 判断大于0，且小于1的正实数
 ** 4 判断是否在数据范围内
 */
function spaceTest(value, type) {
  var reg;
  switch (type) {
    case 0:
      reg = /^\+?[1-9][0-9]*$/;
      return reg.test(value);
    case 1:
      reg = /^(-?\d+)(\.\d+)?$/;
      return reg.test(value);
    case 2:
      reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
      return reg.test(value);
    case 3:
      reg = /^0\.\d*[1-9]\d*$/;
      return reg.test(value);
    case 4:
      reg = ['fixed', 'step', 'exp', 'inv', 'multistep', 'ploy', 'sigmoid'];
      for (var i = 0; i < reg.length; i++) {
        if (value === reg[i]) {
          return true;
        }
      }
      return false;
    default:
      break;
  }
}

/***/ })

});