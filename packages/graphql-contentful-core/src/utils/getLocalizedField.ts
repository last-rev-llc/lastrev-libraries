import { Entry } from 'contentful';
import get from 'lodash/get';

const getLocalizedField = <T>(locale: string, fields: Entry<T>['fields'], field: string, defaultLocale: string) => {
  return get(fields, [field, locale], get(fields, [field, defaultLocale]));
};

export default getLocalizedField;
