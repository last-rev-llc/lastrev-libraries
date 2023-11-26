import React, { useState } from 'react';
import { Input, InputWrapper } from './styled';

const CustomDateInput = ({ placeHolder, handleBlur, rowData }) => {
  const [date, setDate] = useState('');

  function handleChange(e) {
    const {
      target: { value }
    } = e;
    let text = value;
    const incomingValue = value[value.length - 1];
    let maxLength = 10;
    if (date[1] === '/') maxLength -= 1;
    if (date[3] === '/') maxLength -= 1;
    const currentLength = value.length;
    if (currentLength - 1 === maxLength) return;
    if (/\d|\//.test(incomingValue) || !value) {
      if (currentLength === 1 || (currentLength === 2 && incomingValue === '/')) {
        return setDate(text);
      } else if (currentLength === 4 || (currentLength === 5 && incomingValue === '/')) {
        return setDate(text);
      } else if ((currentLength === 2 || currentLength === 5) && incomingValue !== '/') {
        if (date[date.length - 1] === '/') {
          return setDate(text);
        } else {
          return setDate(`${text}/`);
        }
      }
      return setDate(text);
    }
    return;
  }

  function blurHandler(e) {
    return handleBlur(e.target.value.replace(/ /g, ''));
  }

  return (
    <InputWrapper>
      <Input
        onBlur={blurHandler}
        type="text"
        value={date}
        hasError={rowData?.error}
        placeholder={placeHolder}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default CustomDateInput;
