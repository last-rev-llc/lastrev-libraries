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
    theme: Theme
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

  type PathParams {
    params: JSON
    locale: String
  }

  type Query {
    page(slug: String!, locale: String): Page
    pages: [Page!]
    content(id: String!, locale: String): Content
  }

  interface Content {
    id: String
    theme: Theme
    animation: JSON
    sidekickLookup: JSON
  }

  interface Page {
    id: String
    theme: Theme
    animation: JSON
    sidekickLookup: JSON
    slug: String
    pathParams: PathParams
    contents: [Content]
  }
`;

export default baseDefs;
