// @flow
import * as R from 'ramda';
import { type BabelPath } from 'babel-flow-types';
import printICUMessage from 'babel-plugin-react-intl/lib/print-icu-message';
// import printAST from 'ast-pretty-print';

/**
 * Evaluate JSXExpression
 * ref: https://github.com/yahoo/babel-plugin-react-intl/blob/6d364b01554f80433067202f342d6b516b03daaa/src/index.js#L31-L40
 */
export function evaluatePath(path: BabelPath): ?string {
  const evaluated = path.evaluate();

  if (evaluated.confident) {
    return evaluated.value;
  }

  throw path.buildCodeFrameError(
    '[React Intl] Messages must be statically evaluate-able for extraction.',
  );
}

export function objectExpressionToObject(
  objectExpression: BabelPath,
): { [string | number]: any } {
  return objectExpression.get('properties').reduce((acc, property) => {
    const { name } = property.get('key').node;
    let { value } = property.get('value').node;

    // Note: expression and templateLiteral
    if (
      property.get('value').isTemplateLiteral() ||
      property.get('value').isBinaryExpression()
    ) {
      value = R.pipe(
        evaluatePath,
        R.ifElse(R.is(String), printICUMessage, R.identity),
      )(property.get('value'));
    }

    return { ...acc, [name]: value };
  }, {});
}

export function jsxAttributesToObject(
  jsxAttributes: Array<BabelPath>,
): { [string | number]: any } {
  return jsxAttributes.reduce((acc, attribute) => {
    const { name } = attribute.get('name').node;
    let { value } = attribute.get('value').node;

    // Note: expression and templateLiteral
    if (attribute.get('value').isJSXExpressionContainer()) {
      value = R.pipe(
        evaluatePath,
        R.ifElse(R.is(String), printICUMessage, R.identity),
      )(attribute.get('value.expression'));
    }

    return { ...acc, [name]: value };
  }, {});
}
