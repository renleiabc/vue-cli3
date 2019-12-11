/*
* @Author: 633
* @Date: 2018-08-10 15:05:03
* @Description:公共镜像管理
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:19:14
*/
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
      <!-- <div>
        <span class="tab-select-title">{{$t("views.imageManagement.status")}}</span>
        <el-select v-model="tableData.sel.image_status"
                   clearable
                   filterable
                   :placeholder="$t('views.imageManagement.chose')">
          <el-option v-for="(item, index) in imageStatusOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div> -->
      <!-- <div>
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
      </div> -->
      <div>
        <!-- <el-button class="btn light small"
                   @click="clearSearch('tableData')">{{$t("views.imageManagement.reset")}}</el-button> -->
        <el-button class="btn light small"
                   @click="initMsg()">{{$t("views.imageManagement.select")}}</el-button>
      </div>
    </div>
    <div class="controls-else">
      <el-button class="btn dark mid"
                 @click="changeImage()">
        {{$t("views.imageManagement.createMirror")}}
      </el-button>
      <!-- <el-button class="btn dark mid"
                 @click="deleteMulImage()">{{$t("views.imageManagement.deleteMirror")}}</el-button> -->
    </div>
    <el-table class="tab-content"
              :data="tableData.msg"
              @selection-change="handleSelectionChange"
              style="margin-top:10px;"
              v-loading="tableData.loading"
              border>
      <el-table-column type="selection"
                       width="55"
                       align="center">
      </el-table-column>
      <el-table-column :label="$t('views.imageManagement.mirrorName')">
        <template slot-scope="scope"
                  header-align="center"
                  align="center">
          <a size="mini"
             @click="handleDetail(scope.$index, scope.row)">{{scope.row.name}}</a>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('views.imageManagement.status')"
                       width="100px"
                       align="center">
        <template slot-scope="scope"
                  header-align="center"
                  align="center">未生成</template>
        {{scope.row.image_status}}
      </el-table-column> -->
      <el-table-column prop="created_at"
                       :label="$t('views.imageManagement.creationTime')"
                       width="200px"
                       align="center"></el-table-column>
      <el-table-column prop="imageCategory.name"
                       :label="$t('views.imageManagement.mirrorClassification')"></el-table-column>
      <el-table-column prop="describe"
                       :label="$t('views.imageManagement.mirrorDescription')"></el-table-column>
      <el-table-column :label="$t('views.imageManagement.operating')"
                       width="150px"
                       align="center">
        <template slot-scope="scope">
          <button class="btn"
                  @click="changeImage(scope.row.id)">{{$t("views.imageManagement.modify")}}</button>
          <!-- <button class="btn"
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
    <el-dialog title="选择共享位置"
               class="small"
               :visible.sync="shareImageDialog">
      <div class='share-dialog'>
        <p style="line-height:200%;">将此镜像共享到：</p>
        <el-row>
          <el-radio v-model="shareType"
                    :label="1">公共镜像</el-radio>
        </el-row>
        <el-row>
          <el-radio v-model="shareType"
                    :label="2">项目镜像</el-radio>
        </el-row>

      </div>
      <span slot="footer">
        <el-button @click="shareImageDialog=false">{{$t('views.button.cancel')}}</el-button>
        <el-button class="btn dark"
                   @click="shareSaveType">{{$t('views.button.sure')}}</el-button>
      </span>
    </el-dialog>
    <shareProjectImage :openDialog.sync='selProjectDialog'
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
          value: 1,
          label: '未生成'
        },
        {
          value: 2,
          label: '可用'
        },
        {
          value: 3,
          label: '停用'
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
          is_init: 0,
          name: '',
          category: '',
          // image_status: '',
          full_date: '',
          start_time: '',
          end_time: ''
        }
      },
      imageId: ''
    }
  },
  created () {
    this.initMsg()
    this.$post('/image/imagecategorylist', {is_init: this.tableData.sel.is_init}).then(res => {
      if (res.code === 200) {
        this.imageTypeOptions = res.data.category
      }
    })
  },
  methods: {
    // 镜像保存类型
    shareSaveType () {
      this.shareImageDialog = false
      setTimeout(() => {
        if (this.shareType === 1) {
          this.mixinConfirm('/image/imageshare', {image_id: this.shareImageId, is_init: 1}, '将此镜像共享到公共镜像库？').then(res => {
            if (res) {
              this.initMsg()
            }
          })
        } else {
          this.selProjectDialog = true
        }
      }, 200)
    },
    selectImage (arrSel) {
      console.log(arrSel)
      if (arrSel.length > 0) {
        this.$post('/image/imageshare', {image_id: this.shareImageId, is_init: 2, project_id: arrSel}).then(res => {
          if (res.code === 200) {
            this.selProjectDialog = false
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
      this.$get(this.tableData.url, lin).then(res => {
        // 根据后台接口更改
        let tableDate = res.data.image_list
        // 数据处理
        this.tableData.msg = [...tableDate] // 深度拷贝
        // 重置数据总数
        if (this.tableData.Pagination !== undefined) {
          this.tableData.Pagination.total_count = res.data.total_count
        }
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
      if (isNaN(id)) {
        this.imageId = ''
        this.$router.push({ name: 'editImage', query: { is_init: 0 } })
      } else {
        this.imageId = id
        this.$router.push({ name: 'editImage', query: { imageId: id, is_init: 0 } })
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'editImage') {
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
