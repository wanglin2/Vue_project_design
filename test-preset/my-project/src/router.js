import Vue from 'vue'
import Router from 'vue-router'
import routes from './router.config.js'
import store from './store'

Vue.use(Router)

const createRoute = (routes) => {
    if (!routes) {
        return []
    }
    return routes.map((item) => {
        return {
            ...item,
            component: () => {
                return import('./pages/' + item.component)
            },
            children: createRoute(item.children),
            meta: {
                code: item.code
            },
            props: {
                breadcrumbObj: {
                    breadcrumb: item.breadcrumb,
                    code: item.code
                } 
            }
        }
    })
}

const router = new Router({
    mode: 'history',
    routes: createRoute(routes),
})

router.beforeEach((to, from, next) => {
    const userInfo = store.state.userInfo
    const code = userInfo && userInfo.code && userInfo.code.length > 0 ? userInfo.code : []
    // 去错误页面直接跳转即可，否则会引起死循环
    if (/^\/error\//.test(to.path)) {
        return next()
    }
    // 有权限
    if (code.includes(to.meta.code)) {
        next()
    } else if (to.meta.code) { // 路由存在，没有权限，跳转到403页面
        next({
            path: '/error/403'
        })
    } else { // 没有code则代表是非法路径，跳转到404页面
        next({
            path: '/error/404'
        })
    }
})

export default router
