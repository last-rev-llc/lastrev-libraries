import { mediumIconCenterMock, mediaMock, iconSmallLeftMock, insightMock } from '../Card/Card.mock';

export const mediumIconCenterCollectionMock = {
  __typename: 'Collection',
  itemsSpacing: 2,
  variant: 'collection-medium-icon-center',
  items: [{ ...mediumIconCenterMock }, { ...mediumIconCenterMock }, { ...mediumIconCenterMock }],
  itemsVariant: 'medium-icon-center'
};

export const logosMock = {
  __typename: 'Collection',
  itemsSpacing: 2,
  variant: 'logos',
  items: [
    { ...mediaMock },
    {
      ...mediaMock,
      media: {
        ...mediaMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...mediaMock,
      media: {
        ...mediaMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...mediaMock,
      media: {
        ...mediaMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...mediaMock,
      media: {
        ...mediaMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...mediaMock,
      media: {
        ...mediaMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    }
  ],
  itemsVariant: 'media'
  // theme: [] // PASSING A THEME BREAKS THE VARIANT MAPPING
};

export const smallIconLeftCardsMock = {
  __typename: 'Collection',
  itemsSpacing: 2,
  variant: 'collection-three-per-row',
  items: [
    { ...iconSmallLeftMock },
    {
      ...iconSmallLeftMock,
      media: {
        ...iconSmallLeftMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...iconSmallLeftMock,
      media: {
        ...iconSmallLeftMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    }
  ],
  itemsVariant: 'iconSmallLeftMock'
};

export const insightCardsMock = {
  __typename: 'Collection',
  itemsSpacing: 2,
  variant: 'collection-three-per-row',
  items: [
    { ...insightMock },
    {
      ...insightMock,
      media: {
        ...insightMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    },
    {
      ...insightMock,
      media: {
        ...insightMock.media,
        file: {
          url: './MockImage.jpg'
        }
      }
    }
  ],
  itemsVariant: 'insight'
};
