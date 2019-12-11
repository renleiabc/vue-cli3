/*
 * @Author: 少侠
 * @Date: 2018-08-30 14:57:56
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-30 16:06:13
 * @Description: 分享项目空间镜像
 */

<template>
  <el-dialog title="选择共享项目空间"
             class="big shareSelectDialog"
             :before-close="handleClose"
             :visible.sync="openDialog">
    <div class="image-sel">
      <div class="query-v">
        <span>项目名称</span>
        <el-input size='small'
                  v-model="tableData.sel.name"></el-input>
        <el-button class='views-btn-query'
                   @click="doSearch('tableData')">查询</el-button>
      </div>
    </div>
    <el-table class="tab-content"
              style='margin-top:12px;'
              :data="tableData.msg"
              @selection-change="handleSelectionChange"
              v-loading="tableData.loading"
              border>
      <el-table-column type="selection"
                       align="center"
                       width="55">
      </el-table-column>
      <el-table-column property="name"
                       label="项目名称"></el-table-column>
      <el-table-column property="created_at"
                       align="center"
                       width="180"
                       label="创建时间"></el-table-column>
      <el-table-column property="describe"
                       label="项目描述"></el-table-column>
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
                   @current-change="changePage('tableData')"></el-pagination>
    <span slot="footer">
      <el-button @click="handleClose">{{$t('views.button.cancel')}}</el-button>
      <el-button @click="selectImages"
                 class="btn dark">{{$t('views.button.sure')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'shareProjectImage',
  props: {
    selImageId: {
      type: Number,
      default: 0
    },
    openDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageSize: 10,
      selectImage: [],
      tableData: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/project/myproject',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          name: ''
        }
      }
    }
  },
  mounted () { // 每有一个表格就要写个初始化赋值
    this.selectImage.id = this.selImageId
    this.getActiveTab('tableData')
  },
  methods: {
    getActiveTab (name) { // 获取当前展示的表格、搜索等信息
      this.linTabData = name
      this.linUrl = this[name].url
      this.initMsg()
    },
    clearSearch (name) { // 清除搜索条件
      for (let key in this[name].sel) {
        this[name].sel[key] = ''
      }
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1
      }
      this.getActiveTab(name)
    },
    doSearch (name) { // 按条件搜索
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1
      }
      this.getActiveTab(name)
    },
    changePage (name) { // 改变分页
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
        if (this[this.linTabData].sel.full_date && this[this.linTabData].sel.full_date.length === 2) {
          this[this.linTabData].sel.star_date = this[this.linTabData].sel.full_date[0]
          this[this.linTabData].sel.end_date = this[this.linTabData].sel.full_date[1]
        } else {
          this[this.linTabData].sel.star_date = ''
          this[this.linTabData].sel.end_date = ''
        }
        lin = Object.assign({}, lin, this[this.linTabData].sel)
      }
      this.$axios.get(this[this.linTabData].url, {params: lin}).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.project_space
        // 数据处理
        this[this.linTabData].msg = [...tableDate]
        // 重置数据总数
        if (this[this.linTabData].Pagination !== undefined) {
          this[this.linTabData].Pagination.total_count = data.data.data.total_count
        }
        this[this.linTabData].loading = false
      })
    },
    handleSelectionChange (rows) {
      this.selectImage = []
      if (rows) {
        rows.forEach(row => {
          this.selectImage.push(row.id)
        })
      }
    },
    handleClose () {
      this.$parent.selProjectDialog = false
    },
    selectImages () {
      this.$emit('selectImage', this.selectImage)
    }
  }
}
</script>
