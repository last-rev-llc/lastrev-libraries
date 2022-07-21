import { MediaProps } from '../Media';
import { CardProps } from '../Card';
import { Breakpoint } from '@mui/material';

export interface Settings {
  filters: FilterSetting[];
  limit?: number;
}

export interface FilterSetting {
  id: string;
  label?: string;
  key: string;
  type: 'select' | 'text';
}
export interface Option {
  label: string;
  value: string;
}
export interface Options {
  [key: string]: Array<Option>;
}
export interface FilterFormData {
  [key: string]: any;
}

export interface UseDynamicItemsInterface {
  items?: CardProps[];
  options?: Options;
  fetchItems?: (filter: any) => Promise<{ items?: CardProps[]; options?: Options; allOptions?: Options } | null>;
  filter: any;
}

export interface CollectionFilteredProps {
  __typename?: string;
  id: string;
  variant?: string;
  items?: CardProps[];
  settings?: Settings;
  options?: Options;
  filter?: FilterFormData;
  fetchItems?: (filter: any) => Promise<{ items?: CardProps[]; options?: Options; allOptions?: Options } | null>;
  onClearFilter?: () => void;
  background?: MediaProps;
  itemsVariant?: string;
  itemsSpacing?: number | null;
  theme?: any;
  itemsWidth?: false | Breakpoint | undefined;
  sidekickLookup?: any;
  loadMoreText?: string;
}

export interface CollectionFilteredClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the contentContainer element. */
  contentContainer: string;
  // todo: add the rest of the comments
  containerGrid: string;
  collectionFiltersGrid: string;
  noResultsGrid: string;
  tryAgainGrid: string;
  resultsGridContainer: string;
  resultsGrid: string;
  noResultsText: string;
  tryAgainText: string;
  resultsText: string;
  moreResultsText: string;
  noResultsSkeleton: string;
  moreResultsSkeleton: string;
  reachingEndButton: string;
  tryAgainButton: string;
  moreResultsContainerGrid: string;
  moreResultsGrid: string;
  reachingEndGrid: string;
}

export declare type CollectionFilteredClassKey = keyof CollectionFilteredClasses;
declare const accordionClasses: CollectionFilteredClasses;
export default accordionClasses;
