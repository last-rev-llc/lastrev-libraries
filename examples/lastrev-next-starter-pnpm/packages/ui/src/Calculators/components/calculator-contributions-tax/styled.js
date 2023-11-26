import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import Text from '../../../text';

export const TaxContainer = styled.div`
  max-width: 740px;
  margin: 0 auto;
`;

export const TaxYearContainer = styled.div`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.0754207);
  border-radius: 3px;
  div {
    display: flex;
    button {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
`;

export const TaxYearTitle = styled(Text)`
  font-size: 23px;
  line-height: 32px;
  color: #000000;
  text-align: center;
  font-weight: 700;
`;
export const TaxYearSubtitle = styled(Text)`
  font-size: 16px;
  line-height: 20px;
  color: #5f5f5f;
  max-width: 377px;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
`;

export const TaxHelpContainer = styled.div`
  background-color: #fbf5e3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 132px;
  margin-top: 54px;
  text-align: center;
  padding: 12px;
`;

export const TaxHelpLearnmore = styled(Text)`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 34px;
  color: #19a69d;
  text-decoration-line: underline;
`;

export const TooltipShow = styled(ReactTooltip)`
  background: #d6d2f1 !important;
  border-radius: 4px !important;
  padding-left: 34px !important;
  color: #000000 !important;
  width: 342px !important;
  opacity: 1 !important;
  font-family: 'Muli' !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-size: 14px !important;
  line-height: 24px !important;
  a {
    color: #19a69d;
  }
  li {
    margin-bottom: 4px;
    list-style-type: disc;
  }
`;

export const DefaultLine = styled.div`
  background: #000000;
  width: 30px;
  height: 2px;
  background-color: #489a93;
  margin-left: 11px;
`;

export const DefaultLineContainer = styled.div`
  display: flex;
  align-items: center;
`;
