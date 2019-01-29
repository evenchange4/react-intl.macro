// @flow
import { type BabelPath } from 'babel-flow-types';
import { type Message } from './type.flow';
import { jsxAttributesToObject } from './ast-helper';

const ATTRIBUTES = ['id', 'description', 'defaultMessage'];

export default function getJSXMessage(referencePath: BabelPath): Message {
  const attributes = referencePath.parentPath
    .get('attributes')
    .filter(attribute => ATTRIBUTES.includes(attribute.get('name').node.name));
  const message = jsxAttributesToObject(attributes);

  return message;
}
