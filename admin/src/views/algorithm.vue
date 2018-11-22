<!-- JS常见的算法 -->
<template>
    <div>
        <div>{{ str}}</div>
        <span v-for="(item,index) in arr" :key='index' v-if="arr.length !== 0">
            {{item}}
        </span>
        <div>{{findStr}}</div>
    </div>
</template>

<script>
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let leftArr = [];
  let rightArr = [];
  let q = arr[0];
  for (let i = 1, l = arr.length; i < l; i++) {
    if (arr[i] > q) {
      rightArr.push(arr[i]);
    } else {
      leftArr.push(arr[i]);
    }
  }

  return [].concat(quickSort(leftArr), [q], quickSort(rightArr));
}

export default {
  data() {
    return {
      str: "",
      arr: [1, 13, 24, 11, 11, 14, 1, 2],
      arr1: [30, 2, 5, 10, 8, 23, 11],
      findStr: "afjghdfraaaasdenas ",
      fibarr: ""
    };
  },
  created() {
    this.str = this.checkPalindrom("abcdefghijk");
    this.arr = this.unique(this.arr);
    this.findStr = this.findMaxDuplicateChar("afjghdfraaaasdenas");
    this.arr = this.bubbleSort(this.arr);
    this.arr1 = quickSort(this.arr1);
    console.log(this.arr1);
    this.fibarr = this.getFibonacci(20);
    console.log(this.fibarr);
  },
  mounted() {},
  methods: {
    // Q1 判断一个单词是否是回文？
    checkPalindrom(str) {
      return (str = str
        .split("")
        .reverse()
        .join(" "));
    },
    // Q2 去掉一组整型数组重复的值
    // 主要考察个人对Object的使用，利用key来进行筛选。
    unique(arr) {
      let hash = {};
      let data = [];
      for (let i = 0; i < arr.length; i++) {
        if (!hash[arr[i]]) {
          hash[arr[i]] = true;
          data.push(arr[i]);
        }
      }
      return data;
    },
    //Q3 统计一个字符串出现最多的字母
    // 给出一段英文连续的英文字符窜，找出重复出现次数最多的字母
    findMaxDuplicateChar(str) {
      if (str.length === 1) {
        return 1;
      }
      let charObj = {};
      for (let i = 0; i < str.length; i++) {
        // charAt() 方法可返回指定位置的字符。
        if (!charObj[str.charAt(i)]) {
          charObj[str.charAt(i)] = 1;
        } else {
          charObj[str.charAt(i)] += 1;
        }
      }
      let maxChar = "";
      let maxValue = 1;
      for (let k in charObj) {
        if (charObj[k] >= maxValue) {
          maxChar = k;
          maxValue = charObj[k];
        }
      }
      return maxChar;
    },
    //Q4 排序算法
    // 除了冒泡排序外，其实还有很多诸如 插入排序，快速排序，希尔排序 等。每一种排序算法都有各自的特点。全部掌握也不需要，但是心底一定要熟悉几种算法。 比如快速排序，其效率很高，而其基本原理如图(来自wiki)
    bubbleSort(arr) {
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] > arr[j]) {
            let tem = arr[i];
            arr[i] = arr[j];
            arr[j] = tem;
          }
        }
      }
      return arr;
    },
    //算法参考某个元素值，将小于它的值，放到左数组中，大于它的值的元素就放到右数组中，然后递归进行上一次左右数组的操作，返回合并的数组就是已经排好顺序的数组了。
    quickSort(arr) {
      if (arr.length <= 1) {
        return arr;
      }
      let leftArr = [];
      let rightArr = [];
      let q = 11;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > q) {
          rightArr.push(arr[i]);
        } else {
          leftArr.push(arr[i]);
        }
      }
      return [].concat(this.quickSort(leftArr), [11], this.quickSort(rightArr));
    },
    //Q6 使用canvas 绘制一个有限度的斐波那契数列的曲线？
    getFibonacci(n) {
      var fibarr = [];
      var i = 0;
      while (i < n) {
        if (i <= 1) {
          fibarr.push(i);
        } else {
          fibarr.push(fibarr[i - 1] + fibarr[i - 2]);
        }
        i++;
      }
      return fibarr;
    }
  },
  components: {},
  computed: {}
};
</script>
