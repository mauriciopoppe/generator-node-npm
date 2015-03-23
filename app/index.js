'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var npmName = require('npm-name');
var path = require('path');

/*
      stored in the generator instance:

      slugName
      safeSlugName
      repoUrl
      keywords
      props
        description
        homepage
        license
        authorName
        authorEmail
        authorUrl
        keywords {Array}
      config
        cli {boolean}
        coveralls {boolean}
 */
module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.currentYear = new Date().getFullYear();
    this.currentDate = new Date().toISOString().slice(0,10); // YYY-MM-DD
  },

  prompting: {
    welcome: function () {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the wonderful ' + chalk.red('NodeNpm') + ' generator!'
      ));
    },
    moduleFind: function moduleFind() {
      var me = this;
      var done = this.async();
      var prompts = [{
        name: 'name',
        message: 'Module Name',
        default: path.basename(process.cwd())
      }, {
        type: 'confirm',
        name: 'pkgName',
        message: 'The name above already exists on npm, choose another?',
        default: true,
        when: function(answers) {
          if (process.env.SKIP) {
            return false;
          }

          var done = this.async();
          npmName(answers.name, function (err, available) {
            if (!available) {
              done(true);
              return;
            }
            done(false);
          });
        }
      }];

      this.prompt(prompts, function (props) {
        if (props.pkgName) {
          return moduleFind.call(me);
        }

        this.slugname = this._.slugify(props.name);
        this.safeSlugname = this.slugname.replace(/-+([a-zA-Z0-9])/g, function (g) {
          return g[1].toUpperCase();
        });

        done();
      }.bind(this));
    },
    packageJson: function () {
      var done = this.async();
      var prompts = [{
        name: 'description',
        message: 'Description',
        default: 'The best module ever.'
      }, {
        name: 'homepage',
        message: 'Homepage'
      }, {
        name: 'license',
        message: 'License',
        default: 'MIT'
      }, {
        name: 'username',
        message: 'GitHub username',
        store: true
      }, {
        name: 'authorName',
        message: 'Author\'s Name',
        store: true
      }, {
        name: 'authorEmail',
        message: 'Author\'s Email',
        store: true
      }, {
        name: 'keywords',
        message: 'Key your keywords (comma to split)'
      }];
      this.prompt(prompts, function (props) {
        if (props.username) {
          this.repoUrl = 'https://github.com/' + props.username + '/' + this.slugname;
        } else {
          this.repoUrl = 'user/repo';
        }

        this.keywords = (props.keywords || '').split(',')
          .map(function (el) {
            return el.trim();
          })
          .filter(function (el) {
            return !!el;
          });

        this.props = props;
        done();
      }.bind(this));
    },
    projectSpecific: function () {
      var done = this.async();
      this.log(
        '\nAlmost done :)' +
        '\nTell me specific things about your new project');
      var prompts = [{
        type: 'confirm',
        name: 'cli',
        message: 'Do you need a CLI?',
        default: false
      }, {
        type: 'confirm',
        name: 'coveralls',
        message: 'Do you need a code coverage tool? (Powered by istanbul + coveralls)',
        default: false
      }];
      this.prompt(prompts, function (props) {
        this.config = {};
        this.config.cli = props.cli;
        this.config.coveralls = props.coveralls;
        done();
      }.bind(this));
    }
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('index.js'),
        this.destinationPath('index.js'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('test/index.js'),
        this.destinationPath('test/index.js'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('lib/awesome.js'),
        this.destinationPath('lib/awesome.js'),
        this
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('_travis.yml'),
        this.destinationPath('.travis.yml'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        this
      );
    },

    cliFiles: function () {
      if (this.config.cli) {
        this.fs.copyTpl(
          this.templatePath('cli.js'),
          this.destinationPath('cli.js'),
          this
        );
      }
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});
