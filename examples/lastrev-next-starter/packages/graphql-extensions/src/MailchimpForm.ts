import gql from 'graphql-tag';
// import { ApolloContext, getLocalizedField } from '@last-rev/graphql-contentful-core';

// const createType = (type: string, content: any) => ({
//   sys: { contentType: { sys: { id: type } } },
//   fields: Object.keys(content).reduce(
//     (accum, key) => ({
//       ...accum,
//       [key]: {
//         'en-US': content[key]
//       }
//     }),
//     {}
//   )
// });

export const mappers = {
  // Hero: {
  //   Section: {
  //     variant: () => 'hero',
  //     contents: (hero: any, _args: any, ctx: ApolloContext) => {
  //       // Extract the hero into the Page contents
  //       const text: any = getLocalizedField(hero.fields, 'text', ctx);
  //       const image: any = getLocalizedField(hero.fields, 'image', ctx);
  //       const actions: any = getLocalizedField(hero.fields, 'actions', ctx);
  //       return [
  //         createType('Section', {
  //           variant: 'column',
  //           contents: [createType('Text', { body: text }), createType('Section', { contents: actions })]
  //         }),
  //         ...image
  //       ];
  //     }
  //   }
  // }
};
export const typeDefs = gql`
  extend type MailchimpForm {
    actions: [Link]
  }
`;

// export const typeMappings = { sectionHero: 'hero', hero: 'section' };
