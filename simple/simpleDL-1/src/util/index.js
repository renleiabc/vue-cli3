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
      data: [
        { name: 'CPU', icon: 'rect' },
        { name: 'GPU', icon: 'rect' },
        { name: '内存', icon: 'rect' },
        { name: '显存', icon: 'rect' }
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
          var provideNumber = 10 // 一行显示几个字
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
        formatter: '{value} %'
      }
    }],
    series: [{
      name: 'CPU',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: resources.cpu.value
    },
    {
      name: 'GPU',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: resources.gpu.value
    },
    {
      name: '内存',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: resources.memory.value
    },
    {
      name: '显存',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: resources.show.value
    }
    ],
    color: color
  }
  return showData
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
      var str = Number(point[i] * 100).toFixed(0)
      arr.push(str)
    }
    return arr
  }
}
/**
 * 最近一周
 * 最近一月
 * 最近三月数据函数
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
