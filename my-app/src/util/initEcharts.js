/*
 * @Author: renlei
 * @Date: 2020-06-11 18:39:35
 * @LastEditors: renlei
 * @LastEditTime: 2020-06-11 18:39:35
 * @Description:
 */
// 文件路径 @/lib/echarts.js 自行配置
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图等
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/dataZoom');
require('echarts/lib/component/markPoint');
require('echarts/lib/component/markLine');
export default echarts;
