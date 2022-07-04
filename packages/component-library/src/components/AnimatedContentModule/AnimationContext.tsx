import React from 'react';
import { useViewportScroll, motion, useTransform, useReducedMotion, useSpring } from 'framer-motion';

export const BASE_OFFSET = 600;
export const MIN_RANGE = 0.1;

interface Props {
  children?: any;
  animation?: string;
  range?: number;
}
export const AnimationContext = ({ children, animation }: Props) => {
  if (animation === 'parallax-fade-slide-in') {
    return ParallaxItem({ children, animation });
  }
  return children;
};

const ParallaxItem = ({ children }: Props) => {
  const style: any = {};
  const prefersReducedMotion = useReducedMotion();
  const ref = React.useRef<any>();
  const [elementTop, setElementTop] = React.useState(0);
  const [clientHeight, setClientHeight] = React.useState(0);

  const { scrollY } = useViewportScroll();

  // start animating our element when we've scrolled it into view
  const initial = elementTop - clientHeight;
  const offset = BASE_OFFSET * MIN_RANGE;
  // end our animation when we've scrolled the offset specified
  const final = elementTop + offset;

  const yRange = useTransform(scrollY, [initial, final], [offset, -offset]);
  // apply a spring to ease the result
  const y = useSpring(yRange, { stiffness: 400, damping: 90 });

  React.useLayoutEffect(() => {
    const element = ref.current;
    // save our layout measurements in a function in order to trigger
    // it both on mount and on resize
    const onResize = () => {
      // use getBoundingClientRect instead of offsetTop in order to
      // get the offset relative to the viewport
      setElementTop(element.getBoundingClientRect().top + window.scrollY || window.pageYOffset);
      setClientHeight(window.innerHeight);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [ref]);

  // const opacity = useSpring(useTransform(yRange, [-BASE_OFFSET, BASE_OFFSET * MIN_RANGE], [0, 1]));
  // style.opacity = opacity;
  if (!prefersReducedMotion) {
    style.y = y;
  }

  return (
    <motion.div ref={ref} style={style}>
      {children}
    </motion.div>
  );
};

export default AnimationContext;
