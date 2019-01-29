// @flow
import * as fs from 'fs-extra';
import path from 'path';
import { type MessageDescriptor } from './type.flow';

export default function writeFileSync(
  filename: string,
  data: Array<MessageDescriptor>,
  // Note: state for test snapshot only
  state: any, // eslint-disable-line
) {
  fs.ensureDirSync(path.dirname(filename));
  fs.writeJsonSync(filename, data);
}
