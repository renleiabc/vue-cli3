<!--
 * @Author: renlei
 * @Date: 2020-06-09 09:42:43
 * @LastEditors: renlei
 * @LastEditTime: 2020-06-29 15:32:32
 * @Description: 
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>{{ message | capitalize }}</div>
    <div>{{ num | addNum(10) }}</div>
    <div>{{ reversedMessage() }}</div>
    <div>{{ reversedMessage1 }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  filters: {
    capitalize: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  data() {
    return {
      message: 'renlei',
      num: 3
    };
  },
  computed: {
    // 计算属性的 getter
    reversedMessage1: function() {
      // `this` 指向 vm 实例
      return this.message
        .split('')
        .reverse()
        .join('');
    }
  },
  created() {
    this.init();
    this.handleGet();
    this.handlePost();
    this.handleForEach();
    this.handleMap();
    this.handleFilter();
    this.handleFind();
  },
  methods: {
    reversedMessage: function() {
      return this.message
        .split('')
        .reverse()
        .join('');
    },
    handleForEach() {
      const arr = [];
      const arr1 = arr.forEach((item) => {
        return item + 1;
      });
      console.log(JSON.stringify(arr));
      console.log(arr1);
    },
    handleMap() {
      const arr = [1, 2, 3, 4, 5, 6];
      const arr1 = arr.map((item) => {
        if (item > 3) {
          return item + 1;
        }
        return item;
      });
      console.log(arr1);
    },
    handleFilter() {
      const arr = [1, 2, 3, 4, 5, 6];
      const arr1 = arr.filter((item) => {
        if (item > 3) {
          return item + 1;
        }
      });
      console.log(arr1);
    },
    handleFind() {
      const arr = [1, 2, 3, 4, 5, 6];
      const arr1 = arr.find((item) => {
        if (item > 10) {
          return item + 1;
        }
      });
      console.log(arr1);
    },
    handlePost() {
      const data = {
        username: 'renlei',
        password: 'renlei'
      };
      this.$post('/login', data).then((res) => {
        console.log(JSON.stringify(res));
      });
    },
    handleGet() {
      const data = {
        page: 1,
        name: 'renlei'
      };
      this.$get('/cardLists', data).then((res) => {
        console.log(JSON.stringify(res));
      });
    },
    init() {
      const obj1 = {
        a: 'hello',
        b: {
          a: 'hello',
          b: 21
        }
      };
      const cloneObj1 = Object.assign({}, obj1);
      cloneObj1.a = 'changed';
      cloneObj1.b.a = 'chnaged';
      console.log(obj1.a);
      console.log(obj1.b.a);
      const obj = { a: 1, arr: [2, 3] };
      const shallowObj = Object.assign({}, obj);
      //当一个对象属性的引用值改变时将导致另一个也改变
      shallowObj.arr[1] = 5;
      obj.arr[1]; // = 5
      console.log(obj.arr[1]);
    },
    handleJsonp() {
      // 得到航班信息查询结果后的回调函数
      function flightHandler(data) {
        console.log(JSON.stringify(data));
        /* alert(
          '你查询的航班结果是：票价 ' +
            data.price +
            ' 元，' +
            '余票 ' +
            data.tickets +
            ' 张。'
        ); */
      }
      // console.log(flightHandler);
      // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
      const url =
        'https://api.thinkpage.cn/v3/weather/now.json?location=beijing&ts=1443079775&ttl=30&uid=[your_uid]&sig=[your_signature]&callback=' +
        flightHandler;
      // 创建script标签，设置其属性
      const script = document.createElement('script');
      script.setAttribute('src', url);
      // 把script标签加入head，此时调用开始
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  },
  mounted() {
    this.handleJsonp();
  },
  components: {
    HelloWorld
  }
};
</script>
