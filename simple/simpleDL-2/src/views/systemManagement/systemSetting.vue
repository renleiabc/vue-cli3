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
    <el-tabs v-model="parentActiveName">
      <!-- 磁盘管理设置 -->
      <el-tab-pane :label='$t("views.systemManagement.diskManagementSettings")'
                   name="diskManagement">
        <disk-management @diskCleaning="diskCleaning"></disk-management>
      </el-tab-pane>
      <!-- 系统日志设置 -->
      <el-tab-pane :label='$t("views.systemManagement.systemLogSettings")'
                   name="logSetting"
                   :lazy="true">
        <div class="log-title">
          {{$t("views.systemManagement.systemLogSettings")}}：{{$t("views.systemManagement.systemSetting.p3")}}
          <el-select v-model="logTimeMsg"
                     clearable
                     filterable
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
      <!-- 系统配置设置 -->
      <el-tab-pane :label='$t("views.systemManagement.systemConfigurationSettings")'
                   name="quotaSetting"
                   :lazy="true">
        <quota-setting @setResource="setResource"></quota-setting>
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
               :title='$t("views.systemManagement.setResourceQuota")'
               :visible.sync="setResourcePop"
               width="50%">
      <div class="content">
        <el-form :model="resourceForm"
                 :rules="resourceFormRules"
                 ref="resourceForm"
                 label-width="80px">
          <el-form-item label="CPU"
                        prop="CPU">
            <el-input v-model="resourceForm.CPU"
                      placeholder="请输入100以内的数字"></el-input>
          </el-form-item>
          <el-form-item label="内存"
                        prop="memory">
            <el-input v-model="resourceForm.memory"
                      placeholder="请输入256以内的数字"></el-input>
          </el-form-item>
          <el-form-item label="GPU"
                        prop="GPU">
            <el-input v-model="resourceForm.GPU"
                      placeholder="请输入10以内的数字"></el-input>
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
import diskManagement from './components/diskManagement'
import quotaSetting from './components/quotaSetting'

export default {
  name: 'systemSetting',
  data () {
    var checkCPU = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空'))
      }
      if (this.limitInt(value, 128)) {
        callback()
      } else {
        callback(new Error('请输入1~128的整数'))
      }
    }
    var checkGPU = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空'))
      }
      if (this.limitInt(value, 16)) {
        callback()
      } else {
        callback(new Error('请输入1~256的整数'))
      }
    }
    var checkMemory = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空'))
      }
      if (this.limitInt(value, 256)) {
        callback()
      } else {
        callback(new Error('请输入1~16的整数'))
      }
    }
    return {
      parentActiveName: 'diskManagement', // 外面当前激活页
      resourceForm: {
        CPU: '',
        GPU: '',
        memory: ''
      },
      resourceFormRules: {
        CPU: [
          { validator: checkCPU, trigger: 'blur', required: true }
        ],
        GPU: [
          { validator: checkGPU, trigger: 'blur', required: true }
        ],
        memory: [
          { validator: checkMemory, trigger: 'blur', required: true }
        ]
      },
      logTime: [],
      logTimeMsg: '',
      diskCleaningPop: false,
      diskCleaningPopMsg: {
        node_id: '',
        clear_time: ''
      },
      setResourcePop: false,
      setResourcePopMsg: {
        project_id: '',
        quota_id: ''
      }
    }
  },
  methods: {
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
    setResource (id) {
      this.setResourcePopMsg.project_id = id
      this.setResourcePopMsg.quota_id = ''
      this.setResourcePop = true
    },
    // 整数判断
    limitInt (num, limitNum) {
      if ((num - 0) !== 0 && num <= limitNum) {
        let regNum = /^\d+$/g
        return regNum.test(num)
      } else {
        return false
      }
    },
    setResourcePopDo () {
      this.$axios.post('//rap2api.taobao.org/app/mock/21549/systemManagement/systemSetting/quotaSetting/change', this.setResourcePopMsg).then(data => {
        this.$message({message: '设置成功', type: 'success'})
        this.setResourcePop = false
      })
    },
    saveLogTime () {
      this.$axios.post('//rap2api.taobao.org/app/mock/21549/log-sys-setting', {month_nunber: this.logTimeMsg}).then(data => {
        this.$message({message: '保存成功', type: 'success'})
      })
    }
  },
  components: { diskManagement, quotaSetting },
  created () {
    this.$axios.get('//rap2api.taobao.org/app/mock/21549/log-sys-setting').then(data => {
      this.logTime = [...data.data.data.select_month]
    })
  }
}
</script>
