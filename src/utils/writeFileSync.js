// @flow
import fs from 'fs-extra';
import path from 'path';

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
  fs.ensureDirSync(path.dirname(filename));
  fs.writeJsonSync(filename, data);
}
