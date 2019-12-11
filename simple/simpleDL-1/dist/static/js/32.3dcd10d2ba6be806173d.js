webpackJsonp([32],{

/***/ "e9LZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./src/util/index.js
var util = __webpack_require__("ZoQJ");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/developContent.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var developContent = ({
  data: function data() {
    var time = Object(util["f" /* timeData */])();
    return {
      readonly: false,
      devData: [],
      loading: true,
      timeValue: '',
      pickerOptions: time,
      obj: { // 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        project_id: '',
        image_name: ''
      },
      isCount: false,
      per: 0,
      total: 0,
      currentPage: 1
    };
  },
  created: function created() {
    // 默认请求数据
    this.obj.project_id = this.$route.query.id;
    console.log(this.obj.project_id);
    this.getDevelopmentData(this.obj);
    // 请求开发环境状态数据，函数调用
    this.$store.dispatch('getEnvironmentstatus');
  },
  mounted: function mounted() {
    this.linkIndex = 0;
  },

  watch: {
    $route: function $route(to, from) {
      console.log(this.$route.params.id);
      console.log(this.$route);
    }
  },
  methods: {
    // 请求开发环境的数据
    getDevelopmentData: function getDevelopmentData(obj) {
      var _this = this;

      this.$get('/environmentproject/projectenvironment', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          _this.loading = false;
          _this.devData = [].concat(toConsumableArray_default()(res.data.project_develop));
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
    devIndex: function devIndex(index) {
      return index + 1;
    },

    // 重置
    devleopReset: function devleopReset() {
      var id = this.$route.query.id;
      var obj = { // 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        project_id: id,
        image_name: ''
      };
      this.timeValue = '';
      this.obj = obj;
      return obj;
    },

    // 查询
    devleopSearch: function devleopSearch() {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0;
        this.obj.start_time = 0;
      } else {
        this.obj.end_time = this.timeValue[1];
        this.obj.start_time = this.timeValue[0];
      }
      this.currentPage = 1;
      this.getDevelopmentData(this.obj);
    },

    // 打开创建开发环境界面
    creatDevelop: function creatDevelop() {
      var id = this.$route.query.id;
      this.$router.push({ name: 'creatDevelop', query: { id: id } });
    },

    // 分页
    devCurrentChange: function devCurrentChange(val) {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0;
        this.obj.start_time = 0;
      } else {
        this.obj.end_time = this.timeValue[1];
        this.obj.start_time = this.timeValue[0];
      }
      this.obj.page = val;
      this.getDevelopmentData(this.obj);
    },

    // 删除弹出框
    deleteDialogSingle: function deleteDialogSingle(id) {
      var _this2 = this;

      this.$confirm(this.$t('views.dialogText.deleteConfirm'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning'
      }).then(function () {
        var obj = {
          environment_id: id
        };
        _this2.$post('/environmentproject/environmentdelete', obj).then(function (res) {
          console.log(stringify_default()(res));
          if (res.code === 200) {
            _this2.$message({
              message: res.message,
              type: 'success'
            });
            _this2.getDevelopmentData(_this2.obj);
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
          message: _this2.$t('views.dialogText.cancelled')
        });
      });
    },

    // 生成镜像函数
    mirrorDialog: function mirrorDialog(id) {
      var _this3 = this;

      this.$confirm(this.$t('views.dialogText.images'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning'
      }).then(function () {
        var obj = {
          environment_id: id
        };
        _this3.$post('/environmentproject/environmentsaveimage', obj).then(function (res) {
          console.log(stringify_default()(res));
          if (res.code === 200) {
            _this3.$message({
              message: res.message,
              type: 'success'
            });
            _this3.getDevelopmentData(_this3.obj);
          } else {
            _this3.$message({
              message: res.message,
              type: 'error'
            });
          }
        });
      }).catch(function () {
        _this3.$message({
          type: 'info',
          message: _this3.$t('views.dialogText.cancelled')
        });
      });
    }
  },
  components: {},
  computed: {
    environmentstatus: function environmentstatus() {
      return this.$store.getters.postEnvironmentstatus;
    }
  }

});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1681791e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/developContent.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-project-space"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.development.developmentName')))]),_vm._v(" "),_c('el-input',{staticClass:"views-input-text",attrs:{"placeholder":_vm.$t('views.projectContent.enterContent')},model:{value:(_vm.obj.name),callback:function ($$v) {_vm.$set(_vm.obj, "name", $$v)},expression:"obj.name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.development.status')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose'),"clearable":""},model:{value:(_vm.obj.status),callback:function ($$v) {_vm.$set(_vm.obj, "status", $$v)},expression:"obj.status"}},_vm._l((_vm.environmentstatus),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title "},[_vm._v(_vm._s(_vm.$t('views.development.mirror')))]),_vm._v(" "),_c('el-input',{staticClass:"views-input-text",attrs:{"placeholder":_vm.$t('views.projectContent.enterContent')},model:{value:(_vm.obj.image_name),callback:function ($$v) {_vm.$set(_vm.obj, "image_name", $$v)},expression:"obj.image_name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title "},[_vm._v(_vm._s(_vm.$t('views.table.createTime')))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","editable":false,"range-separator":"-","picker-options":_vm.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":_vm.$t('views.button.startDate'),"end-placeholder":_vm.$t('views.button.endDate'),"default-time":['00:00:00', '23:59:59']},model:{value:(_vm.timeValue),callback:function ($$v) {_vm.timeValue=$$v},expression:"timeValue"}})],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":_vm.devleopReset}},[_vm._v(_vm._s(_vm.$t("views.button.reset")))]),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":_vm.devleopSearch}},[_vm._v(_vm._s(_vm.$t("views.button.search")))])],1)]),_vm._v(" "),_c('div',{staticClass:"views-table-btn"},[_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.creatDevelop}},[_vm._v(_vm._s(_vm.$t('views.development.createdDev')))])],1),_vm._v(" "),_c('div',{staticClass:"views-table-content"},[_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{"width":"100%"},attrs:{"data":_vm.devData,"tooltip-effect":"dark","border":""}},[_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.serial'),"width":"50","type":"index","index":_vm.devIndex,"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.development.developmentName'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('router-link',{staticClass:"views-table-link",attrs:{"to":{name:'developDetails',query:{id:_vm.$route.query.id,idChild:scope.row.id}},"tag":"a"}},[_vm._v(_vm._s(scope.row.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.development.status'),"width":"120","header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticStyle:{"text-align":"left"}},[(scope.row.status==='0')?_c('i',{staticClass:"iconfont icon-yichang views-icon-yichang"}):_vm._e(),_vm._v(" "),(scope.row.status==='0')?_c('span',[_vm._v(_vm._s(_vm.$t('views.status.abnormal')))]):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('i',{staticClass:"iconfont icon-yunhangzhong views-icon-yunhangzhong"}):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('span',[_vm._v(_vm._s(_vm.$t('views.status.running')))]):_vm._e()])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.development.mirror'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',[_vm._v(_vm._s(scope.row.image.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","label":_vm.$t('views.projectContent.createdTime'),"header-align":"center","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"gpu","label":_vm.$t('views.development.card'),"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"describe","label":_vm.$t('views.development.remarks'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.operation'),"header-align":"center","align":"center","width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.status==='1')?_c('span',{staticClass:"views-table-span views-table-margin",attrs:{"size":"mini"},on:{"click":function($event){_vm.mirrorDialog(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t('views.development.mirrorImage')))]):_vm._e(),_vm._v(" "),_c('span',{staticClass:"views-table-span views-table-margin del ",attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.deleteDialogSingle(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t('views.projectContent.delete')))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('div',{staticClass:"views-page"},[_c('el-pagination',{directives:[{name:"show",rawName:"v-show",value:(_vm.isCount),expression:"isCount"}],attrs:{"page-size":_vm.per,"layout":"prev, pager, next","total":_vm.total,"current-page":_vm.currentPage},on:{"current-change":_vm.devCurrentChange,"update:currentPage":function($event){_vm.currentPage=$event}}})],1)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var projectSpace_developContent = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/developContent.vue
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
  developContent,
  projectSpace_developContent,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_developContent = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/trainingTask.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var trainingTask = ({
  data: function data() {
    var time = Object(util["f" /* timeData */])();
    return {
      linkIndex: '',
      trainingTask: [],
      loading: true,
      timeValue: '',
      pickerOptions: time,
      obj: { // 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        project_id: '',
        engine: ''
      },
      isCount: false,
      per: 0,
      total: 0,
      currentPage: 1
    };
  },
  created: function created() {
    // 请求训练任务状态数据，函数调用
    this.$store.dispatch('getPracticestatus');
    // 请求引擎类型数据，函数调用
    this.$store.dispatch('getPracticeengine');
    var id = this.$route.query.id;
    this.obj.project_id = id;
    // 训练任务列表数据请求函数调用
    this.getTraingTaskData(this.obj);
  },
  mounted: function mounted() {
    this.linkIndex = 1;
  },

  methods: {
    handleSelectionChange: function handleSelectionChange(val) {},
    trainingIndex: function trainingIndex(index) {
      return index + 1;
    },

    // 训练任务列表数据请求
    getTraingTaskData: function getTraingTaskData(obj) {
      var _this = this;

      this.$get('/practiceproject/projectpractice', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          _this.loading = false;
          _this.trainingTask = res.data.training_task;
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
            message: res.msg,
            type: 'error'
          });
        }
      });
    },

    // 重置
    taskReset: function taskReset() {
      var id = this.$route.query.id;
      var obj = { // 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        project_id: id,
        engine: ''
      };
      this.timeValue = '';
      this.obj = obj;
      return obj;
    },

    // 查询
    taskSearch: function taskSearch() {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0;
        this.obj.start_time = 0;
      } else {
        this.obj.start_time = this.timeValue[0];
        this.obj.end_time = this.timeValue[1];
      }
      this.currentPage = 1;
      this.getTraingTaskData(this.obj);
    },
    taskCurrentChange: function taskCurrentChange(val) {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0;
        this.obj.start_time = 0;
      } else {
        this.obj.start_time = this.timeValue[0];
        this.obj.end_time = this.timeValue[1];
      }
      this.obj.page = val;
      this.getTraingTaskData(this.obj);
    },
    creatTraining: function creatTraining() {
      var id = this.$route.query.id;
      this.$router.push({ name: 'createTraningTask', query: { id: id } });
    },

    // 打开删除弹出框
    taskDelete: function taskDelete(id) {
      var _this2 = this;

      this.$confirm(this.$t('views.dialogText.deleteConfirm'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning'
      }).then(function () {
        var obj = {
          practice_id: id
        };
        _this2.$post('/practiceproject/practicedelete', obj).then(function (res) {
          if (res.code === 200) {
            _this2.$message({
              message: res.message,
              type: 'success'
            });
            var reset = _this2.taskReset();
            _this2.getTraingTaskData(reset);
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
          message: _this2.$t('views.dialogText.cancelled')
        });
      });
    },

    // 确定停止弹出框
    taskStop: function taskStop(id) {
      var _this3 = this;

      this.$confirm(this.$t('views.dialogText.task'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning'
      }).then(function () {
        var obj = {
          practice_id: id
        };
        _this3.$post('/practiceproject/practicestop', obj).then(function (res) {
          if (res.code === 200) {
            _this3.$message({
              message: res.message,
              type: 'success'
            });
            _this3.getTraingTaskData(_this3.obj);
          } else {
            _this3.$message({
              message: res.message,
              type: 'error'
            });
          }
        });
      }).catch(function () {
        _this3.$message({
          type: 'info',
          message: _this3.$t('views.dialogText.cancelled')
        });
      });
    }
  },
  components: {},
  computed: {
    // 训练任务状态
    practicestatus: function practicestatus() {
      return this.$store.getters.postPracticestatus;
    },

    // 引擎类型
    practiceengine: function practiceengine() {
      return this.$store.getters.postPracticeengine;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6f8b9ada","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/trainingTask.vue
var trainingTask_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-project-space"},[_c('div',{staticClass:"views-input-box"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.trainingTask.trainingName')))]),_vm._v(" "),_c('el-input',{staticClass:"views-input-text",attrs:{"placeholder":_vm.$t('views.projectContent.enterContent')},model:{value:(_vm.obj.name),callback:function ($$v) {_vm.$set(_vm.obj, "name", $$v)},expression:"obj.name"}})],1),_vm._v(" "),(false)?_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.development.status')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.obj.status),callback:function ($$v) {_vm.$set(_vm.obj, "status", $$v)},expression:"obj.status"}},_vm._l((_vm.practicestatus),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1):_vm._e(),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.trainingTask.engineType')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.obj.engine),callback:function ($$v) {_vm.$set(_vm.obj, "engine", $$v)},expression:"obj.engine"}},_vm._l((_vm.practiceengine),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.table.createTime')))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","editable":false,"range-separator":"-","picker-options":_vm.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":_vm.$t('views.button.startDate'),"end-placeholder":_vm.$t('views.button.endDate'),"default-time":['00:00:00', '23:59:59']},model:{value:(_vm.timeValue),callback:function ($$v) {_vm.timeValue=$$v},expression:"timeValue"}})],1),_vm._v(" "),_c('div',[(false)?_c('el-button',{staticClass:"btn light small",on:{"click":_vm.taskReset}},[_vm._v(_vm._s(_vm.$t("views.button.reset")))]):_vm._e(),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":_vm.taskSearch}},[_vm._v(_vm._s(_vm.$t("views.button.search")))])],1)])]),_vm._v(" "),_c('div',{staticClass:"views-table-btn"},[_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.creatTraining}},[_vm._v("\n            "+_vm._s(_vm.$t('views.trainingTask.createtask'))+"\n        ")])],1),_vm._v(" "),_c('div',{staticClass:"views-table-content"},[_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{"width":"100%"},attrs:{"data":_vm.trainingTask,"tooltip-effect":"dark","border":""},on:{"selection-change":_vm.handleSelectionChange}},[_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.serial'),"width":"50","type":"index","index":_vm.trainingIndex,"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.trainingTask.trainingName'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('router-link',{staticClass:"views-table-link",attrs:{"to":{name:'traningDetails',query:{id:_vm.$route.query.id,idTask:scope.row.id}},"tag":"a"}},[_vm._v(_vm._s(scope.row.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.development.status'),"width":"120","header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticStyle:{"text-align":"left"}},[(scope.row.status==='0')?_c('i',{staticClass:"iconfont icon-stop views-icon-error"}):_vm._e(),_vm._v(" "),(scope.row.status==='0')?_c('span',[_vm._v(_vm._s(_vm.$t('views.status.error')))]):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('i',{staticClass:"iconfont icon-yunhangzhong views-icon-yunhangzhong"}):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('span',[_vm._v(_vm._s(_vm.$t('views.status.running')))]):_vm._e(),_vm._v(" "),(scope.row.status==='2')?_c('i',{staticClass:"iconfont icon-warning views-icon-chuangjian"}):_vm._e(),_vm._v(" "),(scope.row.status==='2')?_c('span',[_vm._v("创建中")]):_vm._e(),_vm._v(" "),(scope.row.status==='3')?_c('i',{staticClass:"iconfont icon-chenggong views-icon-success"}):_vm._e(),_vm._v(" "),(scope.row.status==='3')?_c('span',[_vm._v("运行成功")]):_vm._e(),_vm._v(" "),(scope.row.status==='4')?_c('i',{staticClass:"iconfont icon-stop views-icon-stop"}):_vm._e(),_vm._v(" "),(scope.row.status==='4')?_c('span',[_vm._v(_vm._s(_vm.$t('views.status.stop')))]):_vm._e()])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"engine","label":_vm.$t('views.trainingTask.engineType'),"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","label":_vm.$t('views.projectContent.createdTime'),"header-align":"center","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.trainingTask.runningTime'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v("\n                    "+_vm._s(scope.row.used_time)+"s\n                ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":" describe","label":_vm.$t('views.development.remarks'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.trainingTask.startFile'),"show-overflow-tooltip":"","header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.engine==='tensorflow')?_c('span',[_vm._v("\n                        "+_vm._s(scope.row.mount_info.launch_script.s3_path)+"\n                    ")]):_vm._e(),_vm._v(" "),(scope.row.engine==='caffe')?_c('span',[_vm._v("\n                        "+_vm._s(scope.row.mount_info.proto_file.s3_path)+"\n                    ")]):_vm._e()]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.operation'),"header-align":"center","align":"center","width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.status==='1')?_c('span',{staticClass:"views-table-span views-table-margin",attrs:{"size":"mini"},on:{"click":function($event){_vm.taskStop(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t('views.trainingTask.stop')))]):_vm._e(),_vm._v(" "),_c('span',{staticClass:"views-table-span views-table-margin del",attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.taskDelete(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t('views.projectContent.delete')))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('div',{staticClass:"views-page"},[(_vm.isCount)?_c('el-pagination',{attrs:{"page-size":_vm.per,"layout":"prev, pager, next","total":_vm.total,"current-page":_vm.currentPage},on:{"current-change":_vm.taskCurrentChange,"update:currentPage":function($event){_vm.currentPage=$event}}}):_vm._e()],1)],1)])}
var trainingTask_staticRenderFns = []
var trainingTask_esExports = { render: trainingTask_render, staticRenderFns: trainingTask_staticRenderFns }
/* harmony default export */ var projectSpace_trainingTask = (trainingTask_esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/trainingTask.vue
var trainingTask_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var trainingTask___vue_template_functional__ = false
/* styles */
var trainingTask___vue_styles__ = null
/* scopeId */
var trainingTask___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var trainingTask___vue_module_identifier__ = null
var trainingTask_Component = trainingTask_normalizeComponent(
  trainingTask,
  projectSpace_trainingTask,
  trainingTask___vue_template_functional__,
  trainingTask___vue_styles__,
  trainingTask___vue_scopeId__,
  trainingTask___vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_trainingTask = (trainingTask_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/modelPrediction.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var modelPrediction = ({
  data: function data() {
    var time = Object(util["f" /* timeData */])();
    return {
      timeValue: '',
      modelPrediction: [],
      pickerOptions: time,
      obj: { // 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        project_id: '',
        engine: ''
      },
      loading: true,
      isCount: false,
      per: 0,
      total: 0,
      currentPage: 1
    };
  },
  created: function created() {
    // 请求模型预测状态,函数调用
    this.$store.dispatch('getModelstatus');
    // 请求模型预测引擎类型,函数调用
    this.$store.dispatch('getModelengine');
    var id = this.$route.query.id;
    this.obj.project_id = id;
    // 请求模型预测列表数据
    this.getModelPrediction(this.obj);
  },
  mounted: function mounted() {
    this.linkIndex = 1;
  },

  methods: {
    trainingIndex: function trainingIndex(index) {
      return index + 1;
    },
    getModelPrediction: function getModelPrediction(obj) {
      var _this = this;

      this.$get('/model/modelprediction', obj).then(function (res) {
        if (res.code === 200) {
          // console.log(JSON.stringify(res))
          _this.loading = false;
          _this.modelPrediction = res.data.model_prediction;
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
    modelReset: function modelReset() {
      var id = this.$route.query.id;
      var obj = { // 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        project_id: id,
        engine: ''
      };
      this.timeValue = '';
      this.obj = obj;
      return obj;
    },

    // 查询
    modelSearch: function modelSearch() {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0;
        this.obj.start_time = 0;
      } else {
        this.obj.start_time = this.timeValue[0];
        this.obj.end_time = this.timeValue[1];
      }
      this.currentPage = 1;
      this.getModelPrediction(this.obj);
    },

    // 分页
    modelCurrentChange: function modelCurrentChange(val) {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0;
        this.obj.start_time = 0;
      } else {
        this.obj.start_time = this.timeValue[0];
        this.obj.end_time = this.timeValue[1];
      }
      this.obj.page = val;
      this.getModelPrediction(this.obj);
    },
    createModel: function createModel() {
      var id = this.$route.query.id;
      this.$router.push({ name: 'createModelJob', query: { id: id } });
    },

    // 打开删除弹出框
    modelDelete: function modelDelete(id) {
      var _this2 = this;

      this.$confirm(this.$t('views.dialogText.deleteConfirm'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning'
      }).then(function () {
        var obj = {
          model_id: id
        };
        _this2.$post('/model/modelpredictiondelete', obj).then(function (res) {
          if (res.code === 200) {
            _this2.$message({
              message: res.message,
              type: 'success'
            });
            _this2.getModelPrediction(_this2.obj);
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
          message: _this2.$t('views.dialogText.cancelled')
        });
      });
    },

    // 打开停止弹出框
    stopModel: function stopModel(index, row) {
      var id = row.model_id;
      this.stopDialogSingle(id);
    },

    // 确定删除弹出框
    deleteDialogSingle: function deleteDialogSingle(i, id) {},

    // 确定停止弹出框
    stopDialogSingle: function stopDialogSingle(id) {
      var _this3 = this;

      this.$confirm('确定停止该模型预测?', '停止模型预测', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var error = _this3.$t('views.projectContent.requestError');
        var obj = {
          model_id: id
        };
        _this3.$post('personal-space/model-stop', obj, error).then(function (res) {
          _this3.$message({
            message: res.msg,
            type: 'success'
          });
        });
      }).catch(function () {
        _this3.$message({
          type: 'info',
          message: '已取消停止'
        });
      });
    }
  },
  components: {},
  computed: {
    modelstatus: function modelstatus() {
      // 模型预测状态
      return this.$store.getters.postModelstatus;
    },
    modelengine: function modelengine() {
      // 引擎类型
      return this.$store.getters.postModelengine;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-72a8e324","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/modelPrediction.vue
var modelPrediction_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-project-space"},[_c('div',{staticClass:"views-input-box"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.modelPrediction.modelJobName')))]),_vm._v(" "),_c('el-input',{staticClass:"views-input-text",attrs:{"placeholder":_vm.$t('views.projectContent.enterContent')},model:{value:(_vm.obj.name),callback:function ($$v) {_vm.$set(_vm.obj, "name", $$v)},expression:"obj.name"}})],1),_vm._v(" "),(false)?_c('div',[_c('span',{staticClass:"tab-select-title "},[_vm._v(_vm._s(_vm.$t('views.development.status')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.obj.status),callback:function ($$v) {_vm.$set(_vm.obj, "status", $$v)},expression:"obj.status"}},_vm._l((_vm.modelstatus),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1):_vm._e(),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title "},[_vm._v(_vm._s(_vm.$t('views.trainingTask.engineType')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose')},model:{value:(_vm.obj.engine),callback:function ($$v) {_vm.$set(_vm.obj, "engine", $$v)},expression:"obj.engine"}},_vm._l((_vm.modelengine),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title "},[_vm._v(_vm._s(_vm.$t('views.table.createTime')))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","editable":false,"range-separator":"-","picker-options":_vm.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":_vm.$t('views.button.startDate'),"end-placeholder":_vm.$t('views.button.endDate'),"default-time":['00:00:00', '23:59:59']},model:{value:(_vm.timeValue),callback:function ($$v) {_vm.timeValue=$$v},expression:"timeValue"}})],1),_vm._v(" "),_c('div',[(false)?_c('el-button',{staticClass:"btn light small",on:{"click":_vm.modelReset}},[_vm._v(_vm._s(_vm.$t("views.button.reset")))]):_vm._e(),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":_vm.modelSearch}},[_vm._v(_vm._s(_vm.$t("views.button.search")))])],1)])]),_vm._v(" "),_c('div',{staticClass:"views-table-btn"},[_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.createModel}},[_vm._v(_vm._s(_vm.$t('views.modelPrediction.createModel')))])],1),_vm._v(" "),_c('div',{staticClass:"views-table-content"},[_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{"width":"100%"},attrs:{"data":_vm.modelPrediction,"tooltip-effect":"dark","border":""}},[_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.serial'),"width":"50","type":"index","index":_vm.trainingIndex,"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.modelPrediction.modelJobName'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('router-link',{staticClass:"views-table-link",attrs:{"to":{name:'modelDetails',query:{id:_vm.$route.query.id,idModel:scope.row.id}},"tag":"a"}},[_vm._v(_vm._s(scope.row.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.development.status'),"width":"120","header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticStyle:{"text-align":"left"}},[(scope.row.status==='0')?_c('i',{staticClass:"iconfont icon-warning views-icon-warning"}):_vm._e(),_vm._v(" "),(scope.row.status==='0')?_c('span',[_vm._v("运行失败")]):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('i',{staticClass:"iconfont icon-yunhangzhong views-icon-yunhangzhong"}):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('span',[_vm._v(_vm._s(_vm.$t('views.status.running')))]):_vm._e()])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.modelPrediction.useModel'),"header-align":"center","align":"center","show-overflow-tooltip":""},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',[_vm._v("\n                        "+_vm._s(scope.row.mount_info.model_path.s3_path)+"\n                    ")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"engine","label":_vm.$t('views.trainingTask.engineType'),"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","label":_vm.$t('views.projectContent.createdTime'),"header-align":"center","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"ip","label":_vm.$t('views.modelPrediction.serverAddress'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.trainingTask.runningTime'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v("\n                    "+_vm._s(scope.row.used_time)+"s\n                ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"describe","label":_vm.$t('views.development.remarks'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.operation'),"header-align":"center","align":"center","width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',{staticClass:"views-table-span views-table-margin del",attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.modelDelete(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t('views.projectContent.delete')))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('div',{staticClass:"views-page"},[(_vm.isCount)?_c('el-pagination',{attrs:{"page-size":_vm.per,"layout":"prev, pager, next","total":_vm.total,"current-page":_vm.currentPage},on:{"current-change":_vm.modelCurrentChange,"update:currentPage":function($event){_vm.currentPage=$event}}}):_vm._e()],1)],1)])}
var modelPrediction_staticRenderFns = []
var modelPrediction_esExports = { render: modelPrediction_render, staticRenderFns: modelPrediction_staticRenderFns }
/* harmony default export */ var projectSpace_modelPrediction = (modelPrediction_esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/modelPrediction.vue
var modelPrediction_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var modelPrediction___vue_template_functional__ = false
/* styles */
var modelPrediction___vue_styles__ = null
/* scopeId */
var modelPrediction___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var modelPrediction___vue_module_identifier__ = null
var modelPrediction_Component = modelPrediction_normalizeComponent(
  modelPrediction,
  projectSpace_modelPrediction,
  modelPrediction___vue_template_functional__,
  modelPrediction___vue_styles__,
  modelPrediction___vue_scopeId__,
  modelPrediction___vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_modelPrediction = (modelPrediction_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/projectDetails.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 开发环境

// 训练任务

// 模型预测


/* harmony default export */ var projectDetails = ({
  data: function data() {
    return {
      projectData: '',
      activeName: 'second'
    };
  },
  created: function created() {
    // 请求项目详情数据函数调用
    // this.$store.dispatch('getProjectDetails')
    var id = this.$route.query.id;
    //  console.log(id)
    var active = localStorage.getItem('activeName');
    this.activeName = active;
    var obj = {
      project_id: id
    };
    this.getProjectDetails(obj);
  },
  mounted: function mounted() {},

  methods: {
    // 请求项目详情数据函数
    getProjectDetails: function getProjectDetails(obj) {
      var _this = this;

      this.$get('/project/projectdetail', obj).then(function (res) {
        //  console.log(JSON.stringify(res))
        if (res.code === 200) {
          _this.projectData = res.data;
        } else {
          _this.$message({
            message: res.message,
            type: 'error'
          });
        }
      });
    },
    handleSelect: function handleSelect(key, keyPath) {
      var activeIndex = key + '';
      window.localStorage.setItem('activeIndex', activeIndex);
    },
    handleClick: function handleClick(tab, event) {
      this.activeName = tab.name;
      localStorage.setItem('activeName', this.activeName);
    }
  },
  components: { ViewsDevelopContent: views_projectSpace_developContent, ViewsTrainingTask: views_projectSpace_trainingTask, ViewsModelPrediction: views_projectSpace_modelPrediction },
  computed: {}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-434fd004","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/projectDetails.vue
var projectDetails_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('table',{staticClass:"views-project-details"},[_c('tr',[_c('td',[_vm._v(_vm._s(_vm.$t('views.projectContent.projectName')))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.projectData.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.$t('views.projectContent.createdTime')))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.projectData.created_at))])]),_vm._v(" "),_c('tr',[_c('td',[_vm._v(_vm._s(_vm.$t('views.projectContent.projectQuota')))]),_vm._v(" "),_c('td',[_c('span',{},[_vm._v("CPU："+_vm._s(_vm.projectData.cpu)+_vm._s(_vm.$t('views.projectContent.unit')))]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v(_vm._s(_vm.$t('views.projectContent.memory'))+"："+_vm._s(_vm.projectData.memory)+"(G)")]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v("GPU："+_vm._s(_vm.projectData.gpu)+_vm._s(_vm.$t('views.projectContent.unit')))])]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.$t('views.projectContent.alreadyUsed')))]),_vm._v(" "),_c('td',[_c('span',[_vm._v("CPU："+_vm._s(_vm.projectData.use_cpu)+" "+_vm._s(_vm.$t('views.projectContent.unit')))]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v(_vm._s(_vm.$t('views.projectContent.memory'))+"："+_vm._s(_vm.projectData.use_memory)+"(G)")]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v("GPU："+_vm._s(_vm.projectData.use_gpu)+" "+_vm._s(_vm.$t('views.projectContent.unit'))+"\n                ")])])])]),_vm._v(" "),_c('div',{staticClass:"views-development"},[_c('el-tabs',{on:{"tab-click":_vm.handleClick},model:{value:(_vm.activeName),callback:function ($$v) {_vm.activeName=$$v},expression:"activeName"}},[(false)?_c('el-tab-pane',{attrs:{"label":_vm.$t('views.development.development'),"name":"first"}},[_c('views-develop-content')],1):_vm._e(),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":_vm.$t('views.trainingTask.trainingTask'),"name":"second"}},[_c('views-training-task')],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":_vm.$t('views.modelPrediction.modelPrediction'),"name":"third"}},[_c('views-model-prediction')],1)],1)],1)])}
var projectDetails_staticRenderFns = []
var projectDetails_esExports = { render: projectDetails_render, staticRenderFns: projectDetails_staticRenderFns }
/* harmony default export */ var projectSpace_projectDetails = (projectDetails_esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/projectDetails.vue
var projectDetails_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var projectDetails___vue_template_functional__ = false
/* styles */
var projectDetails___vue_styles__ = null
/* scopeId */
var projectDetails___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var projectDetails___vue_module_identifier__ = null
var projectDetails_Component = projectDetails_normalizeComponent(
  projectDetails,
  projectSpace_projectDetails,
  projectDetails___vue_template_functional__,
  projectDetails___vue_styles__,
  projectDetails___vue_scopeId__,
  projectDetails___vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_projectDetails = __webpack_exports__["default"] = (projectDetails_Component.exports);


/***/ })

});