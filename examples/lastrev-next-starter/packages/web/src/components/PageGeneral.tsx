import React from 'react';
import { ContentModule } from '@last-rev/component-library';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';
import { Page } from '../../../graphql-sdk/dist';

const PageGeneral = ({ header, hero, contents, footer, disableBackToTop }: Page & { __typename: string }) => {
  return (
    <>
      {header ? <ContentModule {...(header as any)} /> : null}
      {hero ? <ContentModule {...(hero as any)} /> : null}
      {contents?.map((content: any) => (
        <ContentModule key={content?.id} {...(content as any)} />
      ))}
      {!disableBackToTop ? <BackToTop /> : null}
      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};
export default PageGeneral;
