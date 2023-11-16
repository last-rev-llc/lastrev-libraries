import { randomId } from '../utils/randomId';

import { type InlineNavigationProps, InlineNavigationVariants } from './InlineNavigation.types';

const inlinenavigationDefaultMock = (override?: Partial<InlineNavigationProps>): InlineNavigationProps => ({
  id: randomId(),
  __typename: 'InlineNavigation',
  variant: InlineNavigationVariants.default,
  href: `#inlinenavigation-url-here`,
  text: 'InlineNavigation Text',
  ...override
});

export const inlinenavigationBaseMock = (override?: Partial<InlineNavigationProps>): InlineNavigationProps =>
  inlinenavigationDefaultMock(override);

export const inlinenavigationButtonMock = (override?: Partial<InlineNavigationProps>): InlineNavigationProps =>
  inlinenavigationDefaultMock({ text: 'Button Text', variant: InlineNavigationVariants.buttonContained, ...override });

export const iconButtonMock = (override?: Partial<InlineNavigationProps>): InlineNavigationProps =>
  inlinenavigationDefaultMock({
    text: undefined,
    variant: InlineNavigationVariants.buttonContained,
    icon: 'chevron-right',
    iconPosition: 'Right',
    ...override
  });

export const socialInlineNavigationMock = (override?: Partial<InlineNavigationProps>): InlineNavigationProps =>
  inlinenavigationDefaultMock({
    icon: 'facebook',
    variant: InlineNavigationVariants.buttonContained,
    text: undefined,
    ...override
  });

export const inlinenavigationTextMock = (override?: Partial<InlineNavigationProps>): InlineNavigationProps =>
  inlinenavigationDefaultMock({ icon: undefined, variant: InlineNavigationVariants.text, ...override });

export const inlinenavigationSocialMock = (override?: Partial<InlineNavigationProps>): InlineNavigationProps =>
  socialInlineNavigationMock(override);

export default inlinenavigationBaseMock;
