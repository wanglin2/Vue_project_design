import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: null,
    },
    actions: {
        async getUserInfo(ctx) {
            let userInfo = {
                code: ['001'], // 用户拥有的权限
                breadcrumb: {// 面包屑数据
                    '001': ['breadcrumb.hello'],
                },
                language: 'zh_CN'// 默认语言
            }
            ctx.commit('setUserInfo', userInfo)
        }
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    },
})
