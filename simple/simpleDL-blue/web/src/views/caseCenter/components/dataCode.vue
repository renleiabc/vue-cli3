/*
 * @Author: 少侠
 * @Date: 2018-08-07 16:08:35
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-30 14:50:54
 * @Description:选择代码数据
 */

<template>
  <el-dialog title="选择数据和代码"
             :before-close="handleClose"
             :close-on-click-modal='false'
             :visible.sync="openDialog">
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="公共存储空间列表"
                   name="first">
        <div>
          <treeFiles url="/storage/objectlistall"
                     isInit='1'
                     @dataTreeSelect='dataTreeSelect'></treeFiles>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="项目存储空间列表"
                   name="second">
        <div>
          456
        </div>
      </el-tab-pane>
      <el-tab-pane label="个人存储空间列表"
                   name="third">
        <div>
          789
        </div>
      </el-tab-pane> -->
    </el-tabs>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary"
                 class="primary"
                 @click="handleSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import treeFiles from './treeFiles'
export default {
  name: 'codeDataDialog',
  props: {
    openDialog: {
      type: Boolean,
      default: false
    }
  },
  components: {
    treeFiles
  },
  data () {
    return {
      props1: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      select: '',
      activeName: 'first'
    }
  },
  mounted () {

  },
  methods: {
    handleClose () {
      this.$parent.dataCodeVisible = false
    },
    handleSure (done) {
      this.$emit('dataCodeClose', this.select)
    },
    dataTreeSelect (select) {
      this.select = select
    },
    handleClick (tab, event) {

    }
  }
}
</script>
