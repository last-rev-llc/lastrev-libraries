import { draftMode } from 'next/headers';
const preview = process.env.CONTENTFUL_USE_PREVIEW === 'true';

export const isPreview = () => {
  const { isEnabled } = draftMode();
  return preview || isEnabled;
};
