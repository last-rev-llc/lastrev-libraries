import React from 'react';
import { ContentModule } from '@last-rev/component-library';
import { Page } from '../../../graphql-sdk/dist';

const PageGeneral = ({ header, hero, contents, mailchimpForm }: Page & { __typename: string }) => {
  return (
    <>
      {header ? <ContentModule {...(header as any)} /> : null}
      {hero ? <ContentModule {...(hero as any)} /> : null}
      {contents?.map((content) => (
        <ContentModule {...(content as any)} />
      ))}
      {mailchimpForm ? <ContentModule {...(mailchimpForm as any)} /> : null}
    </>
  );
};
export default PageGeneral;
