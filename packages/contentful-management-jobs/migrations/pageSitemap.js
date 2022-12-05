/* eslint-disable no-param-reassign */
const { createEntryReference } = require('./createEntryReference');

const createNavigationItemReference = async (JOB, navigationItem) =>
  createEntryReference(JOB, {
    contentType: 'navigationItem',
    fields: ['internalTitle', 'title', 'summary', 'manual_url', 'icon', 'sub_navigation', 'variant'],
    entry: {
      ...navigationItem,
      internalTitle: `${navigationItem.title} - ${navigationItem.variant}`
    }
  });

const sitemap = {
  blocks_static_links: {
    id: 'blocks.static_links',
    type: 'CustomParser',
    customParser: async (rootNavItems, JOB) =>
      Promise.all(
        rootNavItems.map(async (colNavItems, idx) =>
          createNavigationItemReference(JOB, {
            title: `Static - Root ${idx + 1}`,
            variant: 'root',
            sub_navigation: await Promise.all(
              colNavItems.map(async (colNavItem) =>
                createNavigationItemReference(JOB, {
                  variant: 'column',
                  title: colNavItem?.title,
                  sub_navigation: await Promise.all(
                    colNavItem?.links.map(async (linkNavItem) =>
                      createNavigationItemReference(JOB, {
                        variant: 'link',
                        title: linkNavItem.text,
                        manual_url: linkNavItem?.href
                      })
                    )
                  )
                })
              )
            )
          })
        )
      )
  },
  blocks_integrations_title: {
    id: 'blocks.integrations.title',
    type: 'Symbol'
  },
  blocks_integrations_integrations_list: {
    id: 'blocks.integrations.integrations_list',
    type: 'CustomParser',
    customParser: async (rootNavItems, JOB) =>
      Promise.all(
        rootNavItems.map(async (colNavItems, idx) =>
          createNavigationItemReference(JOB, {
            title: `Integrations - Root ${idx + 1}`,
            variant: 'root',
            sub_navigation: await Promise.all(
              colNavItems.map(async (colNavItem, j) =>
                createNavigationItemReference(JOB, {
                  variant: 'column',
                  title: `Integrations - Col ${j + 1}`,
                  sub_navigation: await Promise.all(
                    colNavItem?.links.map(async (linkNavItem) =>
                      createNavigationItemReference(JOB, {
                        variant: 'link',
                        title: linkNavItem.text,
                        manual_url: linkNavItem?.href
                      })
                    )
                  )
                })
              )
            )
          })
        )
      )
  },
  blocks_connector_title: {
    id: 'blocks.connector.title',
    type: 'Symbol'
  },
  blocks_connector_links: {
    id: 'blocks.connector.links',
    type: 'CustomParser',
    customParser: async (rootNavItems, JOB) =>
      Promise.all(
        rootNavItems.map(async (colNavItem, j) =>
          createNavigationItemReference(JOB, {
            variant: 'column',
            title: `Connector - Col ${j + 1}`,
            sub_navigation: await Promise.all(
              colNavItem?.links.map(async (linkNavItem) =>
                createNavigationItemReference(JOB, {
                  variant: 'link',
                  title: linkNavItem.text,
                  manual_url: linkNavItem?.href
                })
              )
            )
          })
        )
      )
  },
  blocks_product_hub_title: {
    id: 'blocks.product_hub.title',
    type: 'Symbol'
  },
  blocks_product_hub_links: {
    id: 'blocks.product_hub.links',
    type: 'CustomParser',
    customParser: async (rootNavItems, JOB) =>
      Promise.all(
        rootNavItems.map(async (colNavItem, j) =>
          createNavigationItemReference(JOB, {
            variant: 'column',
            title: `Product_hub - Col ${j + 1}`,
            sub_navigation: await Promise.all(
              colNavItem?.links.map(async (linkNavItem) =>
                createNavigationItemReference(JOB, {
                  variant: 'link',
                  title: linkNavItem.text,
                  manual_url: linkNavItem?.href
                })
              )
            )
          })
        )
      )
  }
};

module.exports = sitemap;
