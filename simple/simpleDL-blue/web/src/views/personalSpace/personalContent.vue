<!--  -->
<template>
    <div>
        <table class="views-project-details">
            <tr>
                <td>{{$t('views.personalDevelop.personalQuota')}}</td>
                <td class="views-table-color">
                    <span>CPU：{{personalData.cpu}}&nbsp;核</span>
                    <span class="views-table-margin">{{$t('views.projectContent.memory')}}：{{personalData.memory}}&nbsp;G</span>
                    <span class="views-table-margin">GPU：{{personalData.gpu}}&nbsp;个</span>
                </td>
                <td>{{$t('views.projectContent.alreadyUsed')}}</td>
                <td class="views-table-color">
                    <span>CPU：{{personalData.use_cpu}}&nbsp;核</span>
                    <span class="views-table-margin">{{$t('views.projectContent.memory')}}：{{personalData.use_memory}}&nbsp;G</span>
                    <span class="views-table-margin">GPU：{{personalData.use_gpu}} &nbsp;个
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

    }
  },
  created () {
    // 个人空间个人空间请求项目配额请求
    this.$store.dispatch('getPersonalDetails')
  },
  methods: {
  },
  computed: {
    personalData () {
      return this.$store.getters.postPersonalData
    }
  }
}
</script>
