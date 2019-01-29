// @flow

export type Message = {
  id: string | number,
  defaultMessage:
    | string
    | {
        text: string,
        metadata: string,
      },
  description: string,
};
