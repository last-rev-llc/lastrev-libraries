import React from 'react';
import Tooltip from '../tooltip/tooltip';
import styles from './custom-field.module.scss';
import { mapInputs } from './map-inputs';

const {
  customfieldContainer,
  errorText,
  fieldRow,
  fieldLabelContainer,
  labelContainer,
  hintText,
  disabled,
  required,
  removeSpace
} = styles;

const buildControls = ({
  controls,
  handler,
  validate,
  rowData,
  isDisabled,
  description,
  customStyle,
  hasError
}) => {
  if (Array.isArray(controls)) {
    return controls.map((control) =>
      mapInputs[control.type]({ handler, control, validate, rowData, isDisabled, hasError })
    );
  }
  return mapInputs[controls.type]({
    handler,
    control: controls,
    validate,
    rowData,
    isDisabled,
    description,
    customStyle,
    hasError
  });
};

const CustomField = ({
  controls,
  handler,
  label,
  rowData,
  error,
  tooltip,
  fieldId,
  hint,
  isDisabled = false,
  description,
  customStyle,
  hasSeparation = true
}) => {
  const hasError = Boolean(
    rowData && error?.validation(fieldId ? rowData[fieldId].value : rowData.value)
  );
  const isRequired = Array.isArray(controls) ? controls[0].required : controls.required;
  const message = error?.message(rowData?.value);
  return (
    <div className={`${customfieldContainer} ${!hasSeparation ? removeSpace : ''}`}>
      <div className={fieldLabelContainer}>
        <span className={`${labelContainer} ${isDisabled ? disabled : ''}`}>
          {isRequired ? <span className={required}>*</span> : ''}
          {label}
        </span>
        {tooltip && <Tooltip options={tooltip} id={label} />}
      </div>
      {hint ? <span className={hintText}>{hint}</span> : null}
      <div className={fieldRow}>
        {buildControls({
          controls,
          handler,
          validate: (v) => error?.validation(v),
          rowData,
          isDisabled,
          description,
          customStyle,
          hasError
        })}
      </div>
      {hasError && <div className={errorText}>{message}</div>}
    </div>
  );
};

export default CustomField;
