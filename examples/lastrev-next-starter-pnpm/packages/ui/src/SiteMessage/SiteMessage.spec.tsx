import * as React from 'react';
import { mount } from '@cypress/react18';

import SiteMessage from './SiteMessage';

import siteMessageBaseMock from './SiteMessage.mock';

import { SiteMessageProps } from './SiteMessage.types';

let mockedContent: SiteMessageProps = { sidekickLookup: {} };

beforeEach(() => {
  mockedContent = { ...siteMessageBaseMock() };
});

// const getSumReducer = (previous: number, current: number): number => previous + current;

describe.skip('SiteMessage', () => {
  context('renders correctly', () => {
    it('renders a siteMessage', () => {
      mount(<SiteMessage {...mockedContent} />);

      //cy.percySnapshot();
    });
  });
});
