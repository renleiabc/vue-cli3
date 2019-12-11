<!--
 * @Author: renlei
 * @Date: 2019-08-14 10:46:32
 * @LastEditors: renlei
 * @LastEditTime: 2019-08-14 10:46:32
 * @Description:项目空间-我的项目
 -->

<template>
  <div>
    <div class="views-project-space">
      <div class="tab-select">
        <div>
          <span class="tab-select-title">{{$t('views.projectContent.projectName')}}</span>
          <el-input v-model="obj.name"
            :placeholder="$t('views.projectContent.inputKeyword')"
            class="views-input-text"></el-input>
        </div>
        <div>
          <span class="tab-select-title">{{$t('views.table.createTime')}}</span>
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
        <!-- 查询、重置 -->
        <div>
          <el-button class="btn light small"
            @click="reset">{{$t("views.button.reset")}}</el-button>
          <el-button class="btn light small"
            @click="search">{{$t("views.button.search")}}</el-button>
        </div>
      </div>
      <!-- 新建项目 归档项目 -->
      <div class="views-table-project"
        v-if="roleNum === 3">
        <el-button type="primary"
          class="view-btn-medium"
          @click="openProject">{{$t('views.projectContent.createdProject')}}</el-button>
        <el-button type="primary"
          class="view-btn-medium"
          @click="openFile">{{$t('views.projectContent.archivedItems')}}</el-button>
      </div>
      <!-- 项目表格数据 -->
      <div class="views-table-content">
        <el-table v-loading="loading"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @sort-change="sortTable"
          @selection-change="handleSelectionChange"
          border
          class="tab-content">
          <el-table-column width="55"
            type="selection"
            header-align="center"
            align="center"
            v-if="roleNum === 3">
          </el-table-column>
          <el-table-column :label="$t('views.projectContent.serial')"
            width="50"
            type="index"
            :index="indexMethod"
            header-align="center"
            align="center">
          </el-table-column>
          <!-- 这里需要自定义模板，然后写链接跳转-->
          <el-table-column :label="$t('views.projectContent.projectName')"
            header-align="center"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span @click="indexActive">
                <router-link :to="{name:'projectDetails',query:{id:scope.row.id}}"
                  class="views-table-link"
                  :class="{'views-table-cursor':true}">{{scope.row.name}}</router-link>
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('views.development.status')"
            header-align="center"
            align="center"
            width="100"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <div style="text-align: left;">
                <!-- 开发中 -->
                <i class="iconfont icon-kaifa views-icon-kaifa"
                  v-if="scope.row.status=='0'"></i>
                <span v-if="scope.row.status==0">{{$t('views.status.development')}}</span>
                <!-- 已归档 -->
                <i class="iconfont icon-yiguidang views-icon-yiguidang"
                  v-if="scope.row.status=='1'"></i>
                <span v-if="scope.row.status==1">已归档</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="created_at"
            sortable='custom'
            :label="$t('views.projectContent.createdTime')"
            header-align="center"
            align="center">
          </el-table-column>
          <el-table-column prop="describe"
            :label="$t('views.projectContent.description')"
            show-overflow-tooltip
            header-align="center"
            align="center">
          </el-table-column>
          <!-- 这里需要自定义模板，然后写链接跳转-->
          <el-table-column :label="$t('views.projectContent.documentation')"
            header-align="center"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <a class="views-project-file"
                :href="scope.row.document"
                target="_blank">{{scope.row.document}}</a>
            </template>
          </el-table-column>
          <el-table-column :label="$t('views.projectContent.operation')"
            header-align="center"
            align="center"
            width="200"
            v-if="roleNum === 3">
            <template slot-scope="scope">
              <div v-if="scope.row.status==='0'">
                <router-link class="views-table-span views-table-margin"
                  :to="{name:'projectSetting',query:{idSet:scope.row.id}}">{{$t('views.projectContent.setting')}}</router-link>
                <span class="views-table-span views-table-margin"
                  size="mini"
                  @click="fileClick(scope.row.id)">{{$t('views.projectContent.file')}}</span>
              </div>
              <div v-else>
                <span>—— ——</span>
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
          <el-pagination :page-size="per"
            layout="prev, pager, next"
            :total="total"
            @current-change="projectCurrentChange"
            v-show="isCount"
            :current-page.sync="currentPage">
          </el-pagination>
        </div>
      </div>
      <!-- 新建项目弹出窗-->
      <el-dialog :title="$t('views.projectContent.newProject')"
        :visible.sync="createDialog"
        width="30%"
        :before-close="handleClose"
        top='30vh'>
        <div class="content">
          <!--中间内容-->
          <el-form :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            :label-width="labelWidth"
            class="demo-ruleForm"
            @submit.native.prevent>
            <el-form-item :label="$t('views.projectContent.projectName')"
              prop="name">
              <el-input v-model="ruleForm.name"
                placeholder="请输入名称"
                maxlength="30"></el-input>
            </el-form-item>
            <el-form-item :label="$t('views.projectContent.description')"
              prop="describe">
              <el-input type="textarea"
                :rows="6"
                :placeholder="$t('views.projectContent.enterContent')"
                v-model="ruleForm.describe"
                maxlength="200">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer"
          class="dialog-footer">
          <el-button @click="resetForm('ruleForm')">
            {{$t('views.button.cancel')}}
          </el-button>
          <el-button type="primary"
            @click="submitForm('ruleForm')"
            :loading="isLoading">
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
        callback(new Error('项目名称不得包含：<>:\'"/\\.'))
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
        status: 0,
        sort: '',
        page: 0
      },
      ruleForm: {
        name: '',
        describe: ''
      },
      rules: {
        name: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        describe: [
          { required: false, message: '请输入项目描述', trigger: 'blur' }
        ]
      },
      isLoading: false,
      roleNum: ''
    }
  },
  created () {
    // console.log(this.$store.state.projectSpace.get)
    // 请求项目空间数据，函数调用
    let obj = this.obj
    this.getProjectSpaceData(obj)
    // 请求项目状态数据，函数调用
    this.$store.dispatch('getProjectStatus')
    // 获取用户信息
    this.$store.dispatch('getUserinfo')
    // 用户角色处理函数调用
    this.userinfo()
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
    // 用户角色数据处理
    userinfo () {
      this.roleNum = JSON.parse(window.sessionStorage.getItem('userinfo')).role
    },
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
    // 表格排序
    sortTable (event) {
      if (event.order === 'descending') {
        this.obj.sort = '-' + event.prop
      } else {
        this.obj.sort = event.prop
      }
      this.search()
    },
    // 重置
    reset () {
      let obj = {// 请求参数数据
        name: '',
        start_time: '',
        end_time: '',
        status: 0,
        page: 0
      }
      this.obj = obj
      this.timeValue = ''
      this.currentPage = 1
      this.getProjectSpaceData(obj)
    },
    // 查询
    search () {
      if (this.timeValue === '') {
        this.obj.start_time = ''
        this.obj.end_time = ''
      } else {
        this.obj.start_time = this.timeValue[0]
        this.obj.end_time = this.timeValue[1]
      }
      this.currentPage = 1
      this.obj.page = 0
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
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            let obj = {
              project_id: arr
            }
            // console.log(JSON.stringify(arr))
            this.$post('/project/archiveproject', obj).then(res => {
              // console.log(res)
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
    // 打开新建项目对话框
    openProject () {
      this.createDialog = true
    },
    // 确定按钮
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  console.log(this.ruleForm)
          this.isLoading = true
          let form = this.ruleForm
          this.$post('/project/projectcreate', { Project: form }).then(res => {
            this.isLoading = false
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              let obj = {// 请求参数数据
                name: '',
                start_time: '',
                end_time: '',
                status: 0,
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
      let activeName = 'first'
      window.localStorage.setItem('activeName', activeName)
    }
  },
  components: {},
  computed: {
    projectStatus () {
      return this.$store.getters.postProjectStatus
    }
    // roleNum () {
    //   return this.$store.getters.postUserinfo
    // }
  }
}
</script>
