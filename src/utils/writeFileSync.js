// @flow
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

export default function writeFileSync(
  {
    filename,
    data,
  }: {
    filename: string,
    data: Array<{
      id: string,
      defaultMessage: string,
      description?: string,
    }>,
  },
  // state for test snapshot only
  state: any, // eslint-disable-line
) {
  spawnSync('mkdir', ['-p', path.dirname(filename)]);
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}
