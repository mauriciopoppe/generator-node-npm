'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var config = require('./config');
var extend = require('extend');

process.env.GENERATE_SANDBOX && describe('node-npm on sandbox', function () {
  this.timeout(60000);

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, '.tmp'))
      .withOptions({ 'skip-install': false })
      .withPrompt(extend({}, config.simple, {
        cli: true,
        coveralls: true
      }))
      .on('end', done);
  });

  it('should generate a sandbox', function () {
    //var args = 'npm start'.split(' ');
    //args.shift();
    //handleProcess(spawn('npm', args), done);
  });
});
