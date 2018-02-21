'use strict';

var fs = require('fs');
var path = require('path');
var sharp = require('sharp');
var upath = require('upath');
var chalk = require('chalk');
var fileType = require('file-type');
var sizeOf = require('image-size');
var readChunk = require('read-chunk');
var pad = require('pad');
var exif = require('exif');
var filesize = require('filesize');
var info = require('./actions/info');

var log = console.log;

function saveToFile(buffer, fileOutput, resolve, reject) {
    fs.writeFile(fileOutput, buffer, function (error) {
        if(error) {
            log(chalk.bgRed('Error saving the file from the buffer'));
            return reject(false);
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
    return new Promise(function(resolve, reject) {
        if(options.width === undefined) {
            log('Width (-w or --width) required');
            return reject(false);
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
            return reject(false);
        }
        if(filePath === output && options.yes === undefined) {
            log('If you want to override the image add the flag -y or --yes');
            return reject(false);
        }

        sharp(filePath)
            .resize(width, height)
            .toBuffer()
            .then(function (buffer) {
                saveToFile(buffer, output, resolve, reject);
            })
            .catch(function (error) {
                log(chalk.bgRed('Error resizing image'));
                console.log(error);
                reject(false);
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
                saveToFile(buffer, output, resolve, reject);
            })
            .catch(function (error) {
                log(chalk.bgRed('Error rotating image'));
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
module.exports.convert = function(options) {
    return new Promise(function (resolve, reject) {
        try {
            var filePath = upath.normalize(options.input);
            var output = options.output;

            try {
                if (fs.statSync(output).isDirectory()) {
                    output = path.join(output, path.basename(filePath).replace(/(jpg|png|webp|tiff|raw)$/i, options.format));
                }
            } catch (e) {   // file does not exist
                // create an empty file with the file extension
                fs.closeSync(fs.openSync(output.replace(/(jpg|png|webp|tiff|raw)$/i, options.format), 'w'));
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
        } catch (e) {
            log(chalk.red(e.message));
            reject(false);
        }
    });
};

/**
 *
 * @param options
 * @returns {*}
 */
module.exports.flip = function(options) {
    return new Promise(function (resolve, reject) {
        try {
            var filePath = upath.normalize(options.input);
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
                    if (error) {
                        log(chalk.bgRed('Error saving image'));
                        reject(false);
                    }
                });
        } catch (e) {
            log(chalk.red(e.message));
            reject(false);
        }
    });
};

/**
 *
 * @param file
 * @param options
 * @returns {*}
 */
module.exports.flop = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var filePath = upath.normalize(options.input);
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
        } catch (e) {
            log(chalk.red(e.message));
            reject(false);
        }
    });
};

/**
 *
 * @param file
 * @param options
 * @returns {*}
 */
module.exports.blur = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var filePath = upath.normalize(options.input);
            var output = options.output !== undefined ?
                upath.normalize(options.output) :
                filePath;

            sharp(filePath)
                .blur(options.sigma)
                .toBuffer()
                .then(function (buffer) {
                    return saveToFile(buffer, output, resolve, reject);
                })
                .catch(function (error) {
                    log(chalk.bgRed('Error saving image'));
                    return reject(false);
                });
        } catch (e) {
            log(chalk.red(e.message));
            reject(false);
        }
    });
};

module.exports.getInfo = function (options) {
    return new Promise(function(resolve, reject) {
        var dimensions = sizeOf(options.input);
        var bufferChunk = readChunk.sync(options.input, 0, 4100);
        var type = fileType(bufferChunk);
        var stats = fs.statSync(options.input);

        log('File: '+ chalk.bgGreen(options.input));
        if (options.camera !== undefined) {
            exif.ExifImage({ image: options.input }, function (error, exifData) {
                if(error) {
                    log(chalk.red(error.message));
                    return reject(false);
                }

                log(exifData);
                return resolve(true);
            });
        } else if(options.all !== undefined) {
            exif.ExifImage({ image: options.input }, function (error, exifData) {
                log(chalk.bgBlackBright('Camera info'));
                if(error) {
                    log(chalk.red(error.message));
                    log();
                } else {
                    exifData.image.Software !== undefined ? log(chalk.gray(pad('Software', 20)) + chalk.green(exifData.image.Software)) : '';
                    exifData.image.ModifyDate !== undefined ? log(chalk.gray(pad('Modified', 20)) + chalk.green(exifData.image.ModifyDate)) : '';
                }

                log(chalk.bgBlackBright('Basic info'));
                log(chalk.gray(pad('File name', 20)) + chalk.green(path.basename(options.input)));
                log(chalk.gray(pad('Directory', 20)) + chalk.green(path.resolve(path.dirname(options.input))));
                log(chalk.gray(pad('Dimensions', 20)) + chalk.green(dimensions.width +'x'+ dimensions.height));
                log(chalk.gray(pad('Width', 20)) + chalk.green(dimensions.width));
                log(chalk.gray(pad('Height', 20)) + chalk.green(dimensions.height));
                log(chalk.gray(pad('Extension', 20)) + chalk.green(type.ext));
                log(chalk.gray(pad('Mime', 20)) + chalk.green(type.mime));
                log(chalk.gray(pad('File size', 20)) + chalk.green(filesize(stats.size)));

                return resolve(true);
            });

        } else {
            log(chalk.bgBlackBright('Basic info'));
            log(chalk.gray(pad('File name', 20)) + chalk.green(path.basename(options.input)));
            log(chalk.gray(pad('Directory', 20)) + chalk.green(path.resolve(path.dirname(options.input))));
            log(chalk.gray(pad('Dimensions', 20)) + chalk.green(dimensions.width +'x'+ dimensions.height));
            log(chalk.gray(pad('Width', 20)) + chalk.green(dimensions.width));
            log(chalk.gray(pad('Height', 20)) + chalk.green(dimensions.height));
            log(chalk.gray(pad('Extension', 20)) + chalk.green(type.ext));
            log(chalk.gray(pad('Mime', 20)) + chalk.green(type.mime));
            log(chalk.gray(pad('File size', 20)) + chalk.green(filesize(stats.size)));
        }

        resolve(true);
    });
};
