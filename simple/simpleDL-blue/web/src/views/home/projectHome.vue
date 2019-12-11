/*
 * @Author:任雷雷
 * @Date: 2018-07-30 10:04:31
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-30 17:48:12
 * @Description:项目管理者首页
 */

<template>
  <div class="views-project">
    <ul class="views-project-ul">
      <li v-if="role==3">
        <div class="views-charts">
          <div class="views-charts-title">项目使用情况（单位：个）</div>
          <div class="views-charts-legend views-chrats-margin">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[0][0]"></span>
            <span>当前已创建项目情况</span>
          </div>
          <div class="views-charts-legend">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[0][1]"></span>
            <span>剩余可创建项目情况</span>
          </div>
          <sedu-echarts domId="projectUse"
                        :option='projectUseData[0]'
                        :myStyle=useProject />
        </div>
      </li>
      <li>
        <div class="views-charts">
          <div class="views-charts-title">项目存储空间使用情况（单位：G）</div>
          <div class="views-charts-legend views-chrats-margin">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[1][0]"></span>
            <span>当前已用容量</span>
          </div>
          <div class="views-charts-legend">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[1][1]"></span>
            <span>剩余可用容量</span>
          </div>
          <sedu-echarts domId="projectUse2"
                        :option='projectUseData[1]'
                        :myStyle=useProject />
        </div>
      </li>
      <li>
        <div class="views-charts">
          <div class="views-charts-title">个人存储空间使用情况（单位：G）</div>
          <div class="views-charts-legend views-chrats-margin">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[2][0]"></span>
            <span>当前已用容量</span>
          </div>
          <div class="views-charts-legend">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[2][1]"></span>
            <span>剩余可用容量</span>
          </div>
          <sedu-echarts domId="projectUse3"
                        :option='projectUseData[2]'
                        :myStyle=useProject />
        </div>
      </li>
      <li>
        <div class="views-charts">
          <div class="views-charts-title">项目存储空间使用情况（单位：个）</div>
          <div class="views-charts-legend views-chrats-margin">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[3][0]"></span>
            <span>当前已用数量</span>
          </div>
          <div class="views-charts-legend">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[3][1]"></span>
            <span>剩余可用数量</span>
          </div>
          <sedu-echarts domId="projectUse4"
                        :option='projectUseData[3]'
                        :myStyle=useProject />
        </div>
      </li>
      <li>
        <div class="views-charts">
          <div class="views-charts-title">个人存储空间使用情况（单位：个）</div>
          <div class="views-charts-legend views-chrats-margin">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[4][0]"></span>
            <span>当前已用数量</span>
          </div>
          <div class="views-charts-legend">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[4][1]"></span>
            <span>剩余可用数量</span>
          </div>
          <sedu-echarts domId="projectUse5"
                        :option='projectUseData[4]'
                        :myStyle=useProject />
        </div>
      </li>
      <li>
        <div class="views-charts">
          <div class="views-charts-title">项目镜像使用情况（单位：个）</div>
          <div class="views-charts-legend views-chrats-margin">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[5][0]"></span>
            <span>当前已用数量</span>
          </div>
          <div class="views-charts-legend">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[5][1]"></span>
            <span>剩余可用数量</span>
          </div>
          <sedu-echarts domId="projectUse6"
                        :option='projectUseData[5]'
                        :myStyle=useProject />
        </div>
      </li>
      <li>
        <div class="views-charts">
          <div class="views-charts-title">个人镜像使用情况（单位：个）</div>
          <div class="views-charts-legend views-chrats-margin">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[6][0]"></span>
            <span>当前已用数量</span>
          </div>
          <div class="views-charts-legend">
            <span class="views-charts-color"
                  :style="'background:'+ colorArr[6][1]"></span>
            <span>剩余可用数量</span>
          </div>
          <sedu-echarts domId="projectUse7"
                        :option='projectUseData[6]'
                        :myStyle=useProject />
        </div>
      </li>
    </ul>
    <!-- <sedu-echarts domId="aaaa" :option=option1 />

        <sedu-echarts domId="bbb" :option=option1 /> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      option1: {},
      role: 4,
      optionData: '',
      projectUseData: [{}, {}, {}, {}, {}, {}, {}],
      useProject: 'height:200px;',
      colorArr: [['#376cdb', '#abb9d6'], ['#009b81', '#8bcfc3'], ['#009b81', '#8bcfc3'], ['#ff0043', '#fbc1c1'], ['#ff0043', '#fbc1c1'], ['#715772', '#9b90ad'], ['#715772', '#9b90ad']]
    }
  },
  mounted () {
    if (this.STORE_THEME_LANG === 'zh') {
      // 项目使用情况数据渲染函数调用
      this.getPorjectHome()
    }
    if (this.STORE_THEME_LANG === 'en') {
      // 项目使用情况数据渲染函数调用
      this.getPorjectHome()
    }
    this.role = JSON.parse(sessionStorage.getItem('userinfo')).role
  },
  methods: {
    // 获取项目管理端首页的数据
    getPorjectHome () {
      let arr = [{numAll: 100, used: 20, left: 80},
        {numAll: 100, used: 20, left: 80},
        {numAll: 100, used: 20, left: 80},
        {numAll: 100, used: 20, left: 80},
        {numAll: 100, used: 20, left: 80},
        {numAll: 100, used: 20, left: 80},
        {numAll: 100, used: 20, left: 80}]
      this.$get('/system/projectstoragestatisticslist').then(res => {
        console.log(JSON.stringify(res))
        if (res.code === 200) {
          arr[0].numAll = res.data.basic_config.manage_project_num || 0.00
          arr[0].used = res.data.my_create_project
          arr[0].left = arr[0].numAll - arr[0].used
          arr[1].numAll = res.data.storage_config.project_storage ? (res.data.storage_config.project_storage / 1024 / 1024 / 1024).toFixed(2) : 0.00
          arr[2].numAll = res.data.storage_config.personal_storage ? (res.data.storage_config.personal_storage / 1024 / 1024 / 1024).toFixed(2) : 0.00
          arr[3].numAll = (res.data.storage_config.project_num - 0)
          arr[4].numAll = (res.data.storage_config.personal_num - 0)
          arr[5].numAll = (res.data.image_config.project_image_num - 0)
          arr[6].numAll = (res.data.image_config.personal_image_num - 0)
          arr[1].used = (res.data.project_storage_size ? (res.data.project_storage_size / 1024 / 1024 / 1024) : 0.00).toFixed(2)
          arr[2].used = (res.data.my_storage_size ? (res.data.my_storage_size / 1024 / 1024 / 1024) : 0.00).toFixed(2)
          arr[3].used = (res.data.project_storage_use_num - 0)
          arr[4].used = (res.data.my_project_storage - 0)
          arr[5].used = (res.data.project_image_use_num - 0)
          arr[6].used = (res.data.my_project_image_num - 0)
          arr[1].left = (arr[1].numAll - arr[1].used).toFixed(2)
          arr[2].left = (arr[2].numAll - arr[2].used).toFixed(2)
          arr[3].left = (arr[3].numAll - arr[3].used)
          arr[4].left = (arr[4].numAll - arr[4].used)
          arr[5].left = (arr[5].numAll - arr[5].used)
          arr[6].left = (arr[6].numAll - arr[6].used)
          this.projectUse(arr)
        }
      })
    },
    // 项目使用情况数据渲染
    projectUse (data) {
      let echartData = []
      let titleArr = ['项目使用情况', '项目存储空间使用情况', '个人存储空间使用情况', '项目存储空间使用情况', '个人存储空间使用情况', '项目镜像使用情况', '个人镜像使用情况']
      let titleAllNumArr = ['可建项目总数\n', '项目存储空间\n总容量', '个人存储空间\n总容量', '项目存储空间\n总数', '个人存储空间\n总数', '项目镜像\n总数', '个人镜像\n总数']
      let color = this.colorArr
      data.forEach((element, key) => {
        let title = titleAllNumArr[key] + element.numAll
        let data = [
          {
            value: element.used,
            name: '已用\r'
          },
          {
            value: element.left,
            name: '剩余\r'
          }
        ]
        echartData.push(echratsData(title, data, color[key], titleArr[key]))
      })
      this.projectUseData = echartData
    }
  },
  components: {},
  computed: {}
}
function echratsData (title, data, color, seriseName) {
  const showData = {
    title: {
      text: title,
      left: 'center',
      top: '45%',
      textStyle: {
        fontSize: 14,
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      show: false
    },
    series: [
      {
        name: seriseName,
        type: 'pie',
        radius: ['60%', '75%'],
        avoidLabelOverlap: false,
        legendHoverLink: false,
        hoverAnimation: false,
        label: {
          normal: {
            formatter: '{b|{b}：}{c} ',
            rich: {
              b: {
                fontSize: 14,
                color: '#666',
                lineHeight: 20
              }
            },
            textStyle: {
              color: '#666'
            }
          },
          emphasis: {
            show: true
          }
        },
        labelLine: {
          normal: {
            show: true
          }
        },
        data: data
      }
    ],
    color: color
  }
  return showData
}
</script>
