<!-- 代码目录 -->
<template>
   <el-scrollbar style="width:100%;height:100%;">
        <div class="views-code-tree">
            <el-tree :props="propsChild" @node-click="handleNodeClick" lazy :load="loadNode" highlight-current empty-text='暂无数据' ref="tree" node-key="id">
            </el-tree>
        </div>
    </el-scrollbar>
</template>

<script>
export default {
  data () {
    return {
      path: {
        storage_id: '',
        storage_child_id: '',
        type: ''
      },
      propsChild: {
        label: 'label',
        children: 'zones',
        isLeaf: 'leaf'
      },
      num: 0
    }
  },
  created () {
    // console.log(this.item)
  },
  mounted () { },
  methods: {
    // 异步树叶子节点懒加载逻辑
    loadNode (node, resolve) {
      this.path.storage_id = this.item.id
      this.path.type = this.type
      //  console.log(node)
      // 一级节点处理
      if (node.level === 0) {
        this.getProjectpath(this.path, resolve)
      }
      // 其余节点处理
      if (node.level >= 1) {
        // 注意！把resolve传到你自己的异步中去
        this.path.storage_child_id = node.data.id
        this.getProjectpath(this.path, resolve)
      }
    },
    // 公共存储空间列表-项目训练任务路径信息
    getProjectpath (obj, resolve) {
      this.$get('/practiceproject/projectpath', obj).then(res => {
        // console.log(JSON.stringify(res))
        if (res.code === 200) {
          let data = res.data
          let dataTree = []
          data.forEach(elt => {
            let obj = {
              id: parseInt(elt.id),
              storage_id: parseInt(elt.storage_id),
              label: elt.path,
              accessid: elt.accessid,
              accesskey: elt.accesskey,
              children: []
            }
            if (elt.type === '1') {
              obj.leaf = false
              obj.type = 1
            } else if (elt.type === '2') {
              obj.leaf = true
              obj.type = 2
            }
            if (elt.is_init === 1) {
              obj.mount_flag = 'ro'
            } else {
              obj.mount_flag = 'rw'
            }
            dataTree.push(obj)
          })
          // console.log(JSON.stringify(dataTree))
          resolve(dataTree)
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 异步树节点点击事件
    handleNodeClick (data, node, itself) {
      let name = this.item.php_name
      this.$store.commit('projectpath', {data, name})
    }
  },
  components: {},
  computed: {},
  props: { item: Object, type: Number }
}

</script>
