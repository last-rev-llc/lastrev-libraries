import { ContentfulClientApi, ContentType, Entry } from 'contentful';
import { has } from 'lodash';
import flatten from 'lodash/flatten';

const TEN_MIN = 1000 * 60 * 10;

const delay = (m: number) => new Promise((r) => setTimeout(r, m));

export default class EntryFetcher {
  client: ContentfulClientApi;
  contentTypes: ContentType[];
  ttl: number;
  lastFetched?: number;
  allEntries: Entry<any>[] = [];

  constructor(client: ContentfulClientApi, contentTypes: ContentType[], ttl: number = TEN_MIN) {
    this.client = client;
    this.contentTypes = contentTypes;
    this.ttl = ttl;
  }

  shouldFetch() {
    const now = Date.now();
    return !this.lastFetched || this.lastFetched + this.ttl < now;
  }

  async syncAllEntriesForContentType(contentTypeId: string): Promise<Entry<any>[]> {
    const results = await this.client.sync({
      initial: true,
      content_type: contentTypeId,
      resolveLinks: false
    });

    return results.entries;
  }

  async syncAllEntries(): Promise<void> {
    const self = this;
    this.allEntries = flatten(
      await Promise.all(
        this.contentTypes.map((contentType, index) =>
          (async () => {
            const contentTypeId = contentType.sys.id;
            await delay(index * 100);

            return await self.syncAllEntriesForContentType(contentTypeId);
          })()
        )
      )
    );
    this.lastFetched = Date.now();
  }

  async fetch(): Promise<Entry<any>[]> {
    if (this.shouldFetch()) {
      await this.syncAllEntries();
    }
    return this.allEntries;
  }

  async fetchPages(): Promise<Entry<any>[]> {
    return (await this.fetch()).filter((e) => has(e, ['fields', 'slug']));
  }
}
