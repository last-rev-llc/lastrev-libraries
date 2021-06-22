import gql from 'graphql-tag';

export const ContentFragment = gql`
  fragment ContentFragment on Content {
    id
    __typename
    sidekickLookup
    theme {
      variant
    }
    animation
  }
`;
