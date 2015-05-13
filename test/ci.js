/**
 * Created by mauricio on 3/23/15.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var exec = require('child_process').exec;

process.env.CI && describe('node-npm on CI', function () {
  this.timeout(60000);

  function handleProcess(command, done) {
    exec(command, function (err, stdout, stderr) {
      if (err) { return done(err); }
      //if (stderr) {
      //  return done(new Error(stderr));
      //}
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
      var command = 'npm run lint && npm run test';
      handleProcess(command, done);
    });
  });

  describe('with cli', function () {
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
      var command = 'npm run lint && npm run test && chmod u+x ./cli.js && ./cli.js';
      handleProcess(command, done);
    });
  });

  describe('with codeCoverage', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': false })
        .withPrompt({
          codeCoverage: true
        })
        .on('end', done);
    });

    it('executes some required scripts', function (done) {
      var command = 'npm run istanbul';
      handleProcess(command, done);
    });
  });
});
