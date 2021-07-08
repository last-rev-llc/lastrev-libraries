import { lorem, name } from 'faker';
import { capitalize } from 'lodash';
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
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                maxWidth: 400,
                minWidth: 400,
                borderRadius: 0,
                boxShadow: 'none',
                fontSize: 0,
              }
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      title: capitalize(lorem.words(2)),
      subtitle: null,
      body: lorem.sentence(),
      ctas: null,
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                position: 'relative',
                maxWidth: 400,
                minWidth: 400,
                borderRadius: 0,
                border: '2px solid #fee501',
                boxShadow: 'none',
                fontSize: 0,

                '& img': {
                  opacity: 0.5
                }
              }
            }
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 1,
                padding: '0 !important',
                textAlign: 'center',
                transform: 'translate(-50%, -50%)'
              },
            }
          },
          MuiTypography: {
            styleOverrides: {
              h4: {
                fontSize: 26,
                fontWeight: 'bold',
                color: 'black'
              },
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      title: name.findName(),
      subtitle: name.jobTitle(),
      body: lorem.sentence(),
      ctas: null,
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                maxWidth: 540,
                minWidth: 540,
                padding: 20,
                borderRadius: 0,
                boxShadow: 'none',
                fontSize: 0,

                '& img': {
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  border: '2px solid #fee501',
                  objectFit: 'cover'
                }
              },
            }
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                paddingLeft: 40
              },
            }
          },
          MuiTypography: {
            styleOverrides: {
              h4: {
                fontSize: 24,
                color: 'black'
              },
              h5: {
                paddingBottom: 12,
                fontSize: 18,
                color: 'black'
              },
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      title: name.findName(),
      subtitle: name.jobTitle(),
      body: lorem.sentence(),
      ctas: null,
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                height: '100%',
                maxWidth: 320,
                minWidth: 320,
                padding: 20,
                borderRadius: 0,
                boxShadow: 'none',
                fontSize: 0,

                '& img': {
                  width: 150,
                  height: 150,
                  margin: '0 auto 20px',
                  borderRadius: '50%',
                  border: '2px solid #fee501',
                  objectFit: 'cover'
                }
              },
            }
          },
          MuiTypography: {
            styleOverrides: {
              h4: {
                fontSize: 24,
                color: 'black'
              },
              h5: {
                paddingBottom: 12,
                fontSize: 18,
                color: 'black'
              },
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      title: null,
      subtitle: null,
      body: null,
      ctas: null,
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 300,
                height: 300,
                // maxWidth: 300,
                minWidth: 300,
                padding: 20,
                borderRadius: 0,
                boxShadow: 'none',
                fontSize: 0,

                '& img': {
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '2px solid #fee501',
                  objectFit: 'cover'
                }
              },
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: null,
      ctas: null,
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                width: '100%',
                height: '100%',
                maxWidth: 300,
                minWidth: 300,
                maxHeight: 300,
                borderRadius: 0,
                boxShadow: 'none',
                fontSize: 0,
              }
            }
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: '0 30px !important',
                backgroundColor: '#bdefeb',
                border: '2px solid #fee501',
                textAlign: 'center',
              },
            }
          },
          MuiTypography: {
            styleOverrides: {
              h4: {
                fontSize: 20,
                fontWeight: 'bold'
              },
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: null,
      ctas: null,
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                width: '100%',
                height: '100%',
                maxWidth: 300,
                minWidth: 300,
                maxHeight: 300,
                borderRadius: 0,
                boxShadow: 'none',
                fontSize: 0,
              }
            }
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: '0 30px !important',
                backgroundColor: '#005c7a',
                textAlign: 'center',
              },
            }
          },
          MuiTypography: {
            styleOverrides: {
              h4: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold'
              },
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                maxWidth: 350,
                minWidth: 350,
                maxHeight: 320,
                minHeight: 320,
                borderRadius: 0,
                boxShadow: 'none',
                fontSize: 0,
              }
            }
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                width: '100%',
                padding: 20,
                textAlign: 'center',
              },
            }
          },
          MuiTypography: {
            styleOverrides: {
              h4: {
                paddingBottom: 20,
                fontSize: 22,
                fontWeight: 'bold'
              },
            }
          },
          MuiCardActions: {
            styleOverrides: {
              root: {
                fontSize: 18,
              },
            }
          },
          MuiLink: {
            styleOverrides: {
              root: {
                padding: '10px 20px',
                cursor: 'pointer',
                backgroundColor: '#fee501',
                color: 'black',
                textDecoration: 'none'
              },
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                maxWidth: 240,
                minWidth: 240,
                maxHeight: 260,
                minHeight: 260,
                backgroundColor: '#bdefeb',
                borderRadius: 0,
                boxShadow: 'none',
                fontSize: 0,
              }
            }
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                width: '100%',
                padding: 20,
                textAlign: 'center',
              },
            }
          },
          MuiTypography: {
            styleOverrides: {
              h4: {
                paddingBottom: 20,
                fontSize: 20,
                fontWeight: 'bold'
              },
            }
          },
          MuiCardActions: {
            styleOverrides: {
              root: {
                fontSize: 16,
              },
            }
          },
          MuiLink: {
            styleOverrides: {
              root: {
                padding: '10px 20px',
                cursor: 'pointer',
                backgroundColor: '#fee501',
                color: 'black',
                textDecoration: 'none'
              },
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                maxWidth: 260,
                minWidth: 260,
                maxHeight: 340,
                minHeight: 340,
                border: '3px solid #497380',
                borderRadius: 20,
                boxShadow: 'none',
                fontSize: 0,
              }
            }
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                width: '100%',
                padding: 20,
                textAlign: 'center',
              },
            }
          },
          MuiTypography: {
            styleOverrides: {
              h4: {
                paddingBottom: 20,
                fontSize: 20,
                fontWeight: 'bold'
              },
            }
          },
          MuiLink: {
            styleOverrides: {
              root: {
                cursor: 'pointer',
                fontSize: 16,
                textDecoration: 'none'
              },
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      // image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                maxWidth: 260,
                minWidth: 260,
                // maxHeight: 340,
                minHeight: 340,
                border: '3px solid #497380',
                borderRadius: 20,
                boxShadow: 'none',
                fontSize: 0,

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
                textAlign: 'center',
              },
            }
          },
          MuiTypography: {
            styleOverrides: {
              h4: {
                paddingBottom: 20,
                fontSize: 20,
                fontWeight: 'bold'
              },
            }
          },
          MuiCardActions: {
            styleOverrides: {
              root: {
                marginTop: 'auto',
                marginBottom: 20
              },
            }
          },
          MuiLink: {
            styleOverrides: {
              root: {
                cursor: 'pointer',
                fontSize: 16,
                textDecoration: 'none'
              },
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      // image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                maxWidth: 260,
                minWidth: 260,
                minHeight: 340,
                backgroundColor: '#bdefeb',
                border: '3px solid #fee501',
                borderRadius: 20,
                boxShadow: 'none',
                fontSize: 0,

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
                textAlign: 'center',
              },
            }
          },
          MuiTypography: {
            styleOverrides: {
              h4: {
                paddingBottom: 20,
                fontSize: 20,
                fontWeight: 'bold'
              },
            }
          },
          MuiCardActions: {
            styleOverrides: {
              root: {
                marginTop: 'auto',
                marginBottom: 20
              },
            }
          },
          MuiLink: {
            styleOverrides: {
              root: {
                cursor: 'pointer',
                fontSize: 16,
                textDecoration: 'none'
              },
            }
          }
        }
      }]
    },
  ],
  theme: [{
    components: {
      Section: {
        styleOverrides: {
          root: {
            backgroundColor: '#eee',
            border: '3px solid grey',
          },
          gridContainer: {
            padding: 10
          },
          gridItem: {
            padding: 10
          }
        }
      },
    },
  }]
};
