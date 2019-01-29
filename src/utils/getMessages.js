// @flow
import { type BabelPath } from 'babel-flow-types';
import { type Message } from './type.flow';
import { objectExpressionToObject } from './ast-helper';

export default function getMessages(referencePath: BabelPath): Array<Message> {
  const properties = referencePath.parentPath.get('arguments.0.properties');
  const messages = properties
    .map(property => property.get('value'))
    .map(objectExpressionToObject);

  return messages;
}
