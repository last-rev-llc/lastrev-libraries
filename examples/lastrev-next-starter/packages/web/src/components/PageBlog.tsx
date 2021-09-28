import React from 'react';
import { ContentModule } from '@last-rev/component-library';
import { Blog } from '@lrns/components';
import { Page } from '../../../graphql-sdk/dist';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';

const PageBlog = ({ header, footer, disableBackToTop, ...props }: Page & { __typename: string }) => {
  return (
    <>
      {header ? <ContentModule {...(header as any)} /> : null}
      {/* {hero ? <ContentModule {...(hero as any)} /> : null} */}
      <Blog {...(props as any)} />
      {!disableBackToTop ? <BackToTop /> : null}
      {/* {mailchimpForm ? <ContentModule {...(mailchimpForm as any)} /> : null} */}
      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};
export default PageBlog;
