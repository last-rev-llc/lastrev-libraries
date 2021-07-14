import { lorem, name } from 'faker';
import { capitalize } from 'lodash';
import mockTheme from '../../theme/mock.theme';
import cardMock from '../Card/Card.mock';

export default {
  __typename: 'Section',
  contents: [
    {
      ...cardMock,
      title: null,
      subtitle: null,
      body: null,
      ctas: null,
      variant: 'media',
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'media-outlined',
      outlined: true,
      title: capitalize(lorem.words(2)),
      subtitle: null,
      body: lorem.sentence(),
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      title: name.findName(),
      subtitle: name.jobTitle(),
      body: lorem.sentence(),
      ctas: null,
      variant: 'avatar',
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'avatar-portrait',
      title: name.findName(),
      subtitle: name.jobTitle(),
      body: lorem.sentence(),
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      title: null,
      subtitle: null,
      body: null,
      ctas: null,
      variant: 'avatar-large',
      theme: [mockTheme]
    },
    {
      ...cardMock,
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: null,
      ctas: null,
      variant: 'light-background-border',
      theme: [mockTheme]
    },
    {
      ...cardMock,
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: null,
      ctas: null,
      variant: 'dark-background',
      theme: [mockTheme]
    },
    {
      ...cardMock,
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      variant: 'light-background',
      theme: [mockTheme]
    },
    {
      ...cardMock,
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      borderColor: 'secondary',
      rounded: true,
      theme: [
        {
          components: {
            MuiCard: {
              styleOverrides: {
                root: {
                  'display': 'flex',
                  'flexDirection': 'column',
                  'justifyContent': 'space-around',
                  'alignItems': 'center',
                  'width': '100%',
                  'height': '100%',
                  'maxWidth': 260,
                  'minWidth': 260,
                  'maxHeight': 340,
                  'minHeight': 340,
                  'border': '3px solid #497380',
                  'borderRadius': 20,
                  'boxShadow': 'none',
                  'fontSize': 0,

                  '&:hover': {
                    boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
                  }
                }
              }
            },
            MuiCardContent: {
              styleOverrides: {
                root: {
                  width: '100%',
                  padding: 20,
                  textAlign: 'center'
                }
              }
            },
            MuiTypography: {
              styleOverrides: {
                h4: {
                  paddingBottom: 20,
                  fontSize: 20,
                  fontWeight: 'bold'
                }
              }
            },
            MuiLink: {
              styleOverrides: {
                root: {
                  cursor: 'pointer',
                  fontSize: 16,
                  textDecoration: 'none'
                }
              }
            }
          }
        }
      ]
    },
    {
      ...cardMock,
      // image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [
        {
          components: {
            MuiCard: {
              styleOverrides: {
                root: {
                  'display': 'flex',
                  'flexDirection': 'column',
                  'justifyContent': 'flex-start',
                  'alignItems': 'center',
                  'width': '100%',
                  'height': '100%',
                  'maxWidth': 260,
                  'minWidth': 260,
                  // maxHeight: 340,
                  'minHeight': 340,
                  'border': '3px solid #497380',
                  'borderRadius': 20,
                  'boxShadow': 'none',
                  'fontSize': 0,

                  '&:hover': {
                    boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
                  },

                  '& img': {
                    width: 150,
                    height: 100,
                    marginTop: 20
                  }
                }
              }
            },
            MuiCardContent: {
              styleOverrides: {
                root: {
                  width: '100%',
                  padding: 20,
                  textAlign: 'center'
                }
              }
            },
            MuiTypography: {
              styleOverrides: {
                h4: {
                  paddingBottom: 20,
                  fontSize: 20,
                  fontWeight: 'bold'
                }
              }
            },
            MuiCardActions: {
              styleOverrides: {
                root: {
                  marginTop: 'auto',
                  marginBottom: 20
                }
              }
            },
            MuiLink: {
              styleOverrides: {
                root: {
                  cursor: 'pointer',
                  fontSize: 16,
                  textDecoration: 'none'
                }
              }
            }
          }
        }
      ]
    },
    {
      ...cardMock,
      // image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [
        {
          components: {
            MuiCard: {
              styleOverrides: {
                root: {
                  'display': 'flex',
                  'flexDirection': 'column',
                  'justifyContent': 'flex-start',
                  'alignItems': 'center',
                  'width': '100%',
                  'height': '100%',
                  'maxWidth': 260,
                  'minWidth': 260,
                  'minHeight': 340,
                  'backgroundColor': '#bdefeb',
                  'border': '3px solid #fee501',
                  'borderRadius': 20,
                  'boxShadow': 'none',
                  'fontSize': 0,

                  '&:hover': {
                    boxShadow: '3px 3px 10px 3px rgba(0, 0, 0, 0.2)'
                  },

                  '& img': {
                    width: 150,
                    height: 100,
                    marginTop: 20
                  }
                }
              }
            },
            MuiCardContent: {
              styleOverrides: {
                root: {
                  width: '100%',
                  padding: 20,
                  textAlign: 'center'
                }
              }
            },
            MuiTypography: {
              styleOverrides: {
                h4: {
                  paddingBottom: 20,
                  fontSize: 20,
                  fontWeight: 'bold'
                }
              }
            },
            MuiCardActions: {
              styleOverrides: {
                root: {
                  marginTop: 'auto',
                  marginBottom: 20
                }
              }
            },
            MuiLink: {
              styleOverrides: {
                root: {
                  cursor: 'pointer',
                  fontSize: 16,
                  textDecoration: 'none'
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
