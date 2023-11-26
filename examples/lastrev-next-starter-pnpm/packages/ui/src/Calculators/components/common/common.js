import styled from 'styled-components';
import responsive from '../../utils/responsive';
export const Row = styled.div`
  display: flex;
  height: ${({ isSticky }) => isSticky};
  ${responsive.desktopPlus`
    flex-direction: column;
  `};
  ${responsive.tablet`
    margin-bottom: 55px;
  `};
`;

export const Col = styled.div`
  width: ${({ width }) => width};
  position: relative;
  ${responsive.desktop`
    width: 100%;
    margin: 0;
  `};
`;

export const StickyCol = styled.div`
  width: ${({ width }) => width};
  background: #ffffff;
  position: sticky;
  height: ${({ height }) => height ?? '620px'};
  top: 150px;
  z-index: 1;
  border: ${({ hasBorder = true }) => hasBorder && '4px solid #f5f5f5'};
  padding-bottom: 24px;
  margin-left: 44px;
  ${responsive.tabletLandscape`
    height: 660px;
    width: 100%;
    margin: 0;
    padding-bottom: 34px;
  `};
  ${responsive.tablet`
  width: 100%;
    margin: 0;
    height: 740px;
    padding-bottom: 34px;
  `};
  ${responsive.mobile`
  width: 100%;
    margin: 0;
    height: 760px;
    padding-bottom: 34px;
  `};
`;

export const BackgroundDiv = styled.div`
  background-image: url('/static/images/yellow-mask.png'), url('/static/images/calculator-dots.png');
  background-position: left top, right top;
  background-repeat: no-repeat, no-repeat;
`;
