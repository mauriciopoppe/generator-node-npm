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
├── .travis.yml
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

You can see the list of all available tasks running `npm run` on the generated project

### `npm start`

Alias for `npm test:watch`

### `npm test`

Executes the test located at `test/`

### `npm run test:watch`

Watches the content of `index.js`, `lib/` and `test/`, if any file changes `npm test` is executed

### `npm run lint`

Lints `index.js` and `lib/` (powered by http://eslint.org/docs/, also have a look at the generated `.eslintrc` file)

### `npm run istanbul` (only when the mode codeCoverage is turned on)

Executes the code coverage tool while running `mocha` on the `test/` directory, additionally when a
build is triggered on [TravisCI](https://travis-ci.org) the lcov report will be sent to
[Coveralls](https://coveralls.io/), also the code coverage badge is added to the README file

### Useful npm commands that you should know

- `npm version major|minor|patch` bumps the package version
- `npm run` lists all available tasks

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

- https://github.com/yeoman/generator-node
- https://github.com/youngmountain/generator-node-gulp
- https://github.com/keithamus/npm-scripts-example's awesome `package.json` file

## Development

Run the tests with `npm test`

Generate a sample output of the generator with `GENERATE_SANDBOX=true npm test`, generator options
are on `test/config.js`

## License

2015 MIT © Mauricio Poppe

[npm-image]: https://nodei.co/npm/generator-node-npm.png?downloads=true
[npm-url]: https://npmjs.org/package/generator-node-npm
[travis-image]: https://travis-ci.org/maurizzzio/generator-node-npm.svg?branch=master
[travis-url]: https://travis-ci.org/maurizzzio/generator-node-npm
[coveralls-image]: https://coveralls.io/repos/maurizzzio/generator-node-npm/badge.svg
[coveralls-url]: https://coveralls.io/r/maurizzzio/generator-node-npm
[stop-using-grunt-gulp]: http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/
