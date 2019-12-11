<!--
 * @Author: renlei
 * @Date: 2019-08-14 10:46:32
 * @LastEditors: renlei
 * @LastEditTime: 2019-09-01 15:32:10
 * @Description:个人空间-选择镜像组件
 -->

<template>
  <div>
    <el-table v-loading="loading"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              border
              class="tab-content">
      <el-table-column :label="$t('views.development.select')"
                       header-align="center"
                       align="center">
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
      <el-table-column prop="imageOs.name"
                       :label="$t('views.development.systemType')"
                       header-align="center"
                       align="center">
      </el-table-column>
      <el-table-column prop="created_at"
                       :label="$t('views.projectContent.createdTime')"
                       header-align="center"
                       align="center"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="imageCategory.name"
                       :label="$t('views.development.classification')"
                       show-overflow-tooltip
                       header-align="center"
                       align="center">
      </el-table-column>
      <el-table-column prop="describe"
                       :label="$t('views.development.mirrorDescription')"
                       show-overflow-tooltip
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      tableData: [],
      loading: true,
      radio: '',
      label: '',
      isCount: false,
      per: 0,
      total: 0,
      currentPage: 1,
      title: '',
      obj: {
        is_init: 1,
        category: '',
        page: 0,
        status: 1
      },
      row: '',
      tag: [
        { label: this.$t('views.development.publicImage'), name: 'first' },
        { label: this.$t('views.development.personalImage'), name: 'second' },
        { label: this.$t('views.development.layoutImage'), name: 'third' }
      ]
    }
  },
  created () {
    this.handleImageInit()
  },
  mounted () { },
  methods: {
    handleImageInit () {
      console.log(this.category)
      this.obj.page = 0
      this.obj.category = this.category.id
      const isInit = this.obj.is_init = this.category.is_init
      switch (isInit) {
        // 公共是1
        case '1':
          this.title = this.$t('views.development.publicImage')
          break
        case '0':
          // 个人是0
          this.title = this.$t('views.development.personalImage')
          break
        case '3':
          // 编排是3
          this.title = this.$t('views.development.layoutImage')
          break
        default:
          break
      }
      this.getImagelist(this.obj)
    },
    getImagelist (obj) {
      // console.log(obj)
      this.$get('/image/imagelist', obj).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.tableData = res.data.image_list
          // console.log(JSON.stringify(this.tableData))
          let total = parseInt(res.data.total_count)
          let per = parseInt(res.data.per_page)
          if (total <= per) {
            this.isCount = false
          } else {
            this.isCount = true
          }
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    // 分页
    currentChange (val) {
      this.obj.page = val
      this.getImagelist(this.obj)
    },
    // 选中
    radioPublic (row) {
      this.row = row
    },
    // 选择镜像
    confirmChoices () {
      let row = this.row
      if (row === '') {
        this.$message({
          message: '请选择镜像',
          type: 'warning'
        })
      } else {
        this.$emit('choiceName', row)
        this.$emit('choiceClose', false)
      }
    },
    // 关闭弹出窗
    dialogClose () {
      this.radio = ''
      this.row = ''
      this.$emit('choiceClose', false)
    },
    selectMirrorClick (e) {
      this.row = ''
    }
  },
  props: {
    category: {
      type: Object
    }
  },
  watch: {
    'category.id': function (newVal, oldVal) {
      this.handleImageInit()
    }
  },
  components: {},
  computed: {}
}

</script>
<style  scoped>
</style>
