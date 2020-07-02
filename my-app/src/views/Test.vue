<!--
 * @Author: renlei
 * @Date: 2020-06-17 10:58:14
 * @LastEditors: renlei
 * @LastEditTime: 2020-06-24 10:30:14
 * @Description: 面试题界面
-->
<template>
  <div class="test">
    <div id="test-node"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    const str = 'ewqweqsadasddddffweeeqeqweqwww';
    this.handleStrMax(str);
    this.handleMultiplication();
    this.handlePrototype();
    console.log(this.handleStringNum('abcd', 3));
    console.log(this.repeatStringNumTimes('abc', 3));
    console.log(this.isPrime(7));
    console.log(this.prinmeN(100));
    const arr = ['a', 'g', 'q', 'd', 'a', 'e', 'q'];
    console.log(this.handleUnique(arr));
    console.log(this.handleCapitalized('205402002103'));
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 0.9, 11];

    const min = Math.min.apply(null, arr1);

    const max = Math.max.apply(null, arr1);

    console.log(`min:${min} max:${max}`);
  },
  methods: {
    //找出字符串当中字符做多的字符
    handleStrMax(str) {
      const obj = {};
      for (let i = 0; i < str.length; i++) {
        if (obj[str[i]]) {
          obj[str[i]]++;
        } else {
          obj[str[i]] = 1;
        }
      }
      console.log(JSON.stringify(obj));
      const arr = Object.values(obj);
      console.log(JSON.stringify(...arr));
      const max = Math.max(...arr);
      console.log(JSON.stringify(max));
      const obj1 = {};
      for (const key in obj) {
        if (obj[key] === max) {
          obj1[key] = max;
        }
      }
      console.log(JSON.stringify(obj1));
    },
    //九九乘法表
    handleMultiplication() {
      let myUl;
      for (let i = 1; i <= 9; i++) {
        myUl = document.createElement('ul');
        for (let j = 1; j <= i; j++) {
          const myLi = document.createElement('li');
          const myText = document.createTextNode(`${j} X ${i}=${i * j}`);
          myLi.appendChild(myText);
          myUl.appendChild(myLi);
        }
        document.getElementById('test-node').appendChild(myUl);
      }
      const fun = function() {
        this.name = 'peter';
        return 'jack';
      };

      const p = new fun();
      console.log(p.name);
    },
    handlePrototype() {
      const fun = function() {};
      fun.prototype = {
        info: {
          name: 'peter',
          age: 25
        }
      };

      const a = new fun();
      const b = new fun();

      a.info.name = 'jack';
      b.info.name = 'tom';
      console.log(a.info.name, b.info.name);
    },
    handleStringNum(string, times) {
      let repeatedString = '';
      for (let i = 0; i < times; i++) {
        repeatedString += string;
      }
      return repeatedString;
    },
    repeatStringNumTimes(string, times) {
      if (times > 0) return string.repeat(times);
      else return '';
    },
    // 判断质数的函数
    isPrime(number) {
      // If your browser doesn't support the method Number.isInteger of ECMAScript 6,
      // you can implement your own pretty easily
      if (typeof number !== 'number' || !Number.isInteger(number)) {
        // Alternatively you can throw an error.
        return false;
      }
      if (number < 2) {
        return false;
      }

      if (number === 2) {
        return true;
      } else if (number % 2 === 0) {
        return false;
      }
      const squareRoot = Math.sqrt(number); //平方根，比如Math.sqrt(9)为3
      for (let i = 3; i <= squareRoot; i += 2) {
        if (number % i === 0) {
          return false;
        }
      }
      return true;
    },
    //输出n内的所有质数
    prinmeN(n) {
      let flag = 0;
      let result = [];
      if (n == 0 || n == 1) {
        result = [];
      } else if (n == 2) {
        result = [2];
      } else if (n == 3 || n == 4) {
        result = [2, 3];
      } else {
        result.push(2, 3);
        for (let i = 5; i <= n; i++) {
          for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j == 0) {
              flag = 1;
              break;
            } else {
              flag = 0;
            }
          }
          if (flag == 0) {
            result.push(i);
          }
        }
      }
      return result;
    },
    //数组去重
    handleUnique(arr) {
      const obj = {};
      const arr1 = [];
      for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
          arr1.push(arr[i]);
          obj[arr[i]] = 1;
        }
      }
      console.log(JSON.stringify(obj));
      return arr1;
    },
    handleCapitalized(n) {
      if (!/^([1-9]\d*)/.test(n)) {
        return '非法数据';
      }
      let unit = '千百十亿千百十万千百十个';
      if (n.length > unit.length) {
        return '数据过长';
      }
      let newStr = '';
      const nlength = n.length;
      unit = unit.substr(unit.length - nlength);
      for (let i = 0; i < nlength; i++) {
        newStr += '零一二三四五六七八九'.charAt(n[i]) + unit.charAt(i);
      }
      newStr = newStr.substr(0, newStr.length - 1);
      newStr = newStr
        .replace(/零(千|百|十)/g, '零')
        .replace(/(零)+/g, '零')
        .replace(/零(亿|万)/g, '$1');
      return newStr;
    }
  },
  components: {},
  computed: {}
};
</script>
<style lang="scss">
#test-node ul {
  width: 900px;
  overflow: hidden;
  margin-top: 4px;
  font-size: 12px;
  line-height: 36px;
}
#test-node li {
  float: left;
  width: 90px;
  margin: 0 4px;
  text-align: center;
  border: 1px solid #333;
  background: yellowgreen;
}
</style>
