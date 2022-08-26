import React from 'react';
import { SWRConfig } from 'swr';
import mount from './mount';

const swrMount = (component, options) => {
  return mount(<SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>{component}</SWRConfig>, options);
};

export default swrMount;
