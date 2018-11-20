<template>
    <div class="hello">
        <h1>Hello Vuex</h1>
        <p>{{$store.state.count === count}}</p>
        <p>{{count}}</p>
        <p>{{subCount}}</p>
        <p>{{$store.state.count}} - {{count}}</p>
        <p>
            <button @click="add({b:10})">+</button>
            <button @click="plus">-</button>
            <button @click="sub">sub</button>
            <button @click="getClick">GET</button>
        </p>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  created() {
    console.log(this.subCount);
    console.log(this.cou);
  },
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["count", "subCount"]),
    cou() {
      return this.$store.getters.subCount;
    }
  },
  methods: {
    ...mapMutations(["add", "plus", "sub"]),
    getClick() {
      console.log(this.subCount);
    }
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
