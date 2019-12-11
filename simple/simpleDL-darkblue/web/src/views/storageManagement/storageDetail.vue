/*
 * @Author: 少侠
 * @Date: 2018-08-08 14:22:29
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-10 16:32:20
 * @Description: 公共存储空间详情
 */

<template>
  <div class="storage-detail">
    <div style="padding:10px 0;">
      <div class="v-line">
        <span class="primary-color">{{$t("views.storageManagement.detail.baseInfo")}}</span>
      </div>
      <div class="clear-float"
           style="padding:10px 0;">
        <div class='base-info-v'>
          <div>
            <span>{{$t("views.storageManagement.storage.spaceName")}}：</span>
            <p class="text-ellipsis"
               :title="baseinfo.name">{{baseinfo.php_name}}</p>
            <!-- <i v-if="is_init!=1 || role==2"
               class="iconfont icon-edit edit-btn primary-color"
               @click="btnEditesStorageName"></i> -->
          </div>
          <div>
            <span>{{$t("views.storageManagement.detail.createTime")}}</span>
            <p>{{baseinfo.created_at}}</p>
          </div>
          <div v-if="baseinfo.porject_name">
            <span>{{$t('views.storageManagement.storage.belongSpace')}}：</span>
            <p>{{baseinfo.porject_name}}</p>
          </div>
          <div>
            <span>{{$t("views.storageManagement.detail.user")}}</span>
            <p>{{baseinfo.user}}</p>
            <a @click="showSpaceDesc">{{$t("views.storageManagement.detail.description")}}</a>
          </div>
        </div>
        <div class="num-space bg-blue">
          <i class="iconfont icon-duixiangliebiao-n"></i>
          <div class="text-desc">
            <p>{{$t("views.storageManagement.detail.objectNum")}}</p>
            <p>
              <span>{{baseinfo.numsdb || 0}}</span>个</p>
          </div>
        </div>
        <div class="num-space bg-yellow">
          <i class="iconfont icon-cunchu"
             style="font-size: 60px;"></i>
          <div class="text-desc">
            <p>{{$t("views.storageManagement.detail.sizeStorage")}}</p>
            <p>
              <span>{{numberFormatter(baseinfo.sizedb || 0, 2)}}</span>Byte</p>
          </div>
        </div>
      </div>
    </div>
    <fileManage ref="fileManage"></fileManage>
    <el-dialog :title='$t("views.storageManagement.detail.updateSpaceName")'
               :visible.sync="dialogSpaceName"
               class='small'>
      <div class="input-label">
        <span style="width:80px;">{{$t("views.storageManagement.storage.spaceName")}}</span>
        <el-input v-model="updateSpaceName"
                  maxlength="30"
                  size="medium"></el-input>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogSpaceName = false">{{$t('views.button.cancel')}}</el-button>
        <el-button type="primary"
                   class="primary"
                   @click="saveStorageName">{{$t('views.button.sure')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title='$t("views.storageManagement.detail.spaceDesc")'
               :before-close='closeSpaceDesc'
               :visible.sync="dialogSpaceDesc"
               class='small'>
      <div class="input-label">
        <div v-if="boolSpaceDesc">
          <p style="line-height:150%;word-break: break-all;">{{this.updateSpaceDesc || '暂无信息'}}</p>
        </div>
        <el-input v-else
                  maxlength="200"
                  v-model="updateSpaceDesc"
                  placeholder="暂无信息"
                  rows='6'
                  type="textarea"></el-input>
      </div>
      <div slot="footer"
           v-if="is_init!=1 || role==2"
           class="dialog-footer">
        <el-button v-if='boolSpaceDesc'
                   type="primary"
                   class="primary"
                   @click="saveStorageDesc">{{$t('views.button.edit')}}</el-button>
        <el-button v-else
                   type="primary"
                   class="primary"
                   @click="saveStorageDesc">{{$t('views.button.save')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {valiName} from '@/util/validate'
import fileManage from './fileManagement'
export default {
  name: 'storageDetail',
  components: {
    fileManage
  },
  data () {
    return {
      is_init: 0,
      dialogSpaceName: false,
      dialogSpaceDesc: false,
      used_storage_numer: 0,
      count_project_storage: 0,
      updateSpaceName: '',
      updateSpaceDesc: '',
      boolSpaceDesc: true,
      baseinfo: {
        sid: '',
        user_name: '',
        created_at: '',
        describe: '',
        sizebytes: 0,
        php_name: ''
      }
    }
  },
  methods: {
    btnEditesStorageName () {
      this.dialogSpaceName = true
      this.updateSpaceName = this.baseinfo.php_name
    },
    saveStorageName () {
      let parms = {}
      if (!this.updateSpaceName.trim()) {
        this.$message({ message: this.$t('views.storageManagement.valid.notNullName'), type: 'error' })
        return false
      }
      if (!valiName(this.updateSpaceName.trim())) {
        this.$message({ message: this.$t('views.storageManagement.valid.regStr'), type: 'error' })
        return false
      }
      parms.is_init = this.is_init
      parms.php_name = this.updateSpaceName
      this.$post('/storage/storagecreate', {id: this.$route.query.id, Storage: parms}).then(res => {
        if (res.code === 200) {
          this.dialogSpaceName = false
          this.$message({ message: this.$t('views.notification.saved'), type: 'success' })
          this.baseinfo.php_name = this.updateSpaceName
        }
      })
    },
    showSpaceDesc () {
      this.dialogSpaceDesc = true
      this.updateSpaceDesc = this.baseinfo.describe
    },
    closeSpaceDesc (done) {
      this.boolSpaceDesc = true
      done()
    },
    saveStorageDesc () {
      let parms = {}
      if (!this.boolSpaceDesc) {
        // if (!this.updateSpaceDesc.trim()) {
        //   this.$message({ message: this.$t('views.storageManagement.valid.notNullDes'), type: 'error' })
        //   return false
        // }
        parms.is_init = this.is_init
        parms.describe = this.updateSpaceDesc
        this.$post('/storage/storagecreate', {id: this.$route.query.id, Storage: parms}).then(res => {
          if (res.code === 200) {
            this.$message({ message: this.$t('views.notification.saved'), type: 'success' })
            this.baseinfo.describe = this.updateSpaceDesc
            this.dialogSpaceDesc = false
          }
        })
      }
      this.boolSpaceDesc = !this.boolSpaceDesc
    },
    getStorageDetail () {
      this.$get('/storage/storagedetails', { storage_id: this.$route.query.id }).then(res => {
        this.baseinfo = {...res.data}
      })
    }
    // setNum (obj) { // koufei 设置数值
    //   this.baseinfo.numsdb = Number(this.baseinfo.numsdb) + Number(1)
    //   if (parseInt(obj.type) === 2) {
    //     this.baseinfo.sizebytes = Number(this.baseinfo.sizebytes) + Number(obj.size)
    //     // console.log(obj)
    //   }
    // }
  },
  created () {
    // this.$refs.fileManage.kk()
    this.role = JSON.parse(sessionStorage.getItem('userinfo')).role
    this.baseinfo.sid = this.$route.query.id
    this.is_init = this.$route.query.is_init
    // this.getStorageDetail()
  }
}
</script>
