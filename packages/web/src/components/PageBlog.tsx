import React from 'react';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import Blog from '@ias/components/src/components/Blog/Blog';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';
import { Page } from '../../../graphql-sdk/dist';

const PageBlog = ({ header, footer, disableBackToTop, ...props }: Page & { __typename: string }) => {
  return (
    <>
      {header ? <ContentModule {...(header as any)} /> : null}
      {/* {hero ? <ContentModule {...(hero as any)} /> : null} */}
      <Blog {...(props as any)} />
      {!disableBackToTop ? <BackToTop /> : null}
      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};
export default PageBlog;
