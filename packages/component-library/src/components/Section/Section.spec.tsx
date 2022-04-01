import * as React from 'react';
import mount from '../../../cypress/mount';
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
      mount(<Section {...mockedSinglePanel} />);
      cy.get('[class$=-Section-root]').should('exist');
      cy.percySnapshot();
    });

    it('renders a section with a grid for each content if it is single panel', () => {
      mount(<Section {...mockedSinglePanel} />);
      cy.get('.MuiGrid-root').should('have.length', mockedSinglePanel.contents.length + 1);
      cy.percySnapshot();
    });

    it('renders a section with a grid for each content if it is split panel', () => {
      mount(<Section {...mockedSplitPanel} />);
      cy.get('.MuiGrid-root').should('have.length', mockedSplitPanel.contents.length + 1);
      cy.percySnapshot();
    });

    it('renders a section with intro text if provided', () => {
      const mockedIntroText = paragraphMock();
      mount(<Section {...mockedSplitPanel} introText={mockedIntroText} />);
      cy.get('[data-testid=Section-introText]')
        .should('exist')
        .and('have.text', mockedIntroText.body.json.content[0].content[0].value);
      cy.percySnapshot();
    });

    it('renders a section with a background image if provided', () => {
      const mockedMedia = mediaMock();
      mount(<Section {...mockedSplitPanel} background={mockedMedia} />);
      cy.get('[data-testid=Media]').should('exist').and('have.attr', 'src', mockedMedia.file.url);
      cy.percySnapshot();
    });
  });
});
