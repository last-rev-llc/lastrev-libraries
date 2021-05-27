import { getLocalizedField } from './fieldResolver';

const linkUrlResolver = async (link: any, { locale = 'en-US' }: { locale?: string }, { loaders }: { loaders: any }) => {
  //TODO document this use case for adapting theme fields without updating content model
  //TODO document migrating old fields to new component standards
  const url = getLocalizedField(locale, link, 'url');
  if (url) return url;

  const pageAnchor = getLocalizedField(locale, link, 'pageAnchor');
  if (pageAnchor) return pageAnchor;

  const contentRef = getLocalizedField(locale, link, 'content');
  if (contentRef) {
    const content = await loaders.entries.load(contentRef.sys.id);
    return getLocalizedField(locale, content, 'slug');
  }
};
export default linkUrlResolver;
