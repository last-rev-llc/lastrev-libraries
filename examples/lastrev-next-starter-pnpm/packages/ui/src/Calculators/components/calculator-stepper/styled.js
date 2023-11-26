import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
`;

export const Dot = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease all;
  font-size: 15px;
  border: 2px solid #489a93;
  color: #489a93;
  border-radius: 50%;
  z-index: 10;
  background: white;
  margin-right: 30px;
  ${({ visited }) =>
    visited &&
    `
    color: white;
    background: #489a93;
  `}
`;

export const DotLine = styled.div`
  width: 60px;
  height: 30px;
  position: absolute;
  z-index: 1;
  background-image: linear-gradient(45deg, #d2e6e4 50%, #f4f4f4 50%);
  background-size: 250% 100%;
  background-position: right bottom;
  transition: background-position 0.5s ease;
  left: ${({ step }) => `${60 * step + 15}px`};
  ${({ isActive }) =>
    isActive &&
    `
  background-position: left top;
  `};
`;
