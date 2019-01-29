// @flow
import { type BabelPluginPass, type Types } from 'babel-flow-types';
import * as R from 'ramda';

const REACT_INTL = 'react-intl';

export default function importReactIntl(
  state: BabelPluginPass,
  t: Types,
  importName: 'defineMessages' | 'FormattedMessage' | 'FormattedHTMLMessage',
  calleeName: string, // Note: import alias
): void {
  const fileBodyReference =
    (state.file.path.node && state.file.path.node.body) || [];
  const importDeclaration = fileBodyReference
    .filter(node => t.isImportDeclaration(node))
    .find(e => e.source.value === REACT_INTL);

  if (R.isNil(importDeclaration)) {
    // Case 1: there is no 'react-intl' importDeclaration
    fileBodyReference.unshift(
      t.importDeclaration(
        [t.importSpecifier(t.identifier(importName), t.identifier(calleeName))],
        t.stringLiteral(REACT_INTL),
      ),
    );
  } else {
    // Case 2: import { injectIntl } from 'react-intl';
    (importDeclaration: any).specifiers.push(
      t.importSpecifier(t.identifier(calleeName), t.identifier(importName)),
    );
  }
}
