import DataLoader from 'dataloader';
import { Entry, Asset, ContentType } from 'contentful';
import { chain, filter, get, identity, pickBy } from 'lodash';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
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

  const getBatchEntriesByContentTypeFetcher = (
    loader: DataLoader<string, Entry<any> | null>
  ): DataLoader.BatchLoadFn<string, Entry<any>[]> => {
    return async (keys) => {
      // TODO: this
      const contentTypeToIdsLookup = await getObject('entry_ids_by_content_type_lookup.json');

      const filteredMapping = pickBy(contentTypeToIdsLookup, (_, key) => {
        return keys.indexOf(key) > -1;
      });

      return Promise.all(
        chain(keys)
          .map((k) => get(filteredMapping, k, []))
          .map((ids) =>
            (async () => {
              const entries = await loader.loadMany(ids);
              return filter(entries, identity) as Entry<any>[];
            })()
          )
          .value()
      );
    };
  };

  const entryLoader = new DataLoader(getBatchItemFetcher<Entry<any>>('entries'));
  const assetLoader = new DataLoader(getBatchItemFetcher<Asset>('assets'));
  const entriesByContentTypeLoader = new DataLoader(getBatchEntriesByContentTypeFetcher(entryLoader));
  const fetchAllContentTypes = async () => {
    try {
      return await getObject('content_types.json');
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
