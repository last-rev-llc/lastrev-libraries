import styled from 'styled-components';
import colors from '../../utils/colors';
export const InputWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  z-index: 1;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 0;
  background: white;
  padding: 0.8rem;
  font-size: 15px;
  border-bottom: 2px solid ${({ hasError }) => (hasError ? colors.errorRed : '#000000')};
  ::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`;
