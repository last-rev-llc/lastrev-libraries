import React from 'react';
import merge from 'lodash/merge';
import { ThemeProvider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Section from './Section';
import { singlePanelMock, splitPanelMock } from './Section.mock';
import mockTheme from '../../theme/mock.theme';

export default {
  title: '2. Modules / Section',
  component: Section,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}>{storyFn()}</Box>
    )
  ],
  argTypes: {
    contents: { name: 'Contents' },
    background: { name: 'Background' },
    styles: { name: 'Styles' }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => (
  <ThemeProvider theme={merge({}, ...args.theme)}>
    <Section {...args} />
  </ThemeProvider>
);

export const Module01 = Template.bind({});
Module01.args = {
  ...singlePanelMock,
  styles: {
    root: {
      'minHeight': 400,

      // '.MuiTypography-h2': {
      //   color: '#005c7b'
      // },

      // Note: This would be an option in CMS, ie. button-primary
      '.MuiLink-root': {
        display: 'inline-block',
        marginTop: 4,
        padding: '10px 20px',
        backgroundColor: '#fee501',
        textDecoration: 'none'
      }
    },
    gridContainer: {
      maxWidth: 1280
    },
    gridItem: {
      textAlign: 'center'
    }
  }
};

export const Module02 = Template.bind({});
Module02.args = {
  ...splitPanelMock,
  styles: {
    root: {
      '.MuiTypography-h2': {
        color: '#005c7b'
      },

      // Note: This would be an option in CMS, ie. button-primary
      '.MuiLink-root': {
        display: 'inline-block',
        marginTop: 4,
        padding: '10px 20px',
        backgroundColor: '#fee501',
        textDecoration: 'none'
      }
    },
    gridContainer: {
      maxWidth: 1280
    }
  }
};

export const Module03 = Template.bind({});
Module03.args = {
  ...singlePanelMock,
  contents: [
    {
      __typename: 'Text',
      styles: {
        root: {
          textAlign: 'center'
        }
      },
      body: {
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'heading-2',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'We’re on a mission for mental health.',
                  marks: [{ type: 'bold' }],
                  data: {}
                }
              ]
            }
          ]
        }
      }
    }
  ],
  styles: {
    root: {
      minHeight: 400
    }
  },
  variant: 'gradient-background',
  theme: [mockTheme]
};

export const Module04 = Template.bind({});
Module04.args = {
  ...splitPanelMock,
  spacing: 4,
  contents: [
    {
      __typename: 'Text',
      body: {
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'heading-2',
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
        }
      }
    },
    {
      __typename: 'Media',
      file: {
        url: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
      }
    }
  ],
  styles: {
    root: {
      background: 'linear-gradient(50deg, rgba(48,205,194,1) 0%, rgba(0,92,122,1) 100%)',
      color: 'white'
    },
    gridContainer: {
      spacing: 4,
      maxWidth: 'xl'
    },
    gridItem: [
      {
        xs: 6
      }
    ]
  },
  theme: [
    mockTheme,
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              padding: mockTheme.spacing(5),

              // RichText: {
              //   root: {
              //     maxWidth: '80%',
              //     backgroundColor: 'pink'
              //   }
              // },

              h2: {
                color: 'white'
              },

              // TODO: move this styles to RichText when rendering lists
              ol: {
                listStyle: 'none',
                counterReset: 'num',
                marginTop: 25,
                padding: 0
              },

              li: {
                'counterIncrement': 'num',
                'display': 'flex',
                'marginBottom': 14,
                '&::before': {
                  content: 'counter(num) "."',
                  marginRight: 14,
                  color: '#bdefeb',
                  fontSize: '2rem',
                  lineHeight: 1,
                  fontWeight: 'bold'
                }
              }
            }
          }
        }
      }
    }
  ]
};

export const Module05 = Template.bind({});
Module05.args = {
  ...splitPanelMock,
  variant: 'gradient-background',
  spacing: 4,
  styles: {
    // TODO: Figure out a better way to expose section container maxWidths like Container comp
    // gridContainer: {
    //   maxWidth: 1280
    // }
  },
  contents: [
    {
      __typename: 'Media',
      file: {
        url: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
      }
    },
    {
      __typename: 'Text',
      styles: {
        root: {
          textAlign: 'right'
        }
      },
      body: {
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'heading-2',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'We’re on a mission for mental health.',
                  marks: [{ type: 'bold' }],
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
                  value:
                    'Corporis eveniet quod error laborum enim iste labore. Perferendis mollitia sit voluptatibus sit nulla culpa. Quo doloribus et pariatur.',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        }
      }
    }
  ],
  theme: [
    mockTheme,
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              'padding': mockTheme.spacing(5),

              // TODO: Unifiy typography global overrides
              '.MuiTypography-h2': {
                maxWidth: 800,
                color: '#fff'
              },

              '.MuiTypography-body1': {
                maxWidth: 800,
                color: '#fff'
              }
            }
          }
        }
      }
    }
  ]
};

export const Module06 = Template.bind({});
Module06.args = {
  ...splitPanelMock,
  styles: {},
  contents: [
    {
      __typename: 'Text',
      body: {
        json: {
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
                  value: 'Our website is',
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
                  value: 'a crisis resource, nor can we offer medical advice.',
                  nodeType: 'text'
                }
              ]
            }
          ]
        }
      }
    }
  ],
  theme: [
    mockTheme,
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              'minHeight': 200,
              '.MuiTypography-body1': {
                margin: '0 auto'
              }
            },
            gridContainer: {
              justifyContent: 'center',
              backgroundColor: '#bdefeb'
            },
            gridItem: {
              maxWidth: 800,
              padding: 40,
              textAlign: 'center'
            }
          }
        }
      }
    }
  ]
};

export const Module07 = Template.bind({});
Module07.args = {
  ...splitPanelMock,
  variant: 'gradient-background',
  background: null,
  contents: [
    {
      __typename: 'Text',
      body: {
        json: {
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
                  value: 'Our website is',
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
                  value: 'a crisis resource, nor can we offer medical advice.',
                  nodeType: 'text'
                }
              ]
            }
          ]
        }
      }
    }
  ],
  theme: [
    mockTheme,
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              'minHeight': 400,

              '.MuiTypography-body1': {
                maxWidth: 800,
                margin: '0 auto',
                padding: 40,
                border: '1px solid #fff',
                color: '#fff'
              }
            },
            gridContainer: {
              justifyContent: 'center'
            },
            gridItem: {
              maxWidth: 800,
              padding: 40,
              textAlign: 'center'
            }
          }
        }
      }
    }
  ]
};

export const Module08 = Template.bind({});
Module08.args = {
  ...splitPanelMock,
  background: null,
  // spacing: 4,
  // variant: 'column',
  contents: [
    {
      __typename: 'Text',
      body: {
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'heading-2',
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: 'What we do.',
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
                  value:
                    'We strive to improve health outcomes at scale by streamlining the pathway to quality care for young people in the earliest stages of psychosis. Everything we do is rooted in the belief that with the right support at the right time, every young person should be able  to return to living their best life as soon as possible.',
                  nodeType: 'text'
                }
              ]
            }
          ]
        }
      }
    },
    {
      __typename: 'Text',
      body: {
        json: {
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
                  value: '“What mental health needs is more sunlight, more candor, and more unashamed conversation.”',
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
        }
      }
    }
  ],
  styles: {
    root: {
      backgroundColor: '#005c7b'
    },
    gridContainer: {
      flexDirection: 'column',
      maxWidth: 1280,
      padding: '40px 10vw'
    }
  },
  theme: [
    mockTheme,
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              '.MuiTypography-h2': {
                color: '#fff'
              },

              '.MuiTypography-body1': {
                color: '#fff'
              }
            },
            gridItem: {
              width: '100%'
            }
          }
        }
      }
    }
  ]
};

export const Module09 = Template.bind({});
Module09.args = {
  ...splitPanelMock,
  variant: 'highlight',
  background: null,
  contents: [
    {
      __typename: 'Text',
      body: {
        json: {
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
                  value: '“What mental health needs is more sunlight, more candor, and more unashamed conversation.”',
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
        }
      }
    }
  ],
  theme: [mockTheme]
};
