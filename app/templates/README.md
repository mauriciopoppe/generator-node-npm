# <%= slugname %> [![Build Status][travis-image]][travis-url] <% if (config.codeCoverage) { %> [![Coverage Status][coveralls-image]][coveralls-url]<% } %>

[![NPM][npm-image]][npm-url]

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
[travis-image]: https://travis-ci.org/<%= props.githubUsername %>/<%= slugname %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= props.githubUsername %>/<%= slugname %>
[coveralls-image]: https://coveralls.io/repos/<%= props.githubUsername %>/<%= slugname %>/badge.svg
[coveralls-url]: https://coveralls.io/r/<%= props.githubUsername %>/<%= slugname %>
