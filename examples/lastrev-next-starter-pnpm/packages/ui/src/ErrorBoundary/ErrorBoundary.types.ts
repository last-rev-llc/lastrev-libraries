export interface ErrorBoundaryProps {
  fallback?: any;
  showDialog?: boolean;
  children?: React.ReactNode;
}

interface ErrorBoundaryClasses {
  // /** Styles applied to the root element. */
  // root: string;
}

export declare type ErrorBoundaryClassKey = keyof ErrorBoundaryClasses;
declare const accordionClasses: ErrorBoundaryClasses;
export default accordionClasses;
