import { gql } from 'apollo-server';

const baseDefs = gql`
  scalar Date
  scalar JSON

  type Asset {
    id: String
    url: String
    fileName: String
    extension: String
    title: String
    width: String
    height: String
    description: String
  }

  extend type Media implements Content {
    source: String
    sidekickLookup: JSON
    id: String
    theme: [Theme]
    animation: JSON
    title: String
    description: String
    file: Asset
  }

  type Location {
    lat: String
    lon: String
  }

  type RichText {
    id: String
    json: JSON
    links: RichTextLinks
  }

  type RichTextLinks {
    entries: [Content]
    assets: [Media]
  }

  type Theme {
    variant: String
  }

  type Query {
    page(path: String!, locale: String, preview: Boolean, site: String): Content
    paths(locales: [String!], preview: Boolean, site: String): [PagePathParams!]
    content(id: String!, locale: String, preview: Boolean): Content
    sitemap(root: String!, locales: [String!], preview: Boolean, site: String): Sitemap
  }

  type PagePathParam {
    slug: [String!]
  }

  type PagePathParams {
    params: PagePathParam!
    locale: String
  }

  interface Content {
    id: String
    theme: [Theme]
    animation: JSON
    sidekickLookup: JSON
  }

  type SitemapEntry {
    loc: String
    lastmod: String
  }

  type SitemapPage {
    entries: [SitemapEntry]
    loc: String
    lastmod: String
    filename: String
  }

  type Sitemap {
    pages: [SitemapPage]
  }
`;

export default baseDefs;