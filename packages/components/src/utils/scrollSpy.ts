/** ScrollSpy
 * Based on: https://blog.devgenius.io/diy-scrollspy-4f1c270cafaf
 * Example: https://codesandbox.io/s/reverent-surf-nkzzv
*/
import { useEffect, useCallback } from 'react';

export interface ScrollSpyProps {
  handleScroll?: any;
}

export const ScrollSpy = ({ handleScroll }: ScrollSpyProps) => {
  const isInViewPort = useCallback((entry: IntersectionObserverEntry, offset = 1) => {
    const rect = entry.boundingClientRect;
    return rect.top - 1 <= 0 + offset && rect.bottom >= 0 + offset;
  }, []);

  useEffect(() => {
    const scrollables = document.querySelectorAll('[data-scrollspy]');
      scrollables.forEach(scrollable => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            handleScroll && handleScroll(entry, isInViewPort(entry));
          });
        },
        {
          root: null,
          rootMargin: '0px 0px 200% 0px',
          threshold: [0.0, 1.0]
        }
      );
      observer.observe(scrollable);
    })
  }, [handleScroll]);

  return null;
};
