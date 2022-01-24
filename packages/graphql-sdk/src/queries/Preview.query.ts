import gql from 'graphql-tag';
import { ContentTypes_Fragments } from '../fragments/ContentTypes.fragment';

export const Preview_Query = gql`
  ${ContentTypes_Fragments}

  query Preview($id: String!, $locale: String) {
    content(id: $id, locale: $locale, preview: true) {
      __typename
      id
      sidekickLookup
      ...Page_Base
      ...Header_Base
      #...Hero_Base # Conflicts with image array vs single
      ...Section_Base
      ...Collection_Base
      ...Media_Base
      ...Text_Base
      ...Card_Base
      ...Link_Base
      ...ModuleIntegration_Base
      ...Person_Base
      ...Article_Base
    }
  }
`;
