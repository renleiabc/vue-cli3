<!--  -->
<template>
    <div>
        <table class="views-project-details">
            <tr>
                <td>{{$t('views.personalDevelop.personalQuota')}}</td>
                <td class="views-table-color">
                    <span>CPU：{{personalData.cpu}}{{$t('views.projectContent.unit')}}</span>
                    <span class="views-table-margin">{{$t('views.projectContent.memory')}}：{{personalData.memory}}(G)</span>
                    <span class="views-table-margin">GPU：{{personalData.gpu}}{{$t('views.projectContent.unit')}}</span>
                </td>
                <td>{{$t('views.projectContent.alreadyUsed')}}</td>
                <td class="views-table-color">
                    <span>CPU：{{personalData.use_cpu}} {{$t('views.projectContent.unit')}}</span>
                    <span class="views-table-margin">{{$t('views.projectContent.memory')}}：{{personalData.use_memory}}(G)</span>
                    <span class="views-table-margin">CPU：{{personalData.use_gpu}} {{$t('views.projectContent.unit')}}
                    </span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      personalData: {}
    }
  },
  created () {
    this.getPersonalDetails()
  },
  methods: {
    // 请求项目详情数据函数
    getPersonalDetails () {
      this.$get('/personal/personalconfig').then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.personalData = res.data
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
