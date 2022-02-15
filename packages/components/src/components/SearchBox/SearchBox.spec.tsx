import * as React from 'react';
import mount from '../../../cypress/mount';
import SearchBox, { SearchBoxProps } from './SearchBox';
import searchBoxMock from './SearchBox.mock';

describe('SearchBox', () => {
  it('renders a SearchBox', () => {
    const mockedContent: SearchBoxProps = { ...searchBoxMock };
    mount(<SearchBox {...mockedContent} />);
    cy.get('[data-testid=SearchBox]').should('exist');
  });
});
