<!--
 * @Author: renlei
 * @Date: 2020-06-18 10:56:30
 * @LastEditors: renlei
 * @LastEditTime: 2020-06-23 11:53:06
 * @Description:
-->
<template>
  <div>
    表格缓存
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      class Point {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
        toString(...rest) {
          const arr = [...rest];
          console.log(arr);
          return '(' + this.x + ', ' + this.y + ' ' + arr[0] + ')';
        }
      }
      const point = new Point('2', '6');
      console.log(point.toString(12, 3, 6));
      class ChildPoint extends Point {
        constructor(x, y, o) {
          console.log(x, y, o);
          super(x, y, o);
          this.o = o;
        }
      }
      const childPoint = new ChildPoint('e', 'y', 'o');
      console.log(childPoint.toString(12, 3, 6));
    }
  },
  components: {},
  computed: {}
};
</script>
