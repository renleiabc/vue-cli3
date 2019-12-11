<template>
  <el-dialog title="选择关联镜像"
             width="80%"
             :before-close="handleClose"
             :close-on-click-modal='false'
             :visible.sync="openDialog">
    <div class="image-sel">
      <div class="query-v">
        <span>镜像名称</span>
        <el-input size='small'
                  v-model="tableData.sel.name"></el-input>
        <el-button class='views-btn-query'
                   @click="doSearch('tableData')">查询</el-button>
      </div>
      <div>
        <el-button class="view-btn-small"
                   @click="selectImages">选择</el-button>
        <el-button class="view-btn-small"
                   @click="handleClose">关闭</el-button>
      </div>
    </div>
    <el-table class="tab-content"
              style='margin-top:12px;'
              :data="tableData.msg"
              v-loading="tableData.loading"
              border>
      <el-table-column label=""
                       header-align="center"
                       align="center"
                       width="50">
        <template slot-scope="item"
                  class="text-center">
          <el-radio class="radio"
                    :value='item.row.id'
                    name='imageId'
                    :label="item.row.id"
                    @change.native="getCurrentRow(item.row.id,item.row.name)"
                    v-model="selectImage.id"></el-radio>
        </template>
      </el-table-column>
      <el-table-column property="name"
                       show-overflow-tooltip
                       label="镜像名称"></el-table-column>
      <!-- <el-table-column property="image_status"
                       label="状态"
                       width="70"></el-table-column> -->
      <el-table-column property="created_at"
                       width="180"
                       show-overflow-tooltip
                       align="center"
                       label="创建时间"></el-table-column>
      <el-table-column property="imageCategory.name"
                       width="150"
                       show-overflow-tooltip
                       label="镜像分类"></el-table-column>
      <el-table-column property="describe"
                       show-overflow-tooltip
                       label="镜像描述"></el-table-column>
      <!-- 当表格数据为空的时候 -->
      <div slot="empty">
        <div class="views-empty">
          <span class="views-empty-table"></span>
          <p class="views-empty-text">你查询的结果为空</p>
        </div>
      </div>
    </el-table>
    <el-pagination class="tab-page"
                   layout="prev, pager, next"
                   :page-size="pageSize"
                   :current-page.sync="tableData.Pagination.page"
                   :total="tableData.Pagination.total_count"
                   @current-change="changePage('tableData')"></el-pagination>
  </el-dialog>
</template>
<script>
export default {
  name: 'imageTableDialog',
  props: {
    selImageId: '',
    openDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageSize: 10,
      selectImage: {
        id: 0,
        name: ''
      },
      tableData: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/casecenter/imagelist',
        loading: true,
        Pagination: {
          page: 1,
          status: 1,
          is_init: 1,
          total_count: 5
        },
        sel: {
          name: ''
        }
      }
    }
  },
  mounted () { // 每有一个表格就要写个初始化赋值
    this.getActiveTab('tableData')
  },
  updated () {
    this.selectImage.id = this.selImageId
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
        let tableDate = data.data.data.image_list
        // 数据处理
        this[this.linTabData].msg = [...tableDate]
        // 重置数据总数
        if (this[this.linTabData].Pagination !== undefined) {
          this[this.linTabData].Pagination.total_count = data.data.data.total_count
        }
        this.pageSize = data.data.data.per_page || 10
        this[this.linTabData].loading = false
      })
    },
    getCurrentRow (id, name) {
      this.selectImage['id'] = id
      this.selectImage['name'] = name
    },
    handleClose (done) {
      this.$emit('modalClose')
    },
    selectImages () {
      this.$emit('selectImage', this.selectImage)
    }
  }
}
</script>
