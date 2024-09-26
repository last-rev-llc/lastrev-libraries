import * as React from 'react';
import mount from '../../../cypress/mount';
import Media, { MediaProps, File } from './Media';
import { mediaMock, mediaVideoMock, fileMock } from './Media.mock';

let mockedContent: MediaProps = {};
let mockedFile: File = { url: '' };
let mockedVideo: MediaProps = {};

beforeEach(() => {
  mockedContent = { ...mediaMock() };
  mockedFile = { ...fileMock() };
  mockedVideo = { ...mediaVideoMock() };
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

    skip('renders file in a HTML5 video', () => {
      mount(<Media {...mockedVideo} />);
      cy.get('video[data-testid=Media]')
        .should('exist')
        .should('have.prop', 'paused', true)
        .and('have.prop', 'ended', false)
        .then(($video) => {
          $video[0].play();
        });
      cy.get('video').should(($video) => {
        expect($video[0].duration).to.be.gt(0);
      });
      cy.get('video').get('source').should('have.attr', 'src', mockedVideo.file.url);

      cy.get('video').should('have.prop', 'paused', false).and('have.prop', 'ended', false);
      cy.get('video', { timeout: 50000 }).and('have.prop', 'ended', true);

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
