webpackJsonp([42],{

/***/ "vIVt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("Dd8w");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./src/util/validate.js
var validate = __webpack_require__("v46e");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/imageManagement/newImage.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var newImage = ({
  name: 'newImage',
  data: function data() {
    var _this = this;

    var validateimageName = function validateimageName(rule, value, callback) {
      if (!validate["h" /* validateUsername */](value)) {
        callback(new Error(_this.$t('views.userManagement.tips.validateUsername')));
      } else {
        callback();
      }
    };
    var validateStr = function validateStr(rule, value, callback) {
      if (!validate["b" /* valiName */](value)) {
        callback(new Error(_this.$t('views.validError.validStr')));
      } else {
        callback();
      }
    };
    return {
      lang: 'zh',
      is_init: 2,
      openDialog1: false,
      openDialog2: false,
      ruleForm: {
        uuid: '',
        name: '',
        category: '',
        os: '',
        project_id: '',
        describe: '',
        size: ''
      },
      dailogForm1: {
        categoryName: ''
      },
      dailogForm2: {
        osName: ''
      },
      dailogFormRules1: {
        categoryName: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }, { validator: validateStr, trigger: 'blur' }]
      },
      dailogFormRules2: {
        osName: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }, { validator: validateStr, trigger: 'blur' }]
      },
      rules: {
        name: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }, { validator: validateimageName, trigger: 'blur' }],
        category: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }],
        os: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }],
        uuid: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }],
        project_id: [{ required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }]
      },
      seletions: {},
      proSpaces: [],
      url: '',
      labelWidth: '120px',
      isEdit: false,
      hasObjectData: false,
      para: {
        target: "//192.168.10.95:86" + '/v1/image/imageupload', // 后台上传地址
        // target: '//192.168.201.17:3000/upload', // 后台上传地址
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        },
        token: sessionStorage.getItem('access_token'), //
        typeArr: [], // 文件后缀类型 ['iso','mp4']
        // 断点上传位置查询
        checkChunkUploadedByResponse: function checkChunkUploadedByResponse(chunk, message) {
          var objMessage = {};
          try {
            if (message) {
              objMessage.index = JSON.parse(message).data.index;
            } else {
              objMessage.index = 0;
            }
          } catch (e) {}
          // fake response
          // objMessage.uploaded_chunks = [2, 3, 4, 5, 8, 10, 11, 12, 13, 17, 20, 21]
          // check the chunk is uploaded
          // return (objMessage.uploaded_chunks || []).indexOf(chunk.offset + 1) >= 0
          return (objMessage.index || 0) > chunk.offset;
        },
        chunkSize: 20 * 1024 * 1024 // 分段大小
      }
    };
  },

  watch: {
    STORE_THEME_LANG: {
      handler: function handler(options, oldOptions) {
        if (options) {
          this.lang = this.STORE_THEME_LANG;
        }
      }
    }
  },
  created: function created() {
    var _this2 = this;

    this.is_init = this.$route.query.is_init;
    if (this.is_init === 2) {
      this.$post('/image/projectlist').then(function (res) {
        _this2.proSpaces = res.data;
      });
    }
    this.selectData();
    if (this.$route.query.imageId !== undefined) {
      this.imageId = this.$route.query.imageId;
      this.isEdit = true;
      this.ruleForm.uuid = this.$route.query.imageId;
      this.url = '/image/imageupdate?image_id=' + this.$route.query.imageId;
      this.$get('/image/imagedetails', { image_id: this.$route.query.imageId }).then(function (data) {
        if (_this2.is_init === 2) {
          _this2.ruleForm.project_id = data.data.image.project_id;
        }
        _this2.ruleForm.uuid = data.data.image.uuid;
        _this2.ruleForm.name = data.data.image.name;
        _this2.ruleForm.category = data.data.image.category;
        _this2.ruleForm.os = data.data.image.os;
        _this2.ruleForm.project_id = data.data.image.project_id;
        _this2.ruleForm.describe = data.data.image.describe;
        _this2.ruleForm.upload_path = data.data.image.upload_path;
      });
    } else {
      this.url = '/image/imagecreate';
    }
    if (this.$route.query.hasObjectData !== undefined) {
      this.hasObjectData = true;
    }
  },

  methods: {
    // 筛选数据
    selectData: function selectData() {
      var _this3 = this;

      this.$get('/image/imagecategorylist', { is_init: this.is_init }).then(function (data) {
        _this3.seletions = extends_default()({}, data.data);
      });
    },
    handleClose1: function handleClose1() {
      this.$refs['dailogForm1'].resetFields();
      this.ruleForm.category = '';
    },
    handleClose2: function handleClose2() {
      this.$refs['dailogForm2'].resetFields();
      this.ruleForm.os = '';
    },

    // 镜像分类
    handleSure1: function handleSure1() {
      var _this4 = this;

      this.$refs['dailogForm1'].validate(function (valid) {
        if (valid) {
          _this4.$post('/image/imagecategorycreate', { category_name: _this4.dailogForm1.categoryName }).then(function (res) {
            if (res.code === 200) {
              _this4.$message({
                type: 'success',
                message: _this4.$t('views.notification.saved')
              });
              _this4.seletions.category.push(res.data);
              _this4.openDialog1 = false;
            } else {
              _this4.$message({
                type: 'warning',
                message: res.message
              });
            }
          });
        }
      });
    },

    // 操作系统类型
    handleSure2: function handleSure2() {
      var _this5 = this;

      this.$refs['dailogForm2'].validate(function (valid) {
        if (valid) {
          _this5.$post('/image/imageoscreate', { os_name: _this5.dailogForm2.osName }).then(function (res) {
            if (res.code === 200) {
              _this5.$message({
                type: 'success',
                message: _this5.$t('views.notification.saved')
              });
              _this5.seletions.os.push(res.data);
              _this5.openDialog2 = false;
            } else {
              _this5.$message({
                type: 'warning',
                message: res.message
              });
            }
          });
        }
      });
    },
    changeCategory: function changeCategory() {
      if (this.ruleForm.category === -1) {
        this.openDialog1 = true;
      }
    },
    changeOS: function changeOS() {
      if (this.ruleForm.os === -1) {
        this.openDialog2 = true;
      }
    },
    delOS: function delOS(id) {
      var _this6 = this;

      var osId = this.seletions.os[id];
      this.$post('/image/imageosdelete', osId).then(function (res) {
        if (res.code === 200) {
          _this6.$message({
            type: 'success',
            message: _this6.$t('views.notification.removed')
          });
          _this6.seletions.os.splice(id, 1);
          _this6.ruleForm.os = '';
        }
      });
    },
    delCategory: function delCategory(id) {
      var _this7 = this;

      var categoryId = this.seletions.category[id];
      this.$post('/image/imagecategorydelete', { category_id: categoryId }).then(function (res) {
        if (res.code === 200) {
          _this7.$message({
            type: 'success',
            message: _this7.$t('views.notification.removed')
          });
          _this7.seletions.category.splice(id, 1);
          _this7.ruleForm.category = '';
        }
      });
    },

    // 上传结果
    uploadResult: function uploadResult(res) {
      var data = JSON.parse(res);
      console.log(data);
      if (data.code === 200) {
        this.ruleForm.uuid = data.data.uuid;
        this.ruleForm.size = data.data.size;
        this.ruleForm.path = data.data.path;
      } else {
        this.$message({
          type: 'warning',
          message: data.message
        });
      }
    },
    // 删除回调
    deleteFile: function deleteFile(res) {
      var _this8 = this;

      this.$post('/image/filedelete', { path: this.ruleForm.path }).then(function (res) {
        if (res.code === 200) {
          _this8.$message({
            type: 'success',
            message: _this8.$t('views.notification.removed')
          });
        } else {
          _this8.$message({
            type: 'error',
            message: res.message
          });
        }
      });
    },
    // 保存
    submitForm: function submitForm() {
      var _this9 = this;

      this.$refs['ruleForm'].validate(function (valid) {
        if (valid) {
          _this9.ruleForm.is_init = _this9.is_init;
          // if (this.imageId) {
          //   this.ruleForm.image_id = this.imageId
          // }
          _this9.$post(_this9.url, { Image: _this9.ruleForm }).then(function (data) {
            if (data.code === 200) {
              _this9.$message({ message: _this9.$t('views.notification.saved'), type: 'success' });
              _this9.$router.go(-1);
            }
          });
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-d7eeddbc","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/imageManagement/newImage.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"views-image-manage-new-image"},[_c('el-form',{ref:"ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":_vm.labelWidth}},[_c('el-row',[_c('el-col',{attrs:{"span":10}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.imageManagement.mirrorName"),"prop":"name"}},[_c('el-input',{attrs:{"maxlength":"30"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":_vm.$t("views.imageManagement.mirrorClassification"),"prop":"category"}},[_c('el-select',{attrs:{"filterable":"","rel":"selCategory","placeholder":_vm.$t("views.imageManagement.chose")},on:{"change":_vm.changeCategory},model:{value:(_vm.ruleForm.category),callback:function ($$v) {_vm.$set(_vm.ruleForm, "category", $$v)},expression:"ruleForm.category"}},[_vm._l((_vm.seletions.category),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.id}},[_c('span',{staticStyle:{"float":"left"}},[_vm._v(_vm._s(item.name))]),_vm._v(" "),_c('span',{staticStyle:{"float":"right","color":"#8492a6","font-size":"12px"},on:{"click":function($event){_vm.delCategory(index)}}},[_c('i',{staticClass:"iconfont icon-shanchu"})])])}),_vm._v(" "),_c('el-option',{key:-1,attrs:{"label":_vm.$t("views.imageManagement.customize"),"value":-1}})],2)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":_vm.$t("views.imageManagement.operatingSystemType"),"prop":"os"}},[_c('el-select',{attrs:{"filterable":"","placeholder":_vm.$t("views.imageManagement.chose")},on:{"change":_vm.changeOS},model:{value:(_vm.ruleForm.os),callback:function ($$v) {_vm.$set(_vm.ruleForm, "os", $$v)},expression:"ruleForm.os"}},[_vm._l((_vm.seletions.os),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.id}},[_c('span',{staticStyle:{"float":"left"}},[_vm._v(_vm._s(item.name))]),_vm._v(" "),_c('span',{staticStyle:{"float":"right","color":"#8492a6","font-size":"12px"},on:{"click":function($event){_vm.delOS(index)}}},[_c('i',{staticClass:"iconfont icon-shanchu"})])])}),_vm._v(" "),_c('el-option',{key:-1,attrs:{"label":_vm.$t("views.imageManagement.customize"),"value":-1}})],2)],1),_vm._v(" "),(!_vm.isEdit)?_c('el-form-item',{attrs:{"label":_vm.$t("views.imageManagement.imageFile"),"prop":"uuid"}},[_c('BreakpointUpload',{attrs:{"params":_vm.para,"language":_vm.lang},on:{"resultUploader":_vm.uploadResult,"deleteFiles":_vm.deleteFile}})],1):_vm._e()],1)],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":10}},[(_vm.is_init === 2)?_c('el-form-item',{attrs:{"label":_vm.$t("views.imageManagement.imageSpace"),"prop":"object"}},[_c('el-select',{attrs:{"placeholder":_vm.$t("views.userManagement.addUser.selRole")},model:{value:(_vm.ruleForm.project_id),callback:function ($$v) {_vm.$set(_vm.ruleForm, "project_id", $$v)},expression:"ruleForm.project_id"}},_vm._l((_vm.proSpaces),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.id}})}))],1):_vm._e(),_vm._v(" "),_c('el-form-item',{attrs:{"label":_vm.$t("views.imageManagement.mirrorDescription"),"prop":"describe"}},[_c('el-input',{attrs:{"type":"textarea","rows":5,"maxlength":"200"},model:{value:(_vm.ruleForm.describe),callback:function ($$v) {_vm.$set(_vm.ruleForm, "describe", $$v)},expression:"ruleForm.describe"}})],1)],1)],1),_vm._v(" "),_c('el-row',{staticStyle:{"margin-top":"20px"}},[_c('div',{staticClass:"text-center"},[_c('el-button',{on:{"click":_vm.mixinGoBack}},[_vm._v(_vm._s(_vm.$t("views.button.cancel")))]),_vm._v(" "),_c('el-button',{staticClass:"btn dark",attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v(_vm._s(_vm.$t("views.button.save")))])],1)])],1),_vm._v(" "),_c('el-dialog',{staticClass:"small",attrs:{"title":_vm.$t("views.imageManagement.titleImageType"),"visible":_vm.openDialog1},on:{"close":_vm.handleClose1,"update:visible":function($event){_vm.openDialog1=$event}}},[_c('div',[_c('el-form',{ref:"dailogForm1",attrs:{"model":_vm.dailogForm1,"rules":_vm.dailogFormRules1,"label-width":"80px"}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.imageManagement.typeImageName"),"prop":"categoryName"}},[_c('el-input',{attrs:{"placeholder":_vm.$t("views.imageManagement.enter")},model:{value:(_vm.dailogForm1.categoryName),callback:function ($$v) {_vm.$set(_vm.dailogForm1, "categoryName", $$v)},expression:"dailogForm1.categoryName"}})],1)],1)],1),_vm._v(" "),_c('span',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.openDialog1=false}}},[_vm._v(_vm._s(_vm.$t("views.button.cancel")))]),_vm._v(" "),_c('el-button',{staticClass:"btn dark",on:{"click":_vm.handleSure1}},[_vm._v(_vm._s(_vm.$t("views.button.save")))])],1)]),_vm._v(" "),_c('el-dialog',{staticClass:"small",attrs:{"title":_vm.$t("views.imageManagement.titleOSType"),"visible":_vm.openDialog2},on:{"close":_vm.handleClose2,"update:visible":function($event){_vm.openDialog2=$event}}},[_c('div',[_c('el-form',{ref:"dailogForm2",attrs:{"model":_vm.dailogForm2,"rules":_vm.dailogFormRules2,"label-width":"80px"}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.imageManagement.typeOSName"),"prop":"osName"}},[_c('el-input',{attrs:{"placeholder":_vm.$t("views.imageManagement.enter")},model:{value:(_vm.dailogForm2.osName),callback:function ($$v) {_vm.$set(_vm.dailogForm2, "osName", $$v)},expression:"dailogForm2.osName"}})],1)],1)],1),_vm._v(" "),_c('span',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.openDialog2=false}}},[_vm._v(_vm._s(_vm.$t("views.button.cancel")))]),_vm._v(" "),_c('el-button',{staticClass:"btn dark",on:{"click":_vm.handleSure2}},[_vm._v(_vm._s(_vm.$t("views.button.save")))])],1)])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var imageManagement_newImage = (esExports);
// CONCATENATED MODULE: ./src/views/imageManagement/newImage.vue
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
  newImage,
  imageManagement_newImage,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var views_imageManagement_newImage = __webpack_exports__["default"] = (Component.exports);


/***/ })

});