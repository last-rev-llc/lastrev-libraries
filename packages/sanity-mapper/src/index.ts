import { mapSanityPortableTextArrayToContentfulRichText } from './richTextHelpers';
import { type Asset, type Entry, type ContentType } from 'contentful';

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
    if (value._type === 'image' && value.asset?._ref) {
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

export const convertSanityDoc = (doc: any, defaultLocale: string): Entry<any> | Asset | null => {
  if (!doc) return null;
  const { _id, _type, _updatedAt, _createdAt, ...fields } = doc;

  // Detect top-level asset (Sanity image or file asset)
  if (
    _type === 'sanity.imageAsset' ||
    _type === 'sanity.fileAsset' ||
    _type === 'imageAsset' ||
    _type === 'fileAsset'
  ) {
    // Map to Contentful asset structure
    const assetFields: any = {
      title: { [defaultLocale]: fields.alt || fields.title || '' },
      file: {
        [defaultLocale]: {
          contentType: fields.mimeType || fields.contentType || '',
          fileName: fields.originalFilename || fields.fileName || '',
          url: fields.url || '',
          details: {}
        }
      }
    };
    if (fields.metadata && fields.metadata.dimensions) {
      assetFields.file[defaultLocale].details.image = {
        width: fields.metadata.dimensions.width,
        height: fields.metadata.dimensions.height
      };
    }
    if (fields.size) {
      assetFields.file[defaultLocale].details.size = fields.size;
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
        // Optionally add space if you have a mapping
      }
    } as Asset;
  }

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
      // Recursively map all values, including references and rich text
      acc[name] = { [defaultLocale]: mapSanityValueToContentful(value, defaultLocale) };
      return acc;
    }, {})
  };
  return entry as Entry<any>;
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
              validations: [{ linkContentType: field.of.map((item: any) => item.to.map((t: any) => t.type)) }]
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
      type = 'Symbol';
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
