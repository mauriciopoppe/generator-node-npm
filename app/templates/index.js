/*
 * <%= slugname %>
 *
 * Copyright (c) <%= currentYear %><% if (props.authorName) { %> <%= props.authorName %><% } %>
 * Licensed under the <%= props.license %> license.
 */

'use strict';

var awesome = require('./lib/awesome');

module.exports = function () {
  return awesome();
};
