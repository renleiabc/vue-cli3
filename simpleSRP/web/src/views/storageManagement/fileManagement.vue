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
        <span>{{$t("views.storageManagement.fileManagement.tableFileList.thName")}}</span>
        <el-input size="small"
                  v-model="searchName"></el-input>
        <el-button class="views-btn-query"
                   size="small"
                   @click="resetNameBtn">{{$t("views.button.reset")}}</el-button>
        <el-button class="views-btn-query"
                   @click="searchNameBtn"
                   size="small">{{$t("views.button.search")}}</el-button>
      </div>
      <div class="btn-group"
           v-if="showBtn">
        <el-button class="dark mid btn"
                   @click="dialogFTP=true">FTP上传</el-button>
        <el-button class="dark mid btn"
                   @click="dialogNewFile=true">{{$t("views.storageManagement.detail.btnUpload")}}</el-button>
        <el-button class="dark mid btn"
                   size="small"
                   @click="createFloderDialod">{{$t("views.storageManagement.detail.btnDir")}}</el-button>
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

      <el-table-column v-if='role!=2 && is_init==1'
                       type="index"
                       label="序号"
                       align="center"
                       width="55">
      </el-table-column>
      <el-table-column v-else
                       type="selection"
                       align="center"
                       width="55">
      </el-table-column>
      <el-table-column :label='$t("views.storageManagement.fileManagement.tableFileList.thName")'
                       show-overflow-tooltip>
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
            <el-tag v-if="scope.row.is_encryption == 2"
                    type="success"
                    size="small">自定义密钥加密</el-tag>
            <el-tag v-if="scope.row.is_encryption == 1"
                    type="success"
                    size="small">系统密钥加密</el-tag>
            <el-tag v-if="scope.row.is_encryption == 0"
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
                    size="small">{{$t("views.storageManagement.detail.success")}}</el-tag>
            <el-tag v-if="scope.row.status == 0"
                    type="info"
                    size="small">{{$t("views.storageManagement.detail.loading")}}</el-tag>
            <el-tag v-if="scope.row.status == 2"
                    type="error"
                    size="small">{{$t("views.storageManagement.detail.fail")}}</el-tag>
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
                  v-if="scope.row.type==2 && scope.row.status == 1"
                  @click="downloadFile(scope.row)">{{$t("views.storageManagement.fileManagement.tableFileList.btnEdit")}}</button>
          <span v-if="scope.row.dowoldstatus == 2">{{$t("views.storageManagement.detail.fetching")}}</span>
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
    <el-dialog :title='$t("views.storageManagement.detail.btnDir")'
               class="small"
               @close='closeDialogFlod'
               :visible.sync="dialogNewFlod">
      <div class="create-flod">
        <span>{{$t("views.storageManagement.detail.folderName")}}</span>
        <div class="floder-desc">
          <el-input size="small"
                    maxlength="30"
                    v-model="newFloderName"></el-input>
          <p>{{$t("views.storageManagement.detail.ruleName")}}</p>
          <!-- <p>1. 文件夹名称不能包括下列符号 : \ / ; * ? " , . &lt; &gt; | 。</p> -->
          <!-- <p>2. 文件夹名称不能以"."开头或结尾</p> -->
          <!-- <p>3. 文件夹的绝对路径总长度不能超过1023字符</p> -->
          <p>{{$t("views.storageManagement.detail.rule1")}}</p>
          <p>{{$t("views.storageManagement.detail.rule2")}}</p>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogNewFlod = false">{{$t('views.button.cancel')}}</el-button>
        <el-button type="primary"
                   class="primary"
                   @click="createFloder">{{$t('views.button.sure')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog title="FTP上传"
               :visible.sync="dialogFTP"
               class="small"
               :close-on-click-modal='false'>
      <div class="ftp-box">
        <a :href="ftp_down"
           class="view-btn view-btn-medium a-btn">点击下载FTP工具快速传输大文件</a>
        <p>为防止中文乱码，需上传编码为UTF-8的文本文件。</p>
        <p>FTP地址：{{getterStorageUser?getterStorageUser.ftp_path:""}}:{{getterStorageUser?getterStorageUser.ftp_port:""}}</p>
        <p>账号：{{getterStorageUser?getterStorageUser.keyname:""}}</p>
        <p>密码：{{getterStorageUser?getterStorageUser.keypassword:""}}</p>
      </div>
    </el-dialog>
    <el-dialog v-if="donwloadParams"
               :title='$t("views.storageManagement.detail.btnUpload")'
               width='400px !important'
               :before-close='closeUpload'
               @close='closeDialog'
               :close-on-click-modal='false'
               :visible.sync="dialogNewFile">
      <uploadFile v-show="dialogNewFile"
                  @updataLoding="updataLoding"
                  @closeNewFile="closeNewFile"
                  :params='params'
                  ref="uploadComn"></uploadFile>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   class="primary full sb"
                   :disabled="uploading"
                   @click="btnNewFile">{{$t('views.button.sure')}}</el-button>
        <p class="text-desc">{{$t('views.storageManagement.detail.fileSize')}}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import uploadFile from './components/uploadFile'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'fileManagement',
  components: {
    uploadFile
  },
  data () {
    return {
      ftp_down: window.Simple.php + '/upload/WinSCP-5.15.3-Setup.exe',
      uploading: false,
      dios: true,
      dialogNewFlod: false,
      dialogNewFile: false,
      dialogFTP: false,
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
      listLoading: true,
      fileIdsPath: '/storage/objecttb', // koufei 20181112
      fileIds: [], // koufei 20181112
      fildowonIds: [], // koufei 20181112
      timerTim: ''// koufei 20181112
    }
  },
  props: {
  },
  computed: {
    ...mapGetters(['getterStorageUser'])
  },
  created () {
    this.role = JSON.parse(sessionStorage.getItem('userinfo')).role
    this.is_init = this.$parent.is_init
    this.storageId = this.$route.query.id
    this.params.storageId = this.$route.query.id
    this.errorString = this.$t('views.storageManagement.fileManagement.tableFileList.thRecover')
    if (Number(this.is_init) === 1 && this.role !== 2) {
      this.showBtn = false
    } else {
      this.showBtn = true
    }
    this.getStorageUser({ storage_id: this.storageId })
    this.deleteRefresh()
  },
  mounted () {
    // 把根路径加入面包屑
    this.params.id = this.pid
    this.$refs.seduPathBreadcrumb.addPath({ id: 0 })
  },
  beforeDestroy () {
    this.clearTimer()
  },
  watch: {
  },
  methods: {
    ...mapActions(['getStorageUser']),
    initTable () {
      this.getFileList(false, 0)
    },
    closeDialogFlod () {
      this.newFloderName = ''
    },
    btnNewFile () {
      // this.dialogNewFile = false
      this.uploading = true
      this.$refs.uploadComn.newFileCreate().then(res => {
        console.log(res)
        return this.$refs.uploadComn.getstorageuser()
      }).then(res => {
        if (res.code === 200) {
          setTimeout(() => {
            this.$refs.uploadComn.submitUpload()
          }, 10)
        } else {
          this.$message({ message: res.message, type: 'error' })
          this.uploading = false
        }
      }).catch(reason => {
        console.log(reason)
        if (reason) {
          this.$message({
            type: 'error',
            message: reason
          })
        }
        this.uploading = false
      })
    },
    createFloderDialod () {
      this.dialogNewFlod = true
    },
    updataLoding () {
      this.uploading = false
    },
    closeUpload (done) {
      if (this.uploading) {
        this.$message({ message: '上传中，请稍后', type: 'error' })
      } else {
        done()
        this.$refs.uploadComn.initUpload()
      }
    },
    closeDialog () {
      this.$refs.uploadComn.initUpload()
    },
    createFloder () {
      let reg = /^[a-z0-9][a-z0-9-_.]+$/g
      if (!reg.test(this.newFloderName) || this.newFloderName.length < 3) {
        this.$message({ message: this.$t('views.storageManagement.valid.folderName'), type: 'error' })
      } else {
        this.dialogNewFlod = false
        this.$post('/storage/foldercreat', { foldername: this.newFloderName, storage_id: this.storageId, pid: this.pid }).then(res => {
          if (res.code === 200) {
            this.$message({ message: this.$t('views.notification.succeed'), type: 'success' })
            this.newFloderName = ''
            this.searchNameBtn(1)
          }
        })
      }
    },
    // 关闭弹窗上传文件
    closeNewFile () {
      this.uploading = false
      this.dialogNewFile = false
      this.searchNameBtn(1)
    },
    // 获取文件
    getPingtai (row) {
      let parms = {}
      parms.accessid = this.getterStorageUser.accessid
      parms.accesssecret = this.getterStorageUser.accesssecret
      parms.bucketname = this.getterStorageUser.storage_name
      parms.name = row.path
      this.$post('/storage/objectdowdb', { fileid: row.id }).then(res => {
        if (res.code === 200) {
          parms.cburl = res.data.returnurl
          this.$post(window.Simple.pingTai + '/oss/user/object/pull', parms).then(res => {
            if (res.state === 200) {
              this.$message({ message: this.$t('views.storageManagement.valid.fetchFile'), type: 'warning' })
              this.searchNameBtn(1)
            } else {
              this.$message({
                type: 'error',
                message: res.message
              })
            }
          })
        }
      })
    },
    // 删除文件
    deleteFile (id) {
      this.$confirm(this.$t('views.dialogText.deleteConfirm'), this.$t('views.dialogText.tip')).then(() => {
        this.$post('/storage/pseudofolderdelete', { folderid: id, force: 1, storage_id: this.storageId }).then(res => {
          if (res.code === 200) {
            this.$message({ message: res.message, type: 'success' })
          } else {
            this.$message({ message: res.message, type: 'error' })
          }
          this.searchNameBtn(2)
        })
      }).catch(() => {
        console.log('取消')
      })
    },
    deleteFile2 (id) {
      this.$post('/storage/pseudofolderdelete', { folderid: id, php_force: 1, force: 1, storage_id: this.storageId }).then(res => {
        if (res.code !== 200) {
          this.$message({ message: res.message, type: 'error' })
        }
      })
    },
    // 下载文件
    downloadFile (row) {
      const parms = {
        username: this.getterStorageUser.keyname,
        passwd: this.getterStorageUser.keypassword,
        filePath: row.path
      }
      this.$post(window.Simple.pingTai + '/filestorage/file/download', parms).then(res => {
        if (res && !res.state) {
          // 文件流保存
          let blob = new Blob([res], {
            type: 'application/octet-stream'
          })
          if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, row.name)
          } else {
            let link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = row.name
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(link.href)
          }
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    cacheFile (row) {
      this.getPingtai(row)
    },
    batchDeleteId () {
      if (this.fileKeyArr.length > 0) {
        this.deleteFile(this.fileKeyArr)
      } else {
        this.$message({ message: this.$t('views.dialogText.selectNull'), type: 'warning' })
      }
    },
    selectChange (rows) {
      this.fileKeyArr = []
      for (let i = 0; i < rows.length; i++) {
        this.fileKeyArr.push(rows[i].id)
      }
    },
    searchNameBtn (type = 0) {
      this.Pagination.page = 1
      this.getFileList(false, type)
    },
    resetNameBtn () {
      this.searchName = ''
      this.searchNameBtn(0)
    },
    pageChange () {
      this.getFileList(false, 0)
    },
    updateTable (obj) {
      // console.log(obj)
      if (!obj) return false
      //   this.targetPath = obj
      if (obj.status !== '1') {
        this.$message.warning(this.$t('views.storageManagement.valid.foldError'))
      } else {
        this.pid = obj.id
        this.searchName = ''
        this.params.id = obj.id
        this.Pagination.page = 1
        this.$refs.seduPathBreadcrumb.addPath(obj)
        this.getFileList(false, 0)
      }
    },
    getBackFileList (obj) {
      // console.log(obj)
      this.Pagination.page = 1
      this.pid = obj.id ? obj.id : 0
      this.searchName = ''
      this.params.id = obj.id
      this.getFileList(obj, 0)
    },
    getFileListCb (obj) {
      let prams = {
        pid: obj ? (obj.id ? obj.id : 0) : this.pid,
        storage_id: this.storageId,
        name: this.searchName
      }
      this.$post(this.apiFileList, { StorageObjectSearch: prams, page: this.Pagination.page, cb: 1 }).then(res => {
        this.tableData = [...res.data.storage_list]
        this.pageSize = res.data.per_page || 10
        this.Pagination.total_count = res.data.total_count
        // console.log(JSON.stringify(this.tableData))
        this.setFileIds()
      })
    },
    getFileList (obj, tongbu = 0) {
      // console.time('sort')
      this.listLoading = true
      let prams = {
        pid: obj ? (obj.id ? obj.id : 0) : this.pid,
        storage_id: this.storageId,
        name: this.searchName
      }
      this.$post(this.apiFileList, { StorageObjectSearch: prams, page: this.Pagination.page, tongbu_type: tongbu }).then(res => {
        this.tableData = [...res.data.storage_list]
        this.pageSize = res.data.per_page || 10
        this.Pagination.total_count = res.data.total_count
        this.listLoading = false
        // console.log(JSON.stringify(this.tableData))
        this.setFileIds()
      })
      // console.log(this.$parent)
      this.$parent.getStorageDetail()
    },
    creatTimer () { // koufei 20181112
      this.clearTimer()
      this.timerTim = setInterval(this.timer, 5000)
    },
    timer () { // koufei 20181112
      this.isGetObjectStatus()
    },
    clearTimer () { // koufei 20181112
      clearInterval(this.timerTim)
      this.timerTim = false
    },
    deleteRefresh () {
      let objectAffair = JSON.parse(localStorage.getItem('objectAffair'))
      if (objectAffair) {
        let arro = objectAffair
        this.$post('/storage/pseudofoldernamedelete', { ...arro }).then(res => {
          if (res.code !== 200) {
            this.$message({ message: res.message, type: 'error' })
          }
          this.initTable()
          localStorage.setItem('objectAffair', null)
        })
      } else {
        this.initTable()
      }
    },
    setFileIds () { // koufei 20181112Fil
      for (var object in this.tableData) {
        if (parseInt(this.tableData[object].status) === 0) { // 上传创建
          this.fileIds.push(this.tableData[object].id)
        }
        if (parseInt(this.tableData[object].dowoldstatus) === 2) { // 获取下载
          this.fildowonIds.push(this.tableData[object].id)
        }
      }
      this.isGetObjectStatus()
    },
    isGetObjectStatus () { // koufei 20181112
      // 判断如果有id直接请求接口
      // console.log(this.fildowonIds.length+'***'+this.fileIds.length)
      if (this.fileIds.length >= 1 || this.fildowonIds.length >= 1) {
        this.$post(this.fileIdsPath, { obgect_id: this.fileIds, fildowon_ids: this.fildowonIds }).then(res => {
          if (res.data.returnarr.length >= 1) {
            for (let returnObj in res.data.returnarr) {
              for (let tabObj in this.tableData) {
                if (parseInt(this.tableData[tabObj].id) === parseInt(res.data.returnarr[returnObj].id)) {
                  var offIndex = this.fileIds.indexOf(res.data.returnarr[returnObj].id)
                  // this.tableData[tabObj].status = res.data.returnarr[returnObj].status
                  this.getFileListCb()
                  if (offIndex > -1) {
                    this.fileIds.splice(offIndex, 1)
                  }
                  // 加数据
                  // if (parseInt(res.data.returnarr[returnObj].status) === 1) {
                  //   this.$parent.setNum(res.data.returnarr[returnObj])
                  // }
                }
              }
            }
          }
          // 是否获取
          if (res.data.returndow.length >= 1) {
            for (let returnObj in res.data.returndow) {
              for (let tabObj in this.tableData) {
                if (parseInt(this.tableData[tabObj].id) === parseInt(res.data.returndow[returnObj].id)) {
                  let offIndex = this.fildowonIds.indexOf(res.data.returndow[returnObj].id)
                  this.getFileListCb()
                  // this.tableData[tabObj].dowold = res.data.returndow[returnObj].dowold
                  // this.tableData[tabObj].dowoldstatus = res.data.returndow[returnObj].status
                  if (offIndex > -1) {
                    this.fildowonIds.splice(offIndex, 1)
                  }

                  // console.log(JSON.stringify(this.file_ids))
                }
              }
            }
          }
          if (!this.timerTim) {
            this.creatTimer()
          }
        })
      } else {
        this.clearTimer()
      }
    }

  }
}
</script>
