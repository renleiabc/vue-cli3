<!-- 选择存储挂载地址组件 -->
<template>
    <el-tabs v-model="activeName"
        @tab-click="handleClick">

        <el-tab-pane :label="$t('views.development.commonStorage')"
            name="first">
            <div class="views-code-file">
                <el-scrollbar style="width:100%;height:100%;">
                    <div v-if="common_storage.length === 0"
                        class="views-code-storage">
                        {{$t('views.table.noData')}}
                    </div>
                    <div v-for="(item,index) in common_storage"
                        :key='index'
                        @click="conmmonStroage(item,index)"
                        :class="[{'views-code-select':item.active},'views-code-storage']"
                        v-else>
                        <i class="iconfont icon-xiangmu views-icon-project"></i>
                        <span>{{item.name}}</span>
                    </div>
                </el-scrollbar>
            </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('views.development.projectStorage')"
            name="second">
            <div class="views-code-file">
                <el-scrollbar style="width:100%;height:100%;">
                    <div v-if="project_storage.length === 0"
                        class="views-code-storage">
                        {{$t('views.table.noData')}}
                    </div>
                    <div v-for="(item,index) in project_storage"
                        :key="index"
                        @click="projectStroage(item,index)"
                        :class="[{'views-code-select':item.active},'views-code-storage']"
                        v-else>
                        <i class="iconfont icon-xiangmu views-icon-project"></i>
                        <span>{{item.name}}</span>
                    </div>
                </el-scrollbar>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      storagelist: '',
      common_storage: '',
      project_storage: '',
      obj: {
        project_id: ''
      }
    }
  },
  created () {
    this.obj.project_id = this.projectId
    // console.log(this.projectId)
    // console.log(this.obj)
    this.getStoragelist(this.obj)
  },
  mounted () { },
  methods: {
    // 获取挂载信息地址
    getStoragelist (obj) {
      this.$post('/environmentproject/storagelist', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.storagelist = res.data
          let data = res.data.common_storage
          this.getCommmon(data)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 公共存储空间列表数据
    getCommmon (data) {
      this.common_storage = this.processingData(data)
      // console.log(data)
    },
    // 选项卡
    handleClick (tab) {
      let name = tab.name
      if (this.storagelist === '') {
        this.$message({
          message: '挂载数据为空！',
          type: 'error'
        })
      } else {
        switch (name) {
          case 'first':
            this.common_storage = this.processingData(this.storagelist.common_storage)
            break
          case 'second':
            this.project_storage = this.processingData(this.storagelist.project_storage)
            break
          default:
            this.common_storage = this.processingData(this.storagelist.common_storage)
            break
        }
      }
    },
    // 数据处理
    processingData (data) {
      if (data.lenght === 0) {
        this.$message({
          message: '挂载数据为空！',
          type: 'error'
        })
      } else {
        data.forEach(item => {
          item.active = false
          item.disabled = false
        })
        // console.log(JSON.stringify(data))
        return data
      }
    },
    // 公共存储空间列表
    conmmonStroage (item, index) {
      this.common_storage.forEach((ele, i) => {
        ele.active = false
        if (i === index) {
          ele.active = true
        }
      })
      // 浅拷贝
      this.common_storage = [...this.common_storage]
      this.$emit('selectStroage', item)
    },
    // 项目存储空间列表
    projectStroage (item, index) {
      // console.log(item)
      this.project_storage.forEach((ele, i) => {
        ele.active = false
        if (i === index) {
          ele.active = true
        }
      })
      // 浅拷贝
      this.project_storage = [...this.project_storage]
      this.$emit('selectStroage', item)
    }
  },
  components: {},
  computed: {},
  props: ['projectId']
}

</script>
<style  scoped>
</style>
