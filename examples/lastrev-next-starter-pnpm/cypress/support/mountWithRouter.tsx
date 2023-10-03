import React from 'react';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { mount } from '@cypress/react18';

export const mockRouter = () => ({
  pathname: '',
  route: '',
  query: {},
  asPath: '#tab1',
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
  refresh: cy.spy()
});

const createRouter = (params: Partial<NextRouter>) => ({
  ...mockRouter(),
  ...params
});

export const routerProvider = (children: React.ReactNode, routerOptions: NextRouter = {} as NextRouter) => (
  <RouterContext.Provider value={createRouter(routerOptions)}>{children}</RouterContext.Provider>
);

const mountWithRouter = (children: React.ReactNode, routerOptions: NextRouter = {} as NextRouter) =>
  mount(routerProvider(children, createRouter(routerOptions)));

export default mountWithRouter;
