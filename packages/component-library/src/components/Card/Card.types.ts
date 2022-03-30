import { CardProps as MuiCardProps } from '@mui/material';
import { RichText } from '../Text';
import { MediaProps } from '../Media';
import { LinkProps } from '../Link';

export interface CardProps extends MuiCardProps {
  __typename?: string;
  loading?: boolean;
  variant?: any;
  title?: string;
  subtitle?: string;
  media?: MediaProps | MediaProps[];
  body?: RichText;
  link?: LinkProps;
  actions?: LinkProps[];
  tags?: LinkProps[];
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
