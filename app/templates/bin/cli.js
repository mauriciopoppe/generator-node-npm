#!/usr/bin/env node
'use strict';
var meow = require('meow');
var <%= safeSlugname %> = require('../index.js');

var cli = meow({
  help: [
    'Usage',
    '  <%= slugname %> <input>',
    '',
    'Example',
    '  <%= slugname %> Unicorn'
  ].join('\n')
});

<%= safeSlugname %>(cli.input[0]);
