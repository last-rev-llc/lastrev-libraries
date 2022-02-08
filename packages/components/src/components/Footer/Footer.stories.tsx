import React from 'react';
import Footer, {FooterMock} from './Footer';

export default {
  title: 'Global / Footer',
  component: Footer
};

const Template = (args: JSX.IntrinsicAttributes) => <Footer sidekickLookup={{}} {...args} />;
export const Default = Template.bind({});
Default.args = { ...FooterMock() };
