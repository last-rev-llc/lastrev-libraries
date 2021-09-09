export interface MediaProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  file: any;
  // alt: string;
  className?: string;
  columns?: number;
  lazy?: boolean;
  itemProp?: string;
  testId?: string;
}
