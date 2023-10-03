import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '@last-rev/types';
import { uniqBy } from './uniqBy';
export interface Option {
  label: string;
  value: string;
}
export const collectOptions = async ({
  filters,
  items,
  ctx
}: {
  filters: { id: string; key: string }[];
  items: any;
  ctx: ApolloContext;
}): Promise<{ [key: string]: Option[] }> => {
  const optionsSets: { [key: string]: Set<any> } = {};
  if (!filters?.length) return {};

  filters.forEach(({ id }) => {
    optionsSets[id] = new Set();
  });
  items?.forEach((entry: any) => {
    filters.forEach(({ id }) => {
      const value: any = getLocalizedField(entry.fields, id, ctx);
      if (!!value) {
        if (Array.isArray(value))
          value.forEach((val) => {
            optionsSets[id].add(val);
          });
        else {
          optionsSets[id].add(value);
        }
      }
    });
  });

  const options: { [key: string]: Array<Option> } = {};
  // Resolve unexpanded links
  // Map to option objects
  // Remove duplicates
  await Promise.all(
    Object.keys(optionsSets).map(async (key: string) => {
      options[key] = await Promise.all(Array.from(optionsSets[key].values()).map(toOption(ctx))).then((items) =>
        uniqBy(
          items?.sort((a, b) => (a.label.toString().toLowerCase() < b.label.toString().toLowerCase() ? -1 : 1)),
          (x) => x.value
        )
      );
    })
  );

  return options;
};

export const toOption = (ctx: ApolloContext) => async (value: string | any) => {
  // Check if option is a reference
  if (typeof value === 'object' && value?.sys && value?.fields) {
    return {
      label: value?.fields?.title ?? value?.fields?.internalTitle,
      value: value?.sys?.id
    };
  } else if (typeof value === 'object' && value?.sys) {
    //Unexpanded link reference
    const item = await ctx.loaders.entryLoader.load({ id: value?.sys?.id, preview: !!ctx.preview });
    if (item) {
      return {
        label: getLocalizedField(item.fields, 'title', ctx) ?? getLocalizedField(item.fields, 'internalTitle', ctx),
        value: item?.sys?.id
      };
    }
  }

  return { label: value, value };
};
