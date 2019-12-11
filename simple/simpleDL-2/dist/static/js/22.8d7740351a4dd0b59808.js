webpackJsonp([22],{

/***/ "9I3m":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__("Gu7T");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/promise.js
var promise = __webpack_require__("//Fk");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/extends.js
var helpers_extends = __webpack_require__("Dd8w");
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/storageManagement/components/uploadFile.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var uploadFile = ({
  name: 'uploadFile',
  props: {
    params: {
      type: Object
    }
  },
  data: function data() {
    return {
      ruleForm: {
        keyName: '',
        keys_name: '',
        keyMD5: ''
      },
      rules: {
        keys_name: [{ required: true, message: '请输入密钥名称', trigger: 'blur' }, { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'change' }],
        keyName: [{ required: true, message: '请输入KEY值', trigger: 'blur' }],
        keyMD5: [{ required: true, message: '请输入KEY-MD5值', trigger: 'blur' }, { min: 32, max: 32, message: '长度在为32个字符', trigger: 'blur' }]
      },
      uploadUrl: window.Simple.pingTai + '/oss/user/object/push',
      keySelected: '',
      keyListArr: [],
      keyName: '',
      keyType: true,
      encrypt: false,
      dialogCreateKey: false,
      failFileList: [],
      newFile: '',
      uploadParams: {},
      fileList: []
    };
  },
  created: function created() {
    var _this = this;

    this.$get('/encrypt/find', '').then(function (res) {
      _this.keyListArr = res.data.encryt_list;
    });
    this.$get('/storage/storageuser', { storage_id: this.params.storageId }).then(function (res) {
      if (res.code === 200) {
        _this.uploadParams = extends_default()({}, res.data);
        _this.uploadParams.accessid = res.data.accessid;
        _this.uploadParams.accesssecret = res.data.accesssecret;
        _this.uploadParams.tenantid = res.data.tenantid;
        _this.uploadParams.bucketname = res.data.storage_name;
      } else {
        _this.$message({
          type: 'error',
          message: res.message
        });
      }
    });
  },

  methods: {
    handleRemove: function handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      // let isPass = false
      // const isJPG = file.type === 'image/jpg'
      // const isJPEG = file.type === 'image/jpeg'
      // const isPNG = file.type === 'image/png'
      var isLt2M = file.size / 1024 / 1024 < 1024;

      // if (isJPG || isJPEG || isPNG) {
      //   isPass = true
      // } else {
      //   isPass = false
      //   this.$message.error('上传图片格式错误!')
      // }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 1G!');
      }
      this.states = 1;
      // return isPass && isLt2M
      return isLt2M;
    },
    fileSuccess: function fileSuccess(response, file, fileList) {
      console.log(response);
      if (response.state === 200) {
        this.$emit('closeNewFile');
        this.$message({ message: '上传成功', type: 'success' });
        this.$refs.upload.clearFiles();
      } else {
        this.$message({ message: response.message, type: 'error' });
      }
    },
    submitUpload: function submitUpload() {
      var _this2 = this;

      // this.uploadUrl = '//192.168.200.148:2020/dl/v1/oss/user/object/push?'
      // for (let k in this.uploadParams) {
      //   this.uploadUrl += k + '=' + this.uploadParams[k] + '&'
      // }
      setTimeout(function () {
        _this2.$refs.upload.submit();
      }, 10);
      // this.uploadUrl.slice(0, -1)
    },
    getstorageuser: function getstorageuser() {
      var _this3 = this;

      var isEncryption = this.encrypt ? 1 : 0;
      var parms = { storage_id: this.params.storageId, is_encryption: isEncryption, size: this.newFile.size, folderid: this.params.id, name: this.newFile.name };
      console.log(this.newFile);
      return new promise_default.a(function (resolve, reject) {
        _this3.$post('/storage/objectpushdb', parms).then(function (res) {
          if (res.code === 200) {
            _this3.uploadParams.cburl = res.data.returnurl;
            _this3.uploadParams.name = res.data.pathname;
          } else {
            _this3.$message({
              type: 'error',
              message: res.message
            });
          }
          resolve(res);
        });
      });
    },
    createKey: function createKey() {
      var _this4 = this;

      console.log(this.keyName);
      if (this.keyName.trim() === '') {
        this.$message({ message: '不能为空', type: 'error' });
        return false;
      }
      var titleEn = {};
      titleEn.enc_title = this.keyName;
      this.$post('/encrypt/create', { Encryption: titleEn }).then(function (data) {
        if (data.code === 200) {
          _this4.$message({ message: _this4.$t('views.notification.saved'), type: 'success' });
          _this4.dialogCreateKey = false;
          _this4.$get('/encrypt/find', '').then(function (res) {
            _this4.keyListArr = res.data.encryt_list;
          });
        } else {
          _this4.$message({ message: data.message, type: 'error' });
        }
      });
    },
    getVerify: function getVerify(md5) {
      var url = window.Simple.pingTai + '/oss/keysignature/' + md5;
      var res = '';
      this.$get(url).then(function (data) {
        res = data.data;
      });
      return new promise_default.a(function (resolve, reject) {
        resolve(res);
      });
    },
    newFileCreate: function newFileCreate() {
      var _this5 = this;

      if (this.encrypt) {
        if (this.keyType) {
          this.uploadParams.pin = this.keyListArr[this.keySelected].enc_key;
          this.uploadParams.verify = this.keyListArr[this.keySelected].enc_key_md5;
        } else {
          var url = window.Simple.pingTai + '/oss/keysignature/' + this.ruleForm.keyMD5;
          // this.uploadParams.pin = this.ruleForm.keyName
          this.uploadParams.pin = this.ruleForm.keyMD5;
          this.$get(url).then(function (data) {
            _this5.uploadParams.verify = data.data;
          });
        }
      } else {
        this.uploadParams.pin = '';
      }
      return new promise_default.a(function (resolve, reject) {
        resolve(true);
      });
    },
    fileChange: function fileChange(file, fileList) {
      this.newFile = '';
      this.newFile = file;
      this.fileList = fileList.splice(-1);
    },
    handleError: function handleError(error, file) {
      console.log(error, file);
      this.failFileList.push(file);
      this.$message({
        type: 'error',
        message: '\u6587\u4EF6' + file.name + '\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5'
      });
    },
    beforeRemove: function beforeRemove(file, fileList) {
      return this.$confirm('\u786E\u5B9A\u79FB\u9664 ' + file.name + '\uFF1F');
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0561767a","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/storageManagement/components/uploadFile.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"comp-upload-file"},[_c('el-upload',{ref:"upload",staticClass:"upload-demo",attrs:{"action":_vm.uploadUrl,"on-remove":_vm.handleRemove,"accept":"","before-upload":_vm.beforeAvatarUpload,"name":"upload","auto-upload":false,"on-change":_vm.fileChange,"before-remove":_vm.beforeRemove,"on-success":_vm.fileSuccess,"on-error":_vm.handleError,"data":_vm.uploadParams,"file-list":_vm.fileList}},[_c('el-button',{staticClass:"view-btn-small",attrs:{"size":"small"}},[_vm._v("选择文件")]),_vm._v(" "),_c('div',{staticClass:"el-upload__tip",attrs:{"slot":"tip"},slot:"tip"},[_vm._v("文件大小限制为1G")])],1),_vm._v(" "),_c('div',{staticStyle:{"padding":"10px 0"}},[_c('el-checkbox',{model:{value:(_vm.encrypt),callback:function ($$v) {_vm.encrypt=$$v},expression:"encrypt"}},[_vm._v("加密")]),_vm._v(" "),_c('el-tooltip',{attrs:{"content":"Bottom Center 提示文字","placement":"bottom-start"}},[_c('i',{staticClass:"iconfont icon-Group"})])],1),_vm._v(" "),(_vm.encrypt)?_c('div',{staticClass:"v-encrypt"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"item-encrypt"},[_c('span',[_vm._v("密钥：")]),_vm._v(" "),_c('div',[_c('el-radio',{attrs:{"label":true},model:{value:(_vm.keyType),callback:function ($$v) {_vm.keyType=$$v},expression:"keyType"}},[_vm._v("托管密钥")]),_vm._v(" "),_c('el-radio',{attrs:{"label":false},model:{value:(_vm.keyType),callback:function ($$v) {_vm.keyType=$$v},expression:"keyType"}},[_vm._v("自定义密钥")])],1)]),_vm._v(" "),(_vm.keyType)?_c('div',{staticClass:"item-encrypt"},[_c('span'),_vm._v(" "),_c('div',[_c('el-select',{attrs:{"clearable":"","filterable":"","placeholder":_vm.$t("views.button.selectPlease")},model:{value:(_vm.keySelected),callback:function ($$v) {_vm.keySelected=$$v},expression:"keySelected"}},_vm._l((_vm.keyListArr),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.enc_title,"value":index}})})),_vm._v(" "),_c('a',{on:{"click":function($event){_vm.dialogCreateKey=true}}},[_vm._v("创建密钥")])],1)]):_c('div',{staticClass:"item-encrypt"},[_c('span'),_vm._v(" "),_c('div',[_c('el-form',{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":"0"}},[_c('el-form-item',{attrs:{"label":"","prop":"keyName"}},[_c('el-input',{attrs:{"maxlength":"32","placeholder":"请输入KEY值"},model:{value:(_vm.ruleForm.keyName),callback:function ($$v) {_vm.$set(_vm.ruleForm, "keyName", $$v)},expression:"ruleForm.keyName"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"","prop":"keyMD5"}},[_c('el-input',{attrs:{"maxlength":"32","placeholder":"请输入32位KEY-MD5值"},model:{value:(_vm.ruleForm.keyMD5),callback:function ($$v) {_vm.$set(_vm.ruleForm, "keyMD5", $$v)},expression:"ruleForm.keyMD5"}})],1)],1)],1)])]):_vm._e(),_vm._v(" "),_c('el-dialog',{staticClass:"small",attrs:{"title":"创建密钥","visible":_vm.dialogCreateKey,"append-to-body":""},on:{"update:visible":function($event){_vm.dialogCreateKey=$event}}},[_c('el-form',{ref:"ruleForm2",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":_vm.$t("views.keyManagement.keys_name"),"prop":"keys_name"}},[_c('el-input',{attrs:{"placeholder":"创建托管密钥"},model:{value:(_vm.ruleForm.keys_name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "keys_name", $$v)},expression:"ruleForm.keys_name"}}),_vm._v(" "),_c('p',[_vm._v("*该方式默认将密钥托管至系统中！")])],1)],1),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogCreateKey = false}}},[_vm._v("取消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.createKey}},[_vm._v("保存")])],1)],1)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"item-encrypt"},[_c('span',[_vm._v("加密算法：")]),_vm._v("AES")])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_uploadFile = (esExports);
// CONCATENATED MODULE: ./src/views/storageManagement/components/uploadFile.vue
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
  uploadFile,
  components_uploadFile,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var storageManagement_components_uploadFile = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/views/storageManagement/fileManagement.vue

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var fileManagement = ({
  name: 'fileManagement',
  components: {
    uploadFile: storageManagement_components_uploadFile
  },
  data: function data() {
    return {
      dios: true,
      dialogNewFlod: false,
      dialogNewFile: false,
      tableData: [],
      params: {
        storageId: 0,
        id: 0
      },
      role: '2',
      is_init: '1',
      url: '',
      filename: '',
      donwloadParams: {},
      pid: 0,
      fileKeyArr: [],
      pageSize: 10,
      newFloderName: '',
      storageId: 0,
      id: 0,
      showBtn: true,
      searchName: '',
      apiFileList: '/storage/objectlist',
      errorString: null,
      Pagination: {
        page: 1,
        total_count: 10
      },
      listLoading: true
    };
  },

  props: {},
  created: function created() {
    this.role = JSON.parse(localStorage.getItem('userinfo')).role;
    this.is_init = this.$parent.is_init;
    this.storageId = this.$route.query.id;
    this.params.storageId = this.$route.query.id;
    this.errorString = this.$t('views.storageManagement.fileManagement.tableFileList.thRecover');
    this.initTable();
    if (this.is_init === 1 && this.role !== 2) {
      this.showBtn = false;
    } else {
      this.showBtn = true;
    }
  },
  mounted: function mounted() {
    // 把根路径加入面包屑
    this.params.id = this.pid;
    this.$refs.seduPathBreadcrumb.addPath({ id: 0 });
  },

  watch: {},
  methods: {
    initTable: function initTable() {
      this.getFileList();
    },
    btnNewFile: function btnNewFile() {
      var _this = this;

      // this.dialogNewFile = false
      this.$refs.uploadComn.newFileCreate().then(function (res) {
        return _this.$refs.uploadComn.getstorageuser();
      }).then(function (res) {
        if (res.code === 200) {
          setTimeout(function () {
            _this.$refs.uploadComn.submitUpload();
          }, 10);
        } else {
          _this.$message({ message: res.message, type: 'error' });
        }
      });
    },
    createFloderDialod: function createFloderDialod() {
      this.dialogNewFlod = true;
    },
    createFloder: function createFloder() {
      var _this2 = this;

      var reg = /^[A-Za-z]+$/g;
      if (!reg.test(this.newFloderName)) {
        this.$message({ message: '文件夹命名格式错误', type: 'error' });
      } else {
        this.dialogNewFlod = false;
        this.$post('/storage/foldercreat', { foldername: this.newFloderName, storage_id: this.storageId, pid: this.pid }).then(function (res) {
          if (res.code === 200) {
            _this2.$message({ message: _this2.$t('views.notification.succeed'), type: 'success' });
            _this2.newFloderName = '';
            _this2.searchNameBtn();
          }
        });
      }
    },

    // 关闭弹窗上传文件
    closeNewFile: function closeNewFile() {
      this.dialogNewFile = false;
      this.searchNameBtn();
    },

    // 获取平台参数
    getPingtai: function getPingtai(row) {
      var _this3 = this;

      console.log(row);
      var parms = {};
      this.$get('/storage/storageuser', { storage_id: this.storageId }).then(function (res) {
        if (res.code === 200) {
          parms.accessid = res.data.accessid;
          parms.accesssecret = res.data.accesssecret;
          parms.bucketname = res.data.storage_name;
          parms.name = row.path;
          _this3.$post('/storage/objectdowdb', { fileid: row.id }).then(function (res) {
            if (res.code === 200) {
              parms.cburl = res.data.returnurl;
              _this3.$post(window.Simple.pingTai + '/oss/user/object/pull', parms).then(function (res) {
                if (res.state === 200) {
                  _this3.$message({ message: '文件获取中，请稍后', type: 'success' });
                  _this3.searchNameBtn();
                }
              });
            }
          });
        } else {
          _this3.$message({
            type: 'error',
            message: res.message
          });
        }
      });
    },

    // 删除文件
    deleteFile: function deleteFile(id) {
      var _this4 = this;

      this.mixinConfirm('/storage/pseudofolderdelete', { folderid: id, force: 1, storage_id: this.storageId }).then(function (res) {
        if (res) {
          // 请求成功回调
          _this4.searchNameBtn();
        }
      });
    },

    // 下载文件
    downloadFile: function downloadFile(row) {
      var link = document.createElement('a');
      link.href = window.Simple.pingTai + '/oss/user/downloads/' + row.dowold + '?saveas=' + row.name;
      console.log(link.href);
      link.download = row.name;
      document.body.appendChild(link);
      setTimeout(function (res) {
        link.click();
        document.body.removeChild(link);
      }, 10);
    },

    // 文件流保存
    // downFile (blob, fileName) {
    //   if (navigator.msSaveBlob) {
    //     navigator.msSaveBlob(blob, fileName)
    //   } else {
    //     let link = document.createElement('a')
    //     link.href = URL.createObjectURL(blob)
    //     link.download = fileName
    //     document.body.appendChild(link)
    //     link.click()
    //     document.body.removeChild(link)
    //     URL.revokeObjectURL(link.href)
    //   }
    // },
    cacheFile: function cacheFile(row) {
      this.getPingtai(row);
    },
    batchDeleteId: function batchDeleteId() {
      if (this.fileKeyArr.length > 0) {
        this.deleteFile(this.fileKeyArr);
        this.fileKeyArr = [];
      } else {
        this.$message({ message: '请选择删除项', type: 'error' });
      }
    },
    selectChange: function selectChange(rows) {
      for (var i = 0; i < rows.length; i++) {
        this.fileKeyArr.push(rows[i].id);
      }
    },
    searchNameBtn: function searchNameBtn() {
      this.Pagination.page = 1;
      this.getFileList();
    },
    pageChange: function pageChange() {
      this.getFileList();
    },
    updateTable: function updateTable(obj) {
      if (!obj) return false;
      //   this.targetPath = obj
      if (obj.status !== '1') {
        this.$message.warning('文件夹未创建成功！');
      } else {
        this.pid = obj.id;
        this.params.id = obj.id;
        this.Pagination.page = 1;
        this.$refs.seduPathBreadcrumb.addPath(obj);
        this.getFileList();
      }
    },
    getBackFileList: function getBackFileList(obj) {
      this.Pagination.page = 1;
      this.pid = obj.pid ? obj.pid : 0;
      this.params.id = obj.id;
      this.getFileList(obj);
    },
    getFileList: function getFileList(obj) {
      var _this5 = this;

      this.listLoading = true;
      var prams = {
        pid: obj ? obj.pid : this.pid,
        storage_id: this.storageId,
        name: this.searchName
      };
      this.$post(this.apiFileList, { StorageObjectSearch: prams, page: this.Pagination.page }, this.errorString).then(function (res) {
        _this5.tableData = [].concat(toConsumableArray_default()(res.data.storage_list));
        _this5.Pagination.total_count = res.data.total_count;
        _this5.listLoading = false;
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-65a7ff6e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/views/storageManagement/fileManagement.vue
var fileManagement_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-container"},[_c('div',{staticClass:"v-line"},[_c('span',{staticClass:"primary-color"},[_vm._v(_vm._s(_vm.$t("views.storageManagement.fileManagement.title")))])]),_vm._v(" "),_c('div',{staticClass:"options"},[_c('div',{staticClass:"search"},[_c('span',[_vm._v("名称")]),_vm._v(" "),_c('el-input',{attrs:{"size":"small"},model:{value:(_vm.searchName),callback:function ($$v) {_vm.searchName=$$v},expression:"searchName"}}),_vm._v(" "),_c('el-button',{staticClass:"views-btn-query",attrs:{"size":"small"},on:{"click":function($event){_vm.searchName=''}}},[_vm._v("重置")]),_vm._v(" "),_c('el-button',{staticClass:"views-btn-query",attrs:{"size":"small"},on:{"click":_vm.searchNameBtn}},[_vm._v("查询")])],1),_vm._v(" "),(_vm.showBtn)?_c('div',{staticClass:"btn-group"},[_c('el-button',{staticClass:"dark mid btn",on:{"click":function($event){_vm.dialogNewFile=true}}},[_vm._v("上传文件")]),_vm._v(" "),_c('el-button',{staticClass:"dark mid btn",attrs:{"size":"small"},on:{"click":_vm.createFloderDialod}},[_vm._v("新建文件夹")]),_vm._v(" "),_c('el-button',{staticClass:"dark mid btn",attrs:{"size":"small"},on:{"click":_vm.batchDeleteId}},[_vm._v(_vm._s(_vm.$t("views.button.batchDelete")))])],1):_vm._e()]),_vm._v(" "),_c('sedu-path-breadcrumb',{ref:"seduPathBreadcrumb",staticStyle:{"font-size":"13px"},attrs:{"matchKeyName":"id","backLabel":_vm.$t('views.storageManagement.fileManagement.seduPathBreadcrumb.backLabel'),"allFileLabel":_vm.$t('views.storageManagement.fileManagement.seduPathBreadcrumb.allFileLabel'),"callBack":_vm.getBackFileList}}),_vm._v(" "),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.listLoading),expression:"listLoading"}],ref:"multipleTable",staticClass:"tab-content",staticStyle:{"margin-top":"10px"},attrs:{"data":_vm.tableData,"default-sort":{prop: 'date', order: 'descending'},"border":""},on:{"selection-change":_vm.selectChange}},[_c('el-table-column',{attrs:{"type":"selection","align":"center","width":"55"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":_vm.$t("views.storageManagement.fileManagement.tableFileList.thName")},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.type=='1')?_c('div',[_c('i',{staticClass:"iconfont icon-wenjianjia",staticStyle:{"color":"#417dd0"}}),_vm._v(" \n          "),_c('a',{attrs:{"href":"javascript:void(0)"},on:{"click":function($event){_vm.updateTable(scope.row)}}},[_c('span',[_vm._v(_vm._s(scope.row.name))])])]):_vm._e(),_vm._v(" "),(scope.row.type=='2')?_c('div',[_c('i',{staticClass:"el-icon-document"}),_vm._v(" \n          "),_c('span',[_vm._v(_vm._s(scope.row.name))])]):_vm._e()]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"align":"center","width":"100","label":_vm.$t("views.storageManagement.fileManagement.tableFileList.thSize")},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v("\n        "+_vm._s(scope.row.size != 0 ? _vm.numberFormatter(scope.row.size, 2):'--')+"\n      ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"align":"center","width":"120","label":_vm.$t("views.storageManagement.fileManagement.tableFileList.thEncipher")},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.type=='1')?_c('div',[_vm._v("\n          --\n        ")]):_c('div',[(scope.row.is_encryption == 1)?_c('el-tag',{attrs:{"type":"success","size":"small"}},[_vm._v(_vm._s(_vm.$t("views.storageManagement.fileManagement.tableFileList.tagEncrypted")))]):_c('el-tag',{attrs:{"type":"info","size":"small"}},[_vm._v(_vm._s(_vm.$t("views.storageManagement.fileManagement.tableFileList.tagUnencrypted")))])],1)]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"align":"center","width":"120","label":_vm.$t("views.storageManagement.fileManagement.tableFileList.thStateFile")},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',[(scope.row.status == 1)?_c('el-tag',{attrs:{"type":"success","size":"small"}},[_vm._v("成功")]):_vm._e(),_vm._v(" "),(scope.row.status == 0)?_c('el-tag',{attrs:{"type":"info","size":"small"}},[_vm._v("加载中")]):_vm._e(),_vm._v(" "),(scope.row.status == 2)?_c('el-tag',{attrs:{"type":"error","size":"small"}},[_vm._v("失败")]):_vm._e()],1)]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"align":"center","label":_vm.$t("views.storageManagement.fileManagement.tableFileList.thDate"),"prop":"update_at"}}),_vm._v(" "),_c('el-table-column',{attrs:{"align":"center","width":"200","label":_vm.$t("views.storageManagement.fileManagement.tableFileList.thAction")},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [((scope.row.type==2 && scope.row.status == 1) && (scope.row.dowoldstatus == 0 ||  scope.row.dowoldstatus == 3) )?_c('button',{staticClass:"btn",on:{"click":function($event){_vm.cacheFile(scope.row)}}},[_vm._v("获取")]):_vm._e(),_vm._v(" "),(scope.row.type==2 && scope.row.status == 1 && scope.row.dowoldstatus == 1)?_c('button',{staticClass:"btn",on:{"click":function($event){_vm.downloadFile(scope.row)}}},[_vm._v("下载")]):_vm._e(),_vm._v(" "),(scope.row.dowoldstatus == 2)?_c('span',[_vm._v("获取中")]):_vm._e(),_vm._v(" "),(scope.row.type==1&&!_vm.showBtn)?_c('span',[_vm._v("--")]):_vm._e(),_vm._v(" "),(_vm.showBtn)?_c('button',{staticClass:"del",on:{"click":function($event){_vm.deleteFile([scope.row.id])}}},[_vm._v(_vm._s(_vm.$t('views.button.delete')))]):_vm._e()]}}])}),_vm._v(" "),_c('div',{attrs:{"slot":"empty"},slot:"empty"},[_c('div',{staticClass:"views-empty"},[_c('span',{staticClass:"views-empty-table"}),_vm._v(" "),_c('p',{staticClass:"views-empty-text"},[_vm._v(_vm._s(_vm.$t('views.table.noData')))])])])],1),_vm._v(" "),_c('el-pagination',{staticClass:"tab-page",attrs:{"layout":"prev, pager, next","page-size":_vm.pageSize,"current-page":_vm.Pagination.page,"total":_vm.Pagination.total_count},on:{"update:currentPage":function($event){_vm.$set(_vm.Pagination, "page", $event)},"current-change":_vm.pageChange}}),_vm._v(" "),_c('el-dialog',{staticClass:"small",attrs:{"title":"新建文件夹","visible":_vm.dialogNewFlod},on:{"update:visible":function($event){_vm.dialogNewFlod=$event}}},[_c('div',{staticClass:"create-flod"},[_c('span',[_vm._v("文件夹名称")]),_vm._v(" "),_c('div',{staticClass:"floder-desc"},[_c('el-input',{attrs:{"size":"small","maxlength":"1023"},model:{value:(_vm.newFloderName),callback:function ($$v) {_vm.newFloderName=$$v},expression:"newFloderName"}}),_vm._v(" "),_c('p',[_vm._v("命名规则：")]),_vm._v(" "),_c('p',[_vm._v("1. 文件夹名称仅为英文字母")]),_vm._v(" "),_c('p',[_vm._v("3. 文件夹的绝对路径总长度不能超过1023字符")])],1)]),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogNewFlod = false}}},[_vm._v("取消")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.createFloder}},[_vm._v("保存")])],1)]),_vm._v(" "),(_vm.donwloadParams)?_c('el-dialog',{staticClass:"small",attrs:{"title":"上传文件","close-on-click-modal":false,"visible":_vm.dialogNewFile},on:{"update:visible":function($event){_vm.dialogNewFile=$event}}},[_c('uploadFile',{directives:[{name:"show",rawName:"v-show",value:(_vm.dialogNewFile),expression:"dialogNewFile"}],ref:"uploadComn",attrs:{"params":_vm.params},on:{"closeNewFile":_vm.closeNewFile}}),_vm._v(" "),_c('div',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.dialogNewFile = false}}},[_vm._v("取消")]),_vm._v(" "),_c('el-button',{staticClass:"primary",attrs:{"type":"primary"},on:{"click":_vm.btnNewFile}},[_vm._v("确定")])],1)],1):_vm._e()],1)}
var fileManagement_staticRenderFns = []
var fileManagement_esExports = { render: fileManagement_render, staticRenderFns: fileManagement_staticRenderFns }
/* harmony default export */ var storageManagement_fileManagement = (fileManagement_esExports);
// CONCATENATED MODULE: ./src/views/storageManagement/fileManagement.vue
var fileManagement_normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var fileManagement___vue_template_functional__ = false
/* styles */
var fileManagement___vue_styles__ = null
/* scopeId */
var fileManagement___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var fileManagement___vue_module_identifier__ = null
var fileManagement_Component = fileManagement_normalizeComponent(
  fileManagement,
  storageManagement_fileManagement,
  fileManagement___vue_template_functional__,
  fileManagement___vue_styles__,
  fileManagement___vue_scopeId__,
  fileManagement___vue_module_identifier__
)

/* harmony default export */ var views_storageManagement_fileManagement = __webpack_exports__["default"] = (fileManagement_Component.exports);


/***/ })

});