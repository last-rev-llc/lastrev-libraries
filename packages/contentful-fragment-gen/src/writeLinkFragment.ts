import { ensureDir, writeFile } from 'fs-extra';
import { join } from 'path';
import capitalizeFirst from './capitalizeFirst';

const LinkFragment = (linkContentType: string, typeMappings: Record<string, string>) => `
  import gql from 'graphql-tag';

  const LinkFragment = gql\`
    fragment LinkFragment on ${capitalizeFirst(linkContentType, typeMappings)} {
      id
      __typename
      sidekickLookup
      href,
      as,
      target,
      isModal,
      download
    }
  \`;

  export default LinkFragment;
  
`;

const WriteLinkFragment = async (outputDir: string, linkContentType: string, typeMappings: Record<string, string>) => {
  const fragmentDir = join(outputDir, 'fragments');

  await ensureDir(fragmentDir);

  const linkFragment = LinkFragment(linkContentType, typeMappings);
  await writeFile(join(fragmentDir, `${capitalizeFirst(linkContentType, typeMappings)}Fragment.ts`), linkFragment);
};

export default WriteLinkFragment;
