<template>
  <div id="app">
    <el-menu
      style="width: 250px; height: 100%"
      :router="true"
      :default-active="defaultActive"
    >
      <el-menu-item
        v-for="(item, index) in navList"
        :key="index"
        :index="item.router"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
import navList from './nav.config.js'

export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {
    navList() {
      const { userInfo } = this.$store.state
      if (!userInfo || !userInfo.code || userInfo.code.length <= 0) return []
      return navList.filter((item) => {
        return userInfo.code.includes(item.code)
      })
    },
    defaultActive() {
      let path = this.$route.path
      // 检查是否有完全匹配的
      let fullMatch = navList.find((item) => {
        return item.router === path
      })
      // 没有则检查是否有部分匹配
      if (!fullMatch) {
        fullMatch = navList.find((item) => {
          return new RegExp('^' + item.router + '/').test(path)
        })
      }
      return fullMatch ? fullMatch.router : ''
    },
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  border: 0;
  outline: none;
}

html,
body {
  width: 100%;
  height: 100%;
}
</style>
<style scoped>
#app {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>