import type { NextApiRequest, NextApiResponse } from 'next';
import theme from '@lrns/components/src/theme';
import cors from '../../src/cors';

type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  res.status(200).json(JSON.parse(JSON.stringify(theme)));
};
