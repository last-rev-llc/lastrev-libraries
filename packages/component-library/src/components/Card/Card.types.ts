import { CardProps as MuiCardProps } from '@mui/material';
import { RichText } from '../Text';
import { MediaProps } from '../Media';
import { LinkProps } from '../Link';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  variant?: string;
  __typename?: string;
  /** The loading state of the card. */
  loading?: boolean;
  /** The title of the card. */
  title?: string;
  /** The subtitle of the card. */
  subtitle?: string;
  /** The main Media of the card. */
  media?: MediaProps | MediaProps[];
  /** The main rich text content of the card. */
  body?: RichText;
  /** The link of the card. */
  link?: LinkProps;
  /** The link actions of the card. */
  actions?: LinkProps[];
  /** The tags of the card. */
  tags?: LinkProps[];
  /** Sidekick lookup. */
  sidekickLookup?: any;
}

export interface CardClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the card tags root container element. */
  cardTags: string;
  /** Styles applied to the card title element. */
  cardTitle: string;
  /** Styles applied to the card link element. */
  cardLink: string;
}

export declare type CardClassKey = keyof CardClasses;
declare const accordionClasses: CardClasses;
export default accordionClasses;
