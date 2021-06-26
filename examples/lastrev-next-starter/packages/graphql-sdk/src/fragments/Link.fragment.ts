import gql from 'graphql-tag';

export const LinkFragment = gql`
  fragment LinkFragment on Link {
    ...ContentFragment
    text
    url
    target
  }
`;
