import { linkTextMock } from '../Link/Link.mock';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

export const breadcrumbsBaseMock = (override?: Partial<BreadcrumbsProps>): BreadcrumbsProps => {
  return {
    links: [
      linkTextMock({ text: 'Breadcrumb 1' }),
      linkTextMock({ text: 'Breadcrumb 2' }),
      linkTextMock({ text: 'Breadcrumb 3' })
    ],
    ...override
  };
};

export default breadcrumbsBaseMock;
