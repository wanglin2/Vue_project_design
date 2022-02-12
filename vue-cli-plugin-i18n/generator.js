const {
    exec
} = require('child_process');

module.exports = () => {
    exec('xxx i18n', (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(stdout);
        console.error(stderr);
    });
}