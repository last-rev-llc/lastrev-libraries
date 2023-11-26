import React from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 4px;
  margin-top: 42px;
`;

const StyledThumb = styled.div`
  height: 14px;
  width: 14px;
  text-align: center;
  background-color: #489a93;
  color: #fff;
  border-radius: 100%;
  cursor: grab;
  z-index: 4;
  outline: none;
  bottom: -5px;
  &:after {
    content: '${({ value }) => value ?? 1}';
    position: absolute;
    left: -20px;
    top: -45px;
    font-family: Muli;
    font-size: 16px;
    width: 59.49px;
    font-weight: 600;
    color: #000;
    padding-top: 7.5px;
    padding-bottom: 7.5px;
    text-align: center;
    text-decoration: none;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #dbdee7;
  }
  &:before {
    content: '';
    position: absolute;
    left: 5px;
    top: -13px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid #dbdee7;
    z-index: 4;
  }
`;

const Arrow = styled.div`
  content: '';
  position: absolute;
  left: ${({ left }) => `${left}px`};
  top: -20px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid white;
  z-index: 5;
`;

const Thumb = (props, state) => {
  const left = props?.style?.left.replace('px', '');
  return (
    <>
      <StyledThumb value={`${state.valueNow}%`} {...props} />
      <Arrow left={Number(left) + 5} />
    </>
  );
};

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) => (props.index === 1 ? '#E9E9E9' : '#489a93')};
  border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const CustomSlideR = ({ handleAfterChange, options }) => {
  const { min, max, defaultValue } = options;
  return (
    <StyledSlider
      onChange={(value) => handleAfterChange(value)}
      defaultValue={[defaultValue]}
      renderTrack={Track}
      renderThumb={Thumb}
      min={min}
      max={max}
    />
  );
};

export default CustomSlideR;
