/*
 * @Author: 少侠
 * @Date: 2018-08-30 14:57:56
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-30 16:06:13
 * @Description: 分享项目空间镜像
 */

<template>
  <el-dialog :title="this.$t('views.imageManagement.personalImage.p3')"
             class="big shareSelectDialog"
             :before-close="handleClose"
             :visible.sync="openDialog">
    <div class="image-sel">
      <div class="query-v">
        <span>{{$t('views.imageManagement.projectName')}}</span>
        <el-input size='small'
                  v-model="tableData.sel.name"></el-input>
        <el-button class="btn light small"
                   @click="clearSearch('tableData')">{{$t("views.imageManagement.reset")}}</el-button>
        <el-button class='views-btn-query'
                   @click="doSearch('tableData')">{{$t('views.button.search')}}</el-button>
      </div>
    </div>
    <el-table class="tab-content"
              style='margin-top:12px;'
              ref="multipleTable"
              :data="tableData.msg"
              @selection-change="handleSelectionChange"
              v-loading="tableData.loading"
              border>
      <el-table-column type="selection"
                       :selectable='selectable'
                       align="center"
                       width="55">
      </el-table-column>
      <el-table-column property="name"
                       :label="$t('views.imageManagement.projectName')"></el-table-column>
      <el-table-column property="created_at"
                       align="center"
                       width="180"
                       :label="$t('views.table.createTime')"></el-table-column>
      <el-table-column property="describe"
                       :label="$t('views.imageManagement.projectDescription')"></el-table-column>
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
    selImageId: Array,
    imageId: '',
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
        url: '/project/allselfproject',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          name: '',
          image_id: ''
        }
      }
    }
  },
  mounted () { // 每有一个表格就要写个初始化赋值
    this.selectImage = this.selImageId
    this.tableData.sel.image_id = this.imageId
    console.log(this.tableData)
    this.getActiveTab('tableData')
  },
  methods: {
    getActiveTab (name) { // 获取当前展示的表格、搜索等信息
      this.linTabData = name
      this.linUrl = this[name].url
      this.initMsg()
    },
    // 判断是否已分享
    selectable (row) {
      if (Number(row.share) > 0) {
        return false
      } else {
        return true
      }
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
    selectImageArr (tableArr) {
      let arr = []
      tableArr.map((item, index) => {
        if (this.selImageId.includes(item.id)) {
          arr.push(item)
        }
      })
      this.toggleSelection(arr)
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
        lin = Object.assign({}, lin, this[this.linTabData].sel)
      }
      this.$axios.get(this[this.linTabData].url, {params: lin}).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.all_project
        // 数据处理
        this[this.linTabData].msg = [...tableDate]
        this.selectImageArr(this[this.linTabData].msg)
        // 重置数据总数
        if (this[this.linTabData].Pagination !== undefined) {
          this[this.linTabData].Pagination.total_count = data.data.data.total_count
        }
        this.pageSize = data.data.data.per_page || 10
        this[this.linTabData].loading = false
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$nextTick(function () {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          })
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
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
