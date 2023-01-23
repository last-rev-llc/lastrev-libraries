import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { createClient } from 'contentful-management';

const client = createClient({
  accessToken: `${process.env.CONTENTFUL_CMA_TOKEN}`
});

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
  const googleDocId = req.body.googleDocId;
  const lastUpdatedAt = req.body.lastUpdatedAt;
  const auth = req.headers.authorization;

  if (auth !== process.env.GOOGLE_DOC_API_KEY) {
    return res.status(401).send({});
  }

  if (!googleDocId || !lastUpdatedAt) {
    return res.status(400).send({});
  }

  try {
    const space = await client.getSpace(`${process.env.CONTENTFUL_SPACE_ID}`);
    const env = await space.getEnvironment(`${process.env.CONTENTFUL_ENV}`);

    const data = await env.getEntries({
      'content_type': 'document',
      'fields.googleId': googleDocId
    });

    const items = data?.items ?? [];

    await Promise.all(
      items.map(async (item) => {
        try {
          if (item.fields.lastUpdatedDateOfGoogleDoc['en-US'] === lastUpdatedAt) {
            return;
          }
          item.fields.lastUpdatedDateOfGoogleDoc['en-US'] = lastUpdatedAt;

          const shouldPublish = item.sys.publishedVersion && item.sys.publishedVersion + 1 === item.sys.version;

          const updated = await item.update();
          if (shouldPublish) {
            await updated.publish();
          }
        } catch (err) {
          console.log(err);
        }
      })
    );
  } catch (err) {
    console.log(err);
  }

  res.status(200).send({ ok: true });
};

export default handler;
