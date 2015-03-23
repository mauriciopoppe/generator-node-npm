'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var spawn = require('child_process').spawn;

describe('node-npm:app', function () {
  describe('with default options', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt({
          cli: false,
          coveralls: false
        })
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'lib/awesome.js',
        'test/index.js',
        'package.json',
        'README.md',
        '.editorconfig',
        '.eslintrc',
        '.travis.yml',
        'index.js'
      ]);
      assert.noFile([
        'cli.js'
      ]);
    });

    it('has the required contents (package.json)', function () {
      var pkg = fs.readFileSync('package.json', 'utf-8');
      pkg = JSON.parse(pkg);
      assert(pkg.scripts.hasOwnProperty('lint'));
      assert(pkg.scripts.hasOwnProperty('test'));
      assert(pkg.scripts.hasOwnProperty('test:watch'));
      assert(pkg.scripts.hasOwnProperty('start'));
    });

    it('has the required contents (.travis.yml)', function () {
      var pkg = fs.readFileSync('.travis.yml', 'utf-8');
      assert( /npm\stest/.test(pkg) );
      assert( !/npm\scoveralls/.test(pkg) );
    });

    it('has the required contents (README.md)', function () {
      var pkg = fs.readFileSync('README.md', 'utf-8');
      assert( !/CLI/.test(pkg) );
      assert( !/Coverage\sStatus/.test(pkg) );
    });

    it('does not have coveralls config', function () {
      var pkg = fs.readFileSync('package.json', 'utf-8');
      pkg = JSON.parse(pkg);
      assert(!pkg.scripts.hasOwnProperty('istanbul'));
      assert(!pkg.scripts.hasOwnProperty('coveralls'));
    });
  });

  describe('with cli', function () {
    var instance;
    var opts = {
      cli: true
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt(opts)
        .on('ready', function (generator) {
          instance = generator;
        })
        .on('end', done);
    });

    it('has the required contents (README.md)', function () {
      var pkg = fs.readFileSync('README.md', 'utf-8');
      assert( /CLI/.test(pkg) );
    });

    it('creates files', function () {
      assert.file(['cli.js']);
    });

    it('has the required contents', function () {
      var pkg = fs.readFileSync('package.json', 'utf-8');
      pkg = JSON.parse(pkg);
      assert(pkg.hasOwnProperty('bin'));
      assert(pkg.dependencies.hasOwnProperty('meow'));
    });
  });

  describe('with coveralls', function () {
    var opts = {
      coveralls: true
    };

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompt(opts)
        .on('end', done);
    });

    it('has the required contents (README.md)', function () {
      var pkg = fs.readFileSync('README.md', 'utf-8');
      assert( !/CLI/.test(pkg) );
    });

    it('has the required contents', function () {
      var pkg = fs.readFileSync('package.json', 'utf-8');
      pkg = JSON.parse(pkg);
      assert(pkg.scripts.hasOwnProperty('istanbul'));
      assert(pkg.scripts.hasOwnProperty('coveralls:report'));
      assert(pkg.scripts.hasOwnProperty('coveralls'));
    });
  });
});
