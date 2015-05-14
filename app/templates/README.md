# <%= slugname %> 

[![NPM][npm-image]][npm-url]

[![Build Status][travis-image]][travis-url]<% if (config.codeCoverage) { %> [![Coverage Status][coveralls-image]][coveralls-url]<% } %> <% if (config.dependencyManager) { %> [![Dependency Status][david-image]][david-url]<% } %>

> <%= props.description %>

## Install

```sh
$ npm install --save <%= slugname %>
```

## Usage

```js
var <%= safeSlugname %> = require('<%= slugname %>');
<%= safeSlugname %>('Rainbow');
```
<% if (config.cli) { %>
## CLI
```sh
$ npm install --global <%= slugname %>
$ <%= slugname %> --help
```<% } %>

## API

Coming soon...

## License

<%= currentYear %> <%= props.license %> © [<%= props.authorName %>](<%= props.authorUrl %>)

[npm-image]: https://nodei.co/npm/<%= slugname %>.png?downloads=true
[npm-url]: https://npmjs.org/package/<%= slugname %>
[travis-image]: https://travis-ci.org/<%= props.username %>/<%= slugname %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= props.username %>/<%= slugname %>
[coveralls-image]: https://coveralls.io/repos/<%= props.username %>/<%= slugname %>/badge.svg
[coveralls-url]: https://coveralls.io/r/<%= props.username %>/<%= slugname %>
[david-image]: https://david-dm.org/<%= props.username %>/<%= slugname %>.svg
[david-url]: https://david-dm.org/<%= props.username %>/<%= slugname %>
