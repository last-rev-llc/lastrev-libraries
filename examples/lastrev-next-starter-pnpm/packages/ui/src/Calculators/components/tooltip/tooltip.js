import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { tooltipIcon, tooltip, disabled } from './tooltip.module.scss';

export const Tooltip = ({ options, id, isDisabled = false }) => {
  const { icon = 'i', text, direction = 'top' } = options;
  return (
    <div>
      <div data-tip data-for={id} className={`${tooltipIcon} ${isDisabled ? disabled : ''}`}>
        {icon}
      </div>
      <ReactTooltip
        place={direction}
        effect="solid"
        delayHide={200}
        disable={isDisabled}
        arrowColor="#D6D2F1"
        className={`${tooltip}`}
        clickable={true}
        id={id}>
        <ReactMarkdown
          components={{
            // eslint-disable-next-line react/display-name
            link: (props) => (
              <a href={props.href} target="_blank" rel="noreferrer">
                {props.children}
              </a>
            )
          }}>
          {text}
        </ReactMarkdown>
      </ReactTooltip>
    </div>
  );
};

export default Tooltip;
