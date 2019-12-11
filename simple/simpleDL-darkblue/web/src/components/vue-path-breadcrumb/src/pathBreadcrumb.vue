/*
 * @Author: Liang Liang
 * @Date: 2018-07-16 10:56:47
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-16 10:56:47
 * @Description: 
 */
<template>
  <p :class="cname"
     :style="myStyle">
    <a href="javascript:void(0)"
       @click="goBack()"
       v-if="pathData.length>1">{{backLabel}}</a>
    <small v-if="pathData.length>1">|</small>
    <span v-for="(item,index) of pathData"
          :key="index">
      <a href="javascript:void(0)"
         v-if="index===0 && index!==pathData.length-1"
         @click="gotoPath(item)">{{allFileLabel}}</a>
      <i v-else-if="index === 0 && index===pathData.length-1">{{allFileLabel}}</i>
      <a href="javascript:void(0)"
         v-else-if="index>0 && index!==pathData.length-1"
         @click="gotoPath(item)">{{item.name}}</a>
      <i v-else-if="index>0 && index===pathData.length-1">{{item.name}}</i>
      <small v-if="pathData.length>1 &&　index　!==pathData.length-1"
             class="el-icon-arrow-right" />
    </span>
  </p>
</template>

<script>
export default {
  data () {
    return {
      myPath: null,
      historyEvent: null,
      pathData: null
      // sessionKey: 'seduFileManagementPathData'
    }
  },
  props: {
    // 自定义行内样式
    myStyle: {
      type: String,
      default: ''
    },
    // 自定义class
    cname: {
      type: String,
      default: 'components-path-breadcrumb'
    },
    // 匹配文件夹的key
    matchKeyName: {
      type: String,
      default: 'key'
    },
    // 点击面包屑链接 的回调函数
    callBack: {
      type: Function,
      required: true
    },
    // 支持自定义文字，方便国际化
    backLabel:{
      type: String,
      default:"返回上一级" 
    },
    // 支持自定义文字，方便国际化
    allFileLabel:{
      type: String,
      default:"全部文件" 
    },
  },
  created () {
    this.myPath = true
    this.pathData = []
    // if (this.historyEvent === null) {
    //   this.historyEvent = window.addEventListener('popstate', (event) => {
    //     console.log(String(window.history.state.title))
    //     if (String(window.history.state.title).includes('fileManagement')) {
    //       console.log(324234234234234)
    //       this.goBack()
    //     }
    //   })
    // }
  },
  mounted () {
  },
  beforeDestroy () {
    // window.removeEventListener('popstate', () => console.log('清除了监听'))
    this.myPath = null
    this.historyEvent = null
    this.pathData = null
  },
  watch: {
  },
  methods: {
    // 存入点击的路径对象
    addPath (targetPath) {
      this.pathData.push(targetPath)
      if (this.pathData.length === 1) {
        this.pathData[0]['name'] = this.allFileLabel
      }
    },
    gotoPath (path) {
      let _index = this.pathData.findIndex((value, index) => {
        if (value[this.matchKeyName] === path[this.matchKeyName]) {
          return String(index)
        }
      })
      const len = this.pathData.length
      Number(_index)
      this.pathData.splice(_index === 0 ? 1 : _index + 1, len)
      this.selectPath(path)
    },
    selectPath (path) {
      this.callBack(path)
    },
    goBack () {
      const path = this.pathData.pop()
      this.selectPath(path)
    },
    updatePathData (targetPath) {
      // const state = {
      //   title: 'fileManagement',
      //   url: ''
      // }
      // window.history.pushState(state, 'title')

      // this.saveData(this.pathData)
    }
    // saveSessionData (data) {
    //   sessionStorage.setItem(this.sessionKey, JSON.stringify(data))
    // },
    // getSessionData: () => sessionStorage.getItem(this.sessionKey)
  }
}
</script>
