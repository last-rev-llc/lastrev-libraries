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
  /** Styles applied to the Card Link element. */
  cardLink: string;
  /** Styles applied to the Card Media element. */
  cardMedia: string;
  /** Styles applied to the Media ContentModule element. */
  media: string;
  /** Styles applied to the Media Skeleton element. */
  mediaSkeleton: string;
  /** Styles applied to the CardTagsRoot Container element. */
  cardTags: string;
  /** Styles applied to the Card Chip element. */
  chip: string;
  /** Styles applied to the CardTag element. */
  cardTagRoot: string;
  /** Styles applied to the CardContent element. */
  cardContent: string;
  /** Styles applied to the Card Title element. */
  cardTitle: string;
  /** Styles applied to the Card Subtitle element. */
  cardSubtitle: string;
  /** Styles applied to the Card Text ContentModule element. */
  cardBody: string;
  /** Styles applied to the Card Actions element. */
  cardActions: string;
  /** Styles applied to the Buttons or Links from CardActions element. */
  cardButtons: string;
  /** Styles applied to the CardContent used to build the skeleton for the card element. */
  CardContentForSkeleton: string;
  /** Styles applied to the Typography used to build the skeleton for the card element. */
  CardTitleForSkeleton: string;
  /** Styles applied to the skeleton of the title Typography the for the card element. */
  TitleSkeleton: string;
  /** Styles applied to the Typography used to build the skeleton for the card element. */
  CardSubtitleForSkeleton: string;
  /** Styles applied to the skeleton of the title Typography the for the card element. */
  SubtitleSkeleton: string;
  /** Styles applied to the skeleton of the Text the for the card element. */
  TextSkeleton: string;
  /** Styles applied to the CardActions used to build the skeleton for the card element. */
  CardActionsForSkeleton: string;
  /** Styles applied to the skeleton of the CardActions the for the card element. */
  ActionsSkeleton: string;
}

export declare type CardClassKey = keyof CardClasses;
declare const accordionClasses: CardClasses;
export default accordionClasses;
