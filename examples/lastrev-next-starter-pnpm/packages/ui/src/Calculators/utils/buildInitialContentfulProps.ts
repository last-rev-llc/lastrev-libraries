import { ContentfulFields } from './constants';

export default function buildInitialContentfulProps(fields: any, isArray: boolean) {
  if (isArray) {
    return fields.map((item: any) => buildInitialContentfulProps(item.fields, false));
  }

  const builtComponentProps: any = {};
  for (const component in fields) {
    if (
      component === ContentfulFields.FlexibleComponents ||
      component === ContentfulFields.Categories ||
      component === ContentfulFields.Tags ||
      component === ContentfulFields.CategoryNav ||
      component === ContentfulFields.MustReadArticles ||
      component === ContentfulFields.Essentials ||
      component === ContentfulFields.Recommendations ||
      component === ContentfulFields.PageComponents ||
      component === ContentfulFields.ListItems
    ) {
      const builtCompoundValue = fields[component].map(({ fields }: any) => fields);
      builtComponentProps[component] = builtCompoundValue;
      continue;
    }

    const currentPageValue = fields[component]?.fields || fields[component];
    builtComponentProps[component] = currentPageValue;
  }

  return builtComponentProps;
}
