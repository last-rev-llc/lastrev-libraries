import type { BackToTopProps } from './BackToTop.types';

export const backToTopBaseMock = (override?: Partial<BackToTopProps>): BackToTopProps => {
  return {
    FabProps: {
      size: 'large',
      color: 'primary'
    },
    sidekickLookup: ''
  };
};

export default backToTopBaseMock;
