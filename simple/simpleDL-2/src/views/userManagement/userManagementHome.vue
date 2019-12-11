/*
 * @Author: aFei
 * @Date: 2018-07-25 15:48:17
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:10:28
*/
<template>
  <div class="views-user-management-home">
    <div class="tab-select">
      <div>
        <span class="tab-select-title">{{$t("views.userManagement.username")}}</span>
        <el-input v-model="tableData.sel.username"
                  :placeholder='$t("views.userManagement.enter")'></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.userManagement.name")}}</span>
        <el-input v-model="tableData.sel.name"
                  :placeholder='$t("views.userManagement.enter")'></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.userManagement.character")}}</span>
        <el-select v-model="tableData.sel.role"
                   :placeholder='$t("views.userManagement.chose")'>
          <el-option :label='$t("views.userManagement.addUser.admin")'
                     :value="2"></el-option>
          <el-option :label='$t("views.userManagement.addUser.manager")'
                     :value="3"></el-option>
          <el-option :label='$t("views.userManagement.addUser.participant")'
                     :value="4"></el-option>
        </el-select>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.userManagement.status")}}</span>
        <el-select v-model="tableData.sel.status"
                   :placeholder='$t("views.userManagement.chose")'>
          <el-option :label='$t("views.userManagement.open")'
                     :value="1"></el-option>
          <el-option :label='$t("views.userManagement.close")'
                     :value="2"></el-option>
        </el-select>
      </div>
      <div>
        <el-button class="btn light small"
                   @click="clearSearch('tableData')">{{$t("views.userManagement.reset")}}</el-button>
        <el-button class="btn light small"
                   @click="doSearch('tableData')">{{$t("views.userManagement.select")}}</el-button>
      </div>
    </div>
    <div class="controls-else">
      <el-button class="btn dark mid"
                 @click="changeUser">{{$t("views.userManagement.add")}}</el-button>
      <el-button class="btn dark mid">{{$t("views.userManagement.batchAdd")}}</el-button>
      <!-- <el-button class="btn dark mid"
                 @click="authorizeUser">{{$t("views.userManagement.batchAuthorization")}}</el-button> -->
      <el-button class="btn dark mid"
                 @click="deleteUser">{{$t("views.userManagement.batchDeletion")}}</el-button>
    </div>
    <el-table class="tab-content"
              :data="tableData.msg"
              @selection-change="selectChange"
              v-loading="tableData.loading"
              border>
      <el-table-column type="selection"
                       width="55"
                       align="center"></el-table-column>
      <el-table-column :label='$t("views.userManagement.username")'>
        <template slot-scope="item">
          <router-link class="link"
                       :to="{name:'userDetails',query:{userId:item.row.id}}">{{item.row.username}}</router-link>
        </template>
      </el-table-column>
      <el-table-column :label='$t("views.userManagement.status")'
                       width="80"
                       align="center">
        <template slot-scope="item">
          {{item.row.status===1? $t("views.userManagement.open") : $t("views.userManagement.close")}}
        </template>
      </el-table-column>
      <el-table-column :label='$t("views.userManagement.character")'
                       width="120"
                       align="center">
        <template slot-scope="item">
          {{item.row.role===2? $t("views.userManagement.addUser.admin") : ''}} {{item.row.role===3? $t("views.userManagement.addUser.manager") : ''}} {{item.row.role===4? $t("views.userManagement.addUser.participant") : ''}}
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       width="100"
                       align="center"
                       :label='$t("views.userManagement.name")'></el-table-column>
      <el-table-column prop="email"
                       :label='$t("views.userManagement.email")'></el-table-column>
      <el-table-column prop="tel"
                       :label='$t("views.userManagement.phone")'
                       align="center"
                       width="120"></el-table-column>
      <el-table-column :label='$t("views.userManagement.operating")'
                       align="center">
        <div class="options"
             slot-scope="item">
          <!-- <button class="btn"
                  @click="authorizeUser(item.row.user_id)">{{$t("views.userManagement.authorization")}}</button> -->
          <button class="btn"
                  @click="disableUser(item.row.id,item.row.status)">
            {{item.row.status===1?$t("views.userManagement.disable"):$t("views.userManagement.enable")}}
          </button>
          <button class="btn"
                  @click="initializePassword(item.row.id)">{{$t("views.userManagement.initializePassword")}}</button>
          <button class="btn"
                  @click="changeUser(item.row.id)">{{$t("views.userManagement.modify")}}</button>
          <button class="del"
                  @click="deleteUser(item.row.id)">{{$t("views.userManagement.delete")}}</button>
        </div>
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
                   :page-size="pageSize"
                   :current-page.sync="tableData.Pagination.page"
                   :total="tableData.Pagination.total_count"
                   @current-change="changePage('tableData')"></el-pagination>
    <el-dialog class="changePermissionPop small"
               :title='$t("views.userManagement.userManagementHome.userAuthorization")'
               :visible.sync="changePermissionPop">
      <div class="content">
        <p>{{$t("views.userManagement.userManagementHome.p1")}}：</p>
        <ul>
          <li :key="item.value"
              v-for="item in user_role">
            <el-radio v-model="changePermissionPopMsg.user_role"
                      :label="item.value">{{item.label}}</el-radio>
          </li>
        </ul>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="cancel"
                   @click="changePermissionPop = false">{{$t("views.userManagement.cancel")}}</el-button>
        <el-button class="primary"
                   type="primary"
                   @click="changePermissionPopDo">{{$t("views.userManagement.save")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'userManagementHome',
  data () {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      user_role: [],
      rant_status: [],
      routeId: '',
      tableData: {
        // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/user/getuserlist',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          username: '',
          name: '',
          role: '',
          status: ''
        }
      },
      userIdList: [],
      changePermissionPop: false,
      changePermissionPopMsg: {
        user_id: [],
        user_role: ''
      }
    }
  },
  methods: {
    getActiveTab (name) {
      // 获取当前展示的表格、搜索等信息
      this.linTabData = name
      this.linUrl = this[name].url
      this.initMsg()
    },
    clearSearch (name) {
      // 清除搜索条件
      for (let key in this[name].sel) {
        this[name].sel[key] = ''
      }
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1
      }
      this.getActiveTab(name)
    },
    doSearch (name) {
      // 按条件搜索
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1
      }
      this.getActiveTab(name)
    },
    changePage (name) {
      // 改变分页
      this.getActiveTab(name)
    },
    initMsg () {
      this[this.linTabData].loading = true
      let lin = {}
      if (this[this.linTabData].Pagination !== undefined) {
        lin = {
          pageNum: this.pageSize,
          pageNo: this[this.linTabData].Pagination.page - 1
        }
      }
      if (this[this.linTabData].sel !== undefined) {
        if (
          this[this.linTabData].sel.full_date &&
                    this[this.linTabData].sel.full_date.length === 2
        ) {
          this[this.linTabData].sel.star_date = this[this.linTabData].sel.full_date[0]
          this[this.linTabData].sel.end_date = this[this.linTabData].sel.full_date[1]
        } else {
          this[this.linTabData].sel.star_date = ''
          this[this.linTabData].sel.end_date = ''
        }
        lin = Object.assign({}, lin, this[this.linTabData].sel)
      }
      this.$get(this[this.linTabData].url, lin).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.records.list
        // 数据处理
        this[this.linTabData].msg = [...tableDate]
        // 重置数据总数
        if (this[this.linTabData].Pagination !== undefined) {
          this[this.linTabData].Pagination.total_count =
                        data.data.total_count
        }
        this[this.linTabData].loading = false
      })
    },
    selectChange (rows) {
      this.userIdList = []
      for (let i = 0; i < rows.length; i++) {
        this.userIdList.push(rows[i].id)
      }
    },
    // 授权
    // authorizeUser (id) {
    //   if (isNaN(id)) {
    //     this.changePermissionPopMsg.user_id = [...this.userIdList]
    //   } else {
    //     this.changePermissionPopMsg.user_id = [id]
    //   }
    //   this.changePermissionPopMsg.user_role = ''
    //   this.changePermissionPop = true
    // },
    changePermissionPopDo () {
      this.$axios
        .post('/give-rant-user', this.changePermissionPopMsg)
        .then(data => {
          this.$message({ message: '授权成功', type: 'success' })
          this.changePermissionPop = false
        })
    },
    disableUser (id, states) {
      if (states === 1) {
        states = 0
      } else {
        states = 1
      }
      this.$post('/user/accountcontrol', { id: id, status: states })
        .then(data => {
          if (data.code === 200) {
            this.$message({ message: '操作成功', type: 'success' })
            this.initMsg()
          } else {
            this.$message({ message: data.message, type: 'error' })
          }
        })
    },
    initializePassword (id) {
      this.$post('/user/resetpassword', { id: id }).then(data => {
        this.$message({ message: '操作成功', type: 'success' })
      })
    },
    changeUser (id) {
      if (isNaN(id)) {
        this.routeId = ''
        this.$router.push({ name: 'addUser' })
      } else {
        this.routeId = id
        this.$router.push({ name: 'addUser', query: { userId: id } })
      }
    },
    deleteUser (id) {
      let arr
      if (isNaN(id)) {
        arr = [...this.userIdList]
      } else {
        arr = [id]
      }
      if (arr.length > 0) {
        this.mixinConfirm('/user/removeuser', { id: arr }).then(res => {
          if (res) {
            // 请求成功回调
            this.getActiveTab('tableData')
          }
        })
      } else {
        this.$message({ message: '请选择删除数据', type: 'error' })
      }
    }
  },
  created () {
    // 每有一个表格就要写个初始化赋值
    this.getActiveTab('tableData')
    // 获取搜索的数据
    // this.$axios.get('/userManagement/sel').then(data => {
    //   this.user_role = [...data.data.data.user_role]
    //   this.rant_status = [...data.data.data.rant_status]
    // })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'addUser') {
      if (this.routeId === '') {
        to.meta.title = 'views.nav.addUser'
      } else {
        to.meta.title = 'views.nav.editUser'
      }
    }
    next()
  }
}
</script>
