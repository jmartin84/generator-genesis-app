'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the priceless ' + chalk.red('GenesisApp') + ' generator!'
        ));

        var prompts = [{
            type: 'confirm',
            name: 'someOption',
            message: 'Would you like to enable this option?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.fs.copy(
                this.templatePath('_package.json'),
                this.destinationPath('package.json')
            );
        },

    projectfiles: function () {
        this.fs.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig')
        );
        this.fs.copy(
            this.templatePath('eslintrc'),
            this.destinationPath('.eslintrc')
        );

        this.fs.copy(
            this.templatePath('Dockerfile'),
            this.destinationPath('Dockerfile')
        );

        this.fs.copy(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js')
        );

        this.fs.copy(
            this.templatePath('tests/integration/.gitkeep'),
            this.destinationPath('tests/integration/.gitkeep')
        );

        this.fs.copy(
            this.templatePath('tests/unit/.gitkeep'),
            this.destinationPath('tests/unit/.gitkeep')
        );

        this.fs.copy(
            this.templatePath('server/.gitkeep'),
            this.destinationPath('server/.gitkeep')
        );

        this.fs.copy(
            this.templatePath('client/.gitkeep'),
            this.destinationPath('client/.gitkeep')
        );
    }
  },

    install: function () {
        this.installDependencies();
    }
});
