import React from 'react';
import merge from 'lodash/merge';
import { ThemeProvider } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Section from './Section';
// import ContentModule from '../ContentModule';
import imageMock from '../Image/Image.mock';
import mockContent from './Section.mock';
import {
  singlePanelMock,
  splitPanelMock,
  module05Mock,
  module06Mock,
  module07Mock,
  module08Mock,
  module09Mock,
} from './Section.mock';

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
    styles: { name: 'Styles' },
  },
};

const Template = (args: JSX.IntrinsicAttributes) =>
  <ThemeProvider theme={merge({}, ...args.theme)}>
    <Section {...args} />
  </ThemeProvider>;

export const AllCards = Template.bind({});
AllCards.args = { ...mockContent };

export const Module01 = Template.bind({});
Module01.args = { ...singlePanelMock };

export const Module02 = Template.bind({});
Module02.args = { ...splitPanelMock };

export const Module03 = Template.bind({});
Module03.args = {
  ...singlePanelMock,
  contents: [
    {
      __typename: 'RichText',
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
                value: 'We’re on a mission for mental health.',
                marks: [{ type: 'bold' }],
                data: {}
              }
            ]
          }
        ]
      },
    },
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400,
              background: 'linear-gradient(50deg, rgba(48,205,194,1) 0%, rgba(0,92,122,1) 100%)',
              textAlign: 'center',

              '.MuiTypography-h4': {
                color: 'white',
                fontSize: 32,
              },
            }
          }
        }
      }
    }
  ]
};

export const Module04 = Template.bind({});
Module04.args = {
  ...splitPanelMock,
  background: {
    ...imageMock,
    src: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    height: 'auto',
    width: '100%'
  },
  contents: [
    {
      __typename: 'RichText',
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
    },
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              display: 'flex',
              alignItems: 'center',
              minHeight: 400,
              background: 'linear-gradient(50deg, rgba(48,205,194,1) 0%, rgba(0,92,122,1) 100%)',

              '.MuiTypography-h4': {
                maxWidth: 800,
                marginBottom: 30,
                color: '#fff',
                fontSize: '2.125rem',
                lineHeight: '2.3rem',
                fontWeight: 'bold'
              },

              '.MuiTypography-body1': {
                maxWidth: 800,
                color: '#fff',
                fontSize: '1.125rem',
              },

              ol: {
                listStyle: 'none',
                counterReset: 'num',
                marginTop: 25,
                padding: 0,
                color: '#fff',
              },

              li: {
                counterIncrement: 'num',
                display: 'flex',
                marginBottom: 14,
                color: '#fff',

                '&::before': {
                  content: 'counter(num)',
                  marginRight: 14,
                  color: '#bdefeb',
                  fontSize: '2rem',
                  lineHeight: 1,
                  fontWeight: 'bold'
                }
              },
            },
            sectionWrap: {
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: 1280,
              margin: '0 auto',
            },
            imageWrap: {
              width: '100%',
              maxWidth: 500,
              margin: '0 auto',
              fontSize: 0
            },
            gridItem: {
              padding: 40,
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
  background: {
    ...imageMock,
    src: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    height: 'auto',
    width: '100%'
  },
  contents: [
    {
      __typename: 'RichText',
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
                value: 'Corporis eveniet quod error laborum enim iste labore. Perferendis mollitia sit voluptatibus sit nulla culpa. Quo doloribus et pariatur.',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      },
    },
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              display: 'flex',
              alignItems: 'center',
              minHeight: 400,
              background: 'linear-gradient(50deg, rgba(48,205,194,1) 0%, rgba(0,92,122,1) 100%)',

              '.MuiTypography-h4': {
                maxWidth: 800,
                marginBottom: 30,
                color: '#fff',
                fontSize: '2.125rem',
                lineHeight: '2.3rem',
                fontWeight: 'bold'
              },

              '.MuiTypography-body1': {
                maxWidth: 800,
                color: '#fff',
                fontSize: '1.125rem'
              }
            },
            sectionWrap: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              maxWidth: 1280,
              margin: '0 auto',
            },
            imageWrap: {
              width: '100%',
              maxWidth: 500,
              margin: '0 auto',
              fontSize: 0
            },
            gridItem: {
              padding: 40,
              textAlign: 'right'
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
  background: {
    ...imageMock,
    src: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    height: 'auto',
    width: '100%'
  },
  contents: [
    {
      __typename: 'RichText',
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
      },
    },
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              display: 'flex',
              alignItems: 'center',
              minHeight: 400,

              '.MuiTypography-body1': {
                maxWidth: 800,
                fontSize: '1.125rem',
                margin: '0 auto',
              }
            },
            sectionWrap: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: 1280,
              margin: '0 auto',
            },
            imageWrap: {
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: 500,
              margin: '0 auto -20px',
              fontSize: 0
            },
            gridContainer: {
              justifyContent: 'center',
              height: '100%',
              padding: 40,
              backgroundColor: '#bdefeb',
              textAlign: 'center'
            },
            gridItem: {
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
  background: null,
  contents: [
    {
      __typename: 'RichText',
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
      },
    },
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              display: 'flex',
              alignItems: 'center',
              minHeight: 400,
              background: 'linear-gradient(50deg, rgba(48,205,194,1) 0%, rgba(0,92,122,1) 100%)',

              '.MuiTypography-body1': {
                maxWidth: 800,
                margin: '0 auto',
                padding: 40,
                border: '1px solid #fff',
                color: '#fff',
                fontSize: '1.125rem',
              }
            },
            sectionWrap: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: 1280,
              margin: '0 auto',
            },
            gridContainer: {
              justifyContent: 'center',
              textAlign: 'center'
            },
            gridItem: {
              padding: 40,
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
  contents: [
    {
      __typename: 'RichText',
      document: {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'heading-4',
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
                value: 'We strive to improve health outcomes at scale by streamlining the pathway to quality care for young people in the earliest stages of psychosis. Everything we do is rooted in the belief that with the right support at the right time, every young person should be able  to return to living their best life as soon as possible.',
                nodeType: 'text'
              }
            ]
          },
        ]
      },
    },
    {
      __typename: 'RichText',
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
      },
    },
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              display: 'flex',
              // flexDirection: 'column',
              alignItems: 'center',
              minHeight: 400,
              backgroundColor: '#005c7b',

              '.MuiTypography-h4': {
                marginBottom: 35,
                color: '#fff',
                fontSize: '2.125rem',
                fontWeight: 'bold'
              },

              '.MuiTypography-body1': {
                maxWidth: 800,
                color: '#fff',
                fontSize: '1.125rem',
              }
            },
            sectionWrap: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: 1280,
              margin: '0 auto',
            },
            gridContainer: {
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'left'
            },
            gridItem: {
              padding: 40,
            }
          }
        }
      }
    },
//   {
//       components: {
//         Section: {
//           styleOverrides: {
//             root: {
//               position: 'relative',
//               display: 'inline-flex',
//               flexDirection: 'column',
//               width: '100%',
//               maxWidth: 1280,
//               margin: '0 auto',

//               '.MuiTypography-h5': {
//                 marginBottom: 10,
//                 color: '#005c7b',
//                 fontSize: '1.5rem',
//                 fontWeight: 'bold'
//               },

//               '.MuiTypography-body1': {
//                 maxWidth: 800,
//                 color: '#005c7b',
//                 fontSize: '1.5rem',
//               }
//             },
//             sectionWrap: {
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               width: '100%',
//               maxWidth: 800,
//               margin: '0 auto',
//               textAlign: 'center'
//             },
//             gridContainer: {
//               position: 'relative',
//               height: '100%',
//               padding: 0,

//               '&:after': {
//                 content: '""',
//                 backgroundColor: '#bdefeb',
//                 height: '100%',
//                 position: 'absolute',
//                 top: 20,
//                 bottom: 0,
//                 width: 'calc(100% + 40px)',
//                 zIndex: -1,
//                 left: -20,
//                 transform: 'skew(-10deg)',
//               }
//             },
//             gridItem: {
//               position: 'relative',
//               zIndex: 1,
//               display: 'flex',
//               flexDirection: 'column',
//               padding: 40,

//               '&:after': {
//                 content: '""',
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 bottom: 0,
//                 zIndex: -1,
//                 width: '100%',
//                 height: '100%',
//                 backgroundColor: '#ffe600',
//                 transform: 'skew(-10deg)',
//               }
//             }
//           }
//         }
//       }
//     }
  ]
};

export const Module09 = Template.bind({});
Module09.args = {
  ...splitPanelMock,
  background: null,
  contents: [
    {
      __typename: 'RichText',
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
      },
    },
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              position: 'relative',
              display: 'inline-flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: 1280,
              margin: '0 auto',

              '.MuiTypography-h5': {
                marginBottom: 10,
                color: '#005c7b',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              },

              '.MuiTypography-body1': {
                maxWidth: 800,
                color: '#005c7b',
                fontSize: '1.5rem',
              }
            },
            sectionWrap: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: 800,
              margin: '0 auto',
              textAlign: 'center'
            },
            gridContainer: {
              position: 'relative',
              height: '100%',
              padding: 0,

              '&:after': {
                content: '""',
                backgroundColor: '#bdefeb',
                height: '100%',
                position: 'absolute',
                top: 20,
                bottom: 0,
                width: 'calc(100% + 40px)',
                zIndex: -1,
                left: -20,
                transform: 'skew(-10deg)',
              }
            },
            gridItem: {
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: 40,

              '&:after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: -1,
                width: '100%',
                height: '100%',
                backgroundColor: '#ffe600',
                transform: 'skew(-10deg)',
              }
            }
          }
        }
      }
    }
  ]
};
