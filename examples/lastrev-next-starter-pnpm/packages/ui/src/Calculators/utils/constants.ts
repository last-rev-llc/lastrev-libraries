export enum ContentfulFields {
    FlexibleComponents = 'flexibleComponents',
    Tags = 'tags',
    Categories = 'categories',
    CategoryNav = 'categoryNav',
    MustReadArticles = 'mustReadArticles',
    Essentials = 'essentials',
    Recommendations = 'recommendations',
    PageComponents = 'pageComponents',
    ListItems = 'listItems'
}

export enum ContentfulContentTypes {
    Flexible = 'flexibleContentTemplate'
}

export enum Templates {
    Flexible = '/flexible-template'
}

export const FlexibleComponents: Array<string> = [
    'heroComponent',
    'mediaComponent',
    'richBlockComponent'
]