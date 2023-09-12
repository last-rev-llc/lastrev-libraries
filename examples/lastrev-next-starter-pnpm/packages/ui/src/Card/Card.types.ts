import { Card_BaseFragmentFragment } from '@graphql-sdk/types';

type CardVariants =
  | 'default'
  | 'defaultCircleImage'
  | 'mediaFill'
  | 'mediaContain'
  | 'mediaSquare'
  | 'icon'
  | 'content'
  | 'pricing'
  | undefined;

export interface CardProps extends Card_BaseFragmentFragment {
  loading?: boolean;
  variant?: CardVariants;
  colorScheme?: string;
  position?: number;
  isFirst?: Boolean;
  isMultipleOfTwo?: Boolean;
  isMultipleOfThree?: Boolean;
}

export interface CardClasses {
  root: string;
  cardLink: string;
  cardMedia: string;
  cardMediaFlip: string;
  cardMediaContainer: string;
  cardActions: string;
  cardAction: string;
  cardContent: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
}

export declare type CardClassKey = keyof CardClasses;
