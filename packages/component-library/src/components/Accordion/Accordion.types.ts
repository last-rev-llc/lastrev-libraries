import { AccordionProps as MuiAccordionProps } from '@mui/material';
import { CardProps } from '../Card';
import { RichText } from '../Text';

export interface AccordionProps extends Omit<MuiAccordionProps, 'children' | 'onChange' | 'classes'>, CardProps {
  __typename?: string;
  internalTitle?: string;
  variant?: any;
  title?: string;
  body?: RichText;
  sidekickLookup?: any;
  children?: any;
}

export interface AccordionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element unless `square={true}`. */
  rounded: string;
  /** State class applied to the root element if `expanded={true}`. */
  expanded: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element unless `disableGutters={true}`. */
  gutters: string;
  /** Styles applied to the region element, the container of the children. */
  region: string;
}
export declare type AccordionClassKey = keyof AccordionClasses;
declare const accordionClasses: AccordionClasses;
export default accordionClasses;
