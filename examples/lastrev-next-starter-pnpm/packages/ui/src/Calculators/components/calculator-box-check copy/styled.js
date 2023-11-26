import styled from 'styled-components';
import responsive from '../../../../utils/responsive';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  .slick-slider {
    width: 100%;
  }
`;

export const RowItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const ItemContainer = styled.div`
  padding-right: 10px;
  outline: none;
`;

export const Item = styled.div`
  border: 1px solid ${({ isActive }) => (isActive ? '#4A38A9' : '#dbdee7')};
  border-radius: 7px;
  width: 100%;
  margin-bottom: 22px;
  background: ${({ isActive }) => (isActive ? '#F4F2FF' : '#ffffff')};
  display: flex;
  justify-content: space-between;
  transition: 0.3s ease all;
  padding: 14px;
  min-width: 167px;
  max-width: 385px;
  height: 129px;
  ${responsive.mobilePlus`
    height: 90px;
  `}
  > p {
    color: ${({ isActive }) => (isActive ? '#4A38A9' : '#555555')};
  }
  div:nth-child(2) {
    background: ${({ isActive }) => (isActive ? '#4a38a9' : '#D6D2F1')};
  }
`;

export const ItemDescription = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  padding: 19px 0;
  width: 90%;
  ${responsive.mobilePlus`
    padding: 0px;
    font-size: 12px;
    line-height: 18px;
  `}
  margin: auto 0;
`;

export const Dot = styled.div`
  width: 34px;
  height: 34px;
  ${responsive.mobilePlus`
    width: 24px;
    height: 24px;
  `}
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ isActive = true }) => (isActive ? 'block' : 'hidden')};
`;

export const CheckMark = styled.div`
  background: url('/static/images/checkmark-white.svg');
  width: 14px;
  height: 14px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 14px 14px;
  z-index: 10;
`;

export const StyledBox = styled.div`
  width: 70%;
  margin: 0 auto;
  ${responsive.mobilePlus`
        width: 100%;
    `}
`;
