// @flow
import type { BabelPluginPass, Types } from 'babel-flow-types';

export default function importReactIntl(
  state: BabelPluginPass,
  t: Types,
  calleeName: string,
): void {
  const fileBodyReference =
    (state.file.path.node && state.file.path.node.body) || [];
  const reactIntlImportDeclaration = fileBodyReference
    .filter(node => t.isImportDeclaration(node))
    .find(e => e.source.value === 'react-intl');
  const isReactIntlImported = Boolean(reactIntlImportDeclaration);

  if (isReactIntlImported) {
    // Case 1: import { injectIntl } from 'react-intl';
    (reactIntlImportDeclaration: any).specifiers.push(
      t.importSpecifier(
        t.identifier(calleeName),
        t.identifier('defineMessages'),
      ),
    );
  } else {
    // Case 2: there is no 'react-intl' importDeclaration
    fileBodyReference.unshift(
      t.importDeclaration(
        [
          t.importSpecifier(
            t.identifier('defineMessages'),
            t.identifier(calleeName),
          ),
        ],
        t.stringLiteral('react-intl'),
      ),
    );
  }
}
