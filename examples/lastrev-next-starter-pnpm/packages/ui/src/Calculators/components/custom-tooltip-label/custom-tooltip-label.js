import React from 'react';
import Tooltip from '../tooltip/tooltip';
import {
  customfieldContainer,
  fieldLabelContainer,
  labelContainer,
  disabled
} from './custom-tooltip-label.module.scss';

const CustomTooltipLabel = ({ tooltip, isDisabled, label }) => (
  <div className={customfieldContainer}>
    <div className={fieldLabelContainer}>
      <span className={`${labelContainer} ${isDisabled ? disabled : ''}`}>{label}</span>
      {tooltip && <Tooltip options={tooltip} id={label} isDisabled={isDisabled} />}
    </div>
  </div>
);

export default CustomTooltipLabel;
