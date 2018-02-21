'use strict';

var fs = require('fs');
var path = require('path');
var upath = require('upath');
var fileType = require('file-type');
var sizeOf = require('image-size');
var readChunk = require('read-chunk');
var expect = require('chai').expect;
var image = require('./../lib/image');

describe('Image convert tests', function () {
    it('should fail because no image format given', function (done) {
        var options = {
            input: upath.normalize(path.resolve(__dirname, 'sample-images', 'capella.jpg'))
        };

        image.convert(options)
            .then(function (value) {
                done();
            })
            .catch(function (error) {
                expect(error).to.be.false;
                done();
            });
    });

    it('should convert the file format from jpg to png in the specified output', function (done) {
        var options = {
            format: 'png',
            input: upath.normalize(path.resolve(__dirname, 'sample-images', 'capella.jpg')),
            output: upath.normalize(path.resolve(__dirname, 'sample-images', 'capella.png'))
        };
        image.convert(options)
            .then(function (success) {
                expect(success).to.be.true;
                var bufferChunk = readChunk.sync(options.output, 0, 4100);
                var type = fileType(bufferChunk);
                expect(type).to.be.an('object');
                expect(type.ext).to.equal('png');
                expect(type.mime).to.equal('image/png');
                fs.unlinkSync(options.output);
                done();
            })
            .catch(function (error) {
                expect(error).to.be.true;
                done();
            });
    });

    it('should convert the file format from jpg to png in the current directory', function (done) {
        var options = {
            format: 'png',
            input: upath.normalize(path.resolve(__dirname, 'sample-images', 'capella.jpg')),
            output: path.join(__dirname)
        };

        image.convert(options)
            .then(function (success) {
                expect(success).to.be.true;
                var bufferChunk = readChunk.sync(path.join(options.output, 'capella.png'), 0, 4100);
                var type = fileType(bufferChunk);
                expect(type).to.be.an('object');
                expect(type.ext).to.equal('png');
                expect(type.mime).to.equal('image/png');
                fs.unlinkSync(path.join(options.output, 'capella.png'));
                done();
            })
            .catch(function (error) {
                console.log(error);
                expect(error).to.be.true;
                done();
            });
    });
});

