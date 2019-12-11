/*
 * @Author:任雷雷
 * @Date: 2018-08-03 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime:  2018-08-18 10:31:59
 * @Description:个人空间-创建开发环境
 */
<template>
    <div class="views-personal">
        <el-form :model="ruleForm" :rules="createDevrules" ref="ruleForm" :label-width="labelWidth" class="demo-ruleForm">
            <!-- 基本信息 -->
            <div class="views-header-inf">
                <span>{{$t('views.development.developingInformation')}}
                </span>
            </div>
            <div class="views-develop-inf">
                <div class="views-develop-text">
                    <div class="views-develop-select">
                        <el-form-item :label="$t('views.development.classification')" prop="id">
                            <el-select v-model="ruleForm.id" :placeholder="$t('views.development.pleaseImage')" clearable>
                                <el-option v-for="item in imagecategorylist.category" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="views-develop-input">
                        <el-form-item :label="$t('views.development.environmentalName')" prop="name">
                            <el-input v-model="ruleForm.name" :placeholder="$t('views.development.youCan')" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="views-develop-image">
                        <el-form-item :label="$t('views.development.selectMirror')" prop="mirror">
                            <div class="views-develop-choice">
                                <el-input v-model="ruleForm.mirror" :readonly="true"></el-input>
                                <el-button type="primary" class="view-btn-medium" @click="choiceMirror('ruleForm')">{{$t('views.button.choice')}}</el-button>
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <div class="views-develop-text">
                    <div class="views-develop-image">
                        <el-form-item :label="$t('views.development.remarks')" prop="desc">
                            <el-input type="textarea" :rows="6" :placeholder="$t('views.development.pleaseContents')" v-model="ruleForm.desc">
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
                        <el-form-item :label="$t('views.development.pleasePassword')" prop="pass">
                            <el-input type="password" v-model="ruleForm.pass" clearable auto-complete="off"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="views-develop-text">
                    <div class="views-develop-input">
                        <el-form-item :label="$t('views.development.confirmPassword')" prop="checkPass">
                            <el-input type="password" v-model="ruleForm.checkPass" clearable auto-complete="off"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </div>
            <!-- 存储挂载信息 -->
            <div class="views-header-inf">
                <span>{{$t('views.development.storeInformation')}}</span>
            </div>
            <div class="views-develop-mount">
                <el-form-item v-for="(item,index) in ruleForm.address" :key='index' :rules="{required: true, message: '挂载信息不能为空', trigger: 'change'}" :prop="'address.'+index+ '.increaseAddress'" label-width="0">
                    <el-input v-model="item.increaseAddress" placeholder="" :readonly="true" class="w8"></el-input>
                    <el-button type="primary" class="view-btn-medium" @click="developBrowse(index,item)">
                        {{$t('views.development.browse')}}
                    </el-button>
                    <el-input v-model="item.createAddress" placeholder="" :readonly="true"></el-input>
                    <span class="views-btn-reduce" @click="reduceAddress(index)">—</span>
                    <span>{{item.read}}</span>
                </el-form-item>
            </div>
            <div class="views-develop-mount">
                <el-button type="primary" class="view-btn-medium" @click="mountAddress">
                    {{$t('views.development.mountAddress')}}
                </el-button>
                <span class="views-mount-span">*{{$t('views.development.mountableAddresses')}}</span>
            </div>

            <!-- 资源信息 -->
            <div class="views-header-inf">
                <span>{{$t('views.development.resource')}}</span>
            </div>
            <div class="views-develop-resources">
                <el-form-item label="CPU" prop="cpu">
                    <el-select v-model="ruleForm.cpu" :placeholder="$t('views.development.pleaseChoose')" @change="changeCpu">
                        <el-option v-for="item in personalconfig.cpu_config" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="GPU" prop="gpu">
                    <el-select v-model="ruleForm.gpu" :placeholder="$t('views.development.pleaseChoose')" @change="changeGpu">
                        <el-option v-for="item in  personalconfig.gpu_config" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('views.projectContent.memory')" prop="memory">
                    <el-select v-model="ruleForm.memory" :placeholder="$t('views.development.pleaseChoose')" @change="changeMemory">
                        <el-option v-for="item in  personalconfig.memory_config" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="views-develop-btn">
                <el-button @click="resetForm('ruleForm')">{{$t('views.button.cancel')}}</el-button>
                <el-button type="primary" class="view-btn-big" @click="submitForm('ruleForm')">{{$t('views.button.run')}}</el-button>
            </div>
        </el-form>
        <!-- 选择镜像 -->
        <el-dialog :title="$t(' views.development.selectMirror ')" :visible.sync="dialogMirror" :before-close="handleClose">
            <div class="content">
                <views-select-mirror :category='category' @choiceClose="dialogClose($event)" @choiceName="selectMirror($event)"></views-select-mirror>
            </div>
        </el-dialog>
        <!-- 选择挂载地址 -->
        <el-dialog :title="$t('views.trainingTask.codeDirectory')" :visible.sync="dialogAddress" :before-close="handleClose" class="small">
            <div class="content">
                <views-code-file @selectStroage='showStroage($event)'></views-code-file>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel" @click="dialogAddress = false">{{$t('views.button.cancel')}}</el-button>
                <el-button class="primary" type="primary" @click="dialogSure">{{$t('views.button.sure')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { character } from '../../util/index.js'
import ViewsSelectMirror from './components/selectMirror'
import ViewsCodeFile from './components/codeFile'
export default {
  data () {
    var firstPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!character(value)) {
        callback(new Error('只能输入6-15位字母、数字或字符数字组合'))
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
    return {
      cpuMark: false,
      gpuMark: false,
      memoryMark: false,
      dialogMirror: false,
      dialogAddress: false,
      labelWidth: '100px',
      category: '',
      stroageInf: '',
      index: '',
      mount_info: [],
      mirror_id: '',
      ruleForm: {
        name: '',
        id: '',
        desc: '',
        mirror: '',
        pass: '',
        checkPass: '',
        mounting: '',
        cpu: '',
        gpu: '',
        memory: '',
        address: []
      },
      createDevrules: {
        name: [
          { required: true, message: '请输入环境名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: firstPass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: nextPass, trigger: 'blur' }
        ],
        id: [
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
          { message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 个人空间配额以及已用配额
    this.$store.dispatch('getPersonalconfig')
    // 镜像分类列表函数调用
    this.$store.dispatch('getImagecategorylist')
  },
  watch: {
    STORE_THEME_LANG: {
      handler (options, oldOptions) {
        console.log(this.STORE_THEME_LANG)
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
    choiceMirror (formName) {
      this.$refs[formName].validateField('id', (valid) => {
        // console.log(valid)
        if (valid === '') {
          let category = this.ruleForm.id
          this.category = category
          this.dialogMirror = true
          localStorage.setItem('category', category)
        }
      })
    },
    // 选择镜像
    selectMirror (val) {
      console.log(val)
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
      console.log(index, item)
      this.index = index
      this.dialogAddress = true
    },
    // 创建开发环境
    getEnvironmentcreate (obj) {
      this.$post('/personal/environmentcreate', obj).then(res => {
        console.log(JSON.stringify(res))
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
            'mount_info': this.mount_info
          }
          console.log(JSON.stringify(create))
          this.getEnvironmentcreate(create)
        } else {
          this.$message({ showClose: true, message: '带*号为必填项', type: 'error' })
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
      let index = this.index
      console.log(JSON.stringify(this.stroageInf))
      ruleForm[index].increaseAddress = this.stroageInf.name
      ruleForm[index].createAddress = 's3://' + this.stroageInf.name
      ruleForm[index].accessid = this.stroageInf.accessid
      ruleForm[index].accesskey = this.stroageInf.accesskey
      if (this.stroageInf.is_init === '1') {
        ruleForm[index].read = '该挂载地址权限为只读'
        ruleForm[index].flag = 'ro'
      } else if (this.stroageInf.is_init === '0') {
        ruleForm[index].read = '该挂载地址权限为读写'
        ruleForm[index].flag = 'rw'
      }
      this.ruleForm.address = [...ruleForm]
      console.log(JSON.stringify(ruleForm))
      var obj = {}
      ruleForm.forEach(item => {
        if (item.increaseAddress !== '') {
          let key = item.createAddress
          obj[key] = {
            'accessid': item.accessid,
            'accesskey': item.accesskey,
            'mount_flag': item.flag
          }
        }
        this.mount_info = obj
        console.log(JSON.stringify(obj))
      })
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
  components: { ViewsSelectMirror, ViewsCodeFile },
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
