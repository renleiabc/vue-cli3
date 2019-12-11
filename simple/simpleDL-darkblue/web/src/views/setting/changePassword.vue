/*
 * @Author: aFei
 * @Date: 2018-08-23 11:41:13
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-23 11:41:14
*/
<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-form :model="ruleForm"
                 status-icon
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item prop="oldPassword">
            <span slot="label">
              <i style="color:red;">*</i> {{$t('views.userManagement.oldPwd')}}
            </span>
            <el-input v-model="ruleForm.oldPassword"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span slot="label">
              <i style="color:red;">*</i> {{$t('views.userManagement.newPwd')}}
            </span>
            <el-input type="password"
                      v-model="ruleForm.password"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="validPassword">
            <span slot="label">
              <i style="color:red;">*</i> {{$t('views.userManagement.validPwd')}}
            </span>
            <el-input type="password"
                      v-model="ruleForm.validPassword"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class='btn'
                       @click="mixinGoBack">{{$t('views.button.cancel')}}</el-button>
            <el-button type="primary"
                       class='btn dark'
                       @click="submitForm('ruleForm')">{{$t('views.button.save')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as validFun from '@/util/validate'
export default {
  name: 'changePassword',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('views.userManagement.tips.pwd1')))
      } else if (!validFun.validatePwd(value)) {
        callback(new Error(this.$t('views.userManagement.tips.pwd4')))
      } else {
        if (this.ruleForm.validPassword !== '') {
          this.$refs.ruleForm.validateField('validPassword')
        }
        callback()
      }
    }
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('views.userManagement.tips.pwd1')))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('views.userManagement.tips.pwd2')))
      } else if (!validFun.validatePwd(value)) {
        callback(new Error(this.$t('views.userManagement.tips.pwd4')))
      } else if (value !== this.ruleForm.password) {
        callback(new Error(this.$t('views.userManagement.tips.pwd3')))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        password: '',
        validPassword: '',
        oldPassword: ''
      },
      rules: {
        password: [
          { min: 5, max: 16, message: this.$t('views.userManagement.tips.pwd4'), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        validPassword: [
          { min: 5, max: 16, message: this.$t('views.userManagement.tips.pwd4'), trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        oldPassword: [
          { validator: validateOldPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        let parms = {}
        parms.oldpass = validFun.utf8ToB64(this.ruleForm.oldPassword)
        parms.newpass = validFun.utf8ToB64(this.ruleForm.password)
        parms.repeatnewpass = validFun.utf8ToB64(this.ruleForm.validPassword)
        if (valid) {
          this.$post('/user/updatepassword', parms).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.$router.push({ name: 'systemMonitoring' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
