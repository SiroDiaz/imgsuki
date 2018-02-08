'use strict';

var fs = require('fs');
var path = require('path');
var upath = require('upath');
var sizeOf = require('image-size');
var glob = require('glob');
var expect = require('chai').expect;
var image = require('./../lib/image');

describe('Image rotate tests', function () {
    it('should fail to rotate the image with no degrees provided', function (done) {
        var options = {
            output: path.resolve(__dirname, 'sample-images', 'f1.out.jpg')
        };
        var filename = upath.normalize(path.resolve(__dirname, 'sample-images', 'capella.jpg'));

        expect(image.rotate(filename, undefined, options)).to.equal(false);
        done();
    });

    it('should fail to rotate the image because degrees are not multiples of 90', function (done) {
        var options = {
            output: path.resolve(__dirname, 'sample-images', 'f1.out.jpg')
        };
        var filename = upath.normalize(path.resolve(__dirname, 'sample-images', 'capella.jpg'));

        expect(image.rotate(filename, 80, options)).to.equal(false);
        done();
    });

    it('should rotate successfully the image', function (done) {
        var options = {
            output: path.resolve(__dirname, 'sample-images', 'f1.out.jpg')
        };
        var filename = upath.normalize(path.resolve(__dirname, 'sample-images', 'capella.jpg'));

        image.rotate(filename, 90, options)
            .then(function (success) {
                expect(success).to.equal(true);
                var dimensions = sizeOf(options.output);
                expect(dimensions.width).to.equal(450);
                expect(dimensions.height).to.equal(800);
                fs.unlinkSync(options.output);
                done();
            })
            .catch(function (error) {
                expect(error).to.not.equal(undefined);
                done();
            });
    });
});