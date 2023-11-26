/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useWindowSize } from '../../../../utils/hooks/useWindowsSize';
import {
  Container,
  Dot,
  Item,
  ItemDescription,
  CheckMark,
  ItemContainer,
  StyledBox
} from './styled';

const settings = (rows) => ({
  infinite: false,
  slidesToShow: rows === 1 ? 1.5 : 2,
  arrows: false,
  swipeToSlide: true,
  dots: false,
  rows: rows
});

const CalculatorBoxCheck = ({ items, setForm, data }) => {
  const [activeItem, setActiveItem] = useState(data ?? null);
  const [mobile, setMobile] = useState(null);
  const device = useWindowSize(true);
  useEffect(() => {
    const isMobile = device.includes('mobile');
    setMobile(isMobile);
  }, [device]);
  useEffect(() => {
    setForm((prevValue) => ({ ...prevValue, hsaGoalsSelected: activeItem }));
  }, [activeItem]);
  return (
    <StyledBox>
      <Container>
        {mobile !== null ? (
          <Slider {...settings(mobile ? 1 : 2)}>
            {items.map(({ id, text }) => {
              const isActive = activeItem?.[id];
              return (
                <ItemContainer key={id}>
                  <Item
                    isActive={isActive}
                    onClick={() =>
                      setActiveItem((prevValue) => {
                        const newValue = { ...prevValue };
                        if (newValue[id]) {
                          newValue[id] = !newValue[id];
                        } else newValue[id] = true;
                        return newValue;
                      })
                    }>
                    <ItemDescription>{text}</ItemDescription>
                    <Dot>{isActive && <CheckMark />}</Dot>
                  </Item>
                </ItemContainer>
              );
            })}
          </Slider>
        ) : null}
      </Container>
    </StyledBox>
  );
};

export default CalculatorBoxCheck;
