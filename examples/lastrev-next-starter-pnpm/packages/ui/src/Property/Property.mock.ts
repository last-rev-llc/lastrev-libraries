import { propertyMock } from '../RichText/RichText.mock';
import { footerBaseMock } from '../Footer/Footer.mock';
import { headerChildrenNestedMock } from '../Header/Header.mock';
import { breadcrumbsBaseMock } from '../Breadcrumbs/Breadcrumbs.mock';

import { randomId } from '../utils/randomId';

import { type PropertyProps, PropertyVariants } from './Property.types';

const propertyDefaultMock = (override?: Partial<PropertyProps>): PropertyProps => {
  const baseMock: PropertyProps = {
    id: randomId(),
    __typename: 'PageProperty',
    variant: PropertyVariants.default,
    header: headerChildrenNestedMock(),
    footer: footerBaseMock(),
    name: 'This is the property name',
    jobTitle: 'This is the property job title',
    email: 'property@property.com',
    body: propertyMock(),
    breadcrumbs: breadcrumbsBaseMock().links,
    jsonLd: {}
  };

  return { ...baseMock, ...override };
};

export const propertyBaseMock = ({ ...override } = {}) => ({
  ...propertyDefaultMock(override)
});

export default propertyBaseMock;
