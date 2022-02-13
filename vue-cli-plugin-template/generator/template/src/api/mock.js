import Mock from 'mockjs'

Mock.mock('/test', 'get', () => {
    return {
        code: '0',
        msg: '请求成功',
        data: '我是测试数据'
    }
})