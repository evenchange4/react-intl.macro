// @flow
import { type BabelPath } from 'babel-flow-types';
import { type MessageDescriptor } from './type.flow';
import { objectExpressionToObject } from './ast-helper';

export default function getMessages(
  referencePath: BabelPath,
): Array<MessageDescriptor> {
  const arg0 = referencePath.parentPath.get('arguments.0');

  const properties =
    arg0.type === 'TSAsExpression'
      ? arg0.get('expression.properties')
      : arg0.get('properties');

  const messages = properties
    .map(property => property.get('value'))
    .map(objectExpressionToObject);

  return messages;
}
