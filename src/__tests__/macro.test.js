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
  },
  tests: {
    'one X one': {
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
    'one X two': {
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
    'two X one': {
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
    'it should only import react-intl once': {
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
    'callee alias': {
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
  },
});
