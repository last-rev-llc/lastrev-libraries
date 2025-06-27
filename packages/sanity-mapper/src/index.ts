import { mapSanityPortableTextArrayToContentfulRichText } from './richTextHelpers';
import type { ContentType, BaseAsset, BaseEntry } from '@last-rev/types';

export const mapSanityValueToContentful = (value: any, defaultLocale: string): any => {
  // Detect Sanity rich text (Block[])
  if (Array.isArray(value) && value[0] && (value[0]._type === 'block' || value[0]._type === 'break')) {
    return mapSanityPortableTextArrayToContentfulRichText(value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => mapSanityValueToContentful(item, defaultLocale));
  }
  if (value && typeof value === 'object') {
    // Handle Sanity slug field
    if ((value._type === 'slug' || Object.keys(value).length === 1) && typeof value.current === 'string') {
      return value.current;
    }
    // Handle Sanity reference
    if (value._type === 'reference' && value._ref) {
      return {
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: value._ref
        }
      };
    }
    // Handle Sanity asset reference (image/file)
    if ((value._type === 'image' || value._type === 'file') && value.asset?._ref) {
      return {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: value.asset._ref
        }
      };
    }
    // Recursively process all object properties
    const mapped: any = {};
    for (const [k, v] of Object.entries(value)) {
      mapped[k] = mapSanityValueToContentful(v, defaultLocale);
    }
    return mapped;
  }
  return value;
};

const processTranslations = (translations: any[], defaultLocale: string, locales: string[]): Record<string, any> => {
  if (!translations?.length) return {};

  const translatedFields: Record<string, any> = {};

  translations.forEach((translation) => {
    const { doc } = translation;
    if (!doc) return;

    const locale = doc.__i18n_lang || defaultLocale;
    if (!locales.includes(locale)) return;

    const { _id, _type, _updatedAt, _createdAt, __i18n_lang, _translations, ...fields } = doc;

    Object.entries(fields).forEach(([name, value]) => {
      if (!translatedFields[name]) {
        translatedFields[name] = {};
      }

      // Special handling for file fields in assets
      if (name === 'url' || name === 'originalFilename' || name === 'mimeType') {
        if (!translatedFields.file) {
          translatedFields.file = {};
        }
        if (!translatedFields.file[locale]) {
          translatedFields.file[locale] = {};
        }
        // Map Sanity fields to Contentful fields
        if (name === 'mimeType') {
          translatedFields.file[locale].contentType = value;
        } else if (name === 'originalFilename') {
          translatedFields.file[locale].fileName = value;
        } else {
          translatedFields.file[locale][name] = value;
        }
      } else {
        translatedFields[name][locale] = mapSanityValueToContentful(value, defaultLocale);
      }
    });
  });

  return translatedFields;
};

export const convertSanityDoc = (doc: any, defaultLocale: string, locales: string[]): BaseEntry | BaseAsset | null => {
  if (!doc) return null;

  // Extract the actual default locale from the document if present
  const docDefaultLocale = doc.__i18n_lang || defaultLocale;

  const { _id, _type, _updatedAt, _createdAt, __i18n_lang, _translations, ...fields } = doc;

  // Detect top-level asset (Sanity image or file asset)
  if (
    _type === 'sanity.imageAsset' ||
    _type === 'sanity.fileAsset' ||
    _type === 'imageAsset' ||
    _type === 'fileAsset' ||
    _type === 'file'
  ) {
    // Process translations for assets
    const translatedFields = processTranslations(_translations || [], docDefaultLocale, locales);

    // Map to Contentful asset structure
    const assetFields: any = {
      title: { [docDefaultLocale]: fields.title || '' },
      alt: { [docDefaultLocale]: fields.alt || '' },
      file: {
        [docDefaultLocale]: {
          contentType: fields.mimeType || '',
          fileName: fields.originalFilename || '',
          url: fields.url || '',
          details: {}
        }
      }
    };

    // Merge translations for title and alt
    if (translatedFields.title) {
      assetFields.title = { ...assetFields.title, ...translatedFields.title };
    }
    if (translatedFields.alt) {
      assetFields.alt = { ...assetFields.alt, ...translatedFields.alt };
    }

    // Copy file data to all locales
    locales.forEach((locale) => {
      if (locale !== docDefaultLocale) {
        assetFields.file[locale] = {
          ...assetFields.file[docDefaultLocale]
        };
      }
    });

    if (fields.metadata && fields.metadata.dimensions) {
      // Add dimensions to all locales
      Object.keys(assetFields.file).forEach((locale) => {
        assetFields.file[locale].details.image = {
          width: fields.metadata.dimensions.width,
          height: fields.metadata.dimensions.height
        };
      });
    }
    if (fields.size) {
      // Add size to all locales
      Object.keys(assetFields.file).forEach((locale) => {
        assetFields.file[locale].details.size = fields.size;
      });
    }
    // Optionally map tags if present
    const metadata: any = {};
    if (fields.tags && Array.isArray(fields.tags)) {
      metadata.tags = fields.tags.map((tag: any) => ({
        sys: {
          type: 'Link',
          linkType: 'Tag',
          id: tag._ref || tag._id || tag.id || tag
        }
      }));
    }
    return {
      fields: assetFields,
      metadata,
      sys: {
        id: _id,
        type: 'Asset',
        createdAt: _createdAt,
        updatedAt: _updatedAt,
        revision: doc._rev
      }
    } as BaseAsset;
  }

  // Process translations for entries
  const translatedFields = processTranslations(_translations || [], docDefaultLocale, locales);

  const entry = {
    sys: {
      id: _id,
      type: 'Entry',
      updatedAt: _updatedAt,
      createdAt: _createdAt,
      contentType: {
        sys: {
          type: 'Link',
          linkType: 'ContentType',
          id: _type
        }
      }
    },
    fields: Object.entries(fields).reduce((acc: any, [name, value]: [string, any]) => {
      // Start with the default locale value
      acc[name] = { [docDefaultLocale]: mapSanityValueToContentful(value, docDefaultLocale) };

      // Merge any translations for this field
      if (translatedFields[name]) {
        Object.assign(acc[name], translatedFields[name]);
      }

      return acc;
    }, {})
  };
  return entry as BaseEntry;
};

export const mapSanityField = (field: any): any => {
  let type = 'Symbol';
  let linkType;
  let items;
  let validations = [];

  switch (field.type) {
    case 'string':
    case 'slug':
    case 'url':
      type = 'Symbol';
      break;
    case 'text':
      type = 'Text';
      break;
    case 'number':
    case 'integer':
      type = 'Number';
      break;
    case 'boolean':
      type = 'Boolean';
      break;
    case 'datetime':
    case 'date':
      type = 'Date';
      break;
    case 'object':
      type = 'Object';
      break;
    case 'image':
    case 'file':
      type = 'Link';
      linkType = 'Asset';
      break;
    case 'reference':
      type = 'Link';
      linkType = 'Entry';
      if (field.to) {
        validations.push({
          linkContentType: field.to.map((t: any) => t.type)
        });
      }
      break;
    case 'array':
      if (field.of && field.of.length) {
        const firstItem = field.of[0];
        const firstItemType = firstItem.type;
        type = 'Array';
        switch (firstItemType) {
          case 'reference':
            items = {
              type: 'Link',
              linkType: 'Entry',
              validations:
                field.of.length > 1
                  ? [
                      {
                        linkContentType: field.of.map((item: any) =>
                          item.to ? item.to.map((t: any) => t.type) : item.type
                        )
                      }
                    ]
                  : []
            };
            break;
          case 'file':
            items = {
              type: 'Link',
              linkType: 'Asset'
            };
            break;
          case 'block':
            type = 'RichText';
            break;
          default:
            items = { type: mapSanityField(firstItem).type };
        }
      }

      break;
    case 'richText':
    case 'block':
      type = 'RichText';
      break;
    default:
      // this will capture all custom object types.
      // may have to revisit.
      type = 'Object';
  }

  return {
    id: field.name,
    name: field.title,
    type,
    localized: false,
    required: field.validation?.required || false,
    validations,
    disabled: false,
    omitted: false,
    ...(linkType && { linkType }),
    ...(items && { items })
  };
};

export const mapSanityTypesToContentfulTypes = (schemaTypes: any[]): ContentType[] => {
  return schemaTypes.map((type) => ({
    sys: {
      id: type.name,
      type: 'ContentType'
    },
    displayField: 'internalTitle',
    name: type.title,
    description: type.description || '',
    fields: type.fields.map(mapSanityField)
  })) as ContentType[];
};
