import * as React from 'react';
import mountWithRouter from '../../../cypress/mountWithRouter';
import Section from './Section';
import { SectionProps } from './Section.types';
import { singlePanelMock, splitPanelMock } from './Section.mock';
import { paragraphMock } from '../Text/Text.mock';
import { mediaMock } from '../Media/Media.mock';

let mockedSinglePanel: SectionProps = {};
let mockedSplitPanel: SectionProps = {};

beforeEach(() => {
  mockedSinglePanel = { ...singlePanelMock() };
  mockedSplitPanel = { ...splitPanelMock() };
});

describe('Section', () => {
  context('renders correctly', () => {
    it('renders a section', () => {
      mountWithRouter(<Section {...mockedSinglePanel} />);
      cy.get('[class$=-Section-root]').should('exist');
      cy.percySnapshot();
    });

    it('renders a section with a grid for each content if it is single panel', () => {
      mountWithRouter(<Section {...mockedSinglePanel} />);
      cy.get('.MuiGrid-root').should('have.length', (mockedSinglePanel.contents?.length || 0) + 1);
      cy.percySnapshot();
    });

    it('renders a section with a grid for each content if it is split panel', () => {
      mountWithRouter(<Section {...mockedSplitPanel} />);
      cy.get('.MuiGrid-root').should('have.length', (mockedSplitPanel.contents?.length || 0) + 1);
      cy.percySnapshot();
    });

    it('renders a section with intro text if provided', () => {
      const mockedIntroText = paragraphMock();
      mountWithRouter(<Section {...mockedSplitPanel} introText={mockedIntroText} />);
      cy.get('[data-testid=Section-introText]')
        .should('exist')
        .and('have.text', mockedIntroText.body?.json.content[0].content[0].value);
      cy.percySnapshot();
    });

    it('renders a section with a background image if provided', () => {
      const mockedMedia = mediaMock();
      mountWithRouter(<Section {...mockedSplitPanel} background={mockedMedia} />);
      cy.get('[data-testid=Media]').should('exist').and('have.attr', 'src', mockedMedia.file?.url);
      cy.percySnapshot();
    });
  });
});
