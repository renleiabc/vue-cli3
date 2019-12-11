/*
 * @Author: aFei
 * @Date: 2018-07-18 11:46:16
 */
/*
* @LastEditors: aFei
* @LastEditTime: 2018-08-23 11:12:45
*/
<template>
    <div>
        <el-tabs v-model="activeName"
                 @tab-click="clearSearchTabs">
            <el-tab-pane label="A模块"
                         name="first">
                <div class="tab-select">
                    <div>
                        <span class="tab-select-title">年龄</span>
                        <el-input v-model="tabSel1.age"
                                  placeholder="请输入"></el-input>
                    </div>
                    <div>
                        <span class="tab-select-title">时间</span>
                        <el-date-picker v-model="tableData1.full_time"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="-"
                                        start-placeholder='开始时间'
                                        end-placeholder='结束时间'
                                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                    <div>
                        <span class="tab-select-title">选择</span>
                        <el-select v-model="tableData1.age"
                                   placeholder="请选择">
                            <el-option v-for="item in sel"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-button class="btn light small" @click="clearSearchTabs('tableData1')">重置</el-button>
                        <el-button class="btn light small" @click="doSearchTabs('tableData1')">查询</el-button>
                    </div>
                </div>
                <el-table class="tab-content"
                          :data="tableData1"
                          @sort-change="addSortTabs($event,'tabSel1')"
                          v-loading="loading1"
                          border>
                    <el-table-column type="index"
                                     label="序号"
                                     width="50"></el-table-column>
                    <el-table-column prop="id"
                                     label="ID"
                                     sortable
                                     width="180"></el-table-column>
                    <el-table-column prop="name"
                                     label="姓名"
                                     width="180"></el-table-column>
                    <el-table-column label="自定义">
                        <template slot-scope="scope">
                            <span>{{scope.row.age}}</span>
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
            </el-tab-pane>
            <el-tab-pane label="B模块"
                         name="second"
                         :lazy="true">
                <div class="tab-select">
                    <span class="tab-select-title">年龄</span>
                    <el-input v-model="tabSel2.age"
                              placeholder="请输入"></el-input>
                    <button @click="clearSearchTabs('tableData1')">重置</button>
                    <button @click="doSearchTabs('tableData1')">查询</button>
                </div>
                <el-table class="tab-content"
                          :data="tableData2"
                          v-loading="loading2"
                          @sort-change="addSortTabs($event,'tabSel2')"
                          border>
                    <el-table-column type="index"
                                     label="序号"
                                     width="50"></el-table-column>
                    <el-table-column prop="id"
                                     label="ID"
                                     sortable
                                     width="180"></el-table-column>
                    <el-table-column prop="name"
                                     label="姓名"
                                     width="180"></el-table-column>
                    <el-table-column label="自定义">
                        <template slot-scope="scope">
                            <span>{{scope.row.age}}</span>
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
            </el-tab-pane>
        </el-tabs>
        <el-pagination class="tab-page"
                       layout="prev, pager, next"
                       :page-size="pageSize"
                       :current-page.sync="page"
                       :total="total_count"
                       @current-change="changePageTabs"></el-pagination>
    </div>
</template>

<script>
export default {
  name: 'tabsTab',
  data () {
    return {
      activeName: 'first', // 当前激活页
      linSelData: '',
      linTabData: '',
      linLoad: '',
      linUrl: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      sel: [],
      tableData1: [
        {
          id: '1',
          name: '骇一',
          age: 17
        },
        {
          id: '2',
          name: '王二',
          age: 17
        }
      ],
      tableData2: [
        {
          id: '5',
          name: '骇一',
          age: 17
        },
        {
          id: '6',
          name: '王二',
          age: 17
        }
      ],
      tabSel1: {
        age: '',
        order: '',
        prop: ''
      },
      tabSel2: {
        age: '',
        order: '',
        prop: ''
      },
      loading1: true,
      loading2: true,
      page: 1,
      total_count: 1,
      pageSize: 10
    }
  },
  methods: {
    getActiveTabs () { // 获取当前展示的表格、搜索等信息
      switch (this.activeName) { // 对应tabs的name
        case 'first':
          this.linSelData = 'tabSel1'
          this.linTabData = 'tableData1'
          this.linLoad = 'loading1'
          this.linUrl = '/system-log-table'
          break
        case 'second':
          this.linSelData = 'tabSel2'
          this.linTabData = 'tableData2'
          this.linLoad = 'loading2'
          this.linUrl = '/system-log-table'
          break
      }
      this.initMsgTabs()
    },
    addSortTabs (event, name) { // 添加筛选条件
      this[name].order = event.order
      this[name].prop = event.prop
      this.getActiveTabs()
    },
    clearSearchTabs () { // 清除搜索条件、分页切换
      let str
      switch (this.activeName) { // 对应tabs的name
        case 'first':
          str = 'tabSel1'
          break
        case 'second':
          str = 'tabSel2'
          break
      }
      for (let key in this[str]) {
        this[str][key] = ''
      }
      this.page = 1
      this.getActiveTabs()
    },
    doSearchTabs () { // 按条件搜索
      this.page = 1
      this.getActiveTabs()
    },
    changePageTabs () { // 改变分页
      this.getActiveTabs()
    },
    initMsgTabs () {
      this[this.linLoad] = true
      let lin = Object.assign({}, {
        page: this.page,
        count: this.pageSize
      })
      if (this[this.linSelData] !== undefined) {
        if (this[this.linSelData].full_time !== undefined) {
          if (this[this.linSelData].full_time === '' || this[this.linSelData].full_time === null) {
            this[this.linSelData].start_time = ''
            this[this.linSelData].end_time = ''
          } else {
            this[this.linSelData].start_time = this[this.linSelData].full_time[0]
            this[this.linSelData].end_time = this[this.linSelData].full_time[1]
          }
        }
        lin = Object.assign({}, lin, this[this.linSelData])
      }
      this.$axios.get(this.linUrl, {params: lin}).then(data => {
        // 根据后台接口更改
        let tableDate = data.data.data.sys_log_table
        // 数据处理
        this[this.linTabData] = [...tableDate]
        // 重置数据总数
        this.total_count = data.data.data.total_count
        this[this.linLoad] = false
      })
    }
  },
  created () {
    this.getActiveTabs()
  }
}
</script>

<style lang="less">
//粘贴到公共的CSS中
@tab_font_color: #5c6266;
@tab_border_color: #c9c9c9;
@tab_border_active_color: #f2c77f;
@tab_th_background_color: #f49900;
@tab_th_sort_normal_color: rgba(255, 255, 255, 0.4);
@tab_th_sort_active_color: rgb(255, 255, 255);
@tab_sel_button_border_color: #f49900;
@tab_sel_button_background_color: #feebcb;
@tab_sel_button_background_active_color: #f49900;
@tabs_active: #f48400;
@tab_page_active: #f49900;
@tab_check_active: #f46200;
@tab_link: #f49900;
@tab_btn: #417dd0;
@tab_tag: rgba(206, 206, 206, 0.36);
@tab_state_green: #349d6f;
@tab_state_yellow: #ff8400;
@tab_state_red: #f51031;
//表格系统
.tab-select {
  display: flex;
  flex-wrap: wrap;
  @radius: 28px;
  line-height: @radius;
  .tab-select-title {
    margin-left: 20px;
    margin-right: 10px;
    height: @radius;
    font-size: 14px;
    color: @tab_font_color;
    margin-bottom: 10px;
    &:first-child {
      margin-left: 0;
    }
  }
  .el-input__inner {
    height: 100% !important;
    width: inherit;
    border-color: @tab_border_color;
    border-radius: 3px;
    color: @tab_font_color;
    &:hover,
    &:focus {
      border-color: @tab_border_active_color;
    }
  }
  .el-select {
    width: 10%;
    height: @radius;
    .el-input {
      height: 100%;
      &.is-focus {
        .el-input__inner {
          border-color: @tab_border_active_color;
        }
      }
    }
  }
  .el-range-editor.el-input__inner {
    width: 20%;
  }
  .el-input__icon {
    line-height: @radius;
  }
  .el-date-editor {
    height: @radius !important;
    .el-range__icon {
      line-height: @radius - 6;
    }
    .el-range-separator {
      line-height: @radius - 6;
    }
  }
  > .el-input {
    width: 10%;
    margin-right: 20px;
    height: @radius;
    input {
      width: 100%;
    }
  }
  > button {
    width: 80px;
    height: @radius;
    cursor: pointer;
    outline: none;
    border-radius: 3px;
    border: 1px solid @tab_sel_button_border_color;
    background: @tab_sel_button_background_color;
    color: @tab_sel_button_background_active_color;
    margin-left: 20px;
    font-size: 14px;
    &:hover {
      background: @tab_sel_button_background_active_color;
      color: #fff;
    }
  }
}
.tab-content {
  width: 100%;
  margin: 28px 0 26px;
  .el-table__header-wrapper {
    th {
      background: @tab_th_background_color;
      text-align: center;
      padding: 0;
      .cell {
        color: #ffffff;
        line-height: 42px;
      }
    }
  }
  &.el-table .sort-caret.ascending {
    border-bottom-color: @tab_th_sort_normal_color;
  }
  &.el-table .ascending .sort-caret.ascending {
    border-bottom-color: @tab_th_sort_active_color;
  }
  &.el-table .sort-caret.descending {
    border-top-color: @tab_th_sort_normal_color;
  }
  &.el-table .descending .sort-caret.descending {
    border-top-color: @tab_th_sort_active_color;
  }
  &.el-table--border td,
  &.el-table--border th,
  .el-table__body-wrapper
    &.el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right-color: @tab_border_color;
  }
  &.el-table td,
  &.el-table th.is-leaf {
    border-bottom-color: @tab_border_color;
  }
  &.el-table--border,
  &.el-table--group {
    border-color: @tab_border_color;
  }
  &.el-table--border::after,
  &.el-table--group::after,
  &.el-table::before {
    background-color: @tab_border_color;
  }
  &.el-table .cell {
    color: @tab_font_color;
    line-height: 18px;
  }
  //连接
  .link {
    color: @tab_link;
  }
  //操作按钮
  .btn {
    background: none;
    color: @tab_btn;
    cursor: pointer;
    border: none;
    outline: none;
  }
  //状态
  .green {
    color: @tab_state_green;
  }
  .yellow {
    color: @tab_state_yellow;
  }
  .red {
    color: @tab_state_red;
  }
  //标签
  .tag {
    display: inline-block;
    box-sizing: border-box;
    height: 28px;
    width: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 14px;
    margin-right: 5px;
    background: @tab_tag;
    padding: 5px;
  }
  //多选按钮
  .el-checkbox {
    .el-checkbox__inner:hover,
    .el-checkbox__inner:active,
    .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: @tab_check_active;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: @tab_check_active;
      border-color: @tab_check_active;
    }
  }
}
.tab-page {
  text-align: center;
  li:hover,
  li.active,
  button:hover {
    color: @tab_page_active;
  }
  button:disabled {
    color: #c0c4cc;
  }
  .el-tabs__active-bar {
    background-color: @tabs_active;
  }
  .el-tabs__item.is-active {
    color: @tabs_active;
  }
  .el-tabs__item:hover {
    color: @tabs_active;
  }
}
</style>
