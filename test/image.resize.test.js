'use strict';

var fs = require('fs');
var path = require('path');
var upath = require('upath');
var bluebird = require('bluebird');
var copyFiles = require('copyfiles');
var sizeOf = require('image-size');
var glob = require('glob');
var expect = require('chai').expect;
var image = require('./../lib/image');

describe('Image resize tests', function() {
    after(function (done) {
        var copyFile = path.resolve(__dirname, 'sample-images', 'copy-capella.jpg');
        if(fs.existsSync(copyFile)) {
            fs.unlinkSync(copyFile);
        }
        done();
    });

    it('Should not resize the image with width error', function (done) {
        var options = {};
        // image.resize('./sample-images/');
        expect(image.resize('./sample-images/capella.jpg', options)).to.equal(false);
        done();
    });

    it('Should not resize and rewrite the image because required -y flag', function (done) {
        var options = {
            width: 300
        };

        expect(image.resize('./sample-images/capella.jpg', options)).to.equal(false);
        done();
    });

    it('Should resize and rewrite the image because of -y flag', function (done) {
        var options = {
            width: 300,
            yes: true
        };

        var from = path.resolve(__dirname, 'sample-images', 'capella.jpg');
        var to = path.resolve(__dirname, 'sample-images', 'copy-capella.jpg');
        var readStream = fs.createReadStream(from);
        var writeStream = fs.createWriteStream(to);
        readStream.pipe(writeStream).end(function () {
            image.resize(to, options)
                .then(function (success) {
                    expect(success).to.be.true;
                    done();
                })
                .catch(function (error) {
                    done();
                });
        });
    });

    it('Should resize as a squared image', function (done) {
        var options = {
            width: 300,
            output: path.resolve(__dirname, 'sample-images', 'f1.out.jpg')
        };
        var filename = upath.normalize(path.resolve(__dirname, 'sample-images', 'capella.jpg'));

        image.resize(filename, options)
            .then(function (success) {
                expect(success).to.equal(true);
                var dimensions = sizeOf(options.output);
                expect(dimensions).to.be.a('object');
                expect(dimensions.width).to.equal(300);
                expect(dimensions.height).to.equal(300);
                fs.unlinkSync(options.output);
                done();
            })
            .catch(function (error) {
                console.log(error);
                expect(error).to.be.true;
                done();
            });
    });

    it('Should resize a image with 500x300 dimensions', function (done) {
        var options = {
            width: 500,
            height: 300,
            output: path.resolve(__dirname, 'sample-images', 'f1.out.jpg')
        };
        var filename = upath.normalize(path.resolve(__dirname, 'sample-images', 'capella.jpg'));

        image.resize(filename, options).then(function(success) {
            expect(success).to.be.true;
            var dimensions = sizeOf(options.output);
            expect(dimensions.width).to.equal(500);
            expect(dimensions.height).to.equal(300);
            fs.unlinkSync(options.output);
            done();
        }).catch(function(error) {
            expect(error).to.equal(true);
            done();
        });
    });

    it('Should fail the resize because no width provided', function (done) {
        var options = {
            output: path.resolve(__dirname, 'sample-images', 'other', 'f1.out.jpg')
        };
        var filename = upath.normalize(path.resolve(__dirname, 'sample-images', 'capella.jpg'));

        expect(image.resize(filename, options)).to.equal(false);
        done();
    });
});