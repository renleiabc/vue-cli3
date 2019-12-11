/*
* @Author: aFei
* @Date: 2018-08-08 09:46:44
* @LastEditors: 任雷雷
* @LastEditTime: 2018-08-30 17:14:05
* @Description:科技论坛-论坛中心
*/
<template>
    <div class="views-research-forum-center">
        <div class="tab-select">
            <div>
                <el-input :placeholder='$t("views.researchForum.enter")' v-model="forumTitle" clearable>
                    <el-button @click="doSearch" slot="append" icon="el-icon-search"></el-button>
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
        <p class="sel">
            <button v-for="(item,index) in tag" :class="{active:item.active}" @click="changeType(index)" :key="index">
                {{generateTitle(item.label)}}
            </button>
        </p>
        <el-table class="tab-content" :data="forumData" v-loading="loading" @sort-change="sortChange">
            <el-table-column :label='$t("views.researchForum.postTopic")' :default-sort="{prop: 'poster_time'}">
                <template slot-scope="scope">
                    <router-link class="link" :to="{name:'forumDetails',query:{forumId:scope.row.id}}">
                        <i :class="scope.row.type==='1'?'icon-bangzhu':scope.row.type==='2'?'icon-fenxiang':scope.row.type==='3'?'icon-tongzhi1':'icon-notice'" class="icon iconfont"></i>
                        {{scope.row.title}}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column :label='$t("views.researchForum.authorReleaseTime")' width="180" sortable='custom' prop="created_at">
                <template slot-scope="scope">
                    <p class="top">{{scope.row.user_name}}</p>
                    <p class="bottom">{{scope.row.created_at}}</p>
                </template>
            </el-table-column>
            <el-table-column :label='$t("views.researchForum.replyClick")' width="180" sortable='custom' prop="views">
                <template slot-scope="scope">
                    <p class="top">{{scope.row.reply_num}}</p>
                    <p class="bottom">{{scope.row.views}}</p>
                </template>
            </el-table-column>
            <!-- 最后回复 -->
            <el-table-column :label='$t("views.researchForum.lastReply")' width="180" sortable='custom' prop="last_at">
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
        <el-pagination class="tab-page" layout="prev, pager, next" :page-size="per" :current-page.sync="currentPage" :total="total" @current-change="changePage" v-show="isCount"></el-pagination>
    </div>
</template>

<script>
import { sortData } from '../../util/index.js'
import { generateTitle } from '../../util/i18n.js'
export default {
  name: 'forumCenter',
  data () {
    return {
      linTabData: '',
      linUrl: '',
      forumData: [],
      loading: true,
      isCount: false,
      total: 100,
      per: 10,
      forumTitle: '',
      currentPage: 1,
      tag: [
        { label: 'researchForum.all', active: true },
        { label: 'researchForum.help', active: false },
        { label: 'researchForum.share', active: false },
        { label: 'researchForum.notice', active: false },
        { label: 'researchForum.announcement', active: false }
      ],
      obj: {
        page: 0,
        keyword: '',
        type: 0,
        created_at: '',
        last_at: '',
        views: '',
        id: 'DESC'
      }
    }
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    doSearch () {
      let keyword = this.forumTitle
      this.obj.keyword = keyword
      let obj = this.obj
      this.currentPage = 1
      this.getForumData(obj)
    },
    // 改变分页
    changePage (val) {
      let obj = this.obj
      obj.page = val
      this.getForumData(obj)
    },
    // 请求论坛中心的数据
    getForumData (obj) {
      this.$get('/forum/forumlist', obj).then(res => {
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
    // 改变类型
    changeType (index) {
      console.log(index)
      this.tag.forEach((item, i) => {
        item.active = false
        if (index === i) {
          item.active = true
        }
      })
      let obj = this.obj
      obj.id = 'DESC'
      obj.views = ''
      obj.created_at = ''
      obj.last_at = ''
      obj.type = index
      this.currentPage = 1
      this.getForumData(obj)
    },
    // 排序
    sortChange ({ column, prop, order }) {
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
        // console.log(sortData(key, result))
        // 排序函数调用
        var obj = sortData(key, result)
        obj.keyword = this.obj.keyword
        obj.type = this.obj.type
        this.getForumData(obj)
      }
    }
  },
  created () {
    // 调用论坛中心的数据函数，进行初始化
    let obj = this.obj
    this.getForumData(obj)
  }
}
</script>
