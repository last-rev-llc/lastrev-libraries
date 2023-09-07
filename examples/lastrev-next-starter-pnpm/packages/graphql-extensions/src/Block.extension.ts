import gql from 'graphql-tag';

// import colorSchemeResolver from './resolvers/colorSchemeResolver';
// import blockVariantResolver from './resolvers/blockVariantResolver';
// import titleColorResolver from './resolvers/titleColorResolver';
// import subtitleColorResolver from './resolvers/subtitleColorResolver';
// import containerSpacingResolver from './resolvers/containerSpacingResolver';
// import contentSpacingResolver from './resolvers/contentSpacingResolver';
// import backgroundSizeResolver from './resolvers/backgroundSizeResolver';
// import backgroundColorResolver from './resolvers/backgroundColorResolver';
// import backgroundImageSizeResolver from './resolvers/backgroundImageSizeResolver';
// import cardVariantResolver from './resolvers/cardVariantResolver';
// import cardTextSpacingResolver from './resolvers/cardTextSpacingResolver';
// import highlightColorResolver from './resolvers/highlightColorResolver';
// import eyebrowColorResolver from './resolvers/eyebrowColorResolver';
// import columnSpanResolver from './resolvers/columnSpanResolver';

export const mappers = {
  Block: {
    Block: {
      // colorscheme: colorSchemeResolver,
      // variant: blockVariantResolver,
      // richEyebrow: 'eyebrow',
      // titleColor: titleColorResolver,
      // richTitle: 'title',
      // subtitleColor: subtitleColorResolver,
      // richSubtitle: 'subtitle',
      // containerPy: containerSpacingResolver,
      // contentPy: contentSpacingResolver,
      // cardsVariant: cardVariantResolver('cardsVariant'),
      // cardsTextSpacing: cardTextSpacingResolver('cardsVariant'),
      // backgroundSize: backgroundSizeResolver,
      // backgroundColor: backgroundColorResolver,
      // backgroundImageSize: backgroundImageSizeResolver,
      // highlightColor: highlightColorResolver,
      // eyebrowColor: eyebrowColorResolver,
      // cols: columnSpanResolver
    }
  }
};

export const typeDefs = gql`
  extend type Block {
    introText: Text
    mediaItems: [Media]
    actions: [Link]
    link: Link
  }
`;
