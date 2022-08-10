import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../src/cors';

type Data = {
  deployUrl: string;
};

const themeHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const theme = await import('@lrns/components/src/theme');

  res.status(200).json({ deployUrl: `${process.env.DEPLOY_URL}` });
};

export default themeHandler;
