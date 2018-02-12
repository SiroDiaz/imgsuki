'use strict';

var fs = require('fs-extra');
var exif = require('exif');
var path = require('path');
var upath = require('upath');
var fileType = require('file-type');
var sizeOf = require('image-size');
var readChunk = require('read-chunk');
var log = console.log;


/**
 *
 * @param file
 */
module.exports.basic = function (options) {
    log(options);
    /*
    var dimensions = sizeOf(file);
    var bufferChunk = readChunk.sync(file, 0, 4100);
    var type = fileType(bufferChunk);
    */
    log(chalk.bgBlackBright('Basic info'));
    log(chalk.gray() +"\t"+ chalk.green(dimensions.width +'x'+ dimensions.height));
};