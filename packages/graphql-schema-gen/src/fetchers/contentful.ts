import { createClient, CreateClientParams } from 'contentful';
import { upperFirst, map } from 'lodash';
import mapper from '../mappers/contentful';
import { Fetcher } from '../types';

const contentfulFetcher: Fetcher = async (clientParams: CreateClientParams) => {
  const client = createClient(clientParams);

  const contentTypes = await client.getContentTypes();

  const contentTypeIds = map(contentTypes.items, 'sys.id');

  return contentTypes.items.map((contentType) => {
    return {
      typeName: upperFirst(contentType.sys.id),
      fields: map(contentType.fields, (field) => mapper(field.type, field, contentTypeIds))
    };
  });
};

export default contentfulFetcher;
