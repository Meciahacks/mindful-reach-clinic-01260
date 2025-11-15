import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (!nodes.length) return;

    // add initial hidden state
    nodes.forEach((el) => {
      if (!el.classList.contains('reveal-hidden') && !el.classList.contains('reveal-in')) {
        el.classList.add('reveal-hidden');
      }

      // if element has stagger children, ensure they are hidden too
      const stagger = el.getAttribute('data-stagger');
      if (stagger) {
        const children = Array.from(el.querySelectorAll<HTMLElement>('[data-stagger-child]'));
        children.forEach((c) => {
          if (!c.classList.contains('reveal-hidden') && !c.classList.contains('reveal-in')) {
            c.classList.add('reveal-hidden');
          }
        });
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          const handleIn = () => {
            el.classList.remove('reveal-hidden', 'reveal-out');
            el.classList.add('reveal-in');

            const staggerVal = Number(el.getAttribute('data-stagger') || 0);
            if (staggerVal > 0) {
              const children = Array.from(el.querySelectorAll<HTMLElement>('[data-stagger-child]'));
              children.forEach((c, i) => {
                c.classList.remove('reveal-hidden', 'reveal-out');
                c.style.transitionDelay = `${i * staggerVal}ms`;
                c.classList.add('reveal-in');
              });
            }
          };

          const handleOut = () => {
            el.classList.remove('reveal-in');
            el.classList.add('reveal-out');

            const staggerVal = Number(el.getAttribute('data-stagger') || 0);
            if (staggerVal > 0) {
              const children = Array.from(el.querySelectorAll<HTMLElement>('[data-stagger-child]'));
              children.forEach((c, i) => {
                c.classList.remove('reveal-in');
                c.style.transitionDelay = `${i * staggerVal}ms`;
                c.classList.add('reveal-out');
              });
            }
          };

          if (entry.isIntersecting) {
            handleIn();
          } else {
            handleOut();
          }
        });
      },
      {
        threshold: [0, 0.15, 0.5],
        rootMargin: '0px 0px -10% 0px',
      }
    );

    nodes.forEach((n) => io.observe(n));

    return () => {
      io.disconnect();
      // cleanup animationDelay and classes
      nodes.forEach((el) => {
        const staggerVal = Number(el.getAttribute('data-stagger') || 0);
        if (staggerVal > 0) {
          const children = Array.from(el.querySelectorAll<HTMLElement>('[data-stagger-child]'));
          children.forEach((c) => {
            c.style.transitionDelay = '';
            c.classList.remove('reveal-in', 'reveal-out', 'reveal-hidden');
          });
        }
        el.classList.remove('reveal-in', 'reveal-out', 'reveal-hidden');
      });
    };
  }, []);
}
