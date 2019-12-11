webpackJsonp([26],{

/***/ "eoZR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("bOdI");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./src/util/index.js
var util = __webpack_require__("ZoQJ");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/traningDetails.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var traningDetails = ({
  data: function data() {
    var time = Object(util["e" /* timeData */])();
    return {
      dialogTask: false,
      remarksDialog: false,
      downDialog: false,
      taskName: '',
      taskBasic: '',
      timeValue: '',
      taskarea: '',
      editDisabled: true,
      trainingDetails: [],
      practice_node: '',
      journal: {},
      pickerOptions: time,
      useProject: 'height:400px;',
      taskResourcesData: [],
      resources: '',
      id: '',
      obj: {
        practice_id: ''
      },
      logParams: {
        practice_id: '',
        practice_node: ''
      },
      resource: {
        pod_uid: '',
        time_status: 1
      },
      resourceData: '',
      nodeTime: '',
      nodeObj: {
        id: '',
        node: '',
        end_time: '',
        start_time: '',
        type: 1
      },
      timer: '',
      isDisabled: false
    };
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    window.clearTimeout(this.timer);
    if (to.name === 'projectDetails' && to.query.id === undefined) {
      var id = this.id;
      this.$router.push({
        name: 'projectDetails',
        query: {
          id: id
        }
      });
    } else {
      next();
    }
  },
  created: function created() {
    // 获取不同时间段函数调用
    this.$store.dispatch('getTimestatus');
    this.nodeObj.id = this.logParams.practice_id = this.obj.practice_id = this.$route.query.idTask;
    this.id = this.$route.query.id;
    // 获取训练任务数据函数调用
    this.getDevelopmentDetails(this.obj);
    // 训练任务日志记录
    this.getPracticelog(this.logParams);
    // 获取资源信息数据 函数调用
    this.getResouseData(this.obj);
    // 获取不同时间段函数调用
    this.$store.dispatch('postPracticenode', this.obj);
  },
  mounted: function mounted() {},

  methods: {
    // 获取训练任务详情
    getDevelopmentDetails: function getDevelopmentDetails(obj) {
      var _this = this;

      this.$post('/practiceproject/practicedetail', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 基本信息
          _this.taskBasic = res.data.practice;
          // 环境名称
          _this.taskName = res.data.practice.name;
          // 备注信息
          _this.taskarea = res.data.practice.describe;
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 获取训练任务日志
    getPracticelog: function getPracticelog(obj) {
      var _this2 = this;

      var that = this;
      this.$post('/practiceproject/practicelog', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 训练日志
          if (res.data.length !== 0) {
            _this2.isDisabled = false;
            _this2.journal = res.data.practice_log;
            _this2.timer = setTimeout(function () {
              that.getPracticelog(_this2.logParams);
            }, 10000);
          } else {
            _this2.isDisabled = true;
          }
        } else {
          _this2.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 修改训练任务详情
    getPracticeupdate: function getPracticeupdate(obj) {
      var _this3 = this;

      this.$post('/practiceproject/practiceupdate', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          _this3.$message({
            message: res.message,
            type: 'success'
          });
          // 获取训练任务数据函数调用
          _this3.getDevelopmentDetails(_this3.obj);
          // 训练任务日志记录
          _this3.getPracticelog(_this3.obj);
        } else {
          _this3.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 获取资源信息数据
    getResouseData: function getResouseData(obj) {
      var _this4 = this;

      this.$post('/practiceproject/practiceresource', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          // 资源数据监控
          var data = void 0;
          _this4.trainingDetails = data = res.data;
          for (var i = 0; i < data.length; i++) {
            // 节点资源信息ID
            _this4.resource.pod_uid = data[i].pod_uid;
            _this4.practicenoderesource(_this4.resource, data[i]);
          }
        } else {
          _this4.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 训练任务每一个节点资源使用情况
    practicenoderesource: function practicenoderesource(obj, data) {
      var _this5 = this;

      var color = ['#F17472', '#42E1BB', '#FEC633', '#54BECC'];
      this.$post('/practiceproject/practicenoderesource', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          var echartsData = {};
          var resourceData = res.data;
          resourceData.show.value = Object(util["f" /* toPercent */])(resourceData.show.value);
          resourceData.cpu.value = Object(util["f" /* toPercent */])(resourceData.cpu.value);
          resourceData.memory.value = Object(util["f" /* toPercent */])(resourceData.memory.value);
          resourceData.gpu.value = Object(util["f" /* toPercent */])(resourceData.gpu.value);
          echartsData.echarts = Object(util["b" /* echratsData */])(color, resourceData);
          // 节点名称
          echartsData.node_name = data.ndoe_name;
          // 节点类型
          echartsData.node_type = data.type;
          echartsData.value = 1;
          // 默认时间段
          // echartsData.value = resources[i].value
          _this5.taskResourcesData.push(echartsData);
        } else {
          _this5.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 改变时间段，训练任务每一个节点资源使用情况
    noderesource: function noderesource(obj, item) {
      var _this6 = this;

      var color = ['#F17472', '#42E1BB', '#FEC633', '#54BECC'];
      this.$post('/practiceproject/practicenoderesource', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          _this6.taskResourcesData[item].echarts = Object(util["b" /* echratsData */])(color, res.data);
          _this6.taskResourcesData = [].concat(toConsumableArray_default()(_this6.taskResourcesData));
        } else {
          _this6.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },

    // 确定修改任务名称按钮
    changeDialogSingle: function changeDialogSingle() {
      var name = 'Practice[name]';
      var obj = defineProperty_default()({
        practice_id: this.obj.practice_id
      }, name, this.taskName);
      this.getPracticeupdate(obj);
      this.dialogTask = false;
    },

    // 确定修改备注内容
    remarksDialogSingle: function remarksDialogSingle() {
      var describe = 'Practice[describe]';
      var obj = defineProperty_default()({
        practice_id: this.obj.practice_id
      }, describe, this.taskarea);
      this.getPracticeupdate(obj);
      this.remarksDialog = false;
    },
    handleClose: function handleClose(done) {
      done();
    },

    // 打开修改任务名称的弹出框
    taskEdit: function taskEdit() {
      this.dialogTask = true;
    },

    // 打开修改备注的弹出框
    remarksEdit: function remarksEdit() {
      this.remarksDialog = true;
    },
    trainingIndex: function trainingIndex(index) {
      return index + 1;
    },
    changeLog: function changeLog(val) {
      this.logParams.practice_node = val;
      // 训练任务日志记录
      this.getPracticelog(this.logParams);
    },

    // 下载的日志
    downLog: function downLog() {
      this.downDialog = true;
    },

    // 确定下载日志
    dialogSingleSure: function dialogSingleSure() {
      if (this.nodeTime === '') {
        this.nodeObj = this.nodeObj;
      } else {
        this.nodeObj.start_time = this.nodeTime[0];
        this.nodeObj.end_time = this.nodeTime[1];
      }
      console.log(this.nodeObj);
      this.$store.commit('downloadlog', this.nodeObj);
      this.downDialog = false;
    },
    changeTimes: function changeTimes($event, item) {
      console.log($event);
      this.resource.time_status = $event;
      this.noderesource(this.resource, item);
      // console.log(JSON.stringify(this.taskResourcesData))
    }
  },
  components: {},
  computed: {
    timestatus: function timestatus() {
      return this.$store.getters.postTimestatus;
    },
    practicenode: function practicenode() {
      return this.$store.getters.postPracticenode;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-33e9793a","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/traningDetails.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-personal"},[_c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v(_vm._s(_vm.$t('views.modelPrediction.basicInf')))])]),_vm._v(" "),(_vm.taskBasic !== '')?_c('table',{staticClass:"views-project-details views-tabel-details"},[_c('tr',[_c('td',{staticClass:"views-basic-color1"},[_vm._v("任务名称")]),_vm._v(" "),_c('td',{staticClass:"views-basic-name"},[_c('el-input',{attrs:{"placeholder":"","disabled":_vm.editDisabled},model:{value:(_vm.taskName),callback:function ($$v) {_vm.taskName=$$v},expression:"taskName"}}),_vm._v(" "),_c('i',{staticClass:"iconfont icon-edit views-icon-edit",on:{"click":_vm.taskEdit}})],1),_vm._v(" "),_c('td',{staticClass:"views-basic-color1"},[_vm._v("作业状态")]),_vm._v(" "),_c('td',[(_vm.taskBasic.status==='0')?_c('span',[_vm._v("失败")]):_vm._e(),_vm._v(" "),(_vm.taskBasic.status==='1')?_c('span',[_vm._v("运行中")]):_vm._e(),_vm._v(" "),(_vm.taskBasic.status==='2')?_c('span',[_vm._v("创建中")]):_vm._e(),_vm._v(" "),(_vm.taskBasic.status==='3')?_c('span',[_vm._v("运行成功")]):_vm._e(),_vm._v(" "),(_vm.taskBasic.status==='4')?_c('span',[_vm._v("停止")]):_vm._e()])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color2"},[_vm._v("引擎类型")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},[_vm._v(_vm._s(_vm.taskBasic.engine))]),_vm._v(" "),_c('td',{staticClass:"views-basic-color2"},[_vm._v("ID")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},[_vm._v(_vm._s(_vm.taskBasic.practice_uid))])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color1"},[_vm._v("创建时间")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.taskBasic.created_at))]),_vm._v(" "),_c('td',{staticClass:"views-basic-color1"},[_vm._v("运行时长")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.taskBasic.used_time))])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color2"},[_vm._v("运行参数")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},_vm._l((_vm.taskBasic.param),function(item,key){return _c('span',{key:key},[_c('span',[_vm._v(_vm._s(key)+":")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(item)+";  ")])])})),_vm._v(" "),(_vm.taskBasic.engine==='tensorflow')?_c('td',{staticClass:"views-basic-color2"},[_vm._v("代码目录")]):_vm._e(),_vm._v(" "),(_vm.taskBasic.engine==='tensorflow')?_c('td',{staticClass:"views-basic-color3"},[_vm._v(_vm._s(_vm.taskBasic.mount_info.code_path.s3_path))]):_vm._e(),_vm._v(" "),(_vm.taskBasic.engine==='caffe')?_c('td',{staticClass:"views-basic-color1"},[_vm._v("训练数据路径")]):_vm._e(),_vm._v(" "),(_vm.taskBasic.engine==='caffe')?_c('td',[_vm._v(_vm._s(_vm.taskBasic.mount_info.train_data_dir.s3_path))]):_vm._e()]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color1"},[_vm._v("计算节点个数")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.taskBasic.node_num))]),_vm._v(" "),(_vm.taskBasic.engine==='tensorflow')?_c('td',{staticClass:"views-basic-color1"},[_vm._v("启动文件")]):_vm._e(),_vm._v(" "),(_vm.taskBasic.engine==='tensorflow')?_c('td',[_vm._v(_vm._s(_vm.taskBasic.mount_info.launch_script.s3_path))]):_vm._e(),_vm._v(" "),(_vm.taskBasic.engine==='caffe')?_c('td',{staticClass:"views-basic-color1"},[_vm._v("网络层文件")]):_vm._e(),_vm._v(" "),(_vm.taskBasic.engine==='caffe')?_c('td',[_vm._v(_vm._s(_vm.taskBasic.mount_info.proto_file.s3_path))]):_vm._e()]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color2"},[_vm._v("计算节点规格")]),_vm._v(" "),_c('td',{staticClass:"views-basic-color3"},[_c('span',[_vm._v("\n                    GPU:"+_vm._s(_vm.taskBasic.gpu)+"\n                ")]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v("\n                    CPU:"+_vm._s(_vm.taskBasic.cpu)+"\n                ")]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v("\n                    内存:"+_vm._s(_vm.taskBasic.memory)+"\n                ")])]),_vm._v(" "),(_vm.taskBasic.engine==='tensorflow')?_c('td',{staticClass:"views-basic-color2"},[_vm._v("训练数据集")]):_vm._e(),_vm._v(" "),(_vm.taskBasic.engine==='tensorflow')?_c('td',{staticClass:"views-basic-color3"},[_vm._v(_vm._s(_vm.taskBasic.mount_info.dataset.s3_path))]):_vm._e(),_vm._v(" "),(_vm.taskBasic.engine==='caffe')?_c('td',{staticClass:"views-basic-color1"},[_vm._v("测试数据路径")]):_vm._e(),_vm._v(" "),(_vm.taskBasic.engine==='caffe')?_c('td',[_vm._v(_vm._s(_vm.taskBasic.mount_info.test_data_dir.s3_path))]):_vm._e()]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"views-basic-color1"},[_vm._v("可视化链接")]),_vm._v(" "),_c('td',{staticClass:"views-table-link",attrs:{"colspan":"3"}},[_c('a',{attrs:{"href":_vm.taskBasic.tensorboard_url}},[_vm._v(_vm._s(_vm.taskBasic.tensorboard_url))])])])]):_vm._e(),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"views-develop-remarks"},[_c('div',{staticClass:"views-develop-edit"},[_c('i',{staticClass:"iconfont icon-edit views-icon-edit",on:{"click":_vm.remarksEdit}})]),_vm._v(" "),_c('el-input',{attrs:{"type":"textarea","rows":8,"placeholder":"请输入内容","disabled":_vm.editDisabled},model:{value:(_vm.taskarea),callback:function ($$v) {_vm.taskarea=$$v},expression:"taskarea"}})],1),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"views-task-news"},[_c('div',{staticClass:"views-task-select"},[_c('el-select',{ref:"changeFocus",attrs:{"placeholder":"请选择"},on:{"change":_vm.changeLog},model:{value:(_vm.logParams.practice_node),callback:function ($$v) {_vm.$set(_vm.logParams, "practice_node", $$v)},expression:"logParams.practice_node"}},_vm._l((_vm.practicenode),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})})),_vm._v(" "),_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary","disabled":_vm.isDisabled},on:{"click":_vm.downLog}},[_vm._v("下载日志")])],1)]),_vm._v(" "),_c('p',{staticClass:"views-task-text"},[_vm._v("在运行日志内使用鼠标上下滚动获取更多的日志")]),_vm._v(" "),_c('div',{staticClass:"views-task-log"},[_c('el-scrollbar',{staticStyle:{"height":"100%"}},[_c('div',{staticClass:"veiws-text-log"},_vm._l((_vm.journal),function(item,index){return _c('div',{key:index,staticClass:"views-text-span"},[_c('span',[_vm._v(_vm._s(index)+"：")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(item))])])}))])],1),_vm._v(" "),_vm._m(2),_vm._v(" "),_c('div',{staticClass:"views-table-content"},[_c('el-table',{ref:"multipleTable",staticClass:"tab-content",staticStyle:{"width":"100%"},attrs:{"data":_vm.trainingDetails,"tooltip-effect":"dark","border":""}},[_c('el-table-column',{attrs:{"prop":"ndoe_name","label":"节点名称","width":"110","header-align":"center","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"type","label":"节点类型","width":"100","header-align":"center","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"CPU使用率","header-align":"center","align":"center","width":"100"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v("\n                        "+_vm._s(scope.row.cpu*100)+"%\n                    ")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"memory_use","label":"内存使用","show-overflow-tooltip":"","header-align":"center","align":"center","width":"100"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v("\n                        "+_vm._s(scope.row.memory_use)+"G\n                    ")]),_vm._v("\n                    /"),_c('span',[_vm._v("\n                        "+_vm._s(scope.row.memory_all)+"G\n                    ")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"GPU使用率","header-align":"center","align":"left","show-overflow-tooltip":""},scopedSlots:_vm._u([{key:"default",fn:function(scope){return _vm._l((scope.row.gpu),function(item,key){return _c('span',{key:key,staticClass:"views-table-details views-table-margin",attrs:{"size":"mini"}},[_vm._v("\n                        "+_vm._s(item.name)+" : "+_vm._s(item.value)+"\n                    ")])})}}])}),_vm._v(";\n            "),_c('el-table-column',{attrs:{"label":"显存使用","header-align":"center","align":"left","show-overflow-tooltip":""},scopedSlots:_vm._u([{key:"default",fn:function(scope){return _vm._l((scope.row.show),function(item,key){return _c('span',{key:key,staticClass:"views-table-details views-table-margin",attrs:{"size":"mini"}},[_vm._v("\n                        "+_vm._s(item.name)+" : "+_vm._s(item.value)+"\n                    ")])})}}])})],1),_vm._v(" "),_c('div',{staticClass:"views-charts-box"},_vm._l((_vm.taskResourcesData),function(item,index){return _c('div',{key:index,staticClass:"views-charts-mt views-charts-task"},[_c('div',{staticClass:"views-node-name"},[_c('span',[_vm._v("节点名称："+_vm._s(item.node_name))]),_vm._v(" "),_c('span',[_vm._v("（节点类型："+_vm._s(item.node_type)+"）")])]),_vm._v(" "),_c('div',{staticClass:"views-chats-times"},[_c('el-select',{attrs:{"placeholder":"请选择","name":String(index)},on:{"change":function($event){_vm.changeTimes($event,index)}},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", $$v)},expression:"item.value"}},_vm._l((_vm.timestatus),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('sedu-echarts',{attrs:{"domId":'taskUse'+index,"option":item.echarts,"myStyle":_vm.useProject}})],1)}))],1),_vm._v(" "),_c('el-dialog',{attrs:{"title":"修改任务名称","visible":_vm.dialogTask,"width":"30%","before-close":_vm.handleClose,"top":"30vh","custom-class":"views-dialog"},on:{"update:visible":function($event){_vm.dialogTask=$event}}},[_c('div',{staticClass:"views-dialog-develop"},[_c('span',{staticClass:"views-dialog-name"},[_vm._v("任务名称")]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":""},model:{value:(_vm.taskName),callback:function ($$v) {_vm.taskName=$$v},expression:"taskName"}})],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.dialogDev = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.changeDialogSingle}},[_vm._v("确 定")])],1)]),_vm._v(" "),_c('el-dialog',{attrs:{"title":"修改备注信息","visible":_vm.remarksDialog,"width":"30%","before-close":_vm.handleClose,"top":"30vh","custom-class":"views-dialog"},on:{"update:visible":function($event){_vm.remarksDialog=$event}}},[_c('div',{staticClass:"views-dialog-develop"},[_c('span',{staticClass:"views-dialog-remarks"},[_vm._v("备注信息")]),_vm._v(" "),_c('el-input',{attrs:{"type":"textarea","rows":8,"placeholder":"请输入内容"},model:{value:(_vm.taskarea),callback:function ($$v) {_vm.taskarea=$$v},expression:"taskarea"}})],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.remarksDialog = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.remarksDialogSingle}},[_vm._v("确 定")])],1)]),_vm._v(" "),_c('el-dialog',{attrs:{"title":"下载日志","visible":_vm.downDialog,"width":"30%","before-close":_vm.handleClose,"top":"30vh","custom-class":"views-dialog"},on:{"update:visible":function($event){_vm.downDialog=$event}}},[_c('div',{staticClass:"views-dialog-develop views-dialog-loading"},[_c('div',[_c('span',{staticClass:"tab-select-title tab-select-mg"},[_vm._v("选择节点：")]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose'),"clearable":""},model:{value:(_vm.nodeObj.node),callback:function ($$v) {_vm.$set(_vm.nodeObj, "node", $$v)},expression:"nodeObj.node"}},_vm._l((_vm.practicenode),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',{staticClass:"views-input-box"},[_c('span',{staticClass:"tab-select-title  tab-select-mg"},[_vm._v("选择时间：")]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","editable":false,"range-separator":"-","picker-options":_vm.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":_vm.$t('views.button.startDate'),"end-placeholder":_vm.$t('views.button.endDate'),"default-time":['00:00:00', '23:59:59']},model:{value:(_vm.nodeTime),callback:function ($$v) {_vm.nodeTime=$$v},expression:"nodeTime"}})],1)]),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{staticClass:"cancel",on:{"click":function($event){_vm.downDialog = false}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.dialogSingleSure}},[_vm._v("确 定")])],1)])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v("备注信息")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v("训练日志")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-header-inf"},[_c('span',[_vm._v("资源监控")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var projectSpace_traningDetails = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/traningDetails.vue
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
  traningDetails,
  projectSpace_traningDetails,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_traningDetails = __webpack_exports__["default"] = (Component.exports);


/***/ })

});