import faker from 'faker';
import mockCard from '../Card/Card.mock';
import mockTheme from '../../theme/mock.theme';
import { CollectionFilteredProps, Settings, Options, FilterSetting } from './CollectionFiltered.types';
import { mediaMock } from '../Media/Media.mock';

const items = [
  { ...mockCard(), variant: 'media-and-text', title: 'Card one title' },
  { ...mockCard(), variant: 'media-and-text', title: 'Card two title' },
  { ...mockCard(), variant: 'media-and-text', title: 'Card three title' },
  { ...mockCard(), variant: 'media-and-text', title: 'Card four title' }
];

const topicOption = (topic?: string) => ({
  label: topic ? topic : faker.lorem.words(3),
  value: faker.random.alphaNumeric(10)
});

const tagOption = (tag: string = faker.lorem.word()) => ({ label: tag, value: tag });

export const allOptions = {
  topics: [topicOption('Topic One'), topicOption('Topic Two'), topicOption('Topic Three'), topicOption('Topic Four')],
  tags: [tagOption('one'), tagOption('two'), tagOption('three'), tagOption('four')]
};

export const noOptions = { topics: [], tags: [] };
export const topicOptions = { topics: [topicOption('Topic One')], tags: [] };
export const tagsOptions = { topics: [], tags: [tagOption('one'), tagOption('three')] };
export const topicAndTagsOptions = { topics: [topicOption('Topic Two')], tags: [tagOption('two'), tagOption('four')] };

const defaultFilter = () => ({
  id: 'topics',
  key: 'topics',
  type: 'select',
  label: 'Topic'
});

const filters = [
  defaultFilter(),
  {
    id: 'tags',
    key: 'tags',
    label: 'Tag',
    multiple: true,
    type: 'autocomplete'
  },
  {
    id: 'body',
    key: 'query',
    type: 'text',
    label: 'Search'
  }
] as FilterSetting[];

const settings = (): Settings => ({ filters, limit: 2 });

export const collectionFilteredMock = (
  options: Options = {},
  fetchItems: CollectionFilteredProps['fetchItems'] = () => Promise.resolve({ items, options, allOptions })
): CollectionFilteredProps => ({
  __typename: 'Collection',
  id: 'xyz',
  variant: 'filtered',
  items,
  itemsVariant: 'media-and-text',
  theme: [mockTheme],
  settings: settings(),
  filter: defaultFilter(),
  options,
  fetchItems,
  onClearFilter: () => {},
  background: mediaMock(),
  itemsSpacing: 2,
  itemsWidth: 'md',
  sidekickLookup: 'sidekickLookup',
  loadMoreText: 'Load More'
});

export const noOptionalPropsMock = {
  __typename: 'Collection',
  id: 'noOptionalProps',
  variant: 'filtered'
} as CollectionFilteredProps;

export const noOptionsMock = collectionFilteredMock(noOptions);
export const topicOptionsMock = collectionFilteredMock(topicOptions);
export const tagsOptionsMock = collectionFilteredMock(tagsOptions);
export const topicAndTagsOptionsMock = collectionFilteredMock(topicAndTagsOptions);

export default {
  ...collectionFilteredMock()
};
