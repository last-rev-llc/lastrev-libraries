import { bodyOnlyMock } from '../Text/Text.mock';
import { linkBaseMock } from '../Link/Link.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';

import randomId from '../utils/randomId';

import type { SiteMessageProps } from './SiteMessage.types';

const siteMessageDefaultMock = (): SiteMessageProps => {
  return {
    id: randomId(),
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
