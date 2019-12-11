/*
* @Author: aFei
* @Date: 2018-07-10 15:52:29
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-21 14:33:55
*/
<template>
  <div class="views-system-management-system-setting">
    <el-tabs v-model="parentActiveName"
             @tab-click="clickSettingTabs">
      <!-- 系统配置设置 -->
      <el-tab-pane :label='$t("views.systemManagement.systemConfigurationSettings")'
                   name="quotaSetting"
                   :lazy="true">
        <quota-setting ref="quota"
                       @setResource="setResource"></quota-setting>
      </el-tab-pane>
      <!-- 系统日志设置 -->
      <el-tab-pane :label='$t("views.systemManagement.systemLogSettings")'
                   name="logSetting"
                   :lazy="true">
        <div class="log-title">
          {{$t("views.systemManagement.systemLogSettings")}}：{{$t("views.systemManagement.systemSetting.p3")}}
          <el-select v-model="logTimeMsg"
                     :placeholder='$t("views.systemManagement.chose")'>
            <el-option v-for="item in logTime"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          {{$t("views.systemManagement.systemSetting.p4")}}
          <el-button class="btn dark small"
                     @click="saveLogTime">{{$t("views.systemManagement.save")}}</el-button>
        </div>
      </el-tab-pane>
      <!-- 系统告警设置 -->
      <el-tab-pane :label='$t("views.systemManagement.warnManagementSettings")'
                   name="diskManagement">
        <div class="disk-title">
          {{$t("views.systemManagement.warnManagementSettings")}}：{{$t("views.systemManagement.systemSetting.p1")}}
          <el-select v-model="warnTimeMsg"
                     :placeholder='$t("views.systemManagement.chose")'>
            <el-option v-for="item in logTime"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          {{$t("views.systemManagement.systemSetting.p2")}}
          <el-button class="btn dark small"
                     @click="saveWarnTime">{{$t("views.systemManagement.save")}}</el-button>
        </div>
        <warn-management ref="warnManage"
                         @diskCleaning="diskCleaning"></warn-management>
      </el-tab-pane>
    </el-tabs>
    <el-dialog class="diskCleaningPop small"
               :title='$t("views.systemManagement.diskCleaning")'
               :visible.sync="diskCleaningPop"
               width="30%">
      <div class="content">
        {{$t("views.systemManagement.clean")}}
        <el-date-picker v-model="diskCleaningPopMsg.clear_time"
                        type="date"
                        :placeholder='$t("views.systemManagement.chose")'></el-date-picker>
        {{$t("views.systemManagement.systemSetting.p12")}}
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="cancel"
                   @click="diskCleaningPop = false">{{$t("views.systemManagement.cancel")}}</el-button>
        <el-button class="primary"
                   type="primary"
                   @click="diskCleaningPopDo">{{$t("views.systemManagement.start")}}</el-button>
      </span>
    </el-dialog>
    <el-dialog class="small"
               @close='handleClose2'
               :title='$t("views.systemManagement.setResourceQuota")'
               :visible.sync="setResourcePop"
               width="50%">
      <div class="content">
        <el-form :model="resourceForm"
                 :rules="resourceFormRules"
                 ref="resourceForm"
                 label-width="80px">
          <el-form-item label="CPU"
                        prop="cpu">
            <el-input v-model="resourceForm.cpu"></el-input>
          </el-form-item>
          <el-form-item label="内存"
                        prop="memory">
            <el-input v-model="resourceForm.memory"></el-input>
          </el-form-item>
          <el-form-item label="GPU"
                        prop="gpu">
            <el-input v-model="resourceForm.gpu"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="cancel"
                   @click="setResourcePop = false">{{$t("views.systemManagement.cancel")}}</el-button>
        <el-button class="primary"
                   type="primary"
                   @click="setResourcePopDo">{{$t("views.systemManagement.save")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import warnManagement from './components/warnManagement'
import quotaSetting from './components/quotaSetting'

export default {
  name: 'systemSetting',
  data () {
    var checkCPU = (rule, value, callback) => {
      if (!value) {
        return callback(this.$t('views.validError.notNull'))
      }
      if (this.limitInt(value, 128, this.selectRow.cpu)) {
        callback()
      } else {
        callback(new Error(this.$t('views.systemManagement.limeNum', {mix: this.selectRow.cpu || 1, num: 128})))
      }
    }
    var checkGPU = (rule, value, callback) => {
      if (!value) {
        return callback(this.$t('views.validError.notNull'))
      }
      if (this.limitInt(value, 16, this.selectRow.gpu)) {
        callback()
      } else {
        callback(new Error(this.$t('views.systemManagement.limeNum', {mix: this.selectRow.gpu || 1, num: 16})))
      }
    }
    var checkMemory = (rule, value, callback) => {
      if (!value) {
        return callback(this.$t('views.validError.notNull'))
      }
      if (this.limitInt(value, 256, this.selectRow.memory)) {
        callback()
      } else {
        callback(new Error(this.$t('views.systemManagement.limeNum', {mix: this.selectRow.memory || 1, num: 256})))
      }
    }
    return {
      parentActiveName: 'quotaSetting', // 外面当前激活页
      resourceForm: {
        cpu: '',
        gpu: '',
        memory: ''
      },
      resourceFormRules: {
        cpu: [
          { validator: checkCPU, trigger: 'blur', required: true }
        ],
        gpu: [
          { validator: checkGPU, trigger: 'blur', required: true }
        ],
        memory: [
          { validator: checkMemory, trigger: 'blur', required: true }
        ]
      },
      logTime: [],
      warnTimeMsg: 3,
      logTimeMsg: '',
      diskCleaningPop: false,
      diskCleaningPopMsg: {
        node_id: '',
        clear_time: ''
      },
      setResourcePop: false,
      setResourcePopMsg: {
        project_id: ''
      }
    }
  },
  methods: {
    // 整数判断
    limitInt (num, limitNum, mix) {
      // console.log(num, mix)
      if ((num - 0) < mix) {
        return false
      } else if ((num - 0) !== 0 && num <= limitNum) {
        let regNum = /^\d+$/g
        return regNum.test(num)
      } else {
        return false
      }
    },
    diskCleaning (id) {
      this.diskCleaningPopMsg.clear_time = ''
      this.diskCleaningPopMsg.node_id = id
      this.diskCleaningPop = true
    },
    diskCleaningPopDo () {
      this.$axios.post('/clear-disk', this.diskCleaningPopMsg).then(data => {
        this.diskCleaningPop = false
      })
    },
    clickSettingTabs () {
      switch (this.parentActiveName) { // 对应tabs的name
        case 'warnManagement':
          // this.$refs.diskManage.initMsgTabs()
          break
        case 'logSetting':
          break
        case 'quotaSetting':
          if (this.$refs.quota) {
            this.$refs.quota.initMsg()
          }
          break
      }
    },
    setResource (row) {
      this.setResourcePopMsg.project_id = row.id
      if (row) {
        this.resourceForm.cpu = row.cpu
        this.resourceForm.gpu = row.gpu
        this.resourceForm.memory = row.memory
        this.selectRow = row
      } else {
        setTimeout(() => { this.$refs['resourceForm'].resetFields() }, 0)
      }
      this.setResourcePop = true
    },
    setResourcePopDo () {
      this.$refs['resourceForm'].validate((valid) => {
        if (valid) {
          this.$post('/system/setprojectconfig', {...this.setResourcePopMsg, ...this.resourceForm}).then(data => {
            if (data.code === 200) {
              this.$message({message: this.$t('views.notification.succeed'), type: 'success'})
              this.$refs.quota.getActiveTab('tableData3')
              this.setResourcePop = false
            } else {
              this.$message({message: data.message, type: 'error'})
            }
          })
        }
      })
    },
    handleClose2 () {
      this.$refs['resourceForm'].resetFields()
    },
    saveWarnTime () {
      let params = {}
      params.type = 'BasicConfig'
      params.log_type = 'system_warning'
      params.data = {}
      params.data.warning_save = this.warnTimeMsg
      this.$post('/system/systemsetting', params).then(data => {
        if (data.code === 200) {
          this.$message({message: this.$t('views.notification.saved'), type: 'success'})
        } else {
          this.$message({message: data.message, type: 'warning'})
        }
      })
    },
    saveLogTime () {
      let params = {}
      params.type = 'BasicConfig'
      params.log_type = 'system_log'
      params.data = {}
      params.data.system_save = this.logTimeMsg
      this.$post('/system/systemsetting', params).then(data => {
        if (data.code === 200) {
          this.$message({message: this.$t('views.notification.saved'), type: 'success'})
        } else {
          this.$message({message: data.message, type: 'warning'})
        }
      })
    }
  },
  components: { warnManagement, quotaSetting },
  created () {
    this.$axios.get('/system/systemconfig').then(data => {
      this.logTime = [...data.data.data.system_save]
      this.warnTimeMsg = data.data.data.base_setting.warning_save - 0
      this.logTimeMsg = data.data.data.base_setting.system_save - 0
    })
  }
}
</script>
