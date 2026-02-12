import type { API, FileInfo, Options, Collection, JSCodeshift } from 'jscodeshift';

/**
 * Options for config migration
 */
interface ConfigMigrationOptions extends Options {
  useInternationalizedArrays?: boolean;
  fallbackToDefaultLocale?: boolean;
}

/**
 * Transform configuration files to add Sanity i18n options
 *
 * Adds to sanity config object:
 * - useInternationalizedArrays: true/false
 * - fallbackToDefaultLocale: true/false
 */
const transform = (
  file: FileInfo,
  api: API,
  options: ConfigMigrationOptions
): string | null => {
  const j: JSCodeshift = api.jscodeshift;
  const root: Collection = j(file.source);
  let hasChanges = false;

  const useInternationalizedArrays = options.useInternationalizedArrays ?? true;
  const fallbackToDefaultLocale = options.fallbackToDefaultLocale ?? false;

  // Find sanity config objects
  root.find(j.ObjectExpression).forEach((path) => {
    const properties = path.node.properties;

    // Check if this is a sanity config object
    const sanityProp = properties.find((prop: any) => {
      if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
        return prop.key?.name === 'sanity' || prop.key?.value === 'sanity';
      }
      return false;
    });

    if (sanityProp && (sanityProp as any).value?.type === 'ObjectExpression') {
      const sanityValue = (sanityProp as any).value;
      const sanityProperties = sanityValue.properties;

      // Check if useInternationalizedArrays already exists
      const hasI18nArrays = sanityProperties.some((prop: any) => {
        if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
          return prop.key?.name === 'useInternationalizedArrays';
        }
        return false;
      });

      // Check if fallbackToDefaultLocale already exists
      const hasFallback = sanityProperties.some((prop: any) => {
        if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
          return prop.key?.name === 'fallbackToDefaultLocale';
        }
        return false;
      });

      // Add useInternationalizedArrays if not present
      if (!hasI18nArrays) {
        sanityProperties.push(
          j.property(
            'init',
            j.identifier('useInternationalizedArrays'),
            j.literal(useInternationalizedArrays)
          )
        );
        hasChanges = true;
      }

      // Add fallbackToDefaultLocale if not present
      if (!hasFallback) {
        sanityProperties.push(
          j.property(
            'init',
            j.identifier('fallbackToDefaultLocale'),
            j.literal(fallbackToDefaultLocale)
          )
        );
        hasChanges = true;
      }
    }
  });

  // Also check for cms: 'Sanity' to ensure we're in the right file
  const hasSanityCms = root
    .find(j.Property, {
      key: {
        type: 'Identifier',
        name: 'cms'
      },
      value: {
        type: 'StringLiteral',
        value: 'Sanity'
      }
    })
    .size() > 0;

  // If this looks like a Sanity config but doesn't have a sanity object, add one
  if (hasSanityCms) {
    root.find(j.ObjectExpression).forEach((path) => {
      const properties = path.node.properties;

      // Check if this has cms: 'Sanity'
      const cmsProp = properties.find((prop: any) => {
        if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
          return (
            prop.key?.name === 'cms' &&
            prop.value?.type === 'StringLiteral' &&
            prop.value?.value === 'Sanity'
          );
        }
        return false;
      });

      if (cmsProp) {
        // Check if sanity object exists
        const sanityProp = properties.find((prop: any) => {
          if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
            return prop.key?.name === 'sanity';
          }
          return false;
        });

        if (!sanityProp) {
          // Add sanity config object
          const sanityConfig = j.property(
            'init',
            j.identifier('sanity'),
            j.objectExpression([
              j.property(
                'init',
                j.identifier('useInternationalizedArrays'),
                j.literal(useInternationalizedArrays)
              ),
              j.property(
                'init',
                j.identifier('fallbackToDefaultLocale'),
                j.literal(fallbackToDefaultLocale)
              )
            ])
          );
          properties.push(sanityConfig);
          hasChanges = true;
        }
      }
    });
  }

  if (!hasChanges) {
    return null;
  }

  return root.toSource({ quote: 'single' });
};

export default transform;
