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
  /** Styles applied to the Root element. */
  root: string;
  /** Styles applied to the Link element. */
  link: string;
  /** Styles applied to the MediaRoot element. */
  mediaRoot: string;
  /** Styles applied to the Media ContentModule element. */
  media: string;
  /** Styles applied to the Media Skeleton element. */
  mediaSkeleton: string;
  /** Styles applied to the Root of the Tags element. */
  tags: string;
  /** Styles applied to the Chip/Tag Element element. */
  chip: string;
  /** Styles applied to the CardTagRoot ContentModule element. */
  tagRoot: string;
  /** Styles applied to the CardContent element. */
  content: string;
  /** Styles applied to the Typography of the title text element. */
  title: string;
  /** Styles applied to the Typography of the subtitle text element. */
  subtitle: string;
  /** Styles applied to the Text of the body element. */
  body: string;
  /** Styles applied to the CardActions element. */
  actions: string;
  /** Styles applied to the ButtonHero element. */
  button: string;
  /** Styles applied to the Skeleton of the title text element. */
  titleSkeleton: string;
  /** Styles applied to the Skeleton of the subtitle text element. */
  subtitleSkeleton: string;
  /** Styles applied to the Skeleton of the body text element. */
  textSkeleton: string;
  /** Styles applied to the Skeleton of the CardActions element. */
  actionsSkeleton: string;
}

export declare type CardClassKey = keyof CardClasses;
declare const cardClasses: CardClasses;
export default cardClasses;
