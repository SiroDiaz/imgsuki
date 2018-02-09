'use strict';

var fs = require('fs');
var path = require('path');
var sharp = require('sharp');
var upath = require('upath');
var chalk = require('chalk');
var fileType = require('file-type');
var sizeOf = require('image-size');
var readChunk = require('read-chunk');

var log = console.log;

function saveToFile(buffer, fileOutput, resolve) {
    fs.writeFile(fileOutput, buffer, function (error) {
        if(error) {
            log(chalk.bgRed('Error saving the file from the buffer'));
        }

        resolve(true);
    });
}

/**
 *
 * @param file
 * @param options
 * @returns {*}
 */
module.exports.resize = function(file, options) {
    if(options.width === undefined) {
        log('Width (-w or --width) required');
        return false;
    }
    var width = options.width;
    var height = options.height !== undefined ?
        options.height : width;
    var filePath = upath.normalize(file);
    var output = options.output !== undefined ?
        upath.normalize(options.output) :
        upath.normalize(file);
    if(!fs.existsSync(filePath)) {
        log(chalk.bgRed('File doesn\'t exist'));
        return false;
    }
    if(filePath === output && !options.yes) {
        log('If you want to override the image add the flag -y or --yes');
        return false;
    }

    return new Promise(function(resolve, reject) {
        sharp(filePath)
            .resize(width, height)
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve);
            })
            .catch(function (error) {
                log(chalk.bgRed('Error resizing image'));
                reject(error);
            });
    });
};

/**
 *
 * @param file
 * @param degrees
 * @param options
 * @returns {*}
 */
module.exports.rotate = function(file, degrees, options) {
    var filePath = upath.normalize(file);
    var degrees = parseInt(degrees);
    if(!fs.existsSync(filePath)) {
        log(chalk.bgRed('File doesn\'t exist'));
        return false;
    }

    if(Math.abs(degrees) % 90 !== 0) {
        log(chalk.bgRed('Only allowed positive or negative angles multiple of 90 degrees'));
        return false;
    }
    var output = options.output !== undefined ? options.output : filePath;

    return new Promise(function (resolve, reject) {
        sharp(filePath)
            .rotate(degrees)
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve);
            })
            .catch(function (error) {
                log(chalk.bgRed('Error rotating image'));
                reject(error);
            });
    });
};

/**
 *
 * @param file
 * @param options
 * @returns {*}
 */
module.exports.convert = function(file, options) {
    var filePath = upath.normalize(file);
    if(!fs.existsSync(filePath)) {
        log(chalk.bgRed('File doesn\'t exist'));
        return false;
    }
    if(options.format === undefined) {
        log(chalk.bgRed('Format required. --format jpg|png|webp'));
        return false;
    }

    var output = options.output !== undefined ?
        upath.normalize(options.output).replace(/(jpg|png|webp)$/i, options.format) :
        filePath.replace(/(jpg|png|webp)$/i, options.format);

    if(fs.existsSync(output) && fs.statSync(output).isDirectory()) {
        output = path.join(output, path.basename(filePath).replace(/(jpg|png|webp)$/i, options.format));
    }

    if(options.output !== undefined && !fs.statSync(filePath).isFile()) {
        output = path.resolve(filePath, filePath)
    }

    return new Promise(function (resolve, reject) {
        sharp(filePath)
            .toFormat(options.format)
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve);
            })
            .catch(function (error) {
                log(chalk.bgRed('Error saving image'));
                reject(error);
            });
    });
};

module.exports.flip = function(file, options) {
    var filePath = upath.normalize(file);
    if(!fs.existsSync(filePath)) {
        log(chalk.bgRed('File doesn\'t exist'));
        return false;
    }
    var output = options.output !== undefined ?
        upath.normalize(options.output) :
        filePath;

    return new Promise(function (resolve, reject) {
        sharp(filePath)
            .flip()
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve);
            })
            .catch(function (error) {
                if(error) {
                    log(chalk.bgRed('Error saving image'));
                    reject(error);
                }
            });
    });
};

module.exports.flop = function(file, options) {
    var filePath = upath.normalize(file);
    if(!fs.existsSync(filePath)) {
        log(chalk.bgRed('File doesn\'t exist'));
        return false;
    }
    var output = options.output !== undefined ?
        upath.normalize(options.output) :
        filePath;

    return new Promise(function (resolve, reject) {
        sharp(filePath)
            .flop()
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve);
            })
            .catch(function (err) {
                reject(err);
            });
    });
};

module.exports.blur = function(file, options) {
    var filePath = upath.normalize(file);
    if(!fs.existsSync(filePath)) {
        log(chalk.bgRed('File doesn\'t exist'));
        return false;
    }
    var output = options.output !== undefined ?
        upath.normalize(options.output) :
        filePath;
    var blurSigma = options.sigma;
    if(blurSigma < 0.3 || blurSigma > 1000) {
        log(chalk.bgRed('Sigma (blur level) accepts values between 0.3 and 1000'));
        return false;
    }

    return new Promise(function (resolve, reject) {
        sharp(filePath)
            .blur(blurSigma)
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve);
            })
            .catch(function (error) {
                log(chalk.bgRed('Error saving image'));
                reject(error);
            });
    });
};
