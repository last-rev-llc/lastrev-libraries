import { lorem } from 'faker';

import { bodyOnlyMock } from '../Text/Text.mock';
import { linkBaseMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';

import type { SiteMessageProps } from './SiteMessage.types';

const siteMessageDefaultMock = (): SiteMessageProps => {
  return {
    id: lorem.word(),
    __typename: 'SiteMessage',
    icon: mediaBaseImageMock(),
    link: linkBaseMock(),
    text: bodyOnlyMock(),
    sidekickLookup: {} // TODO: Mock
  };
};

export const siteMessageBaseMock = ({ ...override } = {}) => {
  return {
    ...siteMessageDefaultMock(),
    ...override
  };
};

export default siteMessageBaseMock;
