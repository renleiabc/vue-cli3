<!--
 * @Author: renlei
 * @Date: 2019-08-14 10:46:32
 * @LastEditors: renlei
 * @LastEditTime: 2019-09-01 15:23:07
 * @Description:个人空间-创建开发环境
 -->

<template>
  <div class="views-personal">
    <el-form :model="ruleForm"
             :rules="createDevrules"
             ref="ruleForm"
             :label-width="labelWidth"
             class="demo-ruleForm views-dev-form">
      <!-- 基本信息 -->
      <div class="views-header-inf">
        <span>{{$t('views.development.developingInformation')}}
        </span>
      </div>
      <div class="views-develop-inf">
        <div class="views-develop-text">
           <!-- 环境名称 -->
          <div class="views-develop-image">
            <el-form-item :label="$t('views.development.environmentalName')"
                          prop="name">
              <div class="views-develop-choice">
                <el-input v-model="ruleForm.name"
                          :placeholder="$t('views.development.youCan')"
                          minlength=2
                          maxlength=30
                          clearable></el-input>
                <el-button type="primary"
                           class="view-btn-medium"
                           style="opacity:0;cursor:default;">{{$t('views.button.choice')}}</el-button>
              </div>
            </el-form-item>
          </div>
          <div class="views-develop-image">
            <!-- 镜像分类 -->
            <el-form-item :label="$t('views.development.classification')"
                          prop="image">
              <div class="views-develop-choice">
                <el-input v-model="ruleForm.image"
                          :readonly="true"></el-input>
                <el-button type="primary"
                           class="view-btn-medium"
                           @click="classification('ruleForm')">{{$t('views.button.choice')}}</el-button>
              </div>
            </el-form-item>
          </div>
          <!-- 选择镜像 -->
          <div class="views-develop-image">
            <el-form-item :label="$t('views.development.selectMirror')"
                          prop="mirror">
              <div class="views-develop-choice">
                <el-input v-model="ruleForm.mirror"
                          :readonly="true"></el-input>
                <el-button type="primary"
                           class="view-btn-medium"
                           @click="choiceMirror('ruleForm')">{{$t('views.button.choice')}}</el-button>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="views-develop-text">
          <div class="views-develop-image">
            <el-form-item :label="$t('views.development.remarks')"
                          prop="desc">
              <el-input type="textarea"
                        :rows="6"
                        maxlength="200"
                        :placeholder="$t('views.development.pleaseContents')"
                        v-model="ruleForm.desc">
              </el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <!--密码信息 -->
      <div class="views-header-inf">
        <span>{{$t('views.development.cipherInformation')}}</span>
      </div>
      <div class="views-develop-inf">
        <div class="views-develop-text">
          <div class="views-develop-input">
            <el-form-item :label="$t('views.development.pleasePassword')"
                          prop="pass">
              <el-input v-model="ruleForm.pass"
                        :placeholder="$t('views.development.password')"
                        clearable
                        minlength="6"
                        maxlength="16"
                        auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="views-develop-text">
          <div class="views-develop-input">
            <el-form-item :label="$t('views.development.confirmPassword')"
                          prop="checkPass">
              <el-input v-model="ruleForm.checkPass"
                        :placeholder="$t('views.development.password')"
                        clearable
                        minlength="6"
                        maxlength="16"
                        auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <!-- 存储挂载信息 -->
      <div class="views-header-inf">
        <span>{{$t('views.development.storeInformation')}}</span>
      </div>
      <div class="views-develop-mount">
        <el-form-item v-for="(item,index) in ruleForm.address"
                      :key='index'
                      :rules="{required: true, message: '挂载信息不能为空', trigger: 'change'}"
                      :prop="'address.'+index+ '.increaseAddress'"
                      label-width="0">
          <el-input v-model="item.increaseAddress"
                    placeholder=""
                    :readonly="true"
                    class="w8"></el-input>
          <el-button type="primary"
                     class="view-btn-medium"
                     @click="developBrowse(index,item)">
            {{$t('views.development.browse')}}
          </el-button>
          <el-input v-model="item.createAddress"
                    placeholder=""
                    :readonly="true"></el-input>
          <span class="views-btn-reduce"
                @click="reduceAddress(index)">—</span>
          <span>{{item.read}}</span>
        </el-form-item>
      </div>
      <div class="views-develop-mount">
        <el-button type="primary"
                   class="view-btn-medium"
                   @click="mountAddress">
          {{$t('views.development.mountAddress')}}
        </el-button>
        <span class="views-mount-span">*{{$t('views.development.mountableAddresses')}}</span>
      </div>

      <!-- 资源信息 -->
      <div class="views-header-inf">
        <span>{{$t('views.development.resource')}}</span>
      </div>
      <div class="views-develop-resources">
        <el-form-item label="CPU"
                      prop="cpu">
          <el-select v-model="ruleForm.cpu"
                     :placeholder="$t('views.development.pleaseChoose')"
                     @change="changeCpu">
            <el-option v-for="item in personalconfig.cpu_config"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>&nbsp;核
        </el-form-item>
        <el-form-item label="GPU"
                      prop="gpu">
          <el-select v-model="ruleForm.gpu"
                     :placeholder="$t('views.development.pleaseChoose')"
                     @change="changeGpu">
            <el-option v-for="item in  personalconfig.gpu_config"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>&nbsp;个
        </el-form-item>
        <el-form-item :label="$t('views.projectContent.memory')"
                      prop="memory">
          <el-select v-model="ruleForm.memory"
                     :placeholder="$t('views.development.pleaseChoose')"
                     @change="changeMemory">
            <el-option v-for="item in  personalconfig.memory_config"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>&nbsp;G
        </el-form-item>
      </div>
      <div class="views-develop-btn">
        <el-button @click="resetForm('ruleForm')">{{$t('views.button.cancel')}}</el-button>
        <el-button type="primary"
                   class="view-btn-big"
                   @click="submitForm('ruleForm')"
                   :loading="isLoading">{{$t('views.button.run')}}</el-button>
      </div>
    </el-form>
    <!-- 镜像分类弹出框 -->
    <el-dialog :title="$t('views.development.classification')"
               :visible.sync="ificationDialog"
               :before-close="handleClose" :width="mirrorWidth">
      <div class="content">
        <views-mirror-class :imagecategorylist='imagecategorylist'
                            @dialogMirrorClose="choiceMirrorClose($event)"
                            @choiceMirrorName="selectMirrorClass($event)"
                            ref="selectMirror1"></views-mirror-class>
      </div>
    </el-dialog>
    <!-- 选择镜像 -->
    <el-dialog :title="$t('views.development.selectMirror')"
               :visible.sync="dialogMirror"
               :before-close="handleClose">
      <div class="content">
        <views-select-mirror :category='category'
                             @choiceClose="dialogClose($event)"
                             @choiceName="selectMirror($event)"
                             ref="selectMirror"></views-select-mirror>
      </div>
    </el-dialog>
    <!-- 选择挂载地址 -->
    <el-dialog title="选择存储挂载地址"
               :visible.sync="dialogAddress"
               :before-close="handleClose"
               class="small">
      <div class="content">
        <views-code-file @selectStroage='showStroage($event)'></views-code-file>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="cancel"
                   @click="dialogAddress = false">{{$t('views.button.cancel')}}</el-button>
        <el-button class="primary"
                   type="primary"
                   @click="dialogSure">{{$t('views.button.sure')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validatePassword, validateUsername, valiName } from '@/util/validate.js'
import ViewsSelectMirror from './components/selectMirror'
import ViewsCodeFile from './components/codeFile'
import ViewsMirrorClass from './components/mirrorClass'
export default {
  data () {
    var name = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入名称'))
      } else if (!validateUsername(value)) {
        callback(new Error('只能输入2-30位字母、数字、下划线'))
      } else {
        callback()
      }
    }
    var firstPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!validatePassword(value)) {
        callback(new Error('请输入6-16位字母、数字、特殊字符(!@#$%^&*)，至少两种组合'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var nextPass = (rule, value, callback) => {
      if (value === '') {
        //  console.log(value, '++++')
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        // console.log(value, this.ruleForm.pass)
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // cpu验证
    var cpu = (rule, value, callback) => {
      //  console.log(this.cpuMark)
      if (value === '') {
        //  console.log(value, '++++')
        callback(new Error('CPU不能为空'))
      } else if (this.cpuMark) {
        // console.log(value, this.ruleForm.pass)
        callback(new Error('选择的值超出最大范围，请重新选择!'))
      } else {
        callback()
      }
    }
    // gpu验证
    var gpu = (rule, value, callback) => {
      // console.log(this.gpuMark)
      if (value === '') {
        //  console.log(value, '++++')
        callback(new Error('GPU不能为空'))
      } else if (this.gpuMark) {
        // console.log(value, this.ruleForm.pass)
        callback(new Error('选择的值超出最大范围，请重新选择!'))
      } else {
        callback()
      }
    }
    // 内存验证
    var memory = (rule, value, callback) => {
      // console.log(this.memoryMark)
      if (value === '') {
        //  console.log(value, '++++')
        callback(new Error('内存不能为空'))
      } else if (this.memoryMark) {
        // console.log(value, this.ruleForm.pass)
        callback(new Error('选择的值超出最大范围，请重新选择!'))
      } else {
        callback()
      }
    }
    var desc = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (!valiName(value)) {
        callback(new Error('不得包含特殊字符:<>:\'"/\\.'))
      } else {
        callback()
      }
    }
    return {
      cpuMark: false,
      gpuMark: false,
      isLoading: false,
      memoryMark: false,
      dialogMirror: false,
      dialogAddress: false,
      ificationDialog: false,
      labelWidth: '100px',
      mirrorWidth: '500px !important',
      category: '',
      stroageInf: '',
      index: '',
      mount_info: {},
      storage_id: [],
      mirror_id: '',
      objImage: {},
      ruleForm: {
        name: '',
        image: '',
        desc: '',
        mirror: '',
        pass: '',
        checkPass: '',
        mounting: '',
        cpu: '1',
        gpu: '0',
        memory: '4',
        address: []
      },
      createDevrules: {
        name: [
          { required: true, validator: name, trigger: 'blur' },
          { min: 2, max: 30, message: this.$t('views.development.youCan'), trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: firstPass, trigger: 'blur' },
          { min: 6, max: 16, message: this.$t('views.development.password'), trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: nextPass, trigger: 'blur' },
          { min: 6, max: 16, message: this.$t('views.development.password'), trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请选择镜像分类', trigger: 'change' }
        ],
        cpu: [
          { required: true, validator: cpu, trigger: 'change' }
        ],
        gpu: [
          { required: true, validator: gpu, trigger: 'change' }
        ],
        memory: [
          { required: true, validator: memory, trigger: 'change' }
        ],
        mirror: [
          { required: true, message: '请选择镜像', trigger: 'change' }
        ],
        mounting: [
          { required: true, message: '挂载信息不能为空', trigger: 'change' }
        ],
        desc: [
          { required: false, validator: desc, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 个人空间配额以及已用配额
    this.$store.dispatch('getPersonalconfig')
    // 镜像分类列表函数调用
    let obj = {
      is_init: 3// 个人是：3；项目是：4；
    }
    this.$store.dispatch('getImagecategorylist', obj)
  },
  watch: {
    STORE_THEME_LANG: {
      handler (options, oldOptions) {
        // console.log(this.STORE_THEME_LANG)
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '100px'
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '180px'
        }
      }
    }
  },
  mounted () {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '100px'
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '180px'
    }
  },
  methods: {
    // 改变镜像分类
    pleaseImage () {
      this.ruleForm.mirror = ''
    },
    // 关闭选择镜像分类弹出框
    choiceMirrorClose ($event) {
      console.log($event)
      this.ificationDialog = $event
    },
    // 打开选择镜像分类弹出框
    classification () {
      this.ificationDialog = true
    },
    // 选择镜像分类
    selectMirrorClass ($event) {
      // console.log($event)
      this.objImage = $event
      this.ruleForm.image = $event.name
      this.ificationDialog = false
    },
    // 打开选择镜像的弹出框
    choiceMirror (formName) {
      console.log(formName)
      this.$refs[formName].validateField('image', (valid) => {
        // console.log(valid)
        if (valid === '') {
          let category = this.objImage
          console.log(category)
          this.category = category
          this.dialogMirror = true
          // localStorage.setItem('category', category)
          this.$nextTick(function () {
            this.$refs.selectMirror.selectMirrorClick()
          })
        }
      })
    },
    // 选择镜像
    selectMirror (val) {
      // console.log(val)
      this.ruleForm.mirror = val.name
      this.mirror_id = val.id
    },
    // 关闭按钮
    dialogClose ($event) {
      this.dialogMirror = false
    },
    // 添加挂载信息
    mountAddress () {
      if (this.ruleForm.address.length <= 3) {
        let obj = {
          increaseAddress: '',
          createAddress: '',
          read: ''
        }
        this.ruleForm.address.push(obj)
      } else {
        this.$message({
          message: '最多可添加四个挂载地址',
          type: 'warning'
        })
      }
    },
    // 减少挂载信息
    reduceAddress (index) {
      console.log(index)
      this.ruleForm.address.splice(index, 1)
    },
    // 添加挂载信息地址
    developBrowse (index, item) {
      // console.log(index, item)
      this.index = index
      this.dialogAddress = true
    },
    // 创建开发环境
    getEnvironmentcreate (obj) {
      this.$post('/personal/environmentcreate', obj).then(res => {
        // console.log(JSON.stringify(res))
        this.isLoading = false
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$router.go(-1)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          let create = {
            'Environment[name]': this.ruleForm.name,
            'Environment[image_id]': this.mirror_id,
            'Environment[describe]': this.ruleForm.desc,
            'Environment[cpu]': this.ruleForm.cpu,
            'Environment[memory]': this.ruleForm.memory,
            'Environment[gpu]': this.ruleForm.gpu,
            'Environment[password]': this.ruleForm.checkPass,
            'mount_info': this.mount_info,
            'storage_id': this.storage_id
          }
          // console.log(JSON.stringify(create))
          this.isLoading = true
          this.getEnvironmentcreate(create)
        } else {
          return false
        }
      })
    },
    // 取消
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    },
    // 选择cpu
    changeCpu (val) {
      // console.log(this.$store.state.projectSpace.projectconfig)
      let cpu = this.$store.state.projectSpace.personalconfig.cpu
      console.log(cpu)
      let useCpu = this.$store.state.projectSpace.personalconfig.use_cpu
      let use = val + useCpu
      if (use > cpu) {
        this.cpuMark = true
      } else {
        this.cpuMark = false
      }
    },
    // GPU选择
    changeGpu (val) {
      // console.log(this.$store.state.projectSpace.projectconfig)
      let gpu = this.$store.state.projectSpace.personalconfig.gpu
      console.log(gpu)
      let useGpu = this.$store.state.projectSpace.personalconfig.use_gpu
      let use = val + useGpu
      if (use > gpu) {
        this.gpuMark = true
      } else {
        this.gpuMark = false
      }
    },
    changeMemory (val) {
      // console.log(this.$store.state.projectSpace.projectconfig)
      let memory = this.$store.state.projectSpace.personalconfig.memory
      console.log(memory)
      let useMemory = this.$store.state.projectSpace.personalconfig.use_memory
      let use = val + useMemory
      if (use > memory) {
        this.memoryMark = true
      } else {
        this.memoryMark = false
      }
    },
    // 确定
    dialogSure () {
      let ruleForm = this.ruleForm.address
      let stroageInf = this.stroageInf.item
      let storageUser = this.stroageInf.storage_user_on
      if (this.stroageInf === '') {
        this.$message({
          message: '请选择存储地址！',
          type: 'warning'
        })
        return false
      } else {
        this.storage_id = []
        for (var i = 0; i < ruleForm.length; i++) {
          if (ruleForm[i].id === stroageInf.id) {
            this.$message({
              message: '该存储地址已存在，请重新选择！',
              type: 'warning'
            })
            return false
          }
        }
      }

      let index = this.index
      ruleForm[index].id = stroageInf.id
      ruleForm[index].increaseAddress = stroageInf.name
      ruleForm[index].createAddress = stroageInf.path
      ruleForm[index].key_file = stroageInf.key_file
      ruleForm[index].keyname = stroageInf.keyname
      if (stroageInf.is_init === '1') {
        ruleForm[index].read = '该挂载地址权限为只读'
        ruleForm[index].flag = 'ro'
      } else if (stroageInf.is_init === '0') {
        ruleForm[index].read = '该挂载地址权限为只读'
        ruleForm[index].flag = 'rw'
      }
      this.ruleForm.address = [...ruleForm]
      // console.log(JSON.stringify(ruleForm))
      if (ruleForm.length === 0) {
        this.mount_info = []
      } else {
        var obj = {}
        ruleForm.forEach(item => {
          if (item.increaseAddress !== '') {
            let key = item.createAddress
            obj[key] = {
              'mount_flag': item.flag
            }
          }
          this.storage_id.push(item.id)
          // console.log(JSON.stringify(obj))
        })
        obj.keyFileName = `${storageUser.keyname}.keytab`
        obj.keyFile = storageUser.key_file
        this.mount_info = obj
      }
      this.dialogAddress = false
    },
    handleClose (done) {
      done()
    },
    // 传递挂载信息
    showStroage ($event) {
      this.stroageInf = $event
    }
  },
  components: { ViewsSelectMirror, ViewsCodeFile, ViewsMirrorClass },
  computed: {
    imagecategorylist () { // 镜像分类
      return this.$store.getters.postImagecategorylist
    },
    // 个人空间配额以及已用配额
    personalconfig () {
      return this.$store.getters.postPersonalconfig
    }
  }
}
</script>
