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
  </div>
</template>

<script>
export default {
  name: 'uploadUser',
  props: {
    params: {
      type: Object
    }
  },
  data () {
    return {
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
