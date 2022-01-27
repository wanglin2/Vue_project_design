<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'Hello',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
