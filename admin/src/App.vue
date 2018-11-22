<template>
    <div id="app">
        <nav-header></nav-header>
        <router-view />
    </div>
</template>

<script>
export default {
  name: "app",
  created() {
    this.mixinGetLess("index");
  },
  components: {}
};
</script>
