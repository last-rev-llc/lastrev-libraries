import React from 'react';
import styled from 'styled-components';
import css from '../../utils/style-helper';
import colors from '../../utils/colors';
// import LeftArrow from '../../public/static/images/carousel-le´ft.svg';

const ButtonStyle = styled.button`
  width: 130px;
  padding: 15px;
  cursor: pointer;
  margin-right: 20px;
  height: 60px;
  transition: 0.3s ease all;
  font-size: 16px;
  ${({ kind, isSelected, disabled, background, isDisabled }) =>
    css([
      [
        kind === 'greenOutline',
        `
        border-radius: 4px;
        border: 1px solid ${isDisabled ? colors.gray : isSelected ? '#03514A' : colors.gray};
        background: ${isDisabled ? '#FFFFFF' : isSelected ? colors.lightGreen : '#FFFFFF'};
        opacity: ${isDisabled ? 0.5 : 1};
        color: ${isDisabled ? '#000000' : isSelected ? '#03514A' : '#000000'};
        outline: none;
        &:hover{
          background: ${isDisabled ? '#FFFFFF' : colors.lightGreen};
          border: ${isDisabled ? '1px' : '2px'} solid ${isDisabled ? '#ababab' : '#03514A'};
          color: ${isDisabled ? '#000000' : '#03514A'};
        }
        &:focus, &:active {
          background: ${isDisabled ? '#FFFFFF' : colors.lightGreen};
          color: ${isDisabled ? '#000000' : '#03514A'};
        }
      `
      ],
      [
        kind === 'primary',
        `
          background: #19A69D;
          color: #ffffff;
          font-size: 15px;
          font-family: Muli;
          height: 50px;
          padding: 0;
          border: none;
          border-radius: 4px;
          width: 150px;
        `
      ],
      [
        kind === 'navigate',
        `
          background: ${background || '#ffffff'};
          height: 50px;
          padding: 0;
          color: #ABABAB; 
          border: none;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          &:hover:before{
            transform: translateX(-5px);
          }
          &:active{
            color: #ABABAB;
          }
          &:focus{
            color: #ABABAB;
          }
          &:before{
            transition: all 0.2s ease;
            content: '';
            margin-right: 10px;
            background: url(/static/images/icons/chevron-left-gray.svg);
            width: 11px;
            height: 15px;
          }
        `
      ],
      [
        disabled,
        `
        background: rgba(25, 166, 157, 0.5);
        cursor: not-allowed;
        &:active{
          color: #ffffff;
        }
        `
      ]
    ])}
`;

const ButtonText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.4em;
`;

const CustomButton = ({
  kind,
  isSelected,
  handleClick,
  value,
  className,
  disabled = false,
  background,
  isDisabled
}) => (
  <ButtonStyle
    disabled={disabled}
    className={className}
    onClick={isDisabled ? null : handleClick}
    isSelected={isSelected}
    background={background}
    isDisabled={isDisabled}
    kind={kind}>
    <ButtonText>{value}</ButtonText>
  </ButtonStyle>
);

export default CustomButton;
