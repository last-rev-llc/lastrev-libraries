/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import { FilterXSS } from 'xss';
import Box from '@material-ui/core/Box';
import styled from '@material-ui/system/styled';
import Typography from '@material-ui/core/Typography';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { SystemCssProperties } from '@material-ui/system/styleFunctionSx';
import Link from '../Link';

// export const RichTextPropTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   body: PropTypes.object.isRequired,
//   _id: PropTypes.string,
//   _contentTypeId: PropTypes.string,
//   internalTitle: PropTypes.string
// };

// const bodyXSS = new FilterXSS({
//   whiteList: { div: ['id', 'style'] },
//   css: false
//   // TODO figure out why css-filter doesnt work
//   // css: {
//   //   // whitelist: {
//   //   //   'scroll-margin-top': true,
//   //   //   'scrollMarginTop': true
//   //   // },
//   //   onAttr: (name,value,options) => {
//   //     console.log("Validate", {name,value, options})
//   //     return true;
//   //   }
//   // },
// });
// const containsHTML = (children: any) => children?.some((child: any) => child.includes && child?.includes('<'));

export interface RichTextProps {
  id: string;
  styles?: {
    root?: SystemCssProperties;
  };
  body: {
    document: any;
  };
}

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (_: any, children: any) => {
      // const { data, content } = node;
      // if (data.uri.includes('youtube.com/embed')) {
      //   return (
      //     <iframe
      //       title="Embedded"
      //       width="560"
      //       height="315"
      //       src={data.uri}
      //       allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; autoplay"
      //       frameBorder="0"
      //       allowFullScreen
      //     />
      //   );
      // }
      return (
        <Link
          href={_.data.uri}
          // target={!data?.uri.startsWith('/') && !data?.uri.includes('strong365.com') ? '_blank' : false}
          // className={styles.link}
        >
          {children}
        </Link>
      );
    },
    // [BLOCKS.EMBEDDED_ASSET]: (node) => {
    //   const { data = {} } = node;
    //   const { target = {} } = data;
    //   if (target.url)
    //     return (
    //       <div className="mx-auto text-center">
    //         <Image image={target} {...sidekicker('Embedded Asset')} />
    //       </div>
    //     );
    //   return null;
    // },
    // [BLOCKS.EMBEDDED_ENTRY]: (node) => {
    //   const { data = {} } = node;
    //   const { target = {} } = data;
    //   const { _contentTypeId: contentTypeId } = target;
    //   if (contentTypeId === 'moduleIntegration') return <ModuleIntegration {...target} />;
    //   const cardProps = getCardProps({ card: target, lang });
    //   const card = {
    //     ...cardProps,
    //     variant: 'Info'
    //   };
    //   if (card)
    //     return (
    //       <div
    //         className="row col-12 col-md-7 col-lg-6 col-xl-5 p-0 pb-4 pr-md-5 py-md-4 float-md-left mx-auto mx-md-0"
    //         style={{ clear: 'both' }}
    //         {...sidekicker('Embedded Entry')}>
    //         <Card {...card} />
    //       </div>
    //     );
    //   return null;
    // },
    // [INLINES.EMBEDDED_ENTRY]: (node) => {
    //   const { data = {} } = node;
    //   const { target = {} } = data;
    //   const { _contentTypeId: contentTypeId } = target;
    //   if (contentTypeId === 'Link') return <Link {...target} {...sidekicker('Embedded Entry')} />;
    //   return null;
    // },
    [BLOCKS.PARAGRAPH]: (_: any, children: any) => {
      // if (containsHTML(children)) {
      //   return (
      //     <div
      //       // We're passing the text through xss which should clean it up for us
      //       // eslint-disable-next-line react/no-danger
      //       dangerouslySetInnerHTML={{ __html: bodyXSS.process(children) }}
      //     />
      //   );
      // }
      return (
        <>
          <Typography variant="body1">{children}</Typography>
        </>
      );
    },
    [BLOCKS.HEADING_1]: (_: any, children: any) => {
      return (
        <>
          <Typography variant="h1">{children}</Typography>
        </>
      );
    },
    [BLOCKS.HEADING_2]: (_: any, children: any) => {
      return (
        <>
          <Typography variant="h2">{children}</Typography>
        </>
      );
    },
    [BLOCKS.HEADING_3]: (_: any, children: any) => {
      return (
        <>
          <Typography variant="h3">{children}</Typography>
        </>
      );
    },
    [BLOCKS.HEADING_4]: (_: any, children: any) => {
      return (
        <>
          <Typography variant="h4">{children}</Typography>
        </>
      );
    },
    [BLOCKS.HEADING_5]: (_: any, children: any) => {
      return (
        <>
          <Typography variant="h5">{children}</Typography>
        </>
      );
    },
    [BLOCKS.HEADING_6]: (_: any, children: any) => {
      return (
        <>
          <Typography variant="h6">{children}</Typography>
        </>
      );
    }
  }
};

function RichText({ body, styles }: RichTextProps) {
  // const { sidekicker } = sidekickInit({ _id, _contentTypeId, internalTitle });
  console.log('Text', { body });
  return <Root sx={styles?.root}>{documentToReactComponents(body?.document, options)}</Root>;
}

// RichText.propTypes = RichTextPropTypes;
RichText.defaultProps = {};

const Root = styled(Box, {
  name: 'RichText',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

export default RichText;
