'use strict'

var <%= safeSlugname %> = require('../')
var test = require('tape')

test('awesome:test', function (t) {
  t.ok(<%= safeSlugname %>() === 'awesome')
  t.end()
})
