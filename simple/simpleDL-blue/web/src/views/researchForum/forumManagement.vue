/*
* @Author: aFei
* @Date: 2018-08-08 09:46:44
* @LastEditors: 任雷雷
* @LastEditTime: 2018-08-31 17:14:05
* @Description:科技论坛-论坛管理
*/
<template>
  <div class="views-research-forum-management">
    <div class="tab-select">
      <div>
        <span class="tab-select-title">{{$t("views.researchForum.theme")}}</span>
        <el-input v-model="obj.title"
                  :placeholder='$t("views.researchForum.enter")'></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.researchForum.type")}}</span>
        <el-select v-model="obj.type"
                   :placeholder='$t("views.researchForum.chose")'
                   clearable>
          <el-option v-for="item in forumaddper.data"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.researchForum.poster")}}</span>
        <el-input v-model="obj.name"
                  :placeholder='$t("views.researchForum.enter")'></el-input>
      </div>
      <div>
        <el-button class="btn light small"
                   @click="clearSearch">{{$t("views.researchForum.reset")}}</el-button>
        <el-button class="btn light small"
                   @click="doSearch">{{$t("views.researchForum.select")}}</el-button>
      </div>
    </div>
    <div class="else-do">
      <el-button class="btn dark mid"
                 @click="deleteForum">
        {{$t("views.researchForum.batchDeletion")}}
      </el-button>
      <el-button class="btn dark mid link"
                 @click="forumSend">
        <a>
          {{$t("views.researchForum.post")}}
        </a>
      </el-button>
    </div>
    <div class="views-forum-table">
      <el-table class="tab-content"
                :data="forumData"
                @selection-change="selectChange"
                v-loading="loading"
                border>
        <el-table-column type="selection"
                         width="55"
                         align="center"></el-table-column>
        <el-table-column :label='$t("views.researchForum.theme")'
                         align="center"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <router-link class="link"
                         :to="{name:'forumDetails',query:{forumId:scope.row.id}}">{{scope.row.title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column :label='$t("views.researchForum.postType")'
                         width="80"
                         align="center">
          <template slot-scope="item">
            <span v-if="item.row.type === '1'">{{$t('views.researchForum.help')}}</span>
            <span v-if="item.row.type === '2'">{{$t('views.researchForum.share')}}</span>
            <span v-if="item.row.type === '3'">{{$t('views.researchForum.notice')}}</span>
            <span v-if="item.row.type === '4'">{{$t('views.researchForum.announcement')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_name"
                         :label='$t("views.researchForum.poster")'
                         align="center"></el-table-column>
        <el-table-column :label='$t("views.researchForum.replyView")'
                         align="center"
                         prop="views">
          <template slot-scope="item">
            {{item.row.reply_num}}&nbsp;/&nbsp;{{item.row.views}}
          </template>
        </el-table-column>
        <el-table-column :label='$t("views.researchForum.finalPost")'
                         align="center"
                         prop="last_at"
                         show-overflow-tooltip>
          <template slot-scope="item">
            <div v-if="item.row.last_reply ===null">
              --
            </div>
            <div v-else-if="item.row.last_reply ===null && item.row.last_at !== '' ">
              用户已注销
            </div>
            <div v-else>
              {{item.row.last_reply}}&nbsp;/&nbsp;{{item.row.last_at}}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label='$t("views.researchForum.operating")'
                         width="100"
                         align="center">
          <template slot-scope="scope">
            <button class="btn"
                    @click="deleteSingle(scope.row.id)">{{$t("views.researchForum.delete")}}</button>
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
    </div>

    <el-pagination class="tab-page"
                   layout="prev, pager, next"
                   :page-size="per"
                   :current-page.sync="currentPage"
                   :total="total"
                   @current-change="changePage"
                   v-show="isCount"></el-pagination>
  </div>
</template>

<script>
import { sortData } from '../../util/index.js'
export default {
  name: 'forumManagement',
  data () {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      sel: [],
      forumList: [],
      forumData: [],
      loading: true,
      obj: {
        title: '',
        type: '',
        name: '',
        created_at: 'DESC',
        last_at: '',
        page: 0
      },
      isCount: false,
      per: 0,
      total: 0,
      options: [],
      currentPage: 1
    }
  },
  methods: {
    // 请求论坛管理的数据
    getForumData (obj) {
      this.$get('/forum/forummanagelist', obj).then(res => {
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
    // 重置
    clearSearch () {
      this.obj = {
        title: '',
        type: '',
        name: '',
        created_at: 'DESC',
        last_at: '',
        page: 0
      }
      this.currentPage = 1
      this.getForumData(this.obj)
      return this.obj
    },
    forumSend () {
      this.$router.push({ name: 'forumSend' })
    },
    // 查询
    doSearch () {
      this.obj.page = 0
      let obj = this.obj
      this.currentPage = 1
      this.getForumData(obj)
    },
    // 分页
    changePage (val) {
      this.obj.page = val
      let obj = this.obj
      this.getForumData(obj)
    },
    selectChange (rows) {
      this.forumList = []
      this.forumList = rows
      // console.log(JSON.stringify(rows))
    },
    // 删除帖子函数封装
    deleteCard (arr, type) {
      this.$confirm('确定删除该帖子?', '删除帖子', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            let obj = {
              type: type,
              forum_id: arr
            }
            // console.log(JSON.stringify(obj))
            this.$post('/forum/deletebench', obj).then(res => {
              // console.log(JSON.stringify(res))
              if (res.code === 200) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                let obj = this.clearSearch()
                this.getForumData(obj)
              } else {
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
              instance.confirmButtonLoading = false
              done()
            })
          } else {
            done()
          }
        }
      }).catch(() => {
      })
    },
    // 批量删除
    deleteForum () {
      // console.log(JSON.stringify(this.forumList))
      let forumList = this.forumList
      if (forumList.length === 0) {
        this.$message({
          type: 'warning',
          message: this.$t('views.dialogText.selectNull')
        })
        return false
      } else {
        let listId = []
        forumList.forEach((item, index) => {
          listId.push(item.id)
        })
        // console.log(JSON.stringify(listId))
        this.deleteCard(listId, 1)
      }
    },
    // 单个删除
    deleteSingle (id) {
      let listId = []
      listId.push(id)
      // console.log(JSON.stringify(listId))
      this.deleteCard(listId, 0)
    },
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
        console.log(key, status)
        let result = status === 'descending' ? 'ASC' : 'DESC'
        // console.log(result)
        // console.log(sortData(key, result))
        // 排序函数调用
        var obj = sortData(key, result)
        obj.type = this.obj.type
        obj.name = this.obj.name
        obj.title = this.obj.title
        obj.created_at = ''
        this.getForumData(obj)
      }
    }
  },

  created () {
    // 请求论坛管理的数据，函数调用
    let obj = this.obj
    this.getForumData(obj)
    this.$store.dispatch('getforumaddper')
  },
  computed: {
    forumaddper () {
      return this.$store.getters.postForumaddper
    }
  }
}
</script>
