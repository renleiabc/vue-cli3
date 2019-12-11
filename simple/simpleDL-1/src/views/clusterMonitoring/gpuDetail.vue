/*
* @Author: aFei
* @Date: 2018-07-26 15:44:14
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 10:48:17
*/
<template>
  <div class="views-cluster-monitoring-node-control-detail-gpu">
    <div class="item">
      <sedu-echarts domId="a"
                    :cname="cname"
                    :option=gpuTemp.option />
    </div>
    <div class="item">
      <sedu-echarts domId="b"
                    :cname="cname"
                    :option=gpuSe.option />
    </div>
    <div class="item">
      <sedu-echarts domId="c"
                    :cname="cname"
                    :option=powUsage.option />
    </div>
    <div class="item">
      <sedu-echarts domId="d"
                    :cname="cname"
                    :option=mem.option />
    </div>
    <div class="item">
      <sedu-echarts domId="e"
                    :cname="cname"
                    :option=clock.option />
    </div>
    <!-- <div class="item">
      <sedu-echarts domId="f"
                    :cname="cname"
                    :option=appClock.option />
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'gpuDetail',
  data () {
    return {
      cname: 'charts',
      nodeId: '',
      gpuId: '',
      gpuTemp: {
        option: {}
      },
      gpuSe: {
        option: {}
      },
      powUsage: {
        option: {}
      },
      mem: {
        option: {}
      },
      clock: {
        option: {}
      },
      appClock: {
        option: {}
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'nodeControlDetail' && to.query.nodeId === undefined) {
      this.$router.push({ name: 'nodeControlDetail', query: { nodeId: this.nodeId } })
    } else {
      next()
    }
  },
  methods: {
    chartData (data) {
      // 温度
      this.gpuTemp.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: `GPU${this.gpuId}_GPUTemp(C)`,
          left: 20,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          right: 45,
          borderRadius: 0,
          data: ['GPUTemp']
        },
        calculable: true,
        color: ['#3bd0ac', '#15c6e6'],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: data.x_axis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'GPUTemp',
            type: 'line',
            areaStyle: {
              color: '#8fe2ce',
              opacity: 0.7
            },
            smooth: true,
            z: 4,
            data: data.gpu_temp
          }
        ]
      }
      this.gpuSe.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: `GPU${this.gpuId}_GPUSE(%)`,
          left: 20,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          right: 45,
          borderRadius: 0,
          data: ['GPUUtil', 'MemUsage']
        },
        calculable: true,
        color: ['#3bd0ac', '#15c6e6'],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: data.x_axis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'GPUUtil',
            type: 'line',
            areaStyle: {
              color: '#8fe2ce',
              opacity: 0.7
            },
            smooth: true,
            z: 4,
            data: data.gpu_se
          }
        ]
      }
      // 电量
      this.powUsage.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: `GPU${this.gpuId}_PowUsage(W)`,
          left: 20,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          right: 45,
          borderRadius: 0,
          data: ['Power']
        },
        calculable: true,
        color: ['#3bd0ac', '#15c6e6'],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: data.x_axis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Power',
            type: 'line',
            areaStyle: {
              color: '#8fe2ce',
              opacity: 0.7
            },
            smooth: true,
            z: 4,
            data: data.gpu_power_used
          }
        ]
      }
      this.mem.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: `GPU${this.gpuId}_Mem(MB)`,
          left: 20,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          right: 45,
          borderRadius: 0,
          data: ['MemTotal', 'MemUsed']
        },
        calculable: true,
        color: ['#3bd0ac', '#15c6e6'],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: data.x_axis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'MemTotal',
            type: 'line',
            areaStyle: {
              color: '#8fe2ce',
              opacity: 0.7
            },
            smooth: true,
            z: 4,
            data: data.gpu_ram_max
          },
          {
            name: 'MemUsed',
            type: 'line',
            areaStyle: {
              color: '#27d9e9',
              opacity: 0.5
            },
            smooth: true,
            z: 3,
            data: data.gpu_ram_use
          }
        ]
      }
      this.clock.option = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: `GPU_GPUFan(%)`,
          left: 20,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        legend: {
          right: 45,
          borderRadius: 0,
          data: ['GPUFan']
        },
        calculable: true,
        color: ['#3bd0ac', '#15c6e6'],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: data.x_axis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'GPUFan',
            type: 'line',
            areaStyle: {
              color: '#8fe2ce',
              opacity: 0.7
            },
            smooth: true,
            z: 4,
            data: data.fanspeed
          }
        ]
      }
    },
    getData (uuid) {
      this.$get('/system/gpustate', { uuid: uuid }).then(data => {
        let dateArr = []
        let dataChar = {}
        for (let i = 0; i < 6; i++) {
          let timeStr = this.timestampToTime((i * 120) + data.data.start - 0, 'h:m:s')
          dateArr.push(timeStr)
        }
        dataChar.x_axis = dateArr
        dataChar.gpu_temp = data.data.gpu_temp_use
        dataChar.fanspeed = data.data.fanspeed
        dataChar.gpu_power_used = data.data.gpu_power_used
        dataChar.gpu_ram_use = data.data.gpu_ram_use
        dataChar.gpu_ram_max = data.data.gpu_ram_max
        dataChar.gpu_se = data.data.gpu_se
        this.chartData(dataChar)
      })
    }
  },
  created () {
    this.gpuId = this.$route.query.gpuId
    this.nodeId = this.$route.query.nodeId
    this.getData(this.nodeId)
  }
}

</script>
