import styled from 'styled-components';
import responsive from '../../utils/responsive';
import AccordionList from '../accordion-list/accordion-list';

export const Container = styled.div`
  border: 1px solid #4a38a9;
  border-radius: 4px;
`;

export const ResultContainer = styled.div`
  background: #4a38a9;
  padding: 30px 63px;
  color: #ffffff;
  display: flex;
  }
  ${responsive.mobilePlus`
    flex-direction: column;
    padding: 30px 30px 0px 30px;
  `}
`;

export const ResultsContainer = styled.div`
  width: 50%;
  ${responsive.mobilePlus`
    width: 100%;
  `}
`;

export const ResultTextDescription = styled.p`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #f4f4f4;
  width: 60%;
  min-height: 44px;
  ${responsive.mobilePlus`
    width: 80%;
  `}
`;

export const ResultTextTotal = styled.p`
  font-weight: bold;
  font-size: 36px;
  line-height: 40px;
  color: #f4f4f4;
  ${responsive.mobilePlus`
    width: 100%;
    font-size: 22px;
        margin-bottom: 30px;
  `}
`;

export const ResultDescriptionContainer = styled.div`
  padding: 30px 63px;
  display: flex;
  width: 100%;
  ${responsive.mobilePlus`
    width: 100%;
    flex-direction: column;
    padding: 30px;
  `}
`;

export const DescriptionContainer = styled.div`
  width: ${({ width }) => width}%;
  ${responsive.mobilePlus`
    width: 100%;
  `}
`;

export const ResponseBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  p:first-child {
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 11px;
  }
  p:last-child {
    font-weight: bold;
    font-size: 24px;
    line-height: 24px;
    color: #4a38a9;
    margin-bottom: 26px;
  }
`;

export const Disclaimer = styled.p`
  margin-top: 96px;
  font-size: 11px;
  color: #555555;
  ${responsive.mobilePlus`
    margin-top: 50px;
  `}
`;

export const StyledAcordionList = styled(AccordionList)`
  ul {
    width: 100%;
  }
  p {
    color: #4a38a9;
    font-size: 24px;
  }
`;

export const AssetGrowth = styled.div`
  p {
    font-size: 18px;
    font-weight: normal;
    span {
      font-size: 24px;
      font-weight: bold;
    }
  }
`;
