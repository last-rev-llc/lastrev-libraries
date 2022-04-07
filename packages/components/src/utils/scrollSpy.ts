/** ScrollSpy
 * Based on: https://blog.devgenius.io/diy-scrollspy-4f1c270cafaf
 * Example: https://codesandbox.io/s/reverent-surf-nkzzv
*/
import { useEffect, useCallback } from 'react';

import useGetHeaderHeight from './useGetHeaderHeight';

export interface ScrollSpyProps {
  handleScroll?: any;
}

export const ScrollSpy = ({ handleScroll }: ScrollSpyProps) => {
  const headerHeight = useGetHeaderHeight();

  const isInViewPort = useCallback((entry: IntersectionObserverEntry, offset = 1) => {
    const rect = entry.boundingClientRect;
    return rect.top - 1 <= 0 + offset && rect.bottom >= 0 + offset;
  }, []);

  useEffect(() => {
    const scrollables = document.querySelectorAll('[data-scrollspy]');

    const observers: Array<IntersectionObserver> = [];

    scrollables.forEach(scrollable => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            handleScroll && handleScroll(entry, isInViewPort(entry, headerHeight));
          });
        },
        {
          root: null,
          rootMargin: `${-headerHeight}px 0px 200% 0px`,
          threshold: [0.0, 1.0]
        }
      );
      observer.observe(scrollable);

      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, [handleScroll, headerHeight]);

  return null;
};
