import styled from 'styled-components';
import { fadeIn } from '../../shared/styledAnimations/fadeIn';
import responsive from '../../utils/responsive';
import { Text } from '../text';

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 20px 3px rgba(0, 0, 0, 0.0780157);
  border-radius: 5px;
  animation-name: ${fadeIn};
  animation-duration: 0.3s;
`;

export const SectionContainer = styled.div`
  width: 100%;
  background: ${({ isPrimary }) => (isPrimary ? 'rgba(25, 166, 157, 0.1)' : '#ffffff')};
`;

export const MainSection = styled.div`
  width: 80%;
  margin: 0 auto;
  color: rgba(25, 166, 157, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${({ paddingBottom }) => paddingBottom ?? '92px'};
  padding-top: ${({ paddingTop }) => paddingTop ?? '77px'};
  ${responsive.mobile`
    flex-direction: column;
    width: 100%;
    padding-bottom: 34px;
    padding-top: 0px;
  `};
`;

export const MainLargeContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const Section = styled.div`
  width: 80%;
  margin: 25px auto 35px auto;
  display: flex;
  align-items: center;
  ${({ paddingBottom }) => paddingBottom && `padding-bottom: ${paddingBottom}`};
  ${responsive.mobile`
    width: 100%;
    display: none;
  `};
`;

export const PrimaryText = styled(Text)`
  width: 30%;
  font-size: 26px;
  line-height: 30px;
  font-weight: 700;
  ${responsive.tablet`
    width: 35%;
  `}
  ${responsive.mobile`
    width: 70%;
    font-size: 16px;
    text-align: center;
    margin-top: 27px;
  `}
`;

export const PrimaryLargeText = styled(Text)`
  color: #19a69d;
  line-height: 24px;
  width: 30%;
  font-sie: 16px;
  font-weight: 700;
  margin-top: 40px;
  ${responsive.mobile`
    width: 100%;
    text-align: center;
  `}
`;

export const PrimaryLargeValue = styled(Text)`
  font-size: 42px;
  color: #19a69d;
  font-weight: 700;
  margin-top: 22px;
  margin-bottom: 50px;
  ${responsive.mobile`
    width: 100%;
    text-align: center;
    margin-bottom: 0px;
  `}
`;

export const LargeContainer = styled.div`
  padding-top: 8px;
  border-radius: 5px;
  background: ${({ isPrimary }) => (isPrimary ? 'rgba(25, 166, 157, 0.1)' : '#ffffff')};
  &:first-child {
    margin-bottom: 40px;
    ${responsive.mobile`
    margin-bottom: 0px;
  `}
  }
`;

export const PrimaryValue = styled(Text)`
  width: 30%;
  font-size: 42px;
  line-height: 30px;
  font-weight: 700;
  margin-right: 20%;
  ${responsive.tablet`
    width: 35%;
  `}
  ${responsive.mobile`
    width: 70%;
    font-size: 36px;
    text-align: center;
    margin-top: 27px;
    margin-right: 0%;

  `}
`;

export const ExplanationContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  ${responsive.mobile`
    width: 70%;
    flex-direction: column;
  `}
  ${({ marginTop }) => marginTop && `margin-top:${marginTop}`}
`;

export const Explanation = styled.div`
  width: 30%;
  color: rgba(25, 166, 157, 1);
  &:last-child {
    margin-right: 20%;
  }
  div {
    line-height: 16px;
  }
  div {
    &:first-child {
      margin: 0 0 15px 0;
    }
  }
  ${responsive.mobile`
    width: 100%;
    text-align: center;
    margin-top: 24px;
    &:last-child{
        margin-right: 0%;
    }
  `}
`;

export const RightExplanationContainer = styled.div`
  display: flex;
  margin-top: 0px;
`;

export const ExplanationsContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 80px;
  ${responsive.mobile`
    margin-bottom: 0px;
    margin-top: 24px;
    width: 100%;
  `}
`;

export const PrimaryEmptyResponse = styled.div`
  color: #19a69d;
  font-size: 16px;
  font-weight: ${({ weight }) => weight};
  line-height: 24px;
  width: 65%;
  a {
    text-decoration: underline;
  }
  ${responsive.mobile`
    &:first-child{
      padding-top: 24px;
    }
    width: 80%;
  `}
`;
