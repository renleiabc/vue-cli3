/*
 * @Author: 少侠
 * @Date: 2018-08-30 11:28:17
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-30 16:35:22
 * @Description: 添加修改镜像
 */

<template>
  <div class="views-image-manage-new-image">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             :label-width="labelWidth">
      <el-row>
        <el-col :span='10'>
          <el-form-item :label='$t("views.imageManagement.mirrorName")'
                        prop="name">
            <el-input v-model="ruleForm.name"
                      maxlength="30"></el-input>
          </el-form-item>
          <el-form-item :label='$t("views.imageManagement.mirrorClassification")'
                        prop="category">
            <el-select v-model="ruleForm.category"
                       @change='changeCategory'
                       filterable
                       rel='selCategory'
                       :placeholder='$t("views.imageManagement.chose")'>
              <el-option v-for="(item, index) in seletions.category"
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
          <el-form-item :label='$t("views.imageManagement.operatingSystemType")'
                        prop="os">
            <el-select v-model="ruleForm.os"
                       @change="changeOS"
                       filterable
                       :placeholder='$t("views.imageManagement.chose")'>
              <el-option v-for="(item, index) in seletions.os"
                         :key="index"
                         :label="item.name"
                         :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span @click="delOS(index)"
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
          <el-form-item v-if="!isEdit"
                        :label='$t("views.imageManagement.imageFile")'
                        prop="path">
            <BreakpointUpload :params="para"
                              :language="lang"
                              v-on:resultUploader="uploadResult"
                              v-on:deleteFiles="deleteFile"></BreakpointUpload>
          </el-form-item>
        </el-col>
        <el-col :span='10'
                :push='1'>
          <el-form-item v-if='is_init === 2'
                        :label='$t("views.imageManagement.imageSpace")'
                        prop="project_id">
            <el-select v-model="ruleForm.project_id"
                       filterable
                       :disabled="isEdit"
                       :placeholder='$t("views.imageManagement.chooseImageSpace")'>
              <el-option v-for="(item, index) in proSpaces"
                         :key="index"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label='$t("views.imageManagement.mirrorDescription")'
                        prop="describe">
            <el-input type="textarea"
                      :rows='5'
                      maxlength="200"
                      v-model="ruleForm.describe"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='4'></el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <div class="text-center">
          <el-button @click="mixinGoBack">{{$t("views.button.cancel")}}</el-button>
          <el-button type="primary"
                     class='btn dark'
                     :disabled="isCreatBtn"
                     @click="submitForm('ruleForm')">{{$t("views.button.save")}}</el-button>
        </div>
      </el-row>
    </el-form>
    <!-- 弹窗1 -->
    <el-dialog :title='$t("views.imageManagement.titleImageType")'
               class="small"
               @close='handleClose1'
               :visible.sync="openDialog1">
      <div>
        <el-form ref="dailogForm1"
                 @submit.native.prevent
                 :model="dailogForm1"
                 :rules="dailogFormRules1"
                 label-width="80px">
          <el-form-item :label='$t("views.imageManagement.typeImageName")'
                        prop="categoryName">
            <el-input v-model="dailogForm1.categoryName"
                      maxlength="30"
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
    <!-- 弹窗2 -->
    <el-dialog :title='$t("views.imageManagement.titleOSType")'
               class="small"
               @close='handleClose2'
               :visible.sync="openDialog2">
      <div>
        <el-form ref="dailogForm2"
                 @submit.native.prevent
                 :model="dailogForm2"
                 :rules="dailogFormRules2"
                 label-width="120px">
          <el-form-item label='系统类型名称'
                        prop="osName">
            <el-input v-model="dailogForm2.osName"
                      maxlength="30"
                      :placeholder='$t("views.imageManagement.enter")'></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="openDialog2=false">{{$t("views.button.cancel")}}</el-button>
        <el-button class="btn dark"
                   @click="handleSure2">{{$t("views.button.save")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as validFun from '@/util/validate'
export default {
  name: 'newImage',
  data () {
    var validateimageName = (rule, value, callback) => {
      if (!validFun.validateUsername(value)) {
        callback(new Error(this.$t('views.userManagement.tips.validateUsername')))
      } else {
        callback()
      }
    }
    var validateStr = (rule, value, callback) => {
      if (!validFun.valiName(value)) {
        callback(new Error(this.$t('views.validError.validStr')))
      } else if (value.trim() === '') {
        callback(new Error(this.$t('views.validError.notNull')))
      } else {
        callback()
      }
    }
    return {
      lang: 'zh',
      is_init: 2,
      openDialog1: false,
      openDialog2: false,
      isCreatBtn: false,
      ruleForm: {
        name: '',
        category: '',
        os: '',
        project_id: '',
        describe: '',
        path: ''
      },
      dailogForm1: {
        categoryName: ''
      },
      dailogForm2: {
        osName: ''
      },
      dailogFormRules1: {
        categoryName: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' },
          { validator: validateStr, trigger: 'blur' }
        ]
      },
      dailogFormRules2: {
        osName: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' },
          { validator: validateStr, trigger: 'blur' }
        ]
      },
      rules: {
        name: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' },
          { validator: validateimageName, trigger: 'blur' }
        ],
        category: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'change' }
        ],
        os: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'change' }
        ],
        path: [
          { required: true, message: this.$t('views.imageManagement.uploadError'), trigger: 'change' }
        ],
        project_id: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'change' }
        ]
      },
      seletions: {},
      proSpaces: [],
      url: '',
      labelWidth: '120px',
      isEdit: false,
      hasObjectData: false,
      para: {
        target: window.Simple.php + '/v1/image/imageupload', // 后台上传地址
        // target: '//192.168.201.17:3000/upload', // 后台上传地址
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        },
        token: sessionStorage.getItem('access_token'), //
        typeArr: ['tar'], // 文件后缀类型 ['iso','mp4']
        // 断点上传位置查询
        checkChunkUploadedByResponse: function (chunk, message) {
          var objMessage = {}
          try {
            if (message) {
              objMessage.index = JSON.parse(message).data.index
            } else {
              objMessage.index = 0
            }
          } catch (e) {}
          // fake response
          // objMessage.uploaded_chunks = [2, 3, 4, 5, 8, 10, 11, 12, 13, 17, 20, 21]
          // check the chunk is uploaded
          // return (objMessage.uploaded_chunks || []).indexOf(chunk.offset + 1) >= 0
          return (objMessage.index || 0) > chunk.offset
        },
        chunkSize: 20 * 1024 * 1024 // 分段大小
      }
    }
  },
  watch: {
    STORE_THEME_LANG: {
      handler (options, oldOptions) {
        if (options) {
          this.lang = this.STORE_THEME_LANG
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      // console.log(vm.$route)
      if (vm.is_init === 0) {
        vm.$nextTick(function () {
          vm.$route.meta.markName = 'personalImage'
        })
      }
      if (vm.is_init === 2) {
        vm.$nextTick(function () {
          vm.$route.meta.markName = 'objectImage'
        })
      }
      if (vm.is_init === 1) {
        vm.$nextTick(function () {
          vm.$route.meta.markName = 'publicImage'
        })
      }
    })
  },
  created () {
    this.is_init = this.$route.query.is_init - 0
    if (this.is_init === 2) {
      this.$post('/image/projectlist').then(res => {
        this.proSpaces = res.data
      })
    }
    this.selectData()
    if (this.$route.query.imageId !== undefined) {
      this.imageId = this.$route.query.imageId
      this.isEdit = true
      this.url = '/image/imageupdate?image_id=' + this.$route.query.imageId
      this.$get('/image/imagedetails', {image_id: this.$route.query.imageId}).then(data => {
        if (this.is_init === 2) {
          this.proSpaces = [{id: data.data.image.project.id, name: data.data.image.project.name}]
          this.ruleForm.project_id = data.data.image.project_id
        }
        this.ruleForm.name = data.data.image.name
        this.ruleForm.category = data.data.image.category
        this.ruleForm.os = data.data.image.os
        this.ruleForm.describe = data.data.image.describe
        this.ruleForm.upload_path = data.data.image.upload_path
      })
    } else {
      this.url = '/image/imagecreate'
    }
    if (this.$route.query.hasObjectData !== undefined) {
      this.hasObjectData = true
    }
  },
  methods: {
    // 筛选数据
    selectData () {
      this.$get('/image/imagecategorylist', {is_init: this.is_init}).then(data => {
        this.seletions = {...data.data}
      })
    },
    handleClose1 () {
      this.$refs['dailogForm1'].resetFields()
      this.ruleForm.category = ''
    },
    handleClose2 () {
      this.$refs['dailogForm2'].resetFields()
      this.ruleForm.os = ''
    },
    // 镜像分类
    handleSure1 () {
      this.$refs['dailogForm1'].validate((valid) => {
        if (valid) {
          this.$post('/image/imagecategorycreate', {category_name: this.dailogForm1.categoryName}).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: this.$t('views.notification.saved')
              })
              this.seletions.category.push(res.data)
              this.openDialog1 = false
              this.$nextTick(function () {
                this.ruleForm.category = res.data.id
              })
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
    // 操作系统类型
    handleSure2 () {
      this.$refs['dailogForm2'].validate((valid) => {
        if (valid) {
          this.$post('/image/imageoscreate', { os_name: this.dailogForm2.osName }).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: this.$t('views.notification.saved')
              })
              this.seletions.os.push(res.data)
              this.openDialog2 = false
              this.$nextTick(function () {
                this.ruleForm.os = res.data.id
              })
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
    changeCategory () {
      if (this.ruleForm.category === -1) {
        this.openDialog1 = true
      }
    },
    changeOS () {
      if (this.ruleForm.os === -1) {
        this.openDialog2 = true
      }
    },
    delOS (id) {
      let osId = this.seletions.os[id]
      this.$post('/image/imageosdelete', osId).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: this.$t('views.notification.removed')
          })
          this.seletions.os.splice(id, 1)
          this.ruleForm.os = ''
        } else {
          this.ruleForm.os = ''
        }
      })
    },
    delCategory (id) {
      let categoryId = this.seletions.category[id]
      this.$post('/image/imagecategorydelete', {category_id: categoryId.id}).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: this.$t('views.notification.removed')
          })
          this.seletions.category.splice(id, 1)
          this.ruleForm.category = ''
        } else {
          this.ruleForm.category = ''
        }
      })
    },
    // 上传结果
    uploadResult: function (res) {
      var data = ''
      if (typeof (res) === 'object') {
        data = res
      } else {
        data = JSON.parse(res)
      }
      console.log(data)
      if (data.code === 200) {
        this.ruleForm.path = data.data.path
        this.$refs['ruleForm'].validate((valid) => {
          console.log(valid)
        })
      } else {
        this.$message({
          type: 'error',
          message: data.message
        })
        this.isCreatBtn = false
      }
    },
    // 删除回调
    deleteFile: function (res) {
      this.ruleForm.path = ''
      this.$post('/image/filedelete', {path: this.ruleForm.path}).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: this.$t('views.notification.removed')
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    // 保存
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.isCreatBtn = true
          this.ruleForm.is_init = this.is_init
          // if (this.imageId) {
          //   this.ruleForm.image_id = this.imageId
          // }
          this.$post(this.url, {Image: this.ruleForm, path: this.ruleForm.path}).then(data => {
            if (data.code === 200) {
              this.$message({message: this.$t('views.notification.saved'), type: 'success'})
              this.isCreatBtn = false
              this.$router.go(-1)
            } else {
              if (data.code === 100018) {
                this.ruleForm.os = ''
              }
              if (data.code === 100017) {
                this.ruleForm.category = ''
              }
              this.isCreatBtn = false
              this.selectData()
            }
          }).catch(res => {
            this.isCreatBtn = false
            this.$message({
              type: 'error',
              message: '服务器请求失败'
            })
          })
        } else {
          this.isCreatBtn = false
        }
      })
    }
  }
}
</script>
