import styled from 'styled-components';
import { InlineInput, InputContainer } from '../custom-input-button/styled';

export const Container = styled.div`
  .slick-slider {
    width: 100%;
  }
`;

export const CalculatorItemContainer = styled.div`
  outline: none;
`;

export const CalculatorItem = styled.div`
  display: flex;
  transition: 0.5 ease all;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid ${({ isActive }) => (isActive ? '#6D58D6' : '#dbdee7')};
  border-radius: 7px;
  background: ${({ isActive }) => (isActive ? '#F4F2FF' : 'white')};
  outline: none;
  padding: 20px 17px;
  max-width: 240px;
  height: 277px;
  margin-bottom: 40px;
`;

export const ImageRow = styled.div`
  height: 63px;
  width: 100%;
`;

export const ImageContainer = styled.div`
  width: 63px;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ isActive }) => (isActive ? '#4A38A9' : '#d6d2f1')};
  border-radius: 50%;
  margin-bottom: 8px;
  opacity: ${({ isActive }) => (isActive ? '1' : '0.5')};
`;

export const BarsConainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 10;
  width: 100%;
  height: 50%;
`;

export const Bar = styled.div`
  width: 4px;
  height: 20%;
  background: ${({ color }) => color};
  margin-right: 3px;
  z-index: 10;
  margin-left: 0;
  height: ${({ size }) => size}%;
  &:last-child {
    margin-right: 0px;
  }
`;

export const PurpleText = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 32px;
  color: #4a38a9;
  margin-bottom: ${({ margin }) => (margin ? '10px' : 0)};
`;

export const Description = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 19px;
  color: #555555;
  margin-bottom: 20px;
`;

export const PagginDot = styled.div`
  width: 11px;
  height: 11px;
  background: ${({ isActive }) => (isActive ? '#555555' : '#e4e4e4')};
  border-radius: 50%;
`;

export const PagginContainer = styled.div`
  text-align: start !important;
`;

export const ErroLabel = styled.span`
  font-size: 12px;
  color: #c30b55;
`;

export const InputWrapper = styled(InputContainer)`
  border-radius: 5px;
  border-top: ${({ hasError }) => (hasError ? '1.5px solid #C30B55' : '1.5px solid #ABABAB')};
  border-left: ${({ hasError }) => (hasError ? '1.5px solid #C30B55' : '1.5px solid #ABABAB')};
  border-right: ${({ hasError }) => (hasError ? '1.5px solid #C30B55' : '1.5px solid #ABABAB')};
  &:before {
    top: 7px;
  }
`;

export const ExpenseInput = styled(InlineInput)`
  background-color: #f4f4f4;
  outline: none;
  border-bottom: ${({ hasError }) => (hasError ? '1.5px solid #C30B55' : '1.5px solid #ABABAB')};
`;
