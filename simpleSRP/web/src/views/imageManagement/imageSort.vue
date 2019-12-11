<!--
 * @Author: renlei
 * @Date: 2019-08-14 10:46:32
 * @LastEditors: renlei
 * @LastEditTime: 2019-09-04 15:34:51
 * @Description:镜像分类
 -->

<template>
  <div>
    <div class="tab-select">
      <div>
        <span class="tab-select-title">分类名称</span>
        <el-input v-model="tableData.sel.name"
                  :placeholder='"分类名称"'></el-input>
      </div>
      <div>
        <span class="tab-select-title">{{$t('views.table.createTime')}}</span>
        <!-- 选择开始时间、结束时间 -->
        <el-date-picker type="daterange"
                        :editable='false'
                        align="right"
                        range-separator="-"
                        v-model="tableData.sel.full_date"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        :start-placeholder="$t('views.button.startDate')"
                        :end-placeholder="$t('views.button.endDate')">
        </el-date-picker>
      </div>
      <div>
        <span class="tab-select-title">状态</span>
        <el-select v-model="tableData.sel.use"
                   :placeholder='$t("views.button.selectPlease")'>
          <el-option v-for="item in case_type"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button class="btn light small"
                   @click="clearSearch('tableData')">{{$t("views.button.reset")}}</el-button>
        <el-button class="btn light small"
                   @click="doSearch('tableData')">{{$t("views.button.search")}}</el-button>
      </div>
    </div>
    <div>
      <el-button class="btn dark mid"
                 type="button"
                 @click="updateName(false)">新增镜像分类</el-button>
      <el-button class="btn dark mid"
                 type="button"
                 @click="deleteMoreKeys()">{{$t("views.button.batchDelete")}}</el-button>
    </div>
    <el-table class="tab-content sortImage"
              v-loading="tableData.loading"
              @sort-change="sortTable"
              :data="tableData.msg"
              @selection-change="handleSelectionChange"
              border>
      <el-table-column type="selection"
                       width="55"
                       align="center"
                       :selectable="checkSelectable"></el-table-column>
      <el-table-column prop="name"
                       show-overflow-tooltip
                       sortable='custom'
                       :label='"分类名称"'></el-table-column>
      <el-table-column label='分类类型'
                       width="120"
                       align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.is_init==='1'">公共镜像分类</span>
          <span v-if="scope.row.is_init==='2'">项目镜像分类</span>
          <span v-if="scope.row.is_init==='0'">个人镜像分类</span>
          <span v-if="scope.row.is_init==='3'">编排镜像分类</span>
        </template>
      </el-table-column>
      <el-table-column prop="use"
                       show-overflow-tooltip
                       label='状态'
                       width="120"
                       align="center"></el-table-column>
      <el-table-column prop="total"
                       width="160"
                       show-overflow-tooltip
                       label='应用镜像数量'
                       align="center"></el-table-column>
      <el-table-column prop="created_at"
                       width="200"
                       sortable='custom'
                       show-overflow-tooltip
                       :label="$t('views.imageManagement.creationTime')"
                       align="center"></el-table-column>
      <el-table-column :label='$t("views.table.operate")'
                       width="200"
                       align="center">
        <template slot-scope="scope">
          <el-button class="btn"
                     @click="updateName(scope.row)"
                     :disabled="(roleCode&&scope.row.is_init==='1')">{{$t("views.imageManagement.modify")}}</el-button>
          <el-button class="del"
                     :id='scope.row.id'
                     @click="deleteSingleKey(scope.row.id)"
                     :disabled="(roleCode&&scope.row.is_init==='1')">{{$t("views.button.delete")}}</el-button>
        </template>
      </el-table-column>
      <!--暂无数据情况-->
      <div slot="empty">
        <div class="views-empty">
          <span class="views-empty-table"></span>
          <p class="views-empty-text">{{$t('views.table.noData')}}</p>
        </div>
      </div>
    </el-table>
    <el-pagination class="tab-page"
                   layout="prev, pager, next"
                   :page-size="pageSize"
                   :current-page.sync="tableData.Pagination.page"
                   :total="tableData.Pagination.total_count"
                   @current-change="changePage('tableData')"></el-pagination>
    <!-- 新增镜像分类 -->
    <el-dialog class='small'
               :title='titleSort'
               @close='closeDialog'
               :visible.sync="dialogCreatKey"
               width="30%"
               top='30vh'>
      <el-form :model="ruleForm"
               @submit.native.prevent
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item :label='"分类名称"'
                      prop="keys_name">
          <el-input v-model="ruleForm.keys_name"
                    maxlength="30"></el-input>
        </el-form-item>
        <el-form-item :label='"分类类型"'
                      prop="is_init">
          <el-select v-model="ruleForm.is_init"
                     placeholder="请选择">
            <el-option v-for="item in sortType"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogCreatKey = false">{{$t('views.button.cancel')}}</el-button>
        <el-button type="primary"
                   @click="creatKey('ruleForm')">{{$t('views.button.save')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as validFun from '@/util/validate'
export default {
  name: 'imageSort',
  data () {
    var validateCommon = (rule, value, callback) => {
      if (value.trim() !== '') {
        if (!validFun.valiName(value)) {
          callback(new Error(this.$t('views.validError.validStr')))
        } else {
          callback()
        }
      } else {
        callback(new Error(this.$t('views.validError.notNull')))
      }
    }
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      titleSort: '新增镜像分类',
      sortType: [],
      roleCode: false,
      numRole: 0,
      ruleForm: {
        keys_name: '',
        is_init: 1
      },
      rules: {
        keys_name: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' },
          { validator: validateCommon, trigger: 'blur' }
        ],
        is_init: [
          { required: true, message: this.$t('views.validError.notNull'), trigger: 'blur' }
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: this.$t('views.systemManagement.recentOneWeek'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('views.systemManagement.recentOneMonth'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('views.systemManagement.recentThreeMonth'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/image/newimagecategorylist',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 10
        },
        sel: {
          sort: '',
          is_init: 1,
          full_date: '',
          start_time: '',
          end_time: '',
          use: '',
          name: ''
        }
      },
      case_type: [
        { label: '使用中', value: '使用中' },
        { label: '未使用', value: '未使用' }
      ],
      dialogCreatKey: false,
      multipleSelection: [],
      isUpdateName: false
    }
  },
  methods: {
    checkSelectable (row, index) {
      if (this.numRole === 3 || this.numRole === 4) {
        this.roleCode = true
        if (row.is_init === '1') {
          return 0
        } else {
          return 1
        }
      } else {
        return 1
      }
    },
    handleSelectionChange (rows) {
      this.multipleSelection = []
      if (rows) {
        rows.forEach((val, index, rows) => {
          this.multipleSelection.push(val.id)
        })
      }
      this.multipleSelection = [...this.multipleSelection]
    },
    getActiveTab (name) { // 获取当前展示的表格、搜索等信息
      this.linTabData = name
      this.linUrl = this[name].url
      this.initMsg()
    },
    clearSearch (name) { // 清除搜索条件
      for (let key in this[name].sel) {
        this[name].sel[key] = ''
      }
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1
      }
      this.getActiveTab(name)
    },
    doSearch (name) { // 按条件搜索
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1
      }
      this.getActiveTab(name)
    },
    changePage (name) { // 改变分页
      this.getActiveTab(name)
    },
    // 表格排序
    sortTable (event) {
      if (event.order === 'descending') {
        this.tableData.sel.sort = '-' + event.prop
      } else {
        this.tableData.sel.sort = event.prop
      }
      this.initMsg()
    },
    initMsg () {
      this.tableData.loading = true
      let lin = {}
      if (this.tableData.Pagination !== undefined) {
        lin = Object.assign({}, this.tableData.Pagination, { // 对象合并，也属于深度拷贝，只复制值，不改变原数据
          count: this.pageSize
        })
      }
      if (this.tableData.sel !== undefined) {
        if (this.tableData.sel.full_date && this.tableData.sel.full_date.length === 2) {
          this.tableData.sel.start_time = this.tableData.sel.full_date[0] + ' 00:00:00'
          this.tableData.sel.end_time = this.tableData.sel.full_date[1] + ' 23:59:59'
        } else {
          this.tableData.sel.start_time = ''
          this.tableData.sel.end_time = ''
        }
        lin = Object.assign({}, lin, this.tableData.sel)
      }
      this.$axios.get(this.tableData.url, { params: lin }).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.category_list
        // 数据处理
        this.tableData.msg = [...tableDate] // 深度拷贝
        // 重置数据总数
        if (this.tableData.Pagination !== undefined) {
          this.tableData.Pagination.total_count = data.data.data.total_count
        }
        this.pageSize = data.data.data.per_page || 10
        this.tableData.loading = false
      })
    },
    creatKey (formName) {
      // this.dialogCreatKey =
      this.dialogCreatKey = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let keysName = this.ruleForm.keys_name
          let value = this.ruleForm.is_init
          // if (this.roleCode) {
          //   value = this.ruleForm.is_init
          // } else {
          //   value = 1
          // }
          if (this.isUpdateName) {
            this.$post('/image/imagecategoryupdate', { category_id: this.updateID.id, name: keysName, is_init: value }).then(data => {
              if (data.code === 200) {
                this.ruleForm.keys_name = ''
                this.$message({ message: this.$t('views.notification.saved'), type: 'success' })
                this.dialogCreatKey = false
                this.getActiveTab('tableData')
              } else {
                this.$message({ message: data.message, type: 'error' })
              }
            })
          } else {
            // eslint-disable-next-line standard/object-curly-even-spacing
            this.$post('/image/imagecategorycreate', { category_name: keysName, is_init: value }).then(data => {
              if (data.code === 200) {
                this.ruleForm.keys_name = ''
                this.$message({ message: this.$t('views.notification.saved'), type: 'success' })
                this.dialogCreatKey = false
                this.getActiveTab('tableData')
              } else {
                this.$message({ message: data.message, type: 'error' })
              }
            })
          }
        }
      })
    },
    closeDialog () {
      this.ruleForm.keys_name = ''
      this.$refs.ruleForm.resetFields()
    },
    updateName (row) {
      console.log(row)
      this.dialogCreatKey = true
      if (row) {
        this.titleSort = '修改镜像分类'
        this.updateID = row
        this.ruleForm.keys_name = row.name
        this.ruleForm.is_init = parseInt(row.is_init)
        this.isUpdateName = true
      } else {
        this.titleSort = '新增镜像分类'
        this.isUpdateName = false
      }
    },
    deleteMoreKeys () {
      if (this.multipleSelection.length) {
        this.deleteKey(this.multipleSelection)
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('views.dialogText.selectNull')
        })
      }
    },
    deleteSingleKey (id) {
      this.deleteKey(id)
    },
    deleteKey (id) {
      this.mixinConfirm('/image/imagecategorydelete', { category_id: id }).then(res => {
        if (res) {
          // 请求成功回调
          this.getActiveTab('tableData')
        }
      })
    },
    // 不同的角色使用不同的镜像分类类型
    handleSortType (role) {
      if (role === 2) {
        this.ruleForm.is_init = 1
        this.sortType = [
          {
            value: 1,
            label: '公共镜像分类'
          },
          {
            value: 3,
            label: '编排镜像分类'
          }
        ]
      } else if (role === 3) {
        this.ruleForm.is_init = 2
        this.sortType = [
          {
            value: 2,
            label: '项目镜像分类'
          },
          {
            value: 0,
            label: '个人镜像分类'
          },
          {
            value: 3,
            label: '编排镜像分类'
          }
        ]
      } else if (role === 4) {
        this.ruleForm.is_init = 0
        this.sortType = [
          {
            value: 2,
            label: '项目镜像分类'
          },
          {
            value: 0,
            label: '个人镜像分类'
          }
        ]
      }
    }

  },
  created () { // 每有一个表格就要写个初始化赋值
    const role = this.numRole = JSON.parse(sessionStorage.getItem('userinfo')).role
    this.handleSortType(role)
    if (role === 2) {
      this.tableData.sel.is_init = 1
      // this.roleCode = false
    } else {
      // this.roleCode = true
      this.tableData.sel.is_init = ''
    }
    this.getActiveTab('tableData')
  }
}
</script>
