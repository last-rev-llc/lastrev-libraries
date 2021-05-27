import { gql } from 'apollo-server';
import userTypeDefs from './user';
import contentTypeDefs from './content';

export const contentFields = `
  id: String
  #slug: String
  theme: Theme
  animation: JSON
  sidekickLookup: JSON
`;
export default gql`
  scalar Date
  scalar JSON

  type Query {
    page(slug: String!, locale: String): Page
    pages(locale: String): [Page!]
    content(id: String!, locale: String): Content
    me: User!
  }

  type Mutation {
    login(input: LoginInput!): User
    signup(input: SignupInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(input: DeleteUserInput!): User
  }
  ${userTypeDefs}
  interface Content {
   ${contentFields}
  }
  
  # type NavigationItem {
  #   url: String
  #   children:[NavigationItem!]
  # }

  # type Section implements Content  {
  #id:
  # sidekickLookup: JSON
  #   flex: FlexOptions
  #   grid: GridOptions
  #   position: PositionOptions
  # }

  ${contentTypeDefs}
`;
