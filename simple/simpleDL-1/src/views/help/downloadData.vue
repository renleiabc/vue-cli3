/*
 * @Author: xiYou
 * @Date: 2018-08-07 16:16:10
 * @Last Modified by: xiYou
 * @Last Modified time: 2018-08-22 17:17:09
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-22 11:27:41
*/
<!-- 帮助_资料下载 -->
<template>
  <div class="download-data">
    <div class="help-search">
      <el-input v-model="tableData.sel.name"
                :placeholder='$t("views.help.enter")'></el-input>
      <el-button class="btn dark auto btn-search"
                 @click="doSearch('tableData')">{{$t("views.help.download.btnSelect")}}</el-button>
    </div>
    <!-- 资料下载列表 -->
    <div class="data-list"
         v-if="file_list.length>0">
      <ul>
        <li v-for="(list,index) in file_list"
            :key="index">
          <div class="list-info">
            <span class=" iconfont icon-pdf views-icon-PDF"></span>
            <div class="list-cont">
              <h3 class="title">{{list.name}}</h3>
              <p>
                <em>{{$t("views.help.download.abstracts")}}：</em>
                <span>{{list.describe}}</span>
              </p>
            </div>
          </div>
          <el-button class="btn dark mid"
                     :id='list.files_id'
                     @click="viewFile(list)">{{$t("views.help.download.btnDownload")}}</el-button>
        </li>
      </ul>
      <div>
        <el-pagination class="tab-page"
                       layout="prev, pager, next"
                       :page-size="pageSize"
                       :current-page.sync="tableData.Pagination.page"
                       :total="tableData.Pagination.total_count"
                       @current-change="changePage()"></el-pagination>
      </div>
    </div>
    <!--暂无数据情况-->
    <div v-else
         slot="empty">
      <div class="views-empty">
        <span class="views-empty-table"></span>
        <p class="views-empty-text">{{$t('views.table.noData')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'downloafData',
  data () {
    return {
      file_list: [],
      pageSize: 10,
      tableData: {// 没有分页就删掉Pagination，没有查询条件就删掉sel
        msg: [],
        loading: true,
        Pagination: {
          page: 1,
          total_count: 5
        },
        sel: {
          name: ''
        }
      }
    }
  },
  created () {
    this.getActiveTab('tableData')
  },
  methods: {
    changePage () {
      this.getActiveTab('tableData')
    },
    getActiveTab (name) { // 获取当前展示的表格、搜索等信息
      let lin = {}
      if (this[name].Pagination !== undefined) {
        lin = Object.assign({}, this[name].Pagination, {
          count: this.pageSize
        })
      }
      if (this[name].sel !== undefined) {
        lin = Object.assign({}, lin, this[name].sel)
      }
      this.$get('/helpfile/index', {...lin}).then(res => {
        this.file_list = [...res.data.helpfile_list]
        this.tableData.Pagination.total_count = res.data.total_count
      })
    },
    doSearch (name) { // 按条件搜索
      if (this[name].Pagination !== undefined) {
        this[name].Pagination.page = 1
      }
      this.getActiveTab(name)
    },
    // 下载文件
    viewFile (row) {
      let link = document.createElement('a')
      link.href = row.url
      document.body.appendChild(link)
      setTimeout(res => {
        link.click()
        document.body.removeChild(link)
      }, 10)
    }
  }
}
</script>
