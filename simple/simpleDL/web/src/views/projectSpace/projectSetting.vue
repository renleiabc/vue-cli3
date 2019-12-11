/*
 * @Author:任雷雷
 * @Date: 2018-08-13 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-08-13 10:31:59
 * @Description:项目空间-项目设置
 */
<template>
  <div class="views-personal">
    <!-- 基本信息 -->
    <div class="views-header-inf">
      <span>{{$t('views.modelPrediction.basicInf')}}</span>
    </div>
    <div class="views-develop-inf">
      <!--中间内容-->
      <el-form :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :label-width="labelWidth"
        class="demo-ruleForm">
        <div class="views-task-input">
          <el-form-item :label="$t('views.projectContent.projectName')"
            prop="name">
            <el-input v-model="ruleForm.name"
              :placeholder="$t('views.projectContent.projectName')"
              maxlength="30"
              clearable></el-input>
          </el-form-item>
        </div>
        <div class="views-task-image">
          <el-form-item :label="$t('views.projectContent.description')"
            prop="describe">
            <el-input type="textarea"
              :rows="6"
              :placeholder="$t('views.projectContent.enterContent')"
              v-model="ruleForm.describe"
              maxlength="200"
              clearable>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="views-add-box">
        <div class="views-span-empty">
          <div class="views-add-btn">
            <el-button type="primary"
              class="view-btn-big"
              @click="settingClick('ruleForm')">
              {{$t('views.button.save')}}
            </el-button>
          </div>
        </div>

      </div>
    </div>
    <!-- 成员管理 -->
    <div class="views-header-inf">
      <span>{{$t('views.projectContent.management')}}</span>
    </div>
    <div class="views-develop-inf">
      <div class="views-develop-mount">
        <el-button type="primary"
          class="view-btn-medium"
          @click="addClick">{{$t('views.projectContent.append')}}</el-button>
      </div>
      <!-- 项目表格数据 -->
      <div class="views-table-content">
        <el-table v-loading="loading"
          ref="multipleTable"
          :data="userTable"
          tooltip-effect="dark"
          style="width: 100%"
          border
          class="tab-content">
          <el-table-column :label="$t('views.projectContent.user')"
            header-align="center"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.user.username}}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名"
            header-align="center"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.userProfile.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="created_at"
            :label="$t('views.projectContent.addTime')"
            show-overflow-tooltip
            header-align="center"
            align="center">
          </el-table-column>
          <el-table-column :label="$t('views.projectContent.operation')"
            header-align="center"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span class="views-table-span views-table-margin del "
                size="mini"
                type="danger"
                @click="devDelete(scope.$index, scope.row.id)">{{$t('views.projectContent.delete')}}</span>
            </template>
          </el-table-column>
          <!-- 当数据为空的时候 -->
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

    </div>
    <!-- 添加用户弹出窗 -->
    <el-dialog :title="$t('views.projectContent.members')"
      :visible.sync="addMember"
      width="30%"
      :before-close="handleClose"
      top='30vh'
      custom-class="views-dialog"
      class="small">
      <div class="views-dialog-develop">
        <span class="tab-select-title">{{$t('views.projectContent.select')}}</span>
        <el-select v-model="memberName"
          :placeholder="$t('views.development.pleaseChoose')"
          filterable
          clearable>
          <el-option v-for="(item,index) in memberManage"
            :key="index"
            :label="item.name"
            :value="item.user_id"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="addMember = false"
          class="cancel">
          {{$t('views.button.cancel')}}
        </el-button>
        <el-button type="primary"
          @click="changeDialogMember"
          :loading="loading"
          class="primary">
          {{$t('views.button.sure')}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { valiName } from '../../util/validate.js'
export default {
  data () {
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
      index: 0,
      textarea: '',
      setingDisabled: true,
      loading: true,
      userTable: [],
      addMember: false,
      memberName: '',
      obj: '',
      isCount: false,
      per: 0,
      total: 0,
      labelWidth: '80px',
      currentPage: 1,
      ruleForm: {
        name: '',
        describe: ''
      },
      rules: {
        name: [
          { validator: validatePass, trigger: 'blur', required: true }
        ],
        describe: [
          { required: false, message: '请输入项目描述', trigger: 'blur' },
          { max: 200, message: '输入长度不得超过200 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.index = this.$route.params.idSet
    // 项目设置函数调用
    let id = this.$route.query.idSet
    this.obj = {
      project_id: id
    }
    let obj = this.obj
    // 请求项目设置
    this.setProjectData(obj)
    // 请求项目成员列表
    let pant = {
      project_id: id,
      page: 0
    }
    this.getProjectparticipant(pant)
  },
  watch: {
    STORE_THEME_LANG: {
      handler (options, oldOptions) {
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '80px'
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '200px'
        }
      }
    }
  },
  mounted () {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '80px'
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '200px'
    }
  },
  methods: {
    // 进行项目设置
    setProjectData (obj) {
      this.$get('/project/projectsetting', obj).then(res => {
        if (res.code === 200) {
          // console.log(JSON.stringify(res))
          // this.userTable = res.data.member_manage
          let basic = res.data.project_basic
          this.ruleForm.name = basic.name
          this.ruleForm.describe = basic.describe
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 项目成员列表
    getProjectparticipant (obj) {
      this.$get('/project/projectparticipant', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.loading = false
          this.userTable = res.data.member_manage
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
    // 分页
    projectCurrentChange (val) {
      let pant = {}
      pant.project_id = this.obj.project_id
      pant.page = val
      this.getProjectparticipant(pant)
    },
    // 删除项目成员
    devDelete (index, row) {
      let user = {
        id: row
      }
      let obj = this.obj
      this.$post('/project/participantdelete', user).then(res => {
        console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.getProjectparticipant(obj)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    handleClose (done) {
      done()
    },
    // 确定添加
    changeDialogMember () {
      let part = {}
      let obj = this.obj
      if (this.memberName === '') {
        this.$message({
          message: '请选择用户',
          type: 'warning'
        })
      } else {
        this.loading = true
        part.user_id = this.memberName
        part.project_id = this.obj.project_id
        this.$post('/project/participantadd', part).then(res => {
          console.log(JSON.stringify(res))
          if (res.code === 200) {
            this.addMember = false
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.getProjectparticipant(obj)
            this.memberName = ''
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
          this.loading = false
        })
      }
    },
    // 打开弹出窗,并请求数据
    addClick () {
      let obj = this.obj
      this.$store.dispatch('getShowuser', obj)
      this.addMember = true
    },
    // 确定按钮
    settingClick (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm)
          var form = this.ruleForm
          console.log(this.ruleForm)
          form.project_id = this.obj.project_id
          this.$post('/project/projectsetting', form).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.currentPage = 1
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
    cancelBtn (formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {},
  computed: {
    memberManage () {
      return this.$store.getters.postMemberManage
    }
  }
}

</script>
<style  scoped>
</style>
