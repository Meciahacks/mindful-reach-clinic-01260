import { useEffect } from "react";

// Lightweight parallax hook.
// Targets elements with [data-parallax]. If a child with [data-parallax-bg]
// exists, the transform is applied to that child (so backgrounds move independently).
export default function useParallax() {
  useEffect(() => {
    const elems = () => Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let ticking = false;

    const isSmall = () => window.matchMedia('(max-width: 640px)').matches;

    const update = () => {
      const nodes = elems();
      const vh = window.innerHeight || 800;

      nodes.forEach((el) => {
        // allow per-element override
        const speedAttr = el.getAttribute('data-speed');
        let speed = speedAttr ? Number(speedAttr) : 0.05;

        // reduce on small screens so motion is subtle
        if (isSmall()) speed = Math.max(0, speed * 0.35);

        // support targetting a nested background element for better visuals
        const bg = el.querySelector<HTMLElement>('[data-parallax-bg]');
        const target = bg ?? el;

        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = vh / 2;
        const distance = elementCenter - viewportCenter;

        // allow invert direction (data-invert="true")
        const invert = el.getAttribute('data-invert') === 'true';
        const direction = invert ? 1 : -1;

        const translate = direction * (distance * speed);

        // apply transform to target
        target.style.transform = `translate3d(0, ${translate}px, 0)`;
        target.style.willChange = 'transform';
      });
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    // initial update
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      // reset transforms
      elems().forEach((el) => {
        const bg = el.querySelector<HTMLElement>('[data-parallax-bg]');
        const target = bg ?? el;
        target.style.transform = '';
        target.style.willChange = '';
      });
    };
  }, []);
}
