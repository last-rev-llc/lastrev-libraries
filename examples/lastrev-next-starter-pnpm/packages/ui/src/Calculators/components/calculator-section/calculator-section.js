import React from 'react';
import styles from './calculator-section.module.scss';

const CalculatorSection = ({ children, chartPadding = false }) => (
  <div className={`${styles.container} ${chartPadding ? styles.customPaddingContianer : ''}`}>
    {children}
  </div>
);

export default CalculatorSection;
