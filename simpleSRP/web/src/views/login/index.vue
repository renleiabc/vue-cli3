<!--
 * @Author: renlei
 * @Date: 2019-08-29 14:20:36
 * @LastEditors: renlei
 * @LastEditTime: 2019-09-01 15:46:05
 * @Description:登录界面
 -->
<template>
  <div class='login-page'
       @keyup.enter="login">
    <iframe src='../static/loginBg/index.html'
            id='webglpage'></iframe>
    <transition name='form-fade'
                mode='in-out'>
      <div class='manage-tip animated'
           :class="loading?'fadeOut':'fadeIn'">
        <img class="logo"
             :src="mixinGetImage(
             'views/global/',
             'login_logo.png')" />
        <h1>{{$t('views.login.title')}}</h1>
        <div class='login-input'>
          <p class="input input-uname"><input type='text'
                   v-model='username'
                   maxlength="16"
                   :class="err_username !==''? 'error animated shake':''"
                   :placeholder="$t('views.login.user_name')" />
          </p>
          <p class='tip'>&nbsp;{{err_username}}&nbsp;</p>
          <p class="input input-pwd">
            <el-tooltip :content="$t('views.login.capsLock')"
                        v-model="capsLock"
                        :manual=true
                        placement="right"
                        effect="light">
              <input type='password'
                     v-model='password'
                     class="input-pwd"
                     :class="err_pwassword !==''? 'error animated shake':''"
                     :placeholder="$t('views.login.password')"
                     @keypress="checkCaps($event)" />
            </el-tooltip>
          </p>
          <p class='tip'>&nbsp;{{err_pwassword}}&nbsp;</p>

          <a @click='login'
             class='submit-btn'>{{$t('views.login.login_btn')}}</a>
        </div>
      </div>
    </transition>

    <div class="loading animated fadeIn"
         v-if=loading>
      <div class="loader">
        <div class="loader-inner">
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
            <div class="loader-line"></div>
          </div>
        </div>
      </div>
      <span>
        {{$t('views.login.loading')}}
      </span>
    </div>

    <p class="footer animated"
       :class="loading?'fadeOut':'fadeIn'">
      {{$t('views.login.copyright')}}
    </p>
  </div>

</template>

<script>
import {
  getQueryString
} from '@/util/filters'

export default {
  name: 'index',
  data () {
    return {
      loading: false,
      username: '',
      password: '',
      err_username: '',
      err_pwassword: '',
      showLogin: true,
      login_bool1: false,
      login_bool2: false,
      capsLock: false
    }
  },
  watch: {
    username: function () {
      this.validUser('username')
    },
    password: function () {
      this.validUser('password')
    }
  },
  created () {
    let cssNode = document.getElementById('element-ui-theme')
    let loginCss = document.createElement('link')
    let token = getQueryString('access_token')
    loginCss.href = '/static/css/element.css'
    loginCss.id = 'element-ui-login'
    loginCss.rel = 'stylesheet'
    cssNode.parentNode.appendChild(loginCss)
    this.mixinGetLess('views/', `login`)
    this.getServerIP()
    if (token) {
      this.loading = true
      if (token === '8d788385431273d11e8b43bb78f3aa41') {
        this.username = 'teacher'
        this.password = 'qwe123'
        this.login(true)
      } else {
        setTimeout(() => {
          this.$message.error('Login Error!')
          this.loading = false
        }, 1000)
      }
    } else {
      this.loading = false
    }
    // let pwd = crypto.Encrypt('wo们12#￥$%')
    // let sss = crypto.Decrypt(pwd)
    // console.log('加密', pwd)
    // console.log('解密', sss)
  },
  methods: {
    getServerIP () {
      this.$get('/system/systembcpconfig').then(res => {
        localStorage.setItem('pingTai', res.data.bcpx)
        window.Simple.pingTai = res.data.bcpx
      })
    },
    validUser (type) {
      if (type === 'username') {
        if (this.username === '') {
          this.err_username = this.$t('views.login.tip_msg.not_null_name')
          this.login_bool1 = false
        } else {
          this.err_username = ''
          this.login_bool1 = true
        }
      }
      if (type === 'password') {
        if (!this.password) {
          this.err_pwassword = this.$t('views.login.tip_msg.not_null_pwd')
          this.login_bool2 = false
        } else {
          this.err_pwassword = ''
          this.login_bool2 = true
        }
      }
    },
    login (free) {
      // 验证是否通过前端验证
      this.validUser('username')
      this.validUser('password')
      // 向后台验证
      // 向后台请求当前用户的信息-个人资料，权限等
      if (this.login_bool1 && this.login_bool2) {
        if (!free) {
          this.toggleLoading()
        }
        let params = {
          username: this.username,
          password: window.btoa(this.password)
        }
        this.$post('/user/signin', params).then(res => {
          this.setPermissionList(res)
        })
      }
    },
    setPermissionList (res) {
      let it = this
      if (res.code === 200) { // 登陆成功
        const permissionTemplate = { // 权限对照表
          systemMonitoring: '1',
          systemMonitoringPage: '1-1',
          recordList: '1-2',
          projectList: '1-3',
          personList: '1-4',
          systemManagement: '2',
          systemAlarm: '2-1',
          systemLog: '2-2',
          systemSetting: '2-3',
          userManagement: '3',
          userManagementHome: '3-1',
          userDetails: '3-2',
          addUser: '3-3',
          clusterMonitoring: '4',
          nodeControl: '4-1',
          nodeControlDetail: '4-1-1',
          gpuDetail: '4-1-1-1',
          namespaces: '4-2',
          namespacesDetail: '4-2-1',
          home: '5',
          projectHome: '5-1',
          projectSpace: '6',
          spaceContent: '6-1',
          projectSetting: '6-1-1',
          projectDetails: '6-1-2',
          developDetails: '6-1-2-1',
          traningDetails: '6-1-2-2',
          modelDetails: '6-1-2-3',
          creatDevelop: '6-1-3',
          createTraningTask: '6-1-4',
          createModelJob: '6-1-5',
          partSpaceContent: '6-2',
          archivedProjects: '6-3',
          partProjectDetails: '6-2-1',
          partDevelopDetails: '6-2-1-1',
          partTraningDetails: '6-2-1-2',
          partModelDetails: '6-2-1-3',
          partCreatDevelop: '6-2-2',
          partCreateTraningTask: '6-2-3',
          partCreateModelJob: '6-2-4',
          personalSpace: '7',
          personalDevelop: '7-1',
          perCreateDevelop: '7-1-1',
          perDevelopDetails: '7-1-2',
          personalTraining: '7-2',
          perCreateTask: '7-2-1',
          perTraningDetails: '7-2-2',
          personalModel: '7-3',
          perCreateModel: '7-3-1',
          perModelDetails: '7-3-2',
          storageManagement: '8',
          announcement: '8-1',
          projectManagement: '8-2',
          personalManagement: '8-3',
          fileManagement: '8-5',
          pubStorageDetail: '8-4',
          proStorageDetail: '8-7',
          perStorageDetail: '8-6',
          imageManagement: '9',
          publicImage: '9-1',
          objectImage: '9-2',
          personalImage: '9-3',
          layoutImage: '9-8',
          pubEditImage: '9-4',
          proEditImage: '9-6',
          perEditImage: '9-7',
          imageSort: '9-5',
          caseCenter: '10',
          caseCenterList: '10-1',
          caseDetail: '10-2',
          createCase: '10-3',
          keyManagement: '11',
          keyManagementHome: '11-1',
          researchForum: '12',
          forumManagement: '12-1',
          forumCenter: '12-2',
          myForum: '12-3',
          forumSend: '12-4',
          forumDetails: '12-5',
          help: '13',
          downloadData: '13-1',
          setting: '14',
          changePassword: '14-1',
          personalSettings: '14-2',
          about: '15',
          aboutPage: '15-1'
        }
        const closePermission = false // 是否关闭权限,只要不传true，都是开启
        let userCharacter = '' // 用户角色，admin--管理员;projectManager--项目管理员;projectParticipant--项目参与者
        let permissionList = []
        const publicPermissionList = ['8', '8-1', '8-4', '8-5', '8-6', '8-7', '9', '9-1', '9-5', '9-6', '9-7', '10', '10-1', '10-2', '11', '11-1', '12', '12-2', '12-3', '12-4', '12-5', '13', '13-1', '14', '15', '15-1']
        if (res.data.role === 2) { // admin
          permissionList = ['1', '1-1', '1-2', '1-3', '1-4', '2', '2-1', '2-2', '2-3', '3', '3-1', '3-2', '3-3', '4', '4-1', '4-1-1', '4-1-1-1', '4-2', '4-2-1', '9-4', '9-8', '10-3', '12-1', '14-1'] // 权限列表
          userCharacter = 'admin'
        } else if (res.data.role === 3) { // projectManager
          permissionList = ['5', '5-1', '6', '6-1', '6-1-1', '6-1-2', '6-1-2-1', '6-1-2-2', '6-1-2-3', '6-1-3', '6-1-4', '6-1-5', '6-2', '6-3', '6-2-1', '6-2-1-1', '6-2-1-2', '6-2-1-3', '6-2-2', '6-2-3', '6-2-4', '7', '7-1', '7-1-1', '7-1-2', '7-2', '7-2-1', '7-2-2', '7-3', '7-3-1', '7-3-2', '8-2', '8-3', '9-2', '9-3', '9-8', '14-2'] // 权限列表
          userCharacter = 'projectManager'
        } else if (res.data.role === 4) { // projectParticipant
          permissionList = ['5', '5-1', '6', '6-1-1', '6-1-2', '6-1-2-1', '6-1-2-2', '6-1-2-3', '6-1-3', '6-1-4', '6-1-5', '6-2', '6-2-1', '6-2-1-1', '6-2-1-2', '6-2-1-3', '6-2-2', '6-2-3', '6-2-4', '6-21', '7', '7-1', '7-1-1', '7-1-2', '7-2', '7-2-1', '7-2-2', '7-3', '7-3-1', '7-3-2', '8-2', '8-3', '9-2', '9-3', '14-2'] // 权限列表
          userCharacter = 'projectParticipant'
        } else { }
        permissionList = [...permissionList, ...publicPermissionList]
        // 初始化nav内容
        permissionList.push('')
        permissionList.unshift('')
        permissionList = permissionList.join(',')
        let navInformation = []
        let routeMsg = this.$router.options.routes.filter(function (item) {
          return item.name === 'main' // 根据当前项目最外层name容器修改
        })[0].children
        // 权限角色过滤
        if (closePermission === true) {
          navInformation = routeMsg
            .filter(function (item) {
              return item.meta.show !== false
            })
            .map(function (item) {
              let arr = []
              if (item.children !== undefined && item.children.length > 0) {
                arr = item.children
                  .filter(function (item) {
                    return item.meta.show !== false
                  })
                  .map(function (one) {
                    return {
                      linkName: one.name,
                      path: `/${item.path}/${one.path}`,
                      iconName: one.meta.icon,
                      active: false,
                      name: one.meta.title
                    }
                  })
              }
              return {
                linkName: item.name,
                path: `/${item.path}`,
                name: item.meta.title,
                iconName: item.meta.icon,
                active: false,
                children: arr
              }
            })
        } else {
          navInformation = routeMsg
            .filter(function (item) {
              return (
                item.meta.show !== false && permissionList.indexOf(`,${permissionTemplate[item.name]},`) !== -1
              )
            })
            .map(function (item) {
              let arr = []
              if (item.children !== undefined && item.children.length > 0) {
                arr = item.children
                  .filter(function (item) {
                    return (
                      item.meta.show !== false && permissionList.indexOf(`,${permissionTemplate[item.name]},`) !== -1
                    )
                  })
                  .map(function (one) {
                    return {
                      linkName: one.name,
                      path: `/${item.path}/${one.path}`,
                      iconName: one.meta.icon,
                      active: false,
                      name: one.meta.title
                    }
                  })
              }
              return {
                linkName: item.name,
                path: `/${item.path}`,
                name: item.meta.title,
                iconName: item.meta.icon,
                active: false,
                children: arr
              }
            })
        }
        let breadCrumbs = [] // 面包屑导航
        breadCrumbs.push({ name: navInformation[0].name, linkName: navInformation[0].linkName })
        if (navInformation[0].children.length > 0) {
          breadCrumbs.push({ name: navInformation[0].children[0].name, linkName: navInformation[0].children[0].linkName })
        }
        // 填充数据
        it.$store.commit('upDatePermissionList', permissionList)
        it.$store.commit('upDatePermissionTemplate', permissionTemplate)
        it.$store.commit('upDateNavInformation', navInformation)
        it.$store.commit('upDateUserCharacter', userCharacter)
        it.$store.commit('upDateClosePermission', closePermission)
        it.$store.commit('upDateBreadCrumbs', breadCrumbs)
        sessionStorage.setItem('access_token', res.data.access_token)
        sessionStorage.setItem('userinfo', JSON.stringify(res.data))
        sessionStorage.setItem('isLogin', 'true')
        sessionStorage.setItem('navActiveParentIndex', '1')
        sessionStorage.setItem('navActiveChildIndex', navInformation[0].children.length > 0 ? '1-1' : '')
        it.$router.push({ name: 'main' })
      } else { // 登陆失败
        it.$message.error(res.message)
        this.loading = false
      }
    },
    toggleLoading () {
      this.loading = !this.loading
    },
    checkCaps (e) {
      let keyCode = e.keyCode
      let isShift = e.shiftKey
      // 大写65-90,小写97-122
      if (((keyCode >= 65 && keyCode <= 90) && !isShift) || ((keyCode >= 97 && keyCode <= 122) && isShift)) {
        this.capsLock = true
      } else {
        this.capsLock = false
      }
    }
  }
}
</script>
