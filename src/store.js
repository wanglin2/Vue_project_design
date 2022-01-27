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
                code: ['1'] // 用户拥有的权限
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