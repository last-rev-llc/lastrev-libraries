import type { BackgroundProps } from './Background.types';

const backgroundDefaultMock: BackgroundProps = {
  // background: mediaBaseImageMock(),
  backgroundColor: 'primary'
};

export const backgroundBaseMock = ({ ...override } = {}) => ({
  ...backgroundDefaultMock,
  ...override
});

export default backgroundBaseMock;
