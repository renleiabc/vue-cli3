<!--  代码目录-->
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('views.development.projectStorage')"
        name="first"
        v-if="isFirst">
        <div class="views-code-file">
          <div class="views-code-left">
            <el-scrollbar style="width:100%;height:100%;">
              <div v-if="project_storage.length === 0"
                class="views-code-storage">
                {{$t('views.table.noData')}}
              </div>
              <el-radio-group v-model="project"
                @change="changeRadio"
                v-else>
                <el-radio :label="item.id"
                  v-for="(item,index) in project_storage"
                  :key='index'
                  class="views-code-list">
                  <i class="iconfont icon-wenjianjia views-icon-project"></i>
                  <el-tooltip class="item"
                    effect="dark"
                    :content="item.name"
                    placement="bottom-start">
                    <span class="text-ellipsis views-storage-name">{{item.name}}</span>
                  </el-tooltip>
                </el-radio>
              </el-radio-group>
            </el-scrollbar>
          </div>
          <div class="views-code-right">
            <div v-for="(item,index) in project_storage"
              :key='index'
              v-show="item.active"
              class="views-code-box">
              <views-tree-dir :item='item'
                :type="type"></views-tree-dir>
            </div>
          </div>

        </div>

      </el-tab-pane>
      <el-tab-pane :label="$t('views.development.commonStorage')"
        name="second"
        v-if="isSecond">
        <div class="views-code-file">
          <div class="views-code-left">
            <el-scrollbar style="width:100%;height:100%;">
              <div v-if="common_storage.length === 0"
                class="views-code-storage">
                {{$t('views.table.noData')}}
              </div>
              <el-radio-group v-model="common"
                @change="changeCommon"
                v-else>
                <el-radio :label="item.id"
                  v-for="(item,index) in common_storage"
                  :key='index'
                  class="views-code-list">
                  <i class="iconfont icon-wenjianjia views-icon-project"></i>
                  <el-tooltip class="item"
                    effect="dark"
                    :content="item.name"
                    placement="bottom-start">
                    <span class="text-ellipsis views-storage-name">{{item.name}}</span>
                  </el-tooltip>
                </el-radio>
              </el-radio-group>
            </el-scrollbar>
          </div>
          <div class="views-code-right">
            <div v-for="(item,index) in common_storage"
              :key='index'
              v-show="item.active"
              class="views-code-box">
              <views-tree-dir :item='item'
                :type="type"></views-tree-dir>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ViewsTreeDir from './treeDir'
export default {
  data () {
    return {
      storagelist: '',
      common_storage: [],
      project_storage: [],
      project: '',
      common: '',
      activeName: 'first',
      obj: {
        project_id: ''
      }
    }
  },
  created () {
    this.obj.project_id = this.projectId
    this.getStoragelist(this.obj)
  },
  mounted () {
  },
  methods: {
    // 获取挂载信息地址
    getStoragelist (obj) {
      this.$post('/environmentproject/storagelist', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          let project = res.data.project_storage
          let common = res.data.common_storage
          if (project.length !== 0) {
            this.project = project[0].id
          }
          if (common.length !== 0) {
            this.common = common[0].id
          }

          project.forEach((item, i) => {
            item.active = false
            if (i === 0) {
              item.active = true
            }
          })
          common.forEach((item, i) => {
            item.active = false
            if (i === 0) {
              item.active = true
            }
          })
          this.project_storage = project
          this.common_storage = common
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 单选框函数
    changeRadio (val) {
      this.project_storage.forEach((item, i) => {
        item.active = false
        if (item.id === val) {
          item.active = true
        }
      })
      // console.log(JSON.stringify(this.project_storage))
    },
    changeCommon (val) {
      this.common_storage.forEach((item, i) => {
        item.active = false
        if (item.id === val) {
          item.active = true
        }
      })
    }
  },
  props: ['type', 'isFirst', 'isSecond', 'projectId'],
  components: { ViewsTreeDir },
  computed: {}
}

</script>
