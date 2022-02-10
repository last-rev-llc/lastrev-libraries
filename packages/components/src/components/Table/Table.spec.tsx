import * as React from 'react';

import Table, { TableProps } from './Table';
import { tableMock } from './Table.mock';
import mount from '../../../cypress/mount';

describe('Table', () => {
  context('renders correctly', () => {
    it('renders an Table component with all fields provided', () => {
      const mockedContent: TableProps = { ...tableMock };
      mount(<Table {...mockedContent} />);
      cy.get('[data-testid=Table]').should('exist');
    });

    it('renders an Table component with no unrequired fields provided', () => {
      mount(<Table />);
      cy.get('[data-testid=Table]').should('not.exist');
    });
  });
});
