import { gql } from 'apollo-server';

const baseDefs = gql`
  scalar Date
  scalar JSON

  type File {
    url: String
    fileName: String
    extension: String
  }

  extend type Media implements Content {
    source: String
    sidekickLookup: JSON
    id: String
    theme: [Theme]
    animation: JSON
    title: String
    description: String
    file: File
  }

  type Location {
    lat: String
    lon: String
  }

  type RichText {
    raw: JSON
    parsed: String
  }

  type Theme {
    variant: String
  }

  type Query {
    page(path: String!, locale: String): Content
    paths(locales: [String!]): [PagePathParams!]
    content(id: String!, locale: String): Content
  }

  type PagePathParam {
    slug: [String!]
    locale: String
  }

  type PagePathParams {
    params: PagePathParam!
  }

  interface Content {
    id: String
    theme: [Theme]
    animation: JSON
    sidekickLookup: JSON
  }
`;

export default baseDefs;
