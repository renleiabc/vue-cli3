/*
 * @Author: 少侠
 * @Date: 2018-08-10 10:25:20
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-10 17:45:37
 * @Description: 上传文件组件
 */

<template>
  <div class="comp-upload-file">
    <el-upload class="upload-demo"
               ref="upload"
               :action="uploadUrl"
               :on-remove="handleRemove"
               accept=''
               :before-upload="beforeAvatarUpload"
               name='upload'
               :auto-upload='false'
               :on-change='fileChange'
               :before-remove="beforeRemove"
               :on-success='fileSuccess'
               :on-error='handleError'
               :data='uploadParams'
               :file-list="fileList">
      <el-button size="small"
                 class="view-btn-small">选择文件</el-button>
      <div slot="tip"
           class="el-upload__tip">文件大小限制为1G</div>
    </el-upload>
    <div style="padding:10px 0;">
      <el-checkbox v-model="encrypt">加密</el-checkbox>
      <el-tooltip content="Bottom Center 提示文字"
                  placement="bottom-start">
        <i class="iconfont icon-Group"></i>
      </el-tooltip>
    </div>
    <div v-if="encrypt"
         class="v-encrypt">
      <div class="item-encrypt">
        <span>加密算法：</span>AES</div>
      <div class="item-encrypt">
        <span>密钥：</span>
        <div>
          <el-radio v-model="keyType"
                    :label='true'>托管密钥</el-radio>
          <el-radio v-model="keyType"
                    :label='false'>自定义密钥</el-radio>
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
          <a @click="dialogCreateKey=true">创建密钥</a>
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
                        placeholder="请输入KEY值"
                        v-model="ruleForm.keyName"></el-input>
            </el-form-item>
            <el-form-item label=""
                          prop="keyMD5">
              <el-input maxlength="32"
                        placeholder="请输入32位KEY-MD5值"
                        v-model="ruleForm.keyMD5"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-dialog title="创建密钥"
               :visible.sync="dialogCreateKey"
               class='small'
               append-to-body>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm2"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item :label='$t("views.keyManagement.keys_name")'
                      prop="keys_name">
          <el-input v-model="ruleForm.keys_name"
                    placeholder='创建托管密钥'></el-input>
          <p>*该方式默认将密钥托管至系统中！</p>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogCreateKey = false">取消</el-button>
        <el-button type="primary"
                   @click="createKey">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'uploadFile',
  props: {
    params: {
      type: Object
    }
  },
  data () {
    return {
      ruleForm: {
        keyName: '',
        keys_name: '',
        keyMD5: ''
      },
      rules: {
        keys_name: [
          { required: true, message: '请输入密钥名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'change' }
        ],
        keyName: [
          { required: true, message: '请输入KEY值', trigger: 'blur' }
        ],
        keyMD5: [
          { required: true, message: '请输入KEY-MD5值', trigger: 'blur' },
          { min: 32, max: 32, message: '长度在为32个字符', trigger: 'blur' }
        ]
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
    }
  },
  created () {
    this.$get('/encrypt/find', '').then(res => {
      this.keyListArr = res.data.encryt_list
    })
    this.$get('/storage/storageuser', {storage_id: this.params.storageId}).then(res => {
      if (res.code === 200) {
        this.uploadParams = {...res.data}
        this.uploadParams.accessid = res.data.accessid
        this.uploadParams.accesssecret = res.data.accesssecret
        this.uploadParams.tenantid = res.data.tenantid
        this.uploadParams.bucketname = res.data.storage_name
      } else {
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    })
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
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
        this.$message.error('上传文件大小不能超过 1G!')
      }
      this.states = 1
      // return isPass && isLt2M
      return isLt2M
    },
    fileSuccess (response, file, fileList) {
      console.log(response)
      if (response.state === 200) {
        this.$emit('closeNewFile')
        this.$message({message: '上传成功', type: 'success'})
        this.$refs.upload.clearFiles()
      } else {
        this.$message({message: response.message, type: 'error'})
      }
    },
    submitUpload () {
      // this.uploadUrl = '//192.168.200.148:2020/dl/v1/oss/user/object/push?'
      // for (let k in this.uploadParams) {
      //   this.uploadUrl += k + '=' + this.uploadParams[k] + '&'
      // }
      setTimeout(() => { this.$refs.upload.submit() }, 10)
      // this.uploadUrl.slice(0, -1)
    },
    getstorageuser () {
      let isEncryption = this.encrypt ? 1 : 0
      let parms = {storage_id: this.params.storageId, is_encryption: isEncryption, size: this.newFile.size, folderid: this.params.id, name: this.newFile.name}
      console.log(this.newFile)
      return new Promise((resolve, reject) => {
        this.$post('/storage/objectpushdb', parms).then(res => {
          if (res.code === 200) {
            this.uploadParams.cburl = res.data.returnurl
            this.uploadParams.name = res.data.pathname
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
          resolve(res)
        })
      })
    },
    createKey () {
      console.log(this.keyName)
      if (this.keyName.trim() === '') {
        this.$message({ message: '不能为空', type: 'error' })
        return false
      }
      let titleEn = {}
      titleEn.enc_title = this.keyName
      this.$post('/encrypt/create', { Encryption: titleEn }).then(data => {
        if (data.code === 200) {
          this.$message({ message: this.$t('views.notification.saved'), type: 'success' })
          this.dialogCreateKey = false
          this.$get('/encrypt/find', '').then(res => {
            this.keyListArr = res.data.encryt_list
          })
        } else {
          this.$message({ message: data.message, type: 'error' })
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
      if (this.encrypt) {
        if (this.keyType) {
          this.uploadParams.pin = this.keyListArr[(this.keySelected)].enc_key
          this.uploadParams.verify = this.keyListArr[(this.keySelected)].enc_key_md5
        } else {
          let url = window.Simple.pingTai + '/oss/keysignature/' + this.ruleForm.keyMD5
          // this.uploadParams.pin = this.ruleForm.keyName
          this.uploadParams.pin = this.ruleForm.keyMD5
          this.$get(url).then(data => {
            this.uploadParams.verify = data.data
          })
        }
      } else {
        this.uploadParams.pin = ''
      }
      return new Promise((resolve, reject) => {
        resolve(true)
      })
    },
    fileChange (file, fileList) {
      this.newFile = ''
      this.newFile = (file)
      this.fileList = fileList.splice(-1)
    },
    handleError (error, file) {
      console.log(error, file)
      this.failFileList.push(file)
      this.$message({
        type: 'error',
        message: `文件${file.name}上传失败，请重试`
      })
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
