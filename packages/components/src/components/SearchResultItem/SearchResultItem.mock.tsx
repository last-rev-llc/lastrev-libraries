export interface HighlightProps {
  hit?: any;
  attribute?: string;
}

export const Highlight = ({ hit, attribute }: HighlightProps) => {
  if (hit && attribute && hit[attribute]) return hit[attribute];
  else return null;
};

export default {
  hit: {
    title: 'IAS Acquires AI Company, Context, to Further Enhance Image and Video Classification',
    section: 'About Integral Ad Science',
    permalink: 'https://integralads.com/news/ias-acquires-context/#About Integral Ad Science',
    categories: ['Advertiser + Agency Solutions', 'Getting Started'],
    _tags: ['Advertiser + Agency Solutions', 'Getting Started'],
    categoriesLinks: ['https://ias.com/Advertiser_Agency_Solutions', 'https://ias.com/Getting_Started'],
    content:
      '“We are delighted to join with IAS to advance their market leading contextual targeting and classification capabilities,” said Jack Habra, CEO of Context. “Our technology is designed to deliver critical insights to help marketers optimize their campaigns, and we look forward to realizing Context’s full potential as part of IAS.”',
    objectID: 'c7c636729ee6a_dashboard_generated_id'
  },
  components: {
    Highlight
  }
};
