
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ==========================================
// SCROLL CONFIGURATION
// ==========================================

const SCROLL_DURATION = 1.2;

function scrollEasing(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function getHashTarget(hash: string) {
  if (!hash || hash === "#") {
    return null;
  }

  try {
    const id = decodeURIComponent(
      hash.slice(1)
    );

    return document.getElementById(id);
  } catch {
    return null;
  }
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

export default function SmoothScroll() {
  const pathname = usePathname();

  const previousPathRef =
    useRef<string | null>(null);

  const historyNavigationRef =
    useRef(false);

  // ========================================
  // BROWSER BACK / FORWARD DETECTION
  // ========================================

  useEffect(() => {
    const handlePopState = () => {
      historyNavigationRef.current =
        window.location.pathname !==
        previousPathRef.current;
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  // ========================================
  // ROUTE-AWARE SCROLL LIFECYCLE
  // ========================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const previousPath =
      previousPathRef.current;

    const routeChanged =
      previousPath !== null &&
      previousPath !== pathname;

    const historyNavigation =
      historyNavigationRef.current;

    const returningFromProject =
      historyNavigation &&
      previousPath?.startsWith("/projects/") &&
      pathname === "/";

    const reducedMotionQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    let lenis: Lenis | null = null;

    let firstFrame = 0;
    let secondFrame = 0;

    // ======================================
    // LENIS / GSAP SYNCHRONIZATION
    // ======================================

    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    const updateLenis = (time: number) => {
      lenis?.raf(time * 1000);
    };

    function destroyLenis() {
      gsap.ticker.remove(updateLenis);

      if (!lenis) {
        return;
      }

      lenis.off(
        "scroll",
        updateScrollTrigger
      );

      lenis.destroy();

      lenis = null;
    }

    function configureLenis() {
      destroyLenis();

      if (reducedMotionQuery.matches) {
        return;
      }

      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
      });

      lenis.on(
        "scroll",
        updateScrollTrigger
      );

      gsap.ticker.add(updateLenis);
    }

    configureLenis();

    // ======================================
    // CENTRALIZED SCROLL FUNCTION
    // ======================================

    function scrollToTarget(
      target: HTMLElement | number,
      immediate = false
    ) {
      if (lenis) {
        lenis.resize();

        lenis.scrollTo(target, {
          offset: 0,
          immediate,
          force: immediate,
          duration: SCROLL_DURATION,
          easing: scrollEasing,
        });

        return;
      }

      const top =
        typeof target === "number"
          ? target
          : target.getBoundingClientRect().top +
            window.scrollY;

      window.scrollTo({
        top,
        left: 0,
        behavior: "instant",
      });
    }

    // ======================================
    // ROUTE POSITION RESTORATION
    // ======================================

    function restoreRoutePosition() {
      ScrollTrigger.refresh();

      const hash = window.location.hash;

      // Browser back from a project should
      // return to the project collection.

      if (returningFromProject) {
        const buildsSection =
          document.getElementById("builds");

        if (buildsSection) {
          scrollToTarget(
            buildsSection,
            true
          );
        } else {
          scrollToTarget(0, true);
        }
      }

      // Explicit hash navigation:
      // /#builds, /#contact, etc.

      else if (hash) {
        const target =
          getHashTarget(hash);

        if (target) {
          scrollToTarget(target, true);
        } else if (routeChanged) {
          scrollToTarget(0, true);
        }
      }

      // New project pages and ordinary
      // route changes start at the top.

      else if (routeChanged) {
        scrollToTarget(0, true);
      }

      // Initial page load without a hash:
      // synchronize with the browser's
      // current scroll position.

      else if (lenis) {
        lenis.resize();

        lenis.scrollTo(window.scrollY, {
          immediate: true,
          force: true,
        });
      }

      previousPathRef.current =
        pathname;

      historyNavigationRef.current =
        false;

      ScrollTrigger.update();
    }

    // Wait for route content and motion
    // initialization to settle before
    // restoring the destination position.

    firstFrame =
      window.requestAnimationFrame(() => {
        secondFrame =
          window.requestAnimationFrame(() => {
            restoreRoutePosition();
          });
      });

    // ======================================
    // SAME-PAGE ANCHOR NAVIGATION
    // ======================================

    const handleAnchorClick = (
      event: MouseEvent
    ) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link =
        target.closest<HTMLAnchorElement>(
          'a[href^="#"]'
        );

      if (
        !link ||
        link.hasAttribute("download") ||
        (
          link.target &&
          link.target !== "_self"
        )
      ) {
        return;
      }

      const href =
        link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const targetElement =
        getHashTarget(href);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      if (window.location.hash !== href) {
        window.history.pushState(
          null,
          "",
          href
        );
      }

      scrollToTarget(
        targetElement,
        reducedMotionQuery.matches
      );
    };

    document.addEventListener(
      "click",
      handleAnchorClick
    );

    // ======================================
    // ACCESSIBILITY
    // ======================================

    const handleMotionPreferenceChange =
      () => {
        configureLenis();

        ScrollTrigger.refresh();
      };

    reducedMotionQuery.addEventListener(
      "change",
      handleMotionPreferenceChange
    );

    // ======================================
    // ROUTE CLEANUP
    // ======================================

    return () => {
      window.cancelAnimationFrame(
        firstFrame
      );

      window.cancelAnimationFrame(
        secondFrame
      );

      document.removeEventListener(
        "click",
        handleAnchorClick
      );

      reducedMotionQuery.removeEventListener(
        "change",
        handleMotionPreferenceChange
      );

      destroyLenis();
    };
  }, [pathname]);

  return null;
}
