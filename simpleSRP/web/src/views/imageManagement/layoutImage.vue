<!--
 * @Author: renlei
 * @Date: 2019-08-14 10:46:32
 * @LastEditors: renlei
 * @LastEditTime: 2019-09-04 15:37:12
 * @Description:编排镜像管理
 -->

<template>
  <div class="views-personal-image-manage">
    <div class="tab-select">
      <div>
        <span class="tab-select-title">{{$t("views.imageManagement.mirrorName")}}</span>
        <el-input v-model="tableData.sel.name"
                  :placeholder="$t('views.imageManagement.enter')"></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.imageManagement.creationTime")}}</span>
        <el-date-picker v-model="tableData.sel.full_date"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="-"
                        :start-placeholder="$t('views.imageManagement.beginTime')"
                        :end-placeholder="$t('views.imageManagement.endTime')"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.imageManagement.status")}}</span>
        <el-select v-model="tableData.sel.status"
                   clearable
                   filterable
                   :placeholder="$t('views.imageManagement.chose')">
          <el-option v-for="(item, index) in imageStatusOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span class="tab-select-title">{{$t("views.imageManagement.mirrorClassification")}}</span>
        <el-select v-model="tableData.sel.category"
                   clearable
                   filterable
                   :placeholder="$t('views.imageManagement.chose')">
          <el-option v-for="(item,index) in imageTypeOptions"
                     :key="index"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </div>
      <!-- 重置、查询 -->
      <div>
        <el-button class="btn light small"
                   @click="clearSearch('tableData')">{{$t("views.imageManagement.reset")}}</el-button>
        <el-button class="btn light small"
                   @click="initMsg()">{{$t("views.imageManagement.select")}}</el-button>
      </div>
    </div>
    <div class="controls-else">
      <el-button class="btn dark mid"
                 @click="changeImage()">
        {{$t("views.imageManagement.createMirror")}}
      </el-button>
      <el-button class="btn dark mid"
                 @click="deleteMulImage()">{{$t("views.imageManagement.deleteMirror")}}</el-button>
    </div>
    <el-table class="tab-content"
              :data="tableData.msg"
              @sort-change="sortTable"
              @selection-change="handleSelectionChange"
              style="margin-top:10px;"
              v-loading="tableData.loading"
              border>
      <el-table-column type="selection"
                       width="55"
                       align="center">
      </el-table-column>
      <el-table-column :label="$t('views.imageManagement.mirrorName')"
                       sortable='custom'
                       prop="name"
                       show-overflow-tooltip>
        <template slot-scope="scope"
                  header-align="center"
                  align="center">
          <a size="mini"
             @click="handleDetail(scope.$index, scope.row)">{{scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('views.imageManagement.status')"
                       show-overflow-tooltip
                       width="100px"
                       align="center">
        <template slot-scope="scope"
                  header-align="center"
                  align="center">{{scope.row.status==0 ? '上传中' : scope.row.status==1 ? '可用' : '失败'}}</template>
      </el-table-column>
      <el-table-column prop="created_at"
                       show-overflow-tooltip
                       sortable='custom'
                       :label="$t('views.imageManagement.creationTime')"
                       width="200px"
                       align="center"></el-table-column>
                       <!-- 镜像分类 -->
      <el-table-column prop="category"
                       sortable='custom'
                       show-overflow-tooltip
                       :label="$t('views.imageManagement.mirrorClassification')" align="center">
        <template slot-scope="scope"
                  header-align="center"
                  >{{scope.row.imageCategory.name}}</template>
      </el-table-column>
      <el-table-column prop="describe"
                       show-overflow-tooltip
                       :label="$t('views.imageManagement.mirrorDescription')"></el-table-column>
      <el-table-column :label="$t('views.imageManagement.operating')"
                       width="180px"
                       align="center">
        <template slot-scope="scope">
         <button class="btn"
                  @click="changeImage(scope.row.id)">{{$t("views.imageManagement.modify")}}</button>
          <!--  <button class="btn"
                  v-if='scope.row.status==1'
                  @click="shareImage(scope.row.id)">共享</button> -->
          <button class="del"
                  @click="deleteSingleImage(scope.row.id)">{{$t("views.imageManagement.delete")}}</button>
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
                   :page-size="pageSize"
                   :current-page.sync="tableData.Pagination.page"
                   :total="tableData.Pagination.total_count"
                   @current-change="initMsg()"></el-pagination>
    <el-dialog :title="$t('views.imageManagement.mirrorDetails')"
               :visible.sync="detailDialogVisible">
      <image-detail :detailData="detailData"></image-detail>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="primary"
                   type="primary"
                   @click="detailDialogVisible = false">{{$t('views.imageManagement.close')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('views.imageManagement.personalImage.p1')"
               class="small"
               @close='typeClose'
               :visible.sync="shareImageDialog">
      <div class='share-dialog'>
        <p style="line-height:200%;">{{$t('views.imageManagement.personalImage.p2')+':'}}</p>
        <el-row>
          <el-radio v-model="shareType"
                    :label="1">{{$t('views.imageManagement.publicMirror')}}</el-radio>
        </el-row>
        <el-row>
          <el-radio v-model="shareType"
                    :label="2">{{$t('views.imageManagement.projectMirror')}}</el-radio>
        </el-row>

      </div>
      <span slot="footer">
        <el-button @click="shareImageDialog=false">{{$t('views.button.cancel')}}</el-button>
        <el-button class="btn dark"
                   @click="shareSaveType">{{$t('views.button.sure')}}</el-button>
      </span>
    </el-dialog>
    <shareProjectImage v-if="selProjectDialog"
                       :imageId='shareImageId'
                       :openDialog.sync='selProjectDialog'
                       :selImageId='selectedId'
                       @selectImage='selectImage'></shareProjectImage>
  </div>
</template>

<script>
import ImageDetail from './imageDetail'
import shareProjectImage from './components/shareProjectImage'
export default {
  name: 'objectImage',
  components: {
    shareProjectImage,
    ImageDetail
  },
  data () {
    return {
      selProjectDialog: false,
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t('views.imageManagement.recentOneWeek'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('views.imageManagement.recentOneMonth'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('views.imageManagement.recentThreeMonth'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      imageTypeOptions: [],
      imageStatusOptions: [
        {
          value: 0,
          label: '上传中'
        },
        {
          value: 1,
          label: '可用'
        },
        {
          value: 2,
          label: '失败'
        }
      ],
      pageSize: 10,
      shareType: 1,
      detailDialogVisible: false,
      shareImageDialog: false,
      detailData: {},
      multipleSelection: [],
      tableData: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/image/imagelist',
        loading: false,
        Pagination: {
          page: 1,
          total_count: 1
        },
        sel: {
          is_init: 3,
          name: '',
          sort: '',
          category: '',
          status: '',
          full_date: '',
          start_time: '',
          end_time: ''
        }
      },
      shareImageId: '',
      imageId: '',
      selectedId: []
    }
  },
  created () {
    this.initMsg()
    const data = this.tableData
    data.sel.is_init = 5
    this.$get('/image/imagecategorylist', {is_init: this.tableData.sel.is_init}).then(res => {
      if (res.code === 200) {
        this.imageTypeOptions = res.data.category
      }
    })
  },
  methods: {
    // 镜像保存类型
    shareSaveType () {
      setTimeout(() => {
        if (this.shareType === 1) {
          this.mixinConfirm('/image/imageshare', {image_id: this.shareImageId, is_init: 1}, this.$t('views.imageManagement.shareImage1')).then(res => {
            if (res) {
              this.initMsg()
            }
          })
        } else {
          this.selProjectDialog = true
        }
        this.shareImageDialog = false
      }, 200)
    },
    typeClose () {
      this.shareType = 1
    },
    // 表格排序
    sortTable (event) {
      if (event.order === 'descending') {
        this.tableData.sel.sort = '-' + event.prop
      } else {
        this.tableData.sel.sort = event.prop
      }
      this.initMsg()
    },
    selectImage (arrSel) {
      console.log(arrSel)
      if (arrSel.length > 0) {
        this.$post('/image/imageshare', {image_id: this.shareImageId, is_init: 2, project_id: arrSel}).then(res => {
          if (res.code === 200) {
            this.initMsg()
            this.selProjectDialog = false
            this.$message({
              type: 'success',
              message: '共享成功，请到项目镜像管理处查看！'
            })
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('views.dialogText.selectNull')
        })
      }
    },
    handleDetail (index, row) {
      this.detailDialogVisible = true
      this.detailData = row
    },
    handleSelectionChange (rows) {
      this.multipleSelection = []
      if (rows) {
        rows.forEach((val, index, rows) => {
          this.multipleSelection.push(val.id)
        })
      }
      this.multipleSelection = [...this.multipleSelection]
    },
    deleteMulImage () {
      if (this.multipleSelection.length) {
        this.deleteRequest(this.multipleSelection)
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('views.dialogText.selectNull')
        })
      }
    },
    deleteSingleImage (id) {
      this.deleteRequest([id])
    },
    clearSearch () {
      for (let key in this.tableData.sel) {
        this.tableData.sel[key] = ''
        this.tableData.sel.is_init = 0
      }
      if (this.tableData.Pagination !== undefined) {
        this.tableData.Pagination.page = 1
      }
      this.initMsg()
    },
    initMsg () {
      this.tableData.loading = true
      let lin = {}
      if (this.tableData.Pagination !== undefined) {
        lin = { // 对象合并，也属于深度拷贝，只复制值，不改变原数据
          count: this.pageSize,
          page: this.tableData.Pagination.page
        }
      }
      if (this.tableData.sel !== undefined) {
        if (this.tableData.sel.full_date && this.tableData.sel.full_date.length === 2) {
          this.tableData.sel.start_time = this.tableData.sel.full_date[0] + ' 00:00:00'
          this.tableData.sel.end_time = this.tableData.sel.full_date[1] + ' 23:59:59'
        } else {
          this.tableData.sel.start_time = ''
          this.tableData.sel.end_time = ''
        }
        lin = Object.assign({}, lin, this.tableData.sel)
      }
      lin.is_init = 3
      this.$get(this.tableData.url, lin).then(res => {
        // 根据后台接口更改
        let tableDate = res.data.image_list
        // 数据处理
        this.tableData.msg = [...tableDate] // 深度拷贝
        // 重置数据总数
        if (this.tableData.Pagination !== undefined) {
          this.tableData.Pagination.total_count = res.data.total_count
        }
        this.pageSize = res.data.per_page || 10
        this.tableData.loading = false
      })
    },
    deleteRequest (id) {
      this.mixinConfirm('/image/imagedelete', {image_id: id}).then(res => {
        if (res) {
          this.initMsg()
        }
      })
    },
    shareImage (id) {
      this.shareImageDialog = true
      this.shareImageId = id
    },
    changeImage (id) {
      console.log(id)
      if (isNaN(id)) {
        this.imageId = ''
        this.$router.push({ name: 'perEditImage', query: { is_init: 5 } })
      } else {
        this.imageId = id
        this.$router.push({ name: 'perEditImage', query: { imageId: id, is_init: 5 } })
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'perEditImage') {
      if (this.imageId === '') {
        to.meta.title = 'views.nav.addImage'
      } else {
        to.meta.title = 'views.nav.editImage'
      }
    }
    next()
  }
}
</script>
