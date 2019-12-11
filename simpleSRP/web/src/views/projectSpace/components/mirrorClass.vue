<!--
 * @Author: renlei
 * @Date: 2019-08-22 15:40:42
 * @LastEditors: renlei
 * @LastEditTime: 2019-09-01 15:27:36
 * @Description:镜像分类组件
 -->
<template>
  <div>
    <el-tabs v-model="activeName"
             @tab-click="handleClick"
             class="views-select-mirror">
      <el-tab-pane :label="item.label"
                   :name="item.name"
                   v-for="(item,key) in tag"
                   :key="key">
        <el-table ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  class="tab-content"
                  height="250">
          <el-table-column :label="$t('views.development.select')"
                           header-align="center"
                           align="center"
                           width="70">
            <template slot-scope="scope">
              <el-radio class="radio"
                        v-model="radio"
                        :label="scope.row.id"
                        @change="radioPublic(scope.row)">
                {{label}}
              </el-radio>
            </template>
          </el-table-column>
          <!-- 镜像名称 -->
          <el-table-column prop="name"
                           :label="$t('views.development.mirror')"
                           header-align="center"
                           align="center">
          </el-table-column>
          <!-- 当表格数据为空的时候 -->
          <div slot="empty">
            <div class="views-empty">
              <span class="views-empty-table"></span>
              <p class="views-empty-text">{{$t('views.table.noData')}}</p>
            </div>
          </div>
        </el-table>
        <div class="views-page">
          <el-pagination :page-size="per"
                         layout="prev, pager, next"
                         :total="total"
                         @current-change="currentChange"
                         v-if="isCount"
                         :current-page.sync="currentPage">
          </el-pagination>
        </div>
        <div class="views-mirror-class">
          <el-button class="view-btn-medium"
                     @click="dialogClose">{{$t('views.button.close')}}</el-button>
          <el-button type="primary"
                     class="view-btn-medium"
                     @click="confirmChoices">{{$t('views.modelPrediction.choice')}}</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commonImage: [],
      objectImage: [],
      layoutImage: [],
      tableData: [],
      isCount: false,
      radio: '',
      label: '',
      row: '',
      activeName: 'first',
      tag: [
        { label: this.$t('views.development.publicImageType'), name: 'first' },
        { label: this.$t('views.development.projectImageType'), name: 'second' },
        { label: this.$t('views.development.layoutImageType'), name: 'third' }
      ]
    }
  },
  created () {
    const category = this.imagecategorylist.category
    this.imagecategory(category)
  },
  mounted () {
  },
  props: {
    imagecategorylist: {
      type: Object
    }
  },
  methods: {
    imagecategory (arr) {
      // console.log(JSON.stringify(arr))
      this.tableData = this.commonImage = arr.filter((item, index) => {
        return item.is_init === '1'
      })
      this.objectImage = arr.filter((item, index) => {
        return item.is_init === '2'
      })
      this.layoutImage = arr.filter((item, index) => {
        return item.is_init === '3'
      })
      // console.log(JSON.stringify(this.commonImage))
    },
    // 关闭弹出框
    dialogClose () {
      this.$emit('dialogMirrorClose', false)
    },
    // 向父组件传递参数
    confirmChoices () {
      if (this.radio) {
        const row = this.row
        this.$emit('choiceMirrorName', row)
      } else {
        this.$message({
          message: '请选择镜像分类',
          type: 'warning'
        })
      }
    },
    handleClick (tab, event) {
      let name = this.activeName = tab.name
      switch (name) {
        // 公共是1
        case 'first':
          this.tableData = this.commonImage
          break
        case 'second':
          // 项目是2
          this.tableData = this.objectImage
          break
        case 'third':
          // 项目是3
          this.tableData = this.layoutImage
          break
        default:
          break
      }
    },
    radioPublic (row) {
      this.row = row
    }
  },
  components: {},
  computed: {}
}

</script>
