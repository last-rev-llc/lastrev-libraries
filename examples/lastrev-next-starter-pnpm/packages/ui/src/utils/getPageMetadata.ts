import type { Metadata, ResolvedMetadata } from 'next/types';

interface ImageSettingEntry {
  name: string;
  value: {
    id: string;
    url: string;
    title: string;
  };
}

interface SettingEntry {
  name: string;
  value: string;
}

interface SEOValue {
  'robots': SettingEntry;
  'canonical': SettingEntry;
  'keywords': SettingEntry;
  'title': SettingEntry;
  'description': SettingEntry;
  'og:title': SettingEntry;
  'og:description': SettingEntry;
  'og:image': ImageSettingEntry;
  'twitter:title': SettingEntry;
  'twitter:description': SettingEntry;
  'twitter:image': ImageSettingEntry;
  [key: string]: SettingEntry | ImageSettingEntry;
}

export const getPageMetadata = ({
  seo,
  parentSEO
}: {
  seo: SEOValue | undefined;
  parentSEO: ResolvedMetadata;
}): Metadata => {
  if (!seo) return {} as Metadata;
  const canonical = seo['canonical']?.value;
  return {
    referrer: 'origin-when-cross-origin',
    title: seo['title']?.value,
    authors: [{ name: 'Max' }, { name: 'Adam', url: 'https://lastrev.com' }],
    publisher: 'Last Rev',
    description: seo['description']?.value,
    keywords: seo['keywords']?.value,
    robots: seo['robots']?.value,
    // TODO: Cannot import theme in server AND client ????
    // colorScheme: theme.palette.mode,
    // themeColor: theme.palette.primary.main,
    alternates: {
      canonical
      // TODO: Add support for included locales
      // languages: {
      //   'en-US': '/en-US',
      //   'es-ES': '/es-ES'
      // }
    },
    openGraph: {
      title: seo['og:title']?.value || seo['title']?.value,
      description: seo['og:description']?.value || seo['description']?.value,
      images: [
        {
          url: seo['og:image']?.value?.url
        }
      ]
    },
    twitter: {
      title: seo['twitter:title']?.value || seo['title']?.value,
      description: seo['twitter:description']?.value || seo['description']?.value,
      images: seo['twitter:image']?.value
        ? [
            {
              url: seo['twitter:image']?.value?.url
            }
          ]
        : undefined
    }
  };
};
