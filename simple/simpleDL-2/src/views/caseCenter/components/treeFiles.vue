/*
 * @Author: 少侠
 * @Date: 2018-08-07 16:08:05
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-07 16:08:05
 * @Description: 文件夹树
 */

<template>
  <div style="height:400px;">
    <el-scrollbar style="height:100%;">
      <el-tree :props="props1"
               :load="loadNode1"
               :highlight-current='true'
               empty-text='暂无数据'
               @node-click="handleNodeClick"
               accordion
               lazy>
        <span class="custom-tree-node"
              slot-scope="{ node, data }">
          <i class="iconfont icon-xiangmu"
             v-if="node.data.type==3 && !node.data.leaf"></i>
          <i v-else
             class="iconfont"
             :class='node.data.type==2?"icon-wenjian1":"icon-wenjianjia"'></i>
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: 'treeFiles',
  props: {
    url: {
      type: String,
      default: ''
    },
    isInit: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      props1: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf',
        key: 'id',
        type: 'type'
      },
      storage_id: '',
      storage_name: '',
      pid: 0,
      dataArr: []
    }
  },
  mounted () {

  },
  methods: {
    loadNode1 (node, resolve) {
      console.log(node)
      if (this.url === '') {
        this.$message({message: '请求地址为空', type: 'error'})
      }
      let StorageSearch = {}
      if (node.level === 0) {
        StorageSearch.is_init = this.isInit
        this.$post('/storage/storagelist', {StorageSearch}).then(res => {
          if (res.code === 200) {
            this.dataArr = res.data.storage_list
            this.dataArr.forEach(element => {
              element.type = 3
              element.storage_id = element.id
              element.storage_name = element.name
              element.leaf = false
              return element
            })
          } else {
            this.$message({message: res.message, type: 'error'})
          }
          return resolve(this.dataArr)
        })
      } else {
        if (node.level === 1) {
          this.storage_id = node.data.storage_id
          this.storage_name = node.data.storage_name
          this.pid = 0
        } else {
          this.pid = node.data.id
        }
        this.$post(this.url, {storage_id: this.storage_id, pid: this.pid}).then(res => {
          this.dataArr = res.data
          this.dataArr.forEach(element => {
            if ((element.type - 0) === 2) {
              element.leaf = true
              element.storage_name = this.storage_name
            }
            return element
          })
          if (node.level >= 1) {
            return resolve(this.dataArr)
          }
        })
      }
    },
    // 点击的文件
    handleNodeClick (data) {
      this.$emit('dataTreeSelect', data)
    }
  }
}
</script>
