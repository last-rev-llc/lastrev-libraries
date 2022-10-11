/* eslint-disable no-param-reassign */
const { createMediaReference } = require('./createMediaReference');
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

const createGroupNavItemSubNAvigation = async (JOB, groupNavItem) => {
  if (groupNavItem.links)
    return Promise.all(
      groupNavItem.links.map(async (linkNavItem) =>
        createNavigationItemReference(JOB, {
          variant: 'link',
          title: linkNavItem.title,
          summary: linkNavItem.text,
          manual_url: linkNavItem?.href,
          ...(linkNavItem?.icon
            ? {
                icon: await createMediaReference(JOB, { assetURL: linkNavItem.icon })
              }
            : {})
        })
      )
    );

  if (groupNavItem.featured_links) {
    return Promise.all(
      groupNavItem.featured_links.map(async (linkNavItem) =>
        createNavigationItemReference(JOB, {
          title: linkNavItem.button_text,
          variant: linkNavItem.button_type,
          manual_url: linkNavItem?.href,
          summary: linkNavItem.text,
          ...(linkNavItem?.image_2x
            ? {
                icon: await createMediaReference(JOB, { assetURL: linkNavItem.image_2x })
              }
            : {})
        })
      )
    );
  }
  if (groupNavItem.logos_links) {
    return Promise.all(
      groupNavItem.logos_links.map(async (linkNavItem) =>
        createNavigationItemReference(JOB, {
          title: linkNavItem.title,
          manual_url: linkNavItem?.href,
          ...(linkNavItem?.logo
            ? {
                icon: await createMediaReference(JOB, { assetURL: linkNavItem.logo })
              }
            : {})
        })
      )
    );
  }
};

const createGroupNavItem = async (JOB, groupNavItem) => {
  let variant = 'group';
  if (groupNavItem.featured_links) variant = 'featured_links';
  if (groupNavItem.logos_links) variant = 'logos_links';
  const sub_navigation = await createGroupNavItemSubNAvigation(JOB, groupNavItem);
  if (groupNavItem.view_all) {
    sub_navigation.push(
      await createNavigationItemReference(JOB, {
        variant: 'view-all',
        title: groupNavItem.view_all.title,
        manual_url: groupNavItem.view_all?.href
      })
    );
  }
  return createNavigationItemReference(JOB, {
    variant,
    title: groupNavItem.title,
    sub_navigation
  });
};

const site = {
  header: {
    id: 'header',
    type: 'CustomParser',
    customParser: async (rootNavItems, JOB) =>
      Promise.all(
        rootNavItems.map(async (rootNavItem) =>
          createNavigationItemReference(JOB, {
            title: rootNavItem.title,
            variant: 'root',
            sub_navigation: await Promise.all(
              rootNavItem.columns.map(async (colNavItems) =>
                createNavigationItemReference(JOB, {
                  variant: 'column',
                  title: rootNavItem.title,
                  sub_navigation: await Promise.all(
                    colNavItems?.map((groupNavItem) => createGroupNavItem(JOB, groupNavItem))
                  )
                })
              )
            )
          })
        )
      )
  },
  footer: {
    id: 'footer',
    type: 'CustomParser',
    customParser: async (rootNavItems, JOB) =>
      Promise.all(
        rootNavItems.map(async (rootNavItem) =>
          createNavigationItemReference(JOB, {
            title: rootNavItem.title,
            variant: 'root',
            sub_navigation: await Promise.all(
              rootNavItem.links.map(async (rootLinkItem) =>
                createNavigationItemReference(JOB, {
                  variant: 'link',
                  title: rootLinkItem?.title,
                  manual_url: rootLinkItem?.href
                })
              )
            )
          })
        )
      )
  }
};

module.exports = site;
