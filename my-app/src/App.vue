<!--
 * @Author: renlei
 * @Date: 2020-06-11 18:10:33
 * @LastEditors: renlei
 * @LastEditTime: 2020-06-23 18:12:14
 * @Description: 
-->
<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px"> </el-aside>
        <el-container>
          <el-main>
            <!--  <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition> -->
            <transition name="fade" mode="out-in">
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
            </transition>
            <transition name="fade" mode="out-in">
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
html,
body {
  height: 100%;
  background: #000;
}
#app {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 0px;
}

ul li {
  list-style: none;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
