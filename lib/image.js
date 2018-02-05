'use strict';

var fs = require('fs');
var sharp = require('sharp');
var upath = require('upath');
var chalk = require('chalk');

module.exports.resize = function(file, options) {
    if(options.width === undefined) {
        console.log('Width (-w or --width) required');
        return false;
    }
    if(options.output === undefined) {
        console.log('Output file required');
        return false;
    }

    var width = parseInt(options.width);
    var height = options.height !== undefined ?
        parseInt(options.height) : width;
    var filePath = upath.normalize(file);

    if(!fs.existsSync(filePath)) {
        console.log('File doesn\'t exist');
        return false;
    }
    sharp(filePath)
        .resize(width, height)
        .toFile(options.output, function (error, info) {
            if(error) {
                throw error;
            }

            return true;
        });
};

module.exports.rotate = function(file, degrees) {

};

module.exports.convert = function(file, format) {

};

module.exports.flip = function(file) {
    console.log('fliiiip');
};

module.exports.flop = function(file) {

};

module.exports.blur = function(file, sigma) {

};
