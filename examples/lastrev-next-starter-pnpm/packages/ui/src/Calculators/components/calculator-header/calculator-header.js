import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { isScrolledIntoView } from '../../utils/scroll-assist';
import styles from './calculator-header.module.scss';
const { titleStyle, subTitleStyle } = styles;

const CalculatorHeader = ({ title, subTitle, animate }) => {
  const wrapper = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  function animation() {
    const DURA = 0.25;
    const timeline = gsap.timeline({ delay: 0 });
    if (wrapper.current) {
      timeline.to(wrapper.current, {
        opacity: 0,
        duration: 0
      });
    }
    if (isScrolledIntoView(wrapper.current)) {
      window.removeEventListener('scroll', animation);
      for (const refe of [titleRef, subtitleRef]) {
        if (refe.current) {
          timeline.to(refe.current, {
            opacity: 0,
            duration: DURA,
            translateX: -40
          });
        }
      }

      for (const refe of [wrapper, titleRef, subtitleRef]) {
        if (refe.current) {
          timeline.to(refe.current, {
            opacity: 1,
            duration: DURA,
            translateX: 0
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
    <div ref={wrapper}>
      <h1 ref={titleRef} className={titleStyle}>
        {title}
      </h1>
      <div ref={subtitleRef} className={subTitleStyle}>
        {subTitle}
      </div>
    </div>
  );
};

export default CalculatorHeader;
