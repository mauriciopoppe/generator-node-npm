# generator-node-npm [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url]

[![NPM][npm-image]][npm-url]

> Create npm modules using npm as the build system!

## Install

```sh
$ npm install -g generator-node-npm
```

## Usage

```sh
$ yo node-npm
```

*Note that this template will generate files in the current directory, so be sure to change to a
new directory first if you don't want to overwrite existing files.*

## Directory structure

Generated with `tree -I node_modules -a` inside a generated project

```
.
├── .editorconfig
├── .eslintrc
├── .gitignore
├── README.md
├── cli.js
├── index.js
├── lib
│   └── awesome.js
├── package.json
└── test
    └── index.js
```

## Available Tasks

### 

## Why?

This project is heavily inspired by [this article by Keith Cirkel][stop-using-grunt-gulp] where he describes that
the existing build system tools attempt to solve the problems that exist among them "covering up the inadequacies
of the other tools while also surfacing their own".

[James Halliday][https://www.npmjs.com/~substack] who is the creator of many awesome packages like `browserify` and
`tape` also wrote an article where he points out that the command `npm run` is "perfectly adequate for everything
while maintaining a very tiny configuration footprint."

### Articles to read:

- http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/
- http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/
- http://substack.net/task_automation_with_npm_run
- http://ponyfoo.com/articles/choose-grunt-gulp-or-npm

### Inspiration projects

- https://github.com/yeoman/generator-node/
- https://github.com/youngmountain/generator-node-gulp
- https://github.com/keithamus/npm-scripts-example's awesome `package.json` file

## License

2015 MIT © Mauricio Poppe

[npm-image]: https://nodei.co/npm/generator-node-npm.png?downloads=true
[npm-url]: https://npmjs.org/package/generator-node-npm
[travis-image]: https://travis-ci.org/maurizzzio/generator-node-npm.svg?branch=master
[travis-url]: https://travis-ci.org/maurizzzio/generator-node-npm
[coveralls-image]: https://coveralls.io/repos/maurizzzio/generator-node-npm/badge.svg
[coveralls-url]: https://coveralls.io/r/maurizzzio/generator-node-npm
[stop-using-grunt-gulp]: http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/
