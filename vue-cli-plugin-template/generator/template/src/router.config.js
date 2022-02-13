export default [{
        path: '/',
        redirect: '/hello',
    },
    {
        name: 'Error',
        path: '/error/:type',
        component: 'Error',
    },
    {
        name: 'hi',
        path: '/hi/',
        code: '无权限测试，请输入hi',
        component: 'Hello',
    },
    {
        name: 'hello',
        path: '/hello/',
        code: '001',
        component: 'Hello',
        breadcrumb: ['breadcrumb.world'],
    }
]