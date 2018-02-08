'use strict';

var fs = require('fs');
var sharp = require('sharp');
var upath = require('upath');
var chalk = require('chalk');
var sizeOf = require('image-size');
var log = console.log;

module.exports.resize = function(file, options) {
    if(options.width === undefined) {
        log('Width (-w or --width) required');
        return false;
    }
    if(options.output === undefined) {
        log('Output file required');
        return false;
    }

    var width = parseInt(options.width);
    var height = options.height !== undefined ?
        parseInt(options.height) : width;
    var filePath = upath.normalize(file);

    if(!fs.existsSync(filePath)) {
        log(chalk.bgRed('File doesn\'t exist'));
        return false;
    }
    return new Promise(function(resolve, reject) {
        sharp(filePath)
            .resize(width, height)
            .toFile(options.output, function (error, info) {
                if(error) {
                    log(chalk.bgRed('Error resizing image'));
                    return reject(false);
                }

                resolve(true);
            });
    });
};

module.exports.rotate = function(file, degrees, options) {
    var filePath = upath.normalize(file);
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
            .toFile(output, function(error, info) {
                if(error) {
                    log(chalk.bgRed('Error rotating image'));
                    reject(error);
                }

                resolve(true);
            });
    });
};

module.exports.convert = function(file, format) {

};

module.exports.flip = function(file) {
    log('fliiiip');
};

module.exports.flop = function(file) {

};

module.exports.blur = function(file, sigma) {

};
