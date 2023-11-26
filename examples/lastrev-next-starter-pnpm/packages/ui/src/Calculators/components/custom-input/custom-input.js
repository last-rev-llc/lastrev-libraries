import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { handleBlur, handleChange, numberWithCommas } from '../../utils/helpers';

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  &:before {
    position: absolute;
    font-size: 16px;
    left: 2px;
    color: #595959;
    opacity: ${({ isDisabled }) => (isDisabled ? 0.2 : 1)};
    transition: all 0.05s ease-in-out;
    content: '${({ prefix }) => prefix ?? ''} ';
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 0;
  background: white;
  padding: 15px 14px 14px 14px;
  font-size: 16px;
  color: #595959;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.2 : 1)};
  border-bottom: 2px solid
    ${({ hasError, isDisabled }) =>
      hasError ? colors.errorRed : isDisabled ? 'rgba(0,0,0, 0.5)' : '#000000'};
`;

const Description = styled.p`
  margin-left: 30px;
  font-size: 16px;
`;

export default function input(props) {
  const {
    name,
    placeholder,
    prefix,
    defaultValue,
    dataType,
    value,
    isDisabled,
    description,
    customStyle
  } = props;
  const [inputValue, setInputValue] = useState(
    numberWithCommas(defaultValue ? defaultValue : value ? value : '')
  );
  useEffect(() => {
    setInputValue(numberWithCommas(defaultValue ? defaultValue : value ? value : ''));
  }, [defaultValue]);
  return (
    <InputWrapper prefix={prefix}>
      <Input
        type={'text'}
        name={name}
        style={customStyle}
        description={description}
        disabled={isDisabled}
        defaultValue={defaultValue}
        hasError={props.rowData?.error}
        placeholder={placeholder}
        isDisabled={isDisabled}
        onBlur={(e) => handleBlur(dataType, e.target.value, props.onBlur)}
        onChange={(e) => handleChange(dataType, e.target.value, setInputValue)}
        value={inputValue}
      />
      {description ? <Description>{description}</Description> : null}
    </InputWrapper>
  );
}
