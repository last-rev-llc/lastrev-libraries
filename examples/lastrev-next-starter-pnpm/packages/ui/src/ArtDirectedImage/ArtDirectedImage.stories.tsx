import ArtDirectedImage from './ArtDirectedImage';
import mockContent from './ArtDirectedImage.mock';

export default {
  title: 'Elements/ArtDirectedImage',
  tags: ['autodocs'],
  component: ArtDirectedImage
};

export const Default = {
  args: { ...mockContent }
};

export const DesktopAndMobile = {
  args: { ...mockContent, fileTablet: undefined }
};

export const DesktopAndTablet = {
  args: { ...mockContent, fileMobile: undefined }
};

export const DesktopOnly = {
  args: { ...mockContent, fileTablet: undefined, fileMobile: undefined }
};

export const TabletOnly = {
  args: { ...mockContent, file: undefined, fileMobile: undefined }
};

export const MobileOnly = {
  args: { ...mockContent, fileTablet: undefined, file: undefined }
};
