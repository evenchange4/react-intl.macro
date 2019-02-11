// @flow
import * as React from 'react';
import {
  defineMessages,
  FormattedMessage,
  FormattedHTMLMessage,
} from '../index';

export const messages = defineMessages({
  'Component.greet': {
    id: 'defineMessages.greet',
    defaultMessage: 'Hello, {name}!',
    description: 'Greeting to welcome the user to the app',
  },
});

// $FlowFixMe `id` is missing
export const messagesWithoutId = defineMessages({
  'Component.greet': {
    defaultMessage: 'Hello, {name}!',
  },
});

export class Foo extends React.Component<any, any> {
  state = {};

  render() {
    return (
      <React.Fragment>
        <FormattedMessage
          id="Foo.hello1"
          defaultMessage="Hello, {name}!"
          description="Greeting to welcome the user to the app"
        />
        <FormattedMessage
          id="Foo.hello2"
          defaultMessage="Hello, {name}!"
          description="Greeting to welcome the user to the app"
        />
        {/* $FlowFixMe `id` is missing */}
        <FormattedMessage
          defaultMessage="Hello, {name}!"
          description="Greeting to welcome the user to the app"
        />
      </React.Fragment>
    );
  }
}

export const Component = () => (
  <FormattedHTMLMessage
    id="FormattedHTMLMessage.hello"
    defaultMessage="<div>Hello, {name}!</div>"
    description="Greeting to welcome the user to the app"
  />
);
