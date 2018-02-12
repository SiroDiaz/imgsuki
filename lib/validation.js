'use strict';

var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var log = console.log;

module.exports.dirExists = function (output) {
    var fileDir = path.resolve(path.dirname(output));
    if (!fs.existsSync(fileDir)) {
        log(chalk.red('Output directory does not exist'));
        process.exit(1);
    }

    return path.join(fileDir, path.basename(output));
};

module.exports.fileExists = function (file) {
    if (!fs.existsSync(file)) {
        log(chalk.red('File "'+ file +'" does not exist'));
        process.exit(1);
    }

    return file;
};

module.exports.isValidSigma = function (sigma) {
    sigma = parseFloat(sigma);

    if (isNaN(sigma) || sigma < 0.3 || sigma > 1000) {
        log(chalk.red('Sigma (blur level) accepts values between 0.3 and 1000'));
        process.exit(1);
    }

    return sigma;
};
