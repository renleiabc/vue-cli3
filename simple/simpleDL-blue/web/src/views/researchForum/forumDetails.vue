/*
 * @Author: aFei
 * @Date: 2018-08-06 15:33:58
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-13 16:20:29
*/
<template>
  <div class="views-research-forum-details">
    <p class="forum-title">
      {{forum.title}}
      <el-button class="btn dark small"
                 @click="showReplyPop">{{$t("views.researchForum.reply")}}</el-button>
    </p>
    <div class="content">
      <div class="title">
        <div>
          <span>{{$t("views.researchForum.author")}}：{{forum.user_name}}</span>
          |
          <span>{{$t("views.researchForum.issuingTime")}}：{{forum.created_at}}</span>
        </div>
        <div>
          <span>{{$t("views.researchForum.click")}}：{{forum.views}}</span>
          |
          <span>{{$t("views.researchForum.reply")}}：{{forum.reply_num}}</span>
        </div>
      </div>
      <div class="msg"
           v-html="forum.content"></div>
    </div>
    <!-- 帖子回复 -->
    <ul class="reply"
        v-if="isReply">
      <li :key="index"
          v-for="(item,index) in reply_list">
        <p class="name">{{$t("views.researchForum.replies")}}：{{item.replyer}}</p>
        <p v-html="item.content"
           class="views-forum-reply"></p>
        <p class="time">
          {{$t("views.researchForum.postingTime")}}：{{item.created_at}}
          <button @click="deleteItem(item.id)"
                  v-if="item.delete==='delete'">
            <i class="icon iconfont icon-shanchu2"></i>{{$t("views.researchForum.delete")}}</button>
        </p>
      </li>
    </ul>

    <!-- 当回复为空的时候显示 -->
    <div class="views-empty reply"
         v-else>
      <span class="views-empty-table"></span>
      <p class="views-empty-text">暂无回复</p>
    </div>
    <el-dialog class="replyPop big"
               :title='$t("views.researchForum.postReply")'
               :visible.sync="replyPop"
               @close="closeReply">
      <div class="content">
        <vue-ueditor-wrap ref="ueditor"
                          v-model="forumMsg.content"
                          :destroy="false"
                          :config="config"
                          @ready="ready"
                          :init="myInit"
                          :defaultMsg='uetest'></vue-ueditor-wrap>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="cancel"
                   @click="replyPop = false">{{$t("views.researchForum.cancel")}}</el-button>
        <el-button class="primary"
                   type="primary"
                   @click="changeReplyPop"
                   :disabled="loading">{{$t("views.researchForum.release")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
  name: 'forumDetails',
  data () {
    return {
      forumMsg: {
        forum_id: '',
        content: '啊实打实打算'
      },
      forum: {},
      obj: {
        forum_id: ''
      },
      loading: false,
      isReply: false,
      load: true,
      reply_list: [],
      uetest: '请输入内容asdasdasdasd',
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
        // 关闭自动保存
        enableAutoSave: true,
        initialContent: '',
        autoClearinitialContent: false
      },
      userCharacter: '',
      replyPop: false
    }
  },
  components: { VueUeditorWrap },
  methods: {
    // 请求帖子详情的借口
    getForumdetail (obj) {
      this.$get('/forum/forumdetail', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.forum = res.data.forum
          this.reply_list = res.data.forum_article
          if (this.reply_list.length === 0) {
            this.isReply = false
          } else {
            this.isReply = true
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
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
    // 删除回帖
    deleteItem (id) {
      this.$confirm('确定删除该帖子回复?', '删除帖子回复', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          forum_article_id: id
        }
        this.$post('/forum/deletforumarticle', obj).then(res => {
          // console.log(JSON.stringify(res))
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.getForumdetail(this.obj)
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      }).catch(() => {
      })
    },
    showReplyPop () {
      this.replyPop = true
      this.forumMsg.content = ''
    },
    // 确定回复贴子
    changeReplyPop () {
      // console.log(this.forumMsg.content)
      this.loading = true
      this.forumMsg.content = this.ue.getContent()
      if (this.forumMsg.content === '') {
        this.$message({
          message: '回复内容不能为空',
          type: 'warning'
        })
        return false
      } else {
        this.$post('/forum/forumreply', this.forumMsg).then(res => {
          // console.log(JSON.stringify(res))
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.getForumdetail(this.obj)
            this.replyPop = false
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
            this.loading = false
          }
        })
      }
    },
    closeReply () {
      this.loading = false
    }
  },
  created () {
    // console.log(this.$route.query.forumId)
    this.obj.forum_id = this.forumMsg.forum_id = this.$route.query.forumId
    // console.log(this.obj, this.forumMsg)
    // 默认情况下请求论坛详情数据
    this.getForumdetail(this.obj)
  }
}
</script>
