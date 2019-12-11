/*
 * @Author: 少侠
 * @Date: 2018-08-03 15:01:56
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-08 16:15:10
 * @Description: 创建案例 修改案例
 */

<template>
  <div class="create_case">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="120px"
             class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="案例名称"
                        prop="case_name">
            <el-input v-model="ruleForm.case_name"
                      maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="关联镜像"
                        prop="system_image_name">
            <el-input readonly='true'
                      class="w8"
                      v-model="ruleForm.system_image_name">
            </el-input>
            <el-button class="view-btn-medium"
                       @click.native="getImages">选择</el-button>
          </el-form-item>
          <el-form-item label="数据和代码"
                        prop="date_code">
            <el-input readonly='true'
                      class="w8"
                      v-model="ruleForm.date_code">
            </el-input>
            <el-button class="view-btn-medium"
                       @click="getDataCode">选择</el-button>
          </el-form-item>
          <el-form-item label="案例文档链接"
                        prop="case_document_address">
            <el-input v-model="ruleForm.case_document_address"></el-input>
          </el-form-item>
          <el-form-item label="加密文档密码"
                        prop="name">
            <el-input v-model="ruleForm.case_document_key"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="案例分类"
                        prop="case_type">
            <el-select v-model="ruleForm.case_type"
                       filterable
                       @change='changeCategory'
                       placeholder="请选择">
              <el-option v-for="(item, index) in selections"
                         :key="index"
                         :label="item.name"
                         :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span @click="delCategory(index)"
                      style="float: right; color: #8492a6; font-size: 12px">
                  <i class="iconfont icon-shanchu"></i>
                </span>
              </el-option>
              <el-option :key="-1"
                         :label='$t("views.imageManagement.customize")'
                         :value="-1">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="案例描述">
            <el-input type="textarea"
                      rows='8'
                      maxlength="200"
                      v-model="ruleForm.case_description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="text-center">
        <el-button @click="mixinGoBack()">返回</el-button>
        <el-button class="btn dark"
                   @click="submitForm('ruleForm')">保存</el-button>
      </div>
    </el-form>
    <!-- 弹窗1自定义案例分类 -->
    <el-dialog :title='$t("views.imageManagement.titleImageType")'
               class="small"
               @close='handleClose1'
               :visible.sync="openDialog1">
      <div>
        <el-form ref="dailogForm1"
                 :model="dailogForm1"
                 :rules="dailogFormRules1"
                 label-width="80px">
          <el-form-item :label='$t("views.imageManagement.typeImageName")'
                        prop="categoryName">
            <el-input v-model="dailogForm1.categoryName"
                      :placeholder='$t("views.imageManagement.enter")'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="openDialog1=false">{{$t("views.button.cancel")}}</el-button>
        <el-button class="btn dark"
                   @click="handleSure1">{{$t("views.button.save")}}</el-button>
      </span>
    </el-dialog>
    <imageTableDialog :openDialog.sync='imageListVisible'
                      :selImageId.sync='ruleForm.system_image_id'
                      @modalClose="modalClose"
                      @selectImage='selectImages'></imageTableDialog>
    <codeDataDialog :openDialog.sync='dataCodeVisible'
                    @dataCodeClose="dataCodeClose"></codeDataDialog>
  </div>
</template>

<script>
import * as validFun from '@/util/validate'
import imageTableDialog from './components/imagesTable'
import codeDataDialog from './components/dataCode'
export default {
  name: 'createCase',
  components: {
    imageTableDialog,
    codeDataDialog
  },
  data () {
    var validateStr = (rule, value, callback) => {
      if (!validFun.valiName(value)) {
        callback(new Error(this.$t('views.validError.validStr')))
      } else {
        callback()
      }
    }
    return {
      dataCodeVisible: false,
      imageListVisible: false,
      pageSize: 10,
      openDialog1: false,
      caseTypeArr: [],
      ruleForm: {
        case_name: '',
        date_code: '',
        case_document_address: '',
        case_document_key: '',
        case_type: '',
        system_image_id: 0,
        system_image_name: '',
        case_description: ''
      },
      dailogForm1: {
        categoryName: ''
      },
      dailogFormRules1: {
        categoryName: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' },
          { validator: validateStr, trigger: 'blur' }
        ]
      },
      selections: [],
      rules: {
        case_name: [
          { required: true, message: '请输入案例名称', trigger: 'blur' },
          { validator: validateStr, trigger: 'blur' }
        ],
        case_type: [
          { required: true, message: '请选择案例分类', trigger: 'blur' }
        ],
        system_image_name: [
          { required: true, message: '请选择关联镜像', trigger: 'change' }
        ],
        date_code: [
          { required: true, message: '请选择数据和代码', trigger: 'change' }
        ],
        case_document_address: [
          { required: true, message: '请输入案例文档链接', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getTypeList()
    if (this.$route.query.hasOwnProperty('caseId')) {
      let id = this.$route.query.caseId
      this.$get('/casecenter/show', {case_center_id: id}).then(res => {
        console.log(res)
        this.ruleForm.case_id = id
        this.ruleForm.case_name = res.data.name
        this.ruleForm.date_code = res.data.code_data
        this.ruleForm.case_document_address = res.data.document_link
        this.ruleForm.case_document_key = res.data.document_password
        this.ruleForm.system_image_id = res.data.image_id
        this.ruleForm.system_image_name = res.data.imageRel.name
        this.ruleForm.case_description = res.data.describe
        setTimeout(() => {
          this.ruleForm.case_type = res.data.category
        }, 5)
      })
    }
  },
  methods: {
    selectImages (select) {
      if (select.id && select.id !== 0) {
        this.ruleForm.system_image_id = select.id
        this.ruleForm.system_image_name = select.name
        this.$message({message: '选择成功', type: 'success'})
      } else {
        this.$message({message: '请选择镜像', type: 'error'})
      }
    },
    // 获取案例分类数据
    getTypeList (cb) {
      // 获取搜索的数据
      this.$get('/casecenter/casecentercategorylist').then(res => {
        this.selections = [...res.data]
        this.ruleForm.case_type = ''
        // this.case_status = [...res.data.case_status]
        if (typeof cb === 'function') {
          cb()
        }
      })
    },
    changeCategory () {
      if (this.ruleForm.case_type === -1) {
        this.openDialog1 = true
      }
    },
    handleClose1 () {
      this.$refs['dailogForm1'].resetFields()
      this.ruleForm.case_type = ''
    },
    // 案例分类
    handleSure1 () {
      this.$refs['dailogForm1'].validate((valid) => {
        if (valid) {
          this.$post('/casecenter/addcasecentercategory', {name: this.dailogForm1.categoryName}).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: this.$t('views.notification.saved')
              })
              this.openDialog1 = false
              this.getTypeList(() => { this.ruleForm.case_type = '' + res.data.id })
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        }
      })
    },
    delCategory (ind) {
      let categoryId = this.selections[ind]
      this.$post('/casecenter/delcasecentercategory', {id: categoryId}).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: this.$t('views.notification.removed')
          })
          this.getTypeList()
        }
      })
    },
    modalClose () {
      this.imageListVisible = false
    },
    dataCodeClose (data) {
      console.log(data)
      if (data.leaf) {
        this.ruleForm.date_code = data.storage_name + '://' + data.path
      } else {
        this.$message({message: '请选择一个文件', type: 'error'})
      }
      this.dataCodeVisible = false
    },
    getImages () {
      this.imageListVisible = true
    },
    getDataCode () {
      this.dataCodeVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let parms = {}
          parms.name = this.ruleForm.case_name
          parms.category = this.ruleForm.case_type
          parms.image_id = this.ruleForm.system_image_id
          parms.code_data = this.ruleForm.date_code
          parms.document_link = this.ruleForm.case_document_address
          parms.document_password = this.ruleForm.case_document_key
          parms.describe = this.ruleForm.case_description
          if (this.$route.query.hasOwnProperty('caseId')) {
            parms.case_center_id = this.$route.query.caseId
            this.$post('/casecenter/update', parms).then(res => {
              if (res.code === 200) {
                this.$message({message: '保存成功', type: 'success'})
                this.mixinGoBack()
              } else {
                this.$message({message: res.message, type: 'error'})
                return false
              }
            })
          } else {
            this.$post('/casecenter/create', parms).then(res => {
              if (res.code === 200) {
                this.$message({message: '保存成功', type: 'success'})
                this.mixinGoBack()
              } else {
                this.$message({message: res.message, type: 'error'})
                return false
              }
            })
          }
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
