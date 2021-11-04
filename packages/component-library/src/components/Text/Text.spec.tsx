import * as React from 'react';
import { each } from 'lodash';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import mount from '../../../cypress/mount';
import Text, { TextProps } from './Text';
import mockContent,
{
  dynamicMock,
  valueNode,
  contentNode
} from './Text.mock';

const variantNodeTypeMapper = {
  [BLOCKS.PARAGRAPH]: 'body1',
  [BLOCKS.HEADING_1]: 'h1',
  [BLOCKS.HEADING_2]: 'h2',
  [BLOCKS.HEADING_3]: 'h3',
  [BLOCKS.HEADING_4]: 'h4',
  [BLOCKS.HEADING_5]: 'h5',
  [BLOCKS.HEADING_6]: 'h6'
};

const createTestMock = (nodeType: string) => dynamicMock([ contentNode([ valueNode() ], nodeType) ]);

const testNodeType = (variant: string, nodeType: string) => {
  it(`renders correct text in a ${variant} when nodeType is ${nodeType}`, () => {
    const testNode: TextProps = { ...createTestMock(nodeType) };
    mount(<Text {...testNode} />);
    cy.get(`[data-testid=Text-${variant}]`).each((body, index) => {
      cy.wrap(body).should('have.text', testNode.body.json.content.filter(c => c.nodeType === nodeType)[index].content[0].value)
    });
  });
};

describe('Text', () => {
  context('renders correctly', () => {
    it('renders text with correct information', () => {
      const mockedContent: TextProps = mockContent();
      mount(<Text {...mockedContent} />);
      cy.get('[data-testid=Text-root]').should('have.text', mockedContent.body.json.content.map(c => c.content[0].value).join(''));
      cy.percySnapshot();
    });

    describe('node types', () => {
      context('text node types', () => {
        each(variantNodeTypeMapper, (variant, nodeType) => testNodeType(variant, nodeType));
      });
    });
  });
});
