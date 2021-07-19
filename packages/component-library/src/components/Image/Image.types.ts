export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  columns?: number;
  lazy?: boolean;
  itemProp?: string;
  testId?: string;
}
