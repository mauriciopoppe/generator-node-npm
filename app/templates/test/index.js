'use strict';

var assert = require('assert');

var <%= safeSlugname %> = require('../');

describe('<%= safeSlugname %>', function () {

  it('should be awesome', function () {
    assert(<%= safeSlugname %>() === 'awesome');
  });

});
