/*
 * @Author:任雷雷
 * @Date: 2018-07-30 10:04:31
 * @LastEditors: 任雷雷
 * @LastEditTime: 2018-07-30 10:31:59
 * @Description:我参与的项目 创建模型预测
 */
<template>
    <div class="views-personal">
        <button class="views-main-goBack" @click="mixinGoBack">
            <i class="icon iconfont icon-fanhui"></i>
            {{$t('views.button.back')}}
        </button>
        <!-- 基本信息 -->
        <div class="views-header-inf">
            <span>{{$t('views.modelPrediction.basicInf')}}</span>
        </div>
        <div class="views-develop-inf">
            <div class="views-task-input">
                <span class="views-task-span-mg"> {{$t('views.modelPrediction.jobName')}}</span>
                <el-input v-model="input" placeholder=""></el-input>
            </div>
            <div class="views-task-image">
                <span class="views-task-span-mg views-span">{{$t('views.development.remarks')}}</span>
                <el-input type="textarea" :rows="6" :placeholder="$t('views.projectContent.enterContent')" v-model="textarea">
                </el-input>
            </div>
        </div>
        <!-- 参数配置 -->
        <div class="views-header-inf">
            <span>{{$t('views.modelPrediction.parameterConfig')}}</span>
        </div>
        <!-- 参数来源 -->
        <div class="views-develop-inf">
            <div class="views-task-input">
                <span class="views-task-span">
                    <i class="views-task-icon"></i>
                    <i class="views-task-ml">{{$t('views.modelPrediction.parameterSource')}}</i>
                </span>
                <span>GRPC</span>
            </div>
        </div>
        <div class="views-task-small">
            <span class="views-task-span">
                <i class="views-task-icon">*</i>
                <i class="views-task-ml">{{$t('views.trainingTask.engineType')}}</i>
            </span>
            <el-select v-model="value" placeholder="请选择" @change="changeType" ref="changeFocus">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span class="views-task-span">
                <i class="views-task-second">*</i>
                <i>{{$t('views.trainingTask.versionInf')}}</i>
            </span>
            <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="views-task-middle">
            <span class="views-task-span">
                <i class="views-task-icon">*</i>
                <i>{{$t('views.modelPrediction.useModel')}}</i>
                <i class="iconfont icon-Group views-icon-group"></i>
            </span>
            <div class="views-task-div">
                <el-input v-model="input" placeholder=""></el-input>
                <el-button type="primary" class="view-btn-medium views-btn-choice" @click="creatDevelop">
                    {{$t('views.modelPrediction.choice')}}
                </el-button>
            </div>
        </div>
        <div class="views-task-middle">
            <span class="views-task-span views-task-left">
                <i class="views-task-icon">*</i>
                <i>{{$t('views.modelPrediction.jobParameter')}}</i>
                <i class="iconfont icon-Group views-icon-group"></i>
            </span>
            <div class="views-task-right">
                <div class="views-model-params">
                    <el-input v-model="input"></el-input>
                    <b class="views-task-sign">=</b>
                    <el-input v-model="input"></el-input>
                </div>
            </div>
        </div>
        <div class="views-task-type">
            <span class="views-task-span views-task-left">
                <i class="views-task-icon">*</i>
                <i>{{$t('views.modelPrediction.nodeRules')}}</i>
                <i class="iconfont icon-Group views-icon-group"></i>
            </span>
            <div class="views-task-right views-task-border">
                <div class="views-task-sitting views-task-sitting-mg">
                    <span class="views-task-cpu">CPU</span>
                    <el-select v-model="value1" placeholder="请选择">
                        <el-option v-for="item in opData" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <span class="views-task-cpu">GPU</span>
                    <el-select v-model="value1" placeholder="请选择">
                        <el-option v-for="item in opData" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <span class="views-task-cpu">{{$t('views.projectContent.memory')}}</span>
                    <el-select v-model="value1" placeholder="请选择">
                        <el-option v-for="item in opData" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    G
                </div>
            </div>
        </div>
        <div class="views-develop-btn">
            <el-button>{{$t('views.trainingTask.cancel')}}</el-button>
            <el-button type="primary" class="view-btn-big">{{$t('views.trainingTask.run')}}</el-button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      textarea: '',
      options: [
        {
          value: 1,
          label: 'caffe'
        },
        {
          value: 2,
          label: 'tensorflow'
        }
      ],
      opData: [
        {
          value: '1000',
          label: '1000'
        },
        {
          value: '2000',
          label: '2000'
        },
        {
          value: '3000',
          label: '3000'
        }
      ],
      value: 1,
      value1: '1000'
    }
  },
  created () {},
  mounted () {},
  methods: {
    changeType () {},
    creatDevelop () {}
  },
  components: {},
  computed: {}
}
</script>
