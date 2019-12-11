/*
 * @Author:任雷雷
 * @Date: 2018-07-30 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-30 10:31:59
 * @Description:我的参与的项目-创建训练任务
 */
<template>
  <div class="views-personal">
    <!-- 训练任务信息 -->
    <el-form :model="ruleForm"
      :rules="createDevrules"
      ref="ruleForm"
      :label-width="labelWidth"
      class="views-icon-ruleForm">
      <div class="views-header-inf">
        <span> {{$t('views.trainingTask.taskInformation')}}</span>
      </div>
      <div class="views-develop-inf">
        <div class="views-task-input">
          <el-form-item :label="$t('views.trainingTask.taskName')"
            prop="name">
            <el-input v-model="ruleForm.name"
              :placeholder="$t('views.development.youCan')"
              minlength=2
              maxlength=30
              clearable></el-input>
          </el-form-item>
        </div>
        <div class="views-task-image">
          <el-form-item :label="$t('views.development.remarks')"
            prop="desc">
            <el-input type="textarea"
              :rows="6"
              :placeholder="$t('views.development.pleaseContents')"
              maxlength="200"
              v-model="ruleForm.desc">
            </el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 参数配置 -->
      <div class="views-header-inf">
        <span>{{$t('views.modelPrediction.parameterConfig')}}</span>
      </div>
      <!-- 参数来源 -->
      <div class="views-develop-inf views-model-image">
        <div class="views-task-input"
          v-if="false">
          <el-form-item :label="$t('views.modelPrediction.parameterSource')">
            <el-button type="primary"
              class="view-btn-medium"
              @click="configure('ruleForm')">
              {{$t('views.trainingTask.manualParameter')}}
            </el-button>
            <el-button type="primary"
              class="view-btn-medium"
              @click="lastConfigure">
              {{$t('views.trainingTask.useParameter')}}
            </el-button>
          </el-form-item>
        </div>
        <!-- 引擎类型 -->
        <div class="views-develop-resources">
          <el-form-item :label="$t('views.trainingTask.engineType')"
            prop="engine">
            <el-select v-model="ruleForm.engine"
              :placeholder="$t('views.development.pleaseChoose')"
              @change="changeType ">
              <el-option v-for="item in practiceengine"
                :key="item.value "
                :label="item.label "
                :value="item.value ">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 版本信息 -->
          <el-form-item :label="$t( 'views.trainingTask.versionInf') "
            prop="version">
            <el-select v-model="ruleForm.version "
              :placeholder="$t('views.development.pleaseChoose')">
              <el-option v-for="item in version"
                :key="item.value "
                :label="item.label "
                :value="item.value ">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 是否开启可视化 -->
          <div class="views-task-show"
            v-show="tensorflow_show">
            <span class="views-task-radio ">{{$t('views.trainingTask.whetherVisualization')}}</span>
            <el-radio-group v-model="radio">
              <el-radio :label="1">{{$t('views.trainingTask.yes')}}</el-radio>
              <el-radio :label="0">{{$t('views.trainingTask.no')}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- 训练数据路径、测试数据路径、网络层文件路径、模型保存路径路径 -->
        <div class="views-develop-image"
          v-for="(item,index) in ruleForm.caffeChoice"
          :key="item.title"
          v-show="caffe_show">
          <!-- <el-tooltip class="item" effect="dark" placement="bottom-start">
                        <div slot="content">计算节点的帮助信息计算节点的帮助信息帮助信<br>计算节点的帮助信息计算节点的帮助信息帮助信</div>
                        <i class="iconfont icon-Group views-icon-group"></i>
                    </el-tooltip> -->
          <el-form-item :label="item.title"
            :rules="{required: true, message: '选择不能为空', trigger: 'change'}"
            :prop="'choice.'+index+ '.input'">
            <div class="views-develop-choice">
              <el-input v-model="item.input"
                :readonly="true"></el-input>
              <el-button type="primary "
                class="view-btn-medium"
                @click="chocieCaffe(index)">
                {{$t('views.button.choice')}}
              </el-button>
            </div>
          </el-form-item>
        </div>
        <!-- 代码目录、启动文件、训练数据集、训练日志目录 -->
        <div class="views-develop-image"
          v-for="(item,index) in ruleForm.choice"
          :key="index"
          v-show="tensorflow_show">
          <!-- <el-tooltip class="item" effect="dark" placement="bottom-start">
                        <div slot="content">计算节点的帮助信息计算节点的帮助信息帮助信<br>计算节点的帮助信息计算节点的帮助信息帮助信</div>
                        <i class="iconfont icon-Group views-icon-group"></i>
                    </el-tooltip> -->
          <el-form-item :label="item.title"
            :rules="{required: true, message: '选择不能为空', trigger: 'change'}"
            :prop="'choice.'+index+ '.input'">
            <div class="views-develop-choice">
              <el-input v-model="item.input"
                :readonly="true"></el-input>
              <el-button type="primary "
                class="view-btn-medium"
                @click="chocieBtn(index)">
                {{$t('views.button.choice')}}
              </el-button>
            </div>
          </el-form-item>
        </div>
        <!-- caffe运行参数-->
        <div class="views-develop-image  views-caffe-required"
          v-if="caffe_show">
          <el-form-item :label="$t( 'views.trainingTask.operatParameters')"
            prop="params">
            <div class="views-develop-params">
              <div class="views-develop-caffe"
                v-for="(item,index) in ruleForm.caffeParams"
                :key="item.label">
                <el-input v-model="item.label"
                  disabled></el-input>
                <b class="views-task-sign">=</b>
                 <el-form-item label-width="0"
                  :rules="{required: true, message: '输入不能为空', trigger: 'change'}"
                  :prop="'caffeParams.'+index+ '.value'">
                <el-input v-model="item.value"
                  v-if="index === ruleForm.caffeParams.length-1"
                  disabled></el-input>
                <el-input v-model="item.value"
                  @input="caffeBlur(index)"
                  v-else></el-input>
                <span class="views-task-tips"
                  v-show="item.isShow">{{item.tip}}</span>
                 </el-form-item>
              </div>
            </div>
          </el-form-item>
        </div>
        <!-- tensorflow运行参数-->
        <div class="views-develop-image"
          v-if="tensorflow_show">
          <el-form-item :label="$t( 'views.trainingTask.operatParameters')"
            prop="params">
            <div class="views-develop-params">
              <div class="views-develop-caffe"
                v-for="(item,index) in tensorflowParams"
                :key="item.label">
                <el-input v-model="item.label"
                  disabled></el-input>
                <b class="views-task-sign">=</b>
                <el-input v-model="item.value"
                  @input="tensorflowBlur(index)"></el-input>
                <span class="views-task-tips"
                  v-show="item.isShow">{{item.tip}}</span>
              </div>
            </div>
          </el-form-item>
        </div>
        <!-- 运行参数 -->
        <div class="views-develop-image views-task-mb"
          style="display:none">
          <!-- <el-tooltip class="item" effect="dark" placement="bottom-start">
                        <div slot="content">计算节点的帮助信息计算节点的帮助信息帮助信<br>计算节点的帮助信息计算节点的帮助信息帮助信</div>
                        <i class="iconfont icon-Group views-icon-group"></i>
                    </el-tooltip> -->
          <el-form-item :label="$t('views.trainingTask.operatParameters')"
            prop="params">
            <el-form-item v-for="(item,index) in ruleForm.operating"
              :key="index"
              :rules="{required: true, message: '输入不能为空', trigger: 'change'}"
              :prop="'operating.'+index+ '.keys'"
              label-width="0">
              <div class="views-develop-choice">
                <el-input v-model="item.keys"></el-input>
                <b class="views-task-sign">=</b>
                <el-input v-model="item.value"></el-input>
                <span class="views-btn-reduce "
                  @click="reduceAddress(index)">—</span>
              </div>
            </el-form-item>
            <div class="views-develop-choice">
              <el-button type="primary "
                class="view-btn-medium views-btn-choice "
                @click="operatParams">{{$t('views.trainingTask.increaseParameters')}}</el-button>
            </div>
          </el-form-item>
        </div>
      </div>
      <!-- 节点配置 -->
      <!-- 参数配置 -->
      <div class="views-header-inf">
        <span>{{$t('views.trainingTask.nodeConfig')}}</span>
      </div>
      <div class="views-task-type ">
        <div class="views-task-right views-task-border ">
          <!-- caffe节点配置 -->
          <div class="views-task-sitting views-task-sitting-mg "
            v-show="caffe_show">
            <span class="views-task-cpu ">CPU</span>
            <el-select v-model="caffe.cpu"
              :placeholder="$t('views.development.pleaseChoose')">
              <el-option v-for="item in projectconfig.cpu_config"
                :key="item.value "
                :label="item.label "
                :value="item.value ">
              </el-option>
            </el-select>&nbsp;核
            <span class="views-task-cpu ">GPU</span>
            <el-select v-model="caffe.gpu"
              :placeholder="$t('views.development.pleaseChoose')"
              @change="selectGpu">
              <el-option v-for="item in projectconfig.gpu_config"
                :key="item.value "
                :label="item.label "
                :value="item.value ">
              </el-option>
            </el-select>&nbsp;个
            <span class="views-task-cpu ">{{$t('views.projectContent.memory')}}</span>
            <el-select v-model="caffe.memory"
              :placeholder="$t('views.development.pleaseChoose')">
              <el-option v-for="item in projectconfig.memory_config"
                :key="item.value "
                :label="item.label "
                :value="item.value ">
              </el-option>
            </el-select>
            &nbsp;G
          </div>
          <!-- tensorflow节点配置 -->
          <div class="views-task-tensorflow"
            v-show="tensorflow_show">
            <!-- ps节点-->
            <div class="views-task-node ">
              <span class="views-task-node-span ">{{$t('views.trainingTask.psNode')}}</span>
              <div class="views-task-sitting views-task-select ">
                <!-- ps节点 个数-->
                <span class="views-task-cpu">{{$t('views.projectContent.unit')}}</span>
                <el-input :placeholder="$t('views.development.pleaseChoose')"
                  v-model="tensorflow.ps_node.num"
                  class="views-node-input"
                  @blur="psBlur"
                  clearable></el-input>
                <span class="views-task-tips"
                  v-show="psShow">{{psTip}}</span>
                <!-- ps节点 CPU-->
                <span class="views-task-cpu ">CPU</span>
                <el-select v-model="tensorflow.ps_node.cpu"
                  :placeholder="$t('views.development.pleaseChoose')">
                  <el-option v-for="item in projectconfig.cpu_config"
                    :key="item.value "
                    :label="item.label "
                    :value="item.value ">
                  </el-option>
                </el-select>&nbsp;核
                <!-- ps节点 GPU-->
                <span class="views-task-cpu ">GPU</span>
                <el-select v-model="tensorflow.ps_node.gpu"
                  :placeholder="$t('views.development.pleaseChoose')">
                  <el-option v-for="item in projectconfig.gpu_config"
                    :key="item.value "
                    :label="item.label "
                    :value="item.value ">
                  </el-option>
                </el-select>&nbsp;个
                <!-- ps节点 内存-->
                <span class="views-task-cpu ">{{$t('views.projectContent.memory')}}</span>
                <el-select v-model="tensorflow.ps_node.memory"
                  :placeholder="$t('views.development.pleaseChoose')">
                  <el-option v-for="item in projectconfig.memory_config"
                    :key="item.value "
                    :label="item.label "
                    :value="item.value ">
                  </el-option>
                </el-select>
                &nbsp;G
              </div>
              <!-- worker节点-->
              <div class="views-task-node views-task-bottom ">
                <span class="views-task-node-span ">{{$t('views.trainingTask.workerNode')}}</span>
                <div class="views-task-sitting views-task-select">
                  <!-- worker节点 个数-->
                  <span class="views-task-cpu ">{{$t('views.projectContent.unit')}}</span>
                  <el-input :placeholder="$t('views.development.pleaseChoose')"
                    v-model="tensorflow.work_node.num"
                    class="views-node-input"
                    @blur='workerBlur'
                    clearable></el-input>
                  <span class="views-task-tips"
                    v-show="workerShow">{{workerTip}}</span>
                  <!-- worker节点 CPU-->
                  <span class="views-task-cpu">CPU</span>
                  <el-select v-model="tensorflow.work_node.cpu"
                    :placeholder="$t('views.development.pleaseChoose')">
                    <el-option v-for="item in  projectconfig.cpu_config"
                      :key="item.value "
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>&nbsp;核
                  <!-- worker节点 GPU-->
                  <span class="views-task-cpu ">GPU</span>
                  <el-select v-model="tensorflow.work_node.gpu"
                    :placeholder="$t('views.development.pleaseChoose')">
                    <el-option v-for="item in projectconfig.gpu_config"
                      :key="item.value "
                      :label="item.label "
                      :value="item.value">
                    </el-option>
                  </el-select>&nbsp;个
                  <!-- worker节点 内存-->
                  <span class="views-task-cpu ">{{$t('views.projectContent.memory')}}</span>
                  <el-select v-model="tensorflow.work_node.memory"
                    :placeholder="$t('views.development.pleaseChoose')">
                    <el-option v-for="item in projectconfig.memory_config"
                      :key="item.value "
                      :label="item.label "
                      :value="item.value ">
                    </el-option>
                  </el-select>
                  &nbsp;G
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="views-develop-btn ">
        <el-button @click="resetForm( 'ruleForm') "> {{$t('views.button.cancel')}}</el-button>
        <el-button type="primary "
          class="view-btn-big"
          :loading="isLoading"
          @click="submitForm( 'ruleForm')">{{$t('views.button.run')}}</el-button>
      </div>
    </el-form>
    <!-- 选择代码目录 -->
    <div v-for="(item,index) in choose"
      :key="index">
      <el-dialog :title="item.title"
        :visible.sync="item.dialogCode"
        :before-close="handleClose"
        class="small">
        <div class="content">
          <views-code-directory :isFirst="item.isFirst"
            :isSecond="item.isSecond"
            :type='item.type'
            :projectId="projectId"></views-code-directory>
        </div>
        <span slot="footer"
          class="dialog-footer">
          <el-button class="cancel"
            @click="dialogColse">{{$t('views.button.cancel')}}</el-button>
          <el-button class="primary"
            type="primary"
            @click="dialogSure(index)">{{$t('views.button.sure')}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ViewsCodeDirectory from './components/codeDirectory'
import { validateUsername, spaceTest, valiName } from '@/util/validate.js'
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
      input: '',
      textarea: '',
      isLoading: false,
      radio: 0,
      dialogCode: false,
      dialogFile: false,
      active: 'first',
      isFirst: false,
      psTip: '',
      psShow: true,
      workerTip: '',
      choose: '',
      workerShow: true,
      isSecond: false,
      caffe: { cpu: 1, gpu: 0, memory: 4 },
      tensorflow: {
        'ps_node': { 'num': 1, 'cpu': 1, 'gpu': 0, 'memory': 4 },
        'work_node': { 'num': 1, 'cpu': 1, 'gpu': 0, 'memory': 4 }
      },
      caffe_show: false,
      tensorflow_show: false,
      labelWidth: '150px',
      obj: {
        project_id: ''
      },
      projectId: '',
      storage_id: {},
      storage_object_id: {},
      ruleForm: {
        name: '',
        operating: [],
        desc: '',
        engine: 'tensorflow',
        version: '',
        params: '',
        caffeParams: '',
        caffeChoice: [
          { title: '训练数据路径', dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' },
          { title: '测试数据路径', dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' },
          { title: '网络层文件', dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' },
          { title: '模型保存路径', dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' }
        ],
        choice: [
          { title: this.$t('views.trainingTask.codeDirectory'), dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' },
          { title: this.$t('views.trainingTask.trainingData'), dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' },
          { title: this.$t('views.trainingTask.startupFile'), dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' },
          { title: this.$t('views.trainingTask.trainingLog'), dialogCode: false, isFirst: false, isSecond: false, type: 1, input: '' }
        ]
      },
      createDevrules: {
        name: [
          { required: true, validator: name, trigger: 'blur' },
          { min: 2, max: 30, message: this.$t('views.development.youCan'), trigger: 'blur' }
        ],
        engine: [
          { required: true, message: '请选择引擎类型', trigger: 'change' }
        ],
        params: [
          { required: false, message: ' ', trigger: 'change' }
        ],
        version: [
          { required: true, message: '请选择版本信息', trigger: 'change' }
        ],
        desc: [
          { required: false, validator: desc, trigger: 'blur' }
        ],
        node: [
          { required: true, type: 'number', message: '必须为数字值' }
        ]
      },
      postData: {
        code_path: '',
        launch_script: '',
        dataset: '',
        model_path: ''
      },
      postCaffe: {
        train_data_dir: '',
        proto_file: '',
        test_data_dir: '',
        snapshot_prefix: ''
      },
      caffeParams: [],
      mark: 0,
      tensorflowParams: []
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'partProjectDetails' && to.query.partId === undefined) {
      this.$router.push({
        name: 'partProjectDetails',
        query: {
          partId: this.id
        }
      })
    } else {
      next()
    }
  },
  created () {
    // 初始化
    this.init()
    // 请求引擎类型数据，函数调用
    this.$store.dispatch('getPracticeengine')
    // 请求版本信息数据，函数调用
    this.$store.dispatch('getPracticeengineversion')
    // 请求节点配置数据，函数调用
    this.projectId = this.obj.project_id = this.id = this.$route.query.partId
    this.$store.dispatch('getProjectconfig', this.obj)
    // caffe训练任务参数
    this.getPracticeparam()
    this.choose = this.ruleForm.choice
  },
  watch: {
    STORE_THEME_LANG: {
      handler (options, oldOptions) {
        if (this.STORE_THEME_LANG === 'zh') {
          this.labelWidth = '150px'
        }
        if (this.STORE_THEME_LANG === 'en') {
          this.labelWidth = '200px'
        }
      }
    }
  },
  mounted () {
    if (this.STORE_THEME_LANG === 'zh') {
      this.labelWidth = '150px'
    }
    if (this.STORE_THEME_LANG === 'en') {
      this.labelWidth = '200px'
    }
  },
  methods: {
    init () {
      if (this.ruleForm.engine === 'tensorflow') {
        this.tensorflow_show = true
        this.radio = 0
      }
    },
    // 选择引擎类型
    changeType (val) {
      switch (val) {
        case 'tensorflow':
          this.caffe_show = false
          this.tensorflow_show = true
          this.$store.commit('changeVersion', 'tensorflow')
          this.ruleForm.version = ''
          this.radio = 0
          this.tip = ''
          this.choose = this.ruleForm.choice
          this.choose.forEach(item => {
            item.input = ''
          })
          break
        case 'caffe':
          this.caffe_show = true
          this.tensorflow_show = false
          this.$store.commit('changeVersion', 'caffe')
          this.ruleForm.version = ''
          this.radio = 0
          this.tip = ''
          this.choose = this.ruleForm.caffeChoice
          this.choose.forEach(item => {
            item.input = ''
          })
          break
        default:
          this.caffe_show = false
          this.tensorflow_show = true
          // this.version = this.ineversion.Tensorflow
          this.ruleForm.version = ''
          break
      }
    },
    // 引擎在tensorflow验证运行参数
    tensorflowBlur (index) {
      let tensorflow = this.tensorflowParams
      let value = tensorflow[index].value
      if (value === '') {
        tensorflow[index].isShow = false
      } else {
        switch (index) {
          case 3:
            if (spaceTest(value, 3)) {
              tensorflow[index].isShow = false
            } else {
              tensorflow[index].isShow = true
              tensorflow[index].tip = '请输入大于0小于1的小数'
              return false
            }
            break
          default:
            if (spaceTest(value, 0)) {
              tensorflow[index].isShow = false
            } else {
              tensorflow[index].isShow = true
              tensorflow[index].tip = '请输入正整数'
              return false
            }
            break
        }
      }
      // console.log(JSON.stringify(caffeParams))
      this.tensorflowParams = [...tensorflow]
    },
    // 引擎在caffe验证运行参数
    caffeBlur (index) {
      console.log(index)
      let caffe = this.ruleForm.caffeParams
      let value = caffe[index].value
      if (value === '') {
        caffe[index].isShow = false
      } else if (index !== caffe.length - 1) {
        switch (index) {
          case 2:
            if (spaceTest(value, 1)) {
              caffe[index].isShow = false
            } else {
              caffe[index].isShow = true
              caffe[index].tip = '请输入实数'
              return false
            }
            break
          case 5:
            if (spaceTest(value, 1)) {
              caffe[index].isShow = false
            } else {
              caffe[index].isShow = true
              caffe[index].tip = '请输入实数'
              return false
            }
            break
          case 8:
            if (spaceTest(value, 4)) {
              caffe[index].isShow = false
            } else {
              caffe[index].isShow = true
              caffe[index].tip = '请输入正确的字符'
              return false
            }
            break
          case 7:
            if (spaceTest(value, 1)) {
              caffe[index].isShow = false
            } else {
              caffe[index].isShow = true
              caffe[index].tip = '请输入实数'
              return false
            }
            break
          case 9:
            if (spaceTest(value, 2)) {
              caffe[index].isShow = false
            } else {
              caffe[index].isShow = true
              caffe[index].tip = '请输入正实数'
              return false
            }
            break
          default:
            if (spaceTest(value, 0)) {
              caffe[index].isShow = false
            } else {
              caffe[index].isShow = true
              caffe[index].tip = '请输入正整数'
              return false
            }
            break
        }
        caffe[index].isShow = false
      }
      // console.log(JSON.stringify(caffeParams))
      this.caffeParams = [...caffe]
    },
    psBlur () {
      let value = this.tensorflow.ps_node.num
      this.nodeSitting(value, 'psShow', 'psTip')
    },
    workerBlur () {
      let value = this.tensorflow.work_node.num
      this.nodeSitting(value, 'workerShow', 'workerTip')
    },
    nodeSitting (value, show, tip) {
      if (value === '') {
        this[show] = true
        this[tip] = '输入不能为空'
      } else {
        if (spaceTest(value, 0)) {
          this[show] = false
        } else {
          this[show] = true
          this[tip] = '请输入正整数'
          return false
        }
      }
    },
    selectGpu (val) {
      let caffe = this.ruleForm.caffeParams
      if (val === 0) {
        caffe[caffe.length - 1].value = 'CPU'
      } else {
        caffe[caffe.length - 1].value = 'GPU'
      }
      this.ruleForm.caffeParams = [...caffe]
    },
    // 创建训练任务
    practicecreate (obj) {
      this.$post('/practiceproject/practicecreate', obj).then(res => {
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
    // 增加作业参数
    operatParams () {
      let obj = {}
      obj.keys = ''
      obj.value = ''
      this.ruleForm.operating.push(obj)
    },
    // 减少作业参数
    reduceAddress (index) {
      this.ruleForm.operating.splice(index, 1)
    },
    // 手动参数配置
    configure (formName) {
      this.$refs[formName].resetFields()
      this.tensorflow_show = true
      this.caffe_show = false
      this.tensorflowParams.forEach(item => {
        item.value = ''
      })
    },
    // 使用上一次训练参数
    lastConfigure () {
      console.log('====')
    },
    // 数据重组
    paramsData (params) {
      var key = []
      var val = []
      var rst = {}
      params.forEach((item, index) => {
        key.push(item.keys)
        val.push(item.value)
      })
      for (var i = 0; i < key.length; i++) {
        rst[key[i]] = val[i]
      }
      // 删除对象空键值对
      for (var k in rst) {
        if (k === '' || rst[k] === 0) {
          delete rst[k]
        } else {
          rst[k] = parseInt(rst[k])
        }
      }
      return rst
    },
    // caffe数据重组
    paramsCaffe (params) {
      let obj = {}
      params.forEach((item, i) => {
        obj[item.label] = item.value
      })
      return obj
    },
    // tensorflow数据重组
    paramsTensorflow (params) {
      let obj = {}
      params.forEach((item, i) => {
        if (item.value !== '') {
          obj[item.label] = item.value
        }
      })
      return obj
    },
    // 处理storage_id和storage_object_id数据函数封装
    storageId (data) {
      // console.log(JSON.stringify(data))
      let arr = []
      for (let key in data) {
        arr.push(data[key])
      }
      // console.log(JSON.stringify(arr))
      return arr
    },
    // 提交
    submitForm (formName) {
      if (this.ruleForm.engine === 'caffe') {
        // 引擎caffe下的运行参数
        for (let index = 0; index < this.caffeParams.length; index++) {
          const element = this.caffeParams[index]
          if (element.value === '') {
            this.ruleForm.caffe = ''
            return false
          } else if (index !== this.caffeParams.length - 1) {
            switch (index) {
              case 2:
                if (!spaceTest(element.value, 1)) {
                  this.ruleForm.caffe = ''
                  return false
                }
                break
              case 5:
                if (!spaceTest(element.value, 1)) {
                  this.ruleForm.caffe = ''
                  return false
                }
                break
              case 8:
                if (!spaceTest(element.value, 4)) {
                  this.ruleForm.caffe = ''
                  return false
                }
                break
              case 7:
                if (!spaceTest(element.value, 1)) {
                  this.ruleForm.caffe = ''
                  return false
                }
                break
              case 9:
                if (!spaceTest(element.value, 2)) {
                  this.ruleForm.caffe = ''
                  return false
                }
                break
              default:
                if (!spaceTest(element.value, 0)) {
                  this.ruleForm.caffe = ''
                  return false
                }
                break
            }
          } else {
            this.ruleForm.caffe = 1
          }
        }
      } else if (this.ruleForm.engine === 'tensorflow') {
        // // 引擎tensorflow下的运行参数
        for (let index = 0; index < this.tensorflowParams.length; index++) {
          const element = this.tensorflowParams[index]
          if (element.value !== '') {
            switch (index) {
              case 3:
                if (!spaceTest(element.value, 3)) {
                  return false
                }
                break
              default:
                if (!spaceTest(element.value, 0)) {
                  return false
                }
                break
            }
          }
        }
        let value = this.tensorflow.ps_node.num
        if (value === '') {
          return false
        } else if (!spaceTest(value, 0)) {
          return false
        }
        let node = this.tensorflow.work_node.num
        if (node === '') {
          return false
        } else if (!spaceTest(node, 0)) {
          return false
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let tensorflow = this.paramsTensorflow(this.tensorflowParams)
          let caffe = this.paramsCaffe(this.ruleForm.caffeParams)
          let storage = this.storageId(this.storage_id)
          let storageObject = this.storageId(this.storage_object_id)
          let storageId = Array.from(new Set(storage))
          let storageObjectId = Array.from(new Set(storageObject))
          var create = {
            'Practice[project_id]': this.obj.project_id,
            'Practice[name]': this.ruleForm.name,
            'Practice[engine]': this.ruleForm.engine,
            'Practice[describe]': this.ruleForm.desc,
            'Practice[engine_version]': this.ruleForm.version,
            'storage_object_id': storageObjectId,
            'storage_id': storageId
          }
          if (this.ruleForm.engine === 'caffe') {
            create['Practice[mount_info]'] = this.postCaffe
            create['Practice[param]'] = caffe
            create['resource'] = this.caffe
            create['Practice[is_visible]'] = 0
          } else if (this.ruleForm.engine === 'tensorflow') {
            create['Practice[mount_info]'] = this.postData
            create['Practice[param]'] = tensorflow
            create['resource'] = this.tensorflow
            create['Practice[is_visible]'] = this.radio
          }
          // console.log(JSON.stringify(create))
          this.isLoading = true
          this.practicecreate(create)
        } else {
          return false
        }
      })
    },
    // 打开代码目录、启动文件、训练数据集、训练日志目录弹出框
    chocieBtn (index) {
      // console.log(index)
      if (index === 2) {
        this.mark = 0
      } else {
        this.mark = 1
      }
      let data = []
      this.$store.commit('projectpath', { data })
      let choice = this.choose
      choice.forEach((item, i) => {
        item.dialogCode = false
        item.isFirst = false
        item.isSecond = false
        item.type = 1
      })
      choice[index].dialogCode = true
      switch (index) {
        case 0:
          choice[index].isFirst = true
          choice[index].isSecond = false
          choice[index].type = 1
          break
        case 1:
          choice[index].isFirst = true
          choice[index].isSecond = true
          choice[index].type = 1
          break
        case 2:
          choice[index].isFirst = true
          choice[index].isSecond = false
          choice[index].type = 2
          break
        case 3:
          choice[index].isFirst = true
          choice[index].isSecond = false
          choice[index].type = 1
          break
        default:
          break
      }
      // console.log(JSON.stringify(choice))
      this.choose = [...choice]
    },
    // 训练数据路径、测试数据路径、网络层文件路径、模型保存路径路径
    chocieCaffe (index) {
      // console.log(index)
      if (index === 2) {
        this.mark = 0
      } else {
        this.mark = 1
      }
      let data = []
      this.$store.commit('projectpath', { data })
      let choice = this.choose
      choice.forEach((item, i) => {
        item.dialogCode = false
        item.isFirst = false
        item.isSecond = false
        item.type = 1
      })
      choice[index].dialogCode = true
      switch (index) {
        case 0:
          choice[index].isFirst = true
          choice[index].isSecond = true
          choice[index].type = 1
          break
        case 1:
          choice[index].isFirst = true
          choice[index].isSecond = true
          choice[index].type = 1
          break
        case 2:
          choice[index].isFirst = true
          choice[index].isSecond = false

          choice[index].type = 2
          break
        case 3:
          choice[index].isFirst = true
          choice[index].isSecond = false
          choice[index].type = 1
          break
        default:
          break
      }
      // console.log(JSON.stringify(choice))
      this.choose = [...choice]
    },
    // 关闭代码目录
    handleClose (done) {
      done()
    },
    // 确定选择代码目录
    dialogSure (index) {
      let projectpath = this.$store.state.projectSpace.projectpath
      if (projectpath === '' && this.mark === 0) {
        this.$message({
          message: '请选择文件',
          type: 'warning'
        })
      } else if (projectpath === '' && this.mark === 1) {
        this.$message({
          message: '请选择目录',
          type: 'warning'
        })
      } else {
        if (this.ruleForm.engine === 'caffe') {
          let arr = this.ruleForm.caffeChoice
          let caffeChoice = this.choiceCaffe(arr, index, projectpath, 'caffe')
          this.ruleForm.choice = [...caffeChoice]
        } else if (this.ruleForm.engine === 'tensorflow') {
          let arr = this.ruleForm.choice
          let choice = this.choiceCaffe(arr, index, projectpath, 'tensorflow')
          this.ruleForm.choice = [...choice]
        }
      }
      // console.log(JSON.stringify(this.postData))
    },
    // 确定选择代码目录、启动文件、训练数据集、训练日志目录函数封装
    choiceCaffe (arr, index, projectpath, str) {
      //  console.log(index)
      let key = Object.keys(projectpath)[0]
      let type = projectpath.type
      switch (index) {
        case 0:
          if (type === 1) {
            arr[index].input = key
            this.storage_id.first = projectpath.storage_id
            this.storage_object_id.first = projectpath.storage_object_id
            if (str === 'caffe') {
              this.postCaffe.train_data_dir = projectpath[key]
            } else if (str === 'tensorflow') {
              this.postData.code_path = projectpath[key]
            }
          } else if (type === 2) {
            this.$message({
              message: '请选择目录',
              type: 'warning'
            })
            return arr
          }
          break
        case 1:
          if (type === 1) {
            arr[index].input = key
            this.storage_id.second = projectpath.storage_id
            this.storage_object_id.senond = projectpath.storage_object_id
            if (str === 'caffe') {
              this.postCaffe.test_data_dir = projectpath[key]
            } else if (str === 'tensorflow') {
              this.postData.dataset = projectpath[key]
            }
          } else if (type === 2) {
            this.$message({
              message: '请选择目录',
              type: 'warning'
            })
            return arr
          }
          break
        case 2:
          if (type === 1) {
            this.$message({
              message: '请选择文件',
              type: 'warning'
            })
            return arr
          } else if (type === 2) {
            this.storage_id.third = projectpath.storage_id
            this.storage_object_id.third = projectpath.storage_object_id
            arr[index].input = key
            if (str === 'caffe') {
              this.postCaffe.proto_file = projectpath[key]
            } else if (str === 'tensorflow') {
              this.postData.launch_script = projectpath[key]
            }
          }
          break
        case 3:
          if (type === 1) {
            arr[index].input = key
            this.storage_id.fourth = projectpath.storage_id
            this.storage_object_id.fourth = projectpath.storage_object_id
            if (str === 'caffe') {
              this.postCaffe.snapshot_prefix = projectpath[key]
            } else if (str === 'tensorflow') {
              this.postData.model_path = projectpath[key]
            }
          } else if (type === 2) {
            this.$message({
              message: '请选择目录',
              type: 'warning'
            })
            return arr
          }
          break
        default:
          break
      }
      arr.forEach((item, i) => {
        item.dialogCode = false
        item.isFirst = false
        item.isSecond = false
        item.type = 1
      })
      return arr
    },
    // 取消弹出框
    dialogColse () {
      if (this.ruleForm.engine === 'caffe') {
        let arr = this.ruleForm.caffeChoice
        arr.forEach((item, i) => {
          item.dialogCode = false
          item.isFirst = false
          item.isSecond = false
          item.type = 1
        })
        this.ruleForm.choice = [...arr]
      } else if (this.ruleForm.engine === 'tensorflow') {
        let arr = this.ruleForm.choice
        arr.forEach((item, i) => {
          item.dialogCode = false
          item.isFirst = false
          item.isSecond = false
          item.type = 1
        })
        this.ruleForm.choice = [...arr]
      }
    },
    // 取消
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    },
    // 运行参数函数封装
    runningParams (data) {
      let arr = []
      for (let key in data) {
        let obj = {
          label: key,
          value: data[key],
          isShow: false,
          tip: ''
        }
        arr.push(obj)
      }
      return arr
    },
    // 请求在caffe引擎下的运行参数
    getPracticeparam () {
      this.$post('/practiceproject/practiceparam').then(res => {
        if (res.code === 200) {
          let caffe = res.data.caffe_param
          // 引擎caffe下的运行参数
          this.ruleForm.caffeParams = this.runningParams(caffe)
          let tensorflow = res.data.tensorflow_param
          // 引擎tensorflow下的运行参数
          this.tensorflowParams = this.runningParams(tensorflow)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    }
  },
  components: { ViewsCodeDirectory },
  computed: {
  // 引擎类型
    practiceengine () {
      return this.$store.getters.postPracticeengine
    },
    // 节点配置
    projectconfig () {
      return this.$store.getters.postProjectconfig
    },
    // 版本信息
    version () {
      return this.$store.getters.postVersion
    },
    // 代码目录
    projectpath () {
      return this.$store.getters.postprojectpath
    }

  }
}
</script>
