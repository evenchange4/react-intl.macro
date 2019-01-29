// @flow
import * as React from 'react';
import { type MessageDescriptor } from './utils/type.flow';

export * from './utils/index';
export { default } from './macro';

/**
 * Note: This is a workaround for flow type to work.
 * The exposed functions are not been used in macro library.
 */

export type Messages = { [key: string]: MessageDescriptor };
export type DefineMessages = Messages => Messages;
export const defineMessages: DefineMessages = () => ({});
export const FormattedMessage: React.ComponentType<MessageDescriptor> = () =>
  null;
export const FormattedHTMLMessage: React.ComponentType<MessageDescriptor> = () =>
  null;
