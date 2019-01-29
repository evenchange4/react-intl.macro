// @flow
import * as fs from 'fs-extra';
import path from 'path';
import { type Message } from './type.flow';

export default function writeFileSync(
  filename: string,
  data: Array<Message>,
  // Note: state for test snapshot only
  state: any, // eslint-disable-line
) {
  fs.ensureDirSync(path.dirname(filename));
  fs.writeJsonSync(filename, data);
}
