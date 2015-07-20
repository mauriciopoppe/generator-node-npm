#!/usr/bin/env node
'use strict'
var argv = require('yargs').argv
var <%= safeSlugname %> = require('../')

<%= safeSlugname %>(argv)
