import { Breakpoint } from '@mui/material';
import { MediaProps } from '../Media';
import { TextProps } from '../Text';
import { CardProps } from '../Card';
import { NavigationItemProps } from '../NavigationItem';

export interface CollectionProps {
  variant?: string;
  id: string;
  __typename?: string;
  items?: CardProps[] | NavigationItemProps[];
  background?: MediaProps;
  introText?: TextProps;
  itemsVariant?: string;
  itemsSpacing?: number;
  itemsWidth?: false | Breakpoint;
  styles?: any;
  theme?: any;
  sidekickLookup?: any;
}

export interface CollectionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the content cotainer when itemsWidth is set. */
  contentContainer: string;
  /** Styles applied to the intro text root container. */
  introText: string;
}

export declare type CollectionClassKey = keyof CollectionClasses;
declare const collectionClasses: CollectionClasses;
export default collectionClasses;
