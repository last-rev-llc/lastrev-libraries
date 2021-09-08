import { ensureDir, writeFile } from 'fs-extra';
import { join } from 'path';
import capitalizeFirst from './capitalizeFirst';

const LinkFragment = (linkContentType: string) => `
  import gql from 'graphql-tag';

  const LinkFragment = gql\`
    fragment LinkFragment on ${capitalizeFirst(linkContentType)} {
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

const WriteLinkFragment = async (outputDir: string, linkContentType: string) => {
  const fragmentDir = join(outputDir, 'fragments');

  await ensureDir(fragmentDir);

  const linkFragment = LinkFragment(linkContentType);
  await writeFile(join(fragmentDir, `${capitalizeFirst(linkContentType)}Fragment.ts`), linkFragment);
};

export default WriteLinkFragment;
