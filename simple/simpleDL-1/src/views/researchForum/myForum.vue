/*
* @Author: aFei
* @Date: 2018-07-10 15:52:29
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:26:40
*/
<template>
  <div class="views-research-forum-my">
    <el-tabs v-model="activeName"
             @tab-click="searchTabs">
      <el-tab-pane :label='item.label'
                   :name="item.name"
                   v-for="(item,index) in tag"
                   :key="index">
        <div class="tab-select">
          <div>
            <el-input :placeholder='$t("views.researchForum.enter")'
                      v-model="obj.keyword"
                      clearable>
              <el-button @click="doSearch"
                         slot="append"
                         icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div>
            <el-button class="btn dark small link">
              <router-link :to="{name:'forumSend'}">
                {{$t("views.researchForum.post")}}
              </router-link>
            </el-button>
          </div>
        </div>
        <!-- 选择不同的类型 -->
        <p class="sel">
          <button v-for="(item,index) in type"
                  :class="{active:item.active}"
                  @click="changeType(index)"
                  :key="index">
            {{item.label}}
          </button>
        </p>
        <el-table class="tab-content"
                  :data="forumData"
                  v-loading="loading"
                  @sort-change="sortChange">
          <el-table-column :label='$t("views.researchForum.postTopic")'>
            <template slot-scope="scope">
              <router-link class="link"
                           :to="{name:'forumDetails',query:{forumId:scope.row.id}}">
                <i :class="scope.row.type==='1'?'icon-bangzhu':scope.row.type==='2'?'icon-fenxiang':scope.row.type==='3'?'icon-tongzhi1':'icon-notice'"
                   class="icon iconfont"></i>
                {{scope.row.title}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column :label='$t("views.researchForum.authorReleaseTime")'
                           width="180"
                           sortable='custom'
                           prop="created_at">
            <template slot-scope="scope">
              <p class="top">{{scope.row.user_name}}</p>
              <p class="bottom">{{scope.row.created_at}}</p>
            </template>
          </el-table-column>
          <el-table-column :label='$t("views.researchForum.replyClick")'
                           width="180"
                           sortable='custom'
                           prop="views">
            <template slot-scope="scope">
              <p class="top">{{scope.row.reply_num}}</p>
              <p class="bottom">{{scope.row.views}}</p>
            </template>
          </el-table-column>
          <!-- 最后回复 -->
          <el-table-column :label='$t("views.researchForum.lastReply")'
                           width="180"
                           sortable='custom'
                           prop="last_at">
            <template slot-scope="scope">
              <div v-if="scope.row.last_reply ===null">
                --
              </div>
              <div v-else>
                <p class="top">{{scope.row.last_reply}}</p>
                <p class="bottom">{{scope.row.last_at}}</p>
              </div>
            </template>
          </el-table-column>
          <!--暂无数据情况-->
          <div slot="empty">
            <div class="views-empty">
              <span class="views-empty-table"></span>
              <p class="views-empty-text">{{$t('views.table.noData')}}</p>
            </div>
          </div>
        </el-table>
        <el-pagination class="tab-page"
                       layout="prev, pager, next"
                       :page-size="per"
                       :current-page.sync="currentPage"
                       :total="total"
                       @current-change="changePageTabs"
                       v-show='isCount'></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { sortData } from '../../util/index.js'
export default {
  name: 'myForum',
  data () {
    return {
      activeName: 'first', // 当前激活页
      total: 0,
      per: 0,
      currentPage: 1,
      loading: true,
      forumData: [],
      isCount: false,
      obj: {
        page: 0,
        keyword: '',
        type: 0,
        created_at: '',
        last_at: '',
        views: '',
        id: 'DESC',
        card: 1
      },
      tag: [
        { label: this.$t('views.researchForum.myPosts'), name: 'first', lazy: true },
        { label: this.$t('views.researchForum.iParticipated'), name: 'second', lazy: true }
      ],
      type: [
        { label: this.$t('views.researchForum.all'), active: true },
        { label: this.$t('views.researchForum.help'), active: false },
        { label: this.$t('views.researchForum.share'), active: false },
        { label: this.$t('views.researchForum.notice'), active: false },
        { label: this.$t('views.researchForum.announcement'), active: false }
      ]
    }
  },
  methods: {
    // 请求论坛表格的数据
    getForumData (obj) {
      this.$get('/forum/myforummanagelist', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.loading = false
          this.forumData = res.data.forums
          let total = res.data.total_count
          let per = res.data.per_page
          if (total <= per) {
            this.isCount = false
          } else {
            this.isCount = true
            this.per = per
            this.total = total
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // tag事件调用
    searchTabs () {
      //  清除搜索条件函数调用
      this.clearSearch()
      this.initTag()
      switch (this.activeName) {
        case 'first':
          this.obj.card = 1
          break
        case 'second':
          this.obj.card = 2
          break
        default:
          this.obj.card = 1
      }
      let obj = this.obj
      this.getForumData(obj)
      this.currentPage = 1
      console.log(JSON.stringify(this.obj))
    },
    // 清除搜索条件、分页切换
    clearSearch () {
      let obj = {
        page: 0,
        keyword: '',
        type: 0,
        created_at: '',
        last_at: '',
        views: '',
        id: 'DESC',
        card: 1
      }
      this.obj = obj
      return obj
    },
    // 排序
    sortChange ({ column, prop, order }) {
      console.log('+++')
      if (this.forumData.length === 0) {
        this.$message({
          message: '数据为空',
          type: 'warning'
        })
        return false
      } else {
        let sort = { column, prop, order }
        // console.log(JSON.stringify(sort.prop))
        let key = sort.prop
        let status = sort.order
        // console.log(key, status)
        let result = status === 'descending' ? 'ASC' : 'DESC'
        // console.log(result)
        console.log(sortData(key, result))
        // 排序函数调用
        var obj = sortData(key, result)
        obj.keyword = this.obj.keyword
        obj.type = this.obj.type
        obj.card = this.obj.card
        this.getForumData(obj)
      }
    },

    // 改变分页
    changePageTabs (val) {
      let obj = this.obj
      obj.page = val
      this.getForumData(obj)
    },
    // 按照查询条件查找
    doSearch () {
      this.initTag()
      this.obj.type = 0
      this.obj.page = 0
      this.obj.created_at = ''
      this.obj.last_at = ''
      this.obj.views = ''
      let obj = this.obj
      console.log(JSON.stringify(this.obj))
      this.getForumData(obj)
    },
    // 改变类型
    changeType (index) {
      console.log(index)
      this.type.forEach((item, i) => {
        item.active = false
        if (index === i) {
          item.active = true
        }
      })
      this.obj.id = 'DESC'
      this.obj.views = ''
      this.obj.created_at = ''
      this.obj.last_at = ''
      this.obj.type = index
      this.currentPage = 1
      console.log(JSON.stringify(this.obj))
      this.getForumData(this.obj)
    },
    // 初始化tag数据
    initTag () {
      this.type.forEach((item, i) => {
        item.active = false
        if (i === 0) {
          item.active = true
        }
      })
    }
  },
  created () {
    // 默认请求数据
    let obj = this.obj
    this.getForumData(obj)
  },
  computed: {
    // forumData () {
    //   console.log(JSON.stringify(this.$store.getters.postForumData))
    //   return this.$store.getters.postForumData
    // },
    // loading () {
    //   return this.$store.getters.postLoading
    // }
    // chapterData () {
    //   console.log(JSON.stringify(this.$store.getters.chapterData))
    //   let res = this.$store.getters.chapterData
    //   return Object.assign([], res)
    //   // return res;
    // }
  }
}
</script>
