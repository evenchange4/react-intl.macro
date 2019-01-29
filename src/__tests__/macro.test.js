// @flow

import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';

expect.addSnapshotSerializer({
  print(val) {
    return val.replace(/..\/macro/, 'react-intl.macro');
  },
  test(val) {
    return typeof val === 'string';
  },
});

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename,
    parserOpts: { plugins: ['jsx'] },
  },
  tests: {
    '[defineMessages] one X one': {
      error: false,
      code: `
        import { defineMessages } from '../macro';

        const messages = defineMessages({
          'Component.greet': {
            id: 'Component.greet',
            defaultMessage: 'Hello, {name}!',
            description: 'Greeting to welcome the user to the app',
          },
        });

        export default messages;
      `,
    },
    '[defineMessages] one X two': {
      error: false,
      code: `
        import { defineMessages } from '../macro';

        const messages = defineMessages({
          'Component.greet': {
            id: 'Component.greet',
            defaultMessage: 'Hello, {name}!',
            description: 'Greeting to welcome the user to the app',
          },
          'Component.greet2': {
            id: 'Component.greet2',
            defaultMessage: 'Hello, {name}!',
            description: 'Greeting to welcome the user to the app',
          },
        });

        export default messages;
      `,
    },
    '[defineMessages] two X one': {
      error: false,
      code: `
        import { defineMessages } from '../macro';

        export const message1 = defineMessages({
          'Component.greet2': {
            id: 'Component.greet2',
            defaultMessage: 'Hello, {name}!',
            description: 'Greeting to welcome the user to the app',
          },
        });

        export const message2 = defineMessages({
          'Component.greet': {
            id: 'Component.greet',
            defaultMessage: 'Hello, {name}!',
            description: 'Greeting to welcome the user to the app',
          },
        });
      `,
    },
    '[defineMessages] it should only import react-intl once': {
      error: false,
      code: `
        import { injectIntl } from 'react-intl';
        import { defineMessages } from '../macro';

        const messages = defineMessages({
          'Component.greet': {
            id: 'Component.greet',
            defaultMessage: 'Hello, {name}!',
            description: 'Greeting to welcome the user to the app',
          },
        });

        export default messages;
      `,
    },
    '[defineMessages] callee alias': {
      error: false,
      code: `
        import { injectIntl } from 'react-intl';
        import { defineMessages as def } from '../macro';

        const messages = def({
          'Component.greet': {
            id: 'Component.greet',
            defaultMessage: 'Hello, {name}!',
            description: 'Greeting to welcome the user to the app',
          },
        });

        export default messages;
      `,
    },
    '[FormattedMessage] one X one': {
      error: false,
      code: `
        import * as React from 'react';
        import { FormattedMessage } from '../macro';

        export default class Foo extends React.Component {
          render() {
            return (
              <FormattedMessage
                id="Foo.hello"
                defaultMessage='Hello, {name}!'
                description='Greeting to welcome the user to the app'
              />
            );
          }
        }
      `,
    },
    '[FormattedMessage] one X two': {
      error: false,
      code: `
        import * as React from 'react';
        import { FormattedMessage } from '../macro';

        export default class Foo extends React.Component {
          render() {
            return (
              <React.Fragment>
                <FormattedMessage
                  id="Foo.hello1"
                  defaultMessage='Hello, {name}!'
                  description='Greeting to welcome the user to the app'
                />
                <FormattedMessage
                  id="Foo.hello2"
                  defaultMessage='Hello, {name}!'
                  description='Greeting to welcome the user to the app'
                />
              </React.Fragment>
            );
          }
        }
      `,
    },
    '[FormattedMessage] two X one': {
      error: false,
      code: `
        import * as React from 'react';
        import { FormattedMessage } from '../macro';

        class Foo extends React.Component {
          render() {
            return (
              <FormattedMessage
                id="Foo.hello"
                defaultMessage='Hello, {name}!'
                description='Greeting to welcome the user to the app'
              />
            );
          }
        }

        const Component = () => (
          <FormattedMessage
            id="Component.hello"
            defaultMessage='Hello, {name}!'
            description='Greeting to welcome the user to the app'
          />
        )
      `,
    },
    '[FormattedHTMLMessage]': {
      error: false,
      code: `
        import * as React from 'react';
        import { FormattedHTMLMessage } from '../macro';

        export default class Foo extends React.Component {
          render() {
            return (
              <FormattedHTMLMessage
                id="FormattedHTMLMessage.hello"
                defaultMessage='<div>Hello, {name}!</div>'
                description='Greeting to welcome the user to the app'
              />
            );
          }
        }
      `,
    },
    '[defineMessages, FormattedMessage, FormattedHTMLMessage]': {
      error: false,
      code: `
        import * as React from 'react';
        import { defineMessages, FormattedMessage, FormattedHTMLMessage } from '../macro';

        const messages = defineMessages({
          'Component.greet': {
            id: 'defineMessages.greet',
            defaultMessage: 'Hello, {name}!',
            description: 'Greeting to welcome the user to the app',
          },
        });

        class Foo extends React.Component {
          render() {
            return (
              <React.Fragment>
                <FormattedMessage
                  id="Foo.hello1"
                  defaultMessage='Hello, {name}!'
                  description='Greeting to welcome the user to the app'
                />
                <FormattedMessage
                  id="Foo.hello2"
                  defaultMessage='Hello, {name}!'
                  description='Greeting to welcome the user to the app'
                />
              </React.Fragment>
            );
          }
        }

        const Component = () => (
          <FormattedHTMLMessage
            id="FormattedHTMLMessage.hello"
            defaultMessage='<div>Hello, {name}!</div>'
            description='Greeting to welcome the user to the app'
          />
        )
      `,
    },
  },
});
