'use strict';

var assert = require('assert');

var <%= safeSlugname %> = require('../index.js');

describe('<%= safeSlugname %>', function () {

  it('should be awesome', function () {
    assert(<%= safeSlugname %>() === 'awesome');
  });

});
