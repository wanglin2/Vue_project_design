<template>
  <div class="container">
    <div class="breadcrumbBox">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{
          $t(item)
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="$t('hello.title')" />
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
// import api from '../api'

export default {
  name: 'Hello',
  components: {
    HelloWorld,
  },
  created() {
    // api.test()
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  text-align: center;
  color: #2c3e50;
}

.breadcrumbBox {
  padding: 20px;
}
</style>
