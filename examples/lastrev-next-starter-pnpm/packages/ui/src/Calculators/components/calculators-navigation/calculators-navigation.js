import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addHTTPSProtocol } from '../../utils/helpers';
import { isScrolledIntoView } from '../../utils/scroll-assist';
import Text from '../text';
import styles from './calculators-navigation.module.scss';
const { calculatorNavigationContainer, actionsContainer, actionContainer, calculatorNavigationActionContainer } =
  styles;

const CalculatorsNavigation = ({ title, subTitle, items, animate }) => {
  const wrapper = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const itemsRef = useRef(null);
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
      const elements = itemsRef.current.querySelectorAll('div');
      for (const refe of [titleRef, subtitleRef]) {
        if (refe.current) {
          timeline.to(refe.current, {
            opacity: 0,
            duration: DURA,
            translateY: -40
          });
        }
      }
      if (elements.length) {
        for (const refe of elements) {
          if (refe) {
            timeline.to(refe, {
              opacity: 0,
              duration: 0,
              translateY: 40
            });
          }
        }
      }
      for (const refe of [wrapper, titleRef, subtitleRef]) {
        if (refe.current) {
          timeline.to(refe.current, {
            opacity: 1,
            duration: DURA,
            translateY: 0
          });
        }
      }
      for (const refe of elements) {
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
    <div className={calculatorNavigationContainer}>
      <div className={calculatorNavigationActionContainer} ref={wrapper}>
        <Text ref={titleRef} color={'#ffffff'} kind={'h2'} margin={'13px 0 40px 0'}>
          {title}
        </Text>
        <Text ref={subtitleRef} color={'#ffffff'} maxWidth={'1000'} lineHeight="1.4em">
          {subTitle}
        </Text>
        <div className={actionsContainer} ref={itemsRef}>
          {items.map(({ cta, image, title, text, url }, i) => (
            <div key={`action-${i}`} className={actionContainer}>
              <LazyLoadImage threshold="500" src={addHTTPSProtocol(image?.file?.url)} alt={image?.file?.title} />
              <strong>{title}</strong>
              <p>{text}</p>
              <a href={url}>{cta}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorsNavigation;
