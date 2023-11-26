import styled from 'styled-components';
import responsive from '../../utils/responsive';
import Text from '../text';

export const ContributionsStyle = styled.div`
  max-width: 620px;
  border: 2px solid #489a93;
  border-radius: 8px;
  text-align: center;
  margin: 10px 0 0 auto;
  ${responsive.desktop`
    margin: 10px auto;
  `}
`;

export const ContributionStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${({ isPrimary }) =>
    isPrimary
      ? `padding: 20px 50px 54px 50px;`
      : `background-color: #E7F6F5;
  padding: 36px 50px 54px 50px;
  &:first-child{
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
  }
  &:last-child{
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
  }`}
`;

export const ContributionTitle = styled(Text)`
  font-family: Muli;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #489a93;
  width: 40%;
  ${responsive.desktop`
  width: 100%;
  `}
  span {
    font-weight: bold;
  }
`;

export const ContributionResult = styled(Text)`
  font-family: Muli;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 32px;
  color: #489a93;
`;

export const ContributionContent = styled(Text)`
  font-family: Muli;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  text-decoration-line: underline;
  color: #19a69d;
`;
