import * as React from 'react';
import { FilterXSS } from 'xss';
const bodyXSS = new FilterXSS({
  whiteList: { div: ['id', 'style'] },
  css: false
});

interface Props {
  children: string;
}
const SafeHTML = ({ children }: Props) => (
  <div
    // We're passing the text through xss which should clean it up for us
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: bodyXSS.process(children) }}
  />
);
export default SafeHTML;
