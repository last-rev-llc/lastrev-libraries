import { ensureDir, writeFile } from 'fs-extra';
import { map } from 'lodash';
import { join } from 'path';

const MediaFragment = `
import gql from 'graphql-tag';

const MediaFragment = gql\`
  fragment MediaFragment on Media {
    id
    __typename
    title
    variant
    file {
      url
      extension
      fileName
    }
  }
\`;

export default MediaFragment;

`;

const LocationFragment = `
import gql from 'graphql-tag';

const LocationFragment = gql\`
  fragment LocationFragment on Location {
    id
    __typename
    lat
    lon
  }
\`;

export default LocationFragment;

`;

const RichTextLinksFragment = `
import gql from 'graphql-tag';
import MediaFragment from './MediaFragment';


const RichTextLinksFragment = gql\`
  \${MediaFragment}
  fragment RichTextLinksFragment on RichTextLinks {
    entries {
      __typename
      id
      # TODO: add other fields
    }
    assets {
      ...MediaFragment
    }
  }
\`;

export default RichTextLinksFragment;

`;

const RichTextFragment = `
import gql from 'graphql-tag';
import RichTextLinksFragment from './RichTextLinksFragment';

const RichTextFragment = gql\`
  \${RichTextLinksFragment}
  fragment RichTextFragment on RichText {
    json
    links {
      ...RichTextLinksFragment
    }
  }
\`;

export default RichTextFragment;

`;

const standardFragments = {
  MediaFragment,
  LocationFragment,
  RichTextLinksFragment,
  RichTextFragment
};

const writeStandardFragments = async (outputDir: string) => {
  const fragmentsDir = join(outputDir, 'fragments');

  await ensureDir(fragmentsDir);

  await Promise.all(
    map(standardFragments, async (fragment, name) => {
      const filePath = join(fragmentsDir, `${name}.ts`);
      await writeFile(filePath, fragment);
    })
  );
};

export default writeStandardFragments;
