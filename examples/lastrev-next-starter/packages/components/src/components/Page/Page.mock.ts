import { lorem } from 'faker';
import { PageProps } from './Page';
import heroMock from '../Hero/Hero.mock';
import collectionMock from '../Collection/Collection.mock';
import sectionMock from '../Section/Section.mock';

export default (): PageProps => ({
  __typename: 'Page',

  title: lorem.words(2),
  contents: [heroMock(), collectionMock(), sectionMock()]
});
