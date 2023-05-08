import React from 'react';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import mount from '../../cypress/mount';

const createRouter = (params: Partial<NextRouter>) => ({
  pathname: '',
  route: '',
  query: {},
  asPath: 'test#tab1',
  isFallback: false,
  basePath: '',
  events: { emit: cy.spy(), off: cy.spy(), on: cy.spy() },
  push: cy.spy(),
  replace: cy.spy(),
  reload: cy.spy(),
  back: cy.spy(),
  prefetch: cy.stub().returns(new Promise<any>((resolve) => resolve(true))),
  isReady: true,
  isPreview: false,
  isLocaleDomain: false,
  beforePopState: cy.spy(),
  forward: cy.spy(),
  refresh: cy.spy(),
  ...params
});

const mountWithRouter = (children: React.ReactNode, routerOptions: NextRouter = {} as NextRouter) => {
  const router = createRouter(routerOptions);

  return mount(<RouterContext.Provider value={router}>{children}</RouterContext.Provider>);
};

export default mountWithRouter;
