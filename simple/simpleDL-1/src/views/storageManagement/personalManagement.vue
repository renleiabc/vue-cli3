/*
 * @Author: Liang Liang
 * @Date: 2018-08-11 14:29:09
 * @LastEditors:任雷雷
 * @LastEditTime: 2018-08-11 16:12:21
 * @Description:项目存储管理
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:32:47
*/
<template>
  <div class='announcement'>
    <div class="tab-select">
      <div>
        <span class="tab-select-title">{{$t('views.storageManagement.storage.storageName')}}</span>
        <el-input v-model="tableData.sel.storage_name"
                  :placeholder="$t('views.storageManagement.storage.storageName')"
                  class="views-input-text"></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t('views.table.createTime')}}</span>
        <!-- 选择开始时间、结束时间 -->
        <el-date-picker type="daterange"
                        :editable='false'
                        range-separator="-"
                        :picker-options='pickerOptions'
                        v-model="tableData.sel.full_date"
                        value-format="yyyy-MM-dd"
                        :start-placeholder="$t('views.button.startDate')"
                        :end-placeholder="$t('views.button.endDate')">
        </el-date-picker>
      </div>
      <div>
        <!-- <el-button class="btn light small"
                   @click="clearSearch('tableData')">{{$t("views.button.reset")}}</el-button> -->
        <el-button class="btn light small"
                   @click="doSearch('tableData')">{{$t("views.button.search")}}</el-button>
      </div>
    </div>
    <div class="controls-else">
      <el-button class="view-btn-medium"
                 @click="changeStorage">{{$t('views.storageManagement.storage.btnCreatePer')}}</el-button>
      <!-- <el-button class="view-btn-medium"
                 @click='saveAuthenticate'>{{$t('views.storageManagement.storage.btnSaveAuthenticate')}}</el-button> -->
    </div>
    <el-table class="tab-content"
              :data="tableData.msg"
              v-loading="tableData.loading"
              border>
      <el-table-column type="index"
                       :label='$t("views.table.number")'
                       width="55"
                       header-align="center"
                       align="center">
      </el-table-column>
      <el-table-column :label="$t('views.storageManagement.storage.storageName')">
        <template slot-scope="item">
          <router-link class="link"
                       :to="{name:'perStorageDetail',query:{id:item.row.id}}">{{item.row.name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="created_at"
                       width="200"
                       align="center"
                       :label="$t('views.table.createTime')"></el-table-column>
      <el-table-column prop="describe"
                       :label="$t('views.table.describe')"></el-table-column>
      <el-table-column :label="$t('views.table.operate')"
                       width="140">
        <div class="options text-center"
             slot-scope="item">
          <button class="btn"
                  @click="fileManage(item.row.id)">存储管理</button>
          <button class="del"
                  @click="deleteStorage(item.row.id)">{{$t('views.button.delete')}}</button>
        </div>
      </el-table-column>
      <!-- 当表格数据为空的时候 -->
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
                   @current-change="changePage('tableData')">
    </el-pagination>
    <el-dialog :title="$t('views.storageManagement.storage.btnCreatePer')"
               :visible.sync="createStorageDialog"
               class="small">
      <div>
        <div class='create-storage'>
          <span>{{$t('views.storageManagement.storage.spaceName')}} </span>
          <el-input maxlength="30"
                    v-model="createStorage.storage_name"></el-input>
        </div>
        <div class='create-storage'>
          <span>{{$t('views.table.describe')}}</span>
          <el-input type="textarea"
                    maxlength="200"
                    v-model="createStorage.storage_description"
                    rows='4'></el-input>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="createStorageDialog = false"
                   size="medium">{{$t('views.button.cancel')}}</el-button>
        <el-button class="view-btn-medium"
                   @click="saveStorage">{{$t('views.button.save')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {valiName} from '@/util/validate'
export default {
  name: 'announcement',
  data () {
    return {
      createStorageDialog: false,
      states: '',
      linTabData: '',
      linUrl: '',
      createStorage: {
        storage_name: '',
        storage_description: ''
      },
      storageIdList: [],
      pageSize: 10,
      pickerOptions: {
        shortcuts: [{
          text: this.$t('views.systemManagement.recentOneWeek'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('views.systemManagement.recentOneMonth'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('views.systemManagement.recentThreeMonth'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: {
        // 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/storage/storagelist',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          storage_name: '',
          is_init: 0,
          full_date: []
        }
      }
    }
  },
  methods: {
    // 创建弹窗
    changeStorage () {
      this.createStorageDialog = true
    },
    saveStorage () {
      if (this.createStorage.storage_name === '') {
        this.$message({ message: this.$t('views.storageManagement.valid.notNullName'), type: 'error' })
        return false
      }
      if (!valiName(this.createStorage.storage_name)) {
        this.$message({ message: "存储空间名称不能包含<>:\\'\"/.", type: 'error' })
        return false
      }
      if (this.createStorage.storage_description === '') {
        this.$message({ message: this.$t('views.storageManagement.valid.notNullDes'), type: 'error' })
        return false
      }
      let parms = {is_init: this.tableData.sel.is_init, name: this.createStorage.storage_name, describe: this.createStorage.storage_description}
      this.$post('/storage/storagecreate', {Storage: parms}).then(res => {
        if (res.code === 200) {
          this.$message({ message: this.$t('views.notification.saved'), type: 'success' })
          this.createStorageDialog = false
          this.getActiveTab('tableData')
        }
      })
    },
    // 保存认证
    saveAuthenticate () {
      let link = document.createElement('a')
      link.href = process.env.API_HOST + '/v1/storage/downloadkey?access-token=' + JSON.parse(localStorage.getItem('userinfo')).access_token
      document.body.appendChild(link)
      setTimeout(res => {
        link.click()
        document.body.removeChild(link)
      }, 5)
    },
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
        lin = Object.assign({}, this[this.linTabData].Pagination, {
          count: this.pageSize
        })
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
      this.$post(this[this.linTabData].url, { StorageSearch: {...lin}, page: lin.page }).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.storage_list
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
    fileManage (id) {
      this.$router.push({ name: 'perStorageDetail', query: { id: id } })
    },
    deleteStorage (id) {
      // url请求地址  params参数  message自定义提示信息,默认提示 "确认要删除吗？"
      this.mixinConfirm('/storage/storagedelete', { storage_id: [id], force: 0 }).then(res => {
        if (res) {
          // 请求成功回调
          this.getActiveTab('tableData')
        }
      })
    }
  },
  created () {
    // 每有一个表格就要写个初始化赋值
    this.getActiveTab('tableData')
  }
}
</script>
