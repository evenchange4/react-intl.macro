// @flow
/* eslint global-require: 0 */
/**
 * Note: mock for output file
 */
jest.mock('./src/utils/writeFileSync.js', () => ({ data }, state) => {
  const serialize = require('babel-literal-to-ast');
  state.file.path.node.body.push(serialize(data));
});
