/*
 * @Author: aFei
 * @Date: 2018-08-21 14:19:58
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-21 14:32:47
*/
<template>
  <div>
    <div class="quota-title">
      <div class="item">
        <p class="item-top">
          {{$t("views.systemManagement.basicSettings")}}
        </p>
        <!-- 基础设置 -->
        <div class="content">
          <!-- <p>{{$t("views.systemManagement.language")}}</p>
          <el-select v-model="basis.content.languages"
                     :disabled="basis.disabled===true"
                     :placeholder='$t("views.systemManagement.chose")'>
            <el-option v-for="item in languageList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <span class='error'>{{basis.errorStr.languages}}</span> -->
          <p>{{$t("views.systemManagement.systemSetting.p5")}}</p>
          <el-input v-model="basis.content.page_num"
                    @blur='viladInput("basis.content.page_num", "basis.errorStr.page_num", 100)'
                    :disabled="basis.disabled===true"></el-input>
          <span class='error'>{{basis.errorStr.page_num}}</span>
          <p>{{$t("views.systemManagement.systemSetting.p6")}}</p>
          <el-input v-model="basis.content.user_create_num"
                    :disabled="basis.disabled===true"
                    @blur='viladInput("basis.content.user_create_num", "basis.errorStr.user_create_num", 10, limitNum[8])'></el-input>
          <span class='error'>{{basis.errorStr.user_create_num}}</span>
          <!-- <p>归档项目文档保存时间</p>
          <el-input v-model="basis.content.doc_save_day"
                    :disabled="basis.disabled===true"
                    @blur='viladInput("basis.content.doc_save_day", "basis.errorStr.doc_save_day", 30, 0)'>
            <template slot="append">天</template>
          </el-input>
          <span class='error'>{{basis.errorStr.doc_save_day}}</span> -->
        </div>
        <div class="controls">
          <el-button class="btn dark small"
                     @click="editBasis"
                     v-if="basis.disabled===true">{{$t("views.systemManagement.modify")}}</el-button>
          <el-button class="btn dark small"
                     @click="saveBasis"
                     v-if="basis.disabled===false">{{$t("views.systemManagement.save")}}</el-button>
        </div>
      </div>
      <div class="item">
        <p class="item-top">
          {{$t("views.systemManagement.mirrorParameterSetting")}}
        </p>
        <!-- 镜像参数设置 -->
        <div class="content">
          <p>{{$t("views.systemManagement.systemSetting.p7")}}</p>
          <el-input v-model="mirror.content.project_image_num"
                    :disabled="mirror.disabled===true"
                    @blur='viladInput("mirror.content.project_image_num", "mirror.errorStr.project_image_num", 100, limitNum[0])'>
          </el-input>
          <span class='error'>{{mirror.errorStr.project_image_num}}</span>
          <p>{{$t("views.systemManagement.systemSetting.p8")}}</p>
          <el-input v-model="mirror.content.personal_image_num"
                    :disabled="mirror.disabled===true"
                    @blur='viladInput("mirror.content.personal_image_num", "mirror.errorStr.personal_image_num", 100, limitNum[1])'>
          </el-input>
          <span class='error'>{{mirror.errorStr.personal_image_num}}</span>
        </div>
        <div class="controls">
          <el-button class="btn dark small"
                     @click="editMirror"
                     v-if="mirror.disabled===true">{{$t("views.systemManagement.modify")}}</el-button>
          <el-button class="btn dark small"
                     @click="saveMirror"
                     v-if="mirror.disabled===false">{{$t("views.systemManagement.save")}}</el-button>
        </div>
      </div>
      <div class="item">
        <p class="item-top">
          {{$t("views.systemManagement.personalSpaceResourceQuota")}}
        </p>
        <!-- 个人空间资源配额 -->
        <div class="content">
          <p>CPU</p>
          <el-input v-model="personal.content.cpu"
                    :disabled="personal.disabled===true"
                    @blur='viladInput("personal.content.cpu", "personal.errorStr.cpu", 48, limitNum[2])'>
            <template slot="append">核</template>
          </el-input>
          <span class='error'>{{personal.errorStr.cpu}}</span>
          <p>{{$t("views.systemManagement.RAM")}}</p>
          <el-input v-model="personal.content.memory"
                    :disabled="personal.disabled===true"
                    @blur='viladInput("personal.content.memory", "personal.errorStr.memory", 128, limitNum[3])'>
            <template slot="append">G</template>
          </el-input>
          <span class='error'>{{personal.errorStr.memory}}</span>
          <p>GPU</p>
          <el-input v-model="personal.content.gpu"
                    :disabled="true">
            <template slot="append">个</template>
          </el-input>
          <span class='error'></span>
        </div>
        <div class="controls">
          <el-button class="btn dark small"
                     @click="editPersonal"
                     v-if="personal.disabled===true">{{$t("views.systemManagement.modify")}}</el-button>
          <el-button class="btn dark small"
                     @click="savePersonal"
                     v-if="personal.disabled===false">{{$t("views.systemManagement.save")}}</el-button>
        </div>
      </div>
      <div class="item else">
        <p class="item-top">
          {{$t("views.systemManagement.storageSpaceParameterSetting")}}
        </p>
        <!-- 存储空间参数设置 -->
        <div class="content">
          <div class="group">
            <p>{{$t("views.systemManagement.systemSetting.p9")}}</p>
            <div class="group-content">
              <div class="group-content-item">
                <p>{{$t("views.systemManagement.systemSetting.p10")}}</p>
                <el-input v-model="storage.content.project_storage_size"
                          :disabled="storage.disabled===true"
                          @blur='viladInput("storage.content.project_storage_size", "storage.errorStr.project_storage_size", 1024, limitNum[4])'>
                  <template slot="append">G</template>
                </el-input>
                <span class='error'>{{storage.errorStr.project_storage_size}}</span>
              </div>
              <div class="group-content-item">
                <p>{{$t("views.systemManagement.count")}}</p>
                <el-input v-model="storage.content.project_storage_num"
                          :disabled="storage.disabled===true"
                          @blur='viladInput("storage.content.project_storage_num", "storage.errorStr.project_storage_num", 20, limitNum[5])'>
                  <template slot="append">个</template>
                </el-input>
                <span class='error'>{{storage.errorStr.project_storage_num}}</span>
              </div>
            </div>
          </div>
          <div class="group">
            <p>{{$t("views.systemManagement.systemSetting.p11")}}</p>
            <div class="group-content">
              <div class="group-content-item">
                <p>{{$t("views.systemManagement.systemSetting.p10")}}</p>
                <el-input v-model="storage.content.personal_storage_size"
                          :disabled="storage.disabled===true"
                          @blur='viladInput("storage.content.personal_storage_size", "storage.errorStr.personal_storage_size", 512, limitNum[6])'>
                  <template slot="append">G</template>
                </el-input>
                <span class='error'>{{storage.errorStr.personal_storage_size}}</span>
              </div>
              <div class="group-content-item">
                <p>{{$t("views.systemManagement.count")}}</p>
                <el-input v-model="storage.content.personal_storage_num"
                          :disabled="storage.disabled===true"
                          @blur='viladInput("storage.content.personal_storage_num", "storage.errorStr.personal_storage_num", 20, limitNum[7])'>
                  <template slot="append">个</template>
                </el-input>
                <span class='error'>{{storage.errorStr.personal_storage_num}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="controls">
          <el-button class="btn dark small"
                     @click="editStorage"
                     v-if="storage.disabled===true">{{$t("views.systemManagement.modify")}}</el-button>
          <el-button class="btn dark small"
                     @click="saveStorage"
                     v-if="storage.disabled===false">{{$t("views.systemManagement.save")}}</el-button>
        </div>
      </div>
    </div>
    <div class="quota-content">
      <p>{{$t("views.systemManagement.projectQuotaAdjustment")}}</p>
      <!-- 项目配额调整表格 -->
      <el-table class="tab-content"
                :data="tableData3.msg"
                v-loading="tableData3.loading"
                border>
        <el-table-column type="index"
                         :label='$t("views.systemManagement.serialNumber")'
                         align="center"
                         show-overflow-tooltip
                         width="50"></el-table-column>
        <el-table-column prop="name"
                         show-overflow-tooltip
                         :label='$t("views.systemManagement.projectName")'> </el-table-column>
        <el-table-column prop="userProfile.name"
                         show-overflow-tooltip
                         :label='$t("views.systemManagement.user")'></el-table-column>
        <el-table-column prop="created_at"
                         align="center"
                         width="180"
                         :label='$t("views.systemManagement.creationTime")'></el-table-column>
        <el-table-column prop="describe"
                         show-overflow-tooltip
                         :label='$t("views.systemManagement.projectDescription")'></el-table-column>
        <el-table-column :label='$t("views.systemManagement.operating")'
                         align="center"
                         width="140">
          <template slot-scope="scope">
            <button class="btn"
                    @click="setResource(scope.row)">{{$t("views.systemManagement.setResourceQuota")}}</button>
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
                     :current-page.sync="tableData3.Pagination.page"
                     :total="tableData3.Pagination.total_count"
                     @current-change="changePage('tableData3')"></el-pagination>

    </div>
  </div>
</template>

<script>
export default {
  name: 'quotaSetting',
  data () {
    return {
      limitNum: [10, 8, 24],
      linSelData: '',
      linTabData: '',
      linLoad: '',
      linUrl: '',
      languageList: [
        {value: '中文', label: '中文'},
        {value: '英文', label: 'English'}
      ],
      basis: {
        disabled: true,
        valided: true,
        errorStr: {
          languages: '',
          page_num: '',
          user_create_num: ''
        },
        content: {
          languages: '中文',
          page_num: '20',
          user_create_num: '5'
        }
      },
      mirror: {
        disabled: true,
        valided: true,
        errorStr: {
          project_image_num: '',
          personal_image_num: ''
        },
        content: {
          project_image_num: '10',
          personal_image_num: '10'
        }
      },
      personal: {
        disabled: true,
        valided: true,
        errorStr: {
          cpu: '',
          memory: '',
          gpu: ''
        },
        content: {
          cpu: '8',
          memory: '24',
          gpu: '1'
        }
      },
      storage: {
        disabled: true,
        valided: true,
        errorStr: {
          project_storage_size: '',
          project_storage_num: '',
          personal_storage_size: '',
          personal_storage_num: ''
        },
        content: {
          project_storage_size: '100',
          project_storage_num: '10',
          personal_storage_size: '50',
          personal_storage_num: '10'
        }
      },
      tableData3: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        url: '/system/allproject',
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        }
      },
      pageSize: 10
    }
  },
  methods: {
    getActiveTab (name) {
      // 获取当前展示的表格、搜索等信息
      this.linTabData = name
      this.linUrl = this[name].url
      this.initMsg()
    },
    clearSearch (name) {
      // 清除搜索条件
      for (let key in this[name].sel) {
        this[name].sel[key] = ''
      }
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1
      }
      this.getActiveTab(name)
    },
    changePage (name) {
      // 改变分页
      this.getActiveTab(name)
    },
    viladInput (input, errStr, num, mix = 1) {
      let arrInp = input.split('.')
      let arrErr = errStr.split('.')
      let isInit = this.limitInt(this[arrInp[0]][arrInp[1]][arrInp[2]], num, mix)
      console.log(isInit)
      if (isInit) {
        this[arrInp[0]].valided = true
        this[arrErr[0]][arrErr[1]][arrErr[2]] = ''
      } else {
        this[arrInp[0]].valided = false
        this[arrErr[0]][arrErr[1]][arrErr[2]] = `请输入${mix}~${num}的整数`
      }
    },
    // 验证非空输入
    limitNotNull (type) {
      if (type === 'basis') {
        return this.basis.content.page_num !== '' && this.basis.content.user_create_num !== ''
      }
      if (type === 'mirror') {
        return this.mirror.content.project_image_num !== '' && this.mirror.content.personal_image_num !== ''
      }
      if (type === 'personal') {
        return this.personal.content.cpu !== '' && this.personal.content.gpu !== '' && this.personal.content.memory !== ''
      }
      if (type === 'storage') {
        return this.storage.content.project_storage_size !== '' && this.storage.content.project_storage_num !== '' && this.storage.content.personal_storage_size !== '' && this.storage.content.personal_storage_num !== ''
      }
    },
    // 整数判断
    limitInt (num, limitNum, mix) {
      // console.log(num, mix)
      if ((num - 0) < mix) {
        return false
      } else if (num <= limitNum) {
        let regNum = /^\d+$/g
        return regNum.test(num)
      } else {
        return false
      }
    },
    initMsg () {
      this[this.linTabData].loading = true
      let lin = {}
      if (this[this.linTabData].Pagination !== undefined) {
        lin = Object.assign({}, this[this.linTabData].Pagination, {
          count: this.pageSize
        })
      }
      if (this[this.linTabData].sel !== undefined) {
        if (this[this.linTabData].sel.full_time !== undefined) {
          if (this[this.linTabData].sel.full_time === '' || this[this.linTabData].sel.full_time === null) {
            this[this.linTabData].sel.start_time = ''
            this[this.linTabData].sel.end_time = ''
          } else {
            this[this.linTabData].sel.start_time = this[this.linTabData].sel.full_time[0]
            this[this.linTabData].sel.end_time = this[this.linTabData].sel.full_time[1]
          }
        }
        lin = Object.assign({}, lin, this[this.linTabData].sel)
      }
      this.$axios.get(this[this.linTabData].url, { params: lin }).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.project_space
        // 数据处理
        this[this.linTabData].msg = [...tableDate]
        // 重置数据总数
        if (this[this.linTabData].Pagination !== undefined) {
          this[this.linTabData].Pagination.total_count =
                      data.data.data.total_count
        }
        this.pageSize = data.data.data.per_page
        this[this.linTabData].loading = false
      })
    },
    setResource (id) {
      this.$emit('setResource', id)
    },
    editBasis () {
      this.basis.disabled = false
    },
    saveBasis () {
      if (this.basis.valided) {
        let params = {}
        params.type = 'BasicConfig'
        params.log_type = 'system_config'
        params.data = {}
        params.data.language = this.basis.content.languages
        params.data.per_page = this.basis.content.page_num
        params.data.manage_project_num = this.basis.content.user_create_num
        // params.data.archive_save = this.basis.content.doc_save_day
        this.$post('/system/systemsetting', params).then(data => {
          this.basis.disabled = true
          if (data.code === 200) {
            this.$message({message: this.$t('views.notification.saved'), type: 'success'})
          } else {
            this.$message({message: data.message, type: 'warning'})
          }
        })
      }
    },
    editMirror () {
      this.mirror.disabled = false
    },
    saveMirror () {
      if (this.mirror.valided) {
        let params = {}
        params.type = 'ImageConfig'
        params.log_type = 'system_config'
        params.data = {}
        params.data.project_image_num = this.mirror.content.project_image_num
        params.data.personal_image_num = this.mirror.content.personal_image_num
        this.$post('/system/systemsetting', params).then(data => {
          this.mirror.disabled = true
          if (data.code === 200) {
            this.$message({message: this.$t('views.notification.saved'), type: 'success'})
          } else {
            this.$message({message: data.message, type: 'warning'})
          }
        })
      }
    },
    editPersonal () {
      this.personal.disabled = false
    },
    savePersonal () {
      if (this.personal.valided) {
        let params = {}
        params.type = 'PersonalResourceConfig'
        params.log_type = 'system_config'
        params.data = {}
        params.data.cpu = this.personal.content.cpu
        params.data.memory = this.personal.content.memory
        this.$post('/system/systemsetting', params).then(data => {
          this.personal.disabled = true
          if (data.code === 200) {
            this.$message({message: this.$t('views.notification.saved'), type: 'success'})
          } else {
            this.$message({message: data.message, type: 'warning'})
          }
        })
      }
    },
    editStorage () {
      this.storage.disabled = false
    },
    saveStorage () {
      if (this.storage.valided) {
        let params = {}
        params.type = 'StorageConfig'
        params.log_type = 'system_config'
        params.data = {}
        params.data.project_storage = this.storage.content.project_storage_size
        params.data.project_num = this.storage.content.project_storage_num
        params.data.personal_storage = this.storage.content.personal_storage_size
        params.data.personal_num = this.storage.content.personal_storage_num
        this.$post('/system/systemsetting', params).then(data => {
          this.storage.disabled = true
          if (data.code === 200) {
            this.$message({message: this.$t('views.notification.saved'), type: 'success'})
          } else {
            this.$message({message: data.message, type: 'warning'})
          }
        })
      }
    }
  },
  mounted () {
    this.getActiveTab('tableData3')
    this.$get('/system/systemconfig').then(data => {
      this.basis.content.languages = data.data.base_setting.language
      this.basis.content.user_create_num = data.data.base_setting.manage_project_num
      this.basis.content.page_num = data.data.base_setting.per_page
      // this.basis.content.doc_save_day = data.data.base_setting.archive_save
      this.mirror.content = {...data.data.images_setting}
      this.personal.content = {...data.data.person_space_setting}
      this.storage.content.project_storage_size = data.data.storage_param_setting.project_storage
      this.storage.content.project_storage_num = data.data.storage_param_setting.project_num
      this.storage.content.personal_storage_size = data.data.storage_param_setting.personal_storage
      this.storage.content.personal_storage_num = data.data.storage_param_setting.personal_num
      this.limitNum = [
        this.mirror.content.project_image_num,
        this.mirror.content.personal_image_num,
        this.personal.content.cpu,
        this.personal.content.memory,
        this.storage.content.project_storage_size,
        this.storage.content.project_storage_num,
        this.storage.content.personal_storage_size,
        this.storage.content.personal_storage_num,
        this.basis.content.user_create_num]
    })
  }
}
</script>
