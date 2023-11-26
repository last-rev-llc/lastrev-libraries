import styled from 'styled-components';
import css from '../../utils/style-helper';
import { Dot } from '../calculator-box-check/styled';

export const ButtonInputContainer = styled.div`
  width: 167px;
  cursor: pointer;
  padding: 12px;
  margin-right: 20px;
  margin-bottom: 16px;
  height: 89px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s ease all;
  font-size: 16px;
  div {
    align-self: start;
  }
  ${({ kind, isActive }) =>
    css([
      [
        kind === 'purpleOutline',
        `
            border: 1px solid ${isActive ? '#6D58D6' : '#DBDEE7'};
            border-radius: 7px;
            background: ${isActive ? '#F4F2FF' : 'white'};
          `
      ]
    ])}
`;

export const InlineInput = styled.input`
  border: none;
  border-bottom: 2px solid ${({ hasError }) => (hasError ? '#C30B55' : '#4a38a9')};
  width: 100%;
  height: 100%;
  color: ${({ hasError }) => (hasError ? '#C30B55' : '#4a38a9')};
  background: transparent;
  padding-left: 10px;
`;

export const InputContainer = styled.div`
  width: ${({ customWidth = '70%' }) => customWidth};
  background: transparent;
  height: 34px;
  margin: auto;
  display: flex;
  align-items: center;
  position: relative;
  &:before {
    content: '${({ content }) => content}';
    color: ${({ hasError }) => (hasError ? '#C30B55' : '#4a38a9')};
    position: absolute;
    top: 8.5px;
    left: ${({ prefixPosition }) => prefixPosition}px;
  }
`;

export const CheckCircle = styled(Dot)`
  background: ${({ isActive }) => (isActive ? '#4a38a9' : '#D6D2F1')};
  width: 24px;
  height: 24px;
  div {
    margin: auto;
  }
`;
