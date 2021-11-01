import * as React from 'react';
import mount from '../../../cypress/mount';
import Media, { MediaProps, Asset } from './Media';
import { mediaMock, assetMock } from './Media.mock';

let mockedContent: MediaProps = {};
let mockedAsset: Asset = { file: { url: '' } };

beforeEach(() => {
  mockedContent = { ...mediaMock() };
  mockedAsset = { ...assetMock() };
});

describe('Media', () => {
  context('renders correctly', () => {
    it('renders file in a media item when variant is not embed', () => {
      mount(<Media {...mockedContent} />);
      cy.get('[data-testid=Media]').should('exist')
        .and('have.attr', 'src', mockedContent.file.url)
        .and('have.attr', 'alt', mockedContent.title);
      cy.percySnapshot();
    });

    it('renders file in an iframe when variant is embed', () => {
      mount(<Media {...mockedContent} variant='embed' />);
      cy.get('iframe').should('exist').and('have.attr', 'src', mockedContent.file.url);
      cy.percySnapshot();
    });

    it('renders desktop if provided and file is not', () => {
      mount(<Media {...mockedContent} title={undefined} file={undefined} desktop={mockedAsset} />);
      cy.get('[data-testid=Media]').should('exist')
        .and('have.attr', 'src', mockedAsset.file.url)
        .and('have.attr', 'alt', mockedAsset.title);
    });

    it('renders tablet if provided and file and desktop are not', () => {
      mount(<Media {...mockedContent} title={undefined} file={undefined} desktop={undefined} tablet={mockedAsset} />);
      cy.get('[data-testid=Media]').should('exist')
        .and('have.attr', 'src', mockedAsset.file.url)
        .and('have.attr', 'alt', mockedAsset.title);
    });

    it('renders mobile if provided and file, desktop, and tablet are not', () => {
      mount(<Media {...mockedContent} title={undefined} file={undefined} desktop={undefined} tablet={undefined} mobile={mockedAsset} />);
      cy.get('[data-testid=Media]').should('exist')
        .and('have.attr', 'src', mockedAsset.file.url)
        .and('have.attr', 'alt', mockedAsset.title);
    });

    it('renders nothing if file, desktop, tablet, and mobile are not provided', () => {
      mount(<Media {...mockedContent} file={undefined} />);
      cy.get('[data-testid=Media]').should('not.exist');
      cy.get('iframe').should('not.exist');
      cy.percySnapshot();
    });
  });
});
