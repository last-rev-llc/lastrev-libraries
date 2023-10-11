import { personMock } from '../RichText/RichText.mock';
import { footerBaseMock } from '../Footer/Footer.mock';
import { headerChildrenNestedMock } from '../Header/Header.mock';
import { breadcrumbsBaseMock } from '../Breadcrumbs/Breadcrumbs.mock';

import { randomId } from '../utils/randomId';

import { type PersonProps, PersonVariants } from './Person.types';

const personDefaultMock = (override?: Partial<PersonProps>): PersonProps => {
  const baseMock: PersonProps = {
    id: randomId(),
    __typename: 'Person',
    variant: PersonVariants.default,
    header: headerChildrenNestedMock(),
    footer: footerBaseMock(),
    name: 'This is the person name',
    jobTitle: 'This is the person job title',
    email: 'person@person.com',
    body: personMock(),
    breadcrumbs: breadcrumbsBaseMock().links,
    jsonLd: {}
  };

  return { ...baseMock, ...override };
};

export const personBaseMock = ({ ...override } = {}) => ({
  ...personDefaultMock(override)
});

export default personBaseMock;
