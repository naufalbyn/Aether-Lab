"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
    });

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!link) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const targetElement = document.querySelector<HTMLElement>(href);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      lenis.scrollTo(targetElement, {
        offset: 0,
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });

      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}