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
  /** Styles applied to the root element element*/
  root: string;
  /** Styles applied to the ContentRoot element. */
  contentContainer: string;
  /** Styles applied to the Content Grid element. */
  content: string;
  /** Styles applied to the FiltersRoot element. */
  filtersRoot: string;
  /** Styles applied to the NoResultsRoot element. */
  noResultsRoot: string;
  /** Styles applied to the ErrorRoot element. */
  errorRoot: string;
  /** Styles applied to the ResultsRoot element. */
  resultsRoot: string;
  /** Styles applied to the Results element. */
  results: string;
  /** Styles applied to the Typography of the NoResults text element. */
  noResultsText: string;
  /** Styles applied to the Typography of the ErrorMessage text element. */
  errorMessage: string;
  /** Styles applied to the Typography of the Results text element. */
  resultsText: string;
  /** Styles applied to the Typography of the LoadingResults text element. */
  loadingResultsText: string;
  /** Styles applied to the Skeleton of the NoResultsSkeleton text element. */
  noResultsSkeleton: string;
  /** Styles applied to the Skeleton of the LoadingResults text element. */
  loadingResultsSkeleton: string;
  /** Styles applied to the LoadMoreButton element. */
  loadMoreButton: string;
  /** Styles applied to the ErrorButton element. */
  errorButton: string;
  /** Styles applied to the LoadingResultsRoot element. */
  loadingResultsRoot: string;
  /** Styles applied to the loadingResults Grid element. */
  loadingResults: string;
  /** Styles applied to the LoadMoreRoot element. */
  loadMoreRoot: string;
}

export declare type CollectionFilteredClassKey = keyof CollectionFilteredClasses;
declare const collectionFilteredClasses: CollectionFilteredClasses;
export default collectionFilteredClasses;
