/*
 * @Author: aFei
 * @Date: 2018-07-26 15:39:10
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-13 17:30:27
*/
<template>
  <div class="views-cluster-monitoring-node-control-detail">
    <ul>
      <li>
        <div>
          <div>{{$t("views.clusterMonitoring.hostName")}}</div>
          <div>{{base_info.host_name}}</div>
        </div>
        <div>
          <div>{{$t("views.clusterMonitoring.creationTime")}}</div>
          <div>{{base_info.creation_timestamp}}</div>
        </div>
      </li>
      <!--<li>-->
      <!--<div class="row">-->
      <!--<div>标签</div>-->
      <!--<div>-->
      <!--<p class="mark" :key="index" v-for="(item,index) in base_info.node_tag">{{item}}</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li>-->
      <!--<div class="row else" :class="{show:show}">-->
      <!--<div>注释</div>-->
      <!--<div>-->
      <!--<p class="mark" :key="index" v-for="(item,index) in base_info.node_note">{{item}}</p>-->
      <!--</div>-->
      <!--<button class="show-all" @click="show=!show">{{show===true?'收起':'显示全部'}}</button>-->
      <!--</div>-->
      <!--</li>-->
      <li>
        <div>
          <div>{{$t("views.clusterMonitoring.ip")}}</div>
          <div>
            {{base_info.ip_addr}}
          </div>
        </div>
        <div>
          <div>{{$t("views.clusterMonitoring.dockerVersion")}}</div>
          <div>{{base_info.container_runtime_version}}</div>
        </div>
        <!-- <div>
          <div>{{$t("views.clusterMonitoring.updateTime")}}</div>
          <div>{{base_info.update_time}}</div>
        </div> -->
      </li>
      <li>
        <div>
          <div>{{$t("views.clusterMonitoring.kernelVersion")}}</div>
          <div>{{base_info.kernel_version}}</div>
        </div>
        <div>
          <div>{{$t("views.clusterMonitoring.operatingSystem")}}</div>
          <div>{{base_info.operating_system}}</div>
        </div>
      </li>
      <!-- <li>
        <div>
          <div>{{$t("views.clusterMonitoring.dockerVersion")}}</div>
          <div>{{base_info.cidr_run_version}}</div>
        </div>
        <div>
          <div>{{$t("views.clusterMonitoring.status")}}</div>
          <div>{{base_info.status}}</div>
        </div>
      </li> -->
    </ul>
    <div class="item">
      <p class="tit">{{$t("views.clusterMonitoring.allocatedResources")}}</p>
      <div class="chart-content">
        <div class="chart-item">
          <sedu-echarts domId="a"
                        :cname="cname"
                        :option=cpu.option />
          <div class="msg"
               v-show="!cpu.loading">
            <p>{{$t("views.clusterMonitoring.totalAmount")}}</p>
            <p>{{cpu.data}}</p>
          </div>
          <p>CPU allocation(cores)</p>
        </div>
        <div class="chart-item">
          <sedu-echarts domId="b"
                        :cname="cname"
                        :option=memory.option />
          <div class="msg"
               v-show="!memory.loading">
            <p>{{$t("views.clusterMonitoring.totalAmount")}}</p>
            <p>{{memory.data}}GB</p>
          </div>
          <p>Memory allocation(bytes)</p>
        </div>
        <div class="chart-item">
          <sedu-echarts domId="c"
                        :cname="cname"
                        :option=pods.option />
          <div class="msg"
               v-show="!pods.loading">
            <p>{{$t("views.clusterMonitoring.totalAmount")}}</p>
            <p>{{pods.data}}</p>
          </div>
          <p>Pods allocation</p>
        </div>
      </div>
    </div>
    <div class="item">
      <p class="tit">{{$t("views.clusterMonitoring.statusQuo")}}</p>
      <el-table class="tab-content"
                :data="tableData1.msg"
                v-loading="tableData1.loading"
                border>
        <el-table-column prop="type"
                         width="150"
                         align="center"
                         :label='$t("views.clusterMonitoring.type")'></el-table-column>
        <el-table-column :label='$t("views.clusterMonitoring.status")'
                         width="60"
                         align="center">
          <template slot-scope="item">
            {{item.row.status}}
          </template>
        </el-table-column>
        <el-table-column prop="last_heartbeat_time"
                         width="160"
                         align="center"
                         :label='$t("views.clusterMonitoring.recentHeartbeat")'></el-table-column>
        <el-table-column prop="last_transition_time"
                         width="160"
                         align="center"
                         :label='$t("views.clusterMonitoring.recentChanges")'></el-table-column>
        <el-table-column prop="reason"
                         :label='$t("views.clusterMonitoring.reason")'></el-table-column>
        <el-table-column prop="message"
                         :label='$t("views.clusterMonitoring.message")'></el-table-column>
        <!--暂无数据情况-->
        <div slot="empty">
          <div class="views-empty">
            <span class="views-empty-table"></span>
            <p class="views-empty-text">{{$t('views.table.noData')}}</p>
          </div>
        </div>
      </el-table>
    </div>
    <div class="item else">
      <p class="tit">{{$t("views.clusterMonitoring.nodeControlDetail.p1")}}</p>
      <div class="gpu-content">
        <div class="gpu-top">
          <div class="gpu-top-item">
            <div class="top">
              <span class="name">GPU NUMBER：{{gpu.gpu_number.use}}</span>
              <div class="legend">
                <div class="legend-item">{{$t("views.clusterMonitoring.use")}}</div>
                <div class="legend-item">{{$t("views.clusterMonitoring.free")}}</div>
              </div>
            </div>
            <div class="center">
              <p :style="{width:`${gpu.gpu_number.use/gpu.gpu_number.all*100}%`}"></p>
            </div>
            <div class="bottom">
              <span>TeslaP100-SXM2-16GB:{{gpu.gpu_number.all}}</span>
            </div>
          </div>
          <div class="gpu-top-item">
            <div class="top">
              <span class="name">GPU AVE UTILIZATION</span>
              <div class="legend">
                <div class="legend-item">{{$t("views.clusterMonitoring.use")}}</div>
                <div class="legend-item">{{$t("views.clusterMonitoring.free")}}</div>
              </div>
            </div>
            <div class="center">
              <p :style="{width:`${gpu.gpu_ave.max/gpu.gpu_ave.all*100}%`}"></p>
            </div>
            <div class="bottom">
              <span>MAX:{{gpu.gpu_ave.max}}%</span>
              <span>MIN:{{gpu.gpu_ave.min}}%</span>
              <span>USE:{{gpu.gpu_ave.use}}</span>
            </div>
          </div>
          <div class="gpu-top-item">
            <div class="top">
              <span class="name">MEM AVE UTILIZATION</span>
              <div class="legend">
                <div class="legend-item">{{$t("views.clusterMonitoring.use")}}</div>
                <div class="legend-item">{{$t("views.clusterMonitoring.free")}}</div>
              </div>
            </div>
            <div class="center">
              <p :style="{width:`${gpu.eme_ave.max/gpu.eme_ave.all*100}%`}"></p>
            </div>
            <div class="bottom">
              <span>MAX:{{gpu.eme_ave.max}}%</span>
              <span>MIN:{{gpu.eme_ave.min}}%</span>
              <span>USE:{{gpu.eme_ave.use}}</span>
            </div>
          </div>
        </div>
        <div class="gpu-bottom">
          <div class="legend">
            <div class="legend-item">{{$t("views.clusterMonitoring.fullLoad")}}：{{gpu.gpu_detail.statistics.full}}</div>
            <div class="legend-item">{{$t("views.clusterMonitoring.section")}}：{{gpu.gpu_detail.statistics.some}}</div>
            <div class="legend-item">{{$t("views.clusterMonitoring.free")}}：{{gpu.gpu_detail.statistics.free}}</div>
            <div class="legend-item">{{$t("views.clusterMonitoring.unknown")}}：{{gpu.gpu_detail.statistics.unknow}}</div>
          </div>
          <div class="watch"
               v-if="gpu.gpu_detail.list.length>0">
            <div class="watch-item"
                 :class="item.values[0][1]==0?'free':item.values[0][1]>=80?'full':'some'"
                 :key="index"
                 v-for="(item,index) in gpu.gpu_detail.list">
              <router-link :to="{name:'gpuDetail', query:{nodeId:item.metric.uuid}}">
                <p class="address">{{item.metric.instance}}</p>
                <p>ID:GPU_{{item.metric.minor_number}}</p>
                <p>GPU:{{(item.values[0][1]-0).toFixed(2)}}%</p>
                <p>MEM:{{(item.mem[0][1]-0).toFixed(2)}}%</p>
              </router-link>
            </div>
          </div>
          <div v-else
               style='padding-bottom:10px;'>
            暂无GPU信息
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <p class="tit">{{$t("views.clusterMonitoring.containerGroup")}}</p>
      <el-table class="tab-content"
                :data="tableData2.msg"
                v-loading="tableData2.loading"
                border>
        <el-table-column prop="name"
                         :label='$t("views.clusterMonitoring.name")'></el-table-column>
        <el-table-column prop="node_name"
                         :label='$t("views.clusterMonitoring.node")'></el-table-column>
        <el-table-column prop="status"
                         width="100"
                         align="center"
                         :label='$t("views.clusterMonitoring.status")'>
          <template slot-scope="item">
            {{item.row.status===1?'Running':'Stop'}}
          </template>
        </el-table-column>
        <el-table-column prop="restart"
                         width="100"
                         align="center"
                         :label='$t("views.clusterMonitoring.numberOfRestarts")'></el-table-column>
        <el-table-column prop="create_time"
                         width="200"
                         align="center"
                         :label='$t("views.clusterMonitoring.created")'></el-table-column>
        <!--暂无数据情况-->
        <div slot="empty">
          <div class="views-empty">
            <span class="views-empty-table"></span>
            <p class="views-empty-text">{{$t('views.table.noData')}}</p>
          </div>
        </div>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nodeControlDetail',
  data () {
    return {
      cname: 'charts',
      tableData1: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        loading: true
      },
      tableData2: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        loading: true
      },
      base_info: {},
      cpu: {
        option: {},
        loading: true,
        data: ''
      },
      memory: {
        option: {},
        loading: true,
        data: ''
      },
      pods: {
        option: {},
        loading: true,
        data: ''
      },
      gpu: {
        gpu_number: {},
        gpu_ave: {},
        eme_ave: {},
        gpu_detail: {
          statistics: {},
          list: []
        }
      },
      show: false
    }
  },
  created () {
    this.$parent.nodeId = this.$route.query.nodeId
    this.$get('/system/computerinfo', {instance: this.$route.query.nodeId}).then(data => {
      this.base_info = {...data.data.nodes}
      this.tableData1.msg = [...data.data.nodes.conditions]
      this.tableData1.loading = false
      this.tableData2.msg = []
      this.tableData2.loading = false
      // 假数据
      this.gpu = {
        'gpu_number': {
          'all': 12,
          'use': 6
        },
        'gpu_ave': {
          'all': 100,
          'use': 1,
          'max': 0,
          'min': 0
        },
        'eme_ave': {
          'all': 100,
          'use': 1,
          'max': 0,
          'min': 0
        },
        'gpu_detail': {
          'statistics': {
            'full': 0,
            'some': 0,
            'free': 0,
            'unknow': 0
          },
          'list': [
            {
              'gpu_id': 1,
              'gpu_use': 20,
              'gpu_mem': 10
            }
          ]
        }}
      this.gpu.gpu_ave.max = (data.data.node_gpu_cores_precent - 0).toFixed(2)
      this.gpu.eme_ave.max = (data.data.node_gpu_mem_rate - 0).toFixed(2)
      this.gpu.gpu_number.all = data.data.gpu.num
      this.gpu.gpu_number.use = data.data.gpu.list.length
      this.gpu.gpu_detail.list = data.data.gpu.list
      if (data.data.gpu.list.length > 0) {
        data.data.gpu.list.map(item => {
          if ((item.values[0][1] - 0) === 0) {
            this.gpu.gpu_detail.statistics.free += 1
          } else if ((item.values[0][1] - 0) < 80 && (item.values[0][1] - 0) > 0) {
            this.gpu.gpu_detail.statistics.some += 1
          } else if ((item.values[0][1] - 0) >= 80) {
            this.gpu.gpu_detail.statistics.full += 1
          } else {
            this.gpu.gpu_detail.statistics.unknow += 1
          }
        })
      }

      this.cpu.data = data.data.nodes.capacity.cpu
      this.cpu.loading = false
      this.cpu.option = {
        tooltip: {
          show: true,
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 100,
          y: 7,
          itemGap: 3,
          data: [this.$t('views.clusterMonitoring.limitValue'), this.$t('views.clusterMonitoring.requestValue')]
        },
        series: [
          {
            type: 'pie',
            clockWise: false,
            radius: ['70%', '90%'],
            label: {
              show: false
            },
            data: [
              {
                value: data.data.nodes.capacity.hugepages_1Gi,
                name: this.$t('views.clusterMonitoring.limitValue'),
                itemStyle: {
                  color: '#417dd0'
                }
              },
              {
                value: 0,
                tooltip: {show: false},
                itemStyle: {
                  color: 'rgba(0,0,0,0)'
                }
              }
            ]
          },
          {
            type: 'pie',
            clockWise: false,
            radius: ['50%', '70%'],
            label: {
              show: false
            },
            data: [
              {
                value: data.data.nodes.allocatable.hugepages_1Gi,
                name: this.$t('views.clusterMonitoring.requestValue'),
                itemStyle: {
                  color: '#2ad7ae'
                }
              },
              {
                value: 0,
                tooltip: {show: false},
                itemStyle: {
                  color: 'rgba(0,0,0,0)'
                }
              }
            ]
          }
        ]
      }
      this.memory.data = data.data.nodes.capacity.pods
      this.memory.loading = false
      this.memory.option = {
        tooltip: {
          show: true,
          formatter: '{b} : {c}MB ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 100,
          y: 7,
          itemGap: 3,
          data: [this.$t('views.clusterMonitoring.limitValue'), this.$t('views.clusterMonitoring.requestValue')]
        },
        series: [
          {
            type: 'pie',
            clockWise: false,
            radius: ['70%', '90%'],
            label: {
              show: false
            },
            data: [
              {
                value: data.data.nodes.capacity.hugepages_2Mi,
                name: this.$t('views.clusterMonitoring.limitValue'),
                itemStyle: {
                  color: '#417dd0'
                }
              },
              {
                value: 0,
                tooltip: {show: false},
                itemStyle: {
                  color: 'rgba(0,0,0,0)'
                }
              }
            ]
          },
          {
            type: 'pie',
            clockWise: false,
            radius: ['50%', '70%'],
            label: {
              show: false
            },
            data: [
              {
                value: data.data.nodes.capacity.hugepages_2Mi,
                name: this.$t('views.clusterMonitoring.requestValue'),
                itemStyle: {
                  color: '#2ad7ae'
                }
              },
              {
                value: 0,
                tooltip: {show: false},
                itemStyle: {
                  color: 'rgba(0,0,0,0)'
                }
              }
            ]
          }
        ]
      }
      this.pods.data = data.data.nodes.capacity.pods
      this.pods.loading = false
      this.pods.option = {
        tooltip: {
          show: true,
          formatter: '{b} : {c} ({d}%)'
        },
        color: ['#f7a923', '#f2e0c2'],
        series: [
          {
            type: 'pie',
            radius: ['70%', '90%'],
            label: {
              show: false
            },
            data: [
              {
                name: this.$t('views.clusterMonitoring.assigned'),
                value: data.data.nodes.allocatable.pods
              },
              {
                tooltip: {show: false},
                value: data.data.nodes.capacity.pods - data.data.nodes.allocatable.pods
              }
            ]
          }
        ]
      }
    })
  }
}
</script>
