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
  /** Styles applied to the CollectionFilters element. */
  filters: string;
  /** Styles applied to the Textfield element. */
  textField: string;
  /** Styles applied to the Select Textfield element. */
  selectTextField: string;
  /** Styles applied to the Autocomplete Textfield element. */
  autocompleteTextField: string;
  /** Styles applied to the MenuItem from the Autocomplete element. */
  menuItem: string;
  /** Styles applied to the Autocomplete element. */
  autocomplete: string;
  /** Styles applied to each Chip element. */
  chip: string;
  /** Styles applied to the Input Root element. */
  inputRoot: string;
  /** Styles applied to the Button Root element. */
  buttonRoot: string;
  /** Styles applied to the Button element. */
  button: string;
}

export declare type CollectionFiltersClassKey = keyof CollectionFiltersClasses;
declare const accordionClasses: CollectionFiltersClasses;
export default accordionClasses;
