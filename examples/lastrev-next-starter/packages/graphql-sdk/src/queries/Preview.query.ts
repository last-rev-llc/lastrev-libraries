import gql from 'graphql-tag';
import { ContentFragment } from '../fragments/Content.fragment';
// import { LinkFragment } from '../fragments/Link.fragment';

export const PageQuery = gql`
  ${ContentFragment}

  query Preview($id: String!, $locale: String) {
    content(id: $id, locale: $locale) {
      ...ContentFragment
      ... on IndexPage {
        pageTitle
      }
    }
  }
`;
