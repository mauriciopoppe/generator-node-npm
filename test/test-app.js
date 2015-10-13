'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var extend = require('extend');
var config = require('./config');


function runGenerator() {
  return helpers.run(path.join(__dirname, '../app'))
    .inDir(path.join(__dirname, '.tmp'))
}

describe('node-npm:app', function () {
  describe('with default options', function () {
    before(function (done) {
      // skips the npmName check
      process.env.SKIP = true;

      runGenerator()
        .withOptions({ 'skip-install': true })
        .withPrompt(config.simple)
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'lib/generator-node-npm.js',
        'test/index.js',
        'package.json',
        'README.md',
        '.editorconfig',
        '.travis.yml',
        'index.js'
      ]);
    });

    it('has the required contents (package.json)', function () {
      var pkg = fs.readFileSync('package.json', 'utf-8');
      pkg = JSON.parse(pkg);
      assert(pkg.scripts.hasOwnProperty('lint'));
      assert(pkg.scripts.hasOwnProperty('test'));
      assert(pkg.scripts.hasOwnProperty('test:watch'));
      assert(pkg.scripts.hasOwnProperty('start'));

      assert.fileContent('package.json', /"name": "generator-node-npm"/);
      assert.fileContent('package.json', /"description": "sandbox description"/);
      assert.fileContent('package.json', /"homepage": ".*generator-node-npm"/);
      assert.fileContent('package.json', /"bugs": "https:\/\/github.com\/maurizzzio\/generator-node-npm\/issues"/);
      assert.fileContent('package.json', /"author": "Mauricio <test@example.com>"/);
      assert(~pkg.keywords.indexOf('sandbox'));
      assert(~pkg.keywords.indexOf('yo'));
      assert(~pkg.keywords.indexOf('generator'));
    });

    it('has the required contents (.travis.yml)', function () {
      var pkg = fs.readFileSync('.travis.yml', 'utf-8');
      assert( !/istanbul/.test(pkg) );
    });

    it('has the required contents (README.md)', function () {
      var pkg = fs.readFileSync('README.md', 'utf-8');
      assert( !/CLI/.test(pkg) );
      assert( !/Coverage\sStatus/.test(pkg) );
    });
  });

  describe('with cli', function () {
    var instance;
    before(function (done) {
      runGenerator()
        .withOptions({ 'skip-install': true })
        .withPrompt(extend({}, config.simple, { cli: true }))
        .on('ready', function (generator) {
          instance = generator;
        })
        .on('end', done);
    });

    it('creates files', function () {
      assert.file(['bin/generatorNodeNpm']);
    });

    it('has the required contents (README.md)', function () {
      var pkg = fs.readFileSync('README.md', 'utf-8');
      assert( /CLI/.test(pkg) );
    });

    it('has the required contents (package.json)', function () {
      var pkg = fs.readFileSync('package.json', 'utf-8');
      pkg = JSON.parse(pkg);
      assert(pkg.hasOwnProperty('bin'));
      assert(pkg.dependencies.hasOwnProperty('yargs'));
    });
  });

  describe('with coveralls', function () {

    before(function (done) {
      runGenerator()
        .withOptions({ 'skip-install': true })
        .withPrompt(extend({}, config.simple, { codeCoverage: true}))
        .on('end', done);
    });

    it('has the required contents (README.md)', function () {
      var pkg = fs.readFileSync('README.md', 'utf-8');
      assert( !/CLI/.test(pkg) );
      assert( /Coverage\sStatus/.test(pkg) );
    });

    it('has the required contents (.travis.yml)', function () {
      var pkg = fs.readFileSync('.travis.yml', 'utf-8');
      assert( !/npm\stest/.test(pkg) );
      assert( /istanbul/.test(pkg) );
    });

    it('has the required contents (package.json)', function () {
      var pkg = fs.readFileSync('package.json', 'utf-8');
      pkg = JSON.parse(pkg);
      assert(pkg.devDependencies.hasOwnProperty('istanbul'));
      assert(pkg.scripts.hasOwnProperty('istanbul'));
    });
  });
});
