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
          <el-form-item label="原密码"
                        prop="oldPassword">
            <el-input v-model.number="ruleForm.oldPassword"
                      type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码"
                        prop="password">
            <el-input type="password"
                      v-model="ruleForm.password"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="validPassword">
            <el-input type="password"
                      v-model="ruleForm.validPassword"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class='btn'
                       @click="mixinGoBack">取消</el-button>
            <el-button type="primary"
                       class='btn dark'
                       @click="submitForm('ruleForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'changePassword',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('views.userManagement.tips.pwd1')))
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
          { min: 6, max: 16, message: this.$t('views.userManagement.tips.pwd4'), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        validPassword: [
          { min: 6, max: 16, message: this.$t('views.userManagement.tips.pwd4'), trigger: 'blur' },
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
        parms.oldpass = this.ruleForm.oldPassword
        parms.newpass = this.ruleForm.password
        parms.repeatnewpass = this.ruleForm.validPassword
        if (valid) {
          this.$post('/user/updatepassword', parms).then(res => { console.log(1) })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
