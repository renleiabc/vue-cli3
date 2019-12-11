/*
 * @Author: aFei
 * @Date: 2018-08-23 11:41:27
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-23 11:41:28
*/
<template>
  <div class="views-user-management-add-user">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             :label-width="labelWidth">
      <el-row>
        <el-col :span='10'>
          <el-form-item :label='$t("views.userManagement.username")'
                        prop="username">
            <el-input v-model="ruleForm.username"
                      maxlength="16"
                      :disabled="isEnUsername"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='10'
                :push='2'>
          <el-form-item :label='$t("views.userManagement.name")'
                        prop="name">
            <el-input v-model="ruleForm.name"
                      maxlength="16"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='4'></el-col>
      </el-row>
      <el-row>
        <el-col :span='10'>
          <el-form-item :label='$t("views.userManagement.department")'
                        prop="department">
            <el-input v-model="ruleForm.department"
                      maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='10'
                :push='2'>
          <el-form-item :label='$t("views.userManagement.gender")'
                        prop="gender">
            <el-radio-group v-model="ruleForm.gender">
              <el-radio :label="1">{{$t("views.userManagement.man")}}</el-radio>
              <el-radio :label="2">{{$t("views.userManagement.woman")}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span='4'></el-col>
      </el-row>
      <el-row>
        <el-col :span='10'>
          <el-form-item :label='$t("views.userManagement.grade")'
                        prop="grade">
            <el-input v-model="ruleForm.grade"
                      maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='10'
                :push='2'>
          <el-form-item :label='$t("views.userManagement.class")'
                        prop="classes">
            <el-input v-model="ruleForm.classes"
                      maxlength="20"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='10'>
          <el-form-item :label='$t("views.userManagement.phone")'
                        prop="tel">
            <el-input v-model="ruleForm.tel"
                      maxlength="11"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='10'
                :push='2'>
          <el-form-item :label='$t("views.userManagement.weChatNumber")'
                        prop="weixin">
            <el-input v-model="ruleForm.weixin"
                      maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='4'></el-col>
      </el-row>
      <el-row>
        <el-col :span='10'>
          <el-form-item :label='$t("views.userManagement.email")'
                        prop="email">
            <el-input v-model="ruleForm.email"
                      maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item :label='$t("views.userManagement.personalProfile")'
                        prop="userinfo">
            <el-input type="textarea"
                      :rows='4'
                      maxlength="100"
                      v-model="ruleForm.userinfo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label='$t("views.userManagement.updatePassword")'
                    prop="type">
        <el-checkbox v-model="checkedRest"
                     @change='pwdRest'>{{$t("views.userManagement.resetPassword")}}</el-checkbox>
        <el-checkbox v-model="checkedInit"
                     @change='pwdInit'>{{$t("views.userManagement.initPassword")}}</el-checkbox>
      </el-form-item>
      <el-row>
        <el-col :span="10">
          <el-form-item label=""
                        type='password'
                        prop="password">
            <el-input v-model="ruleForm.password"
                      type='password'
                      :disabled='passwordEnable'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label=""
                        type='password'
                        prop="validPassword">
            <el-input v-model="ruleForm.validPassword"
                      type='password'
                      :disabled='passwordEnable'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="text-center">
        <el-button @click="mixinGoBack">{{$t("views.button.back")}}</el-button>
        <el-button @click="resetForm('ruleForm')"
                   class='btn light'>{{$t("views.button.reset")}}</el-button>
        <el-button type="primary"
                   class='btn dark'
                   @click="submitForm('ruleForm')">{{$t("views.button.save")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as validFun from '@/util/validate'
export default {
  name: 'personalSettings',
  data () {
    var validatePass = (rule, value, callback) => {
      if (this.checkedRest) {
        if (value === '') {
          callback(new Error(this.$t('views.userManagement.tips.pwd1')))
        } else {
          if (this.ruleForm.validPassword !== '') {
            this.$refs.ruleForm.validateField('validPassword')
          }
          callback()
        }
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (this.checkedRest) {
        if (value === '') {
          callback(new Error(this.$t('views.userManagement.tips.pwd2')))
        } else if (value !== this.ruleForm.password) {
          callback(new Error(this.$t('views.userManagement.tips.pwd3')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validateUsername = (rule, value, callback) => {
      if (!validFun.validateUsername(value)) {
        callback(new Error(this.$t('views.userManagement.tips.validateUsername')))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error(this.$t('views.validError.notNull')))
      } else if (!validFun.validateName(value)) {
        callback(new Error(this.$t('views.userManagement.tips.validateName')))
      } else {
        callback()
      }
    }
    var validateCommon = (rule, value, callback) => {
      if (value !== '') {
        if (!validFun.validateCommon(value)) {
          callback(new Error(this.$t('views.validError.validateCommon')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var enabelNull = (rule, value, callback) => {
      callback()
    }
    var validateTel = (rule, value, callback) => {
      if (!validFun.validateTel(value)) {
        callback(new Error(this.$t('views.userManagement.tips.validateTel')))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (!validFun.validateEmail(value)) {
        callback(new Error(this.$t('views.userManagement.tips.validateEmail')))
      } else {
        callback()
      }
    }
    return {
      passwordEnable: true,
      isEnUsername: false,
      isCreatUser: false,
      checkedInit: false,
      checkedRest: false,
      labelWidth: '100px',
      ruleForm: {
        username: '',
        name: '',
        status: true,
        gender: 1,
        department: '',
        grade: '',
        classes: '',
        tel: '',
        email: '',
        weixin: '',
        userinfo: '',
        isInitPwd: 0,
        password: '',
        role: 2,
        validPassword: ''
      },
      rules: {
        username: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        role: [
          { required: true, message: this.$t('views.userManagement.addUser.selRole'), trigger: 'change' }
        ],
        department: [
          { validator: validateCommon, trigger: 'blur' }
        ],
        grade: [
          { validator: validateCommon, trigger: 'blur' }
        ],
        classes: [
          { validator: validateCommon, trigger: 'blur' }
        ],
        weixin: [
          { validator: enabelNull, trigger: 'blur' }
        ],
        userinfo: [
          { validator: enabelNull, trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        tel: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' },
          { validator: validateTel, trigger: 'blur' }
        ],
        password: [
          { min: 6, max: 16, message: this.$t('views.userManagement.tips.pwd4'), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        validPassword: [
          { min: 6, max: 16, message: this.$t('views.userManagement.tips.pwd4'), trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$route.query.hasOwnProperty('userId')) {
      this.isCreatUser = false
      this.$post('/user/getuserinformation').then(res => {
        this.isEnUsername = true
        this.ruleForm.username = res.data.username
        this.ruleForm.name = res.data.name
        this.ruleForm.status = res.data.status
        this.ruleForm.grade = res.data.grade
        this.ruleForm.gender = res.data.gender
        this.ruleForm.classes = res.data.classes_id
        this.ruleForm.department = res.data.department
        this.ruleForm.tel = res.data.tel
        this.ruleForm.email = res.data.email
        this.ruleForm.weixin = res.data.weixin
        this.ruleForm.userinfo = res.data.introduce
      })
    } else {
      this.isCreatUser = true
      this.checkedRest = true
      this.passwordEnable = false
    }
  },
  watch: {
    STORE_THEME_LANG: {
      handler (options, oldOptions) {
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '100px'
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '200px'
        }
      }
    }
  },
  mounted () {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '100px'
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '200px'
    }
  },
  methods: {
    pwdRest () {
      if (this.checkedRest) {
        this.checkedInit = false
        this.passwordEnable = false
      } else {
        this.passwordEnable = true
      }
    },
    pwdInit () {
      this.$refs['ruleForm'].clearValidate(['password', 'validPassword'])
      if (this.checkedInit) {
        this.checkedRest = false
        this.passwordEnable = true
      } else {
        if (this.isCreatUser) {
          this.passwordEnable = false
          this.checkedRest = true
        }
      }
    },
    submitForm (formName) {
      let parms = {}
      parms.username = this.ruleForm.username
      parms.name = this.ruleForm.name.trim()
      // 是否初始化密码
      if (this.checkedInit) {
        this.ruleForm.isInitPwd = 1
      } else {
        this.ruleForm.isInitPwd = 0
        parms.password = this.ruleForm.password
      }
      parms.isInitPwd = this.ruleForm.isInitPwd
      parms.email = this.ruleForm.email
      parms.phone = this.ruleForm.tel
      parms.weixin = this.ruleForm.weixin
      parms.classes_id = this.ruleForm.classes
      parms.gender = this.ruleForm.gender
      parms.grade = this.ruleForm.grade
      parms.status = this.ruleForm.status ? 1 : 0
      parms.department = this.ruleForm.department
      parms.introduce = this.ruleForm.userinfo
      // 是否修改用户信息
      if (this.isCreatUser) {
        parms.role = this.ruleForm.role
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post('/user/update', parms).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.$message({
                message: this.$t('views.notification.saved'),
                type: 'success'
              })
              this.$router.push({ name: 'userManagementHome' })
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
