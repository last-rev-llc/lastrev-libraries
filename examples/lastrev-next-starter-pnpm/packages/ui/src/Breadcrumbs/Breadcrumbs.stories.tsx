import Breadcrumbs from './Breadcrumbs';

import { breadcrumbsBaseMock } from './Breadcrumbs.mock';

export default {
  title: 'Elements/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {}
};

export const Default = { args: { ...breadcrumbsBaseMock() } };
