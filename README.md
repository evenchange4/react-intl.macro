# react-intl.macro

> Extract react-intl messages with babel-plugin-macros.

[![Travis][build-badge]][build]
[![Codecov Status][codecov-badge]][codecov]
[![npm package][npm-badge]][npm]
[![npm downloads][npm-downloads]][npm]
[![node][node]]()

[![Dependency Status][dependency-badge]][dependency]
[![devDependency Status][devdependency-badge]][devdependency]
[![peerDependency Status][peerdependency-badge]][peerdependency]

[![prettier][prettier-badge]][prettier]
[![license][license-badge]][license]

## Installation

```sh
$ yarn add react-intl.macro
```

_Note: You'll need to install and configure [babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros) if you haven't already. (This can be omitted when using CRA [react-script@2.x](https://github.com/facebookincubator/create-react-app/issues/3815) .)_

## Example

[evenchange4/react-intl.macro-example (with react-script@2.x)](https://github.com/evenchange4/react-intl.macro-example) [[DEMO](https://react-intlmacro.netlify.com/)]

## Usage

### Code

```diff
// Component.js
-import { defineMessages } from 'react-intl';
+import { defineMessages } from 'react-intl.macro';

const messages = defineMessages({
  'Component.greet': {
    id: 'Component.greet',
    defaultMessage: 'Hello, {name}!',
    description: 'Greeting to welcome the user to the app',
  },
});
```

### Extract with Create React App

```diff
// package.json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
+ "extract": "MESSAGE_DIR='./.messages' react-scripts build"
},
```

## API

* `MESSAGE_DIR`

## Alternative

* https://github.com/yahoo/babel-plugin-react-intl

## Development

### Requirements

* node >= 9.4.0
* yarn >= 1.3.2

```sh
$ yarn install --pure-lockfile
```

## Test

```sh
$ yarn run format
$ yarn run eslint
$ yarn run flow
$ yarn run test:watch
$ yarn run build
```

---

## CONTRIBUTING

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests.

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)

MIT: [http://michaelhsu.mit-license.org](http://michaelhsu.mit-license.org)

[build-badge]: https://img.shields.io/travis/evenchange4/react-intl.macro/master.svg?style=flat-square
[build]: https://travis-ci.org/evenchange4/react-intl.macro
[npm-badge]: https://img.shields.io/npm/v/react-intl.macro.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-intl.macro
[codecov-badge]: https://img.shields.io/codecov/c/github/evenchange4/react-intl.macro.svg?style=flat-square
[codecov]: https://codecov.io/github/evenchange4/react-intl.macro?branch=master
[node]: https://img.shields.io/node/v/react-intl.macro.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dt/react-intl.macro.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/react-intl.macro.svg?style=flat-square
[license]: http://michaelhsu.mit-license.org/
[dependency-badge]: https://david-dm.org/evenchange4/react-intl.macro.svg?style=flat-square
[dependency]: https://david-dm.org/evenchange4/react-intl.macro
[devdependency-badge]: https://david-dm.org/evenchange4/react-intl.macro/dev-status.svg?style=flat-square
[devdependency]: https://david-dm.org/evenchange4/react-intl.macro#info=devDependencies
[peerdependency-badge]: https://david-dm.org/evenchange4/react-intl.macro/peer-status.svg?style=flat-square
[peerdependency]: https://david-dm.org/evenchange4/react-intl.macro#info=peerDependencies
[prettier-badge]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square
[prettier]: https://github.com/prettier/prettier
