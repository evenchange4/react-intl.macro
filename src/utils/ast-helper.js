// @flow
import { type BabelPath } from 'babel-flow-types';

export function objectExpressionToObject(
  objectExpression: BabelPath,
): { [string | number]: any } {
  return objectExpression.get('properties').reduce(
    (acc, property) => ({
      ...acc,
      [property.get('key').node.name]: property.get('value').node.value,
    }),
    {},
  );
}

export function jsxAttributesToObject(
  jsxAttributes: Array<BabelPath>,
): { [string | number]: any } {
  return jsxAttributes.reduce(
    (acc, attribute) => ({
      ...acc,
      [attribute.get('name').node.name]: attribute.get('value').node.value,
    }),
    {},
  );
}
