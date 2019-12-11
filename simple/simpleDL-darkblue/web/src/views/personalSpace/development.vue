/*
 * @Author:任雷雷
 * @Date: 2018-08-02 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-08-02 10:31:59
 * @Description:个人空间-开发环境视图
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:29:59
*/
<template>
  <div>
    <!-- 个人空间信息 -->
    <views-personal-content></views-personal-content>
    <div class="views-project-space">
      <div class="tab-select">
        <!-- 开发环境名称 -->
        <div>
          <span class="tab-select-title views-text-title">{{$t('views.development.developmentName')}}</span>
          <el-input v-model="obj.name"
                    :placeholder="$t('views.projectContent.enterContent')"
                    class="views-input-text"></el-input>
        </div>
        <!-- 状态 -->
        <div>
          <span class="tab-select-title views-text-title">{{$t('views.development.status')}}</span>
          <el-select v-model="obj.status"
                     placeholder="请选择">
            <el-option v-for="item in environmentstatus"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- 镜像名称 -->
        <div>
          <span class="tab-select-title views-text-title">{{$t('views.development.mirror')}}</span>
          <el-input v-model="obj.image_name"
                    :placeholder="$t('views.projectContent.enterContent')"
                    class="views-input-text"></el-input>
        </div>
        <!-- 创建时间 -->
        <div>
          <span class="tab-select-title ">{{$t('views.table.createTime')}}</span>
          <!-- 选择开始时间、结束时间 -->
          <el-date-picker type="daterange"
                          :editable='false'
                          range-separator="-"
                          :picker-options="pickerOptions"
                          v-model="timeValue"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :start-placeholder="$t('views.button.startDate')"
                          :end-placeholder="$t('views.button.endDate')"
                          :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
        <!-- 重置、查询 -->
        <div>
          <el-button class="btn light small"
                     @click='devleopReset'>{{$t("views.button.reset")}}</el-button>
          <el-button class="btn light small"
                     @click='devleopSearch'>{{$t("views.button.search")}}</el-button>
        </div>
      </div>
      <!-- 创建开发环境 -->
      <div class="views-table-btn">
        <el-button type="primary"
                   class="view-btn-medium"
                   @click="creatDevelop">{{$t('views.development.createdDev')}}</el-button>
      </div>
      <div class="views-table-content">
        <el-table ref="multipleTable"
                  v-loading="loading"
                  @sort-change="sortTable"
                  :data="devData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  class="tab-content">
          <el-table-column :label="$t('views.projectContent.serial')"
                           width="50"
                           type="index"
                           :index="devIndex"
                           header-align="center"
                           align="center">
          </el-table-column>
          <!-- 这里需要自定义模板，然后写链接跳转-->
          <el-table-column :label="$t('views.development.developmentNameID')"
                           header-align="center"
                           align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <router-link :to="{name:'perDevelopDetails',params:{perDevelopId:scope.row.id}}"
                           class="views-table-link"
                           tag='a'>{{scope.row.name}}</router-link>
            </template>
          </el-table-column>
          <!-- 训练任务的状态 -->
          <el-table-column :label="$t('views.development.status')"
                           show-overflow-tooltip
                           header-align="center"
                           align="center"
                           width="120">
            <template slot-scope="scope">
              <div style="text-align: left;">
                <!-- 异常 -->
                <i class="iconfont icon-yichang views-icon-yichang"
                   v-if="scope.row.status==='0'"></i>
                <span v-if="scope.row.status==='0'">{{$t('views.status.abnormal')}}</span>
                <!-- 运行中 -->
                <i class="iconfont icon-yunhangzhong views-icon-yunhangzhong"
                   v-if="scope.row.status==='1'"></i>
                <span v-if="scope.row.status==='1'">{{$t('views.status.running')}}</span>
                <!-- 创建中 -->
               <i class="iconfont icon-warning views-icon-chuangjian"
                v-if="scope.row.status==='2'"></i>
              <span v-if="scope.row.status==='2'">创建中</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="image.name"
                           :label="$t('views.development.mirror')"
                           header-align="center"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="created_at"
                           sortable='custom'
                           :label="$t('views.projectContent.createdTime')"
                           header-align="center"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="gpu"
                           label="GPU卡"
                           header-align="center"
                           align="center"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="describe"
                           :label="$t('views.development.remarks')"
                           show-overflow-tooltip
                           header-align="center"
                           align="center">
          </el-table-column>
          <el-table-column :label="$t('views.projectContent.operation')"
                           header-align="center"
                           align="center"
                           width="200">
            <template slot-scope="scope">
              <!-- 生成镜像 -->
              <span class="views-table-span views-table-margin"
                    size="mini"
                    v-if="scope.row.status==='1'"
                    @click="mirrorDialog(scope.row.id)">{{$t('views.development.mirrorImage')}}</span>
              <!-- 删除按钮 -->
              <span class="views-table-span views-table-margin del "
                    size="mini"
                    type="danger"
                    @click="deleteDialogSingle(scope.row.id)">{{$t('views.projectContent.delete')}}</span>
            </template>
          </el-table-column>
          <!-- 当表格数据为空的时候 -->
          <div slot="empty">
            <div class="views-empty">
              <span class="views-empty-table"></span>
              <p class="views-empty-text">{{$t('views.table.noData')}}</p>
            </div>
          </div>
        </el-table>
        <!-- 分页 -->
        <div class="views-page">
          <el-pagination :page-size="per"
                         layout="prev, pager, next"
                         :total="total"
                         @current-change="devCurrentChange"
                         v-show="isCount"
                         :current-page.sync="currentPage">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ViewsPersonalContent from './personalContent'
import { timeData } from '../../util/index.js'
export default {
  data () {
    let time = timeData()
    return {
      readonly: false,
      timeValue: '',
      pickerOptions: time,
      obj: {// 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        sort: '',
        image_name: ''
      },
      isCount: false,
      per: 0,
      total: 0,
      currentPage: 1,
      devData: [],
      loading: true
    }
  },
  created () {
    // 默认请求个人空间开发环境列表
    this.getDevelopmentData(this.obj)
    // this.$store.dispatch('getDevelopment')
    // 请求开发环境状态数据，函数调用
    this.$store.dispatch('getEnvironmentstatus')
  },
  watch: {},
  methods: {
    // 请求开发环境的数据
    getDevelopmentData (obj) {
      this.$get('/personal/personalenvironment', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.loading = false
          this.devData = [...res.data.project_develop]
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
    // 表格排序
    sortTable (event) {
      if (event.order === 'descending') {
        this.obj.sort = '-' + event.prop
      } else {
        this.obj.sort = event.prop
      }
      this.devleopSearch()
    },
    // 重置
    devleopReset () {
      let obj = {// 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0,
        image_name: ''
      }
      this.timeValue = ''
      this.currentPage = 1
      this.obj = obj
      this.getDevelopmentData(obj)
      return obj
    },
    // 查询
    devleopSearch () {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0
        this.obj.start_time = 0
      } else {
        this.obj.start_time = this.timeValue[0]
        this.obj.end_time = this.timeValue[1]
      }
      this.currentPage = 1
      this.getDevelopmentData(this.obj)
    },
    devIndex (index) {
      return index + 1
    },
    creatDevelop () {
      this.$router.push({ name: 'perCreateDevelop' })
    },
    // 分页
    devCurrentChange (val) {
      if (this.timeValue.length === 0) {
        this.obj.end_time = 0
        this.obj.start_time = 0
      } else {
        this.obj.start_time = this.timeValue[0]
        this.obj.end_time = this.timeValue[1]
      }
      this.obj.page = val
      this.getDevelopmentData(this.obj)
    },
    // 删除弹出框
    deleteDialogSingle (id) {
      this.$confirm(this.$t('views.dialogText.deleteConfirm'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            let obj = {
              environment_id: id
            }
            this.$post('/environmentproject/environmentdelete', obj).then(res => {
              console.log(JSON.stringify(res))
              instance.confirmButtonLoading = false
              if (res.code === 200) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.getDevelopmentData(this.obj)
                // 个人空间个人空间请求项目配额请求
                this.$store.dispatch('getPersonalDetails')
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
    // 生成镜像函数
    mirrorDialog (id) {
      this.$confirm(this.$t('views.dialogText.images'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            let obj = {
              environment_id: id,
              type: 0
            }
            this.$post('/environmentproject/environmentsaveimage', obj).then(res => {
              // console.log(JSON.stringify(res))
              instance.confirmButtonLoading = false
              if (res.code === 200) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.getDevelopmentData(this.obj)
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
    }
  },
  components: { ViewsPersonalContent },
  computed: {
    environmentstatus () {
      return this.$store.getters.postEnvironmentstatus
    }
  }
}
</script>
