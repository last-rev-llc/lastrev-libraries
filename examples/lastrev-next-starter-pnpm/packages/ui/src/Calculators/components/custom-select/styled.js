import styled, { keyframes } from 'styled-components';
import colors from '../../utils/colors';

const getBorderColor = (hasError, isVisible, isDisabled) => {
  if (isDisabled) return 'rgba(0,0,0,0.2)';
  if (hasError && !isVisible) return colors.errorRed;
  if (!hasError && !isVisible) return '#000000';
  return '#ffffff';
};

const fadeIn = keyframes`
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
`;

export const Select = styled.div`
  cursor: pointer;
  color: #595959;
  font-size: 16px;
`;

export const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  padding: 12px 10px 12px 12px;
  border-bottom: ${({ isVisible, hasError, isDisabled }) =>
    `2px solid ${getBorderColor(hasError, isVisible, isDisabled)}`};
`;

export const Arrow = styled.div`
  background: url('/static/images/${({ isDisabled }) =>
    isDisabled ? 'arrow-down-disabled' : 'arrow-down'}.svg');
  width: 12px;
  height: 7px;
  transition: 0.3s ease all;
  transform: ${({ isVisible }) => `rotate(${isVisible ? '180deg' : '0deg'})`};
`;

export const Options = styled.div`
  user-select: none;
  position: absolute;
  width: 100%;
  border-top: 1px solid ${colors.gray};
  border-bottom: 1px solid ${colors.gray};
  z-index: 9999;
  animation: ${fadeIn} 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  max-height: 220px;
  overflow-y: scroll;
`;

export const Option = styled.div`
  padding: 13px 0px 13px 24px;
  transition: 0.3s ease all;
  cursor: pointer;
  border-left: 1px solid ${colors.gray};
  border-right: 1px solid ${colors.gray};
  color: #555555;
  background: #ffffff;
  &:hover {
    background: ${colors.green};
    color: #ffffff;
  }
`;
