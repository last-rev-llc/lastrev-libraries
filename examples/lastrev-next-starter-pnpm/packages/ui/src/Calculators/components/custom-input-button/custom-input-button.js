import React, { useEffect, useState } from 'react';
import { ButtonInputContainer, CheckCircle, InlineInput, InputContainer } from './styled';
import { handleBlur, handleChange, numberWithCommas } from '../../utils/helpers';
import { CheckMark } from '../calculator-box-check/styled';

const CustomInputButton = ({
  kind,
  defaultValue,
  value,
  control,
  rowData,
  handleClick,
  dataType,
  onBlur,
  hasError
}) => {
  const isActive = rowData && rowData[control.id]?.value === control?.value;
  const [inputValue, setInputValue] = useState(
    isActive ? numberWithCommas(defaultValue ? defaultValue : value ? value : '') : ''
  );
  useEffect(() => {
    if (isActive) {
      setInputValue(numberWithCommas(defaultValue ? defaultValue : value ? value : ''));
    }
  }, [defaultValue]);
  return (
    <ButtonInputContainer kind={kind} isActive={isActive}>
      <InputContainer
        onClick={handleClick}
        hasError={hasError && isActive}
        content={control.prefix || control.subfix}
        prefixPosition={control.subfix ? 8.5 * inputValue.length + 10 : 0}>
        <InlineInput
          hasError={hasError && isActive}
          onChange={(e) => handleChange(dataType, e.target.value, setInputValue)}
          value={inputValue}
          maxLength={control.subfix === '%' ? 8 : ''}
          onBlur={(e) => handleBlur(dataType, rowData[control?.id]?.value, onBlur, e.target.value)}
        />
      </InputContainer>
      <CheckCircle isActive={isActive}>{isActive && <CheckMark />}</CheckCircle>
    </ButtonInputContainer>
  );
};

export default CustomInputButton;
