/*
 * @Author: xiYou
 * @Date: 2018-08-08 09:54:12
 * @Last Modified by: xiYou
 * @Last Modified time: 2018-08-22 17:24:05
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:23:29
*/
<template>
  <div class="view-key-management">
    <div class="tab-select">
      <div>
        <span class="tab-select-title">{{$t("views.keyManagement.keys_name")}}</span>
        <el-input v-model="tableData.sel.name"
                  :placeholder='$t("views.keyManagement.keys_name")'></el-input>
      </div>
      <div>
        <el-button class="btn light small"
                   @click="doSearch('tableData')">{{$t("views.button.search")}}</el-button>
      </div>
    </div>
    <div>
      <el-button class="btn dark mid"
                 type="button"
                 @click="dialogCreatKey = true">{{$t("views.keyManagement.add_kay")}}</el-button>
      <el-button class="btn dark mid"
                 type="button"
                 @click="deleteMoreKeys()">{{$t("views.button.batchDelete")}}</el-button>
    </div>
    <el-table class="tab-content"
              v-loading="tableData.loading"
              :data="tableData.msg"
              @selection-change="handleSelectionChange"
              border>
      <el-table-column type="selection"
                       width="55"
                       align="center"></el-table-column>
      <el-table-column prop="enc_title"
                       :label='$t("views.keyManagement.keys_name")'
                       width="120"
                       align="center"></el-table-column>
      <el-table-column prop="enc_key"
                       label='KEY'
                       align="center"></el-table-column>
      <el-table-column prop="enc_key_md5"
                       label='KEY－MD5'
                       align="center"></el-table-column>
      <el-table-column :label='$t("views.table.operate")'
                       width="200"
                       align="center">
        <template slot-scope="scope">
          <button class="del "
                  :id='scope.row.id'
                  @click="deleteSingleKey(scope.row.id)">{{$t("views.button.delete")}}</button>
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
    <!-- 创建托管密钥 -->
    <el-dialog class='small'
               title="创建托管密钥"
               :visible.sync="dialogCreatKey"
               width="30%"
               top='30vh'>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item :label='$t("views.keyManagement.keys_name")'
                      prop="keys_name">
          <el-input v-model="ruleForm.keys_name"
                    placeholder='创建托管密钥'></el-input>
          <p>*该方式默认将密钥托管至系统中！</p>
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
export default {
  name: 'keyManagement',
  data () {
    return {
      linTabData: '',
      linUrl: '',
      pageSize: 10,
      ruleForm: {
        keys_name: ''
      },
      rules: {
        keys_name: [
          { required: true, message: '请输入密钥名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'change' }
        ]
      },
      tableData: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/encrypt/find',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 10
        },
        sel: {
          name: ''
        }
      },
      dialogCreatKey: false,
      multipleSelection: []
      // keys_name: ''
    }
  },
  methods: {
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
      // this.getActiveTab(name)
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

    initMsg () {
      this.tableData.loading = true
      let lin = {}
      if (this.tableData.Pagination !== undefined) {
        lin = Object.assign({}, this.tableData.Pagination, { // 对象合并，也属于深度拷贝，只复制值，不改变原数据
          count: this.pageSize
        })
      }
      if (this.tableData.sel !== undefined) {
        lin = Object.assign({}, lin, this.tableData.sel)
      }
      this.$axios.get(this.tableData.url, { params: lin }).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.encryt_list
        // 数据处理
        this.tableData.msg = [...tableDate] // 深度拷贝
        // 重置数据总数
        if (this.tableData.Pagination !== undefined) {
          this.tableData.Pagination.total_count = data.data.data.total_count
        }
        this.tableData.loading = false
      })
    },
    creatKey (formName) {
      // this.dialogCreatKey =
      this.dialogCreatKey = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let keysName = this.ruleForm.keys_name
          this.$post('/encrypt/create', { Encryption: {enc_title: keysName} }).then(data => {
            if (data.code === 200) {
              this.$message({ message: this.$t('views.notification.saved'), type: 'success' })
              this.dialogCreatKey = false
              this.getActiveTab('tableData')
            } else {
              this.$message({ message: data.message, type: 'error' })
            }
          })
        }
      })
    },
    deleteMoreKeys () {
      if (this.multipleSelection.length) {
        this.deleteKey(this.multipleSelection)
      } else {
        this.$message({
          type: 'info',
          message: this.$t('views.dialogText.selectNull')
        })
      }
    },
    deleteSingleKey (id) {
      this.deleteKey([id])
    },
    deleteKey (id) {
      this.mixinConfirm('/encrypt/delete', { ids: id }).then(res => {
        if (res) {
          // 请求成功回调
          this.getActiveTab('tableData')
        }
      })
    }
  },
  created () { // 每有一个表格就要写个初始化赋值
    this.getActiveTab('tableData')
  }
}
</script>
