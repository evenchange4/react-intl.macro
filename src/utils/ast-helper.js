// @flow
import { type BabelPath } from 'babel-flow-types';
import printICUMessage from 'babel-plugin-react-intl/lib/print-icu-message';
// import printAST from 'ast-pretty-print';

export function objectExpressionToObject(
  objectExpression: BabelPath,
): { [string | number]: any } {
  return objectExpression.get('properties').reduce((acc, property) => {
    const key = property.get('key').node.name;
    let { value } = property.get('value').node;

    // Note: multiline with templateLiteral
    if (property.get('value').type === 'TemplateLiteral') {
      value = printICUMessage(property.get('value').node.quasis[0].value.raw);
    }

    return { ...acc, [key]: value };
  }, {});
}

export function jsxAttributesToObject(
  jsxAttributes: Array<BabelPath>,
): { [string | number]: any } {
  return jsxAttributes.reduce((acc, attribute) => {
    const { name } = attribute.get('name').node;
    let { value } = attribute.get('value').node;

    // Note: multiline with templateLiteral
    if (attribute.get('value.expression').type === 'TemplateLiteral') {
      value = printICUMessage(
        attribute.get('value.expression').node.quasis[0].value.raw,
      );
    }

    return { ...acc, [name]: value };
  }, {});
}
