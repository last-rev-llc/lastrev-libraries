export interface fileMockProps {
  height: Number;
  width?: Number;
  text?: string;
  url?: string;
}

export const fileMock = ({ height, width, text = 'Placeholder Image', url }: fileMockProps) => {
  const imageWidth = width || 3840;
  const imageHeight = height || 2160;
  const imageText = encodeURIComponent(`${text} (${imageWidth}x${imageHeight})`);
  let imageUrl = url || `https://via.placeholder.com/${imageWidth}x${imageHeight}?text=${imageText}`;

  return {
    url: imageUrl
  };
};

export default fileMock;
