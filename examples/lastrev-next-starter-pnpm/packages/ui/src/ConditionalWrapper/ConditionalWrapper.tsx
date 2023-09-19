import React from 'react';

export interface ConditionalWrapperProps {
  condition: boolean;
  children: any;
  wrapper: React.FunctionComponent<any>;
}

const ConditionalWrapper = ({ condition, wrapper, children }: ConditionalWrapperProps) =>
  condition ? wrapper(children) : children;

export default ConditionalWrapper;
