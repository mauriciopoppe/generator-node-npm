'use strict';

var app = require('../');
var write = require('./scripts/write');

window.addEventListener('DOMContentLoaded', write(app()));
