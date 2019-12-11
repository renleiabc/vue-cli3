webpackJsonp([30],{

/***/ "HrvH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/util/index.js
var util = __webpack_require__("ZoQJ");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/partDevelopContent.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var partDevelopContent = ({
  data: function data() {
    var time = Object(util["e" /* timeData */])();
    return {
      readonly: false,
      timeValue: '',
      devData: [],
      loading: true,
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
    this.obj.project_id = this.$route.query.partId;
    this.getDevelopmentData(this.obj);
    // 请求开发环境状态数据，函数调用
    this.$store.dispatch('getEnvironmentstatus');
  },
  mounted: function mounted() {
    this.linkIndex = 0;
  },

  methods: {
    // 请求开发环境的数据
    getDevelopmentData: function getDevelopmentData(obj) {
      var _this = this;

      this.$get('/environmentproject/projectenvironment', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          _this.loading = false;
          _this.devData = res.data.project_develop;
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

    // 状态选择
    searchStatus: function searchStatus(val) {
      console.log(val);
    },
    handleSelectionChange: function handleSelectionChange(val) {},
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
        this.obj.end_time = this.timeValue[0];
        this.obj.start_time = this.timeValue[1];
      }
      this.getDevelopmentData(this.obj);
    },

    // 打开创建开发环境界面
    creatDevelop: function creatDevelop() {
      var partId = this.$route.query.partId;
      this.$router.push({ name: 'partCreatDevelop', query: { partId: partId } });
    },

    // 分页
    devCurrentChange: function devCurrentChange(val) {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0;
        this.obj.start_time = 0;
      } else {
        this.obj.end_time = this.timeValue[0];
        this.obj.start_time = this.timeValue[1];
      }
      this.obj.page = val;
      this.getDevelopmentData(this.obj);
    },

    // 打开删除弹出框
    devDelete: function devDelete(index, row) {
      var i = index;
      var id = row.develop_id;
      this.deleteDialogSingle(i, id);
    },

    // 打开生成镜像弹出框
    mirrorImage: function mirrorImage(index, row) {
      var id = row.develop_id;
      this.mirrorDialog(id);
    },

    // 确定删除弹出框
    deleteDialogSingle: function deleteDialogSingle(i, id) {
      var _this2 = this;

      this.$confirm('确定删除该开发环境?', '删除开发环境', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        // 删除单个行
        // console.log(this.$route.params.id)
        var error = _this2.$t('views.projectContent.requestError');
        var obj = {
          develop_id: id
        };
        _this2.$post('/project-space/delete-develop', obj, error).then(function (res) {
          // console.log(JSON.stringify(res))
          var msg = res.msg;
          _this2.$message({
            message: msg,
            type: 'success'
          });
          _this2.devData.splice(i, 1);
        });
      }).catch(function () {
        _this2.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 确定生成镜像函数
    mirrorDialog: function mirrorDialog(id) {
      var _this3 = this;

      this.$confirm('确定生成镜像?', '生成镜像', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        // console.log(this.$route.params.id)
        var error = _this3.$t('views.projectContent.requestError');
        var id = _this3.develop_id;
        _this3.$get('/project-space/create-image', id, error).then(function (res) {
          // console.log(JSON.stringify(res))
          var msg = res.msg;
          _this3.$message({
            message: msg,
            type: 'success'
          });
        });
      }).catch(function () {
        _this3.$message({
          type: 'info',
          message: '已取取消生成镜像'
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-74a2a9a2","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/partDevelopContent.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-project-space"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.development.developmentName')))]),_vm._v(" "),_c('el-input',{staticClass:"views-input-text",attrs:{"placeholder":_vm.$t('views.projectContent.enterContent')},model:{value:(_vm.obj.name),callback:function ($$v) {_vm.$set(_vm.obj, "name", $$v)},expression:"obj.name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.development.status')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":"请选择","clearable":""},on:{"change":_vm.searchStatus},model:{value:(_vm.obj.status),callback:function ($$v) {_vm.$set(_vm.obj, "status", $$v)},expression:"obj.status"}},_vm._l((_vm.environmentstatus),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.development.mirror')))]),_vm._v(" "),_c('el-input',{staticClass:"views-input-text",attrs:{"placeholder":_vm.$t('views.projectContent.enterContent')},model:{value:(_vm.obj.image_name),callback:function ($$v) {_vm.$set(_vm.obj, "image_name", $$v)},expression:"obj.image_name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.table.createTime')))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","editable":false,"range-separator":"-","picker-options":_vm.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":_vm.$t('views.button.startDate'),"end-placeholder":_vm.$t('views.button.endDate'),"default-time":['00:00:00', '23:59:59']},model:{value:(_vm.timeValue),callback:function ($$v) {_vm.timeValue=$$v},expression:"timeValue"}})],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":_vm.devleopReset}},[_vm._v(_vm._s(_vm.$t("views.button.reset")))]),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":_vm.devleopSearch}},[_vm._v(_vm._s(_vm.$t("views.button.search")))])],1)]),_vm._v(" "),_c('div',{staticClass:"views-table-btn"},[_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.creatDevelop}},[_vm._v(_vm._s(_vm.$t('views.development.createdDev')))])],1),_vm._v(" "),_c('div',{staticClass:"views-table-content"},[_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{"width":"100%"},attrs:{"data":_vm.devData,"tooltip-effect":"dark","border":""},on:{"selection-change":_vm.handleSelectionChange}},[_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.serial'),"width":"50","type":"index","index":_vm.devIndex,"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.development.developmentName '),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('router-link',{staticClass:"views-table-link",attrs:{"to":{name:'partDevelopDetails',query:{partId:_vm.$route.query.partId,idDevelop:scope.row.id}},"tag":"a"}},[_vm._v(_vm._s(scope.row.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.development.status'),"width":"120","header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticStyle:{"text-align":"left"}},[(scope.row.status==='0')?_c('i',{staticClass:"iconfont icon-yiguanbi views-icon-yiguanbi"}):_vm._e(),_vm._v(" "),(scope.row.status==='0')?_c('span',[_vm._v("异常")]):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('i',{staticClass:"iconfont icon-yunhangzhong views-icon-yunhangzhong"}):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('span',[_vm._v("运行中")]):_vm._e(),_vm._v(" "),(scope.row.status==='2')?_c('i',{staticClass:"iconfont icon-shanchu views-icon-shanchu"}):_vm._e(),_vm._v(" "),(scope.row.status==='2')?_c('span',[_vm._v("已删除")]):_vm._e()])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.development.mirror'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',[_vm._v(_vm._s(scope.row.image.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","label":_vm.$t('views.projectContent.createdTime'),"header-align":"center","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"gpu","label":_vm.$t('views.development.card'),"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"describe","label":_vm.$t('views.development.remarks'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.operation'),"header-align":"center","align":"center","width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.status==='1')?_c('span',{staticClass:"views-table-span views-table-margin",attrs:{"size":"mini"},on:{"click":function($event){_vm.mirrorImage(scope.$index,scope.row)}}},[_vm._v(_vm._s(_vm.$t('views.development.mirrorImage')))]):_vm._e(),_vm._v(" "),_c('span',{staticClass:"views-table-span views-table-margin del ",attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.devDelete(scope.$index, scope.row)}}},[_vm._v(_vm._s(_vm.$t('views.projectContent.delete')))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('div',{staticClass:"views-page"},[_c('el-pagination',{directives:[{name:"show",rawName:"v-show",value:(_vm.isCount),expression:"isCount"}],attrs:{"page-size":_vm.per,"layout":"prev, pager, next","total":_vm.total,"current-page":_vm.currentPage},on:{"current-change":_vm.devCurrentChange,"update:currentPage":function($event){_vm.currentPage=$event}}})],1)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var projectSpace_partDevelopContent = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/partDevelopContent.vue
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
  partDevelopContent,
  projectSpace_partDevelopContent,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_partDevelopContent = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/partTrainingTask.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var partTrainingTask = ({
  data: function data() {
    var time = Object(util["e" /* timeData */])();
    return {
      linkIndex: '',
      trainingTask: [],
      num: 11,
      index: '',
      loading: true,
      task_id: '',
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
    var id = this.$route.query.partId;
    this.obj.project_id = id;
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
      var id = this.$route.query.partId;
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
        this.obj.end_time = this.timeValue[0];
        this.obj.start_time = this.timeValue[1];
      }
      this.currentPage = 1;
      this.getTraingTaskData(this.obj);
    },
    taskCurrentChange: function taskCurrentChange(val) {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0;
        this.obj.start_time = 0;
      } else {
        this.obj.end_time = this.timeValue[0];
        this.obj.start_time = this.timeValue[1];
      }
      this.obj.page = val;
      this.getTraingTaskData(this.obj);
    },
    creatTraining: function creatTraining() {
      var id = this.$route.query.partId;
      this.$router.push({ name: 'partCreateTraningTask', query: { partId: id } });
    },

    // 打开删除弹出框
    taskDelete: function taskDelete(index, row) {
      var i = index;
      var id = row.model_id;
      this.deleteDialogSingle(i, id);
    },

    // 打开停止弹出框
    taskStop: function taskStop(index, row) {
      var id = row.model_id;
      this.stopDialogSingle(id);
    },

    // 确定删除弹出框
    deleteDialogSingle: function deleteDialogSingle(i, id) {
      var _this2 = this;

      this.$confirm('确定删除该训练任务?', '删除训练任务', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var obj = {
          task_id: id
        };
        var error = _this2.$t('views.projectContent.requestError');
        _this2.$post('personal-space/delete-task', obj, error).then(function (res) {
          _this2.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          });
          _this2.trainingTask.splice(i, 1);
          _this2.dialogTask = false;
        });
      }).catch(function () {
        _this2.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 确定停止弹出框
    stopDialogSingle: function stopDialogSingle(id) {
      var _this3 = this;

      this.$confirm('确定停止该训练任务?', '停止训练任务', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var obj = {
          task_id: _this3.task_id
        };
        var error = _this3.$t('views.projectContent.requestError');
        _this3.$post('personal-space/task-stop', obj, error).then(function (res) {
          _this3.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          });

          _this3.dialogStop = false;
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-82829f94","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/partTrainingTask.vue
var partTrainingTask_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-project-space"},[_c('div',{staticClass:"views-input-box"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.trainingTask.trainingName')))]),_vm._v(" "),_c('el-input',{staticClass:"views-input-text",attrs:{"placeholder":_vm.$t('views.projectContent.enterContent')},model:{value:(_vm.obj.name),callback:function ($$v) {_vm.$set(_vm.obj, "name", $$v)},expression:"obj.name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.development.status')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.obj.status),callback:function ($$v) {_vm.$set(_vm.obj, "status", $$v)},expression:"obj.status"}},_vm._l((_vm.practicestatus),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.trainingTask.engineType')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.obj.engine),callback:function ($$v) {_vm.$set(_vm.obj, "engine", $$v)},expression:"obj.engine"}},_vm._l((_vm.practiceengine),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.table.createTime')))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","editable":false,"range-separator":"-","picker-options":_vm.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":_vm.$t('views.button.startDate'),"end-placeholder":_vm.$t('views.button.endDate'),"default-time":['00:00:00', '23:59:59']},model:{value:(_vm.timeValue),callback:function ($$v) {_vm.timeValue=$$v},expression:"timeValue"}})],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":_vm.taskReset}},[_vm._v(_vm._s(_vm.$t("views.button.reset")))]),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":_vm.taskSearch}},[_vm._v(_vm._s(_vm.$t("views.button.search")))])],1)])]),_vm._v(" "),_c('div',{staticClass:"views-table-btn"},[_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.creatTraining}},[_vm._v(_vm._s(_vm.$t('views.trainingTask.createtask')))])],1),_vm._v(" "),_c('div',{staticClass:"views-table-content"},[_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{"width":"100%"},attrs:{"data":_vm.trainingTask,"tooltip-effect":"dark","border":""},on:{"selection-change":_vm.handleSelectionChange}},[_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.serial'),"width":"50","type":"index","index":_vm.trainingIndex,"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.trainingTask.trainingName'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('router-link',{staticClass:"views-table-link",attrs:{"to":{name:'partTraningDetails',query:{partId:_vm.$route.query.partId,partTaskId:scope.row.id}},"tag":"a"}},[_vm._v(_vm._s(scope.row.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.development.status'),"width":"120","header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticStyle:{"text-align":"left"}},[(scope.row.status==='0')?_c('i',{staticClass:"iconfont icon-stop views-icon-stop"}):_vm._e(),_vm._v(" "),(scope.row.status==='0')?_c('span',[_vm._v("已停止")]):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('i',{staticClass:"iconfont icon-yunhangzhong views-icon-yunhangzhong"}):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('span',[_vm._v("运行中")]):_vm._e(),_vm._v(" "),(scope.row.status==='2')?_c('i',{staticClass:"iconfont icon-warning views-icon-warning"}):_vm._e(),_vm._v(" "),(scope.row.status==='2')?_c('span',[_vm._v("运行失败")]):_vm._e(),_vm._v(" "),(scope.row.status==='3')?_c('i',{staticClass:"iconfont icon-chenggong views-icon-success"}):_vm._e(),_vm._v(" "),(scope.row.status==='3')?_c('span',[_vm._v("运行成功")]):_vm._e()])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"engine","label":_vm.$t('views.trainingTask.engineType'),"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","label":_vm.$t('views.projectContent.createdTime'),"header-align":"center","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.trainingTask.runningTime'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v("\n                    "+_vm._s(scope.row.used_time)+"s\n                ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"describe","label":_vm.$t('views.development.remarks'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.trainingTask.startFile'),"show-overflow-tooltip":"","header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.engine==='tensorflow')?_c('span',[_vm._v("\n                        "+_vm._s(scope.row.mount_info.launch_script.s3_path)+"\n                    ")]):_vm._e(),_vm._v(" "),(scope.row.engine==='caffe')?_c('span',[_vm._v("\n                        "+_vm._s(scope.row.mount_info.proto_file.s3_path)+"\n                    ")]):_vm._e()]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.operation'),"header-align":"center","align":"center","width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.status==='1')?_c('span',{staticClass:"views-table-span views-table-margin",attrs:{"size":"mini"},on:{"click":function($event){_vm.taskStop(scope.$index, scope.row)}}},[_vm._v(_vm._s(_vm.$t('views.trainingTask.stop')))]):_vm._e(),_vm._v(" "),_c('span',{staticClass:"views-table-span views-table-margin del",attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.taskDelete(scope.$index, scope.row)}}},[_vm._v(_vm._s(_vm.$t('views.projectContent.delete')))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('div',{staticClass:"views-page"},[(_vm.isCount)?_c('el-pagination',{attrs:{"page-size":_vm.per,"layout":"prev, pager, next","total":_vm.total,"current-page":_vm.currentPage},on:{"current-change":_vm.taskCurrentChange,"update:currentPage":function($event){_vm.currentPage=$event}}}):_vm._e()],1)],1)])}
var partTrainingTask_staticRenderFns = []
var partTrainingTask_esExports = { render: partTrainingTask_render, staticRenderFns: partTrainingTask_staticRenderFns }
/* harmony default export */ var projectSpace_partTrainingTask = (partTrainingTask_esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/partTrainingTask.vue
var partTrainingTask_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var partTrainingTask___vue_template_functional__ = false
/* styles */
var partTrainingTask___vue_styles__ = null
/* scopeId */
var partTrainingTask___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var partTrainingTask___vue_module_identifier__ = null
var partTrainingTask_Component = partTrainingTask_normalizeComponent(
  partTrainingTask,
  projectSpace_partTrainingTask,
  partTrainingTask___vue_template_functional__,
  partTrainingTask___vue_styles__,
  partTrainingTask___vue_scopeId__,
  partTrainingTask___vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_partTrainingTask = (partTrainingTask_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/partModelPrediction.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var partModelPrediction = ({
  data: function data() {
    var time = Object(util["e" /* timeData */])();
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
    // 请求模型预测状态,函数调用
    this.$store.dispatch('getModelengine');
    var id = this.$route.query.partId;
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
      var id = this.$route.query.partId;
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
      var id = this.$route.query.partId;
      this.$router.push({ name: 'partCreateModelJob', query: { partId: id } });
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-91c673e4","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/partModelPrediction.vue
var partModelPrediction_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-project-space"},[_c('div',{staticClass:"views-input-box"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.modelPrediction.modelJobName')))]),_vm._v(" "),_c('el-input',{staticClass:"views-input-text",attrs:{"placeholder":_vm.$t('views.projectContent.enterContent')},model:{value:(_vm.obj.name),callback:function ($$v) {_vm.$set(_vm.obj, "name", $$v)},expression:"obj.name"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.development.status')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.obj.status),callback:function ($$v) {_vm.$set(_vm.obj, "status", $$v)},expression:"obj.status"}},_vm._l((_vm.modelstatus),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.trainingTask.engineType')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":"请选择"},model:{value:(_vm.obj.engine),callback:function ($$v) {_vm.$set(_vm.obj, "engine", $$v)},expression:"obj.engine"}},_vm._l((_vm.modelengine),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title views-text-name"},[_vm._v(_vm._s(_vm.$t('views.table.createTime')))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","editable":false,"range-separator":"-","picker-options":_vm.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":_vm.$t('views.button.startDate'),"end-placeholder":_vm.$t('views.button.endDate'),"default-time":['00:00:00', '23:59:59']},model:{value:(_vm.timeValue),callback:function ($$v) {_vm.timeValue=$$v},expression:"timeValue"}})],1),_vm._v(" "),_c('div',[_c('el-button',{staticClass:"btn light small",on:{"click":_vm.modelReset}},[_vm._v(_vm._s(_vm.$t("views.button.reset")))]),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":_vm.modelSearch}},[_vm._v(_vm._s(_vm.$t("views.button.search")))])],1)])]),_vm._v(" "),_c('div',{staticClass:"views-table-btn"},[_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.createModel}},[_vm._v(_vm._s(_vm.$t('views.modelPrediction.createModel')))])],1),_vm._v(" "),_c('div',{staticClass:"views-table-content"},[_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{"width":"100%"},attrs:{"data":_vm.modelPrediction,"tooltip-effect":"dark","border":""}},[_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.serial'),"width":"50","type":"index","index":_vm.trainingIndex,"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.modelPrediction.modelJobName'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('router-link',{staticClass:"views-table-link",attrs:{"to":{name:'partModelDetails',query:{partId:_vm.$route.query.partId,idModel:scope.row.id}},"tag":"a"}},[_vm._v(_vm._s(scope.row.name))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.development.status'),"width":"120","header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticStyle:{"text-align":"left"}},[(scope.row.status==='0')?_c('i',{staticClass:"iconfont icon-warning views-icon-warning"}):_vm._e(),_vm._v(" "),(scope.row.status==='0')?_c('span',[_vm._v("运行失败")]):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('i',{staticClass:"iconfont icon-yunhangzhong views-icon-yunhangzhong"}):_vm._e(),_vm._v(" "),(scope.row.status==='1')?_c('span',[_vm._v("运行中")]):_vm._e()])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.modelPrediction.useModel'),"header-align":"center","align":"center","show-overflow-tooltip":""},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',[_vm._v("\n                        "+_vm._s(scope.row.mount_info.model_path.s3_path)+"\n                    ")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"engine","label":_vm.$t('views.trainingTask.engineType'),"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","label":_vm.$t('views.projectContent.createdTime'),"header-align":"center","align":"center","show-overflow-tooltip":""}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"ip","label":_vm.$t('views.modelPrediction.serverAddress'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.trainingTask.runningTime'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v("\n                    "+_vm._s(scope.row.used_time)+"s\n                ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"describe","label":_vm.$t('views.development.remarks'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.operation'),"header-align":"center","align":"center","width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',{staticClass:"views-table-span views-table-margin del",attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.modelDelete(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t('views.projectContent.delete')))])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('div',{staticClass:"views-page"},[(_vm.isCount)?_c('el-pagination',{attrs:{"page-size":_vm.per,"layout":"prev, pager, next","total":_vm.total,"current-page":_vm.currentPage},on:{"current-change":_vm.modelCurrentChange,"update:currentPage":function($event){_vm.currentPage=$event}}}):_vm._e()],1)],1)])}
var partModelPrediction_staticRenderFns = []
var partModelPrediction_esExports = { render: partModelPrediction_render, staticRenderFns: partModelPrediction_staticRenderFns }
/* harmony default export */ var projectSpace_partModelPrediction = (partModelPrediction_esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/partModelPrediction.vue
var partModelPrediction_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var partModelPrediction___vue_template_functional__ = false
/* styles */
var partModelPrediction___vue_styles__ = null
/* scopeId */
var partModelPrediction___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var partModelPrediction___vue_module_identifier__ = null
var partModelPrediction_Component = partModelPrediction_normalizeComponent(
  partModelPrediction,
  projectSpace_partModelPrediction,
  partModelPrediction___vue_template_functional__,
  partModelPrediction___vue_styles__,
  partModelPrediction___vue_scopeId__,
  partModelPrediction___vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_partModelPrediction = (partModelPrediction_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/partProjectDetails.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var partProjectDetails = ({
  data: function data() {
    return {
      projectData: '',
      activeName: 'first',
      obj: {
        project_id: ''
      }
    };
  },
  created: function created() {
    var active = localStorage.getItem('activeName');
    this.activeName = active;
    // 请求项目详情数据函数调用
    var id = this.$route.query.partId;
    this.obj.project_id = id;
    this.getProjectDetails(this.obj);
  },
  mounted: function mounted() {},

  methods: {
    // 请求项目详情数据函数
    getProjectDetails: function getProjectDetails(obj) {
      var _this = this;

      this.$get('/project/projectdetail', obj).then(function (res) {
        // console.log(JSON.stringify(res))
        _this.projectData = res.data;
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
  components: { ViewsPartDevelopContent: views_projectSpace_partDevelopContent, ViewsPartTrainingTask: views_projectSpace_partTrainingTask, ViewsPartModelPrediction: views_projectSpace_partModelPrediction },
  computed: {}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-c4784220","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/partProjectDetails.vue
var partProjectDetails_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('table',{staticClass:"views-project-details"},[_c('tr',[_c('td',[_vm._v(_vm._s(_vm.$t('views.projectContent.projectName')))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.projectData.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.$t('views.projectContent.createdTime')))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.projectData.created_at))])]),_vm._v(" "),_c('tr',[_c('td',[_vm._v(_vm._s(_vm.$t('views.projectContent.projectQuota')))]),_vm._v(" "),_c('td',[_c('span',{},[_vm._v("CPU："+_vm._s(_vm.projectData.cpu)+_vm._s(_vm.$t('views.projectContent.unit')))]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v(_vm._s(_vm.$t('views.projectContent.memory'))+"："+_vm._s(_vm.projectData.memory)+"(G)")]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v("GPU："+_vm._s(_vm.projectData.gpu)+_vm._s(_vm.$t('views.projectContent.unit')))])]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.$t('views.projectContent.alreadyUsed')))]),_vm._v(" "),_c('td',[_c('span',[_vm._v("CPU："+_vm._s(_vm.projectData.use_cpu)+" "+_vm._s(_vm.$t('views.projectContent.unit')))]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v(_vm._s(_vm.$t('views.projectContent.memory'))+"："+_vm._s(_vm.projectData.use_memory)+"(G)")]),_vm._v(" "),_c('span',{staticClass:"views-table-margin"},[_vm._v("CPU："+_vm._s(_vm.projectData.use_gpu)+" "+_vm._s(_vm.$t('views.projectContent.unit'))+"\n                ")])])])]),_vm._v(" "),_c('div',{staticClass:"views-development"},[_c('el-tabs',{on:{"tab-click":_vm.handleClick},model:{value:(_vm.activeName),callback:function ($$v) {_vm.activeName=$$v},expression:"activeName"}},[_c('el-tab-pane',{attrs:{"label":_vm.$t('views.development.development'),"name":"first"}},[_c('views-part-develop-content')],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":_vm.$t('views.trainingTask.trainingTask'),"name":"second"}},[_c('views-part-training-task')],1),_vm._v(" "),_c('el-tab-pane',{attrs:{"label":_vm.$t('views.modelPrediction.modelPrediction'),"name":"third"}},[_c('views-part-model-prediction')],1)],1)],1)])}
var partProjectDetails_staticRenderFns = []
var partProjectDetails_esExports = { render: partProjectDetails_render, staticRenderFns: partProjectDetails_staticRenderFns }
/* harmony default export */ var projectSpace_partProjectDetails = (partProjectDetails_esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/partProjectDetails.vue
var partProjectDetails_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var partProjectDetails___vue_template_functional__ = false
/* styles */
var partProjectDetails___vue_styles__ = null
/* scopeId */
var partProjectDetails___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var partProjectDetails___vue_module_identifier__ = null
var partProjectDetails_Component = partProjectDetails_normalizeComponent(
  partProjectDetails,
  projectSpace_partProjectDetails,
  partProjectDetails___vue_template_functional__,
  partProjectDetails___vue_styles__,
  partProjectDetails___vue_scopeId__,
  partProjectDetails___vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_partProjectDetails = __webpack_exports__["default"] = (partProjectDetails_Component.exports);


/***/ })

});