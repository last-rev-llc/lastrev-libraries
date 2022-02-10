import * as React from 'react';
import mount from '../../../cypress/mount';
import Media, { MediaProps, File } from './Media';
import { mediaMock, fileMock } from './Media.mock';

let mockedContent: MediaProps = {};
let mockedFile: File = { url: '' };

beforeEach(() => {
  mockedContent = { ...mediaMock() };
  mockedFile = { ...fileMock() };
});

describe('Media', () => {
  context('renders correctly', () => {
    it('renders file in a media item when variant is not embed', () => {
      mount(<Media {...mockedContent} />);
      cy.get('[data-testid=Media]')
        .should('exist')
        .and('have.attr', 'src', mockedContent.file.url)
        .and('have.attr', 'alt', mockedContent.title);
      cy.percySnapshot();
    });

    // TODO - fix this test, makes everything fail
    // it('renders file in an iframe when variant is embed', () => {
    //   mount(<Media {...mockedContent} variant="embed" />);
    //   cy.get('iframe').should('exist').and('have.attr', 'src', mockedContent.file.url);
    //   cy.percySnapshot();
    // });

    it('renders nothing if file is not provided', () => {
      mount(<Media {...mockedContent} file={undefined} />);
      cy.get('[data-testid=Media]').should('not.exist');
      cy.get('iframe').should('not.exist');
      cy.percySnapshot();
    });
  });
});
