'use strict';
var image = require('./image');

module.exports.resize = function (file, options) {
    image.resize(file, options)
        .then(function (value) {
            return value;
        })
        .catch(function (reason) {

        });
};

module.exports.rotate = function (file, degrees, options) {
    image.rotate(file, degrees, options)
        .then(function (value) {
            return value;
        })
        .catch(function (reason) {

        });
};

module.exports.convert = function (file, options) {
    image.convert(file, options)
        .then(function (value) {
            return value;
        })
        .catch(function (reason) {

        });
};

module.exports.flip = function (file, options) {
    image.flip(file, options)
        .then(function (value) {
            return value;
        })
        .catch(function (reason) {

        });
};

module.exports.flop = function (file, options) {
    image.flop(file, options)
        .then(function (value) {
            return value;
        })
        .catch(function (reason) {

        });
};

module.exports.blur = function (file, options) {
    image.blur(file, options)
        .then(function (value) {
            return value;
        })
        .catch(function (reason) {

        });
};