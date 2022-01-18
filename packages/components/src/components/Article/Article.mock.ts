import mockFile from '../../stories/mocks/file.mock';

export const articleMock = {
  __typename: 'Article',
  id: "4GEjeEoTyo0xGNVRgmGlRJ",
  sidekickLookup: {
    contentId: "4GEjeEoTyo0xGNVRgmGlRJ",
    contentTypeId: "article"
  },
  title: "Proprietary Partner Integration Activation - All Partners [sample from site with bullets] [LAST REV DEMO]",
  slug: "proprietary-partner-integration-activation-all-partners-sample-from-site",
  summary: "placeholder text for summary\n[internal note] this article is from https://support.integralads.com/s/article/Social-Intergration",
  seo: undefined,
  featuredMedia: {
    __typename: 'Media',
    file: mockFile({ height: 1000, width: 1800, text: 'Featured Media'}),
    title: 'Featured Media',
    description: 'Featured Media'
  },
  pubDate: "2021-11-22",
  disableBackToTop: false,
  body: {
    id: undefined,
    __typename: "RichText",
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: "Facebook Process (Display & Video)",
              nodeType: "text"
            }
          ],
          nodeType: "heading-2"
        },
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Add IAS partner ID 1071853839554701 into FB Business Manager (screenshots below)",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Provide IAS with campaign names and ID’s you want to measure",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Once campaign is live and IAS is tracking, we will map in our system to enable reporting",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            }
          ],
          nodeType: "ordered-list"
        },
        {
          data: {
            target: {
              sys: {
                id: "6RNrkQImTH2iaDJc2dgKIz",
                type: "Link",
                linkType: "Entry"
              }
            }
          },
          content: [],
          nodeType: "embedded-entry-block"
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: "",
              nodeType: "text"
            }
          ],
          nodeType: "paragraph"
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: "YouTube Process (Video)",
              nodeType: "text"
            }
          ],
          nodeType: "heading-2"
        },
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Ask your Google rep to enable IAS measurement",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "You will be required to provide your IAS Client ID, also known as your Team ID which is accessible in IAS Signal (at the top right next to your team name).",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Depending on how you purchase the inventory you provide IAS provide the necessary IDs (and campaign names) needed for mapping",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            }
          ],
          nodeType: "ordered-list"
        },
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "YouTube Auction campaigns on DV360 Line Item ID",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "YouTube Reserve campaigns via direct Ad Manager: Ad Manager Order ID",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "YouTube Reserve campaigns via DV360: DV360 Insertion Order ID",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            }
          ],
          nodeType: "unordered-list"
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: "       4. Once campaign is live and IAS is tracking, we will map in our system to enable reporting​*",
              nodeType: "text"
            }
          ],
          nodeType: "paragraph"
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: "*DV360 formally known as DBM, Ad Manager formally known as DFP. Please note Viewability data will be surfaced 24 hours from when campaigns have been mapped on IAS side, whereas Brand Safety data will be surfaced within 48 hours.\nDetailed activation guide with FAQs here:\n",
              nodeType: "text"
            },
            {
              data: {
                uri: "https://support.integralads.com/s/article/YouTube-Activation-Process-and-FAQ"
              },
              content: [
                {
                  data: {},
                  marks: [],
                  value: "https://support.integralads.com/s/article/YouTube-Activation-Process-and-FAQ",
                  nodeType: "text"
                }
              ],
              nodeType: "hyperlink"
            },
            {
              data: {},
              marks: [],
              value: "\n",
              nodeType: "text"
            }
          ],
          nodeType: "paragraph"
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: "Yahoo Gemini Process",
              nodeType: "text"
            }
          ],
          nodeType: "heading-2"
        },
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Create campaign using IAS ",
                      nodeType: "text"
                    },
                    {
                      data: {
                        uri: "https://reporting.integralplatform.com/campaign-setup/"
                      },
                      content: [
                        {
                          data: {},
                          marks: [],
                          value: "Campaign Management Platform",
                          nodeType: "text"
                        }
                      ],
                      nodeType: "hyperlink"
                    },
                    {
                      data: {},
                      marks: [],
                      value: " (CMP) ensuring to add “Yahoo - Partner Measurement” as the media partner.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Ask Yahoo account manager (Yahoo AM) to enable IAS integration.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Yahoo AM to email v​iewability@yahoo-inc.com ​and cc:​ holway@yahoo-inc.com",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "(Product lead @ Y!) to ask for permission to have the desired Gemini campaign measured by IAS.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "After permission is granted, Yahoo AM will add a new row in the shared IAS/Yahoo tracking doc to include advertiser/agency information.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Yahoo AM will email IAS/Yahoo Gemini alias confirming the information entered in the above step.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Yahoo Gemini team will adjust campaign settings to forward data to IAS (24hr SLA). Yahoo Gemini team will confirm with IAS mapping is configured in IAS Signal advertiser UI.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Yahoo Gemini team will confirm with both the Yahoo AM and IAS account team that the campaign is ready to be set live.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Once campaign is live and IAS is tracking, we will map in our system to enable reporting.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            }
          ],
          nodeType: "ordered-list"
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: "\nPinterest Process",
              nodeType: "text"
            }
          ],
          nodeType: "heading-2"
        },
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Create campaign using ​IAS (​CMP) ensuring to add “Pinterest - Partner Measurement” as the media partner.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Confirm with IAS and Pinterest that you would like to utilize the integration for this campaign.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "IAS will provide 1x1 IMG pixel within a text file with the corresponding Pinterest campaign name",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Please note one-to-one mapping is the preferred campaign set up when using the IAS + Pinterest integration.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Pinterest representative should implement this on the Pinterest platform.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Once implemented, reporting will pull through to IAS within 48 hours.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            }
          ],
          nodeType: "ordered-list"
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: "Snapchat Process",
              nodeType: "text"
            }
          ],
          nodeType: "heading-2"
        },
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Create campaign using IAS​ (CMP) ensuring to add “Snapchat - Partner Measurement” as the media partner",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Confirm with IAS that you would like to utilize the Snapchat integration",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "IAS will provide 1x1 pixel",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "*Please note that there only needs to be one 1x1 pixel PER campaign",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Client to implement the pixel across each SnapAd for the campaign in Snapchat’s Ad Manager OR send the pixel to their Snapchat representative for implementation if they are a managed service account.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Once implemented, reporting will pull through to IAS the next day.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            }
          ],
          nodeType: "ordered-list"
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: "Spotify Process",
              nodeType: "text"
            }
          ],
          nodeType: "heading-2"
        },
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "1. Create campaign using IAS (CMP) ensuring to add “Spotify - Partner Measurement” as the media partner",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Confirm with IAS that you would like to utilize the Spotify integration",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "IAS will provide 1x1 pixel",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "*​Please note that there only needs to be one 1x1 pixel PER campaign",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Client to implement the pixel into Spotify platform OR ​send to Spotify representative to implement",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Once implemented, reporting will pull through to IAS the next day.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            }
          ],
          nodeType: "ordered-list"
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: "Twitter Process",
              nodeType: "text"
            }
          ],
          nodeType: "heading-2"
        },
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Create campaign using IAS​​ (CMP) ensuring to add “Twitter - Partner Measurement” as the media partner",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Ask Twitter rep to enable IAS measurement",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Provide IAS with campaign names and IDs",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: "Once the campaign is live and IAS is tracking, we will map in our system to enable reporting.",
                      nodeType: "text"
                    }
                  ],
                  nodeType: "paragraph"
                }
              ],
              nodeType: "list-item"
            }
          ],
          nodeType: "ordered-list"
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: "",
              nodeType: "text"
            }
          ],
          nodeType: "paragraph"
        }
      ],
      nodeType: "document"
    },
    links: {
      entries: [
        {
          __typename: "Media",
          id: "6RNrkQImTH2iaDJc2dgKIz"
        }
      ],
      assets: []
    }
  },
  categories: [
    {
      id: "7BGAr7bwd9bQRohr988X7E",
      __typename: "Link",
      sidekickLookup: {
        href: {
          contentId: "7BGAr7bwd9bQRohr988X7E",
          contentTypeId: "categoryArticle",
          fieldName: "slug"
        },
        text: {
          contentId: "7BGAr7bwd9bQRohr988X7E",
          contentTypeId: "categoryArticle",
          fieldName: "title"
        },
        contentId: "7BGAr7bwd9bQRohr988X7E",
        contentTypeId: "categoryArticle"
      },
      text: "Tag Manager/Tagging Integrations",
      href: "integral-signal-help-and-tagging-greater-than-tag-manager-tagging",
      variant: undefined,
      icon: undefined,
      iconPosition: undefined
    }
  ],
  relatedLinks: [
    {
      id: "4GEjeEoTyo0xGNVRgmGlRJ",
      __typename: "Link",
      sidekickLookup: {
        text: {
          contentId: "4GEjeEoTyo0xGNVRgmGlRJ",
          contentTypeId: "article",
          fieldName: "title"
        },
        contentId: "4GEjeEoTyo0xGNVRgmGlRJ",
        contentTypeId: "article"
      },
      text: "Proprietary Partner Integration Activation - All Partners [sample from site with bullets] [LAST REV DEMO]",
      href: "slug",
      variant: undefined,
      icon: undefined,
      iconPosition: undefined
    },
    {
      id: "6wqLGnTcK9a4Vh5BRmt1wP",
      __typename: "Link",
      sidekickLookup: {
        text: {
          contentId: "6wqLGnTcK9a4Vh5BRmt1wP",
          contentTypeId: "article",
          fieldName: "title"
        },
        contentId: "6wqLGnTcK9a4Vh5BRmt1wP",
        contentTypeId: "article"
      },
      text: "Article with 2 column grid for image and table",
      href: "slug",
      variant: undefined,
      icon: undefined,
      iconPosition: undefined
    }
  ]
};
