'use strict';

module.exports = function (content) {
  var heading = document.createElement('h1');
  heading.textContent = 'npm is ' + content + '!';
  heading.className = 'awesome';
  document.getElementById('container').appendChild(heading);
};
