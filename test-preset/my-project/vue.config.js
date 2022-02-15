module.exports = {
    transpileDependencies: [],
    devServer: {
        proxy: {
            '^/api/': {
                target: 'http://xxx:xxx',
                changeOrigin: true
            }
        }
    }
}
