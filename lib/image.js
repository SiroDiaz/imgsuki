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

function saveToFile(buffer, fileOutput, resolve, reject) {
    fs.writeFile(fileOutput, buffer, function (error) {
        if(error) {
            log(chalk.bgRed('Error saving the file from the buffer'));
            return reject(false);
        }

        return resolve(true);
    });
}

/**
 *
 * @param file
 * @param options
 * @returns {*}
 */
module.exports.resize = function(file, options) {
    return new Promise(function(resolve, reject) {
        if(options.width === undefined) {
            log('Width (-w or --width) required');
            reject(false);
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
            reject(false);
        }
        if(filePath === output && !options.yes) {
            log('If you want to override the image add the flag -y or --yes');
            reject(false);
        }

        sharp(filePath)
            .resize(width, height)
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve, reject);
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
    return new Promise(function (resolve, reject) {
        var filePath = upath.normalize(file);
        degrees = parseInt(degrees);
        if(!fs.existsSync(filePath)) {
            log(chalk.red('File doesn\'t exist'));
            return reject(false);
        }
        if(isNaN(degrees) || Math.abs(degrees) % 90 !== 0) {
            log(chalk.red('Only allowed positive angles multiple of 90 degrees'));
            return reject(false);
        }
        var output = options.output !== undefined ? options.output : filePath;

        sharp(filePath)
            .rotate(degrees)
            .toBuffer()
            .then(function (buffer) {
                return saveToFile(buffer, output, resolve, reject);
            })
            .catch(function (error) {
                log(chalk.bgRed('Error rotating image'));
                return reject(false);
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
    return new Promise(function (resolve, reject) {
        var filePath = upath.normalize(file);
        if(!fs.existsSync(filePath)) {
            log(chalk.bgRed('File doesn\'t exist'));
            reject(false);
        }
        if(options.format === undefined) {
            log(chalk.bgRed('Format required. --format jpg|png|webp'));
            reject(false);
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

        sharp(filePath)
            .toFormat(options.format)
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve, reject);
            })
            .catch(function (error) {
                log(chalk.bgRed('Error saving image'));
                reject(false);
            });
    });
};

module.exports.flip = function(file, options) {
    return new Promise(function (resolve, reject) {
        var filePath = upath.normalize(file);
        if(!fs.existsSync(filePath)) {
            log(chalk.bgRed('File doesn\'t exist'));
            return reject(false);
        }
        var output = options.output !== undefined ?
            upath.normalize(options.output) :
            filePath;

        sharp(filePath)
            .flip()
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve, reject);
            })
            .catch(function (error) {
                if(error) {
                    log(chalk.bgRed('Error saving image'));
                    reject(false);
                }
            });
    });
};

/**
 *
 * @param file
 * @param options
 * @returns {*}
 */
module.exports.flop = function(file, options) {
    return new Promise(function (resolve, reject) {
        var filePath = upath.normalize(file);
        if(!fs.existsSync(filePath)) {
            log(chalk.bgRed('File doesn\'t exist'));
            return reject(false);
        }
        var output = options.output !== undefined ?
            upath.normalize(options.output) :
            filePath;

        sharp(filePath)
            .flop()
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve, reject);
            })
            .catch(function (err) {
                reject(false);
            });
    });
};

/**
 *
 * @param file
 * @param options
 * @returns {*}
 */
module.exports.blur = function(file, options) {
    return new Promise(function (resolve, reject) {
        var filePath = upath.normalize(file);
        if(!fs.existsSync(filePath)) {
            log(chalk.bgRed('File doesn\'t exist'));
            return reject(false);
        }
        var output = options.output !== undefined ?
            upath.normalize(options.output) :
            filePath;
        var blurSigma = options.sigma;
        if(blurSigma < 0.3 || blurSigma > 1000) {
            log(chalk.bgRed('Sigma (blur level) accepts values between 0.3 and 1000'));
            return reject(false);
        }

        sharp(filePath)
            .blur(blurSigma)
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve, reject);
            })
            .catch(function (error) {
                log(chalk.bgRed('Error saving image'));
                reject(false);
            });
    });
};
