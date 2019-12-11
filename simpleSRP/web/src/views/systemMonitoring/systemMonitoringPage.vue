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
      <div class="record-detail"
           @click="goRecordList">
        <i class="el-icon-edit"></i>
        <span>记录详情</span>
      </div>
      <el-row>
        <el-col class="text-center"
                :span="8">
          <div class='chart-title'>CPU
            <span class="real-value">{{cpuUsedNum}} Core</span> /
            <span class="total-value">{{cpuAllNum}} Core</span>
          </div>
          <div class="chart-sub-title">
            {{$t("views.systemMonitoring.systemSource.assignedResource")}}:
            <span>{{cpuAssigned.toFixed(1)}}%</span>
            {{$t("views.systemMonitoring.systemSource.unassigned") + $t("views.systemMonitoring.systemSource.resource")}}:
            <span>{{cpuUnassigned.toFixed(1)}}%</span>
          </div>
          <div class="chart-item">
            <sedu-echarts domId="cpu"
                          :cname=cpuClass
                          :option=cpuOption />
            <div class="label-box"
                 v-show="hasData">
              <img :src="mixinGetImage('views/global/', 'top_line.png')"
                   alt=""
                   class="top-line">
              <div class="top-label">
                {{$t("views.systemMonitoring.systemSource.unassigned")}}:
                <span>{{cpuUnassigned.toFixed(1)}}%</span>
              </div>
              <img :src="mixinGetImage('views/global/', 'bottom_line.png')"
                   alt=""
                   class="bottom-line">
              <div class="bottom-label">
                <div>{{$t("views.systemMonitoring.personal.label")}}
                  <span class="link-text"
                        @click="goPersonList">{{personalCpu.toFixed(1)}}%</span>
                </div>
                <div>{{$t("views.systemMonitoring.project.label")}}
                  <span class="link-text"
                        @click="goProjectList">{{projectCpu.toFixed(1)}}%</span>
                </div>
                <div>{{$t("views.systemMonitoring.systemSource.unUsed")}}
                  <span>{{cpuUnUsed.toFixed(1)}}%</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="text-center"
                :span="8">
          <div class='chart-title'>{{$t("views.systemMonitoring.systemSource.memory")}}
            <span class="real-value">{{memoryUsedNum}} G</span> /
            <span class="total-value">{{memoryAllNum}} G</span>
          </div>
          <div class='chart-sub-title'>
            {{$t("views.systemMonitoring.systemSource.assignedResource")}}:
            <span>{{memoryAssigned.toFixed(1)}}%</span>
            {{$t("views.systemMonitoring.systemSource.unassigned") + $t("views.systemMonitoring.systemSource.resource")}}:
            <span>{{memoryUnassigned.toFixed(1)}}%</span>
          </div>
          <div class="chart-item">
            <sedu-echarts domId="memory"
                          :cname=memoryClass
                          :option=memoryOption />
            <div class="label-box"
                 v-show="hasData">
              <img :src="mixinGetImage('views/global/', 'top_line.png')"
                   alt=""
                   class="top-line">
              <div class="top-label">
                {{$t("views.systemMonitoring.systemSource.unassigned")}}:
                <span>{{memoryUnassigned.toFixed(1)}}%</span>
              </div>
              <img :src="mixinGetImage('views/global/', 'bottom_line.png')"
                   alt=""
                   class="bottom-line">
              <div class="bottom-label">
                <div>{{$t("views.systemMonitoring.personal.label")}}
                  <span class="link-text"
                        @click="goPersonList">{{personalMemory.toFixed(1)}}%</span>
                </div>
                <div>{{$t("views.systemMonitoring.project.label")}}
                  <span class="link-text"
                        @click="goProjectList">{{projectMemory.toFixed(1)}}%</span>
                </div>
                <div>{{$t("views.systemMonitoring.systemSource.unUsed")}}
                  <span>{{memoryUnUsed.toFixed(1)}}%</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="text-center"
                :span="8">
          <div class='chart-title'>GPU
            <span class="real-value">{{gpuUsedNum}} 个</span> /
            <span class="total-value">{{gpuAllNum}} 个</span>
          </div>
          <div class='chart-sub-title'>
            {{$t("views.systemMonitoring.systemSource.assignedResource")}}:
            <span>{{gpuAssigned.toFixed(1)}}%</span>
            {{$t("views.systemMonitoring.systemSource.unassigned") + $t("views.systemMonitoring.systemSource.resource")}}:
            <span>{{gpuUnassigned.toFixed(1)}}%</span>
          </div>
          <div class="chart-item">
            <sedu-echarts domId="gpu"
                          :cname=memoryClass
                          :option=gpuOption />
            <div class="label-box"
                 v-show="hasData">
              <img :src="mixinGetImage('views/global/', 'top_line.png')"
                   alt=""
                   class="top-line">
              <div class="top-label">
                {{$t("views.systemMonitoring.systemSource.unassigned")}}:
                <span>{{gpuUnassigned.toFixed(1)}}%</span>
              </div>
              <img :src="mixinGetImage('views/global/', 'bottom_line.png')"
                   alt=""
                   class="bottom-line">
              <div class="bottom-label">
                <div>{{$t("views.systemMonitoring.personal.label")}}
                  <span class="link-text"
                        @click="goPersonList">{{personalGpu.toFixed(1)}}%</span>
                </div>
                <div>{{$t("views.systemMonitoring.project.label")}}
                  <span class="link-text"
                        @click="goProjectList">{{projectGpu.toFixed(1)}}%</span>
                </div>
                <div>{{$t("views.systemMonitoring.systemSource.unUsed")}}
                  <span>{{gpuUnUsed.toFixed(1)}}%</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="v-pie">
      <el-row>
        <el-col class="chart-item"
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
/* import echarts from 'echarts' */
import 'echarts-liquidfill'
export default {
  name: 'systemMonitoring',
  data () {
    return {
      cpuClass: 'v-cpu',
      memoryClass: 'v-memory',
      gpuClass: 'v-gpu',
      cpuOption: {},
      memoryOption: {},
      gpuOption: {},
      option5: {},
      option6: {},
      cpuAllNum: 0,
      cpuUsedNum: 0,
      memoryUsedNum: 0,
      memoryAllNum: 0,
      gpuUsedNum: 0,
      gpuAllNum: 0,
      /* 水球图数据 */
      cpuUnUsed: 0,
      cpuUnassigned: 0,
      cpuAssigned: 0,
      memoryUnUsed: 0,
      memoryUnassigned: 0,
      memoryAssigned: 0,
      gpuUnUsed: 0,
      gpuUnassigned: 0,
      gpuAssigned: 0,
      personalCpu: 0,
      projectCpu: 0,
      personalMemory: 0,
      projectMemory: 0,
      personalGpu: 0,
      projectGpu: 0,
      pie_pro_sty: 'width:40vw;height:40vh;',
      hasData: false
    }
  },
  methods: {
    goRecordList () {
      this.$router.push({ name: 'recordList', params: { userId: 123 } })
    },
    goPersonList () {
      this.$router.push({ name: 'personList' })
    },
    goProjectList () {
      this.$router.push({ name: 'projectList', params: { userId: 123 } })
    },
    chartInit (data) {
      if (!data) {
        return
      }
      let assignedResource = this.$t('views.systemMonitoring.systemSource.assignedResource')
      let cpuAssigned = this.cpuAssigned.toFixed(1)
      let memoryAssigned = this.memoryAssigned.toFixed(1)
      let gpuAssigned = this.gpuAssigned.toFixed(1)
      this.cpuOption = {
        series: [
          {
            type: 'liquidFill',
            /* data这里有个问题，要排序后才能展示，不然数据小的会被覆盖 */
            data: data.cpuData,
            center: ['50%', '46%'],
            radius: '80%',
            // 水球颜色 由低到高
            color: ['#7CBDFE', '#91C8FF', '#BADCFF'],
            // outline  外边
            outline: {
              borderDistance: 9,
              itemStyle: {
                borderWidth: 6,
                borderColor: '#9ccdfe',
                shadowBlur: 0
              }
            },
            /* 图形样式 */
            itemStyle: {
              shadowBlur: 0
            },
            backgroundStyle: {
              color: '#E3F7FF'// 水球未到的背景颜色
            },
            /* 图形上的文本标签 */
            label: {
              normal: {
                position: ['50%', '80%'],
                formatter: function (params) {
                  return assignedResource + ':' + cpuAssigned + '%'
                },
                insideColor: '#2E5199',
                fontSize: 14
              }
            }
          }]
      }
      this.memoryOption = {
        series: [
          {
            type: 'liquidFill',
            /* data这里有个问题，要排序后才能展示，不然数据小的会被覆盖 */
            data: data.memoryData,
            center: ['50%', '46%'],
            radius: '80%',
            // 水球颜色
            color: ['#6fd9bf', '#7bebcf', '#A1EEDA'],
            // outline  外边
            outline: {
              borderDistance: 9,
              itemStyle: {
                borderWidth: 6,
                borderColor: '#83DFC8',
                shadowBlur: 0
              }
            },
            /* 图形样式 */
            itemStyle: {
              shadowBlur: 0
            },
            backgroundStyle: {
              color: '#E3F7FF'// 水球未到的背景颜色
            },
            label: {
              normal: {
                position: ['50%', '80%'],
                formatter: function (params) {
                  return assignedResource + ':' + memoryAssigned + '%'
                },
                insideColor: '#2E5199',
                fontSize: 14
              }
            }
          }]
      }
      this.gpuOption = {
        series: [
          {
            type: 'liquidFill',
            /* data这里有个问题，要排序后才能展示，不然数据小的会被覆盖 */
            data: data.gpuData,
            center: ['50%', '46%'],
            radius: '80%',
            // 水球颜色
            color: ['#FFC182', '#FFCE9C', '#FCD5AF'],
            // outline  外边
            outline: {
              borderDistance: 9,
              itemStyle: {
                borderWidth: 6,
                borderColor: '#FFC182',
                shadowBlur: 0
              }
            },
            /* 图形样式 */
            itemStyle: {
              shadowBlur: 0
            },
            backgroundStyle: {
              color: '#E3F7FF'// 水球未到的背景颜色
            },
            label: {
              normal: {
                position: ['50%', '80%'],
                formatter: function (params) {
                  return assignedResource + ':' + gpuAssigned + '%'
                },
                insideColor: '#2E5199',
                fontSize: 14
              }
            }
          }]
      }
    },
    pieChartInit (data) {
      if (!data) {
        return
      }
      let pie1Title = this.$t('views.systemMonitoring.images.title')
      let pie2Title = this.$t('views.systemMonitoring.storages.title')
      let publicImage = this.$t('views.systemMonitoring.images.publicImage')
      let personalImage = this.$t('views.systemMonitoring.images.personalImage')
      let projectImage = this.$t('views.systemMonitoring.images.projectImage')
      let publicStorage = this.$t('views.systemMonitoring.storages.publicStorage')
      let personalStorage = this.$t('views.systemMonitoring.storages.personalStorage')
      let projectStorage = this.$t('views.systemMonitoring.storages.projectStorage')
      this.option5 = {
        title: {
          text: data.imagesCount.numAll,
          left: 'center',
          top: 'middle',
          textStyle: {
            lineHeight: 50,
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
          top: 'middle',
          textStyle: {
            lineHeight: 50,
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
            name: pie2Title,
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
              { value: data.storageCount.publiceNum, name: publicStorage },
              { value: data.storageCount.personalNum, name: personalStorage },
              { value: data.storageCount.projectNum, name: projectStorage }
            ]
          }
        ],
        color: ['#f7a31c', '#2ba1e4', '#00b285']
      }
    }
  },
  created () {
    let data = {}
    this.$get('/system/hypervisor').then(res => {
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
      let storageSubTitle = `${nunAllStr}\n${res.data.storage_count_total}${ge}`
      data['storageCount'] = {
        allNumStr: storageSubTitle,
        personalNum: res.data.my_storage_count_total,
        projectNum: res.data.project_storage_count_total,
        publiceNum: res.data.public_storage_count_total
      }
      this.pieChartInit(data)
    })
    this.$get('/system/getsystemresources').then(res => {
      // 系统资源监控
      const { data } = res
      if (data) {
        this.hasData = true
      }
      this.cpuUsedNum = data.cpu_ram_info.cpu_cpu_used
      this.cpuAllNum = data.cpu_ram_info.cpu_core_total
      this.memoryUsedNum = (data.cpu_ram_info.mem_used - 0).toFixed(1)
      this.memoryAllNum = (data.cpu_ram_info.mem_total - 0).toFixed(1)
      this.gpuUsedNum = data.gpu.used
      this.gpuAllNum = data.gpu.num_all
      /* 已分配资源 */
      this.cpuAssigned = this.cpuAllNum ? ((this.cpuUsedNum / this.cpuAllNum) * 100) : 0
      this.memoryAssigned = this.memoryAllNum ? ((this.memoryUsedNum / this.memoryAllNum) * 100) : 0
      this.gpuAssigned = this.gpuAllNum ? ((this.gpuUsedNum / this.gpuAllNum) * 100) : 0
      /* 未分配资源 */
      this.cpuUnassigned = 100 - this.cpuAssigned
      this.memoryUnassigned = 100 - this.memoryAssigned
      this.gpuUnassigned = 100 - this.gpuAssigned
      /* 水球图 个人空间、项目空间、未使用数据 */
      this.personalCpu = data.personal_ns_cpu_total ? (this.cpuAssigned * (data.personal_ns_cpu_use / data.personal_ns_cpu_total)) : 0
      this.projectCpu = data.project_ns_cpu_total ? (this.cpuAssigned * (data.project_ns_cpu_use / data.project_ns_cpu_total)) : 0
      this.cpuUnUsed = this.cpuAssigned - this.personalCpu - this.projectCpu

      this.personalMemory = data.personal_ns_memory_total ? (this.memoryAssigned * (data.personal_ns_memory_use / data.personal_ns_memory_total)) : 0
      this.projectMemory = data.project_ns_memory_total ? (this.memoryAssigned * (data.project_ns_memory_use / data.project_ns_memory_total)) : 0
      this.memoryUnUsed = this.memoryAssigned - this.personalMemory - this.projectMemory

      this.personalGpu = data.personal_ns_gpu_total ? (this.gpuAssigned * (data.personal_ns_gpu_use / data.personal_ns_gpu_total)) : 0
      this.projectGpu = data.project_ns_gpu_total ? (this.gpuAssigned * (data.project_ns_gpu_use / data.project_ns_gpu_total)) : 0
      this.gpuUnUsed = this.gpuAssigned - this.personalGpu - this.projectGpu
      /* 水球图的数据，要排序(降序)后才能展示，不然数据小的会被覆盖 （个人空间、项目空间、未使用） */
      data['cpuData'] = []
      data['memoryData'] = []
      data['gpuData'] = []
      if (this.personalCpu > 0 || this.projectCpu > 0 || this.cpuUnUsed > 0) {
        data['cpuData'].push(this.personalCpu / 100, this.projectCpu / 100, this.cpuUnUsed / 100)
        data['cpuData'].sort(function (a, b) {
          return b - a
        })
      }
      if (this.personalMemory > 0 || this.projectMemory > 0 || this.memoryUnUsed > 0) {
        data['memoryData'].push(this.personalMemory / 100, this.projectMemory / 100, this.memoryUnUsed / 100)
        data['memoryData'].sort(function (a, b) {
          return b - a
        })
      }
      if (this.personalGpu > 0 || this.projectGpu > 0 || this.gpuUnUsed > 0) {
        data['gpuData'].push(this.personalGpu / 100, this.projectGpu / 100, this.gpuUnUsed / 100)
        data['gpuData'].sort(function (a, b) {
          return b - a
        })
      }
      this.chartInit(data)
    })
  }
}
</script>
