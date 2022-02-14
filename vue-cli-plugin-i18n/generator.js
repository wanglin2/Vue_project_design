const {
    exec
} = require('child_process');

module.exports = (api) => {
    // 为了方便在项目里看到编译多语言的命令，我们把hello i18n添加到项目的package.json文件里，修改package.json文件可以使用提供的api.extendPackage方法
    api.extendPackage({
        scripts: {
            buildI18n: 'hello i18n'
        }
    })
    // 该钩子会在文件写入硬盘后调用
    api.afterInvoke(() => {
        // 获取项目的完整路径
        let targetDir = api.generator.context
        // 进入项目文件夹，然后运行命令
        exec(`cd ${targetDir} && npm run buildI18n`, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log(stdout);
            console.error(stderr);
        });
    })
}