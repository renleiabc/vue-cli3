<template>
    <div>
        <h2>sdasddsadas</h2>
        <h1>This is an about page</h1>
        <input type="text"  v-blur="color" v-focus>
        <div v-lang='items'>{{num}}</div>
        <p>
            <button @click="add">add</button>
        </p>
        <p>
            <!-- <button @click = "unbind()">解绑</button> -->
        </p>
        <p>FullName:{{fullName}}</p>
        <p>FirstName:<input type='text' v-model="firstName"></p>
        <p>obj:<input type="text" v-model="obj.name"></p>
        <p>obj:{{last}}</p>
    </div>
</template>
<script>
export default {
  data() {
    return {
      color: "lime",
      items: 12,
      num: 10,
      firstName: "aaa",
      fullName: "",
      lastName: "",
      obj: {
        name: "renlei"
      },
      last: "last",
      middle: ""
    };
  },
  directives: {
    blur: {
      inserted: function(el, banding) {
        console.log(banding);
        el.style = "background:" + banding.value;
        el.blur();
      }
    },
    lang: {
      // 五个注册指令的钩子函数
      bind: function() {
        // 被绑定
        console.log("1 -band");
      },
      inserted: function() {
        //绑定到节点
        console.log("2 - inserted");
      },
      update: function() {
        // 组件更新
        console.log("3 - update");
      },
      componentUpdated: function() {
        // 组件更新完成
        console.log("4 - compoentUpdated");
      },
      unbind: function() {
        // 解绑
        console.log("5 - bind");
      }
    }
  },
  created() {},
  methods: {
    add() {
      this.num++;
    },
    unbind() {
      // 另起一个解绑的方法
      //  this.$destroy();
      console.log(this.num);
      if (this.num === this.items) this.$destroy();
    }
  },
  //handler方法和immediate属性
  // watch 的一个特点是，最初绑定的时候是不会执行的，要等到被监听的数据(例如本利当中的num)改变时才执行监听计算。我们想要一开始就让它最初绑定的时候就执行，就需要一个immedite属性，这个属性设置为true以后，就代表在watch里面声明了被检测数据以后就会先执行handler的方法，如果为false就跟我们以前的效果一样，不会再绑定的时候执行了。
  watch: {
    num: {
      handler: "unbind",
      immediate: true
    },
    firstName: {
      handler(newName) {
        this.fullName = newName + "" + this.lastName;
      },
      immediate: true
    },
    // 当我们在输入框中标输入数据视图改变obj.name的值的时候，发现是无效的。vue不能检测到对象属性的添加或删除。
    // 如果需要监听obj里面的属性name的值，这时候deep属性就派上用场了。
    // deep的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改obj里面任何一个属性都会触发这个监听器里的 handler。
    // 优化，我们可以是使用字符串形式监听。
    "obj.name": {
      handler(newName) {
        this.last = newName + this.middle;
      },
      immediate: true
      //deep: true
    }
  }
};
</script>
