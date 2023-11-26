/* eslint-disable react/display-name */
import CustomButton from '../custom-button/custom-buttom';
import CustomDateInput from '../custom-date-input/custom-date-input';
import CustomDatePicker from '../custom-datepicker/custom-datepicker';
import CustomInputButton from '../custom-input-button/custom-input-button';
import CustomSelect from '../custom-select/custom-select';
import CustomSlider from '../custom-slider/custom-slider';
import CustomInput from '../custom-input/custom-input';

const useHandler = (handler, value, control, validate, customValue) => {
  const { id, previousFields } = control;
  const error = validate(value ?? control.value);
  let newForm = {
    error,
    value: value ?? control.value
  };
  if (customValue) {
    newForm = { ...newForm, inputValue: customValue };
  }
  if (control.validatePreviousInputs) {
    newForm = { ...newForm, isTouched: true };
  }
  handler((prevState) => {
    if (previousFields) {
      const newState = { ...prevState, [id]: newForm };
      for (const field of previousFields) {
        if (!prevState[field]) {
          newState[field] = { error: true };
        }
      }
      return newState;
    }
    return {
      ...prevState,
      [id]: newForm
    };
  });
};

export const mapInputs = {
  button: ({ handler, control, validate, rowData, isDisabled }) => (
    <CustomButton
      key={`${control.id}-${control.value}`}
      value={control.value}
      isDisabled={isDisabled}
      isSelected={rowData && rowData[control.id]?.value === control.value}
      handleClick={() => useHandler(handler, undefined, control, validate)}
      kind="greenOutline"
    />
  ),
  select: ({ handler, control, validate, selectOptions, isDisabled }) => (
    <CustomSelect
      id={control.id}
      isDisabled={isDisabled}
      options={control.options}
      defaultValue={control?.defaultValue}
      selectOptions={selectOptions}
      handleSelect={(e) => {
        if (!isDisabled) {
          useHandler(handler, e, control, validate);
        }
      }}
    />
  ),
  text: ({ handler, control, validate, rowData, isDisabled, description, customStyle }) => (
    <CustomInput
      type={control.type}
      prefix={control.prefix}
      placeholder={control.placeHolder}
      isDisabled={isDisabled}
      key={control.id}
      value={rowData?.value}
      dataType={control.dataType}
      // isCurrency={control.isCurrency}
      description={description}
      customStyle={customStyle}
      defaultValue={control.defaultValue}
      rowData={rowData}
      onBlur={(value) => {
        const parsedValue = control.type === 'number' ? Number(value) : value;
        return rowData?.value !== parsedValue
          ? useHandler(handler, parsedValue, control, validate)
          : null;
      }}
    />
  ),
  slide: ({ handler, control, validate, isDisabled }) => (
    <CustomSlider
      options={control.options}
      handleAfterChange={(value) => useHandler(handler, value, control, validate)}
      key={control.id}
      isDisabled={isDisabled}
    />
  ),
  datePicker: ({ handler, control, validate, isDisabled }) => (
    <CustomDatePicker
      formatYears={control.formatToYears}
      isDisabled={isDisabled}
      handleDate={(value) => useHandler(handler, value, control, validate)}
    />
  ),
  date: ({ handler, control, validate, rowData, isDisabled }) => (
    <CustomDateInput
      rowData={rowData}
      formatYears={control.formatToYears}
      isDisabled={isDisabled}
      placeHolder={control.placeHolder}
      handleBlur={(value) => useHandler(handler, value, control, validate)}
    />
  ),
  showText: ({ control, customStyle }) => {
    return (
      <p style={customStyle}>
        {control.prefix ? control.prefix : ''} {control.value}
      </p>
    );
  },
  inputButton: ({ handler, control, validate, rowData, isDisabled, hasError }) => {
    // eslint-disable-next-line no-unused-vars
    const { hasInput, ...rest } = control;
    return (
      <CustomInputButton
        control={control}
        validate={validate}
        rowData={rowData}
        hasError={hasError}
        isDisabled={isDisabled}
        defaultValue={rowData?.[control.id]?.inputValue}
        dataType={control.dataType}
        kind={'purpleOutline'}
        onBlur={(value, customValue) => useHandler(handler, value, control, validate, customValue)}
        handleClick={() => useHandler(handler, undefined, rest, validate)}
      />
    );
  }
};
