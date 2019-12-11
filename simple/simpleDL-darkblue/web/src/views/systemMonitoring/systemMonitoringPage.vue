/*
 * @Author: 少侠
 * @Date: 2018-07-31 10:51:17
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-10 11:33:00
 * @Description: 系统监控页面
 */

<template>
  <div class='systemMonitoringPage'>
    <div class="v-line">
      <h6>{{$t("views.systemMonitoring.systemSource.title")}}</h6>
      <el-row>
        <el-col class="text-center"
                :span="8">
          <div class='title-chart'>CPU
            <span class="real-value">{{cpuNum}} Core</span> /
            <span class="total-value">{{cpuAllNum}} Core</span>
          </div>
          <sedu-echarts domId="cpu"
                        :cname=cpuClass
                        :option=option1 />
        </el-col>
        <el-col class="text-center"
                :span="8">
          <div class='title-chart'>{{$t("views.systemMonitoring.systemSource.memory")}}
            <span class="real-value">{{memoryNum}} G</span> /
            <span class="total-value">{{memoryAllNum}} G</span>
          </div>
          <sedu-echarts domId="memory"
                        :cname=memoryClass
                        :option=option2 />
        </el-col>
        <el-col class="text-center"
                :span="8">
          <div class='title-chart'>GPU
            <span class="real-value">{{gpuNum}} 个</span> /
            <span class="total-value">{{gpuAllNum}} 个</span>
          </div>
          <sedu-echarts domId="gpu"
                        :cname=memoryClass
                        :option=option3 />
        </el-col>
      </el-row>
    </div>
    <div class="v-line">
      <h6>{{$t("views.systemMonitoring.project.title")}}
        <span>{{projectAllNum}}</span> {{$t("views.systemMonitoring.project.rightBrackets")}}</h6>
      <el-row v-if="projectAllNum != 0">
        <el-col class="text-center"
                :span="24">
          <sedu-echarts domId="pro-analyse"
                        :myStyle=bar_pro_sty
                        :option=option4 />
        </el-col>
      </el-row>
      <div v-else>
        <div class="views-empty">
          <span class="views-empty-table"></span>
          <p class="views-empty-text">{{$t('views.table.noData')}}</p>
        </div>
      </div>
    </div>
    <div class="v-pie">
      <el-row>
        <el-col class="text-center"
                :span="12">
          <h6>{{$t("views.systemMonitoring.images.title")}}</h6>
          <sedu-echarts domId="iamges"
                        :myStyle=pie_pro_sty
                        :option=option5 />
        </el-col>
        <div class="middle-line"></div>
        <el-col class="text-center"
                :span="12">
          <h6>{{$t("views.systemMonitoring.storages.title")}}</h6>
          <sedu-echarts domId="storages"
                        :myStyle=pie_pro_sty
                        :option=option6 />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'systemMonitoring',
  data () {
    return {
      option1: {},
      option2: {},
      option3: {},
      option4: {},
      option5: {},
      option6: {},
      cpuNum: 0,
      cpuAllNum: 0,
      gpuNum: 0,
      gpuAllNum: 0,
      memoryNum: 0,
      memoryAllNum: 0,
      projectAllNum: 0,
      gauge_hart_arr: [],
      cpuClass: 'v-cpu',
      memoryClass: 'v-memory',
      gpuClass: 'v-gpu',
      bar_pro_sty: 'width:82vw;height:60vh;',
      pie_pro_sty: 'width:40vw;height:40vh;'
    }
  },
  methods: {
    chartInit (data) {
      if (!data) {
        return
      }
      let perStr = this.$t('views.systemMonitoring.systemSource.usedPer')
      let proNumStr = this.$t('views.systemMonitoring.project.proNumStr')
      let pie1Title = this.$t('views.systemMonitoring.images.title')
      let pie2Title = this.$t('views.systemMonitoring.storages.title')
      let publicImage = this.$t('views.systemMonitoring.images.publicImage')
      let personalImage = this.$t('views.systemMonitoring.images.personalImage')
      let projectImage = this.$t('views.systemMonitoring.images.projectImage')
      // let publicStorage = this.$t('views.systemMonitoring.storages.publicStorage')
      // let personalStorage = this.$t('views.systemMonitoring.storages.personalStorage')
      // let projectStorage = this.$t('views.systemMonitoring.storages.projectStorage')
      this.option1 = this.gaugeChart(data.gauge[0].name, data.gauge[0].value, perStr)
      this.option2 = this.gaugeChart(data.gauge[1].name, data.gauge[1].value, perStr)
      this.option3 = this.gaugeChart(data.gauge[2].name, data.gauge[2].value, '分配率')
      this.option4 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '7%',
          containLabel: true
        },
        dataZoom: [
          {
            type: 'inside',
            startValue: 0,
            endValue: 14
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: data.proCount.x,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: proNumStr
          }
        ],
        series: [
          {
            name: proNumStr,
            type: 'bar',
            barWidth: '60%',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#376cdb' },
                { offset: 0.5, color: '#4cb8e9' },
                { offset: 1, color: '#4cb8e9 ' }
              ])
            },
            data: data.proCount.value
          }
        ]
      }
      this.option5 = {
        title: {
          text: data.imagesCount.numAll,
          left: 'center',
          top: '44%',
          textStyle: {
            lineHeight: 100,
            fontSize: 18,
            color: '#111'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {d}%'
        },
        legendHoverLink: false,
        hoverAnimation: false,
        series: [
          {
            name: pie1Title,
            type: 'pie',
            radius: ['50%', '65%'],
            label: {
              normal: {
                formatter: '{b|{b} ：}{c} ',
                rich: {
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  }
                  // c: {
                  //   fontSize: 16,
                  //   lineHeight: 33
                  // }
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              { value: data.imagesCount.publiceNum, name: publicImage },
              { value: data.imagesCount.personalNum, name: personalImage },
              { value: data.imagesCount.projectNum, name: projectImage }
            ]
          }
        ],
        color: ['#f06966', '#83dfc8', '#604a61']
      }
      this.option6 = {
        title: {
          text: data.storageCount.allNumStr,
          left: 'center',

          textStyle: {
            lineHeight: 100,
            fontSize: 18,
            color: '#111'
          }
        },

        series: [
          {
            name: pie2Title,
            type: 'pie',
            radius: ['65%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]

      }
    },
    gaugeChart (name, value, perstr) {
      let option = {
        tooltip: { formatter: '{a} <br/>{b} : {c}%' },
        series: [
          {
            name: name,
            type: 'gauge',
            splitNumber: 10,
            radius: '96%',
            detail: { formatter: '{value}%' },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 16,
              color: 'auto'
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[0.2, '#009d7a'], [0.8, '#417ed1'], [1, '#f49900']],
                width: 20
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: '#fff'
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: '#fff'
              }
            },
            data: [{ value: value, name: perstr }]
          }
        ]
      }
      return option
    }
  },

  created () {
    let data = {}
    this.$get('/system/hypervisor').then(res => {
      // 系统资源监控
      this.cpuNum = res.data.cpu_ram_info.cpu_cpu_used
      this.cpuAllNum = res.data.cpu_ram_info.cpu_core_total
      this.memoryNum = (res.data.cpu_ram_info.mem_used - 0).toFixed(2)
      this.memoryAllNum = (res.data.cpu_ram_info.mem_total - 0).toFixed(2)
      this.gpuNum = res.data.gpu.used
      this.gpuAllNum = res.data.gpu.num_all
      let cpuValue = (this.cpuNum / this.cpuAllNum * 100).toFixed(2)
      let gpuValue = this.gpuAllNum ? parseInt(
        res.data.gpu.used /
          res.data.gpu.num_all *
          100
      ) : 0
      let memoryValue = (this.memoryNum / this.memoryAllNum * 100).toFixed(2)
      this.gauge_hart_arr[0] = { name: 'CPU', value: cpuValue }
      this.gauge_hart_arr[1] = { name: this.$t('views.systemMonitoring.systemSource.memory'), value: memoryValue }
      this.gauge_hart_arr[2] = { name: 'GPU', value: gpuValue }
      data['gauge'] = this.gauge_hart_arr
      // 项目空间统计
      this.projectAllNum = res.data.project_count_total
      data['proCount'] = {x: res.data.user_name, value: res.data.count}

      // 镜像统计
      let str = this.$t('views.systemMonitoring.images.numAllStr')
      let ge = this.$t('views.systemMonitoring.images.ge')
      let imagesAllStr = `${str}\n${res.data.count_image_total}${ge}`
      data['imagesCount'] = {
        numAll: imagesAllStr,
        personalNum: res.data.my_image_count_total,
        projectNum: res.data.project_image_count_total,
        publiceNum: res.data.public_image_count_total
      }

      // 存储空间统计
      let nunAllStr = this.$t('views.systemMonitoring.storages.nunAllStr')
      // let usedPer = parseInt(res.data.count_disk.used_num / res.data.count_disk.num_all * 100)
      let storageSubTitle = `${nunAllStr}\n${res.data.storage_count_total}${ge}`
      data['storageCount'] = {
        allNumStr: storageSubTitle,
        personalNum: res.data.my_storage_count_total,
        projectNum: res.data.project_storage_count_total,
        publiceNum: res.data.public_storage_count_total
      }
      this.chartInit(data)
    })
  }
}
</script>
