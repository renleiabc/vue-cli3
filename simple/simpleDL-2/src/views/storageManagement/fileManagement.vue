/*
 * @Author: Liang Liang
 * @Date: 2018-08-07 14:29:09
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-10 18:00:24
 * @Description:
 */

<template>
  <div class="app-container">
    <div class="v-line">
      <span class="primary-color">{{$t("views.storageManagement.fileManagement.title")}}</span>
    </div>
    <div class="options">
      <div class="search">
        <span>名称</span>
        <el-input size="small"
                  v-model="searchName"></el-input>
        <el-button class="views-btn-query"
                   size="small"
                   @click="searchName=''">重置</el-button>
        <el-button class="views-btn-query"
                   @click="searchNameBtn"
                   size="small">查询</el-button>
      </div>
      <div class="btn-group"
           v-if="showBtn">
        <el-button class="dark mid btn"
                   @click="dialogNewFile=true">上传文件</el-button>
        <el-button class="dark mid btn"
                   size="small"
                   @click="createFloderDialod">新建文件夹</el-button>
        <el-button class="dark mid btn"
                   @click="batchDeleteId"
                   size="small">{{$t("views.button.batchDelete")}}</el-button>
      </div>
    </div>
    <sedu-path-breadcrumb ref="seduPathBreadcrumb"
                          style="font-size:13px;"
                          matchKeyName='id'
                          :backLabel="$t('views.storageManagement.fileManagement.seduPathBreadcrumb.backLabel')"
                          :allFileLabel="$t('views.storageManagement.fileManagement.seduPathBreadcrumb.allFileLabel')"
                          :callBack="getBackFileList" />
    <el-table class="tab-content"
              :data="tableData"
              style="margin-top:10px;"
              ref="multipleTable"
              @selection-change='selectChange'
              v-loading="listLoading"
              :default-sort="{prop: 'date', order: 'descending'}"
              border>

      <el-table-column type="selection"
                       align="center"
                       width="55">
      </el-table-column>

      <el-table-column :label='$t("views.storageManagement.fileManagement.tableFileList.thName")'>
        <template slot-scope="scope">
          <div v-if="scope.row.type=='1'">
            <i class="iconfont icon-wenjianjia"
               style="color:#417dd0;" />&nbsp;
            <a href="javascript:void(0)"
               @click="updateTable(scope.row)">
              <span>{{scope.row.name}}</span>
            </a>
          </div>
          <div v-if="scope.row.type=='2'">
            <i class="el-icon-document" />&nbsp;
            <span>{{scope.row.name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="100"
                       :label='$t("views.storageManagement.fileManagement.tableFileList.thSize")'>
        <template slot-scope="scope">
          {{scope.row.size != 0 ? numberFormatter(scope.row.size, 2):'--'}}
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="120"
                       :label='$t("views.storageManagement.fileManagement.tableFileList.thEncipher")'>
        <template slot-scope="scope">
          <div v-if="scope.row.type=='1'">
            --
          </div>
          <div v-else>
            <el-tag v-if="scope.row.is_encryption == 1"
                    type="success"
                    size="small">{{$t("views.storageManagement.fileManagement.tableFileList.tagEncrypted")}}</el-tag>
            <el-tag v-else
                    type="info"
                    size="small">{{$t("views.storageManagement.fileManagement.tableFileList.tagUnencrypted")}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="120"
                       :label='$t("views.storageManagement.fileManagement.tableFileList.thStateFile")'>
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status == 1"
                    type="success"
                    size="small">成功</el-tag>
            <el-tag v-if="scope.row.status == 0"
                    type="info"
                    size="small">加载中</el-tag>
            <el-tag v-if="scope.row.status == 2"
                    type="error"
                    size="small">失败</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       :label='$t("views.storageManagement.fileManagement.tableFileList.thDate")'
                       prop="update_at">
      </el-table-column>

      <el-table-column align="center"
                       width="200"
                       :label='$t("views.storageManagement.fileManagement.tableFileList.thAction")'>
        <template slot-scope="scope">
          <button class="btn"
                  v-if="(scope.row.type==2 && scope.row.status == 1) && (scope.row.dowoldstatus == 0 ||  scope.row.dowoldstatus == 3) "
                  @click="cacheFile(scope.row)">获取</button>
          <button class="btn"
                  v-if="scope.row.type==2 && scope.row.status == 1 && scope.row.dowoldstatus == 1"
                  @click="downloadFile(scope.row)">下载</button>
          <span v-if="scope.row.dowoldstatus == 2">获取中</span>
          <span v-if="scope.row.type==1&&!showBtn">--</span>
          <button class="del"
                  v-if="showBtn"
                  @click="deleteFile([scope.row.id])">{{$t('views.button.delete')}}</button>
        </template>
      </el-table-column>
      <div slot="empty">
        <div class="views-empty">
          <span class="views-empty-table"></span>
          <p class="views-empty-text">{{$t('views.table.noData')}}</p>
        </div>
      </div>
    </el-table>
    <el-pagination layout="prev, pager, next"
                   class="tab-page"
                   :page-size="pageSize"
                   :current-page.sync="Pagination.page"
                   @current-change="pageChange"
                   :total="Pagination.total_count">
    </el-pagination>
    <el-dialog title="新建文件夹"
               class="small"
               :visible.sync="dialogNewFlod">
      <div class="create-flod">
        <span>文件夹名称</span>
        <div class="floder-desc">
          <el-input size="small"
                    maxlength="1023"
                    v-model="newFloderName"></el-input>
          <p>命名规则：</p>
          <!-- <p>1. 文件夹名称不能包括下列符号 : \ / ; * ? " , . &lt; &gt; | 。</p> -->
          <!-- <p>2. 文件夹名称不能以"."开头或结尾</p> -->
          <!-- <p>3. 文件夹的绝对路径总长度不能超过1023字符</p> -->
          <p>1. 文件夹名称仅为英文字母</p>
          <p>3. 文件夹的绝对路径总长度不能超过1023字符</p>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogNewFlod = false">取消</el-button>
        <el-button type="primary"
                   class="primary"
                   @click="createFloder">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="donwloadParams"
               title="上传文件"
               class="small"
               :close-on-click-modal='false'
               :visible.sync="dialogNewFile">
      <uploadFile v-show="dialogNewFile"
                  @closeNewFile="closeNewFile"
                  :params='params'
                  ref="uploadComn"></uploadFile>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogNewFile = false">取消</el-button>
        <el-button type="primary"
                   class="primary"
                   @click="btnNewFile">确定</el-button>
      </div>
    </el-dialog>
    <!-- <a :href="url"
       :download="filename"
       ref="down"></a> -->
  </div>
</template>

<script>
import uploadFile from './components/uploadFile'
export default {
  name: 'fileManagement',
  components: {
    uploadFile
  },
  data () {
    return {
      dios: true,
      dialogNewFlod: false,
      dialogNewFile: false,
      tableData: [],
      params: {
        storageId: 0,
        id: 0
      },
      role: '2',
      is_init: '1',
      url: '',
      filename: '',
      donwloadParams: {},
      pid: 0,
      fileKeyArr: [],
      pageSize: 10,
      newFloderName: '',
      storageId: 0,
      id: 0,
      showBtn: true,
      searchName: '',
      apiFileList: '/storage/objectlist',
      errorString: null,
      Pagination: {
        page: 1,
        total_count: 10
      },
      listLoading: true
    }
  },
  props: {
  },
  created () {
    this.role = JSON.parse(localStorage.getItem('userinfo')).role
    this.is_init = this.$parent.is_init
    this.storageId = this.$route.query.id
    this.params.storageId = this.$route.query.id
    this.errorString = this.$t('views.storageManagement.fileManagement.tableFileList.thRecover')
    this.initTable()
    if (this.is_init === 1 && this.role !== 2) {
      this.showBtn = false
    } else {
      this.showBtn = true
    }
  },
  mounted () {
    // 把根路径加入面包屑
    this.params.id = this.pid
    this.$refs.seduPathBreadcrumb.addPath({ id: 0 })
  },
  watch: {
  },
  methods: {
    initTable () {
      this.getFileList()
    },
    btnNewFile () {
      // this.dialogNewFile = false
      this.$refs.uploadComn.newFileCreate().then(res => {
        return this.$refs.uploadComn.getstorageuser()
      }).then(res => {
        if (res.code === 200) {
          setTimeout(() => {
            this.$refs.uploadComn.submitUpload()
          }, 10)
        } else {
          this.$message({ message: res.message, type: 'error' })
        }
      })
    },
    createFloderDialod () {
      this.dialogNewFlod = true
    },
    createFloder () {
      let reg = /^[A-Za-z]+$/g
      if (!reg.test(this.newFloderName)) {
        this.$message({ message: '文件夹命名格式错误', type: 'error' })
      } else {
        this.dialogNewFlod = false
        this.$post('/storage/foldercreat', { foldername: this.newFloderName, storage_id: this.storageId, pid: this.pid }).then(res => {
          if (res.code === 200) {
            this.$message({ message: this.$t('views.notification.succeed'), type: 'success' })
            this.newFloderName = ''
            this.searchNameBtn()
          }
        })
      }
    },
    // 关闭弹窗上传文件
    closeNewFile () {
      this.dialogNewFile = false
      this.searchNameBtn()
    },
    // 获取平台参数
    getPingtai (row) {
      console.log(row)
      let parms = {}
      this.$get('/storage/storageuser', { storage_id: this.storageId }).then(res => {
        if (res.code === 200) {
          parms.accessid = res.data.accessid
          parms.accesssecret = res.data.accesssecret
          parms.bucketname = res.data.storage_name
          parms.name = row.path
          this.$post('/storage/objectdowdb', { fileid: row.id }).then(res => {
            if (res.code === 200) {
              parms.cburl = res.data.returnurl
              this.$post(window.Simple.pingTai + '/oss/user/object/pull', parms).then(res => {
                if (res.state === 200) {
                  this.$message({ message: '文件获取中，请稍后', type: 'success' })
                  this.searchNameBtn()
                }
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    // 删除文件
    deleteFile (id) {
      this.mixinConfirm('/storage/pseudofolderdelete', { folderid: id, force: 1, storage_id: this.storageId }).then(res => {
        if (res) {
          // 请求成功回调
          this.searchNameBtn()
        }
      })
    },
    // 下载文件
    downloadFile (row) {
      let link = document.createElement('a')
      link.href = window.Simple.pingTai + '/oss/user/downloads/' + row.dowold + '?saveas=' + row.name
      console.log(link.href)
      link.download = row.name
      document.body.appendChild(link)
      setTimeout(res => {
        link.click()
        document.body.removeChild(link)
      }, 10)
    },
    // 文件流保存
    // downFile (blob, fileName) {
    //   if (navigator.msSaveBlob) {
    //     navigator.msSaveBlob(blob, fileName)
    //   } else {
    //     let link = document.createElement('a')
    //     link.href = URL.createObjectURL(blob)
    //     link.download = fileName
    //     document.body.appendChild(link)
    //     link.click()
    //     document.body.removeChild(link)
    //     URL.revokeObjectURL(link.href)
    //   }
    // },
    cacheFile (row) {
      this.getPingtai(row)
    },
    batchDeleteId () {
      if (this.fileKeyArr.length > 0) {
        this.deleteFile(this.fileKeyArr)
        this.fileKeyArr = []
      } else {
        this.$message({ message: '请选择删除项', type: 'error' })
      }
    },
    selectChange (rows) {
      for (let i = 0; i < rows.length; i++) {
        this.fileKeyArr.push(rows[i].id)
      }
    },
    searchNameBtn () {
      this.Pagination.page = 1
      this.getFileList()
    },
    pageChange () {
      this.getFileList()
    },
    updateTable (obj) {
      if (!obj) return false
      //   this.targetPath = obj
      if (obj.status !== '1') {
        this.$message.warning('文件夹未创建成功！')
      } else {
        this.pid = obj.id
        this.params.id = obj.id
        this.Pagination.page = 1
        this.$refs.seduPathBreadcrumb.addPath(obj)
        this.getFileList()
      }
    },
    getBackFileList (obj) {
      this.Pagination.page = 1
      this.pid = obj.pid ? obj.pid : 0
      this.params.id = obj.id
      this.getFileList(obj)
    },
    getFileList (obj) {
      this.listLoading = true
      let prams = {
        pid: obj ? obj.pid : this.pid,
        storage_id: this.storageId,
        name: this.searchName
      }
      this.$post(this.apiFileList, { StorageObjectSearch: prams, page: this.Pagination.page }, this.errorString).then(res => {
        this.tableData = [...res.data.storage_list]
        this.Pagination.total_count = res.data.total_count
        this.listLoading = false
      })
    }
  }
}
</script>
