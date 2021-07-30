import DataLoader from 'dataloader';
import { Entry, Asset, ContentType } from 'contentful';
import { filter, identity, map } from 'lodash';
import { GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { CredentialsProvider } from './CredentialsProvider';
import logger from 'loglevel';
import Timer from '@last-rev/timer';

export type ItemKey = {
  id: string;
  preview?: boolean;
};

export type ContentfulS3Loaders = {
  entryLoader: DataLoader<ItemKey, Entry<any> | null>;
  assetLoader: DataLoader<ItemKey, Asset | null>;
  entriesByContentTypeLoader: DataLoader<ItemKey, Entry<any>[]>;
  fetchAllContentTypes: (preview: boolean) => Promise<ContentType[]>;
};

// Apparently the stream parameter should be of type Readable|ReadableStream|Blob
// The latter 2 don't seem to exist anywhere.
async function streamToString(stream: Readable): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}

const createLoaders = (apiUrl: string, apiKey: string, environment: string): ContentfulS3Loaders => {
  const previewCredentialsProvider = new CredentialsProvider(apiKey, apiUrl, environment, true);
  const prodCredentialsProvider = new CredentialsProvider(apiKey, apiUrl, environment, false);

  const getObject = async (path: string, preview: boolean) => {
    const { accessKeyId, secretAccessKey, sessionToken, bucket, spaceId } = await (preview
      ? previewCredentialsProvider
      : prodCredentialsProvider
    ).load();

    const client = new S3Client({
      credentialDefaultProvider: () => async () => ({ accessKeyId, secretAccessKey, sessionToken })
    });

    const Key = `${spaceId}/${environment}/${preview ? 'preview' : 'production'}/${path}`;

    const command = new GetObjectCommand({ Bucket: bucket, Key });

    const response = await client.send(command);

    return response?.Body ? JSON.parse(await streamToString(response.Body as Readable)) : null;
  };

  const listDirectory = async (path: string, preview: boolean) => {
    const { accessKeyId, secretAccessKey, sessionToken, bucket, spaceId } = await (preview
      ? previewCredentialsProvider
      : prodCredentialsProvider
    ).load();

    const client = new S3Client({
      credentialDefaultProvider: () => async () => ({ accessKeyId, secretAccessKey, sessionToken })
    });

    const Prefix = `${spaceId}/${environment}/${preview ? 'preview' : 'production'}/${path}`;

    const out = [];

    let command = new ListObjectsV2Command({ Bucket: bucket, Prefix });
    let response = await client.send(command);

    out.push(
      ...(response.Contents || []).filter((r) => !!r.Key).map((r) => (r.Key as string).replace(`${Prefix}/`, ''))
    );

    while (response.IsTruncated) {
      command = new ListObjectsV2Command({ Bucket: bucket, Prefix, ContinuationToken: response.NextContinuationToken });
      response = await client.send(command);

      out.push(
        ...(response.Contents || []).filter((r) => !!r.Key).map((r) => (r.Key as string).replace(`${Prefix}/`, ''))
      );
    }

    return out;
  };

  const getBatchItemFetcher = <T extends Entry<any> | Asset>(
    dirname: 'entries' | 'assets'
  ): DataLoader.BatchLoadFn<ItemKey, T | null> => {
    return async (keys): Promise<(T | null)[]> => {
      const timer = new Timer(`Fetched ${dirname} from S3`);
      const out = Promise.all(
        keys.map((key) =>
          (async () => {
            try {
              const { id, preview } = key;
              return await getObject(`${dirname}/${id}.json`, !!preview);
            } catch (err) {
              return null;
            }
          })()
        )
      );
      logger.debug(timer.end());
      return out;
    };
  };

  const getBatchEntryIdsByContentTypeFetcher = (): DataLoader.BatchLoadFn<ItemKey, string[]> => {
    return async (keys) => {
      return Promise.all(
        keys.map((key) =>
          (async () => {
            try {
              const { id, preview } = key;
              return await listDirectory(`entry_ids_by_content_type/${id}`, !!preview);
            } catch (err) {
              return [];
            }
          })()
        )
      );
    };
  };

  const getBatchEntriesByContentTypeFetcher = (
    eLoader: DataLoader<ItemKey, Entry<any> | null>,
    idsLoader: DataLoader<ItemKey, (string | null)[]>
  ): DataLoader.BatchLoadFn<ItemKey, Entry<any>[]> => {
    return async (keys) => {
      const timer = new Timer(`Fetched entries by content type from S3`);
      const idsArrays = await idsLoader.loadMany(keys);
      const out = Promise.all(
        map(idsArrays, (ids) =>
          (async () => {
            const entries = await eLoader.loadMany(filter(ids, (id) => id !== null));
            return filter(entries, identity) as Entry<any>[];
          })()
        )
      );
      logger.debug(timer.end());
      return out;
    };
  };
  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'));
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'));
  const entryIdsByContentTypeLoader = new DataLoader(getBatchEntryIdsByContentTypeFetcher());
  const entriesByContentTypeLoader = new DataLoader(
    getBatchEntriesByContentTypeFetcher(entryLoader, entryIdsByContentTypeLoader)
  );
  const fetchAllContentTypes = async (preview: boolean) => {
    try {
      const timer = new Timer('Fetched all content types from S3');
      const contentTypeFilenames = await listDirectory('content_types', !!preview);
      const out = Promise.all(
        contentTypeFilenames.map(async (filename) => {
          try {
            return getObject(`content_types/${filename}`, preview);
          } catch (err) {
            return null;
          }
        })
      );
      logger.debug(timer.end());
      return out;
    } catch (err) {
      console.error('Unable to fetch content types using S3 loader:', err.message);
      return [];
    }
  };

  return {
    entryLoader,
    assetLoader,
    entriesByContentTypeLoader,
    fetchAllContentTypes
  };
};

export default createLoaders;
