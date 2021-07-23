import { lorem, name } from 'faker';
import { capitalize } from 'lodash';
import mockTheme from '../../theme/mock.theme';
import cardMock from '../Card/Card.mock';
import imageMock from '../Image/Image.mock';
import richTextMock from '../Text/Text.mock';

export default {
  __typename: 'Section',
  contents: [
    {
      ...cardMock,
      variant: 'media',
      title: null,
      subtitle: null,
      body: null,
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'media',
      outlined: true,
      title: capitalize(lorem.words(2)),
      subtitle: null,
      body: lorem.sentence(),
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'avatar',
      title: name.findName(),
      subtitle: name.jobTitle(),
      body: lorem.sentence(),
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'avatar-large',
      title: null,
      subtitle: null,
      body: null,
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'square',
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: null,
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'standard',
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'standard-rounded',
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [mockTheme]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              backgroundColor: '#eee',
              border: '3px solid grey'
            },
            gridContainer: {
              padding: 10
            },
            gridItem: {
              padding: 10
            }
          }
        }
      }
    }
  ]
};

// richTextMock.document.content.push({
//   nodeType: 'heading-5',
//   data: {},
//   content: [
//     {
//       nodeType: 'text',
//       value: capitalize(lorem.words(5)),
//       marks: [],
//       data: {}
//     }
//   ]
// });

// console.log('richTextMock', richTextMock);

export const singlePanelMock = {
  __typename: 'Section',
  contents: [
    {
      ...richTextMock,
      variant: 'single-panel',
      theme: [mockTheme]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              'display': 'flex',
              'justifyContent': 'center',
              'alignItems': 'center',
              'textAlign': 'center',

              '.MuiTypography-h4': {
                fontSize: 32
              }
            },
            // gridContainer: {
            // },
            gridItem: {
              padding: 40
            }
          }
        }
      }
    }
  ]
};

export const splitPanelMock = {
  __typename: 'Section',
  background: {
    ...imageMock,
    src: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    height: 'auto',
    width: '100%'
  },
  contents: [
    {
      ...richTextMock,
      variant: 'split-panel',
      theme: [mockTheme]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              'display': 'flex',
              'alignItems': 'center',

              '.MuiTypography-h4': {
                fontSize: 32
              }
            },
            sectionWrap: {
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              width: '100%',
              maxWidth: 1280,
              margin: '0 auto'
            },
            imageWrap: {
              width: '100%',
              maxWidth: 500,
              margin: '0 auto',
              fontSize: 0
            },
            gridItem: {
              padding: 40
            }
          }
        }
      }
    }
  ]
};

// Modules from:
// https://lastrev.atlassian.net/browse/STRONG-28

export const module01Mock = {
  __typename: 'Section',
  background: {
    ...imageMock,
    src: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    height: 'auto',
    width: '100%'
  },
  contents: [
    {
      // ...richTextMock,
      __typename: 'Text',
      document: {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'heading-4',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: capitalize(lorem.words(2)),
                marks: [],
                data: {}
              }
            ]
          },
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: lorem.sentences(2),
                marks: [],
                data: {}
              }
            ]
          }
          // {
          //   nodeType: 'hyperlink',
          //   data: {
          //     target: {
          //       sys: {
          //         id: '12345',
          //         type: 'Link',
          //         linkType: 'Entry'
          //       }
          //     }
          //   },
          //   content: [
          //     {
          //       nodeType: 'text',
          //       value: 'Ask the team',
          //       marks: [],
          //     }
          //   ]
          // }
        ]
      },
      theme: [
        {
          components: {
            RichText: {
              styleOverrides: {
                root: {
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  maxWidth: 540
                }
              }
            },
            MuiTypography: {
              styleOverrides: {
                h4: {
                  color: '#005c7b',
                  fontSize: '2.125rem',
                  fontWeight: 'bold'
                },

                body1: {
                  color: '#444',
                  fontSize: '1.125rem'
                }
              }
            }
          }
        }
      ]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              'display': 'flex',
              'flexDirection': 'row-reverse',
              'alignItems': 'center',
              'maxWidth': 1280,
              'margin': '0 auto',

              '> div': {
                width: '100%'
              }
            },
            gridContainer: {
              width: '50%',
              padding: 10
            },
            gridItem: {
              maxWidth: '85%',
              padding: 10
            }
          }
        }
      }
    }
  ]
};

export const module02Mock = {
  __typename: 'Section',
  background: {
    ...imageMock,
    src: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    height: 'auto',
    width: '100%'
  },
  contents: [
    {
      // ...richTextMock,
      __typename: 'Text',
      document: {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'heading-4',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: lorem.sentence(),
                marks: [],
                data: {}
              }
            ]
          }
        ]
      },
      theme: [
        {
          components: {
            MuiTypography: {
              styleOverrides: {
                h4: {
                  maxWidth: 800,
                  margin: '0 auto',
                  color: '#fff',
                  fontSize: '2.125rem',
                  fontWeight: 'bold'
                }
              }
            }
          }
        }
      ]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              'position': 'relative',
              'display': 'flex',
              'flexDirection': 'column-reverse',
              'maxWidth': 1280,
              'margin': '0 auto',
              'textAlign': 'center',

              '> div': {
                width: '100%'
              }
            },
            gridContainer: {
              position: 'absolute',
              height: '100%'
            },
            gridItem: {
              alignSelf: 'center',
              padding: 10,
              margin: '0 auto'
            }
          }
        }
      }
    }
  ]
};

export const module03Mock = {
  __typename: 'Section',
  background: {
    ...imageMock,
    src: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    height: 'auto',
    width: '100%'
  },
  contents: [
    {
      // ...richTextMock,
      __typename: 'Text',
      document: {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'heading-4',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Why it matters.',
                marks: [],
                data: {}
              }
            ]
          },
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'A few reasons:',
                marks: [],
                data: {}
              }
            ]
          },
          {
            nodeType: 'ordered-list',
            data: {},
            content: [
              {
                nodeType: 'list-item',
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Item One',
                        nodeType: 'text'
                      }
                    ],
                    nodeType: 'paragraph'
                  }
                ]
              },
              {
                nodeType: 'list-item',
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Item Two',
                        nodeType: 'text'
                      }
                    ],
                    nodeType: 'paragraph'
                  }
                ]
              },
              {
                nodeType: 'list-item',
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Item Three',
                        nodeType: 'text'
                      }
                    ],
                    nodeType: 'paragraph'
                  }
                ]
              }
            ]
          }
        ]
      },
      theme: [
        {
          components: {
            MuiTypography: {
              styleOverrides: {
                h4: {
                  maxWidth: 800,
                  marginBottom: 30,
                  color: '#fff',
                  fontSize: '2.125rem',
                  lineHeight: '2.3rem',
                  fontWeight: 'bold'
                },
                body1: {
                  maxWidth: 800,
                  color: '#fff',
                  fontSize: '1.125rem'
                }
              }
            }
          }
        }
      ]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              'position': 'relative',
              'display': 'flex',
              'flexDirection': 'column-reverse',
              'maxWidth': 1280,
              'margin': '0 auto',

              '> div': {
                width: '100%'
              },

              'ol': {
                listStyle: 'none',
                counterReset: 'num',
                marginTop: 25,
                padding: 0,
                color: '#fff'
              },

              'li': {
                'counterIncrement': 'num',
                'display': 'flex',
                'marginBottom': 14,
                'color': '#fff',

                '&::before': {
                  content: 'counter(num)',
                  marginRight: 14,
                  color: '#bdefeb',
                  fontSize: '2rem',
                  lineHeight: 1,
                  fontWeight: 'bold'
                }
              }
            },
            gridContainer: {
              position: 'absolute',
              maxWidth: '50%',
              height: '100%',
              padding: '0 40px'
            },
            gridItem: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 10
              // margin: '0 auto',
            }
          }
        }
      }
    }
  ]
};

export const module04Mock = {
  __typename: 'Section',
  background: {
    ...imageMock,
    src: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    height: 'auto',
    width: '100%'
  },
  contents: [
    {
      // ...richTextMock,
      __typename: 'Text',
      document: {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'heading-4',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: lorem.sentence(),
                marks: [],
                data: {}
              }
            ]
          },
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: lorem.paragraph(),
                marks: [],
                data: {}
              }
            ]
          }
        ]
      },
      theme: [
        {
          components: {
            MuiTypography: {
              styleOverrides: {
                h4: {
                  maxWidth: 800,
                  marginBottom: 30,
                  color: '#fff',
                  fontSize: '2.125rem',
                  lineHeight: '2.3rem',
                  fontWeight: 'bold'
                },
                body1: {
                  maxWidth: 800,
                  color: '#fff',
                  fontSize: '1.125rem'
                }
              }
            }
          }
        }
      ]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              'position': 'relative',
              'display': 'flex',
              'flexDirection': 'column-reverse',
              'maxWidth': 1280,
              'margin': '0 auto',

              '> div': {
                width: '100%'
              }
            },
            gridContainer: {
              position: 'absolute',
              flexDirection: 'row-reverse',
              maxWidth: '50%',
              marginLeft: '50%',
              height: '100%',
              padding: '0 40px',
              textAlign: 'right'
            },
            gridItem: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 10
              // margin: '0 auto',
            }
          }
        }
      }
    }
  ]
};

export const module05Mock = {
  __typename: 'Section',
  background: null,
  contents: [
    {
      // ...richTextMock,
      __typename: 'Text',
      document: {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'heading-4',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: lorem.sentence(),
                marks: [],
                data: {}
              }
            ]
          },
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: lorem.paragraph(),
                marks: [],
                data: {}
              }
            ]
          }
        ]
      },
      theme: [
        {
          components: {
            MuiTypography: {
              styleOverrides: {
                h4: {
                  maxWidth: 800,
                  marginBottom: 30,
                  color: '#005c7b',
                  fontSize: '2.125rem',
                  lineHeight: '2.3rem',
                  fontWeight: 'bold'
                },
                body1: {
                  maxWidth: 800,
                  color: '#444',
                  fontSize: '1.125rem'
                }
              }
            }
          }
        }
      ]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              display: 'flex',
              maxWidth: 1280,
              margin: '0 auto'
            },
            gridContainer: {
              justifyContent: 'center',
              height: '100%',
              padding: 40,
              textAlign: 'center'
            },
            gridItem: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 10
            }
          }
        }
      }
    }
  ]
};

export const module06Mock = {
  __typename: 'Section',
  background: {
    ...imageMock,
    src: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    height: 'auto',
    width: '100%'
  },
  contents: [
    {
      // ...richTextMock,
      __typename: 'Text',
      document: {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: lorem.sentence(),
                nodeType: 'text'
              },
              {
                data: {},
                marks: [
                  {
                    type: 'bold'
                  }
                ],
                value: ' not ',
                nodeType: 'text'
              },
              {
                data: {},
                marks: [],
                value: lorem.sentence(),
                nodeType: 'text'
              }
            ]
          }
        ]
      },
      theme: [
        {
          components: {
            MuiTypography: {
              styleOverrides: {
                body1: {
                  maxWidth: 800,
                  color: '#444',
                  fontSize: '1.125rem'
                }
              }
            }
          }
        }
      ]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              'display': 'flex',
              'flexDirection': 'column',
              'maxWidth': 1280,
              'margin': '0 auto',

              'div:first-child': {
                display: 'flex',
                justifyContent: 'center',

                img: {
                  maxWidth: 600
                }
              }
            },
            gridContainer: {
              justifyContent: 'center',
              height: '100%',
              padding: 40,
              backgroundColor: '#bdefeb',
              textAlign: 'center'
            },
            gridItem: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 10
            }
          }
        }
      }
    }
  ]
};

export const module07Mock = {
  __typename: 'Section',
  background: {
    ...imageMock,
    src: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    height: 'auto',
    width: '100%'
  },
  contents: [
    {
      // ...richTextMock,
      __typename: 'Text',
      document: {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: lorem.sentence(),
                nodeType: 'text'
              },
              {
                data: {},
                marks: [
                  {
                    type: 'bold'
                  }
                ],
                value: ' not ',
                nodeType: 'text'
              },
              {
                data: {},
                marks: [],
                value: lorem.sentence(),
                nodeType: 'text'
              }
            ]
          }
        ]
      },
      theme: [
        {
          components: {
            MuiTypography: {
              styleOverrides: {
                body1: {
                  maxWidth: 800,
                  padding: 40,
                  border: '1px solid #fff',
                  color: '#fff',
                  fontSize: '1.125rem'
                }
              }
            }
          }
        }
      ]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 1280,
              margin: '0 auto'
            },
            gridContainer: {
              position: 'absolute',
              justifyContent: 'center',
              height: '100%',
              padding: 40,
              textAlign: 'center'
            },
            gridItem: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 10
            }
          }
        }
      }
    }
  ]
};

export const module08Mock = {
  __typename: 'Section',
  background: null,
  contents: [
    {
      // ...richTextMock,
      __typename: 'Text',
      document: {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'heading-4',
            data: {},
            content: [
              {
                nodeType: 'text',
                value: lorem.sentence(),
                marks: [],
                data: {}
              }
            ]
          },
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: lorem.paragraph(),
                nodeType: 'text'
              }
            ]
          },
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: lorem.paragraph(),
                nodeType: 'text'
              }
            ]
          },
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: '- Glenn Close',
                nodeType: 'text'
              }
            ]
          }
        ]
      },
      theme: [
        {
          components: {
            MuiTypography: {
              styleOverrides: {
                h4: {
                  marginBottom: 35,
                  color: '#fff',
                  fontSize: '2.125rem',
                  fontWeight: 'bold'
                },

                body1: {
                  maxWidth: 800,
                  // padding: 40,
                  // border: '1px solid #fff',
                  color: '#fff',
                  fontSize: '1.125rem'
                }
              }
            }
          }
        }
      ]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 1280,
              margin: '0 auto',
              backgroundColor: '#005c7b'
            },
            gridContainer: {
              // justifyContent: 'center',
              height: '100%',
              padding: 40
              // textAlign: 'center'
            },
            gridItem: {
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'center',
              padding: 10
            }
          }
        }
      }
    }
  ]
};

export const module09Mock = {
  __typename: 'Section',
  background: null,
  contents: [
    {
      // ...richTextMock,
      __typename: 'Text',
      document: {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'heading-5',
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: lorem.sentence(),
                nodeType: 'text'
              }
            ]
          },
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: '- Glenn Close',
                nodeType: 'text'
              }
            ]
          }
        ]
      },
      theme: [
        {
          components: {
            MuiTypography: {
              styleOverrides: {
                h5: {
                  marginBottom: 10,
                  color: '#005c7b',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                },

                body1: {
                  maxWidth: 800,
                  color: '#005c7b',
                  fontSize: '1.5rem'
                }
              }
            }
          }
        }
      ]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              'position': 'relative',
              'display': 'inline-flex',
              'flexDirection': 'column',
              'maxWidth': 1280,
              'margin': '0 auto',
              'backgroundColor': '#ffe600',

              '&:after': {
                content: '""',
                backgroundColor: '#bdefeb',
                height: '100%',
                position: 'absolute',
                top: 20,
                bottom: 0,
                width: 'calc(100% + 20px)',
                zIndex: -1,
                left: -10,
                transform: 'skew(-10deg)'
              }
            },
            gridContainer: {
              // justifyContent: 'center',
              height: '100%',
              padding: 40
              // textAlign: 'center'
            },
            gridItem: {
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'center',
              padding: 10
            }
          }
        }
      }
    }
  ]
};
