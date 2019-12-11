// set function parseTime,formatTime to filter
export {
  parseTime,
  formatTime
}
  from './'

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化 */
export function numberFormatter (num, digits) {
  const si = [{
    value: 1e18,
    symbol: 'E'
  },
  {
    value: 1e15,
    symbol: 'P'
  },
  {
    value: 1e12,
    symbol: 'T'
  },
  {
    value: 1e9,
    symbol: 'G'
  },
  {
    value: 1e6,
    symbol: 'M'
  },
  {
    value: 1e3,
    symbol: 'K'
  }
  ]
  for (let i = 0; i < si.length; i++) {
    if (Number(num) >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      )
    }
  }
  return num + 'B'
}

export function toThousandslsFilter (num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')

  var r = window.location.search.substr(1).match(reg)

  if (r != null) return (r[2])
  return null
}
