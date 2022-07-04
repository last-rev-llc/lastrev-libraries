import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../src/cors';
function roughSizeOfObject(object: any) {
  var objectList = [];
  var stack = [object];
  var bytes = 0;

  while (stack.length) {
    var value = stack.pop();

    if (typeof value === 'boolean') {
      bytes += 4;
    } else if (typeof value === 'string') {
      bytes += value.length * 2;
    } else if (typeof value === 'number') {
      bytes += 8;
    } else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
      objectList.push(value);

      for (var i in value) {
        stack.push(value[i]);
      }
    }
  }
  return bytes;
}
type Data = {
  name: string;
};

const themeHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const theme = await import('@lrns/components/src/theme');
  const size = roughSizeOfObject(theme);
  res.status(200).json(JSON.parse(JSON.stringify({ size, ...theme })));
};

export default themeHandler;
