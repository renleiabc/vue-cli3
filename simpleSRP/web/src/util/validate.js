/*
 * @Author: Liang Liang
 * @Date: 2018-08-21 15:52:50
 * @LastEditors: 少侠
 * @LastEditTime: 2018-08-30 11:49:27
 * @Description:
 */
/**
 * 整形数字验证 1~num
 * @param {输入值} num
 * @param {最大值} limitNum
 */
export function limitInt (num, limitNum) {
  if ((num - 0) !== 0 && num <= limitNum) {
    let regNum = /^\d+$/g
    return regNum.test(num)
  } else {
    return false
  }
}
/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}
/* 字母，数字，下划线 */
export function validateUsername (str) {
  const reg = /^[a-zA-Z0-9_]+$/
  return reg.test(str)
}
/* 字母，汉字, 数字，下划线 */
export function validateCommon (str) {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/
  return reg.test(str)
}
/* 字母，汉字，空格 */
export function validateName (str) {
  const reg = /^[\u4e00-\u9fa5a-zA-Z ]+$/
  return reg.test(str)
}
/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validateAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 手机号码和带区号的电话号码 */
export function validateTel (str) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
  return reg.test(str)
}

/* 正确的身份证号格式 */
export function validateIdentityCard (str) {
  const reg = /^\d{6}((1[89])|(2\d))\d{2}((0\d)|(1[0-2]))((3[01])|([0-2]\d))\d{3}(\d|X)$/i
  return reg.test(str)
}
/* 正确的邮箱格式 */
export function validateEmail (str) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-z]+$/i
  return reg.test(str)
}
/* 包含常用特殊字符的验证，如密码等 ，该验证包含大小写字母，数字，下划线，常用特殊字符 */
/// ^[A-Za-z0-9-_`~!^&*+=:;"?.,'@#$%]{6,16}$/
export function validatePassword (str) {
  const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!@#$%^&*]+$)[\da-zA-Z!@#$%^&*]{6,16}$/
  return reg.test(str)
}
/* IP地址加子网掩码的验证，如192.168.200.154/25，如果只填IP，限制字符长度为15位，如果IP，子网掩码都填，限制字符长度为18位 */
export function validateIP (str) {
  const reg = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/
  return reg.test(str)
}
/*  名称验证 */
export function valiName (str) {
  const reg = /^[^<>:'"/\\.]+$/g
  return reg.test(str)
}
/*  小写字母数字验证 */
export function lowerValid (str) {
  const reg = /^[a-z0-9]+$/g
  return reg.test(str)
}
/*  字母数字验证 */
export function key32 (str) {
  const reg = /^[a-zA-Z0-9]+$/g
  return reg.test(str)
}
/*
 **value 参数是传值的字符串或者数字
 **type是类型，
 **0判断正整数
 **1判断实数
 **2判断正实数
 **3 判断大于0，且小于1的正实数
 ** 4 判断是否在数据范围内
 */
export function spaceTest (value, type) {
  var reg
  switch (type) {
    case 0:
      reg = /^[0-9]*[1-9][0-9]*$/
      return reg.test(value)
    case 1:
      reg = /^(-?\d+)(\.\d+)?$/
      return reg.test(value)
    case 2:
      reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
      return reg.test(value)
    case 3:
      reg = /^0\.\d*[1-9]\d*$/
      return reg.test(value)
    case 4:
      reg = ['fixed', 'step', 'exp', 'inv', 'multistep', 'ploy', 'sigmoid']
      for (var i = 0; i < reg.length; i++) {
        if (value === reg[i]) {
          return true
        }
      }
      return false
    default:
      break
  }
}
export function utf8ToB64 (str) {
  return window.btoa(unescape(encodeURIComponent(str)))
}

export function b64ToUtf8 (str) {
  return decodeURIComponent(escape(window.atob(str)))
}
// 密码验证
export function validatePwd (str) {
  // console.log(str)
  let ls = 0
  if (str.length < 5 || escape(str).indexOf('%u') >= 0) {
    return false
  }
  if (str.match(/([a-z])+/)) {
    ls++
  }
  if (str.match(/([0-9])+/)) {
    ls++
  }
  if (str.match(/([A-Z])+/)) {
    ls++
  }
  if (str.match(/[^a-zA-Z0-9]+/)) {
    ls++
  }
  if (ls < 2) {
    return false
  } else {
    return true
  }
}
