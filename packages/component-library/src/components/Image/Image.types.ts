export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  columns?: number;
  priority?: boolean;
  itemProp?: string;
  testId?: string;
  media?: string;
  width?: number;
  disableInlineSVG?: boolean;
  q?: number;
}
