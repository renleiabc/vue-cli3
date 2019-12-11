webpackJsonp([50],{

/***/ "MUvH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/home/projectHome.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var projectHome = ({
  data: function data() {
    return {
      option1: {},
      role: 4,
      optionData: '',
      projectUseData: [{}, {}, {}, {}, {}, {}, {}],
      useProject: 'height:200px;',
      colorArr: [['#ff0043', '#fbc1c1'], ['#009b81', '#8bcfc3'], ['#009b81', '#8bcfc3'], ['#376cdb', '#abb9d6'], ['#376cdb', '#abb9d6'], ['#715772', '#9b90ad'], ['#715772', '#9b90ad']]
    };
  },
  mounted: function mounted() {
    if (this.STORE_THEME_LANG === 'zh') {
      // 项目使用情况数据渲染函数调用
      this.getPorjectHome();
    }
    if (this.STORE_THEME_LANG === 'en') {
      // 项目使用情况数据渲染函数调用
      this.getPorjectHome();
    }
    this.role = JSON.parse(localStorage.getItem('userinfo')).role;
  },

  methods: {
    // 获取项目管理端首页的数据
    getPorjectHome: function getPorjectHome() {
      var _this = this;

      var arr = [{ numAll: 100, used: 20, left: 80 }, { numAll: 100, used: 20, left: 80 }, { numAll: 100, used: 20, left: 80 }, { numAll: 100, used: 20, left: 80 }, { numAll: 100, used: 20, left: 80 }, { numAll: 100, used: 20, left: 80 }, { numAll: 100, used: 20, left: 80 }];
      this.$get('/system/projectstoragestatisticslist').then(function (res) {
        if (res.code === 200) {
          arr[0].numAll = res.data.storage_config.project_num;
          arr[0].used = res.data.my_project_num;
          arr[0].left = arr[0].numAll - arr[0].used;
          arr[1].numAll = res.data.storage_config.project_storage ? (res.data.storage_config.project_storage / 1024 / 1024 / 1024).toFixed(1) : 0;
          arr[2].numAll = res.data.storage_config.personal_storage ? (res.data.storage_config.personal_storage / 1024 / 1024 / 1024).toFixed(1) : 0;
          arr[3].numAll = res.data.storage_config.project_num;
          arr[4].numAll = res.data.storage_config.personal_num;
          arr[5].numAll = res.data.image_config.project_image_num;
          arr[6].numAll = res.data.image_config.personal_image_num;
          arr[1].used = res.data.project_storage_size ? (res.data.project_storage_size / 1024 / 1024 / 1024).toFixed(1) : 0;
          arr[2].used = res.data.my_storage_size ? (res.data.project_storage_size / 1024 / 1024 / 1024).toFixed(1) : 0;
          arr[3].used = res.data.project_storage;
          arr[4].used = res.data.my_project_storage;
          arr[5].used = res.data.project_image_num;
          arr[6].used = res.data.my_image_num;
          arr[1].left = arr[1].numAll - arr[1].used;
          arr[2].left = arr[2].numAll - arr[2].used;
          arr[3].left = arr[3].numAll - arr[3].used;
          arr[4].left = arr[4].numAll - arr[4].used;
          arr[5].left = arr[5].numAll - arr[5].used;
          arr[6].left = arr[6].numAll - arr[6].used;
          _this.projectUse(arr);
        }
      });
    },

    // 项目使用情况数据渲染
    projectUse: function projectUse(data) {
      var echartData = [];
      var titleArr = ['项目使用情况', '项目存储空间使用情况', '个人存储空间使用情况', '项目存储空间使用情况', '个人存储空间使用情况', '项目镜像使用情况', '个人镜像使用情况'];
      var titleAllNumArr = ['可建项目总数\n', '项目存储空间\n总容量', '个人存储空间\n总容量', '项目存储空间\n总数', '个人存储空间\n总数', '项目镜像\n总数', '个人镜像\n总数'];
      var color = this.colorArr;
      data.forEach(function (element, key) {
        var title = titleAllNumArr[key] + element.numAll;
        var data = [{
          value: element.used,
          name: '已用\r'
        }, {
          value: element.left,
          name: '剩余\r'
        }];
        echartData.push(echratsData(title, data, color[key], titleArr[key]));
      });
      this.projectUseData = echartData;
    }
  },
  components: {},
  computed: {}
});
function echratsData(title, data, color, seriseName) {
  var showData = {
    title: {
      text: title,
      left: 'center',
      top: '45%',
      textStyle: {
        fontSize: 14,
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      show: false
    },
    series: [{
      name: seriseName,
      type: 'pie',
      radius: ['60%', '75%'],
      avoidLabelOverlap: false,
      legendHoverLink: false,
      hoverAnimation: false,
      label: {
        normal: {
          formatter: '{b|{b}：}{c} ',
          rich: {
            b: {
              fontSize: 14,
              color: '#666',
              lineHeight: 20
            }
          },
          textStyle: {
            color: '#666'
          }
        },
        emphasis: {
          show: true
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      },
      data: data
    }],
    color: color
  };
  return showData;
}
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5772209e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/home/projectHome.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-project",staticStyle:{"text-align":"center"}},[_c('img',{attrs:{"src":_vm.mixinGetImage('views/global/', '陪标一首页.png'),"alt":"首页"}})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var home_projectHome = (esExports);
// CONCATENATED MODULE: ./src/views/home/projectHome.vue
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
  projectHome,
  home_projectHome,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_home_projectHome = __webpack_exports__["default"] = (Component.exports);


/***/ })

});