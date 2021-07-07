import cardMock from '../Card/Card.mock';

export default {
  __typename: 'Section',
  contents: [
    {
      ...cardMock,
      title: 'hello',
      theme: [{
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                border: '10px solid red',
                backgroundColor: 'pink'
              }
            }
          }
        }
      }]
    },
    {
      ...cardMock,
      title: 'ciao!'
    },
  ],
  theme: [{
    components: {
      Section: {
        root: {
          border: '10px solid blue',
        },
        gridContainer: {
          spacing: 10,
        }
      },
    },
    overrides: {
      'Section': {
        root: {
          '& h3': {
            fontSize: '55rem',
            border: '10px solid green',
          }
        },
      },
    },
  }]
};
