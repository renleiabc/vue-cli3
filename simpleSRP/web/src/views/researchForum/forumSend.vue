/*
* @Author: aFei
* @Date: 2018-08-08 09:46:44
* @LastEditors: 任雷雷
* @LastEditTime: 2018-08-30 17:14:05
* @Description:科技论坛-发帖
*/
<template>
  <div class="views-research-forum-send">
    <div class="title">
      <div>
        {{$t("views.researchForum.theme")}}
        <el-input v-model="title"
                  :placeholder='$t("views.researchForum.enter")'
                  maxlength="80"
                  clearable></el-input>
      </div>
      <div>
        {{$t("views.researchForum.postType")}}
        <el-radio-group v-model="forumaddper.type"
                        @change="radioChange">
          <el-radio :label="item.value"
                    v-for="(item,index) in forumaddper.data"
                    :key="index">
            {{item.label}}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <vue-ueditor-wrap ref="ueditor"
                      v-model="content"
                      :destroy="false"
                      :config="config"
                      @ready="ready"
                      :init="myInit"></vue-ueditor-wrap>
    <div class="controls">
      <el-button class="btn dark"
                 @click="clearMsg">{{$t("views.researchForum.empty")}}</el-button>
      <el-button class="btn dark"
                 @click="sendMsg"
                 :loading="loading">{{$t("views.researchForum.publish")}}</el-button>
    </div>
  </div>
</template>

<script>

import VueUeditorWrap from '@/components/vue-ueditor-wrap'

export default {
  name: 'forumSend',
  data () {
    return {
      title: '',
      content: '',
      loading: false,
      type: 1,
      // 4、根据项目需求自行配置,具体配置参见ueditor.config.js源码或 http://fex.baidu.com/ueditor/#start-start
      config: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        serverUrl: window.Simple.php + '/controller.php',
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: '/static/UEditor/',
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 400,
        // 初始容器宽度
        initialFrameWidth: '100%',
        lang: 'en',
        // 关闭自动保存
        enableAutoSave: true
      },
      ue: null,
      userCharacter: ''
    }
  },
  components: { VueUeditorWrap },
  methods: {
    // 5、 你可以在ready方法中拿到editorInstance实例,之后的所有API就和官方的实例一样了,Just Do What You Want! http://fex.baidu.com/ueditor/#api-common
    ready (editorInstance) {
      console.log(`你要的实例${editorInstance.key}在此:`, editorInstance)
      this.ue = editorInstance
    },
    // 7. 结合init方法,自定义按钮
    myInit () {
      this.$refs.ueditor.registerButton({
        name: 'test',
        icon: './static/test-button.png',
        tip: 'this is a test tip',
        handler: (editor, name) => {
          editor.execCommand('inserthtml', `<span>text inserted by test button</span>`)
        }
      })
    },
    // 清空
    clearMsg () {
      this.title = ''
      this.content = ''
    },
    // 发帖
    sendMsg () {
      var reg = /^\s*$/g
      // console.log(this.ue.getContent())
      // console.log(this.forumaddper.type)
      this.content = this.ue.getContent()
      console.log(this.content)
      if (this.title === '' || reg.test(this.title) || this.title == null) {
        this.$message({
          message: '主题不能为空',
          type: 'warning'
        })
        return false
      } else if (this.content === '' || reg.test(this.content)) {
        this.$message({
          message: '内容不能为空或者只有特殊字符',
          type: 'warning'
        })
        return false
      } else {
        this.loading = true
        let obj = {}
        obj.title = this.title
        obj.content = this.content
        obj.type = this.forumaddper.type
        // console.log(JSON.stringify(obj))
        this.$post('/forum/saveforum', obj).then(res => {
          // console.log(JSON.stringify(res))
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.clearMsg()
            this.loading = false
            this.$router.go(-1)
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      }
    },
    radioChange (val) {
      console.log(val)
      // this.type = val
    }
  },
  created () {
    this.config.lang = this.$store.getters.language === 'zh' ? this.$store.getters.language + '-cn' : this.$store.getters.language
    this.userCharacter = this.$store.getters.checkUserCharacter
    // 请求发帖类型，函数调用
    this.$store.dispatch('getforumaddper')
    this.type = this.forumaddper
  },
  computed: {
    forumaddper () {
      /// console.log(JSON.stringify(this.$store.getters.postForumaddper))
      return this.$store.getters.postForumaddper
    }
  }
}
</script>
