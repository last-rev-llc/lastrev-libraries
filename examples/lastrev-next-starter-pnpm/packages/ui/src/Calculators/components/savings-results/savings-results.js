import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { numberWithCommas } from '../../utils/helpers';
import { isScrolledIntoView } from '../../utils/scroll-assist';
import { Result, SavingResult, SavingsResultsContainer, Title } from './styled';

const SavingsResults = ({ results }) => {
  const wrapper = useRef(null);

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
      window.removeEventListener('scroll', animation);
      const titles = wrapper.current.querySelectorAll('h2');
      const results = wrapper.current.querySelectorAll('h3');
      for (const refe of [...titles, ...results]) {
        if (refe) {
          timeline.to(refe, {
            opacity: 0,
            duration: DURA,
            translateY: -40
          });
        }
      }

      if (wrapper.current) {
        timeline.to(wrapper.current, {
          opacity: 1,
          duration: DURA,
          translateY: 0
        });
      }
      for (const refe of [...titles, ...results]) {
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
    if (isScrolledIntoView(wrapper.current)) {
      animation();
    }
    if (!isScrolledIntoView(wrapper.current)) {
      window.addEventListener('scroll', animation, { passive: true });
    }
  }, []);
  return (
    <SavingsResultsContainer ref={wrapper}>
      {results.map(({ title, result, isPrimary }) => (
        <SavingResult key={title}>
          <Title>{title}</Title>
          <Result isPrimary={isPrimary}>${numberWithCommas(result)}</Result>
        </SavingResult>
      ))}
    </SavingsResultsContainer>
  );
};

export default SavingsResults;
