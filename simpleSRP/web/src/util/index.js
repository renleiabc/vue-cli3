/*
 * @Author: SEDU
 * @Date: 2018-07-10 15:00:41
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-07-10 15:06:30
 * @Description:  一些公共函数
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen (val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match('/[^\x00-\xff]/gi') != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param (json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge (target, source) {
  /* Merges two  objects,
                                                                                                                                                                                           giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo (element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [{
  text: '今天',
  onClick (picker) {
    const end = new Date()
    const start = new Date(new Date().toDateString())
    end.setTime(start.getTime())
    picker.$emit('pick', [start, end])
  }
},
{
  text: '最近一周',
  onClick (picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
},
{
  text: '最近一个月',
  onClick (picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
},
{
  text: '最近三个月',
  onClick (picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
  }
}
]

export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr (arr) {
  return Array.from(new Set(arr))
}
/* 删除数据重复对象 */
export function uniqueObj (arr1, arr2) {
  var result = []
  for (var i = 0; i < arr1.length; i++) {
    var obj = arr1[i]
    var num = obj.id
    var isExist = false
    for (var j = 0; j < arr2.length; j++) {
      var aj = arr2[j]
      var n = aj.id
      if (n === num) {
        isExist = true
      }
    }
    if (!isExist) {
      result.push(obj)
    }
  }
  return result
}

// 资源监控公用函数封装
export function echratsData (color, resources) {
  const showData = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      // icon: 'rect',
      itemWidth: 20,
      itemHeight: 10,
      itemGap: 10,
      data: [{
        name: 'CPU',
        icon: 'rect'
      },
      {
        name: 'GPU',
        icon: 'rect'
      },
      {
        name: '内存',
        icon: 'rect'
      },
      {
        name: '显存',
        icon: 'rect'
      }
      ], // 分别修改legend格式
      left: '20px',
      textStyle: {
        fontSize: 12,
        color: '#333'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        interval: 0,
        formatter: function (params) {
          var newParamsName = ''
          var paramsNameNumber = params.length
          var provideNumber = 8 // 一行显示几个字
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
          if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
              var tempStr = ''
              var start = p * provideNumber
              var end = start + provideNumber
              if (p === rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber)
              } else {
                tempStr = params.substring(start, end) + '\n'
              }
              newParamsName += tempStr
            }
          } else {
            newParamsName = params
          }
          return newParamsName
        }
      },
      data: resources.time
    }],
    yAxis: [{
      type: 'value',
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %',
        max: function () {
          return 100
        }
      }
    }],
    series: [{
      name: 'CPU',
      type: 'line',
      stack: '总量1',
      areaStyle: {
        normal: {}
      },
      data: resources.cpu.value
    },
    {
      name: 'GPU',
      type: 'line',
      stack: '总量2',
      areaStyle: {
        normal: {}
      },
      data: resources.gpu.value
    },
    {
      name: '内存',
      type: 'line',
      stack: '总量3',
      areaStyle: {
        normal: {}
      },
      data: resources.memory.value
    },
    {
      name: '显存',
      type: 'line',
      stack: '总量4',
      areaStyle: {
        normal: {}
      },
      data: resources.show.value
    }
    ],
    color: color
  }
  return showData
}
export function nameEcharts (color, data) {
  let option = {
    grid: {
      width: '75%',
      left: '10%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params, ticket, callback) {
        var htmlStr = ''
        for (var i = 0; i < params.length; i++) {
          var param = params[i]
          var xName = param.name // x轴的名称
          var seriesName = param.seriesName // 图例名称
          var value = param.value // y轴值
          var color = param.color // 图例颜色
          if (i === 0) {
            htmlStr += xName + '<br/>' // x轴的名称
          }
          htmlStr += '<div>'
          // 为了保证和原来的效果一样，这里自己实现了一个点的效果
          htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>'
          // 圆点后面显示的文本
          htmlStr += seriesName + '：' + value + ' %'

          htmlStr += '</div>'
        }
        return htmlStr
      },
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: '#505765'
        }
      }
    },
    legend: {
      // icon: 'rect',
      itemWidth: 20,
      itemHeight: 10,
      itemGap: 10,
      data: [{
        name: 'CPU',
        icon: 'rect'
      },
      {
        name: 'GPU',
        icon: 'rect'
      },
      {
        name: '内存',
        icon: 'rect'
      },
      {
        name: '显存',
        icon: 'rect'
      }
      ], // 分别修改legend格式
      left: '20px',
      textStyle: {
        fontSize: 12,
        color: '#333'
      }
    },
    dataZoom: [{
      show: true,
      realtime: true,
      start: 0,
      end: 10
    },
    {
      type: 'inside',
      realtime: true,
      start: 0,
      end: 100
    }
    ],
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: data.time.map(function (str) {
        return str.replace(' ', '\n')
      }),
      axisLine: {
        onZero: false
      }
    }],
    yAxis: [{
      type: 'value',
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %'
      }
    }],
    series: [{
      name: 'CPU',
      type: 'line',
      stack: '总量1',
      animation: false,
      areaStyle: {},
      lineStyle: {
        width: 1
      },
      markArea: {
        silent: true

      },
      data: data.cpu.value
    },
    {
      name: 'GPU',
      type: 'line',
      stack: '总量2',
      animation: false,
      areaStyle: {},
      lineStyle: {
        width: 1
      },
      markArea: {
        silent: true

      },
      data: data.gpu.value
    },
    {
      name: '内存',
      type: 'line',
      stack: '总量3',
      animation: false,
      areaStyle: {},
      lineStyle: {
        width: 1
      },
      markArea: {
        silent: true

      },
      data: data.memory.value
    },
    {
      name: '显存',
      type: 'line',
      stack: '总量4',
      animation: false,
      areaStyle: {},
      lineStyle: {
        width: 1
      },
      markArea: {
        silent: true

      },
      data: data.show.value
    }
    ],
    color: color
  }
  return option
}
export function character (value) {
  var reg = /^[a-zA-Z0-9]{6,16}$/

  return reg.test(value)
}
/**
 *
 * 小数转化为百分数
 */
export function toPercent (point) {
  var arr = []
  if (point.length === 0) {
    return arr
  } else {
    for (let i = 0; i < point.length; i++) {
      var str = Number(point[i]).toFixed(2)
      arr.push(str)
    }
    return arr
  }
}
/**
 * 最近一周
 * 最近一月
 * 最近三月数据函数
 * 开始时间、结束时间选择框
 */
export function timeData () {
  let timeData = {
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
  }
  return timeData
}
/**
 * 最近一周
 * 最近一月
 * 最近三月数据函数
 * 单个时间选择框
 */
export function datePicker () {
  let timeData = {
    disabledDate (time) {
      return time.getTime() > Date.now()
    },
    shortcuts: [{
      text: '一周前',
      onClick (picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        let time = getNowFormatDate(date)
        picker.$emit('pick', time)
      }
    }, {
      text: '一个月前',
      onClick (picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
        let time = getNowFormatDate(date)
        picker.$emit('pick', time)
      }
    }, {
      text: '三个月前',
      onClick (picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 90)
        let time = getNowFormatDate(date)
        picker.$emit('pick', time)
      }
    }]
  }
  return timeData
}
// 获取当前时间，格式YYYY-MM-DD
export function getNowFormatDate (date) {
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate + ' 00:00:00'
}
/**
 * 排序发送数据请求函数封装
 *key需要排序的字段
 * params排序的规则
 */
export function sortData (key, rule) {
  var obj = {
    page: 0,
    type: 0
  }
  switch (key) {
    case 'created_at':
      obj.created_at = rule
      obj.id = ''
      obj.views = ''
      obj.last_at = ''
      break
    case 'views':
      obj.views = rule
      obj.id = ''
      obj.created_at = ''
      obj.last_at = ''
      break
    case 'last_at':
      obj.last_at = rule
      obj.id = ''
      obj.views = ''
      obj.created_at = ''
      break
    default:
      obj.last_at = ''
      obj.id = 'DESC'
      obj.views = ''
      obj.created_at = ''
      break
  }
  return obj
}
/**
 * 把秒数转化为天、时、分、秒
 * 参数value是秒数
 */
export function formatSeconds (value) {
  var secondTime = parseInt(value) // 秒
  var minuteTime = 0 // 分
  var hourTime = 0 // 小时
  var dayTime = 0 // 天
  var result = ''
  if (value < 60) {
    result = secondTime + '秒'
  } else {
    if (secondTime >= 60) { // 如果秒数大于60，将秒数转换成整数
      // 获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60)
      // 获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60)
      // 如果分钟大于60，将分钟转换成小时
      if (minuteTime >= 60) {
        // 获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60)
        // 获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60)
        if (hourTime >= 24) {
          // 获取天数， 获取小时除以24，得到整数天
          dayTime = parseInt(hourTime / 24)
          // 获取小时后取余小时，获取分钟除以24取余的分；
          hourTime = parseInt(hourTime % 24)
        }
      }
    }
    if (secondTime > 0) {
      secondTime = parseInt(secondTime) >= 10 ? secondTime : '0' + secondTime
      result = '' + secondTime + '秒'
    }
    if (minuteTime > 0) {
      minuteTime = parseInt(minuteTime) >= 10 ? minuteTime : '0' + minuteTime
      result = '' + minuteTime + '分' + result
    }
    if (hourTime > 0) {
      result = '' + parseInt(hourTime) + '小时' + result
    }
    if (dayTime > 0) {
      result = '' + parseInt(dayTime) + '天' + result
    }
  }
  return result
}

// 针对不同浏览器创建XHR对象的函数封装；
export function ajax (url, sucFn, failFn) {
  var xhr
  if (window.XMLHttpRequest) {
    xhr = new window.XMLHttpRequest()
  } else {
    xhr = new window.ActiveXObject('Msxml2.XMLHTTP')
  }
  xhr.open('GET', url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        sucFn(xhr.responseText)
      } else {
        if (failFn) {
          failFn(xhr.status)
        }
      }
    }
  }
  xhr.send()
}
