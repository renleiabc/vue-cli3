webpackJsonp([33],{

/***/ "mMuX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/json/stringify.js
var stringify = __webpack_require__("mvHQ");
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify);

// EXTERNAL MODULE: ./src/util/index.js
var util = __webpack_require__("ZoQJ");

// EXTERNAL MODULE: ./src/util/validate.js
var validate = __webpack_require__("v46e");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/projectSpace/projectContent.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var projectContent = ({
  data: function data() {
    var time = Object(util["f" /* timeData */])();
    var validatePass = function validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入项目名称'));
      } else if (!Object(validate["b" /* valiName */])(value)) {
        callback(new Error('请输入正确的字符'));
      } else {
        callback();
      }
    };
    return {
      indexLink: '1',
      createDialog: false,
      loading: true,
      projectName: '',
      labelWidth: '120px',
      status: '',
      timeValue: '',
      readonly: false,
      project_id: '',
      isCount: false,
      per: 0,
      total: 0,
      options: [],
      archived: [],
      tableData: [],
      indexes: '',
      currentPage: 1,
      archived_project: [],
      pickerOptions: time,
      obj: { // 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0
      },
      ruleForm: {
        name: '',
        describe: ''
      },
      rules: {
        name: [{ validator: validatePass, trigger: 'blur' }],
        describe: [{ required: false, message: '请输入项目描述', trigger: 'blur' }, { max: 200, message: '长度在 10 到 200 个字符', trigger: 'blur' }]
      }
    };
  },
  created: function created() {
    // console.log(this.$store.state.projectSpace.get)
    // 请求项目空间数据，函数调用
    var obj = this.obj;
    this.getProjectSpaceData(obj);
    // 请求项目状态数据，函数调用
    this.$store.dispatch('getProjectStatus');
  },

  watch: {
    STORE_THEME_LANG: {
      handler: function handler(options, oldOptions) {
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '120px';
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '200px';
        }
      }
    }
  },
  mounted: function mounted() {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '120px';
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '200px';
    }
  },

  methods: {
    // 请求我的项目数据
    getProjectSpaceData: function getProjectSpaceData(obj) {
      var _this = this;

      this.$get('/project/myproject', obj).then(function (res) {
        //  console.log(JSON.stringify(res))
        if (res.code === 200) {
          _this.loading = false;
          _this.tableData = res.data.project_space;
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
    reset: function reset() {
      this.projectName = '';
      this.status = '';
      this.timeValue = '';
    },

    // 查询
    search: function search() {
      if (this.timeValue === '') {
        var start = '';
        var end = '';
      } else {
        start = this.timeValue[0];
        end = this.timeValue[1];
      }
      var name = this.projectName;
      var status = this.status;
      this.$set(this.obj, 'name', name);
      this.$set(this.obj, 'start_time', start);
      this.$set(this.obj, 'end_time', end);
      this.$set(this.obj, 'status', status);
      this.$set(this.obj, 'page', 0);
      this.currentPage = 1;
      var obj = this.obj;
      this.getProjectSpaceData(obj);
    },

    // 查询项目状态
    searchStatus: function searchStatus(val) {
      // console.log(val)
      this.status = val;
    },
    indexMethod: function indexMethod(index) {
      return index + 1;
    },
    handleSelectionChange: function handleSelectionChange(val) {
      // 选中的函数
      this.archived = val;
      // console.log(JSON.stringify(val))
    },
    openFile: function openFile() {
      this.archived_project = [];
      if (this.archived.length === 0) {
        this.$message({
          message: this.$t('views.dialogText.archived'),
          type: 'warning'
        });
      } else {
        var that = this;
        this.archived.forEach(function (val, index) {
          var value = val.status;
          var id = val.id;
          if (value === '0') {
            that.archived_project.push(id);
          }
        });
        if (this.archived_project.length === 0) {
          this.$message({
            message: this.$t('views.dialogText.archived'),
            type: 'warning'
          });
        } else {
          var archived = this.archived_project;
          console.log(archived);
          this.projectSetting(archived);
        }
      }
    },

    // 单个项目归档
    fileClick: function fileClick(id) {
      var arr = [];
      arr.push(id);
      this.projectSetting(arr);
    },

    // 项目归档函数封装
    projectSetting: function projectSetting(arr) {
      var _this2 = this;

      this.$confirm(this.$t('views.dialogText.filed'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning'
      }).then(function () {
        var obj = {
          project_id: arr
        };
        console.log(stringify_default()(arr));
        _this2.$post('/project/archiveproject', obj).then(function (res) {
          console.log(res);
          if (res.code === 200) {
            _this2.$message({
              message: res.message,
              type: 'success'
            });
            var _obj = _this2.obj;
            _this2.getProjectSpaceData(_obj);
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

    // 打开新建项目对话框
    openProject: function openProject() {
      this.createDialog = true;
    },

    // 确定按钮
    submitForm: function submitForm(formName) {
      var _this3 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          //  console.log(this.ruleForm)
          var form = _this3.ruleForm;
          _this3.$post('/project/projectcreate', { Project: form }).then(function (res) {
            if (res.code === 200) {
              _this3.$message({
                message: res.message,
                type: 'success'
              });
              var obj = { // 请求参数数据
                name: '',
                start_time: '',
                end_time: '',
                status: '',
                page: 1
              };
              _this3.getProjectSpaceData(obj);
              _this3.currentPage = 1;
              _this3.$refs[formName].resetFields();
              _this3.createDialog = false;
            } else {
              _this3.$message({
                message: res.message,
                type: 'error'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 取消按钮
    resetForm: function resetForm(formName) {
      this.$refs[formName].resetFields();
      this.createDialog = false;
    },

    // 关闭对话框
    handleClose: function handleClose(done) {
      done();
    },
    projectCurrentChange: function projectCurrentChange(val) {
      this.$set(this.obj, 'page', val);
      // console.log(JSON.stringify(this.obj))
      var obj = this.obj;
      this.getProjectSpaceData(obj);
    },
    indexActive: function indexActive() {
      var activeName = 'second';
      window.localStorage.setItem('activeName', activeName);
    }
  },
  components: {},
  computed: {
    projectStatus: function projectStatus() {
      return this.$store.getters.postProjectStatus;
    }
  }

});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-48a038db","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/projectSpace/projectContent.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"views-project-space"},[_c('div',{staticClass:"tab-select"},[_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.projectContent.projectName')))]),_vm._v(" "),_c('el-input',{staticClass:"views-input-text",attrs:{"placeholder":_vm.$t('views.projectContent.inputKeyword')},model:{value:(_vm.projectName),callback:function ($$v) {_vm.projectName=$$v},expression:"projectName"}})],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.projectContent.projectStatus')))]),_vm._v(" "),_c('el-select',{attrs:{"placeholder":_vm.$t('views.development.pleaseChoose'),"clearable":""},on:{"change":_vm.searchStatus},model:{value:(_vm.status),callback:function ($$v) {_vm.status=$$v},expression:"status"}},_vm._l((_vm.projectStatus),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',[_c('span',{staticClass:"tab-select-title"},[_vm._v(_vm._s(_vm.$t('views.table.createTime')))]),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","editable":false,"range-separator":"-","picker-options":_vm.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":_vm.$t('views.button.startDate'),"end-placeholder":_vm.$t('views.button.endDate'),"default-time":['00:00:00', '23:59:59']},model:{value:(_vm.timeValue),callback:function ($$v) {_vm.timeValue=$$v},expression:"timeValue"}})],1),_vm._v(" "),_c('div',[(false)?_c('el-button',{staticClass:"btn light small",on:{"click":_vm.reset}},[_vm._v(_vm._s(_vm.$t("views.button.reset")))]):_vm._e(),_vm._v(" "),_c('el-button',{staticClass:"btn light small",on:{"click":_vm.search}},[_vm._v(_vm._s(_vm.$t("views.button.search")))])],1)]),_vm._v(" "),_c('div',{staticClass:"views-table-project"},[_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.openProject}},[_vm._v(_vm._s(_vm.$t('views.projectContent.createdProject')))]),_vm._v(" "),(false)?_c('el-button',{staticClass:"view-btn-medium",attrs:{"type":"primary"},on:{"click":_vm.openFile}},[_vm._v(_vm._s(_vm.$t('views.projectContent.archivedItems')))]):_vm._e()],1),_vm._v(" "),_c('div',{staticClass:"views-table-content"},[_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{"width":"100%"},attrs:{"data":_vm.tableData,"tooltip-effect":"dark","border":""},on:{"selection-change":_vm.handleSelectionChange}},[_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.serial'),"width":"50","type":"index","index":_vm.indexMethod,"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.projectName'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.status==='0')?_c('div',{on:{"click":_vm.indexActive}},[_c('router-link',{staticClass:"views-table-link",attrs:{"to":{name:'projectDetails',query:{id:scope.row.id}}}},[_vm._v(_vm._s(scope.row.name))])],1):_c('div',[_c('router-link',{staticClass:"views-table-link",attrs:{"to":{name:'spaceContent'}}},[_vm._v(_vm._s(scope.row.name))])],1)]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.development.status'),"header-align":"center","align":"center","show-overflow-tooltip":""},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',{staticStyle:{"text-align":"left"}},[(scope.row.status=='0')?_c('i',{staticClass:"iconfont icon-kaifa views-icon-kaifa"}):_vm._e(),_vm._v(" "),(scope.row.status==0)?_c('span',[_vm._v(_vm._s(_vm.$t('views.status.development')))]):_vm._e(),_vm._v(" "),(scope.row.status=='1')?_c('i',{staticClass:"iconfont icon-yiguidang views-icon-yiguidang"}):_vm._e(),_vm._v(" "),(scope.row.status==1)?_c('span',[_vm._v(_vm._s(_vm.$t('views.status.file')))]):_vm._e()])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"created_at","label":_vm.$t('views.projectContent.createdTime'),"header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"describe","label":_vm.$t('views.projectContent.description'),"show-overflow-tooltip":"","header-align":"center","align":"center"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.documentation'),"header-align":"center","align":"center"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('a',{staticClass:"views-project-file",attrs:{"href":scope.row.document,"target":"_blank"}},[_vm._v(_vm._s(scope.row.document)+"\n                        ")])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t('views.projectContent.operation'),"header-align":"center","align":"center","width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.status==='0')?_c('div',[_c('router-link',{staticClass:"views-table-span views-table-margin",attrs:{"to":{name:'projectSetting',query:{idSet:scope.row.id}}}},[_vm._v(_vm._s(_vm.$t('views.projectContent.setting')))]),_vm._v(" "),_c('span',{staticClass:"views-table-span views-table-margin",attrs:{"size":"mini"},on:{"click":function($event){_vm.fileClick(scope.row.id)}}},[_vm._v(_vm._s(_vm.$t('views.projectContent.file')))])],1):_c('div',[_c('span',[_vm._v("——")])])]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('div',{staticClass:"views-page"},[_c('el-pagination',{directives:[{name:"show",rawName:"v-show",value:(_vm.isCount),expression:"isCount"}],attrs:{"page-size":_vm.per,"layout":"prev, pager, next","total":_vm.total,"current-page":_vm.currentPage},on:{"current-change":_vm.projectCurrentChange,"update:currentPage":function($event){_vm.currentPage=$event}}})],1)],1),_vm._v(" "),_c('el-dialog',{attrs:{"title":_vm.$t('views.projectContent.newProject'),"visible":_vm.createDialog,"width":"30%","before-close":_vm.handleClose,"top":"30vh"},on:{"update:visible":function($event){_vm.createDialog=$event}}},[_c('div',{staticClass:"content"},[_c('el-form',{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":_vm.labelWidth}},[_c('el-form-item',{attrs:{"label":_vm.$t('views.projectContent.projectName'),"prop":"name"}},[_c('el-input',{attrs:{"placeholder":"请输入名称","maxlength":"30"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":_vm.$t('views.projectContent.description'),"prop":"describe"}},[_c('el-input',{attrs:{"type":"textarea","rows":6,"placeholder":_vm.$t('views.projectContent.enterContent')},model:{value:(_vm.ruleForm.describe),callback:function ($$v) {_vm.$set(_vm.ruleForm, "describe", $$v)},expression:"ruleForm.describe"}})],1)],1)],1),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.resetForm('ruleForm')}}},[_vm._v("\n                    "+_vm._s(_vm.$t('views.button.cancel'))+"\n                ")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v("\n                    "+_vm._s(_vm.$t('views.button.sure'))+"\n                ")])],1)])],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var projectSpace_projectContent = (esExports);
// CONCATENATED MODULE: ./src/views/projectSpace/projectContent.vue
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
  projectContent,
  projectSpace_projectContent,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_projectSpace_projectContent = __webpack_exports__["default"] = (Component.exports);


/***/ })

});