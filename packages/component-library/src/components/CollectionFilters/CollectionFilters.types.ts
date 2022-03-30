export interface FilterSetting {
  id: string;
  label?: string;
  key: string;
  type: 'select' | 'text' | 'autocomplete';
  multiple?: boolean;
}
export interface Option {
  label: string;
  value: string;
}

export interface Options {
  [key: string]: Array<Option>;
}

export interface CollectionFiltersProps {
  id: string;
  options?: Options;
  allOptions?: Options;
  filter?: FilterFormData;
  filters?: FilterSetting[];
  setFilter: any;
  onClearFilter: any;
}
export interface FilterFormData {
  [key: string]: any;
}

export interface CollectionFiltersClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type CollectionFiltersClassKey = keyof CollectionFiltersClasses;
declare const accordionClasses: CollectionFiltersClasses;
export default accordionClasses;
