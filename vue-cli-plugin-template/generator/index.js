module.exports = (api) => {
    // 扩展package.json
    api.extendPackage({
        "dependencies": {
            "axios": "^0.25.0",
            "element-ui": "^2.15.6",
            "vue-i18n": "^8.27.0",
            "vue-router": "^3.5.3",
            "vuex": "^3.6.2"
        },
        "devDependencies": {
            "mockjs": "^1.1.0",
            "sass": "^1.49.7",
            "sass-loader": "^8.0.2",
            "@wanglin1994/hello-tool": "^1.0.1"
        }
    })

    api.render('./template')
}