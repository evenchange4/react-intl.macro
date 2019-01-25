// @flow
/* eslint no-console: 0 */
import path from 'path';
import { createMacro } from 'babel-plugin-macros';
import * as R from 'ramda';
import {
  type Babel,
  type BabelPluginPass,
  type BabelPath,
} from 'babel-flow-types';
import { importReactIntl, writeFileSync, getMessages } from './utils/index';
// import printAST from 'ast-pretty-print';
// console.log(printAST(referencePath.parentPath));

function reactIntlMacro({
  references,
  state,
  state: {
    file: {
      opts: { filename },
    },
  },
  babel: { types: t },
}: {
  references: { defineMessages: Array<BabelPath> },
  state: BabelPluginPass,
  babel: Babel,
}): void {
  const { defineMessages = [] } = references;
  const { MESSAGE_DIR } = process.env;

  // Note: add react-intl on the top of file if it have not been imported.
  const calleeName = defineMessages[0].parentPath.get('callee').node.name;
  importReactIntl(state, t, calleeName);

  // Note: Output side-effect
  if (MESSAGE_DIR) {
    const result = defineMessages.map(getMessages);
    const sourceRelativedDir = path.relative(process.cwd(), filename);
    const inputFilename = filename;
    const outputFilename = path
      .join(process.cwd(), MESSAGE_DIR, sourceRelativedDir)
      .replace(/(js|jsx)$/g, 'json');

    console.log(
      `${path.relative(process.cwd(), inputFilename)} -> ${path.relative(
        process.cwd(),
        outputFilename,
      )}`,
    );
    writeFileSync(
      {
        filename: outputFilename,
        data: R.flatten(result),
      },
      state,
    );
  }
}

export default createMacro(reactIntlMacro);
