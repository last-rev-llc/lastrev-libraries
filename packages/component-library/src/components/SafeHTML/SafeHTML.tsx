import * as React from 'react';
import { FilterXSS } from 'xss';
import { SafeHTMLProps } from './SafeHTML.types';
// TODO: Move RichText HTML sanitizing to Data Layer

const SafeHTML = ({ children }: SafeHTMLProps) => {
  const bodyXSS = new FilterXSS({
    whiteList: { div: ['id', 'style'] },
    css: false
  });
  return (
    <div
      // We're passing the text through xss which should clean it up for us
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: bodyXSS.process(children) }}
    />
  );
};
export default SafeHTML;
