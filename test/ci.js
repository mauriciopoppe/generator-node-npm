/**
 * Created by mauricio on 3/23/15.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var spawn = require('child_process').spawn;

process.env.CI && describe('node-npm on CI', function () {
  this.timeout(50000);

  function handleProcess(process, done) {
    var testError = '';
    process.stderr.on('data', function (data) {
      testError += data.toString();
    });
    process.on('close', function (code) {
      if (testError) {
        return done(new Error('Project test failed:\n' + testError));
      } else if (code > 0) {
        return done(new Error('Child process exited with code ' + code));
      }
      done();
    });

  }

  describe('with default options', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': false })
        .withPrompt({})
        .on('end', done);
    });

    it('executes some required scripts', function (done) {
      var args = 'npm run lint && npm run test'.split(' ');
      args.shift();
      handleProcess(spawn('npm', args), done);
    });
  });

  describe('with ci', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': false })
        .withPrompt({
          cli: true
        })
        .on('end', done);
    });

    it('executes some required scripts', function (done) {
      var args = 'npm run lint && npm run test && chmod u+x ./cli.js && ./cli.js'.split(' ');
      args.shift();
      handleProcess(spawn('npm', args), done);
    });
  });

  describe('with coveralls', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': false })
        .withPrompt({
          coveralls: true
        })
        .on('end', done);
    });

    it('executes some required scripts', function (done) {
      var args = 'npm run istanbul && npm run lint && npm run test'.split(' ');
      args.shift();
      handleProcess(spawn('npm', args), done);
    });
  });
});
