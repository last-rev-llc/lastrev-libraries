import React from 'react';

export interface ConditionalWrapperProps {
  condition: boolean;
  children: any;
  wrap: React.FunctionComponent<any>;
}

const ConditionalWrapper = ({ condition, wrap, children }: ConditionalWrapperProps) =>
  condition ? wrap(children) : children;

export default ConditionalWrapper;
