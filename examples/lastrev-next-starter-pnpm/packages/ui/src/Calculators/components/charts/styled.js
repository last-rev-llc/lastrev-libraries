import styled from 'styled-components';
import responsive from '../../utils/responsive';

export const ChartContainer = styled.div`
  width: 100%;
  position: relative;
  ${responsive.desktop`
  padding-right: 50px;
`}
  ${responsive.tabletLandscape`
    padding-right: 0px;
  `}
`;
