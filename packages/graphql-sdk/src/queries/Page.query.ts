import gql from 'graphql-tag';
import { ContentTypes_Fragments } from '../fragments/ContentTypes.fragment';

// TODO: Split fragments into separate files
export const PageQuery = gql`
  ${ContentTypes_Fragments}

  query Page($path: String!, $locale: String, $preview: Boolean, $site: String) {
    page(path: $path, locale: $locale, preview: $preview, site: $site) {
      id
      ...Content_Base
      ...Page_Base
      ...CategoryBlog_Page
      ...Blog_Page
    }
  }
`;
