'use strict';

var fs = require('fs-extra');
var chalk = require('chalk');
var log = console.log;

module.exports.fileExists = function (file) {
    if (!fs.existsSync(file)) {
        log(chalk.red('File "'+ file +'" does not exist'));
        process.exit(1);
    }

    return file;
};
