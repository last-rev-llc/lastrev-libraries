/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { handleChange, numberWithCommas, parseToNumber } from '../../utils/helpers';
import { useWindowSize } from '../../utils/hooks/useWindowsSize';
import {
  Bar,
  BarsConainer,
  CalculatorItem,
  CalculatorItemContainer,
  Description,
  ImageContainer,
  PagginDot,
  PurpleText,
  PagginContainer,
  Container,
  ErroLabel,
  InputWrapper,
  ExpenseInput,
  ImageRow
} from './styled';

const settings = (activeItem, setActiveItem, isMobile) => ({
  infinite: false,
  slidesToShow: isMobile ? 1.2 : 4.5,
  arrows: false,
  swipeToSlide: true,
  dots: true,
  adaptiveHeight: true,
  customPaging: (index) => <PagginDot isActive={index === activeItem} />,
  appendDots: (dots) => {
    return (
      <PagginContainer>
        <ul> {dots} </ul>
      </PagginContainer>
    );
  },
  afterChange: (index) => setActiveItem(index)
});

const setFormValue = ({ id, value, setForm, error, itemSelected }) =>
  setForm((preValue) => {
    const newValue = { ...preValue };
    newValue[id] = {
      value,
      error,
      itemSelected
    };
    return newValue;
  });

const CalculatorExpenses = ({ items, setForm, targetIdForm, isPercentage, selected, maxPercentage, maxDollars }) => {
  const [activeItem, setActiveItem] = useState(
    selected !== undefined ? items.findIndex(({ title }) => title === selected?.itemSelected) : null
  );
  const [value, setValue] = useState(selected?.value ?? '');
  const [mobile, setMobile] = useState(null);
  const device = useWindowSize(true);
  useEffect(() => {
    const isMobile = device.includes('mobile');
    setMobile(isMobile);
  }, [device]);
  const hasError =
    parseToNumber(value) > 0 && isPercentage ? parseToNumber(value) > maxPercentage : parseToNumber(value) > maxDollars;
  return (
    <Container>
      {mobile !== null ? (
        <Slider {...settings(activeItem, setActiveItem, mobile)}>
          {React.Children.toArray(
            items.map(({ activeColors, normalColors, title, price, description, priceDescription }, index) => (
              <CalculatorItemContainer>
                <CalculatorItem
                  isActive={index === activeItem}
                  onClick={() => {
                    setActiveItem(index);
                    setFormValue({
                      id: targetIdForm,
                      value: price ?? parseToNumber(value),
                      setForm,
                      error: false,
                      itemSelected: title
                    });
                  }}>
                  <ImageRow>
                    <ImageContainer isActive={index === activeItem}>
                      <BarsConainer>
                        {React.Children.toArray(
                          normalColors.map((color, j) => (
                            <Bar color={color} size={(100 / activeColors.length) * (j + 1)} />
                          ))
                        )}
                      </BarsConainer>
                    </ImageContainer>
                  </ImageRow>

                  <PurpleText margin>{title}</PurpleText>
                  {description && <Description>{description} </Description>}
                  {price ? (
                    <PurpleText>
                      {!isPercentage ? '$ ' : ''}
                      {price}
                      {isPercentage ? ' %' : ''}
                    </PurpleText>
                  ) : (
                    <div>
                      <InputWrapper
                        hasError={hasError}
                        content={value.length ? (isPercentage ? '%' : '$') : ''}
                        customWidth={'100%'}
                        prefixPosition={isPercentage ? 8.5 * value.length + 10 : 0}>
                        <ExpenseInput
                          hasError={hasError}
                          maxLength={8}
                          value={value}
                          onChange={(e) => handleChange('currency', e.target.value, setValue)}
                          onBlur={(e) =>
                            setFormValue({
                              id: targetIdForm,
                              value: e.target.value,
                              setForm,
                              error: hasError,
                              itemSelected: title
                            })
                          }
                        />
                      </InputWrapper>
                      {hasError ? (
                        <ErroLabel>
                          {isPercentage
                            ? `Please enter a value ${maxPercentage} or less`
                            : `Please enter an amount $${numberWithCommas(maxDollars)} or less.`}
                        </ErroLabel>
                      ) : null}
                    </div>
                  )}
                  <Description>{priceDescription} </Description>
                </CalculatorItem>
              </CalculatorItemContainer>
            ))
          )}
        </Slider>
      ) : null}
    </Container>
  );
};

export default CalculatorExpenses;
