import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { isScrolledIntoView } from '../../utils/scroll-assist';
import { Text } from '../text';
import CustomAccordion from '../custom-accordion/custom-accordion';
import styles from './accordion.module.scss';

const { listColumn, accordionContainer, accordionListContainer, accordionRow } = styles;

const Row = ({ className, children, key }) => (
  <ul className={`${accordionRow} ${className}`} key={key}>
    {children}
  </ul>
);

const StyledRow = styled(Row)`
  ${(p) => p.styles}
`;

const AccordionList = ({ title, list, animate, className, rowStyles }) => {
  const wrapper = useRef(null);
  const titleRef = useRef(null);

  function animation() {
    const DURA = 0.25;
    const timeline = gsap.timeline({ delay: DURA });
    if (wrapper.current) {
      timeline.to(wrapper.current, {
        opacity: 0,
        duration: 0
      });
    }
    if (isScrolledIntoView(wrapper.current)) {
      window.removeEventListener('scroll', animation, { passive: true });
      const items = wrapper.current.querySelectorAll('li');
      if (titleRef.current) {
        timeline.to(titleRef.current, {
          opacity: 0,
          duration: 0,
          translateX: -40
        });
      }
      for (const refe of items) {
        if (refe) {
          timeline.to(refe, {
            opacity: 0,
            duration: 0,
            translateY: -40
          });
        }
      }
      for (const refe of [wrapper, titleRef]) {
        if (refe.current) {
          timeline.to(refe.current, {
            opacity: 1,
            duration: DURA,
            translateX: 0
          });
        }
      }
      for (const refe of items) {
        if (refe) {
          timeline.to(refe, {
            opacity: 1,
            duration: DURA,
            translateY: 0
          });
        }
      }
    }
  }

  useEffect(() => {
    if (animate && isScrolledIntoView(wrapper.current)) {
      animation();
    }
    if (animate && !isScrolledIntoView(wrapper.current)) {
      window.addEventListener('scroll', animation, { passive: true });
    }
  }, []);
  return (
    <div className={`${accordionListContainer} ${className}`} ref={wrapper}>
      {title && (
        <Text ref={titleRef} kind={'h2'} size={32} margin={'0 0 20px 0'}>
          {title}
        </Text>
      )}
      <div className={listColumn}>
        {list.map((column, i) => (
          <StyledRow styles={rowStyles} key={`row-${i}`}>
            {column[0]?.fields &&
              column.map((element, j) => (
                <li className={accordionContainer} key={`title-${j}`}>
                  <CustomAccordion title={element.fields.title} text={element.fields.text} />
                </li>
              ))}
            {!column[0]?.fields &&
              column.map(({ title, text, CustomElement }, j) => (
                <li className={accordionContainer} key={`title-${j}`}>
                  <CustomAccordion title={title} text={text} CustomElement={CustomElement} />
                </li>
              ))}
          </StyledRow>
        ))}
      </div>
    </div>
  );
};

export default AccordionList;
