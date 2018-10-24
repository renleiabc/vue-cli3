<!-- 计算属性 vs 侦听属性  -->
<template>
    <div>
        <div>
            {{fullName}}
        </div>
        <div>
            {{fullDome}}
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      lastName: "Bar",
      fristName: "Foo",
      fullDome: "Bar Foo"
    };
  },
  created() {},
  mounted() {},
  methods: {},
  components: {},
  watch: {
    firstName: function(val) {
      this.fullDome = val + " " + this.lastName;
    },
    lastName: function(val) {
      this.fullDome = this.lastName + " " + val;
    }
  },
  computed: {
    fullName: function() {
      return this.fristName + " " + this.lastName;
    }
  }
};
</script>
