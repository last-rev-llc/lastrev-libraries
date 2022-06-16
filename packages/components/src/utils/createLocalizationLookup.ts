import { CommonResourceProps } from '../components/LocalizationContext/CommonResource.types';

const createLocalizationLookup = (items: CommonResourceProps[] | undefined) => {
  if (!items || items.length === 0) return {};
  return items.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.key]: curr
    };
  }, {});
};

export default createLocalizationLookup;
