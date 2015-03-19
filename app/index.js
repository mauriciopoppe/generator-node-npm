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
      props
        description
        homepage
        license
        authorName
        authorEmail
        authorUrl
        keywords {Array}
        cli {boolean}
        browser {boolean}
        coveralls {boolean}
 */
module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    var me = this;
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
        if (props.githubUsername) {
          this.repoUrl = props.githubUsername + '/' + this.slugname;
        } else {
          this.repoUrl = 'user/repo';
        }

        this.keywords = props.keywords.split(',')
          .map(function (el) {
            return el.trim();
          })
          .reduce(function (el) {
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
        message: 'Do you need a CLI?'
      }, {
        type: 'confirm',
        name: 'browser',
        message: 'Do you need to use Browserify?'
      }, {
        type: 'confirm',
        name: 'coveralls',
        message: 'Do you need a code coverage tool? (Powered by istanbul + coveralls)',
        default: true
      }];
      this.prompt(prompts, function (props) {
        this.props.cli = props.cli;
        this.props.browser = props.browser;
        this.props.coveralls = props.coveralls;
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
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        this
      );
    },

    cliFiles: function () {
      if (this.props.cli) {
        this.fs.copyTpl(
          this.templatePath('bin/cli.js'),
          this.destinationPath('bin/' + this.slugname),
          this
        );
      }
    },

    browserifyFiles: function () {
      if (this.props.browser) {
        this.fs.copy(
          this.templatePath('assets/'),
          this.destinationPath('assets/')
        );
        this.fs.copy(
          this.templatePath('dist/'),
          this.destinationPath('dist/')
        );
        this.fs.copy(
          this.templatePath('index.html'),
          this.destinationPath('index.html')
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
