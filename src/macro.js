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
// import printAST from 'ast-pretty-print';
import {
  DEFAULT_CONFIG,
  REACT_INTL,
  importReactIntl,
  writeFileSync,
  getMessages,
  getJSXMessage,
} from './utils/index';

function reactIntlMacro({
  references,
  state,
  state: {
    file: {
      opts: { filename },
    },
  },
  babel: { types: t },
  config: { verbose } = DEFAULT_CONFIG,
}: {
  references: {
    defineMessages: Array<BabelPath>,
    FormattedMessage: Array<BabelPath>,
    FormattedHTMLMessage: Array<BabelPath>,
  },
  state: BabelPluginPass,
  babel: Babel,
  config: { verbose: boolean },
}): void {
  const {
    defineMessages = [],
    FormattedMessage = [],
    FormattedHTMLMessage = [],
  } = references;
  const { MESSAGE_DIR } = process.env;

  // Note: add react-intl on the top of file if it have not been imported.
  if (!R.isEmpty(defineMessages)) {
    const calleeName = defineMessages[0].parentPath.get('callee').node.name;
    importReactIntl(state, t, 'defineMessages', calleeName);
  }
  if (!R.isEmpty(FormattedMessage)) {
    const calleeName = FormattedMessage[0].parentPath.get('name').node.name;
    importReactIntl(state, t, 'FormattedMessage', calleeName);
  }
  if (!R.isEmpty(FormattedHTMLMessage)) {
    const calleeName = FormattedHTMLMessage[0].parentPath.get('name').node.name;
    importReactIntl(state, t, 'FormattedHTMLMessage', calleeName);
  }

  // Note: Output side-effect
  if (MESSAGE_DIR) {
    const messages = [
      ...(R.unnest: any)(defineMessages.map(getMessages)),
      ...FormattedMessage.map(getJSXMessage),
      ...FormattedHTMLMessage.map(getJSXMessage),
    ];

    const sourceRelativedDir = path.relative(process.cwd(), filename);
    const outputFilename = path
      .join(process.cwd(), MESSAGE_DIR, sourceRelativedDir)
      .replace(/(js|jsx|ts|tsx)$/g, 'json');

    if (verbose) {
      const inputFilename = filename;
      console.log(
        `${path.relative(process.cwd(), inputFilename)} -> ${path.relative(
          process.cwd(),
          outputFilename,
        )}`,
      );
    }

    writeFileSync(outputFilename, messages, state);
  }
}

export default createMacro(reactIntlMacro, { configName: REACT_INTL });
