import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useGSAPReveal — Animates children with GSAP ScrollTrigger on mount.
 * @param {string} selector - CSS selector of elements to animate inside the ref
 * @param {object} options - override GSAP fromTo vars
 * @returns {React.RefObject} ref to attach to the container element
 */
const useGSAPReveal = (selector = '.gsap-reveal', options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(selector);
      if (!elements || elements.length === 0) return;

      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, ...options.from },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            ...options.to,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, options]);

  return containerRef;
};

export default useGSAPReveal;
