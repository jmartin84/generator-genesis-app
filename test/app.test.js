'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('genesis-app:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inTmpDir()
            .withOptions({ skipInstall: true })
            .withPrompts({
                dockerImage: 'test',
                dockerImageTag: '9.9',
                appName: 'test',
                appDescription: 'description',
                appLicense: 'license',
                appMain: 'thing/app.js',
                appAuthor: 'author'
            })
            .on('end', done);
    });

    describe('application entry point', function () {
        it('should exist', function () {
            assert.file(['thing/app.js']);
        });
    });

    describe('unit tests', function () {
        it('folder should exist', function () {
            assert.file(['tests/.gitkeep']);
        });
    });

    describe('package.json', function () {
        it('should exist', function (){
            assert.file(['package.json']);
        });

        it('should have app name', function () {
            assert.fileContent('package.json', /"name": "test"/);
        });

        it('should have app description', function () {
            assert.fileContent('package.json', /"description": "description"/);
        });

        it('should have app license', function () {
            assert.fileContent('package.json', /"license": "license"/);
        });

        it('should have app main', function () {
            assert.fileContent('package.json', /"main": "thing\/app.js"/);
        });

        it('should have app author', function () {
            assert.fileContent('package.json', /"author": "author"/);
        });

    });

    describe('editorconfig', function () {
        it('should exist', function () {
            assert.file(['.editorconfig']);
        });
    });

    describe('eslintrc', function () {
        it('should exist', function () {
            assert.file('.eslintrc');
        });
    });

    describe('gulpfile', function () {
        it('should exist', function () {
            assert.file(['gulpfile.babel.js']);
        });
    });

    describe('docker file', function () {
        it('should exist', function (){
            assert.file(['Dockerfile']);
        });

        it('should use provided image and tag', function () {
            assert.fileContent('Dockerfile', /FROM test:9.9/);
        });
    });
});
