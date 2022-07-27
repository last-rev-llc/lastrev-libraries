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
  /** Styles applied to the root element for the CollectionFiltered element*/
  root: string;
  /** Styles applied to the ContentRoot for the CollectionFiltered element. */
  contentRoot: string;
  /** Styles applied to the Content Grid for the CollectionFiltered element. */
  content: string;
  /** Styles applied to the FiltersRoot for the CollectionFiltered element. */
  filtersRoot: string;
  /** Styles applied to the NoResultsRoot for the CollectionFiltered element. */
  noResultsRoot: string;
  /** Styles applied to the ErrorRoot for the CollectionFiltered element. */
  errorRoot: string;
  /** Styles applied to the ResultsRoot for the CollectionFiltered element. */
  resultsRoot: string;
  /** Styles applied to the Results for the CollectionFiltered element. */
  results: string;
  /** Styles applied to the Typography of the NoResults text for the CollectionFiltered element. */
  noResultsText: string;
  /** Styles applied to the Typography of the ErrorMessage text for the CollectionFiltered element. */
  errorMessage: string;
  /** Styles applied to the Typography of the Results text for the CollectionFiltered element. */
  resultsText: string;
  /** Styles applied to the Typography of the LoadingResults text for the CollectionFiltered element. */
  loadingResultsText: string;
  /** Styles applied to the Skeleton of the NoResultsSkeleton text for the CollectionFiltered element. */
  noResultsSkeleton: string;
  /** Styles applied to the Skeleton of the LoadingResults text for the CollectionFiltered element. */
  loadingResultsSkeleton: string;
  /** Styles applied to the LoadMoreButton for the CollectionFiltered element. */
  loadMoreButton: string;
  /** Styles applied to the ErrorButton for the CollectionFiltered element. */
  errorButton: string;
  /** Styles applied to the LoadingResultsRoot for the CollectionFiltered element. */
  loadingResultsRoot: string;
  /** Styles applied to the loadingResults Grid for the CollectionFiltered element. */
  loadingResults: string;
  /** Styles applied to the LoadMoreRoot for the CollectionFiltered element. */
  loadMoreRoot: string;
}

export declare type CollectionFilteredClassKey = keyof CollectionFilteredClasses;
declare const accordionClasses: CollectionFilteredClasses;
export default accordionClasses;
