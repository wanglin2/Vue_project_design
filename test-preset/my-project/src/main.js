import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './style/index.scss'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import {
  setLanguage
} from './utils'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueRouter)

// 全局混入：面包屑数据
Vue.mixin({
  props: {
    breadcrumbObj: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    breadcrumb() {
      if (!this.breadcrumbObj) {
        return []
      }
      let {
        code,
        breadcrumb
      } = this.breadcrumbObj
      // 用户接口获取的面包屑数据
      let breadcrumbData = this.$store.state.userInfo.breadcrumb
      // 当前路由是否存在面包屑数据
      let firstBreadcrumb = breadcrumbData && Array.isArray(breadcrumbData[code]) ? breadcrumbData[code] : []
      // 合并两部分的面包屑数据
      return firstBreadcrumb.concat(breadcrumb || [])
    }
  }
})

const initApp = async () => {
  await store.dispatch('getUserInfo')
  await setLanguage(store.state.userInfo.language)
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app')
}

initApp()
