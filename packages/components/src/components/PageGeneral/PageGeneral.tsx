import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';
import { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';
import Breadcrumbs from '../Breadcrumbs';
import { Page } from '../../../../graphql-sdk/dist';

const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID as string, process.env.ALGOLIA_SEARCH_API_KEY as string);

const indexName = 'articles';

interface PageGeneralProps extends Omit<Page, '__typename'> {
  __typename?: string | 'Page';
  breadcrumbs?: Array<LinkProps> | any;
}

const PageGeneral = ({ header, hero, contents, footer, disableBackToTop, breadcrumbs }: PageGeneralProps) => {
  return (
    <>
      <InstantSearch indexName={indexName} searchClient={searchClient} stalledSearchDelay={500}>
        {header ? <ContentModule {...(header as any)} /> : null}
        {hero ? <ContentModule {...(hero as any)} /> : null}
        {breadcrumbs ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : null}
        {contents?.map((content: any) => (
          <ContentModule key={content?.id} {...content} data-testid={content.__typename} component="section" />
        ))}
        {!disableBackToTop ? <BackToTop /> : null}
        {footer ? <ContentModule {...(footer as any)} /> : null}
      </InstantSearch>
    </>
  );
};

export default PageGeneral;