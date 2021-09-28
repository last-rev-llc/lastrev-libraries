export default {
  __typename: 'Header',
  variant: 'outlined',
  logo: {
    __typename: 'Media',
    file: {
      url: './Logo.svg'
    },
    title: 'LRNS'
  },
  logoUrl: '/',
  navigationItems: [
    {
      id: 'collection',
      __typename: 'Collection',
      items: [
        {
          __typename: 'NavigationItem',
          id: 'company',
          text: 'Company',
          subNavigation: [
            {
              id: 'growth',
              __typename: 'NavigationItem',
              text: 'Growth',
              subNavigation: [
                {
                  id: 'app-intelligence',
                  __typename: 'NavigationItem',
                  text: 'app intelligence',
                  summary: 'Thousands of connected apps',
                  href: '/app-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'ad-intelligence',
                  __typename: 'NavigationItem',
                  text: 'ad intelligence',
                  summary: 'Creative library across all sources',
                  href: '/ad-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'usage-intelligence',
                  __typename: 'NavigationItem',
                  text: 'usage intelligence',
                  summary: 'View DAU, Retention and Demographics',
                  href: '/usage-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'consumer-intelligence',
                  __typename: 'NavigationItem',
                  text: 'consumer intelligence',
                  summary: 'See cohort analytics and engagement trends',
                  href: '/consumer-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'analyze',
              __typename: 'NavigationItem',
              text: 'Analyze',
              subNavigation: [
                {
                  id: 'consumer-intelligence',
                  __typename: 'NavigationItem',
                  text: 'consumer intelligence',
                  summary: 'See cohort analytics and engagement trends',
                  href: '/consumer-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'develop',
              __typename: 'NavigationItem',
              text: 'Develop',
              subNavigation: [
                {
                  id: 'app-teardown',
                  __typename: 'NavigationItem',
                  text: 'App teardown',
                  summary: 'Measure SDK performance and usage',
                  href: '/app-teardown',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'api-integration',
                  __typename: 'NavigationItem',
                  text: 'Api Integration',
                  summary: 'Improve the way your application talks',
                  href: '/api-integration',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'custom-alerts',
                  __typename: 'NavigationItem',
                  text: 'Custom Alerts',
                  summary: 'Never miss an important update to you',
                  href: '/custom-alerts',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'discover',
              __typename: 'NavigationItem',
              text: 'Discover',
              subNavigation: [
                {
                  id: 'pathmatics',
                  __typename: 'NavigationItem',
                  text: 'Pathmatics',
                  summary: 'Find who spends what and where',
                  href: '/pathmatics',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'pathmatics-2',
                  __typename: 'NavigationItem',
                  text: 'Pathmatics',
                  summary: 'Find who spends what and where',
                  href: '/pathmatics'
                }
              ]
            }
          ]
        },
        {
          __typename: 'NavigationItem',
          id: 'solutions',
          text: 'Solutions',
          subNavigation: [
            {
              id: 'growth',
              __typename: 'NavigationItem',
              text: 'Growth',
              subNavigation: [
                {
                  id: 'app-intelligence',
                  __typename: 'NavigationItem',
                  text: 'app intelligence',
                  summary: 'Thousands of connected apps',
                  href: '/app-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'ad-intelligence',
                  __typename: 'NavigationItem',
                  text: 'ad intelligence',
                  summary: 'Creative library across all sources',
                  href: '/ad-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'usage-intelligence',
                  __typename: 'NavigationItem',
                  text: 'usage intelligence',
                  summary: 'View DAU, Retention and Demographics',
                  href: '/usage-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'consumer-intelligence',
                  __typename: 'NavigationItem',
                  text: 'consumer intelligence',
                  summary: 'See cohort analytics and engagement trends',
                  href: '/consumer-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'analyze',
              __typename: 'NavigationItem',
              text: 'Analyze',
              subNavigation: [
                {
                  id: 'consumer-intelligence',
                  __typename: 'NavigationItem',
                  text: 'consumer intelligence',
                  summary: 'See cohort analytics and engagement trends',
                  href: '/consumer-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'develop',
              __typename: 'NavigationItem',
              text: 'Develop',
              subNavigation: [
                {
                  id: 'app-teardown',
                  __typename: 'NavigationItem',
                  text: 'App teardown',
                  summary: 'Measure SDK performance and usage',
                  href: '/app-teardown',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'api-integration',
                  __typename: 'NavigationItem',
                  text: 'Api Integration',
                  summary: 'Improve the way your application talks',
                  href: '/api-integration',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'custom-alerts',
                  __typename: 'NavigationItem',
                  text: 'Custom Alerts',
                  summary: 'Never miss an important update to you',
                  href: '/custom-alerts',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'discover',
              __typename: 'NavigationItem',
              text: 'Discover',
              subNavigation: [
                {
                  id: 'pathmatics',
                  __typename: 'NavigationItem',
                  text: 'Pathmatics',
                  summary: 'Find who spends what and where',
                  href: '/pathmatics',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'pathmatics-2',
                  __typename: 'NavigationItem',
                  text: 'Pathmatics',
                  summary: 'Find who spends what and where',
                  href: '/pathmatics'
                }
              ]
            }
          ]
        },
        {
          __typename: 'NavigationItem',
          id: 'products',
          text: 'Products',
          subNavigation: [
            {
              id: 'growth',
              __typename: 'NavigationItem',
              text: 'Growth',
              subNavigation: [
                {
                  id: 'app-intelligence',
                  __typename: 'NavigationItem',
                  text: 'app intelligence',
                  summary: 'Thousands of connected apps',
                  href: '/app-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'ad-intelligence',
                  __typename: 'NavigationItem',
                  text: 'ad intelligence',
                  summary: 'Creative library across all sources',
                  href: '/ad-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'usage-intelligence',
                  __typename: 'NavigationItem',
                  text: 'usage intelligence',
                  summary: 'View DAU, Retention and Demographics',
                  href: '/usage-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'consumer-intelligence',
                  __typename: 'NavigationItem',
                  text: 'consumer intelligence',
                  summary: 'See cohort analytics and engagement trends',
                  href: '/consumer-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'analyze',
              __typename: 'NavigationItem',
              text: 'Analyze',
              subNavigation: [
                {
                  id: 'consumer-intelligence',
                  __typename: 'NavigationItem',
                  text: 'consumer intelligence',
                  summary: 'See cohort analytics and engagement trends',
                  href: '/consumer-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'develop',
              __typename: 'NavigationItem',
              text: 'Develop',
              subNavigation: [
                {
                  id: 'app-teardown',
                  __typename: 'NavigationItem',
                  text: 'App teardown',
                  summary: 'Measure SDK performance and usage',
                  href: '/app-teardown',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'api-integration',
                  __typename: 'NavigationItem',
                  text: 'Api Integration',
                  summary: 'Improve the way your application talks',
                  href: '/api-integration',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'custom-alerts',
                  __typename: 'NavigationItem',
                  text: 'Custom Alerts',
                  summary: 'Never miss an important update to you',
                  href: '/custom-alerts',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'discover',
              __typename: 'NavigationItem',
              text: 'Discover',
              subNavigation: [
                {
                  id: 'pathmatics',
                  __typename: 'NavigationItem',
                  text: 'Pathmatics',
                  summary: 'Find who spends what and where',
                  href: '/pathmatics',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'pathmatics-2',
                  __typename: 'NavigationItem',
                  text: 'Pathmatics',
                  summary: 'Find who spends what and where',
                  href: '/pathmatics'
                }
              ]
            }
          ]
        },
        {
          __typename: 'NavigationItem',
          id: 'pricing',
          text: 'Pricing',
          href: '/pricing'
        },
        {
          __typename: 'NavigationItem',
          id: 'blog',
          text: 'Blog',
          subNavigation: [
            {
              id: 'growth',
              __typename: 'NavigationItem',
              text: 'Growth',
              subNavigation: [
                {
                  id: 'app-intelligence',
                  __typename: 'NavigationItem',
                  text: 'app intelligence',
                  summary: 'Thousands of connected apps',
                  href: '/app-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'ad-intelligence',
                  __typename: 'NavigationItem',
                  text: 'ad intelligence',
                  summary: 'Creative library across all sources',
                  href: '/ad-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'usage-intelligence',
                  __typename: 'NavigationItem',
                  text: 'usage intelligence',
                  summary: 'View DAU, Retention and Demographics',
                  href: '/usage-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'consumer-intelligence',
                  __typename: 'NavigationItem',
                  text: 'consumer intelligence',
                  summary: 'See cohort analytics and engagement trends',
                  href: '/consumer-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'analyze',
              __typename: 'NavigationItem',
              text: 'Analyze',
              subNavigation: [
                {
                  id: 'consumer-intelligence',
                  __typename: 'NavigationItem',
                  text: 'consumer intelligence',
                  summary: 'See cohort analytics and engagement trends',
                  href: '/consumer-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'develop',
              __typename: 'NavigationItem',
              text: 'Develop',
              subNavigation: [
                {
                  id: 'app-teardown',
                  __typename: 'NavigationItem',
                  text: 'App teardown',
                  summary: 'Measure SDK performance and usage',
                  href: '/app-teardown',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'api-integration',
                  __typename: 'NavigationItem',
                  text: 'Api Integration',
                  summary: 'Improve the way your application talks',
                  href: '/api-integration',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'custom-alerts',
                  __typename: 'NavigationItem',
                  text: 'Custom Alerts',
                  summary: 'Never miss an important update to you',
                  href: '/custom-alerts',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'discover',
              __typename: 'NavigationItem',
              text: 'Discover',
              subNavigation: [
                {
                  id: 'pathmatics',
                  __typename: 'NavigationItem',
                  text: 'Pathmatics',
                  summary: 'Find who spends what and where',
                  href: '/pathmatics',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'pathmatics-2',
                  __typename: 'NavigationItem',
                  text: 'Pathmatics',
                  summary: 'Find who spends what and where',
                  href: '/pathmatics'
                }
              ]
            }
          ]
        },
        {
          __typename: 'NavigationItem',
          id: 'resources',
          text: 'Resources',
          subNavigation: [
            {
              id: 'growth',
              __typename: 'NavigationItem',
              text: 'Growth',
              subNavigation: [
                {
                  id: 'app-intelligence',
                  __typename: 'NavigationItem',
                  text: 'app intelligence',
                  summary: 'Thousands of connected apps',
                  href: '/app-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'ad-intelligence',
                  __typename: 'NavigationItem',
                  text: 'ad intelligence',
                  summary: 'Creative library across all sources',
                  href: '/ad-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'usage-intelligence',
                  __typename: 'NavigationItem',
                  text: 'usage intelligence',
                  summary: 'View DAU, Retention and Demographics',
                  href: '/usage-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'consumer-intelligence',
                  __typename: 'NavigationItem',
                  text: 'consumer intelligence',
                  summary: 'See cohort analytics and engagement trends',
                  href: '/consumer-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'analyze',
              __typename: 'NavigationItem',
              text: 'Analyze',
              subNavigation: [
                {
                  id: 'consumer-intelligence',
                  __typename: 'NavigationItem',
                  text: 'consumer intelligence',
                  summary: 'See cohort analytics and engagement trends',
                  href: '/consumer-intelligence',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'develop',
              __typename: 'NavigationItem',
              text: 'Develop',
              subNavigation: [
                {
                  id: 'app-teardown',
                  __typename: 'NavigationItem',
                  text: 'App teardown',
                  summary: 'Measure SDK performance and usage',
                  href: '/app-teardown',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'api-integration',
                  __typename: 'NavigationItem',
                  text: 'Api Integration',
                  summary: 'Improve the way your application talks',
                  href: '/api-integration',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'custom-alerts',
                  __typename: 'NavigationItem',
                  text: 'Custom Alerts',
                  summary: 'Never miss an important update to you',
                  href: '/custom-alerts',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                }
              ]
            },
            {
              id: 'discover',
              __typename: 'NavigationItem',
              text: 'Discover',
              subNavigation: [
                {
                  id: 'pathmatics',
                  __typename: 'NavigationItem',
                  text: 'Pathmatics',
                  summary: 'Find who spends what and where',
                  href: '/pathmatics',
                  media: {
                    __typename: 'Media',
                    file: {
                      url: './rocket.png'
                    },
                    title: 'Some logo'
                  }
                },
                {
                  id: 'pathmatics-2',
                  __typename: 'NavigationItem',
                  text: 'Pathmatics',
                  summary: 'Find who spends what and where',
                  href: '/pathmatics'
                }
              ]
            }
          ]
        },
        {
          __typename: 'Link',
          id: 'log-in',
          variant: 'button-contained',
          href: '/',
          text: 'Log in'
        }
      ]
    }
  ]
};
