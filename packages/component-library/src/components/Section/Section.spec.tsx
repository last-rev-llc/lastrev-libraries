import * as React from 'react';
import mount from '../../../cypress/mount';
import Section, { SectionProps } from './Section';
import { singlePanelMock, splitPanelMock } from './Section.mock';
import { richTextMock } from '../Text/Text.mock';
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
      mount(<Section {...mockedSplitPanel} introText={richTextMock} />);
      cy.get('[data-testid=Section-introText]').should('exist').and('have.text', richTextMock.body.json.content[0].content[0].value);
      cy.percySnapshot();
    });

    it('renders a section with a background image if provided', () => {
      mount(<Section {...mockedSplitPanel} background={mediaMock} />);
      cy.get('[data-testid=Media]').should('exist').and('have.attr', 'src', mediaMock.file.url);
      cy.percySnapshot();
    });
  });
});
