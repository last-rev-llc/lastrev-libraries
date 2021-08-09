export default {
  __typename: 'Quiz',
  variant: 'standard',
  image: {
    __typename: 'Media',
    file: {
      url: 'https://images.ctfassets.net/m1b67l45sk9z/2awO0PIcc95YxGG7nPP1sZ/ff331405802cbb54bda2cd9e64d92f84/sheepdog.png?h=250'
    },
    alt: 'Sheepdog'
  },
  title: 'Tell us how you’ve been feeling.',
  intro: {
    __typename: 'Text',
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'It’s not easy to ask for help, let alone find the right kind.',
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
              value: 'Answer 3 quick questions, and we’ll help you find the right support for your journey.',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  },
  outro: {
    __typename: 'Text',
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              data: {},
              marks: [],
              value: 'Our website is '
            },
            {
              nodeType: 'text',
              data: {},
              marks: [
                {
                  type: 'bold'
                },
                {
                  type: 'underline'
                }
              ],
              value: 'not'
            },
            {
              nodeType: 'text',
              data: {},
              marks: [],
              value: ' a resource for life-threatening situations and is not monitored 24/7.'
            }
          ]
        },
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              data: {},
              marks: [],
              value: 'If you are in crisis,'
            },
            {
              nodeType: 'text',
              data: {},
              marks: [
                {
                  type: 'bold'
                }
              ],
              value: ' text '
            },
            {
              nodeType: 'text',
              data: {},
              marks: [
                {
                  type: 'bold'
                },
                {
                  type: 'code'
                }
              ],
              value: '741-741 '
            },
            {
              nodeType: 'text',
              data: {},
              marks: [],
              value: 'or'
            },
            {
              nodeType: 'text',
              data: {},
              marks: [
                {
                  type: 'bold'
                }
              ],
              value: ' call '
            },
            {
              nodeType: 'text',
              data: {},
              marks: [
                {
                  type: 'bold'
                },
                {
                  type: 'code'
                }
              ],
              value: '1-800-273-8255'
            },
            {
              nodeType: 'text',
              data: {},
              marks: [],
              value: '.'
            }
          ]
        }
      ]
    }
  },
  settings: {
    steps: [
      {
        id: 'step1',
        title: 'How have you been feeling? Select one or more options.',
        fields: [
          {
            id: 'a00e2109-affa-4852-87d1-7e99db5f2155',
            name: 'answer',
            type: 'select-multiple',
            label: "I've been feeling:",
            options: [
              { label: 'I have trouble sleeping.' },
              { label: 'I have trouble eating.' },
              { label: 'I have trouble snoring.' },
              { label: 'I have trouble falling asleep.' },
              { label: 'I have trouble waking up.' }
            ]
          }
        ]
      },
      {
        id: 'step2',
        title: 'Another question ok?',
        fields: [
          {
            id: 'a00e2109-affa-4852-87d1-7e99db5f2156',
            name: 'answer',
            type: 'select-multiple',
            label: 'Well...',
            options: [
              { label: 'I have trouble fishing.' },
              { label: 'I have trouble writing.' },
              { label: 'I have trouble sledding.' }
            ]
          },
          {
            id: 'a00e2109-affa-4852-87d1-7e99db5f2156',
            name: 'actions',
            type: 'link',
            label: 'HELP ME FIND THE SUPPORT I NEED'
          },
          {
            id: 'a00e2109-affa-4852-87d1-7e99db5f2156',
            name: 'actions',
            type: 'link',
            label: 'HELP ME FIND OTHER THINGS TOO'
          }
        ]
      }
    ]
  }
};
