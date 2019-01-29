// @flow

export type MessageDescriptor = {
  id: string | number,
  defaultMessage?:
    | string
    | {
        text: string,
        metadata: string,
      },
  description?: string,
};
