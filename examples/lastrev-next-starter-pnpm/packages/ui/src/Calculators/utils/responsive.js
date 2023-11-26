import { css } from 'styled-components';

const size = {
  mobileMini: '342px',
  mobile: '400px',
  mobilePlus: '640px',
  tablet: '800px',
  tabletPlus: '1000px',
  tabletLandscape: '1024px',
  desktop: '1150px',
  desktopPlus: '1255px',
  desktopPlusPlus: '1360px',
  bigScreen: '1625px'
};

const Responsive = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => `
  @media (max-width: ${size[label]}) {
    ${css(...args)}
  }
`;
  return acc;
}, {});

export default Responsive;
