// @flow
import type { BabelPath } from 'babel-flow-types';

export default function getMessages(referencePath: BabelPath) {
  const messagesObjectProperties = referencePath.parentPath
    .get('arguments')[0]
    .get('properties');
  const messages = messagesObjectProperties.map(property => {
    const message = property.node.value.properties.reduce(
      (acc, p) => ({
        ...acc,
        [p.key.name]: p.value.value,
      }),
      {},
    );

    return message;
  });

  return messages;
}
