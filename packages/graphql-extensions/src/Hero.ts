import backgroundColorResolver from './resolvers/backgroundColorResolver';
import contentHeightResolver from './resolvers/contentHeightResolver';

export const mappers: any = {
  Hero: {
    Hero: {
      backgroundColor: backgroundColorResolver,
      contentHeight: contentHeightResolver
    }
  }
};
