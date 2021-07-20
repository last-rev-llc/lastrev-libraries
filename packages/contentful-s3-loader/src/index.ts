import DataLoader from 'dataloader';
import { Entry, Asset, ContentType } from 'contentful';
import { chain, filter, identity } from 'lodash';
import { GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { CredentialsProvider } from './CredentialsProvider';

export type PageKey = {
  slug: string;
  contentTypeId: string;
};

export type ContentfulS3Loaders = {
  entryLoader: DataLoader<string, Entry<any> | null>;
  assetLoader: DataLoader<string, Asset | null>;
  entriesByContentTypeLoader: DataLoader<string, Entry<any>[]>;
  fetchAllContentTypes: () => Promise<ContentType[]>;
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

const createLoaders = (
  apiUrl: string,
  apiKey: string,
  environment: string,
  isPreview: boolean
): ContentfulS3Loaders => {
  const credentialsProvider = new CredentialsProvider(apiKey, apiUrl, environment, isPreview);

  const getObject = async (path: string) => {
    const { accessKeyId, secretAccessKey, sessionToken, bucket, spaceId } = await credentialsProvider.load();

    const client = new S3Client({
      credentialDefaultProvider: () => async () => ({ accessKeyId, secretAccessKey, sessionToken })
    });

    const Key = `${spaceId}/${environment}/${isPreview ? 'preview' : 'production'}/${path}`;

    const command = new GetObjectCommand({ Bucket: bucket, Key });

    const response = await client.send(command);

    return response?.Body ? JSON.parse(await streamToString(response.Body as Readable)) : null;
  };

  const listDirectory = async (path: string) => {
    const { accessKeyId, secretAccessKey, sessionToken, bucket, spaceId } = await credentialsProvider.load();

    const client = new S3Client({
      credentialDefaultProvider: () => async () => ({ accessKeyId, secretAccessKey, sessionToken })
    });

    const Prefix = `${spaceId}/${environment}/${isPreview ? 'preview' : 'production'}/${path}`;

    const out = [];

    let command = new ListObjectsV2Command({ Bucket: bucket, Prefix });
    let response = await client.send(command);

    out.push(...(response.Contents || []).filter((r) => !!r.Key).map((r) => (r.Key as string).replace(Prefix, '')));

    while (response.IsTruncated) {
      command = new ListObjectsV2Command({ Bucket: bucket, Prefix, ContinuationToken: response.NextContinuationToken });
      response = await client.send(command);

      out.push(...(response.Contents || []).filter((r) => !!r.Key).map((r) => (r.Key as string).replace(Prefix, '')));
    }

    return out;
  };

  const getBatchItemFetcher = <T extends Entry<any> | Asset>(
    dirname: 'entries' | 'assets'
  ): DataLoader.BatchLoadFn<string, T | null> => {
    return async (ids): Promise<(T | null)[]> => {
      return Promise.all(
        ids.map((id) =>
          (async () => {
            try {
              return await getObject(`${dirname}/${id}.json`);
            } catch (err) {
              return null;
            }
          })()
        )
      );
    };
  };

  const getBatchEntryIdsByContentTypeFetcher = (): DataLoader.BatchLoadFn<string, string[]> => {
    return async (contentTypeIds) => {
      return Promise.all(
        contentTypeIds.map((contentTypeId) =>
          (async () => {
            try {
              return await listDirectory(`entry_ids_by_content_type/${contentTypeId}`);
            } catch (err) {
              return [];
            }
          })()
        )
      );
    };
  };

  const getBatchEntriesByContentTypeFetcher = (
    eLoader: DataLoader<string, Entry<any> | null>,
    idsLoader: DataLoader<string, (string | null)[]>
  ): DataLoader.BatchLoadFn<string, Entry<any>[]> => {
    return async (keys) => {
      const idsArrays = await idsLoader.loadMany(keys);
      return Promise.all(
        chain(idsArrays)
          .map((ids) =>
            (async () => {
              const entries = await eLoader.loadMany(filter(ids, (id) => id !== null));
              return filter(entries, identity) as Entry<any>[];
            })()
          )
          .value()
      );
    };
  };
  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'));
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'));
  const entryIdsByContentTypeLoader = new DataLoader(getBatchEntryIdsByContentTypeFetcher());
  const entriesByContentTypeLoader = new DataLoader(
    getBatchEntriesByContentTypeFetcher(entryLoader, entryIdsByContentTypeLoader)
  );
  const fetchAllContentTypes = async () => {
    try {
      const contentTypeFilenames = await listDirectory('content_types');
      return Promise.all(
        contentTypeFilenames.map(async (filename) => {
          try {
            return getObject(`content_types/${filename}`);
          } catch (err) {
            return null;
          }
        })
      );
    } catch (err) {
      console.error('Unable to fetch content types:', err.message);
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
