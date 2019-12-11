webpackJsonp([51],{

/***/ "Xuru":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/clusterMonitoring/gpuDetail.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var gpuDetail = ({
  name: 'gpuDetail',
  data: function data() {
    return {
      cname: 'charts',
      nodeId: '',
      gpuId: '',
      gpuTemp: {
        option: {}
      },
      gpuSe: {
        option: {}
      },
      powUsage: {
        option: {}
      },
      mem: {
        option: {}
      },
      clock: {
        option: {}
      },
      appClock: {
        option: {}
      }
    };
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    if (to.name === 'nodeControlDetail' && to.query.nodeId === undefined) {
      this.$router.push({ name: 'nodeControlDetail', query: { nodeId: this.nodeId } });
    } else {
      next();
    }
  },

  methods: {
    chartData: function chartData(data) {
      // 温度
      this.gpuTemp.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: 'GPU' + this.gpuId + '_GPUTemp(C)',
          left: 20,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          right: 45,
          borderRadius: 0,
          data: ['GPUTemp']
        },
        calculable: true,
        color: ['#3bd0ac', '#15c6e6'],
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: data.x_axis
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'GPUTemp',
          type: 'line',
          areaStyle: {
            color: '#8fe2ce',
            opacity: 0.7
          },
          smooth: true,
          z: 4,
          data: data.gpu_temp
        }]
      };
      this.gpuSe.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: 'GPU' + this.gpuId + '_GPUSE(%)',
          left: 20,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          right: 45,
          borderRadius: 0,
          data: ['GPUUtil', 'MemUsage']
        },
        calculable: true,
        color: ['#3bd0ac', '#15c6e6'],
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: data.x_axis
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'GPUUtil',
          type: 'line',
          areaStyle: {
            color: '#8fe2ce',
            opacity: 0.7
          },
          smooth: true,
          z: 4,
          data: data.gpu_se
        }]
        // 电量
      };this.powUsage.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: 'GPU' + this.gpuId + '_PowUsage(W)',
          left: 20,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          right: 45,
          borderRadius: 0,
          data: ['Power']
        },
        calculable: true,
        color: ['#3bd0ac', '#15c6e6'],
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: data.x_axis
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'Power',
          type: 'line',
          areaStyle: {
            color: '#8fe2ce',
            opacity: 0.7
          },
          smooth: true,
          z: 4,
          data: data.gpu_power_used
        }]
      };
      this.mem.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: 'GPU' + this.gpuId + '_Mem(MB)',
          left: 20,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          right: 45,
          borderRadius: 0,
          data: ['MemTotal', 'MemUsed']
        },
        calculable: true,
        color: ['#3bd0ac', '#15c6e6'],
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: data.x_axis
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'MemTotal',
          type: 'line',
          areaStyle: {
            color: '#8fe2ce',
            opacity: 0.7
          },
          smooth: true,
          z: 4,
          data: data.gpu_ram_max
        }, {
          name: 'MemUsed',
          type: 'line',
          areaStyle: {
            color: '#27d9e9',
            opacity: 0.5
          },
          smooth: true,
          z: 3,
          data: data.gpu_ram_use
        }]
      };
      this.clock.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: 'GPU_GPUFan(%)',
          left: 20,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          right: 45,
          borderRadius: 0,
          data: ['GPUFan']
        },
        calculable: true,
        color: ['#3bd0ac', '#15c6e6'],
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: data.x_axis
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'GPUFan',
          type: 'line',
          areaStyle: {
            color: '#8fe2ce',
            opacity: 0.7
          },
          smooth: true,
          z: 4,
          data: data.fanspeed
        }]
      };
    },
    getData: function getData(uuid) {
      var _this = this;

      this.$get('/system/gpustate', { uuid: uuid }).then(function (data) {
        var dateArr = [];
        var dataChar = {};
        for (var i = 0; i < 6; i++) {
          var timeStr = _this.timestampToTime(i * 120 + data.data.start - 0, 'h:m:s');
          dateArr.push(timeStr);
        }
        dataChar.x_axis = dateArr;
        dataChar.gpu_temp = data.data.gpu_temp_use;
        dataChar.fanspeed = data.data.fanspeed;
        dataChar.gpu_power_used = data.data.gpu_power_used;
        dataChar.gpu_ram_use = data.data.gpu_ram_use;
        dataChar.gpu_ram_max = data.data.gpu_ram_max;
        dataChar.gpu_se = data.data.gpu_se;
        _this.chartData(dataChar);
      });
    }
  },
  created: function created() {
    this.gpuId = this.$route.query.gpuId;
    this.nodeId = this.$route.query.nodeId;
    this.getData(this.nodeId);
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-26949137","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/clusterMonitoring/gpuDetail.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-cluster-monitoring-node-control-detail-gpu"},[_c('div',{staticClass:"item"},[_c('sedu-echarts',{attrs:{"domId":"a","cname":_vm.cname,"option":_vm.gpuTemp.option}})],1),_vm._v(" "),_c('div',{staticClass:"item"},[_c('sedu-echarts',{attrs:{"domId":"b","cname":_vm.cname,"option":_vm.gpuSe.option}})],1),_vm._v(" "),_c('div',{staticClass:"item"},[_c('sedu-echarts',{attrs:{"domId":"c","cname":_vm.cname,"option":_vm.powUsage.option}})],1),_vm._v(" "),_c('div',{staticClass:"item"},[_c('sedu-echarts',{attrs:{"domId":"d","cname":_vm.cname,"option":_vm.mem.option}})],1),_vm._v(" "),_c('div',{staticClass:"item"},[_c('sedu-echarts',{attrs:{"domId":"e","cname":_vm.cname,"option":_vm.clock.option}})],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var clusterMonitoring_gpuDetail = (esExports);
// CONCATENATED MODULE: ./src/views/clusterMonitoring/gpuDetail.vue
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
  gpuDetail,
  clusterMonitoring_gpuDetail,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_clusterMonitoring_gpuDetail = __webpack_exports__["default"] = (Component.exports);


/***/ })

});