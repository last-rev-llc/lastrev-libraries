export const articleCategoryWithSubcategoriesMock = {
  name: 'Category with Subcategories',
  subcategories: [
    {
      id: 'childCategory1',
      name: 'Child Category 1',
      articles: [
        {
          id: 'article1',
          title: 'Lorem Ipsum Dolor',
          summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis, dolor ut porta commodo, orci ipsum viverra odio, a varius massa augue quis dolor. Donec vitae est eget velit auctor pulvinar eget vitae urna. Etiam laoreet ex nec sapien placerat molestie. Fusce mattis sagittis massa sed tempor. Sed tincidunt sagittis mi vel congue. Donec semper fringilla facilisis. Aliquam fermentum orci quis enim molestie, imperdiet varius dui sagittis. Nulla quis est maximus, mollis tortor a, tincidunt leo.',
          pubDate: new Date()
        },
        {
          id: 'article2',
          title: 'Class aptent taciti sociosqu',
          summary: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut eu porta velit, et imperdiet enim. Praesent id mattis mi, quis gravida velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In vel tincidunt elit. Sed euismod quam ac ornare eleifend. Praesent posuere erat ligula, eget laoreet velit lacinia in. Sed quis ex lectus. Phasellus a nunc eget purus elementum tristique. Aenean lobortis, turpis ut tincidunt pulvinar, mi odio scelerisque dui, at pharetra nunc felis vitae erat. Etiam congue tellus ut sem iaculis, ac dictum magna luctus. Donec id massa mauris. Sed blandit, nisi auctor lacinia rhoncus, arcu enim tincidunt risus, et tincidunt odio nisi consequat nisi. Donec eu felis metus.',
          pubDate: new Date()
        }
      ]
    },
    {
      id: 'childCategory2',
      name: 'Child Category 2',
      articles: [
        {
          id: 'article3',
          title: 'Vivamus et quam ut',
          summary: 'Vivamus et quam ut eros tincidunt laoreet. Phasellus justo tortor, congue sit amet nibh iaculis, tristique aliquam risus. Sed tristique ac metus eu facilisis. Duis aliquet tincidunt sem nec aliquam. Aenean fermentum sagittis lorem, vel pellentesque purus mollis vel. Aliquam ornare dolor elementum dui tincidunt rutrum. Nunc laoreet dui id arcu aliquet tempus.',
          pubDate: new Date()
        },
        {
          id: 'article4',
          title: 'Cras vel elementum felis',
          summary: 'Cras vel elementum felis. Quisque eu tempus ligula, eu vehicula ex. Pellentesque sed tortor mi. Suspendisse lacinia urna nisi, non dapibus augue sollicitudin a. Nulla accumsan porttitor tellus eget tincidunt. Praesent iaculis erat augue, eu pharetra eros tincidunt sit amet. Duis ut metus nec mauris convallis cursus vel non eros.',
          pubDate: new Date()
        }
      ]
    }
  ]
};

export const articleCategoryWithArticlesMock = {
  name: 'Category With Articles',
  articles: [
    {
      id: 'article1',
      title: 'Lorem Ipsum Dolor',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis, dolor ut porta commodo, orci ipsum viverra odio, a varius massa augue quis dolor. Donec vitae est eget velit auctor pulvinar eget vitae urna. Etiam laoreet ex nec sapien placerat molestie. Fusce mattis sagittis massa sed tempor. Sed tincidunt sagittis mi vel congue. Donec semper fringilla facilisis. Aliquam fermentum orci quis enim molestie, imperdiet varius dui sagittis. Nulla quis est maximus, mollis tortor a, tincidunt leo.',
      pubDate: new Date()
    },
    {
      id: 'article2',
      title: 'Class aptent taciti sociosqu',
      summary: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut eu porta velit, et imperdiet enim. Praesent id mattis mi, quis gravida velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In vel tincidunt elit. Sed euismod quam ac ornare eleifend. Praesent posuere erat ligula, eget laoreet velit lacinia in. Sed quis ex lectus. Phasellus a nunc eget purus elementum tristique. Aenean lobortis, turpis ut tincidunt pulvinar, mi odio scelerisque dui, at pharetra nunc felis vitae erat. Etiam congue tellus ut sem iaculis, ac dictum magna luctus. Donec id massa mauris. Sed blandit, nisi auctor lacinia rhoncus, arcu enim tincidunt risus, et tincidunt odio nisi consequat nisi. Donec eu felis metus.',
      pubDate: new Date()
    }
  ]
};
