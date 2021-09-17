 const createRichText = (text: string) => ({
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: text,
          data: {},
          marks: []
        }
      ]
    }
  ]
});

export default createRichText;