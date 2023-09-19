// import { Mappers } from '@last-rev/types';
import gql from 'graphql-tag';

export const typeDefs = gql`
  type Text {
    body: RichText
  }
`;

// export const mappers: Mappers = {
//   Text: {
//     Text: {}
//   }
// };
