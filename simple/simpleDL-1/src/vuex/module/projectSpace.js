import { get, post } from '../../util/http'
import { Message } from 'element-ui'
import qs from 'qs'
// 下载文件的方法

function linkDown (path) {
  let link = document.createElement('a')
  link.href = path
  link.download = 'log.text'
  document.body.appendChild(link)
  setTimeout(res => {
    link.click()
    document.body.removeChild(link)
  }, 10)
}
const projectSpace = {
  state: {
    get: 0,
    optionsStatus: '',
    username: '',
    memberManage: '',
    environmentstatus: '',
    practicestatus: '',
    practiceengine: '',
    imagecategorylist: '',
    projectconfig: '',
    modelstatus: '',
    modelengine: '',
    environmentmount: '',
    timestatus: '',
    projectpath: '',
    type_file: '',
    personalconfig: '',
    ineversion: '',
    version: '',
    faceType: '',
    logFile: '',
    practicenode: '',
    storage_id: [],
    storage_object_id: []
  },
  mutations: {
    // 项目状态数据处理
    projectStatus (state, res) {
      if (res.code === 200) {
        state.optionsStatus = res.data.project_status
        // console.log(state.optionsStatus)
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 所属用户数据处理
    belongname (state, res) {
      //  console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.username = res.data
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 成员列表数据处理
    showuser (state, res) {
      if (res.code === 200) {
        let member = res.data.member_manage
        let exist = res.data.exist_user_id
        console.log(exist)
        if (exist.length !== 0) {
          member.forEach((item, i) => {
            exist.forEach(ele => {
              if (item.user_id === ele) {
                item.disabled = true
              }
            })
          })
        }
        //  console.log(JSON.stringify(member))
        state.memberManage = member
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 开发环境状态数据处理
    environmentstatus (state, res) {
      //  console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.environmentstatus = res.data.develop_status
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 训练任务状态数据处理
    practicestatus (state, res) {
      // console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.practicestatus = res.data.practice_status
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 训练任务引擎类型数据处理
    practiceengine (state, res) {
      // console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.practiceengine = res.data.engine_type
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 镜像分类数据处理
    imagecategorylist (state, res) {
      //  console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.imagecategorylist = res.data
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 项目配额限制数据处理
    projectconfig (state, res) {
      // console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.projectconfig = res.data
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 模型预测状态数据处理
    modelstatus (state, res) {
      // console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.modelstatus = res.data.model_status
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 模型预测引擎类型数据处理
    modelengine (state, res) {
      // console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.modelengine = res.data.engine_type
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // //训练任务获取公共存储列表信息
    projectpath (state, data) {
      let key = 's3://' + data.label
      state.projectpath = ''
      state.projectpath = {
        [key]: {
          accessid: data.accessid,
          accesskey: data.accesskey,
          mount_flag: data.mount_flag,
          s3_path: key
        },
        type: data.type,
        storage_object_id: data.id,
        storage_id: data.storage_id
      }
    },
    // 清空state.storage_object_id和state.storage_id数据
    storageData () {

    },
    // 获取时间状态信息数据处理
    timestatus (state, res) {
      // console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.timestatus = res.data.time_status
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 个人空间配额以及已用配额数据处理
    personalconfig (state, res) {
      // console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.personalconfig = res.data
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 获取版本信息数据处理
    practiceengineversion (state, res) {
      // console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.ineversion = res.data
        state.version = res.data.tensorflow
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 获取版本信息数据处理
    changeVersion (state, str) {
      if (str === 'caffe') {
        state.version = state.ineversion.caffe
      } else if (str === 'tensorflow') {
        state.version = state.ineversion.tensorflow
      }
    },
    // 接口类型数据处理
    modelinterfacetype (state, res) {
      // console.log(JSON.stringify(res))
      if (res.code === 200) {
        state.faceType = res.data.interface_type
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 下载日志文件
    downloadlog (state, res) {
      console.log(JSON.parse(localStorage.getItem('userinfo')).access_token)
      let link =
                process.env.API_HOST +
                '/v1/practiceproject/downloadlog?access-token=' +
                JSON.parse(localStorage.getItem('userinfo')).access_token +
                ' & ' +
                qs.stringify(res)
      linkDown(link)
    },
    // 训练任务节点
    practicenode (state, res) {
      console.log(JSON.stringify(res.data))
      if (res.code === 200) {
        if (res.data.length === 0) {
          state.practicenode = [
            { label: '无数据', value: '' }
          ]
        } else {
          state.practicenode = [
            { label: '全部', value: '' },
            ...res.data.practice_node
          ]
        }
      } else {
        Message({
          message: res.message,
          type: 'error'
        })
      }
    }
  },
  actions: {
    // 请求项目状态
    getProjectStatus (context) {
      get('/project/projectstatus').then(res => {
        context.commit('projectStatus', res)
      })
    },
    // 请求所属用户
    getBelongname (context) {
      get('/project/belongname').then(res => {
        context.commit('belongname', res)
      })
    },
    // 成员列表
    getShowuser (context, obj) {
      get('/project/showuser', obj).then(res => {
        context.commit('showuser', res)
      })
    },
    // 请求开发环境状态
    getEnvironmentstatus (context) {
      get('/environmentproject/environmentstatus').then(res => {
        context.commit('environmentstatus', res)
      })
    },
    // 请求训练任务状态
    getPracticestatus (context) {
      get('/practiceproject/practicestatus').then(res => {
        context.commit('practicestatus', res)
      })
    },
    // 请求引擎类型
    getPracticeengine (context) {
      get('/practiceproject/practiceengine').then(res => {
        context.commit('practiceengine', res)
      })
    },
    // 请求镜像分类列表
    getImagecategorylist (context) {
      get('/image/imagecategorylist').then(res => {
        context.commit('imagecategorylist', res)
      })
    },
    // 请求项目配额限制
    getProjectconfig (context, obj) {
      get('/environmentproject/projectconfig', obj).then(res => {
        context.commit('projectconfig', res)
      })
    },
    // 请求模型预测状态
    getModelstatus (context, obj) {
      get('/model/modelstatus').then(res => {
        context.commit('modelstatus', res)
      })
    },
    // 请求模型预测引擎类型
    getModelengine (context) {
      get('/model/modelengine').then(res => {
        context.commit('modelengine', res)
      })
    },
    // 个人空间配额以及已用配额
    getPersonalconfig (context) {
      get('/personal/personalconfig').then(res => {
        context.commit('personalconfig', res)
      })
    },
    // 获取时间状态信息
    getTimestatus (context) {
      get('/environmentproject/timestatus').then(res => {
        context.commit('timestatus', res)
      })
    },
    // 获取版本信息
    getPracticeengineversion (context) {
      get('/practiceproject/practiceengineversion').then(res => {
        context.commit('practiceengineversion', res)
      })
    },
    // 接口类型
    getModelinterfacetype (context) {
      get('/model/modelinterfacetype').then(res => {
        context.commit('modelinterfacetype', res)
      })
    },
    // 训练任务节点
    postPracticenode (context, obj) {
      post('/practiceproject/practicenode', obj).then(res => {
        context.commit('practicenode', res)
      })
    }
  },
  getters: {
    postProjectStatus: state => state.optionsStatus,
    postBelongname: state => state.username,
    postMemberManage: state => state.memberManage,
    postEnvironmentstatus: state => state.environmentstatus,
    postPracticestatus: state => state.practicestatus,
    postPracticeengine: state => state.practiceengine,
    postImagecategorylist: state => state.imagecategorylist,
    postProjectconfig: state => state.projectconfig,
    postModelstatus: state => state.modelstatus,
    postModelengine: state => state.modelengine,
    postEnvironmentmount: state => state.environmentmount,
    postTimestatus: state => state.timestatus,
    postProjectpath: state => state.projectpath,
    postPersonalconfig: state => state.personalconfig,
    postVersion: state => state.version,
    postFaceType: state => state.faceType,
    postPracticenode: state => state.practicenode
  }
}
export default projectSpace
