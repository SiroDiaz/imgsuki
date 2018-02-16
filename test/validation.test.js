'use strict';

var path = require('path');
var expect = require('chai').expect;
var validation = require('./../lib/validation');

describe('Test option validators', function () {
    describe('Test dirExists', function () {
        it('Should exit returning false', function (done) {
            expect(validation.dirExists(path.join(__dirname, 'sample-img', 'result'), true)).to.be.false;
            done();
        });

        it('Should pass and return the directory and filename', function (done) {
            console.log(path.join(__dirname, 'sample-images', 'out.jpg'));
            expect(
                validation.dirExists(
                    path.join(__dirname, 'sample-images', 'out.jpg'), true
                )
            ).to.equal(path.join(__dirname, 'sample-images', 'out.jpg'));
            done();
        });
    });

    describe('Test fileExists', function () {
        it('Should exit returning false', function (done) {
            expect(validation.fileExists(path.join(__dirname, 'sample-img', 'result.jpg'), true)).to.be.false;
            done();
        });

        it('Should pass and return the relative path to the file', function (done) {
            console.log(path.join(__dirname, 'sample-images', 'out.jpg'));
            expect(
                validation.fileExists(
                    path.join(__dirname, 'sample-images', 'capella.jpg'), true
                )
            ).to.equal(path.join(__dirname, 'sample-images', 'capella.jpg'));
            done();
        });
    });

    describe('Test isValidSigma', function () {
        it('Should exit returning false', function (done) {
            expect(validation.isValidSigma(0, true)).to.be.false;
            done();
        });

        it('Should pass and return a sigma of 300', function (done) {
            expect(validation.isValidSigma(300, true)).to.equal(300);
            done();
        });
    });
});
