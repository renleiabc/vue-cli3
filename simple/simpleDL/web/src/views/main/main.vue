<!--
 * @Author: renlei
 * @Date: 2019-08-27 15:34:11
 * @LastEditors: renlei
 * @LastEditTime: 2019-08-28 15:01:32
 * @Description:主入口
 -->

<template>
  <el-container>
    <el-header class="views-main-el-header">
      <div class="logo">
        <img :src="mixinGetImage('views/global/', 'login_logo.png')"
             alt="">{{$t('views.main.title')}}
      </div>
      <span>{{$t('views.main.name')}}</span>
      <div style="margin-right:10px;">

        <!-- 右上角用户下拉菜单 -->
        <el-dropdown class="el-menu-user-menu"
                     :class="userMenuIsActive?'is-active':''"
                     @command="userMenuHandleCommand"
                     @visible-change="userMenuActiveToggle">
          <span class="el-dropdown-link">
            <i class="iconfont icon-admin"></i>
            <b v-if="this.$store.getters.checkUserCharacter==='admin' && username === 'admin' ">超级管理员</b>
            <b v-else-if="this.$store.getters.checkUserCharacter==='admin'">{{$t('views.userMenu.admin')}}</b>
            <b v-if="this.$store.getters.checkUserCharacter==='projectManager'">{{$t('views.userMenu.projectManager')}}</b>
            <b v-if="this.$store.getters.checkUserCharacter==='projectParticipant'">{{$t('views.userMenu.projectParticipant')}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown"
                            class="el-dropdown-user-menu">
            <el-dropdown-item command="changePassword"
                              v-if="this.$store.getters.checkUserCharacter==='admin'">
              {{$t('views.userMenu.editPwd')}}
            </el-dropdown-item>
            <el-dropdown-item command="personalSettings"
                              v-else>
              {{$t('views.userMenu.settings')}}
            </el-dropdown-item>
            <el-dropdown-item command="loginOut">{{$t('views.userMenu.loginOut')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 语言切换 -->
        <!-- <sedu-language-switch cname="views-main-el-header-el-dropdown"
                              :my18n="this.$i18n" /> -->
      </div>
    </el-header>
    <el-container>
      <el-scrollbar class="views-main-el-aside-navbar">
        <ele-nav cname="navbar"
                 :navInformation="navInformation"></ele-nav>
      </el-scrollbar>
      <el-scrollbar class="views-main-container">
        <el-main>
          <!--导航-->
          <p class="views-main-navigate">
            {{$t('views.navigate.title')}}：
            <span :key="index"
                  v-for="(item,index) in navigate"
                  v-if="index<navigate.length-1">
              <router-link :to="{name:item.linkName}">{{$t(item.name)}}&nbsp;&nbsp;&gt;</router-link>
            </span>
            <span v-else>{{$t(item.name)}}</span>
            <button @click="mixinGoBack"
                    class="views-main-goBack"
                    v-if="showNav">
              <i class="icon iconfont icon-fanhui"></i>
              {{$t('views.navigate.back')}}
            </button>
          </p>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive===true"
                         @showNavigate="changeNavigate"></router-view>
          </keep-alive>
          <router-view v-if="$route.meta.keepAlive!==true"
                       @showNavigate="changeNavigate"></router-view>
          <div class="public-footer">
            <a @click.prevent="goAbout">{{$t('views.nav.about')}}</a>
            |
            <a href="https://www.simpleedu.com.cn/"
               target="_blank">{{$t('views.main.simpleEDU')}}</a>

            <a href="http://www.shiyanbar.com/"
               target="_blank">{{$t('views.main.shiBar')}}</a>
          </div>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import {ajax} from '../../util/index.js'
export default {
  data () {
    const colorValidator = (rule, value, callback) => {
      if (!value) {
        return callback(
          new Error(this.langConfig.validate.required[this.lang])
        )
      } else if (!/^#[\dabcdef]{6}$/i.test(value)) {
        return callback(new Error(this.langConfig.validate.format[this.lang]))
      } else {
        callback()
      }
    }
    return {
      value1: '',
      value3: true,
      userMenuIsActive: false,
      colors: {
        primary: '#1f4665'
      },
      rules: {
        primary: [
          {
            validator: colorValidator,
            trigger: 'blur'
          }
        ]
      },
      originalStyle: '',
      styleFiles: [],
      navInformation: [],
      option1: {},
      navigate: [],
      showNav: false
    }
  },
  created () {
    // 载入皮肤样式
    this.username = JSON.parse(sessionStorage.getItem('userinfo')).username
    this.colors.primary = this.STORE_THEME_COLOR
    let cssNode = document.getElementById('element-ui-login')
    if (cssNode !== null) {
      cssNode.parentNode.removeChild(cssNode)
    }

    this.getIndexStyle()
    this.mixinGetLess('', `index`)
    this.navInformation = this.$store.getters.checkNavInformation
    this.navigate = this.$store.getters.checkBreadCrumbs
    let vue = this
    //  noimg 全局处理
    document.addEventListener(
      'error',
      function (e) {
        var elem = e.target
        if (elem.tagName.toLowerCase() === 'img') {
          elem.src = vue.mixinGetImage('views/global/', 'noimg.gif')
          elem.width = 120
          elem.height = 90
        }
      },
      true
    )
  },

  methods: {
    changeNavigate (type) {
      this.showNav = type
    },
    // getFile (url, isBlob = false) {
    //   return new Promise((resolve, reject) => {
    //     const client = new XMLHttpRequest()
    //     const urlArr = client.responseURL ? client.responseURL.split('/') : []
    //     client.responseType = isBlob ? 'blob' : ''
    //     client.onreadystatechange = () => {
    //       if (client.readyState !== 4) {
    //         return
    //       }
    //       if (client.status === 200) {
    //         resolve({
    //           data: client.response,
    //           url: urlArr[urlArr.length - 1]
    //         })
    //       } else {
    //         reject(new Error(client.statusText))
    //       }
    //     }
    //     client.open('GET', url)
    //     client.send()
    //   })
    // },
    writeNewStyle () {
      let cssText = this.originalStyle
      Object.keys(this.colors).forEach(key => {
        cssText = cssText.replace(
          new RegExp('(:|\\s+)' + key, 'g'),
          '$1' + this.colors[key]
        )
      })
      //  console.log(cssText)
      document.querySelector('#element-ui-theme').innerText = cssText
    },
    getStyleTemplate (data) {
      const colorMap = {
        '#3a8ee6': 'shade-1',
        '#409eff': 'primary',
        '#53a8ff': 'light-1',
        '#66b1ff': 'light-2',
        '#79bbff': 'light-3',
        '#8cc5ff': 'light-4',
        '#a0cfff': 'light-5',
        '#b3d8ff': 'light-6',
        '#c6e2ff': 'light-7',
        '#d9ecff': 'light-8',
        '#ecf5ff': 'light-9'
      }
      Object.keys(colorMap).forEach(key => {
        const value = colorMap[key]
        data = data.replace(new RegExp(key, 'ig'), value)
      })
      return data
    },
    getIndexStyle () {
      var url = '/static/css/element.css'
      var fn = this.ajaxFn
      ajax(url, fn)
    },
    ajaxFn (data) {
      // console.log(data)
      this.originalStyle = this.getStyleTemplate(data)
      this.writeNewStyle()
    },
    userMenuHandleCommand (command) {
      switch (command) {
        case 'changePassword':
          this.$router.push({name: 'changePassword'})
          break
        case 'personalSettings':
          this.$router.push({name: 'personalSettings', query: {userId: 1}})
          break
        default:
          this.loginOut()
          break
      }
    },
    userMenuActiveToggle () {
      this.userMenuIsActive = !this.userMenuIsActive
    },
    goAbout () {
      this.$router.push({ name: 'about' })
    },
    loginOut () {
      this.$post('/user/addlogoutlog').then(res => {
        this.$router.push({ name: 'login' })
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    // console.log('导航change')
    let navMsg = this.$router.options.routes.filter(function (item) {
      return item.name === 'main' // 根据当前项目最外层name容器修改
    })[0].children
    if (to.name === 'changePassword') {
      let parent = navMsg.filter(function (item) {
        return item.name === 'setting'
      })[0]
      parent.meta.title = 'views.nav.changePassword'
    } else if (to.name === 'personalSettings') {
      let parent = navMsg.filter(function (item) {
        return item.name === 'setting'
      })[0]
      parent.meta.title = 'views.nav.personalSettings'
    }
    if (to.meta.changeMark !== undefined && to.meta.changeMark !== '') {
      // 改变指定页面的markName
      if (to.meta.changeMark.toString() === to.meta.changeMark) { // 字符串
        let parent
        let child
        parent = navMsg.filter(function (item) {
          return item.name === to.meta.changeMark
        })
        if (parent.length > 0) {
          parent[0].meta.markName = to.name
        } else {
          parent = navMsg.filter(function (item) {
            let isTrue = false
            if (item.children !== undefined && item.children.length > 0) {
              let arr = item.children.filter(function (one) {
                return one.name === to.meta.changeMark
              })
              if (arr.length > 0) {
                isTrue = true
              }
            }
            return isTrue
          })
          child = parent[0].children.filter(function (item) {
            return item.name === to.meta.changeMark
          })
          child[0].meta.markName = to.name
        }
      } else { // 数组
        for (let i = 0; i < to.meta.changeMark.length; i++) {
          let parent
          let child
          parent = navMsg.filter(function (item) {
            return item.name === to.meta.changeMark[i]
          })
          if (parent.length > 0) {
            parent[0].meta.markName = to.name
          } else {
            parent = navMsg.filter(function (item) {
              let isTrue = false
              if (item.children !== undefined && item.children.length > 0) {
                let arr = item.children.filter(function (one) {
                  return one.name === to.meta.changeMark[i]
                })
                if (arr.length > 0) {
                  isTrue = true
                }
              }
              return isTrue
            })
            child = parent[0].children.filter(function (item) {
              return item.name === to.meta.changeMark[i]
            })
            child[0].meta.markName = to.name
          }
        }
      }
    }
    if (to.meta.markName !== undefined && to.meta.markName !== '') {
      // 在nav上隐藏的页面
      // console.log('我是隐藏的')
      if (to.meta.parents !== undefined && to.meta.parents !== '') {
        // 前一个页面是隐藏页面
        // console.log('前一个页面是隐藏的')
        let arr = []
        let parent
        let child
        parent = navMsg.filter(function (item) {
          return item.name === to.meta.markName
        })
        if (parent.length > 0) {
          arr = [{name: parent[0].meta.title, linkName: parent[0].name}]
        } else {
          parent = navMsg.filter(function (item) {
            let isTrue = false
            if (item.children !== undefined && item.children.length > 0) {
              let arr = item.children.filter(function (one) {
                return one.name === to.meta.markName
              })
              if (arr.length > 0) {
                isTrue = true
              }
            }
            return isTrue
          })
          child = parent[0].children.filter(function (item) {
            return item.name === to.meta.markName
          })
          arr = [{name: parent[0].meta.title, linkName: parent[0].name}, {name: child[0].meta.title, linkName: child[0].name}]
        }
        for (let i = 0; i < to.meta.parents.length; i++) {
          parent[0].children.filter(function (item) {
            if (item.name === to.meta.parents[i]) {
              arr.push({name: item.meta.title, linkName: item.name})
            }
            return false
          })
        }
        arr.push({name: to.meta.title, linkName: to.name})
        this.navigate = [...arr]
      } else {
        // console.log('前一个页面不是隐藏的')
        let parent
        let child
        parent = navMsg.filter(function (item) {
          return item.name === to.meta.markName
        })
        if (parent.length > 0) {
          this.navigate = [{name: parent[0].meta.title, linkName: parent[0].name}]
        } else {
          parent = navMsg.filter(function (item) {
            let isTrue = false
            if (item.children !== undefined && item.children.length > 0) {
              let arr = item.children.filter(function (one) {
                return one.name === to.meta.markName
              })
              if (arr.length > 0) {
                isTrue = true
              }
            }
            return isTrue
          })
          child = parent[0].children.filter(function (item) {
            return item.name === to.meta.markName
          })
          this.navigate = [{name: parent[0].meta.title, linkName: parent[0].name}, {name: child[0].meta.title, linkName: child[0].name}]
        }
        if (to.meta.replaceIndex !== true) {
          this.navigate.push({name: to.meta.title, linkName: to.name})
        }
      }
    } else {
      // 显示的页面
      // console.log('我是显示的')
      let parent
      let child
      parent = navMsg.filter(function (item) {
        return item.name === to.name
      })
      if (parent.length > 0) {
        this.navigate = [{name: parent[0].meta.title, linkName: parent[0].name}]
      } else {
        parent = navMsg.filter(function (item) {
          let isTrue = false
          if (item.children.length > 0) {
            let arr = item.children.filter(function (one) {
              return one.name === to.name
            })
            if (arr.length > 0) {
              isTrue = true
            }
          }
          return isTrue
        })
        child = parent[0].children.filter(function (item) {
          return item.name === to.name
        })
        this.navigate = [{name: parent[0].meta.title, linkName: parent[0].name}, {name: child[0].meta.title, linkName: child[0].name}]
      }
    }
    this.$store.commit('upDateBreadCrumbs', this.navigate)
    next()
  }
}
</script>
