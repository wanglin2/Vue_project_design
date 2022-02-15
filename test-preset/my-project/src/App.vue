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
        <span slot="title">{{ $t(item.title) }}</span>
      </el-menu-item>
    </el-menu>
    <router-view />
    <div class="langSelectBox">
      <el-select size="small" v-model="lang" @change="langChange">
        <el-option
          v-for="item in langList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import navList from './nav.config.js'
import { mapState } from 'vuex'
import { setLanguage } from './utils'

export default {
  name: 'App',
  data() {
    return {
      langList: [
        {
          label: '中文',
          value: 'zh_CN',
        },
        {
          label: 'English',
          value: 'en_US',
        },
      ],
      lang: '',
    }
  },
  computed: {
    ...mapState({
      language: (state) => state.userInfo.language,
    }),
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
  created() {
    this.lang = this.language
  },
  methods: {
    langChange() {
      setLanguage(this.lang)
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

.langSelectBox {
  position: fixed;
  right: 10px;
  top: 10px;
  width: 100px;
}
</style>
