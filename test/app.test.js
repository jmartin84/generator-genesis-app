'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('genesis-app:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .inDir('/.tmp')
            .withOptions({ skipInstall: true })
            .withPrompts({ someOption: true })
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            '.eslintrc',
            '.editorconfig',
            'gulpfile.js',
            'Dockerfile',
            'package.json',
            'client/.gitkeep',
            'server/.gitkeep',
            'tests/integration/.gitkeep',
            'tests/unit/.gitkeep'
        ]);
    });
});
