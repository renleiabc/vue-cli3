<template>
  <div :class=cname
       :style=myStyle
       :id=domId>
    <div v-if="filesArr.length>0">
      <div v-for="(item) in filesArr"
           :key="item.name">
        <p>{{content.name}}：{{item.name}}</p>
        <div>{{content.progress}}：
          <div class="v-progress">
            <el-progress :stroke-width="18"
                         :text-inside="true"
                         :percentage="progressFn"></el-progress>
          </div>
        </div>
        <p v-if="uploadState==0">{{content.stateStr}}：{{content.unUpload}}</p>
        <p v-if="uploadState==1">{{content.stateStr}}：{{content.uploading}}</p>
        <p v-if="uploadState==2">{{content.stateStr}}：{{content.paused}}</p>
        <p v-if="uploadState==3">{{content.stateStr}}：{{content.uploadFinish}}</p>
        <p v-if="uploadState==4">{{content.stateStr}}：{{content.uploadFail}}</p>
        <p>
          <el-button type="primary"
                     size="small"
                     v-if="uploadState==0"
                     @click="upload()">{{content.aUpload}}</el-button>
          <el-button type="warning"
                     size="small"
                     v-if="uploadState==1"
                     @click="pauseUpload(item)">{{content.aPause}}</el-button>
          <el-button type="primary"
                     size="small"
                     v-if="uploadState==2"
                     @click="resume(item)">{{content.aContinue}}</el-button>
          <el-button type="success"
                     size="small"
                     v-if="uploadState==4"
                     @click="retry(item)">{{content.aRetry}}</el-button>
          <el-button type="danger"
                     size="small"
                     v-if="uploadState!=1"
                     @click="deleteFile(item)">{{content.aDelete}}</el-button>
          <!-- <button  v-if="uploadState==1" @click="pauseUpload(item)">{{content.aPause}}</button>
          <button  v-if="uploadState==2" @click="resume(item)">{{content.aContinue}}</button>
          <button  v-if="uploadState==4" @click="retry(item)">{{content.aRetry}}</button>
          <button  v-if="uploadState!=1" @click="deleteFile(item)">{{content.aDelete}}</button> -->
        </p>
      </div>
    </div>
    <div ref="uploadDropTarget"
         :class="{ hide: filesArr.length!=0 }">
      <span>{{content.msg.tip}}</span>
      <input class="file-hide"
             type="file"
             ref="uploadBrowseButton">
    </div>
  </div>
</template>
<script>
import Uploader from './src/uploader'
import lang from './lang'

export default {
  name: 'BreakpointUpload',
  props: {
    language: {
      type: String,
      default: 'zh'
    },
    params: Object,
    myStyle: {
      type: String,
      default: ''
    },
    cname: {
      type: String,
      default: 'breakpoint-upload'
    },
    domId: {
      type: String,
      default: 'components-upload'
    }
  },
  data () {
    return {
      progress: 0,
      uploader: '',
      defaultParams: {
        target: '//192.168.201.17:3000/upload',
        singleFile: true,
        onDropStopPropagation: true, // 火狐拖动禁止弹窗
        typeArr: [],
        chunkSize: 1 * 1024 * 1024
      },
      content: '',
      filesArr: [],
      uploadState: 0 // 0 未开始 1 上传中 2 已暂停 3上传成功 4 上传失败
    }
  },
  computed: {
    progressFn: function () {
      return this.progress
    }
  },
  beforeMount () {
    if (this.content === '') {
      this.content = lang[this.language]
    }
  },
  mounted () {
    let $this = this
    this.defaultParams = { ...this.defaultParams, ...this.params }
    this.defaultParams.singleFile = true
    console.log(this.defaultParams)
    if (this.uploader === '') {
      if (lang[this.language]) {
        this.content = lang[this.language]
      }
      this.uploader = new Uploader(this.defaultParams)
    }
    this.uploader.assignBrowse(this.$refs.uploadBrowseButton)
    this.uploader.assignDrop(this.$refs.uploadBrowseButton)
    // 添加文件事件监听
    this.uploader.on('fileAdded', function (file, event) {
      let type = file.getExtension().toLowerCase()
      $this.uploadState = 0
      $this.progress = 0
      if ($this.validType($this.defaultParams.typeArr, type)) {
        if ($this.defaultParams.singleFile) {
          $this.$set($this.filesArr, 0, file)
        } else {
          $this.filesArr.push(file)
        }
      } else {
        $this.callback($this.content.msg.formatErr)
      }
    })
    // 某个文件上传失败了
    this.uploader.on('fileError', function (rootFile, file, message) {
      $this.uploadState = 4
      $this.progress = 0
      $this.callback(message)
    })

    this.uploader.on('fileSuccess', function (rootFile, file, message) {
      $this.uploadState = 3
      $this.callback(message)
    })
    // 上传进度
    this.uploader.on('fileProgress', function (rootFile, file) {
      // Handle progress for both the file and the overall upload
      $this.progress = Math.floor(rootFile.progress() * 100)
      // console.log(Uploader.utils.formatSize(rootFile.averageSpeed))
      // console.log(rootFile.timeRemaining())
    })
  },

  methods: {
    validType: function (arr, type) {
      if (arr.length > 0) {
        return arr.indexOf(type) !== -1
      } else {
        return true
      }
    },
    callback: function (data) {
      this.$emit('resultUploader', data)
    },
    upload: function (item) {
      this.uploadState = 1
      this.uploader.upload()
    },
    deleteFile: function (item) {
      item.cancel()
      if (item.progress() > 0) {
        this.$emit('deleteFiles', item)
      }
      this.uploadState = 0
      this.filesArr = []
    },
    pauseUpload: function (item) {
      console.log(item)
      this.uploadState = 2
      item.pause()
    },
    resume: function (item) {
      this.uploadState = 1
      item.resume()
    },
    retry: function (item) {
      console.log(item)
      this.uploadState = 1
      item.retry()
    }
  },
  watch: {
    language: {
      handler (options, oldOptions) {
        if (options) {
          this.content = lang[this.language]
        }
      }
    }
  }
}
</script>
<style lang="less">
.breakpoint-upload {
  position: relative;
  padding: 16px 12px;
  border: 1px dashed #ccc;
  background-color: #ddd;
  p {
    min-width: 200px;
    overflow: hidden;
    line-height: 200%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .v-progress {
    display: inline-block;
    width: 200px;
  }
  .file-hide {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .hide {
    display: none;
  }
}
</style>
