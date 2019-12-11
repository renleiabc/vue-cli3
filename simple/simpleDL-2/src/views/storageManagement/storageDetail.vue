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
        <span class="primary-color">基本信息</span>
      </div>
      <div class="clear-float"
           style="padding:10px 0;">
        <div class='base-info-v'>
          <div>
            <span>空间名称：</span>
            <p class="text-ellipsis"
               :title="baseinfo.name">{{baseinfo.name}}</p>
            <i class="iconfont icon-edit edit-btn primary-color"
               @click="btnEditesStorageName"></i>
          </div>
          <div>
            <span>创建时间：</span>
            <p>{{baseinfo.created_at}}</p>
          </div>
          <div>
            <span>拥有者：</span>
            <p>{{baseinfo.user}}</p>
            <a @click="showSpaceDesc">查看空间描述</a>
          </div>
        </div>
        <!-- <div class="num-space bg-blue">
          <i class="iconfont icon-duixiangliebiao-n"></i>
          <div class="text-desc">
            <p>对象数量</p>
            <p>
              <span>{{baseinfo.objectcount}}</span>个</p>
          </div>
        </div> -->
        <div class="num-space bg-blue">
          <div class="text-desc">
            <p>存储用量</p>
            <p>
              <span>{{numberFormatter(baseinfo.sizebytes)}}</span>
            </p>
          </div>
          <i class="iconfont icon-baocun"
             style="font-size: 60px;"></i>
        </div>
      </div>
    </div>
    <fileManage></fileManage>
    <el-dialog title="修改空间名称"
               :visible.sync="dialogSpaceName"
               class='small'>
      <div class="input-label">
        <span style="width:80px;">空间名称</span>
        <el-input v-model="updateSpaceName"
                  maxlength="30"
                  size="medium"></el-input>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogSpaceName = false">取消</el-button>
        <el-button type="primary"
                   class="primary"
                   @click="saveStorageName">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="空间描述"
               :before-close='closeSpaceDesc'
               :visible.sync="dialogSpaceDesc"
               class='small'>
      <div class="input-label">
        <div v-if="boolSpaceDesc">
          <p style="line-height:150%;">{{this.updateSpaceDesc}}</p>
        </div>
        <el-input v-else
                  maxlength="200"
                  v-model="updateSpaceDesc"
                  rows='6'
                  type="textarea"></el-input>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button v-if='boolSpaceDesc'
                   type="primary"
                   class="primary"
                   @click="saveStorageDesc">编辑</el-button>
        <el-button v-else
                   type="primary"
                   class="primary"
                   @click="saveStorageDesc">保存</el-button>
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
        id: '',
        user_name: '',
        created_at: '',
        sizebytes: 0,
        describe: '',
        name: ''
      }
    }
  },
  methods: {
    btnEditesStorageName () {
      this.dialogSpaceName = true
      this.updateSpaceName = this.baseinfo.name
    },
    saveStorageName () {
      let parms = {}
      if (!this.updateSpaceName.trim()) {
        this.$message({ message: '空间名称不能为空', type: 'error' })
        return false
      }
      if (!valiName(this.updateSpaceName.trim())) {
        this.$message({ message: "存储空间名称不能包含<>:\\'\"/.", type: 'error' })
        return false
      }
      parms.is_init = this.is_init
      parms.name = this.updateSpaceName
      this.$post('/storage/storagecreate', {id: this.baseinfo.id, Storage: parms}).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.dialogSpaceName = false
          this.$message({ message: this.$t('views.notification.saved'), type: 'success' })
          this.baseinfo.name = this.updateSpaceName
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
        if (!this.updateSpaceDesc.trim()) {
          this.$message({ message: '描述不能为空', type: 'error' })
          return false
        }
        parms.is_init = this.is_init
        parms.describe = this.updateSpaceDesc
        this.$post('/storage/storagecreate', {id: this.baseinfo.id, Storage: parms}).then(res => {
          console.log(res)
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
      this.$get('/storage/storagedetails', { storage_id: this.baseinfo.id }).then(res => {
        this.baseinfo = {...res.data}
      })
    }
  },
  created () {
    this.baseinfo.id = this.$route.query.id
    this.is_init = this.$route.query.is_init
    this.getStorageDetail()
  }
}
</script>
