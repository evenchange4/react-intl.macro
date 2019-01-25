// @flow
export * from './utils/index';
export { default } from './macro';

/**
 * Note: This is a workaround for flow type to work.
 * The exposed functions are not been used in macro library.
 */
export type MessageDescriptor = {
  id: string,
  description?: string,
  defaultMessage?: string,
};
export type Messages = { [key: string]: MessageDescriptor };
export type DefineMessages = Messages => Messages;
export const defineMessages: DefineMessages = () => ({});
