import styled from 'styled-components';
import colors from '../../../../utils/colors';
import responsive from '../../../../utils/responsive';

export const Title = styled.div`
  color: #000000;
  font-size: 18px;
  margin-bottom: 15px;
  font-family: 'Muli';
`;

export const Result = styled.div`
  color: ${({ isPrimary }) => (isPrimary ? colors.green : '#595959')};
  font-size: 24px;
  font-family: 'Muli';
`;

export const SavingsResultsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 17px 0px 12px 34px;
  ${responsive.tablet`
    flex-direction: column;
`}
`;

export const SavingResult = styled.div`
  padding-right: 28px;
  ${responsive.desktop`
    padding-right: 50px;
  `}
  ${responsive.tabletLandscape`
    padding-right: 30px;
    margin-bottom: 24px;

  `}
`;
