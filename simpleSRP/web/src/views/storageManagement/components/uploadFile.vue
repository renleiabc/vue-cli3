/*
 * @Author: 少侠
 * @Date: 2018-08-10 10:25:20
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-10 17:45:37
 * @Description: 上传文件组件
 */

<template>
  <div class="comp-upload-file">
    <div class='flex-between'>
      <el-upload class="upload-demo"
                 ref="upload"
                 :action="uploadUrl"
                 :on-remove="handleRemove"
                 accept=''
                 :on-exceed="handleExceed"
                 :before-upload="beforeAvatarUpload"
                 name='userfile'
                 :limit="1"
                 :auto-upload='false'
                 :on-change='fileChange'
                 :on-success='fileSuccess'
                 :on-error='handleError'
                 :data='uploadParams'
                 :file-list="fileList">
        <el-button size="small"
                   class="view-btn-small sb2">{{$t('views.storageManagement.detail.selectFile')}}</el-button>
      </el-upload>
      <div style="padding:8px 0;">
        <el-checkbox v-model="encrypt">{{$t('views.storageManagement.detail.isEncrypt')}}</el-checkbox>
        <el-tooltip placement="bottom-start">
          <div slot="content">用户可选择是否加密，加密算法目前仅支持AES，加密方式支持托管和<br/>自定义两种，用户可创建托管密钥，自定义密钥需要用户输入KEY和MD5，<br/>系统不做记录，需要用户自行记录</div>
          <i class="iconfont icon-Group"></i>
        </el-tooltip>
      </div>
    </div>
    <div v-if="encrypt"
         class="v-encrypt">
      <div class="item-encrypt">
        <span>{{$t('views.storageManagement.detail.encrypt')}}</span>AES</div>
      <div class="item-encrypt">
        <span>{{$t('views.storageManagement.detail.keys')}}</span>
        <div>
          <el-radio v-model="keyType"
                    :label='true'>{{$t('views.storageManagement.detail.sKeys')}}</el-radio>
          <el-radio v-model="keyType"
                    :label='false'>{{$t('views.storageManagement.detail.myKeys')}}</el-radio>
        </div>
      </div>
      <div v-if="keyType"
           class="item-encrypt">
        <span></span>
        <div>
          <el-select v-model="keySelected"
                     clearable
                     filterable
                     :placeholder='$t("views.button.selectPlease")'>
            <el-option v-for="(item, index) in keyListArr"
                       :key="index"
                       :label="item.enc_title"
                       :value="index">
            </el-option>
          </el-select>
          <a @click="dialogCreateKey=true">{{$t('views.storageManagement.detail.createKeys')}}</a>
        </div>
      </div>
      <div v-else
           class="item-encrypt">
        <span></span>
        <div>
          <el-form :model="ruleForm"
                   :rules="rules"
                   ref="ruleForm"
                   label-width="0"
                   class="demo-ruleForm">
            <el-form-item label=""
                          prop="keyName">
              <el-input maxlength="32"
                        @change='valueMD'
                        :placeholder="$t('views.storageManagement.detail.placeholderKey1')"
                        v-model.trim="ruleForm.keyName"></el-input>
            </el-form-item>
            <el-form-item label=""
                          prop="keyMD5">
              <el-input maxlength="32"
                        :disabled="true"
                        :placeholder="$t('views.storageManagement.detail.placeholderKey2')"
                        v-model="ruleForm.keyMD5"></el-input>
            </el-form-item>
            <p style="color:red;">注意保存自己设置的KEY和MD5值</p>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog :title='$t("views.keyManagement.createKey")'
               :visible.sync="dialogCreateKey"
               class='small'
               @close='handleClose2'
               append-to-body>
      <el-form :model="ruleForm"
               :rules="rules"
               @submit.native.prevent
               ref="ruleForm2"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item :label='$t("views.keyManagement.keys_name")'
                      prop="keys_name">
          <el-input v-model="ruleForm.keys_name"
                    maxlength="30"
                    :placeholder='$t("views.keyManagement.createKey")'></el-input>
          <p>{{$t("views.keyManagement.tipStrKey")}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogCreateKey = false">{{$t('views.button.cancel')}}</el-button>
        <el-button type="primary"
                   @click="createKey">{{$t('views.button.save')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as validFun from '@/util/validate'
import md5 from 'js-md5'
import { mapGetters } from 'vuex'
export default {
  name: 'uploadFile',
  props: {
    params: {
      type: Object
    }
  },
  data () {
    // var validate32 = (rule, value, callback) => {
    //   if (value.trim() !== '') {
    //     if (!validFun.key32(value) || value.length !== 32) {
    //       callback(new Error('请输入32位字母数字组合'))
    //     } else {
    //       callback()
    //     }
    //   } else {
    //     callback(new Error(this.$t('views.validError.notNull')))
    //   }
    // }
    var validateCommon = (rule, value, callback) => {
      if (value.trim() !== '') {
        if (!validFun.valiName(value)) {
          callback(new Error(this.$t('views.validError.validStr')))
        } else {
          callback()
        }
      } else {
        callback(new Error(this.$t('views.validError.notNull')))
      }
    }
    return {
      ruleForm: {
        keyName: '',
        keys_name: '',
        keyMD5: ''
      },
      rules: {
        keys_name: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' },
          { validator: validateCommon, trigger: 'blur' }
        ],
        keyName: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }
        ]
      },
      uploadUrl: window.Simple.pingTai + '/filestorage/file/upload',
      // uploadUrl: 'http://192.168.201.27:9099/filestorage/file/upload',
      keySelected: '',
      keyListArr: [],
      keyName: '',
      isUpload: false,
      isFileSize: true,
      keyType: true,
      encrypt: false,
      dialogCreateKey: false,
      failFileList: [],
      newFile: '',
      uploadParams: {},
      fileList: []
    }
  },
  computed: {
    ...mapGetters(['getterStorageUser'])
  },
  created () {
    this.$get('/encrypt/find', '').then(res => {
      this.keyListArr = res.data.encryt_list
    })
    this.storageUser()
  },
  methods: {
    storageUser () {
      this.uploadParams.accessid = this.getterStorageUser.accessid
      this.uploadParams.accesssecret = this.getterStorageUser.accesssecret
      this.uploadParams.username = this.getterStorageUser.keyname
      this.uploadParams.passwd = this.getterStorageUser.keypassword
      return this.uploadParams
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      if (this.uploadFileId) {
        this.$parent.$parent.deleteFile2([this.uploadFileId])
      }
      this.$emit('updataLoding')
      this.newFile = ''
      this.isUpload = false
    },
    initUpload () {
      this.encrypt = false
      this.keyType = true
      this.isUpload = false
      this.fileList = []
      this.keySelected = ''
      this.isFileSize = true
      this.newFile = ''
      this.ruleForm.keyName = ''
      this.ruleForm.keyMD5 = ''
      this.ruleForm.keys_name = ''
    },
    beforeAvatarUpload (file) {
      // let isPass = false
      // const isJPG = file.type === 'image/jpg'
      // const isJPEG = file.type === 'image/jpeg'
      // const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1024

      // if (isJPG || isJPEG || isPNG) {
      //   isPass = true
      // } else {
      //   isPass = false
      //   this.$message.error('上传图片格式错误!')
      // }
      if (!isLt2M) {
        this.$message.error(this.$t('views.storageManagement.detail.fileSize'))
        this.$emit('updataLoding')
      }
      this.states = 1
      // return isPass && isLt2M
      return isLt2M
    },
    fileSuccess (response, file, fileList) {
      if ((response.code - 0) === 200) {
        // 成功上传后清楚数据
        localStorage.setItem('objectAffair', null)
        // console.log(localStorage.getItem('objectAffair')+'释放')
        this.$emit('closeNewFile')
        this.$message({ message: this.$t('views.notification.succeed'), type: 'success' })
        this.$refs.upload.clearFiles()
      } else {
        localStorage.setItem('objectAffair', null)
        this.$message({ message: response.message, type: 'error' })
      }
    },
    valueMD (val) {
      this.ruleForm.keyMD5 = md5(val)
    },
    submitUpload () {
      this.isUpload = true
      this.$parent.$parent.uploading = true
      setTimeout(() => { this.$refs.upload.submit() }, 10)
      // this.uploadUrl.slice(0, -1)
    },
    getstorageuser () {
      let isEncryption = this.encrypt ? 1 : 0 // 0 未加密
      if (isEncryption) {
        isEncryption = this.keyType ? 1 : 2 // 1 系统密钥加密  2 自定义密钥加密
      }
      // console.log(isEncryption)
      let parms = { storage_id: this.params.storageId, is_encryption: isEncryption, size: this.newFile.size, folderid: this.params.id, name: this.newFile.name }
      return new Promise((resolve, reject) => {
        // console.log(this.newFile)
        if (this.newFile === '') {
          resolve({ code: 500, message: '请选择上传文件' })
        } else if (this.isFileSize) {
          // 放入事务数据
          let obj = {}
          obj.storage_id = parms.storage_id
          obj.name = parms.name
          obj.pid = parms.folderid
          localStorage.setItem('objectAffair', JSON.stringify(obj))
          this.$post('/storage/objectpushdb', parms).then(res => {
            if (res.code === 200) {
              this.uploadFileId = res.data.id
              this.uploadParams.callBack = res.data.returnurl
              this.uploadParams.destinationFold = res.data.Catalogpath
            } else {
              this.$message({
                type: 'error',
                message: res.message
              })
              this.fileList = []
              this.newFile = ''
            }
            resolve(res)
          })
        } else {
          resolve({ code: 200 })
        }
      })
    },
    createKey () {
      if (this.ruleForm.keys_name.trim() === '') {
        this.$message({ message: this.$t('views.validError.notNull'), type: 'error' })
        return false
      }
      let titleEn = {}
      titleEn.enc_title = this.ruleForm.keys_name
      this.$refs['ruleForm2'].validate((valid) => {
        if (valid) {
          this.$post('/encrypt/create', { Encryption: titleEn }).then(data => {
            if (data.code === 200) {
              this.$message({ message: this.$t('views.notification.saved'), type: 'success' })
              this.dialogCreateKey = false
              this.$get('/encrypt/find', '').then(res => {
                this.keyListArr = res.data.encryt_list
                this.$nextTick(function () {
                  this.keySelected = 0
                })
              })
            } else {
              this.keySelected = ''
              this.$message({ message: data.message, type: 'error' })
            }
          })
        }
      })
    },
    getVerify (md5) {
      let url = window.Simple.pingTai + '/oss/keysignature/' + md5
      let res = ''
      this.$get(url).then(data => {
        res = data.data
      })
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    },
    newFileCreate () {
      return new Promise((resolve, reject) => {
        if (this.encrypt) {
          if (this.keyType) {
            // console.log(this.keySelected)
            if (this.keySelected !== '' && this.keySelected >= 0) {
              this.uploadParams.enKey = this.keyListArr[(this.keySelected)].enc_key_md5
              this.uploadParams.encrypt = true
              resolve(true)
            } else {
              reject('请选择密钥')
            }
          } else {
            this.$refs.ruleForm.validate().then(res => {
              console.log(res)
              this.uploadParams.enKey = this.ruleForm.keyMD5
              this.uploadParams.encrypt = true
              resolve(true)
              // let url = window.Simple.pingTai + '/oss/keysignature/' + this.ruleForm.keyName
              // // this.uploadParams.pin = this.ruleForm.keyName
              // this.uploadParams.enKey = this.ruleForm.keyName
              // this.$get(url).then(data => {
              //   // console.log(data)
              //   if (data.state === 200) {
              //     this.uploadParams.encrypt = true
              //     resolve(true)
              //   } else {
              //     reject('key验证失败')
              //   }
              // }).catch(function (reason) {
              //   reject('')
              // })
            }).catch(function (reason) {
              reject('')
            })
          }
        } else {
          this.uploadParams.enKey = ''
          this.uploadParams.encrypt = false
          resolve(true)
        }
      })
    },
    handleClose2 () {
      this.$refs['ruleForm2'].resetFields()
      this.ruleForm.keys_name = ''
    },
    fileChange (file, fileList) {
      console.log(fileList, file)
      this.$parent.$parent.uploading = false
      this.newFile = ''
      this.isFileSize = file.size / 1024 / 1024 < 1024
      this.newFile = (file)
      this.fileList = fileList.splice(-1)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`只能选择一个文件`)
    },
    handleError (error, file) {
      console.log(error, file)
      this.isUpload = false
      this.$parent.$parent.uploading = false
      this.$parent.$parent.deleteFile2([this.uploadFileId])
      this.failFileList.push(file)
      this.$message({
        type: 'error',
        message: this.$t('views.storageManagement.valid.uploadFile', { 'name': file.name })
      })
    }
  }
}
</script>
