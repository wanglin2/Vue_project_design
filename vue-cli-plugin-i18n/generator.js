const {
    exec
} = require('child_process');

module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        scripts: {
            buildI18n: 'hello i18n'
        }
    })
    api.afterInvoke(() => {
        exec(`cd ${rootOptions.projectName} && hello i18n`, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log(stdout);
            console.error(stderr);
        });
    })
}