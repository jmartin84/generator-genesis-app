'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        this.log(yosay(
        'Welcome to the priceless ' + chalk.red('GenesisApp') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'appName',
            message: 'What is the name of this application?',
            default: 'MyApp'
        }, {
            type: 'input',
            name: 'appDescription',
            message: 'Whats the application description?',
            default: 'A sweet app that does things.'
        }, {
            type: 'input',
            name: 'appMain',
            message: 'What is the main entrypoint of this application?',
            default: 'app.js'
        }, {
            type: 'input',
            name: 'appAuthor',
            message: 'Whats the authors name?'
        }, {
            type: 'input',
            name: 'appLicense',
            message: 'What is the license of this application?',
            default: 'MIT'
        }, {
            type: 'input',
            name: 'dockerImage',
            message: 'What base node docker image would you like to use?',
            default: 'node'
        },{
            type: 'input',
            name: 'dockerImageTag',
            message: 'What tag of the base image would you like to use?',
            default: 'latest'
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;
            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                {
                    name: this.props.appName,
                    description: this.props.appDescription,
                    main: this.props.appMain,
                    license: this.props.appLicense,
                    author: this.props.appAuthor
                }
            );
        },
        projectfiles: function () {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );

            this.fs.copy(
                this.templatePath('tests/.gitkeep'),
                this.destinationPath('tests/.gitkeep')
            );

            this.fs.copy(
                this.templatePath('entrypoint.js'),
                this.destinationPath(this.props.appMain)
            );
            this.fs.copy(
                this.templatePath('eslintrc'),
                this.destinationPath('.eslintrc')
            );

            this.fs.copyTpl(
                this.templatePath('Dockerfile'),
                this.destinationPath('Dockerfile'),
                { image: this.props.dockerImage, tag: this.props.dockerImageTag }
            );

            this.fs.copy(
                this.templatePath('gulpfile.babel.js'),
                this.destinationPath('gulpfile.babel.js')
            );
        }
    },

    install: function () {
        this.installDependencies();
    }
});
