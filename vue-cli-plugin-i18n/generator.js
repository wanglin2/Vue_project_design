const {
    exec
} = require('child_process');

module.exports = (api) => {
    api.extendPackage({
        scripts: {
            buildI18n: 'hello i18n'
        }
    })

    exec('npm run buildI18n', (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(stdout);
        console.error(stderr);
    });
}