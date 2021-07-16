/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import { FilterXSS } from 'xss';
import Typography from '@material-ui/core/Typography';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const RichTextPropTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  document: PropTypes.object.isRequired,
  _id: PropTypes.string,
  _contentTypeId: PropTypes.string,
  internalTitle: PropTypes.string
};

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

interface Props {
  document: any;
}

const options = {
  renderNode: {
    // [INLINES.HYPERLINK]: (node) => {
    //   const { data, content } = node;
    //   if (data.uri.includes('youtube.com/embed')) {
    //     return (
    //       <iframe
    //         title="Embedded"
    //         width="560"
    //         height="315"
    //         src={data.uri}
    //         allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; autoplay"
    //         frameBorder="0"
    //         allowFullScreen
    //       />
    //     );
    //   }

    //   return (
    //     <ElementLink
    //       href={data.uri}
    //       target={!data?.uri.startsWith('/') && !data?.uri.includes('impossiblefoods.com') ? '_blank' : false}
    //       className={styles.link}>
    //       {content[0].value}
    //     </ElementLink>
    //   );
    // },
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
    //   if (contentTypeId === 'elementLink') return <ElementLink {...target} {...sidekicker('Embedded Entry')} />;
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
      return <Typography variant="body1">{children}</Typography>;
    },
    [BLOCKS.HEADING_1]: (_: any, children: any) => {
      return <Typography variant="h1">{children}</Typography>;
    },
    [BLOCKS.HEADING_2]: (_: any, children: any) => {
      return <Typography variant="h2">{children}</Typography>;
    },
    [BLOCKS.HEADING_3]: (_: any, children: any) => {
      return <Typography variant="h3">{children}</Typography>;
    },
    [BLOCKS.HEADING_4]: (_: any, children: any) => {
      return <Typography variant="h4">{children}</Typography>;
    },
    [BLOCKS.HEADING_5]: (_: any, children: any) => {
      return <Typography variant="h5">{children}</Typography>;
    },
    [BLOCKS.HEADING_6]: (_: any, children: any) => {
      return <Typography variant="h6">{children}</Typography>;
    }
  }
};

function RichText({ document }: Props) {
  // const { sidekicker } = sidekickInit({ _id, _contentTypeId, internalTitle });

  return <>{documentToReactComponents(document, options)}</>;
}

RichText.propTypes = RichTextPropTypes;
RichText.defaultProps = {};

export default RichText;
