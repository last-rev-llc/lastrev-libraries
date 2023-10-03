import * as React from 'react';
import { BLOCKS } from '@contentful/rich-text-types';
import mountWithRouter from '../../../../cypress/support/mountWithRouter';
import Text from './RichText';

import mockContent, {
  formattedMock,
  dynamicMock,
  valueNode,
  contentNode,
  embeddedEntryInlineNode,
  embeddedEntryBlockNode,
  embeddedAssetBlockNode,
  hyperlinkNode,
  withLinksMock
} from './RichText.mock';

import { mediaBaseImageMock } from '../Media/Media.mock';
import { linkButtonMock } from '../Link/Link.mock';
import { RichTextProps } from './RichText.types';

const variantNodeTypeMapper = {
  [BLOCKS.PARAGRAPH]: 'body1',
  [BLOCKS.HEADING_1]: 'h1',
  [BLOCKS.HEADING_2]: 'h2',
  [BLOCKS.HEADING_3]: 'h3',
  [BLOCKS.HEADING_4]: 'h4',
  [BLOCKS.HEADING_5]: 'h5',
  [BLOCKS.HEADING_6]: 'h6'
};

const createTextMock = (nodeType: string) => dynamicMock([contentNode([valueNode()], nodeType)]);

const testNodeType = (variant: string, nodeType: string) => {
  it(`renders correct text in a ${variant} when nodeType is ${nodeType}`, () => {
    const testNode: RichTextProps = { ...createTextMock(nodeType) };
    mountWithRouter(<Text {...testNode} />);
    cy.get(`[data-testid=Text-${variant}]`).each((body, index) => {
      cy.wrap(body).should(
        'have.text',
        testNode.body?.json.content.filter((c) => c.nodeType === nodeType)[index].content[0].value
      );
    });
  });
};

describe('Text', () => {
  context('renders correctly', () => {
    it('renders text with correct information', () => {
      const mockedContent: RichTextProps = mockContent();
      mountWithRouter(<Text {...mockedContent} />);
      cy.get('[data-testid=Text-root]').should(
        'have.text',
        mockedContent.json.content.map((c) => c.content[0].value).join('')
      );
      //cy.percySnapshot();
    });

    it('renders formatted text with correct information', () => {
      const mockedContent: RichTextProps = formattedMock();
      mountWithRouter(<Text {...mockedContent} />);

      //cy.percySnapshot();
    });

    describe('node types', () => {
      context('text node types', () => {
        for (const [variant, nodeType] of Object.entries(variantNodeTypeMapper)) {
          testNodeType(variant, nodeType);
        }
      });

      context('other node types', () => {
        it('renders text with embedded inline entry', () => {
          const mockedEntry = linkButtonMock();
          const mockedContent: RichTextProps = dynamicMock(
            [contentNode([embeddedEntryInlineNode(mockedEntry.id || '')])],
            [mockedEntry]
          );
          mountWithRouter(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-embedded-entry-inline]')
            .contains(mockedEntry.text as string | number | RegExp)
            .should('exist');
          //cy.percySnapshot();
        });

        it('renders text with embedded entry block', () => {
          const mockedEntry = linkButtonMock();
          const mockedContent: RichTextProps = dynamicMock(
            [embeddedEntryBlockNode(mockedEntry.id || '')],
            [mockedEntry]
          );
          mountWithRouter(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-embedded-entry-block]')
            .contains(mockedEntry.text as string | number | RegExp)
            .should('exist');
          //cy.percySnapshot();
        });

        it('renders text with embedded asset block', () => {
          const mockedMedia = mediaBaseImageMock();
          const mockedContent: RichTextProps = dynamicMock(
            [embeddedAssetBlockNode(mockedMedia.id || '')],
            [],
            [mockedMedia]
          );
          mountWithRouter(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-embedded-asset-block]')
            .should('exist')
            .and('have.attr', 'src', mockedMedia.file?.url);
          //cy.percySnapshot();
        });

        it('renders text with hyperlink', () => {
          const mockedLink = linkButtonMock();
          const mockedContent: RichTextProps = dynamicMock(
            [hyperlinkNode(mockedLink.text || '', mockedLink.href as string)],
            [],
            [mockedLink]
          );
          mountWithRouter(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-hyperlink]')
            .contains(mockedLink.text as string | number | RegExp)
            .should('exist');
          //cy.percySnapshot();
        });

        it('renders formatted text with hyperlink', () => {
          const mockedContent: RichTextProps = withLinksMock();
          mountWithRouter(<Text {...mockedContent} />);
          //cy.percySnapshot();
        });
      });
    });
  });
});
