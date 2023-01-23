import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse<any>) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS']
  })
);

const handler: NextApiHandler = async (req, res) => {
  await cors(req, res);
  console.log('LR_KEY: ', req.cookies?.['LR_KEY']);
  if (req.cookies?.['LR_KEY'] !== process.env.LR_KEY) return res.status(404).send({});
  else res.status(200).send({ ok: true });
};

export default handler;
