import { gql } from 'apollo-server';
const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    notificationsEnabled: Boolean!
    notificationSettings: [NotificationSetting!]!
    prefersDarkMode: Boolean
  }

  type NotificationSetting {
    id: ID!
    enabled: Boolean!
    label: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }

  input SignupInput {
    email: String!
    username: String!
    password: String!
    repeatPassword: String!
  }

  input UpdateUserInput {
    email: String
    username: String
    password: String
    oldPassword: String
    notificationsEnabled: Boolean
    notificationSettings: [NotificationSettingInput!]
    prefersDarkMode: Boolean
  }

  input DeleteUserInput {
    id: ID
  }

  input NotificationSettingInput {
    id: ID
    enabled: Boolean!
    label: String!
  }
`;

export default userTypeDefs;
