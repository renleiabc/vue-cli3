/*
 * @Author:任雷雷
 * @Date: 2018-07-12 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-16 10:31:59
 * @Description:项目空间-我的项目
 */
<template>
    <div>
        <div class="views-project-space">
            <div class="tab-select">
                <div>
                    <span class="tab-select-title">{{$t('views.projectContent.projectName')}}</span>
                    <el-input v-model="projectName" :placeholder="$t('views.projectContent.inputKeyword')" class="views-input-text"></el-input>
                </div>
                <div>
                    <span class="tab-select-title">{{$t('views.projectContent.projectStatus')}}</span>
                    <el-select v-model="status" :placeholder="$t('views.development.pleaseChoose')" @change="searchStatus" clearable>
                        <el-option v-for="item in projectStatus" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span class="tab-select-title">{{$t('views.table.createTime')}}</span>
                    <!-- 选择开始时间、结束时间 -->
                    <el-date-picker type="daterange" :editable='false' range-separator="-" :picker-options="pickerOptions" v-model="timeValue" value-format="yyyy-MM-dd HH:mm:ss" :start-placeholder="$t('views.button.startDate')" :end-placeholder="$t('views.button.endDate')" :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </div>
                <!-- 查询、重置 -->
                <div>
                    <el-button class="btn light small" @click="reset" v-if="false">{{$t("views.button.reset")}}</el-button>
                    <el-button class="btn light small" @click="search">{{$t("views.button.search")}}</el-button>
                </div>
            </div>
            <!-- 新建项目 归档项目 -->
            <div class="views-table-project">
                <el-button type="primary" class="view-btn-medium" @click="openProject">{{$t('views.projectContent.createdProject')}}</el-button>
                <el-button type="primary" class="view-btn-medium" @click="openFile" v-if="false">{{$t('views.projectContent.archivedItems')}}</el-button>
            </div>
            <!-- 项目表格数据 -->
            <div class="views-table-content">
                <el-table v-loading="loading" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border class="tab-content">
                    <el-table-column :label="$t('views.projectContent.serial')" width="50" type="index" :index="indexMethod" header-align="center" align="center">
                    </el-table-column>
                    <!-- 这里需要自定义模板，然后写链接跳转-->
                    <el-table-column :label="$t('views.projectContent.projectName')" header-align="center" align="center">
                        <template slot-scope="scope">
                            <div @click="indexActive" v-if="scope.row.status==='0'">
                                <router-link :to="{name:'projectDetails',query:{id:scope.row.id}}"
                                    class="views-table-link">{{scope.row.name}}</router-link>
                            </div>
                            <div v-else>
                                <router-link :to="{name:'spaceContent'}"
                                    class="views-table-link">{{scope.row.name}}</router-link>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('views.development.status')" header-align="center" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div style="text-align: left;">
                                <!-- 开发中 -->
                                <i class="iconfont icon-kaifa views-icon-kaifa" v-if="scope.row.status=='0'"></i>
                                <span v-if="scope.row.status==0">{{$t('views.status.development')}}</span>
                                <!-- 已归档 -->
                                <i class="iconfont icon-yiguidang views-icon-yiguidang" v-if="scope.row.status=='1'"></i>
                                <span v-if="scope.row.status==1">{{$t('views.status.file')}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="created_at" :label="$t('views.projectContent.createdTime')" header-align="center" align="center">
                    </el-table-column>
                    <el-table-column prop="describe" :label="$t('views.projectContent.description')" show-overflow-tooltip header-align="center" align="center">
                    </el-table-column>
                    <!-- 这里需要自定义模板，然后写链接跳转-->
                    <el-table-column :label="$t('views.projectContent.documentation')" header-align="center" align="center">
                        <template slot-scope="scope">
                            <a class="views-project-file" :href="scope.row.document" target="_blank">{{scope.row.document}}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('views.projectContent.operation')" header-align="center" align="center" width="200">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status==='0'">
                                <router-link class="views-table-span views-table-margin" :to="{name:'projectSetting',query:{idSet:scope.row.id}}">{{$t('views.projectContent.setting')}}</router-link>
                                <span class="views-table-span views-table-margin" size="mini" @click="fileClick(scope.row.id)">{{$t('views.projectContent.file')}}</span>
                            </div>
                            <div v-else>
                                <span>——</span>
                            </div>
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
                <div class="views-page">
                    <el-pagination :page-size="per" layout="prev, pager, next" :total="total" @current-change="projectCurrentChange" v-show="isCount" :current-page.sync="currentPage">
                    </el-pagination>
                </div>
            </div>
            <!-- 新建项目弹出窗-->
            <el-dialog :title="$t('views.projectContent.newProject')" :visible.sync="createDialog" width="30%" :before-close="handleClose" top='30vh'>
                <div class="content">
                    <!--中间内容-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-width="labelWidth" class="demo-ruleForm">
                        <el-form-item :label="$t('views.projectContent.projectName')" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入名称" maxlength="30"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('views.projectContent.description')" prop="describe">
                            <el-input type="textarea" :rows="6" :placeholder="$t('views.projectContent.enterContent')" v-model="ruleForm.describe">
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="resetForm('ruleForm')">
                        {{$t('views.button.cancel')}}
                    </el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        {{$t('views.button.sure')}}
                    </el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { timeData } from '../../util/index.js'
import { valiName } from '../../util/validate.js'
export default {
  data () {
    let time = timeData()
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入项目名称'))
      } else if (!valiName(value)) {
        callback(new Error('请输入正确的字符'))
      } else {
        callback()
      }
    }
    return {
      indexLink: '1',
      createDialog: false,
      loading: true,
      projectName: '',
      labelWidth: '120px',
      status: '',
      timeValue: '',
      readonly: false,
      project_id: '',
      isCount: false,
      per: 0,
      total: 0,
      options: [],
      archived: [],
      tableData: [],
      indexes: '',
      currentPage: 1,
      archived_project: [],
      pickerOptions: time,
      obj: {// 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: '',
        page: 0
      },
      ruleForm: {
        name: '',
        describe: ''
      },
      rules: {
        name: [
          { validator: validatePass, trigger: 'blur' }
        ],
        describe: [
          { required: false, message: '请输入项目描述', trigger: 'blur' },
          { max: 200, message: '长度在 10 到 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // console.log(this.$store.state.projectSpace.get)
    // 请求项目空间数据，函数调用
    let obj = this.obj
    this.getProjectSpaceData(obj)
    // 请求项目状态数据，函数调用
    this.$store.dispatch('getProjectStatus')
  },
  watch: {
    STORE_THEME_LANG: {
      handler (options, oldOptions) {
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '120px'
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '200px'
        }
      }
    }
  },
  mounted () {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '120px'
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '200px'
    }
  },
  methods: {
    // 请求我的项目数据
    getProjectSpaceData (obj) {
      this.$get('/project/myproject', obj).then(res => {
        //  console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.loading = false
          this.tableData = res.data.project_space
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
    reset () {
      this.projectName = ''
      this.status = ''
      this.timeValue = ''
    },
    // 查询
    search () {
      if (this.timeValue === '') {
        var start = ''
        var end = ''
      } else {
        start = this.timeValue[0]
        end = this.timeValue[1]
      }
      let name = this.projectName
      let status = this.status
      this.$set(this.obj, 'name', name)
      this.$set(this.obj, 'start_time', start)
      this.$set(this.obj, 'end_time', end)
      this.$set(this.obj, 'status', status)
      this.$set(this.obj, 'page', 0)
      this.currentPage = 1
      let obj = this.obj
      this.getProjectSpaceData(obj)
    },
    // 查询项目状态
    searchStatus (val) {
      // console.log(val)
      this.status = val
    },
    indexMethod (index) {
      return index + 1
    },
    handleSelectionChange (val) {
      // 选中的函数
      this.archived = val
      // console.log(JSON.stringify(val))
    },
    openFile () {
      this.archived_project = []
      if (this.archived.length === 0) {
        this.$message({
          message: this.$t('views.dialogText.archived'),
          type: 'warning'
        })
      } else {
        let that = this
        this.archived.forEach(function (val, index) {
          let value = val.status
          let id = val.id
          if (value === '0') {
            that.archived_project.push(id)
          }
        })
        if (this.archived_project.length === 0) {
          this.$message({
            message: this.$t('views.dialogText.archived'),
            type: 'warning'
          })
        } else {
          let archived = this.archived_project
          console.log(archived)
          this.projectSetting(archived)
        }
      }
    },
    // 单个项目归档
    fileClick (id) {
      let arr = []
      arr.push(id)
      this.projectSetting(arr)
    },
    // 项目归档函数封装
    projectSetting (arr) {
      this.$confirm(this.$t('views.dialogText.filed'), this.$t('views.dialogText.tip'), {
        confirmButtonText: this.$t('views.button.sure'),
        cancelButtonText: this.$t('views.button.cancel'),
        type: 'warning'
      }).then(() => {
        let obj = {
          project_id: arr
        }
        console.log(JSON.stringify(arr))
        this.$post('/project/archiveproject', obj).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            let obj = this.obj
            this.getProjectSpaceData(obj)
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('views.dialogText.cancelled')
        })
      })
    },
    // 打开新建项目对话框
    openProject () {
      this.createDialog = true
    },
    // 确定按钮
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  console.log(this.ruleForm)
          let form = this.ruleForm
          this.$post('/project/projectcreate', { Project: form }).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              let obj = {// 请求参数数据
                name: '',
                start_time: '',
                end_time: '',
                status: '',
                page: 1
              }
              this.getProjectSpaceData(obj)
              this.currentPage = 1
              this.$refs[formName].resetFields()
              this.createDialog = false
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消按钮
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.createDialog = false
    },
    // 关闭对话框
    handleClose (done) {
      done()
    },
    projectCurrentChange (val) {
      this.$set(this.obj, 'page', val)
      // console.log(JSON.stringify(this.obj))
      let obj = this.obj
      this.getProjectSpaceData(obj)
    },
    indexActive () {
      let activeName = 'second'
      window.localStorage.setItem('activeName', activeName)
    }
  },
  components: {},
  computed: {
    projectStatus () {
      return this.$store.getters.postProjectStatus
    }
  }

}
</script>
